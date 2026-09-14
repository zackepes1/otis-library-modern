"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconArrowUpRight, IconCalendar, IconMapPin } from "@tabler/icons-react";
import type { UpcomingEvent } from "@/app/api/upcoming-events/route";

type Status = "loading" | "success" | "error";

export default function YouthEventsPreview({
  keywords,
  fallbackLabel,
  calendarLabel = "View all events",
}: {
  keywords: string[];
  fallbackLabel?: string;
  calendarLabel?: string;
}) {
  const [status, setStatus] = useState<Status>("loading");
  const [allEvents, setAllEvents] = useState<UpcomingEvent[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/upcoming-events", { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => {
        setAllEvents(d.events ?? []);
        setStatus("success");
      })
      .catch((err) => {
        if ((err as Error).name !== "AbortError") setStatus("error");
      });
    return () => controller.abort();
  }, []);

  const lc = keywords.map((k) => k.toLowerCase());
  const matched = allEvents.filter((e) =>
    lc.some(
      (k) =>
        e.title.toLowerCase().includes(k) ||
        e.description.toLowerCase().includes(k)
    )
  );

  // Fall back to first few all-library events if no keyword matches found
  const displayEvents = matched.length > 0 ? matched.slice(0, 4) : allEvents.slice(0, 3);
  const isFallback = matched.length === 0 && allEvents.length > 0;

  return (
    <>
      {status === "loading" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-white/10" />
          ))}
        </div>
      )}

      {status === "error" && (
        <p className="text-sm text-slate-400">
          Couldn&apos;t load events right now.{" "}
          <a
            href="https://otislibrarynorwich.libcal.com/calendar/otislibrary"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            Check the full calendar ↗
          </a>
        </p>
      )}

      {status === "success" && displayEvents.length === 0 && (
        <p className="text-sm text-slate-400">
          No upcoming events right now.{" "}
          <a
            href="https://otislibrarynorwich.libcal.com/calendar/otislibrary"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            Check the full calendar ↗
          </a>
        </p>
      )}

      {status === "success" && displayEvents.length > 0 && (
        <>
          {isFallback && fallbackLabel && (
            <p className="mb-4 text-sm text-slate-500">{fallbackLabel}</p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            {displayEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-brand/40 hover:bg-white/[0.06]"
              >
                <IconCalendar size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                    {event.dateLabel}
                    {event.startLabel ? ` · ${event.startLabel}` : ""}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-sm font-semibold text-white">
                    {event.title}
                  </p>
                  {event.location && (
                    <p className="mt-1 flex items-center gap-1 truncate text-xs text-slate-400">
                      <IconMapPin size={11} aria-hidden />
                      {event.location}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4">
            <a
              href="https://otislibrarynorwich.libcal.com/calendar/otislibrary"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              {calendarLabel}
              <IconArrowUpRight size={13} />
            </a>
          </div>
        </>
      )}
    </>
  );
}
