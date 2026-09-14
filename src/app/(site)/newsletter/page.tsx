import type { Metadata } from "next";
import FadeIn from "@/components/motion/FadeIn";
import NewsletterForm from "@/components/newsletter/NewsletterForm";

export const metadata: Metadata = {
  title: "Newsletter Sign-Up | Otis Library",
  description:
    "Stay connected with Otis Library. Subscribe to our newsletter for events, news, and new book highlights — in English and Spanish.",
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <FadeIn as="h1" className="text-3xl text-white">
        Newsletter Sign-Up
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-4 text-slate-400">
          Stay connected with what&apos;s happening at Otis Library. Choose the topics you care
          about and we&apos;ll keep you in the loop — available in English and Spanish.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-10">
          <NewsletterForm />
        </div>
      </FadeIn>

    </div>
  );
}
