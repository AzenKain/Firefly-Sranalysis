import useBattleDataStore from "@/stores/battleDataStore";
import { useMemo } from "react";

export function useCalcTotalDmgAvatar(avatarId: number) {
  const { skillHistory } = useBattleDataStore.getState();

  return useMemo(() => {
    return skillHistory
      .filter(t => t.avatarId === avatarId)
      .reduce((sum, turn) => sum + turn.totalDamage, 0);
  }, [avatarId, skillHistory]);
}


export function useCalcTotalTurnAvatar(avatarId: number) {
    const { turnHistory } = useBattleDataStore.getState();
  
    return useMemo(() => {
      const uniqueActionValues = new Set<number>(); 
      turnHistory.forEach(turn => {
        if (turn.avatarId === avatarId) {
            uniqueActionValues.add(turn.actionValue);
        }
      });
  
      return uniqueActionValues.size;
    }, [avatarId, turnHistory]);
  }