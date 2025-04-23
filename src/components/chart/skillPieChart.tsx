"use client";
import { useSkillDamageByAvatar } from '@/hooks/useSkillDamageStats';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTranslations } from 'next-intl';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function SkillPieChart({ avatarId }: { avatarId: number }) {
    const { labels, damageValues } = useSkillDamageByAvatar(avatarId);
    const transI18n = useTranslations("DataAnalysisPage");
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
                backgroundColor: [
                    '#f87171', // red
                    '#facc15', // yellow
                    '#34d399', // green
                    '#60a5fa', // blue
                    '#a78bfa', // purple
                    '#fb923c', // orange
                ],
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    };

    return (
        <Pie
            data={data}
            options={{
                responsive: true,
                plugins: {
                    legend: { position: 'right' },
                    datalabels: {
                        display: false, 
                    },
                },
            }}
        />
    );
}
