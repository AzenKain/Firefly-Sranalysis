import { io, Socket } from "socket.io-client";
import useSocketStore from "@/stores/socketSettingStore";
import { toast } from 'react-toastify';
import useBattleDataStore from "@/stores/battleDataStore";
import { BattleBeginType } from "@/types";

let socket: Socket | null = null;


const notify = (msg: string, type: 'info' | 'success' | 'error' = 'info') => {
    if (type === 'success') toast.success(msg);
    else if (type === 'error') toast.error(msg);
    else toast.info(msg);
};

function safeParse(json: unknown | string) {
    try {
        return typeof json === "string" ? JSON.parse(json) : json;
    } catch (e) {
        console.error("JSON parse error:", e, json);
        return null;
    }
}


export const connectSocket = (): Socket => {
    const { host, port, connectionType, setStatus } = useSocketStore.getState();
    const { 
        onSetBattleLineupService,
        onTurnEndService,
        onUseSkillService,
        onKillService,
        onDamageService,
        onBattleEndService,
        onTurnBeginService,
        onBattleBeginService,
        onCreateBattleService,
        onUpdateCycleService,
        OnUpdateWaveService
    } = useBattleDataStore.getState();

    let url = `${host}:${port}`;
    if (connectionType === "Native") {
        url = "http://localhost:1305"
    }
    else if (connectionType === "PS") {
        url = "http://localhost:21000"
    }

    if (socket) {
        socket.disconnect();
    }

    socket = io(url, {
        reconnectionAttempts: 5,
        timeout: 10000,
        autoConnect: true,
    });

    socket.on("connect", () => {
        console.log("Socket connected");
        setStatus(true);
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected");
        setStatus(false);
    });

    socket.on("connect_error", (err) => {
        console.error("Connection error:", err);
        setStatus(false);
    });

    socket.on("connect_timeout", () => {
        console.warn("Connection timeout");
        setStatus(false);
    });

    socket.on("reconnect_failed", () => {
        console.error("Reconnect failed");
        setStatus(false);
    });

    const onConnect = () => {
        setStatus(true);
        notify(`Kết nối thành công với Socket ID: ${socket?.id}`, 'success');
    };
    const onBattleBegin = (data: BattleBeginType) => {
        notify("Battle Started!", "info")
        onBattleBeginService(data)
    }

    if (isSocketConnected()) onConnect();

    socket.on("OnSetBattleLineup", (json) => {
        const data = safeParse(json);
        if (data) onSetBattleLineupService(data);
    });

    socket.on("OnTurnEnd", (json) => {
        const data = safeParse(json);
        if (data) onTurnEndService(data);
    });

    socket.on("OnUseSkill", (json) => {
        const data = safeParse(json);
        if (data) onUseSkillService(data);
    });

    socket.on("OnKill", (json) => {
        const data = safeParse(json);
        if (data) onKillService(data);
    });

    socket.on("OnDamage", (json) => {
        const data = safeParse(json);
        if (data) onDamageService(data);
    });

    socket.on("OnBattleBegin", (json) => {
        const data = safeParse(json);
        if (data) onBattleBegin(data);
    });

    socket.on("OnTurnBegin", (json) => {
        const data = safeParse(json);
        if (data) onTurnBeginService(data);
    });

    socket.on("OnBattleEnd", (json) => {
        const data = safeParse(json);
        if (data) onBattleEndService(data);
    });

    socket.on("OnUpdateCycle", (json) => {
        const data = safeParse(json);
        if (data) onUpdateCycleService(data);
    });

    socket.on("OnUpdateWave", (json) => {
        const data = safeParse(json);
        if (data) OnUpdateWaveService(data);
    });

    socket.on("OnCreateBattle", (json) => {
        const data = safeParse(json);
        if (data) onCreateBattleService(data);
    });

    socket.on("Error", (msg: string) => {
        console.error("Server Error:", msg);
    });

    return socket;
};

export const disconnectSocket = (): void => {
    const { 
        onSetBattleLineupService,
        onTurnEndService,
        onUseSkillService,
        onKillService,
        onDamageService,
        onBattleEndService,
        onTurnBeginService,
        onBattleBeginService,
        onCreateBattleService,
        onUpdateCycleService,
        OnUpdateWaveService
    } = useBattleDataStore.getState();
    const onBattleBegin = (data: BattleBeginType) => {
        notify("Battle Started!", "info")
        onBattleBeginService(data)
    }
    if (socket) {
        socket.off("OnSetBattleLineup", (json) => onSetBattleLineupService(JSON.parse(json)));
        socket.off("OnTurnEnd", (json) => onTurnEndService(JSON.parse(json)));
        socket.off("OnUseSkill", (json) => onUseSkillService(JSON.parse(json)));
        socket.off("OnKill", (json) => onKillService(JSON.parse(json)));
        socket.off("OnDamage", (json) => onDamageService(JSON.parse(json)));
        socket.off('OnBattleBegin', (json) => onBattleBegin(JSON.parse(json)));
        socket.off('OnTurnBegin', (json) => onTurnBeginService(JSON.parse(json)));
        socket.off('OnBattleEnd', (json) => onBattleEndService(JSON.parse(json)));
        socket.off('OnUpdateCycle', (json) => onUpdateCycleService(JSON.parse(json)));
        socket.off('OnUpdateWave', (json) => OnUpdateWaveService(JSON.parse(json)));
        socket.off('OnCreateBattle', (json) => onCreateBattleService(JSON.parse(json)));
        socket.offAny();
        socket.disconnect();
        useSocketStore.getState().setStatus(false);
    }
};

export const isSocketConnected = (): boolean => {
    return socket?.connected || false;
};

export const getSocket = (): Socket | null => {
    return socket;
};
