"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import {
  IconSearch,
  IconBook,
  IconHeadphones,
  IconDeviceGamepad2,
  IconStarFilled,
  IconSparkles,
  IconClock,
  IconUsers,
  IconBookmark,
  IconMovie,
  IconLoader2,
} from "@tabler/icons-react";

type OLResult = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
};

const CATALOG = "https://nw.catalog.lionlibraries.org";
const LIBBY = "https://lion.overdrive.com";

// ── Physical search ──────────────────────────────────────────────────────────

const SEARCH_TYPES = [
  { value: "Keyword", label: "Keyword" },
  { value: "Title", label: "Title" },
  { value: "Author", label: "Author" },
  { value: "Subject", label: "Subject" },
  { value: "Series", label: "Series" },
];

// ── Digital (Libby) formats ───────────────────────────────────────────────────

const DIGITAL_FORMATS = [
  { value: "", label: "All Digital" },
  { value: "ebook-overdrive,ebook-media-do", label: "eBooks" },
  { value: "audiobook-overdrive-listen", label: "Audiobooks" },
  { value: "magazine-overdrive", label: "Magazines" },
];

// ── Browse categories ─────────────────────────────────────────────────────────

const PHYSICAL_BROWSE = [
  {
    label: "Available Now",
    description: "Ready for pickup today",
    icon: IconClock,
    href: `${CATALOG}/Search/Results?lookfor=&basicType=Keyword&filter[]=availability_nw%3A%22Available+Now%22`,
  },
  {
    label: "New Arrivals",
    description: "Recently added to the collection",
    icon: IconSparkles,
    href: `${CATALOG}/Search/Results?lookfor=&basicType=Keyword&sort=days_since_added+asc`,
  },
  {
    label: "NYT Best Sellers",
    description: "From the New York Times lists",
    icon: IconStarFilled,
    href: `${CATALOG}/Search/Results?lookfor=&basicType=Keyword&filter[]=list_nw%3A%22NYT+Best+Sellers%22`,
  },
  {
    label: "Children's",
    description: "Books and materials for kids",
    icon: IconUsers,
    href: `${CATALOG}/Search/Results?lookfor=&basicType=Keyword&filter[]=audience_nw%3A%22Juvenile%22`,
  },
  {
    label: "Large Print",
    description: "Easier reading, same great titles",
    icon: IconBook,
    href: `${CATALOG}/Search/Results?lookfor=&basicType=Keyword&filter[]=format_nw%3A%22Large+Print+Book%22`,
  },
  {
    label: "DVDs & Blu-ray",
    description: "Movies and TV to borrow",
    icon: IconMovie,
    href: `${CATALOG}/Search/Results?lookfor=&basicType=Keyword&filter[]=format_nw%3A%22DVD%22`,
  },
  {
    label: "Video Games",
    description: "Games available to borrow",
    icon: IconDeviceGamepad2,
    href: `${CATALOG}/Search/Results?lookfor=&basicType=Keyword&filter[]=format_nw%3A%22Video+Games%22`,
  },
  {
    label: "Audiobooks",
    description: "Physical CDs and playaways",
    icon: IconHeadphones,
    href: `${CATALOG}/Search/Results?lookfor=&basicType=Keyword&filter[]=format_nw%3A%22Audiobook%22`,
  },
];

