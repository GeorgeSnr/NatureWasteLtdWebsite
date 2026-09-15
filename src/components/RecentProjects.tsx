"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { recentProjects } from "@/data/projects";

export default function RecentProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#F7F8FA] pt-16 lg:pt-24 pb-0 relative z-10 overflow-hidden select-none">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 lg:mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-nature-primary font-extrabold text-sm sm:text-base uppercase tracking-widest">
              <span className="text-base font-black tracking-tight leading-none text-nature-secondary">
                »»
              </span>
              <span>RECENT OPERATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#141517] leading-tight tracking-tight">
              Powered by Nature Waste Connect
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Previous Operation"
              className="w-11 h-11 bg-[#EAEBED] hover:bg-nature-primary text-[#141517] hover:text-white transition-colors duration-300 flex items-center justify-center cursor-pointer group shadow-xs"
            >
              <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Next Operation"
              className="w-11 h-11 bg-[#EAEBED] hover:bg-nature-primary text-[#141517] hover:text-white transition-colors duration-300 flex items-center justify-center cursor-pointer group shadow-xs"
            >
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Track with Signature Angled Green Backdrop */}
      <div className="relative w-full mt-6 sm:mt-10">
        {/* Primary Green Base Wave Container */}
        <div
          className="absolute bottom-0 right-0 bg-nature-primary z-0 overflow-hidden"
          style={{ left: "64px", top: "280px" }}
        >
          <svg
            className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 300"
            preserveAspectRatio="none"
          >
            <path
              d="M0 40 C 300 140, 600 10, 1200 80 L 1200 300 L 0 300 Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <path
              d="M0 90 C 400 20, 800 180, 1200 40 L 1200 300 L 0 300 Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Horizontal Project Slider */}
        <div className="relative z-10 w-full overflow-hidden pb-6 sm:pb-8">
          <div
            ref={scrollRef}
            className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-none px-6 sm:px-12 lg:px-16 scroll-smooth pb-4"
          >
            {recentProjects.map((item) => (
              <div
                key={item.id}
                className="group relative h-[380px] sm:h-[420px] w-[280px] sm:w-[340px] lg:w-[380px] shrink-0 overflow-hidden bg-gray-900 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col justify-end chamfer-card"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

                {/* Card Information */}
                <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-end space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-nature-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs tracking-wide">
                      {item.category}
                    </span>
                    <span className="inline-block bg-nature-secondary/90 text-[#074E15] text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                      {item.impact}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <h3 className="text-xl sm:text-[24px] font-extrabold text-white leading-tight tracking-tight drop-shadow-xs group-hover:text-nature-secondary transition-colors">
                      {item.title}
                    </h3>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 bg-nature-primary text-white rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-md">
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner inside Green Area */}
        <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16 pb-12 sm:pb-16">
          <div className="pt-6 sm:pt-8 border-t border-white/20 flex flex-col lg:flex-row items-center justify-between min-h-[120px] py-4 gap-6 lg:gap-10 text-center lg:text-left">
            <div className="shrink-0 space-y-0.5">
              <div className="text-5xl sm:text-6xl lg:text-[56px] font-black text-white tracking-tight leading-none">
                120k+
              </div>
              <div className="text-white/95 text-base sm:text-lg font-semibold">
                Metric Tons Diverted
              </div>
            </div>

            <div className="max-w-md">
              <p className="text-white/90 text-sm sm:text-base leading-relaxed font-normal">
                From residential collection to multi-hospital clinical autoclaves and industrial zero-landfill compactors, Nature Waste powers the leaders shaping a cleaner Africa.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/book-demo"
                className="relative overflow-hidden bg-white text-[#141517] font-extrabold text-sm sm:text-base px-7 py-3.5 sm:px-8 sm:py-4 cursor-pointer shadow-md group inline-flex"
              >
                <span className="absolute inset-0 bg-[#141517] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
                <span className="relative z-10 text-[#141517] group-hover:text-white transition-colors duration-300 flex items-center gap-3">
                  <span>Schedule Waste Audit</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
