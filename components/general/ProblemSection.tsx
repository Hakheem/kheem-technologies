"use client";

import { useRef, useEffect } from "react";
import { motion, Variants, useInView, useReducedMotion, animate } from "framer-motion";
import { AlertCircle, TrendingDown, ShieldOff, MousePointerClick } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

// ─── Animated funnel ─────────────────────────────────────────────────────────
function LeakFunnel({ isInView }: { isInView: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  // Drip particles — each leaks out at a different point on the funnel
  const drips = [
    { cx: 160, startY: 130, color: "var(--color-destructive)", delay: 0.0, dur: 1.9 },
    { cx: 240, startY: 195, color: "var(--color-destructive)", delay: 0.6, dur: 2.2 },
    { cx: 200, startY: 260, color: "var(--color-destructive)", delay: 1.1, dur: 1.7 },
    { cx: 175, startY: 150, color: "var(--color-destructive)", delay: 1.5, dur: 2.0 },
  ];

  return (
    <svg
      viewBox="0 0 320 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Leaking conversion funnel diagram"
      role="img"
    >
      <defs>
        <linearGradient id="funnel-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#005CEE" stopOpacity={0.18} />
          <stop offset="100%" stopColor="#005CEE" stopOpacity={0.04} />
        </linearGradient>
        <linearGradient id="funnel-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#005CEE" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#005CEE" stopOpacity={0.15} />
        </linearGradient>
        <filter id="glow-red">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* ── Funnel body ── */}
      {/* Stage 1 — visitors */}
      <motion.path
        d="M 40 40 L 280 40 L 240 110 L 80 110 Z"
        fill="url(#funnel-grad)"
        stroke="url(#funnel-stroke)"
        strokeWidth="1.5"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        style={{ transformOrigin: "center top" }}
      />
      {/* Stage 2 — leads */}
      <motion.path
        d="M 80 118 L 240 118 L 210 190 L 110 190 Z"
        fill="url(#funnel-grad)"
        stroke="url(#funnel-stroke)"
        strokeWidth="1.5"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
        style={{ transformOrigin: "top center" }}
      />
      {/* Stage 3 — customers */}
      <motion.path
        d="M 110 198 L 210 198 L 195 270 L 125 270 Z"
        fill="url(#funnel-grad)"
        stroke="url(#funnel-stroke)"
        strokeWidth="1.5"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
        style={{ transformOrigin: "top center" }}
      />
      {/* Tiny output */}
      <motion.rect
        x="148" y="278" width="24" height="32" rx="4"
        fill="#005CEE" fillOpacity={0.12}
        stroke="#005CEE" strokeOpacity={0.4} strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
      />

      {/* ── Stage labels ── */}
      {[
        { x: 160, y: 28,  text: "10,000 Visitors",    sub: "Monthly" },
        { x: 160, y: 107, text: "124 Leads",          sub: "↓ 98.7%" },
        { x: 160, y: 188, text: "8 Customers",        sub: "↓ 93%" },
      ].map((l, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
        >
          <text x={l.x} y={l.y} textAnchor="middle"
            fill="#0a0c10" fillOpacity={0.75}
            fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
            {l.text}
          </text>
          <text x={l.x} y={l.y + 13} textAnchor="middle"
            fill={i > 0 ? "var(--color-destructive)" : "#5c6b7e"}
            fillOpacity={0.8}
            fontSize="9" fontFamily="system-ui, sans-serif" fontWeight="600">
            {l.sub}
          </text>
        </motion.g>
      ))}

      {/* ── Animated leak drips ── */}
      {!shouldReduceMotion && drips.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.cx}
          cy={d.startY}
          r={3.5}
          fill={d.color}
          fillOpacity={0.7}
          filter="url(#glow-red)"
          initial={{ cy: d.startY, opacity: 0 }}
          animate={isInView ? {
            cy:      [d.startY, d.startY + 55, d.startY + 80],
            opacity: [0, 0.85, 0],
            r:       [3.5, 3.5, 1.5],
          } : {}}
          transition={{
            duration:  d.dur,
            delay:     d.delay + 1.0,
            repeat:    Infinity,
            repeatDelay: 1.2,
            ease:      "easeIn",
          }}
        />
      ))}

      {/* ── Horizontal leak lines (cracks in the funnel) ── */}
      {[
        { x1: 80,  y1: 113, x2: 55,  y2: 145, delay: 1.0 },
        { x1: 240, y1: 113, x2: 265, y2: 145, delay: 1.0 },
        { x1: 110, y1: 193, x2: 88,  y2: 218, delay: 1.1 },
        { x1: 210, y1: 193, x2: 232, y2: 218, delay: 1.1 },
      ].map((l, i) => (
        <motion.line
          key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="var(--color-destructive)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          strokeLinecap="round"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={isInView ? { opacity: 0.5, pathLength: 1 } : {}}
          transition={{ duration: 0.5, delay: l.delay }}
        />
      ))}

      {/* ── Loss label at bottom ── */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <rect x="80" y="328" width="170" height="36" rx="8"
          fill="var(--color-destructive)" fillOpacity={0.09}
          stroke="var(--color-destructive)" strokeOpacity={0.25} strokeWidth="1" />
        <text x="163" y="348" textAnchor="middle"
          fill="var(--color-destructive)" fontSize="10"
          fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.08em">
          9,992 LOST OPPORTUNITIES
        </text>
        <text x="160" y="360" textAnchor="middle"
          fill="var(--color-destructive)" fillOpacity={0.65}
          fontSize="8" fontFamily="system-ui, sans-serif">
          per month
        </text>
      </motion.g>
    </svg>
  );
}

