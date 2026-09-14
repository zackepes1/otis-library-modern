"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconHome } from "@tabler/icons-react";
import { getHoursStatus, type HoursStatus } from "@/lib/hours-status";
import { useSiteInfo } from "@/components/providers/SiteInfoProvider";
import { LogoImage } from "@/components/Logo";
import SidebarNav from "@/components/SidebarNav";
import HeaderCatalogSearch from "@/components/catalog/HeaderCatalogSearch";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LangToggle } from "@/components/ui/LangToggle";
import { useLang } from "@/components/providers/LanguageProvider";
import { MegaNav } from "@/components/nav/MegaNav";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [hoursStatus, setHoursStatus] = useState<HoursStatus | null>(null);
  const pathname = usePathname();
  const { lang, t } = useLang();
  const { hours } = useSiteInfo();

  useEffect(() => {
    // Depends on the current time and language, so it must be computed
    // client-side — rendering during SSR could mismatch the client's clock.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHoursStatus(getHoursStatus(hours, new Date(), lang));
  }, [hours, lang]);

  return (
    <header className="sticky top-0 z-30 border-b-2 border-brand/40 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-4 sm:flex-nowrap sm:gap-4 sm:px-6 sm:py-6">
        <button
          type="button"
          onClick={() => setNavOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={navOpen}
          aria-label={t("nav.openMenu")}
          className="lg:hidden flex shrink-0 items-center gap-2 rounded-md border border-white/20 px-3 py-3 text-sm font-semibold text-white transition hover:border-brand hover:text-brand"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Quick "back to home" — lives in the always-visible sticky header
            (rather than scrolling away with page content) so it's reachable
            from any subpage without opening the full side nav. Hidden (but
            still rendered, taking up the same space) on the homepage itself
            — toggling this via `display: none` would shift the logo/wordmark
            left by this button's width every time the route changes, so it
            stays in the layout and is just made invisible/non-interactive
            instead. */}
        <Link
          href="/"
          aria-label={t("nav.backToHome")}
          title={t("nav.backToHome")}
          aria-hidden={pathname === "/"}
          tabIndex={pathname === "/" ? -1 : 0}
          className={`flex shrink-0 items-center gap-2 rounded-md border border-white/20 px-3 py-3 text-sm font-semibold text-white transition hover:border-brand hover:text-brand ${
            pathname === "/" ? "invisible" : ""
          }`}
        >
          <IconHome size={20} stroke={2} />
        </Link>

        <div className="flex min-w-0 shrink-0">
          <Link href="/" aria-label="Otis Library home">
            <LogoImage className="h-14 w-auto sm:h-16" />
          </Link>
        </div>

        {/* Search wraps to its own full-width row below the logo on narrow
            screens (flex-wrap on the header row) instead of squeezing into
            an unreadably narrow box next to the logo. */}
        <div className="order-last flex w-full min-w-0 flex-col items-end gap-3 sm:order-none sm:w-auto sm:flex-1">
          <div className="flex items-center gap-2 sm:gap-4">
            <HeaderCatalogSearch />
            <LangToggle />
            <ThemeToggle />
          </div>
          <Link
            href="/hours-parking"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-brand"
          >
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                hoursStatus?.isOpen ? "bg-emerald-400" : "bg-slate-500"
              }`}
              aria-hidden
            />
            {hoursStatus?.label ?? t("nav.hours")}
          </Link>
        </div>
      </div>

      {/* Mega nav — desktop only, second row below logo/search */}
      <div className="hidden lg:block border-t border-white/[0.07]">
        <div className="mx-auto max-w-6xl px-6">
          <MegaNav />
        </div>
      </div>

      <SidebarNav open={navOpen} onClose={() => setNavOpen(false)} />
    </header>
  );
}
