import Link from "next/link";
import { fetchLibcalEvents } from "@/lib/libcal";
import EventsBrowser, { type ClientEvent } from "@/components/events/EventsBrowser";
import { getPrograms } from "@/sanity/queries";

export const metadata = {
  title: "Events | Otis Library",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  let clientEvents: ClientEvent[] = [];
  try {
    const raw = await fetchLibcalEvents();
    // Strip the non-serialisable Date field before passing to the client component.
    clientEvents = raw.map(({ startDateTime: _dt, ...rest }) => rest);
  } catch {
    clientEvents = [];
  }
  const programs = await getPrograms();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl text-white">Events &amp; Programs</h1>
          <p className="mt-2 text-slate-400">
            Upcoming programs at Otis Library — updated daily from our event calendar.
          </p>
        </div>
        <a
          href="https://otislibrarynorwich.libcal.com/calendar/otislibrary?cid=19576&t=g&d=0000-00-00&cal=19576&inc=0"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-sm font-semibold text-brand hover:underline"
        >
          LibCal ↗
        </a>
      </div>

      {/* Filterable event browser */}
      <div className="mt-10">
        {clientEvents.length > 0 ? (
          <EventsBrowser events={clientEvents} />
        ) : (
          <p className="text-slate-400">
            Couldn&apos;t load events right now.{" "}
            <Link href="/events" className="text-brand hover:underline">
              Try refreshing ↗
            </Link>
          </p>
        )}
      </div>

      {/* Recurring programs — static, not on LibCal feed */}
      <div className="mt-20 border-t border-white/10 pt-16">
        <h2 className="text-xl font-semibold text-white">Recurring Programs</h2>
        <p className="mt-1 text-sm text-slate-400">
          These programs run throughout the year — check the calendar above for specific dates.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {programs.map((program) => (
            <div
              key={program._id}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                {program.schedule}
              </p>
              <h3 className="mt-2 text-base font-semibold text-white">{program.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
