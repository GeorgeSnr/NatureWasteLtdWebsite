import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User, Share2, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostDetail({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <article className="bg-white min-h-screen pb-20 overflow-x-hidden">
      {/* Header Banner */}
      <div className="bg-[#14191E] text-white py-12 sm:py-18 px-4 sm:px-12 lg:px-16 border-b border-white/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#FFCE00] hover:underline text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>

          <div className="inline-block bg-[#006F51] text-white text-xs font-bold uppercase px-3 py-1 tracking-wider rounded-sm">
            {post.category}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black leading-tight tracking-tight text-white">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#FFCE00]" />
              <span>{post.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#FFCE00]" />
              <span>{post.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#FFCE00]" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-12 lg:px-16 -mt-8 sm:-mt-12 relative z-10">
        <div className="w-full h-[240px] sm:h-[420px] border border-[#E5E7EB] rounded overflow-hidden shadow-xs bg-white">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${post.image}')` }}
          />
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-12 lg:px-16 py-10 sm:py-12">
        <div className="prose prose-lg max-w-none text-[#212529] leading-relaxed space-y-6 text-base sm:text-lg">
          <p className="text-base sm:text-lg font-medium text-[#1A1D20] leading-relaxed border-l-4 border-[#006F51] pl-4 py-1 italic bg-[#F8F9FA]">
            {post.excerpt}
          </p>

          <div className="whitespace-pre-line text-[#333A42] leading-relaxed font-normal text-sm sm:text-base">
            {post.content}
          </div>
        </div>

        {/* Share & Tags */}
        <div className="mt-12 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#555C66]">
            <Tag className="w-4 h-4 text-[#006F51]" />
            <span>Tags: Waste ERP, Smart Cities, Circular Economy, Africa</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#006F51] cursor-pointer hover:underline">
            <Share2 className="w-4 h-4" />
            <span>Share This Article</span>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-10 border-t border-[#E5E7EB]">
          <h3 className="text-xl font-bold text-[#1A1D20] mb-6">
            Related Intelligence &amp; Case Studies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group border border-[#E5E7EB] rounded p-5 hover:border-[#006F51] transition-colors shadow-xs bg-white"
              >
                <span className="text-[11px] font-bold uppercase text-[#006F51] tracking-wider">
                  {rel.category}
                </span>
                <h4 className="text-base font-bold text-[#1A1D20] mt-1 group-hover:text-[#006F51] transition-colors line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-[#555C66] mt-2 line-clamp-2 leading-relaxed">
                  {rel.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
