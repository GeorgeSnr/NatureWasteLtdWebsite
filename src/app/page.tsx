import React from "react";
import VerticalSidebar from "@/components/VerticalSidebar";
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
      {/* Top Hero Container with Signature Left Vertical Sidebar */}
      <div className="flex flex-row w-full lg:min-h-[calc(100vh-80px)]">
        <VerticalSidebar />
        <HeroSection />
      </div>

      {/* 4 Chamfered Feature Cards */}
      <FeatureCards />

      {/* About Nature Waste & Outlined Impact Counters */}
      <AboutSection />

      {/* Interactive Services & Modules Tabs */}
      <ServicesTabs />

      {/* 3-Step Work Process with Watermark */}
      <WorkProcess />

      {/* Recent Operations & Impact Wave Carousel */}
      <RecentProjects />

      {/* Client Testimonials */}
      <Testimonials />

      {/* Articles & Industry Research Preview */}
      <BlogPreview />

      {/* Contact Channels & High-Contrast Form */}
      <ContactSection />
    </main>
  );
}
