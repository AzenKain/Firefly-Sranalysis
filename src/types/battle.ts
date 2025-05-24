import { AvatarType } from "./lineup";
import { TurnInfoType } from "./turn";

export interface BattleEndType {
    avatars: AvatarType[];
    turn_history: TurnInfoType[];
    av_history: TurnInfoType[];
    turn_count: number;
    total_damage: number;
    action_value: number;
    stage_id: number;
}

export interface BattleBeginType {
    max_waves: number
    max_cycles: number
    stage_id: number
}