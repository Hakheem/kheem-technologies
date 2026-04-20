"use client";

import { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATS } from "@/lib/data";
import { TeamSection } from "@/components/general/TeamSection";
import { PhilosophySection } from "@/components/general/PhilosophySection"; 

const EASE = [0.76, 0, 0.24, 1] as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: Number(d) } }),
};

const maskReveal: Variants = {
  hidden:  { y: "108%", rotate: 1.2 },
  visible: (d = 0) => ({ y: "0%", rotate: 0, transition: { duration: 1.05, ease: EASE, delay: Number(d) } }),
};

const lineGrow: Variants = {
  hidden:  { scaleX: 0 },
  visible: (d = 0) => ({ scaleX: 1, transition: { duration: 1, ease: EASE, delay: Number(d) } }),
};

// ─── How we work differently ──────────────────────────────────────────────────
const differentiators = [
  {
    num: "01",
    title: "We audit before we propose",
    body: "We don't quote a project we don't understand. Before anything starts, we take time to understand your business, your customers, and your actual constraints.",
    accent: "primary",
  },
  {
    num: "02",
    title: "You speak directly to the people building",
    body: "No account managers in the middle. The person you brief is the person who designs and builds. That's intentional.",
    accent: "violet",
  },
  {
    num: "03",
    title: "We don't disappear at launch",
    body: "30 days post-launch support is built into every engagement. We make sure everything works, you understand it, and you're set up to grow.",
    accent: "emerald",
  },
  {
    num: "04",
    title: "Timelines we actually stick to",
    body: "We give you a fixed quote and a realistic timeline before anything starts. Then we ship on time. This is the baseline, not the exception.",
    accent: "primary",
  },
];

const ACCENT_VAR: Record<string, string> = {
  primary: "var(--color-primary)",
  violet:  "var(--color-brand-violet)",
  emerald: "var(--color-brand-emerald)",
};

