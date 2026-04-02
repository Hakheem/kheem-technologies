"use client";

import { useRef } from "react";
import { motion, Variants, useInView, useReducedMotion } from "framer-motion";
import { Zap, Layers, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  hidden:  { opacity: 0, y: 32, scale: 0.97 },
  visible: (d = 0) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.75, ease: EASE, delay: d },
  }),
};

// ─── Mini animated graphics ───────────────────────────────────────────────────

/** Rising bar chart for card 1 — Performance */
function PerformanceGraphic({ active }: { active: boolean }) {
  const bars = [
    { x: 14, h: 28, col: "var(--color-primary)",       delay: 0.1 },
    { x: 34, h: 42, col: "var(--color-primary)",       delay: 0.2 },
    { x: 54, h: 36, col: "var(--color-brand-violet)",  delay: 0.3 },
    { x: 74, h: 56, col: "var(--color-primary)",       delay: 0.4 },
    { x: 94, h: 64, col: "var(--color-brand-emerald)", delay: 0.5 },
  ];
  const BASE = 76;
  return (
    <svg viewBox="0 0 120 88" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Baseline */}
      <line x1="8" y1={BASE} x2="112" y2={BASE} stroke="var(--color-border)" strokeWidth="1" />
      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x} y={BASE} width="16" rx="3"
          fill={b.col} fillOpacity={0.7}
          animate={active ? { y: BASE - b.h, height: b.h } : { y: BASE, height: 0 }}
          transition={{ duration: 0.9, delay: b.delay, ease: EASE }}
        />
      ))}
      {/* Trend line */}
      <motion.polyline
        points="22,52 42,38 62,44 82,24 102,16"
        stroke="var(--color-brand-emerald)" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" fill="none"
        strokeDasharray="120"
        initial={{ strokeDashoffset: 120 }}
        animate={active ? { strokeDashoffset: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
      />
      {/* End dot */}
      <motion.circle
        cx="102" cy="16" r="3.5"
        fill="var(--color-brand-emerald)"
        initial={{ opacity: 0, scale: 0 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 2.0, duration: 0.4 }}
      />
    </svg>
  );
}

