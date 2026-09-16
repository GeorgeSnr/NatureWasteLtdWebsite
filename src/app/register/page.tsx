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
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-block mb-4">
          <Logo size="lg" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#1A1D20] tracking-tight">
          Create Your Platform Account
        </h2>
        <p className="text-xs sm:text-sm text-[#555C66] mt-1">
          Start your 14-day free trial on Nature Waste Connect. No credit card required.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 shadow-xs border border-[#E5E7EB] sm:px-10 rounded">
          {registered ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-sm bg-[#006F51] text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1D20]">
                Welcome to Nature Waste Connect!
              </h3>
              <p className="text-xs text-[#555C66]">
                Setting up your sandbox environment and redirecting to your Live Web Portal...
              </p>
              <div className="pt-2">
                <div className="h-1.5 w-full bg-gray-200 overflow-hidden rounded-sm">
                  <div className="h-full bg-[#006F51]" />
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Plan Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1.5">
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
                      className={`py-2 px-1 border rounded-sm text-center font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                        plan === p.id
                          ? "border-[#006F51] bg-[#E9F4F0] text-[#006F51]"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Arthur Byaruhanga"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1">
                  Company / Property Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Victoria Heights or Nile Breweries"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="arthur@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1">
                    Phone / Mobile Money *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+256 700 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#555C66] mb-1">
                  Create Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-[#D1D5DB] rounded-sm px-3.5 py-2.5 text-xs text-[#1A1D20] focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#006F51] hover:bg-[#005a42] text-white py-3.5 font-bold uppercase text-xs tracking-wider rounded-sm transition-colors shadow-xs cursor-pointer"
                >
                  Start 14-Day Free Trial
                </button>
              </div>

              <div className="pt-3 text-center">
                <span className="text-xs text-[#555C66]">
                  Already registered?{" "}
                  <Link href="/portal" className="text-[#006F51] font-bold hover:underline">
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
