"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Layers, Tag, FileText } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const searchableItems = [
    { title: "Smart Collection & Routing", type: "Module", href: "/features#smart-collection" },
    { title: "Material Recovery & Recycling Facility (MRF)", type: "Module", href: "/features#material-recovery" },
    { title: "Municipal & Estate Billing Platform", type: "Module", href: "/features#municipal-billing" },
    { title: "Fleet Telematics & Weighbridge Integration", type: "Module", href: "/features#fleet-telematics" },
    { title: "Commercial & Hazardous Waste Manifests", type: "Module", href: "/features#hazardous-waste" },
    { title: "Citizen & Community Mobile Connect App", type: "Module", href: "/features#citizen-connect" },
    { title: "Municipalities & City Councils Solution", type: "Industry", href: "/industries#municipalities" },
    { title: "Manufacturing & Industrial Parks Zero-Landfill", type: "Industry", href: "/industries#manufacturing" },
    { title: "Hospitals & Clinical Biohazard Destruction", type: "Industry", href: "/industries#healthcare" },
    { title: "Residential & Commercial Pricing Plans", type: "Pricing", href: "/pricing" },
    { title: "Schedule an On-Site Waste Audit & Demo", type: "Demo", href: "/book-demo" },
    { title: "Interactive Client & Operations Portal", type: "Portal", href: "/portal" },
  ];

  const filtered = query.trim()
    ? searchableItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      )
    : searchableItems.slice(0, 6);

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-none border border-gray-200 overflow-hidden">
        {/* Search input header */}
        <div className="flex items-center px-6 py-4 border-b border-gray-100 gap-3">
          <Search className="w-5 h-5 text-nature-primary shrink-0" />
          <input
            type="text"
            placeholder="Search modules, industries, pricing, waste solutions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-[#141517] placeholder-gray-400 text-base sm:text-lg focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 cursor-pointer rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results list */}
        <div className="max-h-[380px] overflow-y-auto p-4 space-y-2">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between p-3.5 hover:bg-nature-card border border-transparent hover:border-nature-primary/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-nature-primary/10 text-nature-primary flex items-center justify-center group-hover:bg-nature-primary group-hover:text-white transition-colors">
                    {item.type === "Module" ? <Layers className="w-4 h-4" /> : <Tag className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#141517] group-hover:text-nature-primary transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-xs text-gray-500 font-medium">Category: {item.type}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-nature-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))
          ) : (
            <div className="py-12 text-center text-gray-500">
              <FileText className="w-10 h-10 mx-auto text-gray-300 mb-2" />
              <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-gray-400 mt-1">Try searching for &ldquo;bins&rdquo;, &ldquo;pricing&rdquo;, &ldquo;medical&rdquo;, or &ldquo;portal&rdquo;</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-6 py-3 bg-[#F8F9FA] border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-[10px]">ESC</kbd> to close</span>
          <span>Nature Waste Management Ltd</span>
        </div>
      </div>
    </div>
  );
}
