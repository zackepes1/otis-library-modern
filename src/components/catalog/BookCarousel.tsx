"use client";

import { useRef } from "react";
import { IconChevronLeft, IconChevronRight, IconBook } from "@tabler/icons-react";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
}

const CATALOG = "https://nw.catalog.lionlibraries.org";

export default function BookCarousel({ books }: { books: Book[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    const amount = (scrollRef.current?.clientWidth ?? 320) * 0.7;
    scrollRef.current?.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  }

  return (
    <div className="relative -mx-4 sm:-mx-6">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="absolute left-2 top-[calc(50%-1.5rem)] z-20 rounded-full border border-white/15 bg-ink/80 p-2 text-white shadow-lg backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10"
      >
        <IconChevronLeft size={18} />
      </button>

      {/* Scrollable strip */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth px-4 pb-3 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {books.map((book) => (
          <a
            key={book.key}
            href={`${CATALOG}/Union/Search?lookfor=${encodeURIComponent(book.title)}&basicType=Title`}
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 w-28 sm:w-32"
            title={`${book.title}${book.author_name?.[0] ? ` · ${book.author_name[0]}` : ""}`}
          >
            <div className="relative h-40 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow transition duration-200 group-hover:border-brand/40 group-hover:shadow-brand/15 group-hover:shadow-lg sm:h-48">
              {book.cover_i ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-600">
                  <IconBook size={28} aria-hidden />
                </div>
              )}
            </div>
            <p className="mt-2 line-clamp-2 text-xs leading-snug text-slate-400 transition group-hover:text-slate-200">
              {book.title}
            </p>
            {book.author_name?.[0] && (
              <p className="mt-0.5 truncate text-xs text-slate-600">{book.author_name[0]}</p>
            )}
          </a>
        ))}
      </div>

      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="absolute right-2 top-[calc(50%-1.5rem)] z-20 rounded-full border border-white/15 bg-ink/80 p-2 text-white shadow-lg backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10"
      >
        <IconChevronRight size={18} />
      </button>
    </div>
  );
}
