'use client';
import { getNameChar } from '@/helper';
import { useSkillDamageByAvatar } from '@/hooks/useSkillDamageStats';
import useAvatarDataStore from '@/stores/avatarDataStore';
import useLocaleStore from '@/stores/localeStore';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTranslations } from 'next-intl';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

export default function SkillBarChart({ avatarId }: { avatarId: number }) {
    const { labels, damageValues } = useSkillDamageByAvatar(avatarId);
    const transI18n = useTranslations("DataAnalysisPage");
    const colors = ['#f87171', '#facc15', '#34d399', '#60a5fa', '#a78bfa', '#fb923c'];
    const { listAvatar } = useAvatarDataStore()
    const { locale } = useLocaleStore();
    const data = {
        labels: labels.map(it => transI18n(it.toLowerCase())),
        datasets: [
            {
                label: getNameChar(locale, listAvatar.find(it => it.id === avatarId.toString())),
                data: damageValues,
                backgroundColor: colors.slice(0, labels.length),
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
            datalabels: {
                display: false, 
            },
        },
    };

    return <Bar data={data} options={options} />;
}
