import { useContext } from "react";
import { ThemeContext } from "@/components/themeController";

export const useChangeTheme = () => useContext(ThemeContext);