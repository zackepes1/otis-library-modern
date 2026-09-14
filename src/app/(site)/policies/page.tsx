import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft, IconFileText } from "@tabler/icons-react";
import {
  fees,
  fineFreeNote,
  libraryCardText,
  loanPeriods,
  policyDocuments,
} from "@/lib/policies-data";
import { PdfModal } from "@/components/ui/PdfModal";

export const metadata: Metadata = {
  title: "Policies | Otis Library",
  description: "Otis Library's borrowing policies, loan periods, fees, and library card information.",
};

export default function PoliciesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/about"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
      >
        <IconArrowLeft size={16} />
        Back to About
      </Link>

      <h1 className="mt-4 text-3xl text-white">Library Policies</h1>

      {/* Fine-free callout */}
      <div className="mt-6 rounded-xl border border-brand/30 bg-brand/10 px-6 py-4">
        <p className="text-sm font-semibold text-brand">{fineFreeNote}</p>
      </div>

      {/* Library Card */}
      <section className="mt-10">
        <h2 className="text-xl text-brand">Your Library Card</h2>
        <div className="mt-3 space-y-3">
          {libraryCardText.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-slate-400">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Loan Periods */}
      <section className="mt-10">
        <h2 className="text-xl text-brand">Loan Periods</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                <th className="px-4 py-3 text-left font-semibold text-slate-300">Item</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-300">Period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loanPeriods.map((row) => (
                <tr key={row.item} className="bg-white/[0.02]">
                  <td className="px-4 py-3 text-slate-400">{row.item}</td>
                  <td className="px-4 py-3 text-right font-medium text-white">{row.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fees */}
      <section className="mt-10">
        <h2 className="text-xl text-brand">Fees</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                <th className="px-4 py-3 text-left font-semibold text-slate-300">Item</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-300">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {fees.map((row) => (
                <tr key={row.item} className="bg-white/[0.02]">
                  <td className="px-4 py-3 text-slate-400">{row.item}</td>
                  <td className="px-4 py-3 text-right font-medium text-white">{row.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Policy Documents */}
      <section className="mt-10">
        <h2 className="text-xl text-brand">Full Policy Documents</h2>
        <ul className="mt-4 space-y-2">
          {policyDocuments.map((doc) => (
            <li key={doc.href}>
              <PdfModal href={doc.href} label={doc.label}>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
                  <IconFileText size={15} />
                  {doc.label}
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
