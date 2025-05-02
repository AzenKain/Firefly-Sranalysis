import { listCurrentLanguage } from "@/lib/constant";
import { AvatarHakushiType } from "@/types";


export function getNameChar(locale: string, data: AvatarHakushiType | undefined): string {
    if (!data) {
        return ""
    }
    if (!listCurrentLanguage.hasOwnProperty(locale)) {
        return ""
    }

    let text = data.lang.get(listCurrentLanguage[locale as keyof typeof listCurrentLanguage].toLowerCase()) ?? "";
    if (!text) {
    text = data.lang.get("en") ?? "";
    }
    if (Number(data.id) % 2 === 0 && Number(data.id) > 8000) {
    text = `Female ${data.damageType} MC`
    } else if (Number(data.id) > 8000) {
    text = `Male ${data.damageType} MC`
    }

    return text
}
