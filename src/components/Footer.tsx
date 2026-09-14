"use client";

import Link from "next/link";
import { navLinks } from "@/lib/site-data";
import { LogoImage } from "@/components/Logo";
import { useLang } from "@/components/providers/LanguageProvider";
import { useSiteInfo } from "@/components/providers/SiteInfoProvider";
import type { TranslationKey } from "@/lib/translations";

export default function Footer() {
  const { t } = useLang();
  const { hours, address, phone, email } = useSiteInfo();

  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          {/* Seal only here (no wordmark) — the footer already sits below a
              page full of "Otis Library" text, so just the mark keeps this
              column compact; address/contact sit beside it on the same
              line instead of stacked below a full logo lockup. */}
          <div className="flex flex-col gap-3">
            <LogoImage className="h-10 sm:h-12" />
            <p className="text-sm text-slate-400">
              {address}
              <br />
              {phone}
              <br />
              <a href={`mailto:${email}`} className="hover:text-brand">
                {email}
              </a>
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {t("footer.quickLinks")}
          </h3>
          <ul className="mt-3 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-slate-400 hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {t("footer.hours")}
          </h3>
          <ul className="mt-3 space-y-1 text-sm text-slate-400">
            {hours.map((h) => {
              const dayKey = `days.${h.day.toLowerCase()}` as TranslationKey;
              return (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{t(dayKey)}</span>
                  <span>{h.time}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {t("footer.copyright")}
      </div>
    </footer>
  );
}
