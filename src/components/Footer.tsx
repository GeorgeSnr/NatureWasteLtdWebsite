"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
    <footer className="relative w-full bg-[#181A1C] text-white border-t border-[#292B2E] overflow-hidden select-none">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#292B2E]">
          {/* Column 1: Brand & Legacy */}
          <div className="lg:col-span-4 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <Logo variant="dark" size="md" showTagline />

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm font-normal">
                Enterprise waste management and circular economy ERP built for Africa. Connecting municipal bins, collection fleets, and recycling facilities on a single source of truth.
              </p>

              <div className="pt-2">
                <span className="text-3xl sm:text-4xl lg:text-[40px] font-black tracking-wide text-outline-green">
                  Since 2018
                </span>
              </div>
            </div>

            <div className="pt-4 text-gray-400 text-xs sm:text-sm">
              &copy; 2026 Nature Waste Management Ltd. All rights reserved.
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-4 p-8 sm:p-12 lg:p-14 flex flex-col justify-between space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-8">
                Quick Navigation
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-3.5">
                  <Link
                    href="/features"
                    className="block text-gray-300 hover:text-nature-secondary text-sm sm:text-base transition-colors"
                  >
                    Products &amp; Features
                  </Link>
                  <Link
                    href="/industries"
                    className="block text-gray-300 hover:text-nature-secondary text-sm sm:text-base transition-colors"
                  >
                    Sectors &amp; Industries
                  </Link>
                  <Link
                    href="/pricing"
                    className="block text-gray-300 hover:text-nature-secondary text-sm sm:text-base transition-colors"
                  >
                    Pricing &amp; Plans
                  </Link>
                  <Link
                    href="/#contact"
                    className="block text-gray-300 hover:text-nature-secondary text-sm sm:text-base transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>

                <div className="space-y-3.5">
                  <Link
                    href="/portal"
                    className="block text-nature-secondary hover:text-white font-bold text-sm sm:text-base transition-colors"
                  >
                    Client Web Portal
                  </Link>
                  <Link
                    href="/blog"
                    className="block text-gray-300 hover:text-nature-secondary text-sm sm:text-base transition-colors"
                  >
                    Research &amp; Blog
                  </Link>
                  <Link
                    href="/book-demo"
                    className="block text-gray-300 hover:text-nature-secondary text-sm sm:text-base transition-colors"
                  >
                    Schedule Demo
                  </Link>
                  <Link
                    href="/features#matrix"
                    className="block text-gray-300 hover:text-nature-secondary text-sm sm:text-base transition-colors"
                  >
                    Feature Matrix
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4 text-xs text-gray-500">
              <span className="hover:text-gray-300 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-gray-300 cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-gray-300 cursor-pointer">NEMA Compliance</span>
            </div>
          </div>

          {/* Column 3: Newsletter & Recycling Silhouettes */}
          <div className="lg:col-span-4 p-8 sm:p-12 lg:p-14 relative flex flex-col justify-between space-y-8 overflow-hidden">
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
                <path d="M90 400 L90 300 L125 260 L160 300 L160 400 Z" opacity="0.3" />
                <circle cx="130" cy="180" r="14" fill="#0B6B1E" opacity="0.5" />
              </svg>
            </div>

            <div className="relative z-10 space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4">
                  Newsletter &amp; Updates
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm font-normal">
                  Subscribe for the latest circular economy whitepapers, IoT waste telemetry, and urban sanitation regulations.
                </p>
              </div>

              {subscribed ? (
                <div className="bg-nature-primary/20 border border-nature-secondary/40 p-4 text-sm text-nature-secondary flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Thank you for subscribing to Nature Waste updates!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4 max-w-md">
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Enter Your Corporate Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#202225] border border-white/10 rounded-none px-5 py-3.5 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-nature-secondary transition-colors"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2.5 bg-nature-primary hover:bg-nature-primary-dark text-white font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-none cursor-pointer transition-colors group shadow-md"
                    >
                      <span>Subscribe Now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="relative z-10 text-xs text-gray-500">
              Reduce. Reuse. Recycle. Smart Waste Collection Made Easy.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
