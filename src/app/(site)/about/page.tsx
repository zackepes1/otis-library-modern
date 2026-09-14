import { getStaff, getTestimonials } from "@/sanity/queries";
import Timeline, { type TimelineEntry } from "@/components/motion/Timeline";

export const metadata = {
  title: "About | Otis Library",
};

const storyEntries: TimelineEntry[] = [
  {
    year: "1849",
    title: "A Vision Begins",
    description:
      "Construction began on a brick building in the heart of Norwich — the vision of merchant Deacon Joseph Otis, who donated the land and five thousand dollars toward building the city a permanent public library.",
  },
  {
    year: "1891",
    title: "A Free Library",
    description:
      "The Board of Trustees voted to remove the membership subscription fee, making Otis Library free to the public. Membership rose from about 400 patrons to over 4,000 within months.",
  },
  {
    year: "1962",
    title: "A New Home",
    description:
      "Having outgrown its original Union Square location, the library moved to the site of the former Enterprise Store at 261 Main Street, opening its doors there in August of 1962.",
  },
  {
    year: "2007",
    title: "Rebuilt & Reopened",
    description:
      "The Main Street building was torn down, rebuilt, and expanded. On April 29, 2007, Otis Library welcomed the public back into its transformed home.",
  },
  {
    year: "Today",
    title: "175 Years of Service",
    description:
      "Otis Library continues to serve the Norwich community through innovative programming, technology, and resources — a free, welcoming space for all.",
  },
];

export default async function AboutPage() {
  const [staff, reviews] = await Promise.all([getStaff(), getTestimonials()]);
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl text-white">About Otis Library</h1>

      <section className="mt-8">
        <h2 className="text-xl text-brand">Our Mission</h2>
        <p className="mt-2 text-slate-400">
          Otis Library is a trusted informational and cultural hub that
          provides free resources for personal growth and lifelong learning.
          We inspire lasting connections and foster community in a safe,
          welcoming environment.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl text-brand">Vision</h2>
        <p className="mt-2 text-slate-400">
          To create a vibrant and inclusive community through library
          services and programs where individuals are empowered to explore
          and thrive.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl text-brand">Our Story</h2>
        <p className="mt-2 text-slate-400">
          Since 1849, Otis Library has grown alongside Norwich. Flip through
          the pages below for a few highlights from our history.
        </p>
        <Timeline entries={storyEntries} className="mt-8 max-w-2xl" />
      </section>

      <section className="mt-10">
        <h2 className="text-xl text-brand">Leadership Team</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {staff.map((person) => (
            <div key={person.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-semibold text-white">{person.name}</p>
              <p className="text-sm text-slate-400">{person.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10" id="reviews">
        <h2 className="text-xl text-brand">What People Say</h2>
        <div className="mt-4 space-y-4">
          {reviews.map((review) => (
            <blockquote
              key={review.author}
              className="rounded-xl border-l-4 border-brand bg-white/[0.03] p-4 text-sm text-slate-300"
            >
              &ldquo;{review.quote}&rdquo;
              <footer className="mt-2 text-xs font-semibold text-slate-500">
                — {review.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  );
}
