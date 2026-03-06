"use client";
import useLocaleStore from "@/stores/localeStore";
import { createContext, PropsWithChildren } from "react";

interface ThemeContextType {
    theme?: string;
    changeTheme?: (nextTheme: string | null) => void;
}
export const ThemeContext = createContext<ThemeContextType>({});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const { theme, setTheme } = useLocaleStore()
    
    const changeTheme = (nextTheme: string | null) => {
        if (nextTheme) {
            setTheme(nextTheme);
        } else {
            setTheme(theme === "winter" ? "night" : "winter");
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};