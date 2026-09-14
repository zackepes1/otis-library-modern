import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services-data";
import FadeIn from "@/components/motion/FadeIn";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";

export const metadata: Metadata = {
  title: "Services | Otis Library",
  description: "Free library services available to Norwich and surrounding communities — pickup, notary, tech help, home delivery, and more.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <FadeIn as="h1" className="text-3xl text-white">
        Library Services
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="mt-4 max-w-2xl text-slate-400">
          All Otis Library services are free to cardholders. Don&apos;t have a card yet?{" "}
          <Link href="/about#library-card" className="text-brand hover:underline">
            Get one free
          </Link>{" "}
          with proof of Norwich residency.
        </p>
      </FadeIn>

      <StaggerGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <StaggerItem key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="group block h-full rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <h2 className="font-semibold text-brand group-hover:text-blue-300">
                {service.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{service.tagline}</p>
            </Link>
          </StaggerItem>
        ))}

        {/* Print From Anywhere — external service, kept separate */}
        <StaggerItem>
          <a
            href="https://print.princh.com/?pid=107474"
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.06]"
          >
            <h2 className="font-semibold text-brand group-hover:text-blue-300">
              Print From Anywhere
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Send documents to the library printer from any device using Princh — pick up your printout at the library.
            </p>
          </a>
        </StaggerItem>
      </StaggerGrid>
    </div>
  );
}
