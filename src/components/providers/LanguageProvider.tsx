"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getT, type Lang, type TranslationKey } from "@/lib/translations";

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
  t: (key: TranslationKey) => string;
}

const defaultT = getT("en");

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  toggle: () => {},
  t: defaultT,
});

export function useLang() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "en" || stored === "es") {
      setLang(stored);
      document.documentElement.setAttribute("lang", stored);
    }
  }, []);

  function toggle() {
    setLang((l) => {
      const next: Lang = l === "en" ? "es" : "en";
      document.documentElement.setAttribute("lang", next);
      localStorage.setItem("lang", next);
      return next;
    });
  }

  const t = useMemo(() => getT(lang), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
