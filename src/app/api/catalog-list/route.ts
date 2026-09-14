import { NextRequest, NextResponse } from "next/server";

const CATALOG_ORIGIN = "https://nw.catalog.lionlibraries.org";

export interface CatalogListItem {
  id: string;
  title: string;
  author: string | null;
  coverUrl: string | null;
  recordUrl: string;
}

interface RawListTitle {
  id: string;
  title?: string;
  author?: string;
  image?: string;
  small_image?: string;
  titleURL?: string;
}

/**
 * Server-side proxy for the catalog's "list widget" API — this is what
 * powers the real "Things We Love" shelves (Staff Picks, DVDs, Fiction,
 * etc.) on the live library site. Proxying avoids CORS and lets us hand the
 * carousel clean, minimal JSON instead of the widget's raw (and much
 * heavier) payload.
 */
export async function GET(request: NextRequest) {
  const listId = request.nextUrl.searchParams.get("listId")?.trim();
  const limit = Number(request.nextUrl.searchParams.get("limit") ?? "20") || 20;

  if (!listId) {
    return NextResponse.json({ results: [] });
  }

  const apiUrl = `${CATALOG_ORIGIN}/API/ListAPI?method=getListWidgetTitles&id=list:${encodeURIComponent(
    listId,
  )}&scrollerName=shelf${encodeURIComponent(listId)}&coverSize=medium&showRatings=0&numTitlesToShow=${limit}`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OtisLibrarySiteSearch/1.0)",
      },
      // Catalog availability/holds change constantly — never serve stale data.
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ results: [], error: "The catalog is currently unavailable." }, { status: 502 });
    }

    const data = (await response.json()) as { titles?: RawListTitle[] };

    const results: CatalogListItem[] = (data.titles ?? [])
      .filter((t): t is RawListTitle & { title: string; titleURL: string } => Boolean(t.title && t.titleURL))
      .map((t) => ({
        id: t.id,
        title: t.title,
        author: t.author?.trim() || null,
        coverUrl: t.image ? `${CATALOG_ORIGIN}${t.image}` : t.small_image ? `${CATALOG_ORIGIN}${t.small_image}` : null,
        recordUrl: t.titleURL,
      }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Catalog list widget fetch failed:", error);
    return NextResponse.json({ results: [], error: "The catalog is currently unavailable." }, { status: 502 });
  }
}
