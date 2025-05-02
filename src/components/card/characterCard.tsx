"use client";

import { getNameChar } from '@/helper';
import useLocaleStore from '@/stores/localeStore';
import { AvatarHakushiType } from '@/types';

interface CharacterCardProps {
  data: AvatarHakushiType
}

export function parseRuby(text: string): string {
  return text.replace(/\{RUBY_B#(.*?)\}(.*?)\{RUBY_E#\}/g, (_, furigana, kanji) => {
    return `<ruby>${kanji}<rt>${furigana}</rt></ruby>`;
  });
}


export default function CharacterCard({ data }: CharacterCardProps) {
  const { locale } = useLocaleStore();
  const text = getNameChar(locale, data)
  return (
    <li className="z-10 flex flex-col w-28 items-center p-1 rounded-md shadow-lg bg-gradient-to-b from-customStart to-customEnd transform transition-transform duration-300 hover:scale-105 m-1">
    <div
      className={`w-[80px] rounded-md p-[2px] bg-gradient-to-br ${
        data.rank === "CombatPowerAvatarRarityType5"
          ? "from-yellow-400 via-yellow-300 to-yellow-500"
          : "from-purple-300 via-purple-200 to-purple-400"
      }`}
    >
      
      <div className="relative w-full h-full">
        <img
          loading="lazy"
          src={`https://api.hakush.in/hsr/UI/avatarshopicon/${data.id}.webp`}
          className="w-full h-full rounded-md object-cover"
          alt="ALT"
        />
        <img
          loading='lazy'
          src={`https://api.hakush.in/hsr/UI/element/${data.damageType.toLowerCase()}.webp`}
          className="absolute top-0 left-0 w-6 h-6"
          alt={data.damageType.toLowerCase()}
        />
        <img
          loading='lazy'
          src={`https://api.hakush.in/hsr/UI/pathicon/${data.baseType.toLowerCase()}.webp`}
          className="absolute top-0 right-0 w-6 h-6"
          alt={data.baseType.toLowerCase()}
        />
      </div>
    </div>
  
    {locale === "jp" ? (
      <div
        className="mt-2 text-center text-base font-normal leading-tight"
        dangerouslySetInnerHTML={{ __html: parseRuby(text) }}
      />
    ) : (
      <div className="mt-2 text-center text-base font-normal leading-tight">
        {text}
      </div>
    )}
  </li>

  );
}
