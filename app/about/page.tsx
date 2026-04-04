"use client";

import { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { teamMembers, STATS } from "@/lib/data";

const EASE = [0.76, 0, 0.24, 1] as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: d } }),
};

const maskReveal: Variants = {
  hidden:  { y: "108%", rotate: 1.2 },
  visible: (d = 0) => ({ y: "0%", rotate: 0, transition: { duration: 1.05, ease: EASE, delay: d } }),
};

const lineGrow: Variants = {
  hidden:  { scaleX: 0 },
  visible: (d = 0) => ({ scaleX: 1, transition: { duration: 1, ease: EASE, delay: d } }),
};

// ─── Philosophy statements ────────────────────────────────────────────────────
const philosophy = [
  {
    statement: "We don't start with how it looks. We start with what it needs to do.",
    sub: "Design follows function. Always. A beautiful site that doesn't convert is an expensive brochure.",
  },
  {
    statement: "Small by design. Not by accident.",
    sub: "We take on fewer projects so every client gets our full attention — not a junior account team.",
  },
  {
    statement: "The best digital infrastructure is the kind you forget is there.",
    sub: "Because it just works. No crashes, no slow loads, no excuses.",
  },
];

// ─── How we work differently ──────────────────────────────────────────────────
const differentiators = [
  {
    title: "We audit before we propose",
    body: "We don't quote a project we don't understand. Before anything starts, we take time to understand your business, your customers, and your actual constraints.",
    accent: "primary",
  },
  {
    title: "You speak directly to the people building",
    body: "No account managers in the middle. The person you brief is the person who designs and builds. That's intentional.",
    accent: "violet",
  },
  {
    title: "We don't disappear at launch",
    body: "30 days post-launch support is built into every engagement. We make sure everything works, you understand it, and you're set up to grow.",
    accent: "emerald",
  },
  {
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

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <section ref={ref} className={`relative py-24 overflow-hidden ${className}`}>
      {children}
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const philRef    = useRef<HTMLDivElement>(null);
  const philInView = useInView(philRef, { once: true, margin: "-8%" });

  const diffRef    = useRef<HTMLDivElement>(null);
  const diffInView = useInView(diffRef, { once: true, margin: "-8%" });

  const teamRef    = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-8%" });

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
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

              {/* Intro paragraph */}
              <motion.p custom={0.25} variants={fadeUp} initial="hidden" animate={heroInView ? "visible" : "hidden"}
                className="text-[15px] md:text-base text-muted-foreground leading-relaxed max-w-xl">
                Kheem is a digital systems studio based in Nairobi. We build the websites, apps,
                and infrastructure that let ambitious businesses stop playing small. We're not a
                one-size-fits-all agency — we're a small, deliberate team that takes on work we
                can do exceptionally well.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div custom={0.32} variants={fadeUp} initial="hidden" animate={heroInView ? "visible" : "hidden"}
              className="flex items-center gap-10 lg:flex-col lg:items-end lg:gap-6 shrink-0">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col lg:items-end gap-0.5">
                  <span className="title text-3xl font-bold text-foreground tracking-tight">{s.value}</span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Divider ───────────────────────────────────────────────────────── */}
      <motion.div variants={lineGrow} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="h-px w-full bg-border origin-left" aria-hidden="true" />

      {/* ── Philosophy ────────────────────────────────────────────────────── */}
      <section ref={philRef} className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">

          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={philInView ? "visible" : "hidden"}
            className="flex items-center gap-3 mb-16">
            <div className="w-5 h-px bg-primary" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">How We Think</span>
          </motion.div>

          <div className="space-y-0">
            {philosophy.map((p, i) => (
              <motion.div
                key={i}
                custom={0.1 + i * 0.12}
                variants={fadeUp}
                initial="hidden"
                animate={philInView ? "visible" : "hidden"}
                className="group border-b border-border py-10 flex flex-col md:flex-row md:items-start md:gap-16"
              >
                <span className="text-[10px] font-bold tabular-nums text-muted-foreground/40 tracking-wider shrink-0 w-8 mt-1">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <p className="title text-[clamp(1.4rem,3vw,2.4rem)] font-bold text-foreground leading-tight tracking-tight mb-4 group-hover:text-primary transition-colors duration-300">
                    "{p.statement}"
                  </p>
                  <p className="text-[15px] text-muted-foreground leading-relaxed max-w-xl">{p.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we work differently ───────────────────────────────────────── */}
      <section ref={diffRef} className="relative py-24 bg-muted/20 overflow-hidden border-y border-border">
        <div className="absolute bottom-0 -left-32 w-[450px] h-[450px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--color-primary), transparent 68%)", opacity: 0.05, filter: "blur(20px)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
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
              className="text-[15px] text-muted-foreground leading-relaxed max-w-sm lg:text-right">
              We're not different because we say we are. We're different because of
              the specific choices we've made about how we work.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {differentiators.map((d, i) => {
              const accent = ACCENT_VAR[d.accent];
              return (
                <motion.div
                  key={i}
                  custom={0.2 + i * 0.09}
                  variants={fadeUp}
                  initial="hidden"
                  animate={diffInView ? "visible" : "hidden"}
                  className="group rounded-2xl border border-border bg-card p-7 hover:shadow-md transition-shadow duration-400"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: accent }} aria-hidden="true" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="title text-lg font-bold text-foreground tracking-tight mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                    {d.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.body}</p>
                  {/* Bottom accent */}
                  <div className="mt-5 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500" style={{ background: accent }} aria-hidden="true" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────────────────── */}
      <section ref={teamRef} className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <div>
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate={teamInView ? "visible" : "hidden"}
                className="flex items-center gap-3 mb-6">
                <div className="w-5 h-px bg-primary" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">The Team</span>
              </motion.div>

              <h2 className="title font-bold leading-[1.0] tracking-[-0.03em] text-foreground">
                <div className="overflow-hidden pb-1">
                  <motion.span custom={0.06} variants={maskReveal} initial="hidden" animate={teamInView ? "visible" : "hidden"}
                    className="block text-[clamp(2rem,4.5vw,3.8rem)]">Small team.</motion.span>
                </div>
                <div className="overflow-hidden pb-1">
                  <motion.span custom={0.14} variants={maskReveal} initial="hidden" animate={teamInView ? "visible" : "hidden"}
                    className="block text-[clamp(2rem,4.5vw,3.8rem)] text-primary">Full focus.</motion.span>
                </div>
              </h2>
            </div>

            <motion.p custom={0.24} variants={fadeUp} initial="hidden" animate={teamInView ? "visible" : "hidden"}
              className="text-[15px] text-muted-foreground leading-relaxed max-w-sm lg:text-right">
              We're intentionally small. It means every client gets our full attention —
              not a rotating cast of juniors.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                custom={0.15 + i * 0.1}
                variants={fadeUp}
                initial="hidden"
                animate={teamInView ? "visible" : "hidden"}
                className="group flex flex-col gap-5 rounded-2xl border border-border bg-card p-7 hover:border-primary/30 transition-all duration-400"
              >
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                  <span className="title text-lg font-bold text-primary">
                    {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-foreground text-base leading-snug mb-1">{member.name}</h3>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">{member.role}</p>
                </div>

                <a
                  href={`mailto:${member.email}`}
                  className="text-[11px] text-muted-foreground hover:text-primary transition-colors font-medium mt-auto"
                >
                  {member.email}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">Work With Us</p>
              <h2 className="title text-[clamp(1.8rem,4vw,3rem)] font-bold text-foreground tracking-tight leading-tight">
                If you're building something serious,<br />
                <span className="text-primary">we'd like to hear about it.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link href="/quote">
                <Button
                  size="lg"
                  className="group relative h-13 px-8 rounded-full bg-primary text-primary-foreground font-bold text-sm overflow-hidden transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-primary/20"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start a Project
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <span className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/work"
                className="group flex items-center gap-2.5 h-13 px-2 text-sm font-bold text-foreground transition-opacity hover:opacity-60">
                See our work first
                <span className="block w-4 h-px bg-foreground transition-all duration-500 group-hover:w-8" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

