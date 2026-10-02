"use client";

import { getNameChar } from '@/helper';
import useLocaleStore from '@/stores/localeStore';
import { CharacterBasic } from '@/types';
import NameAvatar from '../nameAvatar';
import useBattleDataStore from '@/stores/battleDataStore';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface CharacterCardProps {
  data: CharacterBasic
}

export default function CharacterCard({ data }: CharacterCardProps) {
  const locale = useLocaleStore(state => state.locale);
  const avatarDetail = useBattleDataStore(state => state.avatarDetail);
  const transI18n = useTranslations("DataAnalysisPage");
  const text = getNameChar(locale, transI18n, data);

  return (
    <li className="z-10 flex flex-col w-28 items-center p-1 rounded-md shadow-lg bg-linear-to-b from-customStart to-customEnd transform transition-transform duration-300 hover:scale-105 m-1">
      <div
        className={`w-20 rounded-md p-0.5 bg-linear-to-br ${data.rank === "CombatPowerAvatarRarityType5"
          ? "from-yellow-400 via-yellow-300 to-yellow-500"
          : "from-purple-300 via-purple-200 to-purple-400"
          }`}
      >

        <div className="relative w-full h-full">
          <Image
            width={376}
            height={512}
            unoptimized
            crossOrigin="anonymous"
            src={`${process.env.CDN_URL}/${data.icon}`}
            className="w-full h-full rounded-md object-cover"
            alt="ALT"
          />
          <Image
            width={48}
            height={48}
            unoptimized
            crossOrigin="anonymous"
            src={`/icon/${data?.damageType?.toLowerCase()}.webp`}
            className="absolute top-0 left-0 w-6 h-6"
            alt={data?.damageType?.toLowerCase()}
          />
          <Image
            width={48}
            height={48}
            unoptimized
            crossOrigin="anonymous"
            src={`/icon/${data.baseType.toLowerCase()}.webp`}
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
        (() => {
          const stats = avatarDetail?.[Number(data.id)]?.stats;
          const hp = stats?.CurrentHP ?? stats?.HP ?? 0;
          const maxHp = stats?.MaxHP ?? 100;
          const hpPercent = Math.round((hp / maxHp) * 100);

          return (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-base-content/70 mx-1">HP:</span>
                <span className="text-xs font-medium">
                  <span className="text-error">
                    {Number(hp).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-base-content/50">/</span>
                  <span className="text-base-content/70">
                    {Number(maxHp).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </span>
              </div>

              <div className="relative w-full bg-base-300 rounded-full h-2.5">
                <div
                  className="bg-error h-2.5 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.max(0, Math.min(100, (hp / maxHp) * 100))}%`
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                  {hpPercent}%
                </span>
              </div>
            </div>
          );
        })()
      )}

    </li>

  );
}
