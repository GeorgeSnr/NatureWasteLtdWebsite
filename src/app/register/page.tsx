"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const [plan, setPlan] = useState("commercial");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => {
      router.push("/portal");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-block mb-4">
          <Logo size="lg" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#141517] tracking-tight">
          Create Your Platform Account
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Start your 14-day free trial on Nature Waste Connect. No credit card required.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 shadow-xl border border-gray-200 sm:px-10 chamfer-card">
          {registered ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-nature-primary text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-[#141517]">
                Welcome to Nature Waste Connect!
              </h3>
              <p className="text-sm text-gray-600">
                Setting up your sandbox environment and redirecting to your Live Web Portal...
              </p>
              <div className="pt-2">
                <div className="h-1.5 w-full bg-gray-200 overflow-hidden rounded-full">
                  <div className="h-full bg-nature-primary animate-pulse" />
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Plan Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Select Trial Tier
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  {[
                    { id: "residential", label: "Residential" },
                    { id: "commercial", label: "Commercial" },
                    { id: "municipal", label: "Municipal" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlan(p.id)}
                      className={`py-2 px-1 border text-center transition-colors cursor-pointer ${
                        plan === p.id
                          ? "border-nature-primary bg-nature-primary/10 text-nature-primary"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Arthur Byaruhanga"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Company / Property Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Victoria Heights or Nile Breweries"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="arthur@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Phone / Mobile Money *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+256 700 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Create Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-gray-300 px-4 py-3 text-sm text-[#141517] focus:outline-none focus:border-nature-primary"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-nature-primary hover:bg-nature-primary-dark text-white py-3.5 font-bold uppercase text-xs tracking-widest transition-all shadow-md cursor-pointer"
                >
                  Start 14-Day Free Trial
                </button>
              </div>

              <div className="pt-3 text-center">
                <span className="text-xs text-gray-500">
                  Already registered?{" "}
                  <Link href="/portal" className="text-nature-primary font-bold hover:underline">
                    Access Portal Directly
                  </Link>
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
