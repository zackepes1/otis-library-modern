"use client";

import { useState, type FormEvent } from "react";
import { IconArrowLeft, IconCalendar, IconCheck, IconClock } from "@tabler/icons-react";

// ─────────────────────────────────────────────────────────────────────────────
// Slot generation
// When the API is ready, replace `getMockDays` with a fetch to
// GET /api/1.1/appointments/{eid}/slots and map the response to `Day[]`.
// ─────────────────────────────────────────────────────────────────────────────

interface Slot {
  id: string;
  label: string; // e.g. "10:00 AM"
}

interface Day {
  date: Date;
  slots: Slot[];
}

// Library hours by day-of-week (0 = Sun). Returns [openHour, closeHour] or null if closed.
function libraryHours(dow: number): [number, number] | null {
  switch (dow) {
    case 0: return null;           // Sunday — closed
    case 1: return [9, 19];        // Monday
    case 2: return [9, 17];        // Tuesday
    case 3: return [9, 19];        // Wednesday
    case 4: return [9, 14];        // Thursday
    case 5: return [9, 17];        // Friday
    case 6: return [9, 14];        // Saturday
    default: return null;
  }
}

function fmt12(hour: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:00 ${period}`;
}

function getMockDays(count = 21): Day[] {
  const days: Day[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; days.length < count && i < 60; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const hours = libraryHours(d.getDay());
    if (!hours) continue;

    const [open, close] = hours;
    const slots: Slot[] = [];
    // One slot per hour, last slot ends 1 hour before closing
    for (let h = open; h < close - 1; h++) {
      slots.push({ id: `${d.toISOString().slice(0, 10)}-${h}`, label: fmt12(h) });
    }
    if (slots.length) days.push({ date: d, slots });
  }
  return days;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface BookingInfo {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

type Step = "date" | "time" | "info" | "done";

export default function AppointmentBooker({ libcalUrl }: { libcalUrl: string }) {
  const [step, setStep] = useState<Step>("date");
  const [days] = useState<Day[]>(() => getMockDays(21));
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [info, setInfo] = useState<BookingInfo>({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  function pickDate(day: Day) {
    setSelectedDay(day);
    setSelectedSlot(null);
    setStep("time");
  }

  function pickSlot(slot: Slot) {
    setSelectedSlot(slot);
    setStep("info");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // ── API hook-in point ────────────────────────────────────────────────────
    // Replace this timeout with:
    //   await fetch("/api/appointments/book", {
    //     method: "POST",
    //     body: JSON.stringify({ slotId: selectedSlot!.id, ...info }),
    //   });
    // ────────────────────────────────────────────────────────────────────────
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setStep("done");
  }

  function reset() {
    setStep("date");
    setSelectedDay(null);
    setSelectedSlot(null);
    setInfo({ name: "", email: "", phone: "", notes: "" });
  }

  const dateLabel = selectedDay
    ? `${DAYS[selectedDay.date.getDay()]}, ${MONTHS[selectedDay.date.getMonth()]} ${selectedDay.date.getDate()}`
    : "";

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03]">
      {/* Progress bar */}
      {step !== "done" && (
        <div className="flex border-b border-white/10">
          {(["date", "time", "info"] as Step[]).map((s, i) => {
            const stepOrder = { date: 0, time: 1, info: 2, done: 3 };
            const current = stepOrder[step];
            const active = stepOrder[s] === current;
            const done = stepOrder[s] < current;
            return (
              <div
                key={s}
                className={`flex-1 py-3 text-center text-xs font-semibold transition ${
                  active ? "text-brand" : done ? "text-slate-400" : "text-slate-600"
                }`}
              >
                <span className={`mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                  done ? "bg-brand/20 text-brand" : active ? "bg-brand text-ink" : "bg-white/5 text-slate-600"
                }`}>
                  {done ? <IconCheck size={10} /> : i + 1}
                </span>
                {s === "date" ? "Pick a date" : s === "time" ? "Pick a time" : "Your info"}
              </div>
            );
          })}
        </div>
      )}

      <div className="p-6">
        {/* ── Step 1: Date ── */}
        {step === "date" && (
          <div>
            <h3 className="mb-1 text-sm font-semibold text-white">Select a date</h3>
            <p className="mb-5 text-xs text-slate-500">Showing the next 21 available days.</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
              {days.map((day) => (
                <button
                  key={day.date.toISOString()}
                  type="button"
                  onClick={() => pickDate(day)}
                  className="flex flex-col items-center gap-0.5 rounded-xl border border-white/10 bg-white/[0.02] py-3 text-center transition hover:border-brand/40 hover:bg-brand/5"
                >
                  <span className="text-xs text-slate-500">{DAYS[day.date.getDay()]}</span>
                  <span className="text-lg font-semibold text-white">{day.date.getDate()}</span>
                  <span className="text-xs text-slate-500">{MONTHS[day.date.getMonth()]}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Time ── */}
        {step === "time" && selectedDay && (
          <div>
            <button
              type="button"
              onClick={() => setStep("date")}
              className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-brand"
            >
              <IconArrowLeft size={13} /> {dateLabel}
            </button>
            <h3 className="mb-1 text-sm font-semibold text-white">Select a time</h3>
            <p className="mb-5 text-xs text-slate-500">All times are Eastern.</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {selectedDay.slots.map((slot) => (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => pickSlot(slot)}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] py-3 text-sm font-semibold text-white transition hover:border-brand/40 hover:bg-brand/5 hover:text-brand"
                >
                  <IconClock size={14} className="text-slate-500" />
                  {slot.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 3: Info ── */}
        {step === "info" && selectedDay && selectedSlot && (
          <form onSubmit={handleSubmit}>
            <button
              type="button"
              onClick={() => setStep("time")}
              className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-brand"
            >
              <IconArrowLeft size={13} /> {dateLabel} · {selectedSlot.label}
            </button>

            <div className="mb-6 flex items-center gap-3 rounded-xl border border-brand/20 bg-brand/5 px-4 py-3">
              <IconCalendar size={16} className="shrink-0 text-brand" />
              <div>
                <p className="text-sm font-semibold text-white">{dateLabel}</p>
                <p className="text-xs text-slate-400">{selectedSlot.label} · One-on-One Technology Help</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-400">Full name *</span>
                  <input
                    required
                    value={info.name}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20"
                    placeholder="Jane Smith"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-400">Email *</span>
                  <input
                    required
                    type="email"
                    value={info.email}
                    onChange={(e) => setInfo({ ...info, email: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20"
                    placeholder="jane@example.com"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-400">Phone</span>
                <input
                  type="tel"
                  value={info.phone}
                  onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20"
                  placeholder="(860) 555-0100"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-400">
                  What do you need help with?
                </span>
                <textarea
                  rows={3}
                  value={info.notes}
                  onChange={(e) => setInfo({ ...info, notes: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none"
                  placeholder="e.g. Setting up email, using my new tablet, printing documents…"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-xl bg-brand py-3 text-sm font-semibold text-ink transition hover:brightness-110 disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Request Appointment"}
            </button>
          </form>
        )}

        {/* ── Step 4: Done ── */}
        {step === "done" && (
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand/20">
              <IconCheck className="h-6 w-6 text-brand" />
            </div>
            <h3 className="text-lg font-semibold text-white">You&apos;re all set, {info.name.split(" ")[0]}!</h3>
            <p className="mt-2 text-sm text-slate-400">
              We&apos;ve received your request for{" "}
              <span className="font-semibold text-white">{dateLabel}</span> at{" "}
              <span className="font-semibold text-white">{selectedSlot?.label}</span>.
              A confirmation will be sent to <span className="font-semibold text-white">{info.email}</span>.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              Questions? Call us at{" "}
              <a href="tel:8608892365" className="text-brand hover:underline">
                (860) 889-2365
              </a>{" "}
              ext. 108.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 text-xs font-semibold text-brand hover:underline"
            >
              Book another appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
