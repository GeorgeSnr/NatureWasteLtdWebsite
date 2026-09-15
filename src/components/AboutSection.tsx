import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Award, Users, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  const stats = [
    { value: "120k+", label: "Metric Tons Diverted from Landfills" },
    { value: "99.4%", label: "Collection Reliability SLA" },
    { value: "45k+", label: "Bins & Households Covered" },
    { value: "100%", label: "NEMA Regulatory Compliance" },
  ];

  return (
    <section className="w-full bg-white py-16 lg:py-24 px-6 sm:px-12 lg:px-16 select-none relative z-10">
      <div className="max-w-[1320px] mx-auto">
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-nature-primary font-extrabold text-xs sm:text-sm uppercase tracking-widest">
              <span className="text-base sm:text-lg font-black tracking-tight leading-none text-nature-secondary">
                »»
              </span>
              <span>ABOUT NATURE WASTE MANAGEMENT LIMITED</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#141517] leading-[1.15] tracking-tight">
              Pioneering youth-led sustainable waste solutions across <span className="text-nature-primary">Uganda &amp; East Africa.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-4 pt-1 mb-6 lg:mb-0">
            <h3 className="text-base sm:text-[18px] font-bold text-[#141517] leading-snug">
              Registered and licensed under NEMA Uganda, Nature Waste Management Limited was founded by passionate youth environmentalists to eradicate uncollected refuse in Kampala&apos;s suburbs.
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Headquartered at Kitende, Karl House on Entebbe Road, we deploy selective collection mechanisms for plastics, scrap metals, paper, and biodegradable plant/animal waste. Through our <strong>GoGreenug</strong> initiative, we actively advance Uganda&apos;s Vision 2040 for clean, disease-free, and economically vibrant cities.
            </p>
          </div>
        </div>

        {/* Floating CTA over Chamfered Image */}
        <div className="relative w-full mt-6 mb-16 lg:mb-20">
          <div className="absolute -top-6 lg:-top-7 left-0 lg:left-[calc(58.333%+1rem)] z-20">
            <Link
              href="/features"
              className="inline-flex items-center gap-3 bg-nature-primary hover:bg-nature-primary-dark text-white font-bold px-7 py-3.5 sm:py-4 text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-md group"
            >
              <span>Discover Our Operations</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative w-full overflow-hidden shadow-xl z-10 chamfer-card-lg">
            <div
              className="w-full h-[280px] sm:h-[360px] lg:h-[400px] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1600&q=80')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Overlay pill credentials */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3 text-xs text-white">
                <div className="bg-black/60 backdrop-blur-xs px-3.5 py-1.5 border border-white/20 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-nature-secondary" />
                  <span>Licensed NEMA Waste Handler</span>
                </div>
                <div className="bg-black/60 backdrop-blur-xs px-3.5 py-1.5 border border-white/20 flex items-center gap-2">
                  <Award className="w-4 h-4 text-nature-accent" />
                  <span>GoGreenug Youth Initiative</span>
                </div>
                <div className="bg-black/60 backdrop-blur-xs px-3.5 py-1.5 border border-white/20 flex items-center gap-2">
                  <Users className="w-4 h-4 text-nature-secondary" />
                  <span>Suburban &amp; Industrial Reach</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Large Outlined Stat Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-end pt-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col relative group">
              <div className="relative inline-block mb-2">
                <span className="text-5xl sm:text-6xl lg:text-[76px] font-extrabold leading-none tracking-tight block text-outline-gray group-hover:text-nature-primary transition-colors duration-300">
                  {stat.value}
                </span>
              </div>
              <div className="w-full border-t border-gray-200 my-3" />
              <span className="text-gray-700 text-sm sm:text-base font-semibold leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
