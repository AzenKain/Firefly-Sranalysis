"use client";
import { useMemo } from "react";
import useBattleDataStore from "@/stores/battleDataStore";

export function useSkillDamageByAvatar(avatarId: number) {
  const { turnHistory } = useBattleDataStore.getState();

  return useMemo(() => {
    const skillTypes = ['technique', 'talent', 'basic', 'skill', 'ultimate', 'servant'];
    const dmgMap = new Map<string, number>();
    skillTypes.forEach((type) => dmgMap.set(type, 0));

    for (const turn of turnHistory) {
      const type = turn.skillType.toLowerCase();
      if (turn.avatarId === avatarId && dmgMap.has(type)) {
        dmgMap.set(type, dmgMap.get(type)! + turn.totalDamage);
      }
    }

    const labels = Array.from(dmgMap.keys());
    const damageValues = Array.from(dmgMap.values());

    return { labels, damageValues };
  }, [avatarId, turnHistory]);
}
