#!/usr/bin/env python3
"""Small SSE status bridge for the KURONOMY Minecraft server.

It watches the server log and emits a full player list whenever a player joins
or leaves. No RCON password or Minecraft account token is required.
"""

from __future__ import annotations

import argparse
import json
import queue
import re
import socket
import struct
import sys
import threading
import time
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any


JOIN_RE = re.compile(r"\]: (?P<name>[A-Za-z0-9_]{3,16}) joined the game$")
LEAVE_RE = re.compile(r"\]: (?P<name>[A-Za-z0-9_]{3,16}) left the game$")
LIST_RE = re.compile(r"There are \d+ of a max of \d+ players online:\s*(?P<names>.*)$")


def default_server_root() -> Path:
    return Path(__file__).resolve().parents[2]


def read_properties(path: Path) -> dict[str, str]:
    props: dict[str, str] = {}
    if not path.exists():
        return props

    with path.open("r", encoding="utf-8", errors="replace") as handle:
        for line in handle:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            props[key.strip()] = value.strip()
    return props


def clean_motd(value: str) -> str:
    value = value.replace("\\n", " / ")
    return re.sub(r"§.", "", value).strip()


class RealtimeStatus:
    def __init__(self, log_path: Path, properties_path: Path, poll_interval: float, rcon_interval: float) -> None:
        self.log_path = log_path
        self.properties_path = properties_path
        self.poll_interval = poll_interval
        self.rcon_interval = rcon_interval
        self.players: set[str] = set()
        self.listeners: list[queue.Queue[dict[str, Any]]] = []
        self.lock = threading.RLock()
        self.last_changed = time.time()
        self.last_log_size = 0
        self.last_rcon_check = 0.0
        self.server_online = False
        self.rcon_available = False
        self.properties = read_properties(properties_path)
        self.rebuild_from_log()

    @property
    def max_players(self) -> int:
        try:
            return int(self.properties.get("max-players", "50"))
        except ValueError:
            return 50

    @property
    def server_port(self) -> int:
        try:
            return int(self.properties.get("server-port", "25565"))
        except ValueError:
            return 25565

    @property
    def rcon_port(self) -> int:
        try:
            return int(self.properties.get("rcon.port", "25575"))
        except ValueError:
            return 25575

    @property
    def rcon_password(self) -> str:
        return self.properties.get("rcon.password", "")

    @property
    def version(self) -> str:
        return "Java 1.20.1 Fabric"

    @property
    def motd(self) -> str:
        return clean_motd(self.properties.get("motd", "KURONOMY"))

    def is_minecraft_port_open(self) -> bool:
        try:
            with socket.create_connection(("127.0.0.1", self.server_port), timeout=0.35):
                return True
        except OSError:
            return False

    def read_rcon_packet(self, sock: socket.socket) -> tuple[int, int, str]:
        length_data = sock.recv(4)
        if len(length_data) != 4:
            raise ConnectionError("short rcon length")

        length = struct.unpack("<i", length_data)[0]
        payload = bytearray()
        while len(payload) < length:
            chunk = sock.recv(length - len(payload))
            if not chunk:
                raise ConnectionError("short rcon payload")
            payload.extend(chunk)

        request_id, packet_type = struct.unpack("<ii", payload[:8])
        body = payload[8:-2].decode("utf-8", errors="replace")
        return request_id, packet_type, body

    def write_rcon_packet(self, sock: socket.socket, request_id: int, packet_type: int, body: str) -> None:
        body_bytes = body.encode("utf-8")
        payload = struct.pack("<ii", request_id, packet_type) + body_bytes + b"\x00\x00"
        sock.sendall(struct.pack("<i", len(payload)) + payload)

    def rcon_command(self, command: str) -> str | None:
        if self.properties.get("enable-rcon", "false").lower() != "true" or not self.rcon_password:
            return None

        try:
            with socket.create_connection(("127.0.0.1", self.rcon_port), timeout=0.8) as sock:
                sock.settimeout(0.8)
                self.write_rcon_packet(sock, 711, 3, self.rcon_password)
                auth_id, _, _ = self.read_rcon_packet(sock)
                if auth_id == -1:
                    return None

                self.write_rcon_packet(sock, 712, 2, command)
                _, _, body = self.read_rcon_packet(sock)
                return body
        except OSError:
            return None

    def players_from_rcon(self) -> set[str] | None:
        response = self.rcon_command("list")
        if response is None:
            self.rcon_available = False
            return None

        self.rcon_available = True
        match = LIST_RE.search(response.strip())
        if not match:
            return set()

        names = match.group("names").strip()
        if not names:
            return set()
        return {name.strip() for name in names.split(",") if name.strip()}

    def sync_from_rcon(self) -> bool:
        now = time.time()
        if now - self.last_rcon_check < self.rcon_interval:
            return False
        self.last_rcon_check = now

        rcon_players = self.players_from_rcon()
        if rcon_players is None:
            online = self.is_minecraft_port_open()
            with self.lock:
                changed = self.server_online != online
                self.server_online = online
                if not online and self.players:
                    self.players.clear()
                    changed = True
            return changed

        with self.lock:
            changed = self.players != rcon_players or not self.server_online
            self.server_online = True
            self.players = rcon_players
            return changed

    def apply_log_line(self, line: str) -> bool:
        join = JOIN_RE.search(line)
        if join:
            name = join.group("name")
            if name not in self.players:
                self.players.add(name)
                return True
            return False

        leave = LEAVE_RE.search(line)
        if leave:
            name = leave.group("name")
            if name in self.players:
                self.players.remove(name)
                return True
        return False

    def rebuild_from_log(self) -> None:
        players: set[str] = set()
        if not self.log_path.exists():
            with self.lock:
                self.players = players
                self.last_log_size = 0
            return

        with self.log_path.open("r", encoding="utf-8", errors="replace") as handle:
            for line in handle:
                join = JOIN_RE.search(line)
                if join:
                    players.add(join.group("name"))
                    continue
                leave = LEAVE_RE.search(line)
                if leave:
                    players.discard(leave.group("name"))
            size = handle.tell()

        with self.lock:
            self.players = players
            self.last_log_size = size
            self.last_changed = time.time()

    def status_payload(self) -> dict[str, Any]:
        with self.lock:
            online = self.server_online or self.is_minecraft_port_open()
            names = sorted(self.players) if online else []
            return {
                "source": "kuronomy-realtime",
                "realtime": True,
                "transport": "rcon+log" if self.rcon_available else "log",
                "online": online,
                "players": {
                    "online": len(names),
                    "max": self.max_players,
                    "list": [{"name": name, "name_clean": name} for name in names],
                },
                "version": self.version,
                "motd": {"clean": self.motd},
                "note": "リアルタイム接続中: 参加/退出を即時反映しています",
                "updatedAt": int(self.last_changed * 1000),
            }

    def subscribe(self) -> queue.Queue[dict[str, Any]]:
        listener: queue.Queue[dict[str, Any]] = queue.Queue(maxsize=16)
        with self.lock:
            self.listeners.append(listener)
        listener.put(self.status_payload())
        return listener

    def unsubscribe(self, listener: queue.Queue[dict[str, Any]]) -> None:
        with self.lock:
            if listener in self.listeners:
                self.listeners.remove(listener)

    def broadcast(self) -> None:
        payload = self.status_payload()
        with self.lock:
            listeners = list(self.listeners)

        for listener in listeners:
            try:
                listener.put_nowait(payload)
            except queue.Full:
                try:
                    listener.get_nowait()
                    listener.put_nowait(payload)
                except queue.Empty:
                    pass

    def watch(self) -> None:
        while True:
            try:
                self.properties = read_properties(self.properties_path)
                changed_by_rcon = self.sync_from_rcon()
                if not self.log_path.exists():
                    if changed_by_rcon:
                        with self.lock:
                            self.last_changed = time.time()
                        self.broadcast()
                    time.sleep(self.poll_interval)
                    continue

                current_size = self.log_path.stat().st_size
                if current_size < self.last_log_size:
                    self.rebuild_from_log()
                    self.broadcast()
                    time.sleep(self.poll_interval)
                    continue

                changed = False
                with self.log_path.open("r", encoding="utf-8", errors="replace") as handle:
                    handle.seek(self.last_log_size)
                    for line in handle:
                        changed = self.apply_log_line(line) or changed
                    self.last_log_size = handle.tell()

                if changed or changed_by_rcon:
                    with self.lock:
                        self.last_changed = time.time()
                    self.broadcast()
            except Exception as exc:  # Keep the bridge alive; report and retry.
                print(f"[realtime-status] watch error: {exc}", file=sys.stderr, flush=True)

            time.sleep(self.poll_interval)


