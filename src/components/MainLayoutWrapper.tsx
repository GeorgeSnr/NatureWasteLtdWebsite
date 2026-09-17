"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppBot from "@/components/WhatsAppBot";
import AnnouncementBanner from "@/components/AnnouncementBanner";

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="min-h-screen flex flex-col w-full bg-[#F4F5F7]">{children}</div>;
  }

  return (
    <>
      <AnnouncementBanner />
      <Header />
      <div className="flex-1 flex flex-col w-full max-w-full overflow-x-clip">{children}</div>
      <Footer />
      <WhatsAppBot />
    </>
  );
}
