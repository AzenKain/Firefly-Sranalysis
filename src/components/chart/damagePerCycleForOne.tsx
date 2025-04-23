"use client";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { useDamagePerCycleForOne } from "@/hooks/useDamagePerCycle";

import { Chart as ChartJS, BarElement, ArcElement, RadialLinearScale } from "chart.js";
import { useTranslations } from "next-intl";

ChartJS.register(BarElement, ArcElement, RadialLinearScale);
export function DamagePerCycleForOne({
    avatarId,
    mode,
}: {
    avatarId: number;
    mode: 0 | 1 | 2;
}) {
    const dataRaw = useDamagePerCycleForOne(avatarId, mode);
    const transI18n = useTranslations("DataAnalysisPage");
    const data = {
        labels: dataRaw.map(d => d.x),
        datasets: [
            {
                label: mode === 0 ? `${transI18n("damagerPerCycle")} (100av)` : mode === 1 ?  `${transI18n("damagerPerCycle")} (150av | 100v)` : `${transI18n("damagerPerCycle")} (150av | 150av | 100v)`,
                data: dataRaw.map(d => d.y),
                backgroundColor: "rgba(255,99,132,0.6)",
            },
        ],
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: { display: true },
            datalabels: {
                display: false, 
            },
        },
        scales: {
            x: { title: { display: true, text: transI18n("cycleCount") } },
            y: { title: { display: true, text: transI18n("totalDamage") }, beginAtZero: true },
        },

    };

    return <Bar data={data} options={options} />;
}
