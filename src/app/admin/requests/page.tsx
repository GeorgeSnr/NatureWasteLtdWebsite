"use client";

import React, { useState, useMemo } from "react";
import {
  Inbox,
  Search,
  Filter,
  Phone,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  User,
  Building,
  Plus,
  Trash2,
  X,
  Download,
  Send,
  ArrowUpDown,
  FileText,
  Tag,
  Share2,
} from "lucide-react";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import {
  ClientRequest,
  RequestStatus,
  RequestPriority,
  RequestType,
} from "@/types/admin";

export default function AdminRequestsPage() {
  const {
    requests,
    submitRequest,
    updateRequestStatus,
    updateRequestPriority,
    assignRequest,
    addRequestNote,
    deleteRequest,
  } = useWebsiteData();

  // Filter and search states
  const [activeTab, setActiveTab] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [suburbFilter, setSuburbFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal states
  const [selectedRequest, setSelectedRequest] = useState<ClientRequest | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState<boolean>(false);
  const [newNoteText, setNewNoteText] = useState<string>("");

  // Manual request form state
  const [manualForm, setManualForm] = useState({
    name: "",
    phone: "",
    email: "",
    organization: "",
    suburb: "Kitende",
    address: "",
    type: "residential_inquiry" as RequestType,
    title: "",
    volumeOrTier: "",
    preferredDate: "",
    message: "",
    priority: "normal" as RequestPriority,
  });

  // Unique suburbs from requests
  const uniqueSuburbs = useMemo(() => {
    const set = new Set<string>();
    requests.forEach((r) => {
      if (r.suburb) set.add(r.suburb);
    });
    return Array.from(set);
  }, [requests]);

  // Filtered requests list
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      // Tab filter (status)
      if (activeTab === "new" && r.status !== "new") return false;
      if (activeTab === "in_review" && r.status !== "in_review") return false;
      if (activeTab === "in_progress" && r.status !== "in_progress") return false;
      if (activeTab === "resolved" && r.status !== "resolved") return false;
      if (activeTab === "archived" && r.status !== "archived") return false;

      // Type filter
      if (typeFilter !== "all" && r.type !== typeFilter) return false;

      // Suburb filter
      if (suburbFilter !== "all" && r.suburb !== suburbFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = r.name.toLowerCase().includes(q);
        const matchesPhone = r.phone.toLowerCase().includes(q);
        const matchesEmail = r.email?.toLowerCase().includes(q) || false;
        const matchesOrg = r.organization?.toLowerCase().includes(q) || false;
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesSuburb = r.suburb?.toLowerCase().includes(q) || false;
        const matchesId = r.id.toLowerCase().includes(q);
        if (
          !matchesName &&
          !matchesPhone &&
          !matchesEmail &&
          !matchesOrg &&
          !matchesTitle &&
          !matchesSuburb &&
          !matchesId
        ) {
          return false;
        }
      }

      return true;
    });
  }, [requests, activeTab, typeFilter, suburbFilter, searchQuery]);

  // Counts
  const countAll = requests.length;
  const countNew = requests.filter((r) => r.status === "new").length;
  const countInReview = requests.filter((r) => r.status === "in_review").length;
  const countInProgress = requests.filter((r) => r.status === "in_progress").length;
  const countResolved = requests.filter((r) => r.status === "resolved").length;

  // Add note to selected request
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !newNoteText.trim()) return;
    addRequestNote(selectedRequest.id, newNoteText.trim(), "Dispatcher");
    // Update local selectedRequest
    setSelectedRequest((prev) =>
      prev
        ? {
            ...prev,
            notes: [
              ...(prev.notes || []),
              {
                id: `n-${Date.now()}`,
                author: "Dispatcher",
                content: newNoteText.trim(),
                createdAt: new Date().toISOString(),
              },
            ],
          }
        : null
    );
    setNewNoteText("");
  };

  // Submit manual request
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = submitRequest({
      name: manualForm.name,
      phone: manualForm.phone,
      email: manualForm.email || undefined,
      organization: manualForm.organization || undefined,
      suburb: manualForm.suburb,
      address: manualForm.address,
      type: manualForm.type,
      title:
        manualForm.title ||
        `${manualForm.type.replace(/_/g, " ").toUpperCase()} (${manualForm.suburb})`,
      volumeOrTier: manualForm.volumeOrTier || undefined,
      preferredDate: manualForm.preferredDate || undefined,
      message: manualForm.message,
      priority: manualForm.priority,
      status: "new",
      assignedTo: "Kitende Dispatch Desk",
    });

    setIsManualModalOpen(false);
    setManualForm({
      name: "",
      phone: "",
      email: "",
      organization: "",
      suburb: "Kitende",
      address: "",
      type: "residential_inquiry",
      title: "",
      volumeOrTier: "",
      preferredDate: "",
      message: "",
      priority: "normal",
    });
    setSelectedRequest(created);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Type",
      "Priority",
      "Status",
      "Name",
      "Phone",
      "Email",
      "Organization",
      "Suburb",
      "Address",
      "Volume/Tier",
      "Preferred Date",
      "Message",
      "Created At",
    ];

    const rows = filteredRequests.map((r) => [
      `"${r.id}"`,
      `"${r.type}"`,
      `"${r.priority}"`,
      `"${r.status}"`,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      `"${r.email || ""}"`,
      `"${r.organization || ""}"`,
      `"${r.suburb || ""}"`,
      `"${(r.address || "").replace(/"/g, '""')}"`,
      `"${r.volumeOrTier || ""}"`,
      `"${r.preferredDate || ""}"`,
      `"${(r.message || "").replace(/"/g, '""')}"`,
      `"${r.createdAt}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NatureWaste_Requests_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPriorityBadge = (p: RequestPriority) => {
    switch (p) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200 font-black";
      case "high":
        return "bg-amber-100 text-amber-800 border-amber-200 font-bold";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusBadge = (s: RequestStatus) => {
    switch (s) {
      case "new":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 font-bold";
      case "in_review":
        return "bg-amber-100 text-amber-800 border-amber-300 font-medium";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-300 font-medium";
      case "resolved":
        return "bg-gray-100 text-gray-700 border-gray-300";
      case "archived":
        return "bg-gray-100 text-gray-500 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Header & Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2.5 py-1 rounded-sm border border-[#006F51]/20">
            <Inbox className="w-3.5 h-3.5" />
            <span>Customer Intake &amp; Dispatch Console</span>
          </div>
          <h2 className="text-2xl font-black text-[#1A1D20] tracking-tight mt-1">
            Incoming Client Requests &amp; Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage residential signups, commercial quotes, skip orders, and missed pickup recovery tickets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="bg-[#006F51] hover:bg-[#005a42] text-white px-4 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log Phone Request</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2.5 rounded font-bold text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. Status Filter Tabs Bar */}
      <div className="bg-white rounded border border-[#E5E7EB] shadow-xs p-1 flex flex-wrap items-center gap-1">
        {[
          { id: "all", label: "All Requests", count: countAll },
          { id: "new", label: "New / Pending", count: countNew, highlight: countNew > 0 },
          { id: "in_review", label: "In Review", count: countInReview },
          { id: "in_progress", label: "In Progress", count: countInProgress },
          { id: "resolved", label: "Resolved", count: countResolved },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 sm:px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#006F51] text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100 hover:text-black"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                activeTab === tab.id
                  ? "bg-white/20 text-white"
                  : tab.highlight
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 3. Search & Secondary Filters Bar */}
      <div className="bg-white p-4 rounded border border-[#E5E7EB] shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search Input */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, phone (+256...), organization, suburb, or request ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F8F9FA] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
          />
        </div>

        {/* Type Filter */}
        <div className="sm:col-span-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F8F9FA] border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:border-[#006F51]"
          >
            <option value="all">All Request Categories</option>
            <option value="missed_pickup">Missed Curbside Pickups</option>
            <option value="dumpster_rental">Skip / Roll-Off Rentals</option>
            <option value="demo_booking">Demo &amp; Waste Audits</option>
            <option value="commercial_inquiry">Commercial Waste Inquiries</option>
            <option value="trial_registration">Trial Registrations</option>
            <option value="on_demand_pickup">On-Demand Bulky Pickups</option>
            <option value="residential_inquiry">Residential Inquiries</option>
          </select>
        </div>

        {/* Suburb Filter */}
        <div className="sm:col-span-3">
          <select
            value={suburbFilter}
            onChange={(e) => setSuburbFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#F8F9FA] border border-gray-300 rounded text-xs text-gray-700 font-medium focus:outline-none focus:border-[#006F51]"
          >
            <option value="all">All Suburbs / Zones</option>
            {uniqueSuburbs.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. Requests Table */}
      <div className="bg-white rounded border border-[#E5E7EB] shadow-xs overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Inbox className="w-10 h-10 text-gray-300 mx-auto" />
            <h4 className="text-base font-bold text-gray-700">No matching requests found</h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try adjusting your search terms or filters to view active client submissions.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px] text-left border-collapse text-xs">
              <thead className="bg-[#1A1D20] text-white text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-4">ID &amp; Priority</th>
                  <th className="p-4">Client Name &amp; Contacts</th>
                  <th className="p-4">Request Category &amp; Details</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Preferred Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] font-medium">
                {filteredRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-[#F8F9FA] transition-colors cursor-pointer"
                    onClick={() => setSelectedRequest(req)}
                  >
                    {/* ID & Priority */}
                    <td className="p-4">
                      <div className="font-mono font-bold text-[#1A1D20]">{req.id}</div>
                      <span
                        className={`inline-block text-[10px] uppercase px-1.5 py-0.2 rounded border mt-1 ${getPriorityBadge(
                          req.priority
                        )}`}
                      >
                        {req.priority}
                      </span>
                    </td>

                    {/* Client Name & Phone */}
                    <td className="p-4">
                      <div className="font-bold text-[#1A1D20]">{req.name}</div>
                      <div className="text-gray-500 font-mono text-[11px] mt-0.5">{req.phone}</div>
                      {req.organization && (
                        <div className="text-[11px] text-[#006F51] font-semibold">
                          {req.organization}
                        </div>
                      )}
                    </td>

                    {/* Title & snippet */}
                    <td className="p-4 max-w-xs">
                      <div className="font-bold text-gray-900">{req.title}</div>
                      <div className="text-gray-500 text-[11px] line-clamp-1 mt-0.5">
                        {req.message || req.volumeOrTier || "No extra notes provided"}
                      </div>
                      {req.notes && req.notes.length > 0 && (
                        <span className="text-[10px] text-[#006F51] bg-[#E9F4F0] px-1.5 py-0.2 rounded mt-1 inline-block">
                          {req.notes.length} internal note(s)
                        </span>
                      )}
                    </td>

                    {/* Suburb */}
                    <td className="p-4">
                      <div className="font-bold text-gray-800">{req.suburb || "Kampala"}</div>
                      <div className="text-gray-500 text-[11px] line-clamp-1">
                        {req.address || "Area Route"}
                      </div>
                    </td>

                    {/* Preferred Date */}
                    <td className="p-4">
                      <div className="text-gray-700 font-mono text-[11px]">
                        {req.preferredDate || "Immediate"}
                      </div>
                    </td>

                    {/* Status Dropdown (inline change with click stopPropagation) */}
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={req.status}
                        onChange={(e) => updateRequestStatus(req.id, e.target.value as RequestStatus)}
                        className={`text-xs px-2.5 py-1 rounded border font-bold cursor-pointer focus:outline-none ${getStatusBadge(
                          req.status
                        )}`}
                      >
                        <option value="new">New (Pending)</option>
                        <option value="in_review">In Review</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Details
                        </button>
                        <a
                          href={`https://wa.me/${req.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `Hello ${req.name}, this is Nature Waste Management Ltd regarding your inquiry #${req.id} (${req.title}). How may we assist with your route scheduling?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded transition-colors"
                          title="Open WhatsApp Chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`tel:${req.phone.replace(/\s+/g, "")}`}
                          className="p-1.5 bg-[#006F51] hover:bg-[#004D38] text-white rounded transition-colors"
                          title="Call Client"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => {
                            if (confirm(`Delete request #${req.id} from ${req.name}?`)) {
                              deleteRequest(req.id);
                            }
                          }}
                          className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                          title="Delete Request"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Request Detail Drawer / Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded border border-[#E5E7EB] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#1A1D20] text-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-black text-[#FFCE00]">
                  {selectedRequest.id}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    selectedRequest.priority === "urgent"
                      ? "bg-red-600 text-white"
                      : selectedRequest.priority === "high"
                      ? "bg-amber-500 text-black font-black"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {selectedRequest.priority} Priority
                </span>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1 text-gray-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-xs text-[#1A1D20]">
              {/* Title & Service */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006F51]">
                  Request Topic
                </span>
                <h3 className="text-xl font-black text-[#1A1D20] mt-0.5">
                  {selectedRequest.title}
                </h3>
                <div className="text-gray-500 text-[11px] mt-1">
                  Submitted on {new Date(selectedRequest.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Status & Assignment Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#F8F9FA] rounded border border-gray-200">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Workflow Status
                  </label>
                  <select
                    value={selectedRequest.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as RequestStatus;
                      updateRequestStatus(selectedRequest.id, newStatus);
                      setSelectedRequest({ ...selectedRequest, status: newStatus });
                    }}
                    className="w-full p-2 bg-white border border-gray-300 rounded font-bold text-xs"
                  >
                    <option value="new">New (Pending)</option>
                    <option value="in_review">In Review</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Priority Level
                  </label>
                  <select
                    value={selectedRequest.priority}
                    onChange={(e) => {
                      const newPriority = e.target.value as RequestPriority;
                      updateRequestPriority(selectedRequest.id, newPriority);
                      setSelectedRequest({ ...selectedRequest, priority: newPriority });
                    }}
                    className="w-full p-2 bg-white border border-gray-300 rounded font-bold text-xs"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Assigned Personnel
                  </label>
                  <input
                    type="text"
                    value={selectedRequest.assignedTo || ""}
                    placeholder="e.g. Kitende Supervisor"
                    onChange={(e) => {
                      assignRequest(selectedRequest.id, e.target.value);
                      setSelectedRequest({ ...selectedRequest, assignedTo: e.target.value });
                    }}
                    className="w-full p-2 bg-white border border-gray-300 rounded text-xs font-medium"
                  />
                </div>
              </div>

              {/* Customer Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded border border-gray-200 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Customer Details
                  </div>
                  <div className="font-bold text-sm text-[#1A1D20]">
                    {selectedRequest.name}
                  </div>
                  {selectedRequest.organization && (
                    <div className="text-[#006F51] font-semibold">
                      Organization: {selectedRequest.organization}
                    </div>
                  )}
                  <div className="text-gray-600 font-mono">
                    Phone: {selectedRequest.phone}
                  </div>
                  {selectedRequest.email && (
                    <div className="text-gray-600">Email: {selectedRequest.email}</div>
                  )}
                </div>

                <div className="p-4 rounded border border-gray-200 space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Location &amp; Schedule
                  </div>
                  <div className="font-bold text-sm text-[#1A1D20]">
                    Suburb: {selectedRequest.suburb || "Kampala"}
                  </div>
                  <div className="text-gray-600">
                    Address: {selectedRequest.address || "Area Route"}
                  </div>
                  <div className="text-gray-600">
                    Volume / Container: {selectedRequest.volumeOrTier || "Standard"}
                  </div>
                  <div className="text-gray-600">
                    Preferred Date: {selectedRequest.preferredDate || "Immediate"}
                  </div>
                </div>
              </div>

              {/* Message / Special Instructions */}
              <div className="p-4 rounded border border-gray-200 bg-[#F8F9FA] space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Client Message / Waste Notes
                </div>
                <p className="text-gray-800 leading-relaxed font-normal whitespace-pre-wrap">
                  {selectedRequest.message || "No additional message submitted."}
                </p>
              </div>

              {/* Direct Quick Response Buttons */}
              <div className="p-4 rounded bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Contact Client Directly
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`https://wa.me/${selectedRequest.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Hello ${selectedRequest.name}, this is Nature Waste Management Ltd regarding your inquiry #${selectedRequest.id} (${selectedRequest.title}). We are ready to assist you.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Client</span>
                  </a>
                  <a
                    href={`tel:${selectedRequest.phone.replace(/\s+/g, "")}`}
                    className="bg-[#006F51] hover:bg-[#004D38] text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Phone</span>
                  </a>
                  {selectedRequest.email && (
                    <a
                      href={`mailto:${selectedRequest.email}?subject=Nature Waste Management - Inquiry ${selectedRequest.id}`}
                      className="bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-4 py-2 rounded font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      <span>Send Email</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Internal Dispatch Notes Timeline */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A1D20]">
                    Internal Dispatch Notes ({selectedRequest.notes?.length || 0})
                  </span>
                </div>

                {selectedRequest.notes && selectedRequest.notes.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedRequest.notes.map((note) => (
                      <div key={note.id} className="p-3 bg-gray-50 border border-gray-200 rounded text-xs">
                        <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                          <strong className="text-gray-800">{note.author}</strong>
                          <span>{new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-gray-700">{note.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-xs italic">
                    No dispatch notes recorded yet. Add operational updates below.
                  </p>
                )}

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add an internal note (e.g. Scheduled for 2pm compactor sweep)..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51] focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="bg-[#006F51] hover:bg-[#005a42] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                  >
                    Add Note
                  </button>
                </form>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => {
                  if (confirm(`Delete request #${selectedRequest.id}?`)) {
                    deleteRequest(selectedRequest.id);
                    setSelectedRequest(null);
                  }
                }}
                className="text-red-600 hover:text-red-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Ticket</span>
              </button>
              <button
                onClick={() => setSelectedRequest(null)}
                className="bg-[#1A1D20] text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Log Manual Phone Request Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded border border-[#E5E7EB] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#006F51] text-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <h3 className="text-base font-bold">Log Manual Phone / Counter Request</h3>
              </div>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1 text-white/80 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Juliet Katushabe"
                    value={manualForm.name}
                    onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+256 700 000 000"
                    value={manualForm.phone}
                    onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    placeholder="Optional business name"
                    value={manualForm.organization}
                    onChange={(e) => setManualForm({ ...manualForm, organization: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Optional email"
                    value={manualForm.email}
                    onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Request Category *
                  </label>
                  <select
                    value={manualForm.type}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, type: e.target.value as RequestType })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs font-semibold focus:outline-none focus:border-[#006F51]"
                  >
                    <option value="residential_inquiry">Residential Garbage Pickup</option>
                    <option value="commercial_inquiry">Commercial Waste Plan</option>
                    <option value="dumpster_rental">Roll-Off Skip Rental</option>
                    <option value="missed_pickup">Missed Pickup Report</option>
                    <option value="on_demand_pickup">On-Demand Bulky Collection</option>
                    <option value="demo_booking">Consultation / Audit Booking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Priority
                  </label>
                  <select
                    value={manualForm.priority}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, priority: e.target.value as RequestPriority })
                    }
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs font-semibold focus:outline-none focus:border-[#006F51]"
                  >
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent Priority (Missed/Immediate)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Suburb / Neighborhood *
                  </label>
                  <select
                    value={manualForm.suburb}
                    onChange={(e) => setManualForm({ ...manualForm, suburb: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs font-semibold focus:outline-none focus:border-[#006F51]"
                  >
                    <option value="Kitende">Kitende</option>
                    <option value="Lubowa">Lubowa / Seguku</option>
                    <option value="Kajjansi">Kajjansi</option>
                    <option value="Entebbe">Entebbe Municipality</option>
                    <option value="Bugolobi">Bugolobi / Mbuya</option>
                    <option value="Kololo">Kololo / Nakasero</option>
                    <option value="Namanve">Namanve Industrial Park</option>
                    <option value="Makindye">Makindye / Munyonyo</option>
                    <option value="Kira">Kira / Naalya</option>
                    <option value="Other">Other Suburb</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Specific Address / Street / Gate
                  </label>
                  <input
                    type="text"
                    placeholder="Plot 12, Near St. Mary's Kitende..."
                    value={manualForm.address}
                    onChange={(e) => setManualForm({ ...manualForm, address: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Preferred Collection Date
                  </label>
                  <input
                    type="date"
                    value={manualForm.preferredDate}
                    onChange={(e) => setManualForm({ ...manualForm, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Container Type / Volume
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 240L wheelie bin or 12m³ skip"
                    value={manualForm.volumeOrTier}
                    onChange={(e) => setManualForm({ ...manualForm, volumeOrTier: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Caller Notes &amp; Special Instructions
                </label>
                <textarea
                  rows={3}
                  placeholder="Record customer's instructions, gate codes, or urgent details..."
                  value={manualForm.message}
                  onChange={(e) => setManualForm({ ...manualForm, message: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-black font-bold uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#006F51] hover:bg-[#005a42] text-white px-6 py-2.5 rounded font-bold uppercase text-xs tracking-wider transition-colors shadow-xs"
                >
                  Save to Dispatch Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
