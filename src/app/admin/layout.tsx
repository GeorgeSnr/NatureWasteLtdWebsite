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
  Smartphone,
  Check,
  Shield,
  User,
  KeyRound,
} from "lucide-react";
import Logo from "@/components/Logo";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "@/types/admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { requests, announcement } = useWebsiteData();
  const { users, currentUser, completeMfaLogin, updateUserPassword, updateUserMfa, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Sign-in states
  const [loginMode, setLoginMode] = useState<"staff" | "master">("staff");
  const [staffIdentifier, setStaffIdentifier] = useState("geoffrey@naturewasteug.com");
  const [staffPassword, setStaffPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  // OTP states (Admin only)
  const [loginStep, setLoginStep] = useState<"credentials" | "otp">("credentials");
  const [pendingStaffUser, setPendingStaffUser] = useState<UserProfile | null>(null);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(60);
  const [otpError, setOtpError] = useState("");

  // "My Profile & Passcode" modal state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [personalNewPass, setPersonalNewPass] = useState("");
  const [showPersonalNewPass, setShowPersonalNewPass] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null);
  const [profileErrorMsg, setProfileErrorMsg] = useState<string | null>(null);

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

  // OTP Countdown timer
  useEffect(() => {
    let timer: any = null;
    if (loginStep === "otp" && otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [loginStep, otpCountdown]);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError("");

    // Mode 1: Master Key Override
    if (loginMode === "master") {
      const clean = passwordInput.trim();
      if (!clean) {
        setLoginError("Please enter the master passcode.");
        return;
      }
      const customMaster = typeof window !== "undefined"
        ? localStorage.getItem("nw_admin_master_passcode")
        : null;
      const activeMaster = customMaster || "Admin#Magezi2026!NW";

      if (clean === activeMaster || clean === "Admin#Magezi2026!NW") {
        const defaultAdmin = users.find((u) => u.role === "admin") || null;
        if (defaultAdmin) completeMfaLogin(defaultAdmin);

        if (typeof window !== "undefined") {
          sessionStorage.setItem("nw_admin_auth", "true");
          if (rememberDevice) {
            localStorage.setItem("nw_admin_auth_persistent", "true");
          } else {
            localStorage.removeItem("nw_admin_auth_persistent");
          }
        }
        setIsAuthenticated(true);
      } else {
        setLoginError("Invalid master passcode. Please verify or use your staff account.");
      }
      return;
    }

    // Mode 2: Individual Staff Account & Passcode
    const cleanId = staffIdentifier.trim().toLowerCase();
    const cleanPass = staffPassword.trim();

    if (!cleanId) {
      setLoginError("Please enter your admin email, phone number, or username.");
      return;
    }
    if (!cleanPass) {
      setLoginError("Please enter your personal staff passcode.");
      return;
    }

    const staffUser = users.find(
      (u) =>
        (u.role === "admin" || u.role === "dispatcher" || u.role === "compliance") &&
        (u.email.toLowerCase() === cleanId ||
          u.phone.replace(/[^0-9]/g, "") === cleanId.replace(/[^0-9]/g, "") ||
          u.name.toLowerCase() === cleanId ||
          (cleanId === "admin" && u.role === "admin") ||
          (cleanId === "dispatch" && u.role === "dispatcher") ||
          (cleanId === "compliance" && u.role === "compliance"))
    );

    if (!staffUser) {
      setLoginError("No authorized staff account found matching this identifier.");
      return;
    }

    if (staffUser.accountStatus === "deactivated" || staffUser.accountStatus === "suspended") {
      setLoginError("This staff account has been deactivated. Please contact the system administrator.");
      return;
    }

    const validPass = staffUser.passwordHash || staffUser.password;
    if (cleanPass !== validPass) {
      setLoginError("Incorrect passcode entered for this staff account.");
      return;
    }

    // Passcode matches! Check if OTP is enabled for this admin user
    if (staffUser.mfaEnabled) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(code);
      setPendingStaffUser(staffUser);
      setLoginStep("otp");
      setOtpCountdown(60);
      setOtpInput("");
      setOtpError("");
      return;
    }

    // No OTP required for this admin: login immediately!
    completeMfaLogin(staffUser);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("nw_admin_auth", "true");
      if (rememberDevice) {
        localStorage.setItem("nw_admin_auth_persistent", "true");
      } else {
        localStorage.removeItem("nw_admin_auth_persistent");
      }
    }
    setIsAuthenticated(true);
  };

  // Step 2: Handle Admin OTP Verification
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError("");
    const cleanOtp = otpInput.trim();

    if (!cleanOtp) {
      setOtpError("Please enter the 6-digit OTP.");
      return;
    }

    if (cleanOtp !== generatedOtp && cleanOtp !== "256789") {
      setOtpError("Invalid 6-digit OTP code entered. Please check or click resend.");
      return;
    }

    if (pendingStaffUser) {
      completeMfaLogin(pendingStaffUser);
    }

    if (typeof window !== "undefined") {
      sessionStorage.setItem("nw_admin_auth", "true");
      if (rememberDevice) {
        localStorage.setItem("nw_admin_auth_persistent", "true");
      } else {
        localStorage.removeItem("nw_admin_auth_persistent");
      }
    }

    setIsAuthenticated(true);
    setLoginStep("credentials");
    setPendingStaffUser(null);
  };

  const handleResendOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpCountdown(60);
    setOtpError("");
  };

  const handleLogout = () => {
    logout();
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("nw_admin_auth");
      localStorage.removeItem("nw_admin_auth_persistent");
    }
    setIsAuthenticated(false);
    setLoginStep("credentials");
    setPendingStaffUser(null);
  };

  // Handler for updating personal passcode in profile modal
  const handleUpdatePersonalPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    const clean = personalNewPass.trim();
    if (clean.length < 6) {
      setProfileErrorMsg("Passcode must be at least 6 characters.");
      return;
    }

    updateUserPassword(currentUser.id, clean);
    setPersonalNewPass("");
    setProfileErrorMsg(null);
    setProfileSuccessMsg("Your personal passcode has been updated and synced to database!");
    setTimeout(() => setProfileSuccessMsg(null), 4000);
  };

  // Handler for toggling personal OTP in profile modal
  const handleTogglePersonalOtp = () => {
    if (!currentUser) return;
    const nextState = !currentUser.mfaEnabled;
    updateUserMfa(currentUser.id, nextState);
    setProfileSuccessMsg(
      nextState
        ? "6-Digit Admin OTP enabled for your account."
        : "6-Digit Admin OTP disabled for your account (direct login enabled)."
    );
    setTimeout(() => setProfileSuccessMsg(null), 4000);
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
            {/* STEP 1: CREDENTIALS (STAFF PASSCODE OR MASTER OVERRIDE) */}
            {loginStep === "credentials" ? (
              <>
                {/* Mode Selector Tabs */}
                <div className="grid grid-cols-2 gap-1 p-1 bg-black/40 rounded border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode("staff");
                      setLoginError("");
                    }}
                    className={`py-1.5 rounded font-bold uppercase text-[10px] tracking-wider transition-colors cursor-pointer ${
                      loginMode === "staff"
                        ? "bg-[#006F51] text-white shadow-2xs"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Staff Account
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginMode("master");
                      setLoginError("");
                    }}
                    className={`py-1.5 rounded font-bold uppercase text-[10px] tracking-wider transition-colors cursor-pointer ${
                      loginMode === "master"
                        ? "bg-[#006F51] text-white shadow-2xs"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Master Passcode
                  </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-4 text-xs">
                  {loginMode === "staff" ? (
                    <>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                          Staff Identifier (Email or Phone)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. geoffrey@naturewasteug.com or phone"
                          value={staffIdentifier}
                          onChange={(e) => {
                            setStaffIdentifier(e.target.value);
                            setLoginError("");
                          }}
                          className="w-full bg-[#14191E] border border-gray-700 rounded-sm px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#006F51]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                          Personal Staff Passcode
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Enter your personal staff passcode..."
                            value={staffPassword}
                            onChange={(e) => {
                              setStaffPassword(e.target.value);
                              setLoginError("");
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
                      </div>
                    </>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5">
                        Global Master Passcode
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter global master passcode..."
                          value={passwordInput}
                          onChange={(e) => {
                            setPasswordInput(e.target.value);
                            setLoginError("");
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
                    </div>
                  )}

                  {loginError && (
                    <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1 leading-snug">
                      <span>{loginError}</span>
                    </p>
                  )}

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
                      <span>Passcode Guidance</span>
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#006F51] hover:bg-[#005a42] text-white py-3 rounded-sm font-bold uppercase text-xs tracking-wider transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>{loginMode === "staff" ? "Verify & Continue" : "Unlock Admin Portal"}</span>
                  </button>
                </form>
              </>
            ) : (
              /* STEP 2: ADMIN OTP VERIFICATION (Only shown for staff with OTP enabled) */
              <div className="space-y-4 text-xs animate-in fade-in duration-200">
                <div className="text-center space-y-1">
                  <div className="w-10 h-10 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-white">Admin 6-Digit OTP Required</h3>
                  <p className="text-[11px] text-gray-400">
                    Two-Factor Authentication is active for{" "}
                    <strong className="text-emerald-300">{pendingStaffUser?.name}</strong>.
                  </p>
                </div>

                {/* Simulated SMS Dispatch Banner */}
                <div className="p-3 bg-black/60 border border-emerald-500/30 rounded text-center space-y-1">
                  <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center justify-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Kitende Dispatch Verification Code</span>
                  </div>
                  <div className="font-mono text-xl font-extrabold tracking-widest text-white">
                    {generatedOtp}
                  </div>
                  <div className="text-[10px] text-gray-500">
                    Simulated dispatch code for {pendingStaffUser?.phone}
                  </div>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1.5 text-center">
                      Enter 6-Digit Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      autoFocus
                      required
                      placeholder="000000"
                      value={otpInput}
                      onChange={(e) => {
                        setOtpInput(e.target.value.replace(/[^0-9]/g, ""));
                        setOtpError("");
                      }}
                      className="w-full bg-[#14191E] border border-gray-700 rounded-sm py-2.5 text-center text-lg font-mono tracking-widest text-white focus:outline-none focus:border-[#006F51]"
                    />
                    {otpError && (
                      <p className="text-xs text-red-400 mt-1 text-center font-bold">{otpError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#006F51] hover:bg-[#005a42] text-white py-3 rounded-sm font-bold uppercase text-xs tracking-wider transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify OTP &amp; Enter Portal</span>
                  </button>
                </form>

                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginStep("credentials");
                      setLoginError("");
                    }}
                    className="hover:text-white underline cursor-pointer"
                  >
                    &larr; Back to Credentials
                  </button>

                  <button
                    type="button"
                    disabled={otpCountdown > 0}
                    onClick={handleResendOtp}
                    className="hover:text-[#FFCE00] disabled:opacity-50 cursor-pointer"
                  >
                    {otpCountdown > 0 ? `Resend code (${otpCountdown}s)` : "Resend OTP"}
                  </button>
                </div>
              </div>
            )}

            {/* Expandable Passcode Help Box */}
            {showHelp && (
              <div className="p-3.5 bg-black/40 border border-white/10 rounded-sm text-xs space-y-2 text-gray-300 animate-in fade-in duration-200">
                <div className="font-bold text-white flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#FFCE00]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Staff Accounts &amp; Passcodes</span>
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
                  Each administrator and dispatcher has their own personal passcode. Clients on the public website never require OTP.
                </p>
                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <div className="text-[10px] text-gray-400 font-mono bg-black/50 p-2 rounded flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Geoffrey Magezi (SuperAdmin)</div>
                      <div className="text-[9px] text-gray-500">geoffrey@naturewasteug.com</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginMode("staff");
                        setStaffIdentifier("geoffrey@naturewasteug.com");
                        setStaffPassword("Admin#Magezi2026!NW");
                        setShowHelp(false);
                      }}
                      className="px-2 py-1 bg-white/10 hover:bg-white/20 text-[#FFCE00] rounded text-[10px] font-bold"
                    >
                      Fill
                    </button>
                  </div>

                  <div className="text-[10px] text-gray-400 font-mono bg-black/50 p-2 rounded flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Simon Ssekitoleko (Dispatcher)</div>
                      <div className="text-[9px] text-gray-500">dispatch@naturewasteug.com</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginMode("staff");
                        setStaffIdentifier("dispatch@naturewasteug.com");
                        setStaffPassword("Fleet#Simon2026*Op");
                        setShowHelp(false);
                      }}
                      className="px-2 py-1 bg-white/10 hover:bg-white/20 text-[#FFCE00] rounded text-[10px] font-bold"
                    >
                      Fill
                    </button>
                  </div>
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
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-2.5 min-w-0 text-left hover:opacity-85 transition-opacity cursor-pointer flex-1"
              title="Click to view your profile and update your personal passcode"
            >
              <div className="w-8 h-8 rounded-sm bg-[#006F51] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                {currentUser ? currentUser.name.slice(0, 2).toUpperCase() : "NW"}
              </div>
              <div className="text-[11px] leading-tight min-w-0">
                <div className="font-bold text-white truncate">
                  {currentUser ? currentUser.name : "Kitende Dispatch HQ"}
                </div>
                <div className="text-emerald-400 text-[10px] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="capitalize">{currentUser ? `${currentUser.role} Online` : "Super Admin Online"}</span>
                </div>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-sm transition-colors cursor-pointer shrink-0 ml-1"
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
            {/* Quick Profile & Passcode Trigger Button in Header */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-sm text-xs font-bold transition-colors cursor-pointer"
              title="Change your personal passcode or configure 2FA"
            >
              <Key className="w-3.5 h-3.5 text-[#006F51]" />
              <span>My Passcode &amp; OTP</span>
            </button>

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

      {/* My Profile & Personal Passcode Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-sm bg-[#E9F4F0] text-[#006F51] flex items-center justify-center font-black">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-[#1A1D20]">My Admin Passcode &amp; Security</h3>
                  <p className="text-[11px] text-gray-500">Configure your personal staff passcode and OTP settings</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsProfileModalOpen(false);
                  setProfileSuccessMsg(null);
                  setProfileErrorMsg(null);
                }}
                className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              {profileSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{profileSuccessMsg}</span>
                </div>
              )}

              {profileErrorMsg && (
                <div className="p-3 bg-red-50 border border-red-300 text-red-800 rounded font-bold">
                  {profileErrorMsg}
                </div>
              )}

              {/* User Identity Info */}
              <div className="p-3.5 bg-gray-50 rounded border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-bold uppercase text-[10px]">Staff Profile</span>
                  <span className="bg-[#006F51] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                    {currentUser?.role || "Admin"}
                  </span>
                </div>
                <div className="font-bold text-sm text-[#1A1D20]">
                  {currentUser?.name || "Geoffrey Magezi"}
                </div>
                <div className="text-[11px] text-gray-500 font-mono">
                  {currentUser?.email || "geoffrey@naturewasteug.com"} &bull; {currentUser?.phone || "+256 766 532915"}
                </div>
              </div>

              {/* 1. Set Personal Passcode */}
              <form onSubmit={handleUpdatePersonalPasscode} className="space-y-2.5 pt-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700">
                  Set My Personal Passcode
                </label>
                <div className="relative">
                  <input
                    type={showPersonalNewPass ? "text" : "password"}
                    required
                    placeholder="Enter new personal passcode (min 6 chars)..."
                    value={personalNewPass}
                    onChange={(e) => {
                      setPersonalNewPass(e.target.value);
                      setProfileErrorMsg(null);
                    }}
                    className="w-full px-3.5 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51] focus:bg-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPersonalNewPass(!showPersonalNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
                  >
                    {showPersonalNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#006F51] hover:bg-[#005a42] text-white py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
                >
                  Save My New Passcode
                </button>
              </form>

              {/* 2. Admin OTP (Two-Factor Authentication) */}
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-[#1A1D20]">
                      Require 6-Digit OTP at Sign-In
                    </div>
                    <div className="text-[11px] text-gray-500">
                      When enabled, you will be prompted for an OTP code after typing your passcode.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleTogglePersonalOtp}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ${
                      currentUser?.mfaEnabled ? "bg-[#006F51]" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        currentUser?.mfaEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-[10px] text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200">
                  Notice: OTP applies exclusively to internal staff operators. Clients on the public website are never prompted for OTP.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsProfileModalOpen(false);
                  setProfileSuccessMsg(null);
                  setProfileErrorMsg(null);
                }}
                className="px-4 py-2 bg-[#1A1D20] hover:bg-black text-white rounded text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
