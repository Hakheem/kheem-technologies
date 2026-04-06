"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";

const COMPANY_LOGOS = [
  { id: 1, name: "Wazirent", logo: "/company/wazilogo.png", width: 120, height: 60 }, // height increased from 40 to 60
  { id: 2, name: "Barabara Voyagers", logo: "/company/barabara_logo.svg", width: 140, height: 54 }, // height increased from 36 to 54
  { id: 3, name: "Skilly Bridge", logo: "/company/company3.svg", width: 110, height: 66 }, // height increased from 44 to 66
  { id: 4, name: "East Ride", logo: "/company/company4.svg", width: 130, height: 57 }, // height increased from 38 to 57
  { id: 5, name: "Tibapoint", logo: "/company/company5.svg", width: 100, height: 60 }, // height increased from 40 to 60
  { id: 6, name: "Sixpoint Victoria", logo: "/company/company6.svg", width: 150, height: 52 }, // height increased from 35 to 52
  { id: 7, name: "Lablab Studios", logo: "/company/company7.svg", width: 125, height: 63 }, // height increased from 42 to 63
  { id: 8, name: "East Side Urban", logo: "/company/company8.svg", width: 115, height: 57 }, // height increased from 38 to 57
];

const EASE = [0.76, 0, 0.24, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE as any, delay: d },
  }),
};

export function TrustedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    let animationId: number;
    let startTime: number;
    let pausedTime: number = 0;
    let currentProgress: number = 0;
    const duration = 60000; // Increased from 30000 to 60000 (slower speed)

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
        if (pausedTime > 0) {
          startTime = timestamp - pausedTime;
        }
      }
      
      if (!isHovered) {
        const elapsed = timestamp - startTime;
        const progress = (elapsed % duration) / duration;
        currentProgress = progress;
        const translateX = -progress * 50;
        
        if (slider) {
          slider.style.transform = `translateX(${translateX}%)`;
        }
      } else {
        // Store the current progress when paused
        pausedTime = timestamp - startTime;
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isHovered]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-background"
      aria-labelledby="trusted-heading"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[100px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--color-primary), transparent 68%)",
          opacity: 0.04,
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        
        {/* Two column layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          
          {/* Left side - Text (20% width on desktop) */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:w-[20%] shrink-0 text-center lg:text-left"
          >
            <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
              <div className="w-8 h-px bg-primary" aria-hidden="true" />
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-primary">
                Trusted By
              </span>
            </div>
            
            <h3 id="trusted-heading" className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-3">
              Industry leaders
            </h3>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              We've partnered with innovative companies to build digital products that scale.
            </p>
          </motion.div>

          {/* Right side - Infinite slider (80% width) */}
          <div className="lg:w-[80%] w-full overflow-hidden relative">
            
            {/* Left fade gradient */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(to right, var(--color-background), transparent)",
              }}
              aria-hidden="true"
            />
            
            {/* Right fade gradient */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
              style={{
                background: "linear-gradient(to left, var(--color-background), transparent)",
              }}
              aria-hidden="true"
            />

            {/* Slider container */}
            <div className="overflow-hidden">
              <div
                ref={sliderRef}
                className="flex items-start gap-12 whitespace-nowrap will-change-transform"
                style={{ width: "fit-content" }}
              >
                {/* Double the logos for seamless loop */}
                {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((company, idx) => (
                  <div
                    key={`${company.id}-${idx}`}
                    className="flex-shrink-0 group"
                  >
                    {/* Logo Container */}
                    <div 
                      className="relative grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      style={{ width: company.width, height: company.height }}
                    >
                      <Image
                        src={company.logo}
                        alt={`${company.name} logo`}
                        fill
                        className="object-contain"
                        sizes={`${company.width}px`}
                      />
                    </div>
                    
                    {/* Company name below logo - appears on hover */}
                    <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[8px] font-medium text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                        {company.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


