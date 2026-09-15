"use client";

import React, { useEffect } from "react";
import { X, Play, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
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

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#181A1C] text-white rounded-none border border-white/20 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-nature-secondary animate-pulse" />
            <h3 className="text-base font-bold tracking-wide">
              Platform Showreel: Nature Waste Connect in Action
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Simulation Screen */}
        <div className="relative w-full aspect-video bg-gray-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181A1C] via-transparent to-black/60" />

          <div className="relative z-10 max-w-lg space-y-4">
            <div className="w-16 h-16 rounded-full bg-nature-primary text-white flex items-center justify-center mx-auto shadow-xl shadow-nature-primary/40 border-2 border-nature-secondary/50">
              <Play className="w-7 h-7 ml-1 fill-white" />
            </div>
            <h4 className="text-xl sm:text-2xl font-black">
              Smart IoT Fleet Dispatch & Circular Baling Live Demo
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
              See how ultrasonic fill sensors notify our dispatch control room, automatically
              route compactor trucks, and verify intake tonnage at the Material Recovery Facility.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-3 text-left">
              <div className="bg-white/10 p-2.5 border border-white/10">
                <Cpu className="w-4 h-4 text-nature-secondary mb-1" />
                <div className="text-xs font-bold">IoT Fill Sensors</div>
                <div className="text-[11px] text-gray-400">99.8% Accuracy</div>
              </div>
              <div className="bg-white/10 p-2.5 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-nature-secondary mb-1" />
                <div className="text-xs font-bold">Route Optimization</div>
                <div className="text-[11px] text-gray-400">34% Fuel Saved</div>
              </div>
              <div className="bg-white/10 p-2.5 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-nature-secondary mb-1" />
                <div className="text-xs font-bold">ESG Audited</div>
                <div className="text-[11px] text-gray-400">NEMA Certified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-[#202225] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-gray-400">
            Want a customized walkthrough for your municipality or factory?
          </span>
          <a
            href="/book-demo"
            onClick={onClose}
            className="bg-nature-primary hover:bg-nature-primary-dark text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all"
          >
            Schedule Live 1-on-1 Walkthrough
          </a>
        </div>
      </div>
    </div>
  );
}
