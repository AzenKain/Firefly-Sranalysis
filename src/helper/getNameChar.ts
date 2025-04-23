import { AvatarType } from "@/types";


export function getNameChar(locale: string, data: AvatarType | undefined): string {
    if (!data) {
        return ""
    }
    let text = data.lang.get(locale) ?? "";
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
