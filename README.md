# KURONOMY HomePage

GitHub Pages で公開する静的サイトです。旧環境の `/api/status` と HTTP リダイレクトには依存しません。

## Publish

1. この `HomePage` ディレクトリの中身を GitHub Pages 用リポジトリの公開ルートに置く。
2. GitHub の `Settings > Pages` で公開元ブランチを選ぶ。
3. 公開 URL は `https://xero-x.me/KURONOMY/` を想定する。
4. `xero-x.me` 直下に公開したい場合は、現在そのドメインを使っている別リポジトリからカスタムドメイン設定を外してから、このリポジトリに設定する。
5. HTTPS 証明書が発行されたら `Enforce HTTPS` を有効にする。

## DNS

Web は既存の GitHub Pages ドメインに向け、Minecraft は SRV レコードでゲームサーバーへ向ける構成を想定しています。

```text
mc    A      <minecraft-server-public-ip>
_minecraft._tcp  SRV  0 0 25565 mc.xero-x.me
```

Cloudflare を使う場合、`mc` は DNS only にしてください。通常の Cloudflare proxy は Minecraft Java の TCP 接続を中継しません。

## Status

トップページのオンライン状態とプレイヤー数は、優先順で取得します。

1. `status-config.js` で指定したリアルタイム SSE API
2. `https://api.mcstatus.io/v2/status/java/xero-x.me`
3. `https://api.mcsrvstat.us/3/xero-x.me`

外部ステータス API はキャッシュされるため、参加・退出の即時反映には使いません。即時反映させる場合は Minecraft サーバー側でリアルタイムブリッジを起動し、`https://status.xero-x.me/events` として HTTPS 公開してください。

```powershell
cd \\FRIDAY-SERVER\gameserver\KURONOMY\KURONOMY
.\tools\Start-RealtimeStatus.ps1 -HostName 127.0.0.1 -Port 8765 -Background
```

このブリッジは `logs/latest.log` の join/left を監視しつつ、RCON の `list` で現在の参加者一覧を定期補正します。RCON パスワードはコードには保存せず、`server.properties` の `rcon.password` を読みます。公開時は Cloudflare Tunnel やリバースプロキシで `https://status.xero-x.me` から `http://127.0.0.1:8765` に転送してください。
