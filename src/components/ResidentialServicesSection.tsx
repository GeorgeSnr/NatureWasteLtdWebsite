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

        {/* 2-Columns Grid: Left Image, Right Cards (Inverted from commercial section, exactly like Waste Connections) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Residential Customer Image */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E5E7EB] bg-white">
              <img
                src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=1000&q=80"
                alt="Nature Waste residential customer placing clean sorted recyclables into bin"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/40 shadow-sm">
                <div className="flex items-center gap-2 text-[#006F51] font-bold text-xs mb-1">
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
          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Link
                  key={idx}
                  href={card.href}
                  className="block p-6 sm:p-7 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] hover:border-[#006F51] hover:bg-white hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] text-[#006F51] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#E9F4F0] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-[#1A1D20] group-hover:text-[#006F51] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-[#555C66] text-xs sm:text-sm leading-relaxed">
                        {card.desc}
                      </p>
                      <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#006F51] group-hover:underline">
                        <span>{card.linkText}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            <div className="pt-2">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center bg-[#006F51] hover:bg-[#004D38] text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95"
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
