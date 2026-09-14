import type { Metadata } from "next";
import { IconArrowUpRight } from "@tabler/icons-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";
import { digitalServices as staticDigitalServices } from "@/lib/site-data";
import { getDigitalServices } from "@/sanity/queries";
import { HoverEffectGrid } from "@/components/ui/hover-effect-grid";

const languageCollections = [
  { label: "Arabic", audiences: ["Children"] },
  { label: "Chinese (Mandarin)", audiences: ["Children", "Adults"] },
  { label: "French", audiences: ["Children", "Teens", "Adults"] },
  { label: "Haitian Creole", audiences: ["Children", "Adults"] },
  { label: "Korean", audiences: ["Children"] },
  { label: "Polish", audiences: ["Children"] },
  { label: "Portuguese (Brazil)", audiences: ["Children"] },
  { label: "Portuguese (Portugal)", audiences: ["Children"] },
  { label: "Spanish", audiences: ["Children", "Teens", "Adults"] },
  { label: "Tibetan", audiences: ["Children", "Adults"] },
];

export const metadata: Metadata = {
  title: "Digital Collection | Otis Library",
  description:
    "Ebooks, audiobooks, magazines, movies, and TV shows — free 24/7 with your Otis Library card.",
};

export default async function DigitalCollectionPage() {
  const sanityServices = await getDigitalServices();
  const digitalServices = sanityServices.length > 0 ? sanityServices : staticDigitalServices;
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <FadeIn as="h1" className="text-3xl text-white">Digital Collection</FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-3 max-w-2xl text-slate-400">
          Ebooks, audiobooks, magazines, movies, and TV shows are available to
          you 24 hours a day, 7 days a week — all{" "}
          <strong className="text-white">free</strong> with your Otis Library
          card.
        </p>
      </FadeIn>

      <HoverEffectGrid
        className="mt-10 grid gap-4 sm:grid-cols-2"
        items={digitalServices.map((service) => ({
          key: service.name,
          content: (
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition group-hover:border-brand/30">
              <div className="service-logo-wrap flex h-16 items-center rounded-xl p-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element -- locally-hosted static logos */}
                <img
                  src={service.logo}
                  alt={service.name}
                  className="max-h-12 w-auto max-w-[160px] object-contain"
                />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-white">{service.name}</h2>
              <p className="mt-1 text-sm font-medium text-brand">{service.tagline}</p>
              <p className="mt-3 flex-1 text-sm text-slate-400">{service.description}</p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {service.href && (
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110"
                  >
                    Get Started ↗
                  </a>
                )}
                <a
                  href={service.appStoreHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                >
                  App Store
                </a>
                <a
                  href={service.playStoreHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                >
                  Google Play
                </a>
              </div>
            </div>
          ),
        }))}
      />

      <p className="mt-10 text-sm text-slate-500">
        Download any of these apps on an Android or iOS device, sign in with
        your library card, and get access to hundreds of ebooks, audiobooks,
        movies, and more.
      </p>

      {/* Language Learning */}
      <FadeIn delay={0.15}>
        <section className="mt-16">
          <h2 className="text-xl text-brand">Learn a Language</h2>
          <p className="mt-2 text-sm text-slate-400">
            Free language learning platforms available with your library card.
          </p>
          <StaggerGrid className="mt-6 grid gap-4 sm:grid-cols-2">
            <StaggerItem>
              <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <a
                  href="https://library.transparent.com/norwichct/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
                >
                  Transparent Language Online
                  <IconArrowUpRight size={13} />
                </a>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  110+ languages for adult learners, plus English for speakers of 30+ languages.
                  Available with iOS and Android apps for learning on the go.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <a
                  href="https://www.kidspeak.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
                >
                  KidSpeak™
                  <IconArrowUpRight size={13} />
                </a>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  Language learning for children ages 6 and up. Covers English, Spanish, French,
                  Italian, German, and Mandarin Chinese through 40+ interactive activities, puzzles,
                  and songs. Browser-based — no download required.
                </p>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </section>
      </FadeIn>

      {/* Foreign Language Collections */}
      <FadeIn delay={0.2}>
        <section className="mt-14">
          <h2 className="text-xl text-brand">Foreign Language Collections</h2>
          <p className="mt-2 text-sm text-slate-400">
            Physical books and materials in multiple languages are available to borrow. Search the
            catalog or ask staff for assistance — contact{" "}
            <a href="mailto:ref@otislibrarynorwich.org" className="text-brand hover:underline">
              ref@otislibrarynorwich.org
            </a>
            .
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {languageCollections.map((lang) => (
              <div
                key={lang.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <p className="font-semibold text-white">{lang.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{lang.audiences.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* CT Library for Accessible Books */}
      <FadeIn delay={0.25}>
        <section className="mt-14">
          <h2 className="text-xl text-brand">CT Library for Accessible Books</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
            <p className="text-sm leading-relaxed text-slate-400">
              A network library of the Library of Congress National Library Service (NLS) for the
              Blind and Print Disabled. Connecticut residents who are unable to read standard print
              due to a visual, reading, or physical disability may qualify for free access to audio
              books, braille, and magazines — delivered by US mail or digital download.
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
              Otis Library provides sample materials, equipment demonstrations, informational
              handouts, and paper applications. We also offer Print Braille-On-Demand for all ages.
            </p>
            <a
              href="https://ctstatelibrary.org/ctlab/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              Learn more about CT Library for Accessible Books
              <IconArrowUpRight size={13} />
            </a>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
