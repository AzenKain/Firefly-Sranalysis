import { listCurrentLanguage } from "@/lib/constant";
import { CharacterBasic, MonsterBasic } from "@/types";
import { useTranslations } from "next-intl";


type TFunc = ReturnType<typeof useTranslations>

export function getNameChar(
  locale: string,
  t: TFunc,
  data: CharacterBasic | undefined
): string {
  if (!data) return "";

  if (!Object.prototype.hasOwnProperty.call(listCurrentLanguage, locale)) {
    return "";
  }

  const langKey = listCurrentLanguage[locale as keyof typeof listCurrentLanguage].toLowerCase();

  let text = data.lang[langKey] ?? "";

  if (!text) {
    text = data.lang["en"] ?? "";
  }

  if (Number(data.id) > 8000) {
    text = `${t("trailblazer")} • ${t(data?.baseType?.toLowerCase() ?? "")}`;
  }

  return text;
}

export function getNameEnemy(locale: string, data: MonsterBasic | undefined): string {
    if (!data) {
        return ""
    }
    if (!Object.prototype.hasOwnProperty.call(listCurrentLanguage, locale)) {
        return ""
    }

    const langKey = listCurrentLanguage[locale as keyof typeof listCurrentLanguage].toLowerCase();


    let text = data.lang[langKey] ?? "";

    if (!text) {
        text = data.lang["en"] ?? "";
    }
    return text
}

export function parseRuby(text: string): string {
    const rubyRegex = /\{RUBY_B#(.*?)\}(.*?)\{RUBY_E#\}/gs;
    return text.replace(rubyRegex, (_match, furigana, kanji) => {
        return `<ruby>${kanji}<rt>${furigana}</rt></ruby>`;
    });
}