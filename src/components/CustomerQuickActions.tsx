"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  CreditCard,
  AlertTriangle,
  Truck,
  ArrowRight,
  PhoneCall,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function CustomerQuickActions() {
  const actions = [
    {
      icon: Calendar,
      title: "Check Pickup Schedule",
      desc: "Find your neighborhood's trash and recycling pickup days, plus holiday changes.",
      cta: "Find My Day",
      link: "#schedule-finder",
      accent: "border-l-4 border-nature-primary",
    },
    {
      icon: CreditCard,
      title: "Pay My Bill",
      desc: "Fast, convenient online bill payment via MTN Mobile Money, Airtel Money, or Bank Transfer.",
      cta: "Pay Online",
      link: "/portal",
      accent: "border-l-4 border-nature-secondary",
    },
    {
      icon: AlertTriangle,
      title: "Report Missed Pickup",
      desc: "Did our truck miss your bin or sack? Alert our Kampala dispatch supervisor immediately.",
      cta: "Report Issue",
      link: "#contact",
      accent: "border-l-4 border-amber-500",
    },
    {
      icon: Truck,
      title: "Rent a Dumpster / Skip",
      desc: "Heavy-duty 7m³, 12m³, or 20m³ roll-off skips delivered to your property or job site.",
      cta: "Rent a Skip",
      link: "/pricing#calculator",
      accent: "border-l-4 border-emerald-600",
    },
  ];

  return (
    <section className="relative z-20 -mt-6 max-w-[1400px] mx-auto px-4 sm:px-8 select-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.link}
              className="bg-white rounded border border-[#E5E7EB] p-5 shadow-xs hover:border-[#006F51] hover:shadow-sm transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded bg-[#E9F4F0] text-[#006F51] flex items-center justify-center mb-3 group-hover:bg-[#006F51] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#1A1D20] tracking-tight group-hover:text-[#006F51] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#555C66] mt-1.5 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0F2F5] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#006F51]">
                <span>{item.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
