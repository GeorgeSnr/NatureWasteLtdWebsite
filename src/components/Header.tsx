"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ArrowRight, LayoutGrid, X, Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import Logo from "./Logo";
import SearchModal from "./SearchModal";

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/features" },
    { name: "Industries", href: "/industries" },
    { name: "Blog", href: "/blog" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      {/* Top Professional Utility Bar */}
      <div className="hidden md:block bg-[#141517] text-gray-300 text-xs py-2 px-6 sm:px-10 lg:px-16 border-b border-white/10 select-none">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-nature-secondary shrink-0" />
              <span>Kitende, Karl House, Room 9, Entebbe Road, Kampala, Uganda</span>
            </div>
            <div className="flex items-center gap-1.5 text-nature-secondary font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NEMA Registered &amp; Licensed Waste Handler</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="tel:+256700890123"
              className="flex items-center gap-1.5 hover:text-nature-secondary transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-nature-secondary" />
              <span>+256 700 890 123</span>
            </a>
            <a
              href="mailto:info@naturewasteug.com"
              className="flex items-center gap-1.5 hover:text-nature-secondary transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-nature-secondary" />
              <span>info@naturewasteug.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 flex items-center h-[76px] select-none shadow-xs">
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between h-full px-4 sm:px-8">
          {/* Logo container */}
          <div className="flex items-center">
            <Logo size="md" showTagline={false} />
          </div>

          {/* Navigation links (clean, decongested, no social links) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-[15px] font-bold transition-colors py-2 tracking-tight ${
                      isActive
                        ? "text-nature-primary border-b-2 border-nature-primary pb-1"
                        : "text-[#1B1D21] hover:text-nature-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right action buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-gray-700 hover:text-nature-primary hover:bg-gray-100 transition-colors rounded-full focus:outline-none cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5 stroke-[2.2]" />
            </button>

            {/* Live Client & Fleet Portal */}
            <Link
              href="/portal"
              className="hidden sm:inline-flex items-center gap-2 bg-white text-[#141517] border border-gray-300 hover:border-nature-primary hover:text-nature-primary px-4 py-2.5 font-bold text-[13px] transition-all duration-200 shadow-xs active:scale-95"
            >
              <span>Live Portal</span>
            </Link>

            {/* Book Demo / Pickup */}
            <Link
              href="/book-demo"
              className="inline-flex items-center gap-2 bg-nature-primary hover:bg-nature-primary-dark text-white px-5 py-2.5 font-bold text-[14px] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 group"
            >
              <span>Book Demo</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Navigation drawer toggle */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 text-gray-800 hover:text-nature-primary transition-colors focus:outline-none cursor-pointer"
              aria-label="Open Navigation Drawer"
            >
              <LayoutGrid className="w-6 h-6 stroke-[1.8]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Side Navigation Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-[#181A1C] text-white h-full shadow-2xl z-10 flex flex-col justify-between p-8 sm:p-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-8 border-b border-white/10">
                <Logo variant="dark" size="md" />
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Drawer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-8 space-y-4">
                <span className="text-xs uppercase font-extrabold tracking-widest text-nature-secondary">
                  Platform Navigation
                </span>
                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                      className="text-2xl font-black text-gray-200 hover:text-nature-secondary transition-colors py-1"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link
                    href="/portal"
                    onClick={() => setDrawerOpen(false)}
                    className="text-2xl font-black text-nature-secondary hover:text-white transition-colors py-1"
                  >
                    Client &amp; Fleet Portal
                  </Link>
                </nav>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <span className="text-xs uppercase font-extrabold tracking-widest text-gray-400">
                  Headquarters &amp; Licensing
                </span>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-nature-secondary shrink-0 mt-1" />
                    <span>Kitende, Karl House, Room 9, Entebbe Road, Kampala, Uganda</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-nature-secondary shrink-0" />
                    <span>Licensed under NEMA Uganda Regulations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-nature-secondary shrink-0" />
                    <a href="tel:+256700890123" className="hover:text-white font-semibold">
                      +256 700 890 123
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-nature-secondary shrink-0" />
                    <a href="mailto:info@naturewasteug.com" className="hover:text-white">
                      info@naturewasteug.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col gap-3">
              <Link
                href="/book-demo"
                onClick={() => setDrawerOpen(false)}
                className="w-full text-center bg-nature-primary hover:bg-nature-primary-dark text-white py-3.5 font-bold tracking-wide transition-all duration-200 shadow-md flex items-center justify-center gap-2"
              >
                <span>Book On-Site Waste Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                onClick={() => setDrawerOpen(false)}
                className="w-full text-center border border-white/20 hover:border-nature-secondary text-white py-3 font-bold tracking-wide transition-all duration-200"
              >
                <span>Start Free Trial</span>
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
