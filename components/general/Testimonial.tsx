"use client";

import { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Image from "next/image";
import { testimonials } from "@/lib/data";

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

const cardReveal: Variants = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: (d = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.75, ease: EASE, delay: d },
  }),
};

// ─── Single testimonial card ──────────────────────────────────────────────────
function TestimonialCard({
  item,
  delay,
  isInView,
  featured = false,
}: {
  item: (typeof testimonials)[number];
  delay: number;
  isInView: boolean;
  featured?: boolean;
}) {
  return (
    <motion.figure
      custom={delay}
      variants={cardReveal}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`
        group relative flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-7
        transition-shadow duration-500 hover:shadow-lg hover:shadow-foreground/5
        ${featured ? "md:col-span-2 md:flex-row md:gap-12 md:p-9" : ""}
      `}
    >
      {/* Quote mark */}
      <div
        className="absolute top-5 right-6 text-[56px] font-serif leading-none select-none pointer-events-none"
        style={{ color: "var(--color-primary)", opacity: 0.07 }}
        aria-hidden="true"
      >
        "
      </div>

      {/* Quote */}
      <blockquote className={`flex-1 ${featured ? "md:max-w-xl" : ""}`}>
        <p className={`leading-relaxed text-foreground font-medium ${featured ? "text-[15px] md:text-base" : "text-[15px]"}`}>
          "{item.quote}"
        </p>
      </blockquote>

      {/* Footer */}
      <figcaption className={`flex items-center gap-4 ${featured ? "md:flex-col md:items-start md:justify-end md:w-48 md:shrink-0" : ""}`}>

        {/* Avatar */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted border border-border shrink-0">
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            className="object-cover"
            onError={(e) => {
              // Initials fallback handled via CSS below
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Initials fallback */}
          <div
            className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-primary"
            style={{ background: "color-mix(in srgb, var(--color-primary) 10%, var(--color-muted))" }}
            aria-hidden="true"
          >
            {item.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
        </div>

        {/* Name + role + outcome */}
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-bold text-foreground leading-snug">{item.name}</span>
          <span className="text-[11px] text-muted-foreground leading-snug">{item.title}</span>
          {/* Outcome chip */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-emerald shrink-0" aria-hidden="true" />
            <span className="text-[10px] font-bold text-brand-emerald uppercase tracking-[0.12em]">
              {item.outcome}
            </span>
          </div>
        </div>

      </figcaption>
    </motion.figure>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  // First testimonial is featured (spans 2 cols), rest are standard
  const [featured, ...rest] = testimonials;

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden bg-background"
      aria-labelledby="testimonials-heading"
    >
      {/* Ambient glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, var(--color-primary), transparent 70%)",
          opacity: 0.04,
          filter: "blur(24px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-brand-violet), transparent 68%)",
          opacity: 0.05,
          filter: "blur(20px)",
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
                Client Voices
              </span>
            </motion.div>

            <h2 id="testimonials-heading" className="title font-bold leading-[1.0] tracking-[-0.03em] text-foreground">
              <div className="overflow-hidden pb-1">
                <motion.span
                  custom={0.05}
                  variants={maskReveal}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="block text-[clamp(2rem,4.5vw,3.8rem)]"
                >
                  Don't take
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
                  our word for it.
                </motion.span>
              </div>
            </h2>
          </div>

          {/* Aggregate trust signal */}
          <motion.div
            custom={0.25}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center gap-6 lg:flex-col lg:items-end lg:gap-3"
          >
            <div className="flex flex-col lg:items-end">
              <span className="title text-3xl font-bold text-foreground tracking-tight">100%</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Client retention rate</span>
            </div>
            <div className="w-px h-8 bg-border lg:hidden" aria-hidden="true" />
            <div className="flex flex-col lg:items-end">
              <span className="title text-3xl font-bold text-foreground tracking-tight">43+</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Projects shipped</span>
            </div>
          </motion.div>
        </div>

        {/* ── Testimonials grid ────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Client testimonials"
        >
          {/* Featured — spans 2 columns */}
          <div role="listitem" className="lg:col-span-2">
            <TestimonialCard
              item={featured}
              delay={0.1}
              isInView={isInView}
              featured
            />
          </div>

          {/* First standard card fills the third col on lg */}
          <div role="listitem">
            <TestimonialCard
              item={rest[0]}
              delay={0.2}
              isInView={isInView}
            />
          </div>

          {/* Remaining 4 fill a new row */}
          {rest.slice(1).map((item, i) => (
            <div key={item.index} role="listitem">
              <TestimonialCard
                item={item}
                delay={0.3 + i * 0.1}
                isInView={isInView}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


