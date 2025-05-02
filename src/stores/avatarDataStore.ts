import { AvatarHakushiType } from '@/types';
import { create } from 'zustand'


interface AvatarDataState {
    listAvatar: AvatarHakushiType[];
    setListAvatar: (list: AvatarHakushiType[]) => void;
}

const useAvatarDataStore = create<AvatarDataState>((set) => ({
    listAvatar: [],
    setListAvatar: (list: AvatarHakushiType[]) => set({ listAvatar: list }),

}));

export default useAvatarDataStore;