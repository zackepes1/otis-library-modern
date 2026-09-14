"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CoverflowCarousel } from "@/components/ruixen/coverflow-carousel";
import type { CatalogListItem } from "@/app/api/catalog-list/route";
import { catalogShelves } from "@/lib/catalog-shelves";
import { siteInfo } from "@/lib/site-data";

// "Things We Love" — recreates the real shelf-browsing carousel from the
// library catalog's homepage widget (Staff Picks, Fiction, DVDs, etc.): a
// row of shelf pills above a carousel of real cover art pulled live from the
// catalog. Built on the Coverflow Carousel (Ruixen UI, MIT) so the covers
// rack open toward the viewer as they drag.
export default function ThingsWeLove() {
  const [activeListId, setActiveListId] = useState(catalogShelves[0].listId);
  const shelf = catalogShelves.find((s) => s.listId === activeListId) ?? catalogShelves[0];

  // Cache each shelf's results by listId so re-selecting a tab doesn't
  // refetch it every time — the catalog list contents don't change minute
  // to minute. Loading/error state are derived from cache + errorId rather
  // than set synchronously in the effect body, so nothing is set outside of
  // the async fetch's own callbacks.
  const [cache, setCache] = useState<Record<string, CatalogListItem[]>>({});
  const [errorId, setErrorId] = useState<string | null>(null);

  useEffect(() => {
    if (cache[activeListId] || errorId === activeListId) return;

    let cancelled = false;

    fetch(`/api/catalog-list?listId=${encodeURIComponent(activeListId)}&limit=20`)
      .then((res) => res.json())
      .then((data: { results?: CatalogListItem[] }) => {
        if (cancelled) return;
        setCache((prev) => ({ ...prev, [activeListId]: data.results ?? [] }));
      })
      .catch(() => {
        if (!cancelled) setErrorId(activeListId);
      });

    return () => {
      cancelled = true;
    };
  }, [activeListId, cache, errorId]);

  const items = cache[activeListId] ?? [];
  const hasError = errorId === activeListId;
  const isLoading = !items.length && !hasError && !cache[activeListId];

  const slides = items
    .filter((item) => item.coverUrl)
    .map((item) => ({
      src: item.coverUrl!,
      alt: `Cover of ${item.title}${item.author ? ` by ${item.author}` : ""}`,
      title: item.title,
      subtitle: item.author ?? undefined,
    }));

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl text-white">Things We Love</h2>
            <p className="mt-2 max-w-xl text-slate-400">
              Real shelves from our catalog — staff picks, favorites, and more, updated live.
            </p>
          </div>
          <Link
            href={siteInfo.catalogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand hover:underline"
          >
            Browse the full catalog ↗
          </Link>
        </div>

        <div role="tablist" aria-label="Catalog shelf" className="mt-8 flex flex-wrap gap-2">
          {catalogShelves.map((s) => (
            <button
              key={s.listId}
              type="button"
              role="tab"
              aria-selected={s.listId === activeListId}
              onClick={() => setActiveListId(s.listId)}
              className={
                s.listId === activeListId
                  ? "rounded-full bg-brand px-4 py-2 text-sm font-semibold text-ink shadow"
                  : "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-brand/50 hover:text-brand"
              }
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {isLoading && (
            <div className="flex h-64 items-center justify-center text-sm text-slate-500">
              Loading {shelf.label.toLowerCase()}…
            </div>
          )}
          {!isLoading && hasError && (
            <div className="flex h-64 items-center justify-center text-sm text-slate-500">
              Couldn&apos;t load this shelf right now. Try another tab, or{" "}
              <Link href={siteInfo.catalogUrl} target="_blank" rel="noopener noreferrer" className="ml-1 text-brand hover:underline">
                browse the catalog directly ↗
              </Link>
            </div>
          )}
          {!isLoading && !hasError && slides.length === 0 && (
            <div className="flex h-64 items-center justify-center text-sm text-slate-500">
              No titles found on this shelf right now.
            </div>
          )}
          {!isLoading && !hasError && slides.length > 0 && (
            // Remounting per shelf (via `key`) resets the carousel's internal
            // drag/position refs cleanly instead of animating through an
            // unrelated set of covers when the slide count/order changes.
            <CoverflowCarousel
              key={activeListId}
              slides={slides}
              showCaption
              showNavigation
              showPagination
              label={`${shelf.label} carousel`}
              cardWidth="clamp(140px, 16vw, 200px)"
            />
          )}
        </div>
      </div>
    </section>
  );
}
