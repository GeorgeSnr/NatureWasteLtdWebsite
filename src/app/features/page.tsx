"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  Recycle,
  Truck,
  Table,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  BarChart3,
  Sliders,
} from "lucide-react";
import { featureComparison } from "@/data/pricingPlans";

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("smart-collection");

  // Interactive sensor simulator state
  const [simFillLevel, setSimFillLevel] = useState(76);

  return (
    <div className="mx-auto flex max-w-[1440px] min-h-screen bg-white">
      {/* Sticky Left Sub-Navigation */}
      <aside className="sticky top-[80px] hidden h-[calc(100vh-80px)] w-[280px] flex-col border-r border-[#E5E7EB] bg-[#F8F9FA] p-4 gap-2 lg:flex shrink-0 select-none">
        <div className="mb-6 px-4 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#006F51]">
            Platform Modules
          </span>
          <h2 className="text-lg font-bold text-[#1A1D20] mt-0.5">
            Nature Waste Connect
          </h2>
        </div>

        <a
          href="#smart-collection"
          onClick={() => setActiveTab("smart-collection")}
          className={`flex items-center gap-3 rounded-sm px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === "smart-collection"
              ? "bg-[#006F51] text-white shadow-xs"
              : "text-[#555C66] hover:bg-[#E5E7EB]"
          }`}
        >
          <Cpu className="h-4 w-4" />
          Smart Collection
        </a>

        <a
          href="#material-recovery"
          onClick={() => setActiveTab("material-recovery")}
          className={`flex items-center gap-3 rounded-sm px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === "material-recovery"
              ? "bg-[#006F51] text-white shadow-xs"
              : "text-[#555C66] hover:bg-[#E5E7EB]"
          }`}
        >
          <Recycle className="h-4 w-4" />
          Material Recovery
        </a>

        <a
          href="#fleet-telematics"
          onClick={() => setActiveTab("fleet-telematics")}
          className={`flex items-center gap-3 rounded-sm px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === "fleet-telematics"
              ? "bg-[#006F51] text-white shadow-xs"
              : "text-[#555C66] hover:bg-[#E5E7EB]"
          }`}
        >
          <Truck className="h-4 w-4" />
          Fleet Telematics
        </a>

        <a
          href="#matrix"
          onClick={() => setActiveTab("matrix")}
          className={`flex items-center gap-3 rounded-sm px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
            activeTab === "matrix"
              ? "bg-[#006F51] text-white shadow-xs"
              : "text-[#555C66] hover:bg-[#E5E7EB]"
          }`}
        >
          <Table className="h-4 w-4" />
          Feature Matrix
        </a>

        <div className="mt-auto p-4 bg-white border border-[#E5E7EB] rounded-sm">
          <div className="text-xs font-bold text-[#1A1D20] mb-1">
            Need an on-site waste audit?
          </div>
          <p className="text-[11px] text-[#555C66] mb-3">
            Our environmental engineers will assess your container needs.
          </p>
          <Link
            href="/book-demo"
            className="w-full block text-center bg-[#006F51] hover:bg-[#005a42] text-white py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Book Free Audit
          </Link>
        </div>
      </aside>

      {/* Main Features Content */}
      <main className="flex-1 overflow-x-hidden px-6 sm:px-10 lg:px-12 py-12">
        {/* Header Intro */}
        <section className="mb-16">
          <div className="inline-flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-wider bg-[#E9F4F0] px-3 py-1 rounded-sm border border-[#006F51]/20">
            Full System Architecture
          </div>
          <h1 className="mt-3 mb-4 text-3xl sm:text-4xl lg:text-[42px] font-black leading-[1.15] tracking-tight text-[#1A1D20]">
            Precision Engineering for Modern Waste Logistics
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-[#555C66] leading-relaxed">
            Nature Waste Connect unifies every phase of the urban and industrial waste lifecycle.
            From IoT bin fill alerts to municipal compactor truck routing, MRF weighbridge ticketing,
            and NEMA-certified chain-of-custody compliance.
          </p>
        </section>

        {/* SECTION 1: Advanced Smart Collection & Dispatch Schedule */}
        <section id="smart-collection" className="mb-20 scroll-mt-24">
          <div className="mb-8 flex items-baseline justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006F51]">
                Precision Scheduling &amp; IoT
              </span>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-black leading-[1.2] text-[#1A1D20]">
                Smart Collection &amp; Dynamic Dispatch
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Interactive Schedule Chart */}
            <div className="col-span-12 border border-[#E5E7EB] bg-white p-6 lg:col-span-8 shadow-xs rounded">
              <div className="mb-6 flex items-center justify-between border-b border-[#E5E7EB] pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1A1D20]">
                    Dispatch Schedule: Sector Kampala-Central Fleet
                  </h3>
                  <span className="text-xs text-[#555C66] font-mono">
                    Live Status: 8 Trucks Active • 1,420 Bins Polled
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-[#E9F4F0] text-[#006F51] text-xs font-bold rounded-sm border border-[#006F51]/20">
                    Route Optimized
                  </span>
                </div>
              </div>

              {/* Gantt / Schedule Timeline */}
              <div className="overflow-x-auto">
                <div className="min-w-[650px] text-xs font-mono">
                  <div className="flex border-b border-[#E5E7EB] bg-[#F8F9FA] py-2.5">
                    <div className="w-1/3 px-4 font-bold text-[#1A1D20] uppercase tracking-wider text-[11px]">
                      Zone / Waste Stream
                    </div>
                    <div className="flex w-2/3 justify-between px-4 text-[#555C66] font-semibold text-[11px]">
                      <span>06:00 AM</span>
                      <span>09:00 AM</span>
                      <span>12:00 PM</span>
                      <span>03:00 PM</span>
                      <span>06:00 PM</span>
                    </div>
                  </div>

                  {/* Row 1 */}
                  <div className="flex items-center border-b border-[#E5E7EB] py-3.5 bg-white">
                    <div className="w-1/3 px-4 text-[#1A1D20] font-medium">
                      CBD Commercial Street Bins
                    </div>
                    <div className="relative w-2/3 px-4">
                      <div
                        className="h-6 rounded-sm bg-[#006F51] flex items-center px-2 text-[10px] text-white font-bold"
                        style={{ width: "45%", marginLeft: "0%" }}
                      >
                        Compactor 04 (Completed)
                      </div>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="flex items-center border-b border-[#E5E7EB] py-3.5 bg-[#F8F9FA]/60">
                    <div className="w-1/3 px-4 text-[#1A1D20] font-medium">
                      Industrial Park Scrap &amp; Cardboard
                    </div>
                    <div className="relative w-2/3 px-4">
                      <div
                        className="h-6 rounded-sm bg-[#FFCE00] flex items-center px-2 text-[10px] text-[#1A1D20] font-bold"
                        style={{ width: "35%", marginLeft: "35%" }}
                      >
                        Hydraulic Roll-off (In Progress)
                      </div>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="flex items-center border-b border-[#E5E7EB] py-3.5 bg-white">
                    <div className="w-1/3 px-4 text-[#1A1D20] font-medium">
                      Nakasero Hospital Biohazard
                    </div>
                    <div className="relative w-2/3 px-4">
                      <div
                        className="h-6 rounded-sm bg-[#BA1A1A] flex items-center px-2 text-[10px] text-white font-bold"
                        style={{ width: "25%", marginLeft: "65%" }}
                      >
                        Clinical Van 02 (Dispatched)
                      </div>
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div className="flex items-center py-3.5 bg-[#F8F9FA]/60">
                    <div className="w-1/3 px-4 text-[#1A1D20] font-medium">
                      Residential Green Estates
                    </div>
                    <div className="relative w-2/3 px-4">
                      <div
                        className="h-6 rounded-sm bg-[#1A1D20] flex items-center px-2 text-[10px] text-white font-bold"
                        style={{ width: "50%", marginLeft: "45%" }}
                      >
                        Organic Waste Crew (Queued)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Highlights & Interactive Fill Gauge */}
            <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
              <div className="flex-1 border border-[#E5E7EB] bg-white p-6 shadow-xs rounded">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#006F51]">
                    Live IoT Bin Simulator
                  </span>
                  <Sliders className="w-4 h-4 text-gray-400" />
                </div>
                <h4 className="text-base font-bold text-[#1A1D20] mb-2">
                  Ultrasonic Sensor Telemetry
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#555C66]">Fill Percentage:</span>
                    <span className="font-bold text-[#006F51]">{simFillLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={simFillLevel}
                    onChange={(e) => setSimFillLevel(Number(e.target.value))}
                    className="w-full accent-[#006F51]"
                  />
                  <div
                    className={`p-3 text-xs font-medium border rounded-sm ${
                      simFillLevel > 80
                        ? "bg-red-50 text-red-800 border-red-200"
                        : simFillLevel > 60
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-emerald-50 text-emerald-800 border-emerald-200"
                    }`}
                  >
                    {simFillLevel > 80
                      ? "ALERT: High overflow risk! Dynamic truck reroute triggered automatically."
                      : simFillLevel > 60
                      ? "Status: Bin at moderate capacity. Scheduled for tomorrow morning round."
                      : "Status: Optimal. Bin below dispatch threshold."}
                  </div>
                </div>
              </div>

              <div className="flex-1 border border-[#E5E7EB] bg-white p-6 shadow-xs rounded">
                <div className="mb-3 text-[#006F51]">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#1A1D20] mb-1">
                  Dynamic Route Sequencing
                </h4>
                <p className="text-xs text-[#555C66] leading-relaxed">
                  Eliminate dead mileage. Algorithms skip half-empty containers and consolidate truck routes to save 34% in fleet diesel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Material Recovery Facility (MRF) & Weighbridge */}
        <section
          id="material-recovery"
          className="mb-20 -mx-6 sm:-mx-10 lg:-mx-12 border-y border-[#E5E7EB] bg-[#F8F9FA] px-6 sm:px-10 lg:px-12 py-16 scroll-mt-24"
        >
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006F51]">
                Circular Economics
              </span>
              <h2 className="mt-1.5 text-2xl sm:text-3xl font-black leading-[1.2] text-[#1A1D20]">
                Material Recovery Facility (MRF) &amp; Weighbridge
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: Weighbridge Log */}
              <div className="overflow-hidden border border-[#E5E7EB] bg-white shadow-xs rounded">
                <div className="border-b border-[#E5E7EB] bg-[#F8F9FA] p-4 flex justify-between items-center">
                  <h3 className="text-base font-bold text-[#1A1D20]">
                    Intake Weighbridge Scale
                  </h3>
                  <span className="text-[11px] font-mono bg-[#E9F4F0] px-2 py-0.5 rounded-sm text-[#006F51] font-bold border border-[#006F51]/20">
                    Scale 01 Live
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs font-mono">
                    <thead className="bg-[#1A1D20] text-[10px] uppercase tracking-widest text-white">
                      <tr>
                        <th className="p-3 text-left">Ticket #</th>
                        <th className="p-3 text-left">Material</th>
                        <th className="p-3 text-right">Net Wt</th>
                        <th className="p-3 text-right">Rate/Kg</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]/40">
                        <td className="p-3 font-bold text-[#1A1D20]">TK-9821</td>
                        <td className="p-3 text-[#333A42]">Clear PET Bottles</td>
                        <td className="p-3 text-right font-bold text-[#006F51]">
                          4,850 kg
                        </td>
                        <td className="p-3 text-right text-[#555C66]">$0.32</td>
                      </tr>
                      <tr className="border-b border-[#E5E7EB] bg-white">
                        <td className="p-3 font-bold text-[#1A1D20]">TK-9822</td>
                        <td className="p-3 text-[#333A42]">Corrugated Cardboard</td>
                        <td className="p-3 text-right font-bold text-[#006F51]">
                          8,200 kg
                        </td>
                        <td className="p-3 text-right text-[#555C66]">$0.18</td>
                      </tr>
                      <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]/40">
                        <td className="p-3 font-bold text-[#1A1D20]">TK-9823</td>
                        <td className="p-3 text-[#333A42]">Rigid HDPE Containers</td>
                        <td className="p-3 text-right font-bold text-[#006F51]">
                          2,410 kg
                        </td>
                        <td className="p-3 text-right text-[#555C66]">$0.45</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-4 text-xs text-[#555C66] bg-white border-t border-[#E5E7EB] leading-relaxed">
                  Direct digital integration with Mettler Toledo and Avery weighbridge scales. Automatic deduction of tare vehicle weight.
                </div>
              </div>

              {/* Card 2: Waste Stream Diversion Progress */}
              <div className="flex flex-col justify-between border border-[#E5E7EB] bg-white p-6 shadow-xs rounded">
                <div>
                  <h3 className="mb-4 text-base font-bold text-[#1A1D20]">
                    Landfill Diversion Targets
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#1A1D20]">
                        <span>Post-Consumer Plastics</span>
                        <span className="text-[#006F51]">94% Target</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-sm bg-[#E5E7EB]">
                        <div className="h-full bg-[#006F51]" style={{ width: "94%" }} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#1A1D20]">
                        <span>Industrial Cardboard</span>
                        <span className="text-[#B38F00] font-black">98% Target</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-sm bg-[#E5E7EB]">
                        <div className="h-full bg-[#FFCE00]" style={{ width: "98%" }} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#1A1D20]">
                        <span>Organic Food Waste</span>
                        <span className="text-[#006F51] font-bold">82% Target</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-sm bg-[#E5E7EB]">
                        <div className="h-full bg-[#006F51]/70" style={{ width: "82%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-[#E5E7EB] pt-4">
                  <p className="text-xs italic text-[#555C66]">
                    &ldquo;Certified carbon avoidance accreditation issued on every baled ton.&rdquo;
                  </p>
                </div>
              </div>

              {/* Card 3: MRF Recovery Features */}
              <div className="border border-[#E5E7EB] bg-white p-6 shadow-xs rounded flex flex-col justify-between">
                <div>
                  <h3 className="mb-4 text-base font-bold text-[#1A1D20]">
                    Baled Inventory Traceability
                  </h3>
                  <div className="flex h-36 items-center justify-center bg-[#F8F9FA] border border-[#E5E7EB] rounded-sm p-6 mb-4">
                    <div className="text-center">
                      <BarChart3 className="w-8 h-8 text-[#006F51] mx-auto mb-1" />
                      <span className="text-2xl font-black text-[#1A1D20]">
                        428 Bales Ready
                      </span>
                      <p className="text-xs text-[#555C66]">QR-tagged &amp; graded for shipment</p>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-[#555C66]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#006F51] shrink-0" />
                      <span>Traceable Polymer Resin Batches</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#006F51] shrink-0" />
                      <span>Buyer Purchase Order Matching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#006F51] shrink-0" />
                      <span>Automated Revenue Splitting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Fleet Telematics & Field Intelligence */}
        <section id="fleet-telematics" className="mb-20 scroll-mt-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006F51]">
                On-Road Operations
              </span>
              <h2 className="mt-1.5 mb-4 text-2xl sm:text-3xl font-black leading-[1.2] text-[#1A1D20]">
                Fleet Telematics &amp; Hydraulic Health
              </h2>
              <p className="mb-6 text-sm sm:text-base text-[#555C66] leading-relaxed">
                Connect your garbage trucks, compactor hydraulics, and driver tablets in real-time.
                Prevent costly roadside breakdowns with predictive sensor diagnostics.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-fit rounded-sm bg-[#006F51] p-3 text-white">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#1A1D20]">
                      Compactor Hydraulic &amp; PTO Sensors
                    </h4>
                    <p className="text-xs text-[#555C66] mt-0.5">
                      Monitor cycle pressures, packing blade wear, and prevent hydraulic pump blowout.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-fit rounded-sm bg-[#006F51] p-3 text-white">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#1A1D20]">
                      Fuel Anti-Theft &amp; Idling Telematics
                    </h4>
                    <p className="text-xs text-[#555C66] mt-0.5">
                      Ultrasonic tank sensors flag suspicious siphoning events and log engine idling time.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-First Driver Preview Card */}
            <div className="border border-[#E5E7EB] bg-[#F8F9FA] p-8 text-center shadow-xs rounded">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm bg-[#006F51] text-white">
                <Truck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1D20]">
                Nature Waste Driver App
              </h3>
              <p className="text-xs text-[#555C66] mt-1">
                Available for Android &amp; Rugged Vehicle Terminals
              </p>
              <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex justify-center gap-6 text-xs text-[#555C66] font-mono">
                <span>Offline Sync ✓</span>
                <span>Turn-by-Turn GPS ✓</span>
                <span>Photo Proof ✓</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Enterprise Feature Matrix Table */}
        <section id="matrix" className="mb-16 scroll-mt-24">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006F51]">
              Full Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1D20] mt-1.5">
              Enterprise Feature Matrix
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#555C66] max-w-xl mx-auto">
              Compare modules across Residential, Commercial Business, and Municipal Enterprise tiers.
            </p>
          </div>

          <div className="overflow-x-auto shadow-xs border border-[#E5E7EB] rounded">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#1A1D20] text-white">
                  <th className="border-r border-white/10 p-4 text-left text-xs font-bold uppercase tracking-wider">
                    Module Ecosystem
                  </th>
                  <th className="border-r border-white/10 p-4 text-center text-xs font-bold uppercase tracking-wider">
                    Residential Connect
                  </th>
                  <th className="border-r border-white/10 p-4 text-center text-xs font-bold uppercase tracking-wider">
                    Commercial Business
                  </th>
                  <th className="p-4 text-center text-xs font-bold uppercase tracking-wider">
                    Municipal &amp; Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {featureComparison.map((cat, cIdx) => (
                  <React.Fragment key={cIdx}>
                    <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]">
                      <td
                        className="p-3 text-xs font-bold uppercase tracking-wider text-[#1A1D20]"
                        colSpan={4}
                      >
                        {cat.category}
                      </td>
                    </tr>
                    {cat.items.map((item, iIdx) => (
                      <tr
                        key={iIdx}
                        className="border-b border-[#E5E7EB] even:bg-[#F8F9FA]/50 text-xs"
                      >
                        <td className="p-4 font-medium text-[#1A1D20]">{item.name}</td>
                        <td className="p-4 text-center">
                          {typeof item.residential === "boolean" ? (
                            item.residential ? (
                              <CheckCircle2 className="w-4 h-4 text-[#006F51] mx-auto" />
                            ) : (
                              <span className="text-gray-400">—</span>
                            )
                          ) : (
                            <span className="text-xs font-bold text-gray-700">
                              {item.residential}
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof item.commercial === "boolean" ? (
                            item.commercial ? (
                              <CheckCircle2 className="w-4 h-4 text-[#006F51] mx-auto" />
                            ) : (
                              <span className="text-gray-400">—</span>
                            )
                          ) : (
                            <span className="text-xs font-bold text-gray-700">
                              {item.commercial}
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof item.enterprise === "boolean" ? (
                            item.enterprise ? (
                              <CheckCircle2 className="w-4 h-4 text-[#006F51] mx-auto" />
                            ) : (
                              <span className="text-gray-400">—</span>
                            )
                          ) : (
                            <span className="text-xs font-bold text-gray-700">
                              {item.enterprise}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
