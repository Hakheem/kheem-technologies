"use client";

import { useRef, useEffect, useState } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram, FaGlobe, FaDribbble } from "react-icons/fa";
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

// Icon mapping for socials - handles all platforms
const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "linkedin":
      return <FaLinkedin className="w-3.5 h-3.5" />;
    case "github":
      return <FaGithub className="w-3.5 h-3.5" />;
    case "instagram":
      return <FaInstagram className="w-3.5 h-3.5" />;
    case "dribbble":
      return <FaDribbble className="w-3.5 h-3.5" />;
    case "website":
    case "portfolio":
    case "live":
      return <FaGlobe className="w-3.5 h-3.5" />;
    default:
      return <FaGlobe className="w-3.5 h-3.5" />;
  }
};

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

  // Slider state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1536) setItemsPerView(4); // 2xl
      else if (width >= 1024) setItemsPerView(3); // lg
      else if (width >= 768) setItemsPerView(2); // md
      else setItemsPerView(1); // mobile
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (!sliderRef.current || isDragging) return;

    const interval = setInterval(() => {
      if (sliderRef.current && !isDragging) {
        const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        const nextScroll = sliderRef.current.scrollLeft + 320;
        
        if (nextScroll >= maxScroll) {
          sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          sliderRef.current.scrollTo({ left: nextScroll, behavior: "smooth" });
        }
        setCurrentIndex(Math.floor(sliderRef.current.scrollLeft / 320));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isDragging]);

  // Mouse drag handlers for slider
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

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

              <motion.p custom={0.25} variants={fadeUp} initial="hidden" animate={heroInView ? "visible" : "hidden"}
                className="text-[15px] md:text-base text-muted-foreground leading-relaxed max-w-xl">
                Kheem is a digital systems studio based in Nairobi. We build the websites, apps,
                and infrastructure that let ambitious businesses stop playing small. We're not a
                one-size-fits-all agency — we're a small, deliberate team that takes on work we
                can do exceptionally well.
              </motion.p>
            </div>

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
              className="text-[15px] text-muted-foreground leading-relaxed max-w-md lg:text-right">
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
                  <div className="mt-5 h-0.5 w-0 group-hover:w-full rounded-full transition-all duration-500" style={{ background: accent }} aria-hidden="true" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Team Slider ────────────────────────────────────────────────────── */}
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
              className="text-[15px] text-muted-foreground leading-relaxed max-w-md lg:text-right">
              We're intentionally small. It means every client gets our full attention —
              not a rotating cast of juniors.
            </motion.p>
          </div>

          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth cursor-grab active:cursor-grabbing hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                custom={0.15 + i * 0.1}
                variants={fadeUp}
                initial="hidden"
                animate={teamInView ? "visible" : "hidden"}
                className="relative flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] 2xl:w-[calc(25%-18px)] group/card"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.role}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </motion.div>
                  
                  {/* Primary Color Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  
                  {/* Social Icons - Top Right (visible on hover) - Shows max 3 icons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 transition-all duration-300 translate-x-2 group-hover/card:translate-x-0">
                    {member.socials && Object.entries(member.socials).slice(0, 3).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-background/90 backdrop-blur-sm text-foreground hover:text-primary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {getSocialIcon(platform)}
                      </a>
                    ))}
                  </div>
                  
                  {/* Content Overlay - Bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500">
                    {/* Name */}
                    <h3 className="font-bold text-xl leading-snug tracking-tight mb-1 text-white">
                      {member.name}
                    </h3>
                    
                    {/* Role */}
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary mb-2">
                      {member.role}
                    </p>
                    
                    {/* Bio */}
                    <p className="text-xs text-white/80 leading-relaxed mb-3 line-clamp-2">
                      {member.bio}
                    </p>
                    
                    {/* Email Link */}
                    <a
                      href={`mailto:${member.email}`}
                      className="text-xs text-white/70 hover:text-white transition-colors font-medium inline-flex items-center gap-1.5 group/link"
                    >
                      <span>{member.email}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Slider Indicators */}
          {teamMembers.length > itemsPerView && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(teamMembers.length / itemsPerView) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (sliderRef.current) {
                      sliderRef.current.scrollTo({
                        left: i * sliderRef.current.clientWidth,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    currentIndex === i ? "w-8 bg-primary" : "w-4 bg-border hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          )}
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

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}

