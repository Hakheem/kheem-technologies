"use client";

import { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import { processSteps } from "@/lib/data";

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

// ─── Individual step — has its own InView trigger ────────────────────────────
function ProcessStep({
  step,
  isLast,
}: {
  step: (typeof processSteps)[number];
  isLast: boolean;
}) {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-8">

      {/* ── Left column: number + connector line ── */}
      <div className="flex flex-col items-center shrink-0">

        {/* Step circle */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative flex items-center justify-center w-11 h-11 rounded-full border-2 border-primary bg-background z-10 shrink-0"
        >
          {/* Pulse ring */}
          <motion.span
            className="absolute inset-0 rounded-full border border-primary"
            animate={isInView ? { scale: [1, 1.6], opacity: [0.5, 0] } : {}}
            transition={{ duration: 1.2, delay: 0.4, repeat: 1 }}
            aria-hidden="true"
          />
          <span className="text-[11px] font-bold tabular-nums text-primary tracking-tight">
            {step.step}
          </span>
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <div className="relative w-px flex-1 mt-2 overflow-hidden bg-border min-h-[60px]">
            <motion.div
              className="absolute top-0 left-0 w-full bg-primary"
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {/* ── Right column: content ── */}
      <div className="pb-12 flex-1 min-w-0 pt-1.5">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
        >
          {/* Step label */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-primary">
              Step {step.step}
            </span>
            <div className="h-px flex-1 max-w-[32px] bg-border" aria-hidden="true" />
          </div>

          {/* Title */}
          <h3 className="title text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3 leading-snug">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-[15px] text-muted-foreground leading-relaxed mb-5 max-w-xl">
            {step.description}
          </p>

          {/* Duration + output chips */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" aria-hidden="true" />
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.12em]">
                {step.duration}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-[10px] font-semibold text-primary uppercase tracking-[0.12em]">
                {step.output}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ProcessSection() {
  const headerRef      = useRef<HTMLDivElement>(null);
  const headerInView   = useInView(headerRef, { once: true, margin: "-10%" });

  return (
    <section
      className="relative py-28 overflow-hidden bg-background"
      aria-labelledby="process-heading"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.028,
        }}
        aria-hidden="true"
      />

      {/* Ambient glow — bottom left */}
      <div
        className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-primary), transparent 68%)",
          opacity: 0.055,
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div>
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? "visible" : "hidden"}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-5 h-px bg-primary" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                How We Work
              </span>
            </motion.div>

            <h2 id="process-heading" className="title font-bold leading-[1.0] tracking-[-0.03em] text-foreground">
              <div className="overflow-hidden pb-1">
                <motion.span
                  custom={0.05}
                  variants={maskReveal}
                  initial="hidden"
                  animate={headerInView ? "visible" : "hidden"}
                  className="block text-[clamp(2rem,4.5vw,3.8rem)]"
                >
                  No surprises.
                </motion.span>
              </div>
              <div className="overflow-hidden pb-1">
                <motion.span
                  custom={0.15}
                  variants={maskReveal}
                  initial="hidden"
                  animate={headerInView ? "visible" : "hidden"}
                  className="block text-[clamp(2rem,4.5vw,3.8rem)] text-primary"
                >
                  No guesswork.
                </motion.span>
              </div>
            </h2>
          </div>

          <motion.p
            custom={0.25}
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="text-[15px] text-muted-foreground leading-relaxed max-w-md lg:text-right"
          >
            Every project follows the same five-stage process —
            so you always know where you are, what's next,
            and what you'll walk away with.
          </motion.p>
        </div>

        {/* ── Two-column layout: steps left, sticky summary right ─────────── */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          {/* Steps - left column */}
          <div className="flex-1 min-w-0" role="list" aria-label="Project process steps">
            {processSteps.map((step, i) => (
              <div key={step.step} role="listitem">
                <ProcessStep
                  step={step}
                  isLast={i === processSteps.length - 1}
                />
              </div>
            ))}
          </div>

          {/* Sticky side panel - right column */}
          <div className="lg:w-80 shrink-0 lg:self-start">
            <div className="lg:sticky lg:top-28">
              <motion.div
                custom={0.35}
                variants={fadeUp}
                initial="hidden"
                animate={headerInView ? "visible" : "hidden"}
                className="rounded-2xl border border-border bg-card p-7"
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary block mb-4">
                  What to Expect
                </span>
                <div className="space-y-4">
                  {[
                    { label: "Avg. project timeline", val: "3–10 weeks" },
                    { label: "Check-ins",             val: "Weekly"     },
                    { label: "Revisions included",    val: "Unlimited"  },
                    { label: "Handover docs",         val: "Always"     },
                    { label: "Post-launch support",   val: "30 days"    },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-sm gap-4">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-bold text-foreground text-right">{row.val}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Timelines vary by project scope. We give you a fixed quote and a realistic timeline before anything starts — and we stick to both.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