/** Brand blocks snapping into alignment for card 2 */
function BrandAlignGraphic({ active }: { active: boolean }) {
  const blocks = [
    { startX: -18, y: 20, w: 52, h: 12, rx: 6, col: "var(--color-primary)", targetX: 34 },
    { startX: 22,  y: 38, w: 68, h: 12, rx: 6, col: "var(--color-brand-violet)", targetX: 26 },
    { startX: -8,  y: 56, w: 58, h: 12, rx: 6, col: "var(--color-brand-emerald)", targetX: 31 },
  ];
  return (
    <svg viewBox="0 0 120 88" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Alignment guide */}
      <motion.line
        x1="34" y1="12" x2="34" y2="76"
        stroke="var(--color-primary)" strokeOpacity={0.25} strokeWidth="1"
        strokeDasharray="3 3"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      />
      {blocks.map((b, i) => (
        <motion.rect
          key={i}
          x={b.startX} y={b.y} width={b.w} height={b.h} rx={b.rx}
          fill={b.col} fillOpacity={0.5}
          animate={active ? { x: b.targetX - b.startX } : { x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}
      {/* Checkmark */}
      <motion.path
        d="M94 40 L100 47 L110 34"
        stroke="var(--color-brand-emerald)" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" fill="none"
        strokeDasharray="30"
        initial={{ strokeDashoffset: 30 }}
        animate={active ? { strokeDashoffset: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.0 }}
      />
    </svg>
  );
}

/** Conversion funnel filling up for card 3 */
function ConversionGraphic({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 120 88" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Funnel outline */}
      <path d="M10 12 L110 12 L85 40 L35 40 Z" stroke="var(--color-border)" strokeWidth="1" fill="none" />
      <path d="M35 44 L85 44 L75 68 L45 68 Z" stroke="var(--color-border)" strokeWidth="1" fill="none" />
      <rect x="53" y="72" width="14" height="10" rx="3" stroke="var(--color-border)" strokeWidth="1" fill="none" />

      {/* Fill animations */}
      <motion.path
        d="M10 12 L110 12 L85 40 L35 40 Z"
        fill="var(--color-primary)" fillOpacity={0}
        animate={active ? { fillOpacity: 0.35 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      <motion.path
        d="M35 44 L85 44 L75 68 L45 68 Z"
        fill="var(--color-primary)" fillOpacity={0}
        animate={active ? { fillOpacity: 0.55 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
      <motion.rect
        x="53" y="72" width="14" height="10" rx="3"
        fill="var(--color-brand-emerald)" fillOpacity={0}
        animate={active ? { fillOpacity: 0.85 } : {}}
        transition={{ duration: 0.6, delay: 0.9 }}
      />

      {/* Label at bottom */}
      <motion.text
        x="60" y="86"
        textAnchor="middle" fontSize="7" fontFamily="system-ui"
        fontWeight="800" letterSpacing="0.06em"
        fill="var(--color-brand-emerald)"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
      >
        CONVERTING
      </motion.text>
    </svg>
  );
}

/** Animated speed gauge for the wide card */
function SpeedGauge({ active }: { active: boolean }) {
  const needleFrom = -135;
  const needleTo   = 30;
  return (
    <svg viewBox="0 0 240 160" fill="none" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="gauge-arc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%"   stopColor="var(--color-destructive)" stopOpacity={0.6} />
          <stop offset="50%"  stopColor="var(--color-primary)"     stopOpacity={0.7} />
          <stop offset="100%" stopColor="var(--color-brand-emerald)" stopOpacity={0.8} />
        </linearGradient>
      </defs>

      {/* Track */}
      <path
        d="M 30 130 A 90 90 0 0 1 210 130"
        stroke="var(--color-border)" strokeWidth="12" strokeLinecap="round" fill="none"
      />
      {/* Filled arc */}
      <motion.path
        d="M 30 130 A 90 90 0 0 1 210 130"
        stroke="url(#gauge-arc)" strokeWidth="12" strokeLinecap="round" fill="none"
        strokeDasharray="283"
        initial={{ strokeDashoffset: 283 }}
        animate={active ? { strokeDashoffset: 70 } : {}}
        transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
      />

      {/* Tick marks */}
      {Array.from({ length: 7 }, (_, i) => {
        const angle = (-135 + i * 27.5) * (Math.PI / 180);
        const cx = 120, cy = 130, r = 90;
        const x1 = cx + (r - 14) * Math.cos(angle);
        const y1 = cy + (r - 14) * Math.sin(angle);
        const x2 = cx + (r - 6)  * Math.cos(angle);
        const y2 = cy + (r - 6)  * Math.sin(angle);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--color-border)" strokeWidth="1.5" strokeLinecap="round" />
        );
      })}

      {/* Needle */}
      <motion.line
        x1="120" y1="130"
        x2="120" y2="55"
        stroke="var(--color-foreground)" strokeWidth="2" strokeLinecap="round"
        style={{ transformOrigin: "120px 130px" }}
        initial={{ rotate: needleFrom }}
        animate={active ? { rotate: needleTo } : { rotate: needleFrom }}
        transition={{ duration: 1.8, delay: 0.6, ease: [0.34, 1.2, 0.64, 1] }}
      />
      <circle cx="120" cy="130" r="5" fill="var(--color-foreground)" />

      {/* Labels */}
      <text x="22"  y="148" textAnchor="middle" fontSize="9" fill="var(--color-muted-foreground)" fontFamily="system-ui">Slow</text>
      <text x="218" y="148" textAnchor="middle" fontSize="9" fill="var(--color-brand-emerald)"    fontFamily="system-ui">Fast</text>

      {/* Center score */}
      <motion.text
        x="120" y="118"
        textAnchor="middle" fontSize="26" fontWeight="800"
        fill="var(--color-foreground)" fontFamily="system-ui"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
      >
        98
      </motion.text>
      <motion.text
        x="120" y="132"
        textAnchor="middle" fontSize="8" fontWeight="600"
        fill="var(--color-brand-emerald)" fontFamily="system-ui" letterSpacing="0.08em"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
      >
        PERFORMANCE
      </motion.text>
    </svg>
  );
}

// ─── Solutions data ───────────────────────────────────────────────────────────
const SOLUTIONS = [
  {
    icon:        Zap,
    eyebrow:     "Performance",
    title:       "Systems engineered to be fast",
    description:
      "Sub-second load times, optimised assets, edge delivery. Speed is a feature — we build it in from day one.",
    Graphic:     PerformanceGraphic,
    span:        "lg:col-span-1",
  },
  {
    icon:        Layers,
    eyebrow:     "Brand Systems",
    title:       "Consistent everywhere you show up",
    description:
      "Design tokens, component libraries, brand guidelines — one source of truth across every platform.",
    Graphic:     BrandAlignGraphic,
    span:        "lg:col-span-1",
  },
  {
    icon:        BarChart3,
    eyebrow:     "Conversion",
    title:       "Every pixel earns its place",
    description:
      "CRO-informed layouts, clear hierarchy, frictionless flows. We turn browsers into buyers.",
    Graphic:     ConversionGraphic,
    span:        "lg:col-span-1",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function SolutionSection() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden bg-background"
      aria-labelledby="solution-heading"
    >
      {/* Ambient primary glow — right */}
      <div
        className="absolute top-1/3 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-primary), transparent 68%)",
          opacity: 0.06,
          filter: "blur(16px)",
        }}
        aria-hidden="true"
      />
      {/* Ambient emerald glow — bottom left */}
      <div
        className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-brand-emerald), transparent 68%)",
          opacity: 0.05,
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">

        {/* ── Section header ───────────────────────────────────────────────── */}
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
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                The Fix
              </span>
            </motion.div>

            <h2
              id="solution-heading"
              className="title font-bold leading-[1.05] tracking-[-0.02em] text-foreground"
            >
              <div className="overflow-hidden pb-1">
                <motion.span
                  custom={0.05}
                  variants={maskReveal}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="block text-[clamp(2rem,4.5vw,3.8rem)]"
                >
                  We seal every leak.
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
                  Then we scale.
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
            We don't patch symptoms. We rebuild the systems underneath — so growth
            compounds instead of leaking away.
          </motion.p>
        </div>

        {/* ── Bento grid ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Solution cards */}
          {SOLUTIONS.map(({ icon: Icon, eyebrow, title, description, Graphic, span }, i) => (
            <motion.div
              key={i}
              custom={0.3 + i * 0.1}
              variants={cardReveal}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className={`group relative rounded-2xl border border-border bg-card overflow-hidden ${span}`}
            >
              {/* Graphic area */}
              <div className="relative h-36 bg-muted/30 border-b border-border overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <div className="w-full h-full max-w-[140px] max-h-[100px]">
                    <Graphic active={isInView} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary">
                    {eyebrow}
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-[15px] leading-snug mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Hover accent line */}
              <div
                className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 origin-left bg-primary opacity-50 transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </motion.div>
          ))}

          {/* ── Wide results card ── */}
          <motion.div
            custom={0.55}
            variants={cardReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3 rounded-2xl border border-border bg-card overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row-reverse">

              {/* Speed gauge visual */}
              <div className="relative flex-1 min-h-[260px] bg-muted/20 border-b lg:border-b-0 lg:border-l border-border flex items-center justify-center p-8">
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                  aria-hidden="true"
                />
                <div className="relative w-full max-w-[260px] h-[160px]">
                  <SpeedGauge active={isInView} />
                </div>
              </div>

              {/* Side copy */}
              <div className="p-8 lg:p-10 flex flex-col justify-center lg:max-w-sm">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary mb-4 block">
                  What You Get
                </span>
                <p className="title text-3xl font-bold text-foreground leading-tight mb-4">
                  Infrastructure built for clients who don't stay small.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  Every engagement starts with an audit, ends with a system — and delivers measurable
                  results at every step in between. One roof. Strategy, engineering, brand.
                </p>

                {/* Results list */}
                <div className="space-y-3 mb-8">
                  {[
                    { label: "Average page score",    val: "98/100", good: true  },
                    { label: "Avg conversion lift",   val: "+3.2×",  good: true  },
                    { label: "Brand recall increase", val: "+61%",   good: true  },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span
                        className="font-bold tabular-nums"
                        style={{ color: s.good ? "var(--color-brand-emerald)" : "var(--color-destructive)" }}
                      >
                        {s.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  size="lg"
                  className="group relative h-12 px-6 w-fit rounded-full bg-primary text-primary-foreground font-bold text-sm overflow-hidden transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-lg shadow-primary/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start a Project
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

