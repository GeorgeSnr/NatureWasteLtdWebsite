"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Play } from "lucide-react";
import DemoModal from "./DemoModal";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const slides = [
    {
      badge: "CIRCULAR ECONOMY & WASTE ERP",
      titleLine1: "Precision Waste ERP &",
      titleLine2: "Circular Logistics",
      titleLine3: "Across Africa & Beyond",
      description:
        "Connect your municipal bins, collection fleet, and material recovery facilities on a single source of truth. Manage multi-ton waste diversion with environmental and architectural rigor.",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1800&q=80",
      cta: "Explore Platform",
      ctaLink: "/features",
      watermark: "NATUREWASTE",
    },
    {
      badge: "SMART CITIES & IOT BIN SENSORS",
      titleLine1: "IoT Bin Telematics &",
      titleLine2: "Dynamic Route Dispatch",
      titleLine3: "Zero Overflowing Cities",
      description:
        "Equip street containers and commercial compactors with wireless ultrasonic fill sensors. Slash municipal fuel consumption by 34% with AI-optimized compactor schedules.",
      image:
        "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1800&q=80",
      cta: "View Smart Bin System",
      ctaLink: "/features#smart-collection",
      watermark: "ECOCONNECT",
    },
    {
      badge: "SUSTAINABILITY & RECOVERY",
      titleLine1: "Material Recovery Facilities",
      titleLine2: "Traceable Circular Resins",
      titleLine3: "Verified Carbon Offsets",
      description:
        "End-to-end MRF sorting, automated weighbridge ticketing, and certified chain-of-custody manifests for global ESG corporate compliance.",
      image:
        "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1800&q=80",
      cta: "Recycling Solutions",
      ctaLink: "/industries",
      watermark: "REDUCE.REUSE",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <>
      <section className="relative flex-1 w-full min-h-[560px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[calc(100vh-80px)] bg-gray-950 overflow-hidden flex items-center select-none">
        {/* Background Images with smooth fade */}
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-out ${
              idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            {/* Background image */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${s.image}')` }}
            />
            {/* Dual gradient overlays for high-contrast typography */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />
          </div>
        ))}

        {/* Huge Outline Watermark Text in background */}
        <div className="absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 opacity-20 hidden sm:block">
          <span className="text-[100px] md:text-[150px] lg:text-[200px] font-black tracking-widest text-outline-watermark uppercase leading-none block">
            {slide.watermark}
          </span>
        </div>

        {/* Hero Content Area */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-12 sm:py-8 md:py-10 lg:py-24 flex flex-col justify-center">
          <div className="max-w-2xl space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-nature-primary/40 border border-nature-secondary/40 text-nature-secondary px-3.5 py-1 text-xs sm:text-sm font-black tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-nature-accent animate-ping" />
              <span>{slide.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-[46px] lg:text-[60px] font-extrabold text-white leading-tight tracking-tight">
              <span className="block">{slide.titleLine1}</span>
              <span className="block text-nature-secondary">{slide.titleLine2}</span>
              <span className="block">{slide.titleLine3}</span>
            </h1>

            {/* Subheading */}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal max-w-xl pt-1">
              {slide.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-6 pt-5">
              <Link
                href={slide.ctaLink}
                className="inline-flex items-center gap-3 bg-nature-primary hover:bg-nature-primary-dark text-white px-8 py-4 font-bold text-[15px] transition-all duration-200 shadow-xl hover:shadow-nature-primary/30 active:scale-95 group"
              >
                <span>{slide.cta}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Pulsing Video Showreel button */}
              <button
                onClick={() => setShowDemoModal(true)}
                className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-nature-primary text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-nature-primary/40 focus:outline-none cursor-pointer"
                aria-label="Play Video Showreel"
              >
                <div className="absolute -inset-2 rounded-full border-2 border-nature-secondary/60 animate-pulse-ring pointer-events-none" />
                <Play className="w-5 h-5 fill-white text-white ml-0.5 stroke-0" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows (Right side) */}
        <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
          <button
            onClick={prevSlide}
            className="w-11 h-11 bg-nature-primary hover:bg-nature-primary-dark text-white flex items-center justify-center transition-colors shadow-lg active:scale-95 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button
            onClick={nextSlide}
            className="w-11 h-11 bg-nature-primary hover:bg-nature-primary-dark text-white flex items-center justify-center transition-colors shadow-lg active:scale-95 cursor-pointer"
            aria-label="Next Slide"
          >
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Carousel Navigation Indicators (Bottom center) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentSlide
                  ? "w-8 bg-nature-secondary"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Showreel modal */}
      <DemoModal isOpen={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
