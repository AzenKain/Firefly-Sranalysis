import useBattleDataStore from "@/stores/battleDataStore";
import { useMemo } from "react";

export function useDamageLinesForAll(mode: 1 | 2 = 1) {
  const { turnHistory, skillHistory } = useBattleDataStore.getState();

  return useMemo(() => {
    const avatarMap = new Map<number, Map<number, number>>();

    for (const skill of skillHistory) {
      if (!avatarMap.has(skill.avatarId)) {
        avatarMap.set(skill.avatarId, new Map());
      }

      const charMap = avatarMap.get(skill.avatarId)!;
      const actionValue = turnHistory[skill.turnBattleId].actionValue
      const prev = charMap.get(actionValue) || 0;
      charMap.set(actionValue, prev + skill.totalDamage);
    }

    const result: Record<number, { x: number; y: number }[]> = {};

    for (const [avatarId, damageMap] of avatarMap.entries()) {
      const points = Array.from(damageMap.entries())
        .map(([x, y]) => ({ x, y }))
        .sort((a, b) => a.x - b.x);

      if (mode === 1) {
        let cumulative = 0;
        result[avatarId] = points.map(p => {
          cumulative += Number(p.y);
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
  }, [turnHistory, skillHistory, mode]);
}
