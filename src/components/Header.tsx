"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ArrowRight,
  Menu,
  X,
  Phone,
  Calendar,
  CreditCard,
  AlertCircle,
  ShieldCheck,
  ChevronDown,
  UserCheck,
  MapPin,
  Clock,
  Sparkles,
  Truck,
  Trash2,
  RefreshCw,
  Box,
} from "lucide-react";
import Logo from "./Logo";
import SearchModal from "./SearchModal";

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const residentialLinks = [
    { title: "Residential Garbage Pickup", desc: "Weekly scheduled curbside collection for homes & estates", href: "/pricing" },
    { title: "Household Recycling", desc: "Segregated collection of plastics, cans, and paper", href: "/features" },
    { title: "Yard & Garden Waste", desc: "Green waste removal & organic composting conversion", href: "/features" },
    { title: "Bulk Trash & Cleanouts", desc: "Furniture, appliances, and large household item hauling", href: "/pricing" },
  ];

  const commercialLinks = [
    { title: "Commercial Waste Collection", desc: "Reliable schedules & bins for retail, dining & corporate", href: "/book-demo" },
    { title: "Industrial Roll-Off Skips", desc: "7m³ to 20m³ heavy-duty containers for factories", href: "/pricing#calculator" },
    { title: "Office Paper & Recyclables", desc: "Secure document destruction & cardboard baling", href: "/features" },
    { title: "NEMA Compliance & ESG Audits", desc: "Verifiable waste disposal certificates & manifests", href: "/features" },
  ];

  const dumpsterLinks = [
    { title: "Roll-Off Dumpsters (7m³)", desc: "Ideal for residential cleanouts & landscaping", href: "/pricing#calculator" },
    { title: "Construction Skips (12m³ - 20m³)", desc: "Heavy demolition, brick, concrete & steel", href: "/pricing#calculator" },
    { title: "Interactive Sizing Guide", desc: "Compare container volumes and pick your perfect size", href: "/pricing#calculator" },
    { title: "Fast Kampala Delivery", desc: "Same-day dispatch to Kitende, Lubowa, Kololo & beyond", href: "/#schedule-finder" },
  ];

  const sustainabilityLinks = [
    { title: "The GoGreenug Youth Initiative", desc: "How Ugandan environmentalists lead urban cleanups", href: "/blog/gogreenug-youth-waste-solutions-kampala" },
    { title: "Circular Plastics Recovery", desc: "99.4% purity sorting and polymer pelletizing", href: "/blog/circular-economy-plastics-recovery-guide" },
    { title: "Uganda Waste Segregation Guide", desc: "Learn what goes into green, blue, yellow & black sacks", href: "/#recycling-guide" },
    { title: "NEMA Licensing & Standards", desc: "Full statutory compliance under Ugandan environmental law", href: "/#about-nema" },
  ];

  return (
    <>
      {/* 1. Top Utility Bar (Waste Connections Customer Care Pattern) */}
      <div className="bg-[#121416] text-gray-300 text-xs py-2 px-4 sm:px-8 border-b border-white/10 select-none">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Location & NEMA Badge */}
          <div className="flex items-center gap-4 text-gray-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-nature-secondary shrink-0" />
              <span className="hidden sm:inline">Kitende, Karl House, Room 9, Entebbe Road, Kampala</span>
              <span className="sm:hidden">Kitende, Kampala</span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 text-nature-secondary font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NEMA Registered &amp; Licensed</span>
            </div>
          </div>

          {/* Right: Quick Self-Service Links */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <Link
              href="/#schedule-finder"
              className="flex items-center gap-1.5 hover:text-nature-secondary transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-nature-secondary" />
              <span className="font-medium">Pickup Schedule</span>
            </Link>

            <Link
              href="/portal"
              className="hidden lg:flex items-center gap-1.5 hover:text-nature-secondary transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5 text-nature-secondary" />
              <span>Pay Bill</span>
            </Link>

            <Link
              href="/#contact"
              className="hidden md:flex items-center gap-1.5 hover:text-nature-secondary transition-colors"
            >
              <AlertCircle className="w-3.5 h-3.5 text-nature-secondary" />
              <span>Missed Pickup?</span>
            </Link>

            <a
              href="tel:+256700890123"
              className="flex items-center gap-1.5 font-bold text-white hover:text-nature-secondary transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-nature-secondary" />
              <span>+256 700 890 123</span>
            </a>

            <div className="h-3 w-px bg-white/20 hidden sm:block" />

            <Link
              href="/portal"
              className="hidden sm:flex items-center gap-1.5 text-nature-secondary hover:text-white font-bold transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>My Account</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-xs select-none">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-[76px] flex items-center justify-between">
          {/* Logo with Real Emblem from logo1.jpg */}
          <div className="flex items-center">
            <Logo size="md" showTagline={false} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {/* Residential Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("residential")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-[14.5px] font-bold text-[#141517] hover:text-nature-primary transition-colors cursor-pointer">
                <span>Residential</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {activeDropdown === "residential" && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50 transition-all">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-nature-primary px-3 py-1 mb-1">
                    Home &amp; Estate Services
                  </div>
                  {residentialLinks.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="font-bold text-sm text-[#141517] group-hover:text-nature-primary flex items-center justify-between">
                        <span>{item.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Commercial Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("commercial")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-[14.5px] font-bold text-[#141517] hover:text-nature-primary transition-colors cursor-pointer">
                <span>Commercial</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {activeDropdown === "commercial" && (
                <div className="absolute top-full left-0 w-84 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50 transition-all">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-nature-primary px-3 py-1 mb-1">
                    Business &amp; Industrial Solutions
                  </div>
                  {commercialLinks.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="font-bold text-sm text-[#141517] group-hover:text-nature-primary flex items-center justify-between">
                        <span>{item.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Dumpster Rental Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("dumpster")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-[14.5px] font-bold text-[#141517] hover:text-nature-primary transition-colors cursor-pointer">
                <span>Dumpsters &amp; Skips</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {activeDropdown === "dumpster" && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50 transition-all">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-nature-primary px-3 py-1 mb-1">
                    Roll-Off Containers &amp; Skips
                  </div>
                  {dumpsterLinks.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="font-bold text-sm text-[#141517] group-hover:text-nature-primary flex items-center justify-between">
                        <span>{item.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sustainability & Policy */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("sustainability")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1.5 px-3.5 py-2 text-[14.5px] font-bold text-[#141517] hover:text-nature-primary transition-colors cursor-pointer">
                <span>Sustainability</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {activeDropdown === "sustainability" && (
                <div className="absolute top-full left-0 w-84 bg-white rounded-xl shadow-2xl border border-gray-100 p-3 z-50 transition-all">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-nature-primary px-3 py-1 mb-1">
                    GoGreenug &amp; Environmental Protection
                  </div>
                  {sustainabilityLinks.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="font-bold text-sm text-[#141517] group-hover:text-nature-primary flex items-center justify-between">
                        <span>{item.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link
              href="/#schedule-finder"
              className="px-3.5 py-2 text-[14.5px] font-bold text-[#141517] hover:text-nature-primary transition-colors"
            >
              Schedules
            </Link>

            <Link
              href="/#contact"
              className="px-3.5 py-2 text-[14.5px] font-bold text-[#141517] hover:text-nature-primary transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-700 hover:text-nature-primary hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Client Portal Button */}
            <Link
              href="/portal"
              className="hidden sm:inline-flex items-center gap-2 border border-gray-300 hover:border-nature-primary hover:text-nature-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#141517] rounded-md transition-colors shadow-2xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-nature-primary" />
              <span>Customer Portal</span>
            </Link>

            {/* Waste Connections Primary Quote CTA */}
            <Link
              href="/#schedule-finder"
              className="inline-flex items-center gap-2 bg-nature-primary hover:bg-nature-primary-dark text-white px-5 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md shadow-md hover:shadow-lg transition-all active:scale-95 group"
            >
              <span>Get Prices</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Mobile Drawer Hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 text-gray-800 hover:text-nature-primary rounded-md xl:hidden cursor-pointer"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Mobile Navigation Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-2xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          <div className="relative w-full max-w-md bg-[#181A1C] text-white h-full shadow-2xl z-10 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
            <div>
              {/* Top Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <Logo variant="dark" size="md" />
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Drawer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="py-6 space-y-5">
                <div>
                  <div className="text-xs uppercase font-extrabold tracking-widest text-nature-secondary mb-2">
                    Services
                  </div>
                  <div className="space-y-2">
                    <Link
                      href="/pricing"
                      onClick={() => setDrawerOpen(false)}
                      className="block text-lg font-bold text-gray-200 hover:text-nature-secondary transition-colors"
                    >
                      Residential Waste Pickup
                    </Link>
                    <Link
                      href="/book-demo"
                      onClick={() => setDrawerOpen(false)}
                      className="block text-lg font-bold text-gray-200 hover:text-nature-secondary transition-colors"
                    >
                      Commercial Dumpsters
                    </Link>
                    <Link
                      href="/pricing#calculator"
                      onClick={() => setDrawerOpen(false)}
                      className="block text-lg font-bold text-gray-200 hover:text-nature-secondary transition-colors"
                    >
                      Roll-Off Skip Rental
                    </Link>
                    <Link
                      href="/features"
                      onClick={() => setDrawerOpen(false)}
                      className="block text-lg font-bold text-gray-200 hover:text-nature-secondary transition-colors"
                    >
                      Plastics &amp; Metal Recycling
                    </Link>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-nature-secondary mb-2">
                    Self-Service &amp; Account
                  </div>
                  <div className="space-y-2">
                    <Link
                      href="/#schedule-finder"
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center gap-2 text-base text-gray-200 hover:text-white"
                    >
                      <Calendar className="w-4 h-4 text-nature-secondary" />
                      <span>Check Pickup Schedule</span>
                    </Link>
                    <Link
                      href="/portal"
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center gap-2 text-base text-gray-200 hover:text-white"
                    >
                      <CreditCard className="w-4 h-4 text-nature-secondary" />
                      <span>Pay My Bill / Mobile Money</span>
                    </Link>
                    <Link
                      href="/portal"
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center gap-2 text-base text-gray-200 hover:text-white"
                    >
                      <UserCheck className="w-4 h-4 text-nature-secondary" />
                      <span>Client &amp; Fleet Operations Portal</span>
                    </Link>
                    <Link
                      href="/#contact"
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center gap-2 text-base text-gray-200 hover:text-white"
                    >
                      <AlertCircle className="w-4 h-4 text-nature-secondary" />
                      <span>Report Missed Pickup</span>
                    </Link>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-gray-400 space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-nature-secondary shrink-0 mt-0.5" />
                    <span>Kitende, Karl House, Room 9, Entebbe Road, Kampala, Uganda</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-nature-secondary shrink-0" />
                    <a href="tel:+256700890123" className="text-white font-bold">
                      +256 700 890 123
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-nature-secondary shrink-0" />
                    <span>NEMA Licensed Waste Handler</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Drawer CTA */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <Link
                href="/#schedule-finder"
                onClick={() => setDrawerOpen(false)}
                className="w-full text-center bg-nature-primary hover:bg-nature-primary-dark text-white py-3 rounded-md font-bold uppercase tracking-wider text-xs shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <span>Get Prices &amp; Start Service</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
