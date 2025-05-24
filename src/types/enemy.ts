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