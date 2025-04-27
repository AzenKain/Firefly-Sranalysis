import { io, Socket } from "socket.io-client";
import useSocketStore from "@/stores/socketSettingStore";
import { toast } from 'react-toastify';
import useBattleDataStore from "@/stores/battleDataStore";

let socket: Socket | null = null;


const onBattleBegin = () => {
    notify("Battle Started!", "info")
}

const notify = (msg: string, type: 'info' | 'success' | 'error' = 'info') => {
    if (type === 'success') toast.success(msg);
    else if (type === 'error') toast.error(msg);
    else toast.info(msg);
};

export const connectSocket = (): Socket => {
    const { host, port, connectionType, setStatus } = useSocketStore.getState();
    const { 
        onSetBattleLineupService,
        onTurnEndService,
        onUseSkillService,
        onKillService,
        onDamageService,
        onBattleEndService,
        onTurnBeginService
    } = useBattleDataStore.getState();

    let url = `${host}:${port}`;
    if (connectionType === "FireflyPSLocal") {
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

    if (isSocketConnected()) onConnect();

    socket.on("SetBattleLineup", (json) => onSetBattleLineupService(JSON.parse(json)));
    socket.on("TurnEnd", (json) => onTurnEndService(JSON.parse(json)));
    socket.on("OnTurnEnd", (json) => onTurnEndService(JSON.parse(json)));
    socket.on("OnUseSkill", (json) => onUseSkillService(JSON.parse(json)));
    socket.on("OnKill", (json) => onKillService(JSON.parse(json)));
    socket.on("OnDamage", (json) => onDamageService(JSON.parse(json)));
    socket.on('BattleBegin', () => onBattleBegin());
    socket.on('OnBattleBegin', () => onBattleBegin());
    socket.on('TurnBegin', (json) => onTurnBeginService(JSON.parse(json)));
    socket.on('OnTurnBegin', (json) => onTurnBeginService(JSON.parse(json)));
    socket.on('BattleEnd', (json) => onBattleEndService(JSON.parse(json)));
    socket.on('OnBattleEnd', (json) => onBattleEndService(JSON.parse(json)));

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
        onTurnBeginService
    } = useBattleDataStore.getState();
    if (socket) {
        socket.off("SetBattleLineup", (json) => onSetBattleLineupService(JSON.parse(json)));
        socket.off("TurnEnd", (json) => onTurnEndService(JSON.parse(json)));
        socket.off("OnTurnEnd", (json) => onTurnEndService(JSON.parse(json)));
        socket.off("OnUseSkill", (json) => onUseSkillService(JSON.parse(json)));
        socket.off("OnKill", (json) => onKillService(JSON.parse(json)));
        socket.off("OnDamage", (json) => onDamageService(JSON.parse(json)));
        socket.off('BattleBegin', () => onBattleBegin());
        socket.off('OnBattleBegin', () => onBattleBegin());
        socket.off('TurnBegin', (json) => onTurnBeginService(JSON.parse(json)));
        socket.off('OnTurnBegin', (json) => onTurnBeginService(JSON.parse(json)));
        socket.off('BattleEnd', (json) => onBattleEndService(JSON.parse(json)));
        socket.off('OnBattleEnd', (json) => onBattleEndService(JSON.parse(json)));
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
