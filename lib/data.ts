export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Our Work", href: "/work" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
];

export const contactInfo = {
  email: "hakheem.dev@gmail.com",
  emailLink: "mailto:hakheem.dev@gmail.com",
  whatsapp: "+254769403162",
  whatsappLink: "https://wa.me/254769403162",
};

// ─── Team Members ─────────────────────────────────────────────────────────────
export const teamMembers = [
  {
    name: "Hector John",
    role: "Lead Developer",
    email: "hakheem.dev@gmail.com",
    image: "/images/team/hector.png",
    bio: "Full-stack architect with 8+ years of experience building scalable web applications. Passionate about clean code and performance optimization.",
    socials: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/Hakheem",
      website: "https://hector-john.vercel.app",
      dribbble: "https://dribbble.com/johndoe",
    },
  },
  {
    name: "Juan Rodriguez",
    role: "UI/UX Designer",
    email: "juan@kheem.tech",
    image: "/images/team/hector.png",
    bio: "Designer who codes. Creates intuitive interfaces that users love. Specializes in design systems and user research.",
    socials: {
      linkedin: "https://linkedin.com/in/juanrodriguez",
      dribbble: "https://dribbble.com/juanrodriguez",
      instagram: "https://instagram.com/juanrodriguez",
    },
  },
  {
    name: "Sarah Chen",
    role: "Project Manager",
    email: "sarah@kheem.tech",
    image: "/images/team/hector.png",
    bio: "Certified Scrum Master ensuring projects ship on time and on budget. Bridge between clients and the technical team.",
    socials: {
      linkedin: "https://linkedin.com/in/sarahchen",
      github: "https://github.com/sarahchen",
    },
  },
];

export const socialLinks = [
  { name: "LinkedIn", url: "https://linkedin.com/company/kheem", icon: "Linkedin" },
  { name: "Instagram", url: "https://instagram.com/kheem", icon: "Instagram" },
  { name: "Facebook", url: "https://facebook.com/kheem", icon: "Facebook" },
  { name: "Twitter(X)", url: "https://x.com/kheem", icon: "Twitter" },
];

export const featuredProject = {
  title: "Featured Project",
  image: "/images/wazirent.png",
  link: "/work/",
};

export const aboutCompany = {
  title: "About us",
  image: "/images/Profile Image.png",
  link: "/about",
};

// ─── Hero ────────────────────────────────────────────────────────────────────
export const MARQUEE_ITEMS = [
  "Web Development",
  "Custom Software",
  "UI/UX Design",
  "App Development",
  "Brand Systems",
  "Digital Strategy",
  "Technical SEO",
  "Growth Architecture",
  "Product Development",
  "SEO Optimization",
];

export const STATS = [
  { value: "43+", label: "Projects Delivered" },
  { value: "12",  label: "Industries Served"  },
  { value: "100%", label: "Client Retention"  },
];

