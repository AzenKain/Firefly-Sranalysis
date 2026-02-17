import { CharacterBasic, MonsterBasic } from '@/types';
import { create } from 'zustand'


interface AvatarDataState {
    listAvatar: CharacterBasic[];
    mapAvatar: Record<string, CharacterBasic>;
    listEnemy: MonsterBasic[];
    mapEnemy: Record<string, MonsterBasic>;
    setListAvatar: (list: CharacterBasic[]) => void;
    setMapAvatar: (data: Record<string, CharacterBasic>) => void;
    setListEnemy: (list: MonsterBasic[]) => void;
    setMapEnemy: (data: Record<string, MonsterBasic>) => void;


}

const useAvatarDataStore = create<AvatarDataState>((set) => ({
    listAvatar: [],
    listEnemy: [],
    mapAvatar: {},
    mapEnemy: {},
    setListAvatar: (list: CharacterBasic[]) => set({ listAvatar: list }),
    setMapAvatar: (data: Record<string, CharacterBasic>) => set({ mapAvatar: data }),
    setListEnemy: (list: MonsterBasic[]) => set({ listEnemy: list }),
    setMapEnemy: (data: Record<string, MonsterBasic>) => set({ mapEnemy: data })

}));

export default useAvatarDataStore;