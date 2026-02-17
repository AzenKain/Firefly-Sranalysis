import { StatsType } from "./stat";

export interface EnemyType {
    id: number;
    uid: number;
    name: string;
    base_stats: StatsType
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
