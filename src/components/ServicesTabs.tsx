"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { serviceModules } from "@/data/services";

export default function ServicesTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = serviceModules[activeIdx];

  return (
    <section className="w-full bg-[#F8F9FA] py-16 lg:py-24 px-6 sm:px-12 lg:px-16 select-none relative z-10 overflow-hidden border-b border-gray-200">
      <div className="max-w-[1320px] mx-auto relative z-10">
        {/* Header with Title and "View All Modules" button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-widest">
              <span>SERVICES & MODULES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-[#1A1D20] leading-[1.15] tracking-tight">
              Enterprise modules for
              <br className="hidden sm:inline" /> modern waste operations
            </h2>
          </div>

          <div>
            <Link
              href="/features"
              className="inline-flex items-center gap-3 bg-white hover:bg-[#006F51] text-[#1A1D20] hover:text-white border border-gray-300 hover:border-[#006F51] font-bold px-5 py-2.5 text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
            >
              <span>View All Modules</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Column 1: Vertical Tab Selectors */}
          <div className="lg:col-span-4 flex flex-col gap-2 justify-center">
            {serviceModules.map((module, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-full text-left px-5 py-3.5 font-bold text-sm transition-colors flex items-center justify-between cursor-pointer rounded-sm border ${
                    isActive
                      ? "bg-[#006F51] text-white border-[#006F51]"
                      : "bg-white text-[#1A1D20] hover:bg-[#F8F9FA] hover:text-[#006F51] border-gray-200"
                  }`}
                >
                  <span>{module.name}</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isActive
                        ? "opacity-100 text-white"
                        : "opacity-40"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Column 2: Image of Active Module */}
          <div className="lg:col-span-4 relative min-h-[360px] lg:min-h-[460px] flex items-center">
            <div className="w-full h-full min-h-[360px] lg:min-h-[460px] overflow-hidden border border-gray-200 rounded-sm relative">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: `url('${activeService.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 p-3 border-l-3 border-[#FFCE00] text-white text-xs font-semibold">
                  {activeService.metrics}
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Active Module Details & Feature Checklist */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6 lg:pl-2">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-widest text-[#006F51]">
                Module Capability
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1D20] leading-snug">
                {activeService.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {activeService.fullDesc}
              </p>

              {/* Checklist */}
              <div className="space-y-2.5 pt-2">
                {activeService.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#006F51] shrink-0" />
                    <span className="text-[#1A1D20] font-medium text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action link */}
              <div className="pt-3">
                <Link
                  href={`/features#${activeService.id}`}
                  className="inline-flex items-center gap-2 text-[#006F51] hover:text-[#004D38] font-bold text-sm underline underline-offset-4 transition-colors group"
                >
                  <span>Explore Module Deep-Dive</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
