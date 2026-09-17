"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Calendar,
  ArrowLeft,
  Printer,
  FileText,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  CreditCard,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LegalDocument } from "@/types/legal";
import { initialTermsConditions } from "@/data/initialLegalDocs";

export default function TermsPage() {
  const [doc, setDoc] = useState<LegalDocument>(initialTermsConditions);
  const [activeSection, setActiveSection] = useState<string>("agreement");

  useEffect(() => {
    fetch("/api/legal?id=terms_and_conditions")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.document) {
          setDoc(data.document);
        }
      })
      .catch((err) => console.warn("Using offline terms fallback:", err));
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1D20] flex flex-col">
      <Header />

      <main className="flex-1">
        {/* 1. Hero Header */}
        <section className="bg-[#14191E] text-white py-12 sm:py-16 border-b border-white/10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-xs">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-[#FFCE00] transition-colors font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase text-[#FFCE00] bg-amber-950/60 px-2.5 py-1 rounded border border-[#FFCE00]/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>National Environment Act (2019)</span>
                </span>
                <button
                  onClick={handlePrint}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded transition-colors cursor-pointer"
                  title="Print or Save PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {doc.title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed">
              {doc.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-gray-400 pt-4 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FFCE00]" />
                <span>Effective Date: <strong>{doc.lastUpdated}</strong></span>
              </div>
              <div className="h-3 w-px bg-gray-700 hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free Portal Access &bull; Pay Only for Physical Pickups</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Main Content Grid */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Sticky Table of Contents */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#006F51] border-b border-gray-100 pb-3">
                  <FileText className="w-4 h-4" />
                  <span>Terms Index</span>
                </div>

                <nav className="space-y-1 text-xs font-medium">
                  {doc.sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      onClick={() => setActiveSection(sec.id)}
                      className={`block px-3 py-2 rounded-lg transition-colors text-left ${
                        activeSection === sec.id
                          ? "bg-[#E9F4F0] text-[#006F51] font-bold"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {sec.heading}
                    </a>
                  ))}
                </nav>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-amber-800">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Zero Hazardous Discharges</span>
                    </div>
                    <p className="text-amber-800 leading-snug">
                      Chemical, clinical, and explosive materials require specialized manifests.
                    </p>
                  </div>

                  <Link
                    href="/privacy"
                    className="block text-center text-xs font-bold text-[#006F51] hover:underline"
                  >
                    View Privacy Policy &rarr;
                  </Link>
                </div>
              </div>
            </aside>

            {/* Right Column: Terms Articles */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-[#E5E7EB] p-6 sm:p-10 shadow-xs space-y-10">
              {doc.sections.map((sec) => (
                <article
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-28 space-y-3 pb-8 border-b border-gray-100 last:border-b-0 last:pb-0"
                >
                  <h2 className="text-lg sm:text-xl font-black text-[#1A1D20] tracking-tight">
                    {sec.heading}
                  </h2>
                  <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {sec.content}
                  </div>
                </article>
              ))}

              {/* Service Agreement Box */}
              <div className="mt-8 p-5 bg-[#F8F9FA] rounded-xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-[#1A1D20]">Need Commercial Contract Clarifications?</h4>
                  <p className="text-gray-500 mt-0.5">
                    Kitende Operations Headquarters, Entebbe Road, Kampala.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="tel:+256766532915"
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#006F51] hover:bg-[#005a42] text-white font-bold rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Dispatch: +256 766 532915</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
