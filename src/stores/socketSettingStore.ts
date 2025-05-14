import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SocketState {
    host: string;
    port: number;
    status: boolean;
    connectionType: string;
    setHost: (host: string) => void;
    setConnectionType: (host: string) => void;
    setPort: (port: number) => void;
    setStatus: (status: boolean) => void;
}

const useSocketStore = create<SocketState>()(
    persist(
        (set) => ({
            host: "http://localhost",
            port: 3443,
            status: false,
            connectionType: "Native",
            setHost: (host: string) => set({ host }),
            setConnectionType: (connectionType: string) => set({ connectionType }),
            setPort: (port: number) => set({ port }),
            setStatus: (status: boolean) => set({ status }),
        }),
        {
            name: 'socket-storage',
        }
    )
);

export default useSocketStore;
