import React from "react";
import Link from "next/link";
import { ArrowRight, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { industriesData } from "@/data/industries";

export default function IndustriesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Top Banner */}
      {/* Top Banner */}
      <section className="border-b border-[#E5E7EB] bg-[#F8F9FA] px-6 sm:px-12 lg:px-16 py-16 lg:py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-wider bg-[#E9F4F0] px-3 py-1 rounded-sm border border-[#006F51]/20">
            Specialized Waste Management Solutions
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black leading-[1.12] text-[#1A1D20] tracking-tight">
            Tailored Environmental Infrastructure for Every Sector
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#555C66] leading-relaxed">
            From high-density shopping malls and infectious clinical waste to municipal smart bin networks and factory zero-landfill mandates.
          </p>
        </div>
      </section>

      {/* Industries List */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16 py-16 space-y-20">
        {industriesData.map((ind, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <section
              key={ind.id}
              id={ind.id}
              className="scroll-mt-24 border-b border-[#E5E7EB] pb-16 last:border-b-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Visual Column */}
                <div
                  className={`lg:col-span-5 relative ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="w-full border border-[#E5E7EB] rounded overflow-hidden shadow-xs bg-white">
                    <div className="w-full h-[260px] sm:h-[300px] overflow-hidden relative">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${ind.image}')` }}
                      />
                    </div>

                    {/* Impact Metric Docked Strip */}
                    <div className="bg-[#1A1D20] p-4 border-t-2 border-[#FFCE00] text-white flex items-center justify-between">
                      <div>
                        <div className="text-[11px] text-gray-400 uppercase font-bold tracking-wider">
                          {ind.stats.label}
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-[#FFCE00]">
                          {ind.stats.value}
                        </div>
                      </div>
                      <TrendingUp className="w-7 h-7 text-[#FFCE00]" />
                    </div>
                  </div>
                </div>

                {/* Narrative & Problem-Solution Column */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isReversed ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#006F51]">
                      Sector Focus
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#1A1D20] leading-tight mt-1">
                      {ind.name}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-[#555C66] mt-1">
                      {ind.subtitle}
                    </p>
                    <p className="text-[#555C66] text-xs sm:text-sm leading-relaxed mt-3">
                      {ind.description}
                    </p>
                  </div>

                  {/* Problem vs Solution Comparison Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Common Challenges */}
                    <div className="bg-red-50/50 border border-red-200 rounded-sm p-5 space-y-3">
                      <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-wider">
                        <AlertCircle className="w-4 h-4" />
                        <span>Common Bottlenecks</span>
                      </div>
                      <ul className="space-y-2 text-xs text-gray-700">
                        {ind.keyProblems.map((prob, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-red-500 font-black">•</span>
                            <span>{prob}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Nature Waste Solution */}
                    <div className="bg-[#E9F4F0]/60 border border-[#006F51]/20 rounded-sm p-5 space-y-3">
                      <div className="flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Engineered Solution</span>
                      </div>
                      <ul className="space-y-2 text-xs text-gray-700">
                        {ind.ourSolution.map((sol, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="text-[#006F51] font-black">✓</span>
                            <span>{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/book-demo?industry=${ind.id}`}
                      className="inline-flex items-center gap-2 bg-[#006F51] hover:bg-[#005a42] text-white font-bold px-7 py-3.5 text-xs uppercase tracking-wider rounded-sm shadow-xs transition-colors group"
                    >
                      <span>Request Sector Consultation</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