export default function AboutPage() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const diffRef    = useRef<HTMLDivElement>(null);
  const diffInView = useInView(diffRef, { once: true, margin: "-8%" });

  const ctaRef     = useRef<HTMLDivElement>(null);
  const ctaInView  = useInView(ctaRef, { once: true, margin: "-10%" });

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero Section ────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--color-brand-violet), transparent 68%)", opacity: 0.06, filter: "blur(24px)" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="flex items-center gap-3 mb-8">
            <div className="w-5 h-px bg-primary" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">About Us</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <div className="flex-1">
              <h1 className="title font-bold leading-[0.92] tracking-[-0.03em] mb-8">
                <div className="overflow-hidden pb-1">
                  <motion.span custom={0.05} variants={maskReveal} initial="hidden" animate={heroInView ? "visible" : "hidden"}
                    className="block text-[clamp(2.8rem,7vw,6.5rem)] text-foreground">
                    We build
                  </motion.span> 
                </div>
                <div className="overflow-hidden pb-1">
                  <motion.span custom={0.15} variants={maskReveal} initial="hidden" animate={heroInView ? "visible" : "hidden"}
                    className="block text-[clamp(2.8rem,7vw,6.5rem)] text-primary">
                    what works.
                  </motion.span>
                </div>
              </h1>

              <motion.p custom={0.25} variants={fadeUp} initial="hidden" animate={heroInView ? "visible" : "hidden"}
                className="text-[15px] md:text-base font-medium text-muted-foreground leading-relaxed max-w-xl">
               Kheem is a digital systems company based in Kenya. We build the websites, apps, and infrastructure that let ambitious businesses stop playing small. We're not a one-size-fits-all agency, we're a small, deliberate team that takes on work we can do exceptionally well.
              </motion.p>
            </div>

            <motion.div custom={0.32} variants={fadeUp} initial="hidden" animate={heroInView ? "visible" : "hidden"}
              className="flex items-center gap-10 lg:flex-col lg:items-end lg:gap-6 shrink-0">
              {STATS?.map((s) => (
                <div key={s.label} className="flex flex-col lg:items-end gap-0.5">
                  <span className="title text-3xl font-bold text-foreground tracking-tight">{s.value}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <motion.div variants={lineGrow} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="h-px w-full bg-border origin-left" aria-hidden="true" />

      {/* ── Philosophy Section ──────────────────────────────────────────── */}
      <PhilosophySection />

      {/* ── Improved How We Work (Differentiators) ─────────────────────── */}
      <section ref={diffRef} className="relative py-24 bg-muted/30 overflow-hidden border-y border-border">
        <div className="absolute top-0 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--color-primary), transparent 70%)", opacity: 0.03, filter: "blur(40px)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate={diffInView ? "visible" : "hidden"}
                className="flex items-center gap-3 mb-6">
                <div className="w-5 h-px bg-primary" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">How We Work</span>
              </motion.div>

              <h2 className="title font-bold leading-[1.0] tracking-[-0.03em] text-foreground">
                <div className="overflow-hidden pb-1">
                  <motion.span custom={0.06} variants={maskReveal} initial="hidden" animate={diffInView ? "visible" : "hidden"}
                    className="block text-[clamp(2rem,4.5vw,3.8rem)]">Why clients</motion.span>
                </div>
                <div className="overflow-hidden pb-1">
                  <motion.span custom={0.14} variants={maskReveal} initial="hidden" animate={diffInView ? "visible" : "hidden"}
                    className="block text-[clamp(2rem,4.5vw,3.8rem)] text-primary">come back.</motion.span>
                </div>
              </h2>
            </div>
            <motion.p custom={0.24} variants={fadeUp} initial="hidden" animate={diffInView ? "visible" : "hidden"}
              className="text-[15px] text-muted-foreground leading-relaxed max-w-md lg:text-right">
              We're different because of the specific choices we've made about how we work.
            </motion.p>
          </div>

          {/* Hairline Grid Matching Philosophy Section */}
          <motion.div 
            custom={0.3} variants={fadeUp} initial="hidden" animate={diffInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border shadow-sm"
          >
            {differentiators.map((d) => {
              const accentColor = ACCENT_VAR[d.accent];
              return (
                <div key={d.num} className="group relative bg-background p-10 md:p-14 overflow-hidden transition-colors duration-500 flex flex-col h-full">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 80% 20%, ${accentColor} 0%, transparent 50%)`, opacity: 0.04 }} />
                  
                  <div className="absolute -bottom-8 -right-4 text-[10rem] md:text-[12rem] font-black text-muted-foreground/5 pointer-events-none select-none transition-transform duration-700 group-hover:scale-105">
                    {d.num}
                  </div>

                  <div className="flex items-center gap-3 mb-12 relative z-10">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: accentColor }} />
                    <span className="text-[10px] font-mono tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">STEP {d.num}</span>
                  </div>

                  <div className="relative z-10 mt-auto">
                    <h3 className="text-xl md:text-2xl title font-bold text-foreground leading-snug tracking-tight mb-4">{d.title}</h3>
                    <p className="text-[15px] text-muted-foreground leading-relaxed max-w-[90%]">{d.body}</p>
                  </div>
                  
                  <div className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-out" style={{ background: accentColor }} />
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <TeamSection />

      {/*  CTA Section */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div ref={ctaRef} custom={0} variants={fadeUp} initial="hidden" animate={ctaInView ? "visible" : "hidden"}
            className="relative rounded-xl border border-border bg-card overflow-hidden shadow-md shadow-primary/5"
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, var(--color-primary) 0%, transparent 100%)", opacity: 0.03 }} />
            
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Work With Us</p>
                </div>
                <h2 className="title text-[clamp(2rem,4vw,3.5rem)] font-bold text-foreground tracking-tight leading-[1.05]">
                  If you're building something serious,<br className='hidden md:block' />
                  <span className="text-primary"> we'd like to hear about it.</span>
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 shrink-0">
                <Link href="/quote">
                  <Button size="lg" className="group h-14 px-8 rounded-md  font-bold transition-all">
                    <span className="relative z-10 flex items-center gap-2">
                      Begin my Project
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <Link href="/work" className="group flex items-center gap-2.5 h-14 px-4 text-sm font-bold text-muted-foreground hover:text-foreground">
                  See our work first
                  <span className="block w-0 h-px bg-foreground transition-all duration-300 group-hover:w-6" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

