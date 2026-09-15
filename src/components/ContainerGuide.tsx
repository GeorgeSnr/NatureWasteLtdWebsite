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
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-nature-primary font-extrabold text-xs uppercase tracking-widest bg-nature-primary/10 px-3.5 py-1.5 rounded-full">
            <Box className="w-3.5 h-3.5" />
            <span>CONTAINER &amp; DUMPSTER SIZING GUIDE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#141517] tracking-tight leading-tight">
            Choose the Right Container For Your Needs
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Waste Connections and Nature Waste make finding the right container effortless. Explore our standard bins, commercial dumpsters, and heavy-duty roll-off skips below.
          </p>
        </div>

        {/* Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-12">
          {containers.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedSize === idx;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedSize(idx)}
                className={`rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-nature-primary bg-green-50/40 shadow-lg scale-[1.02]"
                    : "border-gray-200 bg-white hover:border-gray-300 shadow-2xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-nature-primary bg-nature-primary/10 px-2.5 py-0.5 rounded-full">
                      {item.category.split(" ")[0]}
                    </span>
                    <Icon className="w-5 h-5 text-gray-500" />
                  </div>

                  <h3 className="font-black text-base text-[#141517] leading-snug">
                    {item.name}
                  </h3>

                  <div className="mt-3 text-xs text-gray-600 space-y-1.5">
                    <div className="font-bold text-gray-900">{item.capacity}</div>
                    <div className="text-[11px] text-gray-500 leading-tight">{item.idealFor}</div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold">
                  <span className={isSelected ? "text-nature-primary" : "text-gray-400"}>
                    {isSelected ? "Selected" : "Click to view"}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? "bg-nature-primary border-nature-primary text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Container Detail Banner */}
        <div className="bg-[#121E17] text-white rounded-2xl p-6 sm:p-10 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-nature-secondary">
              Recommended Spec: {containers[selectedSize].name}
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              {containers[selectedSize].idealFor}
            </h4>
            <div className="text-xs sm:text-sm text-gray-300 flex flex-wrap gap-4 pt-1">
              <span><strong>Capacity:</strong> {containers[selectedSize].capacity}</span>
              <span>•</span>
              <span><strong>Dimensions:</strong> {containers[selectedSize].dimensions}</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-wrap items-center gap-4">
            <Link
              href="/pricing#calculator"
              className="bg-nature-secondary hover:bg-nature-secondary-dark text-[#0B2C1A] px-6 py-3.5 rounded-lg font-black text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
            >
              <span>Get Instant Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="tel:+256700890123"
              className="border border-white/20 hover:border-white text-white px-5 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Call: +256 700 890 123
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
