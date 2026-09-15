"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ArrowRight, LayoutGrid, X, Phone, Mail, MapPin } from "lucide-react";
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
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 flex items-center h-[80px] select-none shadow-xs">
        <div className="w-full flex items-center justify-between h-full">
          {/* Logo container */}
          <div className="h-full bg-[#F3F3F5] w-[220px] sm:w-[250px] lg:w-[280px] flex items-center px-6 border-r border-gray-200/60 shrink-0">
            <Logo size="md" />
          </div>

          {/* Nav & Utilities container */}
          <div className="flex-1 flex items-center justify-between h-full px-4 lg:px-8">
            <div className="flex items-center gap-6 lg:gap-10">
              {/* Social links (desktop only) */}
              <div className="hidden xl:flex items-center gap-3.5 text-[#555A64] text-xs font-semibold pr-6 border-r border-gray-200/80">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-nature-primary transition-colors p-1"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-nature-primary transition-colors p-1"
                  aria-label="Facebook"
                >
                  <span className="font-bold text-[13px] leading-none">f</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-nature-primary transition-colors p-1"
                  aria-label="LinkedIn"
                >
                  <span className="font-bold text-[12px] leading-none">in</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-nature-primary transition-colors p-1"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-3.5 h-3.5 fill-none stroke-current stroke-[2]"
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>

              {/* Navigation links */}
              <nav className="hidden lg:flex items-center gap-7">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <div key={link.name}>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-1 text-[15px] font-bold transition-colors py-2 ${
                          isActive
                            ? "text-nature-primary"
                            : "text-[#1B1D21] hover:text-nature-primary"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Right action buttons */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Search trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-800 hover:text-nature-primary transition-colors rounded-full focus:outline-none cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-5 h-5 stroke-[2.2]" />
              </button>

              {/* Client Portal / Free Trial */}
              <Link
                href="/portal"
                className="hidden sm:inline-flex items-center gap-2.5 bg-white text-[#141517] border border-gray-200 hover:border-nature-primary hover:text-nature-primary px-4 sm:px-5 py-3 font-bold text-[14px] transition-all duration-200 shadow-xs hover:shadow-md active:scale-95"
              >
                <span>Live Portal</span>
              </Link>

              {/* Book Demo / Pickup */}
              <Link
                href="/book-demo"
                className="hidden sm:inline-flex items-center gap-2.5 bg-nature-primary hover:bg-nature-primary-dark text-white px-5 sm:px-6 py-3 font-bold text-[15px] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 group"
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
                  Navigation
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
                    Client & Operations Portal
                  </Link>
                </nav>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <span className="text-xs uppercase font-extrabold tracking-widest text-gray-400">
                  Contact Office
                </span>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-nature-secondary shrink-0" />
                    <span>Plot 18, Industrial Area, 7th Street, Kampala</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-nature-secondary shrink-0" />
                    <a href="tel:+256700890123" className="hover:text-white">
                      +256 700 890 123 / +256 312 456 789
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-nature-secondary shrink-0" />
                    <a href="mailto:info@naturewaste.co" className="hover:text-white">
                      info@naturewaste.co
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col gap-3">
              <Link
                href="/book-demo"
                onClick={() => setDrawerOpen(false)}
                className="w-full text-center bg-nature-primary hover:bg-nature-primary-dark text-white py-4 font-bold tracking-wide transition-all duration-200 shadow-md flex items-center justify-center gap-2"
              >
                <span>Book Live Demonstration</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                onClick={() => setDrawerOpen(false)}
                className="w-full text-center border border-white/20 hover:border-nature-secondary text-white py-3.5 font-bold tracking-wide transition-all duration-200"
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