// ─── Problem card mini-graphics ───────────────────────────────────────────────

/** Pulsing "no-click" cursor for card 1 */
function NoConversionGraphic({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 120 80" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Browser bar */}
      <rect x="8" y="8" width="104" height="64" rx="6" fill="var(--color-muted)" fillOpacity={0.6} stroke="var(--color-border)" strokeWidth="1" />
      <rect x="8" y="8" width="104" height="16" rx="6" fill="var(--color-border)" fillOpacity={0.5} />
      <circle cx="18" cy="16" r="3" fill="var(--color-destructive)" fillOpacity={0.5} />
      <circle cx="27" cy="16" r="3" fill="var(--color-muted-foreground)" fillOpacity={0.2} />
      <circle cx="36" cy="16" r="3" fill="var(--color-muted-foreground)" fillOpacity={0.2} />
      {/* CTA button */}
      <rect x="32" y="50" width="56" height="14" rx="7" fill="var(--color-primary)" fillOpacity={0.2} stroke="var(--color-primary)" strokeOpacity={0.35} strokeWidth="1" />
      <rect x="44" y="54" width="32" height="5" rx="2.5" fill="var(--color-primary)" fillOpacity={0.35} />
      {/* Cursor — drifts away from the button */}
      <motion.g
        animate={active ? {
          x: [0, 18, 22, 22],
          y: [0, -8, -14, -14],
          opacity: [1, 1, 0.4, 0],
        } : { x: 0, y: 0, opacity: 0 }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
      >
        {/* cursor arrow */}
        <path d="M52 57 L55 50 L57 55 L59 53 L57 60 Z"
          fill="var(--color-foreground)" fillOpacity={0.65} stroke="white" strokeWidth="0.8" />
      </motion.g>
      {/* X mark — missed click */}
      <motion.g
        animate={active ? { opacity: [0, 0, 1, 0], scale: [0.5, 0.5, 1, 0.5] } : { opacity: 0 }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut", delay: 1.6 }}
        style={{ transformOrigin: "72px 44px" }}
      >
        <circle cx="72" cy="44" r="8" fill="var(--color-destructive)" fillOpacity={0.15} />
        <path d="M68 40 L76 48 M76 40 L68 48" stroke="var(--color-destructive)" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

/** Brand fragments drifting apart for card 2 */
function BrandInconsistencyGraphic({ active }: { active: boolean }) {
  const fragments = [
    { x: 38, y: 28, w: 44, h: 10, rx: 5, drift: { x: -14, y: -8 }, col: "var(--color-primary)" },
    { x: 34, y: 44, w: 52, h: 10, rx: 5, drift: { x: 12,  y: -4 }, col: "var(--color-brand-violet)" },
    { x: 40, y: 60, w: 40, h: 10, rx: 5, drift: { x: -8,  y: 10 }, col: "var(--color-brand-emerald)" },
  ];
  return (
    <svg viewBox="0 0 120 88" fill="none" className="w-full h-full" aria-hidden="true">
      {fragments.map((f, i) => (
        <motion.rect
          key={i} x={f.x} y={f.y} width={f.w} height={f.h} rx={f.rx}
          fill={f.col} fillOpacity={0.25}
          stroke={f.col} strokeOpacity={0.4} strokeWidth="1"
          animate={active ? {
            x: [0, f.drift.x, f.drift.x * 0.5, 0],
            y: [0, f.drift.y, f.drift.y * 0.5, 0],
            opacity: [0.9, 0.4, 0.6, 0.9],
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        />
      ))}
      {/* centre "glue" dot */}
      <motion.circle
        cx="60" cy="52" r="4"
        fill="var(--color-destructive)" fillOpacity={0.5}
        animate={active ? { scale: [1, 1.6, 1], opacity: [0.5, 0.9, 0.5] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/** Stalling progress bar for card 3 */
function TrustErosionGraphic({ active }: { active: boolean }) {
  const bars = [
    { y: 24, w: 0.72, col: "var(--color-primary)",        label: "Load Speed" },
    { y: 42, w: 0.38, col: "var(--color-destructive)",    label: "Trust Score" },
    { y: 60, w: 0.55, col: "var(--color-brand-emerald)",  label: "Retention" },
  ];
  return (
    <svg viewBox="0 0 120 88" fill="none" className="w-full h-full" aria-hidden="true">
      {bars.map((b, i) => (
        <g key={i}>
          <rect x="10" y={b.y} width="100" height="10" rx="5"
            fill="var(--color-muted)" fillOpacity={0.5} />
          <motion.rect
            x="10" y={b.y} width={0} height="10" rx="5"
            fill={b.col} fillOpacity={0.55}
            animate={active ? { width: b.w * 100 } : { width: 0 }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.25, ease: EASE }}
          />
        </g>
      ))}
      {/* flashing warning icon */}
      <motion.g
        animate={active ? { opacity: [0, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 1.6, repeat: Infinity, delay: 1.8 }}
      >
        <circle cx="98" cy="42" r="7" fill="var(--color-destructive)" fillOpacity={0.15} />
        <text x="98" y="46" textAnchor="middle" fontSize="8"
          fill="var(--color-destructive)" fontFamily="system-ui" fontWeight="800">!</text>
      </motion.g>
    </svg>
  );
}

// ─── Problem cards data ───────────────────────────────────────────────────────
const PROBLEMS = [
  {
    icon:        AlertCircle,
    eyebrow:     "Conversion",
    title:       "Looks good, doesn't convert",
    description: "Traffic arrives, scrolls, leaves. Pretty design isn't paying the bills — performance is.",
    Graphic:     NoConversionGraphic,
    accent:      "var(--color-destructive)",
    span:        "lg:col-span-1",
  },
  {
    icon:        ShieldOff,
    eyebrow:     "Brand",
    title:       "Feels inconsistent across platforms",
    description: "Your message shifts between channels. Customers can't trust what they can't recognize.",
    Graphic:     BrandInconsistencyGraphic,
    accent:      "var(--color-destructive)",
    span:        "lg:col-span-1",
  },
  {
    icon:        TrendingDown,
    eyebrow:     "Trust",
    title:       "Losing trust before they reach out",
    description: "Slow loads, broken links, outdated copy — tiny cracks that cost you big opportunities.",
    Graphic:     TrustErosionGraphic,
    accent:      "var(--color-destructive)",
    span:        "lg:col-span-1",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function ProblemSection() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden bg-background"
      aria-labelledby="problem-heading"
    >
      {/* Ambient red glow — left */}
      <div
        className="absolute top-1/2 -left-32 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-destructive), transparent 68%)",
          opacity: 0.05,
          filter: "blur(16px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">

        {/* ── Section header ───────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            {/* Eyebrow */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-5 h-px" style={{ background: "var(--color-destructive)" }} aria-hidden="true" />
              <span
                className="text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: "var(--color-destructive)" }}
              >
                The Reality
              </span>
            </motion.div>

            <h2
              id="problem-heading"
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
                  Your digital presence
                </motion.span>
              </div>
              <div className="overflow-hidden pb-1">
                <motion.span
                  custom={0.15}
                  variants={maskReveal}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="block text-[clamp(2rem,4.5vw,3.8rem)]"
                  style={{ color: "var(--color-destructive)" }}
                >
                  is leaking opportunities.
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
            You're leaving money on the table. Here's what we see — and what your
            customers are <em className="not-italic text-foreground font-medium">actually</em> experiencing.
          </motion.p>
        </div>

        {/* ── Bento grid ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Problem cards */}
          {PROBLEMS.map(({ icon: Icon, eyebrow, title, description, Graphic, span }, i) => (
            <motion.div
              key={i}
              custom={0.3 + i * 0.1}
              variants={cardReveal}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className={`group relative rounded-2xl border border-border bg-card overflow-hidden ${span}`}
              style={{ "--card-accent": "var(--color-destructive)" } as React.CSSProperties}
            >
              {/* Graphic area */}
              <div className="relative h-36 bg-muted/30 border-b border-border overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <div className="w-full h-full max-w-[140px] max-h-[100px]">
                    <Graphic active={isInView} />
                  </div>
                </div>
                {/* Noise overlay for depth */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
                    opacity: 0.6,
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: "var(--color-destructive)" }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-[9px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: "var(--color-destructive)" }}
                  >
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

              {/* Hover border accent */}
              <div
                className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: "var(--color-destructive)", opacity: 0.5 }}
                aria-hidden="true"
              />
            </motion.div>
          ))}

          {/* ── Large funnel card (spans all 3 on lg, or standalone below) ── */}
          <motion.div
            custom={0.55}
            variants={cardReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3 rounded-2xl border border-border bg-card overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row">

              {/* Funnel visual */}
              <div className="relative flex-1 min-h-[320px] bg-muted/20 border-b lg:border-b-0 lg:border-r border-border flex items-center justify-center p-8">
                {/* subtle grid */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.03]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                  aria-hidden="true"
                />
                <div className="relative w-full max-w-[320px] h-[340px]">
                  <LeakFunnel isInView={isInView} />
                </div>
              </div>

              {/* Side copy */}
              <div className="p-8 lg:p-10 flex flex-col justify-center lg:max-w-xs">
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.2em] mb-4 block"
                  style={{ color: "var(--color-destructive)" }}
                >
                  Conversion Reality
                </span>
                <p className="title text-3xl font-bold text-foreground leading-tight mb-4">
                  9,992 visitors walked away this month.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  The average website converts under 0.1% of visitors. That's not a traffic problem — it's a
                  systems problem. Every leak in your funnel has a name, and we fix them all.
                </p>

                {/* Mini stat list */}
                <div className="space-y-3">
                  {[
                    { label: "Avg. conversion rate",  val: "0.08%", bad: true },
                    { label: "Mobile abandonment",    val: "67%",   bad: true },
                    { label: "Slow-load exit rate",   val: "+38%",  bad: true },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span
                        className="font-bold tabular-nums"
                        style={{ color: s.bad ? "var(--color-destructive)" : "var(--color-brand-emerald)" }}
                      >
                        {s.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

