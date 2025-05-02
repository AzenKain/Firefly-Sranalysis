import { AvatarType } from "./lineup";


export interface TurnInfoType {
    avatars_turn_damage: number[];
    total_damage: number;
    action_value: number,
    cycle: number,
    wave: number,
}

export interface TurnBeginType {
    action_value: number;
    turn_owner?: AvatarType
}

export interface TurnEndType {
    avatars: AvatarType[];
    turn_info: TurnInfoType
}