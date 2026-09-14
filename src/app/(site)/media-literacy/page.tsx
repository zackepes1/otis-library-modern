import type { Metadata } from "next";
import FadeIn from "@/components/motion/FadeIn";
import StaggerGrid from "@/components/motion/StaggerGrid";
import StaggerItem from "@/components/motion/StaggerItem";

export const metadata: Metadata = {
  title: "Media Literacy Monthly | Otis Library",
  description:
    "Otis Library's monthly series on media literacy — navigating misinformation, AI, deepfakes, and the changing media landscape.",
};

const articles = [
  {
    month: "February 2026",
    title: "Breaking Information Bubbles",
    description:
      "Strategies for exposing yourself to diverse perspectives and stepping outside algorithmic echo chambers.",
  },
  {
    month: "January 2026",
    title: "AI in the Newsroom",
    description:
      "How news organizations are using — and misusing — artificial intelligence in reporting, fact-checking, and content generation.",
  },
  {
    month: "December 2025",
    title: "Spotlight: The Web We Weave",
    description:
      "A look at the book exploring how the internet was built, by whom, and what values were baked in from the start.",
  },
  {
    month: "November 2025",
    title: "Spotlight: Invisible Rulers by Renée DiResta",
    description:
      "DiResta traces how online influence operations shape public opinion — and what it means for democracy.",
  },
  {
    month: "October 2025",
    title: "Debunking Hurricane Helene Misinformation",
    description:
      "A case study in real-time disaster misinformation — the false claims that spread, why they spread, and how to spot them.",
  },
  {
    month: "September 2025",
    title: "Spotlight: Superbloom by Nicholas Carr",
    description:
      "Carr examines how social media has rewired attention, emotion, and social behavior at a civilizational scale.",
  },
  {
    month: "August 2025",
    title: "YouTube Policy Reversals",
    description:
      "A timeline of YouTube's evolving content moderation policies — and what they reveal about platform accountability.",
  },
  {
    month: "July 2025",
    title: "Spotlight: AI Snake Oil",
    description:
      "Researchers Arvind Narayanan and Sayash Kapoor separate genuine AI capabilities from hype, fraud, and wishful thinking.",
  },
  {
    month: "June 2025",
    title: "Medical Misinformation",
    description:
      "How false health claims spread online, who is most vulnerable, and the role libraries and public institutions can play.",
  },
  {
    month: "May 2025",
    title: "Spotlight: The Fight for Privacy",
    description:
      "A deep dive into data privacy, surveillance capitalism, and the legal frameworks — or lack thereof — protecting personal information.",
  },
  {
    month: "April 2025",
    title: "Native Advertising and Sponsored Content",
    description:
      "How to identify when editorial content is actually paid promotion — and why it matters for how we consume news.",
  },
  {
    month: "March 2025",
    title: "Spotlight: Encyclopedia of Misinformation",
    description:
      "A reference guide to the history and mechanics of false information — myths, hoaxes, propaganda, and the psychology behind belief.",
  },
  {
    month: "February 2025",
    title: "Impersonation and Smishing Scams",
    description:
      "The rise of SMS-based phishing (smishing) and brand impersonation scams — how they work and how to avoid them.",
  },
  {
    month: "January 2025",
    title: "Spotlight: Algospeak by Maja Aleksic",
    description:
      "How social media users have developed coded language to circumvent content moderation algorithms — and what this reveals about platform power.",
  },
  {
    month: "December 2024",
    title: "Voter Fraud Myths",
    description:
      "A fact-based examination of persistent voter fraud narratives — their origins, their spread, and what the evidence actually shows.",
  },
  {
    month: "November 2024",
    title: "Springfield and Boar's Head: Debunking Viral Falsehoods",
    description:
      "Two viral misinformation events from fall 2024 — what was claimed, what was true, and how the false narratives spread so quickly.",
  },
  {
    month: "October 2024",
    title: "Deepfakes: Detection Tools",
    description:
      "A practical guide to tools for identifying AI-generated images and video, including Deepware, illuminarty.ai, isitai.com, and Google Gemini.",
  },
  {
    month: "September 2024",
    title: "Spotlight: Nexus by Yuval Noah Harari",
    description:
      "Harari argues that AI represents a fundamentally different kind of information network — one that can act without human intent.",
  },
  {
    month: "August 2024",
    title: "Conspiracy Theories: Why They Persist",
    description:
      "The psychological and social conditions that make conspiracy theories appealing — and evidence-based ways to address them.",
  },
  {
    month: "July 2024",
    title: "Youth Media Literacy Resources",
    description:
      "A roundup of tools and curricula for teaching media literacy to children and teens, including the NewsFeed Defenders game and the NPR AI quiz.",
  },
  {
    month: "June 2023",
    title: "Launch: What Is Media Literacy?",
    description:
      "The inaugural issue of Media Literacy Monthly introduces core concepts: source evaluation, lateral reading, and understanding how information ecosystems work.",
  },
];

const tools = [
  { name: "Deepware", description: "Deepfake video detection tool.", href: "https://deepware.ai/" },
  { name: "illuminarty.ai", description: "Detects AI-generated images.", href: "https://illuminarty.ai/" },
  { name: "isitai.com", description: "Checks whether content was generated by AI.", href: "https://isitai.com/" },
  { name: "NPR AI Detection Quiz", description: "Test your ability to spot AI-generated images.", href: "https://www.npr.org/2023/06/14/1181871773/ai-image-detection" },
  { name: "NewsFeed Defenders", description: "A game teaching teens to spot online misinformation.", href: "https://www.icivics.org/games/newsfeed-defenders" },
];

export default function MediaLiteracyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <FadeIn as="h1" className="text-3xl text-white">
        Media Literacy Monthly
      </FadeIn>
      <FadeIn delay={0.05}>
        <p className="mt-4 max-w-2xl text-slate-400">
          A monthly series from Otis Library on navigating today&apos;s information landscape —
          misinformation, AI, deepfakes, platform accountability, and the tools and habits that
          help you stay informed. Published since June 2023.
        </p>
      </FadeIn>

      {/* Detection Tools */}
      <FadeIn delay={0.1}>
        <section className="mt-12">
          <h2 className="text-xl text-brand">Detection &amp; Verification Tools</h2>
          <p className="mt-2 text-sm text-slate-400">
            Free tools to help you evaluate content and spot AI-generated or misleading material.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {tools.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                title={tool.description}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-brand transition hover:border-brand/40 hover:bg-white/[0.04]"
              >
                {tool.name} ↗
              </a>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Article Archive */}
      <section className="mt-14">
        <FadeIn>
          <h2 className="text-xl text-brand">Article Archive</h2>
        </FadeIn>
        <StaggerGrid className="mt-6 grid gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <StaggerItem key={article.month}>
              <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                  {article.month}
                </p>
                <h3 className="mt-2 font-semibold text-white">{article.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                  {article.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      {/* Newsletter CTA */}
      <FadeIn delay={0.3}>
        <div className="mt-14 rounded-xl border border-brand/20 bg-brand/5 p-6">
          <p className="text-sm font-semibold text-white">
            Get Media Literacy Monthly delivered to your inbox.
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Subscribe to the Otis Library newsletter and select &quot;News&quot; to receive each
            new issue.
          </p>
          <a
            href="/newsletter"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-ink shadow transition hover:brightness-110"
          >
            Subscribe to the Newsletter
          </a>
        </div>
      </FadeIn>
    </div>
  );
}
