"use client";
import useAvatarDataStore from "@/stores/avatarDataStore";
import useBattleDataStore from "@/stores/battleDataStore";
import CharacterCard from "../card/characterCard";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { AvatarType } from "@/types";
import useLocaleStore from "@/stores/localeStore";
import { getNameChar } from '@/helper/getNameChar';
import SkillBarChart from "../chart/skillBarChart";
import SkillPieChart from "../chart/skillPieChart";
import { motion } from "framer-motion";
import { DamageLineForOne } from "../chart/damageLineForOne";
import { DamagePerCycleForOne } from "../chart/damagePerCycleForOne";
import { useCalcTotalDmgAvatar, useCalcTotalTurnAvatar } from "@/hooks/useCalcAvatarData";

export default function LineupBar() {
    const [selectedCharacter, setSelectedCharacter] = useState<AvatarType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const transI18n = useTranslations("DataAnalysisPage");
    const { lineup } = useBattleDataStore();
    const { listAvatar } = useAvatarDataStore();
    const { locale } = useLocaleStore();
    const [modeBar, setModeBar] = useState<0 | 1 | 2>(1);
    const [modeLine, setModeLine] = useState<0 | 1>(1);


    const totalDamage = useCalcTotalDmgAvatar(selectedCharacter ? Number(selectedCharacter.id) : 0);
    const totalTurn = useCalcTotalTurnAvatar(selectedCharacter ? Number(selectedCharacter.id) : 0)


    const lineupAvatars = listAvatar.filter(item =>
        lineup.some(av => av.avatarId.toString() === item.id)
    );

    const handleShow = (modalId: string, item: AvatarType) => {
        const modal = document.getElementById(modalId) as HTMLDialogElement | null;
        if (modal) {
            setSelectedCharacter(item);
            setIsModalOpen(true);
            modal.showModal();
        }
    };

    // Close modal handler
    const handleCloseModal = (modalId: string) => {
        setIsModalOpen(false);
        setSelectedCharacter(null);
        const modal = document.getElementById(modalId) as HTMLDialogElement | null;
        if (modal) {
            modal.close()
        }
    };

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isModalOpen) {
                handleCloseModal("character_detail_modal");
            }
        };

        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [isModalOpen]);

    return (
        <div className="p-4 md:p-1 rounded-lg shadow-lg w-full h-full">
            <motion.h2
                className="text-center text-xl lg:text-2xl pb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {transI18n("lineupInfo")}
            </motion.h2>

            <div className="relative h-full pt-2 max-h-[90vh] border-t-2 border-accent">
                {lineupAvatars.length === 0 ? (
                    <div className="h-full flex justify-center items-start">
                        <p className="text-base-content opacity-50">{transI18n("noCharactersInLineup")}</p>
                    </div>
                ) : (
                    <div className="h-full w-full overflow-x-auto md:overflow-x-hidden md:overflow-y-auto custom-scrollbar rounded-lg">
                        <style jsx>{`
                            .custom-scrollbar {
                            scrollbar-width: thin;
                            scrollbar-color: hsl(var(--p)) hsl(var(--b3));
                            }

                            .custom-scrollbar::-webkit-scrollbar {
                            width: 8px;
                            height: 8px;
                            }

                            .custom-scrollbar::-webkit-scrollbar-track {
                            background: hsl(var(--b3));
                            border-radius: 10px;
                            }

                            .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: hsl(var(--p));
                            border-radius: 10px;
                            }

                            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: hsl(var(--pf));
                            }

                            .custom-scrollbar::-webkit-scrollbar-button {
                            display: none;
                            height: 0;
                            width: 0;
                            }
                        `}</style>

                        <div className="flex flex-nowrap md:grid md:grid-cols-1 w-fit md:w-full justify-items-center items-start gap-2">
                            {lineupAvatars.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="cursor-pointer flex-shrink-0 md:w-full justify-items-center"
                                    onClick={() => handleShow("character_detail_modal", item)}
                                >
                                    <CharacterCard data={item} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                )}

                {/* Character Detail Modal */}
                <dialog id="character_detail_modal" className="modal backdrop-blur-sm">
                    <div className="modal-box w-11/12 max-w-7xl bg-gradient-to-b bg-base-100 text-base-content border-purple-500 shadow-lg shadow-purple-500/20">
                        <div className="sticky top-0 z-10">
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                                className="btn btn-circle btn-md absolute right-2 top-2 bg-red-600 hover:bg-red-700 text-white border-none"
                                onClick={() => handleCloseModal("character_detail_modal")}
                            >
                                ✕
                            </motion.button>
                        </div>

                        <div className="border-b border-purple-500/30 px-6 py-4 mb-4">
                            <h3 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
                                {selectedCharacter ? getNameChar(locale, selectedCharacter).toUpperCase() : ""}
                            </h3>
                        </div>

                        {selectedCharacter && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2"
                            >
                                <div className="md:col-span-2 bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-2 text-pink-500">{transI18n("characterInformation")}</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2">
                                            <div className="flex flex-col space-y-2 relative">
                                                <p>
                                                    {transI18n("id")}: <span className="font-bold">{selectedCharacter.id}</span>
                                                </p>
                                                <p className="flex items-center space-x-2">
                                                    <span>{transI18n("path")}:</span>
                                                    <span className="font-bold">{transI18n(selectedCharacter.baseType.toLowerCase())}</span>
                                                    {selectedCharacter.baseType && (
                                                        <img
                                                            loading="lazy"
                                                            src={`https://api.hakush.in/hsr/UI/pathicon/${selectedCharacter.baseType.toLowerCase()}.webp`}
                                                            className="w-6 h-6"
                                                            alt={selectedCharacter.baseType.toLowerCase()}
                                                        />
                                                    )}
                                                </p>
                                                <p>
                                                    {transI18n("rarity")}: <span className="font-bold">{selectedCharacter.rank === "CombatPowerAvatarRarityType5" ? "5*" : "4*"}</span>
                                                </p>
                                                <p className="flex items-center space-x-2">
                                                    <span>{transI18n("element")}:</span>
                                                    <span className="font-bold">{transI18n(selectedCharacter.damageType.toLowerCase())}</span>
                                                    {selectedCharacter.damageType && (
                                                        <img
                                                            loading="lazy"
                                                            src={`https://api.hakush.in/hsr/UI/element/${selectedCharacter.damageType.toLowerCase()}.webp`}
                                                            className="w-6 h-6"
                                                            alt={selectedCharacter.damageType.toLowerCase()}
                                                        />
                                                    )}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="flex justify-center items-center">
                                            {selectedCharacter && (
                                                <img
                                                    src={`https://api.hakush.in/hsr/UI/avatarshopicon/${selectedCharacter.id}.webp`}
                                                    alt={getNameChar(locale, selectedCharacter)}
                                                    className="h-32 w-32 object-cover rounded-full border-2 border-purple-500"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <p className="mt-2 font-bold text-lg text-cyan-500">{transI18n("totalTurn")}: <span className="text-base-content">{totalTurn.toFixed(2)}</span></p>
                                </div>
                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-2 text-purple-500">{transI18n("totalDamage")}: <span className="text-base-content">{totalDamage.toFixed(2)}</span></h4>
                                </div>


                                <div className="bg-base-200 rounded-lg p-4 shadow-md max-h-11/12">
                                    <h4 className="text-lg font-semibold mb-4 text-purple-500">{transI18n("skillDamageBreakdown")}</h4>
                                    <SkillBarChart avatarId={Number(selectedCharacter.id) ?? 0} />
                                </div>

                                <div className="bg-base-200 rounded-lg p-4 shadow-md max-h-11/12">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-lg font-semibold mb-4 text-cyan-500">{transI18n("damageOverTime")}</h4>
                                        <div className="flex gap-2">
                                            {[0, 1].map((m) => (
                                                <button
                                                    key={m}
                                                    onClick={() => setModeLine(m as 0 | 1)}
                                                    className={`btn btn-sm ${modeLine === m ? "btn-accent" : "btn-ghost"}`}
                                                >
                                                    {transI18n("type")} {m}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <DamageLineForOne avatarId={Number(selectedCharacter.id) ?? 0} mode={modeLine} />
                                </div>

                                <div className="bg-base-200 rounded-lg p-4 shadow-md max-h-11/12">
                                    <h4 className="text-lg font-semibold mb-4 text-cyan-500">{transI18n("skillUsageDistribution")}</h4>
                                    <SkillPieChart avatarId={Number(selectedCharacter.id) ?? 0} />
                                </div>

                                <div className="bg-base-200 rounded-lg p-4 shadow-md max-h-11/12">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-lg font-semibold text-purple-500">{transI18n("damagerPerCycle")}</h4>
                                        <div className="flex gap-2">
                                            {[0, 1, 2].map((m) => (
                                                <button
                                                    key={m}
                                                    onClick={() => setModeBar(m as 0 | 1 | 2)}
                                                    className={`btn btn-sm ${modeBar === m ? "btn-accent" : "btn-ghost"}`}
                                                >
                                                    {transI18n("type")} {m}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <DamagePerCycleForOne avatarId={Number(selectedCharacter.id) ?? 0} mode={modeBar} />
                                </div>

                            </motion.div>
                        )}
                    </div>
                </dialog>
            </div>
        </div>
    );
}