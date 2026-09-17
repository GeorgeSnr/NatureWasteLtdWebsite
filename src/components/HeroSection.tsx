"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Trash2,
  Phone,
  Clock,
  Sparkles,
  Building2,
  Home as HomeIcon,
  Box,
  CreditCard,
  AlertCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { GooglePlayIcon } from "./GooglePlayButton";

// Real waste management operational imagery from Entebbe & Uganda
const entebbeWasteSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
    title: "Curbside Collection Compactor Truck",
    location: "Entebbe Road Corridor & Kitende",
    tag: "Daily Route Active",
    desc: "Clean hydraulic compactor trucks collecting domestic and estate refuse along Entebbe highway.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1200&q=80",
    title: "Kitende Waste Sorting & Baling Facility",
    location: "Karl House Depot, Kitende",
    tag: "Circular Resource Recovery",
    desc: "Sorting post-consumer PET bottles and cardboard into dense bales for industrial reuse.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?auto=format&fit=crop&w=1200&q=80",
    title: "Heavy Roll-Off Skips (7m³ - 20m³)",
    location: "Entebbe Town & Commercial Sites",
    tag: "Same-Day Delivery",
    desc: "Heavy-duty steel skip rentals for commercial businesses, hotel renovations, and residential cleanouts.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=1200&q=80",
    title: "Gated Estate Residential Collection",
    location: "Lubowa, Kigo & Entebbe Estates",
    tag: "Curbside Segregation Sacks",
    desc: "Scheduled weekly odor-free trash and color-coded recycling sack pickups for households.",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    title: "Lake Victoria Watershed Conservation",
    location: "GoGreenug Youth Initiative, Entebbe",
    tag: "Eco-Stewardship",
    desc: "Youth-led community environmental initiatives safeguarding wetland ecosystems and clean water.",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);

  // Auto-advance carousel every 4.5 seconds when not hovered and not manually paused
  useEffect(() => {
    if (isPaused || isManuallyPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % entebbeWasteSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, isManuallyPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? entebbeWasteSlides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % entebbeWasteSlides.length);
  };

  const active = entebbeWasteSlides[currentSlide];

  return (
    <section className="relative w-full bg-[#F8F9FA] text-[#212529] select-none border-b border-[#E5E7EB]">
      {/* Main Container with refined spacing above the fold */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Authoritative Clean Copy & Waste Connections Action Buttons */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Main Headline matching Waste Connections typography */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black text-[#1A1D20] leading-[1.15] tracking-tight">
              Reliable Garbage Pickup &amp; Waste Solutions
            </h1>

            {/* Subheading with authentic Uganda context */}
            <p className="text-[#555C66] text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
              Home and business waste management services, scheduled curbside pickup, and roll-off dumpster rentals across Greater Kampala, Entebbe Road, and Wakiso.
            </p>

            {/* Primary Waste Connections Action Button Group */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              {/* Yellow Primary Button */}
              <a
                href="#schedule-finder"
                className="inline-flex items-center justify-center bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] px-5 sm:px-7 py-3 sm:py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-xs group"
              >
                <span>Start Service</span>
                <ArrowRight className="w-4 h-4 ml-1.5 sm:ml-2 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Green Secondary Button */}
              <a
                href="#schedule-finder"
                className="inline-flex items-center justify-center bg-[#006F51] hover:bg-[#004D38] text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Get Prices</span>
              </a>

              {/* Phone Direct Link */}
              <a
                href="tel:+256766532915"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#006F51] hover:text-[#004D38] px-3.5 sm:px-4 py-3 rounded border border-[#006F51]/20 bg-white hover:bg-[#F4F9F6] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#006F51]" />
                <span>+256 766 532915</span>
              </a>

              {/* Google Play App Link (Hidden on mobile since dedicated Install Official App card is below) */}
              <a
                href="https://play.google.com/store/apps/details?id=com.naturewaste.customer_app"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-gray-900 hover:text-[#006F51] px-3.5 sm:px-4 py-3 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-colors shadow-xs"
                title="Download NatureWaste Connect on Google Play"
              >
                <GooglePlayIcon className="w-4 h-4" />
                <span>Get Android App</span>
              </a>
            </div>

            {/* Mobile-Only Dedicated Quick App Download Card */}
            <div className="sm:hidden w-full pt-1">
              <a
                href="https://play.google.com/store/apps/details?id=com.naturewaste.customer_app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border border-gray-700 shadow-sm active:scale-[0.99] transition-transform"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-md bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                    <GooglePlayIcon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col min-w-0 text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-bold text-[#FFCE00] tracking-wider">
                        Official App
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-xs font-bold truncate text-white">
                      NatureWaste Connect
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#1A1D20] bg-[#FFCE00] hover:bg-[#E5B800] px-3 py-1.5 rounded transition-colors shrink-0 shadow-xs">
                  <span>Install</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </a>
            </div>

            {/* Live Agent / Customer Care Banner */}
            <div className="p-3 sm:p-3.5 rounded bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-between gap-4 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
                <div className="text-xs sm:text-sm text-[#363636]">
                  <strong className="text-[#1A1D20]">Need Help?</strong> Talk to our Kitende &amp; Entebbe Dispatch Team!
                </div>
              </div>
              <a
                href="tel:+256766532915"
                className="text-xs font-bold text-[#006F51] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Call Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Key Service Confidence Reassurance Badges */}
            <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-[#555C66]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#006F51]" />
                <span className="font-semibold text-[#1A1D20]">Scheduled Weekly Routes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#006F51]" />
                <span className="font-semibold text-[#1A1D20]">Odor-Free Compactor Fleet</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#006F51]" />
                <span className="font-semibold text-[#1A1D20]">Certified Waste Manifests</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Real Waste Management Carousel in Entebbe Uganda */}
          <div
            className="lg:col-span-5"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel Frame */}
            <div className="relative rounded overflow-hidden shadow-sm border border-[#E5E7EB] bg-white">
              {/* Image Slide Viewer */}
              <div className="aspect-[4/3] sm:aspect-[16/11] relative w-full overflow-hidden bg-gray-900">
                {entebbeWasteSlides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={`${slide.title} in ${slide.location}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                ))}

                {/* Top Badge: Slide Tag, Pause/Play Button & Counter */}
                <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-[#006F51]/95 px-2.5 py-1 rounded-sm shadow-xs border border-white/20">
                    {active.tag}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsManuallyPaused((prev) => !prev);
                      }}
                      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white bg-black/60 hover:bg-[#006F51] px-2 py-1 rounded-sm border border-white/20 transition-colors cursor-pointer"
                      title={isManuallyPaused ? "Resume slide rotation" : "Pause slide rotation"}
                      aria-label={isManuallyPaused ? "Play carousel" : "Pause carousel"}
                    >
                      {isManuallyPaused ? (
                        <>
                          <Play className="w-3 h-3 text-[#FFCE00] fill-[#FFCE00]" />
                          <span>Play</span>
                        </>
                      ) : (
                        <>
                          <Pause className="w-3 h-3 text-white" />
                          <span>Pause</span>
                        </>
                      )}
                    </button>
                    <span className="text-[11px] font-bold text-white/90 bg-black/60 px-2 py-0.5 rounded-sm border border-white/20">
                      {currentSlide + 1} / {entebbeWasteSlides.length}
                    </span>
                  </div>
                </div>

                {/* Left/Right Arrow Navigation Buttons */}
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded bg-black/60 hover:bg-[#006F51] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded bg-black/60 hover:bg-[#006F51] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Slide Title Overlaid at Bottom of Image */}
                <div className="absolute bottom-3 left-3.5 right-3.5 z-20 space-y-1 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-[#FFCE00] font-semibold">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{active.location}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold leading-snug drop-shadow-xs">
                    {active.title}
                  </h3>
                </div>

                {/* Carousel Indicator Dots */}
                <div className="absolute bottom-2 right-3.5 z-20 flex items-center gap-1.5">
                  {entebbeWasteSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Jump to slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === currentSlide
                          ? "w-5 bg-[#FFCE00]"
                          : "w-1.5 bg-white/60 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Grounded Information Panel Below Carousel Image */}
              <div className="p-4 bg-white border-t border-[#E5E7EB] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#006F51] animate-pulse" />
                    <span className="text-xs font-bold text-[#1A1D20]">Kitende HQ Operations</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#006F51] bg-[#E9F4F0] px-2 py-0.5 rounded-sm">
                    Entebbe Route Active
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {active.desc}
                </p>
              </div>
            </div>

            {/* Authoritative Service Metrics Grid Below Image */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-white border border-[#E5E7EB] rounded p-3 flex items-center gap-3 shadow-xs">
                <div className="w-9 h-9 rounded bg-[#E9F4F0] text-[#006F51] flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#212529]">Roll-Off Skips</div>
                  <div className="text-[11px] text-gray-500">7m³ to 20m³ Delivery</div>
                </div>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded p-3 flex items-center gap-3 shadow-xs">
                <div className="w-9 h-9 rounded bg-[#E9F4F0] text-[#006F51] flex items-center justify-center font-bold text-xs shrink-0">
                  99%
                </div>
                <div>
                  <div className="text-xs font-bold text-[#212529]">On-Time Pickups</div>
                  <div className="text-[11px] text-gray-500">Scheduled Weekly Routes</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
