import useSocketStore from "@/stores/socketSettingStore";
import { EnemyHakushiRawType, EnemyHakushiType } from "@/types";
import { AvatarHakushiType, AvatarHakushiRawType } from "@/types/avatar";
import axios from 'axios';

export async function checkConnectTcpApi(): Promise<boolean> {
    const { host, port, connectionType } = useSocketStore.getState()
    let url = `${host}:${port}/check-tcp`
    if (connectionType === "PS") {
        url = "http://localhost:21000/check-tcp"
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        return data.status
    }
    return false
}

export async function getCharacterListApi(): Promise<AvatarHakushiType[]> {
    try {
        const res = await axios.get<Record<string, AvatarHakushiRawType>>(
            'https://api.hakush.in/hsr/data/character.json',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = new Map(Object.entries(res.data));

        return Array.from(data.entries()).map(([id, it]) => convertAvatar(id, it));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log(`Error: ${error.response?.status} - ${error.message}`);
        } else {
            console.log(`Unexpected error: ${String(error)}`);
        }
        return [];
    }
}

export async function getEnemyListApi(): Promise<EnemyHakushiType[]> {
    try {
        const res = await axios.get<Record<string, EnemyHakushiRawType>>(
            'https://api.hakush.in/hsr/data/monster.json',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = new Map(Object.entries(res.data));

        return Array.from(data.entries()).map(([id, it]) => convertMonster(id, it));
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log(`Error: ${error.response?.status} - ${error.message}`);
        } else {
            console.log(`Unexpected error: ${String(error)}`);
        }
        return [];
    }
}

function convertAvatar(id: string, item: AvatarHakushiRawType): AvatarHakushiType {
    const lang = new Map<string, string>([
        ['en', item.en],
        ['kr', item.kr],
        ['cn', item.cn],
        ['jp', item.jp]
    ]);

    const result: AvatarHakushiType = {
        release: item.release,
        icon: item.icon,
        rank: item.rank,
        baseType: item.baseType,
        damageType: item.damageType,
        desc: item.desc,
        lang: lang,
        id: id  
    };

    return result;
}

export function convertMonster(id: string, item: EnemyHakushiRawType): EnemyHakushiType {
    const lang = new Map<string, string>([
        ['en', item.en],
        ['kr', item.kr],
        ['cn', item.cn],
        ['jp', item.jp]
    ]);
    const result: EnemyHakushiType = {
        id: id,
        rank: item.rank,
        camp: item.camp,
        icon: item.icon,
        child: item.child,
        weak: item.weak,
        desc: item.desc,
        lang: lang
    };

    return result;
}