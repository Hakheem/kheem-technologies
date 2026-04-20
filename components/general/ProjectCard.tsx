"use client";

import { useRef, useState, useCallback } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

// ─── Constants ────────────────────────────────────────────────────────────────
const EASE = [0.76, 0, 0.24, 1] as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
};

const maskReveal: Variants = {
  hidden:  { y: "108%", rotate: 1.2 },
  visible: (d = 0) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1.05, ease: EASE, delay: d },
  }),
};

const ACCENT: Record<string, string> = {
  primary: "var(--color-primary)",
  violet:  "var(--color-brand-violet)",
  emerald: "var(--color-brand-emerald)",
};

// ─── Types ────────────────────────────────────────────────────────────────────
export type ProjectType = "redesign" | "standard";

export interface CaseStudy {
  /** Display index, e.g. "01" */
  index: string;
  /** Short label, e.g. "Web Application" */
  type_label: string;
  industry: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
  /** Path to the case-study page */
  href: string;
  /** Optional external live link */
  liveLink?: string;
  /** Key into ACCENT map: "primary" | "violet" | "emerald" */
  accentColor: string;
  /** "standard" = scrollable image(s) / carousel | "redesign" = before-after slider */
  projectType: ProjectType;
  /** Standard: one or more screenshots */
  images?: string[];
  /** Redesign: the "before" screenshot */
  beforeImage?: string;
  /** Redesign: the "after" screenshot */
  afterImage?: string;
}

// ─── Before / After Comparison Slider ─────────────────────────────────────────
function BeforeAfterSlider({
  before,
  after,
  accent,
  client,
}: {
  before: string;
  after: string;
  accent: string;
  client: string;
}) {
  const [position, setPosition] = useState(42);
  const containerRef = useRef<HTMLDivElement>(null);

  const clampedMove = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pct = Math.max(2, Math.min(98, ((clientX - left) / width) * 100));
    setPosition(pct);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none cursor-col-resize overflow-hidden"
      onMouseMove={(e) => clampedMove(e.clientX)}
      onTouchMove={(e) => clampedMove(e.touches[0].clientX)}
    >
      {/* AFTER image — full width baseline */}
      <div className="absolute inset-0">
        <Image
          src={after}
          alt={`${client} – after redesign`}
          fill
          sizes="(max-width: 1024px) 100vw, 44vw"
          className="object-cover object-top"
          draggable={false}
        />
      </div>

      {/* BEFORE image — clipped to left portion */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`${client} – before redesign`}
          fill
          sizes="(max-width: 1024px) 100vw, 44vw"
          className="object-cover object-top"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-10 w-[2px] -translate-x-1/2 pointer-events-none"
        style={{
          left: `${position}%`,
          background: "rgba(255,255,255,0.9)",
          boxShadow: "0 0 16px rgba(0,0,0,0.5)",
        }}
      >
        {/* Handle knob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-xl flex items-center justify-center border border-black/10">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M6 4.5L3 9L6 13.5M12 4.5L15 9L12 13.5"
              stroke="#111"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* BEFORE badge */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/70 text-white text-[9px] font-bold uppercase tracking-[0.18em] rounded-full backdrop-blur-sm">
          Before
        </span>
      </div>

      {/* AFTER badge */}
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-white text-[9px] font-bold uppercase tracking-[0.18em] rounded-full backdrop-blur-sm"
          style={{ background: `color-mix(in srgb, ${accent} 85%, black)` }}
        >
          After
        </span>
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="px-3 py-1 bg-background/80 text-[9px] font-bold uppercase tracking-widest border border-border/60 rounded-full backdrop-blur-sm whitespace-nowrap">
          Drag to compare
        </span>
      </div>
    </div>
  );
}

