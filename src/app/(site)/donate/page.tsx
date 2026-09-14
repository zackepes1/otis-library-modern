import type { Metadata } from "next";
import { IconHeartHandshake, IconReceipt2, IconBuildingBank, IconMapPin } from "@tabler/icons-react";
import FadeIn from "@/components/motion/FadeIn";
import DonateForm from "./_components/DonateForm";

export const metadata: Metadata = {
  title: "Donate | Otis Library",
  description:
    "Support Otis Library with a one-time or monthly gift. Free and open to everyone in Norwich, CT.",
};

const trustPoints = [
  { icon: IconMapPin, text: "Every dollar stays right here in Norwich." },
  { icon: IconReceipt2, text: "Gifts are tax-deductible to the extent provided by law." },
  { icon: IconBuildingBank, text: "Many employers match charitable gifts — ask yours." },
];

export default function DonatePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <FadeIn>
        <div className="flex items-center gap-2 text-brand">
          <IconHeartHandshake size={22} stroke={1.75} />
          <p className="text-xs font-semibold uppercase tracking-wide">Support Otis Library</p>
        </div>
        <h1 className="mt-3 text-3xl text-white">Make a gift to Otis Library</h1>
        <p className="mt-3 max-w-xl text-slate-400">
          Otis Library is a free resource for the whole community — and that&rsquo;s only possible thanks
          to donors like you. Every gift, of any size, helps keep our doors open and our programs
          growing.
        </p>
      </FadeIn>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
        {/* Form */}
        <FadeIn delay={0.05}>
          <div className="rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
            <DonateForm />
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Otis Library is a registered 501(c)(3) nonprofit. You will receive an email receipt
            for your records. Recurring gifts can be cancelled at any time by contacting{" "}
            <a href="mailto:ref@otislibrarynorwich.org" className="text-brand hover:underline">
              ref@otislibrarynorwich.org
            </a>
            .
          </p>
        </FadeIn>

        {/* Trust sidebar */}
        <FadeIn delay={0.1}>
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Why give to Otis?</h2>
              <p className="mt-2 text-sm text-slate-400">
                For 175 years, Otis Library has been the heart of Norwich — offering free programs,
                resources, and community space to everyone, regardless of income or background.
              </p>
            </div>

            <ul className="space-y-4">
              {trustPoints.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-slate-300">
                  <Icon size={18} stroke={1.75} className="mt-0.5 shrink-0 text-brand" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-2">
              <p className="text-sm font-semibold text-white">Other ways to give</p>
              <ul className="space-y-1.5 text-sm text-slate-400">
                <li>
                  <a href="/friends" className="text-brand hover:underline">
                    Become a Friend of Otis Library
                  </a>
                </li>
                <li>
                  <a href="/volunteer" className="text-brand hover:underline">
                    Volunteer your time
                  </a>
                </li>
                <li>
                  <a href="mailto:akaiser@otislibrarynorwich.org" className="text-brand hover:underline">
                    Tribute &amp; memorial gifts
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
