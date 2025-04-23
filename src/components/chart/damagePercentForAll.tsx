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

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = ['#f87171', '#34d399', '#60a5fa', '#facc15', '#a78bfa', '#fb923c', '#f472b6'];

export default function DamagePercentChartForAll() {
  const data = useDamagePercentPerAvatar();
  const { listAvatar } = useAvatarDataStore()
  const { locale } = useLocaleStore();
  const transI18n = useTranslations("DataAnalysisPage");
  const chartData = {
    labels: data.map(d => getNameChar(locale, listAvatar.find(it => it.id == d.avatarId.toString()))),
    datasets: [
      {
        label: '% ' + transI18n("damage"),
        data: data.map(d => d.percent.toFixed(2)),
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

  return <Pie data={chartData} options={options} />;
}
