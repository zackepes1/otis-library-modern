import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";

export const metadata: Metadata = {
  title: "Volunteer | Otis Library",
  description:
    "Volunteer at Otis Library — opportunities for youth and adults of all ability levels, from event setup to Summer Learning Program support.",
};

const opportunities = [
  {
    audience: "Adults (Ages 18+)",
    items: [
      "General library operations support",
      "Assist with special events and community programs",
      "Book sale preparation and sorting (Friends of Otis Library)",
      "Administrative and behind-the-scenes tasks",
    ],
  },
  {
    audience: "Tweens & Teens (Ages 12+)",
    items: [
      "Help set up for events and programs",
      "Assist patrons with signing up for the Summer Learning Program",
      "Support library cleanliness and beautification",
    ],
    note: "Most opportunities occur during the Summer Learning Program, with some year-round positions available.",
  },
];

export default function VolunteerPage() {
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
        Volunteer at Otis Library
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-4 text-slate-400">
          Otis Library offers volunteer opportunities for youth and adults of all ability levels.
          Fill out an application and you&apos;ll receive a link to sign up for available time
          slots on SignUp.com.
        </p>
      </FadeIn>

      <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2">
        {opportunities.map((opp) => (
          <StaggerItem key={opp.audience}>
            <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-semibold text-brand">{opp.audience}</h2>
              <ul className="mt-4 flex-1 space-y-2">
                {opp.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
              {opp.note && (
                <p className="mt-4 text-xs text-slate-500">{opp.note}</p>
              )}
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>

      <FadeIn delay={0.2}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">How It Works</h2>
          <ol className="mt-4 space-y-3">
            {[
              "Download and complete the appropriate application form.",
              "Return the completed form to the library in person or by email.",
              "You'll receive a link to SignUp.com to browse available volunteer time slots.",
              "Sign up for shifts that work with your schedule.",
            ].map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-400">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-xs font-bold text-brand">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </FadeIn>

      <FadeIn delay={0.25}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">Contact</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-2">
            <p className="text-sm text-slate-400">
              Questions about volunteering? Contact the library directly.
            </p>
            <p className="text-sm text-slate-400">261 Main Street, Norwich, CT 06360</p>
            <a
              href="tel:8608892365"
              className="flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              (860) 889-2365
            </a>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
