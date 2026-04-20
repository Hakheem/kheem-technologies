"use client";

import { useRef, useState } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard, CaseStudy } from "@/components/general/ProjectCard";
import { STATS } from "@/lib/data";

// ─── Animation helpers (shared with ProjectCard) ──────────────────────────────
const EASE = [0.76, 0, 0.24, 1] as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
};

const maskReveal: Variants = {
  hidden:  { y: "108%", rotate: 1.2 },
  visible: (d = 0) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1.05, ease: EASE, delay: d },
  }),
};

// ─── Filter categories ────────────────────────────────────────────────────────
const FILTERS = ["All", "Web", "Systems", "Mobile", "Brand"] as const;
type Filter = (typeof FILTERS)[number];

// ─── Case studies data ────────────────────────────────────────────────────────
// projectType: "redesign" → before/after drag-to-compare slider
// projectType: "standard" → scrollable image(s) with carousel if multiple
const caseStudies: (CaseStudy & { filterCategory: Filter })[] = [
  {
    index:       "01",
    type_label:  "Web Application",
    industry:    "PropTech",
    client:      "WaziRent",
    challenge:
      "Tenants and landlords were managing rentals through WhatsApp and spreadsheets — payments missed, disputes constant, no paper trail.",
    solution:
      "A full rental management platform: digital leases, automated rent reminders, M-Pesa payment integration, and a landlord dashboard with occupancy tracking.",
    result:
      "Reduced payment disputes by 80% and cut admin time for landlords by half.",
    tags:        ["Web App", "Payments", "Dashboard"],
    href:        "/work/wazirent",
    liveLink:    "https://wazirent.co.ke",
    accentColor: "primary",
    projectType: "standard",
    images: [
      "/images/wazirent.png",
      "/images/wazirent_dashboard.png",
      "/images/wazirent_payments.png",
    ],
    filterCategory: "Web",
  },
  {
    index:       "02",
    type_label:  "Website Redesign",
    industry:    "Tourism",
    client:      "Barabara Voyagers",
    challenge:
      "A premium safari company with a website that looked anything but premium — no online bookings, no trust signals, losing clients to better-looking competitors.",
    solution:
      "A high-end website redesign with immersive imagery, an integrated booking and quote system, and SEO foundations that put them in front of the right searches.",
    result:
      "3× increase in inbound enquiries within 60 days of launch.",
    tags:        ["Redesign", "Booking", "SEO"],
    href:        "/work/barabara-voyagers",
    liveLink:    "https://barbaravoyagers.com",
    accentColor: "emerald",
    projectType: "redesign",
    beforeImage: "/images/barabara_before.png",
    afterImage:  "/images/Barabara Voyagers New.png",
    filterCategory: "Web",
  },
  {
    index:       "03",
    type_label:  "Brand Identity + Website",
    industry:    "Fitness & Wellness",
    client:      "Kinimatic",
    challenge:
      "A new fitness brand with no visual identity, no web presence, and no way to communicate what made them different in a saturated market.",
    solution:
      "End-to-end brand build: logo, color system, typography, and a conversion-focused website with class scheduling and membership sign-up flows.",
    result:
      "Sold out first cohort within two weeks of launch. Brand now recognized locally.",
    tags:        ["Brand", "Web Design", "Identity"],
    href:        "/work/kinimatic",
    accentColor: "violet",
    projectType: "standard",
    images: [
      "/images/kinimatic_home.png",
      "/images/kinimatic_brand.png",
    ],
    filterCategory: "Brand",
  },
  {
    index:       "04",
    type_label:  "Custom Internal System",
    industry:    "Field Services",
    client:      "FieldOps",
    challenge:
      "A field services company tracking 40+ technicians on paper, losing jobs to poor scheduling, and unable to generate reports for clients.",
    solution:
      "A custom job management system with technician assignment, GPS check-ins, job status tracking, client-facing report generation, and invoice automation.",
    result:
      "Operations team reduced from 4 coordinators to 2. Zero missed jobs in first quarter after launch.",
    tags:        ["Custom System", "Automation", "Internal Tool"],
    href:        "/work/fieldops",
    liveLink:    "https://fieldops.co.ke",
    accentColor: "primary",
    projectType: "standard",
    images: [
      "/images/fieldops.png",
      "/images/fieldops_dashboard.png",
    ],
    filterCategory: "Systems",
  },
];

