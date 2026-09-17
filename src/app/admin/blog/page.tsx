"use client";

import React, { useState } from "react";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { BlogPost } from "@/data/blogPosts";
import { FileText, Plus, Edit2, Trash2, CheckCircle2, Search, X, Save, Eye } from "lucide-react";
import Link from "next/link";

export default function BlogAdminPage() {
  const { articles, addBlogPost, editBlogPost, deleteBlogPost } = useWebsiteData();

  const [search, setSearch] = useState("");
  const [editingArticle, setEditingArticle] = useState<BlogPost | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState<BlogPost>({
    slug: "",
    title: "",
    excerpt: "",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    author: "Nature Waste Leadership Team",
    category: "Community & Policy",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
    content: "",
  });

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenEdit = (article: BlogPost) => {
    setEditingArticle(article);
    setForm(article);
  };

  const handleOpenNew = () => {
    setEditingArticle(null);
    setForm({
      slug: "",
      title: "",
      excerpt: "",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      author: "Nature Waste Communications",
      category: "GoGreenug Initiative",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
      content: "",
    });
    setIsNewModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug =
      form.slug ||
      form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    if (editingArticle) {
      editBlogPost(editingArticle.slug, { ...form, slug });
      setEditingArticle(null);
    } else {
      addBlogPost({ ...form, slug });
      setIsNewModalOpen(false);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2.5 py-1 rounded-sm border border-[#006F51]/20">
            <FileText className="w-3.5 h-3.5" />
            <span>Circularity &amp; Public Relations</span>
          </div>
          <h2 className="text-2xl font-black text-[#1A1D20] tracking-tight mt-1">
            Circular Economy Blog &amp; News Manager
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Publish and edit educational articles, youth environmental campaigns, and statutory compliance updates.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="bg-[#006F51] hover:bg-[#005a42] text-white px-4 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Article saved successfully! Available live on /blog.</span>
        </div>
      )}

      {/* Search Input */}
      <div className="bg-white p-4 rounded border border-[#E5E7EB] shadow-xs max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title, author, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F8F9FA] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.slug}
            className="bg-white rounded border border-[#E5E7EB] shadow-xs overflow-hidden flex flex-col justify-between hover:border-[#006F51] transition-colors"
          >
            <div>
              <div className="relative h-44 w-full bg-gray-900 overflow-hidden">
                <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#006F51] text-white px-2.5 py-0.5 rounded shadow-xs">
                    {art.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(art)}
                    className="p-1.5 bg-black/60 hover:bg-[#006F51] text-white rounded transition-colors cursor-pointer"
                    title="Edit Article"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete article "${art.title}"?`)) {
                        deleteBlogPost(art.slug);
                      }
                    }}
                    className="p-1.5 bg-black/60 hover:bg-red-600 text-white rounded transition-colors cursor-pointer"
                    title="Delete Article"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-2 text-xs">
                <div className="text-[11px] text-gray-500 flex items-center gap-2">
                  <span>{art.date}</span> &bull; <span>{art.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-[#1A1D20] line-clamp-2">{art.title}</h3>
                <p className="text-gray-600 line-clamp-3 leading-relaxed">{art.excerpt}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">By {art.author.split(",")[0]}</span>
              <div className="flex items-center gap-2">
                <Link
                  href={`/blog/${art.slug}`}
                  target="_blank"
                  className="text-gray-500 hover:text-[#006F51] flex items-center gap-1 font-bold"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </Link>
                <button
                  onClick={() => handleOpenEdit(art)}
                  className="text-[#006F51] font-bold hover:underline cursor-pointer"
                >
                  Edit &rarr;
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / New Article Modal */}
      {(editingArticle || isNewModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded border border-[#E5E7EB] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#006F51] text-white sticky top-0 z-10">
              <h3 className="text-base font-bold">
                {editingArticle ? "Edit Article" : "Write New Article"}
              </h3>
              <button
                onClick={() => {
                  setEditingArticle(null);
                  setIsNewModalOpen(false);
                }}
                className="p-1 text-white/80 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Circular Plastics and Lake Victoria Conservation..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Category Tag *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Recycling, Smart Cities, ESG Compliance"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Author Attribution
                  </label>
                  <input
                    type="text"
                    required
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    placeholder="e.g. Nature Waste Leadership Team"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Publication Date
                  </label>
                  <input
                    type="text"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="e.g. September 17, 2026"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Short Excerpt (Summary for Cards &amp; SEO)
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Brief 2-sentence summary of the article..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Article Body Content *
                </label>
                <textarea
                  rows={6}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Write the full article text here..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51] font-mono"
                />
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingArticle(null);
                    setIsNewModalOpen(false);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-black font-bold uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#006F51] hover:bg-[#005a42] text-white px-5 py-2 rounded font-bold uppercase text-xs tracking-wider transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Publish Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
