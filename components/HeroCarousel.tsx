"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HeroContent, StatItem, HeroSlideContent } from "@/types";

// ---------------------------------------------------------------------------
// Internal slide shape used by the carousel renderer
// ---------------------------------------------------------------------------
interface Slide {
  badge: string;
  headingLine1: string;
  headingHighlight: string;
  headingLine2: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  heroImage: string;
  imageAlt: string;
  swatchColors: string[];
}

// Swatch palettes cycle through brand colours for each slide position
const SWATCH_PALETTES: string[][] = [
  ["#1565C0", "#F57C00", "#4CAF50"],
  ["#F57C00", "#1565C0", "#4CAF50"],
  ["#E91E63", "#1565C0", "#F57C00"],
  ["#4CAF50", "#E91E63", "#1565C0"],
  ["#1565C0", "#E91E63", "#F57C00"],
];

const DEFAULT_FALLBACK_SLIDES: HeroSlideContent[] = [
  {
    badge: "Mobilizing Changemakers",
    headingLine1: "Building",
    headingHighlight: "Stronger Nonprofits",
    headingLine2: "Together",
    description:
      "Our structured programs empower local organizations with dedicated, high-skilled volunteer talent to drive sustainable change.",
    primaryCta: { label: "Explore Services", href: "/services" },
    secondaryCta: { label: "Partner With Us", href: "/partner" },
    heroImage:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Volunteers collaborating on a community project",
  },
  {
    badge: "Transforming Communities",
    headingLine1: "Creating",
    headingHighlight: "Measurable Social",
    headingLine2: "Impact",
    description:
      "From mentorship to field outreach, our global network of volunteers is making a positive difference every single day.",
    primaryCta: { label: "Our Story", href: "/about" },
    secondaryCta: { label: "Become a Volunteer", href: "/volunteer" },
    heroImage:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Diverse team of volunteers in a group discussion",
  },
];

function buildSlides(content: HeroContent): Slide[] {
  const first: Slide = {
    badge: content.badge,
    headingLine1: content.headingLine1,
    headingHighlight: content.headingHighlight,
    headingLine2: content.headingLine2,
    description: content.description,
    primaryCta: content.primaryCta,
    secondaryCta: content.secondaryCta,
    heroImage: content.heroImage,
    imageAlt: "The Volunteer Nations team members smiling at a community event",
    swatchColors: SWATCH_PALETTES[0],
  };

  const rawExtras =
    content.extraSlides && content.extraSlides.length > 0
      ? content.extraSlides
      : DEFAULT_FALLBACK_SLIDES;

  const extras: Slide[] = rawExtras.map(
    (s: HeroSlideContent, i: number) => ({
      ...s,
      swatchColors: SWATCH_PALETTES[(i + 1) % SWATCH_PALETTES.length],
    })
  );

  return [first, ...extras];
}

// ---------------------------------------------------------------------------
const AUTO_SLIDE_MS = 5000;
const TRANSITION_MS = 700;

interface HeroCarouselProps {
  firstSlide: HeroContent;
  stats: StatItem[];
}

