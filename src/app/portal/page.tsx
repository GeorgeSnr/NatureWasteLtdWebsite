"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Trash2,
  Calendar,
  CreditCard,
  Award,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  MapPin,
  Clock,
  Plus,
  ArrowRight,
  TrendingUp,
  Cpu,
  BarChart3,
  Sliders,
} from "lucide-react";
import Logo from "@/components/Logo";

export default function PortalPage() {
  const [roleView, setRoleView] = useState<"client" | "fleet">("client");

  // Client states
  const [pickupScheduled, setPickupScheduled] = useState(false);
  const [pickupType, setPickupType] = useState("Bulky Cardboard & E-Waste");
  const [pickupDate, setPickupDate] = useState("2026-09-18");
  const [ecoPoints, setEcoPoints] = useState(340);
  const [bagsOrdered, setBagsOrdered] = useState(false);

  // Fleet states
  const [dispatchedTruck, setDispatchedTruck] = useState<string | null>(null);
  const [smartBins, setSmartBins] = useState([
    { id: "BIN-101", location: "Kisementi Square - Plot 4", type: "Street Dual Bin", fill: 89, status: "Critical" },
    { id: "BIN-102", location: "Oasis Mall Loading Bay A", type: "Commercial Metal Skip", fill: 64, status: "Normal" },
    { id: "BIN-103", location: "Lubowa Estate Entrance", type: "Community Wheelie Bay", fill: 42, status: "Normal" },
    { id: "BIN-104", location: "Nakasero Hospital Wing 2", type: "Biohazard Autoclave Bin", fill: 92, status: "Critical" },
    { id: "BIN-105", location: "Namanve Industrial Block C", type: "Hydraulic Compactor", fill: 78, status: "Warning" },
  ]);

  const handleDispatch = (binId: string) => {
    setDispatchedTruck(`Compactor Unit 03 dispatched to ${binId}`);
    setTimeout(() => {
      setSmartBins((prev) =>
        prev.map((b) => (b.id === binId ? { ...b, fill: 12, status: "Normal" } : b))
      );
      setDispatchedTruck(null);
    }, 3000);
  };

  const handleSchedulePickup = (e: React.FormEvent) => {
    e.preventDefault();
    setPickupScheduled(true);
    setEcoPoints((prev) => prev + 25);
  };

  return (
    <div className="bg-[#F4F5F7] min-h-screen">
      {/* Portal Top Bar */}
      <div className="bg-[#181A1C] text-white border-b border-[#292B2E] px-6 sm:px-12 py-4">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo variant="dark" size="sm" />
            <span className="hidden md:inline-block text-xs bg-nature-primary px-2.5 py-0.5 font-bold uppercase tracking-wider text-white">
              Operations Cloud v2.6
            </span>
          </div>

          {/* Role View Toggle */}
          <div className="flex items-center gap-2 bg-black/40 p-1 border border-white/10 rounded-none">
            <button
              onClick={() => setRoleView("client")}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                roleView === "client"
                  ? "bg-nature-primary text-white shadow-xs"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Resident / Client View
            </button>
            <button
              onClick={() => setRoleView("fleet")}
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                roleView === "fleet"
                  ? "bg-nature-primary text-white shadow-xs"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Fleet &amp; Dispatch Console
            </button>
          </div>
        </div>
      </div>

      {/* Main Portal Body */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-8 sm:py-10 space-y-8">
        {roleView === "client" ? (
          /* ======================================================== */
          /* RESIDENT & COMMERCIAL CLIENT VIEW                        */
          /* ======================================================== */
          <div className="space-y-8">
            {/* Top Welcome & Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Stat 1: Next Pickup */}
              <div className="bg-white p-6 border border-gray-200 shadow-xs chamfer-card-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Next Scheduled Round</span>
                  <Calendar className="w-5 h-5 text-nature-primary" />
                </div>
                <div className="text-2xl font-black text-[#141517]">Tomorrow, 07:30 AM</div>
                <div className="text-xs text-nature-primary font-bold mt-2 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-nature-primary animate-ping" />
                  Route: Sector Kampala-Central
                </div>
              </div>

              {/* Stat 2: Bin Capacity */}
              <div className="bg-white p-6 border border-gray-200 shadow-xs chamfer-card-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Assigned 240L Bin Fill</span>
                  <Trash2 className="w-5 h-5 text-nature-secondary" />
                </div>
                <div className="text-2xl font-black text-[#141517]">48% Capacity</div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-nature-primary h-full" style={{ width: "48%" }} />
                </div>
              </div>

              {/* Stat 3: EcoRewards */}
              <div className="bg-white p-6 border border-gray-200 shadow-xs chamfer-card-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">EcoRewards Balance</span>
                  <Award className="w-5 h-5 text-nature-accent" />
                </div>
                <div className="text-2xl font-black text-[#141517]">{ecoPoints} Points</div>
                <div className="text-xs text-gray-500 mt-2">
                  ≈ $17.00 Mobile Money Airtime credit
                </div>
              </div>

              {/* Stat 4: Account Status */}
              <div className="bg-white p-6 border border-gray-200 shadow-xs chamfer-card-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Billing Status</span>
                  <CreditCard className="w-5 h-5 text-nature-primary" />
                </div>
                <div className="text-2xl font-black text-emerald-600">Active &amp; Paid</div>
                <div className="text-xs text-gray-500 mt-2">
                  Next invoice due Oct 01, 2026
                </div>
              </div>
            </div>

            {/* Middle Row: On-Demand Pickup Request & Color-Coded Recycling Order */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 cols: Schedule Extra / Bulky Pickup */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-gray-200 shadow-xs chamfer-card">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase text-nature-primary tracking-wider">
                      On-Demand Services
                    </span>
                    <h3 className="text-xl font-black text-[#141517] mt-0.5">
                      Schedule Ad-Hoc or Bulky Waste Pickup
                    </h3>
                  </div>
                  <Truck className="w-6 h-6 text-nature-primary" />
                </div>

                {pickupScheduled ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="text-lg font-bold text-emerald-900">
                      On-Demand Pickup Booked!
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                      Our dispatch vehicle has been scheduled for <strong>{pickupDate}</strong> to collect <strong>{pickupType}</strong>. You earned 25 EcoRewards!
                    </p>
                    <button
                      onClick={() => setPickupScheduled(false)}
                      className="text-xs font-bold uppercase text-emerald-900 underline pt-2 cursor-pointer"
                    >
                      Book Another Collection
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSchedulePickup} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                        Waste Category
                      </label>
                      <select
                        value={pickupType}
                        onChange={(e) => setPickupType(e.target.value)}
                        className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary font-medium"
                      >
                        <option>Bulky Cardboard &amp; E-Waste (Computers, Screens)</option>
                        <option>Garden Trimmings &amp; Landscaping Foliage</option>
                        <option>Old Furniture / Mattress Bulk Disposal</option>
                        <option>Construction Renovation Debris</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                          Collection Date
                        </label>
                        <input
                          type="date"
                          required
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                          Pickup Time Slot
                        </label>
                        <select className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary font-medium">
                          <option>Morning (08:00 AM - 12:00 PM)</option>
                          <option>Afternoon (01:00 PM - 05:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                        Pickup Location / Specific Instructions
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Leave by security gate or loading ramp 2"
                        className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-nature-primary hover:bg-nature-primary-dark text-white py-3.5 font-bold uppercase text-xs tracking-wider transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Request Pickup Dispatch</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>

              {/* Right 5 cols: Color-Coded Recycling Bags & Mobile Money */}
              <div className="lg:col-span-5 space-y-6">
                {/* Bags Order Card */}
                <div className="bg-white p-6 sm:p-7 border border-gray-200 shadow-xs chamfer-card-sm">
                  <span className="text-xs font-bold uppercase text-nature-primary tracking-wider">
                    Zero-Waste Supplies
                  </span>
                  <h3 className="text-lg font-black text-[#141517] mt-0.5 mb-3">
                    Order Color-Coded Recycling Sacks
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Source-segregation made easy. Sacks are collected during your weekly round for free.
                  </p>

                  <div className="space-y-2.5 mb-5">
                    <div className="flex items-center justify-between p-2.5 bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900">
                      <span>Blue Sacks (Clean Plastics &amp; PET)</span>
                      <span>10 Pack / Free</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                      <span>Yellow Sacks (Cardboard &amp; Paper)</span>
                      <span>10 Pack / Free</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-green-50 border border-green-200 text-xs font-bold text-green-900">
                      <span>Green Sacks (Biodegradable Food Waste)</span>
                      <span>10 Pack / Free</span>
                    </div>
                  </div>

                  {bagsOrdered ? (
                    <div className="p-3 bg-nature-secondary/20 text-[#074E15] text-xs font-bold text-center border border-nature-secondary">
                      ✓ Free Sacks Dispatched with Tomorrow&apos;s Collection!
                    </div>
                  ) : (
                    <button
                      onClick={() => setBagsOrdered(true)}
                      className="w-full bg-[#181A1C] hover:bg-black text-white py-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Deliver Replacement Bags
                    </button>
                  )}
                </div>

                {/* Instant Mobile Money Payment Card */}
                <div className="bg-nature-primary text-white p-6 sm:p-7 shadow-lg chamfer-card-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-nature-secondary">
                      Instant Bill Pay
                    </span>
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-bold">Pay via Mobile Money (MoMo / Airtel)</h4>
                  <p className="text-xs text-white/90">
                    Enter your phone number to receive an instant push PIN prompt to clear your subscription.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <input
                      type="tel"
                      placeholder="0770 000 000"
                      className="bg-white/20 border border-white/30 text-white placeholder-white/70 px-3 py-2 text-xs focus:outline-none flex-1"
                    />
                    <button
                      onClick={() => alert("Mobile Money Push Notification Sent to Phone!")}
                      className="bg-white text-nature-primary px-4 py-2 text-xs font-black uppercase cursor-pointer hover:bg-nature-secondary transition-colors"
                    >
                      Send Prompt
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* FLEET & DISPATCH OPERATIONS CONSOLE                      */
          /* ======================================================== */
          <div className="space-y-8">
            {/* Live Dispatch Notification */}
            {dispatchedTruck && (
              <div className="bg-nature-primary text-white p-4 font-bold text-sm flex items-center justify-between shadow-md animate-bounce">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 animate-pulse" />
                  <span>{dispatchedTruck}</span>
                </div>
                <span className="text-xs bg-white text-nature-primary px-2.5 py-1 uppercase font-black">
                  En Route (ETA 14 Mins)
                </span>
              </div>
            )}

            {/* Fleet Operations Overview Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-gray-200 shadow-xs chamfer-card-sm">
                <div className="text-xs font-bold uppercase text-gray-500 mb-1">
                  Active Fleet Vehicles
                </div>
                <div className="text-3xl font-black text-[#141517]">14 / 16</div>
                <div className="text-xs text-nature-primary font-bold mt-2">
                  87.5% Fleet Availability
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-200 shadow-xs chamfer-card-sm">
                <div className="text-xs font-bold uppercase text-gray-500 mb-1">
                  Today&apos;s Tonnage Collected
                </div>
                <div className="text-3xl font-black text-[#141517]">48.6 MT</div>
                <div className="text-xs text-nature-primary font-bold mt-2">
                  +12% vs last Tuesday
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-200 shadow-xs chamfer-card-sm">
                <div className="text-xs font-bold uppercase text-gray-500 mb-1">
                  Critical Full Bins (&gt;80%)
                </div>
                <div className="text-3xl font-black text-red-600">
                  {smartBins.filter((b) => b.fill > 80).length} Alerts
                </div>
                <div className="text-xs text-red-600 font-bold mt-2">
                  Requires Dynamic Reroute
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-200 shadow-xs chamfer-card-sm">
                <div className="text-xs font-bold uppercase text-gray-500 mb-1">
                  MRF Polymer Recovery
                </div>
                <div className="text-3xl font-black text-nature-primary">94.2%</div>
                <div className="text-xs text-gray-500 mt-2">
                  PET &amp; HDPE Quality Purity
                </div>
              </div>
            </div>

            {/* Smart Bins Live IoT Matrix */}
            <div className="bg-white border border-gray-200 shadow-xs chamfer-card overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-nature-primary">
                    IoT Telemetry
                  </span>
                  <h3 className="text-xl font-black text-[#141517] mt-0.5">
                    Municipal &amp; Commercial Smart Bin Telemetry
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 font-mono">
                    Polling frequency: every 15 mins
                  </span>
                  <button
                    onClick={() => alert("Refreshed sensor telemetry from all cellular nodes!")}
                    className="p-2 border border-gray-300 hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer"
                    aria-label="Refresh Sensors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead className="bg-[#181A1C] text-white text-[11px] uppercase tracking-widest">
                    <tr>
                      <th className="p-4">Bin Node ID</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Container Type</th>
                      <th className="p-4">Fill Percentage</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Dispatch Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {smartBins.map((bin) => {
                      const isCritical = bin.fill > 80;
                      return (
                        <tr key={bin.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-mono font-bold text-[#141517]">
                            {bin.id}
                          </td>
                          <td className="p-4 text-gray-700">{bin.location}</td>
                          <td className="p-4 text-xs text-gray-500">{bin.type}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    isCritical
                                      ? "bg-red-600"
                                      : bin.fill > 60
                                      ? "bg-amber-500"
                                      : "bg-nature-primary"
                                  }`}
                                  style={{ width: `${bin.fill}%` }}
                                />
                              </div>
                              <span
                                className={`font-mono text-xs font-bold ${
                                  isCritical ? "text-red-600 font-black" : "text-gray-700"
                                }`}
                              >
                                {bin.fill}%
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                isCritical
                                  ? "bg-red-100 text-red-800"
                                  : bin.fill > 60
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {bin.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            {isCritical ? (
                              <button
                                onClick={() => handleDispatch(bin.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                              >
                                Dispatch Truck
                              </button>
                            ) : (
                              <span className="text-xs text-gray-400 font-mono">
                                Next Schedule
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Vehicle Fleet GPS Simulation Map Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Compactor Truck 01 (Isuzu Giga)", driver: "Geoffrey Magezi", zone: "Industrial Area", fuel: "74%", pto: "148 Cycles" },
                { name: "Compactor Truck 02 (Mercedes Actros)", driver: "Simon Ssekitoleko", zone: "Nakawa & Bugolobi", fuel: "62%", pto: "112 Cycles" },
                { name: "Biohazard Van 03 (Toyota Dyna)", driver: "David Kato", zone: "Medical Referral Hub", fuel: "88%", pto: "Autoclave Sealed" },
              ].map((truck, tIdx) => (
                <div
                  key={tIdx}
                  className="bg-white p-5 border border-gray-200 shadow-xs chamfer-card-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-nature-primary">
                      GPS Online • Moving
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                  <h4 className="text-base font-black text-[#141517]">{truck.name}</h4>
                  <div className="text-xs text-gray-600 space-y-1 font-mono">
                    <div>Driver: {truck.driver}</div>
                    <div>Assigned Zone: {truck.zone}</div>
                    <div>Fuel Level: {truck.fuel}</div>
                    <div>Hydraulic Load: {truck.pto}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
