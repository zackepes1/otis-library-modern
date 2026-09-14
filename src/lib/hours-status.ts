export interface DayHours {
  day: string;
  time: string;
}

export interface HoursStatus {
  label: string;
  isOpen: boolean;
}

type Lang = "en" | "es";

// English names used for lookup against the hours data (which stores English day names).
const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const STRINGS = {
  en: {
    displayDays: DAY_NAMES,
    tomorrow: "tomorrow",
    openUntil: (t: string) => `Open until ${t}`,
    opensToday: (t: string) => `Opens today at ${t}`,
    closedOpens: (d: string, t: string) => `Closed — opens ${d} at ${t}`,
    closed: "Closed",
  },
  es: {
    displayDays: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    tomorrow: "mañana",
    openUntil: (t: string) => `Abierto hasta las ${t}`,
    opensToday: (t: string) => `Abre hoy a las ${t}`,
    closedOpens: (d: string, t: string) => `Cerrado — abre ${d} a las ${t}`,
    closed: "Cerrado",
  },
};

function parseTimeLabel(label: string): number | null {
  const match = label.trim().match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return null;
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  return hour * 60 + minute;
}

/**
 * Derives a human-readable "open now" / "closes at" / "opens at" status from
 * the static weekly hours table, based on the current time. Used by the
 * header's compact hours widget so patrons can see today's status at a
 * glance without visiting the Hours & Parking page.
 */
export function getHoursStatus(
  hours: DayHours[],
  now: Date = new Date(),
  lang: Lang = "en",
): HoursStatus {
  const s = STRINGS[lang];
  const dayIndex = now.getDay();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const todayEntry = hours.find((h) => h.day === DAY_NAMES[dayIndex]);
  if (todayEntry && todayEntry.time !== "Closed") {
    const [startLabel, endLabel] = todayEntry.time.split("–").map((s) => s.trim());
    const start = parseTimeLabel(startLabel);
    const end = parseTimeLabel(endLabel);
    if (start !== null && end !== null) {
      if (nowMinutes < start) {
        return { label: s.opensToday(startLabel), isOpen: false };
      }
      if (nowMinutes < end) {
        return { label: s.openUntil(endLabel), isOpen: true };
      }
    }
  }

  // Closed for the rest of today — find the next day with hours.
  for (let offset = 1; offset <= 7; offset++) {
    const idx = (dayIndex + offset) % 7;
    const entry = hours.find((h) => h.day === DAY_NAMES[idx]);
    if (entry && entry.time !== "Closed") {
      const [startLabel] = entry.time.split("–").map((s) => s.trim());
      const dayLabel = offset === 1 ? s.tomorrow : s.displayDays[idx];
      return { label: s.closedOpens(dayLabel, startLabel), isOpen: false };
    }
  }

  return { label: s.closed, isOpen: false };
}
