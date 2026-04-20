"use client";

import { useRef, useState } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Clock, ArrowUpRight, Check, Loader2, AlertCircle, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactInfo, socialLinks } from "@/lib/data";

const EASE = [0.76, 0, 0.24, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: d } }),
};

const maskReveal: Variants = {
  hidden: { y: "108%", rotate: 1.2 },
  visible: (d = 0) => ({ y: "0%", rotate: 0, transition: { duration: 1.05, ease: EASE, delay: d } }),
};

// ─── Unified Service Options (grouped into 2 categories) ─────────────────────
const SERVICE_CATEGORIES = {
  "Development & Build": [
    { id: "new-build", label: "New Build", description: "From scratch" },
    { id: "website", label: "Website or Web App", description: "Full stack development" },
    { id: "mobile", label: "Mobile App", description: "iOS/Android" },
    { id: "system", label: "Custom Software", description: "Tailored systems" },
    { id: "unsure-dev", label: "Not sure yet", description: "Let's figure it out together" },
  ],
  "Strategy & Design": [
    { id: "redesign", label: "Redesign", description: "Fixing UX/UI" },
    { id: "brand", label: "Brand Identity", description: "Design system" },
    { id: "integration", label: "Integration", description: "System syncing" },
    { id: "automation", label: "Automation", description: "Workflow efficiency" },
    { id: "scaling", label: "Scaling", description: "Performance/Growth" },
    { id: "unsure-strategy", label: "Not sure yet", description: "Consultation first" },
  ],
};

// ─── Budget Options ──────────────────────────────────────────────────────────
const BUDGET_OPTIONS = [
  { id: "under-50k", label: "Under KES 50k", range: "~$380" },
  { id: "50k-150k", label: "KES 50k – 150k", range: "$380–$1.1k" },
  { id: "150k-500k", label: "KES 150k – 500k", range: "$1.1k–$3.8k" },
  { id: "500k-1m", label: "KES 500k – 1M", range: "$3.8k–$7.7k" },
  { id: "1m-plus", label: "KES 1M+", range: "$7.7k+" },
  { id: "discuss", label: "Happy to discuss", range: "Let's talk" },
];

// ─── Timeline Options ────────────────────────────────────────────────────────
const TIMELINE_OPTIONS = [
  { id: "fast-track", label: "Fast-Track", sub: "2-4 weeks" },
  { id: "standard", label: "Standard", sub: "1-2 months" },
  { id: "strategic", label: "Strategic", sub: "3-6 months" },
];

const inputClass =
  "w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 text-sm font-medium";

const inputErrorClass =
  "w-full px-4 py-3 border border-red-500 rounded-md bg-background text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all duration-200 text-sm font-medium";

const labelClass =
  "block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2.5";

const errorMessageClass = "text-xs text-red-500 mt-1.5 flex items-center gap-1";

// ─── Validation Functions ────────────────────────────────────────────────────
const validateName = (name: string): string | null => {
  if (!name.trim()) return "Name is required";
  if (name.trim().length < 3) return "Name must be at least 3 characters";
  if (name.trim().length > 50) return "Name must be less than 50 characters";
  return null;
};

const validateEmail = (email: string): string | null => {
  if (!email.trim()) return "Email is required";
  const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return null;
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,5}[-\s\.]?[0-9]{1,5}$/;
  if (!phoneRegex.test(phone)) return "Please enter a valid phone number";
  if (phone.replace(/[\s\-\(\)\+]/g, '').length < 9) return "Phone number must have at least 9 digits";
  return null;
};

const validateService = (service: string): string | null => {
  if (!service) return "Please select a service type";
  return null;
};

const validateMessage = (message: string): string | null => {
  if (!message.trim()) return "Message is required";
  if (message.trim().length < 10) return "Message must be at least 10 characters";
  if (message.trim().length > 2000) return "Message must be less than 2000 characters";
  return null;
};

