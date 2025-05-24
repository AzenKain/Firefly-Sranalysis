
import { AttackType } from "@/types/attack";
import { EntityType } from "./entity";

export interface SkillInfo {
    name: string;
    type: AttackType;
    skill_config_id: number;
}

export interface UseSkillType {
    avatar: EntityType;
    skill: SkillInfo;
}