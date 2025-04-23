export interface AvatarHakushiType  {
    release: number;
    icon: string;
    rank: string;
    baseType: string;
    damageType: string;
    en: string;
    desc: string;
    kr: string;
    cn: string;
    jp: string;
}

export interface AvatarType {
    id: string;
    release: number;
    icon: string;
    rank: string;
    baseType: string;
    damageType: string;
    desc: string;
    lang: Map<string, string>;  
}
