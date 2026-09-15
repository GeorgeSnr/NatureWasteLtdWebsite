import React from "react";
import HeroSection from "@/components/HeroSection";
import CustomerQuickActions from "@/components/CustomerQuickActions";
import ServicePillars from "@/components/ServicePillars";
import UgandaRecyclingGuide from "@/components/UgandaRecyclingGuide";
import ContainerGuide from "@/components/ContainerGuide";
import CoverageAreas from "@/components/CoverageAreas";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* 1. Hero Section with Interactive Uganda Schedule & Service Finder */}
      <HeroSection />

      {/* 2. Self-Service Customer Quick Actions (Schedule, Bill Pay, Missed Pickup, Dumpsters) */}
      <CustomerQuickActions />

      {/* 3. Core Service Pillars (Residential, Commercial, Roll-Off Skips) */}
      <ServicePillars />

      {/* 4. Uganda Waste Segregation & Recycling Guide (What Goes Where) */}
      <UgandaRecyclingGuide />

      {/* 5. Container & Dumpster Sizing Guide (120L to 20m³) */}
      <ContainerGuide />

      {/* 6. Suburb & District Coverage Areas Across Kampala & Entebbe */}
      <CoverageAreas />

      {/* 7. Why Nature Waste / NEMA Compliance & GoGreenug Youth Initiative */}
      <AboutSection />

      {/* 8. Verified Ugandan Client Testimonials */}
      <Testimonials />

      {/* 9. Environmental Insights, Policy & Research */}
      <BlogPreview />

      {/* 10. Customer Care & Dispatch Inquiries */}
      <ContactSection />
    </main>
  );
}
