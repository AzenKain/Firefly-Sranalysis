import { AvatarType } from "./lineup";
import { AttackType } from "@/types/attack";

export interface SkillInfo {
    name: string;
    type: AttackType;
}

export interface AvatarSkillType {
    avatar: AvatarType;
    skill: SkillInfo;
}