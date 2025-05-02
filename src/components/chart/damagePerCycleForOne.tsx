"use client";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { useDamagePerCycleForOne } from "@/hooks/useDamagePerCycle";

import { Chart as ChartJS, BarElement, ArcElement, RadialLinearScale } from "chart.js";
import { useTranslations } from "next-intl";
import { useState } from "react";

ChartJS.register(BarElement, ArcElement, RadialLinearScale);
export function DamagePerCycleForOne({
    avatarId,
}: {
    avatarId: number;
}) {
    const [mode, setMode] = useState<0 | 1 | 2>(0);
    const dataRaw = useDamagePerCycleForOne(avatarId, mode);
    const transI18n = useTranslations("DataAnalysisPage");
    const data = {
        labels: dataRaw.map(d => d.x),
        datasets: [
            {
                label: mode === 0 ? `${transI18n("damagePerCycleAndWave")}` : mode === 1 ? `${transI18n("damagePerCycle")}` : `${transI18n("damagePerWave")}`,
                data: dataRaw.map(d => d.y),
                backgroundColor: dataRaw.map((_, i) =>
                    ['#f87171', '#34d399', '#60a5fa', '#facc15', '#a78bfa', '#fb923c', '#f472b6'][i % 7]
                ),
            },
        ],
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: { display: true },
        },
        scales: {
            x: { title: { display: true, text: transI18n("cycleCount") } },
            y: { title: { display: true, text: transI18n("totalDamage") }, beginAtZero: true },
        },

    };

    return (
        <div className="w-full">
            <div className="mb-4 flex items-start gap-2 justify-end">
                {[
                    { mode: 0, label: `${transI18n("type")} 1`, className: "btn-primary" },
                    { mode: 1, label: `${transI18n("type")} 2`, className: "btn-warning" },
                    { mode: 2, label: `${transI18n("type")} 3`, className: "btn-warning" },
                ].map(({ mode: m, label, className }) => (
                    <button
                        key={m}
                        onClick={() => setMode(m as 0 | 1 | 2)}
                        className={`btn btn-sm ${mode === m ? className : "btn-ghost"}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <Bar data={data} options={options} />
        </div>
    )
}
