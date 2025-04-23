import useBattleDataStore from "@/stores/battleDataStore";
import { useMemo } from "react";

export function useDamagePercentPerAvatar() {
  const { turnHistory } = useBattleDataStore.getState();

  return useMemo(() => {
    const dmgByAvatar = new Map<number, number>();

    turnHistory.forEach(t => {
      dmgByAvatar.set(t.avatarId, (dmgByAvatar.get(t.avatarId) || 0) + t.totalDamage);
    });

    const totalDmg = Array.from(dmgByAvatar.values()).reduce((sum, v) => sum + v, 0);

    return Array.from(dmgByAvatar.entries()).map(([avatarId, dmg]) => ({
      avatarId,
      percent: totalDmg > 0 ? (dmg / totalDmg) * 100 : 0,
    }));
  }, [turnHistory]);
}
