"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IconChevronLeft, IconChevronRight, IconMapPin, IconSearch, IconUsers } from "@tabler/icons-react";
import type { LibcalEvent } from "@/lib/libcal";

export type ClientEvent = Omit<LibcalEvent, "startDateTime">;

type Range = "all" | "week" | "month";

const RANGES: { label: string; value: Range }[] = [
  { label: "All Upcoming", value: "all" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_ABBR = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function groupByDate(events: ClientEvent[]): [string, ClientEvent[]][] {
  const map = new Map<string, ClientEvent[]>();
  for (const event of events) {
    const group = map.get(event.date) ?? [];
    group.push(event);
    map.set(event.date, group);
  }
  return Array.from(map.entries());
}

// ── Mini Calendar ────────────────────────────────────────────────────────────

function MiniCalendar({
  eventDates,
  selectedDate,
  onSelect,
  year,
  month,
  onPrev,
  onNext,
}: {
  eventDates: Set<string>;
  selectedDate: string | null;
  onSelect: (d: string | null) => void;
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const firstDOW = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDOW).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      {/* Month navigation */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-md p-1 text-slate-400 transition hover:text-white"
          aria-label="Previous month"
        >
          <IconChevronLeft size={16} />
        </button>
        <span className="text-sm font-semibold text-white">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          type="button"
          onClick={onNext}
          className="rounded-md p-1 text-slate-400 transition hover:text-white"
          aria-label="Next month"
        >
          <IconChevronRight size={16} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="mb-1 grid grid-cols-7">
        {DAY_ABBR.map((d) => (
          <div
            key={d}
            className="py-1 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-600"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const hasEvents = eventDates.has(dateStr);
          const isSelected = selectedDate === dateStr;
          const isToday = dateStr === todayStr;
          const isPast = dateStr < todayStr;

          return (
            <button
              key={i}
              type="button"
              disabled={!hasEvents}
              onClick={() => onSelect(isSelected ? null : dateStr)}
              className={`relative flex flex-col items-center justify-center rounded-lg py-1.5 text-xs transition ${
                isSelected
                  ? "bg-brand font-semibold text-ink"
                  : hasEvents
                  ? isToday
                    ? "border border-brand/40 text-white hover:bg-brand/10"
                    : "text-white hover:bg-white/10"
                  : isPast
                  ? "cursor-default text-slate-700"
                  : "cursor-default text-slate-600"
              }`}
            >
              {day}
              {hasEvents && !isSelected && (
                <span className="mt-0.5 h-1 w-1 rounded-full bg-brand" />
              )}
            </button>
          );
        })}
      </div>

      {/* Clear date filter */}
      {selectedDate && (
        <button
          type="button"
          onClick={() => onSelect(null)}
          className="mt-3 w-full rounded-lg border border-white/10 py-1.5 text-xs font-semibold text-slate-400 transition hover:border-brand/30 hover:text-brand"
        >
          Clear date ×
        </button>
      )}
    </div>
  );
}

// ── EventsBrowser ────────────────────────────────────────────────────────────

export default function EventsBrowser({ events }: { events: ClientEvent[] }) {
  const today = new Date();
  const [range, setRange] = useState<Range>("all");
  const [query, setQuery] = useState("");
  const [regOnly, setRegOnly] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  // Dates that have at least one event — used to highlight calendar cells
  const eventDates = useMemo(() => new Set(events.map((e) => e.date)), [events]);

  function prevMonth() {
    if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); }
    else setCalMonth((m) => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); }
    else setCalMonth((m) => m + 1);
  }

  // When a calendar date is picked, jump the calendar view to that month
  function handleSelectDate(d: string | null) {
    setSelectedDate(d);
    if (d) {
      setCalYear(parseInt(d.slice(0, 4)));
      setCalMonth(parseInt(d.slice(5, 7)) - 1);
    }
  }

  const filtered = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const weekOut = new Date(now);
    weekOut.setDate(now.getDate() + 7);
    const weekStr = weekOut.toISOString().slice(0, 10);
    const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    return events.filter((e) => {
      if (selectedDate) {
        if (e.date !== selectedDate) return false;
      } else {
        if (e.date < todayStr) return false;
        if (range === "week" && e.date > weekStr) return false;
        if (range === "month" && !e.date.startsWith(monthStr)) return false;
      }
      if (query && !e.title.toLowerCase().includes(query.toLowerCase())) return false;
      if (regOnly && !e.registrations) return false;
      return true;
    });
  }, [events, range, query, regOnly, selectedDate]);

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);

  return (
    <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
      {/* ── Left sidebar: calendar ── */}
      <div className="mb-6 lg:mb-0">
        <MiniCalendar
          eventDates={eventDates}
          selectedDate={selectedDate}
          onSelect={handleSelectDate}
          year={calYear}
          month={calMonth}
          onPrev={prevMonth}
          onNext={nextMonth}
        />
        <p className="mt-3 text-center text-xs text-slate-600">
          Highlighted dates have events
        </p>
      </div>

      {/* ── Right: filters + results ── */}
      <div>
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Range pills — disabled when a specific date is selected */}
          <div className={`flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1 transition ${selectedDate ? "opacity-40 pointer-events-none" : ""}`}>
            {RANGES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRange(r.value)}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                  range === r.value ? "bg-brand text-ink" : "text-slate-400 hover:text-white"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-40 flex-1">
            <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden />
            <input
              type="search"
              placeholder="Search events…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/30"
            />
          </div>

          <button
            type="button"
            onClick={() => setRegOnly((v) => !v)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              regOnly
                ? "border-brand/50 bg-brand/10 text-brand"
                : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            <IconUsers className="h-4 w-4" aria-hidden />
            Registration required
          </button>
        </div>

        {/* Active date filter chip */}
        {selectedDate && (
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </span>
            <button
              type="button"
              onClick={() => setSelectedDate(null)}
              className="text-xs text-slate-500 hover:text-brand transition"
            >
              ×
            </button>
          </div>
        )}

        {/* Results */}
        {grouped.length === 0 ? (
          <p className="mt-12 text-slate-400">No events match your filters.</p>
        ) : (
          <div className="mt-8 space-y-10">
            {grouped.map(([date, dayEvents]) => (
              <div key={date}>
                <h2 className="mb-4 border-b border-white/10 pb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {dayEvents[0].fullDateLabel}
                </h2>
                <div className="space-y-3">
                  {dayEvents.map((event) => {
                    const seatsLeft = event.registrations
                      ? Math.max(event.seats - event.attending, 0)
                      : null;
                    return (
                      <Link
                        key={event.id}
                        href={`/events/${event.id}`}
                        className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-brand/40 hover:bg-white/[0.06] sm:p-5"
                      >
                        {event.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element -- external LibCal-hosted images; remote allowlist not worth maintaining here
                          <img
                            src={event.imageUrl}
                            alt=""
                            className="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-20 sm:w-20"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-16 w-16 shrink-0 rounded-lg bg-white/10 sm:h-20 sm:w-20" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                            {event.startLabel}
                            {event.endLabel ? ` – ${event.endLabel}` : ""}
                          </p>
                          <p className="mt-1 truncate font-semibold text-white">{event.title}</p>
                          {event.location && (
                            <p className="mt-0.5 flex items-center gap-1 truncate text-sm text-slate-400">
                              <IconMapPin className="h-3 w-3 shrink-0" aria-hidden />
                              {event.location}
                            </p>
                          )}
                        </div>
                        {seatsLeft !== null && (
                          <span className="shrink-0 rounded-full bg-brand/20 px-2.5 py-1 text-xs font-semibold text-brand">
                            {seatsLeft === 0 ? "Full" : `${seatsLeft} left`}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
