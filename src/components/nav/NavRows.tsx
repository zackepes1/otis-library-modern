"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavNode } from "@/lib/site-data";

/** Arrow icon that nudges right on hover — used on every navigable row. */
export function RowArrow({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={`shrink-0 text-slate-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand ${className ?? ""}`}
    >
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A single leaf link row (no children) — direct navigation. */
export function LeafRow({ node, onNavigate, muted }: { node: NavNode; onNavigate: () => void; muted?: boolean }) {
  const className = `group flex items-center justify-between gap-3 px-5 py-3 text-sm transition-colors ${
    muted ? "text-slate-300 hover:bg-white/5 hover:text-brand" : "font-semibold text-white hover:bg-white/5 hover:text-brand"
  }`;

  return node.external ? (
    <a href={node.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={className}>
      <span>{node.label}</span>
      <RowArrow />
    </a>
  ) : (
    <Link href={node.href} onClick={onNavigate} className={className}>
      <span>{node.label}</span>
      <RowArrow />
    </Link>
  );
}

/** A row that drills into a submenu panel (slide transition), rather than navigating directly. */
export function DrillRow({ node, onOpen }: { node: NavNode; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full items-center justify-between gap-3 px-5 py-3 text-left text-sm font-semibold text-white transition-colors hover:bg-white/5 hover:text-brand"
    >
      <span>{node.label}</span>
      <RowArrow />
    </button>
  );
}

export const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? "-100%" : "100%", opacity: 0 }),
};

/** Shared drill-down navigation state: [] = root level, otherwise the chain
 * of parent nodes whose submenu is currently showing (top of stack = active). */
export function useDrillNav(rootItems: NavNode[]) {
  const [stack, setStack] = useState<NavNode[]>([]);
  const [direction, setDirection] = useState(1);

  const activeNode = stack[stack.length - 1];
  const items = activeNode ? activeNode.children ?? [] : rootItems;
  const title = activeNode ? activeNode.label : "Menu";

  const openSubmenu = (node: NavNode) => {
    setDirection(1);
    setStack((prev) => [...prev, node]);
  };

  const goBack = () => {
    setDirection(-1);
    setStack((prev) => prev.slice(0, -1));
  };

  const reset = () => setStack([]);

  return { activeNode, items, title, direction, openSubmenu, goBack, reset };
}
