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
    <section className="relative w-full bg-[#F8F9FA] text-[#212529] select-none border-b border-[#E5E7EB]">
      {/* Main Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Authoritative Clean Copy & Waste Connections Buttons */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Regulatory Caption / Waste Connections Brand Tag */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-3 py-1 rounded border border-[#006F51]/20">
                Nature Waste Uganda
              </span>
              <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                NEMA Licensed Waste Handler
              </span>
            </div>

            {/* Main Headline matching Waste Connections typography */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#1A1D20] leading-[1.18] tracking-tight">
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
                className="inline-flex items-center justify-center bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] px-7 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-xs group"
              >
                <span>Start Service</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Green Secondary Button */}
              <a
                href="#schedule-finder"
                className="inline-flex items-center justify-center bg-[#006F51] hover:bg-[#004D38] text-white px-7 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Get Prices</span>
              </a>

              {/* Phone Direct Link */}
              <a
                href="tel:+256700890123"
                className="inline-flex items-center gap-2.5 text-xs font-bold text-[#006F51] hover:text-[#004D38] px-3.5 py-2.5 rounded border border-[#006F51]/20 bg-white hover:bg-[#F4F9F6] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#006F51]" />
                <span>+256 700 890 123</span>
              </a>
            </div>

            {/* Live Agent / Customer Care Banner */}
            <div className="p-3.5 rounded bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-between gap-4 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
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
                  className="flex flex-col items-center text-center p-3.5 rounded bg-white border border-[#E5E7EB] hover:border-[#006F51] hover:bg-[#F4F9F6] shadow-xs transition-colors group"
                >
                  <div className="w-9 h-9 rounded bg-[#E9F4F0] text-[#006F51] flex items-center justify-center mb-2">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#212529] group-hover:text-[#006F51]">
                    Customer Service
                  </span>
                </a>

                {/* 2. Pickup Schedule */}
                <a
                  href="#schedule-finder"
                  className="flex flex-col items-center text-center p-3.5 rounded bg-white border border-[#E5E7EB] hover:border-[#006F51] hover:bg-[#F4F9F6] shadow-xs transition-colors group"
                >
                  <div className="w-9 h-9 rounded bg-[#E9F4F0] text-[#006F51] flex items-center justify-center mb-2">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#212529] group-hover:text-[#006F51]">
                    Pickup Schedule
                  </span>
                </a>

                {/* 3. Holiday Calendar */}
                <a
                  href="#schedule-finder"
                  className="flex flex-col items-center text-center p-3.5 rounded bg-white border border-[#E5E7EB] hover:border-[#006F51] hover:bg-[#F4F9F6] shadow-xs transition-colors group"
                >
                  <div className="w-9 h-9 rounded bg-[#E9F4F0] text-[#006F51] flex items-center justify-center mb-2">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#212529] group-hover:text-[#006F51]">
                    Holiday Calendar
                  </span>
                </a>

                {/* 4. Pay My Bill */}
                <Link
                  href="/portal"
                  className="flex flex-col items-center text-center p-3.5 rounded bg-white border border-[#E5E7EB] hover:border-[#006F51] hover:bg-[#F4F9F6] shadow-xs transition-colors group"
                >
                  <div className="w-9 h-9 rounded bg-[#E9F4F0] text-[#006F51] flex items-center justify-center mb-2">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-[#212529] group-hover:text-[#006F51]">
                    Pay My Bill
                  </span>
                </Link>

              </div>
            </div>

          </div>

          {/* Right Column: High-Res Real Imagery & Enterprise Information Panel */}
          <div className="lg:col-span-5">
            
            {/* Main Photography Frame */}
            <div className="relative rounded overflow-hidden shadow-sm border border-[#E5E7EB] bg-white">
              <div className="aspect-[4/3] sm:aspect-[1/1] relative w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80"
                  alt="Nature Waste reliable curbside collection and recycling truck"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Solid Grounded Dispatch Panel Below Image */}
              <div className="p-4 bg-white border-t border-[#E5E7EB] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#006F51]" />
                    <span className="text-xs font-bold text-[#1A1D20]">Kitende HQ Dispatch</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#006F51] bg-[#E9F4F0] px-2 py-0.5 rounded-sm">
                    On Route Today
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Serving Entebbe Road corridor, Lubowa, Kololo, Naguru, Munyonyo &amp; Greater Kampala with clean, scheduled trucks.
                </p>
              </div>
            </div>

            {/* Authoritative Service Metrics Grid Below Image */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-white border border-[#E5E7EB] rounded p-3 flex items-center gap-3 shadow-xs">
                <div className="w-9 h-9 rounded bg-[#E9F4F0] text-[#006F51] flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#212529]">Roll-Off Skips</div>
                  <div className="text-[11px] text-gray-500">7m³ to 20m³ Delivery</div>
                </div>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded p-3 flex items-center gap-3 shadow-xs">
                <div className="w-9 h-9 rounded bg-[#E9F4F0] text-[#006F51] flex items-center justify-center font-bold text-xs shrink-0">
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
      </div>
    </section>
  );
}
