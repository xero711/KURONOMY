const SERVER_ADDRESS = 'xero-x.me';
const STATUS_API_ENDPOINTS = [
    { source: 'mcstatus', url: `https://api.mcstatus.io/v2/status/java/${SERVER_ADDRESS}` },
    { source: 'mcsrvstat', url: `https://api.mcsrvstat.us/3/${SERVER_ADDRESS}` },
];
const POLL_MS = 3000;
const REALTIME_FALLBACK_POLL_MS = 15000;
const REALTIME_STALE_MS = 30000;
const FETCH_TIMEOUT_MS = 4500;
const NIL_UUID = '00000000-0000-0000-0000-000000000000';
const PAGE_PARAMS = new URLSearchParams(window.location.search);
const REALTIME_STATUS_BASE = String(PAGE_PARAMS.get('statusBase') || window.KURONOMY_REALTIME_STATUS_BASE || '').replace(/\/$/, '');
const REALTIME_STATUS_EVENTS_URL = window.KURONOMY_REALTIME_EVENTS_URL
    || (REALTIME_STATUS_BASE ? `${REALTIME_STATUS_BASE}/events` : '');

let cachedPlayerNames = [];
let statusRequestId = 0;
let statusRequestInFlight = false;
let realtimeStatusConnected = false;
let realtimeStatusEverConnected = false;
let lastRealtimeStatusAt = 0;
let realtimeStatusSource = null;

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

