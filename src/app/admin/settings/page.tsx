"use client";

import React, { useState } from "react";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { CompanySettings } from "@/types/admin";
import { Settings, Phone, Mail, MapPin, Clock, ShieldCheck, TrendingUp, CheckCircle2, Save, RotateCcw } from "lucide-react";

export default function SettingsAdminPage() {
  const { companySettings, updateCompanySettings, resetAllToDefault } = useWebsiteData();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [form, setForm] = useState<CompanySettings>(companySettings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanySettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (
      confirm(
        "Are you sure you want to reset all website data (inquiries, coverage, prices, settings) to factory defaults?"
      )
    ) {
      resetAllToDefault();
      alert("All demo datasets have been reset to factory defaults.");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2.5 py-1 rounded-sm border border-[#006F51]/20">
          <Settings className="w-3.5 h-3.5" />
          <span>General Organization Profile</span>
        </div>
        <h2 className="text-2xl font-black text-[#1A1D20] tracking-tight mt-1">
          Company Settings &amp; Dispatch Hotlines
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Edit global contact channels, NEMA statutory licensing, operational hours, and impact metrics across the website.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Company settings and contact details successfully saved!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded border border-[#E5E7EB] shadow-xs space-y-6 text-xs">
        {/* Section 1: Hotlines & Communication */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-[#1A1D20] border-b border-gray-100 pb-2">
            <Phone className="w-4 h-4 text-[#006F51]" />
            <span>Communication &amp; Dispatch Channels</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Primary Dispatch Phone *
              </label>
              <input
                type="text"
                required
                value={form.phonePrimary}
                onChange={(e) => setForm({ ...form, phonePrimary: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Commercial Tenders Line
              </label>
              <input
                type="text"
                value={form.phoneCommercial}
                onChange={(e) => setForm({ ...form, phoneCommercial: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                WhatsApp Dispatch Line *
              </label>
              <input
                type="text"
                required
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Primary Support Email *
              </label>
              <input
                type="email"
                required
                value={form.emailPrimary}
                onChange={(e) => setForm({ ...form, emailPrimary: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Tenders &amp; Enterprise Email
              </label>
              <input
                type="email"
                value={form.emailTenders}
                onChange={(e) => setForm({ ...form, emailTenders: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Physical Address & Licensing */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 font-bold text-sm text-[#1A1D20] border-b border-gray-100 pb-2">
            <MapPin className="w-4 h-4 text-[#006F51]" />
            <span>Headquarters &amp; NEMA Licensing</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Address Line 1 *
              </label>
              <input
                type="text"
                required
                value={form.addressLine1}
                onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Address Line 2 (District &amp; Country) *
              </label>
              <input
                type="text"
                required
                value={form.addressLine2}
                onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              NEMA Statutory License Registration Notice *
            </label>
            <input
              type="text"
              required
              value={form.nemaLicenseNumber}
              onChange={(e) => setForm({ ...form, nemaLicenseNumber: e.target.value })}
              placeholder="e.g. NEMA Statutory Lic #WM/2024/098"
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
            />
          </div>
        </div>

        {/* Section 3: Operational Working Hours */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 font-bold text-sm text-[#1A1D20] border-b border-gray-100 pb-2">
            <Clock className="w-4 h-4 text-[#006F51]" />
            <span>Operational Dispatch Hours</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Monday – Friday
              </label>
              <input
                type="text"
                value={form.hoursWeekday}
                onChange={(e) => setForm({ ...form, hoursWeekday: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Saturday
              </label>
              <input
                type="text"
                value={form.hoursSaturday}
                onChange={(e) => setForm({ ...form, hoursSaturday: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Sunday / Holidays
              </label>
              <input
                type="text"
                value={form.hoursSunday}
                onChange={(e) => setForm({ ...form, hoursSunday: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Public Proof & Metric Counters */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 font-bold text-sm text-[#1A1D20] border-b border-gray-100 pb-2">
            <TrendingUp className="w-4 h-4 text-[#006F51]" />
            <span>Public Impact Counters</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Tonnage Diverted
              </label>
              <input
                type="text"
                value={form.statsTonnage}
                onChange={(e) => setForm({ ...form, statsTonnage: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs font-bold focus:outline-none focus:border-[#006F51]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Households Served
              </label>
              <input
                type="text"
                value={form.statsHouseholds}
                onChange={(e) => setForm({ ...form, statsHouseholds: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs font-bold focus:outline-none focus:border-[#006F51]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Recycling Purity %
              </label>
              <input
                type="text"
                value={form.statsPurity}
                onChange={(e) => setForm({ ...form, statsPurity: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs font-bold focus:outline-none focus:border-[#006F51]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                Compactor Fleet
              </label>
              <input
                type="text"
                value={form.statsFleet}
                onChange={(e) => setForm({ ...form, statsFleet: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs font-bold focus:outline-none focus:border-[#006F51]"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="text-gray-500 hover:text-red-600 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data to Factory Defaults</span>
          </button>

          <button
            type="submit"
            className="bg-[#006F51] hover:bg-[#005a42] text-white px-6 py-2.5 rounded font-bold uppercase text-xs tracking-wider transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Global Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
