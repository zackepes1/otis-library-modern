import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";

export const metadata: Metadata = {
  title: "Friends of Otis Library",
  description:
    "Join the Friends of Otis Library — a volunteer organization that supports the library through fundraising, bi-annual book sales, and membership.",
};

const boardMembers = [
  { role: "President", name: "Josh Davis" },
  { role: "Vice President", name: "TBD" },
  { role: "Secretary", name: "Ellen Carenza" },
  { role: "Treasurer", name: "Janis Gauvin" },
];

const recentInitiatives = [
  "Ancestry genealogy database access",
  "Sensory kits for children",
  "Library signage enhancements",
  "Pronunciator language learning software",
  "Collection development",
];

export default function FriendsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/#how-can-i-help"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
      >
        <IconArrowLeft size={16} />
        Back
      </Link>

      <FadeIn as="h1" className="mt-4 text-3xl text-white">
        Friends of Otis Library
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-4 text-slate-400">
          The Friends of Otis Library are volunteers who support the library through fundraising.
          When you become a member, you support not only the library, but also the surrounding
          community. Membership dues and book-sale proceeds fund special programs that make Otis
          Library a richer resource for everyone in Norwich.
        </p>
      </FadeIn>

      {/* Book Sales */}
      <FadeIn delay={0.1}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">Bi-Annual Book Sales</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            The Friends organize two book sales each year — in April and October — collecting
            gently used books, audiobooks, CDs, and DVDs. These sales are a beloved community
            tradition and a major source of funding for library programs. For large donations,
            call Andrea at extension 127.
          </p>
        </section>
      </FadeIn>

      {/* Recent Funding */}
      <FadeIn delay={0.15}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">Your Membership Funds</h2>
          <ul className="mt-4 space-y-2">
            {recentInitiatives.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-slate-400">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      {/* Executive Board */}
      <FadeIn delay={0.2}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">Executive Board</h2>
          <StaggerGrid className="mt-4 grid gap-3 sm:grid-cols-2">
            {boardMembers.map((m) => (
              <StaggerItem key={m.role}>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                    {m.role}
                  </p>
                  <p className="mt-1 font-medium text-white">{m.name}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
      </FadeIn>

      {/* Meetings & Join */}
      <FadeIn delay={0.25}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">Meetings & How to Join</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
            <p className="text-sm text-slate-400">
              Meetings are held on the{" "}
              <span className="font-medium text-slate-300">
                third Wednesday of each month at 5 PM
              </span>{" "}
              in the meeting room on the second floor of the library.
            </p>
            <p className="text-sm text-slate-400">
              A membership brochure is available at the library. Stop by, call, or reach out to
              any board member to learn more.
            </p>
            <div className="pt-1">
              <p className="text-sm text-slate-400">261 Main Street, Norwich, CT 06360</p>
              <a
                href="tel:8608892365"
                className="flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
              >
                (860) 889-2365
              </a>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Membership brochures are available at the front desk — stop by or call us to request one.
            </p>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
