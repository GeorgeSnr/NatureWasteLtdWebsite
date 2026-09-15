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
    <section className="relative z-20 -mt-8 max-w-[1400px] mx-auto px-4 sm:px-8 select-none">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {actions.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.link}
              className={`bg-white rounded-xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group ${item.accent}`}
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#F0F7F2] text-nature-primary flex items-center justify-center mb-4 group-hover:bg-nature-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-[#141517] tracking-tight group-hover:text-nature-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-nature-primary">
                <span>{item.cta}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
