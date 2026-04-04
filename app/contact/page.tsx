"use client";

import { useRef, useState } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Clock, ArrowUpRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactInfo, socialLinks } from "@/lib/data";

const EASE = [0.76, 0, 0.24, 1] as const;

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: d } }),
};

const maskReveal: Variants = {
  hidden:  { y: "108%", rotate: 1.2 },
  visible: (d = 0) => ({ y: "0%", rotate: 0, transition: { duration: 1.05, ease: EASE, delay: d } }),
};

const SERVICE_OPTIONS = [
  { id: "website",     label: "Website or Web App"          },
  { id: "system",      label: "Custom Software / System"    },
  { id: "mobile",      label: "Mobile App"                  },
  { id: "integration", label: "Integration or Automation"   },
  { id: "brand",       label: "Brand Identity or Design"    },
  { id: "unsure",      label: "Not sure yet"                },
];

const BUDGET_OPTIONS = [
  { id: "under-50k",   label: "Under KES 50k"       },
  { id: "50k-150k",    label: "KES 50k – 150k"      },
  { id: "150k-500k",   label: "KES 150k – 500k"     },
  { id: "500k-1m",     label: "KES 500k – 1M"       },
  { id: "1m-plus",     label: "KES 1M+"             },
  { id: "discuss",     label: "Happy to discuss"    },
];

const inputClass =
  "w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm font-medium";

const labelClass =
  "block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2.5";

