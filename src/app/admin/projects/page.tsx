"use client";

import React, { useState } from "react";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { ProjectItem } from "@/data/projects";
import { Award, Plus, Edit2, CheckCircle2, Save, X, Trash2 } from "lucide-react";

export default function ProjectsAdminPage() {
  const { projectsList, editProject } = useWebsiteData();
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [form, setForm] = useState<ProjectItem>({
    id: "",
    title: "",
    category: "Municipal",
    location: "Kampala",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    impact: "10,000 MT Diverted",
    description: "",
  });

  const handleOpenEdit = (p: ProjectItem) => {
    setEditingProject(p);
    setForm(p);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    editProject(editingProject.id, form);
    setEditingProject(null);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2.5 py-1 rounded-sm border border-[#006F51]/20">
          <Award className="w-3.5 h-3.5" />
          <span>Case Studies &amp; Track Record</span>
        </div>
        <h2 className="text-2xl font-black text-[#1A1D20] tracking-tight mt-1">
          Sustainability Impact &amp; Municipal Projects
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Showcase verified environmental milestones, tons diverted, and public-private waste partnerships.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Impact project updated successfully!</span>
        </div>
      )}

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsList.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded border border-[#E5E7EB] shadow-xs overflow-hidden flex flex-col justify-between hover:border-[#006F51] transition-colors"
          >
            <div>
              <div className="relative h-44 w-full bg-gray-900 overflow-hidden">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFCE00] text-[#1A1D20] px-2.5 py-0.5 rounded shadow-xs">
                    {proj.impact}
                  </span>
                </div>
                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-[#006F51] text-white rounded transition-colors cursor-pointer"
                  title="Edit Project"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-2 text-xs">
                <div className="text-[11px] text-[#006F51] font-bold uppercase tracking-wider">
                  {proj.category} &bull; {proj.location}
                </div>
                <h3 className="text-base font-bold text-[#1A1D20]">{proj.title}</h3>
                <p className="text-gray-600 leading-relaxed">{proj.description}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end text-xs">
              <button
                onClick={() => handleOpenEdit(proj)}
                className="text-xs font-bold text-[#006F51] hover:underline cursor-pointer"
              >
                Modify Case Study &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded border border-[#E5E7EB] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#006F51] text-white sticky top-0 z-10">
              <h3 className="text-base font-bold">Edit Project: {editingProject.title}</h3>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1 text-white/80 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
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
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Location / Zone *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Impact Metric Callout *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.impact}
                    onChange={(e) => setForm({ ...form, impact: e.target.value })}
                    placeholder="e.g. 12,500 Smart Bins Online"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 text-gray-600 hover:text-black font-bold uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#006F51] hover:bg-[#005a42] text-white px-5 py-2 rounded font-bold uppercase text-xs tracking-wider transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
