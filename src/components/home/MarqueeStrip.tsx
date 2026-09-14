const ITEMS = [
  "Norwich, CT",
  "Est. 1850",
  "Free for Everyone",
  "Fine-Free Since 2022",
  "24/7 Digital Access",
  "Open 7 Days a Week",
  "175 Years of Service",
  "Free Library Cards",
  "Community Resource Hub",
  "261 Main Street",
];

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="overflow-hidden border-y border-white/[0.07] bg-white/[0.02] py-2.5">
      <div className="flex w-max animate-marquee" aria-hidden>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 px-8 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500"
          >
            {item}
            <span className="text-brand/40">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
