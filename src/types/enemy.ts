import { StatsType } from "./stat";

export interface BattleStatsType {
    properties: Record<string, number>;
}

export interface EnemyType {
    id: number;
    uid: number;
    name: string;
    base_stats: BattleStatsType | StatsType;
}

export interface InitializeEnemyType {
    enemy: EnemyType
}

export interface MonsterBasic {
    id: string;
    rank: string;
    icon: string;
    image: string;
    weak: string[];
    desc: Record<string, string>;
    lang: Record<string, string>;  
}