def make_handler(status: RealtimeStatus) -> type[BaseHTTPRequestHandler]:
    class StatusHandler(BaseHTTPRequestHandler):
        protocol_version = "HTTP/1.1"

        def log_message(self, fmt: str, *args: Any) -> None:
            print(f"[realtime-status] {self.address_string()} - {fmt % args}", flush=True)

        def cors_headers(self) -> None:
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.send_header("Cache-Control", "no-store")

        def do_OPTIONS(self) -> None:
            self.send_response(HTTPStatus.NO_CONTENT)
            self.cors_headers()
            self.send_header("Content-Length", "0")
            self.end_headers()

        def do_GET(self) -> None:
            if self.path.split("?", 1)[0] == "/status.json":
                self.handle_status_json()
                return
            if self.path.split("?", 1)[0] == "/events":
                self.handle_events()
                return
            if self.path.split("?", 1)[0] == "/health":
                self.handle_health()
                return
            self.send_error(HTTPStatus.NOT_FOUND)

        def handle_health(self) -> None:
            body = b"ok\n"
            self.send_response(HTTPStatus.OK)
            self.cors_headers()
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def handle_status_json(self) -> None:
            body = json.dumps(status.status_payload(), ensure_ascii=False).encode("utf-8")
            self.send_response(HTTPStatus.OK)
            self.cors_headers()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def write_sse(self, payload: dict[str, Any]) -> None:
            data = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
            message = f"event: status\ndata: {data}\n\n".encode("utf-8")
            self.wfile.write(message)
            self.wfile.flush()

        def handle_events(self) -> None:
            listener = status.subscribe()
            self.send_response(HTTPStatus.OK)
            self.cors_headers()
            self.send_header("Content-Type", "text/event-stream; charset=utf-8")
            self.send_header("Connection", "keep-alive")
            self.send_header("X-Accel-Buffering", "no")
            self.end_headers()

            try:
                while True:
                    try:
                        payload = listener.get(timeout=15)
                        self.write_sse(payload)
                    except queue.Empty:
                        self.wfile.write(b": heartbeat\n\n")
                        self.wfile.flush()
            except (BrokenPipeError, ConnectionError, OSError):
                pass
            finally:
                status.unsubscribe(listener)

    return StatusHandler


def parse_args() -> argparse.Namespace:
    root = default_server_root()
    parser = argparse.ArgumentParser(description="KURONOMY realtime player status SSE bridge")
    parser.add_argument("--host", default="127.0.0.1", help="HTTP listen host")
    parser.add_argument("--port", type=int, default=8765, help="HTTP listen port")
    parser.add_argument("--log", type=Path, default=root / "logs" / "latest.log", help="Minecraft latest.log path")
    parser.add_argument("--properties", type=Path, default=root / "server.properties", help="server.properties path")
    parser.add_argument("--poll", type=float, default=0.25, help="log polling interval in seconds")
    parser.add_argument("--rcon-poll", type=float, default=1.0, help="RCON /list correction interval in seconds")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    status = RealtimeStatus(args.log, args.properties, args.poll, args.rcon_poll)
    watcher = threading.Thread(target=status.watch, daemon=True)
    watcher.start()

    server = ThreadingHTTPServer((args.host, args.port), make_handler(status))
    print(
        f"[realtime-status] listening on http://{args.host}:{args.port} "
        f"watching {args.log}",
        flush=True,
    )
    server.serve_forever()


if __name__ == "__main__":
    main()
