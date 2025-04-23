import useBattleDataStore from "@/stores/battleDataStore";
import { useMemo } from "react";


type Mode = 0 | 1 | 2;

function getChunkIndex(av: number, mode: Mode): number {
    let sum = 0;
    let idx = 0;

    if (mode === 0) {
        while (sum <= av) {
            sum += 100;
            idx++;
        }
    } else if (mode === 1) {
        if (av < 150) return 0;
        sum = 150;
        idx = 1;
        while (sum <= av) {
            sum += 100;
            idx++;
        }
    } else {
        if (av < 150) return 0;
        if (av < 300) return 1;
        sum = 300;
        idx = 2;
        while (sum <= av) {
            sum += 100;
            idx++;
        }
    }

    return idx - 1;
}

export function useDamagePerCycleForOne(avatarId: number, mode: Mode) {
    const { turnHistory } = useBattleDataStore.getState();

    return useMemo(() => {
        const damageMap = new Map<number, number>();

        turnHistory
            .filter(t => t.avatarId === avatarId)
            .forEach(t => {
                const idx = getChunkIndex(t.actionValue, mode);
                damageMap.set(idx, (damageMap.get(idx) || 0) + t.totalDamage);
            });

        const maxIndex = Math.max(...Array.from(damageMap.keys()), 0);

        return Array.from({ length: maxIndex + 1 }).map((_, i) => ({
            x: `${i + 1}`,
            y: damageMap.get(i) || 0,
        }));
    }, [avatarId, mode, turnHistory]);
}


export function useDamagePerCycleForAll(mode: Mode) {
    const { turnHistory } = useBattleDataStore.getState();

    return useMemo(() => {
        const damageMap = new Map<number, number>();

        turnHistory.forEach(t => {
            const idx = getChunkIndex(t.actionValue, mode);
            damageMap.set(idx, (damageMap.get(idx) || 0) + t.totalDamage);
        });

        const maxIndex = Math.max(...Array.from(damageMap.keys()), 0);

        return Array.from({ length: maxIndex + 1 }).map((_, i) => ({
            x: `${i + 1}`,
            y: damageMap.get(i) || 0,
        }));
    }, [mode, turnHistory]);
}