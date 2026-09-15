"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
      desc: "Fully licensed by the National Environment Management Authority (NEMA) Uganda for domestic, commercial, and industrial waste handling.",
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
      desc: "State-of-the-art sorting facility at Kitende on Entebbe Road, baling post-consumer PET, HDPE, and paper for regional industrial manufacturing.",
    },
  ];

  const stats = [
    { value: "120k+", label: "Metric Tons Diverted from Landfills" },
    { value: "99.4%", label: "Collection Route Reliability SLA" },
    { value: "45k+", label: "Households & Businesses Served" },
    { value: "100%", label: "Traceable NEMA Chain-of-Custody" },
  ];

  return (
    <section id="about-nema" className="w-full bg-[#0E1A14] text-white py-16 sm:py-20 lg:py-24 select-none relative overflow-hidden">
      {/* Background Graphic Watermark */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none flex items-center justify-end">
        <svg viewBox="0 0 400 400" className="w-full h-full fill-current text-white">
          <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="12" fill="none" />
          <path d="M120 280 L200 120 L280 280 Z" stroke="currentColor" strokeWidth="12" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-nature-secondary font-extrabold text-xs uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full">
              <Award className="w-3.5 h-3.5 text-nature-secondary" />
              <span>THE NATURE WASTE DIFFERENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white leading-[1.12] tracking-tight">
              A Higher Standard of Waste Management For Uganda
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              At Nature Waste Management Limited, we believe reliable sanitation is the bedrock of thriving cities. We combine corporate-grade logistics modeled after industry leaders like Waste Connections with passionate on-the-ground youth environmental stewardship.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white/5 border border-white/15 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-nature-primary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">NEMA Uganda Registered</h3>
                <span className="text-xs text-nature-secondary font-semibold">
                  Official Environmental Waste Handler
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Operating under strict National Environment Management Authority guidelines, our protocols ensure every kilogram of refuse is accounted for, sorted, and processed without polluting Lake Victoria or local wetlands.
            </p>
            <div className="pt-2">
              <Link
                href="/features"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-nature-secondary hover:text-white transition-colors"
              >
                <span>Read Our Full ESG &amp; Compliance Statement</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Feature Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-nature-secondary/50 transition-all duration-300 space-y-3"
              >
                <div className="w-11 h-11 rounded-lg bg-nature-primary text-white flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">{item.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* 4 Large Outlined Stat Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-white/15">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-nature-secondary tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
