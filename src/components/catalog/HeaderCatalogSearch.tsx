"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { siteInfo } from "@/lib/site-data";
import { useCatalogSearchFocus } from "./CatalogSearchContext";
import { searchSitePages, type SiteSearchItem } from "@/lib/site-search-index";
import type { CatalogResult } from "@/app/api/catalog-search/route";

type Status = "idle" | "loading" | "success" | "error";

const DEBOUNCE_MS = 400;

function FormatBadge({ formats }: { formats: string | null }) {
  if (!formats) return null;
  const first = formats.split(",")[0]?.trim();
  if (!first) return null;
  return (
    <span className="inline-block rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
      {first}
      {formats.includes(",") ? " +" : ""}
    </span>
  );
}

function PageResultRow({ item }: { item: SiteSearchItem }) {
  const content = (
    <>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-white/5 text-brand">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M13 3h8v8M21 3l-9 9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white group-hover:text-brand">{item.label}</p>
        <p className="mt-0.5 truncate text-xs text-slate-400">{item.section}</p>
      </div>
    </>
  );
  const className = "group flex items-center gap-3 rounded-lg p-2 transition hover:bg-white/5";

  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

function ResultRow({ result }: { result: CatalogResult }) {
  return (
    <a
      href={result.recordUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-3 rounded-lg p-2 transition hover:bg-white/5"
    >
      <div className="relative h-16 w-11 shrink-0 overflow-hidden rounded bg-white/5">
        {result.coverUrl ? (
          <Image src={result.coverUrl} alt="" fill unoptimized className="object-cover" sizes="44px" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[9px] text-slate-500">No cover</div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white group-hover:text-brand">{result.title}</p>
        {result.author && <p className="mt-0.5 truncate text-xs text-slate-400">{result.author}</p>}
        <div className="mt-1">
          <FormatBadge formats={result.formats} />
        </div>
      </div>
    </a>
  );
}

export default function HeaderCatalogSearch() {
  const { inputRef } = useCatalogSearchFocus();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [results, setResults] = useState<CatalogResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpen = isFocused && query.trim().length > 0;

  // Close the results dropdown on outside click.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onPointerDown = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, inputRef]);

  // Debounced live search — the transition into "loading" happens
  // synchronously in the input's onChange handler (a real event), so this
  // effect only owns the async fetch and its eventual success/error result.
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) return undefined;

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/catalog-search?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (!res.ok) {
          setStatus("error");
          setError(data.error ?? "Something went wrong searching the catalog.");
          return;
        }
        setResults(data.results ?? []);
        setStatus("success");
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setStatus("error");
        setError("Something went wrong searching the catalog.");
      }
    }, DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [query]);

  const fullCatalogHref = query.trim()
    ? `${siteInfo.catalogUrl}Union/Search?lookfor=${encodeURIComponent(query.trim())}&basicType=Keyword&view=list&searchSource=local`
    : siteInfo.catalogUrl;

  // Instant, client-side matches against the site's own nav/pages — no
  // network round-trip needed, so these appear immediately while the
  // catalog results are still loading below them.
  const pageResults = useMemo(() => searchSitePages(query, 4), [query]);

  return (
    <div ref={containerRef} className="relative min-w-[200px] flex-1 sm:max-w-sm md:max-w-md lg:max-w-lg">
      <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2.5 transition focus-within:border-brand">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0 text-slate-400">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            if (!value.trim()) {
              setStatus("idle");
              setResults([]);
              setError(null);
            } else {
              setStatus("loading");
            }
          }}
          placeholder="Search books, events & pages…"
          aria-label="Search the site and catalog"
          className="w-full min-w-0 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-lg border border-white/10 bg-ink shadow-2xl sm:w-[420px]"
          >
            <div className="p-2">
              {pageResults.length > 0 && (
                <div className="mb-1">
                  <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Pages &amp; Services
                  </p>
                  {pageResults.map((item) => (
                    <PageResultRow key={item.href} item={item} />
                  ))}
                </div>
              )}

              {pageResults.length > 0 && (status === "loading" || status === "success" || status === "error") && (
                <p className="mt-1 px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Catalog
                </p>
              )}

              {status === "loading" && (
                <div className="space-y-2 p-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex animate-pulse gap-3">
                      <div className="h-16 w-11 shrink-0 rounded bg-white/10" />
                      <div className="flex-1 space-y-2 py-1">
                        <div className="h-3 w-3/4 rounded bg-white/10" />
                        <div className="h-3 w-1/2 rounded bg-white/10" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {status === "error" && <p className="p-4 text-center text-sm text-red-400">{error}</p>}

              {status === "success" && results.length === 0 && pageResults.length === 0 && (
                <p className="p-4 text-center text-sm text-slate-400">
                  No results for &ldquo;{query}&rdquo;.
                </p>
              )}

              {status === "success" &&
                results.length > 0 &&
                results.slice(0, 6).map((result) => <ResultRow key={result.id} result={result} />)}
            </div>

            <div className="border-t border-white/10 p-2 text-center">
              <Link
                href={fullCatalogHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md px-3 py-2 text-sm font-semibold text-brand hover:bg-white/5"
              >
                Open full catalog search ↗
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
