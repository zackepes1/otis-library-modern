"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { audiences, historySpotlight, quickLinks } from "@/lib/site-data";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";
import EventsCarousel from "@/components/events/EventsCarousel";
import HeroMedia from "@/components/background/HeroMedia";
import DonateSection from "@/components/support/DonateSection";
import ThingsWeLove from "@/components/home/ThingsWeLove";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useLang } from "@/components/providers/LanguageProvider";
import RandomTestimonial from "@/components/RandomTestimonial";
import { client } from "@/sanity/client";

type SnippetPost = { title: string; date: string; href: string };

const CATALOG_CARD = {
  title: "Search the Catalog",
  description: "Find books, eBooks, movies, audiobooks, and more in the LION catalog — free with your library card.",
  href: "https://catalog.lion.org/",
  external: true,
};

const wordVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.07 },
  }),
};

export default function Home() {
  const { t } = useLang();
  const [recentSnippets, setRecentSnippets] = React.useState<SnippetPost[]>(historySpotlight.recent);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);

  React.useEffect(() => {
    client
      .fetch<{ title: string; dateLabel: string; slug: string }[]>(
        `*[_type == "snippet" && defined(publishedAt)] | order(publishedAt desc) [0...4] { title, dateLabel, "slug": key.current }`
      )
      .then((data) => {
        if (data.length > 0) {
          setRecentSnippets(
            data.map((d) => ({ title: d.title, date: d.dateLabel, href: `/local-history/snippets/${d.slug}` }))
          );
        }
      });
  }, []);

  const headline = t("home.hero.headline");
  const words = headline.split(" ");

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative text-white">
        <HeroMedia />
        <motion.div
          style={{ y: heroY }}
          className="relative mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-[2fr_3fr] md:items-center"
        >
          <div>
            {/* Word-by-word text reveal */}
            <h1 className="text-4xl leading-tight sm:text-5xl">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + words.length * 0.07 }}
              className="mt-4 max-w-lg text-slate-300"
            >
              {t("home.hero.body")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + words.length * 0.07 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/on-exhibit"
                className="rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white shadow transition hover:border-white/60 hover:bg-white/10"
              >
                {t("home.hero.cta.onExhibit")}
              </Link>
              <Link
                href="/community-resources"
                className="rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white shadow transition hover:border-white/60 hover:bg-white/10"
              >
                {t("home.hero.cta.communityResources")}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="min-w-0"
          >
            <EventsCarousel />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Bento quick links ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="text-2xl text-white"
        >
          {t("home.quickLinks.heading")}
        </motion.h2>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row">
          {/* Left column — Digital Collection (featured, full height) */}
          <StaggerItem className="lg:w-80 lg:shrink-0">
            <SpotlightCard className="h-full">
              <Link
                href={quickLinks[0].href}
                className="group flex h-full min-h-48 flex-col rounded-xl border border-brand/30 bg-gradient-to-br from-brand/10 to-brand-deep/20 p-6 transition hover:border-brand/50"
              >
                <span className="mb-3 inline-block self-start rounded-full bg-brand/20 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand">
                  {t("home.badge.free247")}
                </span>
                <h3 className="text-lg font-semibold text-brand group-hover:text-blue-300">
                  {quickLinks[0].title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">{quickLinks[0].description}</p>
                <p className="mt-auto pt-6 text-xs font-semibold text-brand/60">Libby · Hoopla · Palace →</p>
              </Link>
            </SpotlightCard>
          </StaggerItem>

          {/* Right column — 3 remaining cards in a grid */}
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Parking & Bookdrops */}
            <StaggerItem>
              <SpotlightCard className="h-full">
                <Link
                  href={quickLinks[1].href}
                  className="group block h-full rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <h3 className="font-semibold text-brand group-hover:text-blue-300">
                    {quickLinks[1].title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">{quickLinks[1].description}</p>
                </Link>
              </SpotlightCard>
            </StaggerItem>

            {/* Meeting Spaces */}
            <StaggerItem>
              <SpotlightCard className="h-full">
                <Link
                  href={quickLinks[2].href}
                  className="group block h-full rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <h3 className="font-semibold text-brand group-hover:text-blue-300">
                    {quickLinks[2].title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">{quickLinks[2].description}</p>
                </Link>
              </SpotlightCard>
            </StaggerItem>

            {/* Catalog search — spans full width of right column */}
            <StaggerItem className="sm:col-span-2">
              <SpotlightCard className="h-full">
                <a
                  href={CATALOG_CARD.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-center gap-6 rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand/30 hover:bg-white/[0.06]"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-brand group-hover:text-blue-300">
                      {CATALOG_CARD.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">{CATALOG_CARD.description}</p>
                  </div>
                  <svg
                    className="h-8 w-8 shrink-0 text-brand/40 transition group-hover:text-brand/70"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden
                  >
                    <path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </SpotlightCard>
            </StaggerItem>
          </div>
        </div>
      </section>

      {/* ── Things We Love ───────────────────────────────────────────────────── */}
      <ThingsWeLove />

      {/* ── Especially for you ───────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="text-2xl text-white"
          >
            {t("home.audiences.heading")}
          </motion.h2>
          <StaggerGrid className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => (
              <StaggerItem key={item.title}>
                <SpotlightCard className="h-full">
                  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }} className="h-full">
                    <Link
                      href={item.href}
                      className="group block h-full rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <h3 className="font-semibold text-brand group-hover:text-blue-300">{item.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                    </Link>
                  </motion.div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── Donate + Donor Spotlight ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <DonateSection />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                    Donor Spotlight
                  </p>
                  <h2 className="mt-1 text-2xl text-white">
                    The people behind Otis Library.
                  </h2>
                </div>
                <Link
                  href="/support#donor-spotlight"
                  className="text-sm font-semibold text-brand hover:underline"
                >
                  See all donors →
                </Link>
              </div>

              <StaggerGrid className="mt-6 grid flex-1 grid-cols-2 gap-4">
                {[
                  {
                    name: "Carol Lahan",
                    badge: "50+ years",
                    imageUrl:
                      "https://otislibrarynorwich.org/wp-content/uploads/2026/05/Carol-Lahan-768x643.png",
                  },
                  {
                    name: "Marianne Juber",
                    badge: "40+ years",
                    imageUrl:
                      "https://otislibrarynorwich.org/wp-content/uploads/2024/01/Marianne_Juber_Closeup.jpeg",
                  },
                  {
                    name: "Norwich Bookies",
                    badge: "235+ books read",
                    imageUrl:
                      "https://otislibrarynorwich.org/wp-content/uploads/elementor/thumbs/norwich-bookies-qhuunco29laplkvq30lax1dnctf2zs8j1j4pisegow.jpg",
                  },
                  {
                    name: "George Grossomanides",
                    badge: "10+ years",
                    imageUrl:
                      "https://otislibrarynorwich.org/wp-content/uploads/2024/08/GeorgeClose.jpg",
                  },
                ].map((donor) => (
                  <StaggerItem key={donor.name}>
                    <Link
                      href="/support#donor-spotlight"
                      className="group block overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition hover:border-brand/30 hover:bg-white/[0.06]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- WordPress CDN asset */}
                      <img
                        src={donor.imageUrl}
                        alt={donor.name}
                        className="aspect-[4/3] w-full object-cover object-top brightness-90 saturate-[0.85]"
                        loading="lazy"
                      />
                      <div className="p-3">
                        <span className="inline-block rounded-full border border-brand/20 bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand">
                          {donor.badge}
                        </span>
                        <p className="mt-1.5 text-sm font-semibold text-white group-hover:text-brand">
                          {donor.name}
                        </p>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerGrid>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Historical snippets ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-deep/40 to-white/[0.03] p-8 sm:p-10">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-md">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                  {historySpotlight.eyebrow}
                </p>
                <h2 className="mt-2 text-2xl text-white">{historySpotlight.title}</h2>
                <p className="mt-2 text-sm text-slate-400">{historySpotlight.description}</p>
              </div>
              <ul className="flex-1 divide-y divide-white/10 border-t border-white/10 sm:border-t-0 sm:border-l sm:border-white/10 sm:pl-8">
                {recentSnippets.map((post) => (
                  <li key={post.title}>
                    <Link
                      href={post.href}
                      className="group/post flex items-center justify-between gap-4 py-3 text-sm transition hover:text-brand"
                    >
                      <span className="text-slate-300 group-hover/post:text-brand">{post.title}</span>
                      <span className="shrink-0 text-xs text-slate-500">{post.date}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href={historySpotlight.href}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              {t("home.history.seeAll")}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Community testimonial ─────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <RandomTestimonial variant="large" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
