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
      <section className="border-b border-[#c5c6cd] bg-white px-6 sm:px-12 lg:px-16 py-16 lg:py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-nature-primary">
            Predictable &amp; Scalable Rates
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-black leading-[1.1] tracking-tight text-[#091426]">
            Architected for Every Community Scale
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
            Transparent waste collection and smart ERP subscription tiers for single households, corporate complexes, and full municipal territories.
          </p>

          {/* Billing Switcher */}
          <div className="pt-6 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-bold ${
                !annualBilling ? "text-[#141517]" : "text-gray-400"
              }`}
            >
              Monthly Billing
            </span>
            <button
              type="button"
              onClick={() => setAnnualBilling(!annualBilling)}
              className="relative w-14 h-8 bg-nature-primary rounded-full p-1 cursor-pointer transition-colors"
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-transform ${
                  annualBilling ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-sm font-bold flex items-center gap-1.5 ${
                annualBilling ? "text-[#141517]" : "text-gray-400"
              }`}
            >
              Annual Plan
              <span className="bg-nature-secondary text-nature-primary text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
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
                className={`flex flex-col text-left transition-all duration-300 ${
                  plan.popular
                    ? "relative z-10 scale-105 border-2 border-nature-primary bg-white shadow-2xl chamfer-card"
                    : "border border-[#c5c6cd] bg-white shadow-xs chamfer-card"
                }`}
              >
                {plan.popular && (
                  <div className="bg-nature-primary text-white text-center py-1.5 text-xs font-black uppercase tracking-widest">
                    {plan.badge}
                  </div>
                )}

                <div className="p-8 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="mb-6">
                      {!plan.popular && (
                        <span className="text-[11px] font-extrabold uppercase text-gray-400 tracking-wider">
                          {plan.badge}
                        </span>
                      )}
                      <h3 className="text-[24px] font-black text-[#091426] mt-0.5">
                        {plan.name}
                      </h3>
                      <p className="text-[13px] text-gray-500 mt-1">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-8">
                      {typeof price === "number" ? (
                        <div className="flex items-baseline">
                          <span className="text-[44px] font-black leading-none text-[#091426]">
                            ${price}
                          </span>
                          <span className="ml-1 text-[12px] font-bold uppercase text-gray-400">
                            / month
                          </span>
                        </div>
                      ) : (
                        <span className="text-[40px] font-black leading-none text-[#091426]">
                          Custom
                        </span>
                      )}
                    </div>

                    <ul className="mb-8 space-y-3.5">
                      {plan.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-4 w-4 text-nature-primary shrink-0 mt-0.5" />
                          <span className="text-[13px] text-[#191C1E] font-medium">
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={plan.ctaLink}
                    className={`w-full py-3.5 text-center text-[12px] font-black uppercase tracking-widest transition-all ${
                      plan.popular
                        ? "bg-nature-primary text-white hover:bg-nature-primary-dark shadow-md"
                        : "border border-[#c5c6cd] text-[#091426] hover:bg-gray-100"
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
      <section className="bg-[#F7F9FB] px-6 sm:px-12 lg:px-16 py-16 border-b border-gray-200">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 border border-gray-200 shadow-sm chamfer-card">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded bg-nature-primary text-white flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#141517]">
                Interactive Commercial Waste Cost Estimator
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Customize your container size and collection schedule for an instant estimate.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {/* Bin Selection */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                Container Type
              </label>
              <select
                value={binType}
                onChange={(e) => setBinType(e.target.value)}
                className="w-full bg-[#f8fafc] border border-gray-300 px-3 py-2.5 text-sm font-semibold text-[#141517] focus:outline-none focus:border-nature-primary"
              >
                <option value="120">120L Standard Wheelie Bin</option>
                <option value="240">240L Heavy-Duty Wheelie Bin</option>
                <option value="660">660L Commercial Metal Skip</option>
                <option value="1100">1100L Hydraulic Compactor</option>
              </select>
            </div>

            {/* Bin Count */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                Number of Containers: {binCount}
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={binCount}
                onChange={(e) => setBinCount(Number(e.target.value))}
                className="w-full accent-nature-primary mt-2"
              />
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">
                Pickup Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full bg-[#f8fafc] border border-gray-300 px-3 py-2.5 text-sm font-semibold text-[#141517] focus:outline-none focus:border-nature-primary"
              >
                <option value={1}>1x per week</option>
                <option value={2}>2x per week (Recommended)</option>
                <option value={3}>3x per week</option>
                <option value={5}>Daily (Mon - Fri)</option>
              </select>
            </div>
          </div>

          {/* Calculator Output */}
          <div className="bg-[#181A1C] text-white p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-400">
                Estimated Monthly Rate
              </span>
              <div className="text-3xl sm:text-4xl font-black text-nature-secondary mt-0.5">
                ${calculatedMonthly} <span className="text-xs text-gray-300 font-normal">/ month</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Includes container rental, weighbridge logs, and portal telemetry.
              </p>
            </div>

            <Link
              href={`/book-demo?quote=${calculatedMonthly}&bins=${binCount}&type=${binType}&freq=${frequency}`}
              className="bg-nature-primary hover:bg-nature-primary-dark text-white px-6 py-3 text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2"
            >
              <span>Lock In This Rate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Specification Matrix */}
      <section className="bg-white px-6 sm:px-12 lg:px-16 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-[28px] sm:text-[32px] font-black text-[#091426]">
              Detailed Module Specification Matrix
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Deep architectural comparison across service tiers.
            </p>
          </div>

          <div className="overflow-x-auto border border-gray-200 shadow-xs">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#091426] text-white">
                  <th className="border-r border-[#1E293B] p-4 text-left text-[12px] font-semibold uppercase tracking-[0.05em]">
                    Module Ecosystem
                  </th>
                  <th className="border-r border-[#1E293B] p-4 text-center text-[12px] font-semibold uppercase tracking-[0.05em]">
                    Residential Connect
                  </th>
                  <th className="border-r border-[#1E293B] p-4 text-center text-[12px] font-semibold uppercase tracking-[0.05em]">
                    Commercial Business
                  </th>
                  <th className="p-4 text-center text-[12px] font-semibold uppercase tracking-[0.05em]">
                    Municipal &amp; Enterprise
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {featureComparison.map((cat, cIdx) => (
                  <React.Fragment key={cIdx}>
                    <tr className="border-b border-[#c5c6cd] bg-[#f2f4f6]">
                      <td
                        className="p-3 text-[12px] font-bold uppercase tracking-[0.05em] text-[#091426]"
                        colSpan={4}
                      >
                        {cat.category}
                      </td>
                    </tr>
                    {cat.items.map((item, iIdx) => (
                      <tr
                        key={iIdx}
                        className="border-b border-[#c5c6cd] even:bg-[#f8fafc] text-sm"
                      >
                        <td className="p-4 font-medium text-[#141517]">{item.name}</td>
                        <td className="p-4 text-center">
                          {typeof item.residential === "boolean" ? (
                            item.residential ? (
                              <CheckCircle2 className="w-5 h-5 text-nature-primary mx-auto" />
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
                              <CheckCircle2 className="w-5 h-5 text-nature-primary mx-auto" />
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
                              <CheckCircle2 className="w-5 h-5 text-nature-primary mx-auto" />
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
