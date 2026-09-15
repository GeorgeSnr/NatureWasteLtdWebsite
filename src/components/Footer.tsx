"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
  CreditCard,
} from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0E1012] text-white border-t border-white/10 select-none">
      
      {/* Top Pre-Footer Callout Bar (Waste Connections Pattern) */}
      <div className="bg-[#15191C] border-b border-white/10 py-8 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-nature-primary text-white flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Need to Start Waste Service in Uganda?</h3>
              <p className="text-xs text-gray-400">
                Call our Kitende dispatch team or enter your suburb for immediate route scheduling.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+256700890123"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition-colors"
            >
              Call: +256 700 890 123
            </a>
            <Link
              href="/#schedule-finder"
              className="bg-nature-secondary hover:bg-nature-secondary-dark text-[#0B2C1A] font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-lg shadow-md transition-colors flex items-center gap-2"
            >
              <span>Get Prices &amp; Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Link Columns */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Headquarters */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="dark" size="md" showTagline />
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Nature Waste Management Limited is a NEMA-registered environmental services leader founded by Ugandan youth environmentalists, providing reliable waste collection, dumpster rentals, and circular recycling under the <strong>GoGreenug</strong> banner.
            </p>

            <div className="space-y-2.5 text-xs text-gray-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-nature-secondary shrink-0 mt-0.5" />
                <span>Kitende, Karl House, Room 9, Entebbe Road, Kampala, Uganda</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-nature-secondary shrink-0" />
                <a href="tel:+256700890123" className="hover:text-white font-bold">
                  +256 700 890 123 / +256 312 456 789
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-nature-secondary shrink-0" />
                <a href="mailto:info@naturewasteug.com" className="hover:text-white font-semibold">
                  info@naturewasteug.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-nature-secondary font-bold pt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>NEMA Licensed Waste Handler Uganda</span>
              </div>
            </div>
          </div>

          {/* Column 2: Residential Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Residential Services
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/pricing" className="hover:text-nature-secondary transition-colors">
                  Curbside Trash Pickup
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-nature-secondary transition-colors">
                  Household Recycling
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-nature-secondary transition-colors">
                  Yard &amp; Garden Compost
                </Link>
              </li>
              <li>
                <Link href="/pricing#calculator" className="hover:text-nature-secondary transition-colors">
                  Residential Cleanout Skips
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-nature-secondary transition-colors">
                  Color-Coded Sacks
                </Link>
              </li>
              <li>
                <Link href="/#schedule-finder" className="hover:text-nature-secondary transition-colors">
                  Neighborhood Pickup Days
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial & Industrial */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Commercial &amp; Skips
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/book-demo" className="hover:text-nature-secondary transition-colors">
                  Business Waste Pickup
                </Link>
              </li>
              <li>
                <Link href="/pricing#calculator" className="hover:text-nature-secondary transition-colors">
                  Front-Load Dumpsters (1.5m³)
                </Link>
              </li>
              <li>
                <Link href="/pricing#calculator" className="hover:text-nature-secondary transition-colors">
                  Roll-Off Skips (7m³ - 20m³)
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-nature-secondary transition-colors">
                  Industrial Park Waste (Namanve)
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-nature-secondary transition-colors">
                  Cardboard &amp; Scrap Metal
                </Link>
              </li>
              <li>
                <Link href="/book-demo" className="hover:text-nature-secondary transition-colors">
                  NEMA ESG Waste Audits
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Support & Portal */}
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/#schedule-finder" className="hover:text-nature-secondary transition-colors">
                  Pickup Schedule Finder
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-nature-secondary transition-colors">
                  Pay Bill (Mobile Money)
                </Link>
              </li>
              <li>
                <Link href="/portal" className="text-nature-secondary font-bold hover:text-white transition-colors">
                  Customer Web Portal
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-nature-secondary transition-colors">
                  Report Missed Pickup
                </Link>
              </li>
              <li>
                <Link href="/#recycling-guide" className="hover:text-nature-secondary transition-colors">
                  Uganda Recycling Guide
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-nature-secondary transition-colors">
                  GoGreenug Intelligence &amp; News
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            &copy; 2026 Nature Waste Management Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/features" className="hover:text-gray-300 transition-colors">
              NEMA Environmental Compliance
            </Link>
            <Link href="/pricing" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/portal" className="hover:text-gray-300 transition-colors">
              Client Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
