import type { Metadata } from "next";
import { IconArrowUpRight, IconPhone } from "@tabler/icons-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";
import YouthEventsPreview from "@/components/events/YouthEventsPreview";
import { CircularGallery } from "@/components/ui/circular-gallery";
import type { GalleryItem } from "@/components/ui/circular-gallery";

export const metadata: Metadata = {
  title: "Young Adult Department | Otis Library",
  description:
    "Otis Library's Young Adult Department — books, graphic novels, crafts, and programs for tweens and teens ages 12–18.",
};

const galleryItems: GalleryItem[] = [
  { image: "/images/young-adult/YA-Room.png", text: "YA Room" },
  { image: "/images/young-adult/Kait-with-Sign.png", text: "Teen Space" },
  { image: "/images/young-adult/Teen-Space.png", text: "Hang Out" },
  { image: "/images/young-adult/Teens-with-Kait.png", text: "Teens with Kait" },
  { image: "/images/young-adult/Teens-Posing.png", text: "Teen Crew" },
  { image: "/images/young-adult/YA-Center-Opening-Wall.png", text: "Grand Opening" },
  { image: "/images/young-adult/100-Books.png", text: "100 Books Challenge" },
  { image: "/images/young-adult/100-Books-Promo-Picture-1.png", text: "100 Books Promo" },
];

const YA_KEYWORDS = [
  "teen",
  "tween",
  "young adult",
  " ya ",
  "book club",
  "homework",
  "graduation",
  "100 books",
  "teen journal",
  "craft",
  "driving",
];

const programs = [
  {
    title: "Monthly Programs & Crafts",
    description:
      "Free monthly events and craft activities for ages 12–18 with all materials provided. Some events require registration.",
    href: "https://otislibrarynorwich.libcal.com/calendar/otislibrary",
    linkLabel: "View the Event Calendar",
  },
  {
    title: "Teen Journal",
    description:
      "A publishing opportunity for creative writing, poetry, short stories, and artwork. Four volumes are currently in print — visit the library to see a copy.",
  },
  {
    title: "100 Books Before Graduation",
    description:
      "A tiered reading challenge with prizes at 25, 50, 75, and 100 books — tote bag, stickers, Amazon gift card, and a framed certificate.",
  },
  {
    title: "Driving Test Practice",
    description:
      "Prepare for the Connecticut DMV exam with free online practice tests, including CDL and motorcycle licenses.",
    href: "https://otis.driving-tests.org/connecticut/",
    linkLabel: "Start practicing",
  },
  {
    title: "researchIT CT",
    description:
      "Free academic, scholarly, and newspaper databases for middle and high school students — available with your library card.",
    href: "https://research.ebsco.com/c/cjxjty",
    linkLabel: "Open researchIT CT",
  },
  {
    title: "Homeschooling Resources",
    description:
      "Guidance for homeschooling families including links to the CT Homeschool Network and Connecticut state homeschooling resources.",
    href: "https://www.cthomeschoolnetwork.org/",
    linkLabel: "CT Homeschool Network",
  },
];

const prizes = [
  { milestone: "25 Books", prize: "Tote bag" },
  { milestone: "50 Books", prize: "Sticker pack" },
  { milestone: "75 Books", prize: "Amazon gift card" },
  { milestone: "100 Books", prize: "Framed certificate" },
];

export default function YoungAdultPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn as="h1" className="text-3xl text-white">
        Young Adult Department
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand">
          Tweens &amp; Teens — Ages 12–18
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="mt-4 max-w-2xl text-slate-400">
          A dedicated space featuring books, graphic novels, programs, and crafts — all designed
          for tweens and teens. Whatever you&apos;re looking for, we&apos;ve got you covered.
        </p>
      </FadeIn>

      {/* Photo Gallery */}
      <FadeIn delay={0.12}>
        <div className="relative mt-10 h-[480px] w-full rounded-xl overflow-hidden">
          <CircularGallery
            items={galleryItems}
            bend={3}
            borderRadius={0.05}
            scrollEase={0.05}
            scrollSpeed={2}
          />
        </div>
      </FadeIn>

      {/* Upcoming Events */}
      <FadeIn delay={0.15}>
        <section className="mt-12">
          <h2 className="text-xl text-brand">Upcoming Teen Events</h2>
          <div className="mt-4">
            <YouthEventsPreview
              keywords={YA_KEYWORDS}
              fallbackLabel="No teen events found this week — showing upcoming library events."
              calendarLabel="View all teen events"
            />
          </div>
        </section>
      </FadeIn>

      {/* Programs */}
      <section className="mt-12">
        <FadeIn>
          <h2 className="text-xl text-brand">Programs &amp; Resources</h2>
        </FadeIn>
        <StaggerGrid className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((prog) => (
            <StaggerItem key={prog.title}>
              <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-semibold text-white">{prog.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {prog.description}
                </p>
                {prog.href && (
                  <a
                    href={prog.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                  >
                    {prog.linkLabel}
                    <IconArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* 100 Books prize table */}
      <FadeIn delay={0.2}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">100 Books Before Graduation — Prize Tiers</h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04]">
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">Milestone</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-300">Prize</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {prizes.map((p) => (
                  <tr key={p.milestone} className="bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium text-white">{p.milestone}</td>
                    <td className="px-4 py-3 text-slate-400">{p.prize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </FadeIn>

      {/* Contact */}
      <FadeIn delay={0.25}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">Contact</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
            <p className="text-sm font-semibold text-white">Emily Gardiner</p>
            <p className="text-sm text-slate-400">Young Adult Librarian</p>
            <a
              href="tel:8608892365"
              className="flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              <IconPhone size={15} />
              (860) 889-2365 ext. 107
            </a>
            <a
              href="https://otislibrarynorwich.libcal.com/calendar/otislibrary"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand/50 hover:bg-brand/15"
            >
              Browse &amp; Register for Events
              <IconArrowUpRight size={14} />
            </a>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
