"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X, ArrowRight } from "lucide-react";

export default function AnnouncementBanner() {
  const { announcement } = useWebsiteData();
  const [dismissed, setDismissed] = useState(false);

  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const isDismissed = sessionStorage.getItem("nw_announcement_dismissed");
        if (isDismissed === "true") {
          setDismissed(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("nw_announcement_dismissed", "true");
      }
    } catch {
      // ignore
    }
  };

  if (!announcement || !announcement.enabled || dismissed) {
    return null;
  }

  const iconMap = {
    info: <Info className="w-4 h-4 shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 shrink-0 text-[#1A1D20]" />,
    emergency: <AlertCircle className="w-4 h-4 shrink-0 text-white" />,
    success: <CheckCircle className="w-4 h-4 shrink-0 text-emerald-100" />,
  };

  const styleMap = {
    info: "bg-[#004D38] text-white border-[#006F51]",
    warning: "bg-[#FFCE00] text-[#1A1D20] border-amber-400 font-medium",
    emergency: "bg-red-700 text-white border-red-800",
    success: "bg-emerald-700 text-white border-emerald-800",
  };

  return (
    <div
      role="banner"
      className={`w-full py-2 px-3 sm:px-8 text-xs border-b transition-all flex items-center justify-between gap-3 ${
        styleMap[announcement.type || "info"]
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-black/15">
          {iconMap[announcement.type || "info"]}
          <span>{announcement.badge || "Notice"}</span>
        </div>
        <span className="leading-snug">{announcement.message}</span>
        {announcement.linkText && announcement.linkUrl && (
          <Link
            href={announcement.linkUrl}
            className="inline-flex items-center gap-1 underline font-bold hover:opacity-85 transition-opacity ml-1"
          >
            <span>{announcement.linkText}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>

      <button
        onClick={handleDismiss}
        className="p-1 hover:bg-black/10 rounded transition-colors shrink-0 cursor-pointer"
        aria-label="Dismiss Announcement"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
