"use client";

import React, { useState } from "react";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { ServiceCategory } from "@/data/wasteServices";
import { Layers, CheckCircle2, Edit2, Plus, Trash2, Save, X } from "lucide-react";

export default function ServicesAdminPage() {
  const { wasteServices, editWasteService } = useWebsiteData();
  const [editingService, setEditingService] = useState<ServiceCategory | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState<ServiceCategory>({
    id: "",
    title: "",
    category: "residential",
    shortDesc: "",
    fullDesc: "",
    badge: "",
    image: "",
    features: [],
    ctaText: "",
    ctaLink: "",
  });

  const [newFeature, setNewFeature] = useState("");

  const handleOpenEdit = (srv: ServiceCategory) => {
    setEditingService(srv);
    setForm(srv);
    setNewFeature("");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    editWasteService(editingService.id, form);
    setEditingService(null);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setForm({ ...form, features: [...form.features, newFeature.trim()] });
    setNewFeature("");
  };

  const handleRemoveFeature = (idx: number) => {
    setForm({ ...form, features: form.features.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2.5 py-1 rounded-sm border border-[#006F51]/20">
          <Layers className="w-3.5 h-3.5" />
          <span>Core Operational Offerings</span>
        </div>
        <h2 className="text-2xl font-black text-[#1A1D20] tracking-tight mt-1">
          Services &amp; Waste Streams Manager
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Edit service categories, descriptions, feature bullet points, and images displayed across the website.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Service offering updated successfully!</span>
        </div>
      )}

      {/* Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wasteServices.map((srv) => (
          <div
            key={srv.id}
            className="bg-white rounded border border-[#E5E7EB] shadow-xs overflow-hidden flex flex-col justify-between hover:border-[#006F51] transition-colors"
          >
            <div>
              {/* Image & Badge */}
              <div className="relative h-44 w-full bg-gray-900 overflow-hidden">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#006F51] text-white px-2.5 py-1 rounded shadow-xs">
                    {srv.badge}
                  </span>
                </div>
                <button
                  onClick={() => handleOpenEdit(srv)}
                  className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-[#006F51] text-white rounded transition-colors cursor-pointer"
                  title="Edit Service"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-bold drop-shadow-xs">{srv.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4 text-xs">
                <p className="text-gray-600 leading-relaxed">{srv.shortDesc}</p>

                <div className="space-y-1.5 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Key Features:
                  </span>
                  <ul className="space-y-1">
                    {srv.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#006F51] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-mono">Button: {srv.ctaText}</span>
              <button
                onClick={() => handleOpenEdit(srv)}
                className="text-xs font-bold text-[#006F51] hover:underline cursor-pointer"
              >
                Edit Content &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded border border-[#E5E7EB] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#006F51] text-white sticky top-0 z-10">
              <h3 className="text-base font-bold">Edit Service: {editingService.title}</h3>
              <button
                onClick={() => setEditingService(null)}
                className="p-1 text-white/80 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Badge Tag (e.g. Popular for Homes)
                  </label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Short Summary
                </label>
                <textarea
                  rows={2}
                  value={form.shortDesc}
                  onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                />
              </div>

              {/* Feature items */}
              <div className="space-y-2 pt-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700">
                  Feature Bullet Points
                </label>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
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
                    placeholder="Add bullet point..."
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
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
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={form.ctaText}
                    onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Button Link Target
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
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 text-gray-600 hover:text-black font-bold uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#006F51] hover:bg-[#005a42] text-white px-5 py-2 rounded font-bold uppercase text-xs tracking-wider transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
