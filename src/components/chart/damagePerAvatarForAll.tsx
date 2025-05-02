'use client';
import { useState } from 'react';
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
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTranslations } from 'next-intl';
import {attackTypeToString} from "@/types";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const colorPalette = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(199, 199, 199, 0.6)',
    'rgba(255, 99, 255, 0.6)',
    'rgba(0, 200, 83, 0.6)',
    'rgba(255, 112, 67, 0.6)',
    'rgba(63, 81, 181, 0.6)',
    'rgba(0, 188, 212, 0.6)',
    'rgba(233, 30, 99, 0.6)',
    'rgba(124, 179, 66, 0.6)',
    'rgba(255, 235, 59, 0.6)',
    'rgba(158, 158, 158, 0.6)',
    'rgba(121, 85, 72, 0.6)',
    'rgba(96, 125, 139, 0.6)',
    'rgba(100, 181, 246, 0.6)',
    'rgba(255, 171, 145, 0.6)',
    'rgba(174, 213, 129, 0.6)',
    'rgba(255, 245, 157, 0.6)'
  ];
  
const borderPalette = colorPalette.map((c) => c.replace('0.6', '1'));

export default function DamagePerAvatarForAll() {
    const transI18n = useTranslations("DataAnalysisPage");
    const { lineup, skillHistory } = useBattleDataStore();
    const { listAvatar } = useAvatarDataStore();
    const { locale } = useLocaleStore();

    const [mode, setMode] = useState<number>(2);

    const avatarMap = lineup.map((avatar) => {
        const char = listAvatar.find(it => it.id === avatar.avatarId.toString());
        if (!char) return undefined;
        return {
            avatarId: avatar.avatarId,
            avatarName: getNameChar(locale, char)
        };
    }).filter(Boolean) as { avatarId: number, avatarName: string }[];

    const labels = avatarMap.map(a => a.avatarName);

    let datasets: Array<{
        label: string;
        data: number[];
        backgroundColor: string | string[];
        borderColor: string | string[];
        borderWidth: number;
        stack?: string;
    }> = [];

    if (mode === 1) {
        datasets = [
            {
                label: transI18n("totalDamage"),
                data: avatarMap.map(({ avatarId }) => {
                    const total = skillHistory
                        .filter(skill => skill.avatarId === avatarId)
                        .reduce((sum, s) => sum + s.totalDamage, 0);
                    return total;
                }),
                backgroundColor: avatarMap.map((_, i) => colorPalette[i % colorPalette.length]),
                borderColor: avatarMap.map((_, i) => borderPalette[i % borderPalette.length]),
                borderWidth: 1
            }
        ];
    }

    if (mode === 2) {
        const damageTypesSet = new Set<string>();
        avatarMap.forEach(({ avatarId }) => {
            skillHistory.filter(s => s.avatarId === avatarId).forEach(s =>
                s.damageDetail?.forEach(d => d.damage_type && damageTypesSet.add(transI18n(attackTypeToString(d?.damage_type).toLowerCase())))
            );
        });
        const damageTypes = Array.from(damageTypesSet);

        datasets = damageTypes.map((dt, i) => ({
            label: dt,
            data: avatarMap.map(({ avatarId }) => {
                const total = skillHistory
                    .filter(skill => skill.avatarId === avatarId)
                    .flatMap(s => s.damageDetail || [])
                    .filter(d => transI18n(attackTypeToString(d?.damage_type).toLowerCase()) === dt)
                    .reduce((sum, d) => sum + d.damage, 0);
                return total;
            }),
            backgroundColor: colorPalette[i % colorPalette.length],
            borderColor: borderPalette[i % borderPalette.length],
            borderWidth: 1,
            stack: transI18n('damage')
        }));
    }

    if (mode === 3) {
        const skillTypesSet = new Set<string>();
        skillHistory.forEach(s => skillTypesSet.add(transI18n(attackTypeToString(s?.skillType)?.toLowerCase())));
        const skillTypes = Array.from(skillTypesSet);

        datasets = skillTypes.map((st, i) => ({
            label: st,
            data: avatarMap.map(({ avatarId }) => {
                const total = skillHistory
                    .filter(skill => skill.avatarId === avatarId && transI18n(attackTypeToString(skill?.skillType).toLowerCase()) === st)
                    .reduce((sum, s) => sum + s.totalDamage, 0);
                return total;
            }),
            backgroundColor: colorPalette[i % colorPalette.length],
            borderColor: borderPalette[i % borderPalette.length],
            borderWidth: 1,
            stack: transI18n('skill')
        }));
    }

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                stacked: mode !== 1,
                ticks: {
                    precision: 0,
                },
            },
            x: {
                stacked: mode !== 1,
            },
        },

    };

    return (
        <div className="w-full">
            <div className="mb-4 flex items-start gap-2 justify-end">
                {[
                    { mode: 1, label: `${transI18n("type")} 1`, className: "btn-primary" },
                    { mode: 2, label: `${transI18n("type")} 2`, className: "btn-warning" },
                    { mode: 3, label: `${transI18n("type")} 3`, className: "btn-accent" },
                ].map(({ mode: m, label, className }) => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`btn btn-sm ${mode === m ? className : "btn-ghost"}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <Bar data={{ labels, datasets }} options={options}/>
        </div>

    );
}
