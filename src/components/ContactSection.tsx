"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Headphones,
} from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState("residential");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    area: "Kitende",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full bg-white text-[#212529] py-16 sm:py-20 lg:py-24 select-none border-b border-[#E5E7EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-wider bg-[#E9F4F0] px-3 py-1 rounded-sm border border-[#006F51]/20">
            <Headphones className="w-3.5 h-3.5" />
            <span>UGANDA CUSTOMER CARE &amp; DISPATCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#1A1D20] tracking-tight leading-tight">
            How Can We Help You Today?
          </h2>
          <p className="text-[#555C66] text-sm sm:text-base leading-relaxed">
            Whether you are starting a new household trash pickup, requesting a commercial dumpster, or reporting a missed bin, our Kampala operations center is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Customer Touchpoints */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F8F9FA] rounded p-6 sm:p-8 border border-[#E5E7EB] space-y-6 shadow-xs">
              <h3 className="text-lg font-bold text-[#1A1D20] border-b border-gray-200 pb-3">
                Direct Contact Channels
              </h3>

              {/* Phone dispatch */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#E9F4F0] text-[#006F51] flex items-center justify-center shrink-0 border border-[#006F51]/20">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1D20]">Call Customer Dispatch</h4>
                  <div className="mt-1 space-y-0.5">
                    <a href="tel:+256700890123" className="block text-sm font-bold text-[#006F51] hover:underline">
                      +256 700 890 123
                    </a>
                    <a href="tel:+256312456789" className="block text-xs text-gray-500 hover:text-[#006F51]">
                      +256 312 456 789 (Commercial Lines)
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#E9F4F0] text-[#006F51] flex items-center justify-center shrink-0 border border-[#006F51]/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1D20]">Email Inquiries &amp; Tenders</h4>
                  <a href="mailto:info@naturewasteug.com" className="text-sm font-semibold text-[#006F51] hover:underline block mt-1">
                    info@naturewasteug.com
                  </a>
                  <span className="text-[11px] text-gray-500 block">Typical response time: under 2 hours</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#E9F4F0] text-[#006F51] flex items-center justify-center shrink-0 border border-[#006F51]/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1D20]">Headquarters &amp; Sorting Plant</h4>
                  <p className="text-xs text-[#555C66] leading-relaxed mt-1">
                    Kitende, Karl House, Room 9 <br />
                    Entebbe Road, Kampala, Uganda
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#E9F4F0] text-[#006F51] flex items-center justify-center shrink-0 border border-[#006F51]/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1A1D20]">Operational Hours</h4>
                  <p className="text-xs text-[#555C66] leading-relaxed mt-1">
                    Monday – Friday: 7:00 AM – 6:00 PM <br />
                    Saturday: 8:00 AM – 3:00 PM <br />
                    Sunday &amp; Holidays: Emergency Dispatch Only
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Regulatory Badge */}
            <div className="p-4 rounded-sm bg-[#E9F4F0] border border-[#006F51]/20 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#006F51] shrink-0" />
              <div className="text-xs text-[#006F51]">
                <strong>NEMA Licensed:</strong> Valid statutory waste transportation and processing license for Kampala and Wakiso districts.
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Service Request Form */}
          <div className="lg:col-span-7 bg-white rounded p-6 sm:p-8 border border-[#E5E7EB] shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-[#1A1D20]">
              Send an Online Inquiry or Request Pricing
            </h3>

            {submitted ? (
              <div className="p-6 rounded-sm bg-[#E9F4F0] text-center space-y-3 border border-[#006F51]/30">
                <CheckCircle2 className="w-10 h-10 text-[#006F51] mx-auto" />
                <h4 className="text-lg font-bold text-[#006F51]">Inquiry Received</h4>
                <p className="text-xs text-gray-700 max-w-md mx-auto">
                  Thank you, <strong>{formData.name || "Customer"}</strong>. Our Kitende dispatch supervisor will contact you shortly on <strong>{formData.phone || "your phone"}</strong> with route schedule and pricing.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#006F51] underline pt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {/* Inquiry Type Radio / Pill selector */}
                <div className="space-y-2">
                  <label className="font-bold text-gray-700 block text-xs uppercase tracking-wider">
                    What service are you inquiring about?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "residential", label: "Home Pickup" },
                      { id: "commercial", label: "Commercial" },
                      { id: "dumpster", label: "Roll-Off Skip" },
                      { id: "missed", label: "Missed Pickup" },
                    ].map((type) => (
                      <button
                        type="button"
                        key={type.id}
                        onClick={() => setInquiryType(type.id)}
                        className={`p-2.5 rounded-sm border text-center font-bold text-xs uppercase tracking-wide transition-colors ${
                          inquiryType === type.id
                            ? "bg-[#006F51] text-white border-[#006F51]"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Mukasa"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs focus:outline-none focus:border-[#006F51] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +256 700 890 123"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs focus:outline-none focus:border-[#006F51] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs focus:outline-none focus:border-[#006F51] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-gray-700">Your Suburb / Neighborhood *</label>
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs focus:outline-none focus:border-[#006F51] focus:bg-white"
                    >
                      <option value="Kitende">Kitende (Entebbe Road)</option>
                      <option value="Lubowa">Lubowa / Seguku</option>
                      <option value="Kololo">Kololo / Nakasero</option>
                      <option value="Naguru">Naguru / Bukoto</option>
                      <option value="Munyonyo">Munyonyo / Buziga</option>
                      <option value="Ntinda">Ntinda / Kyambogo</option>
                      <option value="Entebbe">Entebbe Municipality</option>
                      <option value="Namanve">Namanve Industrial Park</option>
                      <option value="Other">Other Suburb</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700">Notes / Details</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your collection requirements, number of bins, or skip size..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-sm text-xs focus:outline-none focus:border-[#006F51] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-yellow w-full py-3.5 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to Dispatch</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
