import { EntityType } from "./entity";
import { Team } from "./team";

export interface AvatarType{
    id: number;
    name: string;
}

export interface SetBattleLineupType {
    avatars: AvatarType[];
}


export interface UpdateTeamFormationType {
    entities: EntityType[],
    team: Team
}