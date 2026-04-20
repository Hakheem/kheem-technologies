"use client";

import { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const EASE = [0.76, 0, 0.24, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: Number(d) },
  }),
};

interface StrongCTAProps {
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  headingLine3?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  isExternal?: boolean;
  backgroundImage?: string;
  overlayOpacity?: number;
  bulletPoints?: { text: string }[];
  showStats?: boolean;
  stats?: { value: string; label: string }[];
}

const DEFAULT_BULLETS = [
  { text: "Tailored development for startups, businesses, and creators" },
  { text: "End-to-end collaboration with clear communication and results" },
  { text: "Scalable, secure, and high-performance code for every project" },
];

const DEFAULT_STATS = [
  { value: "48+", label: "Projects Delivered" },
  { value: "100%", label: "Client Retention" },
];

export function StrongCTA({
  eyebrow = "Let's Build Something Great",
  headingLine1 = "Ready to scale your business?",
  description = "High-performance digital infrastructure for businesses that refuse to stay small. Strategy, engineering, and brand — under one roof.",
  buttonText = "Start a Project",
  buttonHref = "/quote",
  secondaryButtonText = "View Work",
  secondaryButtonHref = "/work",
  isExternal = false,
  backgroundImage = "/images/14.jpg",
  overlayOpacity = 0.85,
  bulletPoints = DEFAULT_BULLETS,
  showStats = true,
  stats = DEFAULT_STATS,
}: StrongCTAProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const PrimaryButtonWrapper = isExternal ? "a" : Link;
  const primaryLinkProps = isExternal
    ? { href: buttonHref, target: "_blank", rel: "noopener noreferrer" }
    : { href: buttonHref };

  const SecondaryButtonWrapper = isExternal ? "a" : Link;
  const secondaryLinkProps = isExternal
    ? { href: secondaryButtonHref, target: "_blank", rel: "noopener noreferrer" }
    : { href: secondaryButtonHref };

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden" aria-labelledby="cta-heading">
      
      {/* Container for content with max width */}
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Card with background image */}
        <div className="relative rounded-2xl overflow-hidden">
          
          {/* Background Image - only inside the card */}
          <div className="absolute inset-0 z-0">
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0 z-10"
            style={{
              background: `linear-gradient(105deg, #121212 0%, #121212 45%, rgba(18,18,18,0.6) 70%, rgba(18,18,18,0.2) 100%)`,
              opacity: overlayOpacity,
            }}
          />

          {/* Content */}
          <div className="relative z-20 px-8 md:px-12 lg:px-16 py-16 md:py-20">
            <div className="max-w-2xl">
              
              {/* Eyebrow with ping dot */}
              <motion.div
                custom={0.15}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex items-center gap-3 mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-55" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                  {eyebrow}
                </span>
              </motion.div>

              {/* Headline - single line */}
              <motion.h1
                id="cta-heading"
                custom={0.0}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-[-0.02em] text-white mb-6"
              >
                {headingLine1}
              </motion.h1>

              {/* Description - smaller */}
              <motion.p
                custom={0.2}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-base md:text-lg leading-relaxed text-white/80 mb-8 max-w-xl"
              >
                {description}
              </motion.p>

              {/* Bullet Points */}
              {bulletPoints && bulletPoints.length > 0 && (
                <motion.ul
                  custom={0.3}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="space-y-3 mb-8 max-w-xl"
                >
                  {bulletPoints.map((point, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80 text-sm md:text-base">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      <span>{point.text}</span>
                    </li>
                  ))}
                </motion.ul>
              )}

              {/* Buttons - reasonable sizes */}
              <motion.div
                custom={0.4}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                {/* @ts-ignore */}
                <PrimaryButtonWrapper {...primaryLinkProps}>
                  <Button 
                    size="default" 
                    className="group h-11 px-6 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all"
                  >
                    {buttonText}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </PrimaryButtonWrapper>
                
                {secondaryButtonText && (
                  /* @ts-ignore */
                  <SecondaryButtonWrapper {...secondaryLinkProps}>
                    <span className="group inline-flex items-center gap-2 text-white/90 hover:text-white font-medium text-sm transition-all duration-200 border border-white/30 hover:border-white/60 px-5 py-2.5 rounded-md">
                      {secondaryButtonText}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </SecondaryButtonWrapper>
                )}
              </motion.div>

              {/* Stats */}
              {showStats && stats && stats.length > 0 && (
                <motion.div
                  custom={0.5}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="flex gap-8 pt-6 border-t border-white/20 max-w-md"
                >
                  {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/60 leading-tight">{stat.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}


