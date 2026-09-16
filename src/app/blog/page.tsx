"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Community & Policy", "Smart Cities", "Recycling", "Regulatory & ESG"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Blog Hero Banner */}
      <section className="border-b border-[#E5E7EB] bg-[#F8F9FA] px-4 sm:px-12 lg:px-16 py-12 sm:py-16 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#006F51] font-bold text-xs uppercase tracking-wider bg-[#E9F4F0] px-3 py-1 rounded-sm border border-[#006F51]/20">
            Research, Insights &amp; Policy
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1A1D20] leading-tight tracking-tight">
            Waste Management &amp; Circular Economy Intelligence
          </h1>
          <p className="text-sm sm:text-base text-[#555C66] leading-relaxed max-w-xl mx-auto">
            Practical case studies, IoT sensor benchmarks, and environmental governance frameworks for modern municipalities and industries.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-12 lg:px-16 pt-8 sm:pt-12 pb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#E5E7EB] pb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#006F51] text-white shadow-xs"
                    : "bg-[#F8F9FA] border border-[#E5E7EB] text-[#1A1D20] hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-[#D1D5DB] rounded-sm bg-[#F8F9FA] text-xs focus:outline-none focus:border-[#006F51] text-[#1A1D20]"
            />
          </div>
        </div>
      </div>

      {/* Blog Articles Grid */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-12 lg:px-16 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-[#E5E7EB] hover:border-[#006F51] rounded overflow-hidden shadow-xs transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="w-full h-52 relative overflow-hidden bg-gray-100">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${post.image}')` }}
                  />
                  <div className="absolute top-3 left-3 bg-[#006F51] text-white text-[10px] font-bold uppercase px-2.5 py-1 tracking-wider rounded-sm">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#555C66] font-medium">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1A1D20] leading-snug group-hover:text-[#006F51] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-[#555C66] text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-bold text-[#006F51] mt-4">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-base font-bold">No articles match your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchTerm("");
              }}
              className="mt-2 text-xs font-bold text-[#006F51] uppercase underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
