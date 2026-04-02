import Link from "next/link";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link href="/" onClick={onClick} className={`flex items-center gap-3 group transition-opacity hover:opacity-90 ${className || ""}`}>
      {/* The Monolith SVG Icon */}
      <div className="relative flex items-center justify-center w-10 h-10 bg-primary rounded-lg shadow-sm transition-transform group-hover:scale-105">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M7 4v16" />
          <path d="M17 4l-7 7.5" />
          <path d="M10 11.5L17 20" />
        </svg>
      </div>

      {/* The Wordmark */}
      <div className="flex flex-col space-y-1">
        <span className="font-heading text-lg font-bold tracking-tight text-foreground leading-none">
          KHEEM
        </span>
        <span className="font-sans text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase leading-none">
          Technologies
        </span>
      </div>
    </Link>
  );
}

