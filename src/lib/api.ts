import useSocketStore from "@/stores/socketSettingStore";
import { AvatarHakushiType, AvatarHakushiRawType } from "@/types/avatar";


export async function checkConnectTcpApi(): Promise<boolean> {
    const { host, port, connectionType } = useSocketStore.getState()
    let url = `${host}:${port}/check-tcp`
    if (connectionType === "FireflyPSLocal") {
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
    const res = await fetch('/api/hakushin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        console.log(`Error ${res.status}: ${res.statusText}`);
        return [];
    }

    const data: Map<string, AvatarHakushiRawType> = new Map(Object.entries(await res.json()));


    return Array.from(data.entries()).map(([id, it]) => convertAvatar(id, it));
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