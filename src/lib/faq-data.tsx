import type { ReactNode } from "react";
import Link from "next/link";

export interface FaqItem {
  question: string;
  answer: ReactNode;
}

export interface FaqCategory {
  label: string;
  items: FaqItem[];
}

// Real Otis Library FAQ content, reorganized from a single long list
// (otislibrarynorwich.org/faq/) into topic categories for the tabbed UI.
export const faqCategories: FaqCategory[] = [
  {
    label: "Fees & Services",
    items: [
      {
        question: "Is the Library fine free?",
        answer: (
          <>
            Yes! Otis Library went fine free in 2022.
          </>
        ),
      },
      {
        question: "Do you offer faxing, printing, copying, and laminating services?",
        answer: (
          <>
            <p>Yes! The Library offers the following services, at no or little cost:</p>
            <p className="mt-3 font-semibold text-slate-200">Faxing: Free</p>
            <p className="mt-3 font-semibold text-slate-200">Printing &amp; Copying</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-5">
              <li>Black &amp; White, single side: $0.25</li>
              <li>Black &amp; White, double side: $0.40</li>
              <li>Color, single side: $0.75</li>
              <li>Color, double side: $1.00</li>
              <li>11×17 Black &amp; White, single side: $0.40</li>
              <li>11×17 Black &amp; White, double side: $0.60</li>
              <li>11×17 Color, single side: $1.00</li>
              <li>11×17 Color, double side: $1.50</li>
            </ul>
            <p className="mt-3 font-semibold text-slate-200">Envelopes</p>
            <p className="mt-1">Manila, business, and catalog: $0.50</p>
            <p className="mt-3 font-semibold text-slate-200">Laminating</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-5">
              <li>8½ × 11 sheet: $1.00</li>
              <li>11 × 17 sheet: $2.00</li>
            </ul>
          </>
        ),
      },
      {
        question: "Is there a notary public at the library?",
        answer: (
          <>
            Yes! You can find more information on our{" "}
            <a href="/services/notary" className="text-brand hover:underline">
              Notary Public
            </a>{" "}
            page.
          </>
        ),
      },
    ],
  },
  {
    label: "Programs & Spaces",
    items: [
      {
        question: "Are you offering onsite one-on-one technology instruction?",
        answer: (
          <>
            We are currently offering in-person technology instruction. You can schedule an appointment{" "}
            <Link href="/services/one-on-one-technology-help" className="text-brand hover:underline">
              online
            </Link>{" "}
            or by calling us at (860) 889-2365 ext. 108, and we can schedule a time for an appointment.
          </>
        ),
      },
      {
        question: "Do you offer English classes?",
        answer: "Yes! For the current schedule and to register, please contact the Literacy Office at (860) 886-9096.",
      },
      {
        question: "May I reserve one of your meeting spaces?",
        answer: (
          <>
            Meeting room spaces and study rooms are available to nonprofits and individuals. Please visit our{" "}
            <a href="/services/meeting-spaces" className="text-brand hover:underline">
              Meeting Spaces
            </a>{" "}
            page for more details.
          </>
        ),
      },
    ],
  },
  {
    label: "Getting Involved",
    items: [
      {
        question: "How can I support Otis Library?",
        answer: (
          <>
            Otis Library accepts monetary donations, gifts-in-kind, book donations, and{" "}
            <a href="/donate" className="text-brand hover:underline">
              more
            </a>
            . We greatly appreciate any support you can provide. Please contact Andrea Kaiser, Director of
            Development, for more information:{" "}
            <a href="mailto:akaiser@otislibrarynorwich.org" className="text-brand hover:underline">
              akaiser@otislibrarynorwich.org
            </a>
            .
          </>
        ),
      },
    ],
  },
];
