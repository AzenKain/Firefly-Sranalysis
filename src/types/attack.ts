import { EntityType } from "./entity";

export interface DamageType {
    attacker: EntityType;
    damage: number;
    overkill_damage?: number;
    damage_type?: AttackType | string;
    type?: AttackType | string;
}

export interface DamageDetailType {
    damage: number;
    overkill_damage?: number;
    damage_type?: AttackType;
    type?: AttackType | string;
}


export enum AttackType {
    Unknown = 0,
    Normal = 1,
    BPSkill = 2,
    Ultra = 3,
    QTE = 4,
    DOT = 5,
    Pursued = 6,
    Maze = 7,
    MazeNormal = 8,
    Insert = 9,
    ElementDamage = 10,
    Level = 11,
    Servant = 12,
    TrueDamage = 13,
    ElationDamage = 14
}


const attackTypeMap: Record<string, AttackType> = {
    Unknown: AttackType.Unknown,
    Normal: AttackType.Normal,
    BPSkill: AttackType.BPSkill,
    Ultra: AttackType.Ultra,
    QTE: AttackType.QTE,
    DOT: AttackType.DOT,
    DoT: AttackType.DOT,
    Pursued: AttackType.Pursued,
    Maze: AttackType.Maze,
    MazeNormal: AttackType.MazeNormal,
    Insert: AttackType.Insert,
    ElementDamage: AttackType.ElementDamage,
    Level: AttackType.Level,
    Servant: AttackType.Servant,
    TrueDamage: AttackType.TrueDamage,
    ElationDamage: AttackType.ElationDamage,
    Talent: AttackType.Unknown,
    Basic: AttackType.Normal,
    Skill: AttackType.BPSkill,
    Ultimate: AttackType.Ultra,
    Additional: AttackType.Pursued,
    Technique: AttackType.Maze,
    "Follow-up": AttackType.Insert,
    "Follow-Up": AttackType.Insert,
    "Elemental Damage": AttackType.ElementDamage,
    Break: AttackType.ElementDamage,
    "True Damage": AttackType.TrueDamage,
    True: AttackType.TrueDamage,
    "Elation Damage": AttackType.ElationDamage,
    Elation: AttackType.ElationDamage,
};

export function ParseAttackType(type: AttackType | string | undefined): AttackType {
    if (type === undefined || type === null) {
        return AttackType.Unknown;
    }

    if (typeof type === "number") {
        return type in AttackType ? type : AttackType.Unknown;
    }

    const num = Number(type);
    if (!isNaN(num)) {
        return num in AttackType ? num as AttackType : AttackType.Unknown;
    }

    return attackTypeMap[type] ?? AttackType.Unknown;
}

export function attackTypeToString(type: AttackType | string | undefined): string {
    if (type === undefined || type === null) {
        return "";
    }

    const parsed = typeof type === "string" ? ParseAttackType(type) : type;

    switch (parsed) {
        case AttackType.Unknown: return "Talent";
        case AttackType.Normal: return "Basic";
        case AttackType.BPSkill: return "Skill";
        case AttackType.Ultra: return "Ultimate";
        case AttackType.QTE: return "QTE";
        case AttackType.DOT: return "DOT";
        case AttackType.Pursued: return "Pursued";
        case AttackType.Maze: return "Technique";
        case AttackType.MazeNormal: return "MazeNormal";
        case AttackType.Insert: return "Follow-up";
        case AttackType.ElementDamage: return "Elemental Damage";
        case AttackType.Level: return "Level";
        case AttackType.Servant: return "Servant";
        case AttackType.TrueDamage: return "True Damage";
        case AttackType.ElationDamage: return "Elation Damage";
        default: return "Unknown";
    }
}
