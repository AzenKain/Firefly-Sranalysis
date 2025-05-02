'use client';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useDamagePercentPerAvatar } from '@/hooks/useDamagePercentPerAvatar';
import useAvatarDataStore from '@/stores/avatarDataStore';
import useLocaleStore from '@/stores/localeStore';
import { getNameChar } from '@/helper';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useDamagePercentByType } from '@/hooks/useDamagePercentForDamgeType';

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = [
  '#f87171', '#34d399', '#60a5fa', '#facc15',
  '#a78bfa', '#fb923c', '#f472b6', '#10b981',
  '#fcd34d', '#c084fc', '#f97316', '#ec4899',
  '#4ade80', '#fbbf24', '#8b5cf6', '#f43f5e'
];

export default function DamagePercentChartForAll() {
  const [mode, setMode] = useState<1 | 2>(1);
  const damageByAvatar = useDamagePercentPerAvatar();
  const damageByType = useDamagePercentByType();
  const { listAvatar } = useAvatarDataStore();
  const { locale } = useLocaleStore();
  const transI18n = useTranslations("DataAnalysisPage");

  const chartData = {
    labels: (mode === 1
      ? damageByAvatar.map(d =>
        getNameChar(locale, listAvatar.find(it => it.id == d.avatarId.toString()))
      )
      : damageByType.map(d => transI18n(d.type.toLowerCase()))
    ),
    datasets: [
      {
        label: '% ' + transI18n("damage"),
        data: (mode === 1
          ? damageByAvatar.map(d => d.percent.toFixed(2))
          : damageByType.map(d => d.percent.toFixed(2))
        ),
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: import('chart.js').TooltipItem<'pie'>) => `${ctx.label}: ${ctx.raw}%`,
        },
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <div className='w-full'>
      <div className="mb-4 flex items-start gap-2 justify-end">
        {[
          { mode: 1, label: `${transI18n("type")} 1`, className: "btn-primary" },
          { mode: 2, label: `${transI18n("type")} 2`, className: "btn-warning" },
        ].map(({ mode: m, label, className }) => (
          <button
            key={m}
            onClick={() => setMode(m as 1 | 2)}
            className={`btn btn-sm ${mode === m ? className : "btn-ghost"}`}
          >
            {label}
          </button>
        ))}
      </div>
  
      <div className="flex justify-center">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
  
}
