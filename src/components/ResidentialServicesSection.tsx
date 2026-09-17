"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Home, Trash2, RefreshCw, Box, CheckCircle2 } from "lucide-react";

export default function ResidentialServicesSection() {
  const cards = [
    {
      title: "Residential trash pickup",
      desc: "Depend on Nature Waste for prompt and efficient trash services right at your home gate. We prioritize odor-free convenience and eco-friendly solutions in every neighborhood we serve.",
      linkText: "Go to Garbage Pickup Service",
      href: "/pricing",
      icon: Trash2,
    },
    {
      title: "Residential recycling",
      desc: "Nature Waste champions a greener Uganda. Partner with us for dedicated residential recycling with color-coded sacks, turning your household disposables into circular value.",
      linkText: "Go to Residential Recycling",
      href: "/#recycling-guide",
      icon: RefreshCw,
    },
    {
      title: "Residential dumpster rental",
      desc: "From home cleanouts to estate renovations, Nature Waste offers adaptable roll-off skips (7m³), making bulk disposal effortless for every household project.",
      linkText: "Go to Dumpster Rental",
      href: "/pricing#calculator",
      icon: Box,
    },
  ];

  return (
    <section className="w-full bg-white py-16 sm:py-20 select-none border-b border-[#E5E7EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#006F51]">
            Nature Waste Residential
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1D20] tracking-tight">
            Our Residential Services
          </h2>
          <p className="text-[#555C66] text-sm sm:text-base leading-relaxed">
            Nature Waste ensures timely trash pickup, with weekly or bi-weekly collection options available. Residential recycling service is also included in all areas we serve across Kampala, Entebbe Road, and Wakiso. Contact us today and ask how we can help you manage your household waste.
          </p>
        </div>

        {/* 2-Columns Grid: Left Image, Right Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Residential Customer Image */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="rounded overflow-hidden shadow-xs border border-[#E5E7EB] bg-white">
              <img
                src="https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=1000&q=80"
                alt="Nature Waste residential waste collection containers and color-coded recycling bins"
                className="w-full h-[380px] sm:h-[420px] object-cover"
              />
              
              <div className="p-4 bg-white border-t border-[#E5E7EB] space-y-1">
                <div className="flex items-center gap-2 text-[#006F51] font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Free Recycling Sacks Included</span>
                </div>
                <p className="text-xs text-gray-600">
                  Subscribed households receive color-coded sacks for plastics, metals, and clean paper, collected on your scheduled pickup day.
                </p>
              </div>
            </div>
          </div>

          {/* Right: 3 Residential Cards */}
          <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Link
                  key={idx}
                  href={card.href}
                  className="block p-5 sm:p-6 rounded bg-[#F8F9FA] border border-[#E5E7EB] hover:border-[#006F51] hover:bg-white hover:shadow-xs transition-all duration-200 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-white border border-[#E5E7EB] text-[#006F51] flex items-center justify-center shrink-0 group-hover:bg-[#006F51] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-[#1A1D20] group-hover:text-[#006F51] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-[#555C66] text-xs sm:text-sm leading-relaxed">
                        {card.desc}
                      </p>
                      <div className="pt-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#006F51] group-hover:underline">
                        <span>{card.linkText}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            <div className="pt-2">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center bg-[#006F51] hover:bg-[#004D38] text-white px-7 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>All Residential Services</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
