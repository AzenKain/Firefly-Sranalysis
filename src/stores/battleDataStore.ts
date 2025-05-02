import { AttackResultType, AvatarAnalysisJson, AvatarSkillType, BattleBeginType, BattleEndType, DamageDetailType, KillType, LineUpType, TurnBeginType, TurnEndType, UpdateCycleType, UpdateWaveType } from '@/types';
import { AvatarBattleInfo, BattleDataStateJson, SkillBattleInfo, TurnBattleInfo } from '@/types/mics';
import { create } from 'zustand'


interface BattleDataState {
    lineup: AvatarBattleInfo[];
    turnHistory: TurnBattleInfo[]
    skillHistory: SkillBattleInfo[]
    dataAvatar: AvatarAnalysisJson[]
    totalAV: number;
    totalDamage: number;
    damagePerAV: number;
    cycleIndex: number;
    waveIndex: number;
    maxWave: number;
    maxCycle: number

    onSetBattleLineupService: (data: LineUpType) => void;
    onTurnEndService: (data: TurnEndType) => void;
    onBattleEndService: (data: BattleEndType) => void;
    onUseSkillService: (data: AvatarSkillType) => void;
    onKillService: (data: KillType) => void
    onDamageService: (data: AttackResultType) => void;
    onBattleBeginService: (data: BattleBeginType) => void;
    onTurnBeginService: (data: TurnBeginType) => void;
    onCreateBattleService: (data: AvatarAnalysisJson[]) => void;
    OnUpdateWaveService: (data: UpdateWaveType) => void;
    onUpdateCycleService: (data: UpdateCycleType) => void;
    loadBattleDataFromJSON: (data: BattleDataStateJson) => void;
}

const useBattleDataStore = create<BattleDataState>((set, get) => ({
    lineup: [],
    turnHistory: [],
    skillHistory: [],
    dataAvatar: [],
    totalAV: 0,
    totalDamage: 0,
    damagePerAV: 0,
    cycleIndex: 0,
    waveIndex: 1,
    maxWave: Infinity,
    maxCycle: Infinity,

    loadBattleDataFromJSON: (data: BattleDataStateJson) => {
        set({
            lineup: data.lineup,
            turnHistory: data.turnHistory,
            skillHistory: data.skillHistory,
            dataAvatar: data.dataAvatar,
            totalAV: data.totalAV,
            totalDamage: data.totalDamage,
            damagePerAV: data.damagePerAV,
            cycleIndex: data.cycleIndex,
            waveIndex: data.waveIndex,
            maxWave: data.maxWave,
            maxCycle: data.maxCycle
        })
    },
    onCreateBattleService: (data: AvatarAnalysisJson[]) => {
        set({
            dataAvatar: data
        })
    },
    onBattleBeginService: (data: BattleBeginType) => {
        const current = get()
        const updatedHistory = current.turnHistory.map(it => ({
            ...it,
            cycleIndex: data.max_cycles
        }))
        set({
            maxWave: data.max_waves,
            maxCycle: data.max_cycles,
            turnHistory: updatedHistory
        })
    },
    onDamageService: (data: AttackResultType) => {
        const skillHistory = get().skillHistory
        
        const skillIdx = skillHistory.findLastIndex(it => it.avatarId === data.attacker.id)
        if (skillIdx === -1) {
            return
        }
        const newTh = [...skillHistory]
        newTh[skillIdx].damageDetail.push({damage: data.damage, damage_type: data?.damage_type} as DamageDetailType)
        newTh[skillIdx].totalDamage += data.damage
        set({
            skillHistory: newTh,
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
        set((state) => ({
            lineup: lineups,
            turnHistory: [{
                avatarId: -1,
                actionValue: 0,
                waveIndex: 1,
                cycleIndex: state.maxCycle,
            } as TurnBattleInfo],
            skillHistory: [],
            totalAV: 0,
            totalDamage: 0,
            damagePerAV: 0,
            cycleIndex: state.maxCycle,
            waveIndex: 1,
        }));
    },
    onTurnBeginService: (data: TurnBeginType) => {

        set((state) => ({
            totalAV: data.action_value,
            damagePerAV: state.totalDamage / (data.action_value === 0 ? 1 : data.action_value),
            turnHistory: [...state.turnHistory, {
                avatarId: data?.turn_owner?.id,
                actionValue: data.action_value,
                waveIndex: state.waveIndex,
                cycleIndex: state.cycleIndex
            } as TurnBattleInfo]
        }))
    },
    onTurnEndService: (data: TurnEndType) => {
        set((state) => ({
            totalDamage: state.totalDamage === data.turn_info.total_damage ? data.turn_info.total_damage : state.totalDamage,
            currentAV: data.turn_info.action_value,
            damagePerAV: (state.totalDamage === data.turn_info.total_damage ? data.turn_info.total_damage : state.totalDamage) 
            / (data.turn_info.action_value === 0 ? 1 : data.turn_info.action_value)
        }));
    },
    onUseSkillService: (data: AvatarSkillType) => {

        set((state) => ({
            skillHistory: [...state.skillHistory, {
                avatarId: data.avatar.id,
                damageDetail: [],
                totalDamage: 0,
                skillType: data.skill.type,
                skillName: data.skill.name,
                turnBattleId: state.turnHistory.length-1
            } as SkillBattleInfo]
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
    },
    OnUpdateWaveService: (data: UpdateWaveType) => {
        set({
            waveIndex: data.wave
        })
    },
    onUpdateCycleService: (data: UpdateCycleType) => {
        set({
            cycleIndex: data.cycle
        })
    }
}));

export default useBattleDataStore;