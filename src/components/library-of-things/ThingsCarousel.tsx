"use client";

import { useMemo, useState } from "react";
import { CoverflowCarousel } from "@/components/ruixen/coverflow-carousel";
import { LOT_CATEGORIES, lotItems, type LotCategory } from "@/lib/library-of-things-data";

const ALL = "All" as const;
type Filter = LotCategory | typeof ALL;

export default function ThingsCarousel() {
  const [active, setActive] = useState<Filter>(ALL);

  const slides = useMemo(() => {
    const filtered = active === ALL ? lotItems : lotItems.filter((i) => i.category === active);
    return filtered.map((item) => ({
      src: item.image,
      alt: item.name,
      title: item.name,
      subtitle: item.description,
      meta: item.inLibraryOnly ? [{ label: "Access", value: "In-library only" }] : undefined,
    }));
  }, [active]);

  return (
    <div>
      {/* Category filter pills */}
      <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2">
        <button
          type="button"
          role="tab"
          aria-selected={active === ALL}
          onClick={() => setActive(ALL)}
          className={
            active === ALL
              ? "rounded-full bg-brand px-4 py-2 text-sm font-semibold text-ink shadow"
              : "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-brand/50 hover:text-brand"
          }
        >
          All Items
        </button>
        {LOT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={
              active === cat
                ? "rounded-full bg-brand px-4 py-2 text-sm font-semibold text-ink shadow"
                : "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-brand/50 hover:text-brand"
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Carousel */}
      <div className="mt-8">
        {slides.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-sm text-slate-500">
            No items in this category.
          </div>
        ) : (
          <CoverflowCarousel
            key={active}
            slides={slides}
            showCaption
            showNavigation
            showPagination
            label={`${active === ALL ? "Library of Things" : active} items`}
            cardWidth="clamp(160px, 18vw, 240px)"
          />
        )}
      </div>

      <p className="mt-3 text-center text-xs text-slate-500">
        {slides.length} item{slides.length !== 1 ? "s" : ""}
        {active !== ALL ? ` · ${active}` : ""}
      </p>
    </div>
  );
}
