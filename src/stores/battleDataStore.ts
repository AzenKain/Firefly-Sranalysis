import { AttackResultType, AvatarSkillType, BattleEndType, KillType, LineUpType, TurnBeginType, TurnEndType } from '@/types';
import { AvatarBattleInfo, BattleDataStateJson, TurnBattleInfo } from '@/types/mics';
import { create } from 'zustand'


interface BattleDataState {
    lineup: AvatarBattleInfo[];
    turnHistory: TurnBattleInfo[]
    totalAV: number;
    totalDamage: number;
    damagePerAV: number;

    onSetBattleLineupService: (data: LineUpType) => void;
    onTurnEndService: (data: TurnEndType) => void;
    onBattleEndService: (data: BattleEndType) => void;
    onUseSkillService: (data: AvatarSkillType) => void;
    onKillService: (data: KillType) => void
    onDamageService: (data: AttackResultType) => void;
    onBattleStartService: () => void;
    onTurnBeginService: (data: TurnBeginType) => void;
    loadBattleDataFromJSON: (data: BattleDataStateJson) => void;
}

const useBattleDataStore = create<BattleDataState>((set, get) => ({
    lineup: [],
    turnHistory: [],
    totalAV: 0,
    totalDamage: 0,
    damagePerAV: 0,

    loadBattleDataFromJSON: (data: BattleDataStateJson) => {
        set({
            lineup: data.lineup,
            turnHistory: data.turnHistory,
            totalAV: data.totalAV,
            totalDamage: data.totalDamage,
            damagePerAV: data.damagePerAV,
        })
    },
    onBattleStartService: () => {
        set({
            lineup: [],
            turnHistory: [],
            totalAV: 0,
            totalDamage: 0,
            damagePerAV: 0,
        })
    },
    onDamageService: (data: AttackResultType) => {
        const turnHistorys = get().turnHistory
        const turnIdx = turnHistorys.findLastIndex(it => it.avatarId === data.attacker.id)
        if (turnIdx === -1) {
            return
        }
        const newTh = [...turnHistorys]
        newTh[turnIdx].damageDetail.push(data.damage)
        newTh[turnIdx].totalDamage += data.damage
        set({
            turnHistory: newTh,
            totalDamage: get().totalDamage + data.damage,
            damagePerAV: (get().totalDamage + data.damage) / (get().totalAV === 0 ? 1 : get().totalAV)
        })
    },

    onKillService: (data: KillType) => {
        const lineups = get().lineup
        const avatarIdx = lineups.findIndex(it => it.avatarId === data.attacker.id)
        if (avatarIdx === -1) {
            return
        }
        const newLn = [...lineups]
        newLn[avatarIdx].isDie = true
        set({
            lineup: newLn
        })
    },
    onSetBattleLineupService: (data: LineUpType) => {
        const lineups: AvatarBattleInfo[] = []
        for (const avatar of data.avatars) {
            lineups.push({ avatarId: avatar.id, isDie: false } as AvatarBattleInfo)
        }
        set({
            lineup: lineups,
            turnHistory: [],
            totalAV: 0,
            totalDamage: 0,
            damagePerAV: 0,
        });
    },
    onTurnBeginService: (data: TurnBeginType) => {
        set((state) => ({
            totalAV: data.action_value,
            damagePerAV: state.totalDamage / (data.action_value === 0 ? 1 : data.action_value)
        }))
    },
    onTurnEndService: (data: TurnEndType) => {
        set((state) => ({
            totalDamage: state.totalDamage === data.total_damage ? data.total_damage : state.totalDamage,
            totalAV: data.action_value,
            damagePerAV: (state.totalDamage === data.total_damage ? data.total_damage : state.totalDamage) / (data.action_value === 0 ? 1 : data.action_value)
        }));
    },
    onUseSkillService: (data: AvatarSkillType) => {
        set((state) => ({
            turnHistory: [...state.turnHistory, {
                avatarId: data.avatar.id,
                damageDetail: [],
                totalDamage: 0,
                actionValue: state.totalAV,
                skillType: data.skill.type,
                skillName: data.skill.name
            } as TurnBattleInfo]
        }))
    },
    onBattleEndService: (data: BattleEndType) => {
        const lineups: AvatarBattleInfo[] = []
        for (const avatar of data.avatars) {
            lineups.push({ avatarId: avatar.id, isDie: false } as AvatarBattleInfo)
        }
        set({
            lineup: lineups,
            totalDamage: data.total_damage,
            totalAV: data.action_value,
            damagePerAV: data.total_damage / (data.action_value === 0 ? 1 : data.action_value)
        })
    }
}));

export default useBattleDataStore;