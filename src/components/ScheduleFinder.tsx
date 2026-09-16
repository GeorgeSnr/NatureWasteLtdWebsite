"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  Truck,
  Phone,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { ugandaCoverageAreas } from "@/data/ugandaCoverage";

export default function ScheduleFinder() {
  const [selectedId, setSelectedId] = useState<string>("kitende");
  const [query, setQuery] = useState<string>("");

  const filteredAreas = ugandaCoverageAreas.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      a.division.toLowerCase().includes(query.toLowerCase())
  );

  const currentArea =
    ugandaCoverageAreas.find((a) => a.id === selectedId) || ugandaCoverageAreas[0];

  return (
    <section id="schedule-finder" className="w-full bg-white py-16 sm:py-20 select-none border-b border-[#E5E7EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-wider bg-[#E9F4F0] px-3 py-1 rounded border border-[#006F51]/20">
            <Calendar className="w-3.5 h-3.5" />
            <span>Interactive Pickup Schedule Finder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1D20] tracking-tight">
            Find Your Neighborhood Collection Days &amp; Rates
          </h2>
          <p className="text-[#555C66] text-sm sm:text-base leading-relaxed">
            Select your suburb across Greater Kampala, Entebbe Road, or Wakiso to view your dedicated collection days, truck route, and transparent monthly rates.
          </p>
        </div>

        {/* Schedule Finder Card */}
        <div className="max-w-4xl mx-auto bg-[#F8F9FA] rounded border border-[#E5E7EB] p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Search / Selection Bar */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Select or Search Your Suburb:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Type suburb name (e.g. Lubowa, Kololo, Munyonyo)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="px-4 py-2.5 bg-white border border-gray-300 rounded text-xs font-semibold text-[#1A1D20] focus:outline-none focus:border-[#006F51]"
              >
                {ugandaCoverageAreas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name} ({area.division})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Card for Selected Area */}
          <div className="bg-white rounded border border-[#E5E7EB] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-[#1A1D20]">
                    {currentArea.name}
                  </h3>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2.5 py-0.5 rounded-sm">
                    {currentArea.division}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Entebbe Road &amp; Greater Kampala Metropolitan Route
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-500">Monthly Household Plan</div>
                <div className="text-2xl font-black text-[#006F51]">
                  From UGX 35,000/mo
                </div>
                <div className="text-[10px] text-gray-400">Includes free recycling sacks</div>
              </div>
            </div>

            {/* Schedule Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded bg-[#F8F9FA] border border-gray-200 space-y-1">
                <div className="flex items-center gap-1.5 text-[#006F51] font-bold">
                  <Calendar className="w-4 h-4" />
                  <span>Scheduled Pickup Days</span>
                </div>
                <div className="font-bold text-sm text-[#1A1D20] pt-1">
                  {currentArea.pickupDays}
                </div>
                <div className="text-gray-500 text-[11px]">Recycling: {currentArea.recyclingDay}</div>
              </div>

              <div className="p-4 rounded bg-[#F8F9FA] border border-gray-200 space-y-1">
                <div className="flex items-center gap-1.5 text-[#006F51] font-bold">
                  <Truck className="w-4 h-4" />
                  <span>Available Services</span>
                </div>
                <div className="font-bold text-sm text-[#1A1D20] pt-1">
                  {currentArea.servicesAvailable?.[0] || "Residential Curbside"}
                </div>
                <div className="text-gray-500 text-[11px]">{currentArea.servicesAvailable?.slice(1).join(", ")}</div>
              </div>

              <div className="p-4 rounded bg-[#F8F9FA] border border-gray-200 space-y-1">
                <div className="flex items-center gap-1.5 text-[#006F51] font-bold">
                  <Phone className="w-4 h-4" />
                  <span>Route Dispatch Direct</span>
                </div>
                <div className="font-bold text-sm text-[#1A1D20] pt-1">
                  {currentArea.hotline}
                </div>
                <div className="text-gray-500 text-[11px]">{currentArea.contactPerson}</div>
              </div>
            </div>

            {/* Service Guarantee Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#555C66] pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#006F51]" />
                <span>On-time morning collection right at your gate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#006F51]" />
                <span>Free color-coded sacks for plastics and clean paper</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#006F51]" />
                <span>SMS collection reminder sent the previous evening</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#006F51]" />
                <span>Pay conveniently via MTN / Airtel Mobile Money</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-gray-100">
              <Link
                href="/pricing"
                className="bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                Sign Up for {currentArea.name} Route
              </Link>
              <a
                href={`tel:${(currentArea.hotline || "+256766532915").replace(/\s+/g, "")}`}
                className="bg-[#F8F9FA] hover:bg-gray-200 text-[#1A1D20] px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors border border-gray-200"
              >
                Call Route Supervisor ({(currentArea.hotline || "+256 766 532915")})
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
