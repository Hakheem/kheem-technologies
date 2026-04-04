"use client";

import { useRef } from "react";
import { motion, Variants, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
  hidden:  { y: "108%", rotate: 1.5 },
  visible: (d = 0) => ({
    y: "0%", rotate: 0,
    transition: { duration: 1.05, ease: EASE, delay: d },
  }),
};

// ─── Animated noise/mesh blob ─────────────────────────────────────────────────
function MeshBlob({
  cx, cy, r, color, delay, duration,
}: {
  cx: number; cy: number; r: number;
  color: string; delay: number; duration: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.circle
      cx={cx} cy={cy} r={r}
      fill={color}
      animate={shouldReduceMotion ? {} : {
        cx: [cx, cx + 30, cx - 20, cx],
        cy: [cy, cy - 25, cy + 20, cy],
        r:  [r,  r * 1.08, r * 0.94, r],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function FinalCTASection() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
      aria-labelledby="final-cta-heading"
    >
      {/* ── Background gradient ──────────────────────────────────────────── */}
      {/* Base */}
      <div className="absolute inset-0 bg-foreground" aria-hidden="true" />

      {/* Animated mesh blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 600"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <filter id="cta-blur">
              <feGaussianBlur stdDeviation="60" />
            </filter>
          </defs>
          <g filter="url(#cta-blur)">
            <MeshBlob cx={200}  cy={200} r={240} color="#005CEE" delay={0}   duration={9}  />
            <MeshBlob cx={900}  cy={400} r={280} color="#5B21B6" delay={2}   duration={11} />
            <MeshBlob cx={600}  cy={100} r={200} color="#7C3AED" delay={1}   duration={8}  />
            <MeshBlob cx={1050} cy={150} r={180} color="#005CEE" delay={3}   duration={10} />
            <MeshBlob cx={100}  cy={500} r={160} color="#059669" delay={1.5} duration={12} />
          </g>
        </svg>
        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-foreground/55" />
      </div>

      {/* Dot grid on top of gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden="true"
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center">

        {/* Eyebrow */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/50">
            Ready to Start
          </span>
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
        </motion.div>

        {/* Headline */}
        <h2
          id="final-cta-heading"
          className="title font-bold leading-[0.92] tracking-[-0.03em] mb-7"
        >
          {[
            { text: "Let's build something",  delay: 0.05, white: true },
            { text: "that actually works.",   delay: 0.17, white: false },
          ].map(({ text, delay, white }) => (
            <div key={text} className="overflow-hidden pb-2">
              <motion.span
                custom={delay}
                variants={maskReveal}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className={`block text-[clamp(2.4rem,6vw,5.5rem)] ${white ? "text-white" : "text-primary"}`}
              >
                {text}
              </motion.span>
            </div>
          ))}
        </h2>

        {/* Subtext */}
        <motion.p
          custom={0.32}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-base md:text-lg text-white/55 leading-relaxed max-w-xl mx-auto mb-12"
        >
          Tell us about your project and we'll help you move forward.
          One conversation. No commitment. Just clarity.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.44}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <Button
            size="lg"
            className="group relative h-14 px-10 rounded-full bg-primary text-primary-foreground font-bold text-[15px] overflow-hidden transition-all duration-200 hover:scale-[1.04] active:scale-95 shadow-2xl shadow-primary/40 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
          >
            <span className="relative z-10 flex items-center gap-2.5">
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

          <Link
            href="/work"
            className="group flex items-center gap-3 text-white/60 font-bold text-[15px] transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
          >
            See our work first
            <span
              className="block w-5 h-px bg-white/40 transition-all duration-500 group-hover:w-10 group-hover:bg-white"
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          custom={0.56}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12"
        >
          {[
            { val: "43+",  label: "Projects shipped"  },
            { val: "100%", label: "Client retention"  },
            { val: "12",   label: "Industries served" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="title text-2xl font-bold text-white tracking-tight">{s.val}</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35">{s.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

