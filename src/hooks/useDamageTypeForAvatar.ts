"use client";
import { useMemo } from "react";
import useBattleDataStore from "@/stores/battleDataStore";
import {attackTypeToString} from "@/types";

export function useDamageByTypeForAvatar(avatarId: number) {
  const { skillHistory } = useBattleDataStore.getState();

  return useMemo(() => {
    const dmgMap = new Map<string, number>();

    for (const skill of skillHistory) {
      if (skill.avatarId !== avatarId) continue;

      for (const damage of skill.damageDetail) {
        const type = attackTypeToString(damage?.damage_type)?.toLowerCase() || "";
        dmgMap.set(type, (dmgMap.get(type) || 0) + damage.damage); 
      }
    }

    const labels = Array.from(dmgMap.keys());
    const damageValues = Array.from(dmgMap.values());

    return { labels, damageValues };
  }, [avatarId, skillHistory]);
}
