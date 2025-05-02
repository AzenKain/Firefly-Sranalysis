import {AttackType, DamageDetailType} from "./attack";
import { AvatarAnalysisJson } from "./srtools";

export interface AvatarBattleInfo {
    avatarId: number;
    isDie: boolean;
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
    maxCycle: number
}