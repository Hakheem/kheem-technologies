"use client";

import { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram, FaGlobe, FaDribbble } from "react-icons/fa";

import { teamMembers } from "@/lib/data";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  email: string;
  socials?: Record<string, any>;
}

const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
};

const maskReveal: Variants = {
  hidden: { y: "108%", rotate: 1.2 },
  visible: (d: number = 0) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1.05, ease: EASE, delay: d },
  }),
};

interface SocialIconProps {
  platform: string;
}

function SocialIcon({ platform }: SocialIconProps) {
  const cls = "w-3.5 h-3.5";
  switch (platform) {
    case "linkedin": return <FaLinkedin className={cls} />;
    case "github": return <FaGithub className={cls} />;
    case "instagram": return <FaInstagram className={cls} />;
    case "dribbble": return <FaDribbble className={cls} />;
    default: return <FaGlobe className={cls} />;
  }
}

interface TeamCardProps {
  member: TeamMember;
  delay?: number;
}

function TeamCard({ member, delay = 0 }: TeamCardProps) {
  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5%" }}
      className="group/card"
    >
      <div className="relative w-full aspect-3/5 rounded-2xl overflow-hidden bg-primary/70">
        {/* Zoomable image */}
        <motion.div
          className="relative w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Image
            src={member.image}
            alt={`${member.name} – ${member.role}`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover pointer-events-none"
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="
          absolute inset-0 pointer-events-none
          bg-linear-to-t from-primary/90 via-primary/40 to-transparent
          opacity-0 group-hover/card:opacity-100 transition-opacity duration-500
        " />

        {/* Social icons — top-right */}
        {member.socials && (
          <div className="
            absolute top-4 right-4 z-20
            flex flex-col gap-2
            opacity-0 translate-x-2
            group-hover/card:opacity-100 group-hover/card:translate-x-0
            transition-all duration-300
          ">
            {Object.entries(member.socials)
              .filter(([_, url]) => !!url)
              .slice(0, 3)
              .map(([platform, url]) => (
                <a
                  key={platform}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="
                    p-2 rounded-lg cursor-pointer
                    bg-background/90 backdrop-blur-sm
                    text-foreground hover:text-primary
                    transition-colors
                  "
                >
                  <SocialIcon platform={platform} />
                </a>
              ))}
          </div>
        )}

        {/* Name / role / bio / email */}
        <div className="
          absolute inset-x-0 bottom-0 z-10 p-5
          translate-y-4 opacity-0
          group-hover/card:translate-y-0 group-hover/card:opacity-100
          transition-all duration-500
        ">
          <h3 className="font-bold text-xl leading-snug tracking-tight mb-1 text-white">
            {member.name}
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/90 mb-2">
            {member.role}
          </p>
          <p className="text-xs text-white/80 leading-relaxed mb-3 line-clamp-2">
            {member.bio}
          </p>
          <a
            href={`mailto:${member.email}`}
            className="
              text-xs text-white/70 hover:text-white transition-colors
              font-medium inline-flex items-center gap-1.5 cursor-pointer
              group/link
            "
          >
            <span>{member.email}</span>
            <ArrowRight className="
              w-3 h-3 opacity-0 -translate-x-2
              group-hover/link:opacity-100 group-hover/link:translate-x-0
              transition-all
            " />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-background overflow-clip"
    >
      <div className="relative flex flex-col lg:flex-row justify-center container mx-auto px-6 max-w-7xl gap-10 lg:gap-16">

        {/* ── LEFT: sticky text content ──────────────────────── */}
        <div className="w-full lg:w-[45%] lg:h-screen lg:sticky lg:top-16 lg:flex lg:flex-col lg:justify-center pt-24 pb-12 lg:py-[4rem] z-10">

          {/* Eyebrow */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-5 h-px bg-primary" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Our Team
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="title font-bold leading-[1.0] tracking-[-0.03em] text-foreground mb-6">
            <div className="overflow-hidden pb-1">
              <motion.span
                custom={0.06}
                variants={maskReveal}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="block text-[clamp(2rem,4.5vw,3.8rem)]"
              >
                Meet the experts
              </motion.span>
            </div>
            <div className="overflow-hidden pb-1">
              <motion.span
                custom={0.14}
                variants={maskReveal}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="block text-[clamp(2rem,4.5vw,3.8rem)] text-primary"
              >
                behind the work.
              </motion.span>
            </div>
          </h2>

          {/* Description */}
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4 text-muted-foreground leading-relaxed font-medium text-[16px] mb-10"
          >
            <p>
              At Kheem, our strength lies in our people. Each team member brings unique
              expertise, creativity, and dedication to every project we take on. Together, we
              combine technical excellence with a passion for innovation to deliver solutions
              that truly make a difference.
            </p>
            <p>
              From developers and designers to strategists and engineers, our experts
              collaborate seamlessly to transform ideas into impactful digital experiences. We
              believe in continuous learning, open communication, and building strong
              partnerships that help our clients grow and succeed.
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="h-px w-full bg-border my-4"
          />

        </div>

        <div className="w-full lg:w-[55%] lg:py-[15vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member: TeamMember, i: number) => (
              <TeamCard
                key={member.name}
                member={member}
                delay={0.1} 
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

