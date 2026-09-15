import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { value: "120k+", label: "Tons Diverted from Landfills" },
    { value: "99.4%", label: "On-Time Pickup SLA" },
    { value: "45k+", label: "Smart Bins & Skips Deployed" },
    { value: "18+", label: "Cities & Municipalities Active" },
  ];

  return (
    <section className="w-full bg-white py-16 lg:py-20 px-6 sm:px-12 lg:px-16 select-none relative z-10">
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-8 lg:mb-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-nature-primary font-extrabold text-sm sm:text-base uppercase tracking-widest">
              <span className="text-base sm:text-lg font-black tracking-tight leading-none text-nature-secondary">
                »»
              </span>
              <span>ABOUT NATURE WASTE MANAGEMENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-[#141517] leading-[1.15] tracking-tight">
              Purpose-built for <span className="text-nature-primary">African & Global sustainability.</span>
              <br />
              Enterprise Waste ERP since 2018
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-4 pt-1 mb-6 lg:mb-0">
            <h3 className="text-lg sm:text-[19px] font-bold text-[#141517] leading-snug">
              Nature Waste Management Ltd delivers industrial-grade waste management software and circular recovery infrastructure tailored to modern urban centers.
            </h3>
            <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed">
              From IoT-connected municipal bins and dynamic fleet dispatch to automated material recovery facilities, we equip city councils, property developers, and factories with the operational intelligence needed to achieve zero-waste at scale.
            </p>
          </div>
        </div>

        {/* Floating CTA over Chamfered Image */}
        <div className="relative w-full mt-8 lg:mt-10 mb-16 lg:mb-20">
          <div className="absolute -top-6 lg:-top-7 left-0 lg:left-[calc(58.333%+1rem)] z-20">
            <Link
              href="/features"
              className="inline-flex items-center gap-3 bg-nature-primary hover:bg-nature-primary-dark text-white font-bold px-8 py-3.5 sm:py-4 text-sm sm:text-base tracking-wide transition-all duration-200 shadow-md group"
            >
              <span>Discover More</span>
              <ArrowRight className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative w-full overflow-hidden shadow-xl z-10 chamfer-card-lg">
            <div
              className="w-full h-[280px] sm:h-[360px] lg:h-[420px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1600&q=80')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* 4 Large Outlined Stat Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-end pt-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col relative group">
              <div className="relative inline-block mb-3">
                <span className="text-6xl sm:text-7xl lg:text-[84px] font-extrabold leading-none tracking-tight block text-outline-gray group-hover:text-nature-primary transition-colors duration-300">
                  {stat.value}
                </span>
              </div>
              <div className="w-full border-t border-gray-200 my-4" />
              <span className="text-gray-600 text-base sm:text-lg font-medium leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
