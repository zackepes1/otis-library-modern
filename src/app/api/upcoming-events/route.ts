import { NextResponse } from "next/server";
import { fetchEventsThisWeek } from "@/lib/libcal";

/** Serializable, browser-facing shape of a LibCal event (dates as strings). */
export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  startLabel: string;
  endLabel: string | null;
  dateLabel: string;
  location: string | null;
  /** Short, card-sized excerpt of the description. */
  description: string;
  imageUrl: string | null;
  registrations: boolean;
  seats: number;
  attending: number;
  url: string;
}

/**
 * Browser-facing endpoint powering the homepage's "This Week's Events"
 * carousel. Delegates the actual RSS fetch/parse to src/lib/libcal.ts so the
 * same logic can be reused by the /events/[id] detail page.
 */
export async function GET() {
  try {
    const events = await fetchEventsThisWeek();

    const upcoming: UpcomingEvent[] = events.slice(0, 10).map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      startLabel: event.startLabel,
      endLabel: event.endLabel,
      dateLabel: event.dateLabel,
      location: event.location,
      description: event.description.slice(0, 160),
      imageUrl: event.imageUrl,
      registrations: event.registrations,
      seats: event.seats,
      attending: event.attending,
      url: event.url,
    }));

    return NextResponse.json({ events: upcoming });
  } catch (error) {
    console.error("Upcoming events fetch failed:", error);
    return NextResponse.json({ events: [] }, { status: 502 });
  }
}
