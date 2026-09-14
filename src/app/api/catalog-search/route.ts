import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

const CATALOG_ORIGIN = "https://nw.catalog.lionlibraries.org";

export interface CatalogResult {
  id: string;
  title: string;
  author: string | null;
  formats: string | null;
  coverUrl: string | null;
  recordUrl: string;
}

/**
 * Server-side proxy for the Otis Library online catalog (a VuFind/Pika-based
 * discovery layer). Fetching here — rather than from the browser — avoids
 * CORS restrictions, and lets us parse the catalog's search-results HTML into
 * clean JSON the in-site search UI can render directly.
 */
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const searchUrl = `${CATALOG_ORIGIN}/Union/Search?lookfor=${encodeURIComponent(q)}&basicType=Keyword&view=list&searchSource=local`;

  try {
    const response = await fetch(searchUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OtisLibrarySiteSearch/1.0)",
      },
      // Catalog availability changes constantly — never serve a stale fetch cache.
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { results: [], error: "The catalog is currently unavailable. Please try again shortly." },
        { status: 502 },
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results: CatalogResult[] = [];

    $("div.result").each((_, el) => {
      const $result = $(el);
      const titleLink = $result.find("a.result-title").first();
      const title = titleLink.text().trim();
      const relHref = titleLink.attr("href");
      if (!title || !relHref) return;

      const coverSrc = $result.find("img.listResultImage").first().attr("src") ?? null;

      let author: string | null = null;
      let formats: string | null = null;
      $result.find(".result-label").each((_, labelEl) => {
        const $label = $(labelEl);
        const labelText = $label.text().trim();
        if (labelText.startsWith("Author")) {
          author = $label.next(".result-value").text().trim() || null;
        } else if (labelText.startsWith("Formats")) {
          formats = $label.next(".result-value").text().trim().replace(/\s+/g, " ") || null;
        }
      });

      const idMatch = relHref.match(/\/GroupedWork\/([^/]+)\//);
      const id = idMatch ? idMatch[1] : relHref;

      results.push({
        id,
        title,
        author,
        formats,
        coverUrl: coverSrc ? `${CATALOG_ORIGIN}${coverSrc}` : null,
        recordUrl: `${CATALOG_ORIGIN}${relHref}`,
      });
    });

    return NextResponse.json({
      results: results.slice(0, 12),
      catalogSearchUrl: searchUrl,
    });
  } catch (error) {
    console.error("Catalog search failed:", error);
    return NextResponse.json(
      { results: [], error: "The catalog is currently unavailable. Please try again shortly." },
      { status: 502 },
    );
  }
}
