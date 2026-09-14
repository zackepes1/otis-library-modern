"use client";

// Auto-cycling single-card carousel with AnimatePresence slide transitions.
// Adapted from the original Aceternity UI horizontal-scroll shell — replaced
// with a paged approach because auto-play + scroll-snap wrapping is fragile;
// AnimatePresence gives us clean enter/exit without layout thrash.
import { useCallback, useEffect, useState } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";

interface CarouselProps {
  items: React.ReactElement[];
  initialScroll?: number;
  interval?: number;
}

const variants = {
  enter: (d: number) => ({ x: d > 0 ? "55%" : "-55%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? "-55%" : "55%", opacity: 0 }),
};

export const Carousel = ({ items, interval = 4500 }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const total = items.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setActiveIndex((prev) => (prev + dir + total) % total);
    },
    [total],
  );

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const id = setInterval(() => go(1), interval);
    return () => clearInterval(id);
  }, [isPaused, total, interval, go]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
            className="w-full"
          >
            {items[activeIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setDirection(i > activeIndex ? 1 : -1);
                setActiveIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-4 bg-brand"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to event ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            aria-label="Previous event"
          >
            <IconArrowNarrowLeft className="h-4 w-4 text-white" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            aria-label="Next event"
          >
            <IconArrowNarrowRight className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
