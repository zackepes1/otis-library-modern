import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as cheerio from "cheerio";
import type { AnyNode } from "domhandler";
import { IconArrowLeft } from "@tabler/icons-react";
import { fetchSnippets, fetchSnippetBySlug } from "@/lib/snippets";

export async function generateStaticParams() {
  const snippets = await fetchSnippets();
  return snippets.map((s) => ({ slug: s.slug }));
}


function decodeHtmlEntities(html: string): string {
  return cheerio.load(`<span>${html}</span>`)("span").text();
}

type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "img"; src: string; alt: string; caption?: string };

// Some posts were saved with a local staging IP in src; srcset always has the real HTTPS URL.
function resolveImgSrc($img: ReturnType<ReturnType<typeof cheerio.load>>): string {
  const src = $img.attr("src") ?? "";
  const isPublicHttps = (u: string) =>
    u.startsWith("https://") && u.includes("wp-content/uploads");

  if (isPublicHttps(src)) return src;

  // Parse srcset and pick the widest HTTPS wp-content entry
  const srcset = $img.attr("srcset") ?? "";
  if (srcset) {
    const best = srcset
      .split(",")
      .map((s) => s.trim().split(/\s+/))
      .filter(([u]) => isPublicHttps(u))
      .sort((a, b) => parseInt(b[1] ?? "0") - parseInt(a[1] ?? "0"))[0];
    if (best) return best[0];
  }

  // Last resort: src has wp-content/uploads even if not HTTPS (staging IP)
  if (src.includes("wp-content/uploads")) return src;
  return "";
}

function parseWpContent(html: string): ContentBlock[] {
  const $ = cheerio.load(html);
  const blocks: ContentBlock[] = [];
  const handledImgs = new Set<AnyNode>();

  // Select all content elements at any nesting depth (Gutenberg wraps blocks in divs).
  // Iterate in document order; skip elements nested inside list items to avoid duplicates.
  $("figure, p, h2, h3, h4, blockquote, ul, ol, img").each((_, el) => {
    if ($(el).parents("li").length > 0) return;

    const $el = $(el);

    // figure: extract img + optional figcaption as a unit
    if (el.name === "figure") {
      const imgEl = $el.find("img").first();
      if (!imgEl.length) return;
      const src = resolveImgSrc(imgEl);
      if (!src) return;
      handledImgs.add(imgEl[0] as unknown as AnyNode);
      blocks.push({
        type: "img",
        src,
        alt: imgEl.attr("alt") ?? "",
        caption: $el.find("figcaption").text().trim() || undefined,
      });
      return;
    }

    // Standalone img (not inside a figure)
    if (el.name === "img") {
      if (handledImgs.has(el as unknown as AnyNode)) return;
      const src = resolveImgSrc($el);
      if (!src) return;
      blocks.push({ type: "img", src, alt: $el.attr("alt") ?? "" });
      return;
    }

    const text = $el.text().trim();
    if (!text) return;

    switch (el.name) {
      case "p":
        blocks.push({ type: "p", text });
        break;
      case "h2":
        blocks.push({ type: "h2", text });
        break;
      case "h3":
      case "h4":
        blocks.push({ type: "h3", text });
        break;
      case "blockquote":
        blocks.push({ type: "blockquote", text });
        break;
      case "ul": {
        if ($(el).parents("ul, ol").length > 0) return;
        const items = $el.find("> li").map((_, li) => $(li).text().trim()).get().filter(Boolean);
        if (items.length) blocks.push({ type: "ul", items });
        break;
      }
      case "ol": {
        if ($(el).parents("ul, ol").length > 0) return;
        const items = $el.find("> li").map((_, li) => $(li).text().trim()).get().filter(Boolean);
        if (items.length) blocks.push({ type: "ol", items });
        break;
      }
    }
  });

  return blocks;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const snippet = await fetchSnippetBySlug(slug);
  if (!snippet) return { title: "Not Found | Otis Library" };
  const plainExcerpt = cheerio.load(snippet.excerpt)("body").text().trim();
  return {
    title: `${decodeHtmlEntities(snippet.title)} | Snippets from Norwich History | Otis Library`,
    description: plainExcerpt.slice(0, 160),
  };
}

export default async function SnippetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const snippet = await fetchSnippetBySlug(slug);
  if (!snippet) notFound();

  const dateLabel = new Date(snippet.date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const title = decodeHtmlEntities(snippet.title);
  const blocks = parseWpContent(snippet.content);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/local-history#snippets"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
      >
        <IconArrowLeft size={14} />
        Snippets from Norwich History
      </Link>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-brand">
        {dateLabel}
      </p>
      <h1 className="mt-2 text-3xl text-white">{title}</h1>

      <div className="mt-8 space-y-0">
        {blocks.map((block, i) => {
          switch (block.type) {
            case "p":
              return (
                <p key={i} className="mt-4 text-slate-400 leading-relaxed">
                  {block.text}
                </p>
              );
            case "h2":
              return (
                <h2 key={i} className="mt-8 text-xl text-white">
                  {block.text}
                </h2>
              );
            case "h3":
              return (
                <h3 key={i} className="mt-6 text-lg text-white">
                  {block.text}
                </h3>
              );
            case "blockquote":
              return (
                <blockquote
                  key={i}
                  className="mt-6 border-l-4 border-brand pl-4 text-slate-300 italic"
                >
                  {block.text}
                </blockquote>
              );
            case "ul":
              return (
                <ul key={i} className="mt-4 list-disc pl-6 text-slate-400">
                  {block.items.map((item, j) => (
                    <li key={j} className="mt-1 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            case "ol":
              return (
                <ol key={i} className="mt-4 list-decimal pl-6 text-slate-400">
                  {block.items.map((item, j) => (
                    <li key={j} className="mt-1 leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ol>
              );
            case "img":
              return (
                <figure key={i} className="mt-8">
                  {/* eslint-disable-next-line @next/next/no-img-element -- WordPress CDN asset */}
                  <img
                    src={block.src}
                    alt={block.alt}
                    className="w-full rounded-xl object-cover"
                    loading="lazy"
                  />
                  {block.caption && (
                    <figcaption className="mt-2 text-center text-xs text-slate-500">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
          }
        })}
      </div>

      <div className="mt-12 border-t border-white/10 pt-8">
        <Link
          href="/local-history#snippets"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
        >
          <IconArrowLeft size={14} />
          Back to all snippets
        </Link>
      </div>
    </div>
  );
}
