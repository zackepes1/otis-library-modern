import type { Metadata } from "next";
import { IconArrowUpRight, IconPhone } from "@tabler/icons-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";
import YouthEventsPreview from "@/components/events/YouthEventsPreview";
import { CircularGallery } from "@/components/ui/circular-gallery";
import type { GalleryItem } from "@/components/ui/circular-gallery";

export const metadata: Metadata = {
  title: "Children's Department | Otis Library",
  description:
    "Otis Library's Children's Department serves children from birth through age 11 with storytimes, reading challenges, online resources, and a vibrant in-library space.",
};

const galleryItems: GalleryItem[] = [
  { image: "/images/childrens/Childrens-Room.png", text: "Children's Room" },
  { image: "/images/childrens/Storytime-with-Miss-B.png", text: "Storytime with Miss B" },
  { image: "/images/childrens/Child-and-Tree.png", text: "Reading & Nature" },
  { image: "/images/childrens/Storytime-with-Kat.png", text: "Storytime with Kat" },
  { image: "/images/childrens/Child-Crafting.png", text: "Crafts" },
  { image: "/images/childrens/Toy-Library-Display.png", text: "Toy Library" },
  { image: "/images/childrens/Halloween-Boo-Bash.png", text: "Boo Bash" },
];

const CHILDRENS_KEYWORDS = [
  "storytime",
  "children",
  "child",
  "kid",
  "kindergarten",
  "family",
  "craft",
  "boo bash",
  "baby",
  "toddler",
  "preschool",
  "1000 books",
  "500 books",
];

const programs = [
  {
    title: "Events & Storytimes",
    description:
      "Free storytimes, crafts, book clubs, and special events for children of all ages. Some events require registration — check the Event Calendar or call ext. 114.",
    href: "https://otislibrarynorwich.libcal.com/calendar/otislibrary",
    linkLabel: "View the Event Calendar",
  },
  {
    title: "StoryWalk® at Mohegan Park",
    description:
      "Laminated picturebook pages posted along a path at Spaulding Pond in Mohegan Park. A fun way to read and walk at the same time — updated seasonally.",
  },
  {
    title: "1,000 Books Before Kindergarten",
    description:
      "A reading challenge for newborns through pre-K. Read 1,000 books with your child before they start kindergarten — and track your progress with us.",
  },
  {
    title: "500 Books Before Middle School",
    description:
      "Keep the reading momentum going. A challenge for early-elementary readers to reach 500 books before middle school.",
  },
  {
    title: "KidSpeak™",
    description:
      "Free language learning for kids — English, Spanish, French, Italian, German, and Mandarin Chinese. Available with your library card.",
    href: "https://library.transparent.com/norwichct/",
    linkLabel: "Access KidSpeak",
  },
  {
    title: "researchIT CT",
    description:
      "Free research databases tailored for elementary school students, available through the Connecticut State Library portal.",
    href: "https://research.ebsco.com/c/cjxjty",
    linkLabel: "Open researchIT CT",
  },
];

const onlineResources = [
  {
    label: "Otis Library YouTube Channel",
    description: "Pre-recorded programs, storytimes, and activities.",
    href: "https://www.youtube.com/@OtisLibraryNorwich",
  },
  {
    label: "CT State Library Early Literacy Calendar",
    description: "Monthly early literacy tips and activities for caregivers.",
    href: "https://ctstatelibrary.org/",
  },
  {
    label: "CT Homeschool Network",
    description: "Resources and community for homeschooling families in Connecticut.",
    href: "https://www.cthomeschoolnetwork.org/",
  },
];

export default function ChildrensPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn as="h1" className="text-3xl text-white">
        Children&apos;s Department
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-4 max-w-2xl text-slate-400">
          Visit our fun and bright space full of books, toys, coloring, and computers. The
          Children&apos;s Department serves children from birth through age 11, with staff ready
          to recommend books for every age and reading level.
        </p>
      </FadeIn>

      {/* Photo Gallery */}
      <FadeIn delay={0.1}>
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
          <h2 className="text-xl text-brand">Upcoming Children&apos;s Events</h2>
          <div className="mt-4">
            <YouthEventsPreview
              keywords={CHILDRENS_KEYWORDS}
              fallbackLabel="No children's events found this week — showing upcoming library events."
              calendarLabel="View all children's events"
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

      {/* Online Resources */}
      <FadeIn delay={0.2}>
        <section className="mt-12">
          <h2 className="text-xl text-brand">Online Resources</h2>
          <div className="mt-4 space-y-3">
            {onlineResources.map((res) => (
              <div
                key={res.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <a
                  href={res.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
                >
                  {res.label}
                  <IconArrowUpRight size={13} />
                </a>
                <p className="mt-1 text-sm text-slate-400">{res.description}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Contact */}
      <FadeIn delay={0.25}>
        <section className="mt-12">
          <h2 className="text-xl text-brand">Contact the Children&apos;s Department</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
            <p className="text-sm font-semibold text-white">Bethany Jensen</p>
            <p className="text-sm text-slate-400">Head of Children&apos;s Services</p>
            <a
              href="tel:8608892365"
              className="flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              <IconPhone size={15} />
              (860) 889-2365 ext. 114
            </a>
            <a
              href="https://otislibrarynorwich.libcal.com/calendar/otislibrary"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand/50 hover:bg-brand/15"
            >
              View &amp; Register for Events
              <IconArrowUpRight size={14} />
            </a>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
