"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#181A1C] text-white py-16 sm:py-20 lg:py-24 overflow-hidden select-none"
    >
      {/* World Map Dotted Pattern Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full object-cover text-white fill-current"
          preserveAspectRatio="xMidYMid slice"
        >
          <pattern
            id="world-dots"
            x="0"
            y="0"
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill="currentColor" opacity="0.4" />
          </pattern>
          <rect width="1000" height="500" fill="url(#world-dots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-1.5 text-nature-secondary font-bold text-xs sm:text-sm tracking-widest uppercase">
                <span className="text-base leading-none">»</span>
                <span>OFFICIAL CONTACT CHANNELS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.12] mt-3">
                Nature Waste Management Limited
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-3 max-w-xl font-normal">
                Reach out to our environmental operations team in Kampala for scheduled pickups, commercial container deployment, or community recycling programs.
              </p>
            </div>

            {/* 4 Contact Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 pt-2">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 bg-nature-primary shrink-0 flex items-center justify-center text-white chamfer-card-xs">
                  <MapPin className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Uganda Head Office</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-1">
                    Kitende, Karl House, Room 9 <br />
                    Entebbe Road, Kampala, Uganda
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 bg-nature-primary shrink-0 flex items-center justify-center text-white chamfer-card-xs">
                  <Phone className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Direct Dispatch Lines</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-1">
                    <a href="tel:+256700890123" className="hover:text-white font-semibold block">
                      +256 700 890 123
                    </a>
                    <a href="tel:+256312456789" className="hover:text-white font-semibold block">
                      +256 312 456 789
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 bg-nature-primary shrink-0 flex items-center justify-center text-white chamfer-card-xs">
                  <Mail className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Email Address</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-1">
                    <a
                      href="mailto:info@naturewasteug.com"
                      className="text-nature-secondary hover:underline font-medium block"
                    >
                      info@naturewasteug.com
                    </a>
                    <span className="text-gray-500 text-[11px]">Official inquiries &amp; tenders</span>
                  </p>
                </div>
              </div>

              {/* Hours & License */}
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 bg-nature-primary shrink-0 flex items-center justify-center text-white chamfer-card-xs">
                  <Clock className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Operations &amp; NEMA</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-1">
                    Mon - Fri: 08:00 AM - 06:00 PM <br />
                    <span className="text-nature-secondary font-bold">NEMA Reg &amp; Licensed Handler</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Contrast Green Interactive Form Card */}
          <div className="lg:col-span-6 bg-nature-primary p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl chamfer-card">
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:12px_12px]" />

            <div className="relative z-10 space-y-6">
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Request Service or Audit
                </h3>
                <p className="text-white/90 text-xs sm:text-sm mt-1.5 font-normal leading-relaxed">
                  Connect with our team in Kitende, Kampala for tailored waste collection and recycling.
                </p>
              </div>

              {submitted ? (
                <div className="bg-white/10 border border-white/30 p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-nature-secondary text-nature-primary flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Inquiry Received!</h4>
                  <p className="text-xs sm:text-sm text-white/90 max-w-sm mx-auto">
                    Thank you, {formData.name}. Our Kampala dispatch center has received your message and will contact you promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", company: "", message: "" });
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-white underline pt-2 cursor-pointer"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border border-white/30 rounded-none px-4 py-3 text-white placeholder-white/80 text-sm focus:outline-none focus:border-white focus:bg-white/10 transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border border-white/30 rounded-none px-4 py-3 text-white placeholder-white/80 text-sm focus:outline-none focus:border-white focus:bg-white/10 transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Organization / Residential Suburb (e.g. Makindye, Bugolobi, Kitende)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-transparent border border-white/30 rounded-none px-4 py-3 text-white placeholder-white/80 text-sm focus:outline-none focus:border-white focus:bg-white/10 transition-all"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe your waste streams, plastic collection, or skip requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border border-white/30 rounded-none px-4 py-3 text-white placeholder-white/80 text-sm focus:outline-none focus:border-white focus:bg-white/10 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="relative overflow-hidden bg-[#181A1C] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-none cursor-pointer shadow-md group inline-flex items-center gap-2 uppercase tracking-wider"
                    >
                      <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
                      <span className="relative z-10 text-white group-hover:text-[#181A1C] transition-colors duration-300 flex items-center gap-2">
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
