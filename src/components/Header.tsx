"use client";

import React, { useState, useEffect } from "react";
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
  ChevronRight,
  UserCheck,
  MapPin,
  Clock,
  Sparkles,
  Truck,
  Trash2,
  RefreshCw,
  Box,
  HelpCircle,
  FileText,
  Users,
  MessageSquare,
  Smartphone,
  Download,
} from "lucide-react";
import Logo from "./Logo";
import SearchModal from "./SearchModal";
import GooglePlayButton, { GooglePlayIcon } from "./GooglePlayButton";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const { currentUser, isAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Accordion state for mobile navigation categories
  const [mobileSections, setMobileSections] = useState<Record<string, boolean>>({
    residential: true,
    commercial: false,
    dumpsters: false,
    sustainability: false,
    company: false,
  });

  const toggleMobileSection = (key: string) => {
    setMobileSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll and handle escape key when drawer is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };

    if (drawerOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const residentialLinks = [
    { title: "Residential Garbage Pickup", desc: "Weekly scheduled curbside collection for homes & estates in Kampala and Wakiso", href: "/pricing" },
    { title: "Household Recycling", desc: "Color-coded sacks for plastics, cans, and clean paper recovery", href: "/#recycling-guide" },
    { title: "Yard & Garden Waste", desc: "Green waste removal & organic composting conversion in Kitende", href: "/features" },
    { title: "Bulk Trash & Cleanouts", desc: "Furniture, appliances, and large household item hauling", href: "/pricing" },
  ];

  const commercialLinks = [
    { title: "Commercial Waste Collection", desc: "Reliable schedules & containers for retail, dining, hotels & corporate offices", href: "/book-demo" },
    { title: "Industrial Roll-Off Skips", desc: "7m³ to 20m³ heavy-duty containers for factories & warehouses", href: "/pricing#calculator" },
    { title: "Commercial Trash Compactors", desc: "High-density balers and compactors to reduce pickup frequency", href: "/features" },
    { title: "NEMA Compliance & ESG Audits", desc: "Verifiable waste disposal certificates & chain-of-custody manifests", href: "/features" },
  ];

  const dumpsterLinks = [
    { title: "Residential Roll-Offs (7m³)", desc: "Ideal for estate renovations, garage cleanouts & landscaping", href: "/pricing#calculator" },
    { title: "Construction Skips (12m³ - 20m³)", desc: "Heavy demolition, brick, concrete, timber & scrap metal", href: "/pricing#calculator" },
    { title: "Interactive Sizing Guide", desc: "Compare container capacities from 120L wheelie bins to 20m³ skips", href: "/pricing#calculator" },
    { title: "Fast Kampala Delivery", desc: "Same-day dispatch to Kitende, Lubowa, Kololo, Naguru & Entebbe", href: "/#schedule-finder" },
  ];

  const sustainabilityLinks = [
    { title: "The GoGreenug Youth Initiative", desc: "How Ugandan environmentalists lead urban cleanups and community sorting", href: "/blog/gogreenug-youth-waste-solutions-kampala" },
    { title: "Circular Plastics Recovery", desc: "99.4% purity sorting and polymer pelletizing to reduce Lake Victoria pollution", href: "/blog/circular-economy-plastics-recovery-guide" },
    { title: "Uganda Waste Segregation Guide", desc: "Learn what goes into green, blue, yellow & black sacks", href: "/#recycling-guide" },
    { title: "NEMA Licensing & Standards", desc: "Full statutory compliance under Ugandan environmental regulations", href: "/#about-nema" },
  ];

  const companyLinks = [
    { title: "About Nature Waste", desc: "Our story, Ugandan roots, mission, and environmental vision", href: "/#about-nema" },
    { title: "Leadership & Values", desc: "Founded and operated by Ugandan youth environmental professionals", href: "/#about-nema" },
    { title: "Careers & Green Jobs", desc: "Join our Kampala dispatch, driver, mechanics, and sorting teams", href: "/#careers" },
    { title: "Customer Testimonials", desc: "Read verified feedback from residential & business clients across Uganda", href: "/#testimonials" },
  ];

  return (
    <>
      {/* Sticky Top Bar & Navigation Wrapper: Stays pinned to top on mobile and desktop */}
      <div className="sticky top-0 z-40 w-full bg-white shadow-xs">
        {/* 1. Top Utility Bar (Waste Connections 'navbar-clients' Pattern) */}
        <div className="bg-[#F8F9FA] text-[#363636] text-xs py-1.5 sm:py-2 px-3 sm:px-8 border-b border-[#E5E7EB] overflow-hidden">
          <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
            {/* Left Cluster: Location & NEMA Registration */}
            <div className="flex items-center gap-2 sm:gap-3 text-[#555C66] text-[11px] sm:text-xs">
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#006F51] shrink-0" />
                <span className="hidden lg:inline">Kitende, Karl House, Room 9, Entebbe Road, Kampala</span>
                <span className="hidden sm:inline lg:hidden">Kitende, Entebbe Rd, Kampala</span>
                <span className="sm:hidden">Kitende, Kampala</span>
              </div>
              <div className="hidden xl:flex items-center gap-1.5 text-[#006F51] font-semibold pl-2 border-l border-gray-300">
                <span className="w-2 h-2 rounded-full bg-[#006F51] animate-pulse" />
                <span>NEMA Licensed Waste Handler</span>
              </div>
            </div>

            {/* Right Clusters: Cleanly Grouped Customer & Management Links */}
            <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
              {/* Group 1: Schedule & Pay Bill */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/#schedule-finder"
                  className="flex items-center gap-1.5 text-gray-700 hover:text-[#006F51] font-medium transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#006F51]" />
                  <span>Pickup Schedule</span>
                </Link>

                <Link
                  href="/portal"
                  className="flex items-center gap-1.5 text-gray-700 hover:text-[#006F51] font-medium transition-colors"
                >
                  <CreditCard className="w-3.5 h-3.5 text-[#006F51]" />
                  <span>Pay Bill</span>
                </Link>
              </div>

              <div className="h-3.5 w-px bg-gray-300 hidden sm:block" />

              {/* Group 2: Support & Android App */}
              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href="tel:+256766532915"
                  className="hidden md:flex items-center gap-1.5 text-gray-700 hover:text-[#006F51] transition-colors"
                  title="24/7 Dispatch Hotline"
                >
                  <Phone className="w-3.5 h-3.5 text-[#006F51]" />
                  <span className="font-semibold">+256 766 532915</span>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.naturewaste.customer_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 transition-colors shrink-0 text-[10px] sm:text-[11px]"
                  title="Download NatureWaste Connect Android App"
                >
                  <GooglePlayIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Get App</span>
                </a>
              </div>

              <div className="h-3.5 w-px bg-gray-300 hidden sm:block" />

              {/* Group 3: Client Account & Admin Portal */}
              <div className="flex items-center gap-2">
                {isAuthenticated && currentUser ? (
                  <Link
                    href="/portal"
                    className="flex items-center gap-1.5 font-bold text-[#006F51] bg-[#E9F4F0] hover:bg-emerald-100/80 px-2.5 py-0.5 rounded border border-[#006F51]/20 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{currentUser.name.split(" ")[0]}</span>
                    <span className="hidden sm:inline text-[10px] uppercase font-black text-emerald-800 bg-emerald-200/60 px-1 rounded">
                      Account
                    </span>
                  </Link>
                ) : (
                  <Link
                    href="/portal"
                    className="flex items-center gap-1 font-semibold text-[#006F51] hover:text-[#004D38] transition-colors"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Client Sign In</span>
                  </Link>
                )}

                <Link
                  href="/admin"
                  className="hidden sm:flex items-center gap-1 font-bold text-gray-700 hover:text-[#006F51] transition-colors bg-white hover:bg-gray-100 px-2 py-0.5 rounded border border-gray-300 text-[10px] sm:text-[11px]"
                  title="Internal Operations & Dispatch Portal"
                >
                  <ShieldCheck className="w-3 h-3 text-[#006F51]" />
                  <span>Admin</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Main Sticky Pages Bar (Waste Connections 'navbar-pages' Pattern) */}
        <header className="bg-white border-b border-[#E5E7EB]">
          <div className="max-w-[1400px] mx-auto px-3 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo - compact on mobile so it never forces header overflow */}
          <Link href="/" className="shrink min-w-0 flex items-center">
            <div className="sm:hidden">
              <Logo variant="light" size="sm" showTagline={false} />
            </div>
            <div className="hidden sm:block">
              <Logo variant="light" size="md" showTagline={false} />
            </div>
          </Link>

          {/* Desktop Navigation Mega Menus */}
          <nav className="hidden xl:flex items-center gap-1 font-medium text-sm text-[#363636]">
            
            {/* Residential Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("residential")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 px-3 py-2 rounded-sm transition-colors ${
                  activeDropdown === "residential"
                    ? "text-[#006F51] bg-[#E9F4F0] font-semibold"
                    : "hover:text-[#006F51] hover:bg-gray-50"
                }`}
              >
                <span>Residential</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#006F51] transition-transform ${activeDropdown === "residential" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "residential" && (
                <div className="absolute top-full left-0 w-80 bg-white border border-[#D1D5DB] rounded-sm shadow-lg p-2 space-y-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006F51]">
                    Services for Home
                  </div>
                  {residentialLinks.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="block p-2.5 rounded-sm hover:bg-[#F4F9F6] transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-semibold text-sm text-[#212529] group-hover:text-[#006F51]">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">{item.desc}</div>
                    </Link>
                  ))}
                  <div className="pt-2 mt-1 border-t border-gray-100">
                    <Link
                      href="/pricing"
                      className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#006F51] hover:underline"
                    >
                      <span>View Residential Rates</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Commercial Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("commercial")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 px-3 py-2 rounded-sm transition-colors ${
                  activeDropdown === "commercial"
                    ? "text-[#006F51] bg-[#E9F4F0] font-semibold"
                    : "hover:text-[#006F51] hover:bg-gray-50"
                }`}
              >
                <span>Commercial</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#006F51] transition-transform ${activeDropdown === "commercial" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "commercial" && (
                <div className="absolute top-full left-0 w-80 bg-white border border-[#D1D5DB] rounded-sm shadow-lg p-2 space-y-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006F51]">
                    Services for Business
                  </div>
                  {commercialLinks.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="block p-2.5 rounded-sm hover:bg-[#F4F9F6] transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-semibold text-sm text-[#212529] group-hover:text-[#006F51]">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">{item.desc}</div>
                    </Link>
                  ))}
                  <div className="pt-2 mt-1 border-t border-gray-100">
                    <Link
                      href="/book-demo"
                      className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#006F51] hover:underline"
                    >
                      <span>Request Commercial Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Roll-Off Dumpsters Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("dumpsters")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 px-3 py-2 rounded-sm transition-colors ${
                  activeDropdown === "dumpsters"
                    ? "text-[#006F51] bg-[#E9F4F0] font-semibold"
                    : "hover:text-[#006F51] hover:bg-gray-50"
                }`}
              >
                <span>Roll-Off Dumpsters</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#006F51] transition-transform ${activeDropdown === "dumpsters" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "dumpsters" && (
                <div className="absolute top-full left-0 w-84 bg-white border border-[#D1D5DB] rounded-sm shadow-lg p-2 space-y-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006F51]">
                    Skip &amp; Container Rentals
                  </div>
                  {dumpsterLinks.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="block p-2.5 rounded-sm hover:bg-[#F4F9F6] transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-semibold text-sm text-[#212529] group-hover:text-[#006F51]">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">{item.desc}</div>
                    </Link>
                  ))}
                  <div className="pt-2 mt-1 border-t border-gray-100">
                    <Link
                      href="/pricing#calculator"
                      className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#006F51] hover:underline"
                    >
                      <span>Interactive Container Sizing Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sustainability Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("sustainability")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 px-3 py-2 rounded-sm transition-colors ${
                  activeDropdown === "sustainability"
                    ? "text-[#006F51] bg-[#E9F4F0] font-semibold"
                    : "hover:text-[#006F51] hover:bg-gray-50"
                }`}
              >
                <span>Sustainability</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#006F51] transition-transform ${activeDropdown === "sustainability" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "sustainability" && (
                <div className="absolute top-full left-0 w-84 bg-white border border-[#D1D5DB] rounded-sm shadow-lg p-2 space-y-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006F51]">
                    Green Uganda &amp; Circularity
                  </div>
                  {sustainabilityLinks.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="block p-2.5 rounded-sm hover:bg-[#F4F9F6] transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-semibold text-sm text-[#212529] group-hover:text-[#006F51]">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("company")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 px-3 py-2 rounded-sm transition-colors ${
                  activeDropdown === "company"
                    ? "text-[#006F51] bg-[#E9F4F0] font-semibold"
                    : "hover:text-[#006F51] hover:bg-gray-50"
                }`}
              >
                <span>About Us</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#006F51] transition-transform ${activeDropdown === "company" ? "rotate-180" : ""}`} />
              </button>

              {activeDropdown === "company" && (
                <div className="absolute top-full right-0 w-80 bg-white border border-[#D1D5DB] rounded-sm shadow-lg p-2 space-y-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006F51]">
                    Our Ugandan Company
                  </div>
                  {companyLinks.map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="block p-2.5 rounded-sm hover:bg-[#F4F9F6] transition-colors group"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="font-semibold text-sm text-[#212529] group-hover:text-[#006F51]">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </nav>

          {/* Right: Phone link & High-Visibility Yellow CTA Button (Waste Connections signature) */}
          <div className="flex items-center gap-3">
            {/* Phone Number Callout */}
            <a
              href="tel:+256766532915"
              className="hidden lg:flex items-center gap-2 text-xs font-bold text-[#006F51] hover:text-[#004D38] px-3 py-2 rounded-sm hover:bg-gray-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#006F51]" />
              <span>+256 766 532915</span>
            </a>

            {/* Search Icon Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-[#006F51] hover:bg-gray-100 rounded-sm transition-colors"
              aria-label="Search site"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Signature Waste Connections Yellow Button: "Get Prices" */}
            <Link
              href="/#schedule-finder"
              className="bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] font-bold text-[11px] sm:text-xs uppercase tracking-wider px-2.5 sm:px-6 py-1.5 sm:py-2.5 rounded transition-colors shrink-0"
            >
              Get Prices
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDrawerOpen((prev) => !prev);
              }}
              className="xl:hidden p-1.5 sm:p-2 text-gray-700 hover:text-[#006F51] hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? <X className="w-6 h-6 text-[#006F51]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
    </div>

      {/* 3. Full Mobile Navigation Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 transition-opacity backdrop-blur-xs"
            onClick={(e) => {
              e.stopPropagation();
              setDrawerOpen(false);
            }}
            aria-hidden="true"
          />

          {/* Drawer Sliding Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div
              className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 1. Drawer Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-20">
                <Logo variant="light" size="sm" showTagline={false} />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-[#006F51] rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close Navigation Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 2. Top Utility Bar Highlights on Mobile */}
              <div className="px-4 py-2 bg-[#F8F9FA] border-b border-gray-200 flex items-center justify-between text-xs text-[#555C66]">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#006F51] shrink-0" />
                  <span>Kitende, Entebbe Rd</span>
                </div>
                <div className="flex items-center gap-1 text-[#006F51] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>NEMA Licensed</span>
                </div>
              </div>

              {/* 3. Primary CTA Actions */}
              <div className="p-4 border-b border-gray-100 bg-white space-y-2">
                <Link
                  href="/#schedule-finder"
                  onClick={() => setDrawerOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] font-bold text-xs uppercase tracking-wider py-3 px-4 rounded transition-colors shadow-xs text-center"
                >
                  <span>Get Prices &amp; Start Service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+256766532915"
                    className="flex items-center justify-center gap-1.5 border border-[#006F51] text-[#006F51] hover:bg-[#E9F4F0] font-bold text-[11px] uppercase tracking-wider py-2 px-2.5 rounded transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Us</span>
                  </a>
                  <a
                    href="https://wa.me/256766532915"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[11px] uppercase tracking-wider py-2 px-2.5 rounded transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* 4. Quick Customer Action Tiles (Top Utility Bar items) */}
              <div className="p-4 border-b border-gray-200 bg-gray-50/80 space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Customer Self-Service
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Link
                    href="/portal"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded border border-emerald-100 bg-[#E9F4F0] text-[#006F51] font-semibold hover:bg-emerald-100/60 transition-colors"
                  >
                    <CreditCard className="w-4 h-4 shrink-0 text-[#006F51]" />
                    <span>Pay My Bill</span>
                  </Link>
                  <Link
                    href="/#schedule-finder"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded border border-emerald-100 bg-[#E9F4F0] text-[#006F51] font-semibold hover:bg-emerald-100/60 transition-colors"
                  >
                    <Calendar className="w-4 h-4 shrink-0 text-[#006F51]" />
                    <span>Pickup Schedule</span>
                  </Link>
                  <Link
                    href="/#schedule-finder"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-[#006F51]" />
                    <span>Missed Pickup</span>
                  </Link>
                  <Link
                    href="/portal"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    <UserCheck className="w-4 h-4 shrink-0 text-[#006F51]" />
                    <span>Client Portal</span>
                  </Link>
                </div>

                {/* NatureWaste Connect Google Play App Download Card */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.naturewaste.customer_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-black hover:to-gray-900 transition-all border border-gray-700 shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-white/20 transition-colors">
                      <GooglePlayIcon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">
                        Official Android App
                      </span>
                      <span className="text-xs font-bold leading-snug">
                        NatureWaste Connect
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-white bg-[#006F51] hover:bg-[#008763] px-2.5 py-1.5 rounded transition-colors shrink-0">
                    <span>Install</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </a>
              </div>

              {/* 5. Main Top Bar Menu Categories (Accordion Navigation) */}
              <div className="p-4 space-y-3 flex-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Navigation Menu
                </div>

                {/* Section 1: Residential */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection("residential")}
                    className="w-full flex items-center justify-between p-3 text-left font-bold text-sm text-[#212529] hover:bg-gray-50 bg-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#006F51]" />
                      <span>Residential Services</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        mobileSections.residential ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileSections.residential && (
                    <div className="bg-[#F8F9FA] p-2 space-y-1 border-t border-gray-100">
                      {residentialLinks.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setDrawerOpen(false)}
                          className="block p-2 rounded text-xs text-gray-700 hover:text-[#006F51] hover:bg-white transition-colors"
                        >
                          <div className="font-semibold">{item.title}</div>
                          <div className="text-[11px] text-gray-500 line-clamp-1">{item.desc}</div>
                        </Link>
                      ))}
                      <div className="pt-2 mt-1 border-t border-gray-200">
                        <Link
                          href="/pricing"
                          onClick={() => setDrawerOpen(false)}
                          className="flex items-center justify-between px-2 py-1 text-xs font-bold text-[#006F51] hover:underline"
                        >
                          <span>View Residential Rates</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 2: Commercial */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection("commercial")}
                    className="w-full flex items-center justify-between p-3 text-left font-bold text-sm text-[#212529] hover:bg-gray-50 bg-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#006F51]" />
                      <span>Commercial Services</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        mobileSections.commercial ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileSections.commercial && (
                    <div className="bg-[#F8F9FA] p-2 space-y-1 border-t border-gray-100">
                      {commercialLinks.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setDrawerOpen(false)}
                          className="block p-2 rounded text-xs text-gray-700 hover:text-[#006F51] hover:bg-white transition-colors"
                        >
                          <div className="font-semibold">{item.title}</div>
                          <div className="text-[11px] text-gray-500 line-clamp-1">{item.desc}</div>
                        </Link>
                      ))}
                      <div className="pt-2 mt-1 border-t border-gray-200">
                        <Link
                          href="/book-demo"
                          onClick={() => setDrawerOpen(false)}
                          className="flex items-center justify-between px-2 py-1 text-xs font-bold text-[#006F51] hover:underline"
                        >
                          <span>Request Commercial Quote</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 3: Roll-Off Dumpsters */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection("dumpsters")}
                    className="w-full flex items-center justify-between p-3 text-left font-bold text-sm text-[#212529] hover:bg-gray-50 bg-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#006F51]" />
                      <span>Roll-Off Dumpsters</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        mobileSections.dumpsters ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileSections.dumpsters && (
                    <div className="bg-[#F8F9FA] p-2 space-y-1 border-t border-gray-100">
                      {dumpsterLinks.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setDrawerOpen(false)}
                          className="block p-2 rounded text-xs text-gray-700 hover:text-[#006F51] hover:bg-white transition-colors"
                        >
                          <div className="font-semibold">{item.title}</div>
                          <div className="text-[11px] text-gray-500 line-clamp-1">{item.desc}</div>
                        </Link>
                      ))}
                      <div className="pt-2 mt-1 border-t border-gray-200">
                        <Link
                          href="/pricing#calculator"
                          onClick={() => setDrawerOpen(false)}
                          className="flex items-center justify-between px-2 py-1 text-xs font-bold text-[#006F51] hover:underline"
                        >
                          <span>Interactive Container Calculator</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section 4: Sustainability */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection("sustainability")}
                    className="w-full flex items-center justify-between p-3 text-left font-bold text-sm text-[#212529] hover:bg-gray-50 bg-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#006F51]" />
                      <span>Sustainability &amp; GoGreenug</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        mobileSections.sustainability ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileSections.sustainability && (
                    <div className="bg-[#F8F9FA] p-2 space-y-1 border-t border-gray-100">
                      {sustainabilityLinks.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setDrawerOpen(false)}
                          className="block p-2 rounded text-xs text-gray-700 hover:text-[#006F51] hover:bg-white transition-colors"
                        >
                          <div className="font-semibold">{item.title}</div>
                          <div className="text-[11px] text-gray-500 line-clamp-1">{item.desc}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section 5: Company & About Us */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleMobileSection("company")}
                    className="w-full flex items-center justify-between p-3 text-left font-bold text-sm text-[#212529] hover:bg-gray-50 bg-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#006F51]" />
                      <span>About Us &amp; Company</span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        mobileSections.company ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileSections.company && (
                    <div className="bg-[#F8F9FA] p-2 space-y-1 border-t border-gray-100">
                      {companyLinks.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setDrawerOpen(false)}
                          className="block p-2 rounded text-xs text-gray-700 hover:text-[#006F51] hover:bg-white transition-colors"
                        >
                          <div className="font-semibold">{item.title}</div>
                          <div className="text-[11px] text-gray-500 line-clamp-1">{item.desc}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* 6. Direct Main Page Links */}
                <div className="pt-3 border-t border-gray-200 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Core Site Pages
                  </div>
                  <Link
                    href="/features"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between py-2 px-2.5 rounded hover:bg-gray-50 text-sm font-medium text-gray-800 hover:text-[#006F51] transition-colors"
                  >
                    <span>All Features &amp; Smart Tech</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href="/industries"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between py-2 px-2.5 rounded hover:bg-gray-50 text-sm font-medium text-gray-800 hover:text-[#006F51] transition-colors"
                  >
                    <span>Industries We Serve</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href="/pricing"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between py-2 px-2.5 rounded hover:bg-gray-50 text-sm font-medium text-gray-800 hover:text-[#006F51] transition-colors"
                  >
                    <span>Rates &amp; Skip Calculator</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between py-2 px-2.5 rounded hover:bg-gray-50 text-sm font-medium text-gray-800 hover:text-[#006F51] transition-colors"
                  >
                    <span>Circular Economy Blog</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href="/#contact"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between py-2 px-2.5 rounded hover:bg-gray-50 text-sm font-medium text-gray-800 hover:text-[#006F51] transition-colors"
                  >
                    <span>Contact &amp; Customer Care</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>
              </div>

              {/* 7. Mobile Footer Contact Card */}
              <div className="p-4 border-t border-gray-200 bg-[#F8F9FA] space-y-2 text-xs text-gray-600">
                <a
                  href="tel:+256766532915"
                  className="flex items-center gap-2 font-bold text-[#006F51]"
                >
                  <Phone className="w-4 h-4 text-[#006F51]" />
                  <span>Call Dispatch: +256 766 532915</span>
                </a>
                <div className="flex items-start gap-2 text-gray-500">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
                  <span>Kitende, Karl House, Room 9, Entebbe Road, Kampala</span>
                </div>
                <div className="text-[11px] text-gray-500 pt-1 border-t border-gray-200 flex items-center justify-between">
                  <span>Licensed by NEMA Uganda</span>
                  <span className="font-semibold text-[#006F51]">Mon – Sat: 7am – 6pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
