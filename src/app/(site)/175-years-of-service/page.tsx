import type { Metadata } from "next";
import Link from "next/link";
import { Timeline } from "@/components/ui/timeline";
import FadeIn from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "175 Years of Service | Otis Library",
  description:
    "Celebrating 175 years of Otis Library's dedicated service to Norwich, Connecticut — from our founding in 1850 to today.",
};

// Images + captions are the library's own real photos/artwork from their
// 175th-anniversary page (otislibrarynorwich.org/175-years-of-service/),
// reused here with their original alt-text descriptions as captions.
const milestones = [
  {
    title: "1850",
    image: "https://otislibrarynorwich.org/wp-content/uploads/2025/01/Otis-Drawing-Website-Size.png",
    caption:
      "A line drawing of Otis Library circa 1888 — a horse and carriage passes along the road in front of the original building, a large tree towering over the stately brick facade.",
    body: "Otis Library's founding Board of Trustees first met on January 14, 1850. The library was made possible by Deacon Joseph Otis, a Norwich merchant who donated the land and $5,000 toward building the city a permanent public library — a cornerstone of truth, information, and community that has held for a century and three quarters.",
  },
  {
    title: "Late 1800s",
    image: "https://otislibrarynorwich.org/wp-content/uploads/2025/01/Late-1800s-Website-Size.png",
    caption:
      "A photograph of the original building taken from the steps of Norwich City Hall — a man crosses the street toward the camera, the same towering tree still standing above the library.",
    body: "In 1891, the Board of Trustees voted to remove the membership subscription fee, making Otis Library free to the public. Membership rose from roughly 400 patrons to more than 4,000 within months — a turning point that shaped the library's identity as a truly public institution.",
  },
  {
    title: "261 Main Street",
    image: "https://otislibrarynorwich.org/wp-content/uploads/2025/01/Otis-Website-Size.png",
    caption:
      "The original building at 261 Main Street in Norwich, CT — originally a department store before its conversion into the library.",
    body: "Having outgrown its original Union Square location, the library moved to the site of the former Enterprise Store at 261 Main Street, opening its doors there in August of 1962 and beginning the next chapter of its story in the heart of downtown Norwich.",
  },
  {
    title: "2005–2007",
    image: "https://otislibrarynorwich.org/wp-content/uploads/2025/01/Modern-Exterior-Website-Size.png",
    caption:
      "Otis Library's current building — completely remodeled between 2005 and 2007 into a red-brick building with large windows for natural light and a welcoming environment.",
    body: "The Main Street building was torn down, rebuilt, and expanded. On April 29, 2007, Otis Library welcomed the public back into its transformed home — the same building that serves Norwich today.",
  },
  {
    title: "2025",
    image: null,
    caption: null,
    body: "As we usher in a new year, Otis Library celebrates the 175th anniversary of its dedicated service to Norwich and the region — honoring the vision of founder Deacon Otis, reflecting on nearly two centuries of achievements, and looking ahead with a new strategic plan. We're inviting our community to share stories and memories throughout this year-long celebration.",
  },
];

export default function AnniversaryPage() {
  const data = milestones.map((m) => ({
    title: m.title,
    content: (
      <div key={m.title} className="max-w-xl">
        {m.image && (
          // eslint-disable-next-line @next/next/no-img-element -- library's own externally-hosted archival photos; not worth configuring next/image's remote allowlist for a handful of static images.
          <img
            src={m.image}
            alt={m.caption ?? ""}
            className="mb-4 h-56 w-full rounded-xl border border-white/10 object-cover sm:h-72"
            loading="lazy"
          />
        )}
        <p className="text-sm leading-relaxed text-slate-300">{m.body}</p>
      </div>
    ),
  }));

  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">Est. 1850</p>
          <h1 className="mt-2 text-3xl text-white sm:text-4xl">175 Years of Service</h1>
          <p className="mt-4 text-slate-400">
            In 2025, Otis Library commemorated a remarkable milestone: 175 years of dedicated service
            to Norwich and the surrounding region. This anniversary celebrates not just our longevity,
            but the countless stories, knowledge, and connections that have flourished here since our
            founding Board of Trustees first met on January 14, 1850.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/about"
              className="inline-flex items-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-brand hover:text-brand"
            >
              ← Back to About
            </Link>
            <a
              href="mailto:ref@otislibrarynorwich.org?subject=My%20Otis%20Library%20Story"
              className="inline-flex items-center rounded-md bg-brand px-5 py-3 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              Share your Otis story ↗
            </a>
          </div>
        </FadeIn>
      </div>

      <Timeline data={data} />
    </div>
  );
}
