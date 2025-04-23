"use client";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { useDamageLineForOne } from "@/hooks/useDamageLineForOne";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useTranslations } from "next-intl";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

ChartJS.defaults.set('plugins.datalabels', {
  color: '#FE777B'
});

export function DamageLineForOne({ avatarId, mode = 0 }: { avatarId: number; mode?: 0 | 1 }) {
  const dataRaw = useDamageLineForOne(avatarId, mode);
  const transI18n = useTranslations("DataAnalysisPage");
  const data = {
    labels: dataRaw.map(d => Number(d.x.toFixed(2))),
    datasets: [
      {
        label: mode === 1 ? transI18n("cumulativeDamage") : transI18n("damageByActionValue"),
        data: dataRaw.map(d => Number(d.y.toFixed(2))),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      datalabels: {
        display: false, 
      },
    },
    scales: {
      x: { title: { display: true, text: transI18n("actionValue") } },
      y: { title: { display: true, text: transI18n("damage") }, beginAtZero: true },
    },

  };

  return <Line data={data} options={options} />;
}
