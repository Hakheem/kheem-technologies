"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring, Variants, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MARQUEE_ITEMS, STATS } from "@/lib/data";

const EASE = [0.76, 0, 0.24, 1] as const;

const maskReveal: Variants = {
  hidden: { y: "108%", rotate: 1.5, opacity: 0 },
  visible: (d = 0) => ({
    y: "0%", rotate: 0, opacity: 1,
    transition: { duration: 1.1, ease: EASE, delay: d },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, ease: EASE, delay: d },
  }),
};

const lineGrow: Variants = {
  hidden: { scaleX: 0 },
  visible: (d = 0) => ({
    scaleX: 1,
    transition: { duration: 1.05, ease: EASE, delay: d },
  }),
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springCfg = { stiffness: 130, damping: 22, mass: 0.6 };
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-7, 7]), springCfg);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), springCfg);
  const imageScale = useSpring(1, { stiffness: 200, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !imageContainerRef.current) return;
    const r = imageContainerRef.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  }, [rawX, rawY, shouldReduceMotion]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.to(sectionRef.current, {
          scale: 0.9,
          borderRadius: "22px",
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=560",
            scrub: 1.6,
          },
        });
      }

      if (marqueeRef.current) {
        gsap.fromTo(
          marqueeRef.current,
          { xPercent: 0 },
          { xPercent: -50, duration: 30, ease: "none", repeat: -1 }
        );
      }
    });

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col bg-background overflow-hidden will-change-transform" aria-label="Hero">
      {/* Dot grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--color-foreground) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          opacity: 0.045,
        }}
        aria-hidden="true"
      />

      {/* Ambient glow  */}
      <div
        className="absolute -top-40 -left-40 w-[680px] h-[680px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center, var(--color-primary), transparent 68%)",
          opacity: 0.08,
          filter: "blur(8px)",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow — bottom right */}
      <div
        className="absolute -bottom-48 -right-48 w-[720px] h-[720px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at center, var(--color-brand-violet), transparent 68%)",
          opacity: 0.07,
          filter: "blur(12px)",
        }}
        aria-hidden="true"
      />

      {/* Label row */}
      <div className="relative z-10 flex items-center justify-between px-8 md:px-14 pt-32 md:pt-28">
        <motion.div custom={0.15} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-55" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
            Engineering Digital Performance
          </span>
        </motion.div>
      </div>

      {/* Main content - FLEX layout */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 px-8 md:px-14 py-12">
        {/* Text - 65% width */}
        <div className="w-full lg:w-[65%]">
          <h1 className="title font-bold leading-[0.88] tracking-[-0.03em] text-foreground mb-5">
            {[
              { text: "We build", delay: 0.0 },
              { text: "digital products", delay: 0.12 },
              { text: "that scale", delay: 0.24, accent: true },
            ].map(({ text, delay, accent }) => (
              <div key={text} className="overflow-hidden pb-1.5">
                <motion.span
                  custom={delay}
                  variants={maskReveal}
                  initial="hidden"
                  animate="visible"
                  className={`block text-[clamp(2.8rem,6.5vw,6rem)] ${accent ? "text-primary" : "text-foreground"}`}
                >
                  {text}
                </motion.span>
              </div>
            ))}
          </h1>

          <motion.p custom={0.42} variants={fadeUp} initial="hidden" animate="visible" className="text-[15px] leading-relaxed text-muted-foreground font-medium mb-6 max-w-lg">
            High-performance digital infrastructure for businesses and individuals 
            that refuse to stay small. Strategy, engineering,
            and brand identity, all under one roof.
          </motion.p>

          <motion.div custom={0.54} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-4 mb-10">
            <Button size="lg" className="group relative h-12 px-8 rounded-md bg-primary text-primary-foreground font-semibold text-sm overflow-hidden transition-all duration-200 active:scale-98 shadow-md shadow-primary/15">
              <span className="relative z-10 flex items-center gap-2">
                Start Your Build
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Button>

           {/* View Work */}
<Button size="lg" variant="outline" className="group relative h-12 px-8 rounded-md overflow-hidden transition-all duration-200 active:scale-99">
  <Link href="/work" className="flex items-center gap-3 font-semibold text-sm">
    See Our Work
    {/* <span className="block w-6 h-px bg-current transition-all duration-500 group-hover:w-8" /> */}
  </Link>
</Button>
            
          </motion.div>

          <motion.div custom={0.64} variants={fadeUp} initial="hidden" animate="visible" className="grid grid-cols-3 gap-4 border-t border-border pt-6 max-w-md">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="title text-2xl font-bold text-foreground tracking-tight">{s.value}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground leading-tight">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Image - overflow visible so image can be full */}
        <div className="w-full lg:w-[45%] relative lg:absolute lg:right-[4%] lg:top-[40%] lg:-translate-y-1/2 overflow-visible">
          <motion.div
            custom={0.25}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative w-full h-[650px] lg:-left-4 overflow-visible"
            style={{ perspective: "1000px" }}
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              handleMouseLeave();
              imageScale.set(1);
            }}
            onMouseEnter={() => imageScale.set(1.015)}
          >
            <motion.div
              style={{
                rotateX: shouldReduceMotion ? 0 : rotateX,
                rotateY: shouldReduceMotion ? 0 : rotateY,
                scale: shouldReduceMotion ? 1 : imageScale,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full h-full overflow-visible"
            >
              <Image 
                src="/images/hero.png" 
                alt="High-performance digital systems" 
                fill 
                priority 
                sizes="35vw" 
                className="object-cover rounded-2xl"
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div custom={0.75} variants={lineGrow} initial="hidden" animate="visible" className="relative z-10 h-px w-full bg-border origin-left" />

      {/* Infinite marquee */}
      <div className="relative z-10 overflow-hidden py-5 bg-background">
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
          {[0, 1].map((set) => (
            <div key={set} className="flex shrink-0 items-center">
              {MARQUEE_ITEMS.map((item) => (
                <span key={item} className="flex items-center gap-5 px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {item}
                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

