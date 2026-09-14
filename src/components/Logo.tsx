import Image from "next/image";
import type { ReactNode } from "react";
// LogoImage uses a plain <img> for the SVG; Image is used by LogoSeal below.

/** Full horizontal wordmark — vector SVG, no pixel rounding artefacts.
 *  Pass `className` to control size; defaults to header size. */
export function LogoImage({ className = "h-16 w-auto sm:h-20" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/otis-logo.svg"
      alt="Otis Library, Norwich CT"
      className={`otis-logo ${className}`}
    />
  );
}

const sizes = {
  md: {
    seal: "h-12 w-12 sm:h-14 sm:w-14",
    title: "text-lg sm:text-xl",
    sub: "text-xs sm:text-sm",
  },
  lg: {
    seal: "h-20 w-20 sm:h-28 sm:w-28",
    title: "text-2xl sm:text-3xl",
    sub: "text-base sm:text-lg",
  },
} as const;

export function LogoSeal({
  className,
  size = "md",
}: {
  className?: string;
  size?: keyof typeof sizes;
}) {
  const s = sizes[size];
  return (
    <Image
      src="/images/otis-seal.png"
      alt="Otis Library, Norwich CT — Est. 1850"
      width={224}
      height={224}
      priority
      className={`${s.seal} shrink-0 ${className ?? ""}`}
    />
  );
}

export function LogoWordmark({
  className,
  size = "md",
}: {
  className?: string;
  size?: keyof typeof sizes;
}) {
  const s = sizes[size];
  return (
    <span className={`font-serif ${s.title} font-black uppercase tracking-tight whitespace-nowrap text-white ${className ?? ""}`}>
      Otis <span className={`${s.sub} text-brand`}>Library</span>
    </span>
  );
}

export function Logo({
  className,
  size = "md",
  subtitle,
}: {
  className?: string;
  size?: keyof typeof sizes;
  /** Optional line rendered below the wordmark (e.g. the library's address). */
  subtitle?: ReactNode;
}) {
  return (
    <span className={`inline-flex items-center gap-3 sm:gap-4 ${className ?? ""}`}>
      <LogoSeal size={size} />
      <span className="flex flex-col">
        <LogoWordmark size={size} />
        {subtitle}
      </span>
    </span>
  );
}
