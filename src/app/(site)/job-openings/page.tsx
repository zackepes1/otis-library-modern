import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { JobOpeningsTable } from "@/components/ui/job-openings-table";
import { jobOpeningsInfo, openings } from "@/lib/job-openings";

export const metadata: Metadata = {
  title: "Job Openings | Otis Library",
  description: "Current employment opportunities at Otis Library in Norwich, CT.",
};

export default function JobOpeningsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/about"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
      >
        <IconArrowLeft size={16} />
        Back to About
      </Link>

      <h1 className="mt-4 text-3xl text-white">Job Openings</h1>
      <p className="mt-4 text-slate-400">{jobOpeningsInfo.intro}</p>

      <div className="mt-8">
        <JobOpeningsTable openings={openings} />
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-lg font-semibold text-white">Stay in the loop</h2>
        <p className="mt-2 text-sm text-slate-400">{jobOpeningsInfo.note}</p>
        <a
          href={`mailto:${jobOpeningsInfo.contactEmail}`}
          className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
        >
          {jobOpeningsInfo.contactEmail} ↗
        </a>
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Looking for job-hunting help instead? Otis Library offers free{" "}
        <a
          href="/services/employment-resources"
          className="text-brand hover:underline"
        >
          one-on-one job support appointments
        </a>{" "}
        for resumes, applications, and interview prep.
      </p>
    </div>
  );
}
