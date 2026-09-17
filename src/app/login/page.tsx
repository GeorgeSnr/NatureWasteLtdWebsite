"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Phone,
} from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { currentUser, isAuthenticated, isStaff, login, loginAsDemoClient, loginAsDemoStaff } =
    useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (currentUser.role === "admin" || currentUser.role === "dispatcher") {
        router.push("/admin");
      } else {
        router.push("/portal");
      }
    }
  }, [isAuthenticated, currentUser, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!identifier.trim()) {
      setError("Please enter your email, phone, or name.");
      return;
    }

    const res = login(identifier, password);
    if (!res.success) {
      setError(res.message || "Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-block">
          <Logo variant="light" size="md" />
        </Link>
        <div className="inline-flex items-center gap-2 bg-[#006F51] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Unified Access Portal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1A1D20] tracking-tight">
          Sign In to Your Account
        </h2>
        <p className="text-xs text-gray-500">
          Client services, route tracking, and operations management.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm rounded-2xl border border-[#E5E7EB] space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                Email, Phone Number, or Account Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. arthur@example.com or +256 772 123 456"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setError("");
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
                <span className="text-[10px] text-gray-400">(Demo Mode: any password)</span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51]"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#006F51] hover:bg-[#005a42] text-white py-3 rounded-lg font-bold uppercase text-xs tracking-wider transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Shortcuts */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 text-center">
              1-Click Demo Profiles
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => loginAsDemoClient(0)}
                className="p-2.5 text-left rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <div className="font-bold text-[#006F51]">Arthur B.</div>
                <div className="text-[10px] text-gray-500">Resident Client</div>
              </button>
              <button
                type="button"
                onClick={() => loginAsDemoStaff()}
                className="p-2.5 text-left rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer"
              >
                <div className="font-bold text-purple-800">Geoffrey M.</div>
                <div className="text-[10px] text-gray-500">Dispatch Staff</div>
              </button>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/portal"
                className="text-xs font-bold text-[#006F51] hover:underline"
              >
                First time? Create a client account in the Client Portal &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          <Link href="/" className="hover:underline font-semibold">
            &larr; Back to NatureWaste Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
