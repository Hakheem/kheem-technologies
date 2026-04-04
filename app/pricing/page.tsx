"use client";

import { useRef, useState } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const EASE = [0.76, 0, 0.24, 1] as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: d } }),
};

const maskReveal: Variants = {
  hidden:  { y: "108%", rotate: 1.2 },
  visible: (d = 0) => ({ y: "0%", rotate: 0, transition: { duration: 1.05, ease: EASE, delay: d } }),
};

// ─── Pricing tiers ────────────────────────────────────────────────────────────
const tiers = [
  {
    index:    "01",
    service:  "Websites & Web Apps",
    tag:      "Web",
    range:    "KES 80k – 500k",
    usd:      "$600 – $3,800",
    timeline: "3 – 8 weeks",
    accent:   "primary",
    description:
      "Marketing sites, landing pages, e-commerce, web apps, and full redesigns. Price moves based on number of pages, custom features, CMS requirements, and integrations.",
    includes: [
      "UI/UX design included",
      "Mobile-first, performance optimised",
      "CMS setup if needed",
      "Basic SEO foundation",
      "2 rounds of revision",
    ],
    href: "/quote?type=new-build",
  },
  {
    index:    "02",
    service:  "Custom Systems",
    tag:      "Systems",
    range:    "KES 250k – 1.5M+",
    usd:      "$1,900 – $11,500+",
    timeline: "6 – 16 weeks",
    accent:   "violet",
    description:
      "Internal tools, dashboards, booking systems, employee management, custom platforms. Price scales with user roles, data complexity, and third-party integrations.",
    includes: [
      "System architecture design",
      "User roles & permissions",
      "Database design",
      "API integrations",
      "Admin dashboard",
    ],
    href: "/quote?type=scaling",
  },
  {
    index:    "03",
    service:  "Mobile Applications",
    tag:      "Mobile",
    range:    "KES 200k – 1M+",
    usd:      "$1,500 – $7,700+",
    timeline: "6 – 14 weeks",
    accent:   "primary",
    description:
      "iOS and Android apps — consumer-facing or internal ops tools. Price reflects platform count, feature complexity, and backend requirements.",
    includes: [
      "iOS and/or Android",
      "Offline capability if needed",
      "Push notifications",
      "App store submission",
      "Backend API if required",
    ],
    href: "/quote?type=new-build",
  },
  {
    index:    "04",
    service:  "Integrations & Automation",
    tag:      "Integrations",
    range:    "KES 50k – 300k",
    usd:      "$380 – $2,300",
    timeline: "1 – 4 weeks",
    accent:   "emerald",
    description:
      "Connecting CRMs, payment systems, analytics, email tools, and custom APIs. Simple integrations at the low end; full workflow automation at the high end.",
    includes: [
      "API mapping & documentation",
      "Error handling & logging",
      "Testing across environments",
      "Handover + documentation",
    ],
    href: "/quote?type=integration",
  },
  {
    index:    "05",
    service:  "UI/UX Design",
    tag:      "Design",
    range:    "KES 50k – 250k",
    usd:      "$380 – $1,900",
    timeline: "1 – 3 weeks",
    accent:   "violet",
    description:
      "User research, wireframes, high-fidelity screens, and design systems. Can be standalone or as part of a larger build engagement.",
    includes: [
      "User flow mapping",
      "Wireframes + prototypes",
      "High-fidelity screens",
      "Design system / tokens",
      "Handoff to developers",
    ],
    href: "/quote?type=redesign",
  },
  {
    index:    "06",
    service:  "Brand Identity",
    tag:      "Brand",
    range:    "KES 40k – 180k",
    usd:      "$300 – $1,400",
    timeline: "1 – 2 weeks",
    accent:   "emerald",
    description:
      "Logo, visual identity, color systems, typography, brand guidelines. From startup brand builds to full rebrands for established businesses.",
    includes: [
      "Logo (3 concepts, 2 revisions)",
      "Color palette + typography",
      "Brand guideline document",
      "Print + digital formats",
      "Social media kit",
    ],
    href: "/quote?type=new-build",
  },
];

