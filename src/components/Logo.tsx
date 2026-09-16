import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
  layout?: "horizontal" | "stacked" | "image";
}

export default function Logo({
  variant = "light",
  showTagline = false,
  size = "md",
  className = "",
  showText = true,
  layout = "horizontal",
}: LogoProps) {
  const isDark = variant === "dark";

  // Emblem pixel dimensions
  const emblemSizes = {
    sm: { w: 36, h: 36, className: "w-9 h-9" },
    md: { w: 48, h: 48, className: "w-12 h-12" },
    lg: { w: 64, h: 64, className: "w-16 h-16" },
    xl: { w: 84, h: 84, className: "w-21 h-21" },
  };

  // Stacked/Full image dimensions
  const imageSizes = {
    sm: { w: 120, h: 125 },
    md: { w: 160, h: 165 },
    lg: { w: 210, h: 218 },
    xl: { w: 260, h: 270 },
  };

  const titleSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  // Pure graphic image mode
  if (layout === "image") {
    const imgSrc = isDark
      ? "/images/logo-full-dark.png"
      : "/images/logo-original-cropped.png";

    return (
      <Link href="/" className={`inline-block group ${className}`}>
        <Image
          src={imgSrc}
          alt="Nature Waste Management Ltd"
          width={imageSizes[size].w}
          height={imageSizes[size].h}
          priority
          className="object-contain"
        />
      </Link>
    );
  }

  // Stacked layout (centered vertical brand lockup)
  if (layout === "stacked") {
    return (
      <Link
        href="/"
        className={`inline-flex flex-col items-center text-center group select-none ${className}`}
      >
        <div
          className={`relative ${emblemSizes[size].className} shrink-0 mb-2 rounded-full overflow-hidden shadow-xs transition-opacity duration-200 group-hover:opacity-95`}
        >
          <Image
            src="/images/logo-emblem-disc.png"
            alt="Nature Waste Management Ltd Emblem"
            width={emblemSizes[size].w}
            height={emblemSizes[size].h}
            priority
            className="w-full h-full object-contain"
          />
        </div>

        {showText && (
          <div className="flex flex-col items-center">
            <span
              className={`font-black tracking-tight leading-none ${titleSizes[size]} ${
                isDark ? "text-white" : "text-[#1A1D20]"
              }`}
            >
              NATURE{" "}
              <span
                className={
                  isDark ? "text-nature-secondary" : "text-nature-primary"
                }
              >
                WASTE
              </span>
            </span>

            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2.5 h-[1.5px] bg-nature-secondary" />
              <span
                className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                MANAGEMENT LTD
              </span>
              <span className="w-2.5 h-[1.5px] bg-nature-secondary" />
            </div>

            {showTagline && (
              <span className="text-[11px] font-medium text-gray-400 tracking-wider mt-1.5 italic">
                Reduce, Reuse, Recycle
              </span>
            )}
          </div>
        )}
      </Link>
    );
  }

  // Default: Responsive Horizontal Layout (Fits sticky header, navbars, and banners)
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group select-none ${className}`}
    >
      {/* Real Circular NWM Emblem from logo1.jpg */}
      <div
        className={`relative ${emblemSizes[size].className} shrink-0 rounded-full overflow-hidden shadow-xs transition-opacity duration-200 group-hover:opacity-95`}
      >
        <Image
          src="/images/logo-emblem-disc.png"
          alt="Nature Waste Management Ltd Emblem"
          width={emblemSizes[size].w}
          height={emblemSizes[size].h}
          priority
          className="w-full h-full object-contain"
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-tight ${titleSizes[size]} ${
                isDark ? "text-white" : "text-[#1A1D20]"
              }`}
            >
              NATURE{" "}
              <span
                className={
                  isDark ? "text-nature-secondary" : "text-nature-primary"
                }
              >
                WASTE
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-[1.5px] bg-nature-secondary shrink-0" />
            <span
              className={`text-[9px] sm:text-[10.5px] font-bold uppercase tracking-widest ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              MANAGEMENT LTD
            </span>
            <span className="w-2 h-[1.5px] bg-nature-secondary shrink-0" />
          </div>

          {showTagline && (
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 tracking-wider uppercase mt-1">
              Reduce. Reuse. Recycle.
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
