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

export default function BookDemoPage() {
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
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-12 sm:py-16 px-6 sm:px-12 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-nature-primary hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <span className="block text-xs font-bold uppercase tracking-widest text-nature-primary">
            Direct Technical Consultation
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#091426] leading-tight mt-1">
            Book an On-Site Waste Audit &amp; Platform Demonstration
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl">
            Meet with our environmental systems engineers to analyze your waste stream, evaluate container logistics, and see the Nature Waste Connect control room live.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 border border-gray-200 shadow-md chamfer-card">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-nature-primary text-white flex items-center justify-center mx-auto shadow-lg shadow-nature-primary/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#091426]">
                  Demonstration Scheduled!
                </h2>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you, <strong className="text-[#091426]">{formData.name}</strong>. Our senior solutions engineer has reserved your slot for{" "}
                  <strong className="text-nature-primary">{formData.date || "your requested date"}</strong>. A calendar invite and audit checklist have been sent to{" "}
                  <strong className="text-[#091426]">{formData.email}</strong>.
                </p>
                <div className="pt-6 flex justify-center gap-4">
                  <Link
                    href="/portal"
                    className="bg-nature-primary hover:bg-nature-primary-dark text-white px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Explore Interactive Web Portal
                  </Link>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="border border-gray-300 text-gray-700 px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    Book Another Session
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Sector & Volume */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Sector / Facility Type *
                    </label>
                    <select
                      required
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary font-medium"
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Estimated Monthly Volume *
                    </label>
                    <select
                      required
                      value={formData.wasteVolume}
                      onChange={(e) => setFormData({ ...formData, wasteVolume: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary font-medium"
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Company / Organization Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nile Breweries Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      IoT Smart Bins Evaluation?
                    </label>
                    <select
                      value={formData.smartBins}
                      onChange={(e) => setFormData({ ...formData, smartBins: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary font-medium"
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+256 700 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Special Waste Stream Considerations / Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. We generate large volumes of corrugated cardboard, medical sharps, or organic dining waste..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-nature-primary hover:bg-nature-primary-dark text-white py-4 font-black uppercase text-sm tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirm Demonstration Booking</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Key Takeaways */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#181A1C] text-white p-7 chamfer-card-sm space-y-4">
              <span className="text-xs font-bold uppercase text-nature-secondary tracking-widest">
                What to Expect
              </span>
              <h3 className="text-lg font-black leading-snug">
                Your 45-Minute Consultation Includes:
              </h3>

              <ul className="space-y-3.5 text-xs text-gray-300">
                <li className="flex items-start gap-2.5">
                  <Cpu className="w-4 h-4 text-nature-secondary shrink-0 mt-0.5" />
                  <span>
                    Live demo of IoT ultrasonic fill-sensor alert thresholds and dispatch algorithms.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-nature-secondary shrink-0 mt-0.5" />
                  <span>
                    Fleet routing overview with driver turn-by-turn mobile app execution.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-nature-secondary shrink-0 mt-0.5" />
                  <span>
                    Waste diversion audit calculation estimating potential monthly cost savings.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-nature-secondary/20 border border-nature-secondary/40 p-6 text-xs text-[#074E15]">
              <div className="font-black uppercase mb-1">Guaranteed Response</div>
              <p>
                Our central dispatch team will confirm your meeting within 4 hours. For emergency medical or chemical waste assistance, call our 24/7 hotline directly: <strong>+256 700 890 123</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
