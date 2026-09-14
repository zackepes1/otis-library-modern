import type { Metadata } from "next";
import { IconArrowUpRight } from "@tabler/icons-react";
import FadeIn from "@/components/motion/FadeIn";
import { resourceCategories } from "@/lib/community-resources-data";

export const metadata: Metadata = {
  title: "Community Resources | Otis Library",
  description:
    "A comprehensive directory of community resources in Norwich, CT — organized by ADA, arts, employment, food, health, housing, transportation, and more.",
};

export default function CommunityResourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn as="h1" className="text-3xl text-white">
        Community Resources
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-4 max-w-2xl text-slate-400">
          Otis Library connects Norwich residents to community services across the region. Use the
          sections below to find resources by category. For the most up-to-date information, call
          or visit the organization directly.
        </p>
      </FadeIn>

      {/* Category jump links */}
      <FadeIn delay={0.1}>
        <div className="mt-8 flex flex-wrap gap-2">
          {resourceCategories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-slate-400 transition hover:border-white/20 hover:text-slate-200"
            >
              {cat.heading}
            </a>
          ))}
        </div>
      </FadeIn>

      {/* Categories */}
      <div className="mt-12 space-y-16">
        {resourceCategories.map((cat, ci) => (
          <FadeIn key={cat.slug} delay={ci * 0.03}>
            <section id={cat.slug}>
              <h2 className="text-xl text-brand">{cat.heading}</h2>
              {cat.subheading && (
                <p className="mt-1 text-sm text-slate-500">{cat.subheading}</p>
              )}
              <div className="mt-4 space-y-3">
                {cat.entries.map((entry) => (
                  <div
                    key={entry.name}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    {entry.href ? (
                      <a
                        href={entry.href}
                        target={entry.href.startsWith("http") ? "_blank" : undefined}
                        rel={entry.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
                      >
                        {entry.name}
                        {entry.href.startsWith("http") && <IconArrowUpRight size={13} />}
                      </a>
                    ) : (
                      <p className="font-semibold text-white">{entry.name}</p>
                    )}
                    {entry.description && (
                      <p className="mt-1 text-sm text-slate-400">{entry.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <div className="mt-16 rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm text-slate-400">
            This directory is maintained by Otis Library staff. For 24/7 help finding any
            community resource, dial{" "}
            <a href="tel:211" className="font-semibold text-brand hover:underline">
              211
            </a>{" "}
            (Connecticut&apos;s free social services hotline) or visit{" "}
            <a
              href="https://www.211ct.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-brand hover:underline"
            >
              211ct.org <IconArrowUpRight size={12} />
            </a>
            .
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
