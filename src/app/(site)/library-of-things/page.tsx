import type { Metadata } from "next";
import FadeIn from "@/components/motion/FadeIn";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";
import ThingsCarousel from "@/components/library-of-things/ThingsCarousel";

export const metadata: Metadata = {
  title: "Library of Things | Otis Library",
  description:
    "Borrow more than books — Otis Library's Library of Things includes tools, games, electronics, and more, free with your library card.",
};

export default function LibraryOfThingsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <FadeIn as="h1" className="text-3xl text-white">
        Library of Things
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-4 max-w-2xl text-slate-400">
          At Otis Library, you can borrow more than books. Our Library of Things collection gives
          cardholders access to tools, games, electronics, and more — free with your library card.
          Items are first-come, first-served and cannot be placed on hold. A signed waiver and
          review of the Library of Things Policy are required at checkout.
        </p>
      </FadeIn>

      {/* Carousel + category filters */}
      <FadeIn delay={0.1}>
        <section className="mt-12">
          <ThingsCarousel />
        </section>
      </FadeIn>

      {/* Traveling Toys */}
      <FadeIn delay={0.15}>
        <section className="mt-14">
          <h2 className="text-xl text-brand">Traveling Toys</h2>
          <p className="mt-2 text-sm text-slate-400">
            In partnership with Traveling Toys, Inc., we offer additional board games and toys for
            checkout, including:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Ticket to Ride", "Bop It!", "Happy Little Dinosaurs", "Baby Projector Night Light"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-slate-300"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </section>
      </FadeIn>

      {/* In-Library Use Only */}
      <FadeIn delay={0.2}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">In-Library Use Only</h2>
          <p className="mt-2 text-sm text-slate-400">
            These items are available inside the library and cannot be checked out.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Bike Locks", "Chromebooks", "Nintendo Switch"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-sm text-amber-300"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Special Collections */}
      <FadeIn delay={0.25}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">Special Collections</h2>
          <StaggerGrid className="mt-4 grid gap-4 sm:grid-cols-2">
            <StaggerItem>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-semibold text-white">Early Human Skull Replicas</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Five high-quality replicas available for educators at public and private
                  institutions — for instructional purposes only.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <h3 className="font-semibold text-white">Museum Passes</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Free passes to Connecticut&apos;s Old State House, Custom House Maritime Museum,
                  and more.{" "}
                  <a href="/passes" className="text-brand hover:underline">
                    View all museum passes →
                  </a>
                </p>
              </div>
            </StaggerItem>
          </StaggerGrid>
        </section>
      </FadeIn>

      {/* Contact */}
      <FadeIn delay={0.3}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">Questions?</h2>
          <div className="mt-4 space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-slate-400">Ask at the front desk or contact us directly.</p>
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
