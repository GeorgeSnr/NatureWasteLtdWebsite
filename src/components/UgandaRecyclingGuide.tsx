"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  Leaf,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Info,
} from "lucide-react";

export default function UgandaRecyclingGuide() {
  const [activeStream, setActiveStream] = useState<"plastics" | "paper" | "organics" | "general">("plastics");

  const streams = {
    plastics: {
      title: "Plastics & Polymers (Blue Sack)",
      tagline: "High-value circular polymer recovery at Kitende Sorting Center",
      accepted: [
        "Clean PET drinking water & soda bottles",
        "HDPE cooking oil containers & yellow jerrycans",
        "Rigid plastic buckets, basins & crates",
        "Clean stretch wrap & LDPE polythene packaging",
      ],
      notAccepted: [
        "Single-use thin polythene 'kaveera' bags",
        "Motor oil containers with chemical residues",
        "Heavily soiled or mud-caked plastic items",
        "Styrofoam takeout containers",
      ],
      destination: "Baled and optical-sorted at our Kitende facility, then pelletized into industrial grade resin for local packaging manufacturers.",
    },
    paper: {
      title: "Paper & Cardboard (Yellow Sack)",
      tagline: "Preventing paper pollution & deforestation across Uganda",
      accepted: [
        "Flattened corrugated shipping cartons & boxes",
        "White office documents, invoices & scrap paper",
        "Newspapers, magazines & school notebooks",
        "Clean egg trays & cardboard packaging inserts",
      ],
      notAccepted: [
        "Wax-coated food boxes (e.g. frozen food packaging)",
        "Tissue paper, napkins & contaminated paper towels",
        "Carbon duplicate paper",
        "Wet or grease-soaked pizza boxes",
      ],
      destination: "Hydraulically compressed into 400kg dense bales and supplied to regional paper mills for recycled brown paper cartons.",
    },
    organics: {
      title: "Organic & Kitchen Waste (Green Sack)",
      tagline: "Transforming domestic food scraps into organic bio-fertilizer",
      accepted: [
        "Fruit and vegetable trimmings (matooke, cassava peels, etc.)",
        "Leftover cooked food & coffee grounds",
        "Garden grass clippings, hedge cuttings & leaves",
        "Raw agricultural and market produce rejects",
      ],
      notAccepted: [
        "Plastic bags or packaging mixed with food",
        "Pet waste or hazardous animal carcasses",
        "Large tree stumps or construction lumber",
        "Synthetic chemicals or pesticides",
      ],
      destination: "Aerobically composted at community facilities to produce rich organic humus for urban gardeners and commercial agriculture.",
    },
    general: {
      title: "General Non-Recyclable Waste (Black Sack)",
      tagline: "Safe, sanitary containment ensuring disease-free neighborhoods",
      accepted: [
        "Composite foil snack wrappers (crisps, biscuits)",
        "Sanitary refuse and bathroom waste",
        "Broken ceramics, glass and mirror shards (wrapped)",
        "Worn-out shoes, synthetic textiles & composite refuse",
      ],
      notAccepted: [
        "Explosives, car batteries or chemical solvents",
        "Untreated clinical infectious hospital waste",
        "Large demolition concrete rubble (use Skip rental)",
      ],
      destination: "Collected in compactor trucks and transferred to licensed municipal engineered landfill sites with zero illegal open dumping.",
    },
  };

  const current = streams[activeStream];

  return (
    <section id="recycling-guide" className="w-full bg-[#F8F9FA] py-16 sm:py-20 lg:py-24 select-none border-y border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-wider bg-[#E9F4F0] px-3 py-1 rounded border border-[#006F51]/20">
            <RefreshCw className="w-3.5 h-3.5 text-[#006F51]" />
            <span>NEMA Uganda Compliance &amp; GoGreenug</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1A1D20] tracking-tight leading-tight">
            What Goes Where? Uganda Waste Segregation Guide
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Waste Connections and Nature Waste believe in making sustainability simple. Follow our color-coded guidelines to ensure maximum recycling efficiency and neighborhood cleanliness.
          </p>
        </div>

        {/* 4 Stream Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-8">
          <button
            onClick={() => setActiveStream("plastics")}
            className={`p-3.5 rounded border text-left cursor-pointer transition-colors shadow-xs ${
              activeStream === "plastics"
                ? "bg-blue-700 text-white border-blue-700"
                : "bg-white text-gray-700 border-gray-200 hover:border-blue-400"
            }`}
          >
            <span className="block text-[11px] opacity-90 uppercase tracking-wider font-bold">
              Blue Sack
            </span>
            <span className="text-sm sm:text-base font-bold">Plastics &amp; Bottles</span>
          </button>

          <button
            onClick={() => setActiveStream("paper")}
            className={`p-3.5 rounded border text-left cursor-pointer transition-colors shadow-xs ${
              activeStream === "paper"
                ? "bg-amber-600 text-white border-amber-600"
                : "bg-white text-gray-700 border-gray-200 hover:border-amber-400"
            }`}
          >
            <span className="block text-[11px] opacity-90 uppercase tracking-wider font-bold">
              Yellow Sack
            </span>
            <span className="text-sm sm:text-base font-bold">Paper &amp; Cartons</span>
          </button>

          <button
            onClick={() => setActiveStream("organics")}
            className={`p-3.5 rounded border text-left cursor-pointer transition-colors shadow-xs ${
              activeStream === "organics"
                ? "bg-[#006F51] text-white border-[#006F51]"
                : "bg-white text-gray-700 border-gray-200 hover:border-[#006F51]"
            }`}
          >
            <span className="block text-[11px] opacity-90 uppercase tracking-wider font-bold">
              Green Sack
            </span>
            <span className="text-sm sm:text-base font-bold">Organic Compost</span>
          </button>

          <button
            onClick={() => setActiveStream("general")}
            className={`p-3.5 rounded border text-left cursor-pointer transition-colors shadow-xs ${
              activeStream === "general"
                ? "bg-[#1A1D20] text-white border-[#1A1D20]"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-500"
            }`}
          >
            <span className="block text-[11px] opacity-90 uppercase tracking-wider font-bold">
              Black Sack
            </span>
            <span className="text-sm sm:text-base font-bold">General Trash</span>
          </button>
        </div>

        {/* Stream Details Card */}
        <div className="bg-white rounded border border-[#E5E7EB] shadow-xs p-6 sm:p-8 max-w-4xl mx-auto">
          <div className="border-b border-gray-100 pb-5 mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-[#1A1D20] tracking-tight">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              {current.tagline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Accepted items */}
            <div className="bg-[#F4F9F6] border border-[#006F51]/20 rounded p-5 space-y-3">
              <div className="flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#006F51]" />
                <span>YES - Place in this container:</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                {current.accepted.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#006F51] font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Accepted items */}
            <div className="bg-red-50/50 border border-red-200 rounded p-5 space-y-3">
              <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider">
                <XCircle className="w-4 h-4 text-red-600" />
                <span>NO - Do not place in this container:</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                {current.notAccepted.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Environmental Destination Note */}
          <div className="mt-6 bg-[#F8F9FA] rounded p-4 border border-gray-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#006F51] shrink-0 mt-0.5" />
            <div className="text-xs text-gray-600 leading-relaxed">
              <strong className="text-gray-900 font-bold block mb-0.5">
                What happens to this waste?
              </strong>
              {current.destination}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-[#006F51] hover:text-[#004D38] font-bold text-xs uppercase tracking-wider group"
            >
              <span>Order Color-Coded Recycling Sacks &amp; Bins for Your Home</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
