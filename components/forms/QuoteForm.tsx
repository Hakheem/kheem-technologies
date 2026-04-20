"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Loader2, AlertCircle, ChevronDown } from "lucide-react";

const EASE = [0.76, 0, 0.24, 1] as const;

// ─── Unified Service Options (same as Contact page) ─────────────────────────
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

const labelClass = "block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2.5";
const inputClass = "w-full px-4 py-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 text-sm font-medium";
const inputErrorClass = "w-full px-4 py-3 border border-red-500 rounded-md bg-background text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all duration-200 text-sm font-medium";
const errorMessageClass = "text-xs text-red-500 mt-1.5 flex items-center gap-1";

export function QuoteForm() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    company: "",
    service: "", 
    budget: "", 
    timeline: "", 
    message: "" 
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<keyof typeof SERVICE_CATEGORIES>("Development & Build");

  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case "name": 
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 3) return "Name must be at least 3 characters";
        return null;
      case "email": 
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(value)) return "Invalid email";
        return null;
      case "service": 
        if (!value) return "Please select a service";
        return null;
      case "message": 
        if (!value.trim()) return "Please describe your project";
        if (value.trim().length < 10) return "Please provide more detail";
        return null;
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

  const validateForm = () => {
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      service: validateField("service", formData.service),
      message: validateField("message", formData.message),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, service: true, message: true });
    return !Object.values(newErrors).some(error => error !== null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setErrors({ form: "Configuration error. Please try again later." });
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("access_key", accessKey);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("company", formData.company || "Not specified");
    formDataToSend.append("service_type", formData.service);
    formDataToSend.append("budget", formData.budget || "Not specified");
    formDataToSend.append("timeline", formData.timeline || "Not specified");
    formDataToSend.append("message", formData.message);
    formDataToSend.append("subject", `New Quote Request from ${formData.name}`);
    formDataToSend.append("from_name", "Quote Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formDataToSend });
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setErrors({ form: result.message || "Something went wrong." });
      }
    } catch (error) {
      setErrors({ form: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: EASE }} className="flex flex-col items-center text-center py-16 px-6">
        <div className="relative w-16 h-16 mb-7">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/25">
            <Check className="w-7 h-7 text-primary" />
          </div>
        </div>
        <h2 className="title text-2xl font-bold text-foreground mb-3 tracking-tight">Quote request received!</h2>
        <p className="text-[15px] text-muted-foreground leading-relaxed max-w-sm mb-8">We'll review your project and get back to you within 24 hours.</p>
        <Button variant="outline" onClick={() => window.location.href = "/"} className="rounded-full h-11 px-7 font-bold text-sm">Back to Home</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Full Name *</label>
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
        <label className={labelClass}>Company / Project Name</label>
        <input type="text" name="company" value={formData.company} onChange={handleChange} className={inputClass} placeholder="Acme Ltd. or 'My startup'" />
      </div>

      {/* Service Selection - Tabs with Grid (same as Contact) */}
      <div>
        <label className={labelClass}>What are we building? *</label>
        
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
            <select name="budget" value={formData.budget} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
              <option value="">Select a budget range</option>
              {BUDGET_OPTIONS.map((b) => (<option key={b.id} value={b.id}>{b.label} {b.range && `(${b.range})`}</option>))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div>
          <label className={labelClass}>Expected Timeline</label>
          <div className="relative">
            <select name="timeline" value={formData.timeline} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
              <option value="">Select a timeline</option>
              {TIMELINE_OPTIONS.map((t) => (<option key={t.id} value={t.id}>{t.label} ({t.sub})</option>))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <label className={labelClass}>Project Brief *</label>
        <textarea rows={5} name="message" value={formData.message} onChange={handleChange} onBlur={handleBlur} className={`${errors.message && touched.message ? inputErrorClass : inputClass} resize-none`} placeholder="Tell us about the goals, functionality, and current pain points..." />
        {errors.message && touched.message && <p className={errorMessageClass}><AlertCircle className="w-3 h-3" />{errors.message}</p>}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="group w-full h-12 rounded-md bg-primary text-primary-foreground font-bold text-sm shadow-md shadow-primary/20 disabled:opacity-60">
        <span className="flex items-center justify-center gap-2.5">
          {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />Sending…</> : <>Send Quote Request <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>}
        </span>
      </Button>

      {errors.form && (
        <div className="p-4 rounded-md bg-red-500/10 border border-red-500/30">
          <p className="text-sm text-red-500 flex items-center gap-2"><AlertCircle className="w-4 h-4" />{errors.form}</p>
        </div>
      )}
    </form>
  );
}


