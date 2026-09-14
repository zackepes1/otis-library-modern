"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconMapPin } from "@tabler/icons-react";
import type { UpcomingEvent } from "@/app/api/upcoming-events/route";
import { Carousel } from "@/components/ui/apple-cards-carousel";

type Status = "loading" | "success" | "error";

function EventCard({ event }: { event: UpcomingEvent }) {
  const seatsLeft = event.registrations ? Math.max(event.seats - event.attending, 0) : null;

  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex h-64 w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-brand/40 hover:bg-white/[0.08] sm:h-72"
    >
      {/* Image gets its own fixed-height slot so overlaid text never fights
          with busy photo backgrounds for contrast. */}
      <div className="relative h-36 w-full shrink-0 overflow-hidden bg-white/10 sm:h-44">
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- external, ever-changing LibCal-hosted cover art; next/image's remote allowlist isn't worth it here.
          <img
            src={event.imageUrl}
            alt=""
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
            Otis Library
          </div>
        )}
        {seatsLeft !== null && (
          <span className="absolute right-2 top-2 rounded-full bg-ink/80 px-2 py-0.5 text-[10px] font-semibold text-brand backdrop-blur">
            {seatsLeft === 0 ? "Full" : `${seatsLeft} left`}
          </span>
        )}
      </div>

      {/* Solid background text panel — no overlay-on-image contrast issues.
          The title reserves a fixed 2-line height (rather than growing to
          fit) so a long, wrapping title can never push the location line
          past the card's bottom edge and get clipped by overflow-hidden. */}
      <div className="flex min-h-0 flex-1 flex-col justify-between bg-ink/60 p-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand">
            {event.dateLabel}
            {event.startLabel ? ` • ${event.startLabel}` : ""}
          </p>
          <p className="mt-1 line-clamp-2 h-10 text-sm font-semibold leading-5 text-white">
            {event.title}
          </p>
        </div>
        {event.location && (
          <p className="mt-2 flex shrink-0 items-center gap-1 truncate text-xs text-slate-400">
            <IconMapPin className="h-3 w-3 shrink-0" />
            {event.location}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function EventsCarousel() {
  const [status, setStatus] = useState<Status>("loading");
  const [events, setEvents] = useState<UpcomingEvent[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/upcoming-events", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.events ?? []);
        setStatus("success");
      })
      .catch((err) => {
        if ((err as Error).name === "AbortError") return;
        setStatus("error");
      });
    return () => controller.abort();
  }, []);

  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-200">This Week&apos;s Events</h2>
        <Link href="/events" className="text-xs font-semibold text-brand hover:underline">
          Full calendar ↗
        </Link>
      </div>

      <div className="mt-4">
        {status === "loading" && (
          <div className="h-64 w-full animate-pulse rounded-2xl bg-white/10 sm:h-72" />
        )}

        {status === "error" && (
          <p className="text-sm text-slate-400">
            Couldn&apos;t load the event calendar right now.{" "}
            <Link href="/events" className="text-brand hover:underline">
              View all events ↗
            </Link>
          </p>
        )}

        {status === "success" && events.length === 0 && (
          <p className="text-sm text-slate-400">
            No events on the calendar this week.{" "}
            <Link href="/events" className="text-brand hover:underline">
              See what&apos;s coming up ↗
            </Link>
          </p>
        )}

        {status === "success" && events.length > 0 && (
          <Carousel items={events.map((event) => <EventCard key={event.id} event={event} />)} interval={3500} />
        )}
      </div>
    </div>
  );
}
