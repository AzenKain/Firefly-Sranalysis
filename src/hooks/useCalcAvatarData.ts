import useBattleDataStore from "@/stores/battleDataStore";
import { useMemo } from "react";

export function useCalcTotalDmgAvatar(avatarId: number) {
  const skillHistory = useBattleDataStore(state => state.skillHistory);

  return useMemo(() => {
    return skillHistory
      .filter(t => t.avatarId === avatarId)
      .reduce((sum, turn) => sum + turn.totalDamage, 0);
  }, [avatarId, skillHistory]);
}


export function useCalcTotalTurnAvatar(avatarId: number) {
    const turnHistory = useBattleDataStore(state => state.turnHistory);
  
    return useMemo(() => {
      return turnHistory.filter(turn => turn.avatarId === avatarId).length;
    }, [avatarId, turnHistory]);
}