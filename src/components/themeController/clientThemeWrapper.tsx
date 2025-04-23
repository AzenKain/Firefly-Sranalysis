"use client";
import { PropsWithChildren, useContext } from "react";
import { ThemeContext } from "./themeContext";

export function ClientThemeWrapper({ children }: PropsWithChildren) {
    const { theme } = useContext(ThemeContext);
    return <div data-theme={theme} className="h-full">{children}</div>;
}