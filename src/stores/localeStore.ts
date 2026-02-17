import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';


interface LocaleState {
    locale: string;
    theme: string
    setTheme: (newTheme: string) => void;
    setLocale: (newLocale: string) => void;
}

const useLocaleStore = create<LocaleState>()(persist(
    (set) => ({
        locale: "en",
        theme: "night",
        setTheme: (newTheme: string) => set({ theme: newTheme }),
        setLocale: (newLocale: string) => set({ locale: newLocale }),
    }),
    {
        name: 'locale-storage',
        storage: createJSONStorage(() => localStorage),
    }
));

export default useLocaleStore;