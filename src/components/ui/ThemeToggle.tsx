"use client";

import { IconSun, IconMoon } from "@tabler/icons-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex items-center justify-center rounded-md border border-white/20 p-2 text-slate-300 transition hover:border-brand hover:text-brand light:border-slate-300 light:text-slate-600"
    >
      {isDark ? <IconSun size={18} stroke={1.8} /> : <IconMoon size={18} stroke={1.8} />}
    </button>
  );
}
