"use client";

import { useLang } from "@/components/providers/LanguageProvider";

export function LangToggle() {
  const { lang, toggle } = useLang();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === "en" ? "Cambiar a Español" : "Switch to English"}
      title={lang === "en" ? "Cambiar a Español" : "Switch to English"}
      className="flex items-center justify-center rounded-md border border-white/20 px-2 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-brand hover:text-brand"
    >
      {lang === "en" ? "ES" : "EN"}
    </button>
  );
}
