"use client";
import { useMemo } from "react";
import useBattleDataStore from "@/stores/battleDataStore";
import {attackTypeToString} from "@/types";

export function useSkillDamageForAvatar(avatarId: number) {
  const { skillHistory } = useBattleDataStore.getState();

  return useMemo(() => {
    const dmgMap = new Map<string, number>();

    for (const skill of skillHistory) {
      if (skill.avatarId !== avatarId) continue;

      const type = attackTypeToString(skill.skillType).toLowerCase();
      dmgMap.set(type, (dmgMap.get(type) || 0) + skill.totalDamage);
    }

    const labels = Array.from(dmgMap.keys());
    const damageValues = Array.from(dmgMap.values());

    return { labels, damageValues };
  }, [avatarId, skillHistory]);
}
