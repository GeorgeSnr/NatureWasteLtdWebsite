"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { serviceModules } from "@/data/services";

export default function ServicesTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = serviceModules[activeIdx];

  return (
    <section className="w-full bg-[#F7F8FA] py-16 lg:py-24 px-6 sm:px-12 lg:px-16 select-none relative z-10 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-gradient-to-b from-nature-secondary/15 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-[1320px] mx-auto relative z-10">
        {/* Header with Title and "View All Modules" button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-nature-primary font-extrabold text-sm sm:text-base uppercase tracking-widest">
              <span className="text-base font-black tracking-tight leading-none text-nature-secondary">
                »»
              </span>
              <span>SERVICES & MODULES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#141517] leading-[1.15] tracking-tight">
              Enterprise modules for
              <br className="hidden sm:inline" /> modern waste operations
            </h2>
          </div>

          <div>
            <Link
              href="/features"
              className="group inline-flex items-center gap-3 bg-white hover:bg-nature-primary text-[#141517] hover:text-white border border-gray-200 hover:border-nature-primary font-bold px-6 py-3.5 text-sm shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <span>View All Modules</span>
              <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-white transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 3-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Column 1: Vertical Tab Selectors */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 justify-center">
            {serviceModules.map((module, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative w-full text-left px-6 py-4 font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-between cursor-pointer overflow-hidden ${
                    isActive
                      ? "bg-nature-primary text-white shadow-md"
                      : "bg-white text-[#141517] hover:bg-nature-primary hover:text-white border border-gray-100/80 shadow-xs hover:shadow-md"
                  }`}
                >
                  <span className="relative z-10">{module.name}</span>
                  <ArrowRight
                    className={`w-4 h-4 transition-all duration-300 relative z-10 ${
                      isActive
                        ? "opacity-100 text-white translate-x-0"
                        : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Column 2: Chamfered Image of Active Module */}
          <div className="lg:col-span-4 relative min-h-[360px] lg:min-h-[460px] flex items-center">
            <div className="w-full h-full min-h-[360px] lg:min-h-[460px] overflow-hidden shadow-xl chamfer-card relative">
              <div
                className="w-full h-full bg-cover bg-center transition-all duration-500 transform scale-100 hover:scale-105"
                style={{ backgroundImage: `url('${activeService.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-xs p-3 border-l-2 border-nature-secondary text-white text-xs font-semibold">
                  {activeService.metrics}
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Active Module Details & Feature Checklist */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6 lg:pl-2">
            <div className="space-y-4">
              <div className="text-xs font-black uppercase tracking-widest text-nature-primary">
                Module Capability
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#141517] leading-snug">
                {activeService.name}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                {activeService.fullDesc}
              </p>

              {/* Checklist */}
              <div className="space-y-3 pt-2">
                {activeService.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-nature-primary shrink-0 stroke-[2.2]" />
                    <span className="text-[#141517] font-bold text-sm sm:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action link */}
              <div className="pt-3">
                <Link
                  href={`/features#${activeService.id}`}
                  className="inline-flex items-center gap-2 text-nature-primary hover:text-nature-primary-dark font-extrabold text-base underline underline-offset-4 transition-colors group"
                >
                  <span>Explore Module Deep-Dive</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
