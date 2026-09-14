import type { Metadata } from "next";
import CatalogSearch from "./CatalogSearch";
import BookCarousel from "@/components/catalog/BookCarousel";

export const metadata: Metadata = {
  title: "Search the Catalog | Otis Library",
  description:
    "Search books, audiobooks, eBooks, DVDs, video games, and more from Otis Library and the LION consortium.",
};

interface OLBook {
  title: string;
  author_name?: string[];
  cover_i?: number;
  key: string;
}

async function getFeaturedBooks(): Promise<OLBook[]> {
  try {
    const res = await fetch(
      "https://openlibrary.org/search.json?q=subject:fiction&sort=rating&limit=12&fields=title,author_name,cover_i,key",
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.docs as OLBook[]).filter((b) => b.cover_i);
  } catch {
    return [];
  }
}

export default async function CatalogPage() {
  const books = await getFeaturedBooks();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-white">Search the Catalog</h1>
        <p className="mt-2 text-slate-400">
          Find books, audiobooks, DVDs, video games, and more — free with your Otis Library card.
        </p>
      </div>

      {/* Featured books carousel */}
      {books.length > 0 && (
        <div className="mb-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Popular Titles
          </p>
          <BookCarousel books={books} />
        </div>
      )}

      <CatalogSearch />
    </div>
  );
}
