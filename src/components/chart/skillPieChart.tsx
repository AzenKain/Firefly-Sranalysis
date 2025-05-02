'use client';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTranslations } from 'next-intl';
import { useSkillDamageForAvatar } from '@/hooks/useSkillDamageForAvatar';
import { useDamageByTypeForAvatar } from '@/hooks/useDamageTypeForAvatar';

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  '#f87171', '#facc15', '#34d399', '#60a5fa', '#a78bfa', '#fb923c',
  '#f472b6', '#38bdf8', '#a3e635', '#fdba74', '#c084fc', '#4ade80',
  '#fcd34d', '#818cf8', '#f43f5e', '#14b8a6', '#e879f9', '#86efac',
];

export default function SkillPieChart({ avatarId }: { avatarId: number }) {
  const [mode, setMode] = useState<1 | 2>(2);
  const transI18n = useTranslations("DataAnalysisPage");

  const skillData = useSkillDamageForAvatar(avatarId);
  const typeData = useDamageByTypeForAvatar(avatarId);

  const { labels, damageValues } = mode === 1 ? skillData : typeData;
  const total = damageValues.reduce((sum, val) => sum + val, 0);

  const labelsWithPercent = labels.map((label, index) => {
    const value = damageValues[index];
    const percent = total ? ((value / total) * 100).toFixed(1) : '0.0';
    return `${transI18n(label.toLowerCase())} (${percent}%)`;
  });

  const data = {
    labels: labelsWithPercent,
    datasets: [
      {
        data: damageValues,
        backgroundColor: COLORS.slice(0, labels.length),
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full ">
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
      <Pie
          data={data}
          options={{
            responsive: true,
            cutout: '30%',
          }}
      />
    </div>
  );
}
