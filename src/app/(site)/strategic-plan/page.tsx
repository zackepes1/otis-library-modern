import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft, IconFileText } from "@tabler/icons-react";
import { strategicPlan, strategicGoals } from "@/lib/strategic-plan";
import FadeIn from "@/components/motion/FadeIn";
import { GoalsAccordion } from "@/components/strategic-plan/GoalsAccordion";
import { PdfModal } from "@/components/ui/PdfModal";

export const metadata: Metadata = {
  title: "Strategic Plan | Otis Library",
  description: "Otis Library's 2025–2030 strategic plan — six goals for the future of Norwich's public library.",
};

export default function StrategicPlanPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/about"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
      >
        <IconArrowLeft size={16} />
        Back to About
      </Link>

      <FadeIn as="h1" className="mt-4 text-3xl text-white">
        Strategic Plan {strategicPlan.years}
      </FadeIn>

      {/* Mission & Vision */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <FadeIn delay={0.1} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">Mission</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{strategicPlan.mission}</p>
        </FadeIn>
        <FadeIn delay={0.15} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">Vision</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{strategicPlan.vision}</p>
        </FadeIn>
      </div>

      {/* Letter */}
      <FadeIn delay={0.2}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">A Message from Our Team</h2>
          <div className="mt-4 space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-6">
            {strategicPlan.letter.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-slate-400">
                {para}
              </p>
            ))}
            <ul className="mt-4 space-y-0.5 border-t border-white/10 pt-4">
              {strategicPlan.team.map((name) => (
                <li key={name} className="text-xs font-medium text-slate-500">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </FadeIn>

      {/* Strategic Goals — animated accordion (client component) */}
      <section className="mt-10">
        <h2 className="text-xl text-brand">Strategic Goals</h2>
        <div className="mt-4">
          <GoalsAccordion goals={strategicGoals} />
        </div>
      </section>

      {/* PDF Downloads */}
      <section className="mt-10">
        <h2 className="text-xl text-brand">Download the Plan</h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {strategicPlan.pdfs.map((pdf) => (
            <li key={pdf.href}>
              <PdfModal href={pdf.href} label={pdf.label}>
                <span className="inline-flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand/50 hover:bg-brand/15">
                  <IconFileText size={15} />
                  {pdf.label}
                </span>
              </PdfModal>
            </li>
          ))}
        </ul>
      </section>

      <Link href="/about" className="mt-10 inline-block text-sm font-semibold text-brand hover:underline">
        ← Back to About
      </Link>
    </div>
  );
}
