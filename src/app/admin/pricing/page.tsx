"use client";

import React, { useState } from "react";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { PricingPlan } from "@/data/pricingPlans";
import { CreditCard, CheckCircle2, Edit2, Plus, Trash2, Save, X, Sparkles } from "lucide-react";

export default function PricingAdminPage() {
  const { pricingList, editPricingPlan } = useWebsiteData();
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form state
  const [form, setForm] = useState<PricingPlan>({
    id: "",
    name: "",
    badge: "",
    priceMonthly: 0,
    priceAnnual: 0,
    description: "",
    popular: false,
    features: [],
    cta: "",
    ctaLink: "",
  });

  const [newFeatureText, setNewFeatureText] = useState("");

  const handleOpenEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setForm(plan);
    setNewFeatureText("");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    editPricingPlan(editingPlan.id, form);
    setEditingPlan(null);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setForm({ ...form, features: [...form.features, newFeatureText.trim()] });
    setNewFeatureText("");
  };

  const handleRemoveFeature = (idx: number) => {
    setForm({
      ...form,
      features: form.features.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2.5 py-1 rounded-sm border border-[#006F51]/20">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Commercial &amp; Residential Tier Rates</span>
          </div>
          <h2 className="text-2xl font-black text-[#1A1D20] tracking-tight mt-1">
            Pricing Plans &amp; Subscription Packages
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Modify monthly and annual subscription rates, included features, and call-to-action buttons shown on the Pricing page.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Pricing plan updated successfully! Changes reflect on the live website.</span>
        </div>
      )}

      {/* Grid of Pricing Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pricingList.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded border p-6 flex flex-col justify-between shadow-xs relative ${
              plan.popular ? "border-[#006F51] ring-2 ring-[#006F51]/20" : "border-[#E5E7EB]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2.5 py-0.5 rounded">
                  {plan.badge || "Standard Tier"}
                </span>
                <button
                  onClick={() => handleOpenEdit(plan)}
                  className="p-1.5 text-gray-500 hover:text-[#006F51] hover:bg-[#E9F4F0] rounded transition-colors cursor-pointer"
                  title="Edit Plan"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-black text-[#1A1D20]">{plan.name}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed min-h-[36px]">
                {plan.description}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-baseline gap-1">
                <span className="text-3xl font-black text-[#1A1D20]">
                  {typeof plan.priceMonthly === "number" ? `$${plan.priceMonthly}` : plan.priceMonthly}
                </span>
                <span className="text-xs text-gray-500">
                  {typeof plan.priceMonthly === "number" ? "/ month" : "pricing"}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">
                  Included Features:
                </div>
                <ul className="space-y-1.5 text-gray-600">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#006F51] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-mono">Button: {plan.cta}</span>
              <button
                onClick={() => handleOpenEdit(plan)}
                className="text-xs font-bold text-[#006F51] hover:underline cursor-pointer"
              >
                Modify Tier &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded border border-[#E5E7EB] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#006F51] text-white sticky top-0 z-10">
              <h3 className="text-base font-bold">Edit Plan: {editingPlan.name}</h3>
              <button
                onClick={() => setEditingPlan(null)}
                className="p-1 text-white/80 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Plan Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Badge Tag (e.g. MOST POPULAR)
                  </label>
                  <input
                    type="text"
                    value={form.badge || ""}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Plan Description
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Monthly Price ($ or Custom) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.priceMonthly}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        priceMonthly: isNaN(Number(e.target.value))
                          ? e.target.value
                          : Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Annual Price / mo ($ or Custom)
                  </label>
                  <input
                    type="text"
                    value={form.priceAnnual}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        priceAnnual: isNaN(Number(e.target.value))
                          ? e.target.value
                          : Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              {/* Features List Manager */}
              <div className="space-y-2 pt-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700">
                  Included Features ({form.features.length})
                </label>

                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {form.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded text-xs"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add a new feature bullet..."
                    value={newFeatureText}
                    onChange={(e) => setNewFeatureText(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="bg-[#006F51] text-white px-3 py-2 rounded font-bold uppercase text-xs hover:bg-[#005a42]"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Call-to-Action Button Label
                  </label>
                  <input
                    type="text"
                    value={form.cta}
                    onChange={(e) => setForm({ ...form, cta: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Button Target Link
                  </label>
                  <input
                    type="text"
                    value={form.ctaLink}
                    onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2 text-gray-600 hover:text-black font-bold uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#006F51] hover:bg-[#005a42] text-white px-5 py-2 rounded font-bold uppercase text-xs tracking-wider transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Plan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
