import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export default function BlogPreview() {
  const featured = blogPosts[0];
  const sidePosts = blogPosts.slice(1, 3);

  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 select-none">
      <div className="max-w-[1320px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-14">
          <div>
            <div className="flex items-center gap-1.5 text-nature-primary font-bold text-xs sm:text-sm tracking-widest uppercase">
              <span className="text-base leading-none text-nature-secondary">»</span>
              <span>UPDATE &amp; INSIGHTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#1A1D20] tracking-tight leading-[1.15] mt-3">
              Articles &amp; insights for <br className="hidden sm:inline" /> waste &amp; sustainability leaders
            </h2>
          </div>

          <div className="shrink-0">
            <Link
              href="/blog"
              className="bg-[#006F51] hover:bg-[#004D38] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-sm transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>View All Posts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Featured Large Card (Left Column) */}
          <Link
            href={`/blog/${featured.slug}`}
            className="lg:col-span-6 group overflow-hidden cursor-pointer min-h-[360px] sm:min-h-[420px] lg:min-h-[460px] flex flex-col justify-end border border-gray-200 rounded-sm hover:border-[#006F51] transition-colors relative"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${featured.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/15 z-10" />

            {/* Content overlay */}
            <div className="relative z-20 p-6 sm:p-8 lg:p-9 space-y-3">
              <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm font-medium">
                <span>
                  By <strong className="text-white font-bold">{featured.author}</strong>
                </span>
                <span>•</span>
                <span>{featured.date}</span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-black text-white leading-snug tracking-tight group-hover:text-nature-secondary transition-colors duration-300">
                {featured.title}
              </h3>

              <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-xl font-normal line-clamp-2">
                {featured.excerpt}
              </p>

              <div className="pt-2">
                <span className="inline-block bg-nature-primary text-white text-[11px] sm:text-xs font-bold px-3 py-1 uppercase tracking-wider">
                  {featured.category}
                </span>
              </div>
            </div>
          </Link>

          {/* 2 Side Cards (Right Column) */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-5 sm:gap-6">
            {sidePosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row bg-[#F7F8FA] overflow-hidden cursor-pointer shadow-xs hover:shadow-xl transition-shadow duration-300 h-full min-h-[190px] sm:min-h-[215px] border border-gray-100"
              >
                <div className="flex-1 p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm font-medium">
                      <span>
                        By <strong className="text-[#1A1D20] font-bold">{post.author}</strong>
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-black text-[#1A1D20] leading-snug tracking-tight mt-2 group-hover:text-nature-primary transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h4>

                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mt-2 font-normal line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div>
                    <span className="inline-block bg-nature-primary text-white text-[10px] sm:text-[11px] font-bold px-3 py-1 uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Right image */}
                <div className="w-full sm:w-[200px] lg:w-[220px] shrink-0 h-[180px] sm:h-auto relative overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${post.image}')` }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
