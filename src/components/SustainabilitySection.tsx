"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Globe, Shield, Users } from "lucide-react";

export default function SustainabilitySection() {
  const cards = [
    {
      title: "Better Planet",
      tag: "Recycling & Circularity",
      desc: "Nature Waste is proud to serve Kampala residents and business owners as your dedicated recycling partner, recovering recyclable plastics, baling cardboard, and keeping waste out of Lake Victoria.",
      linkText: "Recycle Guide",
      href: "/#recycling-guide",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
      icon: Globe,
    },
    {
      title: "Safety Above All",
      tag: "Our #1 Value",
      desc: "Prioritizing safety and regulatory compliance in everything we do is our top value. We are fully licensed under NEMA guidelines with certified chain-of-custody tracking for all collected waste.",
      linkText: "Safety Standards",
      href: "/#about-nema",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      icon: Shield,
    },
    {
      title: "Job Creation",
      tag: "Ugandan Youth Careers",
      desc: "Founded by passionate Ugandan youth environmentalists, we create dignified local employment for drivers, mechanics, dispatch controllers, and materials recovery specialists.",
      linkText: "Search Job Openings",
      href: "/#careers",
      image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80",
      icon: Users,
    },
  ];

  return (
    <section className="w-full bg-[#F8F9FA] py-16 sm:py-20 select-none border-b border-[#E5E7EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#006F51]">
            Focus On Sustainability
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1D20] tracking-tight">
            Committed to a Cleaner Uganda for Generations
          </h2>
          <p className="text-[#555C66] text-sm sm:text-base leading-relaxed">
            Nature Waste strives for a greener and cleaner tomorrow across Greater Kampala, the Entebbe corridor, and Wakiso. We demonstrate this daily through our circular recovery solutions, youth environmental partnerships, and strict NEMA environmental standards.
          </p>
        </div>

        {/* 3 Pillar Cards (Exact Waste Connections sec_hcenter-3cards layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded border border-[#E5E7EB] overflow-hidden shadow-xs hover:border-[#006F51] hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${card.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-[#1A1D20]">
                        {card.title}
                      </h3>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2.5 py-0.5 rounded-sm">
                        {card.tag}
                      </span>
                    </div>

                    <p className="text-[#555C66] text-xs sm:text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="p-6 sm:p-7 pt-0">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#006F51] group-hover:underline"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
