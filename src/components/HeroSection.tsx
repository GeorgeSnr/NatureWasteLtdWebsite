"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Play, ShieldCheck } from "lucide-react";
import DemoModal from "./DemoModal";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const slides = [
    {
      badge: "NEMA LICENSED • UGANDA VISION 2040",
      titleLine1: "Sustainable Waste Solutions &",
      titleLine2: "Circular Logistics",
      titleLine3: "Across Kampala & Beyond",
      description:
        "Founded by Ugandan youth environmentalists, Nature Waste Management Limited transforms urban refuse into clean resources through selective collection, smart routing, and community recycling.",
      image:
        "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1800&q=80",
      cta: "Explore Our Solutions",
      ctaLink: "/features",
      watermark: "NATUREWASTE",
    },
    {
      badge: "GOGREENUG INITIATIVE • SMART SUBURBS",
      titleLine1: "Selective Waste Collection &",
      titleLine2: "Plastic Polymer Recovery",
      titleLine3: "For Cleaner Communities",
      description:
        "From Kitende and Entebbe Road to Kampala's bustling commercial centers, our specialized vehicles collect and process plastics, metals, paper, and organic streams with environmental rigor.",
      image:
        "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=1800&q=80",
      cta: "View Collection Services",
      ctaLink: "/features#smart-collection",
      watermark: "GOGREENUG",
    },
    {
      badge: "ENTERPRISE & MUNICIPAL OPERATIONS",
      titleLine1: "Commercial Skips &",
      titleLine2: "Industrial Waste ERP",
      titleLine3: "100% NEMA Audit Compliant",
      description:
        "We equip shopping malls, hospitals, residential estates, and factories with high-density compactors, verified weighbridge ticketing, and certified ESG diversion reports.",
      image:
        "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1800&q=80",
      cta: "Commercial Plans",
      ctaLink: "/pricing",
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
      <section className="relative w-full min-h-[580px] sm:min-h-[540px] md:min-h-[600px] lg:min-h-[660px] bg-gray-950 overflow-hidden flex items-center select-none">
        {/* Background Images with smooth fade */}
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-out ${
              idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${s.image}')` }}
            />
            {/* Elegant dark gradient overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
          </div>
        ))}

        {/* Large Outline Watermark in background */}
        <div className="absolute right-8 lg:right-24 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 opacity-15 hidden md:block">
          <span className="text-[120px] lg:text-[180px] font-black tracking-widest text-outline-watermark uppercase leading-none block">
            {slide.watermark}
          </span>
        </div>

        {/* Hero Content Area */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 py-16 sm:py-20 lg:py-24 flex flex-col justify-center">
          <div className="max-w-3xl space-y-5">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-nature-primary/40 border border-nature-secondary/40 text-nature-secondary px-3.5 py-1.5 text-xs font-black tracking-widest uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-nature-secondary animate-ping" />
              <span>{slide.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-[50px] lg:text-[60px] font-extrabold text-white leading-[1.12] tracking-tight">
              <span className="block">{slide.titleLine1}</span>
              <span className="block text-nature-secondary">{slide.titleLine2}</span>
              <span className="block">{slide.titleLine3}</span>
            </h1>

            {/* Subheading */}
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-2xl pt-1">
              {slide.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-5 pt-4">
              <Link
                href={slide.ctaLink}
                className="inline-flex items-center gap-3 bg-nature-primary hover:bg-nature-primary-dark text-white px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-xl hover:shadow-nature-primary/30 active:scale-95 group"
              >
                <span>{slide.cta}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Pulsing Video Showreel button */}
              <button
                onClick={() => setShowDemoModal(true)}
                className="relative group flex items-center justify-center w-13 h-13 rounded-full bg-nature-primary text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-nature-primary/40 focus:outline-none cursor-pointer"
                aria-label="Play Video Showreel"
              >
                <div className="absolute -inset-2 rounded-full border-2 border-nature-secondary/60 animate-pulse-ring pointer-events-none" />
                <Play className="w-5 h-5 fill-white text-white ml-0.5 stroke-0" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="absolute right-6 sm:right-12 bottom-12 z-30 flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 bg-black/50 hover:bg-nature-primary text-white flex items-center justify-center transition-colors border border-white/20 active:scale-95 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 bg-black/50 hover:bg-nature-primary text-white flex items-center justify-center transition-colors border border-white/20 active:scale-95 cursor-pointer"
            aria-label="Next Slide"
          >
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-6 sm:left-12 lg:left-16 z-30 flex items-center gap-2">
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
