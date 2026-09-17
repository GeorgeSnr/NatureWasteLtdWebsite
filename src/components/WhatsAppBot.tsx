"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Phone, ArrowUpRight, Sparkles, CheckCheck } from "lucide-react";

// Official WhatsApp Brand SVG Path
function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 448 512"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

interface QuickOption {
  id: string;
  icon: string;
  label: string;
  query: string;
}

const QUICK_OPTIONS: QuickOption[] = [
  {
    id: "pickup",
    icon: "🚛",
    label: "Residential Pickup",
    query: "Hello NatureWaste! I'd like to get information on residential garbage pickup schedules and pricing.",
  },
  {
    id: "dumpster",
    icon: "📦",
    label: "Skip / Dumpster Rental",
    query: "Hello NatureWaste! I need pricing and delivery details for a roll-off dumpster / skip container.",
  },
  {
    id: "missed",
    icon: "🚨",
    label: "Missed Collection",
    query: "Hello NatureWaste! I am reporting an urgent missed collection issue in my area.",
  },
  {
    id: "commercial",
    icon: "🏢",
    label: "Commercial Waste Plan",
    query: "Hello NatureWaste! I would like to set up commercial waste collection for our office / business.",
  },
  {
    id: "pricing",
    icon: "💰",
    label: "Rates & Bag Sacks",
    query: "Hello NatureWaste! Please send me the current rate sheet and recycling bag package prices.",
  },
];

