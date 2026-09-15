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
    <section id="contact" className="w-full bg-[#141517] text-white py-16 sm:py-20 lg:py-24 select-none relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-nature-secondary font-extrabold text-xs uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full">
            <Headphones className="w-3.5 h-3.5" />
            <span>UGANDA CUSTOMER CARE &amp; DISPATCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-tight">
            How Can We Help You Today?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Whether you are starting a new household trash pickup, requesting a commercial dumpster, or reporting a missed bin, our Kampala operations center is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Customer Touchpoints */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1C1F22] rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">
                Direct Contact Channels
              </h3>

              {/* Phone dispatch */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-nature-primary text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Call Customer Dispatch</h4>
                  <div className="mt-1 space-y-0.5">
                    <a href="tel:+256700890123" className="block text-sm font-bold text-nature-secondary hover:underline">
                      +256 700 890 123
                    </a>
                    <a href="tel:+256312456789" className="block text-xs text-gray-400 hover:text-white">
                      +256 312 456 789 (Commercial Lines)
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-nature-primary text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Email Inquiries &amp; Tenders</h4>
                  <a href="mailto:info@naturewasteug.com" className="text-sm font-semibold text-nature-secondary hover:underline block mt-1">
                    info@naturewasteug.com
                  </a>
                  <span className="text-[11px] text-gray-500 block">Typical response time: under 2 hours</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-nature-primary text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Headquarters &amp; Sorting Plant</h4>
                  <p className="text-xs text-gray-300 leading-relaxed mt-1">
                    Kitende, Karl House, Room 9 <br />
                    Entebbe Road, Kampala, Uganda
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-nature-primary text-white flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Operating Hours</h4>
                  <p className="text-xs text-gray-300 leading-relaxed mt-1">
                    Monday - Friday: 07:00 AM - 06:00 PM <br />
                    Saturday: 08:00 AM - 04:00 PM <br />
                    <span className="text-nature-secondary font-bold">24/7 Emergency Fleet Dispatch</span>
                  </p>
                </div>
              </div>

              {/* NEMA Credentials badge */}
              <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs text-nature-secondary font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>NEMA Licensed Waste Handler Uganda</span>
              </div>
            </div>
          </div>

          {/* Right Column: Waste Connections Service & Missed Pickup Form */}
          <div className="lg:col-span-7 bg-[#1C1F22] rounded-2xl p-6 sm:p-10 border border-white/10">
            <h3 className="text-2xl font-black text-white tracking-tight mb-2">
              Send a Service Request
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-6">
              Fill out the details below and our Kampala dispatch coordinator will contact you immediately.
            </p>

            {submitted ? (
              <div className="bg-nature-primary/20 border border-nature-secondary/50 rounded-xl p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-nature-secondary text-[#0B2C1A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Request Received!</h4>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Your ticket has been dispatched to the route supervisor for <strong>{formData.area}</strong>. We will call you at <strong>{formData.phone}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", phone: "", email: "", area: "Kitende", message: "" });
                  }}
                  className="text-xs font-bold uppercase tracking-wider text-nature-secondary underline pt-2 cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Inquiry Type Radio / Buttons */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    I am requesting:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "residential", label: "Home Pickup" },
                      { id: "commercial", label: "Business Waste" },
                      { id: "dumpster", label: "Rent a Skip" },
                      { id: "missed", label: "Missed Pickup" },
                    ].map((type) => (
                      <button
                        type="button"
                        key={type.id}
                        onClick={() => setInquiryType(type.id)}
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-all text-center cursor-pointer border ${
                          inquiryType === type.id
                            ? "bg-nature-primary text-white border-nature-primary shadow-sm"
                            : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samuel Mukasa"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-nature-secondary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Phone Number (Mobile Money or WhatsApp)</label>
                    <input
                      type="tel"
                      required
                      placeholder="+256 7XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-nature-secondary transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-nature-secondary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Suburb / Location in Uganda</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kitende, Lubowa, Bugolobi..."
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-nature-secondary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Details or Specific Request</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your bin needs, missed pickup date, or skip delivery address..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-nature-secondary transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-nature-primary hover:bg-nature-primary-dark text-white px-8 py-3.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                  >
                    <span>Submit Service Request</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
