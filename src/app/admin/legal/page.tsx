"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Save,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Eye,
  Edit3,
  Calendar,
  ShieldCheck,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { LegalDocument, LegalSection } from "@/types/legal";
import { initialPrivacyPolicy, initialTermsConditions } from "@/data/initialLegalDocs";

export default function AdminLegalPage() {
  const [activeTab, setActiveTab] = useState<"privacy_policy" | "terms_and_conditions">("privacy_policy");
  const [privacyDoc, setPrivacyDoc] = useState<LegalDocument>(initialPrivacyPolicy);
  const [termsDoc, setTermsDoc] = useState<LegalDocument>(initialTermsConditions);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Fetch live documents from Neon API
  useEffect(() => {
    fetch("/api/legal")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.documents)) {
          const p = data.documents.find((d: any) => d.id === "privacy_policy");
          if (p) setPrivacyDoc(p);
          const t = data.documents.find((d: any) => d.id === "terms_and_conditions");
          if (t) setTermsDoc(t);
        }
      })
      .catch((err) => console.warn("Could not fetch legal documents:", err));
  }, []);

  const currentDoc = activeTab === "privacy_policy" ? privacyDoc : termsDoc;
  const setDoc = (updated: LegalDocument) => {
    if (activeTab === "privacy_policy") {
      setPrivacyDoc(updated);
    } else {
      setTermsDoc(updated);
    }
  };

  const handleSectionChange = (index: number, field: keyof LegalSection, value: string) => {
    const updatedSections = [...currentDoc.sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setDoc({ ...currentDoc, sections: updatedSections });
  };

  const handleAddSection = () => {
    const newSec: LegalSection = {
      id: `section-${Date.now().toString().slice(-4)}`,
      heading: `${currentDoc.sections.length + 1}. New Policy Clause`,
      content: "Enter the details of this policy clause...",
    };
    setDoc({ ...currentDoc, sections: [...currentDoc.sections, newSec] });
  };

  const handleRemoveSection = (index: number) => {
    if (confirm("Are you sure you want to remove this clause?")) {
      const updatedSections = currentDoc.sections.filter((_, idx) => idx !== index);
      setDoc({ ...currentDoc, sections: updatedSections });
    }
  };

  const handleSaveToNeon = async () => {
    setLoading(true);
    setSaveSuccess(null);
    setSaveError(null);

    try {
      const res = await fetch("/api/legal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentDoc),
      });

      const data = await res.json();
      if (data.success) {
        setSaveSuccess(`"${currentDoc.title}" saved and published live to Neon PostgreSQL!`);
        setTimeout(() => setSaveSuccess(null), 4000);
      } else {
        setSaveError(data.message || "Failed to update legal document.");
      }
    } catch (err: any) {
      setSaveError(err.message || "Network error while saving to Neon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-3 py-1 rounded-md border border-[#006F51]/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Statutory &amp; Legal Compliance Manager</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1D20] tracking-tight mt-1">
            Privacy Policy &amp; Terms Editor
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Modify terms of service, collection policies, and data protection guidelines with live persistence to Neon PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={activeTab === "privacy_policy" ? "/privacy" : "/terms"}
            target="_blank"
            className="px-3.5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>View Public Page</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="px-3.5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            {previewMode ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{previewMode ? "Edit Mode" : "Live Preview"}</span>
          </button>

          <button
            onClick={handleSaveToNeon}
            disabled={loading}
            className="bg-[#006F51] hover:bg-[#005a42] disabled:bg-gray-400 text-white px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save to Database</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      {saveError && (
        <div className="p-4 bg-red-50 border border-red-300 text-red-800 rounded-lg text-xs font-bold flex items-center gap-2 shadow-2xs">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {/* 2. Document Selection Tabs */}
      <div className="bg-white p-2 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center gap-2">
        <button
          onClick={() => {
            setActiveTab("privacy_policy");
            setSaveSuccess(null);
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center flex items-center justify-center gap-2 ${
            activeTab === "privacy_policy"
              ? "bg-[#006F51] text-white shadow-xs"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>
        <button
          onClick={() => {
            setActiveTab("terms_and_conditions");
            setSaveSuccess(null);
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center flex items-center justify-center gap-2 ${
            activeTab === "terms_and_conditions"
              ? "bg-[#006F51] text-white shadow-xs"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Terms &amp; Conditions of Service</span>
        </button>
      </div>

      {/* 3. Document Details Header Form */}
      <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Document Title
            </label>
            <input
              type="text"
              value={currentDoc.title}
              onChange={(e) => setDoc({ ...currentDoc, title: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-900 focus:outline-none focus:border-[#006F51]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Effective / Last Updated Date
            </label>
            <input
              type="text"
              value={currentDoc.lastUpdated}
              onChange={(e) => setDoc({ ...currentDoc, lastUpdated: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-900 focus:outline-none focus:border-[#006F51]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
            Executive Summary (Shown in Header Callout)
          </label>
          <textarea
            rows={2}
            value={currentDoc.summary}
            onChange={(e) => setDoc({ ...currentDoc, summary: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-800 focus:outline-none focus:border-[#006F51]"
          />
        </div>
      </div>

      {/* 4. Sections & Clauses */}
      {previewMode ? (
        /* Preview Mode */
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 shadow-xs space-y-8">
          <div className="border-b border-gray-200 pb-4">
            <div className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
              Live Preview
            </div>
            <h1 className="text-2xl font-black text-gray-900 mt-1">{currentDoc.title}</h1>
            <p className="text-xs text-gray-500 mt-1">{currentDoc.summary}</p>
            <span className="text-[11px] font-mono text-gray-400 mt-2 block">
              Last Updated: {currentDoc.lastUpdated}
            </span>
          </div>

          <div className="space-y-6">
            {currentDoc.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2 pb-6 border-b border-gray-100 last:border-b-0">
                <h3 className="text-base font-bold text-gray-900">{sec.heading}</h3>
                <div className="text-xs text-gray-700 whitespace-pre-line leading-relaxed">
                  {sec.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
              Policy Clauses &amp; Articles ({currentDoc.sections.length})
            </h3>
            <button
              onClick={handleAddSection}
              className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Clause</span>
            </button>
          </div>

          {currentDoc.sections.map((sec, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs p-5 space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={sec.heading}
                  onChange={(e) => handleSectionChange(idx, "heading", e.target.value)}
                  placeholder="Clause Heading (e.g. 1. Scope and Jurisdiction)"
                  className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold text-gray-900 focus:outline-none focus:border-[#006F51]"
                />
                <button
                  onClick={() => handleRemoveSection(idx)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer shrink-0"
                  title="Delete Clause"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <textarea
                  rows={4}
                  value={sec.content}
                  onChange={(e) => handleSectionChange(idx, "content", e.target.value)}
                  placeholder="Clause content and statutory legal guidelines..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs text-gray-800 leading-relaxed focus:outline-none focus:border-[#006F51]"
                />
              </div>
            </div>
          ))}

          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSaveToNeon}
              disabled={loading}
              className="bg-[#006F51] hover:bg-[#005a42] disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save &amp; Publish Changes to Neon</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
