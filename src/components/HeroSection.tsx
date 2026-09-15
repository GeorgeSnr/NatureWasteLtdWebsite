"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Trash2,
  Phone,
  Clock,
  Sparkles,
  Building2,
  Home as HomeIcon,
  Box,
  CreditCard,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { ugandaCoverageAreas } from "@/data/ugandaCoverage";

export default function HeroSection() {
  const [selectedAreaId, setSelectedAreaId] = useState<string>("kitende");
  const [showResult, setShowResult] = useState<boolean>(false);

  const selectedArea = ugandaCoverageAreas.find((a) => a.id === selectedAreaId) || ugandaCoverageAreas[0];

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <section className="relative w-full bg-[#F8F9FA] text-[#212529] overflow-hidden select-none border-b border-[#E5E7EB]">
      {/* Background Soft Mint & Ambient Daylight Wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF] via-[#F8F9FA] to-[#E9F4F0]/40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#006F51]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFCE00]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Authoritative Clean Copy & Waste Connections Buttons */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Regulatory Caption / Waste Connections Brand Tag */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-3 py-1 rounded-full border border-[#006F51]/20">
                Nature Waste Uganda
              </span>
              <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                NEMA Licensed Waste Handler
              </span>
            </div>

            {/* Main Headline matching Waste Connections typography */}
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-[#1A1D20] leading-[1.15] tracking-tight">
              Reliable Garbage Pickup &amp; Waste Solutions
            </h1>

            {/* Subheading with authentic Uganda context */}
            <p className="text-[#555C66] text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Home and business waste management services, scheduled curbside pickup, and roll-off dumpster rentals across Greater Kampala, Entebbe Road, and Wakiso.
            </p>

            {/* Primary Waste Connections Action Button Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Yellow Primary Button */}
              <a
                href="#schedule-finder"
                className="inline-flex items-center justify-center bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] px-7 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 group"
              >
                <span>Start Service</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Green Secondary Button */}
              <a
                href="#schedule-finder"
                className="inline-flex items-center justify-center bg-[#006F51] hover:bg-[#004D38] text-white px-7 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-200 shadow-sm active:scale-95"
              >
                <span>Get Prices</span>
              </a>

              {/* Phone Direct Link */}
              <a
                href="tel:+256700890123"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#006F51] hover:text-[#004D38] px-3 py-2 rounded-lg hover:bg-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#E9F4F0] flex items-center justify-center text-[#006F51]">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+256 700 890 123</span>
              </a>
            </div>

            {/* Live Agent / Customer Care Banner */}
            <div className="p-3.5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-between gap-4 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse shrink-0" />
                <div className="text-xs sm:text-sm text-[#363636]">
                  <strong className="text-[#1A1D20]">Need Help?</strong> Talk to our Kampala Dispatch Team!
                </div>
              </div>
              <a
                href="tel:+256700890123"
                className="text-xs font-bold text-[#006F51] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Call Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Signature Waste Connections 4 Self-Service Box Buttons */}
            <div className="pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
                
                {/* 1. Customer Service */}
                <a
                  href="#contact"
                  className="flex flex-col items-center text-center p-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#006F51] hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#E9F4F0] text-[#006F51] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#212529] group-hover:text-[#006F51]">
                    Customer Service
                  </span>
                </a>

                {/* 2. Pickup Schedule */}
                <a
                  href="#schedule-finder"
                  className="flex flex-col items-center text-center p-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#006F51] hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#E9F4F0] text-[#006F51] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#212529] group-hover:text-[#006F51]">
                    Pickup Schedule
                  </span>
                </a>

                {/* 3. Holiday Calendar */}
                <a
                  href="#schedule-finder"
                  className="flex flex-col items-center text-center p-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#006F51] hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#E9F4F0] text-[#006F51] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#212529] group-hover:text-[#006F51]">
                    Holiday Calendar
                  </span>
                </a>

                {/* 4. Pay My Bill */}
                <Link
                  href="/portal"
                  className="flex flex-col items-center text-center p-3.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[#006F51] hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#E9F4F0] text-[#006F51] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-[#212529] group-hover:text-[#006F51]">
                    Pay My Bill
                  </span>
                </Link>

              </div>
            </div>

          </div>

          {/* Right Column: High-Res Real Imagery & Waste Connections Floating Feature Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Photography Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white">
              <div className="aspect-[4/3] sm:aspect-[1/1] relative w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80"
                  alt="Nature Waste reliable curbside collection and recycling truck"
                  className="w-full h-full object-cover"
                />
                {/* Subtle soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Floating Bottom Card over Image */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 border border-white/40 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#006F51]" />
                      <span className="text-xs font-bold text-[#1A1D20]">Kitende HQ Dispatch</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#006F51] bg-[#E9F4F0] px-2 py-0.5 rounded-full">
                      On Route Today
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Serving Entebbe Road corridor, Lubowa, Kololo, Naguru, Munyonyo &amp; Greater Kampala with clean, scheduled trucks.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Quick Badges */}
            <div className="absolute -top-4 -right-4 bg-white border border-[#E5E7EB] rounded-xl shadow-lg p-3 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E9F4F0] text-[#006F51] flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#212529]">Roll-Off Skips</div>
                <div className="text-[11px] text-gray-500">7m³ to 20m³ Delivery</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white border border-[#E5E7EB] rounded-xl shadow-lg p-3 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFCE00]/20 text-[#1A1D20] flex items-center justify-center font-black text-sm">
                99%
              </div>
              <div>
                <div className="text-xs font-bold text-[#212529]">On-Time Pickups</div>
                <div className="text-[11px] text-gray-500">Scheduled Weekly Routes</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
