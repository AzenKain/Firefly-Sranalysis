import { EntityType } from "./entity";

export interface TurnInfoType {
    avatars_turn_damage: number[];
    total_damage: number;
    action_value: number,
    cycle: number,
    wave: number,
}

export interface TurnBeginType {
    action_value: number;
    turn_owner?: EntityType | null
}

export interface TurnEndType {
    turn_info: TurnInfoType
}