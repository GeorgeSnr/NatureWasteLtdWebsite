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
  const [loginError, setLoginError] = useState(false);

  // Unread/new requests count
  const newRequestsCount = requests.filter((r) => r.status === "new").length;

  useEffect(() => {
    // Check authentication
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("nw_admin_auth");
      if (auth === "true") {
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

    const isStaffMatch = users.some(
      (u) =>
        (u.role === "admin" || u.role === "dispatcher" || u.role === "compliance") &&
        u.accountStatus === "active" &&
        (u.passwordHash === clean || u.password === clean)
    );

    if (isStaffMatch || clean === "Admin#Magezi2026!NW") {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("nw_admin_auth", "true");
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
          <div className="bg-[#1A2026] py-8 px-6 shadow-xs rounded-sm border border-white/10 sm:px-10 space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                  Admin Passcode
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter admin passcode..."
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setLoginError(false);
                    }}
                    className="w-full bg-[#14191E] border border-gray-700 rounded-sm px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#006F51]"
                  />
                  <Lock className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                {loginError && (
                  <p className="text-xs text-red-400 mt-1">
                    Invalid passcode. Please enter an authorized administrator passcode.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#006F51] hover:bg-[#005a42] text-white py-3 rounded-sm font-bold uppercase text-xs tracking-wider transition-colors cursor-pointer shadow-xs"
              >
                Sign In to Admin Portal
              </button>
            </form>

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
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-50 w-72 bg-[#14191E] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ height: "100vh" }}
      >
        {/* Top Branding */}
        <div>
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
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
              className="md:hidden text-gray-400 hover:text-white p-1 rounded-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-190px)]">
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
          </nav>
        </div>

        {/* Bottom Actions & User Profile */}
        <div className="p-4 border-t border-white/10 bg-[#0F1317] space-y-3">
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
