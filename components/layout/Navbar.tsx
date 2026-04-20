"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Logo } from "@/components/general/logo";
import {
  navLinks,
  contactInfo,
  socialLinks,
  featuredProject,
  aboutCompany,
} from "@/lib/data";

gsap.registerPlugin(SplitText);

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fix scrollbar shift issue
  useEffect(() => {
    if (isOpen) {
      // Get scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Add padding to body to compensate for scrollbar removal
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Also add padding to any fixed elements that might shift
      const fixedElements = document.querySelectorAll('.fixed');
      fixedElements.forEach((el) => {
        (el as HTMLElement).style.paddingRight = `${scrollbarWidth}px`;
      });
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      // Reset fixed elements
      const fixedElements = document.querySelectorAll('.fixed');
      fixedElements.forEach((el) => {
        (el as HTMLElement).style.paddingRight = "";
      });
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        refs.container.current &&
        !refs.container.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      const fixedElements = document.querySelectorAll('.fixed');
      fixedElements.forEach((el) => {
        (el as HTMLElement).style.paddingRight = "";
      });
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const refs = {
    nav: useRef<HTMLElement>(null),
    menu: useRef<HTMLDivElement>(null),
    topLine: useRef<HTMLSpanElement>(null),
    bottomLine: useRef<HTMLSpanElement>(null),
    links: useRef<(HTMLAnchorElement | null)[]>([]),
    linksRow: useRef<(HTMLDivElement | null)[]>([]),
    indicator: useRef<HTMLDivElement>(null),
    linksContainer: useRef<HTMLDivElement>(null),
    contactInfo: useRef<HTMLDivElement>(null),
    timeline: useRef<gsap.core.Timeline | null>(null),
    splits: useRef<SplitText[]>([]),
    allLines: useRef<Element[]>([]),
    indicatorRotation: useRef(0),
    container: useRef<HTMLDivElement>(null),
  };

  const activeIndex = navLinks.findIndex((link) => pathname === link.href);

  const LogoDisplay = () => {
    const [logoError, setLogoError] = useState(false);

    return !logoError ? (
      <img
        src="/images/kheem_logo.png"
        alt="Kheem Technologies"
        className="max-w-50 max-h-12 "
        onError={() => setLogoError(true)}
      />
    ) : (
      <Logo />
    );
  };


  // 2. Setup SplitText
  useEffect(() => {
    let cancelled = false;
    function runSplitText() {
      if (cancelled) return;
      const splitInstances: SplitText[] = [];
      const lines: Element[] = [];
      const splitElements = [
        ...refs.links.current.filter(Boolean),
        ...(refs.contactInfo.current?.querySelectorAll(".split-target") || []),
      ] as Element[];
      splitElements.forEach((el) => {
        if (!el) return;
        const split = new SplitText(el, {
          type: "lines",
          linesClass: "split-line",
        });
        split.lines.forEach((line) => {
          gsap.set(line, { y: "100%" });
          lines.push(line);
        });
        splitInstances.push(split);
      });
      refs.splits.current = splitInstances;
      refs.allLines.current = lines;
    }
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runSplitText);
    } else {
      // fallback: run after short delay
      setTimeout(runSplitText, 300);
    }
    return () => {
      cancelled = true;
      refs.timeline.current?.kill();
      refs.splits.current?.forEach((split) => split.revert());
    };
  }, []);

  // 3. Handle Indicator Animation
  const animateToLink = (index: number) => {
    const indicator = refs.indicator.current;
    const container = refs.linksContainer.current;

    if (!indicator || !container) return;

    if (index >= 0 && refs.linksRow.current[index]) {
      const containerRect = container.getBoundingClientRect();
      const rowRect = refs.linksRow.current[index]!.getBoundingClientRect();
      const targetY =
        rowRect.top -
        containerRect.top +
        rowRect.height / 2 -
        indicator.offsetHeight / 2;

      refs.indicatorRotation.current += 180;

      gsap.to(indicator, {
        x: 0,
        y: targetY,
        rotation: refs.indicatorRotation.current,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.4)",
        overwrite: true,
      });
    } else {
      gsap.to(indicator, {
        x: "-32px",
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    }

    refs.linksRow.current.forEach((row, i) => {
      if (!row) return;
      gsap.to(row.querySelector("a"), {
        x: i === index ? "40px" : "0",
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: true,
      });
    });
  };

  // 4. Main Menu Timeline
  useEffect(() => {
    refs.timeline.current?.kill();

    const tl = gsap.timeline();
    refs.timeline.current = tl;

    if (isOpen) {
      gsap.set(refs.indicator.current, { x: "-32px", opacity: 0 });
      refs.linksRow.current.forEach(
        (row) => row && gsap.set(row.querySelector("a"), { x: "0px" })
      );

      tl.to(refs.nav.current, {
        width: "94vw",
        duration: 0.5,
        ease: "power3.inOut",
      })
        .to(
          refs.topLine.current,
          { y: 4, rotation: 45, duration: 0.3, ease: "power2.inOut" },
          0
        )
        .to(
          refs.bottomLine.current,
          { y: -4, rotation: -45, duration: 0.3, ease: "power2.inOut" },
          0
        )
        .to(
          refs.menu.current,
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.5,
            ease: "power3.inOut",
          },
          0.3
        )
        .to(
          refs.allLines.current,
          { y: "0%", duration: 0.5, stagger: 0.03, ease: "power3.out" },
          0.5
        )
        .call(() => animateToLink(activeIndex));
    } else {
      tl.to(
        refs.topLine.current,
        { y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut" },
        0
      )
        .to(
          refs.bottomLine.current,
          { y: 0, rotation: 0, duration: 0.3, ease: "power2.inOut" },
          0
        )
        .to(
          refs.menu.current,
          {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 0.5,
            ease: "power3.inOut",
          },
          0
        )
        .to(
          refs.nav.current,
          { width: "95vw", duration: 0.5, ease: "power3.inOut" },
          0.3
        )
        .set(refs.allLines.current, { y: "100%" }, 0.5);
    }
  }, [isOpen, activeIndex]);

  return (
    <div ref={refs.container} className="relative z-50">
      {/* --- CLOSED NAV --- */}
      <nav
        ref={refs.nav}
        className="fixed top-[1%] left-1/2 -translate-x-1/2 w-[98vw] md:w-[95vw] max-w-screen-2xl bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-between px-3 md:px-6 py-2 shadow rounded-md"
      >
        {/* Logo */}
        <div
          className="relative z-50 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <Link href='/'>
          <LogoDisplay />
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 relative z-50">
          <div className="hidden md:flex">
            <Button className="group relative h-12 px-8 rounded-md bg-primary text-primary-foreground font-semibold text-sm overflow-hidden transition-all duration-200 active:scale-98  ">
            <Link href='/contact'>
              <span className="relative z-10 flex items-center">
                Start a Project
              </span>
              </Link>
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex items-center justify-center gap-2 px-4 h-12 rounded-md bg-transparent hover:bg-foreground/5 transition-colors group outline-none border border-transparent hover:border-border"
          >
            <p className="text-foreground text-sm font-semibold uppercase tracking-widest">
              {isOpen ? "Close" : "Menu"}
            </p>
            <div className="flex flex-col justify-center items-center gap-[5px] w-6 h-6">
              <span
                ref={refs.topLine}
                className="w-5 h-[2px] bg-foreground block origin-center"
              />
              <span
                ref={refs.bottomLine}
                className="w-5 h-[2px] bg-foreground block origin-center"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* --- FULLSCREEN DROPDOWN --- */}
      <div
        ref={refs.menu}
        className="fixed top-[calc(1%+70px)] left-1/2 -translate-x-1/2 w-[94vw] max-w-screen-2xl bg-card border border-border flex flex-col md:flex-row overflow-hidden z-40 shadow-2xl rounded-md"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <div className="p-8 md:p-12 flex flex-col md:flex-row w-full gap-8">

          {/* LEFT: Navigation Links */}
          <div
            ref={refs.linksContainer}
            onMouseLeave={() => isOpen && animateToLink(activeIndex)}
            className="w-full md:w-[20%] flex flex-col gap-6 md:border-r border-border pr-8 relative"
          >
            <div
              ref={refs.indicator}
              className="absolute left-0 top-0 w-8 h-8 bg-primary opacity-0 pointer-events-none z-10 rounded-none"
              style={{ transform: "translateX(-32px)" }}
            />

            {navLinks.map((link, index) => (
              <div
                key={link.href}
                ref={(el) => {
                  refs.linksRow.current[index] = el;
                }}
                className="flex w-fit flex-row items-center"
                onMouseEnter={() => animateToLink(index)}
                onClick={() => setIsOpen(false)}
              >
                <Link
                  ref={(el) => {
                    refs.links.current[index] = el;
                  }}
                  href={link.href}
                  className={`text-3xl md:text-4xl tracking-tight transition-colors ${pathname === link.href
                    ? "font-semibold text-primary"
                    : "font-semibold text-foreground/50 hover:text-primary"
                    }`}
                >
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          {/* CENTER: Contact Info */}
          <div
            ref={refs.contactInfo}
            className="w-full md:w-[25%] flex flex-col gap-7 px-0 md:px-8 text-muted-foreground text-sm md:text-base"
          >
            {/* Get in Touch */}
            <div>
              <p className="split-target text-foreground uppercase text-[11px] tracking-[0.12em] mb-4 font-semibold">
                Get in Touch
              </p>
              <a
                href={contactInfo.emailLink}
                className="split-target text-muted-foreground hover:text-primary transition-colors w-fit block"
              >
                Email Us
              </a>
              <a
                href={contactInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="split-target text-muted-foreground hover:text-primary transition-colors mt-2 w-fit block"
              >
                WhatsApp
              </a>
            </div>

            {/* Follow Us */}
            <div>
              <p className="split-target text-foreground uppercase text-[11px] tracking-[0.12em] mb-4 font-semibold">
                Follow Us
              </p>
              <div className="flex flex-col gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors group w-fit"
                  >
                    <span className="split-target">{social.name}</span>
                    <ArrowUpRight className="w-3 h-3 shrink-0 group-hover:rotate-45 transition-transform duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="flex flex-col gap-1">
              <p className="split-target text-foreground uppercase text-[11px] font-bold tracking-[0.12em] mb-2">
                Availability
              </p>
              <p className="split-target leading-relaxed  text-foreground/80 ">
                Ready to scale your digital reach? <span className="split-target text-muted-foreground ">
                  We're open to new projects and collaborations.

                </span>
              </p>
              <Link
                href="/contact"
                className="split-target flex items-center gap-2 text-primary font-bold text-sm group hover:gap-3 mt-4 transition-all"
              >
                Get Started
                <ArrowUpRight className="w-4 h-4 transition-transform " />
              </Link>
            </div>
          </div>

          {/* RIGHT: Images - desktop only */}
          <div className="hidden md:flex w-[55%] gap-3 pl-4">
            <Link
              href={aboutCompany.link}
              className="flex-1 relative overflow-hidden group border border-border rounded-md bg-secondary h-100"
            >
              <img
                src={aboutCompany.image}
                alt={aboutCompany.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />
              <p className="absolute top-5 left-5 text-white text-[10px] font-bold uppercase tracking-widest z-10 drop-shadow-md pointer-events-none">
                {aboutCompany.title}
              </p>
            </Link>

            <Link
              href={featuredProject.link}
              className="flex-1 relative overflow-hidden group border border-border rounded-md h-100 bg-secondary"
            >
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />
              <p className="absolute top-5 left-5 text-white text-[10px] font-bold uppercase tracking-widest z-10 drop-shadow-md pointer-events-none">
                {featuredProject.title}
              </p>
            </Link>
          </div>
        </div>

        {/* CTA Button - Mobile only */}
        {isMobile && (
          <div className="p-6 pt-0">
            <Button className="group relative h-12 px-8 rounded-md w-full bg-primary text-primary-foreground font-semibold text-sm overflow-hidden transition-colors hover:bg-primary/80">
              <span className="relative z-10">Start a Project</span>
              <div className="absolute inset-0 z-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}


