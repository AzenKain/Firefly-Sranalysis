import useBattleDataStore from "@/stores/battleDataStore";
import { useTranslations } from "next-intl";
import { useMemo } from "react";


type Mode = 0 | 1 | 2;

export function useDamagePerCycleForOne(avatarId: number, mode: Mode) {
  const { skillHistory, turnHistory, maxCycle } = useBattleDataStore.getState();
  const transI18n = useTranslations("DataAnalysisPage");
  return useMemo(() => {
    const damageMap = new Map<string, number>();
    
    skillHistory
      .filter(s => s.avatarId === avatarId)
      .forEach(s => {
        const turn = turnHistory[s.turnBattleId];
        if (!turn) return;

        let key = '';
        if (mode === 0) {
          key = `${transI18n('cycle')} ${maxCycle-turn.cycleIndex} - ${transI18n('wave')} ${turn.waveIndex}`;
        } else if (mode === 1) {
          key = `${transI18n('cycle')} ${maxCycle-turn.cycleIndex}`;
        } else if (mode === 2) {
          key = `${transI18n('wave')} ${turn.waveIndex}`;
        }

        damageMap.set(key, (damageMap.get(key) || 0) + s.totalDamage);
      });

    const result = Array.from(damageMap.entries())
      .map(([x, y]) => ({ x, y }))
      .sort((a, b) => a.x.localeCompare(b.x, undefined, { numeric: true }));

    return result;
  }, [avatarId, mode, skillHistory, turnHistory, transI18n]);
}


export function useDamagePerCycleForAll(mode: Mode) {
    const { skillHistory, turnHistory, maxCycle } = useBattleDataStore.getState();
    const transI18n = useTranslations("DataAnalysisPage");
    return useMemo(() => {
      const damageMap = new Map<string, number>();
  
      skillHistory.forEach(s => {
        const turn = turnHistory[s.turnBattleId];
        if (!turn) return;
  
        let key = '';
        if (mode === 0) {
          key = `${transI18n('cycle')} ${maxCycle-turn.cycleIndex} - ${transI18n('wave')} ${turn.waveIndex}`;
        } else if (mode === 1) {
          key = `${transI18n('cycle')} ${maxCycle-turn.cycleIndex}`;
        } else if (mode === 2) {
          key = `${transI18n('wave')} ${turn.waveIndex}`;
        }
  
        damageMap.set(key, (damageMap.get(key) || 0) + s.totalDamage);
      });
  
      const result = Array.from(damageMap.entries())
        .map(([x, y]) => ({ x, y }))
        .sort((a, b) => a.x.localeCompare(b.x, undefined, { numeric: true }));
  
      return result;
    }, [mode, skillHistory, turnHistory, transI18n]);
  }