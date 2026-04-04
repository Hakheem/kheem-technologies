"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const EASE = [0.76, 0, 0.24, 1] as const;

const projectTypes = [
  { id: "new-build",    label: "New Build",      description: "Starting from scratch"    },
  { id: "redesign",     label: "Redesign",        description: "Fixing what's there"      },
  { id: "scaling",      label: "Scaling",         description: "Growing fast"             },
  { id: "integration",  label: "Integration",     description: "Tools don't talk"         },
  { id: "expansion",    label: "Expansion",       description: "New markets"              },
  { id: "clarity",      label: "Not sure yet",    description: "Let's figure it out"      },
];

const budgetRanges = [
  { id: "under-500k",    label: "Under KES 50k",       sub: "~$380"    },
  { id: "50k-150k",      label: "KES 50k – 150k",      sub: "$380–$1.1k" },
  { id: "150k-500k",     label: "KES 150k – 500k",     sub: "$1.1k–$3.8k" },
  { id: "500k-1m",       label: "KES 500k – 1M",       sub: "$3.8k–$7.7k" },
  { id: "1m-plus",       label: "KES 1M+",             sub: "$7.7k+"    },
  { id: "discuss",       label: "Happy to discuss",    sub: "Let's talk" },
];

const timelines = [
  { id: "asap",       label: "ASAP",          sub: "Within weeks"   },
  { id: "1-3months",  label: "1 – 3 months",  sub: "No rush"        },
  { id: "3-6months",  label: "3 – 6 months",  sub: "Planning ahead" },
  { id: "6-plus",     label: "6+ months",     sub: "Long-term"      },
];

interface QuoteFormProps {
  initialType?: string;
  compact?: boolean; // used when embedded inside a page alongside other content
}

const inputClass =
  "w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all duration-200 text-sm font-medium";

const labelClass = "block text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2.5";

export function QuoteForm({ initialType = "", compact = false }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name:        "",
    email:       "",
    company:     "",
    projectType: initialType,
    budget:      "",
    timeline:    "",
    message:     "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted,  setIsSubmitted]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1600));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-col items-center text-center py-16 px-6"
      >
        <div className="relative w-16 h-16 mb-7">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/25">
            <Check className="w-7 h-7 text-primary" />
          </div>
        </div>
        <h2 className="title text-2xl font-bold text-foreground mb-3 tracking-tight">
          Message received.
        </h2>
        <p className="text-[15px] text-muted-foreground leading-relaxed max-w-sm mb-8">
          We'll review your project and get back to you within 24 hours.
          No automated replies — you'll hear from us directly.
        </p>
        <Button
          variant="outline"
          onClick={() => window.location.href = "/"}
          className="rounded-full h-11 px-7 font-bold text-sm"
        >
          Back to Home
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ── Project type ────────────────────────────────────────────────────── */}
      <div>
        <label className={labelClass}>What best describes your project? *</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
          {projectTypes.map((type) => {
            const active = formData.projectType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setFormData({ ...formData, projectType: type.id })}
                className={`
                  relative p-4 text-left rounded-xl border transition-all duration-200 group
                  ${active
                    ? "border-primary bg-primary/6 shadow-sm shadow-primary/10"
                    : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
                  }
                `}
              >
                {active && (
                  <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </span>
                )}
                <div className={`text-sm font-bold mb-0.5 ${active ? "text-primary" : "text-foreground"}`}>
                  {type.label}
                </div>
                <div className="text-[11px] text-muted-foreground">{type.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Name + Email ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name *</label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
            placeholder="Jane Kamau"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email Address *</label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClass}
            placeholder="jane@company.com"
          />
        </div>
      </div>

      {/* ── Company ──────────────────────────────────────────────────────────── */}
      <div>
        <label htmlFor="company" className={labelClass}>Company / Project Name</label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className={inputClass}
          placeholder="Acme Ltd. or 'My startup'"
        />
      </div>

      {/* ── Budget ────────────────────────────────────────────────────────────── */}
      <div>
        <label className={labelClass}>Rough Budget *</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
          {budgetRanges.map((b) => {
            const active = formData.budget === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setFormData({ ...formData, budget: b.id })}
                className={`
                  p-3.5 text-left rounded-xl border transition-all duration-200
                  ${active
                    ? "border-primary bg-primary/6 shadow-sm shadow-primary/10"
                    : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
                  }
                `}
              >
                <div className={`text-[13px] font-bold ${active ? "text-primary" : "text-foreground"}`}>
                  {b.label}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{b.sub}</div>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          No budget yet? That's fine — select "Happy to discuss" and we'll figure it out together.
        </p>
      </div>

      {/* ── Timeline ─────────────────────────────────────────────────────────── */}
      <div>
        <label className={labelClass}>Expected Timeline</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {timelines.map((t) => {
            const active = formData.timeline === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setFormData({ ...formData, timeline: t.id })}
                className={`
                  p-3.5 text-left rounded-xl border transition-all duration-200
                  ${active
                    ? "border-primary bg-primary/6 shadow-sm shadow-primary/10"
                    : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
                  }
                `}
              >
                <div className={`text-[13px] font-bold ${active ? "text-primary" : "text-foreground"}`}>
                  {t.label}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{t.sub}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Message ──────────────────────────────────────────────────────────── */}
      <div>
        <label htmlFor="message" className={labelClass}>Tell us about your project *</label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputClass} resize-none`}
          placeholder="What problem are you trying to solve? What does success look like? The more specific you are, the better we can help."
        />
      </div>

      {/* ── Submit ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="group relative h-13 px-9 rounded-full bg-primary text-primary-foreground font-bold text-sm overflow-hidden transition-all duration-200 hover:scale-[1.03] active:scale-95 shadow-lg shadow-primary/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center gap-2.5">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </>
            )}
          </span>
          {!isSubmitting && (
            <span className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" aria-hidden="true" />
          )}
        </Button>

        <p className="text-[11px] text-muted-foreground leading-relaxed">
          We respond within 24 hours on business days.
          <br />No automated replies. Your info stays private.
        </p>
      </div>

    </form>
  );
}

