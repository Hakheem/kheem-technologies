"use client";

import { useRef, useState } from "react";
import { motion, Variants, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/data";

// ─── Animation presets ────────────────────────────────────────────────────────
const EASE = [0.76, 0, 0.24, 1] as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
};

const maskReveal: Variants = {
  hidden:  { y: "108%", rotate: 1 },
  visible: (d = 0) => ({
    y: "0%", rotate: 0,
    transition: { duration: 1, ease: EASE, delay: d },
  }),
};

const ACCENT: Record<string, string> = {
  primary: "var(--color-primary)",
  violet:  "var(--color-brand-violet)",
  emerald: "var(--color-brand-emerald)",
};

// ─── Case study card ──────────────────────────────────────────────────────────
function CaseCard({
  study,
  delay,
  isInView,
}: {
  study: (typeof caseStudies)[number];
  delay: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT[study.accentColor] ?? ACCENT.primary;

  return (
    <motion.article
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-shadow duration-500 hover:shadow-xl hover:shadow-foreground/6"
    >
      {/* ── Image ──────────────────────────────────────────────────────────── */}
      <div className="relative h-52 bg-muted overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Image
            src={study.image}
            alt={`${study.client} project preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
            onError={(e) => {
              // Fallback to a placeholder block if image missing
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </motion.div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, color-mix(in srgb, ${accent} 18%, var(--color-card)) 0%, transparent 55%)`,
          }}
          aria-hidden="true"
        />

        {/* Project type tag — top left */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border/60">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} aria-hidden="true" />
          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-foreground">
            {study.type}
          </span>
        </div>

        {/* Index — top right */}
        <div className="absolute top-4 right-4 text-[10px] font-bold tabular-nums text-foreground/30 tracking-wider">
          {study.index}
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-6">

        {/* Client + industry */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <h3 className="title text-xl font-bold text-foreground tracking-tight leading-snug">
              {study.client}
            </h3>
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {study.industry}
            </span>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1 justify-end">
            {study.tags.map((t) => (
              <span
                key={t}
                className="text-[8px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Challenge → solution flow */}
        <div className="space-y-4 flex-1">
          {/* Challenge */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-3 h-px bg-destructive" aria-hidden="true" />
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-destructive">
                The Problem
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {study.challenge}
            </p>
          </div>

          {/* Divider with arrow */}
          <div className="flex items-center gap-3 pl-1" aria-hidden="true">
            <div className="w-px h-6 bg-border" />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 0 L5 8 M2 5 L5 8 L8 5" stroke="var(--color-border)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Solution */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-3 h-px" style={{ background: accent }} aria-hidden="true" />
              <span
                className="text-[9px] font-bold uppercase tracking-[0.18em]"
                style={{ color: accent }}
              >
                What We Built
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {study.solution}
            </p>
          </div>
        </div>

        {/* Result callout */}
        <div
          className="mt-5 px-4 py-3 rounded-xl border"
          style={{
            background:  `color-mix(in srgb, ${accent} 6%, var(--color-background))`,
            borderColor: `color-mix(in srgb, ${accent} 22%, var(--color-border))`,
          }}
        >
          <p
            className="text-[13px] font-bold leading-snug"
            style={{ color: accent }}
          >
            {study.result}
          </p>
        </div>

        {/* CTA */}
        <Link
          href={study.href}
          className="group/link mt-5 flex items-center gap-2 w-fit transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          aria-label={`View full case study for ${study.client}`}
        >
          <span
            className="text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            View Case Study
          </span>
          <ArrowUpRight
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            style={{ color: accent }}
            aria-hidden="true"
          />
        </Link>
      </div>

      {/* Bottom accent line — expands on hover */}
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: accent }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function WorkSection() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden bg-background"
      aria-labelledby="work-heading"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 -right-48 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-brand-emerald), transparent 68%)",
          opacity: 0.045,
          filter: "blur(24px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-5 h-px bg-primary" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Our Work
              </span>
            </motion.div>

            <h2 id="work-heading" className="title font-bold leading-[1.0] tracking-[-0.03em] text-foreground">
              <div className="overflow-hidden pb-1">
                <motion.span
                  custom={0.05}
                  variants={maskReveal}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="block text-[clamp(2rem,4.5vw,3.8rem)]"
                >
                  Real problems.
                </motion.span>
              </div>
              <div className="overflow-hidden pb-1">
                <motion.span
                  custom={0.15}
                  variants={maskReveal}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="block text-[clamp(2rem,4.5vw,3.8rem)] text-primary"
                >
                  Measurable results.
                </motion.span>
              </div>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end gap-4 lg:gap-3">
            <motion.p
              custom={0.25}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-[15px] text-muted-foreground leading-relaxed max-w-sm lg:text-right"
            >
              Every project below started with a specific problem.
              Here's what we built — and what changed.
            </motion.p>
            <motion.div
              custom={0.32}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Link
                href="/work"
                className="group flex items-center gap-2.5 text-sm font-bold text-foreground transition-opacity hover:opacity-60 lg:self-end shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                See all projects
                <span className="block w-4 h-px bg-foreground transition-all duration-500 group-hover:w-8" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Case study grid ──────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label="Case studies"
        >
          {caseStudies.map((study, i) => (
            <div key={study.index} role="listitem">
              <CaseCard
                study={study}
                delay={0.1 + i * 0.1}
                isInView={isInView}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

