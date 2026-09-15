"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Home, Building2, Box, Sparkles, ShieldCheck } from "lucide-react";
import { wasteServicesList } from "@/data/wasteServices";

export default function ServicePillars() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 select-none">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-nature-primary font-extrabold text-xs uppercase tracking-widest bg-nature-primary/10 px-3.5 py-1.5 rounded-full">
            <span>COMPREHENSIVE WASTE &amp; RECYCLING SOLUTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#141517] tracking-tight leading-tight">
            Tailored Services For Every Home, Business &amp; Job Site in Uganda
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            From weekly residential curbside garbage pickup in Kampala suburbs to high-capacity industrial roll-off skips in Namanve, we deliver dependable, environmentally licensed collection services.
          </p>
        </div>

        {/* 3 Core Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {wasteServicesList.slice(0, 3).map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-nature-secondary/70 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Card Image Header */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${service.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-nature-primary text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-black text-white leading-snug">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="border-t border-gray-100 pt-4 space-y-2.5">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                      What&apos;s Included:
                    </div>
                    {service.features.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <Check className="w-4 h-4 text-nature-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="p-6 sm:p-7 pt-0">
                <Link
                  href={service.ctaLink}
                  className="w-full bg-[#141517] hover:bg-nature-primary text-white py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 shadow-xs group-hover:shadow-md"
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
