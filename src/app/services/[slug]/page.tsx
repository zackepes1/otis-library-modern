import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IconArrowLeft, IconExternalLink, IconCalendar, IconPhone, IconMail } from "@tabler/icons-react";
import { getService, services } from "@/lib/services-data";
import FadeIn from "@/components/motion/FadeIn";
import AppointmentBooker from "@/components/appointments/AppointmentBooker";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Otis Library`,
    description: service.tagline,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { contact } = service;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
      >
        <IconArrowLeft size={16} />
        Back to Services
      </Link>

      <FadeIn as="h1" className="mt-4 text-3xl text-white">
        {service.title}
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-4 text-slate-400">{service.intro}</p>
      </FadeIn>

      {/* Deprecation / important notice */}
      {service.notice && (
        <FadeIn delay={0.1}>
          <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 px-6 py-4">
            <p className="text-sm text-amber-300">{service.notice}</p>
            {service.alternativeHref && (
              <a
                href={service.alternativeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
              >
                {service.alternativeLabel ?? service.alternativeHref} ↗
              </a>
            )}
          </div>
        </FadeIn>
      )}

      {/* Steps */}
      {service.steps && (
        <FadeIn delay={0.1}>
          <section className="mt-10">
            <h2 className="text-xl text-brand">How It Works</h2>
            <ol className="mt-4 space-y-3">
              {service.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-400">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-xs font-bold text-brand">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>
        </FadeIn>
      )}

      {/* Requirements */}
      {service.requirements && (
        <FadeIn delay={0.15}>
          <section className="mt-10">
            <h2 className="text-xl text-brand">Requirements</h2>
            <ul className="mt-4 space-y-2">
              {service.requirements.map((req) => (
                <li key={req} className="flex gap-2 text-sm text-slate-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {req}
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>
      )}

      {/* Resources */}
      {service.resources && (
        <FadeIn delay={0.15}>
          <section className="mt-10">
            <h2 className="text-xl text-brand">What We Offer</h2>
            <div className="mt-4 space-y-3">
              {service.resources.map((res) => (
                <div key={res.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  {res.href ? (
                    <a
                      href={res.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
                    >
                      {res.label}
                      <IconExternalLink size={13} />
                    </a>
                  ) : (
                    <p className="font-semibold text-white">{res.label}</p>
                  )}
                  {res.description && (
                    <p className="mt-1 text-sm text-slate-400">{res.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Meeting Rooms table */}
      {service.rooms && (
        <FadeIn delay={0.15}>
          <section className="mt-10">
            <h2 className="text-xl text-brand">Available Spaces</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.04]">
                    <th className="px-4 py-3 text-left font-semibold text-slate-300">Room</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-300">Capacity</th>
                    <th className="hidden px-4 py-3 text-left font-semibold text-slate-300 sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {service.rooms.map((room) => (
                    <tr key={room.room} className="bg-white/[0.02]">
                      <td className="px-4 py-3 font-medium text-white">{room.room}</td>
                      <td className="px-4 py-3 text-slate-400">{room.capacity}</td>
                      <td className="hidden px-4 py-3 text-slate-400 sm:table-cell">{room.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </FadeIn>
      )}

      {/* Topics (appointment topics or photo pricing) */}
      {service.topics && (
        <FadeIn delay={0.15}>
          <section className="mt-10">
            <h2 className="text-xl text-brand">
              {service.slug === "passports" ? "Photo Details" : service.slug === "employment-resources" ? "Appointment Topics" : "Topics Covered"}
            </h2>
            <ul className="mt-4 space-y-2">
              {service.topics.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-slate-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>
      )}

      {/* Features (text notifications) */}
      {service.features && (
        <FadeIn delay={0.15}>
          <section className="mt-10">
            <h2 className="text-xl text-brand">What You&apos;ll Get</h2>
            <ul className="mt-4 space-y-2">
              {service.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-slate-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {f}
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>
      )}

      {/* Prep tips */}
      {service.prepTips && (
        <FadeIn delay={0.2}>
          <section className="mt-10">
            <h2 className="text-xl text-brand">Before Your Appointment</h2>
            <ul className="mt-4 space-y-2">
              {service.prepTips.map((tip) => (
                <li key={tip} className="flex gap-2 text-sm text-slate-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>
      )}

      {/* Cannot do */}
      {service.cannotDo && (
        <FadeIn delay={0.2}>
          <section className="mt-10">
            <h2 className="text-xl text-brand">We Cannot Notarize</h2>
            <ul className="mt-4 space-y-2">
              {service.cannotDo.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate-400">
                  <span className="mt-1.5 text-slate-500">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>
      )}

      {/* Limitations */}
      {service.limitations && (
        <FadeIn delay={0.2}>
          <section className="mt-10">
            <h2 className="text-xl text-brand">Please Note</h2>
            <ul className="mt-4 space-y-2">
              {service.limitations.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate-400">
                  <span className="mt-1.5 text-slate-500">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>
      )}

      {/* Contact / booking card */}
      <FadeIn delay={0.25}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">Get Started</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
            {contact.staff && (
              <p className="text-sm font-semibold text-white">{contact.staff}</p>
            )}
            {contact.note && (
              <p className="text-sm text-slate-400">{contact.note}</p>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/\D/g, "")}${contact.phoneExt ? `,${contact.phoneExt}` : ""}`}
                className="flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
              >
                <IconPhone size={15} />
                {contact.phone}
                {contact.phoneExt && ` ext. ${contact.phoneExt}`}
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
              >
                <IconMail size={15} />
                {contact.email}
              </a>
            )}
            {contact.bookingHref && !contact.embedBooking && (
              <a
                href={contact.bookingHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand/50 hover:bg-brand/15"
              >
                <IconCalendar size={15} />
                {contact.bookingLabel ?? "Book online"} ↗
              </a>
            )}
          </div>
        </section>
      </FadeIn>

      {/* Embedded appointment booking */}
      {contact.embedBooking && contact.bookingHref && (
        <FadeIn delay={0.3}>
          <section className="mt-10">
            <h2 className="text-xl text-brand">Book an Appointment</h2>
            <p className="mt-1 mb-5 text-sm text-slate-400">
              Select a date and time — we&apos;ll confirm by email.
            </p>
            <AppointmentBooker libcalUrl={contact.bookingHref} />
          </section>
        </FadeIn>
      )}

      <Link href="/services" className="mt-10 inline-block text-sm font-semibold text-brand hover:underline">
        ← Back to Services
      </Link>
    </div>
  );
}
