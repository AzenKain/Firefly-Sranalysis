"use client";

import { getNameChar } from '@/helper';
import useLocaleStore from '@/stores/localeStore';
import { AvatarHakushiType } from '@/types';
import NameAvatar from '../nameAvatar';
import useBattleDataStore from '@/stores/battleDataStore';
import Image from 'next/image';

interface CharacterCardProps {
  data: AvatarHakushiType
}



export default function CharacterCard({ data }: CharacterCardProps) {
  const { locale } = useLocaleStore();
  const text = getNameChar(locale, data)
  const { avatarDetail } = useBattleDataStore()

  return (
    <li className="z-10 flex flex-col w-28 items-center p-1 rounded-md shadow-lg bg-gradient-to-b from-customStart to-customEnd transform transition-transform duration-300 hover:scale-105 m-1">
      <div
        className={`w-[80px] rounded-md p-[2px] bg-gradient-to-br ${data.rank === "CombatPowerAvatarRarityType5"
          ? "from-yellow-400 via-yellow-300 to-yellow-500"
          : "from-purple-300 via-purple-200 to-purple-400"
          }`}
      >

        <div className="relative w-full h-full">
          <Image
            width={376}
            height={512}
            src={`https://api.hakush.in/hsr/UI/avatarshopicon/${data.id}.webp`}
            className="w-full h-full rounded-md object-cover"
            alt="ALT"
          />
          <Image
            width={48}
            height={48}
            src={`https://api.hakush.in/hsr/UI/element/${data.damageType.toLowerCase()}.webp`}
            className="absolute top-0 left-0 w-6 h-6"
            alt={data.damageType.toLowerCase()}
          />
          <Image
            width={48}
            height={48}
            src={`https://api.hakush.in/hsr/UI/pathicon/${data.baseType.toLowerCase()}.webp`}
            className="absolute top-0 right-0 w-6 h-6"
            alt={data.baseType.toLowerCase()}
          />
        </div>
      </div>

      <NameAvatar
        locale={locale}
        text={text}
        className="mt-2 text-center text-base font-normal leading-tight"
      />
      {avatarDetail && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-base-content/70 mx-1">HP:</span>
            <span className="text-xs font-medium">
              <span className="text-error">
                {Number(avatarDetail?.[Number(data.id)]?.stats?.HP ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
              <span className="text-base-content/50">/</span>
              <span className="text-base-content/70">
                {Number(avatarDetail?.[Number(data.id)]?.stats?.MaxHP ?? 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </span>
          </div>

          <div className="relative w-full bg-base-300 rounded-full h-2.5">
            <div
              className="bg-error h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${Math.max(0, Math.min(100, ((avatarDetail?.[Number(data.id)]?.stats?.HP || 0) / (avatarDetail?.[Number(data.id)]?.stats?.MaxHP || 100)) * 100))}%`
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
              {Math.round(((avatarDetail?.[Number(data.id)]?.stats?.HP || 0) / (avatarDetail?.[Number(data.id)]?.stats?.MaxHP || 100)) * 100)}%
            </span>
          </div>

        </div>
      )}

    </li>

  );
}
