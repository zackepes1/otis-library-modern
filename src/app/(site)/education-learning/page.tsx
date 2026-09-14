import type { Metadata } from "next";
import { IconArrowUpRight } from "@tabler/icons-react";
import FadeIn from "@/components/motion/FadeIn";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";

export const metadata: Metadata = {
  title: "Education & Learning Resources | Otis Library",
  description:
    "Free education and learning resources from Otis Library — databases, test prep, language learning, financial literacy, legal forms, and more.",
};

const databases = [
  {
    name: "Driving-Tests",
    description:
      "Get your Connecticut Driver's, CDL, or Motorcycle License with practice exams, online driver manuals, and AI coaching support.",
    href: "https://otis.driving-tests.org/connecticut/",
  },
  {
    name: "History Reference Center",
    description:
      "Articles, reference materials, primary sources, and biographies covering ancient, world, and U.S. history. Includes Google Classroom integration.",
    href: "https://research.ebsco.com/c/hcqvzq",
  },
  {
    name: "The Journey to Financial Wellbeing",
    description:
      "A video series from Liberty Bank and Otis Library covering budgeting, saving, credit management, and long-term financial planning.",
    href: "https://youtube.com/playlist?list=PL9SOWYP8llZrt_v2D9y0jtESWzAi4-Que",
  },
  {
    name: "LearningExpress Workforce Solutions",
    description:
      "Test preparation, software training, and high school equivalency support — available in English and Spanish.",
    href: "https://www.learningexpresshub.com/home",
  },
  {
    name: "Legal Information Source",
    description:
      "Printable legal forms and reference materials from NOLO — wills, rental agreements, patents, and business resources.",
    href: "https://research.ebsco.com/c/hvodyq",
  },
  {
    name: "researchIT CT",
    description:
      "A unified portal offering access to 19 academic, scholarly, and newspaper databases for all Connecticut residents.",
    href: "https://research.ebsco.com/c/cjxjty",
  },
  {
    name: "Science Reference Source",
    description:
      "Reference materials, videos, scientist biographies, and 2,500+ lesson plans covering science topics.",
    href: "https://research.ebsco.com/c/biwglv",
  },
  {
    name: "Small Business Source",
    description:
      "Startup kits, 600+ instructional videos, nonprofit resources, and demographic data for entrepreneurs.",
    href: "https://research.ebsco.com/c/rnqg7c",
  },
  {
    name: "Transparent Language Online",
    description:
      "Language-learning platform offering 110+ languages with mobile apps for flexible, anywhere learning.",
    href: "https://library.transparent.com/norwichct/",
  },
];

const freeWebsites = [
  {
    name: "Digital Learn",
    description: "Technology classes in English and Spanish.",
    href: "https://www.digitallearn.org/",
  },
  {
    name: "GCFGlobal",
    description: "Self-paced lessons on technology, employment, reading, and math.",
    href: "https://edu.gcfglobal.org/",
  },
  {
    name: "Grow with Google",
    description: "Free technology and employment courses from Google.",
    href: "https://grow.google/",
  },
  {
    name: "Harvard Free Online Courses",
    description: "Selected free or discounted offerings from Harvard University.",
    href: "https://pll.harvard.edu/catalog/free",
  },
  {
    name: "MIT OpenCourseWare",
    description: "Materials from 2,500+ MIT courses, freely available.",
    href: "https://ocw.mit.edu/",
  },
  {
    name: "Open Yale Courses",
    description: "Free lectures from selected Yale courses.",
    href: "https://oyc.yale.edu/",
  },
];

export default function EducationLearningPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn as="h1" className="text-3xl text-white">
        Education &amp; Learning Resources
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-4 max-w-2xl text-slate-400">
          Otis Library offers a comprehensive collection of free education and learning resources —
          accessible at the library and from home with a valid library card.
        </p>
      </FadeIn>

      {/* Databases */}
      <section className="mt-12">
        <FadeIn>
          <h2 className="text-xl text-brand">Library Databases &amp; Tools</h2>
          <p className="mt-2 text-sm text-slate-400">
            Most databases require a valid Otis Library card. Access from home at any time.
          </p>
        </FadeIn>
        <StaggerGrid className="mt-6 grid gap-5 sm:grid-cols-2">
          {databases.map((db) => (
            <StaggerItem key={db.name}>
              <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <a
                  href={db.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
                >
                  {db.name}
                  <IconArrowUpRight size={13} />
                </a>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {db.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Free Websites */}
      <FadeIn delay={0.2}>
        <section className="mt-12">
          <h2 className="text-xl text-brand">Free Online Learning</h2>
          <p className="mt-2 text-sm text-slate-400">
            No library card required — open to everyone.
          </p>
          <div className="mt-4 space-y-3">
            {freeWebsites.map((site) => (
              <div
                key={site.name}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <a
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-brand hover:underline"
                >
                  {site.name}
                  <IconArrowUpRight size={13} />
                </a>
                <p className="mt-1 text-sm text-slate-400">{site.description}</p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.3}>
        <section className="mt-10">
          <h2 className="text-xl text-brand">Need Help Getting Started?</h2>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
            <p className="text-sm text-slate-400">
              Our librarians and technology specialist can help you access any of these resources.
              Stop by the reference desk or book a one-on-one technology appointment.
            </p>
            <a
              href="/services/one-on-one-technology-help"
              className="inline-flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand/50 hover:bg-brand/15"
            >
              Book a Tech Help Appointment
            </a>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
