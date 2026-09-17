"use client";

import React, { useState } from "react";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { SuburbCoverage } from "@/data/ugandaCoverage";
import {
  MapPin,
  Calendar,
  Phone,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Search,
  X,
  Save,
} from "lucide-react";

export default function CoverageAdminPage() {
  const { coverageAreas, addCoverageArea, editCoverageArea, deleteCoverageArea } =
    useWebsiteData();

  const [search, setSearch] = useState("");
  const [editingArea, setEditingArea] = useState<SuburbCoverage | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState<SuburbCoverage>({
    id: "",
    name: "",
    division: "",
    pickupDays: "",
    recyclingDay: "",
    servicesAvailable: ["Residential Curbside", "Plastics Recycling"],
    contactPerson: "",
    hotline: "+256 766 532915",
  });

  const filteredAreas = coverageAreas.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.division.toLowerCase().includes(search.toLowerCase()) ||
      a.pickupDays.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenEdit = (area: SuburbCoverage) => {
    setEditingArea(area);
    setForm(area);
  };

  const handleOpenNew = () => {
    setEditingArea(null);
    setForm({
      id: `suburb-${Date.now()}`,
      name: "",
      division: "Kampala Metropolitan Area",
      pickupDays: "Mondays & Thursdays",
      recyclingDay: "Every Wednesday",
      servicesAvailable: ["Residential Curbside", "Roll-off Skips", "Plastics Recycling"],
      contactPerson: "Route Supervisor",
      hotline: "+256 766 532915",
    });
    setIsNewModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArea) {
      editCoverageArea(editingArea.id, form);
      setEditingArea(null);
    } else {
      addCoverageArea({ ...form, id: form.name.toLowerCase().replace(/\s+/g, "-") });
      setIsNewModalOpen(false);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2.5 py-1 rounded-sm border border-[#006F51]/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>Operational Route Logistics</span>
          </div>
          <h2 className="text-2xl font-black text-[#1A1D20] tracking-tight mt-1">
            Coverage Suburbs &amp; Pickup Schedules
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage scheduled garbage days, recycling frequencies, and route supervisor hotlines shown on the Schedule Finder.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="bg-[#006F51] hover:bg-[#005a42] text-white px-4 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Suburb Route</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Coverage zones and pickup schedule updated successfully!</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-4 rounded border border-[#E5E7EB] shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search suburb by name, division, or pickup day..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F8F9FA] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
          />
        </div>
      </div>

      {/* Grid of Suburbs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAreas.map((area) => (
          <div
            key={area.id}
            className="bg-white p-5 rounded border border-[#E5E7EB] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#006F51] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-[#1A1D20]">{area.name}</h3>
                  <span className="text-[11px] font-semibold text-[#006F51]">
                    {area.division}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(area)}
                    className="p-1.5 text-gray-500 hover:text-[#006F51] hover:bg-[#E9F4F0] rounded transition-colors cursor-pointer"
                    title="Edit Schedule"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove ${area.name} from coverage directory?`)) {
                        deleteCoverageArea(area.id);
                      }
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                    title="Delete Route"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#006F51] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block">Garbage Pickup:</strong>
                    <span className="text-gray-600">{area.pickupDays}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#FFCE00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block">Recycling Sacks:</strong>
                    <span className="text-gray-600">{area.recyclingDay}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-gray-900 block">Supervisor Hotline:</strong>
                    <span className="text-gray-600 font-mono">{area.hotline}</span>
                    <span className="text-[10px] text-gray-400 block">({area.contactPerson})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex flex-wrap gap-1">
              {area.servicesAvailable?.map((srv, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                >
                  {srv}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit / New Suburb Modal */}
      {(editingArea || isNewModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded border border-[#E5E7EB] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#006F51] text-white sticky top-0 z-10">
              <h3 className="text-base font-bold">
                {editingArea ? `Edit Route: ${editingArea.name}` : "Add New Suburb Route"}
              </h3>
              <button
                onClick={() => {
                  setEditingArea(null);
                  setIsNewModalOpen(false);
                }}
                className="p-1 text-white/80 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Suburb Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Kitende, Munyonyo, Kajjansi"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Municipal Division / District *
                </label>
                <input
                  type="text"
                  required
                  value={form.division}
                  onChange={(e) => setForm({ ...form, division: e.target.value })}
                  placeholder="e.g. Entebbe Road Corridor / Wakiso"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Garbage Pickup Days *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.pickupDays}
                    onChange={(e) => setForm({ ...form, pickupDays: e.target.value })}
                    placeholder="e.g. Tuesdays & Fridays"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Recycling Collection Day *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.recyclingDay}
                    onChange={(e) => setForm({ ...form, recyclingDay: e.target.value })}
                    placeholder="e.g. Every Wednesday"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Supervisor / Desk Contact Name
                  </label>
                  <input
                    type="text"
                    value={form.contactPerson}
                    onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                    placeholder="e.g. Kitende Dispatch Desk"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Route Hotline Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.hotline}
                    onChange={(e) => setForm({ ...form, hotline: e.target.value })}
                    placeholder="+256 766 532915"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingArea(null);
                    setIsNewModalOpen(false);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-black font-bold uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#006F51] hover:bg-[#005a42] text-white px-5 py-2 rounded font-bold uppercase text-xs tracking-wider transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Route</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
