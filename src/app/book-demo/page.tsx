"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Cpu,
  Truck,
  ShieldCheck,
  Send,
  ArrowLeft,
} from "lucide-react";

import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function BookDemoPage() {
  const { submitRequest } = useWebsiteData();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    sector: "commercial",
    wasteVolume: "5-20",
    smartBins: "yes",
    date: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRequest({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      organization: formData.company,
      type: "demo_booking",
      title: `On-Site Waste Audit & IoT Demo (${formData.company})`,
      volumeOrTier: `${formData.wasteVolume} MT/mo (${formData.sector})`,
      preferredDate: formData.date,
      message: `${formData.notes ? `${formData.notes} | ` : ""}Smart Bins interest: ${formData.smartBins}`,
      priority: "high",
      status: "new",
      assignedTo: "Enterprise Solutions Engineer",
    });
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-8 sm:py-16 px-4 sm:px-12 lg:px-16 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-wider bg-[#E9F4F0] px-3 py-1 rounded-sm border border-[#006F51]/20 block w-fit mb-3">
            Direct Technical Consultation
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1A1D20] leading-tight mt-1">
            Book an On-Site Waste Audit &amp; Platform Demonstration
          </h1>
          <p className="text-xs sm:text-sm text-[#555C66] mt-2 max-w-2xl leading-relaxed">
            Meet with our environmental systems engineers to analyze your waste stream, evaluate container logistics, and see the Nature Waste Connect control room live.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 border border-[#E5E7EB] shadow-xs rounded">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-sm bg-[#006F51] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-black text-[#1A1D20]">
                  Demonstration Scheduled!
                </h2>
                <p className="text-xs sm:text-sm text-[#555C66] max-w-md mx-auto">
                  Thank you, <strong className="text-[#1A1D20]">{formData.name}</strong>. Our senior solutions engineer has reserved your slot for{" "}
                  <strong className="text-[#006F51]">{formData.date || "your requested date"}</strong>. A calendar invite and audit checklist have been sent to{" "}
                  <strong className="text-[#1A1D20]">{formData.email}</strong>.
                </p>
                <div className="pt-6 flex justify-center gap-4">
                  <Link
                    href="/portal"
                    className="bg-[#006F51] hover:bg-[#005a42] text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Explore Interactive Web Portal
                  </Link>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Book Another Session
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Sector & Volume */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1.5">
                      Sector / Facility Type *
                    </label>
                    <select
                      required
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51] font-medium"
                    >
                      <option value="municipal">City Council / Municipality</option>
                      <option value="commercial">Commercial Center / Shopping Mall</option>
                      <option value="manufacturing">Manufacturing / Industrial Factory</option>
                      <option value="healthcare">Hospital / Healthcare Facility</option>
                      <option value="residential">Residential Estate / Gated Community</option>
                      <option value="hospitality">Hotel / Resort / Hospitality</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1.5">
                      Estimated Monthly Volume *
                    </label>
                    <select
                      required
                      value={formData.wasteVolume}
                      onChange={(e) => setFormData({ ...formData, wasteVolume: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51] font-medium"
                    >
                      <option value="under-5">Under 5 Metric Tons / month</option>
                      <option value="5-20">5 to 20 Metric Tons / month</option>
                      <option value="20-100">20 to 100 Metric Tons / month</option>
                      <option value="100-plus">Over 100 Metric Tons / month</option>
                    </select>
                  </div>
                </div>

                {/* Organization & Smart Bins */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1.5">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nile Breweries Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1.5">
                      IoT Smart Bins Evaluation?
                    </label>
                    <select
                      value={formData.smartBins}
                      onChange={(e) => setFormData({ ...formData, smartBins: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51] font-medium"
                    >
                      <option value="yes">Yes, include ultrasonic IoT sensor testing</option>
                      <option value="no">No, standard collection only</option>
                      <option value="both">Interested in both container types</option>
                    </select>
                  </div>
                </div>

                {/* Contact details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1.5">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51] font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+256 700 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1.5">
                    Special Waste Stream Considerations / Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. We generate large volumes of corrugated cardboard, medical sharps, or organic dining waste..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51] font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-yellow w-full py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Confirm Demonstration Booking</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Key Takeaways */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#1A1D20] text-white p-7 rounded border border-white/10 space-y-4 shadow-xs">
              <span className="text-xs font-bold uppercase text-[#FFCE00] tracking-wider">
                What to Expect
              </span>
              <h3 className="text-lg font-bold leading-snug">
                Your 45-Minute Consultation Includes:
              </h3>

              <ul className="space-y-3.5 text-xs text-gray-300">
                <li className="flex items-start gap-2.5">
                  <Cpu className="w-4 h-4 text-[#FFCE00] shrink-0 mt-0.5" />
                  <span>
                    Live demo of IoT ultrasonic fill-sensor alert thresholds and dispatch algorithms.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#FFCE00] shrink-0 mt-0.5" />
                  <span>
                    Fleet routing overview with driver turn-by-turn mobile app execution.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#FFCE00] shrink-0 mt-0.5" />
                  <span>
                    Waste diversion audit calculation estimating potential monthly cost savings.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-[#E9F4F0] border border-[#006F51]/30 p-6 text-xs text-[#006F51] rounded-sm shadow-xs">
              <div className="font-bold uppercase tracking-wider mb-1">Guaranteed Response</div>
              <p className="text-gray-700 leading-relaxed">
                Our central dispatch team will confirm your meeting within 4 hours. For emergency medical or chemical waste assistance, call our 24/7 hotline directly: <strong>+256 766 532915</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
