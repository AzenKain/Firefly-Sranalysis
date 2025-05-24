import {AttackType, DamageDetailType} from "./attack";
import { AvatarAnalysisJson } from "./srtools";
import { StatType } from "./stat";


export interface AvatarBattleInfo {
    avatarId: number;
    isDie?: boolean;
}

export interface SkillBattleInfo {
    avatarId: number;
    damageDetail: DamageDetailType[];
    totalDamage: number;
    skillType: AttackType;
    skillName: string;
    turnBattleId: number;
}

export interface TurnBattleInfo {
    avatarId: number;
    actionValue: number;
    waveIndex: number;
    cycleIndex: number;
}

export interface BattleDataStateJson {
    lineup: AvatarBattleInfo[];
    turnHistory: TurnBattleInfo[]
    skillHistory: SkillBattleInfo[]
    dataAvatar: AvatarAnalysisJson[]
    totalAV: number;
    totalDamage: number;
    damagePerAV: number;
    maxWave: number;
    cycleIndex: number,
    waveIndex: number,
    maxCycle: number,
    version?: string,
    avatarDetail?: Record<number, AvatarInfo>;
    enemyDetail?: Record<number, EnemyInfo>;
}

export interface StatsHistoryType {
    stats: StatType
    turnBattleId: number;
}

export interface EnemyInfo {
    id: number;
    name: string;
    maxHP: number;
    level: number;
    isDie: boolean;
    positionIndex: number;
    waveIndex: number;
    killer_uid: number;
    stats: Record<string, number>;
    statsHistory: StatsHistoryType[];
}
export interface AvatarInfo {
    id: number;
    isDie: boolean;
    killer_uid: number;
    stats: Record<string, number>;
    statsHistory: StatsHistoryType[];
}

