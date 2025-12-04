"use client";
import useAvatarDataStore from "@/stores/avatarDataStore";
import useBattleDataStore from "@/stores/battleDataStore";
import CharacterCard from "../card/characterCard";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { AvatarHakushiType } from "@/types";
import useLocaleStore from "@/stores/localeStore";
import { getNameChar } from '@/helper/getNameChar';
import SkillBarChart from "../chart/skillBarChart";
import SkillPieChart from "../chart/skillPieChart";
import { motion } from "framer-motion";
import { DamageLineForOne } from "../chart/damageLineForOne";
import { DamagePerCycleForOne } from "../chart/damagePerCycleForOne";
import { useCalcTotalDmgAvatar, useCalcTotalTurnAvatar } from "@/hooks/useCalcAvatarData";
import Image from "next/image";
import NameAvatar from "../nameAvatar";
// import ShowCaseInfo from "../card/showCaseCard";

export default function LineupBar() {
    const [selectedCharacter, setSelectedCharacter] = useState<AvatarHakushiType | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const transI18n = useTranslations("DataAnalysisPage");
    const { lineup, turnHistory, dataAvatar } = useBattleDataStore();
    const { listAvatar } = useAvatarDataStore();
    const { locale } = useLocaleStore();
    const totalDamage = useCalcTotalDmgAvatar(selectedCharacter ? Number(selectedCharacter.id) : 0);
    const totalTurn = useCalcTotalTurnAvatar(selectedCharacter ? Number(selectedCharacter.id) : 0)


    const lineupAvatars = listAvatar.filter(item =>
        lineup.some(av => av.avatarId.toString() === item.id)
    );

    const handleShow = (modalId: string, item: AvatarHakushiType) => {
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
        setSelectedCharacter(undefined);
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
                className="text-center text-xl lg:text-2xl pb-2 font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {transI18n("lineupInfo")}
            </motion.h2>

            <div className="flex justify-center mb-2">
                <div className="badge badge-accent gap-2 text-lg items-center px-4 py-2 whitespace-nowrap max-w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                        <span className="text-sm truncate flex flex-row">
                            <div>
                                {transI18n("lastTurn")}: 
                            </div>
                            
                            <NameAvatar
                                locale={locale}
                                text={getNameChar(locale, listAvatar.find(it => it.id === turnHistory.findLast(i => i?.avatarId)?.avatarId?.toString()))}
                            />
                        </span>
                </div>
            </div>


            <div className="relative h-full pt-2 max-h-[90vh] lg:max-h-[80vh] border-t-2 border-accent">
                {lineupAvatars.length === 0 ? (
                    <div className="h-full flex justify-center items-start">
                        <p className="text-base-content opacity-50">{transI18n("noCharactersInLineup")}</p>
                    </div>
                ) : (
                    <div className="h-full w-full overflow-x-auto md:overflow-x-hidden md:overflow-y-auto rounded-lg">
                        <div className="flex flex-nowrap md:grid md:grid-cols-1 w-fit md:w-full justify-items-center items-start gap-2">
                            {lineupAvatars.map((item, index) => {
                                const lastTurnAvatarId = turnHistory.findLast(i => i?.avatarId)?.avatarId || -1;
                                const isLastTurn = item.id === lastTurnAvatarId.toString();

                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => handleShow("character_detail_modal", item)}
                                        className={`cursor-pointer shrink-0  justify-items-center ${isLastTurn ? "shadow-[inset_0_0_10px_2px_rgba(59,130,246,0.7),0_0_20px_5px_rgba(59,130,246,0.3)]" : ""
                                            }`}
                                    >
                                        <CharacterCard data={item} />
                                    </motion.div>
                                );
                            })}

                        </div>
                    </div>
                )}

                {/* Character Detail Modal */}
                <dialog id="character_detail_modal" className="modal backdrop-blur-sm">
                    <div className="modal-box w-11/12 max-w-7xl bg-linear-to-b bg-base-100 text-base-content border-purple-500 shadow-lg shadow-purple-500/20">
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
       
                            <NameAvatar
                                locale={locale}
                                text={getNameChar(locale, selectedCharacter).toUpperCase()}
                                className={"font-bold text-2xl text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-cyan-400"}
                            />
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
                                            <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-start items-center gap-6">
                                                <p>
                                                    {transI18n("id")}: <span className="font-bold">{selectedCharacter.id}</span>
                                                </p>
                                                <p className="flex items-center space-x-2">
                                                    <span>{transI18n("path")}:</span>
                                                    <span className="font-bold">{transI18n(selectedCharacter.baseType.toLowerCase())}</span>
                                                    {selectedCharacter.baseType && (
                                                        <Image

                                                            src={`https://api.hakush.in/hsr/UI/pathicon/${selectedCharacter.baseType.toLowerCase()}.webp`}
                                                            className="w-6 h-6"
                                                            alt={selectedCharacter.baseType.toLowerCase()}
                                                            width={24}
                                                            height={24}
                                                        />
                                                    )}
                                                </p>
                                                <p>
                                                    {transI18n("rarity")}: <span className="font-bold">{selectedCharacter.rank === "CombatPowerAvatarRarityType5" ? "5*" : "4*"}</span>
                                                </p>
                                                <p className="flex items-center space-x-2">
                                                    <span>{transI18n("element")}:</span>
                                                    <Image
                                                        src={`https://api.hakush.in/hsr/UI/element/${selectedCharacter.damageType.toLowerCase()}.webp`}
                                                        className="w-6 h-6"
                                                        alt={selectedCharacter.damageType.toLowerCase()}
                                                        width={24}
                                                        height={24}
                                                    />
                                                </p>

                                                {(() => {
                                                    const avatar = dataAvatar.find(it => it.avatar_id.toString() === selectedCharacter.id);
                                                    if (!avatar) return null;
                                                    const relicIds = avatar.relics.map(item => {
                                                        const relicIdStr = item.relic_id.toString().slice(1);
                                                        const slot = relicIdStr.slice(-1);
                                                        return `${item.relic_set_id}_${slot}`;
                                                    });
                                                    return (
                                                        <>
                                                            <p>
                                                                {transI18n("level")}: <span className="font-bold">{avatar.level}</span>
                                                            </p>
                                                            <p>
                                                                {transI18n("eidolons")}: <span className="font-bold">{avatar?.data?.rank}</span>
                                                            </p>
                                                            <div className="flex items-center space-x-2">
                                                                <span>{transI18n("lightcones")}:</span>
                                                                <Image
                                                                    src={`https://api.hakush.in/hsr/UI/lightconemediumicon/${avatar?.Lightcone?.item_id}.webp`}
                                                                    className="w-12 h-12"
                                                                    alt={avatar?.Lightcone?.item_id?.toString() || ""}
                                                                    width={200}
                                                                    height={200}
                                                                />
                                                            </div>
                                                            <div className="flex items-center space-x-2 w-full">
                                                                <span>{transI18n("relics")}:</span>
                                                                <div className="grid grid-cols-3 md:flex md:flex-row   w-full">
                                                                    {relicIds.map(it => (
                                                                        <Image
                                                                            key={it}
                                                                            src={`https://api.hakush.in/hsr/UI/relicfigures/IconRelic_${it}.webp`}
                                                                            className="w-12 h-12"
                                                                            alt={avatar?.Lightcone?.item_id?.toString() || ""}
                                                                            width={200}
                                                                            height={200}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </>
                                                    );
                                                })()}

                                            </div>


                                        </div>
                                        <Image
                                            src={`https://api.hakush.in/hsr/UI/avatarshopicon/${selectedCharacter.id}.webp`}
                                            alt={getNameChar(locale, selectedCharacter)}
                                            className="h-32 w-32 object-cover rounded-full border-2 border-purple-500"
                                            width={128}
                                            height={128}
                                        />
                                    </div>
                                </div>
                                {/* <div className="md:col-span-2 bg-base-200 rounded-lg p-4 shadow-md">
                                <h4 className="text-lg font-semibold mb-2 text-pink-500">{transI18n("characterInformation")}</h4>
                                    <ShowCaseInfo></ShowCaseInfo>
                                </div> */}
                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <p className="mt-2 font-bold text-lg text-cyan-500">{transI18n("totalTurn")}: <span className="text-base-content">{Number(totalTurn).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span></p>
                                </div>
                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-2 text-purple-500">{transI18n("totalDamage")}: <span className="text-base-content">{Number(totalDamage).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span></h4>
                                </div>

                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-4 text-purple-500">{transI18n("skillDamageBreakdown")}</h4>
                                    <SkillBarChart avatarId={Number(selectedCharacter.id) ?? 0} />
                                </div>

                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-lg font-semibold mb-4 text-cyan-500">{transI18n("damageOverTime")}</h4>

                                    </div>

                                    <DamageLineForOne avatarId={Number(selectedCharacter.id) ?? 0} />
                                </div>

                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-4 text-cyan-500">{transI18n("skillUsageDistribution")}</h4>
                                    <SkillPieChart avatarId={Number(selectedCharacter.id) ?? 0} />
                                </div>

                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-lg font-semibold text-purple-500">{transI18n("damagePerCycle")}</h4>
                                    </div>
                                    <DamagePerCycleForOne avatarId={Number(selectedCharacter.id) ?? 0} />
                                </div>

                            </motion.div>
                        )}
                    </div>
                </dialog>
            </div>
        </div>
    );
}