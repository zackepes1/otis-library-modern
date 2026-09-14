"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

/**
 * Hover-glow card grid, adapted from Aceternity UI's "Card Hover Effect"
 * pattern (a shared `layoutId` highlight that slides between cards on
 * hover) — restyled to match the site's dark theme + brand color instead
 * of the original neutral/slate palette.
 */
export function HoverEffectGrid({
  items,
  className,
}: {
  items: { key: string; content: ReactNode }[];
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={className}>
      {items.map((item, idx) => (
        <div
          key={item.key}
          className="group relative block h-full w-full p-0"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block rounded-2xl bg-gradient-to-br from-brand/15 to-brand-deep/25"
                layoutId="digitalServiceHoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
              />
            )}
          </AnimatePresence>
          <div className="relative z-10 h-full">{item.content}</div>
        </div>
      ))}
    </div>
  );
}
