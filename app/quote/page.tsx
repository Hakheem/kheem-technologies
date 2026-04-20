"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ArrowUpRight, Clock, CheckCircle2, MessageCircle, Mail } from "lucide-react";
import Link from "next/link";
import { contactInfo } from "@/lib/data";

export default function QuotePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const included = [
    "Technical spec & architecture audit",
    "Direct dev-to-founder communication",
    "Fixed pricing based on project scope",
    "Fast-paced delivery sprints",
    "30-day post-launch critical support",
  ];

  return (
    <main className="min-h-screen bg-background pt-36 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Sidebar - Sticky Side */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-[400px] shrink-0 space-y-6 lg:sticky lg:top-32"
          >
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-5 h-px bg-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Scoping</span>
              </div>
              <h1 className="title text-5xl font-bold leading-[1.1] mb-6">
                Let's get <span className="text-primary">specific.</span>
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed mb-10">
                Detailed specs help us ship faster. Fill this out and we'll send a clear roadmap and fixed estimate within one business day.
              </p>
            </div>

            {/* Included Card */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-5">Standard on every project</p>
              <div className="space-y-4">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-xs font-medium text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Switch to Contact Card */}
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Prefer a simple chat?</p>
              <Link href="/contact" className="group flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
                Go to contact page
                <ArrowUpRight className="w-3 h-3 transition-opacity opacity-0 group-hover:opacity-100" />
              </Link>
            </div>
          </motion.aside>

          {/* Form Side - rounded-md */}
          <div className="flex-1 min-w-0 bg-card border border-border rounded-md p-8 md:p-12 shadow-sm">
            <QuoteForm />
          </div>

        </div>
      </div>
    </main>
  );
}

