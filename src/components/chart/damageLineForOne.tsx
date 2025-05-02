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
import { useState } from "react";

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


export function DamageLineForOne({ avatarId }: { avatarId: number; }) {
  const [mode, setMode] = useState<0 | 1>(1);
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
    },
    scales: {
      x: { title: { display: true, text: transI18n("actionValue") } },
      y: { title: { display: true, text: transI18n("damage") }, beginAtZero: true },
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
            onClick={() => setMode(m as 0 | 1)}
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
