"use client";

import { useState } from "react";
import { toast } from "sonner";

const categories = ["Events", "News", "Books and More"] as const;

export default function NewsletterForm() {
  const [selected, setSelected] = useState<Set<string>>(new Set(categories));

  function toggle(cat: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("You're signed up!", {
          description: "Check your inbox for a confirmation email from Otis Library.",
        });
      }}
      className="space-y-6 rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-slate-300">
            First Name <span className="text-brand">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
            placeholder="Jane"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-slate-300">
            Last Name <span className="text-brand">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
            placeholder="Smith"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-300">
          Email Address <span className="text-brand">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
          placeholder="jane@example.com"
        />
      </div>

      <div>
        <label htmlFor="birthday" className="block text-sm font-semibold text-slate-300">
          Birthday{" "}
          <span className="text-xs font-normal text-slate-500">(optional — mm/dd)</span>
        </label>
        <input
          id="birthday"
          name="birthday"
          type="text"
          pattern="\d{2}/\d{2}"
          placeholder="mm/dd"
          className="mt-1.5 w-36 rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
        />
        <p className="mt-1 text-xs text-slate-500">We&apos;ll send you a celebratory message.</p>
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-slate-300">
          I&apos;m interested in:
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => toggle(cat)}
              aria-pressed={selected.has(cat)}
              className={
                selected.has(cat)
                  ? "rounded-full bg-brand px-4 py-2 text-sm font-semibold text-ink shadow"
                  : "rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-brand/50 hover:text-brand"
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={selected.size === 0}
        className="w-full rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-ink shadow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Subscribe
      </button>

      <p className="text-center text-xs text-slate-500">
        You can unsubscribe at any time. We never share your information.
      </p>
    </form>
  );
}
