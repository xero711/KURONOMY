const SERVER_ADDRESS = 'xero-x.me';
const STATUS_API_URL = `https://api.mcsrvstat.us/3/${SERVER_ADDRESS}`;
const POLL_MS = 3000;
const FETCH_TIMEOUT_MS = 10000;

let cachedPlayerNames = [];

function el(tag, attrs) {
    const node = document.createElement(tag);
    if (attrs) {
        Object.entries(attrs).forEach(([k, v]) => {
            if (k === 'className') node.className = v;
            else if (k === 'text') node.textContent = v;
            else node.setAttribute(k, v);
        });
    }
    return node;
}

function setText(id, value) {
    const node = document.getElementById(id);
    if (node) {
        node.textContent = value;
    }
}

function firstLine(value) {
    if (Array.isArray(value)) {
        return value.filter(Boolean).join(' / ');
    }
    return value || '';
}

function playerNamesFromStatus(status) {
    const players = status.players || {};
    const list = players.list;
    if (!Array.isArray(list)) {
        return null;
    }

    return list
        .map((player) => {
            if (typeof player === 'string') return player;
            if (player && typeof player.name === 'string') return player.name;
            return '';
        })
        .filter(Boolean);
}

function renderPlayerList(names, message) {
    const playerList = document.getElementById('player-list');
    if (!playerList) {
        return;
    }
    playerList.innerHTML = '';

    if (message) {
        playerList.appendChild(el('li', { className: 'player-list__empty', text: message }));
        return;
    }

    if (names.length > 0) {
        for (const name of names) {
            const li = document.createElement('li');
            li.className = 'player-list__item';

            const img = document.createElement('img');
            img.className = 'player-list__avatar';
            img.alt = '';
            img.src = `https://mc-heads.net/avatar/${encodeURIComponent(name)}/32`;

            const span = el('span', { className: 'player-list__name', text: name });
            li.appendChild(img);
            li.appendChild(span);
            playerList.appendChild(li);
        }
        return;
    }

    playerList.appendChild(
        el('li', {
            className: 'player-list__empty',
            text: '現在オンラインのプレイヤーはいません',
        }),
    );
}

function setStatusState(state) {
    const statusCard = document.querySelector('.status-card--state');
    if (!statusCard) return;

    statusCard.classList.remove('is-online', 'is-offline', 'is-warning');
    statusCard.classList.add(`is-${state}`);
}

function renderStatus(status) {
    const online = Boolean(status.online);
    const players = status.players || {};
    const onlineCount = Number.isFinite(players.online) ? players.online : 0;
    const maxPlayers = Number.isFinite(players.max) ? players.max : 80;
    const version = status.version || status.protocol?.name || 'Java 1.20.1 Fabric';
    const motd = firstLine(status.motd?.clean);
    const statusNote = online
        ? (motd || '公開ステータス API から取得しています')
        : 'DNS/SRV が未設定、またはサーバーがオフラインです';

    setStatusState(online ? 'online' : 'offline');
    setText('server-status', online ? 'Online' : 'Offline');
    setText('server-address', SERVER_ADDRESS);
    setText('server-version', version);
    setText('server-players', `${onlineCount} / ${maxPlayers}`);
    setText('status-note', statusNote);
}

function renderStatusError() {
    setStatusState('warning');
    setText('server-status', 'Checking');
    setText('server-address', SERVER_ADDRESS);
    setText('server-version', 'Java 1.20.1 Fabric');
    setText('server-players', '- / 80');
    setText('status-note', 'DNS または公開ステータス API の反映待ちです');
    renderPlayerList(cachedPlayerNames, cachedPlayerNames.length ? '' : 'ステータス取得待ちです');
}

