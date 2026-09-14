import type { Metadata } from "next";
import Link from "next/link";
import { FaqTabs } from "@/components/ui/faq-tabs";
import { faqCategories } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "FAQ | Otis Library",
  description: "Frequently asked questions about Otis Library's fees, services, programs, and how to get involved.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl text-white">Frequently Asked Questions</h1>
      <p className="mt-4 text-slate-400">
        Answers to the questions we hear most often. If yours isn&apos;t covered here, call our main number at{" "}
        <a href="tel:8608892365" className="text-brand hover:underline">
          (860) 889-2365
        </a>
        .
      </p>

      <div className="mt-10">
        <FaqTabs categories={faqCategories} />
      </div>

      <Link href="/about" className="mt-10 inline-block text-sm font-semibold text-brand hover:underline">
        ← Back to About
      </Link>
    </div>
  );
}
