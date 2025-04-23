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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const colors = ['#f87171', '#34d399', '#60a5fa', '#facc15', '#a78bfa', '#fb923c'];

export default function MultiCharLineChart({ mode = 0 }: { mode?: 0 | 1 }) {
  const dataByAvatar = useDamageLinesForAll(mode);
  const avatarIds = Object.keys(dataByAvatar).map(Number);
  const { listAvatar } = useAvatarDataStore()
  const { locale } = useLocaleStore();
  
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
    plugins: {
        datalabels: {
            display: false, 
        },
    },
  };

  return <Line data={data} options={options} />;
}
