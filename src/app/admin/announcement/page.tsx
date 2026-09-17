"use client";

import React, { useState } from "react";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { Bell, CheckCircle2, Save, Eye, ArrowRight, AlertTriangle, Info, AlertCircle } from "lucide-react";
import AnnouncementBanner from "@/components/AnnouncementBanner";

export default function AnnouncementAdminPage() {
  const { announcement, updateAnnouncement } = useWebsiteData();
  const [savedAlert, setSavedAlert] = useState(false);

  const [form, setForm] = useState({
    enabled: announcement.enabled,
    message: announcement.message,
    badge: announcement.badge || "Operational Update",
    linkText: announcement.linkText || "",
    linkUrl: announcement.linkUrl || "",
    type: announcement.type || "info",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement(form);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2.5 py-1 rounded-sm border border-[#006F51]/20">
          <Bell className="w-3.5 h-3.5" />
          <span>Global Alert Header</span>
        </div>
        <h2 className="text-2xl font-black text-[#1A1D20] tracking-tight mt-1">
          Website Announcement &amp; Route Notice Banner
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Display timely alerts at the very top of all public pages (e.g. public holiday route adjustments, severe weather notices, or app promotion).
        </p>
      </div>

      {savedAlert && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Announcement banner successfully updated! Check the live site to see changes.</span>
        </div>
      )}

      {/* Live Preview Card */}
      <div className="bg-white p-5 rounded border border-[#E5E7EB] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-[#006F51]" />
            <span>Live Preview Simulation</span>
          </span>
          <span
            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
              form.enabled ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-500"
            }`}
          >
            {form.enabled ? "Enabled on Public Site" : "Currently Hidden"}
          </span>
        </div>

        <div className="rounded overflow-hidden border border-gray-300 shadow-xs">
          {form.enabled ? (
            <div
              className={`p-2.5 px-4 text-xs flex flex-wrap items-center justify-between gap-2 ${
                form.type === "warning"
                  ? "bg-[#FFCE00] text-[#1A1D20]"
                  : form.type === "emergency"
                  ? "bg-red-700 text-white"
                  : form.type === "success"
                  ? "bg-emerald-700 text-white"
                  : "bg-[#004D38] text-white"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold uppercase text-[10px] bg-black/20 px-2 py-0.5 rounded">
                  {form.badge || "Notice"}
                </span>
                <span>{form.message}</span>
                {form.linkText && (
                  <span className="underline font-bold ml-1 flex items-center gap-0.5">
                    <span>{form.linkText}</span>
                    <ArrowRight className="w-3 h-3 inline" />
                  </span>
                )}
              </div>
              <span className="text-xs opacity-60">&times;</span>
            </div>
          ) : (
            <div className="p-4 bg-gray-100 text-gray-500 text-xs italic text-center">
              Banner is disabled. Toggle the switch below to display on the live site.
            </div>
          )}
        </div>
      </div>

      {/* Configuration Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded border border-[#E5E7EB] shadow-xs space-y-5 text-xs">
        {/* Enable / Disable Switch */}
        <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded border border-gray-200">
          <div>
            <div className="font-bold text-sm text-[#1A1D20]">Enable Announcement Banner</div>
            <div className="text-gray-500 text-xs">
              When turned on, this banner will appear pinned to the very top of the website.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setForm({ ...form, enabled: !form.enabled })}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              form.enabled ? "bg-[#006F51]" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                form.enabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Message Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
            Banner Announcement Message *
          </label>
          <textarea
            rows={3}
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="e.g. Due to Independence Day holiday, Friday pickup in Kitende will move to Saturday morning..."
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51] focus:bg-white leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Badge Label */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Badge Tag Text
            </label>
            <input
              type="text"
              value={form.badge}
              onChange={(e) => setForm({ ...form, badge: e.target.value })}
              placeholder="e.g. Operational Update, Holiday Notice, Alert"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51] focus:bg-white"
            />
          </div>

          {/* Color Style Theme */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Color Theme / Urgency Level
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as any })}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded text-xs font-semibold focus:outline-none focus:border-[#006F51] focus:bg-white"
            >
              <option value="info">Emerald Green (Standard Informational)</option>
              <option value="warning">Accent Yellow (High Visibility Alert)</option>
              <option value="emergency">Crimson Red (Severe Weather / Service Disruption)</option>
              <option value="success">Vibrant Green (Campaign Milestone / EcoRewards)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Link Text */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Call-to-Action Link Text (Optional)
            </label>
            <input
              type="text"
              value={form.linkText}
              onChange={(e) => setForm({ ...form, linkText: e.target.value })}
              placeholder="e.g. Check Schedule, View Rates, Download App"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51] focus:bg-white"
            />
          </div>

          {/* Link URL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Target Link URL
            </label>
            <input
              type="text"
              value={form.linkUrl}
              onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
              placeholder="e.g. /#schedule-finder or /pricing"
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51] focus:bg-white"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            type="submit"
            className="bg-[#006F51] hover:bg-[#005a42] text-white px-6 py-3 rounded font-bold uppercase text-xs tracking-wider transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish Announcement to Website</span>
          </button>
        </div>
      </form>
    </div>
  );
}
