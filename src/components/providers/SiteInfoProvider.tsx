"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteInfoResult } from "@/sanity/queries";

const SiteInfoContext = createContext<SiteInfoResult | null>(null);

export function SiteInfoProvider({ value, children }: { value: SiteInfoResult; children: ReactNode }) {
  return <SiteInfoContext.Provider value={value}>{children}</SiteInfoContext.Provider>;
}

export function useSiteInfo(): SiteInfoResult {
  const ctx = useContext(SiteInfoContext);
  if (!ctx) throw new Error("useSiteInfo must be inside SiteInfoProvider");
  return ctx;
}
