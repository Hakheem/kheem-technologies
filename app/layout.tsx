import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const generalSans = localFont({
  src: [
    { path: "../public/fonts/general-sans/GeneralSans-Variable.ttf", style: "normal" },
    { path: "../public/fonts/general-sans/GeneralSans-VariableItalic.ttf", style: "italic" }
  ],
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const cabinetGrotesk = localFont({
  src: "../public/fonts/cabinet-grotesk/CabinetGrotesk-Variable.ttf",
  variable: "--font-heading",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#005CEE",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Kheem Technologies | Premium Digital Solutions",
    template: "%s | Kheem Technologies",
  },
  description: "We engineer high-performance digital systems. From scalable web architectures to seamless user experiences, we solve complex problems with technical precision.",
  keywords: ["Software Engineering", "Web Development", "Tech Solutions", "Kheem Technologies", "Digital Transformation"],
  authors: [{ name: "Kheem Technologies" }],
  creator: "Kheem Technologies",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kheem.tech", // Update this when you have a domain
    siteName: "Kheem Technologies",
    title: "Kheem Technologies | Precision-Engineered Systems",
    description: "High-end digital solutions for businesses that demand performance and scalability.",
    images: [
      {
        url: "/og-image.png", // Create an image for social sharing later
        width: 1200,
        height: 630,
        alt: "Kheem Technologies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kheem Technologies",
    description: "Engineering digital systems that grow, convert, and operate better.",
    creator: "@kheemtech", // Update with your handle
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${generalSans.variable} ${cabinetGrotesk.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10 selection:text-primary">
      <Navbar/>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      <Footer/>
      </body>
    </html>
  );
}

