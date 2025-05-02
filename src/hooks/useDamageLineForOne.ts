import useBattleDataStore from "@/stores/battleDataStore";
import { useMemo } from "react";

export function useDamageLineForOne(avatarId: number, mode: 0 | 1 = 0) {
  const { skillHistory, turnHistory } = useBattleDataStore.getState();

  return useMemo(() => {
    const map = new Map<number, number>();

    for (const skill of skillHistory) {
      if (skill.avatarId !== avatarId) continue;
      const actionValue = turnHistory[skill.turnBattleId].actionValue
      const prev = map.get(actionValue) || 0;
      map.set(actionValue, prev + skill.totalDamage);
    }

    const points = Array.from(map.entries())
      .map(([x, y]) => ({ x, y }))
      .sort((a, b) => a.x - b.x);

    if (mode === 1) {
      let cumulative = 0;
      return points.map(p => {
        cumulative += p.y;
        return { x: p.x, y: Number(cumulative.toFixed(2)) };
      });
    }

    return points.map(p => ({ x: p.x, y: Number(p.y.toFixed(2)) }));
  }, [avatarId, skillHistory, turnHistory, mode]);
}
