"use client";

import { AnimatePresence, motion } from "motion/react";
import { navTree, type NavNode } from "@/lib/site-data";
import { LeafRow, DrillRow, slideVariants, useDrillNav } from "./NavRows";

/**
 * The drill-down navigation panel itself: header (title / back button) and
 * animated sliding list of the active level. Shared between the persistent
 * desktop sidebar and the mobile drawer. Catalog search now lives only in
 * the site header, so this panel is nav-links only.
 */
export function NavPanel({
  onNavigate,
  headerRight,
}: {
  /** Called whenever a leaf link is followed (e.g. to close a mobile drawer). No-op for the persistent sidebar. */
  onNavigate: () => void;
  /** Optional extra control rendered at the right of the header (e.g. a close button for the mobile drawer). */
  headerRight?: React.ReactNode;
}) {
  const { activeNode, items, title, direction, openSubmenu, goBack } = useDrillNav(navTree);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <AnimatePresence mode="wait" initial={false}>
          {activeNode ? (
            <motion.button
              key={title}
              type="button"
              onClick={goBack}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="group flex items-center gap-2 font-serif text-lg font-black uppercase tracking-tight text-white hover:text-brand"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="transition-transform group-hover:-translate-x-1">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {title}
            </motion.button>
          ) : (
            <motion.span
              key="root-title"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="font-serif text-lg font-black uppercase tracking-tight text-white"
            >
              Menu
            </motion.span>
          )}
        </AnimatePresence>

        {headerRight}
      </div>

      <nav className="relative flex-1 overflow-hidden" aria-label="Primary">
        <AnimatePresence custom={direction} mode="popLayout" initial={false}>
          <motion.div
            key={activeNode ? activeNode.label : "root"}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0 overflow-y-auto"
          >
            {/* When drilled into a section that also has its own overview
                page, surface it as a distinct "visit page" row up top. */}
            {activeNode && activeNode.href !== "#" && (
              <div className="border-b border-white/10 bg-white/[0.03]">
                <LeafRow node={{ label: `${activeNode.label} Overview`, href: activeNode.href, external: activeNode.external } as NavNode} onNavigate={onNavigate} />
              </div>
            )}

            <ul className="divide-y divide-white/10">
              {items.map((node) => {
                const hasChildren = !!node.children?.length;
                return (
                  <li key={node.label}>
                    {hasChildren ? (
                      <DrillRow node={node} onOpen={() => openSubmenu(node)} />
                    ) : (
                      <LeafRow node={node} onNavigate={onNavigate} muted={!!activeNode} />
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </AnimatePresence>
      </nav>
    </div>
  );
}
