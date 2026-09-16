"use client";

import React from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function SavingsCtaBanner() {
  return (
    <section className="w-full bg-[#E9F4F0] py-12 sm:py-16 select-none border-b border-[#006F51]/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          
          {/* Headline matching Waste Connections copy */}
          <div className="max-w-2xl space-y-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#006F51] tracking-tight leading-tight">
              Say goodbye to waste and hello to savings with Nature Waste!
            </h3>
            <p className="text-sm sm:text-base text-[#363636]">
              Dependable scheduled collections, NEMA statutory licensing, and honest upfront pricing across Kampala, Wakiso, and Entebbe.
            </p>
          </div>

          {/* Buttons matching Waste Connections */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 shrink-0">
            <Link
              href="/#schedule-finder"
              className="bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded transition-colors"
            >
              Get a Quote
            </Link>

            <a
              href="tel:+256700890123"
              className="bg-white hover:bg-gray-50 border border-[#006F51]/30 text-[#006F51] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#006F51]" />
              <span>+256 700 890 123</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
