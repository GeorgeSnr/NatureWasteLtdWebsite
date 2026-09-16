"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Phone,
  Calendar,
  CheckCircle,
  Truck,
  ArrowRight,
  Search,
} from "lucide-react";
import { ugandaCoverageAreas } from "@/data/ugandaCoverage";

export default function CoverageAreas() {
  const [filter, setFilter] = useState("");

  const filteredAreas = ugandaCoverageAreas.filter(
    (area) =>
      area.name.toLowerCase().includes(filter.toLowerCase()) ||
      area.division.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 select-none">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-wider bg-[#E9F4F0] px-3 py-1 rounded border border-[#006F51]/20 mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Communities We Serve In Uganda</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1D20] tracking-tight">
              Locally Operated, Community Dedicated
            </h2>
            <p className="text-[#555C66] text-sm mt-1 max-w-xl">
              Our fleet operates dedicated collection corridors across the greater Kampala metropolitan area, Wakiso district, and Entebbe municipality.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search your suburb (e.g. Lubowa, Kololo)..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded text-xs font-semibold focus:outline-none focus:border-[#006F51] transition-colors"
            />
          </div>
        </div>

        {/* Coverage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAreas.map((area) => (
            <div
              key={area.id}
              className="bg-white rounded border border-[#E5E7EB] p-5 shadow-xs hover:shadow-sm hover:border-[#006F51] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="font-bold text-base text-[#1A1D20]">
                      {area.name}
                    </h3>
                    <div className="text-xs text-[#006F51] font-semibold mt-0.5">
                      {area.division}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded bg-[#E9F4F0] text-[#006F51] flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#555C66]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      Trash Days:
                    </span>
                    <strong className="text-gray-900 font-bold">{area.pickupDays}</strong>
                  </div>

                  <div className="flex items-center justify-between text-[#555C66]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      Recycling:
                    </span>
                    <strong className="text-gray-900 font-bold">{area.recyclingDay}</strong>
                  </div>

                  <div className="flex items-center justify-between text-[#555C66] pt-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      Hotline:
                    </span>
                    <a href={`tel:${area.hotline.replace(/\s+/g, '')}`} className="font-bold text-[#006F51] hover:underline">
                      {area.hotline}
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="text-[11px] text-gray-500">
                    <span className="font-semibold text-gray-700">Services: </span>
                    {area.servicesAvailable.join(", ")}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-50">
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#006F51] hover:underline group"
                >
                  <span>Start Service in {area.name.split(" ")[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