// ─── Contact Form Component ──────────────────────────────────────────────────
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<keyof typeof SERVICE_CATEGORIES>("Development & Build");

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case "name": return validateName(value);
      case "email": return validateEmail(value);
      case "phone": return validatePhone(value);
      case "service": return validateService(value);
      case "message": return validateMessage(value);
      default: return null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, service: serviceId }));
    setTouched(prev => ({ ...prev, service: true }));
    const error = validateField("service", serviceId);
    setErrors(prev => ({ ...prev, service: error }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      service: validateService(formData.service),
      message: validateMessage(formData.message),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, service: true, message: true });
    return !Object.values(newErrors).some(error => error !== null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateForm()) return;
    setIsSubmitting(true);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setSubmitError("Configuration error. Please try again later.");
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", accessKey);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone || "Not provided");
    formDataToSend.append("company", formData.company || "Not specified");
    formDataToSend.append("service_type", formData.service);
    formDataToSend.append("budget", formData.budget || "Not specified");
    formDataToSend.append("timeline", formData.timeline || "Not specified");
    formDataToSend.append("message", formData.message);
    formDataToSend.append("subject", `New Contact Form Message from ${formData.name}`);
    formDataToSend.append("from_name", "Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formDataToSend });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="flex flex-col items-start gap-5 py-12">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full bg-brand-emerald/10 animate-ping" />
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-brand-emerald/10 border border-brand-emerald/25">
            <Check className="w-6 h-6 text-brand-emerald" />
          </div>
        </div>
        <div>
          <h3 className="title text-2xl font-bold text-foreground tracking-tight mb-2">Message received!</h3>
          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-sm">We'll be in touch within 24 hours. You'll hear from a real person — not a template.</p>
        </div>
        <Button variant="outline" onClick={() => window.location.href = "/"} className="rounded-full h-10 px-6 font-bold text-sm mt-2">Back to Home</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Your Name *</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} className={errors.name && touched.name ? inputErrorClass : inputClass} placeholder="Jane Kamau" />
          {errors.name && touched.name && <p className={errorMessageClass}><AlertCircle className="w-3 h-3" />{errors.name}</p>}
        </div>
        <div>
          <label className={labelClass}>Email Address *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} className={errors.email && touched.email ? inputErrorClass : inputClass} placeholder="jane@company.com" />
          {errors.email && touched.email && <p className={errorMessageClass}><AlertCircle className="w-3 h-3" />{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Phone Number <span className="text-primary/60">(Recommended)</span></label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} className={errors.phone && touched.phone ? inputErrorClass : inputClass} placeholder="+254 700 000 000" />
        {errors.phone && touched.phone && <p className={errorMessageClass}><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
        <p className="mt-1 text-[10px] text-muted-foreground">
          <span className="text-primary">Why share your phone?</span> We'll text you a quick heads-up before we call — no spam, ever.
        </p>
      </div>

      <div>
        <label className={labelClass}>Company or Project Name</label>
        <input type="text" name="company" value={formData.company} onChange={handleChange} className={inputClass} placeholder="Acme Ltd. or 'My idea'" />
      </div>

      {/* Service Selection - Tabs with Grid */}
      <div>
        <label className={labelClass}>What do you need? *</label>
        
        <div className="flex gap-2 mb-5">
          {Object.keys(SERVICE_CATEGORIES).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category as keyof typeof SERVICE_CATEGORIES)}
              className={`px-5 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SERVICE_CATEGORIES[activeCategory].map((s) => {
            const active = formData.service === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleServiceSelect(s.id)}
                className={`p-3.5 text-left cursor-pointer rounded-md border text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "border-primary bg-primary/6 text-primary shadow-sm"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted/30"
                } ${errors.service && touched.service && !active ? "border-red-500" : ""}`}
              >
                <div className="font-bold">{s.label}</div>
                <div className="text-[10px] opacity-70 mt-0.5">{s.description}</div>
              </button>
            );
          })}
        </div>
        {errors.service && touched.service && <p className={errorMessageClass}><AlertCircle className="w-3 h-3" />{errors.service}</p>}
      </div>

      {/* Budget + Timeline - Side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Rough Budget</label>
          <div className="relative">
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="">Select a budget range</option>
              {BUDGET_OPTIONS.map((b) => (
                <option key={b.id} value={b.id}>{b.label} {b.range && `(${b.range})`}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Expected Timeline</label>
          <div className="relative">
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="">Select a timeline</option>
              {TIMELINE_OPTIONS.map((t) => (
                <option key={t.id} value={t.id}>{t.label} ({t.sub})</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>Tell us about your project *</label>
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${errors.message && touched.message ? inputErrorClass : inputClass} resize-none`}
          placeholder="What problem are you trying to solve? What does success look like for this project? The more specific, the better we can help."
        />
        {errors.message && touched.message && <p className={errorMessageClass}><AlertCircle className="w-3 h-3" />{errors.message}</p>}
        <p className="mt-1 text-[10px] text-muted-foreground text-right">{formData.message.length}/2000 characters</p>
      </div>

      {/* Buttons - Main + Quote Link */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button type="submit" size="lg" disabled={isSubmitting} className="group h-12 px-8 rounded-md bg-primary text-primary-foreground font-bold text-sm shadow-md shadow-primary/20 disabled:opacity-60">
          <span className="flex items-center justify-center gap-2.5">
            {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />Sending…</> : <>Send Message <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>}
          </span>
        </Button>

        <Link href="/quote" className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          Need a detailed quote instead?
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {submitError && (
        <div className="p-4 rounded-md bg-red-500/10 border border-red-500/30">
          <p className="text-sm text-red-500 flex items-center gap-2"><AlertCircle className="w-4 h-4" />{submitError}</p>
        </div>
      )}
    </form>
  );
}

