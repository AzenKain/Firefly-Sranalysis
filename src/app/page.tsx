"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ActionBar from "@/components/actionbar";
import useAvatarDataStore from "@/stores/avatarDataStore";
import { getCharacterListApi } from "@/lib/api";
import LineupBar from "@/components/lineupbar";
import useBattleDataStore from "@/stores/battleDataStore";
import DamagePerAvatarForAll from "@/components/chart/damagePerAvatarForAll";
import MultiCharLineChart from "@/components/chart/damageLineForAll";
import DamagePerCycleForAll from "@/components/chart/damagePerCycleForAll";
import DamagePercentChartForAll from "@/components/chart/damagePercentForAll";

export default function Home() {
  const transI18n = useTranslations("DataAnalysisPage");
  const { setListAvatar } = useAvatarDataStore();
  const {
    totalAV,
    totalDamage,
    damagePerAV,
    turnHistory
  } = useBattleDataStore();
  const [expandedCharts, setExpandedCharts] = useState<string[]>([]);

  const toggleExpand = (chartId: string) => {
    if (expandedCharts.includes(chartId.toLowerCase())) {
      setExpandedCharts(expandedCharts.filter(id => id !== chartId.toLowerCase()));
    } else {
      setExpandedCharts([...expandedCharts, chartId.toLowerCase()]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacterListApi();
      setListAvatar(data);
    };
    fetchData();
  }, [setListAvatar]);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [expandedCharts]);

  return (
    <div className="flex flex-col px-2 h-full w-full mt-5 min-h-[74vh] bg-base-100 font-[family-name:var(--font-geist-sans)]">
      <div className="h-full ">
        <div className="grid grid-cols-12 gap-2 lg:gap-3 h-full min-h-full">
          <div className="col-span-12 md:col-span-3 lg:col-span-2 xl:col-span-2 h-full">
            <ActionBar />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-8 xl:col-span-8 max-h-[92vh] flex flex-col h-full overflow-auto ">

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2 text-base lg:text-lg xl:text-xl rounded bg-primary text-primary-content text-center shadow-md">
                {transI18n("totalDamage")}
                <div>{Number(totalDamage).toFixed(2)}</div>
              </div>
              <div className="p-2 text-base lg:text-lg xl:text-xl rounded bg-secondary text-secondary-content text-center shadow-md">
                {transI18n("totalAV")}
                <div>{Number(totalAV).toFixed(2)}</div>
              </div>
              <div className="p-2 text-base lg:text-lg xl:text-xl rounded bg-accent text-accent-content text-center shadow-md">
                {transI18n("damagePerAV")}
                <div>{Number(damagePerAV).toFixed(2)}</div>
              </div>
              <div className="p-2 text-base lg:text-lg xl:text-xl rounded bg-warning text-warning-content text-center shadow-md">
                {transI18n("totalTurn")}
                <div>{turnHistory.filter(it => it.avatarId && it.avatarId != -1).length}</div>
              </div>
            </div>


            <div className="rounded-lg p-2 shadow-md flex-grow">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                <div
                  key={expandedCharts.includes('chart1') ? 'chart1-expanded' : 'chart1-normal'}
                  className={`bg-base-200 rounded-lg p-2 shadow-md relative ${expandedCharts.includes('chart1') ? 'lg:col-span-2' : ''}`}>
                  <div className="absolute top-2 left-2 z-10">
                    <button
                      className="btn btn-sm btn-circle btn-ghost"
                      onClick={() => toggleExpand('chart1')}
                    >
                      {expandedCharts.includes('chart1') ? '−' : '⤢'}
                    </button>
                  </div>
                  <DamagePerAvatarForAll />
                </div>

                <div
                  className={`bg-base-200 rounded-lg p-2 shadow-md relative ${expandedCharts.includes('chart2') ? 'lg:col-span-2' : ''}`}
                  key={expandedCharts.includes('chart2') ? 'chart2-expanded' : 'chart2-normal'}
                >
                  <div className="absolute top-2 left-2 z-10">
                    <button
                      className="btn btn-sm btn-circle btn-ghost"
                      onClick={() => toggleExpand('chart2')}
                    >
                      {expandedCharts.includes('chart2') ? '−' : '⤢'}
                    </button>
                  </div>
                  <MultiCharLineChart />
                </div>


                <div
                  className={`bg-base-200 rounded-lg p-2 shadow-md relative ${expandedCharts.includes('chart3') ? 'lg:col-span-2' : ''}`}
                  key={expandedCharts.includes('chart3') ? 'chart3-expanded' : 'chart3-normal'}
                >
                  <div className="absolute top-2 left-2 z-10">
                    <button
                      className="btn btn-sm btn-circle btn-ghost"
                      onClick={() => toggleExpand('chart3')}
                    >
                      {expandedCharts.includes('chart3') ? '−' : '⤢'}
                    </button>
                  </div>
                  <DamagePercentChartForAll />
                </div>

                <div
                  className={`bg-base-200 rounded-lg p-2 shadow-md relative ${expandedCharts.includes('chart4') ? 'lg:col-span-2' : ''}`}
                  key={expandedCharts.includes('chart4') ? 'chart4-expanded' : 'chart4-normal'}
                >
                  <div className="absolute top-2 left-2 z-10">
                    <button
                      className="btn btn-sm btn-circle btn-ghost"
                      onClick={() => toggleExpand('chart4')}
                    >
                      {expandedCharts.includes('chart4') ? '−' : '⤢'}
                    </button>
                  </div>
                  <DamagePerCycleForAll />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 lg:col-span-2 xl:col-span-2  h-full">
            <LineupBar />
          </div>
        </div>
      </div>
    </div>
  );
}
