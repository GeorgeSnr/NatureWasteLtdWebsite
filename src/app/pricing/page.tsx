"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Calculator } from "lucide-react";
import { pricingPlans, featureComparison } from "@/data/pricingPlans";

export default function PricingPage() {
  const [annualBilling, setAnnualBilling] = useState(false);

  // Waste Cost Calculator state
  const [binType, setBinType] = useState("240");
  const [binCount, setBinCount] = useState(3);
  const [frequency, setFrequency] = useState(2); // times per week

  const rates: Record<string, number> = {
    "120": 4, // per pickup
    "240": 7,
    "660": 18,
    "1100": 28,
  };

  const calculatedMonthly = Math.round(
    binCount * (rates[binType] || 7) * frequency * 4.33
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Top Banner */}
      <section className="border-b border-[#E5E7EB] bg-[#F8F9FA] px-4 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-wider bg-[#E9F4F0] px-3 py-1 rounded-sm border border-[#006F51]/20">
            Predictable &amp; Scalable Rates
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black leading-[1.1] tracking-tight text-[#1A1D20]">
            Architected for Every Community Scale
          </h1>
          <p className="text-sm sm:text-base text-[#555C66] leading-relaxed max-w-xl mx-auto">
            Transparent waste collection and smart ERP subscription tiers for single households, corporate complexes, and full municipal territories.
          </p>

          {/* Billing Switcher */}
          <div className="pt-6 flex items-center justify-center gap-3">
            <span
              className={`text-xs uppercase tracking-wider font-bold ${
                !annualBilling ? "text-[#1A1D20]" : "text-gray-400"
              }`}
            >
              Monthly Billing
            </span>
            <button
              type="button"
              onClick={() => setAnnualBilling(!annualBilling)}
              className="relative w-12 h-6 bg-[#006F51] rounded-full p-0.5 cursor-pointer transition-colors"
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  annualBilling ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 ${
                annualBilling ? "text-[#1A1D20]" : "text-gray-400"
              }`}
            >
              Annual Plan
              <span className="bg-[#FFCE00] text-[#1A1D20] text-[10px] font-black uppercase px-2 py-0.5 rounded-sm">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-3 mt-14 items-stretch">
          {pricingPlans.map((plan) => {
            const price = annualBilling ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`flex flex-col text-left transition-all duration-200 rounded ${
                  plan.popular
                    ? "relative z-10 border-2 border-[#006F51] bg-white shadow-md"
                    : "border border-[#E5E7EB] bg-white shadow-xs"
                }`}
              >
                {plan.popular && (
                  <div className="bg-[#006F51] text-white text-center py-2 text-xs font-bold uppercase tracking-wider rounded-t-sm">
                    {plan.badge}
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="mb-6">
                      {!plan.popular && (
                        <span className="text-[11px] font-bold uppercase text-gray-500 tracking-wider">
                          {plan.badge}
                        </span>
                      )}
                      <h3 className="text-2xl font-black text-[#1A1D20] mt-0.5">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-[#555C66] mt-1">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-8 pb-6 border-b border-[#E5E7EB]">
                      {typeof price === "number" ? (
                        <div className="flex items-baseline">
                          <span className="text-[40px] font-black leading-none text-[#1A1D20]">
                            ${price}
                          </span>
                          <span className="ml-1.5 text-xs font-bold uppercase text-gray-500">
                            / month
                          </span>
                        </div>
                      ) : (
                        <span className="text-[36px] font-black leading-none text-[#1A1D20]">
                          Custom
                        </span>
                      )}
                    </div>

                    <ul className="mb-8 space-y-3">
                      {plan.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-[#006F51] shrink-0 mt-0.5" />
                          <span className="text-xs text-[#333A42] font-medium leading-relaxed">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={plan.ctaLink}
                    className={`w-full py-3.5 text-center text-xs font-bold uppercase tracking-wider transition-colors rounded-sm ${
                      plan.popular
                        ? "bg-[#006F51] hover:bg-[#005a42] text-white shadow-xs"
                        : "border border-[#006F51] text-[#006F51] hover:bg-[#E9F4F0]"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Waste Cost Estimator Calculator */}
      <section className="bg-[#F8F9FA] px-6 sm:px-12 lg:px-16 py-16 border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 border border-[#E5E7EB] shadow-xs rounded">
          <div className="flex items-center gap-3 mb-6 border-b border-[#E5E7EB] pb-4">
            <div className="w-10 h-10 rounded-sm bg-[#006F51] text-white flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#1A1D20]">
                Interactive Commercial Waste Cost Estimator
              </h3>
              <p className="text-xs sm:text-sm text-[#555C66]">
                Customize your container size and collection schedule for an instant estimate.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {/* Bin Selection */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#555C66] mb-2 tracking-wider">
                Container Type
              </label>
              <select
                value={binType}
                onChange={(e) => setBinType(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3 py-2.5 text-xs font-semibold text-[#1A1D20] focus:outline-none focus:border-[#006F51]"
              >
                <option value="120">120L Standard Wheelie Bin</option>
                <option value="240">240L Heavy-Duty Wheelie Bin</option>
                <option value="660">660L Commercial Metal Skip</option>
                <option value="1100">1100L Hydraulic Compactor</option>
              </select>
            </div>

            {/* Bin Count */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#555C66] mb-2 tracking-wider">
                Number of Containers: {binCount}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={binCount}
                onChange={(e) => setBinCount(Number(e.target.value))}
                className="w-full accent-[#006F51] mt-2"
              />
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-xs font-bold uppercase text-[#555C66] mb-2 tracking-wider">
                Pickup Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3 py-2.5 text-xs font-semibold text-[#1A1D20] focus:outline-none focus:border-[#006F51]"
              >
                <option value={1}>1x per week</option>
                <option value={2}>2x per week (Recommended)</option>
                <option value={3}>3x per week</option>
                <option value={5}>Daily (Mon - Fri)</option>
              </select>
            </div>
          </div>

          {/* Calculator Output */}
          <div className="bg-[#1A1D20] text-white p-6 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                Estimated Monthly Rate
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#FFCE00] mt-0.5">
                ${calculatedMonthly} <span className="text-xs text-gray-300 font-normal">/ month</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Includes container rental, weighbridge logs, and portal telemetry.
              </p>
            </div>

            <Link
              href={`/book-demo?quote=${calculatedMonthly}&bins=${binCount}&type=${binType}&freq=${frequency}`}
              className="bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <span>Lock In This Rate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Specification Matrix */}
      <section className="bg-white px-4 sm:px-12 lg:px-16 py-12 sm:py-16 overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1D20]">
              Detailed Module Specification Matrix
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#555C66]">
              Deep architectural comparison across service tiers.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#E5E7EB] shadow-xs rounded">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="bg-[#1A1D20] text-white">
                  <th className="border-r border-white/10 p-4 text-left text-xs font-bold uppercase tracking-wider">
                    Module Ecosystem
                  </th>
                  <th className="border-r border-white/10 p-4 text-center text-xs font-bold uppercase tracking-wider">
                    Residential Connect
                  </th>
                  <th className="border-r border-white/10 p-4 text-center text-xs font-bold uppercase tracking-wider">
                    Commercial Business
                  </th>
                  <th className="p-4 text-center text-xs font-bold uppercase tracking-wider">
                    Municipal &amp; Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {featureComparison.map((cat, cIdx) => (
                  <React.Fragment key={cIdx}>
                    <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]">
                      <td
                        className="p-3 text-xs font-bold uppercase tracking-wider text-[#1A1D20]"
                        colSpan={4}
                      >
                        {cat.category}
                      </td>
                    </tr>
                    {cat.items.map((item, iIdx) => (
                      <tr
                        key={iIdx}
                        className="border-b border-[#E5E7EB] even:bg-[#F8F9FA]/50 text-xs"
                      >
                        <td className="p-4 font-medium text-[#1A1D20]">{item.name}</td>
                        <td className="p-4 text-center">
                          {typeof item.residential === "boolean" ? (
                            item.residential ? (
                              <CheckCircle2 className="w-4 h-4 text-[#006F51] mx-auto" />
                            ) : (
                              <span className="text-gray-400">—</span>
                            )
                          ) : (
                            <span className="text-xs font-bold text-gray-700">
                              {item.residential}
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof item.commercial === "boolean" ? (
                            item.commercial ? (
                              <CheckCircle2 className="w-4 h-4 text-[#006F51] mx-auto" />
                            ) : (
                              <span className="text-gray-400">—</span>
                            )
                          ) : (
                            <span className="text-xs font-bold text-gray-700">
                              {item.commercial}
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof item.enterprise === "boolean" ? (
                            item.enterprise ? (
                              <CheckCircle2 className="w-4 h-4 text-[#006F51] mx-auto" />
                            ) : (
                              <span className="text-gray-400">—</span>
                            )
                          ) : (
                            <span className="text-xs font-bold text-gray-700">
                              {item.enterprise}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
