"use client";

import React, { useState } from "react";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { CompanySettings } from "@/types/admin";
import Link from "next/link";
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Save,
  RotateCcw,
  Key,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function SettingsAdminPage() {
  const { companySettings, updateCompanySettings, resetAllToDefault } = useWebsiteData();
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [form, setForm] = useState<CompanySettings>(companySettings);

  // Master Passcode & Security States
  const [masterPasscode, setMasterPasscode] = useState<string>("Admin#Magezi2026!NW");
  const [newPasscodeInput, setNewPasscodeInput] = useState("");
  const [showCurrentPasscode, setShowCurrentPasscode] = useState(false);
  const [showNewPasscode, setShowNewPasscode] = useState(false);
  const [passcodeSuccessMsg, setPasscodeSuccessMsg] = useState<string | null>(null);
  const [passcodeErrorMsg, setPasscodeErrorMsg] = useState<string | null>(null);
  const [staySignedInPolicy, setStaySignedInPolicy] = useState(true);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("nw_admin_master_passcode");
      if (stored) setMasterPasscode(stored);

      const persistentAuth = localStorage.getItem("nw_admin_auth_persistent");
      setStaySignedInPolicy(persistentAuth === "true");
    }
  }, []);

  const handleUpdateMasterPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newPasscodeInput.trim();
    if (clean.length < 6) {
      setPasscodeErrorMsg("Passcode must be at least 6 characters long.");
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("nw_admin_master_passcode", clean);
    }
    setMasterPasscode(clean);
    setNewPasscodeInput("");
    setPasscodeErrorMsg(null);
    setPasscodeSuccessMsg("Master Admin Passcode successfully updated! You can now use this passcode for portal login.");
    setTimeout(() => setPasscodeSuccessMsg(null), 4500);
  };

  const handleGeneratePasscode = () => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const suggested = `Admin#NW2026!${randomDigits}`;
    setNewPasscodeInput(suggested);
    setShowNewPasscode(true);
    setPasscodeErrorMsg(null);
  };

  const handleResetToDefaultPasscode = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("nw_admin_master_passcode");
    }
    setMasterPasscode("Admin#Magezi2026!NW");
    setPasscodeSuccessMsg("Master passcode reset to factory default (Admin#Magezi2026!NW).");
    setTimeout(() => setPasscodeSuccessMsg(null), 4000);
  };

  const handleToggleStaySignedIn = (enable: boolean) => {
    setStaySignedInPolicy(enable);
    if (typeof window !== "undefined") {
      if (enable) {
        localStorage.setItem("nw_admin_auth_persistent", "true");
      } else {
        localStorage.removeItem("nw_admin_auth_persistent");
      }
    }
    setPasscodeSuccessMsg(
      enable
        ? "Relogin policy updated: Active devices will stay signed in across browser sessions."
        : "Relogin policy updated: Re-entering passcode will be required when closing the browser."
    );
    setTimeout(() => setPasscodeSuccessMsg(null), 3500);
  };

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

      {/* Admin Portal Security & Master Passcode Card */}
      <div id="security" className="bg-white p-6 sm:p-8 rounded border border-[#E5E7EB] shadow-xs space-y-6 text-xs">
        <div className="border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2 font-bold text-sm text-[#1A1D20]">
            <Key className="w-4 h-4 text-[#006F51]" />
            <span>Admin Portal Master Passcode &amp; Relogin Security</span>
          </div>
          <p className="text-gray-500 text-xs mt-0.5">
            Configure the primary supervisor passcode used to sign in to this administrative portal, and manage automatic relogin session persistence.
          </p>
        </div>

        {passcodeSuccessMsg && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded font-bold flex items-center justify-between gap-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{passcodeSuccessMsg}</span>
            </div>
            <button
              type="button"
              onClick={() => setPasscodeSuccessMsg(null)}
              className="text-emerald-700 hover:text-emerald-900 p-1 cursor-pointer"
            >
              &times;
            </button>
          </div>
        )}

        {passcodeErrorMsg && (
          <div className="p-3 bg-red-50 border border-red-300 text-red-800 rounded font-bold flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
            <span>{passcodeErrorMsg}</span>
          </div>
        )}

        {/* 1. Current Master Passcode Display */}
        <div className="bg-[#F8F9FA] p-4 rounded border border-gray-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                Current Active Master Passcode
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span className="font-mono text-sm font-bold bg-white px-3 py-1 rounded border border-gray-300 text-[#1A1D20]">
                  {showCurrentPasscode ? masterPasscode : "••••••••••••••••"}
                </span>
                <button
                  type="button"
                  onClick={() => setShowCurrentPasscode(!showCurrentPasscode)}
                  className="px-2.5 py-1 bg-white hover:bg-gray-100 border border-gray-300 rounded text-gray-700 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {showCurrentPasscode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showCurrentPasscode ? "Hide" : "Reveal"}</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleResetToDefaultPasscode}
              className="text-xs text-gray-500 hover:text-red-600 underline self-start sm:self-center cursor-pointer"
            >
              Reset to Factory Default (Admin#Magezi2026!NW)
            </button>
          </div>
          <div className="text-[11px] text-gray-500">
            This master passcode grants full administrative access across all portal modules without requiring an individual staff profile.
          </div>
        </div>

        {/* 2. Set New Master Passcode Form */}
        <form onSubmit={handleUpdateMasterPasscode} className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700">
              Set New Master Passcode
            </label>
            <button
              type="button"
              onClick={handleGeneratePasscode}
              className="text-[11px] font-bold text-[#006F51] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFCE00]" />
              <span>Generate Memorable Passcode</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                type={showNewPasscode ? "text" : "password"}
                placeholder="Enter new master passcode (min 6 chars)..."
                value={newPasscodeInput}
                onChange={(e) => {
                  setNewPasscodeInput(e.target.value);
                  setPasscodeErrorMsg(null);
                }}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51] focus:bg-white font-mono"
              />
              <button
                type="button"
                onClick={() => setShowNewPasscode(!showNewPasscode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                title={showNewPasscode ? "Hide" : "Show"}
              >
                {showNewPasscode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button
              type="submit"
              className="bg-[#006F51] hover:bg-[#005a42] text-white px-5 py-2.5 rounded font-bold uppercase text-xs tracking-wider transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Save Master Passcode</span>
            </button>
          </div>
        </form>

        {/* 3. Relogin & Session Persistence Configuration */}
        <div className="pt-4 border-t border-gray-100 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
            Relogin &amp; Device Session Policy
          </span>

          <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded border border-gray-200">
            <div>
              <div className="font-bold text-sm text-[#1A1D20]">
                Stay Signed In on This Device (Automatic Relogin)
              </div>
              <div className="text-gray-500 text-xs mt-0.5">
                {staySignedInPolicy
                  ? "Active: Your session persists across browser restarts on this computer. You will not be prompted to re-enter passcode on every visit."
                  : "Session Only: Your session clears as soon as the browser tab is closed. Passcode re-entry is required for every session."}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleToggleStaySignedIn(!staySignedInPolicy)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ${
                staySignedInPolicy ? "bg-[#006F51]" : "bg-gray-300"
              }`}
              aria-pressed={staySignedInPolicy}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  staySignedInPolicy ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* 4. Staff Individual Accounts Link */}
        <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/60 p-3.5 rounded border border-emerald-100">
          <div className="flex items-center gap-2 text-xs text-emerald-950">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Need to manage or reset passwords for individual staff accounts (Dispatchers, Compliance Officers)?
            </span>
          </div>

          <Link
            href="/admin/users"
            className="text-xs font-bold text-[#006F51] hover:underline inline-flex items-center gap-1 shrink-0"
          >
            <span>Access Management &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
