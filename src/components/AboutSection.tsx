"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Truck,
  Leaf,
} from "lucide-react";

export default function AboutSection() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "100% NEMA Statutory Compliance",
      desc: "Fully registered and licensed by the National Environment Management Authority (NEMA) Uganda for domestic, commercial, and industrial waste handling.",
    },
    {
      icon: Users,
      title: "Youth Environmentalist Leadership",
      desc: "Founded by Ugandan environmental pioneers, channeling local youth employment and community cleanup campaigns under the GoGreenug banner.",
    },
    {
      icon: Truck,
      title: "Modern Enclosed Compactor Fleet",
      desc: "GPS-monitored hydraulic compactor trucks designed to prevent roadside odor, liquid leachate spillage, and missed pickup backlogs.",
    },
    {
      icon: Leaf,
      title: "Certified Circular Recycling",
      desc: "Sorting and recovery facility at Kitende on Entebbe Road, baling post-consumer PET, HDPE, and paper for regional manufacturing.",
    },
  ];

  const stats = [
    { value: "120k+", label: "Metric Tons Diverted from Landfills" },
    { value: "99.4%", label: "Collection Route Reliability SLA" },
    { value: "45k+", label: "Households & Businesses Served" },
    { value: "100%", label: "Traceable NEMA Chain-of-Custody" },
  ];

  return (
    <section id="about-nema" className="w-full bg-white text-[#212529] py-16 sm:py-20 lg:py-24 select-none border-b border-[#E5E7EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-14">
          <div className="lg:col-span-7 space-y-3.5">
            <div className="inline-flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-wider bg-[#E9F4F0] px-3 py-1 rounded border border-[#006F51]/20">
              <Award className="w-3.5 h-3.5" />
              <span>The Nature Waste Difference</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1A1D20] leading-[1.15] tracking-tight">
              A Higher Standard of Waste Management For Uganda
            </h2>
            <p className="text-[#555C66] text-sm sm:text-base leading-relaxed">
              At Nature Waste Management Limited, we believe reliable sanitation is the bedrock of thriving communities. We combine corporate-grade logistics modeled after global best practices with passionate on-the-ground youth environmental stewardship.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#F8F9FA] border border-[#E5E7EB] rounded p-6 sm:p-7 space-y-3.5 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#E9F4F0] text-[#006F51] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1A1D20]">NEMA Uganda Registered</h3>
                <span className="text-xs text-[#006F51] font-semibold">
                  Official Statutory Waste Handler
                </span>
              </div>
            </div>
            <p className="text-xs text-[#555C66] leading-relaxed">
              Operating under strict National Environment Management Authority guidelines, our protocols ensure every kilogram of refuse is accounted for, sorted, and processed without polluting Lake Victoria or local wetland corridors.
            </p>
            <div className="pt-1">
              <Link
                href="/features"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] hover:underline"
              >
                <span>Read Our Full ESG &amp; Compliance Statement</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded bg-[#F8F9FA] border border-[#E5E7EB] hover:bg-white hover:border-[#006F51] hover:shadow-xs transition-all duration-200 space-y-3 group"
              >
                <div className="w-10 h-10 rounded bg-white border border-[#E5E7EB] text-[#006F51] flex items-center justify-center group-hover:bg-[#006F51] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-[#1A1D20] group-hover:text-[#006F51] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#555C66] leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Impact Statistics */}
        <div className="rounded bg-[#006F51] text-white p-8 sm:p-10 shadow-xs">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/20">
            {stats.map((stat, idx) => (
              <div key={idx} className="pt-4 sm:pt-0 sm:px-4 space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-[#FFCE00]">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-200 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
