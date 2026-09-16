"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function CareersBanner() {
  return (
    <section id="careers" className="w-full bg-white py-16 sm:py-20 select-none border-b border-[#E5E7EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="rounded bg-[#006F51] text-white overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFCE00]">
                Grow Your Career in Uganda
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Join Our Team
              </h2>
            </div>

            <p className="text-gray-100 text-sm sm:text-base leading-relaxed max-w-xl">
              We have current openings for <strong>Drivers</strong>, <strong>Heavy Mechanics</strong>, <strong>Customer Service Representatives</strong>, and <strong>Collection Helpers</strong>. At Nature Waste Management Ltd, we are proud to be a youth-led Ugandan company with a culture built on safety, dignity, and career advancement.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFCE00]" />
                <span>Competitive salary &amp; allowances</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFCE00]" />
                <span>Full safety gear &amp; health coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFCE00]" />
                <span>Professional driving certifications</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FFCE00]" />
                <span>Kitende &amp; Kampala depot locations</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="mailto:careers@naturewasteug.com"
                className="inline-flex items-center justify-center bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] px-8 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors group"
              >
                <span>Search Job Openings</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 h-full min-h-[340px] relative">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
              alt="Nature Waste Management Ltd Ugandan team member in safety gear"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#006F51] via-transparent to-transparent lg:hidden" />
          </div>

        </div>
      </div>
    </section>
  );
}
