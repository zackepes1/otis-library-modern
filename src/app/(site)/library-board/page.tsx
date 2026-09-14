import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft, IconFileText } from "@tabler/icons-react";
import { boardTerm, boardContact, boardDocuments, officers, trustees } from "@/lib/library-board";
import { PdfModal } from "@/components/ui/PdfModal";

export const metadata: Metadata = {
  title: "Library Board | Otis Library",
  description: "Meet the Otis Library Board of Trustees — officers, members, and meeting documents.",
};

export default function LibraryBoardPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/about"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
      >
        <IconArrowLeft size={16} />
        Back to About
      </Link>

      <h1 className="mt-4 text-3xl text-white">Board of Trustees</h1>
      <p className="mt-2 text-sm font-semibold text-slate-500 uppercase tracking-wide">
        Term: {boardTerm}
      </p>

      {/* Officers */}
      <section className="mt-10">
        <h2 className="text-xl text-brand">Officers</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {officers.map((person) => (
            <div
              key={person.name}
              className="rounded-xl border border-brand/20 bg-gradient-to-br from-brand/5 to-brand-deep/10 p-5"
            >
              <p className="font-semibold text-white">{person.name}</p>
              <p className="mt-0.5 text-sm font-medium text-brand">{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Full Trustees */}
      <section className="mt-10">
        <h2 className="text-xl text-brand">All Trustees</h2>
        <div className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.03]">
          {trustees.map((person) => (
            <div key={person.name + (person.org ?? "")} className="flex items-center justify-between gap-4 px-5 py-3">
              <p className="text-sm text-white">{person.name}</p>
              {person.org && (
                <span className="shrink-0 rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] font-medium text-slate-400">
                  {person.org}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Board Documents */}
      {boardDocuments.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl text-brand">Meeting Documents</h2>
          <ul className="mt-4 space-y-2">
            {boardDocuments.map((doc) => (
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
      )}

      {/* Contact */}
      <p className="mt-10 text-sm text-slate-400">{boardContact}</p>
    </div>
  );
}
