"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative w-full bg-[#141517] text-white border-t border-[#292B2E] overflow-hidden select-none">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#292B2E]">
          {/* Column 1: Brand, Legacy & Official Address */}
          <div className="lg:col-span-4 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Logo variant="dark" size="md" showTagline />

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
                Nature Waste Management Limited is a registered &amp; licensed waste management firm founded by Ugandan youth environmentalists, pioneering sustainable waste collection and circular recycling under the <strong>GoGreenug</strong> banner.
              </p>

              <div className="space-y-2 text-xs text-gray-300 pt-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-nature-secondary shrink-0 mt-0.5" />
                  <span>Kitende, Karl House, Room 9, Entebbe Road, Kampala, Uganda</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-nature-secondary shrink-0" />
                  <a href="tel:+256700890123" className="hover:text-white font-semibold">
                    +256 700 890 123
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-nature-secondary shrink-0" />
                  <a href="mailto:info@naturewasteug.com" className="hover:text-white font-semibold">
                    info@naturewasteug.com
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <div className="inline-flex items-center gap-1.5 text-xs text-nature-secondary font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>NEMA Licensed Waste Handler</span>
                </div>
              </div>
            </div>

            <div className="pt-4 text-gray-400 text-xs">
              &copy; 2026 Nature Waste Management Limited. All rights reserved.
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-4 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight mb-6">
                Quick Navigation
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 text-xs sm:text-sm">
                <div className="space-y-3">
                  <Link
                    href="/features"
                    className="block text-gray-300 hover:text-nature-secondary transition-colors"
                  >
                    Products &amp; Modules
                  </Link>
                  <Link
                    href="/industries"
                    className="block text-gray-300 hover:text-nature-secondary transition-colors"
                  >
                    Sectors Served
                  </Link>
                  <Link
                    href="/pricing"
                    className="block text-gray-300 hover:text-nature-secondary transition-colors"
                  >
                    Pricing &amp; Rates
                  </Link>
                  <Link
                    href="/#contact"
                    className="block text-gray-300 hover:text-nature-secondary transition-colors"
                  >
                    Contact Kampala HQ
                  </Link>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/portal"
                    className="block text-nature-secondary hover:text-white font-bold transition-colors"
                  >
                    Client Web Portal
                  </Link>
                  <Link
                    href="/blog"
                    className="block text-gray-300 hover:text-nature-secondary transition-colors"
                  >
                    Research &amp; Blog
                  </Link>
                  <Link
                    href="/book-demo"
                    className="block text-gray-300 hover:text-nature-secondary transition-colors"
                  >
                    Book Waste Audit
                  </Link>
                  <Link
                    href="/features#matrix"
                    className="block text-gray-300 hover:text-nature-secondary transition-colors"
                  >
                    Feature Matrix
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3 text-xs text-gray-500">
              <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-gray-300 cursor-pointer">NEMA Compliance</span>
            </div>
          </div>

          {/* Column 3: Newsletter & Vision 2040 */}
          <div className="lg:col-span-4 p-8 sm:p-12 relative flex flex-col justify-between space-y-6 overflow-hidden">
            {/* Background Graphic Silhouette */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-15 pointer-events-none overflow-hidden flex items-end justify-end">
              <svg
                viewBox="0 0 200 400"
                className="h-full w-auto object-cover text-white fill-current"
                preserveAspectRatio="xMaxYMax slice"
              >
                <rect x="120" y="40" width="22" height="360" opacity="0.6" />
                <rect x="115" y="34" width="32" height="10" opacity="0.8" />
                <path d="M40 400 L40 320 L75 280 L110 320 L110 400 Z" opacity="0.4" />
                <circle cx="130" cy="180" r="14" fill="#0B6B1E" opacity="0.5" />
              </svg>
            </div>

            <div className="relative z-10 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                  Newsletter &amp; Updates
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
                  Subscribe for urban sanitation reports, polymer market rates, and community clean-up schedules across Kampala.
                </p>
              </div>

              {subscribed ? (
                <div className="bg-nature-primary/20 border border-nature-secondary/40 p-3 text-xs text-nature-secondary flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Subscribed! Thank you for supporting GoGreenug.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3 max-w-md">
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Enter Your Corporate or Personal Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#202225] border border-white/10 rounded-none px-4 py-3 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-nature-secondary transition-colors"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 bg-nature-primary hover:bg-nature-primary-dark text-white font-bold text-xs px-6 py-3 rounded-none cursor-pointer transition-colors group shadow-md uppercase tracking-wider"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="relative z-10 text-[11px] text-gray-500">
              Supporting Uganda Vision 2040 for Clean &amp; Resilient Cities.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
