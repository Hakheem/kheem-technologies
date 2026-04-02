"use client";

import { motion, Variants, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { whoWeServeCards } from "@/lib/data";

const ease = [0.76, 0, 0.24, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease, delay },
  }),
};

const maskReveal: Variants = {
  hidden: { y: "105%", rotate: 1 },
  visible: (delay = 0) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1, ease, delay },
  }),
};

const cards = whoWeServeCards;

function Card({
  card,
  delay,
}: {
  card: (typeof cards)[number];
  delay: number;
}) {
  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      className="group relative flex flex-col justify-between gap-8 p-7 md:p-8 border border-border bg-card rounded-md transition-all duration-500 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 "
    >
      {/* Top row — tag + index */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
          {card.tag}
        </span>
        <span className="text-[11px] font-semibold tabular-nums text-muted-foreground/40 tracking-wider">
          {card.index}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4">
        <h3 className="title text-xl md:text-2xl font-semibold tracking-tight text-foreground leading-snug">
          {card.title}
        </h3>
        <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed font-medium">
          {card.body}
        </p>
      </div>

      {/* Bottom CTA hint */}
      <Link href={card.href} className="flex items-center gap-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
          This is me
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
      </Link>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary rounded-b-md transition-all duration-500 group-hover:w-full" />
    </motion.div>
  );
}

export function WhoIsThisFor() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background accent — subtle right glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-violet/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16 ">
          {/* Eyebrow */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-6 h-px bg-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Who We Are Here For
            </span>
          </motion.div>

          {/* Main heading — mask reveal */}
          <h2 className="title font-bold leading-[0.9] tracking-[-0.03em] text-foreground mb-4">
            <div className="overflow-hidden pb-1">
              <motion.span
                custom={0.05}
                variants={maskReveal}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="block text-[clamp(2.2rem,5.5vw,5rem)]"
              >
                Built for businesses
              </motion.span>
            </div>
            <div className="overflow-hidden pb-2">
              <motion.span
                custom={0.15}
                variants={maskReveal}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="block text-[clamp(2.2rem,5.5vw,5rem)] text-primary"
              >
                that want more.
              </motion.span>
            </div>
          </h2>

          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed max-w-xl"
          >
            Whether you're starting from scratch or fixing what's already
            there, we help you build something that actually works.
          </motion.p>
        </div>

        {/* Card grid - 3x2 layout */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-4 md:gap-5"
        >
          {/* Row 1: New Build, Redesign, Scaling */}
          {cards.slice(0, 3).map((card, i) => (
            <Card key={card.index} card={card} delay={0.1 + i * 0.08} />
          ))}
          {/* Row 2: Integration, Expansion, Clarity */}
          {cards.slice(3, 6).map((card, i) => (
            <Card key={card.index} card={card} delay={0.34 + i * 0.08} />
          ))}
        </motion.div>

     {/* Bottom CTA row */}
<motion.div
  custom={0.65}
  variants={fadeUp}
  initial="hidden"
  animate={isInView ? "visible" : "hidden"}
  className="mt-20 md:mt-24"
>
  <div className="relative rounded-2xl border border-border bg-card overflow-hidden">

    {/* Ambient glow */}
    <div
      className="absolute -top-24 -right-24 w-[360px] h-[360px] rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, var(--color-primary), transparent 70%)",
        opacity: 0.06,
        filter: "blur(16px)",
      }}
      aria-hidden="true"
    />

    <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 px-8 py-10 md:px-12 md:py-12">

      {/* Left — statement */}
      <div className="flex-1 max-w-xl">
        <div className="flex items-center gap-3 mb-5">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Still Figuring It Out
          </span>
        </div>

        <h3 className="title text-[clamp(1.6rem,3.5vw,2.6rem)] font-bold leading-tight tracking-tight text-foreground mb-3">
          Don't see yourself
          <br />
          <span className="text-primary">in any of these?</span>
        </h3>

        <p className="text-[15px] text-muted-foreground leading-relaxed max-w-md">
          Not every situation fits a box. Tell us where you're at —
          we'll work out whether we're the right fit and exactly
          what needs to happen next.
        </p>
      </div>

      {/* Right — actions */}
      <div className="flex flex-col gap-4 lg:gap-6 md:items-end shrink-0">
        <Button
          size="lg"
          className="group relative h-12 px-8 rounded-md bg-primary text-primary-foreground font-semibold text-sm overflow-hidden transition-all duration-200 active:scale-98 shadow-md shadow-primary/15
          "
        >
          <span className="relative z-10 flex items-center gap-2">
            Book a Free 30-Min Call
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </span>
          <span className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" aria-hidden="true" />
        </Button>

        <Link
          href="/quote"
          className="group flex items-center gap-2.5 text-sm font-bold text-foreground transition-opacity duration-200 hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
        >
          Or maybe get you a quote?
          <span className="block w-4 h-px bg-foreground transition-all duration-500 group-hover:w-8" aria-hidden="true" />
        </Link>

        <p className="text-[11px] text-muted-foreground/80 md:text-right">
          No pitch. Just clarity on what you actually need.
        </p>
      </div>

    </div>
  </div>
</motion.div>




      </div>
    </section>
  );
}
