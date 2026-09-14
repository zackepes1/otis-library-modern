"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Command } from "cmdk";

const PAGES = [
  { label: "Home", href: "/" },
  { label: "Events & Programs", href: "/events" },
  { label: "Digital Collection", href: "/digital-collection" },
  { label: "Hours & Parking", href: "/hours-parking" },
  { label: "Services", href: "/services" },
  { label: "Meeting Spaces", href: "/services/meeting-spaces" },
  { label: "Children's Library", href: "/childrens" },
  { label: "Young Adult", href: "/young-adult" },
  { label: "Local History", href: "/local-history" },
  { label: "Library of Things", href: "/library-of-things" },
  { label: "Museum Passes", href: "/passes" },
  { label: "Community Resources", href: "/community-resources" },
  { label: "Media Literacy", href: "/media-literacy" },
  { label: "On Exhibit", href: "/on-exhibit" },
  { label: "About Otis Library", href: "/about" },
  { label: "175 Years of Service", href: "/175-years-of-service" },
  { label: "Library Board", href: "/library-board" },
  { label: "Support & Donate", href: "/support" },
  { label: "Donate Now", href: "/donate" },
  { label: "Newsletter Sign-Up", href: "/newsletter" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Friends of the Library", href: "/friends" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Job Openings", href: "/job-openings" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handle(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    function handleCustom() {
      setOpen(true);
    }
    window.addEventListener("keydown", handle);
    window.addEventListener("open-command-palette", handleCustom);
    return () => {
      window.removeEventListener("keydown", handle);
      window.removeEventListener("open-command-palette", handleCustom);
    };
  }, []);

  function navigate(href: string) {
    router.push(href);
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cmd-overlay"
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Palette */}
          <motion.div
            key="cmd-panel"
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#121a2e] shadow-2xl"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <Command>
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <svg
                  className="h-4 w-4 shrink-0 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <Command.Input
                  placeholder="Search pages…"
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                />
                <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 sm:block">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-80 overflow-y-auto py-2">
                <Command.Empty className="py-8 text-center text-sm text-slate-500">
                  No results found.
                </Command.Empty>
                <Command.Group
                  heading="Navigate"
                  className="px-2 pb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wide [&_[cmdk-group-heading]]:text-slate-500"
                >
                  {PAGES.map((page) => (
                    <Command.Item
                      key={page.href}
                      value={page.label}
                      onSelect={() => navigate(page.href)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition-colors aria-selected:bg-brand/10 aria-selected:text-brand"
                    >
                      <svg
                        className="h-3.5 w-3.5 shrink-0 text-slate-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                      {page.label}
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
