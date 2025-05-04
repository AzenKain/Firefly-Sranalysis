import { parseRuby } from "@/helper";



interface TextProps {
    text: string;
    locale: string;
    className?: string;
}

export default function NameAvatar({ text, locale, className }: TextProps) {
    if (locale === "ja") {
        return <div className={className} dangerouslySetInnerHTML={{ __html: parseRuby(text) }} />;
    }
    return <div className={className}>{text}</div>;
}