"use client";
import useLocaleStore from "@/stores/localeStore";
import { createContext, PropsWithChildren, useEffect } from "react";

interface ThemeContextType {
    theme?: string;
    changeTheme?: (nextTheme: string | null) => void;
}
export const ThemeContext = createContext<ThemeContextType>({});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const { theme, setTheme } = useLocaleStore()

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme");
            if (storedTheme) setTheme(storedTheme);
        }
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const changeTheme = (nextTheme: string | null) => {
        if (nextTheme) {
            setTheme(nextTheme);
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", nextTheme);
            }
        } else {
            setTheme(theme === "winter" ? "night" : "winter");
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", theme);
            }
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};