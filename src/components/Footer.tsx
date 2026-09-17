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
  MessageSquare,
  Smartphone,
} from "lucide-react";
import Logo from "./Logo";
import GooglePlayButton, { GooglePlayIcon } from "./GooglePlayButton";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1A2026] text-white select-none overflow-hidden">
      
      {/* 1. Top Pre-Footer Callout Bar (Waste Connections Pattern) */}
      <div className="bg-[#14191E] border-b border-white/10 py-8 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-10 h-10 rounded-sm bg-[#006F51] text-white flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
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
              href="tel:+256766532915"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded transition-colors"
            >
              Call: +256 766 532915
            </a>
            <Link
              href="/#schedule-finder"
              className="bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded transition-colors flex items-center gap-2"
            >
              <span>Get Prices &amp; Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <GooglePlayButton variant="outline" size="sm" />
          </div>
        </div>
      </div>

      {/* 2. Main 5-Column Navigation Grid (Exact Waste Connections sec_footer-main) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Column 1: Customer Support */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/portal" className="hover:text-[#FFCE00] transition-colors">
                  Pay My Bill
                </Link>
              </li>
              <li>
                <Link href="/#schedule-finder" className="hover:text-[#FFCE00] transition-colors">
                  Pickup Schedule
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#FFCE00] transition-colors">
                  Broken Container Request
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#FFCE00] transition-colors">
                  Report Missed Pickup
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#FFCE00] transition-colors">
                  Change Address / Moving
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#FFCE00] transition-colors">
                  Contact Customer Care
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#FFCE00] transition-colors font-bold text-gray-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#006F51]" />
                  <span>Admin &amp; Dispatch Portal</span>
                </Link>
              </li>
              <li className="pt-1.5">
                <a
                  href="https://play.google.com/store/apps/details?id=com.naturewaste.customer_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                >
                  <GooglePlayIcon className="w-3.5 h-3.5" />
                  <span>NatureWaste Connect (Android)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Residential Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Residential Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/pricing" className="hover:text-[#FFCE00] transition-colors">
                  Trash Pickup Service
                </Link>
              </li>
              <li>
                <Link href="/#recycling-guide" className="hover:text-[#FFCE00] transition-colors">
                  Recycling Service
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#FFCE00] transition-colors">
                  Bulk Trash Pickup
                </Link>
              </li>
              <li>
                <Link href="/pricing#calculator" className="hover:text-[#FFCE00] transition-colors">
                  Residential Dumpster Rental
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#FFCE00] transition-colors">
                  Yard Waste &amp; Composting
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#FFCE00] transition-colors">
                  Electronic Waste Disposal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Commercial Services
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/book-demo" className="hover:text-[#FFCE00] transition-colors">
                  Business Waste Management
                </Link>
              </li>
              <li>
                <Link href="/pricing#calculator" className="hover:text-[#FFCE00] transition-colors">
                  Roll Off Dumpster Rental
                </Link>
              </li>
              <li>
                <Link href="/book-demo" className="hover:text-[#FFCE00] transition-colors">
                  Commercial Recycling
                </Link>
              </li>
              <li>
                <Link href="/pricing#calculator" className="hover:text-[#FFCE00] transition-colors">
                  Dumpster &amp; Skip Sizes
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#FFCE00] transition-colors">
                  Trash Compactors &amp; Balers
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#FFCE00] transition-colors">
                  NEMA Compliance Audits
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/#about-nema" className="hover:text-[#FFCE00] transition-colors">
                  About Nature Waste
                </Link>
              </li>
              <li>
                <Link href="/#about-nema" className="hover:text-[#FFCE00] transition-colors">
                  Leadership &amp; Values
                </Link>
              </li>
              <li>
                <Link href="/blog/gogreenug-youth-waste-solutions-kampala" className="hover:text-[#FFCE00] transition-colors">
                  GoGreenug Youth Initiative
                </Link>
              </li>
              <li>
                <Link href="/#careers" className="hover:text-[#FFCE00] transition-colors">
                  Careers in Uganda
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-[#FFCE00] transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#FFCE00] transition-colors">
                  News &amp; Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: More Info & Headquarters */}
          <div className="space-y-4 col-span-2 sm:col-span-1">
            <h4 className="text-xs font-black uppercase tracking-wider text-white border-b border-white/10 pb-2">
              Kampala Headquarters
            </h4>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFCE00] shrink-0 mt-0.5" />
                <span>Kitende, Karl House, Room 9, Entebbe Road, Kampala</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFCE00] shrink-0" />
                <a href="tel:+256766532915" className="hover:text-white font-semibold">
                  +256 766 532915
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/256766532915"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] font-semibold"
                >
                  WhatsApp: +256 766 532915
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFCE00] shrink-0" />
                <a href="mailto:info@naturewasteug.com" className="hover:text-white">
                  info@naturewasteug.com
                </a>
              </div>
              <div className="pt-2">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#FFCE00] bg-white/5 border border-white/10 px-2.5 py-1 rounded-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>NEMA Lic #WM/2024/098</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Middle Action Row with Logo & Buttons (Waste Connections footer-main_bottom-row) */}
        <div className="pt-10 mt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <Logo variant="dark" size="md" showTagline />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <GooglePlayButton variant="light" size="sm" />
            <Link
              href="/#schedule-finder"
              className="bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded transition-colors"
            >
              Start Service
            </Link>
            <Link
              href="/book-demo"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded transition-colors"
            >
              Request Quote
            </Link>
          </div>
        </div>

        {/* 4. Bottom Legal Copyright Bar */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} Nature Waste Management Limited. All rights reserved. Registered in the Republic of Uganda.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
            <span>&bull;</span>
            <Link href="/#about-nema" className="hover:text-gray-300 transition-colors">
              NEMA Statutory Notice
            </Link>
            <span>&bull;</span>
            <Link href="/admin" className="hover:text-[#FFCE00] transition-colors font-semibold text-gray-400">
              Staff Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
