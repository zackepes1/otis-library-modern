"use client";

// FAQ Tabs — an original component inspired by the "tabbed FAQ instead of a
// long accordion" idea (the 21st.dev "faq-tabs" listing requires a paid
// API key to install, so this is a from-scratch re-implementation of the
// concept using this project's own motion/AnimatePresence patterns, not a
// copy of that component's source). Category pills across the top switch
// between animated panels of question/answer cards.
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { FaqCategory } from "@/lib/faq-data";

export function FaqTabs({ categories }: { categories: FaqCategory[] }) {
  const [active, setActive] = useState(0);
  const category = categories[active];

  return (
    <div>
      <div role="tablist" aria-label="FAQ category" className="flex flex-wrap gap-2">
        {categories.map((c, i) => (
          <button
            key={c.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={
              i === active
                ? "rounded-full bg-brand px-4 py-2 text-sm font-semibold text-ink shadow"
                : "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-brand/50 hover:text-brand"
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="relative mt-6 min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={category.label}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            {category.items.map((item) => (
              <div
                key={item.question}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="font-semibold text-white">{item.question}</h3>
                <div className="mt-2 text-sm leading-relaxed text-slate-400">{item.answer}</div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
