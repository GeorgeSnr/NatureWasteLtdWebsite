"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

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
      className="relative w-full bg-[#181A1C] text-white py-14 sm:py-18 lg:py-24 overflow-hidden select-none"
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
          {/* Left Column: Contact Channels */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-1.5 text-nature-secondary font-bold text-xs sm:text-sm tracking-widest uppercase">
                <span className="text-base leading-none">»</span>
                <span>CONTACT US</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-white tracking-tight leading-[1.12] mt-3">
                Ready to transform your <br /> waste operations?
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mt-4 max-w-xl font-normal">
                Get in touch with our operations team for a customized site audit or platform demonstration. We will show you how Nature Waste Connect fits your exact urban or industrial requirements.
              </p>
            </div>

            {/* 4 Contact Tiles with Chamfered Green Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8 pt-2">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-nature-primary shrink-0 flex items-center justify-center text-white chamfer-card-xs">
                  <MapPin className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">East Africa HQ</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-1">
                    Plot 18, 7th Street, Industrial Area <br />
                    Kampala, Uganda
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-nature-primary shrink-0 flex items-center justify-center text-white chamfer-card-xs">
                  <Phone className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Phone Support</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-1">
                    +256 700 890 123 <br />
                    +256 312 456 789
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-nature-primary shrink-0 flex items-center justify-center text-white chamfer-card-xs">
                  <Mail className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Email Address</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-1">
                    Direct dispatch &amp; inquiries <br />
                    <a
                      href="mailto:info@naturewaste.co"
                      className="text-nature-secondary hover:underline"
                    >
                      info@naturewaste.co
                    </a>
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-nature-primary shrink-0 flex items-center justify-center text-white chamfer-card-xs">
                  <Clock className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Operating Hours</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-1">
                    Office: Mon - Fri: 08am - 06pm <br />
                    Fleet Dispatch: 24/7 Monitoring
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Contrast Green Interactive Form Card */}
          <div className="lg:col-span-6 bg-nature-primary p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl chamfer-card">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:12px_12px]" />

            <div className="relative z-10 space-y-6">
              <div>
                <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight">
                  Get in Touch
                </h3>
                <p className="text-white/90 text-sm sm:text-base mt-2 font-normal leading-relaxed">
                  Fill out the details below and our environmental engineers will reach out within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="bg-white/10 border border-white/30 p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-nature-secondary text-nature-primary flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Inquiry Received!</h4>
                  <p className="text-sm text-white/90 max-w-sm mx-auto">
                    Thank you, {formData.name}. Our technical team has received your request and will follow up with an operational proposal.
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
                      className="w-full bg-transparent border border-white/30 rounded-none px-5 py-3.5 text-white placeholder-white/80 text-sm sm:text-base focus:outline-none focus:border-white focus:bg-white/10 transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border border-white/30 rounded-none px-5 py-3.5 text-white placeholder-white/80 text-sm sm:text-base focus:outline-none focus:border-white focus:bg-white/10 transition-all"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Organization / Entity (e.g. City Council, Hotel, Factory)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-transparent border border-white/30 rounded-none px-5 py-3.5 text-white placeholder-white/80 text-sm sm:text-base focus:outline-none focus:border-white focus:bg-white/10 transition-all"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your waste streams, volume, or platform requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border border-white/30 rounded-none px-5 py-3.5 text-white placeholder-white/80 text-sm sm:text-base focus:outline-none focus:border-white focus:bg-white/10 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="relative overflow-hidden bg-[#181A1C] text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-none cursor-pointer shadow-md group inline-flex items-center gap-2"
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
