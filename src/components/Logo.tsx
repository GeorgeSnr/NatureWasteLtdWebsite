import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({
  variant = "light",
  showTagline = false,
  size = "md",
  className = "",
}: LogoProps) {
  const isDark = variant === "dark";

  // Dimensions based on size
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Nature Waste Circular Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-300 group-hover:rotate-12"
        >
          {/* Outer circular recycling arrows outline */}
          <circle
            cx="22"
            cy="22"
            r="20"
            stroke="#0B6B1E"
            strokeWidth="2.5"
            strokeDasharray="6 3"
            className="opacity-70"
          />
          {/* Circular gradient background ring */}
          <circle cx="22" cy="22" r="18" fill="#0B6B1E" />
          
          {/* Mountain / Eco Ridge polygon (Secondary green) */}
          <path
            d="M8 29L16 17L22 24L28 14L36 29H8Z"
            fill="#9AD44D"
            opacity="0.9"
          />
          
          {/* Stylized 'N' and 'M' intersecting mark with Yellow accent */}
          {/* 'N' Stem & Diagonal */}
          <path
            d="M14 28V16L21 27V15"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 'M' Arch / Right Peak */}
          <path
            d="M23 27L29 16L34 28"
            stroke="#D7C93A"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Recycling leaf dot accent */}
          <circle cx="22" cy="9" r="2.2" fill="#D7C93A" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-black tracking-tight ${textSizes[size]} ${
              isDark ? "text-white" : "text-[#141517]"
            }`}
          >
            Nature<span className="text-nature-primary">Waste</span>
          </span>
          <span className="bg-nature-secondary/25 text-nature-primary text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider">
            Connect
          </span>
        </div>
        {showTagline && (
          <span className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase mt-1">
            Reduce. Reuse. Recycle.
          </span>
        )}
      </div>
    </Link>
  );
}
