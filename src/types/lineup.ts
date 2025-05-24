import { EntityType } from "./entity";

export interface AvatarType{
    id: number;
    name: string;
}

export interface SetBattleLineupType {
    avatars: AvatarType[];
}


export interface UpdateTeamFormationType {
    entities: EntityType[],
    team: "Player" | "Enemy"
}