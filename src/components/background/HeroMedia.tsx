"use client";

/**
 * HeroMedia — an optional photo/video backdrop for a section (e.g. the hero).
 *
 * Renders behind its parent's content (absolute, -z-[5]) and above the global
 * DottedGlowBackground (-z-10), so the two can layer: e.g. a real photo of
 * the library with a dark gradient scrim for text legibility, while the
 * ambient dotted-glow still shows in the surrounding page chrome.
 *
 * Pass either `image` (a static photo) or `video` (looping muted background
 * video) — if neither is provided this renders nothing, so it's safe to drop
 * into a section ahead of having real assets.
 */
export default function HeroMedia({
  image,
  video,
  alt = "",
  overlayClassName = "bg-gradient-to-b from-ink/70 via-ink/60 to-ink",
  className = "",
}: {
  image?: string;
  video?: string;
  alt?: string;
  /** Tailwind classes for the scrim overlay drawn on top of the media, for text contrast. */
  overlayClassName?: string;
  className?: string;
}) {
  if (!image && !video) return null;

  return (
    <div
      aria-hidden={alt === ""}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      className={`pointer-events-none absolute inset-0 -z-[5] overflow-hidden ${className}`}
    >
      {video ? (
        <video
          className="h-full w-full object-cover"
          src={video}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- decorative background photo, not a Next-optimized content image
        <img src={image} alt="" className="h-full w-full object-cover" />
      )}
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  );
}
