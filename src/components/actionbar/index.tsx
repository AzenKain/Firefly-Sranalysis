"use client";
import useAvatarDataStore from "@/stores/avatarDataStore";
import useBattleDataStore from "@/stores/battleDataStore";
import useLocaleStore from "@/stores/localeStore";
import { AvatarType } from "@/types";
import { TurnBattleInfo } from "@/types/mics";
import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { getNameChar } from "@/helper";

export default function ActionBar() {
    const [selectTurn, setSelectTurn] = useState<TurnBattleInfo | null>(null);
    const [selectAvatar, setSelectAvatar] = useState<AvatarType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { turnHistory } = useBattleDataStore();
    const { listAvatar } = useAvatarDataStore();
    const { locale } = useLocaleStore();
    const transI18n = useTranslations("DataAnalysisPage");
    const turnListRef = useRef<HTMLDivElement>(null);


    const contentStyle: React.CSSProperties = {
      
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const handleShow = (modalId: string, avatar: AvatarType, turn: TurnBattleInfo) => {
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
        if (turnListRef.current && turnHistory.length > 0) {
            turnListRef.current.scrollTop = turnListRef.current.scrollHeight;
        }
    }, [turnHistory.length]);

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
            <div
                ref={turnListRef}
                className="flex md:block px-2 md:px-0 w-full pt-2 border-t-2 border-accent overflow-x-auto md:overflow-x-hidden md:overflow-y-auto max-h-[90vh] custom-scrollbar"
            >
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

                <div className="flex flex-nowrap md:grid md:grid-cols-1 gap-2 w-fit md:w-full">
                    {turnHistory.length === 0 ? (
                        <div className="flex items-center justify-center h-full w-full">
                            <p className="text-base-content opacity-50">{transI18n("noTurns")}</p>
                        </div>
                    ) : (
                        turnHistory.map((turn, index) => {
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
                                                    <img
                                                        src={`https://api.hakush.in/hsr/UI/avatarshopicon/${data.id}.webp`}
                                                        alt={text}
                                                        loading="lazy"
                                                        className="w-8 h-8 object-contain"
                                                    />
                                                </div>
                                            </div>
                                           
                                            <div className="text-base-content text-center text-sm mt-1 font-medium">{getNameChar(locale, data)}</div>
                                        </div>
                                        <div className="grid grid-cols-1 justify-center gap-2 py-2 w-full">
                                            <div className="bg-local text-primary text-xs  max-w-full">
                                                {`${transI18n("useSkill")}: ${transI18n(turn.skillType.toLowerCase())}`}
                                            </div>
                                            <div className="text-primary text-xs max-w-full">
                                                {`${transI18n("totalDamage")}: ${turn.totalDamage.toFixed(2)}`}
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
                            className="mt-4 w-full custom-scrollbar"
                        >
                            <div className="bg-base-200 rounded-lg p-4 shadow-md mb-4">
                                <h4 className="text-lg font-semibold mb-2 text-pink-500">{transI18n("characterInformation")}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                    <div className="flex flex-col space-y-2">
                                        <p className="flex items-center gap-2">
                                            <span className="font-medium text-base-content/70">{transI18n("id")}:</span>
                                            <span className="font-bold">{selectAvatar.id}</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="font-medium text-base-content/70">{transI18n("character")}:</span>
                                            <span className="font-bold">{getNameChar(locale, selectAvatar)}</span>
                                        </p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <img
                                            loading="lazy"
                                            src={`https://api.hakush.in/hsr/UI/avatarshopicon/${selectAvatar.id}.webp`}
                                            alt={getNameChar(locale, selectAvatar)}
                                            className="h-20 w-20 object-cover rounded-full border-2 border-purple-500 shadow-lg shadow-purple-500/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-2 text-cyan-500 border-b border-cyan-300/30 pb-1">{transI18n("skillType")}</h4>
                                    <p className="mt-2">{transI18n(selectTurn?.skillType.toLowerCase())}</p>
                                </div>
                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-2 text-cyan-500 border-b border-cyan-300/30 pb-1">{transI18n("skillName")}</h4>
                                    <p className="mt-2">{selectTurn?.skillName}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-2 text-cyan-500 border-b border-cyan-300/30 pb-1">{transI18n("actionValue")}</h4>
                                    <p className="mt-2">{selectTurn?.actionValue.toFixed(2)}</p>
                                </div>
                                <div className="bg-base-200 rounded-lg p-4 shadow-md">
                                    <h4 className="text-lg font-semibold mb-2 text-purple-500 border-b border-purple-300/30 pb-1">{transI18n("totalDamage")}</h4>
                                    <p className="mt-2 font-bold text-lg">{selectTurn?.totalDamage.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="bg-base-200 rounded-lg p-4 shadow-md mb-4">
                                <h4 className="text-lg font-semibold mb-2 text-cyan-500 border-b border-cyan-300/30 pb-1">{transI18n("damageDetails")}</h4>
                                {selectTurn?.damageDetail && selectTurn.damageDetail.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                                        {selectTurn.damageDetail.map((detail, idx) => (
                                            <p key={idx} className="py-1 px-2 rounded bg-base-300 text-sm">{detail.toFixed(2)}</p>
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