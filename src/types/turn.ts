import { AvatarInfo } from "./lineup";


export interface TurnInfo {
    avatars_turn_damage: number[];
    total_damage: number;
    action_value: number;
}

export interface TurnBeginType {
    action_value: number;
}

export interface TurnEndType {
    avatars: AvatarInfo[];
    avatars_damage: number[];
    total_damage: number;
    action_value: number;
}