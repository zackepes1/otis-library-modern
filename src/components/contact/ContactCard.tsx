"use client";

// Contact Card — an original component inspired by the "info + inquiry
// form in one stylish block" idea (the 21st.dev "contact-card" listing
// requires a paid API key to install and its license is unlisted, so this
// is a from-scratch re-implementation of the concept, not a copy of that
// component's source). Left side shows the library's real contact details;
// right side is a working form posted to /api/contact.
import { useState } from "react";
import { toast } from "sonner";
import {
  IconMail,
  IconMapPin,
  IconPhone,
  IconLoader2,
  IconCircleCheck,
} from "@tabler/icons-react";
import { useSiteInfo } from "@/components/providers/SiteInfoProvider";
import { CONTACT_DEPARTMENTS } from "@/app/api/contact/route";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactCard() {
  const { address, phone, email } = useSiteInfo();
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFieldErrors({});
    setFormError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name")?.toString() ?? "",
      email: form.get("email")?.toString() ?? "",
      phone: form.get("phone")?.toString() ?? "",
      department: form.get("department")?.toString() ?? "",
      message: form.get("message")?.toString() ?? "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setFieldErrors(data.errors ?? {});
        setFormError(data.error ?? (data.errors ? "Please fix the highlighted fields." : "Something went wrong."));
        setStatus("error");
        toast.error("Couldn't send your message.", { description: "Please review the form and try again." });
        return;
      }

      setStatus("success");
      event.currentTarget.reset();
      toast.success("Message sent!", { description: "We'll be in touch as soon as we can." });
    } catch {
      setFormError("Couldn't send your message right now. Please try again, or email us directly.");
      setStatus("error");
      toast.error("Couldn't send your message.", { description: "Please try again or email us directly." });
    }
  }

  return (
    <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:grid-cols-2">
      {/* Info side */}
      <div className="flex flex-col justify-center gap-6 bg-gradient-to-br from-brand-deep/40 to-transparent p-8 sm:p-12">
        <div>
          <h2 className="text-xl text-white">Get in Touch</h2>
          <p className="mt-2 text-sm text-slate-400">
            Have a question, feedback, or a request for help? Send us a message and the right department
            will follow up.
          </p>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <IconMapPin size={20} stroke={1.75} className="mt-0.5 shrink-0 text-brand" />
            <span className="text-slate-300">{address}</span>
          </div>
          <div className="flex items-start gap-3">
            <IconPhone size={20} stroke={1.75} className="mt-0.5 shrink-0 text-brand" />
            <a href={`tel:${phone.replace(/[^\d]/g, "")}`} className="text-slate-300 hover:text-brand">
              {phone}
            </a>
          </div>
          <div className="flex items-start gap-3">
            <IconMail size={20} stroke={1.75} className="mt-0.5 shrink-0 text-brand" />
            <a href={`mailto:${email}`} className="text-slate-300 hover:text-brand">
              {email}
            </a>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="p-8 sm:p-12">
        {status === "success" ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <IconCircleCheck size={40} stroke={1.5} className="text-emerald-400" />
            <p className="font-semibold text-white">Message sent!</p>
            <p className="text-sm text-slate-400">
              Thanks for reaching out — we&apos;ll get back to you as soon as we can.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 text-sm font-semibold text-brand hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-semibold text-slate-300">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1.5 w-full rounded-md border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand focus:outline-none"
                  placeholder="Jane Doe"
                />
                {fieldErrors.name && <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-slate-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1.5 w-full rounded-md border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand focus:outline-none"
                  placeholder="jane@example.com"
                />
                {fieldErrors.email && <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="text-sm font-semibold text-slate-300">
                  Phone <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="mt-1.5 w-full rounded-md border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand focus:outline-none"
                  placeholder="(860) 555-0100"
                />
              </div>
              <div>
                <label htmlFor="department" className="text-sm font-semibold text-slate-300">
                  Who would you like to reach?
                </label>
                <select
                  id="department"
                  name="department"
                  required
                  defaultValue=""
                  className="mt-1.5 w-full rounded-md border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-white focus:border-brand focus:outline-none"
                >
                  <option value="" disabled>
                    Choose one…
                  </option>
                  {CONTACT_DEPARTMENTS.map((d) => (
                    <option key={d} value={d} className="bg-ink">
                      {d}
                    </option>
                  ))}
                </select>
                {fieldErrors.department && <p className="mt-1 text-xs text-red-400">{fieldErrors.department}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-semibold text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="mt-1.5 w-full rounded-md border border-white/15 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand focus:outline-none"
                placeholder="How can we help?"
              />
              {fieldErrors.message && <p className="mt-1 text-xs text-red-400">{fieldErrors.message}</p>}
            </div>

            {formError && <p className="text-sm text-red-400">{formError}</p>}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-ink shadow transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "submitting" && <IconLoader2 size={16} className="animate-spin" />}
              {status === "submitting" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
