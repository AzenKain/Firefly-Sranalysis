export interface AvatarAnalysisJson {
    owner_uid: number;
    avatar_id: number;
    data: AvatarData | null;
    level: number;
    promotion: number;
    techniques: number[];
    relics: RelicJson[];
    Lightcone: LightconeJson | null;
    sp_value: number;
    sp_max: number;
}

export interface AvatarData {
    rank: number;
    skills: Record<string, number>;
}

export interface SubAffix {
    sub_affix_id: number;
    count: number;
    step: number;
}

export interface RelicJson {
    level: number;
    relic_id: number;
    relic_set_id: number;
    main_affix_id: number;
    sub_affixes: SubAffix[];
    internal_uid: number;
    equip_avatar: number;
}

export interface LightconeJson {
    level: number;
    item_id: number;
    equip_avatar: number;
    rank: number;
    promotion: number;
    internal_uid: number;
}
