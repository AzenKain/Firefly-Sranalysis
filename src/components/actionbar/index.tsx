"use client";
import useAvatarDataStore from "@/stores/avatarDataStore";
import useBattleDataStore from "@/stores/battleDataStore";
import useLocaleStore from "@/stores/localeStore";
import {attackTypeToString, AvatarHakushiType} from "@/types";
import { SkillBattleInfo } from "@/types/mics";
import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { getNameChar } from "@/helper";
import Image from "next/image";
import NameAvatar from "../nameAvatar";

export default function ActionBar() {
    const [selectTurn, setSelectTurn] = useState<SkillBattleInfo | null>(null);
    const [selectAvatar, setSelectAvatar] = useState<AvatarHakushiType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { skillHistory, turnHistory, cycleIndex, waveIndex, maxWave } = useBattleDataStore();
    const { listAvatar } = useAvatarDataStore();
    const { locale } = useLocaleStore();
    const transI18n = useTranslations("DataAnalysisPage");
    const turnListRef = useRef<HTMLDivElement>(null);


    const contentStyle: React.CSSProperties = {

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const handleShow = (modalId: string, avatar: AvatarHakushiType, turn: SkillBattleInfo) => {
        const modal = document.getElementById(modalId) as HTMLDialogElement | null;
        if (modal) {
            setSelectAvatar(avatar);
            setSelectTurn(turn);
            setIsModalOpen(true);
            modal.showModal();
        }
    };

    // Close modal handler
    const handleCloseModal = (modalId: string) => {
        setIsModalOpen(false);
        setSelectAvatar(null);
        const modal = document.getElementById(modalId) as HTMLDialogElement | null;
        if (modal) {
            modal.close();
        }
    };

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isModalOpen) {
                handleCloseModal("action_detail_modal");
            }
        };

        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [isModalOpen]);

    // Scroll to the bottom when new turns are added
    useEffect(() => {
        if (turnListRef.current && skillHistory.length > 0) {
            turnListRef.current.scrollTop = turnListRef.current.scrollHeight;
        }
    }, [skillHistory.length]);

    return (
        <div className="p-4 md:p-1 rounded-lg shadow-lg w-full h-full">
            <motion.h2
                className="text-center text-xl lg:text-2xl mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {transI18n("actionBar")}
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 items-center justify-items-center w-full gap-2 mb-2 mx-2">
                <div className="badge badge-soft badge-info gap-2 text-lg py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clipRule="evenodd" />
                    </svg>
                    <span>{waveIndex}/{maxWave}</span>
                </div>
                <div className="badge badge-soft badge-error gap-2 text-lg py-3 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className="size-6">
                        <path d="M0 32C0 14.3 14.3 0 32 0L64 0 320 0l32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l0 11c0 42.4-16.9 83.1-46.9 113.1L237.3 256l67.9 67.9c30 30 46.9 70.7 46.9 113.1l0 11c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0L64 512l-32 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l0-11c0-42.4 16.9-83.1 46.9-113.1L146.7 256 78.9 188.1C48.9 158.1 32 117.4 32 75l0-11C14.3 64 0 49.7 0 32zM96 64l0 11c0 25.5 10.1 49.9 28.1 67.9L192 210.7l67.9-67.9c18-18 28.1-42.4 28.1-67.9l0-11L96 64zm0 384l192 0 0-11c0-25.5-10.1-49.9-28.1-67.9L192 301.3l-67.9 67.9c-18 18-28.1 42.4-28.1 67.9l0 11z" />
                    </svg>
                    <span>{cycleIndex}</span>
                </div>
            </div>
            <div
                ref={turnListRef}
                className="flex md:block px-2 md:px-0 w-full pt-2 border-t-2 border-accent overflow-x-auto md:overflow-x-hidden md:overflow-y-auto max-h-[90vh] lg:max-h-[80vh]"
            >
                <div className="flex flex-nowrap md:grid md:grid-cols-1 gap-2 w-fit md:w-full">
                    {skillHistory.length === 0 ? (
                        <div className="flex items-center justify-center h-full w-full">
                            <p className="text-base-content opacity-50">{transI18n("noTurns")}</p>
                        </div>
                    ) : (
                        skillHistory.map((turn, index) => {
                            const data = listAvatar.find(it => it.id === turn.avatarId.toString());
                            if (!data) return null;
                            const text = getNameChar(locale, data);

                            return (
                                <div key={index} className="h-full md:w-full">
                                    <div
                                        onClick={() => handleShow("action_detail_modal", data, turn)}
                                        className="h-full grid grid-cols-2 gap-2 border bg-base-100 w-full hover:bg-base-200 transition-colors duration-200 border-cyan-400 border-l-4 cursor-pointer min-w-[200px] sm:min-w-[250px] md:min-w-0"
                                    >
                                        <div
                                            style={contentStyle}
                                            className="lg:col-span-1 grid grid-cols-1 items-center justify-center py-2"
                                        >
                                            <div className="avatar">
                                                <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center bg-base-300 border-cyan-400 border-l-4">
                                                    
                                                    <Image
                                                        src={`https://api.hakush.in/hsr/UI/avatarshopicon/${data.id}.webp`}
                                                        alt={text}
                                                        width={32}
                                                        height={32}
                                                        className="w-8 h-8 object-contain"
                                                    />
                                                </div>
                                            </div>
                                            <NameAvatar
                                                locale={locale}
                                                text={getNameChar(locale, data)}
                                                className="text-base-content text-center text-sm mt-1 font-medium"
                                            />   
                                        </div>
                                        <div className="grid grid-cols-1 justify-center gap-2 py-2 w-full">
                                            <div className="bg-local text-primary text-xs  max-w-full">
                                                {`${transI18n("useSkill")}: ${transI18n(attackTypeToString(turn.skillType).toLowerCase())}`}
                                            </div>
                                            <div className="text-primary text-xs max-w-full">
                                                {`${transI18n("totalDamage")}: ${Number(turn.totalDamage).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );

                        })
                    )}
                </div>
            </div>


            {/* Character Detail Modal */}
            <dialog id="action_detail_modal" className="modal sm:modal-middle backdrop-blur-sm">
                <div className="modal-box w-11/12 max-w-7xl bg-base-100 text-base-content border border-purple-500/50 shadow-lg shadow-purple-500/20">
                    <div className="sticky top-0 z-10">
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                            className="btn btn-circle btn-md absolute right-2 top-2 bg-red-600 hover:bg-red-700 text-white border-none"
                            onClick={() => handleCloseModal("action_detail_modal")}
                        >
                            ✕
                        </motion.button>
                    </div>

                    <div className="border-b border-purple-500/30 px-6 py-4 mb-4">
                        <h3 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">
                            {transI18n("turnDetail").toUpperCase()}
                        </h3>
                    </div>

                    {selectAvatar && selectTurn && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mt-4 w-full"
                        >
                            <div className="bg-base-200 rounded-lg p-4 shadow-md mb-4">
                                <h4 className="text-lg font-semibold mb-2 text-pink-500">{transI18n("characterInformation")}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-base-content/70">{transI18n("id")}:</span>
                                            <span className="font-bold">{selectAvatar.id}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-base-content/70">{transI18n("character")}:</span>
                                            <NameAvatar
                                                locale={locale}
                                                text={getNameChar(locale, selectAvatar)}
                                                className="font-bold"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <Image
                                            src={`https://api.hakush.in/hsr/UI/avatarshopicon/${selectAvatar.id}.webp`}
                                            alt={getNameChar(locale, selectAvatar)}
                                            width={80}
                                            height={80}
                                            className="h-20 w-20 object-cover rounded-full border-2 border-purple-500 shadow-lg shadow-purple-500/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-2 text-cyan-500 border-b border-cyan-300/30 pb-1">{transI18n("skillType")}</h4>
                                    <p className="mt-2">{transI18n(attackTypeToString(selectTurn?.skillType).toLowerCase())}</p>
                                </div>
                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-2 text-cyan-500 border-b border-cyan-300/30 pb-1">{transI18n("skillName")}</h4>
                                    <p className="mt-2">{selectTurn?.skillName}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-2 text-cyan-500 border-b border-cyan-300/30 pb-1">{transI18n("cycle")}</h4>
                                    <p className="mt-2">{turnHistory[selectTurn?.turnBattleId].cycleIndex}</p>
                                </div>
                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-2 text-cyan-500 border-b border-cyan-300/30 pb-1">{transI18n("wave")}</h4>
                                    <p className="mt-2">{turnHistory[selectTurn?.turnBattleId].waveIndex}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-2 text-cyan-500 border-b border-cyan-300/30 pb-1">{transI18n("actionValue")}</h4>
                                    <p className="mt-2">{Number(turnHistory[selectTurn?.turnBattleId].actionValue).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</p>
                                </div>
                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-2 text-purple-500 border-b border-purple-300/30 pb-1">{transI18n("totalDamage")}</h4>
                                    <p className="mt-2 font-bold text-lg">{Number(selectTurn?.totalDamage).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</p>
                                </div>
                            </div>

                            <div className="bg-base-200 rounded-lg p-4 shadow-md mb-4">
                                <h4 className="text-lg font-semibold mb-2 text-cyan-500 border-b border-cyan-300/30 pb-1">{transI18n("damageDetails")}</h4>
                                {selectTurn?.damageDetail?.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                                        {selectTurn.damageDetail.map((detail, idx) => (
                                            <div
                                                key={idx}
                                                className="flex flex-col items-start gap-1 p-3 rounded-lg shadow bg-base-200"
                                            >
                                                <span className="text-lg font-semibold text-primary">
                                                    {Number(detail.damage).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                                                </span>
                                                <span className="text-xs uppercase text-gray-500 tracking-wide">
                                                    {transI18n(attackTypeToString(detail?.damage_type).toLowerCase())}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="mt-2 italic opacity-70">{transI18n("noDamageDetail")}</p>
                                )}

                            </div>
                        </motion.div>
                    )}

                </div>

            </dialog>
        </div>
    );
}