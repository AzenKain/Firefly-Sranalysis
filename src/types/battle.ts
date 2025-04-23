import { AvatarInfo } from "./lineup";
import { TurnInfo } from "./turn";

export interface BattleEndType {
    avatars: AvatarInfo[];
    turn_history: TurnInfo[];
    turn_count: number;
    total_damage: number;
    action_value: number;
}
export interface KillType {
    attacker: AvatarInfo;
}

