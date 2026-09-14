"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NavPanel } from "./nav/NavPanel";

const DRAG_CLOSE_THRESHOLD = -80;

export default function SidebarNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard portal mount-check pattern
    setMounted(true);
  }, []);

  const content = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            key="panel"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.3, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < DRAG_CLOSE_THRESHOLD || info.velocity.x < -400) {
                onClose();
              }
            }}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col border-r border-white/10 bg-ink shadow-2xl cursor-grab active:cursor-grabbing"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <NavPanel
              onNavigate={onClose}
              headerRight={
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="rounded-md p-2 text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              }
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(content, document.body);
}
