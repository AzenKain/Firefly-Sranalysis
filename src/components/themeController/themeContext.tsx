"use client";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface ThemeContextType {
    theme?: string;
    changeTheme?: (nextTheme: string | null) => void;
}
export const ThemeContext = createContext<ThemeContextType>({});

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme");
            if (storedTheme) setTheme(storedTheme);
        }
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const changeTheme = (nextTheme: string | null) => {
        console.log(nextTheme)
        if (nextTheme) {
            setTheme(nextTheme);
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", nextTheme);
            }
        } else {
            setTheme((prev) => (prev === "light" ? "night" : "light"));
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