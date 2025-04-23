import { BattleDataStateJson } from "@/types/mics";

export const exportBattleData = (
    data: BattleDataStateJson,
    filename = 'battle_data.json'
  ) => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };