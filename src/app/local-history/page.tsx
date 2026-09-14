import type { Metadata } from "next";
import { IconArrowUpRight, IconPhone, IconClock } from "@tabler/icons-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";
import { fetchSnippets } from "@/lib/snippets";
import SnippetsSearch from "@/components/local-history/SnippetsSearch";

export const metadata: Metadata = {
  title: "Local History & Genealogy | Otis Library",
  description:
    "The Edward & Mary Lord Local History and Genealogy Room at Otis Library — archives, digitized newspapers, historic photographs, ancestry databases, and research services.",
};

const resources = [
  {
    title: "Norwich Bulletin Digitized",
    description:
      "Historic editions of the Norwich Bulletin are digitized and available on the Internet Archive. The library also houses microfilm, bound volumes, and clipping files.",
    href: "https://archive.org/search?query=norwich+bulletin",
    linkLabel: "Search the Internet Archive",
  },
  {
    title: "Historical Photographs",
    description:
      "A growing digital collection of historic photographs and postcards from the nineteenth century onward, accessible on the Otis Library Flickr page.",
    href: "https://www.flickr.com/photos/otislibrary/",
    linkLabel: "Browse on Flickr",
  },
  {
    title: "Snippets from Norwich History",
    description:
      "Monthly highlights of Norwich history — spanning mills, mariners, notable figures like Lydia Sigourney and Prudence Crandall, the 1936 floods, the 1938 hurricane, and more.",
    href: "/local-history#snippets",
    linkLabel: "Read the series",
  },
  {
    title: "Ancestry Databases and Resources",
    description:
      "Curated resources for family history research including birth records, census reports, military records, and historical newspapers — available in-library.",
    href: "",
    linkLabel: "",
  },
  {
    title: "Genealogy Collections",
    description:
      "Preserved information and artifacts relevant to research in Norwich, Windham County, and New London County.",
    href: "",
    linkLabel: "",
  },
  {
    title: "Microfilm Collection",
    description:
      "Microfilm readers and a broad microfilm archive are available for in-library use. Staff can assist with equipment and research.",
    href: "",
    linkLabel: "",
  },
];

const hours = [
  { day: "Monday & Wednesday", time: "9:00 AM – 7:00 PM" },
  { day: "Tuesday & Friday", time: "9:00 AM – 5:00 PM" },
  { day: "Thursday & Saturday", time: "9:00 AM – 2:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export default async function LocalHistoryPage() {
  const snippets = await fetchSnippets();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn as="h1" className="text-3xl text-white">
        Local History &amp; Genealogy
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand">
          The Edward &amp; Mary Lord Local History and Genealogy Room
        </p>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="mt-4 max-w-2xl text-slate-400">
          The Local History Room maintains collections focused on Norwich and surrounding areas,
          emphasizing New London and Windham Counties. Resources include books, historic newspapers,
          photographs, and written and pictorial pamphlet file materials.
        </p>
      </FadeIn>

      {/* Resources Grid */}
      <section className="mt-12">
        <FadeIn>
          <h2 className="text-xl text-brand">Resources &amp; Collections</h2>
        </FadeIn>
        <StaggerGrid className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((res) => (
            <StaggerItem key={res.title}>
              <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-semibold text-white">{res.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {res.description}
                </p>
                {res.href && (
                  <a
                    href={res.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                  >
                    {res.linkLabel}
                    <IconArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Research Services */}
      <FadeIn delay={0.15}>
        <section id="research-services" className="mt-12">
          <h2 className="text-xl text-brand">Research Services</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
            <p className="text-sm leading-relaxed text-slate-400">
              Staff offer limited assistance with searches and equipment. Requests for information
              that exceed 15 minutes are subject to a fee. For complex genealogical research,
              consider scheduling a research visit.
            </p>
            <a
              href="/local-history#research-services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              Research Services details
            </a>
          </div>
        </section>
      </FadeIn>

      {/* Snippets Archive */}
      <section id="snippets" className="mt-12">
        <h2 className="text-xl text-brand">Snippets from Norwich History</h2>
        <p className="mt-2 text-sm text-slate-400">
          A monthly series exploring the people, places, and events that shaped Norwich.
        </p>
        {snippets.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">Unable to load snippets right now — please check back soon.</p>
        ) : (
          <SnippetsSearch snippets={snippets} />
        )}
      </section>

      {/* Hours & Contact */}
      <FadeIn delay={0.25}>
        <section className="mt-12">
          <h2 className="text-xl text-brand">Visit the Local History Room</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand">
                <IconClock size={14} />
                Hours
              </div>
              <ul className="mt-3 space-y-1">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-between text-sm text-slate-400">
                    <span>{h.day}</span>
                    <span className="text-slate-300">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand">
                <IconPhone size={14} />
                Contact
              </div>
              <p className="mt-3 text-sm text-slate-400">261 Main St., Norwich, CT 06360</p>
              <a
                href="tel:8608892365"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
              >
                (860) 889-2365
              </a>
              <p className="mt-3 text-xs text-slate-500">
                The Local History Room is on the second floor of Otis Library.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
