"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

type StatDef =
  | { kind: "count"; value: number; suffix?: string; label: string }
  | { kind: "static"; display: string; label: string };

const STATS: StatDef[] = [
  { kind: "count", value: 175, suffix: "+", label: "Years of service" },
  { kind: "count", value: 50000, suffix: "+", label: "Items to borrow" },
  { kind: "static", display: "24/7", label: "Digital access" },
  { kind: "static", display: "Free", label: "For the community" },
];

function CountStat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 1600;
    function tick(ts: number) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center">
      <p className="text-5xl font-bold tabular-nums text-white sm:text-6xl">
        {display.toLocaleString()}{suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-400">{label}</p>
    </div>
  );
}

function StaticStat({ display, label }: { display: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <p className="text-5xl font-bold text-white sm:text-6xl">{display}</p>
      <p className="mt-2 text-sm font-medium text-slate-400">{label}</p>
    </div>
  );
}

export default function StatCounter() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
        {STATS.map((stat) =>
          stat.kind === "count" ? (
            <CountStat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ) : (
            <StaticStat key={stat.label} display={stat.display} label={stat.label} />
          )
        )}
      </div>
    </section>
  );
}