// ─── Page Component ──────────────────────────────────────────────────────────
export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="min-h-screen bg-background">
      <section ref={heroRef} className="relative pt-36 pb-14 border-b border-border overflow-hidden">
        <div className="absolute -top-24 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, var(--color-brand-violet), transparent 68%)", opacity: 0.06, filter: "blur(24px)" }} aria-hidden="true" />
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate={heroInView ? "visible" : "hidden"} className="flex items-center gap-3 mb-8">
            <div className="w-5 h-px bg-primary" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Get in Touch</span>
          </motion.div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h1 className="title font-bold leading-[0.92] tracking-[-0.03em]">
              <div className="overflow-hidden pb-1">
                <motion.span custom={0.05} variants={maskReveal} initial="hidden" animate={heroInView ? "visible" : "hidden"} className="block text-[clamp(2.3rem,6.5vw,6rem)] text-foreground">Let's talk about</motion.span>
              </div>
              <div className="overflow-hidden pb-1">
                <motion.span custom={0.15} variants={maskReveal} initial="hidden" animate={heroInView ? "visible" : "hidden"} className="block text-[clamp(2.8rem,7vw,6.5rem)] text-primary">what you're building.</motion.span>
              </div>
            </h1>
            <motion.p custom={0.25} variants={fadeUp} initial="hidden" animate={heroInView ? "visible" : "hidden"} className="text-[15px] text-muted-foreground leading-relaxed max-w-sm lg:text-right shrink-0">We respond within 24 hours on business days. No automated replies — you'll hear from us directly.</motion.p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }} className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-8">Tell us about your project</p>
              <ContactForm />
            </motion.div>

            <motion.aside initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.2 }} className="lg:w-72 xl:w-80 shrink-0 space-y-5 lg:sticky lg:top-28 self-start" aria-label="Contact details">
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-5">Reach us directly</p>
                <div className="space-y-4">
                  <a href={contactInfo.emailLink} className="group flex items-start gap-3 hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0"><Mail className="w-3.5 h-3.5 text-primary" /></div>
                    <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-0.5">Email</p><p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors break-all">{contactInfo.email}</p></div>
                  </a>
                  <a href={contactInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 hover:text-primary transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-brand-emerald/8 border border-brand-emerald/15 flex items-center justify-center shrink-0"><MessageCircle className="w-3.5 h-3.5 text-brand-emerald" /></div>
                    <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-0.5">WhatsApp</p><p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{contactInfo.whatsapp}</p></div>
                  </a>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0"><Phone className="w-3.5 h-3.5 text-primary" /></div>
                    <div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-0.5">Phone (Optional)</p><p className="text-sm font-semibold text-foreground">+1 (234) 567-890</p></div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-5">What to expect</p>
                <div className="space-y-4">
                  {[{ icon: Clock, label: "Response time", val: "Within 24 hours" }, { icon: Check, label: "Reply type", val: "Personal — no bots" }, { icon: Mail, label: "Availability", val: "Open to new projects" }].map(({ icon: Icon, label, val }) => (
                    <div key={label} className="flex items-center justify-between gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground"><Icon className="w-3.5 h-3.5 shrink-0" /><span>{label}</span></div>
                      <span className="font-semibold text-foreground text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Prefer to talk first?</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">Book a free 30-minute call. No pitch — just clarity on whether we're the right fit and what your project actually needs.</p>
                <Link href="https://calendly.com/hakheem67/30min" className="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-primary hover:opacity-70 transition-opacity">Book a call<ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-5">Follow along</p>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((s) => (<a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">{s.name}<ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></a>))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </main>
  );
}

