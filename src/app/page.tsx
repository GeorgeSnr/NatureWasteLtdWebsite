import React from "react";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import AboutSection from "@/components/AboutSection";
import ServicesTabs from "@/components/ServicesTabs";
import WorkProcess from "@/components/WorkProcess";
import RecentProjects from "@/components/RecentProjects";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Decongested Full-Width Hero Section */}
      <div className="w-full">
        <HeroSection />
      </div>

      {/* 4 Core Operational Pillars */}
      <FeatureCards />

      {/* About Nature Waste Management Ltd & Real Ugandan Heritage */}
      <AboutSection />

      {/* Interactive Services & Modules Tabs */}
      <ServicesTabs />

      {/* 3-Step Work Process Flow */}
      <WorkProcess />

      {/* Recent Operations & Impact Metrics */}
      <RecentProjects />

      {/* Verified Client Testimonials */}
      <Testimonials />

      {/* Environmental Insights & Research */}
      <BlogPreview />

      {/* Dedicated Contact Section */}
      <ContactSection />
    </main>
  );
}