// ─── Contact form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [formData, setFormData] = useState({
    name:    "",
    email:   "",
    company: "",
    service: "",
    budget:  "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted,  setIsSubmitted]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-col items-start gap-5 py-12"
      >
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full bg-brand-emerald/10 animate-ping" />
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-brand-emerald/10 border border-brand-emerald/25">
            <Check className="w-6 h-6 text-brand-emerald" />
          </div>
        </div>
        <div>
          <h3 className="title text-2xl font-bold text-foreground tracking-tight mb-2">
            Got it. Talk soon.
          </h3>
          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-sm">
            We'll be in touch within 24 hours. You'll hear from a real person — not a template.
          </p>
        </div>
        <Button variant="outline" onClick={() => window.location.href = "/"} className="rounded-full h-10 px-6 font-bold text-sm mt-2">
          Back to Home
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className={labelClass}>Your Name *</label>
          <input type="text" id="contact-name" required
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass} placeholder="Jane Kamau" />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>Email Address *</label>
          <input type="email" id="contact-email" required
            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClass} placeholder="jane@company.com" />
        </div>
      </div>

      {/* Company */}
      <div>
        <label htmlFor="contact-company" className={labelClass}>Company or Project Name</label>
        <input type="text" id="contact-company"
          value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className={inputClass} placeholder="Acme Ltd. or 'My idea'" />
      </div>

      {/* What do you need */}
      <div>
        <label className={labelClass}>What do you need? *</label>
        <div className="grid grid-cols-2 gap-2">
          {SERVICE_OPTIONS.map((s) => {
            const active = formData.service === s.id;
            return (
              <button
                key={s.id} type="button"
                onClick={() => setFormData({ ...formData, service: s.id })}
                className={`p-3.5 text-left rounded-xl border text-sm font-semibold transition-all duration-200
                  ${active
                    ? "border-primary bg-primary/6 text-primary shadow-sm"
                    : "border-border bg-card text-foreground hover:border-primary/35 hover:bg-muted/30"
                  }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget */}
      <div>
        <label className={labelClass}>Rough Budget</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {BUDGET_OPTIONS.map((b) => {
            const active = formData.budget === b.id;
            return (
              <button
                key={b.id} type="button"
                onClick={() => setFormData({ ...formData, budget: b.id })}
                className={`p-3 text-left rounded-xl border text-[13px] font-semibold transition-all duration-200
                  ${active
                    ? "border-primary bg-primary/6 text-primary shadow-sm"
                    : "border-border bg-card text-foreground hover:border-primary/35 hover:bg-muted/30"
                  }`}
              >
                {b.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground">
          Not sure? Pick "Happy to discuss" — it won't affect how we respond.
        </p>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClass}>Tell us about it *</label>
        <textarea
          id="contact-message" required rows={5}
          value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputClass} resize-none`}
          placeholder="What problem are you trying to solve? What does success look like for this project? The more specific, the better we can help."
        />
      </div>

      {/* Submit */}
      <Button
        type="submit" size="lg" disabled={isSubmitting}
        className="group relative h-13 px-9 rounded-full bg-primary text-primary-foreground font-bold text-sm overflow-hidden transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-60 disabled:scale-100"
      >
        <span className="relative z-10 flex items-center gap-2.5">
          {isSubmitting ? (
            <><Loader2 className="w-4 h-4 animate-spin" />Sending…</>
          ) : (
            <>Send Message<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>
          )}
        </span>
        {!isSubmitting && (
          <span className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" aria-hidden="true" />
        )}
      </Button>

    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const heroRef    = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero header ───────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-36 pb-14 border-b border-border overflow-hidden">
        <div className="absolute -top-24 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--color-brand-violet), transparent 68%)", opacity: 0.06, filter: "blur(24px)" }}
          aria-hidden="true"
        />

        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="flex items-center gap-3 mb-8">
            <div className="w-5 h-px bg-primary" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Get in Touch</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h1 className="title font-bold leading-[0.92] tracking-[-0.03em]">
              <div className="overflow-hidden pb-1">
                <motion.span custom={0.05} variants={maskReveal} initial="hidden" animate={heroInView ? "visible" : "hidden"}
                  className="block text-[clamp(2.8rem,7vw,6.5rem)] text-foreground">
                  Let's talk about
                </motion.span>
              </div>
              <div className="overflow-hidden pb-1">
                <motion.span custom={0.15} variants={maskReveal} initial="hidden" animate={heroInView ? "visible" : "hidden"}
                  className="block text-[clamp(2.8rem,7vw,6.5rem)] text-primary">
                  what you're building.
                </motion.span>
              </div>
            </h1>

            <motion.p custom={0.25} variants={fadeUp} initial="hidden" animate={heroInView ? "visible" : "hidden"}
              className="text-[15px] text-muted-foreground leading-relaxed max-w-sm lg:text-right shrink-0">
              We respond within 24 hours on business days.
              No automated replies — you'll hear from us directly.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Two-column body ────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

            {/* ── Form ──────────────────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="flex-1 min-w-0"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-8">
                Tell us about your project
              </p>
              <ContactForm />
            </motion.div>

            {/* ── Sidebar ────────────────────────────────────────────────────── */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="lg:w-72 xl:w-80 shrink-0 space-y-5 lg:sticky lg:top-28"
              aria-label="Contact details"
            >

              {/* Direct contact */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-5">
                  Reach us directly
                </p>
                <div className="space-y-4">
                  <a href={contactInfo.emailLink}
                    className="group flex items-start gap-3 hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0">
                      <Mail className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-0.5">Email</p>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors break-all">
                        {contactInfo.email}
                      </p>
                    </div>
                  </a>

                  <a href={contactInfo.whatsappLink} target="_blank" rel="noopener noreferrer"
                    className="group flex items-start gap-3 hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-brand-emerald/8 border border-brand-emerald/15 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3.5 h-3.5 text-brand-emerald" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-0.5">WhatsApp</p>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {contactInfo.whatsapp}
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Response info */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-5">
                  What to expect
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Clock,   label: "Response time",    val: "Within 24 hours"          },
                    { icon: Check,   label: "Reply type",       val: "Personal — no bots"       },
                    { icon: Mail,    label: "Availability",     val: "Open to new projects"     },
                  ].map(({ icon: Icon, label, val }) => (
                    <div key={label} className="flex items-center justify-between gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{label}</span>
                      </div>
                      <span className="font-semibold text-foreground text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prefer a call */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  Prefer to talk first?
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  Book a free 30-minute call. No pitch — just clarity on whether we're the
                  right fit and what your project actually needs.
                </p>
                <Link href="/quote"
                  className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-primary hover:opacity-70 transition-opacity">
                  Book a call
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </div>

              {/* Socials */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-5">
                  Follow along
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((s) => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
                      {s.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

            </motion.aside>
          </div>
        </div>
      </section>

    </main>
  );
}

