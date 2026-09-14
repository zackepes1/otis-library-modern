import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IconArrowLeft, IconClock, IconMapPin, IconUsers } from "@tabler/icons-react";
import { fetchLibcalEvents } from "@/lib/libcal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Harris Sisters Month | Otis Library",
  description: "Harris Sisters Month (April) events at Otis Library — celebrating the legacy of the Harris sisters and their contributions to Norwich.",
};

export default async function HarrisSistersPage() {
  const todayStr = new Date().toISOString().slice(0, 10);

  let upcoming: Awaited<ReturnType<typeof fetchLibcalEvents>> = [];
  try {
    const all = await fetchLibcalEvents();
    upcoming = all.filter(
      (e) => e.date >= todayStr && e.title.toLowerCase().includes("harris sisters"),
    );
  } catch {
    // fall through to empty state
  }

  if (upcoming.length === 1) {
    redirect(`/events/${upcoming[0].id}`);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/events"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 transition hover:text-brand"
      >
        <IconArrowLeft className="h-4 w-4" />
        Back to Events
      </Link>

      <h1 className="mt-2 text-3xl font-semibold text-white">Harris Sisters Month</h1>
      <p className="mt-3 text-slate-400">
        Each April, Otis Library celebrates the legacy of the Harris sisters with special programming.
      </p>

      <div className="mt-10">
        {upcoming.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center">
            <p className="text-slate-400">No upcoming dates are listed yet — check back in April.</p>
            <a
              href="https://otislibrarynorwich.libcal.com/calendar/otislibrary?cid=19576&t=g&d=0000-00-00&cal=19576&inc=0"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              Check the full event calendar ↗
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {upcoming.map((event) => {
              const seatsLeft = event.registrations
                ? Math.max(event.seats - event.attending, 0)
                : null;
              return (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-brand/40 hover:bg-white/[0.06] sm:flex-row sm:items-center sm:gap-6"
                >
                  <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-brand">
                      {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="text-2xl font-bold text-white leading-none">
                      {new Date(event.date + "T12:00:00").getDate()}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(event.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" })}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white">{event.title}</p>
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                      {event.startLabel && (
                        <span className="flex items-center gap-1.5">
                          <IconClock className="h-3.5 w-3.5 shrink-0" />
                          {event.startLabel}{event.endLabel ? ` – ${event.endLabel}` : ""}
                        </span>
                      )}
                      {event.location && (
                        <span className="flex items-center gap-1.5">
                          <IconMapPin className="h-3.5 w-3.5 shrink-0" />
                          {event.location}
                        </span>
                      )}
                      {seatsLeft !== null && (
                        <span className="flex items-center gap-1.5">
                          <IconUsers className="h-3.5 w-3.5 shrink-0" />
                          {seatsLeft === 0 ? "Full" : `${seatsLeft} seat${seatsLeft === 1 ? "" : "s"} left`}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-brand">Details →</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-12 border-t border-white/10 pt-8">
        <p className="text-sm text-slate-500">
          Dates are loaded live from the library's event calendar.{" "}
          <Link href="/events" className="text-brand hover:underline">
            Browse all events →
          </Link>
        </p>
      </div>
    </div>
  );
}
