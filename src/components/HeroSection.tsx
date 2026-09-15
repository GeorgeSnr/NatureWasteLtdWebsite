"use client";

import React, { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { ugandaCoverageAreas } from "@/data/ugandaCoverage";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial" | "dumpster">("residential");
  const [selectedAreaId, setSelectedAreaId] = useState<string>("kitende");
  const [showResult, setShowResult] = useState<boolean>(false);

  const selectedArea = ugandaCoverageAreas.find((a) => a.id === selectedAreaId) || ugandaCoverageAreas[0];

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <section className="relative w-full bg-[#0A1810] text-white overflow-hidden select-none">
      {/* Background Image with Crisp Deep Forest Gradient Overlay */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30 mix-blend-luminosity scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=2000&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071F11]/95 via-[#0B2C1A]/90 to-[#0A1C12]/85" />
      <div className="absolute inset-0 bg-[radial-gradient(#9AD44D_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Authoritative Clean Headline & Value Pillars */}
          <div className="lg:col-span-7 space-y-6">
            {/* Regulatory Badge */}
            <div className="inline-flex items-center gap-2 bg-[#123E23] border border-nature-secondary/40 text-nature-secondary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
              <ShieldCheck className="w-4 h-4 text-nature-secondary" />
              <span>NEMA Licensed &amp; Registered Waste Handler Uganda</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-white leading-[1.12] tracking-tight">
              Reliable Waste &amp; Recycling Services For Your Home, Business &amp; Community
            </h1>

            {/* Subheading with Authentic Ugandan Context */}
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Nature Waste Management Limited provides prompt, dependable curbside garbage pickup, roll-off skip rentals, and circular plastic recovery across Kampala, the Entebbe corridor, and surrounding areas.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-sm text-gray-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-nature-secondary shrink-0" />
                <span>On-time, odor-free scheduled collections</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-nature-secondary shrink-0" />
                <span>NEMA-compliant chain-of-custody tracking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-nature-secondary shrink-0" />
                <span>120L &amp; 240L wheelie bins &amp; color-coded sacks</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-nature-secondary shrink-0" />
                <span>GoGreenug circular plastic recycling</span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#schedule-finder"
                className="inline-flex items-center gap-2.5 bg-nature-secondary hover:bg-nature-secondary-dark text-[#0B2C1A] px-7 py-3.5 rounded-md font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-nature-secondary/20 active:scale-95 group"
              >
                <span>Check My Schedule</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="tel:+256700890123"
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-6 py-3.5 rounded-md font-bold text-sm transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-nature-secondary" />
                <span>Dispatch: +256 700 890 123</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Waste Connections Service & Schedule Lookup Widget */}
          <div id="schedule-finder" className="lg:col-span-5">
            <div className="bg-white text-[#141517] rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8 relative overflow-hidden">
              <div className="text-xs uppercase font-extrabold tracking-widest text-nature-primary mb-1">
                Uganda Service &amp; Pickup Finder
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#141517] tracking-tight">
                Find Services In Your Neighborhood
              </h2>
              <p className="text-xs text-gray-500 mt-1 mb-5">
                Select your area to instantly view pickup days, available bins, and direct quotes.
              </p>

              {/* Service Tab Switcher (Waste Connections Pattern) */}
              <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-lg mb-5 text-xs font-bold">
                <button
                  onClick={() => {
                    setActiveTab("residential");
                    setShowResult(true);
                  }}
                  className={`py-2 px-1 rounded-md transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    activeTab === "residential"
                      ? "bg-white text-nature-primary shadow-xs"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  <HomeIcon className="w-3.5 h-3.5" />
                  <span>Residential</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("commercial");
                    setShowResult(true);
                  }}
                  className={`py-2 px-1 rounded-md transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    activeTab === "commercial"
                      ? "bg-white text-nature-primary shadow-xs"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Commercial</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("dumpster");
                    setShowResult(true);
                  }}
                  className={`py-2 px-1 rounded-md transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    activeTab === "dumpster"
                      ? "bg-white text-nature-primary shadow-xs"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>Dumpster / Skip</span>
                </button>
              </div>

              {/* Suburb Selection Form */}
              <form onSubmit={handleLookup} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Select Your Suburb or Area
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-nature-primary absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={selectedAreaId}
                      onChange={(e) => {
                        setSelectedAreaId(e.target.value);
                        setShowResult(true);
                      }}
                      className="w-full pl-9 pr-8 py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm font-semibold text-gray-800 focus:outline-none focus:border-nature-primary focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      {ugandaCoverageAreas.map((area) => (
                        <option key={area.id} value={area.id}>
                          {area.name} ({area.division})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Instant Local Route Schedule Card */}
                {showResult && selectedArea && (
                  <div className="bg-[#F3F8F5] border border-nature-secondary/50 rounded-xl p-4 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-nature-secondary/30 pb-2">
                      <div className="font-black text-sm text-[#0B2C1A] flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-nature-primary" />
                        <span>{selectedArea.name}</span>
                      </div>
                      <span className="text-[11px] font-bold bg-nature-primary text-white px-2 py-0.5 rounded-full">
                        Route Active
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-gray-500 block font-medium">Curbside Pickup:</span>
                        <strong className="text-gray-900 font-bold flex items-center gap-1 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-nature-primary" />
                          <span>{selectedArea.pickupDays}</span>
                        </strong>
                      </div>

                      <div>
                        <span className="text-gray-500 block font-medium">Recycling Day:</span>
                        <strong className="text-gray-900 font-bold flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-nature-primary" />
                          <span>{selectedArea.recyclingDay}</span>
                        </strong>
                      </div>
                    </div>

                    <div className="pt-1 text-[11px] text-gray-600">
                      <strong>Services in this zone:</strong> {selectedArea.servicesAvailable.join(" • ")}
                    </div>
                  </div>
                )}

                {/* Submit & Quote Trigger */}
                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    href={
                      activeTab === "dumpster"
                        ? "/pricing#calculator"
                        : activeTab === "commercial"
                        ? "/book-demo"
                        : "/pricing"
                    }
                    className="w-full bg-nature-primary hover:bg-nature-primary-dark text-white py-3.5 rounded-lg text-center font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 group"
                  >
                    <span>View Rates for {selectedArea.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="text-center text-[11px] text-gray-500 flex items-center justify-center gap-1">
                    <span>Questions? Call Kampala dispatch:</span>
                    <a href="tel:+256700890123" className="font-bold text-nature-primary hover:underline">
                      +256 700 890 123
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
