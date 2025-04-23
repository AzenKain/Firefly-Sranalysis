import { AvatarInfo } from "./lineup";

export interface SkillInfo {
    name: string;
    type: string;
}

export interface AvatarSkillType {
    avatar: AvatarInfo;
    skill: SkillInfo;
}