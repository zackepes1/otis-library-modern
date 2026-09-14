import type { Metadata } from "next";
import FadeIn from "@/components/motion/FadeIn";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";

export const metadata: Metadata = {
  title: "On Exhibit | Otis Library",
  description:
    "Current and permanent exhibits at Otis Library — rotating gallery shows, display cases, and the permanent art collection throughout the building.",
};

const currentExhibits = [
  {
    location: "Atrium Gallery",
    title: "Votes for Women: The Work Must Be Done",
    organizer: "Connecticut Museum of Culture & History",
    dates: "Through October 5, 2026",
    description:
      "A traveling exhibition examining the long struggle for women's suffrage and the ongoing work of civic participation. Presented in partnership with the Connecticut Museum of Culture & History.",
  },
  {
    location: "Display Cases",
    title: "Cape Verdean Heritage in Norwich",
    dates: "Current",
    description:
      "An immersive display documenting Cape Verdean culture and community history in Norwich through photographs, maps, newspaper articles, personal stories, and cultural artifacts.",
  },
  {
    location: "Book Displays",
    title: "Books, Ballots, & the Right to Vote",
    dates: "Current",
    description:
      "A curated reading display exploring the history of voting rights in America — paired with \"Explore World Cultures: Japan,\" a selection of fiction and nonfiction celebrating Japanese heritage.",
  },
];

const permanentArt = [
  {
    title: "Dan Topalis Portrait Paintings",
    location: "Throughout the building",
    description:
      "A beloved collection of portrait paintings by Norwich artist Dan Topalis, on permanent display since 1976. The works reflect the library's long relationship with local artists.",
  },
  {
    title: "Children of the World",
    artist: "Lavanya Shubhakar",
    location: "Children's Department",
    description:
      "A vibrant multi-panel work celebrating children from cultures around the globe. Commissioned for the Children's Department to inspire curiosity and connection.",
  },
  {
    title: "Children's Playroom Mural",
    artist: "Carolyn McNeil",
    location: "Children's Playroom",
    description:
      "A whimsical mural featuring native woodland creatures, creating an immersive natural environment for the youngest library visitors.",
  },
  {
    title: "Papier-Mâché Art",
    artist: "Pamela Spiro Wagner",
    location: "Throughout the building",
    description:
      "A collection of papier-mâché sculptures donated to the library in 2009. Wagner's work explores themes of mental illness and recovery with warmth and honesty.",
  },
  {
    title: "The View of My Town",
    artist: "Samson Tonton",
    location: "Community Room",
    description:
      "A sweeping cityscape of Norwich as seen through the eyes of a community member. The work anchors the Community Room with a sense of local pride and place.",
  },
  {
    title: "Waterfall",
    artist: "Faith Satterfield",
    location: "Main floor",
    description:
      "Donated in 2016, this large-format work layers aerial map imagery with flowing water motifs — referencing Norwich's historic relationship with the rivers and waterways that shaped the city.",
  },
];

export default function OnExhibitPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn as="h1" className="text-3xl text-white">
        On Exhibit
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-4 max-w-2xl text-slate-400">
          Otis Library is more than books — it&apos;s a cultural space. Rotating gallery exhibits
          and display cases bring art, history, and community stories into the building throughout
          the year, alongside a permanent collection of works by local and regional artists.
        </p>
      </FadeIn>

      {/* Current Exhibits */}
      <section className="mt-12">
        <FadeIn>
          <h2 className="text-xl text-brand">Current Exhibits</h2>
        </FadeIn>
        <div className="mt-6 space-y-5">
          {currentExhibits.map((exhibit) => (
            <FadeIn key={exhibit.title} delay={0.1}>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                  {exhibit.location} · {exhibit.dates}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{exhibit.title}</h3>
                {exhibit.organizer && (
                  <p className="mt-0.5 text-sm text-slate-500">{exhibit.organizer}</p>
                )}
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {exhibit.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Permanent Collection */}
      <section className="mt-14">
        <FadeIn>
          <h2 className="text-xl text-brand">Permanent Collection</h2>
          <p className="mt-2 text-sm text-slate-400">
            Art woven into the fabric of the building — on view every day the library is open.
          </p>
        </FadeIn>
        <StaggerGrid className="mt-6 grid gap-5 sm:grid-cols-2">
          {permanentArt.map((work) => (
            <StaggerItem key={work.title}>
              <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {work.location}
                </p>
                <h3 className="mt-2 font-semibold text-white">{work.title}</h3>
                {work.artist && (
                  <p className="mt-0.5 text-sm font-medium text-brand">{work.artist}</p>
                )}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {work.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Exhibit Inquiries */}
      <FadeIn delay={0.3}>
        <section className="mt-12">
          <h2 className="text-xl text-brand">Exhibit Proposals</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-2">
            <p className="text-sm text-slate-400">
              Otis Library welcomes exhibit proposals from artists, community groups, and cultural
              organizations. Contact us to learn about available spaces and scheduling.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              Get in touch →
            </a>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