// ─── Who We Serve ─────────────────────────────────────────────────────────────
export const whoWeServeCards = [
  {
    tag: "New Build",
    title: "You're starting from scratch",
    body: "You need a website, system, or brand — and you want to do it right the first time. No guesswork, no patchwork. Just something built to last.",
    index: "01",
    href: "/quote?type=new-build",
  },
  {
    tag: "Redesign",
    title: "Your current site isn't pulling its weight",
    body: "It looks okay, but it doesn't convert, doesn't represent who you are, or just feels behind. You know it could be doing more — and it should.",
    index: "02",
    href: "/quote?type=redesign",
  },
  {
    tag: "Scaling",
    title: "You're growing and need systems to match",
    body: "Your business is moving fast. Your website or platform needs to keep up — supporting more users, more traffic, more ambition without breaking.",
    index: "03",
    href: "/quote?type=scaling",
  },
  {
    tag: "Integration",
    title: "Your tools don't talk to each other",
    body: "CRM, analytics, email, payments — they're all separate. You need them working together seamlessly so your team stops wasting time on manual work.",
    index: "04",
    href: "/quote?type=integration",
  },
  {
    tag: "Expansion",
    title: "You're entering new markets or channels",
    body: "New products, new regions, new platforms. You need a digital infrastructure that can expand with you — without rebuilding everything from scratch.",
    index: "05",
    href: "/quote?type=expansion",
  },
  {
    tag: "Clarity",
    title: "You're done with vague, messy processes",
    body: "No more unclear timelines, inconsistent output, or designs that miss the mark. You want a team that communicates clearly and delivers precisely.",
    index: "06",
    href: "/quote?type=clarity",
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────
export const services = [
  {
    index: "01",
    tag: "Web",
    title: "Websites & Web Applications",
    description:
      "From marketing sites that convert to full-scale web apps and e-commerce platforms. We design and build for performance, clarity, and growth — whether it's your first site or a complete rebuild.",
    deliverables: ["Landing Pages", "E-commerce", "Web Apps", "CMS Builds", "Redesigns"],
    accent: "primary",
    href: "/services/web",
  },
  {
    index: "02",
    tag: "Systems",
    title: "Custom Software & Systems",
    description:
      "When off-the-shelf tools don't cut it. We build custom internal tools, employee management systems, booking platforms, dashboards, and any system your business needs to operate at scale.",
    deliverables: ["Internal Tools", "Dashboards", "Booking Systems", "ERP/HR Systems", "Automation"],
    accent: "violet",
    href: "/services/systems",
  },
  {
    index: "03",
    tag: "Mobile",
    title: "Mobile Applications",
    description:
      "Native-quality mobile apps for iOS and Android. Whether it's a customer-facing product or an internal ops tool, we build apps that are fast, reliable, and feel right in the hand.",
    deliverables: ["iOS Apps", "Android Apps", "Cross-Platform", "App Redesigns", "MVPs"],
    accent: "primary",
    href: "/services/mobile",
  },
  {
    index: "04",
    tag: "Integrations",
    title: "Integrations & Automation",
    description:
      "Your stack should work as one. We connect your CRM, payment systems, analytics, communication tools, and custom APIs so data flows freely and your team stops doing things manually.",
    deliverables: ["Payment Gateways", "CRM Integration", "API Connections", "Workflow Automation", "Third-party Tools"],
    accent: "emerald",
    href: "/services/integrations",
  },
  {
    index: "05",
    tag: "Design",
    title: "UI/UX Design",
    description:
      "Design that makes people stay. We create interfaces grounded in user research, built with precision, and tested for usability — so your product is as intuitive as it is beautiful.",
    deliverables: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"],
    accent: "violet",
    href: "/services/design",
  },
  {
    index: "06",
    tag: "Brand",
    title: "Brand Identity & Graphics",
    description:
      "A brand that means something. From logo to full identity systems, we build visual languages that communicate who you are at a glance — consistently, across every surface.",
    deliverables: ["Logo Design", "Brand Guidelines", "Visual Identity", "Print & Digital", "Pitch Decks"],
    accent: "emerald",
    href: "/services/brand",
  },
];

// ─── Process ──────────────────────────────────────────────────────────────────
export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "We start by understanding your business, goals, and constraints. One focused conversation to get aligned on what success actually looks like for you.",
    duration: "1–2 days",
    output: "Project Brief",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "We map out the full scope — architecture, timelines, milestones. No surprises later. You get a clear picture of what gets built, in what order, and why.",
    duration: "2–3 days",
    output: "Project Roadmap",
  },
  {
    step: "03",
    title: "Design",
    description:
      "Wireframes, then high-fidelity mockups. Every screen, every state — reviewed with you before a single line of code is written. Revisions are part of the process.",
    duration: "1–2 weeks",
    output: "Design System + Screens",
  },
  {
    step: "04",
    title: "Build",
    description:
      "Development begins with weekly check-ins and a shared progress board. You're never in the dark. We build clean, documented, and tested from day one.",
    duration: "2–8 weeks",
    output: "Production-Ready Build",
  },
  {
    step: "05",
    title: "Launch",
    description:
      "Full QA, performance audit, and a structured handover. We don't just push live and disappear — we make sure everything works, you understand it, and you're set up to grow.",
    duration: "2–3 days",
    output: "Live Product + Handover Docs",
  },
];

