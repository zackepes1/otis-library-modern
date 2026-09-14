"use client";

// JobOpeningsTable — an original data-table component styled after the
// clean, card-shell "list/table" patterns common on 21st.dev (rounded
// container, sticky/subtle header row, hover-highlighted rows, pill-style
// badges for job type). 21st.dev's own table/list listings require a paid
// API key to install (confirmed via `npx shadcn add`), so this is a
// from-scratch re-implementation of that visual style built with this
// project's existing Tailwind conventions — not a copy of any gated
// component's source. All data rendered comes from the real Otis Library
// job-openings page.
import { IconBriefcase, IconMailFilled } from "@tabler/icons-react";
import type { JobOpening } from "@/lib/job-openings";

const typeStyles: Record<JobOpening["type"], string> = {
  "Full-time": "bg-brand/15 text-brand",
  "Part-time": "bg-amber-400/15 text-amber-300",
  Seasonal: "bg-emerald-400/15 text-emerald-300",
  "Per Diem": "bg-violet-400/15 text-violet-300",
};

export function JobOpeningsTable({ openings }: { openings: JobOpening[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wide text-slate-500">
            <th className="px-5 py-3 font-semibold">Position</th>
            <th className="px-5 py-3 font-semibold">Department</th>
            <th className="px-5 py-3 font-semibold">Type</th>
            <th className="px-5 py-3 font-semibold">Posted</th>
            <th className="px-5 py-3 font-semibold text-right">Apply</th>
          </tr>
        </thead>
        <tbody>
          {openings.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-12">
                <div className="flex flex-col items-center gap-3 text-center">
                  <span className="flex size-12 items-center justify-center rounded-full bg-white/[0.06] text-slate-400">
                    <IconBriefcase size={24} stroke={1.5} />
                  </span>
                  <p className="font-semibold text-white">No open positions at this time</p>
                  <p className="max-w-sm text-sm text-slate-400">
                    Thank you for your interest in employment with Otis Library! We currently do
                    not have any vacant positions, but new openings are posted here as soon as
                    they&apos;re available.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            openings.map((job) => (
              <tr
                key={job.title}
                className="border-b border-white/5 transition last:border-b-0 hover:bg-white/[0.04]"
              >
                <td className="px-5 py-4 font-semibold text-white">{job.title}</td>
                <td className="px-5 py-4 text-slate-400">{job.department}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${typeStyles[job.type]}`}
                  >
                    {job.type}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-400">{job.posted}</td>
                <td className="px-5 py-4 text-right">
                  <a
                    href={job.applyHref}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-ink transition hover:brightness-110"
                  >
                    <IconMailFilled size={14} />
                    Apply
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
