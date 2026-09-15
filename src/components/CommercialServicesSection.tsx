"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Building2, Truck, RefreshCw, CheckCircle2 } from "lucide-react";

export default function CommercialServicesSection() {
  const cards = [
    {
      title: "Commercial waste collection",
      desc: "No matter your business size, we can find a commercial dumpster rental and collection schedule that is right for you.",
      linkText: "Go to Commercial Waste Collection",
      href: "/book-demo",
      icon: Building2,
    },
    {
      title: "Roll off dumpster rental",
      desc: "Our dumpster rental service offers 7m³ to 20m³ containers to accommodate any commercial or construction project. We deliver to your site and haul once finished.",
      linkText: "Go to Dumpster Rental",
      href: "/pricing#calculator",
      icon: Truck,
    },
    {
      title: "Commercial trash compactors",
      desc: "Nature Waste rents, sells, and services trash compactors. By compacting your waste, you can effectively reduce pickup frequency and significantly save on expenses.",
      linkText: "Go to Trash Compactors",
      href: "/features",
      icon: RefreshCw,
    },
  ];

  return (
    <section className="w-full bg-[#F8F9FA] py-16 sm:py-20 select-none border-b border-[#E5E7EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header (Waste Connections hcenter-wrapper pattern) */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#006F51]">
            Nature Waste Commercial
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1D20] tracking-tight">
            Our Commercial Services
          </h2>
          <p className="text-[#555C66] text-sm sm:text-base leading-relaxed">
            Nature Waste provides your business with a range of container sizes, weekly and monthly dumpster rentals, and scheduling options designed to meet your specific waste collection needs across Kampala and surrounding industrial hubs. Contact our team today and ask how we can help you effectively manage your waste.
          </p>
        </div>

        {/* 2-Columns Grid: Left Cards Slider / List, Right Large Clean Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: 3 Commercial Cards */}
          <div className="lg:col-span-7 space-y-5">
            {cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Link
                  key={idx}
                  href={card.href}
                  className="block p-6 sm:p-7 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#006F51] hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E9F4F0] text-[#006F51] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
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
                href="/book-demo"
                className="inline-flex items-center justify-center bg-[#006F51] hover:bg-[#004D38] text-white px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm active:scale-95"
              >
                <span>All Commercial Services</span>
              </Link>
            </div>
          </div>

          {/* Right: Waste Connections Commercial Customer Photography */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E5E7EB] bg-white">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80"
                alt="Nature Waste commercial waste recycling customer in Kampala"
                className="w-full h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/40 shadow-sm">
                <div className="flex items-center gap-2 text-[#006F51] font-bold text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>NEMA &amp; ESG Regulatory Compliance</span>
                </div>
                <p className="text-xs text-gray-600">
                  Detailed monthly waste audit manifests and recycling certificates for shopping malls, hospitality, and manufacturing enterprises in Uganda.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
