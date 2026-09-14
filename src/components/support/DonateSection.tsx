"use client";

import { useEffect, useState } from "react";
import {
  IconHeartHandshake,
  IconReceipt2,
  IconMapPin,
  IconBuildingBank,
} from "@tabler/icons-react";
import { useSiteInfo } from "@/components/providers/SiteInfoProvider";
import FadeIn from "@/components/motion/FadeIn";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";
import { AnimatePresence, motion } from "motion/react";

const impact = [
  { icon: IconMapPin, text: "Every dollar stays right here in Norwich." },
  { icon: IconReceipt2, text: "Gifts are tax-deductible to the extent provided by law." },
  { icon: IconBuildingBank, text: "Many employers match charitable gifts — ask yours." },
];

// Short rotating taglines shown beneath the CTA button, inspired by the
// "CTA with Text Marquee" pattern from 21st.dev's CTA gallery (that exact
// component requires a paid registry key to install, so this is an
// original re-implementation of the idea, not a copy).
const taglines = [
  "175 years of service to Norwich.",
  "Free & open to everyone in our community.",
  "100% community-funded programs.",
];

function TaglineRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % taglines.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-3 h-5 overflow-hidden text-sm text-brand/80">
      <AnimatePresence mode="wait">
        <motion.p
          key={taglines[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
        >
          {taglines[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// "Support Otis Library" — a donation-focused call to action, adapted from
// otislibrarynorwich.org/support-otis-library/. Otis relies heavily on
// community giving, so this gets a distinct, prominent treatment (its own
// glowing-bordered panel) rather than blending into the background like the
// informational sections around it. Lives in a half-width column next to
// the Local History spotlight on the homepage, so its internal layout
// stacks vertically (rather than the wider side-by-side layout a full-width
// panel could afford) and its "ways to give" grid is 2x2 instead of 1x4.
const DONATE_URL_FALLBACK = "/donate";

export default function DonateSection() {
  const siteInfo = useSiteInfo();
  const donateUrl = siteInfo.donateUrl ?? DONATE_URL_FALLBACK;
  const supportWays = [
    {
      title: "Give Today",
      description:
        "One-time or recurring gifts directly support collections, programs, and services for the whole community.",
      href: donateUrl,
    },
    {
      title: "Become a Friend",
      description:
        "Join the Friends of Otis Library — membership dues and book-sale proceeds fund special programs year-round.",
      href: "/friends",
    },
    {
      title: "Volunteer",
      description:
        "Lend your time and talents to programs, the book sale, special events, and day-to-day library operations.",
      href: "/volunteer",
    },
    {
      title: "Honor a Loved One",
      description:
        "Tribute and memorial gifts place a personalized bookplate in our collection in someone's honor or memory.",
      href: "/support",
    },
  ];
  return (
    <FadeIn className="group relative h-full overflow-hidden rounded-2xl p-[1px]">
      {/* Slowly rotating conic-gradient "glow ring" behind the panel —
          contained to this box's bounds by the parent's overflow-hidden,
          so only a thin animated sliver shows through the 1px padding. */}
      <div
        className="absolute inset-0 -z-10 opacity-60 [animation:border-spin_10s_linear_infinite]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, var(--color-brand) 8%, transparent 20%)",
        }}
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand/30 bg-gradient-to-br from-brand-deep/60 via-ink to-ink p-6 sm:p-8">
        <div className="flex items-center gap-2 text-brand">
          <IconHeartHandshake size={28} stroke={1.75} />
          <p className="text-xs font-semibold uppercase tracking-wide">Support Otis Library</p>
        </div>
        <h2 className="mt-3 text-2xl text-white">
          There are many ways to make an impact at your Library.
        </h2>
        <p className="mt-3 text-slate-300">
          Otis Library is a free resource for the whole community — and that&rsquo;s only
          possible thanks to donors, volunteers, and Friends like you. Every gift, of any
          size, helps keep our doors open and our programs growing.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={donateUrl}
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-ink shadow transition hover:brightness-110"
          >
            <IconHeartHandshake size={18} stroke={2} />
            Donate Now
          </a>
        </div>
        <TaglineRotator />

        <ul className="mt-6 flex flex-col gap-3">
          {impact.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3 text-sm text-slate-300">
              <Icon size={20} stroke={1.75} className="mt-0.5 shrink-0 text-brand" />
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <StaggerGrid className="mt-8 grid grid-cols-2 gap-4">
          {supportWays.map((way) => (
            <StaggerItem key={way.title}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
                <a
                  href={way.href}
                  className="group/card block h-full rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-brand/40 hover:bg-white/[0.06]"
                >
                  <h3 className="text-sm font-semibold text-white group-hover/card:text-brand">
                    {way.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-400">{way.description}</p>
                </a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </FadeIn>
  );
}

