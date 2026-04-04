"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ArrowUpRight, Clock, Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { contactInfo } from "@/lib/data";

const EASE = [0.76, 0, 0.24, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

const included = [
  "Full project brief & planning session",
  "Weekly progress updates",
  "Unlimited design revisions",
  "Handover documentation",
  "30 days post-launch support",
  "Direct access — no account managers",
];

function QuoteContent() {
  const searchParams  = useSearchParams();
  const [type, setType] = useState("");

  useEffect(() => {
    const t = searchParams.get("type");
    if (t) setType(t);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar accent */}
      <div className="h-px w-full bg-border" aria-hidden="true" />

      <div className="container mx-auto max-w-7xl px-6 py-28">

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <div className="mb-16 max-w-2xl">
          <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px bg-primary" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Get a Quote
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="title text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.0] tracking-[-0.03em] text-foreground mb-4"
          >
            Tell us what you're
            <br />
            <span className="text-primary">working on.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="text-[15px] text-muted-foreground leading-relaxed">
            No pitch. No pressure. Just a clear picture of your project — we'll
            come back with a scope, timeline, and honest recommendation.
          </motion.p>
        </div>

        {/* ── Two-column layout ────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

          {/* Form — left/main */}
          <motion.div {...fadeUp(0.22)} className="flex-1 min-w-0">
            <QuoteForm initialType={type} />
          </motion.div>

          {/* Sidebar — right */}
          <motion.aside
            {...fadeUp(0.3)}
            className="lg:w-72 xl:w-80 shrink-0 space-y-6 lg:sticky lg:top-28"
            aria-label="Contact information and inclusions"
          >
            {/* What's included */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary mb-5">
                Every engagement includes
              </p>
              <ul className="space-y-3" role="list">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2
                      className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-foreground font-medium leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response promise */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary mb-5">
                What happens next
              </p>
              <div className="space-y-4">
                {[
                  { icon: Clock,         label: "We respond within 24 hours",     sub: "Business days. No bots."       },
                  { icon: Mail,          label: "Personal reply",                  sub: "From the team, not a template." },
                  { icon: MessageCircle, label: "We'll suggest a quick call",      sub: "If the project needs one."      },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-snug">{label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct contact */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Prefer to reach out directly?
              </p>
              <div className="space-y-3">
                <a
                  href={contactInfo.emailLink}
                  className="group flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {contactInfo.email}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" aria-hidden="true" />
                </a>
                <a
                  href={contactInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  WhatsApp us
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" aria-hidden="true" />
                </a>
              </div>
            </div>

          </motion.aside>
        </div>
      </div>
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    }>
      <QuoteContent />
    </Suspense>
  );
}

