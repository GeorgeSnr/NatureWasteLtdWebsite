import React from "react";

interface GooglePlayButtonProps {
  variant?: "dark" | "light" | "green" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  showSubtitle?: boolean;
}

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.naturewaste.customer_app";

export function GooglePlayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M3.609 1.814L13.793 12 3.61 22.186A2.2 2.2 0 0 1 3 20.63V3.37c0-.598.22-1.156.609-1.556z"
        fill="#00C3FF"
      />
      <path
        d="M17.186 8.607L5.05 1.597a2.22 2.22 0 0 0-1.441-.217L13.793 12l3.393-3.393z"
        fill="#00E676"
      />
      <path
        d="M17.186 15.393L13.793 12l-10.184 10.62a2.22 2.22 0 0 0 1.441-.217l12.136-7.01z"
        fill="#FF334B"
      />
      <path
        d="M20.89 10.474l-3.704-2.14-3.393 3.666 3.393 3.666 3.704-2.14a1.78 1.78 0 0 0 0-3.052z"
        fill="#FFD400"
      />
    </svg>
  );
}

export default function GooglePlayButton({
  variant = "dark",
  size = "md",
  className = "",
  showSubtitle = true,
}: GooglePlayButtonProps) {
  const variantStyles = {
    dark: "bg-[#111827] hover:bg-black text-white border border-gray-700 shadow-xs",
    light: "bg-white hover:bg-gray-50 text-[#111827] border border-gray-300 shadow-xs",
    green: "bg-[#006F51] hover:bg-[#005a42] text-white border border-[#005a42] shadow-xs",
    outline: "bg-transparent hover:bg-white/10 text-white border border-white/30",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-left rounded",
    md: "px-4 py-2.5 text-left rounded-md",
    lg: "px-5 py-3 text-left rounded-lg",
  };

  const iconSizes = {
    sm: "w-4 h-4 shrink-0",
    md: "w-6 h-6 shrink-0",
    lg: "w-7 h-7 shrink-0",
  };

  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download NatureWaste Connect on Google Play"
      className={`inline-flex items-center gap-2.5 transition-all group select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      <GooglePlayIcon className={iconSizes[size]} />
      <div className="flex flex-col leading-tight">
        {showSubtitle && (
          <span className="text-[9px] uppercase tracking-wider font-semibold opacity-80">
            GET IT ON
          </span>
        )}
        <span
          className={`font-bold tracking-tight ${
            size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
          }`}
        >
          Google Play
        </span>
      </div>
    </a>
  );
}
