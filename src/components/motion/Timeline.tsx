"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export type TimelineEntry = {
  year: string;
  title: string;
  description: ReactNode;
};

export default function Timeline({
  entries,
  className,
}: {
  entries: TimelineEntry[];
  className?: string;
}) {
  return (
    <ol className={`relative ${className ?? ""}`}>
      {/* connecting line */}
      <div
        aria-hidden
        className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-brand/60 via-white/15 to-transparent"
      />
      {entries.map((entry, i) => (
        <motion.li
          key={entry.year}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="relative pb-8 pl-8 last:pb-0"
        >
          <span
            aria-hidden
            className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-brand bg-ink"
          />
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">
            {entry.year}
          </p>
          <h3 className="mt-1 text-lg text-white">{entry.title}</h3>
          <div className="mt-2 text-sm text-slate-400">{entry.description}</div>
        </motion.li>
      ))}
    </ol>
  );
}