const DIGITAL_BROWSE = [
  {
    label: "New eBooks",
    description: "Recently added digital titles",
    icon: IconSparkles,
    href: `${LIBBY}/search?q=&format=ebook-overdrive&sort=dateadded`,
  },
  {
    label: "New Audiobooks",
    description: "Fresh listens, no waiting",
    icon: IconHeadphones,
    href: `${LIBBY}/search?q=&format=audiobook-overdrive-listen&sort=dateadded`,
  },
  {
    label: "Always Available",
    description: "Borrow instantly, no holds",
    icon: IconClock,
    href: `${LIBBY}/search?q=&availability=available_now`,
  },
  {
    label: "Magazines",
    description: "Current issues, free to read",
    icon: IconBookmark,
    href: `${LIBBY}/search?q=&format=magazine-overdrive`,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

type Tab = "physical" | "digital";

export default function CatalogSearch() {
  const [tab, setTab] = useState<Tab>("physical");
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("Keyword");
  const [digitalFormat, setDigitalFormat] = useState("");
  const [results, setResults] = useState<OLResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=6&fields=title,author_name,cover_i,key`,
        );
        const data = await res.json();
        setResults((data.docs as OLResult[]).slice(0, 6));
        setShowDropdown(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function openResult(title: string) {
    if (tab === "physical") {
      const params = new URLSearchParams({ lookfor: title, basicType: "Title" });
      window.open(`${CATALOG}/Union/Search?${params}`, "_blank", "noopener,noreferrer");
    } else {
      const params = new URLSearchParams({ q: title });
      if (digitalFormat) params.set("format", digitalFormat);
      window.open(`${LIBBY}/search?${params}`, "_blank", "noopener,noreferrer");
    }
    setShowDropdown(false);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    openResult(query.trim());
  }

  const browse = tab === "physical" ? PHYSICAL_BROWSE : DIGITAL_BROWSE;
  const placeholder =
    tab === "physical"
      ? `Search by ${searchType.toLowerCase()}…`
      : "Search eBooks, audiobooks, and more…";

  return (
    <div className="space-y-10">
      {/* Tab switcher */}
      <div className="flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1.5 w-fit">
        {(["physical", "digital"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => { setTab(t); setQuery(""); setResults([]); setShowDropdown(false); }}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
              tab === t
                ? "bg-brand text-ink shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t === "physical" ? "Physical Collection" : "Digital Collection"}
          </button>
        ))}
      </div>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Sub-type selectors */}
        {tab === "physical" && (
          <div className="flex flex-wrap gap-1">
            {SEARCH_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setSearchType(t.value)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition border ${
                  searchType === t.value
                    ? "border-brand/60 bg-brand/10 text-brand"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {tab === "digital" && (
          <div className="flex flex-wrap gap-1">
            {DIGITAL_FORMATS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setDigitalFormat(f.value)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition border ${
                  digitalFormat === f.value
                    ? "border-brand/60 bg-brand/10 text-brand"
                    : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Search bar + dropdown */}
        <div ref={wrapperRef} className="relative flex gap-2">
          <div className="relative flex-1">
            {loading ? (
              <IconLoader2
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 animate-spin text-brand"
                aria-hidden
              />
            ) : (
              <IconSearch
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                aria-hidden
              />
            )}
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => { if (results.length) setShowDropdown(true); }}
              placeholder={placeholder}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-base text-white placeholder:text-slate-500 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20"
              autoFocus
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={!query.trim()}
            className="rounded-xl bg-brand px-6 py-4 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-40"
          >
            Search
          </button>

          {showDropdown && results.length > 0 && (
            <div className="absolute left-0 right-[calc(theme(spacing.6)*2+1rem)] top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-white/10 bg-surface shadow-2xl">
              {results.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => { setQuery(r.title); openResult(r.title); }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-white/[0.06]"
                >
                  {r.cover_i ? (
                    // eslint-disable-next-line @next/next/no-img-element -- Open Library cover thumbnails
                    <img
                      src={`https://covers.openlibrary.org/b/id/${r.cover_i}-S.jpg`}
                      alt=""
                      className="h-10 w-7 shrink-0 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-7 shrink-0 items-center justify-center rounded bg-white/10">
                      <IconBook className="h-4 w-4 text-slate-500" aria-hidden />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white">{r.title}</p>
                    {r.author_name?.[0] && (
                      <p className="truncate text-xs text-slate-500">{r.author_name[0]}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          {tab === "physical" ? (
            <>
              <span>Opens in the LION catalog in a new tab.</span>
              <a
                href={`${CATALOG}/Search/Advanced`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand hover:underline"
              >
                Advanced search ↗
              </a>
            </>
          ) : (
            <>
              <span>Opens in Libby / OverDrive in a new tab.</span>
              <a
                href={LIBBY}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand hover:underline"
              >
                Browse all digital titles ↗
              </a>
            </>
          )}
        </div>
      </form>

      {/* Browse grid */}
      <div>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
          {tab === "physical" ? "Browse the Collection" : "Browse Digital"}
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {browse.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-brand/40 hover:bg-white/[0.07]"
              >
                <Icon className="h-5 w-5 text-brand" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-white transition group-hover:text-brand">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom links */}
      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={CATALOG}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-white/20 hover:bg-white/[0.06]"
        >
          <div>
            <p className="text-sm font-semibold text-white">Full LION Catalog ↗</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Search across all 26 LION member libraries
            </p>
          </div>
        </a>
        <a
          href={LIBBY}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-white/20 hover:bg-white/[0.06]"
        >
          <div>
            <p className="text-sm font-semibold text-white">Open Libby ↗</p>
            <p className="text-xs text-slate-500 mt-0.5">
              eBooks, audiobooks & magazines via OverDrive
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
