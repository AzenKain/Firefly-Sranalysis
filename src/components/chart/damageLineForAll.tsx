'use client';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useDamageLinesForAll } from '@/hooks/useDamageLinesForAll';
import useAvatarDataStore from '@/stores/avatarDataStore';
import useLocaleStore from '@/stores/localeStore';
import { getNameChar } from '@/helper';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const colors = ['#f87171', '#34d399', '#60a5fa', '#facc15', '#a78bfa', '#fb923c'];

export default function MultiCharLineChart() {
  const [mode, setMode] = useState<1 | 2>(2);
  const dataByAvatar = useDamageLinesForAll(mode);
  const avatarIds = Object.keys(dataByAvatar).map(Number);
  const { listAvatar } = useAvatarDataStore()
  const { locale } = useLocaleStore();
  const transI18n = useTranslations("DataAnalysisPage")


  const data = {
    datasets: avatarIds.map((id, idx) => ({
      label: getNameChar(locale, listAvatar.find(it => it.id == id.toString())),
      data: dataByAvatar[id].map(({ x, y }: { x: number; y: number }) => {
        return {
          x: x.toFixed(2),
          y: y.toFixed(2)
        }
      }),
      borderColor: colors[idx % colors.length],
      backgroundColor: colors[idx % colors.length],
      fill: false,
      tension: 0.3,
    })),
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as "bottom" | "center" | "left" | "top" | "right",
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        beginAtZero: true,
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

      <Line data={data} options={options} />
    </div>

  )
}
