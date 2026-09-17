"use client";

import React from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { useWebsiteData } from "@/context/WebsiteDataContext";

export default function Testimonials() {
  const { customerReviews } = useWebsiteData();

  return (
    <section id="testimonials" className="w-full bg-white py-16 sm:py-20 select-none border-b border-[#E5E7EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#006F51]">
            What Our Customers Say About Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1D20] tracking-tight">
            Choose Nature Waste Management
          </h2>
          <p className="text-[#555C66] text-sm sm:text-base leading-relaxed">
            Nature Waste is the premier full-service solid waste and recycling partner in Greater Kampala. We deliver top-tier, odor-free collections, recycling, and responsible disposal for homes, estates, hospitality, and commercial industries.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {customerReviews.slice(0, 4).map((review) => (
            <div
              key={review.id}
              className="bg-[#F8F9FA] rounded border border-[#E5E7EB] p-5 flex flex-col justify-between hover:bg-white hover:border-[#006F51] hover:shadow-xs transition-all duration-200"
            >
              <div className="space-y-3">
                {/* Rating Header */}
                <div className="flex items-center gap-2.5">
                  <div className="text-xl font-black text-[#1A1D20]">
                    {(review.rating || 5).toFixed(1)}
                  </div>
                  <div className="flex items-center gap-0.5 text-[#FFCE00]">
                    {[...Array(review.rating || 5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#FFCE00] stroke-[#FFCE00]" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-[#555C66] text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{review.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-gray-200 mt-5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-[#1A1D20]">
                    {review.name}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-1">
                    {review.role}
                  </div>
                  <div className="text-[11px] font-semibold text-[#006F51]">
                    {review.organization}
                  </div>
                </div>

                {/* Google Verified Review Icon */}
                <div className="w-7 h-7 rounded-sm bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-[#4285F4] shrink-0 shadow-xs">
                  G
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-10 text-center">
          <Link
            href="/#about-nema"
            className="inline-flex items-center justify-center bg-white hover:bg-gray-50 border border-gray-300 hover:border-[#006F51] text-[#1A1D20] px-7 py-3 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            <span>More About Nature Waste</span>
            <ArrowRight className="w-4 h-4 ml-2 text-[#006F51]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
