import type { Metadata } from "next";
import FadeIn from "@/components/motion/FadeIn";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";

export const metadata: Metadata = {
  title: "Passes to Local Attractions | Otis Library",
  description:
    "Borrow free and discounted passes to Connecticut museums and nature centers with your Otis Library card.",
};

const passes = [
  {
    name: "Niantic Children's Museum",
    admissions: "4 free admissions",
    description: "Interactive museum for ages 1–12 focusing on arts, sciences, safety, health, culture, and history.",
  },
  {
    name: "Connecticut's Old State House",
    admissions: "Up to 4 free admissions",
    description: "Historic Hartford landmark featuring exhibits on the Amistad trial and Connecticut government.",
  },
  {
    name: "Connecticut Science Center",
    admissions: "20% off general admission for 4 people",
    description: "20% off general admission; 10% off annual memberships (in-person purchase only).",
  },
  {
    name: "CT State Parks Centers",
    admissions: "Up to 6 free admissions",
    description: "Covers Dinosaur State Park, Gillette Castle, and Fort Trumbull. 2 adults + 4 children under 12. Excludes camping and events.",
  },
  {
    name: "Custom House Maritime Museum",
    admissions: "Up to 2 adults free",
    description: "Maritime exhibits and tours exploring New London's whaling and submarine history.",
  },
  {
    name: "Denison Pequotsepos Nature Center",
    admissions: "Free admission for up to 5 people",
    description: "Environmental education center with hiking trails and birds of prey.",
  },
  {
    name: "Eric Sloane Museum",
    admissions: "Free for 2 adults, 2 children under 12",
    description: "Features artist works, early American hand tools, and a recreation of the Noah Blake Cabin.",
  },
  {
    name: "Florence Griswold Museum",
    admissions: "Free for 2 adults, 2 children under 12",
    description: "Historic Impressionist artist colony site in Old Lyme, CT.",
  },
  {
    name: "Henry Whitfield State Museum",
    admissions: "Free for 2 adults, 2 children under 12",
    description: "Explores nearly four centuries of local history with a focus on equity and community.",
  },
  {
    name: "Lyman Allyn Art Museum",
    admissions: "Free admission for up to 6 people",
    description: "Includes special exhibitions access and a 10% museum shop discount.",
  },
  {
    name: "Old New-Gate Prison & Copper Mine",
    admissions: "Free for 2 adults, 2 children under 12",
    description: "Historic site featuring America's first chartered copper mine and state prison.",
  },
  {
    name: "Prudence Crandall Museum",
    admissions: "Free for 2 adults, 2 children under 12",
    description: "Focuses on the Canterbury Female Boarding School and the history of educational equity.",
  },
  {
    name: "Slater Memorial Museum",
    admissions: "Free admission",
    description: "Art and history museum on the Norwich Free Academy campus, Norwich, CT.",
  },
  {
    name: "Wadsworth Atheneum",
    admissions: "1 free adult with paid adult, OR 2 free minors with 1 free adult",
    description: "Hartford's internationally renowned art museum.",
  },
];

export default function PassesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn as="h1" className="text-3xl text-white">
        Passes to Local Attractions
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-4 max-w-2xl text-slate-400">
          Explore Connecticut with your Otis Library card. Passes are available to adult
          cardholders on a first-come, first-served basis — no holds. Three-day checkout: pick up
          on day one, use on day two, return by day three. Lost passes are charged replacement
          cost; overdue fines are <span className="text-slate-300">$25/day</span>.
        </p>
      </FadeIn>

      <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2">
        {passes.map((pass) => (
          <StaggerItem key={pass.name}>
            <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="font-semibold text-white">{pass.name}</h2>
              <p className="mt-1 text-xs font-semibold text-brand">{pass.admissions}</p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                {pass.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>

      <FadeIn delay={0.3}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">Reserve a Pass</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-2">
            <p className="text-sm text-slate-400">
              Passes cannot be placed on hold — contact the library for availability and to
              arrange checkout.
            </p>
            <p className="text-sm text-slate-400">261 Main Street, Norwich, CT 06360</p>
            <a
              href="tel:8608892365"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              (860) 889-2365
            </a>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
