import { Team } from "./team";

export interface EntityType {
    uid: number;
    team: Team;
}

export interface EntityDefeatedType {
    killer: EntityType,
    entity_defeated: EntityType
}