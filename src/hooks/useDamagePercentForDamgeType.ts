import { useMemo } from "react";
import useBattleDataStore from "@/stores/battleDataStore";
import {attackTypeToString} from "@/types";

export function useDamagePercentByType() {
  const { skillHistory } = useBattleDataStore.getState();

  return useMemo(() => {
    const dmgByType = new Map<string, number>();

    skillHistory.forEach(skill => {
      skill.damageDetail.forEach(detail => {
        const type = detail.damage_type; 
        if (!type) return;
        dmgByType.set(attackTypeToString(type), (dmgByType.get(attackTypeToString(type)) || 0) + detail.damage);
      });
    });

    const totalDmg = Array.from(dmgByType.values()).reduce((sum, val) => sum + val, 0);

    return Array.from(dmgByType.entries()).map(([type, dmg]) => ({
      type,
      percent: totalDmg > 0 ? (dmg / totalDmg) * 100 : 0,
    }));
  }, [skillHistory]);
}
