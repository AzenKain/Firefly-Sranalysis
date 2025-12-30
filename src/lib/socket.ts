import { io, Socket } from "socket.io-client";
import useSocketStore from "@/stores/socketSettingStore";
import { toast } from "react-toastify";
import useBattleDataStore from "@/stores/battleDataStore";
import type {
    AvatarAnalysisJson,
    BattleBeginType,
    BattleEndType,
    DamageType,
    EntityDefeatedType,
    InitializeEnemyType,
    SetBattleLineupType,
    StatChangeType,
    TurnBeginType,
    TurnEndType,
    UpdateCycleType,
    UpdateTeamFormationType,
    UpdateWaveType,
    UseSkillType,
    VersionType,
} from "@/types";

let socket: Socket | null = null;

const notify = (msg: string, type: "info" | "success" | "error" = "info") => {
    if (type === "success") toast.success(msg);
    else if (type === "error") toast.error(msg);
    else toast.info(msg);
};

interface SocketEvents {
    Connected: VersionType;
    OnBattleBegin: BattleBeginType;
    OnSetBattleLineup: SetBattleLineupType;
    OnDamage: DamageType;
    OnTurnBegin: TurnBeginType;
    OnTurnEnd: TurnEndType;
    OnEntityDefeated: EntityDefeatedType;
    OnUseSkill: UseSkillType;
    OnUpdateWave: UpdateWaveType;
    OnUpdateCycle: UpdateCycleType;
    OnStatChange: StatChangeType;
    OnUpdateTeamFormation: UpdateTeamFormationType;
    OnInitializeEnemy: InitializeEnemyType;
    OnBattleEnd: BattleEndType;
    OnCreateBattle: AvatarAnalysisJson[];
    Error: string;
}

type ListenerMap = {
    [K in keyof SocketEvents]: (payload: SocketEvents[K]) => void;
};

let listeners: ListenerMap | null = null;

let workerPool: Worker[] | null = null;
let nextWorker = 0;
let reqId = 1;
const pendingMap = new Map<number, (res: { parsed: unknown | null; err?: string }) => void>();
let workerBlobUrl: string | null = null;

const createWorkerPool = (size = Math.max(1, (navigator.hardwareConcurrency || 4) - 1)) => {
    if (workerPool) return workerPool;
    const code = `self.onmessage = function(e) { try { const { id, raw } = e.data; const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw; self.postMessage({ id, parsed }); } catch (err) { self.postMessage({ id, err: err && err.message ? err.message : String(err) }); } }`;

    if (!workerBlobUrl) {
        const blob = new Blob([code], { type: 'application/javascript' });
        workerBlobUrl = URL.createObjectURL(blob);
    }
    
    workerPool = Array.from({ length: size }).map(() => new Worker(workerBlobUrl!));
    workerPool.forEach((w) => {
        w.onmessage = (ev) => {
            const { id, parsed, err } = ev.data as { id: number; parsed: unknown; err?: string };
            const cb = pendingMap.get(id);
            if (cb) {
                cb({ parsed: parsed ?? null, err });
                pendingMap.delete(id);
            }
        };
        w.onerror = (ev) => {
            console.error('worker error', ev.message);
        };
    });
    return workerPool;
};

const parseWithWorker = (raw: unknown): Promise<{ parsed: unknown | null; err?: string }> => {
    if (!workerPool) createWorkerPool();
    if (!workerPool) return Promise.resolve({ parsed: null, err: 'no worker' });
    const id = reqId++;
    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            pendingMap.delete(id);
            resolve({ parsed: null, err: "worker timeout" });
        }, 3000);

        pendingMap.set(id, (res) => {
            clearTimeout(timeout);
            resolve(res);
        });

        const w = workerPool![nextWorker];
        nextWorker = (nextWorker + 1) % workerPool!.length;
        try {
            w.postMessage({ id, raw });
        } catch (err) {
            pendingMap.delete(id);
            resolve({ parsed: null, err: err && (err as Error).message ? (err as Error).message : String(err) });
        }
    });
};

let eventQueue: { name: keyof SocketEvents; data: unknown }[] = [];
let rafScheduled = false;
const MAX_QUEUE = 1000;

const flushQueue = () => {
    const items = eventQueue.splice(0, eventQueue.length);
    if (items.length === 0) return;
    const l = listeners;
    if (!l) return;
    for (const it of items) {
        try {
            l[it.name](it.data as never);
        } catch (err) {
            console.error('listener handler error', err);
        }
    }
};

