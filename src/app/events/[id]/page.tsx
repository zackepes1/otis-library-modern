import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconArrowLeft, IconCalendar, IconClock, IconMapPin, IconUsers } from "@tabler/icons-react";
import { fetchLibcalEventById } from "@/lib/libcal";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = await fetchLibcalEventById(id);
  if (!event) return { title: "Event Not Found | Otis Library" };
  return {
    title: `${event.title} | Otis Library`,
    description: event.description.slice(0, 160),
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = await fetchLibcalEventById(id);

  if (!event) notFound();

  const seatsLeft = event.registrations ? Math.max(event.seats - event.attending, 0) : null;
  const isFull = event.registrations && seatsLeft === 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      {/* The header's home button only goes to "/" — this page needs its own
          way back to the events list without a full site-nav detour. */}
      <Link
        href="/events"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition hover:text-brand"
      >
        <IconArrowLeft className="h-4 w-4" />
        Back to Events
      </Link>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        {event.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- external, ever-changing LibCal-hosted cover art; next/image's remote allowlist isn't worth it here.
          <img
            src={event.imageUrl}
            alt=""
            className="h-56 w-full object-cover sm:h-72"
            loading="eager"
          />
        )}

        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">
            {event.dateLabel}
            {event.startLabel ? ` • ${event.startLabel}${event.endLabel ? ` – ${event.endLabel}` : ""}` : ""}
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{event.title}</h1>

          <dl className="mt-5 grid grid-cols-1 gap-3 text-sm text-slate-300 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <IconCalendar className="h-4 w-4 shrink-0 text-slate-500" />
              <span>{event.fullDateLabel}</span>
            </div>
            {event.startLabel && (
              <div className="flex items-center gap-2">
                <IconClock className="h-4 w-4 shrink-0 text-slate-500" />
                <span>
                  {event.startLabel}
                  {event.endLabel ? ` – ${event.endLabel}` : ""}
                </span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <IconMapPin className="h-4 w-4 shrink-0 text-slate-500" />
                <span>{event.location}</span>
              </div>
            )}
            {event.registrations && (
              <div className="flex items-center gap-2">
                <IconUsers className="h-4 w-4 shrink-0 text-slate-500" />
                <span>
                  {isFull ? "Fully booked" : `${seatsLeft} seat${seatsLeft === 1 ? "" : "s"} left`} of {event.seats}
                </span>
              </div>
            )}
          </dl>

          {event.description && (
            <div className="mt-6 space-y-3 text-sm leading-relaxed whitespace-pre-line text-slate-300">
              {event.description}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-brand px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              {event.registrations ? "Register on LibCal ↗" : "View on LibCal ↗"}
            </a>
            <Link
              href="/events"
              className="text-sm font-semibold text-slate-400 hover:text-brand hover:underline"
            >
              ← All events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
