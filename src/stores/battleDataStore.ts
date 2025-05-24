import { DamageType, AvatarAnalysisJson, UseSkillType, BattleBeginType, BattleEndType, DamageDetailType, EntityDefeatedType, SetBattleLineupType, TurnBeginType, TurnEndType, UpdateCycleType, UpdateWaveType, VersionType, StatType, StatChangeType, UpdateTeamFormationType } from '@/types';
import { InitializeEnemyType } from '@/types/enemy';
import { AvatarBattleInfo, AvatarInfo, BattleDataStateJson, EnemyInfo, SkillBattleInfo, TurnBattleInfo } from '@/types/mics';
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
    maxCycle: number;
    version?: string;
    avatarDetail?: Record<number, AvatarInfo>;
    enemyDetail?: Record<number, EnemyInfo>;

    onConnectedService: (data: VersionType) => void
    onBattleBeginService: (data: BattleBeginType) => void;
    onSetBattleLineupService: (data: SetBattleLineupType) => void;
    onDamageService: (data: DamageType) => void;
    onTurnBeginService: (data: TurnBeginType) => void;
    onTurnEndService: (data: TurnEndType) => void;
    onEntityDefeatedService: (data: EntityDefeatedType) => void;
    onUseSkillService: (data: UseSkillType) => void;
    onUpdateWaveService: (data: UpdateWaveType) => void;
    onUpdateCycleService: (data: UpdateCycleType) => void;
    onStatChange: (data: StatChangeType) => void;
    onUpdateTeamFormation: (data: UpdateTeamFormationType) => void;
    onInitializeEnemyService: (data: InitializeEnemyType) => void;
    onBattleEndService: (data: BattleEndType) => void;
    onCreateBattleService: (data: AvatarAnalysisJson[]) => void;
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
    version: undefined,
    avatarDetail: undefined,
    enemyDetail: undefined,
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
            maxCycle: data.maxCycle,
            version: data.version,
            avatarDetail: data.avatarDetail,
            enemyDetail: data.enemyDetail
        })
    },
    onConnectedService: (data: VersionType) => {
        set({
            version: data.version
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
    onSetBattleLineupService: (data: SetBattleLineupType) => {
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
    onDamageService: (data: DamageType) => {
        const skillHistory = get().skillHistory
        
        const skillIdx = skillHistory.findLastIndex(it => it.avatarId === data.attacker.uid)
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
    onTurnBeginService: (data: TurnBeginType) => {
        set((state) => ({
            totalAV: data.action_value,
            damagePerAV: state.totalDamage / (data.action_value === 0 ? 1 : data.action_value),
            turnHistory: [...state.turnHistory, {
                avatarId: data?.turn_owner?.uid,
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
    onEntityDefeatedService: (data: EntityDefeatedType) => {
        let avatarDetail = get().avatarDetail
        let enemyDetail = get().enemyDetail
        if (!enemyDetail) {
            enemyDetail = {} as Record<number, EnemyInfo>
        }
        if (!avatarDetail) {
            avatarDetail = {} as Record<number, AvatarInfo>
        }
        if (data.killer.team === "Player" && enemyDetail[data.entity_defeated.uid]) {
            enemyDetail[data.entity_defeated.uid].isDie = true
            enemyDetail[data.entity_defeated.uid].killer_uid = data.killer.uid
        } else if (data.killer.team === "Enemy" && avatarDetail[data.entity_defeated.uid]) {
            avatarDetail[data.entity_defeated.uid].isDie = true
            avatarDetail[data.entity_defeated.uid].killer_uid = data.killer.uid
        } else {
            console.error("onEntityDefeatedService", data)
            console.error("onEntityDefeatedService", enemyDetail)
            console.error("onEntityDefeatedService", avatarDetail)
        }
        set({
            avatarDetail: avatarDetail,
            enemyDetail: enemyDetail
        })
    },
    onUseSkillService: (data: UseSkillType) => {
        set((state) => ({
            skillHistory: [...state.skillHistory, {
                avatarId: data.avatar.uid,
                damageDetail: [],
                totalDamage: 0,
                skillType: data.skill.type,
                skillName: data.skill.name,
               turnBattleId: state.turnHistory.length-1
            } as SkillBattleInfo]
        }))
    },
    onUpdateWaveService: (data: UpdateWaveType) => {
        set({
            waveIndex: data.wave
        })
    },
    onUpdateCycleService: (data: UpdateCycleType) => {
        set({
            cycleIndex: data.cycle
        })
    },
    onStatChange: (data: StatChangeType) => {
        let avatarDetail = get().avatarDetail
        let enemyDetail = get().enemyDetail
        if (!enemyDetail) {
            enemyDetail = {} as Record<number, EnemyInfo>
        }
        if (!avatarDetail) {
            avatarDetail = {} as Record<number, AvatarInfo>
        }
        if (data.entity.team === "Player") {
            const [key, value] = Object.entries(data.stat)[0]
            const uid = data.entity.uid;

            if (!avatarDetail[uid]) {
                avatarDetail[uid] = {
                    id: uid,
                    isDie: false,
                    killer_uid: -1,
                    stats: {},
                    statsHistory: []
                };
            }
            avatarDetail[uid].stats[key] = value
            avatarDetail[uid].statsHistory.push({
                stats: data.stat,
                turnBattleId: get().turnHistory.length-1
            })
        } else {
            const [key, value] = Object.entries(data.stat)[0]
            const uid = data.entity.uid;

            if (!enemyDetail[uid]) {
                enemyDetail[uid] = {
                    id: uid,
                    isDie: false,
                    killer_uid: -1,
                    name: "",
                    positionIndex: Object.keys(get().enemyDetail || {}).length,
                    maxHP: 0,
                    waveIndex: 0,
                    level: 0,
                    stats: {},
                    statsHistory: []
                };
            }
            enemyDetail[uid].stats[key] = value
            enemyDetail[uid].statsHistory.push({
                stats: data.stat,
                turnBattleId: get().turnHistory.length-1
            })
        }
        set({
            avatarDetail: avatarDetail,
            enemyDetail: enemyDetail
        })
    },

    onUpdateTeamFormation: (data: UpdateTeamFormationType) => {
        let avatarDetail = get().avatarDetail
        let enemyDetail = get().enemyDetail
        if (!avatarDetail) {
            avatarDetail = {} as Record<number, AvatarInfo>
            for (const entity of data.entities) {
                if (entity.team === "Player" && avatarDetail[entity.uid]) {
                    
                }
            }
        }
        if (!enemyDetail) {
            enemyDetail = {} as Record<number, EnemyInfo>
            for (let i = 0; i < data.entities.length; i++) {
                const entity = data.entities[i];
                if (entity.team === "Enemy" && enemyDetail[entity.uid]) {
                    enemyDetail[entity.uid].positionIndex = i
                }
            }
        }

        set({
            avatarDetail: avatarDetail,
            enemyDetail: enemyDetail
        })
    },
    onInitializeEnemyService: (data: InitializeEnemyType) => {
        const enemyDetail = get().enemyDetail
        if (!enemyDetail) {
            return
        }
        enemyDetail[data.enemy.uid] = {
            id: data.enemy.id,
            isDie: false,
            killer_uid: -1,
            positionIndex: enemyDetail[data.enemy.uid].positionIndex,
            waveIndex: get().waveIndex,
            name: data.enemy.name,
            maxHP: data.enemy.base_stats.hp,
            level: data.enemy.base_stats.level,
            stats: {},
            statsHistory: []
        }
        set({
            enemyDetail: enemyDetail
        })
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
}));

export default useBattleDataStore;