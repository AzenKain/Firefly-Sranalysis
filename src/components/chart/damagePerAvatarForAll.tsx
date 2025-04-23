"use client";
import { getNameChar } from '@/helper';
import useAvatarDataStore from '@/stores/avatarDataStore';
import useBattleDataStore from '@/stores/battleDataStore';
import useLocaleStore from '@/stores/localeStore';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import { useTranslations } from 'next-intl';
import { Bar } from 'react-chartjs-2';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const colorPalette = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(199, 199, 199, 0.6)',
];

const borderPalette = colorPalette.map((color) => color.replace('0.6', '1'));

export default function DamagePerAvatarForAll() {
    const transI18n = useTranslations("DataAnalysisPage");
    const { lineup, turnHistory } = useBattleDataStore()
    const { listAvatar } = useAvatarDataStore()
    const { locale } = useLocaleStore();
    const damageByAvatar = lineup.map((avatar) => {
        const turns = turnHistory.filter((turn) => turn.avatarId === avatar.avatarId);
        const totalDmg = turns.reduce((sum, turn) => sum + turn.totalDamage, 0);
        const char  = listAvatar.find(it => it.id === avatar.avatarId.toString())
        if (!char) return
        return {
            avatarId: avatar.avatarId,
            damage: totalDmg,
            avatarName: getNameChar(locale, char)
        };
    });
   
    const data = {
        labels: damageByAvatar.map((item) => item?.avatarName),
        datasets: [
            {
                label: transI18n("totalDamage"),
                data: damageByAvatar.map((item) => item?.damage),
                backgroundColor: damageByAvatar.map((_, idx) => colorPalette[idx % colorPalette.length]),
                borderColor: damageByAvatar.map((_, idx) => borderPalette[idx % borderPalette.length]),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
        plugins: {
            datalabels: {
                display: false, 
            },
        },
    };

    return <Bar data={data} options={options} />;
}
