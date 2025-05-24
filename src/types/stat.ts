import { EntityType } from "./entity";

export type StatType = Record<string, number>

export interface StatsType {
    level: number;
    hp: number;
}

export interface StatChangeType {
    entity: EntityType,
    stat: StatType,
}