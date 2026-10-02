import useBattleDataStore from "@/stores/battleDataStore";
import { useShallow } from "zustand/react/shallow";
import { useMemo } from "react";

export function useDamageLinesForAll(mode: 1 | 2 = 1) {
  const { turnHistory, skillHistory } = useBattleDataStore(
    useShallow(state => ({
      turnHistory: state.turnHistory,
      skillHistory: state.skillHistory,
    }))
  );

  return useMemo(() => {
    const avatarMap = new Map<number, Map<number, number>>();

    for (const skill of skillHistory) {
      if (!skill.avatarId || skill.avatarId <= 0) continue;

      if (!avatarMap.has(skill.avatarId)) {
        avatarMap.set(skill.avatarId, new Map());
      }

      const turn = turnHistory[skill.turnBattleId];
      if (!turn) continue;

      const charMap = avatarMap.get(skill.avatarId)!;
      const actionValue = turn.actionValue;
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
