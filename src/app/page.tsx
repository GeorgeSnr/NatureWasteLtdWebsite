"use client";

import React from "react";
import HeroSection from "@/components/HeroSection";
import CustomerQuickActions from "@/components/CustomerQuickActions";
import ServicePillars from "@/components/ServicePillars";
import CommercialServicesSection from "@/components/CommercialServicesSection";
import SavingsCtaBanner from "@/components/SavingsCtaBanner";
import ResidentialServicesSection from "@/components/ResidentialServicesSection";
import SustainabilitySection from "@/components/SustainabilitySection";
import CareersBanner from "@/components/CareersBanner";
import AppPromoBanner from "@/components/AppPromoBanner";
import ScheduleFinder from "@/components/ScheduleFinder";
import UgandaRecyclingGuide from "@/components/UgandaRecyclingGuide";
import ContainerGuide from "@/components/ContainerGuide";
import CoverageAreas from "@/components/CoverageAreas";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white w-full max-w-full overflow-x-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Customer Quick Actions (Self-Service Tiles) */}
      <CustomerQuickActions />

      {/* 3. Service Pillars (3-Card Overview: Residential, Commercial, Dumpsters) */}
      <ServicePillars />

      {/* 4. Commercial Services (2-Column with 3 commercial cards & facility image) */}
      <CommercialServicesSection />

      {/* 5. Savings Mint CTA Banner (Say goodbye to waste and hello to savings!) */}
      <SavingsCtaBanner />

      {/* 6. Residential Services (2-Column with customer image & 3 residential cards) */}
      <ResidentialServicesSection />

      {/* 7. Focus On Sustainability (3-Cards: Better Planet, Safety Above All, Job Creation) */}
      <SustainabilitySection />

      {/* 8. Join Our Team Careers Banner */}
      <CareersBanner />

      {/* 9. Mobile Route Reminders & SMS Alerts Banner */}
      <AppPromoBanner />

      {/* 10. Interactive Pickup Schedule & Rate Finder */}
      <ScheduleFinder />

      {/* 11. Uganda Waste Segregation & Recycling Guide (Blue, Yellow, Green, Black) */}
      <UgandaRecyclingGuide />

      {/* 12. Container & Dumpster Sizing Guide (120L to 20m³) */}
      <ContainerGuide />

      {/* 13. Suburb & District Coverage Directory */}
      <CoverageAreas />

      {/* 14. What Our Customers Say (5.0 Star Reviews) */}
      <Testimonials />

      {/* 15. The Nature Waste Difference & NEMA Statutory Compliance */}
      <AboutSection />

      {/* 16. Customer Care & Dispatch Inquiries */}
      <ContactSection />
    </main>
  );
}
