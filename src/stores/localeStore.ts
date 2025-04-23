import { create } from 'zustand'


interface LocaleState {
    locale: string;
    setLocale: (newLocale: string) => void;
}

const useLocaleStore = create<LocaleState>((set) => ({
    locale: "en",
    setLocale: (newLocale: string) => set({ locale: newLocale }),

}));

export default useLocaleStore;