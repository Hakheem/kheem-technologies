"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Layers, Cpu } from "lucide-react";
import { Variants } from "framer-motion";

const philosophy = [
  {
    num: "01",
    sys: "SYS-ARCH-1",
    statement: "We don't start with how it looks. We start with what it needs to do.",
    sub: "Design follows function. Always. A beautiful site that doesn't convert is an expensive brochure.",
    icon: Target,
  },
  {
    num: "02",
    sys: "SYS-ARCH-2",
    statement: "Small by design. Not by accident.",
    sub: "We take on fewer projects so every client gets our full attention — not a junior account team.",
    icon: Layers,
  },
  {
    num: "03",
    sys: "SYS-ARCH-3",
    statement: "The best digital infrastructure is the kind you forget is there.",
    sub: "Because it just works. No crashes, no slow loads, no excuses.",
    icon: Cpu,
  },
];

const EASE = [0.76, 0, 0.24, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: EASE, 
      delay: i * 0.15 
    },
  }),
};

const maskReveal: Variants = {
  hidden: { y: "108%", rotate: 1.2 },
  visible: (d = 0) => ({ 
    y: "0%", 
    rotate: 0, 
    transition: { duration: 1.05, ease: EASE, delay: Number(d) } 
  }),
};

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header - matching "Why clients come back" typography */}
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
                Our Philosophy
              </span>
            </motion.div>

            <h2 className="title font-bold leading-[1.0] tracking-[-0.03em] text-foreground">
              <div className="overflow-hidden pb-1">
                <motion.span 
                  custom={0.06} 
                  variants={maskReveal} 
                  initial="hidden" 
                  animate={isInView ? "visible" : "hidden"}
                  className="block text-[clamp(2rem,4.5vw,3.8rem)]"
                >
                  Built on precision.
                </motion.span>
              </div>
              <div className="overflow-hidden pb-1">
                <motion.span 
                  custom={0.14} 
                  variants={maskReveal} 
                  initial="hidden" 
                  animate={isInView ? "visible" : "hidden"}
                  className="block text-[clamp(2rem,4.5vw,3.8rem)] text-primary"
                >
                  Designed for scale.
                </motion.span>
              </div>
            </h2>
          </div>

          <motion.p 
            custom={0.24} 
            variants={fadeUp} 
            initial="hidden" 
            animate={isInView ? "visible" : "hidden"}
            className="text-[15px] text-muted-foreground leading-relaxed max-w-md lg:text-right"
          >
            {/* We approach digital infrastructure with the rigor of engineering. 
            No fluff, no wasted effort—just perfectly tuned systems. */}
          </motion.p>
        </div>

        {/* The Hairline Grid */}
        <motion.div 
          custom={0.3} 
          variants={fadeUp} 
          initial="hidden" 
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border"
        >
          {philosophy.map((p, i) => (
            <div 
              key={p.num}
              className="group relative bg-background p-10 md:p-14 overflow-hidden transition-colors duration-500 flex flex-col h-full"
            >
              {/* Hover Radial Gradient Background */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 40% 0%, var(--color-primary) 0%, transparent 50%)`,
                  opacity: 0.03
                }}
              />

              {/* Massive Background Number */}
              <div className="absolute -top-10 -right-4 text-[12rem] font-black text-muted-foreground/5 pointer-events-none select-none transition-transform duration-700 group-hover:scale-105 group-hover:-translate-x-2 group-hover:translate-y-2">
                {p.num}
              </div>

              {/* Top Meta Info */}
              <div className="flex items-center justify-between mb-16 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-card group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300">
                    <p.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                    [{p.sys}]
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-auto">
                <h3 className="text-2xl md:text-[1.75rem] title font-bold text-foreground leading-snug tracking-tight mb-6 group-hover:text-primary transition-colors duration-300">
                  {p.statement}
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {p.sub}
                </p>
              </div>

              {/* Animated Bottom Line */}
              <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-700 ease-out" />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

