import { getSiteInfo } from "@/sanity/queries";

export const metadata = {
  title: "Hours & Parking | Otis Library",
};

export default async function HoursParkingPage() {
  const { hours, address, bookdrops } = await getSiteInfo();
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl text-white">Hours, Parking, &amp; Bookdrops</h1>

      <section className="mt-8">
        <h2 className="text-xl text-brand">Hours</h2>
        <ul className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.03]">
          {hours.map((h) => (
            <li key={h.day} className="flex justify-between px-6 py-3 text-sm text-slate-300">
              <span className="font-medium text-white">{h.day}</span>
              <span>{h.time}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl text-brand">Parking</h2>
        <p className="mt-2 text-slate-400">
          Free, accessible parking is available on-site at {address}.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl text-brand">Bookdrop Locations</h2>
        <ul className="mt-4 space-y-2">
          {bookdrops.map((location) => (
            <li
              key={location}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300"
            >
              {location}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
