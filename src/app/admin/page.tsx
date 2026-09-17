"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Inbox,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  Bell,
  MessageSquare,
  Phone,
  ArrowRight,
  TrendingUp,
  FileText,
  Plus,
  Truck,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Users,
} from "lucide-react";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import { useAuth } from "@/context/AuthContext";
import { RequestStatus } from "@/types/admin";

export default function AdminDashboardPage() {
  const {
    requests,
    announcement,
    companySettings,
    coverageAreas,
    pricingList,
    articles,
    updateRequestStatus,
    updateAnnouncement,
  } = useWebsiteData();
  const { users } = useAuth();

  const newRequests = requests.filter((r) => r.status === "new");
  const inReviewRequests = requests.filter((r) => r.status === "in_review");
  const inProgressRequests = requests.filter((r) => r.status === "in_progress");
  const resolvedRequests = requests.filter((r) => r.status === "resolved");
  const urgentRequests = requests.filter(
    (r) => r.priority === "urgent" && r.status !== "resolved" && r.status !== "archived"
  );
  const clientUsers = users.filter((u) => u.role === "client");

  const toggleBanner = () => {
    updateAnnouncement({ enabled: !announcement.enabled });
  };

  const statusBadge = (status: RequestStatus) => {
    switch (status) {
      case "new":
        return "bg-emerald-100 text-emerald-800 border-emerald-300 font-black";
      case "in_review":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "in_progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "resolved":
        return "bg-gray-100 text-gray-700 border-gray-300";
      case "archived":
        return "bg-gray-100 text-gray-500 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Welcome Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Kitende Central Dispatch &bull; Operations Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1D20] tracking-tight">
            Welcome, Dispatch Supervisor
          </h2>
          <p className="text-xs sm:text-sm text-[#555C66] mt-1">
            Here is your live overview of incoming client requests, scheduled municipal routes, registered users database, and website dynamic content.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/requests"
            className="bg-[#006F51] hover:bg-[#005a42] text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-2"
          >
            <Inbox className="w-4 h-4" />
            <span>Manage Inquiries ({requests.length})</span>
          </Link>
          <button
            onClick={toggleBanner}
            className={`px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all border cursor-pointer flex items-center gap-2 ${
              announcement.enabled
                ? "bg-[#FFCE00] hover:bg-[#E5B800] text-[#1A1D20] border-amber-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Banner: {announcement.enabled ? "Enabled" : "Disabled"}</span>
          </button>
        </div>
      </div>

      {/* 2. Urgent Alerts Banner (if any urgent requests) */}
      {urgentRequests.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            <div className="text-xs text-red-900">
              <strong className="font-bold">Attention Required:</strong> You have{" "}
              <strong>{urgentRequests.length} urgent client request(s)</strong> (e.g., missed bin pickups or immediate skip drop-offs).
            </div>
          </div>
          <Link
            href="/admin/requests"
            className="text-xs font-bold text-red-800 hover:underline uppercase tracking-wider shrink-0"
          >
            Review Urgent &rarr;
          </Link>
        </div>
      )}

      {/* 3. Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: Inquiries Queue */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Inquiries Inbox</span>
            <Inbox className="w-4 h-4 text-[#006F51]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#1A1D20]">{requests.length}</span>
            <span className="text-xs text-emerald-700 font-bold">
              {newRequests.length} New
            </span>
          </div>
          <div className="text-[11px] text-gray-500 mt-2 flex items-center gap-1.5 border-t border-gray-100 pt-2">
            <span>{inReviewRequests.length} In Review</span> &bull;{" "}
            <span>{resolvedRequests.length} Done</span>
          </div>
        </div>

        {/* Metric 2: Registered Database Users */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Registered Users</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#1A1D20]">{users.length}</span>
            <span className="text-xs text-blue-700 font-bold">
              {clientUsers.length} Clients
            </span>
          </div>
          <div className="text-[11px] text-gray-500 mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
            <span>{users.length - clientUsers.length} Staff</span>
            <Link href="/admin/users" className="text-blue-600 font-bold hover:underline">
              Manage &rarr;
            </Link>
          </div>
        </div>

        {/* Metric 3: Coverage Zones */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Coverage Zones</span>
            <MapPin className="w-4 h-4 text-[#006F51]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#1A1D20]">{coverageAreas.length}</span>
            <span className="text-xs text-[#006F51] font-bold">Suburbs</span>
          </div>
          <div className="text-[11px] text-gray-500 mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
            <span>Entebbe &amp; KLA</span>
            <Link href="/admin/coverage" className="text-[#006F51] font-bold hover:underline">
              Routes &rarr;
            </Link>
          </div>
        </div>

        {/* Metric 4: Circular Diversion */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Waste Diversion</span>
            <TrendingUp className="w-4 h-4 text-[#FFCE00]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-[#1A1D20]">{companySettings.statsTonnage}</span>
          </div>
          <div className="text-[11px] text-[#006F51] font-semibold mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
            <span>{companySettings.statsHouseholds} Homes</span>
            <span>{companySettings.statsPurity} Pure</span>
          </div>
        </div>

        {/* Metric 5: Pricing Subscriptions */}
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pricing Plans</span>
            <CreditCard className="w-4 h-4 text-[#006F51]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#1A1D20]">{pricingList.length}</span>
            <span className="text-xs text-gray-500">Tiers</span>
          </div>
          <div className="text-[11px] text-gray-500 mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
            <span>Res / Comm</span>
            <Link href="/admin/pricing" className="text-[#006F51] font-bold hover:underline">
              Rates &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Recent Incoming Client Requests Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006F51]">
                Live Intake Stream
              </span>
              {newRequests.length > 0 && (
                <span className="bg-[#006F51] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {newRequests.length} unhandled
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-[#1A1D20] mt-0.5">
              Recent Client Inquiries &amp; Service Requests
            </h3>
          </div>

          <Link
            href="/admin/requests"
            className="text-xs font-bold text-[#006F51] hover:underline flex items-center gap-1.5"
          >
            <span>Open Complete Inquiries Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left border-collapse text-xs">
            <thead className="bg-[#1A1D20] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-4">ID &amp; Priority</th>
                <th className="p-4">Client Name &amp; Contact</th>
                <th className="p-4">Service / Request Title</th>
                <th className="p-4">Location</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] font-medium">
              {requests.slice(0, 5).map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-mono font-bold text-[#1A1D20]">{req.id}</div>
                    <span
                      className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded-md mt-1 ${
                        req.priority === "urgent"
                          ? "bg-red-100 text-red-800"
                          : req.priority === "high"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {req.priority}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-[#1A1D20]">{req.name}</div>
                    <div className="text-gray-500 font-mono text-[11px]">{req.phone}</div>
                    {req.organization && (
                      <div className="text-[11px] text-[#006F51] font-semibold">{req.organization}</div>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-gray-900 line-clamp-1">{req.title}</div>
                    <div className="text-gray-500 text-[11px] line-clamp-1 mt-0.5">
                      {req.message || req.volumeOrTier || "Standard request"}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-gray-800">{req.suburb || "Kampala"}</div>
                    <div className="text-gray-500 text-[10px] line-clamp-1">{req.address || "Area Route"}</div>
                    {typeof req.latitude === "number" && typeof req.longitude === "number" && (
                      <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-[#006F51] font-bold bg-[#E9F4F0] px-1.5 py-0.2 rounded border border-[#006F51]/20">
                        <MapPin className="w-2.5 h-2.5" />
                        <span>GPS Tagged</span>
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    <select
                      value={req.status}
                      onChange={(e) => updateRequestStatus(req.id, e.target.value as RequestStatus)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-bold cursor-pointer focus:outline-none ${statusBadge(
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

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`https://wa.me/${req.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hello ${req.name}, this is Nature Waste Management Ltd regarding your inquiry #${req.id} (${req.title}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-md transition-colors shadow-2xs"
                        title="Open WhatsApp Chat"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`tel:${req.phone.replace(/\s+/g, "")}`}
                        className="p-1.5 bg-[#006F51] hover:bg-[#004D38] text-white rounded-md transition-colors shadow-2xs"
                        title="Call Client"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Website Content Management Hub Shortcuts */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#1A1D20]">
              Operations &amp; Content Management Hub
            </h3>
            <p className="text-xs text-gray-500">
              Quick shortcuts to edit clients, routes, pricing, schedules, and live website content.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Card 0: Registered Clients & Users Database */}
          <Link
            href="/admin/users"
            className="bg-white p-5 rounded-xl border border-[#E5E7EB] hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {users.length} Users
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#1A1D20] group-hover:text-blue-700 transition-colors">
                Clients &amp; System Users
              </h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                Manage registered household &amp; commercial clients, assign EcoRewards, and manage staff accounts.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>Manage Database</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 1: Announcement Banner */}
          <Link
            href="/admin/announcement"
            className="bg-white p-5 rounded-xl border border-[#E5E7EB] hover:border-[#006F51] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#E9F4F0] text-[#006F51] flex items-center justify-center group-hover:bg-[#006F51] group-hover:text-white transition-colors">
                  <Bell className="w-4 h-4" />
                </div>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    announcement.enabled ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {announcement.enabled ? "Active on Site" : "Hidden"}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#1A1D20] group-hover:text-[#006F51] transition-colors">
                Announcement Banner
              </h4>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {announcement.message}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#006F51]">
              <span>Edit Notice</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 2: Coverage Areas & Schedules */}
          <Link
            href="/admin/coverage"
            className="bg-white p-5 rounded-xl border border-[#E5E7EB] hover:border-[#006F51] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#E9F4F0] text-[#006F51] flex items-center justify-center group-hover:bg-[#006F51] group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-800">
                  {coverageAreas.length} Zones
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#1A1D20] group-hover:text-[#006F51] transition-colors">
                Pickup Days &amp; Suburbs
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Edit collection days, supervisor hotlines, and recycling schedules for Kitende, Lubowa, Entebbe, etc.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#006F51]">
              <span>Manage Suburbs</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 3: Pricing Plans */}
          <Link
            href="/admin/pricing"
            className="bg-white p-5 rounded-xl border border-[#E5E7EB] hover:border-[#006F51] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#E9F4F0] text-[#006F51] flex items-center justify-center group-hover:bg-[#006F51] group-hover:text-white transition-colors">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-800">
                  {pricingList.length} Plans
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#1A1D20] group-hover:text-[#006F51] transition-colors">
                Pricing &amp; Rates
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Configure Residential, Commercial, and Enterprise pricing, features lists, and promotional badges.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#006F51]">
              <span>Update Rates</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 4: Circular Blog */}
          <Link
            href="/admin/blog"
            className="bg-white p-5 rounded-xl border border-[#E5E7EB] hover:border-[#006F51] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#E9F4F0] text-[#006F51] flex items-center justify-center group-hover:bg-[#006F51] group-hover:text-white transition-colors">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
                  {articles.length} Published
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#1A1D20] group-hover:text-[#006F51] transition-colors">
                Circular Blog &amp; Articles
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Publish news updates on GoGreenug youth initiatives, Lake Victoria plastics, and NEMA updates.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#006F51]">
              <span>Publish Article</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 5: Testimonials */}
          <Link
            href="/admin/testimonials"
            className="bg-white p-5 rounded-xl border border-[#E5E7EB] hover:border-[#006F51] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#E9F4F0] text-[#006F51] flex items-center justify-center group-hover:bg-[#006F51] group-hover:text-white transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-50 text-purple-800">
                  5.0 ★ Rated
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#1A1D20] group-hover:text-[#006F51] transition-colors">
                Customer Reviews
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Manage verified testimonials from residential estate chairs, hotel managers, and municipal leads.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#006F51]">
              <span>Manage Reviews</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 6: Company & Hotlines */}
          <Link
            href="/admin/settings"
            className="bg-white p-5 rounded-xl border border-[#E5E7EB] hover:border-[#006F51] hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#E9F4F0] text-[#006F51] flex items-center justify-center group-hover:bg-[#006F51] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-gray-100 text-gray-800">
                  Kitende HQ
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#1A1D20] group-hover:text-[#006F51] transition-colors">
                Company Hotlines &amp; NEMA
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Update phone numbers, WhatsApp line, office opening hours, and official statutory license details.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#006F51]">
              <span>Edit Settings</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
