"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

export function MainCta() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/14.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Aggressive Gradient Overlay - covers 60% then fades */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to right, #f4f4f4 0%, #121212 25%, #121212 50% , transparent 100%)"
        }}
      />

      {/* Content */}
      <div className="relative z-20 w-full px-8 md:px-14 py-20">
        <div className="max-w-3xl">
          <motion.div
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-55" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
              Let's Build Something Great
            </span>
          </motion.div>

          <h1 className="font-bold leading-[0.88] tracking-[-0.03em] text-white mb-8">
            {[
              { text: "Ready to", delay: 0.0 },
              { text: "scale your", delay: 0.12 },
              { text: "business?", delay: 0.24, accent: true },
            ].map(({ text, delay, accent }) => (
              <div key={text} className="overflow-hidden pb-1">
                <motion.span
                  custom={delay}
                  variants={maskReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className={`block text-[clamp(2.8rem,6.5vw,6rem)] ${accent ? "text-primary" : "text-white"}`}
                >
                  {text}
                </motion.span>
              </div>
            ))}
          </h1>

          <motion.p
            custom={0.42}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-[15px] leading-relaxed text-white/80 font-medium mb-9 max-w-xl"
          >
            High-performance digital infrastructure for businesses
            that refuse to stay small. Strategy, engineering,
            and brand — under one roof.
          </motion.p>

          <motion.div
            custom={0.54}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-center gap-6 mb-10"
          >
            <Button size="lg">
              Start a Project
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            
            <Link 
              href="/work" 
              className="group flex items-center gap-3 text-white font-medium text-sm transition-all duration-200 hover:gap-4 border border-white/30 hover:border-white/60 px-4 py-2 rounded-md"
            >
              View Work
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            custom={0.64}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex gap-8 pt-6 border-t border-white/20 max-w-md"
          >
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-white tracking-tight">48+</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/60 leading-tight">Projects Delivered</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-white tracking-tight">100%</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/60 leading-tight">Client Retention</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

