export interface EntityType {
    uid: number;
    team: "Player" | "Enemy";
}

export interface EntityDefeatedType {
    killer: EntityType,
    entity_defeated: EntityType
}