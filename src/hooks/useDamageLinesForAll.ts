import useBattleDataStore from "@/stores/battleDataStore";
import { useMemo } from "react";

export function useDamageLinesForAll(mode: 0 | 1 = 0) {
  const { turnHistory } = useBattleDataStore.getState();

  return useMemo(() => {
    const avatarMap = new Map<number, Map<number, number>>();

    for (const turn of turnHistory) {
      if (!avatarMap.has(turn.avatarId)) {
        avatarMap.set(turn.avatarId, new Map());
      }

      const charMap = avatarMap.get(turn.avatarId)!;
      const prev = charMap.get(turn.actionValue) || 0;
      charMap.set(turn.actionValue, prev + turn.totalDamage);
    }

    const result: Record<number, { x: number; y: number }[]> = {};

    for (const [avatarId, damageMap] of avatarMap.entries()) {
      const points = Array.from(damageMap.entries())
        .map(([x, y]) => ({ x, y }))
        .sort((a, b) => a.x - b.x);

      if (mode === 1) {
        let cumulative = 0;
        result[avatarId] = points.map(p => {
          cumulative += p.y;
          return { x: p.x, y: Number(cumulative.toFixed(2)) };
        });
      } else {
        result[avatarId] = points.map(p => ({
          x: p.x,
          y: Number(p.y.toFixed(2)),
        }));
      }
    }

    return result;
  }, [turnHistory, mode]);
}
