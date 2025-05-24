"use client"

import useBattleDataStore from "@/stores/battleDataStore";
import Image from "next/image";

function formatEnemyIdForURL(id?: number): string {
    const n = id ?? 0;
    const adjusted = n.toString().length === 9 ? n / 100 : n;
    return adjusted.toFixed(0);
}

export default function EnemyBar() {
    const { enemyDetail } = useBattleDataStore()

    return (
        <div className="p-3 w-full">
            <div className="flex gap-3 overflow-x-auto pb-2">
                {enemyDetail && Object.values(enemyDetail).filter((enemy) => (enemy.stats?.AV > 0
                    && enemy.stats.HP <= enemy.maxHP)).map((enemy, uid) => (
                        <div key={uid} className="bg-base-200 rounded-lg p-3 border border-gray-700 w-52 flex-shrink-0">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={`https://api.hakush.in/hsr/UI/monstermiddleicon/Monster_${formatEnemyIdForURL(enemy.id)}.webp`}
                                        alt={enemy.name}
                                        width={40}
                                        height={40}
                                        className="object-cover w-10 h-10 rounded-lg"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold leading-tight truncate overflow-hidden" title={enemy.name}>
                                            {enemy.name}
                                        </h3>
                                        <p className="text-base-content/70 text-xs">Level {enemy.level || 1}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="text-xs text-base-content/70">HP:</div>
                                    <div className="text-xs font-medium">
                                        <div className="text-error">
                                            {Number(enemy?.stats?.HP ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </div>
                                        <div className="text-base-content/50 mx-1">/</div>
                                        <div className="text-base-content/70">
                                            {Number(enemy?.maxHP ?? 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </div>
                                    </div>
                                </div>

                                <div className="relative w-full bg-base-300 rounded-full h-2.5">
                                    <div
                                        className="bg-error h-2.5 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${Math.max(0, Math.min(100, ((enemy.stats?.HP || 0) / (enemy.maxHP || 100)) * 100))}%`
                                        }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                                        {Math.round(((enemy.stats?.HP || 0) / (enemy.maxHP || 100)) * 100)}%
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}