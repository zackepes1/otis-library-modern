"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { IconChevronDown, IconSearch, IconX } from "@tabler/icons-react";
import type { Snippet } from "@/lib/snippets";

function decodeTitle(raw: string) {
  return raw
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&nbsp;/g, " ");
}

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

// ─── Custom dropdown ──────────────────────────────────────────────────────────

interface FilterSelectProps {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { label: string; value: string }[];
}

function FilterSelect({ value, onChange, placeholder, options }: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex min-w-28 items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06]"
      >
        <span className={selected ? "text-slate-200" : "text-slate-500"}>
          {selected ? selected.label : placeholder}
        </span>
        <IconChevronDown
          size={13}
          className={`shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 min-w-full overflow-hidden rounded-lg border border-white/10 bg-ink shadow-xl">
          <ul className="py-1">
            <li>
              <button
                type="button"
                onClick={() => { onChange(""); setOpen(false); }}
                className={`w-full px-4 py-2 text-left text-sm transition hover:bg-white/[0.06] ${
                  value === "" ? "text-brand" : "text-slate-400"
                }`}
              >
                {placeholder}
              </button>
            </li>
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full px-4 py-2 text-left text-sm transition hover:bg-white/[0.06] ${
                    value === opt.value ? "text-brand font-medium" : "text-slate-300"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SnippetsSearch({ snippets }: { snippets: Snippet[] }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const yearOptions = useMemo(() => {
    const ys = new Set(snippets.map((s) => new Date(s.date).getFullYear()));
    return Array.from(ys)
      .sort((a, b) => b - a)
      .map((y) => ({ label: String(y), value: String(y) }));
  }, [snippets]);

  const monthOptions = MONTHS.map((m, i) => ({ label: m, value: String(i) }));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return snippets.filter((s) => {
      const d = new Date(s.date);
      if (year && d.getFullYear() !== Number(year)) return false;
      if (month !== "" && d.getMonth() !== Number(month)) return false;
      if (q && !decodeTitle(s.title).toLowerCase().includes(q)) return false;
      return true;
    });
  }, [snippets, query, year, month]);

  const clearAll = () => { setQuery(""); setYear(""); setMonth(""); };
  const hasFilters = query || year || month !== "";

  return (
    <div className="mt-5">
      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-0 flex-1">
          <IconSearch
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search snippets…"
            className="w-full rounded-lg border border-white/10 bg-white/[0.04] py-2 pl-8 pr-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/30"
          />
        </div>

        <FilterSelect
          value={year}
          onChange={setYear}
          placeholder="All years"
          options={yearOptions}
        />

        <FilterSelect
          value={month}
          onChange={setMonth}
          placeholder="All months"
          options={monthOptions}
        />

        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-400 transition hover:border-white/20 hover:text-slate-200"
          >
            <IconX size={12} />
            Clear
          </button>
        )}
      </div>

      {/* Count */}
      {hasFilters && (
        <p className="mt-3 text-xs text-slate-500">
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </p>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">No snippets match your search.</p>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((snippet) => {
            const title = decodeTitle(snippet.title);
            const dateLabel = new Date(snippet.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });
            return (
              <Link
                key={snippet.id}
                href={`/local-history/snippets/${snippet.slug}`}
                className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-brand/30 hover:bg-white/[0.06]"
              >
                <span className="text-sm text-slate-300 group-hover:text-brand">{title}</span>
                <span className="shrink-0 text-xs text-slate-500">{dateLabel}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
