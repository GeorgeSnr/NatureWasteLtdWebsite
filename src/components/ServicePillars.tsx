"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Home, Building2, Box, Sparkles, ShieldCheck, Truck } from "lucide-react";
import { wasteServicesList } from "@/data/wasteServices";

export default function ServicePillars() {
  const pillars = [
    {
      id: "residential",
      tag: "Residential",
      tagColor: "bg-[#E9F4F0] text-[#006F51]",
      title: "Garbage Pickup for Home",
      desc: "Residential trash pickup and color-coded recycling sack collection available in all neighborhoods we serve.",
      points: [
        "Weekly scheduled curbside pickup",
        "Free segregation sacks for plastics & paper",
        "Dependable odor-free collection vehicles",
        "SMS collection day reminder alerts",
      ],
      link: "/pricing",
      buttonText: "Go to Residential Services",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "commercial",
      tag: "Commercial",
      tagColor: "bg-[#E9F4F0] text-[#006F51]",
      title: "Business Waste Management",
      desc: "Our commercial waste collection provides your enterprise with custom containers and flexible schedules.",
      points: [
        "240L wheelie bins to multi-cubic yard containers",
        "Custom pickup intervals (daily, bi-weekly, weekly)",
        "NEMA statutory disposal manifests & ESG tracking",
        "Dedicated corporate account manager",
      ],
      link: "/book-demo",
      buttonText: "Go to Business Waste",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "dumpsters",
      tag: "Dumpster Rental",
      tagColor: "bg-gray-100 text-[#212529]",
      title: "Roll-Off Dumpsters (7m³ - 20m³)",
      desc: "Our dumpster rentals offer a range of heavy-duty container sizes suitable for commercial, residential, and construction needs.",
      points: [
        "7m³, 12m³, 15m³ & 20m³ high-capacity skips",
        "Renovation, landscaping, demolition & factory cleanouts",
        "Prompt delivery to Kitende, Lubowa, Kololo & Mukono",
        "Transparent flat rates with disposal included",
      ],
      link: "/pricing#calculator",
      buttonText: "Go to Dumpster Rental",
      image: "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="w-full bg-white py-14 sm:py-20 select-none border-b border-[#E5E7EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-wider bg-[#E9F4F0] px-3 py-1 rounded border border-[#006F51]/20">
            <span>Our Service Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1D20] tracking-tight leading-tight">
            Waste &amp; Recycling Solutions Tailored for Uganda
          </h2>
          <p className="text-[#555C66] text-sm sm:text-base leading-relaxed">
            From scheduled curbside garbage collection in residential estates to high-capacity roll-off skips for industrial facilities, Nature Waste delivers dependable, licensed service.
          </p>
        </div>

        {/* 3 Core Pillar Cards (Matching Waste Connections sec_service-cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded border border-[#E5E7EB] overflow-hidden shadow-xs hover:shadow-md hover:border-[#006F51] transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${pillar.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-xs ${pillar.tagColor}`}>
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white leading-snug">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <p className="text-[#555C66] text-xs sm:text-sm leading-relaxed">
                    {pillar.desc}
                  </p>

                  <div className="border-t border-[#F0F2F5] pt-4 space-y-2.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                      Key Highlights:
                    </div>
                    {pillar.points.map((p, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                        <Check className="w-4 h-4 text-[#006F51] shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0">
                <Link
                  href={pillar.link}
                  className="w-full bg-[#F8F9FA] hover:bg-[#006F51] text-[#1A1D20] hover:text-white py-3 px-4 rounded font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-[#E5E7EB] hover:border-[#006F51]"
                >
                  <span>{pillar.buttonText}</span>
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