const scheduleFlush = () => {
    if (rafScheduled) return;
    rafScheduled = true;
    requestAnimationFrame(() => {
        rafScheduled = false;
        flushQueue();
    });
};

const safeEnqueue = (name: keyof SocketEvents, data: unknown) => {
    if (eventQueue.length > MAX_QUEUE) {
        eventQueue.shift();
    }
    eventQueue.push({ name, data });
    scheduleFlush();
};

export const connectSocket = async (): Promise<Socket> => {
    const { host, port, connectionType, setStatus } = useSocketStore.getState();
    let url = `${host}:${port}`;
    if (connectionType === "Native") url = "http://localhost:1305";
    else if (connectionType === "PS") url = "http://localhost:21000";

    if (socket) socket.disconnect();

    socket = io(url, {
        reconnectionAttempts: 5,
        timeout: 10000,
        autoConnect: true,
    });

    socket.on("connect", () => {
        setStatus(true);
        notify(`Connected: ${socket?.id}`, "success");
    });

    socket.on("disconnect", () => setStatus(false));
    socket.on("connect_error", () => setStatus(false));
    socket.on("connect_timeout", () => setStatus(false));
    socket.on("reconnect_failed", () => setStatus(false));

    listeners = {
        Connected: (payload) => useBattleDataStore.getState().onConnectedService(payload),
        OnBattleBegin: (payload) => {
            notify("Battle Started!", "info");
            useBattleDataStore.getState().onBattleBeginService(payload);
        },
        OnSetBattleLineup: (payload) => useBattleDataStore.getState().onSetBattleLineupService(payload),
        OnDamage: (payload) => useBattleDataStore.getState().onDamageService(payload),
        OnTurnBegin: (payload) => useBattleDataStore.getState().onTurnBeginService(payload),
        OnTurnEnd: (payload) => useBattleDataStore.getState().onTurnEndService(payload),
        OnEntityDefeated: (payload) => useBattleDataStore.getState().onEntityDefeatedService(payload),
        OnUseSkill: (payload) => useBattleDataStore.getState().onUseSkillService(payload),
        OnUpdateWave: (payload) => useBattleDataStore.getState().onUpdateWaveService(payload),
        OnUpdateCycle: (payload) => useBattleDataStore.getState().onUpdateCycleService(payload),
        OnStatChange: (payload) => useBattleDataStore.getState().onStatChange(payload),
        OnUpdateTeamFormation: (payload) => useBattleDataStore.getState().onUpdateTeamFormation(payload),
        OnInitializeEnemy: (payload) => useBattleDataStore.getState().onInitializeEnemyService(payload),
        OnBattleEnd: (payload) => useBattleDataStore.getState().onBattleEndService(payload),
        OnCreateBattle: (payload) => useBattleDataStore.getState().onCreateBattleService(payload),
        Error: (msg) => console.error("Server Error:", msg),
    };

    const register = (eventName: string) => {
        socket?.on(eventName, async (raw: unknown) => {
            if (!listeners) return;
            if (workerPool) {
                const res = await parseWithWorker(raw);
                if (res.err) {
                    safeEnqueue("Error", `Worker parse error for ${eventName}: ${res.err}`);
                } else if (res.parsed !== null) {
                    safeEnqueue(eventName as keyof SocketEvents, res.parsed);
                }
            } else {
                try {
                    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
                    safeEnqueue(eventName as keyof SocketEvents, parsed);
                } catch (err) {
                    safeEnqueue("Error", `Parse error for ${eventName}: ${err && (err as Error).message ? (err as Error).message : String(err)}`);
                }
            }
        });
    };

    Object.keys(listeners).forEach((k) => register(k));

    createWorkerPool();

    return socket;
};

export const disconnectSocket = (): void => {
    if (!socket) return;
    if (listeners) {
        Object.keys(listeners).forEach((eventName) => {
            socket?.off(eventName);
        });
    }
    if (workerBlobUrl) {
        URL.revokeObjectURL(workerBlobUrl);
        workerBlobUrl = null;
    }
    socket.disconnect();
    useSocketStore.getState().setStatus(false);
    listeners = null;
    if (workerPool) {
        workerPool.forEach((w) => w.terminate());
        workerPool = null;
    }
    pendingMap.clear();
    eventQueue = [];
};

export const isSocketConnected = (): boolean => socket?.connected || false;
export const getSocket = (): Socket | null => socket;

export const setWorkerPoolSize = (size: number) => {
    if (workerPool) {
        workerPool.forEach((w) => w.terminate());
        workerPool = null;
    }
    createWorkerPool(Math.max(1, size));
};

