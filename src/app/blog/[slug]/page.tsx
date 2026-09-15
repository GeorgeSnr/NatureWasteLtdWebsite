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
    <article className="bg-white min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-[#181A1C] text-white py-14 sm:py-18 px-6 sm:px-12 lg:px-16 border-b border-[#292B2E]">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-nature-secondary hover:underline text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>

          <div className="inline-block bg-nature-primary text-white text-xs font-bold uppercase px-3 py-1 tracking-wider">
            {post.category}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-black leading-tight tracking-tight text-white">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-nature-secondary" />
              <span>{post.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-nature-secondary" />
              <span>{post.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-nature-secondary" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-16 -mt-8 sm:-mt-12 relative z-10">
        <div className="w-full h-[280px] sm:h-[420px] shadow-2xl overflow-hidden chamfer-card">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${post.image}')` }}
          />
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-3xl mx-auto px-6 sm:px-12 lg:px-16 py-12">
        <div className="prose prose-lg max-w-none text-[#333333] leading-relaxed space-y-6 text-base sm:text-lg">
          <p className="text-lg sm:text-xl font-medium text-gray-700 leading-relaxed border-l-4 border-nature-primary pl-4 py-1 italic">
            {post.excerpt}
          </p>

          <div className="whitespace-pre-line text-gray-700 leading-relaxed font-normal">
            {post.content}
          </div>
        </div>

        {/* Share & Tags */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
            <Tag className="w-4 h-4 text-nature-primary" />
            <span>Tags: Waste ERP, Smart Cities, Circular Economy, Africa</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-nature-primary cursor-pointer hover:underline">
            <Share2 className="w-4 h-4" />
            <span>Share This Article</span>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <h3 className="text-xl font-black text-[#141517] mb-6">
            Related Intelligence &amp; Case Studies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group border border-gray-200 p-5 hover:border-nature-primary transition-all shadow-xs"
              >
                <span className="text-[11px] font-bold uppercase text-nature-primary">
                  {rel.category}
                </span>
                <h4 className="text-base font-bold text-[#141517] mt-1 group-hover:text-nature-primary transition-colors line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2">
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