// ─── Standard Image Panel (scroll + optional carousel) ────────────────────────
function ImagePanel({
  images,
  headline,
  hovered,
}: {
  images: string[];
  headline: string;
  hovered: boolean;
}) {
  const isCarousel = images.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full h-full">
      {/* Carousel viewport (or single-slide wrapper) */}
      <div
        ref={isCarousel ? emblaRef : undefined}
        className="h-full overflow-hidden"
      >
        <div className={`${isCarousel ? "flex h-full" : "h-full"}`}>
          {images.map((src, i) => (
            <div
              key={i}
              className={`${
                isCarousel ? "flex-[0_0_100%] min-w-0" : ""
              } h-full overflow-y-auto scrollbar-hide`}
            >
              <motion.img
                src={src}
                alt={`${headline} screenshot ${i + 1}`}
                className="w-full h-auto block"
                animate={{ scale: hovered ? 1.015 : 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel navigation */}
      {isCarousel && (
        <>
          <button
            onClick={scrollPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/80 border border-border/80 hover:bg-primary hover:text-primary-foreground transition-all shadow-md opacity-40 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/80 border border-border/80 hover:bg-primary hover:text-primary-foreground transition-all shadow-md opacity-40 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 pointer-events-none">
            {images.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-white/60"
              />
            ))}
          </div>
        </>
      )}

      {/* Scroll / swipe hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="px-3 py-1 bg-background/80 text-[9px] font-bold uppercase tracking-widest border border-border/60 rounded-full backdrop-blur-sm whitespace-nowrap">
          {isCarousel ? "Swipe for more · Scroll to explore" : "Scroll to explore"}
        </span>
      </div>
    </div>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────
export function ProjectCard({
  study,
  index: i,
}: {
  study: CaseStudy;
  index: number;
}) {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const [hovered, setHovered] = useState(false);

  const accent = ACCENT[study.accentColor] ?? ACCENT.primary;
  const isEven = i % 2 === 0;

  return (
    <article
      ref={ref}
      className="relative border-b border-border py-16 md:py-20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ambient hover glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: `radial-gradient(ellipse at ${isEven ? "30%" : "70%"} 50%, color-mix(in srgb, ${accent} 5%, transparent), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 flex flex-col ${
          isEven ? "lg:flex-row" : "lg:flex-row-reverse"
        } gap-12 lg:gap-16 items-start`}
      >
        {/* ── TEXT SIDE ──────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Meta row */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center gap-4 mb-6 flex-wrap"
          >
            <span className="text-[10px] font-bold tabular-nums text-muted-foreground/50 tracking-wider">
              {study.index}
            </span>
            <div className="w-px h-3 bg-border" aria-hidden="true" />
            <span
              className="text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border"
              style={{
                color: accent,
                borderColor: `color-mix(in srgb, ${accent} 30%, var(--color-border))`,
                background: `color-mix(in srgb, ${accent} 7%, transparent)`,
              }}
            >
              {study.type_label}
            </span>
            <div className="w-px h-3 bg-border" aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {study.industry}
            </span>
          </motion.div>

          {/* Client name */}
          <div className="overflow-hidden mb-4">
            <motion.h2
              custom={0.06}
              variants={maskReveal}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="title text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight tracking-tight text-foreground"
            >
              {study.client}
            </motion.h2>
          </div>

          {/* Problem → Solution */}
          <div className="space-y-6 mb-8">
            <motion.div
              custom={0.12}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-px bg-destructive" aria-hidden="true" />
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-destructive">
                  The Problem
                </span>
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {study.challenge}
              </p>
            </motion.div>

            {/* Arrow connector */}
            <motion.div
              custom={0.16}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex items-center gap-3 pl-1"
              aria-hidden="true"
            >
              <div className="w-px h-6 bg-border" />
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path
                  d="M5 0 L5 9 M2 6 L5 9 L8 6"
                  stroke="var(--color-border)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            <motion.div
              custom={0.20}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-px" style={{ background: accent }} aria-hidden="true" />
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: accent }}
                >
                  What We Built
                </span>
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                {study.solution}
              </p>
            </motion.div>
          </div>

          {/* Result block */}
          <motion.div
            custom={0.26}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="p-5 rounded-xl border mb-8"
            style={{
              background: `color-mix(in srgb, ${accent} 6%, var(--color-background))`,
              borderColor: `color-mix(in srgb, ${accent} 22%, var(--color-border))`,
            }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5"
              style={{ color: `color-mix(in srgb, ${accent} 70%, var(--color-foreground))` }}
            >
              The Result
            </p>
            <p className="text-base font-bold" style={{ color: accent }}>
              {study.result}
            </p>
          </motion.div>

          {/* Tags */}
          <motion.div
            custom={0.30}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex gap-1.5 flex-wrap mb-6"
          >
            {study.tags.map((t) => (
              <span
                key={t}
                className="text-[9px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            custom={0.34}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center gap-3 flex-wrap"
          >
            {study.liveLink && (
              <a
                href={study.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-[11px] font-bold uppercase tracking-[0.12em] hover:opacity-90 active:scale-95 transition-all shadow-md shadow-primary/20"
              >
                Live Preview
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
            )}

            <Link
              href={study.href}
              className="group inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-[11px] font-bold uppercase tracking-[0.12em] text-foreground hover:bg-muted active:scale-95 transition-all"
              aria-label={`Full case study for ${study.client}`}
            >
              Case Study
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>

        {/* ── IMAGE SIDE ─────────────────────────────────────────────── */}
        <motion.div
          custom={0.18}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="lg:w-[44%] shrink-0 w-full"
        >
          {/* 
            Height: redesign uses object-cover so we lock aspect ratio.
            Standard uses internal scroll so we cap the height.
          */}
          <div
            className={`relative rounded-2xl overflow-hidden border border-border shadow-xl shadow-foreground/6 bg-muted ${
              study.projectType === "redesign"
                ? "aspect-[4/3]"
                : "h-[460px]"
            }`}
          >
            {study.projectType === "redesign" &&
            study.beforeImage &&
            study.afterImage ? (
              <BeforeAfterSlider
                before={study.beforeImage}
                after={study.afterImage}
                accent={accent}
                client={study.client}
              />
            ) : (
              <ImagePanel
                images={study.images ?? []}
                headline={study.client}
                hovered={hovered}
              />
            )}

            {/* Client badge — bottom-left, above the hint/dots */}
            <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/60">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: accent }}
                aria-hidden="true"
              />
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-foreground">
                {study.client}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