const ALWAYS_INCLUDED = [
  "Full project brief and planning session",
  "Weekly progress updates — no chasing",
  "Unlimited revisions during design phase",
  "Handover documentation",
  "30 days post-launch support",
  "Direct access to the people building it",
];

const ACCENT_VAR: Record<string, string> = {
  primary: "var(--color-primary)",
  violet:  "var(--color-brand-violet)",
  emerald: "var(--color-brand-emerald)",
};

// ─── Pricing card ─────────────────────────────────────────────────────────────
function PricingCard({
  tier,
  delay,
  isInView,
}: {
  tier: (typeof tiers)[number];
  delay: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = ACCENT_VAR[tier.accent];

  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-shadow duration-400 hover:shadow-lg hover:shadow-foreground/5"
    >
      {/* Top accent bar */}
      <div className="h-0.5 w-full" style={{ background: accent }} aria-hidden="true" />

      <div className="flex flex-col flex-1 p-7">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[9px] font-bold tabular-nums text-muted-foreground/40 tracking-wider">{tier.index}</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 rounded-full border"
                style={{ color: accent, borderColor: `color-mix(in srgb, ${accent} 30%, var(--color-border))`, background: `color-mix(in srgb, ${accent} 8%, transparent)` }}>
                {tier.tag}
              </span>
            </div>
            <h3 className="title text-lg font-bold text-foreground tracking-tight leading-snug">{tier.service}</h3>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-5">
          <p className="title text-2xl font-bold tracking-tight" style={{ color: accent }}>{tier.range}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{tier.usd} · {tier.timeline}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{tier.description}</p>

        {/* Includes */}
        <ul className="space-y-2 mb-7" role="list" aria-label={`What ${tier.service} includes`}>
          {tier.includes.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm">
              <Check className="w-3.5 h-3.5 shrink-0" style={{ color: accent }} aria-hidden="true" />
              <span className="text-foreground font-medium">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={tier.href}
          className="group/link flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
          style={{ color: accent }}
          aria-label={`Get a quote for ${tier.service}`}
        >
          Get a quote
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const heroRef     = useRef<HTMLDivElement>(null);
  const heroInView  = useInView(heroRef, { once: true });

  const tiersRef    = useRef<HTMLDivElement>(null);
  const tiersInView = useInView(tiersRef, { once: true, margin: "-5%" });

  const inclRef     = useRef<HTMLDivElement>(null);
  const inclInView  = useInView(inclRef, { once: true, margin: "-8%" });

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute -top-24 left-1/3 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--color-primary), transparent 68%)", opacity: 0.06, filter: "blur(24px)" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="flex items-center gap-3 mb-8">
            <div className="w-5 h-px bg-primary" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Pricing</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <h1 className="title font-bold leading-[0.92] tracking-[-0.03em] mb-0">
                <div className="overflow-hidden pb-1">
                  <motion.span custom={0.05} variants={maskReveal} initial="hidden" animate={heroInView ? "visible" : "hidden"}
                    className="block text-[clamp(2.8rem,7vw,6.5rem)] text-foreground">Clear.</motion.span>
                </div>
                <div className="overflow-hidden pb-1">
                  <motion.span custom={0.13} variants={maskReveal} initial="hidden" animate={heroInView ? "visible" : "hidden"}
                    className="block text-[clamp(2.8rem,7vw,6.5rem)] text-foreground">Straightforward.</motion.span>
                </div>
                <div className="overflow-hidden pb-1">
                  <motion.span custom={0.21} variants={maskReveal} initial="hidden" animate={heroInView ? "visible" : "hidden"}
                    className="block text-[clamp(2.8rem,7vw,6.5rem)] text-primary">No surprises.</motion.span>
                </div>
              </h1>
            </div>

            <motion.div custom={0.30} variants={fadeUp} initial="hidden" animate={heroInView ? "visible" : "hidden"}
              className="max-w-md">
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">
                We don't do hidden fees or vague retainers. Every project is scoped, quoted,
                and delivered against a clear brief. Here's what to expect.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed p-4 rounded-xl border border-border bg-muted/20">
                <span className="font-semibold text-foreground">A note on ranges:</span>{" "}
                Prices vary with scope. We give you a fixed quote before anything starts — and we stick to it.
                No invoice surprises.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Tiers ─────────────────────────────────────────────────────────── */}
      <section ref={tiersRef} className="py-16 border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tiers.map((tier, i) => (
              <PricingCard
                key={tier.index}
                tier={tier}
                delay={0.08 + i * 0.07}
                isInView={tiersInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Always included ───────────────────────────────────────────────── */}
      <section ref={inclRef} className="py-24 border-t border-border bg-muted/20">
        <div className="container mx-auto px-6 max-w-7xl">

          <div className="flex flex-col lg:flex-row lg:items-start gap-16">
            {/* Left */}
            <div className="lg:max-w-sm">
              <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inclInView ? "visible" : "hidden"}
                className="flex items-center gap-3 mb-6">
                <div className="w-5 h-px bg-primary" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Standard</span>
              </motion.div>

              <h2 className="title font-bold leading-[1.0] tracking-[-0.02em] text-foreground">
                <div className="overflow-hidden pb-1">
                  <motion.span custom={0.06} variants={maskReveal} initial="hidden" animate={inclInView ? "visible" : "hidden"}
                    className="block text-[clamp(1.8rem,4vw,3.2rem)]">Always</motion.span>
                </div>
                <div className="overflow-hidden pb-1">
                  <motion.span custom={0.14} variants={maskReveal} initial="hidden" animate={inclInView ? "visible" : "hidden"}
                    className="block text-[clamp(1.8rem,4vw,3.2rem)] text-primary">included.</motion.span>
                </div>
              </h2>

              <motion.p custom={0.22} variants={fadeUp} initial="hidden" animate={inclInView ? "visible" : "hidden"}
                className="text-[15px] text-muted-foreground leading-relaxed mt-5">
                These aren't upsells. They're the baseline for how we work with every client,
                on every project, at every price point.
              </motion.p>
            </div>

            {/* Right — list */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ALWAYS_INCLUDED.map((item, i) => (
                  <motion.div
                    key={item}
                    custom={0.15 + i * 0.08}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inclInView ? "visible" : "hidden"}
                    className="flex items-start gap-3 p-5 rounded-xl border border-border bg-card"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-semibold text-foreground leading-snug">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Not a fit note */}
          <motion.div
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate={inclInView ? "visible" : "hidden"}
            className="mt-14 p-7 rounded-2xl border border-border bg-card"
          >
            <div className="flex items-start gap-4">
              <div className="w-1 h-full min-h-[60px] rounded-full bg-muted-foreground/20 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">Worth saying clearly</p>
                <p className="text-[15px] text-foreground font-medium leading-relaxed max-w-3xl">
                  We're not the cheapest option. If budget is the primary factor, we're probably not the right fit.
                  What we offer is precision, reliability, and work that compounds — systems that keep performing
                  long after the invoice is paid. If that sounds like what you need, we'd love to talk.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-lg">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">Next Step</p>
              <h2 className="title text-[clamp(1.8rem,4vw,3rem)] font-bold text-foreground tracking-tight leading-tight">
                Not sure what your project needs?
                <br />
                <span className="text-primary">Let's figure it out before you commit.</span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link href="/quote">
                <Button
                  size="lg"
                  className="group relative h-13 px-8 rounded-full bg-primary text-primary-foreground font-bold text-sm overflow-hidden transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-primary/20"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get a Free Quote
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <span className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/contact"
                className="group flex items-center gap-2.5 h-13 px-2 text-sm font-bold text-foreground transition-opacity hover:opacity-60">
                Ask a question first
                <span className="block w-4 h-px bg-foreground transition-all duration-500 group-hover:w-8" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

