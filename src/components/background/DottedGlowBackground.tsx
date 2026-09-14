"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

/**
 * A dark background with a slow-moving aurora/wave layer.
 *
 * The aurora effect is adapted from Aceternity UI's free, MIT-licensed
 * "Aurora Background" component (https://ui.aceternity.com/components/aurora-background,
 * source: ui.aceternity.com/registry/aurora-background.json) — restyled
 * with the site's brand blues instead of the original's default palette,
 * simplified to a single always-dark theme (the original toggles between
 * light/dark via a CSS `invert` filter; this site is always dark, so that
 * logic is dropped).
 *
 * The dot-grid layer that used to sit on top of this has been removed
 * pending a replacement background treatment.
 *
 * Rendered once, fixed behind all page content.
 */
export default function DottedGlowBackground() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden transition-colors duration-300 ${
        isLight ? "bg-slate-100" : "bg-ink"
      }`}
    >
      {/* Aurora wave layer — suppressed in light mode */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={
          {
            "--aurora":
              "repeating-linear-gradient(100deg, var(--color-brand-deep) 10%, var(--color-brand) 15%, #93c5fd 20%, #c7d2fe 25%, var(--color-brand) 30%)",
            "--dark-gradient":
              "repeating-linear-gradient(100deg, var(--color-ink) 0%, var(--color-ink) 7%, transparent 10%, transparent 12%, var(--color-ink) 16%)",
          } as React.CSSProperties
        }
      >
        <div
          className="aurora-layer transition-opacity duration-300"
          style={{ opacity: isLight ? 0 : undefined }}
        />
      </div>
    </div>
  );
}
