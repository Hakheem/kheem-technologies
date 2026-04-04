"use client";

import { useRef, useState } from "react";
import { motion, Variants, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { services } from "@/lib/data";

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

// ─── Accent color map ─────────────────────────────────────────────────────────
const ACCENT: Record<string, string> = {
  primary: "var(--color-primary)",
  violet:  "var(--color-brand-violet)",
  emerald: "var(--color-brand-emerald)",
};

// ─── Row component ────────────────────────────────────────────────────────────
function ServiceRow({
  service,
  delay,
  isInView,
}: {
  service: (typeof services)[number];
  delay: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT[service.accent] ?? ACCENT.primary;

  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Link
        href={service.href}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`Learn more about ${service.title}`}
      >
        {/* Top border */}
        <div className="relative h-px w-full bg-border overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 h-full"
            style={{ background: accent }}
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: EASE }}
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-0 py-7 md:py-8">

          {/* Index + tag */}
          <div className="md:w-40 shrink-0 flex md:flex-col gap-3 md:gap-1.5">
            <span
              className="text-[10px] font-bold tabular-nums tracking-[0.14em] transition-colors duration-300"
              style={{ color: hovered ? accent : "var(--color-muted-foreground)" }}
            >
              {service.index}
            </span>
            <span
              className="text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border transition-all duration-300 w-fit"
              style={{
                color:            hovered ? accent : "var(--color-muted-foreground)",
                borderColor:      hovered ? accent : "var(--color-border)",
                backgroundColor:  hovered ? `color-mix(in srgb, ${accent} 8%, transparent)` : "transparent",
              }}
            >
              {service.tag}
            </span>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-12">

            {/* Title + description */}
            <div className="flex-1 max-w-xl">
              <h3
                className="title text-xl md:text-2xl font-bold leading-snug tracking-tight mb-3 transition-colors duration-300"
                style={{ color: hovered ? accent : "var(--color-foreground)" }}
              >
                {service.title}
              </h3>
              <motion.p
                className="text-sm text-muted-foreground leading-relaxed"
                animate={{ opacity: hovered ? 1 : 0.65 }}
                transition={{ duration: 0.3 }}
              >
                {service.description}
              </motion.p>
            </div>

            {/* Deliverables + arrow */}
            <div className="md:w-52 shrink-0 flex flex-col gap-3">
              {/* Deliverables — appear on hover */}
              <motion.div
                className="flex flex-wrap gap-1.5"
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {service.deliverables.map((d) => (
                  <span
                    key={d}
                    className="text-[9px] font-semibold uppercase tracking-[0.12em] px-2 py-1 rounded-md bg-muted text-muted-foreground"
                  >
                    {d}
                  </span>
                ))}
              </motion.div>

              {/* Arrow link */}
              <div className="flex items-center gap-2 mt-auto">
                <motion.span
                  className="text-[10px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: accent }}
                  animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
                  transition={{ duration: 0.3 }}
                >
                  Explore
                </motion.span>
                <motion.div
                  animate={{
                    opacity: hovered ? 1 : 0,
                    rotate: hovered ? 0 : -45,
                    scale:  hovered ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight
                    className="w-4 h-4"
                    style={{ color: accent }}
                    aria-hidden="true"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ServicesSection() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden bg-background"
      aria-labelledby="services-heading"
    >
      {/* Ambient glow — top right */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-brand-violet), transparent 68%)",
          opacity: 0.05,
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">

        {/* ── Header ───────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
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
                What We Do
              </span>
            </motion.div>

            <h2 id="services-heading" className="title font-bold leading-[1.0] tracking-[-0.03em] text-foreground">
              <div className="overflow-hidden pb-1">
                <motion.span
                  custom={0.05}
                  variants={maskReveal}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="block text-[clamp(2rem,4.5vw,3.8rem)]"
                >
                  One team.
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
                  Every capability.
                </motion.span>
              </div>
            </h2>
          </div>

          <motion.p
            custom={0.25}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-[15px] text-muted-foreground leading-relaxed max-w-sm lg:text-right"
          >
            We don't sub out or stitch together freelancers.
            Strategy, design, engineering, and brand — in-house,
            start to finish.
          </motion.p>
        </div>

        {/* ── Service rows ──────────────────────────────────────────────────── */}
        <div role="list" aria-label="Services offered">
          {services.map((service, i) => (
            <div key={service.index} role="listitem">
              <ServiceRow
                service={service}
                delay={0.1 + i * 0.07}
                isInView={isInView}
              />
            </div>
          ))}
          {/* Final bottom border */}
          <div className="h-px w-full bg-border" aria-hidden="true" />
        </div>

        {/* ── Footer note ────────────────────────────────────────────────────── */}
        <motion.div
          custom={0.6}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            Not sure which service fits your situation?{" "}
            <Link
              href="/quote"
              className="text-primary font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              Tell us what you need
            </Link>{" "}
            and we'll figure it out together.
          </p>
          <Link
            href="/services"
            className="group flex items-center gap-2.5 text-sm font-bold text-foreground transition-opacity hover:opacity-60 shrink-0"
          >
            See full service details
            <span className="block w-4 h-px bg-foreground transition-all duration-500 group-hover:w-8" aria-hidden="true" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

