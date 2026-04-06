"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/lib/data";

// ─── Constants & Colors ───────────────────────────────────────────────────────
const ACCENT: Record<string, string> = {
  primary: "var(--color-primary)",
  violet:  "var(--color-brand-violet)",
  emerald: "var(--color-brand-emerald)",
};

// ─── Scrollable Image Component ───────────────────────────────────────────────
function ScrollableImage({ src, alt, accent }: { src: string; alt: string; accent: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      setCanScroll(container.scrollHeight > container.clientHeight);
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isHovering) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollTop += e.deltaY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isHovering]);

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Scrollable container - no visible scrollbar */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="relative w-full">
          <Image
            src={src}
            alt={alt}
            width={800}
            height={1200}
            className="w-full h-auto"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
      </div>
      
      {/* Scroll indicator - shows only if content is scrollable */}
      {canScroll && (
        <div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none transition-opacity duration-300"
          style={{ opacity: isHovering ? 0 : 0.7 }}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-[8px] font-medium uppercase tracking-wider text-white/60">
              Scroll
            </span>
            <ChevronDown className="w-3 h-3 text-white/60 animate-bounce" />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Section Component ───────────────────────────────────────────────────
export function WorkSection() {
  const [activeCard, setActiveCard] = useState(0);
  
  // Get active accent color for subtle ambient effects
  const activeAccent = ACCENT[caseStudies[activeCard]?.accentColor] ?? ACCENT.primary;

  return (
    <section className="relative py-20 md:py-24 bg-background overflow-clip">
      
      {/* Subtle Animated Background Glow matching the active project */}
      <motion.div
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-10 blur-[120px] mix-blend-screen transition-colors duration-700"
        animate={{ backgroundColor: activeAccent }}
        aria-hidden="true"
      />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 max-w-7xl mb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-4 h-px bg-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Our Work
              </span>
            </div>
            <h2 className="title text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-foreground">
              Real problems.<br/>
              <span className="text-primary">Measurable results.</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm lg:text-right leading-relaxed z-10">
            Every project below started with a specific problem. Here's what we built — and what changed.
          </p>
        </div>
      </div>

      {/* ── Sticky Scroll Container ────────────────────────────────────────── */}
      <div className="relative flex justify-center container mx-auto px-6 max-w-7xl gap-10 lg:gap-16">
        
        {/* Left Column: Scrolling Content */}
        <div className="w-full lg:w-[55%] relative flex flex-col items-start pb-[10vh]">
          {caseStudies.map((study, index) => {
            const isActive = activeCard === index;
            const accent = ACCENT[study.accentColor] ?? ACCENT.primary;

            return (
              <motion.div 
                key={study.index} 
                onViewportEnter={() => setActiveCard(index)}
                viewport={{ amount: 0.4, margin: "-10% 0px -10% 0px" }}
                className="w-full min-h-[70vh] flex flex-col justify-center py-16 lg:py-24"
              >
                <motion.div 
                  animate={{ opacity: isActive ? 1 : 0.25 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  {/* Mobile-only Scrollable Image (Hidden on Desktop) */}
                  <div className="lg:hidden w-full h-[500px] relative rounded-xl overflow-hidden mb-8 border border-border bg-muted">
                    <ScrollableImage
                      src={study.image}
                      alt={study.client}
                      accent={accent}
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="title text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">
                        {study.client}
                      </h3>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {study.industry}
                      </span>
                    </div>
                    <div className="text-sm font-bold tabular-nums text-foreground/20 tracking-widest">
                      {study.index}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {study.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground border border-border/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
                        The Problem
                      </p>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>
                        What We Built
                      </p>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                  </div>

                  {/* Result Highlight */}
                  <div
                    className="mb-8 px-5 py-4 rounded-md border border-dashed backdrop-blur-sm"
                    style={{
                      background: `color-mix(in srgb, ${accent} 4%, transparent)`,
                      borderColor: `color-mix(in srgb, ${accent} 30%, var(--color-border))`,
                    }}
                  >
                    <p className="text-sm font-bold leading-snug flex items-center gap-3" style={{ color: accent }}>
                      <span className="w-2 h-2 rounded-sm bg-current shrink-0" />
                      {study.result}
                    </p>
                  </div>

                  {/* Dynamic Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    {study.caseStudyLink && (
                      <Link
                        href={study.caseStudyLink}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring shadow-md"
                      >
                        <span className="text-xs font-bold uppercase tracking-wider">
                          Case Study
                        </span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}

                    {study.externalLink && (
                      <a
                        href={study.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-card text-foreground rounded-md transition-all hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring border border-border shadow-sm group/link"
                      >
                        <span className="text-xs font-bold uppercase tracking-wider">
                          View Live
                        </span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/link:text-foreground transition-colors" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Sticky Visuals (Desktop Only) - Now with scrollable image */}
        <div className="hidden lg:block w-[45%] h-screen sticky top-0 py-[15vh]">
          <div className="relative w-full h-[70vh] rounded-xl overflow-hidden border border-border/80 bg-muted shadow-2xl shadow-black/10">
            
            {/* Simple image container without browser chrome */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <ScrollableImage
                  src={caseStudies[activeCard]?.image || "/images/placeholder.jpg"}
                  alt={`${caseStudies[activeCard]?.client} project preview`}
                  accent={activeAccent}
                />
                
                {/* Subtle gradient overlay pulling from project accent color */}
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10"
                  style={{ background: `linear-gradient(to bottom right, transparent, ${activeAccent})` }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

