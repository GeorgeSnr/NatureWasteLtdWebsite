"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  Trash2,
  Calendar,
  CreditCard,
  Award,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  MapPin,
  Clock,
  Plus,
  ArrowRight,
  TrendingUp,
  Cpu,
  BarChart3,
  Smartphone,
  LogOut,
  UserCheck,
  Shield,
  Lock,
  Mail,
  Phone,
  Building,
  Check,
  ExternalLink,
} from "lucide-react";
import Logo from "@/components/Logo";
import GooglePlayButton from "@/components/GooglePlayButton";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { useAuth } from "@/context/AuthContext";

export default function PortalPage() {
  const { submitRequest } = useWebsiteData();
  const {
    currentUser,
    isAuthenticated,
    isStaff,
    login,
    registerClient,
    logout,
    loginAsDemoClient,
    loginAsDemoStaff,
  } = useAuth();

  // Auth Gate state
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Registration form state
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    suburb: "Kitende",
    address: "",
    plan: "Residential Connect (120L)",
    password: "",
  });
  const [regError, setRegError] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  // Authenticated client portal states
  const [roleView, setRoleView] = useState<"client" | "fleet">("client");
  const [pickupScheduled, setPickupScheduled] = useState(false);
  const [pickupType, setPickupType] = useState("Bulky Cardboard & E-Waste");
  const [pickupDate, setPickupDate] = useState("2026-09-18");
  const [pickupInstructions, setPickupInstructions] = useState("");
  const [bagsOrdered, setBagsOrdered] = useState(false);
  const [momoPromptSent, setMomoPromptSent] = useState(false);
  const [momoPhone, setMomoPhone] = useState("");

  // Fleet state
  const [dispatchedTruck, setDispatchedTruck] = useState<string | null>(null);
  const [smartBins, setSmartBins] = useState([
    { id: "BIN-101", location: "Kisementi Square - Plot 4", type: "Street Dual Bin", fill: 89, status: "Critical" },
    { id: "BIN-102", location: "Oasis Mall Loading Bay A", type: "Commercial Metal Skip", fill: 64, status: "Normal" },
    { id: "BIN-103", location: "Lubowa Estate Entrance", type: "Community Wheelie Bay", fill: 42, status: "Normal" },
    { id: "BIN-104", location: "Nakasero Hospital Wing 2", type: "Biohazard Autoclave Bin", fill: 92, status: "Critical" },
    { id: "BIN-105", location: "Namanve Industrial Block C", type: "Hydraulic Compactor", fill: 78, status: "Warning" },
  ]);

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!loginIdentifier.trim()) {
      setLoginError("Please enter your email, phone number, or name.");
      return;
    }
    const res = login(loginIdentifier, loginPassword);
    if (!res.success) {
      setLoginError(res.message || "Failed to sign in. Please check credentials.");
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError("");
    if (!regForm.name || !regForm.phone || !regForm.email) {
      setRegError("Please fill in your name, email, and phone number.");
      return;
    }

    registerClient({
      name: regForm.name,
      email: regForm.email,
      phone: regForm.phone,
      organization: regForm.organization || "Private Residence",
      suburb: regForm.suburb,
      address: regForm.address,
      plan: regForm.plan,
      password: regForm.password,
    });
    setRegSuccess(true);
  };

  // Handle On-Demand Pickup Request
  const handleSchedulePickup = (e: React.FormEvent) => {
    e.preventDefault();
    submitRequest({
      name: currentUser?.name || "Logged Client",
      phone: currentUser?.phone || "+256 700 000 000",
      email: currentUser?.email,
      suburb: currentUser?.suburb || "Kitende",
      address: currentUser?.address,
      type: "on_demand_pickup",
      title: `On-Demand Pickup: ${pickupType}`,
      volumeOrTier: pickupType,
      preferredDate: pickupDate,
      message: pickupInstructions || `Booked by ${currentUser?.name} via Client Portal`,
      priority: "normal",
      status: "new",
      assignedTo: "Fleet Dispatch Lead",
    });
    setPickupScheduled(true);
  };

  // Handle Supplies Order
  const handleOrderBags = () => {
    submitRequest({
      name: currentUser?.name || "Logged Client",
      phone: currentUser?.phone || "+256 700 000 000",
      email: currentUser?.email,
      suburb: currentUser?.suburb || "Kitende",
      type: "supplies_order",
      title: "Recycling Sack Replenishment (10-Pack)",
      volumeOrTier: "Color-Coded Sacks",
      message: `Client requested replenishment bags to ${currentUser?.suburb || "registered address"}.`,
      priority: "normal",
      status: "new",
    });
    setBagsOrdered(true);
  };

  // Handle Dispatch Simulation
  const handleDispatch = (binId: string) => {
    setDispatchedTruck(`Compactor Unit 03 dispatched to ${binId}`);
    setTimeout(() => {
      setSmartBins((prev) =>
        prev.map((b) => (b.id === binId ? { ...b, fill: 12, status: "Normal" } : b))
      );
      setDispatchedTruck(null);
    }, 3000);
  };

  /* ====================================================================== */
  /* 1. AUTHENTICATION GATE (When visitor is not logged in)                  */
  /* ====================================================================== */
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] py-8 sm:py-16 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Brand Logo & Header */}
          <div className="text-center space-y-2">
            <div className="inline-block">
              <Logo variant="light" size="md" />
            </div>
            <div className="inline-flex items-center gap-2 bg-[#006F51] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mt-2">
              <UserCheck className="w-3.5 h-3.5" />
              <span>NatureWaste Client Services Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1A1D20] tracking-tight">
              Sign In or Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto">
              Access on-demand bulky waste collections, order color-coded recycling sack replacements, pay subscriptions, and monitor smart container fill levels.
            </p>
          </div>

          {/* Public Pricing Callout */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-amber-900">
              <CreditCard className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                Looking for waste collection rates? <strong>Pricing is 100% public</strong> without requiring an account.
              </span>
            </div>
            <Link
              href="/pricing"
              className="font-bold text-[#006F51] hover:underline shrink-0 flex items-center gap-1"
            >
              <span>View Rates &amp; Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Auth Card with Tabs */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="grid grid-cols-2 border-b border-[#E5E7EB] bg-gray-50/70 text-xs font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setAuthTab("login")}
                className={`py-4 text-center transition-colors cursor-pointer border-b-2 flex items-center justify-center gap-2 ${
                  authTab === "login"
                    ? "border-[#006F51] text-[#006F51] bg-white font-black"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Returning Clients (Sign In)</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthTab("register")}
                className={`py-4 text-center transition-colors cursor-pointer border-b-2 flex items-center justify-center gap-2 ${
                  authTab === "register"
                    ? "border-[#006F51] text-[#006F51] bg-white font-black"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>First-Time Users (Create Account)</span>
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {/* TAB 1: SIGN IN */}
              {authTab === "login" && (
                <div className="space-y-6">
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    {loginError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{loginError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Email Address, Phone Number, or Account Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="e.g. arthur@example.com or +256 772 123 456"
                          value={loginIdentifier}
                          onChange={(e) => {
                            setLoginIdentifier(e.target.value);
                            setLoginError("");
                          }}
                          className="w-full pl-3.5 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51]"
                        />
                        <Mail className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                          Password
                        </label>
                        <span className="text-[11px] text-gray-400">
                          (Leave blank or use any password in demo mode)
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full pl-3.5 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51]"
                        />
                        <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#006F51] hover:bg-[#005a42] text-white py-3 rounded-lg font-bold uppercase text-xs tracking-wider transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Sign In to Access Services</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  {/* Quick 1-Click Demo Client Shortcuts */}
                  <div className="pt-5 border-t border-gray-200">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 text-center">
                      Instant Reviewer Demo Access (1-Click)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => loginAsDemoClient(0)}
                        className="p-3 text-left rounded-lg border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 transition-colors cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-[#006F51] group-hover:underline">
                          Arthur Byaruhanga
                        </div>
                        <div className="text-[11px] text-gray-600">
                          Residential Client &bull; Kitende (120L Bin)
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => loginAsDemoClient(1)}
                        className="p-3 text-left rounded-lg border border-blue-200 bg-blue-50/60 hover:bg-blue-100 transition-colors cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-blue-800 group-hover:underline">
                          Beatrice Namuli
                        </div>
                        <div className="text-[11px] text-gray-600">
                          Commercial Client &bull; Lubowa (660L Skip)
                        </div>
                      </button>
                    </div>

                    <div className="mt-3 text-center">
                      <button
                        type="button"
                        onClick={() => loginAsDemoStaff()}
                        className="text-[11px] text-purple-700 hover:text-purple-900 font-bold underline cursor-pointer"
                      >
                        Try as Dispatch &amp; Operations Staff (Geoffrey Magezi) &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CREATE ACCOUNT */}
              {authTab === "register" && (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {regError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{regError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ronald Mugisha"
                        value={regForm.name}
                        onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Phone / Mobile Money *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+256 772 000 000"
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ronald@example.com"
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Estate or Property Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Pearl Palm Court"
                        value={regForm.organization}
                        onChange={(e) => setRegForm({ ...regForm, organization: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Neighborhood / Suburb *
                      </label>
                      <select
                        value={regForm.suburb}
                        onChange={(e) => setRegForm({ ...regForm, suburb: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#006F51]"
                      >
                        <option value="Kitende">Kitende (HQ Route)</option>
                        <option value="Lubowa">Lubowa / Quality Mall</option>
                        <option value="Kajjansi">Kajjansi / Entebbe Rd</option>
                        <option value="Entebbe">Entebbe Municipality</option>
                        <option value="Kololo">Kololo / Upper Kololo</option>
                        <option value="Bugolobi">Bugolobi / Nakawa</option>
                        <option value="Namanve">Namanve Industrial Park</option>
                        <option value="Makindye">Makindye / Kizungu</option>
                        <option value="Kira">Kira / Namugongo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                        Primary Service Category *
                      </label>
                      <select
                        value={regForm.plan}
                        onChange={(e) => setRegForm({ ...regForm, plan: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#006F51]"
                      >
                        <option value="Residential Connect (120L)">Residential Connect (120L Wheelie Bin)</option>
                        <option value="Residential Connect (240L)">Residential Connect (240L Wheelie Bin)</option>
                        <option value="Commercial Business (660L Skip)">Commercial Business (660L Metal Skip)</option>
                        <option value="Commercial Business (1100L Skip)">Commercial Business (1100L Heavy Skip)</option>
                        <option value="Enterprise & Hospital Autoclave">Enterprise &amp; Hospital Medical Waste</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Street Address / Landmarks
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Plot 18, Karl House Road, off Entebbe Highway"
                      value={regForm.address}
                      onChange={(e) => setRegForm({ ...regForm, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
                    />
                  </div>

                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-700" />
                      <span className="font-bold">Welcome Signup Bonus:</span>
                      <span>150 EcoRewards Points credited immediately</span>
                    </div>
                    <span className="font-extrabold text-[#006F51]">+150 pts</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#006F51] hover:bg-[#005a42] text-white py-3.5 rounded-lg font-bold uppercase text-xs tracking-wider transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Create Account &amp; Access Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ====================================================================== */
  /* 2. AUTHENTICATED CLIENT & STAFF PORTAL                                 */
  /* ====================================================================== */
  return (
    <div className="bg-[#F4F5F7] min-h-screen">
      {/* Top Portal Banner */}
      <div className="bg-[#14191E] text-white border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <Link href="/" className="flex items-center gap-2">
              <Logo variant="dark" size="sm" showTagline={false} />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#006F51] px-2.5 py-0.5 font-bold uppercase tracking-wider text-white rounded-full">
                Operations Cloud v2.6
              </span>
              {isStaff && (
                <Link
                  href="/admin"
                  className="text-[10px] bg-purple-700 hover:bg-purple-800 text-white font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 transition-colors"
                >
                  <Shield className="w-3 h-3" />
                  <span>Admin Portal</span>
                </Link>
              )}
            </div>
          </div>

          {/* User Status Bar & Logout */}
          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto text-xs">
            <div className="flex items-center gap-2.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-[#006F51] text-white flex items-center justify-center font-bold text-xs">
                {currentUser.name[0]}
              </div>
              <div className="text-[11px] leading-tight text-left">
                <div className="font-bold text-white">{currentUser.name}</div>
                <div className="text-gray-400 text-[10px]">
                  {currentUser.organization || currentUser.suburb || "Client"} &bull;{" "}
                  <strong className="text-emerald-400">{currentUser.ecoPoints || 150} pts</strong>
                </div>
              </div>
            </div>

            {/* Staff Role View Switcher */}
            {isStaff && (
              <div className="flex items-center gap-1 bg-white/5 p-1 border border-white/10 rounded-lg">
                <button
                  onClick={() => setRoleView("client")}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded ${
                    roleView === "client" ? "bg-[#006F51] text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Client View
                </button>
                <button
                  onClick={() => setRoleView("fleet")}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded ${
                    roleView === "fleet" ? "bg-[#006F51] text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Fleet Console
                </button>
              </div>
            )}

            <button
              onClick={logout}
              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold uppercase"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Portal Body */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {roleView === "client" ? (
          /* ======================================================== */
          /* RESIDENT & COMMERCIAL CLIENT VIEW                        */
          /* ======================================================== */
          <div className="space-y-8">
            {/* Top Welcome Header Bar */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Account Verified &bull; {currentUser.plan || "Residential Connect"}</span>
                </div>
                <h2 className="text-2xl font-black text-[#1A1D20]">
                  Hello, {currentUser.name}!
                </h2>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#006F51]" />
                  <span>Assigned Service Zone: <strong>{currentUser.suburb || "Kitende Route"}</strong></span>
                  {currentUser.address && <span>&bull; {currentUser.address}</span>}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#E9F4F0] border border-[#006F51]/20 rounded-xl p-3 text-right">
                  <div className="text-[10px] font-bold uppercase text-[#006F51] tracking-wider">
                    EcoRewards Balance
                  </div>
                  <div className="text-xl font-black text-[#1A1D20]">
                    {currentUser.ecoPoints || 150} pts
                  </div>
                  <div className="text-[10px] text-gray-500">
                    ≈ UGX {((currentUser.ecoPoints || 150) * 200).toLocaleString()} MoMo Value
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Stat 1: Next Pickup */}
              <div className="bg-white p-5 sm:p-6 border border-[#E5E7EB] shadow-xs rounded-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Next Scheduled Round</span>
                  <Calendar className="w-4 h-4 text-[#006F51]" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#1A1D20]">Tomorrow, 07:30 AM</div>
                <div className="text-xs text-[#006F51] font-bold mt-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#006F51]" />
                  <span>Route: {currentUser.suburb || "Sector Kitende-Central"}</span>
                </div>
              </div>

              {/* Stat 2: Bin Capacity */}
              <div className="bg-white p-5 sm:p-6 border border-[#E5E7EB] shadow-xs rounded-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Assigned Bin Fill</span>
                  <Trash2 className="w-4 h-4 text-[#006F51]" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#1A1D20]">48% Capacity</div>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#006F51] h-full rounded-full" style={{ width: "48%" }} />
                </div>
              </div>

              {/* Stat 3: EcoRewards */}
              <div className="bg-white p-5 sm:p-6 border border-[#E5E7EB] shadow-xs rounded-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">EcoPoints Earned</span>
                  <Award className="w-4 h-4 text-[#FFCE00]" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#1A1D20]">{currentUser.ecoPoints || 150} Points</div>
                <div className="text-xs text-gray-500 mt-2">
                  Redeemable for MTN / Airtel airtime
                </div>
              </div>

              {/* Stat 4: Billing Status */}
              <div className="bg-white p-5 sm:p-6 border border-[#E5E7EB] shadow-xs rounded-xl flex flex-col justify-between">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Subscription Status</span>
                  <CreditCard className="w-4 h-4 text-[#006F51]" />
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#006F51]">Active &amp; Paid</div>
                <div className="text-xs text-gray-500 mt-2">
                  Next round covered &bull; Oct 01, 2026
                </div>
              </div>
            </div>

            {/* Middle Row: On-Demand Pickup Request & Color-Coded Recycling Order */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 cols: Schedule Extra / Bulky Pickup */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-[#E5E7EB] shadow-xs rounded-2xl">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase text-[#006F51] tracking-wider">
                      On-Demand Services
                    </span>
                    <h3 className="text-xl font-bold text-[#1A1D20] mt-0.5">
                      Schedule Ad-Hoc or Bulky Waste Pickup
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#E9F4F0] text-[#006F51] flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                </div>

                {pickupScheduled ? (
                  <div className="bg-[#E9F4F0] border border-[#006F51]/30 p-6 text-center space-y-3 rounded-xl">
                    <CheckCircle2 className="w-10 h-10 text-[#006F51] mx-auto" />
                    <h4 className="text-lg font-bold text-[#006F51]">
                      On-Demand Pickup Booked!
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-700 max-w-md mx-auto">
                      Our dispatch vehicle has been scheduled for <strong>{pickupDate}</strong> to collect <strong>{pickupType}</strong> at <strong>{currentUser.suburb}</strong>. You earned 25 EcoRewards!
                    </p>
                    <button
                      onClick={() => setPickupScheduled(false)}
                      className="text-xs font-bold uppercase text-[#006F51] underline pt-2 cursor-pointer"
                    >
                      Book Another Collection
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSchedulePickup} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1 tracking-wider">
                        Waste Category
                      </label>
                      <select
                        value={pickupType}
                        onChange={(e) => setPickupType(e.target.value)}
                        className="w-full bg-[#F8F9FA] border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51] font-medium"
                      >
                        <option>Bulky Cardboard &amp; E-Waste (Computers, Screens)</option>
                        <option>Garden Trimmings &amp; Landscaping Foliage</option>
                        <option>Old Furniture / Mattress Bulk Disposal</option>
                        <option>Construction Renovation Debris</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1 tracking-wider">
                          Collection Date
                        </label>
                        <input
                          type="date"
                          required
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full bg-[#F8F9FA] border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51] font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-gray-700 mb-1 tracking-wider">
                          Pickup Time Slot
                        </label>
                        <select className="w-full bg-[#F8F9FA] border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51] font-medium">
                          <option>Morning (08:00 AM - 12:00 PM)</option>
                          <option>Afternoon (01:00 PM - 05:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1 tracking-wider">
                        Pickup Location / Specific Instructions
                      </label>
                      <input
                        type="text"
                        value={pickupInstructions}
                        onChange={(e) => setPickupInstructions(e.target.value)}
                        placeholder={`e.g. Leave at gate in ${currentUser.suburb || "Kitende"}`}
                        className="w-full bg-[#F8F9FA] border border-gray-300 rounded-lg px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51] font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#006F51] hover:bg-[#005a42] text-white py-3.5 font-bold uppercase text-xs tracking-wider transition-colors rounded-lg shadow-xs cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Request Pickup Dispatch</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>

              {/* Right 5 cols: Color-Coded Recycling Bags & Mobile Money */}
              <div className="lg:col-span-5 space-y-6">
                {/* Bags Order Card */}
                <div className="bg-white p-6 sm:p-7 border border-[#E5E7EB] shadow-xs rounded-2xl">
                  <span className="text-xs font-bold uppercase text-[#006F51] tracking-wider">
                    Zero-Waste Supplies
                  </span>
                  <h3 className="text-lg font-bold text-[#1A1D20] mt-0.5 mb-2">
                    Order Color-Coded Recycling Sacks
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Source-segregation made easy. Replacement sacks are delivered directly during your weekly collection.
                  </p>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center justify-between p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-bold text-blue-900">
                      <span>Blue Sacks (Clean Plastics &amp; PET)</span>
                      <span>10 Pack / Free</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs font-bold text-amber-900">
                      <span>Yellow Sacks (Cardboard &amp; Paper)</span>
                      <span>10 Pack / Free</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-green-50 border border-green-200 rounded-lg text-xs font-bold text-green-900">
                      <span>Green Sacks (Biodegradable Food Waste)</span>
                      <span>10 Pack / Free</span>
                    </div>
                  </div>

                  {bagsOrdered ? (
                    <div className="p-3 bg-[#E9F4F0] text-[#006F51] text-xs font-bold text-center border border-[#006F51]/30 rounded-lg">
                      ✓ Free Sacks Dispatched with Tomorrow&apos;s Collection!
                    </div>
                  ) : (
                    <button
                      onClick={handleOrderBags}
                      className="w-full bg-[#1A1D20] hover:bg-black text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Deliver Replacement Bags
                    </button>
                  )}
                </div>

                {/* Instant Mobile Money Payment Card */}
                <div className="bg-[#006F51] text-white p-6 sm:p-7 shadow-xs rounded-2xl border border-[#005a42] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FFCE00]">
                      Instant Bill Pay
                    </span>
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold">Pay via Mobile Money (MTN / Airtel)</h4>
                  <p className="text-xs text-white/80">
                    Receive an instant push PIN prompt to clear your waste subscription.
                  </p>
                  <div className="flex gap-2 pt-2">
                    <input
                      type="tel"
                      value={momoPhone || currentUser.phone}
                      onChange={(e) => setMomoPhone(e.target.value)}
                      placeholder="0770 000 000"
                      className="bg-white/10 border border-white/30 text-white placeholder-white/60 px-3 py-2 text-xs rounded-lg focus:outline-none flex-1"
                    />
                    <button
                      onClick={() => {
                        setMomoPromptSent(true);
                        setTimeout(() => setMomoPromptSent(false), 5000);
                      }}
                      className="bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] px-4 py-2 text-xs font-bold uppercase rounded-lg cursor-pointer transition-colors"
                    >
                      Send PIN Prompt
                    </button>
                  </div>
                  {momoPromptSent && (
                    <div className="p-2.5 bg-emerald-800/80 border border-emerald-500 text-xs rounded-lg text-emerald-100 font-bold">
                      ✓ Push PIN prompt initiated to {momoPhone || currentUser.phone}! Enter your MoMo PIN to complete.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* NatureWaste Connect Mobile App Banner for Clients */}
            <div className="bg-white p-6 sm:p-7 border border-[#E5E7EB] shadow-xs rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E9F4F0] text-[#006F51] flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2 py-0.5 rounded mb-1">
                    Available on Android
                  </div>
                  <h4 className="text-lg font-bold text-[#1A1D20]">
                    Download the NatureWaste Connect App
                  </h4>
                  <p className="text-xs text-gray-500">
                    Real-time compactor truck tracking, push route alerts, and instant Mobile Money bill settlements right on your phone.
                  </p>
                </div>
              </div>
              <GooglePlayButton variant="dark" size="md" className="shrink-0 shadow-md" />
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* FLEET & DISPATCH OPERATIONS CONSOLE (Staff Mode)          */
          /* ======================================================== */
          <div className="space-y-8">
            {/* Live Dispatch Notification */}
            {dispatchedTruck && (
              <div className="bg-[#006F51] text-white p-4 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  <span>{dispatchedTruck}</span>
                </div>
                <span className="text-xs bg-[#FFCE00] text-[#1A1D20] px-2.5 py-1 font-bold rounded-lg">
                  En Route (ETA 14 Mins)
                </span>
              </div>
            )}

            {/* Fleet Operations Overview Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-[#E5E7EB] shadow-xs rounded-xl">
                <div className="text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">
                  Active Fleet Vehicles
                </div>
                <div className="text-3xl font-black text-[#1A1D20]">14 / 16</div>
                <div className="text-xs text-[#006F51] font-bold mt-2">
                  87.5% Fleet Availability
                </div>
              </div>

              <div className="bg-white p-6 border border-[#E5E7EB] shadow-xs rounded-xl">
                <div className="text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">
                  Today&apos;s Tonnage Collected
                </div>
                <div className="text-3xl font-black text-[#1A1D20]">48.6 MT</div>
                <div className="text-xs text-[#006F51] font-bold mt-2">
                  +12% vs last Tuesday
                </div>
              </div>

              <div className="bg-white p-6 border border-[#E5E7EB] shadow-xs rounded-xl">
                <div className="text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">
                  Critical Full Bins (&gt;80%)
                </div>
                <div className="text-3xl font-black text-red-600">
                  {smartBins.filter((b) => b.fill > 80).length} Alerts
                </div>
                <div className="text-xs text-red-600 font-bold mt-2">
                  Requires Dynamic Reroute
                </div>
              </div>

              <div className="bg-white p-6 border border-[#E5E7EB] shadow-xs rounded-xl">
                <div className="text-xs font-bold uppercase text-gray-500 mb-1 tracking-wider">
                  MRF Polymer Recovery
                </div>
                <div className="text-3xl font-black text-[#006F51]">94.2%</div>
                <div className="text-xs text-gray-500 mt-2">
                  PET &amp; HDPE Quality Purity
                </div>
              </div>
            </div>

            {/* Smart Bins Live IoT Matrix */}
            <div className="bg-white border border-[#E5E7EB] shadow-xs rounded-xl overflow-hidden">
              <div className="p-6 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#006F51]">
                    IoT Telemetry
                  </span>
                  <h3 className="text-xl font-bold text-[#1A1D20] mt-0.5">
                    Municipal &amp; Commercial Smart Bin Telemetry
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 font-mono">
                    Polling frequency: every 15 mins
                  </span>
                  <button
                    onClick={() => alert("Refreshed sensor telemetry from all cellular nodes!")}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer"
                    aria-label="Refresh Sensors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left border-collapse text-xs">
                  <thead className="bg-[#1A1D20] text-white text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Bin Node ID</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Container Type</th>
                      <th className="p-4">Fill Percentage</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Dispatch Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB] font-medium">
                    {smartBins.map((bin) => {
                      const isCritical = bin.fill > 80;
                      return (
                        <tr key={bin.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-4 font-mono font-bold text-[#1A1D20]">
                            {bin.id}
                          </td>
                          <td className="p-4 text-gray-700">{bin.location}</td>
                          <td className="p-4 text-gray-500">{bin.type}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    isCritical
                                      ? "bg-red-600"
                                      : bin.fill > 60
                                      ? "bg-amber-500"
                                      : "bg-[#006F51]"
                                  }`}
                                  style={{ width: `${bin.fill}%` }}
                                />
                              </div>
                              <span
                                className={`font-mono font-bold ${
                                  isCritical ? "text-red-600 font-black" : "text-gray-700"
                                }`}
                              >
                                {bin.fill}%
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                isCritical
                                  ? "bg-red-100 text-red-800"
                                  : bin.fill > 60
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {bin.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            {isCritical ? (
                              <button
                                onClick={() => handleDispatch(bin.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs"
                              >
                                Dispatch Truck
                              </button>
                            ) : (
                              <span className="text-xs text-gray-400 font-mono">
                                Next Schedule
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