// ─── Filter helpers ───────────────────────────────────────────────────────────
const categoryMap: Record<Filter, string[]> = {
  All:     [],
  Web:     ["Web"],
  Systems: ["Systems"],
  Mobile:  ["Mobile"],
  Brand:   ["Brand"],
};

function matchesFilter(
  study: (typeof caseStudies)[number],
  filter: Filter,
): boolean {
  if (filter === "All") return true;
  return study.filterCategory === filter;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function WorkPage() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = caseStudies.filter((s) => matchesFilter(s, activeFilter));

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-36 pb-16 overflow-hidden">
        {/* Ambient blob */}
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--color-primary), transparent 68%)",
            opacity: 0.06,
            filter: "blur(24px)",
          }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-5 h-px bg-primary" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Our Work
            </span>
          </motion.div>

          <h1 className="title font-bold leading-[0.92] tracking-[-0.03em] mb-6">
            <div className="overflow-hidden pb-1">
              <motion.span
                custom={0.05}
                variants={maskReveal}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                className="block text-[clamp(2.8rem,7vw,6.5rem)] text-foreground"
              >
                Work that
              </motion.span>
            </div>
            <div className="overflow-hidden pb-1">
              <motion.span
                custom={0.15}
                variants={maskReveal}
                initial="hidden"
                animate={heroInView ? "visible" : "hidden"}
                className="block text-[clamp(2.8rem,7vw,6.5rem)] text-primary"
              >
                delivers results.
              </motion.span>
            </div>
          </h1>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <motion.p
              custom={0.25}
              variants={fadeUp}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="text-[15px] text-muted-foreground leading-relaxed max-w-xl"
            >
              Every project here started with a specific problem.
              Here's what we built — and what changed.
            </motion.p>

            {/* Stats bar */}
            <motion.div
              custom={0.32}
              variants={fadeUp}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="flex items-center gap-8 shrink-0"
            >
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="title text-2xl font-bold text-foreground tracking-tight">
                    {s.value}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Filter bar ───────────────────────────────────────────────────── */}
      <div className="border-y border-border sticky top-[70px] bg-background/90 backdrop-blur-md z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div
            className="flex items-center gap-0 overflow-x-auto"
            role="tablist"
            aria-label="Filter projects by type"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={activeFilter === f}
                onClick={() => setActiveFilter(f)}
                className={`relative shrink-0 px-5 py-4 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-200 ${
                  activeFilter === f
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
                {activeFilter === f && (
                  <motion.div
                    layoutId="filter-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ duration: 0.3, ease: EASE }}
                    aria-hidden="true"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Project list ─────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="h-px w-full bg-border" aria-hidden="true" />

        {filtered.length > 0 ? (
          filtered.map((study, i) => (
            <ProjectCard key={study.index} study={study} index={i} />
          ))
        ) : (
          <div className="py-32 text-center">
            <p className="text-muted-foreground text-sm">
              No projects in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">
                Next Steps
              </p>
              <h2 className="title text-[clamp(1.8rem,4vw,3rem)] font-bold text-foreground tracking-tight leading-tight">
                Working on something that needs
                <br />
                <span className="text-primary">this kind of thinking?</span>
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
                    <ArrowRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
              <Link
                href="/contact"
                className="group flex items-center gap-2.5 h-13 px-2 text-sm font-bold text-foreground transition-opacity hover:opacity-60"
              >
                Talk to us first
                <span
                  className="block w-4 h-px bg-foreground transition-all duration-500 group-hover:w-8"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

