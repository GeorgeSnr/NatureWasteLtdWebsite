"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Bell, Smartphone, ArrowRight, MessageSquare, Download } from "lucide-react";
import GooglePlayButton from "@/components/GooglePlayButton";

export default function AppPromoBanner() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="w-full bg-[#F8F9FA] py-16 sm:py-20 select-none border-b border-[#E5E7EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Content (Waste Connections sec_banner-app pattern) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006F51]">
                Customer Notification Service &amp; Mobile App
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1A1D20] tracking-tight">
                Never Miss Your Collection Day Again!
              </h2>
            </div>

            <p className="text-[#555C66] text-sm sm:text-base leading-relaxed">
              With the <strong>NatureWaste Connect</strong> mobile app, SMS &amp; WhatsApp Route Alerts, staying on top of your waste schedule and bill payments has never been simpler.
            </p>

            <ul className="space-y-3.5 text-sm text-[#363636]">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E9F4F0] text-[#006F51] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span><strong>Automated pickup reminders</strong> sent direct to your phone the evening before your scheduled collection.</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E9F4F0] text-[#006F51] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span><strong>Instant service notifications</strong> in case of weather delays, public holidays, or route adjustments.</span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#E9F4F0] text-[#006F51] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span><strong>Material sorting assistance &amp; Mobile Money pay</strong> right from your smartphone.</span>
              </li>
            </ul>

            {/* Quick SMS Signup Box */}
            <div className="pt-2 max-w-md">
              {submitted ? (
                <div className="p-3.5 rounded bg-[#E9F4F0] text-[#006F51] font-semibold text-xs border border-[#006F51]/20">
                  Thank you! Your phone has been registered for Kampala route reminders.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <input
                    type="tel"
                    placeholder="Enter phone (e.g. 0766 532 915)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="flex-1 px-4 py-2.5 rounded border border-gray-300 text-xs focus:outline-none focus:border-[#006F51]"
                  />
                  <button
                    type="submit"
                    className="bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded shrink-0 transition-colors"
                  >
                    Subscribe Alerts
                  </button>
                </form>
              )}
            </div>

            {/* WhatsApp Link */}
            <div className="pt-1">
              <a
                href="https://wa.me/256766532915"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#006F51] hover:underline"
              >
                <MessageSquare className="w-4 h-4 text-[#10B981]" />
                <span>Prefer WhatsApp? Chat with our Kitende Dispatch Office (+256 766 532915)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Visual Frame: NatureWaste Connect App Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded border border-[#E5E7EB] p-7 shadow-xs text-center space-y-5 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-[#E9F4F0] text-[#006F51] flex items-center justify-center mx-auto shadow-inner">
                <Smartphone className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#006F51] bg-[#E9F4F0] px-2.5 py-0.5 rounded-full inline-block">
                  Official Android App
                </span>
                <h3 className="text-xl font-bold text-[#1A1D20]">
                  NatureWaste Connect
                </h3>
                <p className="text-xs text-[#555C66] leading-relaxed">
                  Manage pickups, track collection trucks in real-time, order recycling sacks, and pay via MTN / Airtel Mobile Money.
                </p>
              </div>

              {/* Official Google Play Store Button */}
              <div className="pt-1 flex justify-center">
                <GooglePlayButton variant="dark" size="md" className="w-full justify-center shadow-md hover:scale-[1.02]" />
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                <Link
                  href="/portal"
                  className="w-full block bg-[#006F51] hover:bg-[#004D38] text-white py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Log In to Web Portal
                </Link>
                <a
                  href="#schedule-finder"
                  className="w-full block bg-[#F8F9FA] hover:bg-gray-100 text-[#363636] py-2.5 rounded font-semibold text-xs transition-colors border border-gray-200"
                >
                  View Route Schedule Online
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
