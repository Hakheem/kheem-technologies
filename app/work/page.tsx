"use client";

import { useRef, useState } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { caseStudies, STATS } from "@/lib/data";

const EASE = [0.76, 0, 0.24, 1] as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: d } }),
};

const maskReveal: Variants = {
  hidden:  { y: "108%", rotate: 1.2 },
  visible: (d = 0) => ({ y: "0%", rotate: 0, transition: { duration: 1.05, ease: EASE, delay: d } }),
};

const ACCENT: Record<string, string> = {
  primary: "var(--color-primary)",
  violet:  "var(--color-brand-violet)",
  emerald: "var(--color-brand-emerald)",
};

const FILTERS = ["All", "Web", "Systems", "Mobile", "Brand"];

// ─── Project entry ─────────────────────────────────────────────────────────────
function ProjectEntry({
  study,
  index: i,
}: {
  study: (typeof caseStudies)[number];
  index: number;
}) {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const [hovered, setHovered] = useState(false);
  const accent   = ACCENT[study.accentColor] ?? ACCENT.primary;
  const isEven   = i % 2 === 0;

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
        style={{ background: `radial-gradient(ellipse at ${isEven ? "30%" : "70%"} 50%, color-mix(in srgb, ${accent} 5%, transparent), transparent 70%)` }}
        aria-hidden="true"
      />

      <div className={`relative z-10 flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-16 items-start`}>

        {/* ── Text side ────────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Meta row */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-[10px] font-bold tabular-nums text-muted-foreground/50 tracking-wider">
              {study.index}
            </span>
            <div className="w-px h-3 bg-border" aria-hidden="true" />
            <span
              className="text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border"
              style={{ color: accent, borderColor: `color-mix(in srgb, ${accent} 30%, var(--color-border))`, background: `color-mix(in srgb, ${accent} 7%, transparent)` }}
            >
              {study.type}
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

          {/* Problem → Solution → Result */}
          <div className="space-y-6 mb-8">

            {/* Problem */}
            <motion.div
              custom={0.12}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-px bg-destructive" aria-hidden="true" />
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-destructive">The Problem</span>
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{study.challenge}</p>
            </motion.div>

            {/* Visual connector */}
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
                <path d="M5 0 L5 9 M2 6 L5 9 L8 6" stroke="var(--color-border)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>

            {/* Approach */}
            <motion.div
              custom={0.20}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-px" style={{ background: accent }} aria-hidden="true" />
                <span className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>What We Built</span>
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{study.solution}</p>
            </motion.div>
          </div>

          {/* Result block */}
          <motion.div
            custom={0.26}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="p-5 rounded-xl border mb-7"
            style={{
              background:   `color-mix(in srgb, ${accent} 6%, var(--color-background))`,
              borderColor:  `color-mix(in srgb, ${accent} 22%, var(--color-border))`,
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5" style={{ color: `color-mix(in srgb, ${accent} 70%, var(--color-foreground))` }}>
              The Result
            </p>
            <p className="text-base font-bold" style={{ color: accent }}>{study.result}</p>
          </motion.div>

          {/* Tags + CTA */}
          <motion.div
            custom={0.30}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center gap-4 flex-wrap"
          >
            <div className="flex gap-1.5 flex-wrap">
              {study.tags.map((t) => (
                <span key={t} className="text-[9px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
            <Link
              href={study.href}
              className="group flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-opacity hover:opacity-60"
              style={{ color: accent }}
              aria-label={`View full case study for ${study.client}`}
            >
              Full case study
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* ── Image side ───────────────────────────────────────────────────── */}
        <motion.div
          custom={0.18}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="lg:w-[44%] shrink-0 w-full"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border aspect-[4/3] bg-muted shadow-xl shadow-foreground/6">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hovered ? 1.04 : 1 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Image
                src={study.image}
                alt={`${study.client} project screenshot`}
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover"
              />
            </motion.div>
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 12%, transparent) 0%, transparent 60%)` }}
              aria-hidden="true"
            />
            {/* Client badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/60">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} aria-hidden="true" />
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-foreground">{study.client}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WorkPage() {
  const heroRef      = useRef<HTMLDivElement>(null);
  const heroInView   = useInView(heroRef, { once: true });
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-36 pb-16 overflow-hidden">
        {/* Ambient */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--color-primary), transparent 68%)", opacity: 0.06, filter: "blur(24px)" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            custom={0} variants={fadeUp} initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-5 h-px bg-primary" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Our Work</span>
          </motion.div>

          <h1 className="title font-bold leading-[0.92] tracking-[-0.03em] mb-6">
            <div className="overflow-hidden pb-1">
              <motion.span custom={0.05} variants={maskReveal} initial="hidden" animate={heroInView ? "visible" : "hidden"}
                className="block text-[clamp(2.8rem,7vw,6.5rem)] text-foreground">
                Work that
              </motion.span>
            </div>
            <div className="overflow-hidden pb-1">
              <motion.span custom={0.15} variants={maskReveal} initial="hidden" animate={heroInView ? "visible" : "hidden"}
                className="block text-[clamp(2.8rem,7vw,6.5rem)] text-primary">
                delivers results.
              </motion.span>
            </div>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.p
              custom={0.25} variants={fadeUp} initial="hidden" animate={heroInView ? "visible" : "hidden"}
              className="text-[15px] text-muted-foreground leading-relaxed max-w-xl"
            >
              Every project here started with a specific problem.
              Here's what we built — and what changed.
            </motion.p>

            {/* Stats bar */}
            <motion.div
              custom={0.32} variants={fadeUp} initial="hidden" animate={heroInView ? "visible" : "hidden"}
              className="flex items-center gap-8 shrink-0"
            >
              {STATS.map((s, i) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="title text-2xl font-bold text-foreground tracking-tight">{s.value}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Filter bar ────────────────────────────────────────────────────── */}
      <div className="border-y border-border sticky top-[70px] bg-background/90 backdrop-blur-md z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center gap-0 overflow-x-auto" role="tablist" aria-label="Filter projects by type">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={activeFilter === f}
                onClick={() => setActiveFilter(f)}
                className={`relative shrink-0 px-5 py-4 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-200
                  ${activeFilter === f ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {f}
                {activeFilter === f && (
                  <motion.div
                    layoutId="filter-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ duration: 0.3, ease: EASE }}
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Project list ──────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Border top for first item */}
        <div className="h-px w-full bg-border" aria-hidden="true" />

        {caseStudies.map((study, i) => (
          <ProjectEntry key={study.index} study={study} index={i} />
        ))}
      </div>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">Next Steps</p>
              <h2 className="title text-[clamp(1.8rem,4vw,3rem)] font-bold text-foreground tracking-tight leading-tight">
                Working on something that needs<br />
                <span className="text-primary">this kind of thinking?</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link href="/quote">
                <Button
                  size="lg"
                  className="group relative h-13 px-8 rounded-full bg-primary text-primary-foreground font-bold text-sm overflow-hidden transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-primary/20"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start a Project
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <span className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" aria-hidden="true" />
                </Button>
              </Link>
              <Link
                href="/contact"
                className="group flex items-center gap-2.5 h-13 px-2 text-sm font-bold text-foreground transition-opacity hover:opacity-60"
              >
                Talk to us first
                <span className="block w-4 h-px bg-foreground transition-all duration-500 group-hover:w-8" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

