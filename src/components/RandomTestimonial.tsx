"use client";

import React from "react";
import Link from "next/link";
import { client } from "@/sanity/client";

type Testimonial = { _id: string; quote: string; author: string };

export default function RandomTestimonial({ variant = "card" }: { variant?: "card" | "large" }) {
  const [review, setReview] = React.useState<Testimonial | null>(null);

  React.useEffect(() => {
    client
      .fetch<Testimonial[]>(`*[_type == "testimonial"] | order(order asc) { _id, quote, author }`)
      .then((data) => {
        if (data.length > 0) setReview(data[Math.floor(Math.random() * data.length)]);
      });
  }, []);

  if (!review) return null;

  if (variant === "large") {
    return (
      <div className="rounded-2xl border border-white/10 border-l-4 border-l-brand bg-white/[0.02] p-8 text-center sm:p-10">
        <blockquote className="text-xl leading-relaxed text-white sm:text-2xl">
          &ldquo;{review.quote}&rdquo;
        </blockquote>
        <p className="mt-4 text-sm font-semibold text-slate-400">— {review.author}</p>
        <Link
          href="/about#reviews"
          className="mt-6 inline-block text-sm font-semibold text-brand hover:underline"
        >
          Read more reviews →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <blockquote className="rounded-xl border border-white/10 border-l-4 border-l-brand bg-white/[0.03] p-4 text-sm text-slate-300">
        &ldquo;{review.quote}&rdquo;
        <footer className="mt-2 text-xs font-semibold text-slate-500">
          — {review.author}
        </footer>
      </blockquote>
      <Link
        href="/about#reviews"
        className="mt-3 inline-block text-sm font-semibold text-brand hover:underline"
      >
        Read more reviews →
      </Link>
    </div>
  );
}