export default function WhatsAppBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showTeaser, setShowTeaser] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_NUMBER = "256766532915";
  const PHONE_DISPLAY = "+256 766 532915";

  // Show greeting teaser prompt after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!teaserDismissed) {
        setShowTeaser(true);
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, [teaserDismissed]);

  // Handle outside click to close chat window
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const openWhatsApp = (customText?: string) => {
    const textToSend = (customText !== undefined ? customText : message).trim();
    const query = textToSend ? `?text=${encodeURIComponent(textToSend)}` : "";
    const url = `https://wa.me/${WHATSAPP_NUMBER}${query}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setMessage("");
    setIsOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      openWhatsApp(message);
    } else {
      openWhatsApp("Hello NatureWaste dispatch, I would like to inquire about waste management services.");
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto font-sans"
    >
      {/* 1. Proactive Floating Teaser Speech Bubble (appears once) */}
      {!isOpen && showTeaser && (
        <div className="mb-3 max-w-xs sm:max-w-sm animate-fade-in transition-all">
          <div className="relative bg-white text-gray-800 text-xs rounded-xl p-3.5 shadow-xl border border-gray-200 flex items-start gap-2.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTeaser(false);
                setTeaserDismissed(true);
              }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-[10px] font-bold shadow-xs transition-colors"
              aria-label="Dismiss message"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
              <WhatsAppIcon className="w-4 h-4" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowTeaser(false);
                setIsOpen(true);
              }}
            >
              <div className="font-bold text-[#006F51] flex items-center gap-1">
                <span>NatureWaste Dispatch</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-gray-600 mt-0.5 leading-snug">
                Need quick garbage pickup, dumpster rates, or route details? Chat directly with us on WhatsApp!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. WhatsApp Interactive Bot Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="WhatsApp Dispatch Assistant"
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[380px] max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-5"
          style={{ maxHeight: "calc(100vh - 120px)" }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#006F51] via-[#005a42] to-[#075E54] text-white p-3.5 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center border border-white/20 text-[#FFCE00]">
                  <WhatsAppIcon className="w-6 h-6 text-white" />
                </div>
                {/* Live Online Ping Dot */}
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#006F51]" />
              </div>
              <div className="flex flex-col min-w-0 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm tracking-wide truncate">
                    NatureWaste Dispatch
                  </span>
                  <span className="text-[10px] bg-[#FFCE00] text-[#1A1D20] font-bold px-1.5 py-0.2 rounded uppercase">
                    Bot
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  <span className="truncate">Online • Kitende Dispatch Office</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close WhatsApp chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Window Body (WhatsApp styled) */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 bg-[#EFEAE2]/40 text-left">
            {/* Timestamp */}
            <div className="text-center">
              <span className="bg-white/80 text-gray-500 text-[10px] font-medium px-2 py-0.5 rounded shadow-xs">
                Today • Fast Dispatch Help
              </span>
            </div>

            {/* Automated Greeting Bubble from Bot */}
            <div className="flex items-start gap-2 max-w-[90%]">
              <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-xs border border-gray-100 text-xs text-gray-800 space-y-1.5">
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#006F51]">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFCE00]" />
                  <span>NatureWaste Assistant</span>
                </div>
                <p className="leading-relaxed">
                  👋 <strong>Welcome to NatureWaste Management Ltd!</strong>
                </p>
                <p className="text-gray-600 leading-relaxed">
                  How can our Kampala &amp; Wakiso collection team help you today? Choose an inquiry below or write your custom message:
                </p>
                <div className="text-[10px] text-gray-400 text-right flex items-center justify-end gap-1 pt-0.5">
                  <span>Just now</span>
                  <CheckCheck className="w-3 h-3 text-[#25D366]" />
                </div>
              </div>
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                Quick Options (Click to start chat):
              </div>
              <div className="flex flex-col gap-1.5">
                {QUICK_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => openWhatsApp(opt.query)}
                    className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-[#E9F4F0] border border-gray-200 hover:border-[#006F51]/30 transition-all text-left shadow-2xs group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm shrink-0">{opt.icon}</span>
                      <span className="text-xs font-semibold text-gray-800 group-hover:text-[#006F51] truncate">
                        {opt.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#006F51] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Composer / Message Input */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your inquiry here..."
              className="flex-1 text-xs py-2.5 px-3 rounded-lg border border-gray-300 focus:outline-hidden focus:border-[#006F51] focus:ring-1 focus:ring-[#006F51] transition-all bg-gray-50/60"
            />
            <button
              type="submit"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-2.5 rounded-lg flex items-center justify-center transition-colors shrink-0 shadow-xs active:scale-95"
              title="Send to WhatsApp"
              aria-label="Send message on WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Footer Links */}
          <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="flex items-center gap-1 hover:text-[#006F51] font-medium transition-colors"
            >
              <Phone className="w-3 h-3 text-[#006F51]" />
              <span>Call: {PHONE_DISPLAY}</span>
            </a>
            <button
              type="button"
              onClick={() => openWhatsApp()}
              className="font-bold text-[#006F51] hover:underline flex items-center gap-1"
            >
              <WhatsAppIcon className="w-3 h-3 text-[#25D366]" />
              <span>Open WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Floating Trigger Button */}
      <button
        type="button"
        onClick={() => {
          setShowTeaser(false);
          setTeaserDismissed(true);
          setIsOpen((prev) => !prev);
        }}
        className="relative group w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-emerald-900/30 hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label={isOpen ? "Close WhatsApp Assistant" : "Chat on WhatsApp with NatureWaste Dispatch"}
        aria-expanded={isOpen}
      >
        {/* Pulsing Ripple Animation when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        )}

        {/* Notification Status Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFCE00] text-[#1A1D20] text-[10px] font-extrabold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
            1
          </span>
        )}

        {/* Icon toggle */}
        {isOpen ? (
          <X className="w-7 h-7 text-white transition-transform duration-200 rotate-0 group-hover:rotate-90" />
        ) : (
          <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        )}

        {/* Desktop Hover Tooltip */}
        {!isOpen && (
          <span className="hidden md:group-hover:inline-flex absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-md shadow-md whitespace-nowrap items-center gap-1.5 transition-opacity duration-200">
            <span>Chat on WhatsApp</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </span>
        )}
      </button>
    </div>
  );
}
