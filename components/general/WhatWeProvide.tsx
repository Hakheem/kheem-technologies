"use client";

import Image from "next/image";

export default function WhatWeProvide() {
  return (
    <section className="padded mx-auto py-20 px-6">
      {/* Section Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="title text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            What We Provide
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to scale your operations, evaluate performance, and ship faster. 
            All in one integrated platform.
          </p>
        </div>
      </div>

      {/* Bento Grid - Added explicit heights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] md:auto-rows-[320px]">
        
        {/* Grid 1: Spans 2 columns (Evaluate Business Performance) - Taller card */}
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl border border-border bg-card p-8 flex flex-col justify-between transition-all hover:border-primary/30">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/home-about.webp"
              alt="Business performance dashboard"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
          
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          
          {/* Subtle Gradient Background (kept) */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-violet-muted/50 to-transparent dark:from-brand-violet-muted/20 pointer-events-none z-5" />
          
          <div className="relative z-10 max-w-md">
            <h3 className="title text-2xl font-semibold text-white mb-2">
              Evaluate Business Performance
            </h3>
            <p className="text-white/80">
              Track your core metrics in real-time. Gain actionable insights that help you make data-driven decisions faster.
            </p>
          </div>
          
          {/* Empty div to maintain spacing - image is background now */}
          <div className="relative z-10 mt-8 w-full flex-1" />
        </div>

        {/* Grid 2: Spans 1 column */}
        <div className="md:col-span-1 relative group overflow-hidden rounded-xl border border-border bg-card p-8 flex flex-col justify-between transition-all hover:border-primary/30">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/automated-workflows.jpg"
              alt="Automated workflows"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          
          {/* Subtle Gradient Background (kept) */}
          <div className="absolute inset-0 bg-gradient-to-bl from-brand-emerald-muted/50 to-transparent dark:from-brand-emerald-muted/20 pointer-events-none z-5" />
          
          <div className="relative z-10">
            <h3 className="title text-xl font-semibold text-white mb-2">
              Automated Workflows
            </h3>
            <p className="text-white/80 text-sm">
              Connect your favorite tools and let the system do the heavy lifting.
            </p>
          </div>
          
          {/* Empty div to maintain spacing */}
          <div className="relative z-10 mt-6 w-full flex-1" />
        </div>

        {/* Grid 3: Spans 1 column (Bottom Row) */}
        <div className="md:col-span-1 relative group overflow-hidden rounded-xl border border-border bg-card p-8 flex flex-col justify-between transition-all hover:border-primary/30">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/secure-infrastructure.jpg"
              alt="Secure infrastructure"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          
          {/* Subtle Gradient Background (kept) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent dark:from-primary/5 pointer-events-none z-5" />
          
          <div className="relative z-10">
            <h3 className="title text-xl font-semibold text-white mb-2">
              Secure Infrastructure
            </h3>
            <p className="text-white/80 text-sm">
              Enterprise-grade security built directly into your foundation.
            </p>
          </div>
          
          {/* Empty div to maintain spacing */}
          <div className="relative z-10 mt-6 w-full flex-1" />
        </div>

        {/* Grid 4: Spans 1 column (Bottom Row) */}
        <div className="md:col-span-1 relative group overflow-hidden rounded-xl border border-border bg-card p-8 flex flex-col justify-between transition-all hover:border-primary/30">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/global-scale.jpg"
              alt="Global scale"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          
          {/* Subtle Gradient Background (kept) */}
          <div className="absolute inset-0 bg-gradient-to-b from-secondary to-transparent dark:from-secondary/50 pointer-events-none z-5" />
          
          <div className="relative z-10">
            <h3 className="title text-xl font-semibold text-white mb-2">
              Global Scale
            </h3>
            <p className="text-white/80 text-sm">
              Deploy your applications to the edge with a single click.
            </p>
          </div>
          
          {/* Empty div to maintain spacing */}
          <div className="relative z-10 mt-6 w-full flex-1" />
        </div>

        {/* Grid 5: Spans 1 column (Bottom Row) */}
        <div className="md:col-span-1 relative group overflow-hidden rounded-xl border border-border bg-card p-8 flex flex-col justify-between transition-all hover:border-primary/30">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/support-team.jpg"
              alt="24/7 Support team"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          
          {/* Dark Overlay for readability */}
          <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          
          {/* Subtle Gradient Background (kept) */}
          <div className="absolute inset-0 bg-gradient-to-tl from-brand-violet-muted/30 to-transparent dark:from-brand-violet-muted/10 pointer-events-none z-5" />
          
          <div className="relative z-10">
            <h3 className="title text-xl font-semibold text-white mb-2">
              24/7 Support
            </h3>
            <p className="text-white/80 text-sm">
              Our engineering team is always on standby to help you succeed.
            </p>
          </div>
          
          {/* Empty div to maintain spacing */}
          <div className="relative z-10 mt-6 w-full flex-1" />
        </div>

      </div>
    </section>
  );
}