async function loadServerStatus() {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
        const res = await fetch(STATUS_API_URL, {
            cache: 'no-store',
            signal: controller.signal,
        });
        if (!res.ok) {
            renderStatusError();
            return;
        }

        const data = await res.json();
        renderStatus(data);

        if (!data.online) {
            cachedPlayerNames = [];
            renderPlayerList(cachedPlayerNames, 'サーバーは現在オフラインです');
            return;
        }

        const names = playerNamesFromStatus(data);
        if (names !== null) {
            cachedPlayerNames = names;
            renderPlayerList(cachedPlayerNames);
            return;
        }

        const onlineCount = data.players?.online || 0;
        if (onlineCount > 0) {
            renderPlayerList([], `${onlineCount} 人がオンラインです`);
            return;
        }

        renderPlayerList([]);
    } catch {
        renderStatusError();
    } finally {
        window.clearTimeout(timeoutId);
    }
}

function initCopyButton() {
    const button = document.getElementById('copy-server-address');
    if (!button) return;

    const label = button.dataset.copyLabel || SERVER_ADDRESS;
    const copiedLabel = button.dataset.copiedLabel || 'コピーしました';
    button.textContent = label;

    async function copyServerAddress() {
        try {
            await navigator.clipboard.writeText(SERVER_ADDRESS);
            return true;
        } catch {}

        const textarea = document.createElement('textarea');
        textarea.value = SERVER_ADDRESS;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '0';
        textarea.style.top = '0';
        textarea.style.opacity = '0';
        textarea.style.pointerEvents = 'none';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);

        try {
            return document.execCommand('copy');
        } catch {
            return false;
        } finally {
            textarea.remove();
        }
    }

    button.addEventListener('click', async () => {
        const copied = await copyServerAddress();
        button.textContent = copied ? copiedLabel : SERVER_ADDRESS;
        button.classList.toggle('is-copied', copied);
        setTimeout(() => {
            button.textContent = label;
            button.classList.remove('is-copied');
        }, 1800);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.mod-list li').forEach((item, i) => {
        item.style.opacity = 0;
        item.style.transform = 'translateX(-40px) scale(0.95)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.7s cubic-bezier(.77,0,.18,1), transform 0.7s cubic-bezier(.77,0,.18,1), box-shadow 0.3s ease';
            item.style.opacity = 1;
            item.style.transform = 'translateX(0) scale(1)';
        }, 200 + i * 100);
    });

    initCopyButton();
    initParticles();
    initGoldParticles();
    loadServerStatus();
    setInterval(loadServerStatus, POLL_MS);
});

function initParticles() {
    const container = document.querySelector('.minecraft-particles');
    if (!container) return;

    const particleTypes = ['*', '+', 'o', '.'];
    const colors = ['#ffdd44', '#ff6600', '#55aa55', '#aa55aa', '#55aaaa'];

    function createParticle() {
        const particle = document.createElement('div');
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 4 + 3;
        const delay = Math.random() * 2;

        particle.textContent = type;
        particle.style.cssText = `
            position: absolute;
            left: ${left}%;
            bottom: -20px;
            color: ${color};
            font-size: ${size}px;
            opacity: 0;
            pointer-events: none;
            animation: particleFloat ${duration}s ease-out ${delay}s infinite;
            text-shadow: 0 0 10px ${color};
        `;

        container.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) particle.remove();
        }, (duration + delay) * 3000);
    }

    for (let i = 0; i < 15; i++) {
        setTimeout(createParticle, i * 200);
    }

    setInterval(createParticle, 800);
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.8;
        }
        90% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

function initGoldParticles() {
    const container = document.querySelector('.gold-particles');
    if (!container) return;

    const positions = [
        { x: 5, y: 10, delay: 0 },
        { x: 15, y: 30, delay: 1 },
        { x: 25, y: 15, delay: 2 },
        { x: 35, y: 45, delay: 0.5 },
        { x: 45, y: 20, delay: 1.5 },
        { x: 55, y: 35, delay: 2.5 },
        { x: 65, y: 10, delay: 3 },
        { x: 75, y: 50, delay: 1.2 },
        { x: 85, y: 25, delay: 2.2 },
        { x: 95, y: 40, delay: 0.8 },
    ];

    positions.forEach((pos, i) => {
        const particle = document.createElement('div');
        particle.className = 'gold-particle';
        particle.style.left = `${pos.x}%`;
        particle.style.top = `${pos.y}%`;
        particle.style.animationDelay = `${pos.delay + i * 0.3}s`;
        container.appendChild(particle);
    });
}
