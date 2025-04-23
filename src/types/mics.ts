export interface AvatarBattleInfo {
    avatarId: number;
    isDie: boolean;
}

export interface TurnBattleInfo {
    avatarId: number;
    damageDetail: number[];
    totalDamage: number;
    actionValue: number;
    skillType: string;
    skillName: string;
}

export interface BattleDataStateJson {
    lineup: AvatarBattleInfo[];
    turnHistory: TurnBattleInfo[]
    totalAV: number;
    totalDamage: number;
    damagePerAV: number;
}