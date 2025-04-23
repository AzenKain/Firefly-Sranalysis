import { BattleDataStateJson } from "@/types/mics";

export const importBattleData = (file: File, loadBattleDataFromJSON: (data: BattleDataStateJson) => void) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const result = reader.result as string;
          const parsed = JSON.parse(result) as BattleDataStateJson;
          loadBattleDataFromJSON(parsed);
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
};

  