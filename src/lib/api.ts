import useSocketStore from "@/stores/socketSettingStore";
import { CharacterBasic, MonsterBasic } from "@/types";
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

export async function getCharacterListApi(): Promise<CharacterBasic[]> {
    try {
        const res = await axios.get<CharacterBasic[]>("/data/character.json");
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log(`Error: ${error.response?.status} - ${error.message}`);
        } else {
            console.log(`Unexpected error: ${String(error)}`);
        }
        return [];
    }
}

export async function getEnemyListApi(): Promise<MonsterBasic[]> {
    try {
        const res = await axios.get<MonsterBasic[]>("/data/monster.json");
        return res.data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.log(`Error: ${error.response?.status} - ${error.message}`);
        } else {
            console.log(`Unexpected error: ${String(error)}`);
        }
        return [];
    }
}