export default function HeroCarousel({ firstSlide, stats }: HeroCarouselProps) {
  const slides = buildSlides(firstSlide);
  const total = slides.length;

  const [current, setCurrent] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [tempPause, setTempPause] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tempPauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPausedRef = useRef(isPaused);
  const tempPauseRef = useRef(tempPause);
  const currentRef = useRef(current);
  const isAnimatingRef = useRef(isAnimating);

  // Keep refs in sync
  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { tempPauseRef.current = tempPause; }, [tempPause]);
  useEffect(() => { currentRef.current = current; }, [current]);
  useEffect(() => { isAnimatingRef.current = isAnimating; }, [isAnimating]);

  // Detect prefers-reduced-motion once on mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // -------------------------------------------------------------------------
  // Core navigation
  // -------------------------------------------------------------------------
  const goTo = useCallback(
    (targetIndex: number) => {
      if (isAnimatingRef.current) return;
      const target = ((targetIndex % total) + total) % total;
      if (target === currentRef.current) return;

      setLeaving(currentRef.current);
      setCurrent(target);
      setIsAnimating(true);

      setTimeout(() => {
        setLeaving(null);
        setIsAnimating(false);
      }, TRANSITION_MS + 50);
    },
    [total]
  );

  // Manual navigation helper — pauses auto-play temporarily so the user has time to view
  const triggerManualNav = useCallback(
    (targetIndex: number) => {
      goTo(targetIndex);

      setTempPause(true);
      if (tempPauseTimerRef.current) clearTimeout(tempPauseTimerRef.current);
      tempPauseTimerRef.current = setTimeout(() => {
        setTempPause(false);
      }, AUTO_SLIDE_MS);
    },
    [goTo]
  );

  // -------------------------------------------------------------------------
  // Auto-slide interval
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (total <= 1) return;

    intervalRef.current = setInterval(() => {
      if (!isPausedRef.current && !tempPauseRef.current && !isAnimatingRef.current) {
        goTo(currentRef.current + 1);
      }
    }, AUTO_SLIDE_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (tempPauseTimerRef.current) clearTimeout(tempPauseTimerRef.current);
    };
  }, [goTo, total]);

  // -------------------------------------------------------------------------
  // Touch / swipe
  // -------------------------------------------------------------------------
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy)) {
      triggerManualNav(dx < 0 ? currentRef.current + 1 : currentRef.current - 1);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

  // -------------------------------------------------------------------------
  // Crossfade class helper
  // -------------------------------------------------------------------------
  function slideClasses(i: number) {
    const isActive = i === current;
    const isLeaving = i === leaving;

    if (reducedMotion) {
      return isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none";
    }
    if (isActive) {
      return "opacity-100 z-10 scale-100 transition-[opacity,transform] duration-700 ease-out";
    }
    if (isLeaving) {
      return "opacity-0 z-0 pointer-events-none transition-[opacity,transform] duration-700 ease-out scale-[1.025]";
    }
    return "opacity-0 z-0 pointer-events-none";
  }

  const slide = slides[current];
  const swatches = slide.swatchColors;

  return (
    <section
      aria-label="Hero carousel"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "min(100svh, 780px)" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ================================================================== */}
      {/* SLIDE LAYERS                                                         */}
      {/* ================================================================== */}
      {slides.map((s, i) => (
        <div
          key={i}
          id={`hero-slide-${i}`}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${i + 1} of ${total}`}
          aria-hidden={i !== current}
          className={["absolute inset-0 w-full h-full", slideClasses(i)].join(" ")}
        >
          <Image
            src={s.heroImage}
            alt={s.imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
          />
          {/* Gradient overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: [
                "linear-gradient(to top, rgba(13,27,62,0.92) 0%, rgba(13,27,62,0.60) 38%, rgba(13,27,62,0.18) 68%, transparent 100%)",
                "linear-gradient(to right, rgba(13,27,62,0.55) 0%, transparent 55%)",
              ].join(", "),
            }}
          />
        </div>
      ))}

      {/* ================================================================== */}
      {/* CONTENT OVERLAY                                                      */}
      {/* ================================================================== */}
      <div
        className="relative z-20 flex flex-col justify-end"
        style={{ minHeight: "min(100svh, 780px)" }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 pb-10 lg:pb-14">

          {/* Text block */}
          <div className="max-w-2xl">
            {/* Colour swatch strip */}
            <div className="flex gap-1.5 mb-6" aria-hidden="true">
              {swatches.map((color, i) => (
                <span key={i} className="inline-block h-1 w-8 rounded-full" style={{ backgroundColor: color }} />
              ))}
            </div>

            {/* Heading */}
            <h1
              key={current} // re-mount on slide change to re-trigger the animation
              className={[
                "font-black uppercase leading-[1.0] tracking-tight text-white",
                "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl",
                reducedMotion ? "" : "animate-[fadeInUp_0.55s_ease-out_forwards]",
              ].join(" ")}
            >
              <span className="block">{slide.headingLine1}</span>
              <span className="block text-[#F57C00]">{slide.headingHighlight}</span>
              <span className="block">{slide.headingLine2}</span>
            </h1>

            {/* Description */}
            <p className="mt-5 text-base sm:text-lg leading-7 text-white/80 max-w-lg">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href={slide.primaryCta.href}
                className="inline-flex items-center px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ backgroundColor: "#F57C00" }}
              >
                {slide.primaryCta.label}
              </Link>
              {slide.secondaryCta?.label && (
                <Link
                  href={slide.secondaryCta.href}
                  className="inline-flex items-center px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={{ backgroundColor: "#1565C0" }}
                >
                  {slide.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>

          {/* Bottom bar: stats + controls */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-0">

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-10 flex-1">
              {stats.map((stat) => (
                <div key={stat.label} className="text-white">
                  <p className="text-3xl font-black leading-none">{stat.value}</p>
                  <p className="text-white/60 mt-1 text-xs uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Controls */}
            {total > 1 && (
              <div
                className="flex items-center gap-3 sm:ml-auto flex-shrink-0"
                role="group"
                aria-label="Carousel navigation"
              >
                {/* Prev */}
                <button
                  type="button"
                  aria-label="Previous slide"
                  disabled={isAnimating}
                  onClick={() => triggerManualNav(current - 1)}
                  className="w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white/15 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-30"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === current}
                      aria-label={`Go to slide ${i + 1}`}
                      aria-controls={`hero-slide-${i}`}
                      onClick={() => triggerManualNav(i)}
                      className={[
                        "relative overflow-hidden rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                        i === current ? "w-8 h-2.5 bg-white/30" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/65",
                      ].join(" ")}
                    >
                      {i === current && !isPaused && !tempPause && (
                        <span
                          key={`${current}-${isPaused}-${tempPause}`}
                          className="absolute inset-0 bg-white origin-left animate-[progress_5s_linear_forwards]"
                        />
                      )}
                      {i === current && (isPaused || tempPause) && (
                        <span className="absolute inset-0 bg-white" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Next */}
                <button
                  type="button"
                  aria-label="Next slide"
                  disabled={isAnimating}
                  onClick={() => triggerManualNav(current + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white/15 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-30"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Play / Pause */}
                <button
                  type="button"
                  aria-label={isPaused ? "Resume auto-play" : "Pause auto-play"}
                  onClick={() => setIsPaused((p) => !p)}
                  className="w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white/15 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {isPaused ? (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                      <path d="M2.5 1.5l9 5-9 5V1.5z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                      <rect x="1.5" y="1.5" width="3.5" height="10" rx="0.75" fill="currentColor" />
                      <rect x="8" y="1.5" width="3.5" height="10" rx="0.75" fill="currentColor" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Screen-reader live region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Slide ${current + 1} of ${total}`}
      </div>
    </section>
  );
}