function cacheBustedUrl(url) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}_=${Date.now()}`;
}

function isRealtimeEndpointAllowed(url) {
    if (!url) {
        return false;
    }

    try {
        const endpoint = new URL(url, window.location.href);
        return !(window.location.protocol === 'https:' && endpoint.protocol === 'http:');
    } catch {
        return false;
    }
}

function hasFreshRealtimeStatus() {
    return realtimeStatusConnected && Date.now() - lastRealtimeStatusAt < REALTIME_STALE_MS;
}

function timestampToMs(value) {
    const timestamp = Number(value);
    if (!Number.isFinite(timestamp) || timestamp <= 0) {
        return null;
    }
    return timestamp < 10000000000 ? timestamp * 1000 : timestamp;
}

function isPlaceholderPlayer(player, name) {
    const uuid = typeof player?.uuid === 'string' ? player.uuid.toLowerCase() : '';
    const normalizedName = String(name || '').trim().toLowerCase();

    return uuid === NIL_UUID
        || normalizedName === 'anonymous'
        || normalizedName === 'anonymous player'
        || normalizedName === 'unknown'
        || normalizedName === 'unknown player'
        || normalizedName === '匿名'
        || normalizedName === '匿名プレイヤー';
}

function playerNamesFromStatus(status) {
    const players = status.players || {};
    const list = players.list || players.sample || players.names;
    if (!Array.isArray(list)) {
        return null;
    }

    return list
        .map((player) => {
            let name = '';
            if (typeof player === 'string') name = player;
            else if (player && typeof player.name === 'string') name = player.name;
            else if (player && typeof player.username === 'string') name = player.username;
            else if (player && typeof player.name_clean === 'string') name = player.name_clean;
            else if (player && typeof player.name_raw === 'string') name = player.name_raw;

            if (isPlaceholderPlayer(player, name)) return '';
            return name;
        })
        .filter(Boolean);
}

function statusFreshnessTime(status) {
    return status.retrievedAt || status.fetchedAt || 0;
}

function chooseBestStatus(statuses) {
    const statusInfos = statuses.map((status) => {
        const names = playerNamesFromStatus(status);
        return {
            status,
            names,
            onlineCount: status.players?.online || 0,
            freshness: statusFreshnessTime(status),
        };
    });
    const newestStatusTime = Math.max(0, ...statusInfos.map((info) => info.freshness));
    const newestEmptyStatus = statusInfos
        .filter((info) => info.status.online && info.onlineCount === 0 && (!info.names || info.names.length === 0))
        .sort((a, b) => b.freshness - a.freshness)[0];
    let best = null;

    for (const { status, names, onlineCount, freshness } of statusInfos) {
        const lagMs = newestStatusTime - freshness;
        let score = status.online ? 1 : 0;

        if (status.online && onlineCount > 0) {
            score = 2;
        }

        if (status.online && names && names.length > 0) {
            score = 3;
        }

        if (names && names.length > 0 && newestEmptyStatus && newestEmptyStatus.freshness - freshness > 10000) {
            score -= 4;
        } else if (lagMs > 60000) {
            score -= 3;
        } else if (lagMs > 20000) {
            score -= 1;
        }

        if (!best || score > best.score || (score === best.score && freshness > best.freshness)) {
            best = { status, names, score, freshness };
        }
    }

    return best;
}

function playerListUnavailableMessage(status, onlineCount) {
    if (status.debug && status.debug.query === false) {
        return `${onlineCount} 人がオンラインです。名前一覧は UDP Query の公開待ちです`;
    }
    return `${onlineCount} 人がオンラインです。名前一覧はステータスAPIの反映待ちです`;
}

function createPlayerListItem(name) {
    const li = document.createElement('li');
    li.className = 'player-list__item is-new';
    li.dataset.playerName = name;

    const dot = el('span', { className: 'player-list__dot' });
    const span = el('span', { className: 'player-list__name', text: name });
    li.appendChild(dot);
    li.appendChild(span);
    li.addEventListener('animationend', () => li.classList.remove('is-new'), { once: true });

    return li;
}

function renderPlayerList(names, message) {
    const playerList = document.getElementById('player-list');
    if (!playerList) {
        return;
    }

    if (message) {
        const currentMessage = playerList.querySelector('.player-list__empty');
        if (playerList.children.length === 1 && currentMessage && currentMessage.textContent === message) {
            return;
        }
        playerList.replaceChildren(el('li', { className: 'player-list__empty', text: message }));
        return;
    }

    if (names.length > 0) {
        const existingItems = new Map(
            [...playerList.querySelectorAll('.player-list__item[data-player-name]')]
                .map((item) => [item.dataset.playerName, item]),
        );
        const desiredNames = [...new Set(names)];

        for (const item of existingItems.values()) {
            if (!desiredNames.includes(item.dataset.playerName)) {
                item.remove();
            }
        }

        playerList.querySelectorAll('.player-list__empty').forEach((item) => item.remove());

        desiredNames.forEach((name, index) => {
            const item = existingItems.get(name) || createPlayerListItem(name);
            const currentAtIndex = playerList.children[index];
            if (currentAtIndex !== item) {
                playerList.insertBefore(item, currentAtIndex || null);
            }
        });

        while (playerList.children.length > desiredNames.length) {
            playerList.lastElementChild.remove();
        }
        return;
    }

    const emptyMessage = '現在オンラインのプレイヤーはいません';
    const currentMessage = playerList.querySelector('.player-list__empty');
    if (playerList.children.length === 1 && currentMessage && currentMessage.textContent === emptyMessage) {
        return;
    }
    playerList.replaceChildren(el('li', { className: 'player-list__empty', text: emptyMessage }));
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
    const version = typeof status.version === 'string'
        ? status.version
        : status.version?.name_clean || status.version?.name_raw || status.protocol?.name || 'Java 1.20.1 Fabric';
    const motd = firstLine(status.motd?.clean);
    const statusNote = online
        ? (status.note || motd || '公開ステータス API から取得しています')
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

function renderStatusResult(bestStatus, bestNames) {
    renderStatus(bestStatus);

    if (!bestStatus.online) {
        cachedPlayerNames = [];
        renderPlayerList(cachedPlayerNames, 'サーバーは現在オフラインです');
        return;
    }

    if (bestNames && bestNames.length > 0) {
        cachedPlayerNames = bestNames;
        renderPlayerList(cachedPlayerNames);
        return;
    }

    const onlineCount = bestStatus.players?.online || 0;
    if (onlineCount > 0) {
        renderPlayerList([], playerListUnavailableMessage(bestStatus, onlineCount));
        return;
    }

    cachedPlayerNames = [];
    renderPlayerList([]);
}

function normalizeStatus(data, source) {
    if (source === 'mcstatus') {
        return {
            source,
            online: Boolean(data.online),
            players: {
                online: data.players?.online ?? 0,
                max: data.players?.max ?? 80,
                list: data.players?.list || [],
            },
            version: data.version?.name_clean || data.version?.name_raw || data.version?.name || 'Java 1.20.1 Fabric',
            motd: {
                clean: data.motd?.clean || '',
            },
            hostname: data.srv_record?.host || data.host || SERVER_ADDRESS,
            retrievedAt: timestampToMs(data.retrieved_at),
            expiresAt: timestampToMs(data.expires_at),
        };
    }

    return {
        ...data,
        source,
        retrievedAt: timestampToMs(data.debug?.cachetime),
        expiresAt: timestampToMs(data.debug?.cacheexpire),
    };
}

async function fetchStatus(endpoint) {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
        const res = await fetch(cacheBustedUrl(endpoint.url), {
            cache: 'no-store',
            signal: controller.signal,
        });
        if (!res.ok) {
            throw new Error(`Status API failed: ${res.status}`);
        }

        const data = await res.json();
        const status = normalizeStatus(data, endpoint.source);
        status.fetchedAt = Date.now();
        return status;
    } finally {
        window.clearTimeout(timeoutId);
    }
}

async function loadServerStatus() {
    if (hasFreshRealtimeStatus()) {
        return;
    }

    if (statusRequestInFlight) {
        return;
    }

    const requestId = ++statusRequestId;
    const statuses = [];
    statusRequestInFlight = true;

    function renderBestStatus(final = false) {
        if (requestId !== statusRequestId || statuses.length === 0) {
            return;
        }

        const best = chooseBestStatus(statuses);
        if (!best) {
            return;
        }

        if (!final && (best.score < 3 || best.status.source !== 'mcstatus')) {
            return;
        }

        renderStatusResult(best.status, best.names);
    }

    try {
        await Promise.allSettled(
            STATUS_API_ENDPOINTS.map(async (endpoint) => {
                const status = await fetchStatus(endpoint);
                statuses.push(status);
                renderBestStatus(false);
            }),
        );

        if (requestId !== statusRequestId) {
            return;
        }

        if (statuses.length === 0) {
            renderStatusError();
            return;
        }

        renderBestStatus(true);
    } finally {
        if (requestId === statusRequestId) {
            statusRequestInFlight = false;
        }
    }
}

function normalizeRealtimeStatus(status) {
    const players = status.players || {};
    const list = Array.isArray(players.list) ? players.list : [];
    const onlineCount = Number.isFinite(players.online) ? players.online : list.length;
    const maxPlayers = Number.isFinite(players.max) ? players.max : 50;

    return {
        ...status,
        source: status.source || 'kuronomy-realtime',
        realtime: true,
        online: Boolean(status.online),
        players: {
            online: onlineCount,
            max: maxPlayers,
            list,
        },
        version: status.version || 'Java 1.20.1 Fabric',
        motd: status.motd || { clean: '' },
        note: status.note || 'リアルタイム接続中: 参加/退出を即時反映しています',
        fetchedAt: Date.now(),
    };
}

function renderRealtimeStatus(status) {
    const normalized = normalizeRealtimeStatus(status);
    const names = playerNamesFromStatus(normalized) || [];

    realtimeStatusConnected = true;
    realtimeStatusEverConnected = true;
    lastRealtimeStatusAt = Date.now();
    renderStatusResult(normalized, names);
}

function initRealtimeStatus() {
    if (!window.EventSource || !isRealtimeEndpointAllowed(REALTIME_STATUS_EVENTS_URL)) {
        return false;
    }

    realtimeStatusSource = new EventSource(REALTIME_STATUS_EVENTS_URL);

    function handleMessage(event) {
        if (!event.data) {
            return;
        }

        try {
            renderRealtimeStatus(JSON.parse(event.data));
        } catch {
            realtimeStatusConnected = false;
        }
    }

    realtimeStatusSource.addEventListener('status', handleMessage);
    realtimeStatusSource.onmessage = handleMessage;
    realtimeStatusSource.onopen = () => {
        realtimeStatusConnected = true;
    };
    realtimeStatusSource.onerror = () => {
        realtimeStatusConnected = false;
        if (realtimeStatusEverConnected) {
            setText('status-note', 'リアルタイム接続を再試行しています');
        } else {
            loadServerStatus();
        }
    };

    return true;
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

function initModCards() {
    document.querySelectorAll('.mod-list li[data-page]').forEach((item) => {
        const modName = item.querySelector('.modname')?.textContent?.trim() || 'MOD';

        item.setAttribute('role', 'link');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', `${modName} の日本語解説を開く`);

        function openGuide() {
            window.location.href = item.dataset.page;
        }

        item.addEventListener('click', (event) => {
            if (event.target.closest('a, button')) return;
            openGuide();
        });

        item.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            openGuide();
        });
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
    initModCards();
    initParticles();
    initGoldParticles();
    const realtimeConfigured = initRealtimeStatus();
    if (realtimeConfigured) {
        window.setTimeout(() => {
            if (!hasFreshRealtimeStatus()) {
                loadServerStatus();
            }
        }, 1500);
    } else {
        loadServerStatus();
    }
    setInterval(loadServerStatus, realtimeConfigured ? REALTIME_FALLBACK_POLL_MS : POLL_MS);

    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            loadServerStatus();
        }
    });
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
