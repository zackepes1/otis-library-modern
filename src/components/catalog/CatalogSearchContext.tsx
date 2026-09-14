"use client";

import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";

interface CatalogSearchFocusContextValue {
  inputRef: RefObject<HTMLInputElement | null>;
  focusSearch: () => void;
}

const CatalogSearchFocusContext = createContext<CatalogSearchFocusContextValue | null>(null);

export function CatalogSearchFocusProvider({ children }: { children: ReactNode }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const focusSearch = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    inputRef.current?.focus();
  };

  return (
    <CatalogSearchFocusContext.Provider value={{ inputRef, focusSearch }}>
      {children}
    </CatalogSearchFocusContext.Provider>
  );
}

export function useCatalogSearchFocus() {
  const ctx = useContext(CatalogSearchFocusContext);
  if (!ctx) {
    throw new Error("useCatalogSearchFocus must be used within a CatalogSearchFocusProvider");
  }
  return ctx;
}
