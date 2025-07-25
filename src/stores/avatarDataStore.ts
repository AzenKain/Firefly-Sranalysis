import { AvatarHakushiType, EnemyHakushiType } from '@/types';
import { create } from 'zustand'


interface AvatarDataState {
    listAvatar: AvatarHakushiType[];
    listEnemy: EnemyHakushiType[];
    setListAvatar: (list: AvatarHakushiType[]) => void;
    setListEnemy: (list: EnemyHakushiType[]) => void;
}

const useAvatarDataStore = create<AvatarDataState>((set) => ({
    listAvatar: [],
    listEnemy: [],
    setListAvatar: (list: AvatarHakushiType[]) => set({ listAvatar: list }),
    setListEnemy: (list: EnemyHakushiType[]) => set({ listEnemy: list }),
}));

export default useAvatarDataStore;