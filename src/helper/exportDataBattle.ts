import useBattleDataStore from "@/stores/battleDataStore";
import { BattleDataStateJson } from "@/types/mics";

export const exportBattleData = (
  filename = 'battle_data.json'
) => {
  const { lineup,
    turnHistory,
    skillHistory,
    totalAV,
    totalDamage,
    damagePerAV,
    cycleIndex,
    waveIndex,
    dataAvatar,
    maxWave,
    maxCycle,
    version,
    avatarDetail,
    enemyDetail
  } = useBattleDataStore.getState();
    
  const data: BattleDataStateJson = {
    lineup,
    turnHistory,
    skillHistory,
    dataAvatar,
    totalAV,
    totalDamage,
    damagePerAV,
    cycleIndex,
    waveIndex,
    maxWave,
    maxCycle,
    version,
    avatarDetail,
    enemyDetail
  }

  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};