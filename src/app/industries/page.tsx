import React from "react";
import Link from "next/link";
import { ArrowRight, AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { industriesData } from "@/data/industries";

export default function IndustriesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Top Banner */}
      <section className="border-b border-[#c5c6cd] bg-[#f8fafc] px-6 sm:px-12 lg:px-16 py-16 lg:py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-nature-primary">
            Specialized Waste Management Solutions
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-black leading-[1.12] text-[#091426] tracking-tight">
            Tailored Environmental Infrastructure for Every Sector
          </h1>
          <p className="max-w-2xl mx-auto text-base text-gray-600 leading-relaxed">
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
              className="scroll-mt-24 border-b border-gray-200 pb-16 last:border-b-0"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                {/* Visual Column */}
                <div
                  className={`lg:col-span-5 relative ${
                    isReversed ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="w-full h-[320px] sm:h-[400px] overflow-hidden shadow-xl chamfer-card relative">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                      style={{ backgroundImage: `url('${ind.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Impact Metric Floating Badge */}
                    <div className="absolute bottom-5 left-5 right-5 bg-black/80 backdrop-blur-xs p-4 border-l-4 border-nature-secondary text-white flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-300 uppercase font-semibold">
                          {ind.stats.label}
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-nature-secondary">
                          {ind.stats.value}
                        </div>
                      </div>
                      <TrendingUp className="w-8 h-8 text-nature-secondary" />
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
                    <span className="text-xs font-bold uppercase tracking-widest text-nature-primary">
                      Sector Focus
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-black text-[#141517] leading-tight mt-1">
                      {ind.name}
                    </h2>
                    <p className="text-sm font-semibold text-gray-500 mt-1">
                      {ind.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
                      {ind.description}
                    </p>
                  </div>

                  {/* Problem vs Solution Comparison Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Common Challenges */}
                    <div className="bg-red-50/60 border border-red-200/80 p-5 rounded-none space-y-3">
                      <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase tracking-wider">
                        <AlertCircle className="w-4 h-4" />
                        <span>Common Bottlenecks</span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                        {ind.keyProblems.map((prob, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-red-500 font-black">•</span>
                            <span>{prob}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Nature Waste Solution */}
                    <div className="bg-emerald-50/60 border border-emerald-200/80 p-5 rounded-none space-y-3">
                      <div className="flex items-center gap-2 text-nature-primary font-bold text-xs uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Engineered Solution</span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                        {ind.ourSolution.map((sol, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="text-nature-primary font-black">✓</span>
                            <span>{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/book-demo?industry=${ind.id}`}
                      className="inline-flex items-center gap-3 bg-nature-primary hover:bg-nature-primary-dark text-white font-bold px-7 py-3.5 text-sm shadow-md transition-all group"
                    >
                      <span>Request Sector Consultation</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
