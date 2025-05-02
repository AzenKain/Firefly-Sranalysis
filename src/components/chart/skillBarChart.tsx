'use client';
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { useTranslations } from 'next-intl';
import { useSkillDamageForAvatar } from '@/hooks/useSkillDamageForAvatar';
import { useDamageByTypeForAvatar } from '@/hooks/useDamageTypeForAvatar';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function SkillBarChart({ avatarId }: { avatarId: number }) {
  const [mode, setMode] = useState<1 | 2>(2);

  const transI18n = useTranslations('DataAnalysisPage');
  const { labels: skillLabels, damageValues: skillDamageValues } = useSkillDamageForAvatar(avatarId);
  const { labels: typeLabels, damageValues: typeDamageValues } = useDamageByTypeForAvatar(avatarId);

  const colors = ['#f87171', '#facc15', '#34d399', '#60a5fa', '#a78bfa', '#fb923c'];

  const data = {
    labels: mode === 1 ? skillLabels.map(it => transI18n(it)) : typeLabels.map(it => transI18n(it)),
    datasets: [
      {
        label: mode === 1
          ? transI18n('skill')
          : transI18n('damage'),
        data: mode === 1 ? skillDamageValues : typeDamageValues,
        backgroundColor: colors.slice(0, (mode === 1 ? skillLabels : typeLabels).length),
        borderColor: '#111',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full">
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
      <Bar data={data} options={options} />
    </div>
  );
}
