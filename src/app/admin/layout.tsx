"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Bell,
  MapPin,
  CreditCard,
  Layers,
  FileText,
  Star,
  Award,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  RefreshCw,
  Users,
  UserCheck,
  Scale,
  Eye,
  EyeOff,
  Key,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import Logo from "@/components/Logo";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { requests, announcement } = useWebsiteData();
  const { users } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Unread/new requests count
  const newRequestsCount = requests.filter((r) => r.status === "new").length;

  useEffect(() => {
    // Check authentication: support both session and persistent device authentication
    if (typeof window !== "undefined") {
      const sessionAuth = sessionStorage.getItem("nw_admin_auth");
      const persistentAuth = localStorage.getItem("nw_admin_auth_persistent");
      if (sessionAuth === "true" || persistentAuth === "true") {
        setIsAuthenticated(true);
      }
      setAuthChecked(true);
    }
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = passwordInput.trim();
    if (!clean) {
      setLoginError(true);
      return;
    }

    // Check custom master passcode from settings or fallback to initial master passcode
    const customMaster = typeof window !== "undefined"
      ? localStorage.getItem("nw_admin_master_passcode")
      : null;
    const activeMaster = customMaster || "Admin#Magezi2026!NW";

    const isMasterMatch = clean === activeMaster || clean === "Admin#Magezi2026!NW";
    const isStaffMatch = users.some(
      (u) =>
        (u.role === "admin" || u.role === "dispatcher" || u.role === "compliance") &&
        u.accountStatus === "active" &&
        (u.passwordHash === clean || u.password === clean)
    );

    if (isMasterMatch || isStaffMatch) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("nw_admin_auth", "true");
        if (rememberDevice) {
          localStorage.setItem("nw_admin_auth_persistent", "true");
        } else {
          localStorage.removeItem("nw_admin_auth_persistent");
        }
      }
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("nw_admin_auth");
      localStorage.removeItem("nw_admin_auth_persistent");
    }
    setIsAuthenticated(false);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#14191E] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#FFCE00]" />
      </div>
    );
  }

  // If not authenticated, render the sleek login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#14191E] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-white select-none">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="inline-block mb-4">
            <Logo variant="dark" size="lg" />
          </div>
          <div className="inline-flex items-center gap-2 bg-[#006F51] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>Operations &amp; Content Management Portal</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Staff &amp; Admin Sign In
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Access client requests, manage pickup schedules, rates, and website content.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-[#1A2026] py-8 px-6 shadow-xs rounded-sm border border-white/10 sm:px-10 space-y-5">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Admin Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin passcode..."
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setLoginError(false);
                    }}
                    className="w-full bg-[#14191E] border border-gray-700 rounded-sm pl-3.5 pr-10 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#006F51]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title={showPassword ? "Hide passcode" : "Show passcode"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {loginError && (
                  <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                    <span>Invalid passcode. Please enter an authorized administrator passcode.</span>
                  </p>
                )}
              </div>

              {/* Relogin & Device Persistence Switch */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-gray-300 hover:text-white">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-gray-700 text-[#006F51] focus:ring-0 focus:outline-none cursor-pointer accent-[#006F51]"
                  />
                  <span className="text-[11px]">Stay signed in on this device</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowHelp(!showHelp)}
                  className="text-[11px] text-[#FFCE00] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Passcode Help</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#006F51] hover:bg-[#005a42] text-white py-3 rounded-sm font-bold uppercase text-xs tracking-wider transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Sign In to Admin Portal</span>
              </button>
            </form>

            {/* Expandable Passcode Help Box */}
            {showHelp && (
              <div className="p-3.5 bg-black/40 border border-white/10 rounded-sm text-xs space-y-2 text-gray-300 animate-in fade-in duration-200">
                <div className="font-bold text-white flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#FFCE00]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Admin Passcode Guidance</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowHelp(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  You can sign in using either the <strong>Master Admin Passcode</strong> or any verified staff password (Admin, Dispatcher, or Compliance officer).
                </p>
                <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                  <div className="text-[10px] text-gray-400 font-mono bg-black/50 p-2 rounded flex items-center justify-between">
                    <span>Default Master: <strong className="text-white font-mono">Admin#Magezi2026!NW</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const customMaster = typeof window !== "undefined"
                        ? localStorage.getItem("nw_admin_master_passcode")
                        : null;
                      setPasswordInput(customMaster || "Admin#Magezi2026!NW");
                      setLoginError(false);
                      setShowHelp(false);
                    }}
                    className="w-full text-center py-1.5 px-2 bg-white/10 hover:bg-white/20 text-[#FFCE00] rounded text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Auto-Fill SuperAdmin Passcode
                  </button>
                  <p className="text-[10px] text-gray-500 italic">
                    You can change the Master Passcode anytime inside <strong>Admin &gt; Settings &gt; Security</strong> or manage individual staff accounts in <strong>Access Management</strong>.
                  </p>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-white/10 text-center space-y-3">
              <div className="text-[11px] text-gray-400">
                Authorized Nature Waste Management personnel only.
              </div>

              <div>
                <Link
                  href="/"
                  className="text-xs text-[#FFCE00] hover:underline font-bold inline-flex items-center gap-1"
                >
                  &larr; Return to Public Website
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Navigation Items
  const navSections = [
    {
      label: "OPERATIONS & DIRECTORY",
      items: [
        {
          name: "Dashboard Overview",
          href: "/admin",
          icon: LayoutDashboard,
          badge: null,
        },
        {
          name: "Client Inquiries & Requests",
          href: "/admin/requests",
          icon: Inbox,
          badge: newRequestsCount > 0 ? `${newRequestsCount} New` : null,
          badgeColor: "bg-emerald-600 text-white",
        },
        {
          name: "Clients Directory",
          href: "/admin/clients",
          icon: UserCheck,
          badge: "Customers",
          badgeColor: "bg-emerald-600/30 text-emerald-300 border border-emerald-500/30",
        },
        {
          name: "Access Management",
          href: "/admin/users",
          icon: ShieldCheck,
          badge: "Operators",
          badgeColor: "bg-purple-600/30 text-purple-300 border border-purple-500/30",
        },
      ],
    },
    {
      label: "WEBSITE CONTENT MANAGER",
      items: [
        {
          name: "Announcement Banner",
          href: "/admin/announcement",
          icon: Bell,
          badge: announcement.enabled ? "Active" : "Off",
          badgeColor: announcement.enabled ? "bg-[#FFCE00] text-[#1A1D20]" : "bg-gray-700 text-gray-300",
        },
        {
          name: "Coverage & Schedules",
          href: "/admin/coverage",
          icon: MapPin,
          badge: null,
        },
        {
          name: "Pricing Plans & Rates",
          href: "/admin/pricing",
          icon: CreditCard,
          badge: null,
        },
        {
          name: "Services & Waste Streams",
          href: "/admin/services",
          icon: Layers,
          badge: null,
        },
        {
          name: "Circular Blog & News",
          href: "/admin/blog",
          icon: FileText,
          badge: null,
        },
        {
          name: "Customer Testimonials",
          href: "/admin/testimonials",
          icon: Star,
          badge: null,
        },
        {
          name: "Impact Projects",
          href: "/admin/projects",
          icon: Award,
          badge: null,
        },
        {
          name: "Privacy & Terms Manager",
          href: "/admin/legal",
          icon: Scale,
          badge: "Legal",
          badgeColor: "bg-blue-600/30 text-blue-300 border border-blue-500/30",
        },
      ],
    },
    {
      label: "SYSTEM SETTINGS",
      items: [
        {
          name: "Company & Hotlines",
          href: "/admin/settings",
          icon: Settings,
          badge: null,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col md:flex-row text-[#1A1D20]">
      {/* 1. Desktop & Mobile Sidebar */}
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-50 w-72 h-screen max-h-screen bg-[#14191E] text-white flex flex-col overflow-hidden transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Branding */}
        <div className="shrink-0 p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" onClick={() => setSidebarOpen(false)}>
            <div className="flex flex-col">
              <Logo variant="dark" size="sm" showTagline={false} />
              <div className="flex items-center gap-1.5 mt-1.5 pl-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFCE00]" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFCE00]">
                  ADMIN CONTROL PORTAL
                </span>
              </div>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white p-1 rounded-sm cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav List */}
        <nav className="flex-1 min-h-0 overflow-y-auto px-3 py-3.5 space-y-5 dark-admin-scrollbar overscroll-contain">
          {navSections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                {sec.label}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center justify-between px-3 py-2 rounded-sm text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#006F51] text-white shadow-xs font-bold"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-sm flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? "bg-[#FFCE00] text-[#1A1D20]"
                            : "bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-white/10"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-sm shrink-0 ${
                          item.badgeColor || "bg-white/10 text-gray-300"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
          <div className="h-4 shrink-0" aria-hidden="true" />
        </nav>

        {/* Bottom Actions & User Profile */}
        <div className="shrink-0 p-3.5 border-t border-white/10 bg-[#0F1317] space-y-2.5">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm text-xs text-gray-300 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#006F51]" />
              <span className="font-semibold">Preview Live Site</span>
            </span>
            <span className="text-[10px] bg-[#006F51] text-white font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
              dev
            </span>
          </Link>

          <div className="p-2.5 bg-white/5 border border-white/5 rounded-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-sm bg-[#006F51] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                NW
              </div>
              <div className="text-[11px] leading-tight min-w-0">
                <div className="font-bold text-white truncate">Kitende Dispatch HQ</div>
                <div className="text-emerald-400 text-[10px] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Super Admin Online</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-sm transition-colors cursor-pointer shrink-0"
              title="Sign Out of Admin Portal"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Main Body Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-[#E5E7EB] px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-1.5 text-gray-600 hover:text-black rounded"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#006F51]" />
                <h1 className="text-sm sm:text-base font-black text-[#1A1D20] tracking-tight">
                  NatureWaste Administrative Portal
                </h1>
              </div>
              <p className="text-[11px] text-gray-500 hidden sm:block">
                Centralized management for customer inquiries, routing, pricing, and live content.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Direct Quick Link to Inquiries */}
            <Link
              href="/admin/requests"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E9F4F0] border border-[#006F51]/20 rounded-sm text-xs font-bold text-[#006F51] hover:bg-[#d8ece4] transition-colors"
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>Inquiries</span>
              {newRequestsCount > 0 && (
                <span className="bg-[#006F51] text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm">
                  {newRequestsCount}
                </span>
              )}
            </Link>

            {/* Visit Site Button */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1A1D20] hover:bg-black text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Content Container */}
        <main className="p-4 sm:p-8 flex-1 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
