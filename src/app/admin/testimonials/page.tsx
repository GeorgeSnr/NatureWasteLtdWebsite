"use client";

import React, { useState } from "react";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { TestimonialItem } from "@/data/testimonials";
import { Star, Plus, Edit2, Trash2, CheckCircle2, Save, X, User } from "lucide-react";

export default function TestimonialsAdminPage() {
  const { customerReviews, addTestimonial, editTestimonial, deleteTestimonial } =
    useWebsiteData();

  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState<TestimonialItem>({
    id: "",
    name: "",
    role: "",
    organization: "",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    content: "",
    rating: 5,
  });

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setForm(item);
  };

  const handleOpenNew = () => {
    setEditingItem(null);
    setForm({
      id: `test-${Date.now()}`,
      name: "",
      role: "Property Manager / Homeowner",
      organization: "Residential Estate",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      content: "",
      rating: 5,
    });
    setIsNewModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      editTestimonial(editingItem.id, form);
      setEditingItem(null);
    } else {
      addTestimonial(form);
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
            <Star className="w-3.5 h-3.5" />
            <span>Social Proof &amp; Reviews</span>
          </div>
          <h2 className="text-2xl font-black text-[#1A1D20] tracking-tight mt-1">
            Customer Testimonials &amp; Reviews
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage verified client testimonials from home residents, commercial property managers, and health organizations.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="bg-[#006F51] hover:bg-[#005a42] text-white px-4 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Review</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Testimonials list updated successfully!</span>
        </div>
      )}

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {customerReviews.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded border border-[#E5E7EB] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#006F51] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#FFCE00]">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-gray-400 hover:text-[#006F51] hover:bg-[#E9F4F0] rounded transition-colors cursor-pointer"
                    title="Edit Review"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete testimonial from ${item.name}?`)) {
                        deleteTestimonial(item.id);
                      }
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed italic mt-3">
                &ldquo;{item.content}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <div className="text-xs">
                <h4 className="font-bold text-[#1A1D20]">{item.name}</h4>
                <div className="text-gray-500 text-[11px]">{item.role}</div>
                <div className="text-[#006F51] font-semibold text-[11px]">{item.organization}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {(editingItem || isNewModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded border border-[#E5E7EB] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#006F51] text-white sticky top-0 z-10">
              <h3 className="text-base font-bold">
                {editingItem ? `Edit Review: ${editingItem.name}` : "Add New Customer Review"}
              </h3>
              <button
                onClick={() => {
                  setEditingItem(null);
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
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Beatrice Namuli"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Role / Position *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Head of ESG & Sustainability"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Organization / Estate *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    placeholder="e.g. Victoria Heights Residences"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Star Rating (1 to 5)
                  </label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs font-bold focus:outline-none focus:border-[#006F51]"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Avatar Image URL
                  </label>
                  <input
                    type="text"
                    value={form.avatar}
                    onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Record what the client stated about our reliability, compactor service, or recycling sacks..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(null);
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
                  <span>Save Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
