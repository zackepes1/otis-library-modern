"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";
import type { StrategicGoal } from "@/lib/strategic-plan";

export function GoalsAccordion({ goals }: { goals: StrategicGoal[] }) {
  const [openGoal, setOpenGoal] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {goals.map((goal, i) => {
        const isOpen = openGoal === i;
        return (
          <div key={goal.title} className="overflow-hidden rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setOpenGoal(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 bg-white/[0.03] px-5 py-4 text-left transition hover:bg-white/[0.06]"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-white">{goal.title}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-slate-400"
              >
                <IconChevronDown size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="border-t border-white/10 px-5 pb-5 pt-4">
                    <p className="text-sm text-slate-400">{goal.description}</p>
                    <ul className="mt-3 space-y-2">
                      {goal.points.map((point) => (
                        <li key={point} className="flex gap-2 text-sm text-slate-400">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
