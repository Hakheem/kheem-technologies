"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/general/logo";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "Mobile Apps", href: "/services/mobile-apps" },
    { label: "UI/UX Design", href: "/services/design" },
    { label: "Custom Software", href: "/services/custom-software" },
    { label: "Payment Integration", href: "/services/payments" },
    { label: "Maintenance", href: "/services/maintenance" },
  ],
  company: [
    { label: "Our Work", href: "/work" },
    { label: "About Us", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "FAQ", href: "/faq" },
    { label: "Support", href: "/support" },
  ],
};

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Dribbble", href: "#" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate CTA if it exists
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
      // Animate footer columns if they exist
      const footerCols = document.querySelectorAll('.footer-col');
      if (footerCols.length > 0 && contentRef.current) {
        gsap.fromTo(
          footerCols,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
      // Animate footer bottom if it exists
      const footerBottom = document.querySelector('.footer-bottom');
      if (footerBottom) {
        gsap.fromTo(
          footerBottom,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            delay: 0.4,
            scrollTrigger: {
              trigger: footerBottom,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-background text-foreground overflow-hidden"
    >
      {/* Background gradient using your colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary to-background pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">


        {/* Main Footer Content */}
        <div ref={contentRef} className="container mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 footer-col">
              <div className="mb-6">
                <Logo className="h-10 w-auto text-foreground" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
                Engineering high-performance digital products for businesses that want more. Strategy, design, and development—under one roof.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href="mailto:hello@kheem.io"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 group"
                >
                  <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  hello@kheem.io
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 group"
                >
                  <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                  +1 (234) 567-890
                </a>
                <div className="flex items-start gap-3 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 text-primary mt-0.5" />
                  <span>Nairobi, Kenya<br />Remote Worldwide</span>
                </div>
              </div>
            </div>

            {/* Services Column */}
            <div className="col-span-1 md:col-span-2 footer-col">
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div className="col-span-1 md:col-span-2 footer-col">
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div className="col-span-1 md:col-span-2 footer-col">
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Column */}
            <div className="col-span-1 md:col-span-2 footer-col">
              <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Connect
              </h4>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors duration-200 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom border-t border-border">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-xs font-medium tracking-wider">
                © {new Date().getFullYear()} KHEEM TECHNOLOGIES. ALL RIGHTS RESERVED.
              </p>

              <div className="flex items-center gap-6">
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground text-xs font-medium tracking-wider transition-colors"
                >
                  PRIVACY
                </Link>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground text-xs font-medium tracking-wider transition-colors"
                >
                  TERMS
                </Link>
                <button
                  onClick={scrollToTop}
                  className="text-muted-foreground hover:text-primary text-xs font-medium tracking-wider transition-colors uppercase"
                >
                  Back to Top
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

