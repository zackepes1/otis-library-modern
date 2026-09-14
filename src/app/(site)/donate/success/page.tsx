import type { Metadata } from "next";
import Link from "next/link";
import { IconHeartHandshake, IconCheck } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Thank You | Otis Library",
  description: "Thank you for your gift to Otis Library.",
};

export default function DonateSuccessPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <div className="flex justify-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand/20">
          <IconHeartHandshake size={36} className="text-brand" />
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
            <IconCheck size={14} stroke={3} className="text-white" />
          </span>
        </div>
      </div>

      <h1 className="mt-6 text-3xl text-white">Thank you!</h1>
      <p className="mt-3 text-slate-400">
        Your gift to Otis Library helps keep our doors open and our programs growing for everyone in
        Norwich. A receipt has been sent to your email address.
      </p>

      <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5 text-left text-sm text-slate-400">
        <p className="font-semibold text-white">Recurring gift?</p>
        <p className="mt-1">
          Your monthly gift will be charged automatically each month. To cancel or make changes,
          email{" "}
          <a href="mailto:ref@otislibrarynorwich.org" className="text-brand hover:underline">
            ref@otislibrarynorwich.org
          </a>
          .
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="rounded-md bg-brand px-6 py-3 text-sm font-semibold text-ink hover:brightness-110"
        >
          Back to Home
        </Link>
        <Link
          href="/events"
          className="rounded-md border border-white/10 px-6 py-3 text-sm font-medium text-slate-200 hover:bg-white/10"
        >
          Explore Events
        </Link>
      </div>
    </div>
  );
}
