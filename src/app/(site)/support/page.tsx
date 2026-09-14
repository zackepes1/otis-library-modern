import type { Metadata } from "next";
import { IconArrowUpRight, IconMail, IconPhone } from "@tabler/icons-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";

export const metadata: Metadata = {
  title: "Support Otis Library",
  description:
    "There are many ways to make an impact at Otis Library — from annual giving and named funds to special events, in-kind donations, and legacy gifts.",
};

const givingWays = [
  {
    title: "Annual Fund",
    description:
      "General contributions supporting collections, programming, exhibits, technology, and facility upgrades for the whole community.",
    href: "/donate",
    linkLabel: "Give today",
  },
  {
    title: "Lottie B. Scott Society",
    description:
      "Monthly recurring gifts with tiered impact levels ($10–$50/month). Recurring donors make up the backbone of sustainable library funding.",
    href: "/donate",
    linkLabel: "Become a monthly donor",
  },
  {
    title: "Evening with an Author",
    description:
      "Otis Library's signature spring fundraising event featuring notable authors. Ticket proceeds support the library directly.",
    href: "/events/evening-with-an-author",
    linkLabel: "Learn about the event",
  },
  {
    title: "O'tis a Festival",
    description:
      "A holiday-season community marketplace held the Saturday before Thanksgiving. Vendor and sponsorship opportunities available.",
    href: "/events/otis-festival",
    linkLabel: "Learn about the festival",
  },
  {
    title: "Gift-in-Kind Donations",
    description:
      "Material donations for collections are accepted — up to 2 bags per visit. Larger donations by appointment. Call Andrea at ext. 127.",
  },
  {
    title: "Named Funds",
    description:
      "Donor-designated funds support specific areas of the library. Minimum $2,500; endowed funds require $20,000.",
  },
  {
    title: "Bequests",
    description:
      "Leave a lasting legacy through a gift in your will. Our development team can work with you and your attorney to structure a bequest.",
  },
  {
    title: "Memorial Gifts",
    description:
      "Honor a loved one with a donation in their memory. The library will acknowledge the gift to the family you designate.",
  },
  {
    title: "Otis Library Tribute Program",
    description:
      "Recognition gifts of $35 or more receive a personalized bookplate placed in a library book in honor of the named individual.",
  },
];

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn as="h1" className="text-3xl text-white">
        Support Otis Library
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-4 max-w-2xl text-slate-400">
          There are many ways to make an impact at your Library. Otis Library is a 501(c)(3)
          nonprofit organization — all contributions directly support collections, programming,
          exhibits, technology, and facility upgrades for the entire Norwich community.
        </p>
      </FadeIn>

      <section className="mt-12">
        <FadeIn>
          <h2 className="text-xl text-brand">Ways to Give</h2>
        </FadeIn>
        <StaggerGrid className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {givingWays.map((way) => (
            <StaggerItem key={way.title}>
              <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-semibold text-white">{way.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {way.description}
                </p>
                {way.href && way.linkLabel && (
                  <a
                    href={way.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
                  >
                    {way.linkLabel}
                    <IconArrowUpRight size={13} />
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Donor Spotlight */}
      <FadeIn delay={0.2}>
        <section id="donor-spotlight" className="mt-14 scroll-mt-28">
          <h2 className="text-xl text-brand">Donor Spotlight</h2>
          <p className="mt-2 text-sm text-slate-400">
            The people behind Otis Library&apos;s community of support.
          </p>

          {/* Featured donor */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:grid md:grid-cols-[300px_1fr]">
            {/* eslint-disable-next-line @next/next/no-img-element -- WordPress CDN asset */}
            <img
              src="https://otislibrarynorwich.org/wp-content/uploads/2026/05/Carol-Lahan-768x643.png"
              alt="Carol Lahan"
              className="h-64 w-full object-cover object-top md:h-full"
            />
            <div className="relative p-7 sm:p-9">
              <svg
                aria-hidden="true"
                className="absolute right-6 top-5 h-20 w-20 text-white/[0.04]"
                viewBox="0 0 100 100"
                fill="currentColor"
              >
                <path d="M0 50C0 22.4 22.4 0 50 0s50 22.4 50 50-22.4 50-50 50S0 77.6 0 50zm29.4-8.8h-8.8C22 22.4 32.6 12 44.2 12v8.8c-8 0-14.8 6.8-14.8 20.4zm38.2 0h-8.8C60.2 22.4 70.8 12 82.4 12v8.8c-8 0-14.8 6.8-14.8 20.4z" />
              </svg>
              <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                50+ years with Otis Library
              </span>
              <h3 className="mt-4 text-xl font-semibold text-white">Carol Lahan</h3>
              <p className="mt-3 leading-relaxed text-slate-400">
                Carol&apos;s connection to Otis Library spans more than five decades. She has
                served as a volunteer, Friend, Friends President, Trustee, and EWA Steering
                Committee member. A retired mental health professional with 38 years of
                experience, Carol now hosts&nbsp;&ldquo;Mental Health Mondays&rdquo; at the
                library — bringing her expertise back to the community she has supported for
                a lifetime.
              </p>
            </div>
          </div>

          {/* Spotlight grid */}
          <StaggerGrid className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Marianne Juber",
                badge: "40+ years",
                detail:
                  "A visitor for over 40 years and former teacher who brought her students to the library throughout her career — and now brings her grandchildren.",
                imageUrl:
                  "https://otislibrarynorwich.org/wp-content/uploads/2024/01/Marianne_Juber_Closeup.jpeg",
              },
              {
                name: "Rows City Knitters",
                badge: "10-year knit-iversary",
                detail:
                  "A Friday morning “sit & knit” group that has gathered at Otis Library for over 10 years — proving that community grows stitch by stitch.",
                imageUrl:
                  "https://otislibrarynorwich.org/wp-content/uploads/2024/01/knitters_closeup.jpg",
              },
              {
                name: "Attorney Bart Sayet & Lori Lindfors",
                badge: "A book a day",
                detail:
                  "Childhood connections to the library that have stayed into adulthood. Lori reads approximately one book per day on vacation; Bart famously read while driving.",
                imageUrl:
                  "https://otislibrarynorwich.org/wp-content/uploads/elementor/thumbs/bartandlori_Closeup-qhtgdashmrh5m3f23mojkkpkgrjqbzg6tz5ouwtd6o.jpg",
              },
              {
                name: "Norwich Bookies",
                badge: "235+ books read",
                detail:
                  "A monthly book club that has read more than 235 books together — supporting each other through life's milestones one chapter at a time.",
                imageUrl:
                  "https://otislibrarynorwich.org/wp-content/uploads/elementor/thumbs/norwich-bookies-qhuunco29laplkvq30lax1dnctf2zs8j1j4pisegow.jpg",
              },
              {
                name: "George Grossomanides",
                badge: "10+ years",
                detail:
                  "A library advocate for over a decade and active member of AHEPA, the Greek American organization promoting education and community service.",
                imageUrl:
                  "https://otislibrarynorwich.org/wp-content/uploads/2024/08/GeorgeClose.jpg",
              },
              {
                name: "Susan Grosdov",
                badge: "Born in Norwich",
                detail:
                  "A Norwich native who spent 35+ years at Harvard Medical School working on health policy — and returns to Otis Library with deep nostalgia and affection.",
                imageUrl:
                  "https://otislibrarynorwich.org/wp-content/uploads/2025/02/SGrosdov.jpg",
              },
            ].map((donor) => (
              <StaggerItem key={donor.name}>
                <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- WordPress CDN asset */}
                  <img
                    src={donor.imageUrl}
                    alt={donor.name}
                    className="aspect-[4/3] w-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <span className="self-start rounded-full border border-brand/20 bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand">
                      {donor.badge}
                    </span>
                    <h3 className="mt-3 font-semibold text-white">{donor.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                      {donor.detail}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
      </FadeIn>

      {/* Contact */}
      <FadeIn delay={0.35}>
        <section className="mt-12">
          <h2 className="text-xl text-brand">Get in Touch</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
            <p className="text-sm font-semibold text-white">Andrea Kaiser</p>
            <p className="text-sm text-slate-400">Director of Development</p>
            <a
              href="mailto:akaiser@otislibrarynorwich.org"
              className="flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              <IconMail size={15} />
              akaiser@otislibrarynorwich.org
            </a>
            <a
              href="tel:8608892365"
              className="flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              <IconPhone size={15} />
              (860) 889-2365 ext. 127
            </a>
            <a
              href="/donate"
              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand/50 hover:bg-brand/15"
            >
              Donate Online
              <IconArrowUpRight size={14} />
            </a>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
