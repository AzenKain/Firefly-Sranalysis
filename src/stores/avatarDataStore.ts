import { AvatarType } from '@/types';
import { create } from 'zustand'


interface AvatarDataState {
    listAvatar: AvatarType[];
    setListAvatar: (list: AvatarType[]) => void;
}

const useAvatarDataStore = create<AvatarDataState>((set) => ({
    listAvatar: [],
    setListAvatar: (list: AvatarType[]) => set({ listAvatar: list }),

}));

export default useAvatarDataStore;