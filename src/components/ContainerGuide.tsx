"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Box, Check, ArrowRight, Truck, Home, Building2, Factory } from "lucide-react";

export default function ContainerGuide() {
  const [selectedSize, setSelectedSize] = useState<number>(1);

  const containers = [
    {
      id: "120l",
      name: "120L Standard Wheelie Bin",
      category: "Residential Household",
      capacity: "Holds approx. 2-3 standard trash bags",
      idealFor: "Individual homes, duplexes, or gated estate residences with weekly pickups.",
      dimensions: "93cm H × 48cm W × 55cm D",
      icon: Home,
      accent: "border-green-600",
    },
    {
      id: "240l",
      name: "240L Heavy-Duty Wheelie Bin",
      category: "Large Family & Small Business",
      capacity: "Holds approx. 4-5 standard trash bags",
      idealFor: "Large residential households, clinics, retail shops, or boutique offices.",
      dimensions: "107cm H × 58cm W × 74cm D",
      icon: Home,
      accent: "border-nature-primary",
    },
    {
      id: "1.5m3",
      name: "1.5m³ Front-Load Commercial Dumpster",
      category: "Retail, Dining & Offices",
      capacity: "Holds approx. 12-15 standard trash bags",
      idealFor: "Restaurants, cafes, shopping centers, hotels, and corporate offices.",
      dimensions: "120cm H × 180cm W × 110cm D (Steel Lockable)",
      icon: Building2,
      accent: "border-blue-600",
    },
    {
      id: "7m3",
      name: "7m³ Roll-Off Cleanout Skip",
      category: "Home Remodeling & Yard Clearance",
      capacity: "Equivalent to approx. 4 pickup truck beds",
      idealFor: "Residential roof repairs, landscape clearing, estate decluttering, or tenant move-outs.",
      dimensions: "3.6m L × 1.8m W × 1.2m H",
      icon: Truck,
      accent: "border-amber-600",
    },
    {
      id: "15m3",
      name: "15m³ - 20m³ Heavy Construction Skip",
      category: "Industrial & Demolition Sites",
      capacity: "Equivalent to approx. 8-10 pickup truck beds",
      idealFor: "Commercial construction, demolition concrete, industrial factory scrap in Namanve.",
      dimensions: "6.0m L × 2.4m W × 1.6m H (Reinforced Steel)",
      icon: Factory,
      accent: "border-gray-900",
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 select-none">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-wider bg-[#E9F4F0] px-3 py-1 rounded border border-[#006F51]/20">
            <Box className="w-3.5 h-3.5" />
            <span>Container &amp; Dumpster Sizing Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1A1D20] tracking-tight leading-tight">
            Choose the Right Container For Your Needs
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Waste Connections and Nature Waste make finding the right container effortless. Explore our standard bins, commercial dumpsters, and heavy-duty roll-off skips below.
          </p>
        </div>

        {/* Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {containers.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedSize === idx;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedSize(idx)}
                className={`rounded p-4 sm:p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-[#006F51] bg-[#F4F9F6] shadow-xs"
                    : "border-gray-200 bg-white hover:border-gray-300 shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2 py-0.5 rounded-sm">
                      {item.category.split(" ")[0]}
                    </span>
                    <Icon className="w-4 h-4 text-gray-500" />
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-[#1A1D20] leading-snug">
                    {item.name}
                  </h3>

                  <div className="mt-2.5 text-xs text-gray-600 space-y-1">
                    <div className="font-semibold text-gray-900">{item.capacity}</div>
                    <div className="text-[11px] text-gray-500 leading-tight">{item.idealFor}</div>
                  </div>
                </div>

                <div className="mt-4 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span className={isSelected ? "text-[#006F51]" : "text-gray-400"}>
                    {isSelected ? "Selected" : "View Spec"}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                      isSelected
                        ? "bg-[#006F51] border-[#006F51] text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Container Detail Banner */}
        <div className="bg-[#1A2520] text-white rounded p-6 sm:p-8 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFCE00]">
              Recommended Spec: {containers[selectedSize].name}
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              {containers[selectedSize].idealFor}
            </h4>
            <div className="text-xs text-gray-300 flex flex-wrap gap-4 pt-1">
              <span><strong>Capacity:</strong> {containers[selectedSize].capacity}</span>
              <span>•</span>
              <span><strong>Dimensions:</strong> {containers[selectedSize].dimensions}</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-wrap items-center gap-3">
            <Link
              href="/pricing#calculator"
              className="bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] px-6 py-3 rounded font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <span>Get Instant Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="tel:+256766532915"
              className="border border-white/20 hover:border-white text-white px-5 py-3 rounded font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Call: +256 766 532915
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
