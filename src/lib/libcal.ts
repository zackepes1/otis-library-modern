import * as cheerio from "cheerio";

const RSS_URL = "https://otislibrarynorwich.libcal.com/rss.php?iid=6476&m=month&cid=19576";
export const CALENDAR_ID = 19576;
export const EVENT_CALENDAR_URL = `https://otislibrarynorwich.libcal.com/calendar/otislibrary?cid=${CALENDAR_ID}&t=g&d=0000-00-00&cal=${CALENDAR_ID}&inc=0`;

export interface LibcalEvent {
  id: string;
  title: string;
  /** ISO date, e.g. 2026-09-11 */
  date: string;
  /** e.g. "10:00 AM" */
  startLabel: string;
  /** e.g. "11:30 AM" */
  endLabel: string | null;
  /** e.g. "Fri, Sep 11" */
  dateLabel: string;
  /** e.g. "Friday, September 11, 2026" */
  fullDateLabel: string;
  location: string | null;
  /** Plain-text, full (untruncated) description. */
  description: string;
  imageUrl: string | null;
  registrations: boolean;
  seats: number;
  attending: number;
  url: string;
  /** Combined date+start time, used for chronological sorting/filtering. */
  startDateTime: Date;
}

function formatTime(time: string | undefined): string | null {
  if (!time) return null;
  const [hStr, mStr] = time.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

function stripHtml(html: string): string {
  // Re-parse as HTML (not XML) so entities like &nbsp;/&amp; are decoded,
  // not just the tags stripped.
  const text = cheerio.load(html)("body").text();
  return text.replace(/\s+/g, " ").trim();
}

let cache: { events: LibcalEvent[]; fetchedAt: number } | null = null;
const CACHE_TTL_MS = 60_000;

/**
 * Fetches and parses the library's real LibCal events RSS feed
 * (https://otislibrarynorwich.libcal.com/rss.php?...), which returns a
 * rolling ~30-day window of events with rich `libcal:` fields (date, start/
 * end time, location, description, featured image, registration/seat
 * counts). Server-side only (fetching in the browser would hit CORS, since
 * the feed lives on a different origin).
 */
export async function fetchLibcalEvents(): Promise<LibcalEvent[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.events;
  }

  const response = await fetch(RSS_URL, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; OtisLibrarySiteEvents/1.0)" },
    // Event listings change often — never serve a stale fetch cache.
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`LibCal RSS feed responded with ${response.status}`);
  }

  const xml = await response.text();
  const $ = cheerio.load(xml, { xmlMode: true });

  const events: LibcalEvent[] = [];

  $("item").each((_, el) => {
    const $item = $(el);
    const title = $item.find("title").first().text().trim();
    const link = $item.find("link").first().text().trim();
    const dateStr = $item.find("libcal\\:date").first().text().trim();
    const startStr = $item.find("libcal\\:start").first().text().trim();
    const endStr = $item.find("libcal\\:end").first().text().trim();
    const location = $item.find("libcal\\:location").first().text().trim() || null;
    const rawDescription = $item.find("libcal\\:description").first().text().trim();
    const imageUrl = $item.find("libcal\\:feat_image").first().text().trim() || null;
    const registrations = $item.find("libcal\\:registrations").first().text().trim() === "true";
    const seats = Number($item.find("libcal\\:seats").first().text().trim() || "0");
    const attending = Number($item.find("libcal\\:attending").first().text().trim() || "0");

    if (!title || !dateStr) return;

    const startDateTime = new Date(`${dateStr}T${startStr || "00:00:00"}`);
    if (Number.isNaN(startDateTime.getTime())) return;

    const idMatch = link.match(/\/event\/(\d+)/);
    const id = idMatch ? idMatch[1] : link;

    const dateOnly = new Date(`${dateStr}T00:00:00`);
    const dateLabel = dateOnly.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const fullDateLabel = dateOnly.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    events.push({
      id,
      title,
      date: dateStr,
      startLabel: formatTime(startStr) ?? "",
      endLabel: formatTime(endStr),
      dateLabel,
      fullDateLabel,
      location,
      description: stripHtml(rawDescription),
      imageUrl,
      registrations,
      seats,
      attending,
      url: link || EVENT_CALENDAR_URL,
      startDateTime,
    });
  });

  events.sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime());

  cache = { events, fetchedAt: Date.now() };
  return events;
}

/** Events starting anytime in the next 7 days from now. */
export async function fetchEventsThisWeek(): Promise<LibcalEvent[]> {
  const events = await fetchLibcalEvents();
  const now = new Date();
  const oneWeekOut = new Date(now);
  oneWeekOut.setDate(oneWeekOut.getDate() + 7);
  return events.filter((e) => e.startDateTime >= now && e.startDateTime < oneWeekOut);
}

export async function fetchLibcalEventById(id: string): Promise<LibcalEvent | null> {
  const events = await fetchLibcalEvents();
  return events.find((e) => e.id === id) ?? null;
}
