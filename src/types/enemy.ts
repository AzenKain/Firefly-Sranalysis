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

export interface EnemyHakushiRawType {
    rank: string;
    camp: string | null;
    icon: string;
    child: number[];
    weak: string[];
    en: string;
    desc: string;
    kr: string;
    cn: string;
    jp: string;
}

export interface EnemyHakushiType {
    id: string;
    rank: string;
    camp: string | null;
    icon: string;
    child: number[];
    weak: string[];
    desc: string;
    lang: Map<string, string>;  
}
