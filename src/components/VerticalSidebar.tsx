import React from "react";

export default function VerticalSidebar() {
  return (
    <aside className="hidden lg:flex flex-col justify-between items-center w-[80px] bg-white border-r border-gray-100 z-30 shrink-0 select-none relative min-h-[calc(100vh-80px)]">
      <div className="pt-12" />

      {/* Vertical contact links */}
      <div className="flex flex-col gap-16 items-center text-[#2A2E36] font-medium text-[13px] tracking-wide my-auto py-8">
        <div className="writing-mode-vertical rotate-180 flex items-center gap-1.5 whitespace-nowrap">
          <span className="font-semibold text-gray-500">Call.</span>
          <a
            href="tel:+256766532915"
            className="font-bold hover:text-nature-primary transition-colors tracking-wide"
          >
            +256 766 532915
          </a>
        </div>

        <div className="writing-mode-vertical rotate-180 flex items-center gap-1.5 whitespace-nowrap">
          <span className="font-semibold text-gray-500">Email.</span>
          <a
            href="mailto:info@naturewasteug.com"
            className="font-bold hover:text-[#006F51] transition-colors tracking-wide"
          >
            info@naturewasteug.com
          </a>
        </div>
      </div>

      {/* Corporate Brand Accent at bottom */}
      <div className="w-full relative h-[60px] flex items-end overflow-hidden mt-auto">
        <svg
          viewBox="0 0 80 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Main green triangle */}
          <path d="M0 60L40 20L80 60H0Z" fill="#006F51" />
          {/* Layered secondary green triangle */}
          <path d="M0 60L40 35L80 60H0Z" fill="#E9F4F0" />
          {/* Accent yellow peak dot */}
          <circle cx="40" cy="20" r="3" fill="#FFCE00" />
        </svg>
      </div>
    </aside>
  );
}
