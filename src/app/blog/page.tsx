"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Smart Cities", "Recycling", "Regulatory & ESG"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Blog Hero Banner */}
      <section className="border-b border-[#c5c6cd] bg-[#f8fafc] px-6 sm:px-12 lg:px-16 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-nature-primary">
            Research, Insights &amp; Policy
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#091426] leading-tight tracking-tight">
            Waste Management &amp; Circular Economy Intelligence
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
            Practical case studies, IoT sensor benchmarks, and environmental governance frameworks for modern municipalities and industries.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16 pt-12 pb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-200 pb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-nature-primary text-white shadow-xs"
                    : "bg-gray-100 text-[#141517] hover:bg-gray-200"
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
              className="w-full pl-9 pr-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-nature-primary"
            />
          </div>
        </div>
      </div>

      {/* Blog Articles Grid */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white border border-gray-200 hover:border-nature-primary flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 chamfer-card"
            >
              <div>
                {/* Thumbnail */}
                <div className="w-full h-52 relative overflow-hidden bg-gray-100">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${post.image}')` }}
                  />
                  <div className="absolute top-3 left-3 bg-nature-primary text-white text-[10px] font-black uppercase px-2.5 py-1 tracking-wider">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#141517] leading-snug group-hover:text-nature-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-nature-primary mt-4">
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
              className="mt-2 text-xs font-bold text-nature-primary uppercase underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