// ─── Work / Case Studies ──────────────────────────────────────────────────────
export type CaseStudy = {
  index: string;
  client: string;
  industry: string;
  type: string;
  image: string;
  challenge: string;
  solution: string;
  result: string;
  tags: string[];
  accentColor: "primary" | "violet" | "emerald";
  caseStudyLink?: string; // Optional: Link to internal page
  externalLink?: string;  // Optional: Link to live site
  href: string;           // Kept for backward compatibility if needed
};

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    client: "WaziRent",
    industry: "PropTech",
    type: "Web Application",
    image: "/images/wazirent.png",
    challenge: "Tenants and landlords were managing rentals through WhatsApp and spreadsheets — payments missed, disputes constant, no paper trail.",
    solution: "A full rental management platform: digital leases, automated rent reminders, M-Pesa payment integration, and a landlord dashboard with occupancy tracking.",
    result: "Reduced payment disputes by 80% and cut admin time for landlords by half.",
    tags: ["Web App", "Payments", "Dashboard"],
    caseStudyLink: "/work/wazirent",
    externalLink: "https://wazirent.com",
    href: "/work/wazirent",
    accentColor: "primary",
  },
  {
    index: "02",
    client: "Barabara Voyagers",
    industry: "Tourism",
    type: "Website + Booking System",
    image: "/images/Barabara Voyagers New.png",
    challenge: "A premium safari company with a website that looked anything but premium — no online bookings, no trust signals, losing clients to better-looking competitors.",
    solution: "A high-end website redesign with immersive imagery, an integrated booking and quote system, and SEO foundations that put them in front of the right searches.",
    result: "3× increase in inbound enquiries within 60 days of launch.",
    tags: ["Redesign", "Booking", "SEO"],
    caseStudyLink: "/work/essentia",
    externalLink: "https://essentiasafari.com",
    href: "/work/essentia",
    accentColor: "emerald",
  },
  {
    index: "03",
    client: "Kinimatic",
    industry: "Fitness & Wellness",
    type: "Brand Identity + Website",
    image: "/images/wazirent.png",
    challenge: "A new fitness brand with no visual identity, no web presence, and no way to communicate what made them different in a saturated market.",
    solution: "End-to-end brand build: logo, color system, typography, and a conversion-focused website with class scheduling and membership sign-up flows.",
    result: "Sold out first cohort within two weeks of launch. Brand now recognized locally.",
    tags: ["Brand", "Web Design", "Identity"],
    caseStudyLink: "/work/kinimatic",
    // externalLink: "https://kinimatic.com", // Example: leave out to test "View Live" button hiding
    href: "/work/kinimatic",
    accentColor: "violet",
  },
  {
    index: "04",
    client: "FieldOps",
    industry: "Field Services",
    type: "Custom Internal System",
    image: "/images/fieldops.png",
    challenge: "A field services company tracking 40+ technicians on paper, losing jobs to poor scheduling, and unable to generate reports for clients.",
    solution: "A custom job management system with technician assignment, GPS check-ins, job status tracking, client-facing report generation, and invoice automation.",
    result: "Operations team reduced from 4 coordinators to 2. Zero missed jobs in first quarter after launch.",
    tags: ["Custom System", "Automation", "Internal Tool"],
    caseStudyLink: "/work/fieldops",
    href: "/work/fieldops",
    accentColor: "primary",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonials = [
  {
    quote:
      "We'd worked with two agencies before Kheem. Both delivered something that looked fine but didn't perform. Kheem built us a system that actually runs the business — payments, tracking, everything. Night and day difference.",
    name: "Aisha Njoroge",
    title: "Founder, WaziRent",
    outcome: "80% drop in payment disputes",
    avatar: "/images/aisha.jpg",
    index: "01",
  },
  {
    quote:
      "I was skeptical about the timeline they quoted — it felt too fast. But they hit every milestone and the quality was better than I expected. The brand they built for us is something we're genuinely proud of.",
    name: "Kris Kellaway",
    title: "President, Kinimatic",
    outcome: "First cohort sold out in 2 weeks",
    avatar: "/images/kris.jpg",
    index: "02",
  },
  {
    quote:
      "What stood out was that they asked questions other agencies never asked — about our customers, our operations, what actually costs us time. The end product solved real problems, not surface ones.",
    name: "Kennedy Mallya",
    title: "President, Essentia Safari",
    outcome: "3× inbound enquiries in 60 days",
    avatar: "/images/kennedy.jpg",
    index: "03",
  },
  {
    quote:
      "The dashboard they built replaced a team of two. That's not an exaggeration. Our coordinators now handle twice the jobs with less stress, and our clients get reports without us lifting a finger.",
    name: "Marcus Odhiambo",
    title: "CEO, FieldOps",
    outcome: "Coordination headcount cut by 50%",
    avatar: "/images/marcus.jpg",
    index: "04",
  },
  {
    quote:
      "Communication was clear throughout. We always knew what was happening, what was next, and what we needed from our end. That kind of process is rare, especially at this price point.",
    name: "Fatima Al-Hassan",
    title: "Director, Berco Inc.",
    outcome: "Project delivered on time, under budget",
    avatar: "/images/fatima.jpg",
    index: "05",
  },
  {
    quote:
      "I've referred three other founders to Kheem since we launched. That tells you everything. When you find a team that actually gets it, you don't keep it to yourself.",
    name: "David Muriithi",
    title: "Co-Founder, Heave Corp",
    outcome: "3 direct referrals post-launch",
    avatar: "/images/david.jpg",
    index: "06",
  },
];





