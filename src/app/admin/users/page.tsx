"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Plus,
  UserCheck,
  Shield,
  Phone,
  Mail,
  Building,
  MapPin,
  Calendar,
  Trash2,
  Edit2,
  X,
  Save,
  CheckCircle2,
  AlertTriangle,
  Award,
  MessageSquare,
  Lock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserProfile, UserRole } from "@/types/admin";
import LiveLocationPicker from "@/components/LiveLocationPicker";

export default function AdminUsersPage() {
  const { users, updateUserStatus, deleteUser, addUser } = useAuth();

  const [activeTab, setActiveTab] = useState<"all" | "clients" | "staff">("all");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New user form state
  const [form, setForm] = useState<{
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    organization: string;
    suburb: string;
    address: string;
    plan: string;
    latitude?: number;
    longitude?: number;
    locationAddress?: string;
  }>({
    name: "",
    email: "",
    phone: "",
    role: "client",
    organization: "",
    suburb: "Kitende",
    address: "",
    plan: "Residential Connect",
  });

  const clients = useMemo(() => users.filter((u) => u.role === "client"), [users]);
  const staff = useMemo(() => users.filter((u) => u.role !== "client"), [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (activeTab === "clients" && u.role !== "client") return false;
      if (activeTab === "staff" && u.role === "client") return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = u.name.toLowerCase().includes(q);
        const matchesEmail = u.email.toLowerCase().includes(q);
        const matchesPhone = u.phone.toLowerCase().includes(q);
        const matchesOrg = u.organization?.toLowerCase().includes(q) || false;
        const matchesSuburb = u.suburb?.toLowerCase().includes(q) || false;
        if (!matchesName && !matchesEmail && !matchesPhone && !matchesOrg && !matchesSuburb) {
          return false;
        }
      }
      return true;
    });
  }, [users, activeTab, search]);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: form.role === "client" ? `USR-C-${Date.now().toString().slice(-4)}` : `USR-S-${Date.now().toString().slice(-4)}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      organization: form.organization || (form.role === "client" ? "Private Residence" : "Nature Waste Ltd"),
      suburb: form.suburb,
      address: form.address,
      latitude: form.latitude,
      longitude: form.longitude,
      locationAddress: form.locationAddress,
      plan: form.role === "client" ? form.plan : undefined,
      accountStatus: "active",
      ecoPoints: form.role === "client" ? 150 : undefined,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    addUser(newUser);
    setIsAddModalOpen(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      role: "client",
      organization: "",
      suburb: "Kitende",
      address: "",
      plan: "Residential Connect",
      latitude: undefined,
      longitude: undefined,
      locationAddress: undefined,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "dispatcher":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "compliance":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-3 py-1 rounded-md border border-[#006F51]/20">
            <Users className="w-3.5 h-3.5" />
            <span>Centralized Database Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1D20] tracking-tight mt-1">
            Registered Clients &amp; System Users
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage authenticated residential and commercial customers, system operators, and route dispatch staff.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#006F51] hover:bg-[#005a42] text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New User</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>User account created and saved to the database successfully!</span>
        </div>
      )}

      {/* 2. Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Total Clients
            </div>
            <div className="text-3xl font-black text-[#1A1D20] mt-1">{clients.length}</div>
            <div className="text-[11px] text-[#006F51] font-semibold mt-1">
              Active Household &amp; Commercial Accounts
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#E9F4F0] text-[#006F51] flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              System Operators
            </div>
            <div className="text-3xl font-black text-[#1A1D20] mt-1">{staff.length}</div>
            <div className="text-[11px] text-purple-700 font-semibold mt-1">
              Dispatchers &amp; NEMA Compliance Leads
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              EcoRewards Points Issued
            </div>
            <div className="text-3xl font-black text-[#1A1D20] mt-1">
              {clients.reduce((acc, c) => acc + (c.ecoPoints || 0), 0).toLocaleString()}
            </div>
            <div className="text-[11px] text-[#FFCE00] font-bold mt-1">
              Redeemable for Airtime &amp; Bills
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: "all", label: "All Users", count: users.length },
            { id: "clients", label: "Clients", count: clients.length },
            { id: "staff", label: "Staff & Dispatch", count: staff.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-[#006F51] text-white shadow-xs"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F8F9FA] border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
          />
        </div>
      </div>

      {/* 4. Users Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left border-collapse text-xs">
            <thead className="bg-[#14191E] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-4">User ID &amp; Role</th>
                <th className="p-4">Name &amp; Contacts</th>
                <th className="p-4">Organization / Estate</th>
                <th className="p-4">Plan / Privileges</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] font-medium">
              {filteredUsers.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedUser(u)}
                >
                  <td className="p-4">
                    <div className="font-mono font-bold text-[#1A1D20]">{u.id}</div>
                    <span
                      className={`inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded border mt-1 ${getRoleBadge(
                        u.role
                      )}`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-[#1A1D20] text-sm">{u.name}</div>
                    <div className="text-gray-500 text-[11px] mt-0.5 font-mono">{u.phone}</div>
                    <div className="text-gray-400 text-[11px]">{u.email}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-gray-800">{u.organization || "Private"}</div>
                    <div className="text-gray-500 text-[11px] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#006F51]" />
                      <span>{u.suburb || "Kampala"}</span>
                    </div>
                    {u.latitude && u.longitude && (
                      <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-[#006F51] font-bold bg-[#E9F4F0] px-1.5 py-0.5 rounded border border-[#006F51]/20">
                        <span>📍 GPS Tagged</span>
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    {u.role === "client" ? (
                      <div>
                        <div className="font-semibold text-[#006F51]">{u.plan || "Residential"}</div>
                        <div className="text-gray-500 text-[10px] mt-0.5">
                          EcoRewards: <strong className="text-[#1A1D20]">{u.ecoPoints || 0} pts</strong>
                        </div>
                      </div>
                    ) : (
                      <div className="text-purple-800 font-bold uppercase text-[10px]">
                        Internal Staff Access
                      </div>
                    )}
                  </td>

                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={u.accountStatus}
                      onChange={(e) => updateUserStatus(u.id, e.target.value as any)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-bold cursor-pointer focus:outline-none ${
                        u.accountStatus === "active"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : u.accountStatus === "pending"
                          ? "bg-amber-100 text-amber-800 border-amber-200"
                          : "bg-red-100 text-red-800 border-red-200"
                      }`}
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </td>

                  <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        Profile
                      </button>
                      <a
                        href={`https://wa.me/${u.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded transition-colors"
                        title="WhatsApp User"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`tel:${u.phone.replace(/\s+/g, "")}`}
                        className="p-1.5 bg-[#006F51] hover:bg-[#004D38] text-white rounded transition-colors"
                        title="Call User"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => {
                          if (confirm(`Delete account for ${u.name}?`)) {
                            deleteUser(u.id);
                          }
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                        title="Delete User"
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
      </div>

      {/* 5. User Profile Drawer */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#14191E] text-white">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-black text-[#FFCE00]">
                  {selectedUser.id}
                </span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${getRoleBadge(selectedUser.role)}`}>
                  {selectedUser.role}
                </span>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1 text-gray-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-[#1A1D20]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#006F51] text-white flex items-center justify-center text-xl font-black">
                  {selectedUser.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1A1D20]">{selectedUser.name}</h3>
                  <div className="text-gray-500 font-medium">{selectedUser.organization}</div>
                  <div className="text-[#006F51] font-mono text-[11px] mt-0.5">
                    {selectedUser.email} &bull; {selectedUser.phone}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    Account Status
                  </span>
                  <span className="font-bold text-[#006F51] capitalize text-xs">
                    {selectedUser.accountStatus}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    Assigned Suburb
                  </span>
                  <span className="font-bold text-gray-800 text-xs">
                    {selectedUser.suburb || "Kampala Corridor"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    Plan Tier
                  </span>
                  <span className="font-bold text-gray-800 text-xs">
                    {selectedUser.plan || "Internal Staff"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    EcoRewards
                  </span>
                  <span className="font-bold text-amber-700 text-xs">
                    {selectedUser.ecoPoints ? `${selectedUser.ecoPoints} Points` : "N/A"}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-[#E9F4F0] rounded-lg border border-[#006F51]/20 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#006F51] font-bold">
                  <UserCheck className="w-4 h-4" />
                  <span>Account Verified</span>
                </div>
                <span className="text-[11px] text-gray-500">
                  Registered {new Date(selectedUser.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Client Gate / Premises Live Location Card */}
              {selectedUser.latitude && selectedUser.longitude ? (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006F51]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Premises Gate GPS Pin</span>
                    </div>
                    <a
                      href={`https://www.google.com/maps?q=${selectedUser.latitude},${selectedUser.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-[#006F51] hover:underline flex items-center gap-1"
                    >
                      <span>Open in Maps &rarr;</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-gray-800">
                      {selectedUser.latitude.toFixed(6)}, {selectedUser.longitude.toFixed(6)}
                    </span>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedUser.latitude},${selectedUser.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100"
                    >
                      Route Compactor
                    </a>
                  </div>
                  {selectedUser.locationAddress && (
                    <div className="text-[11px] text-gray-600">
                      Corridor: {selectedUser.locationAddress}
                    </div>
                  )}
                  <div className="rounded overflow-hidden border border-gray-300 h-40 mt-2 bg-gray-100">
                    <iframe
                      width="100%"
                      height="100%"
                      loading="lazy"
                      title="User Gate GPS Location"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedUser.longitude - 0.008}%2C${selectedUser.latitude - 0.008}%2C${selectedUser.longitude + 0.008}%2C${selectedUser.latitude + 0.008}&layer=mapnik&marker=${selectedUser.latitude}%2C${selectedUser.longitude}`}
                      className="border-0 w-full h-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-500 text-[11px] flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>No live GPS coordinates captured for this account. Assigned to general route: {selectedUser.suburb || "Kampala"}.</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => {
                  if (confirm(`Delete account for ${selectedUser.name}?`)) {
                    deleteUser(selectedUser.id);
                    setSelectedUser(null);
                  }
                }}
                className="text-red-600 hover:text-red-800 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Delete Account
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                className="bg-[#1A1D20] text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Create User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#006F51] text-white">
              <h3 className="text-base font-bold">Create Client or Staff Account</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ronald Mugisha"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Role Category *
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold focus:outline-none focus:border-[#006F51]"
                  >
                    <option value="client">Client (Household / Commercial)</option>
                    <option value="admin">System Admin</option>
                    <option value="dispatcher">Route Dispatcher</option>
                    <option value="compliance">NEMA Compliance Officer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ronald@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Phone / Mobile Money *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+256 700 000 000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Organization / Property
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pearl Apartments"
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Suburb / Neighborhood
                  </label>
                  <select
                    value={form.suburb}
                    onChange={(e) => setForm({ ...form, suburb: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
                  >
                    <option value="Kitende">Kitende</option>
                    <option value="Lubowa">Lubowa</option>
                    <option value="Kajjansi">Kajjansi</option>
                    <option value="Entebbe">Entebbe</option>
                    <option value="Kololo">Kololo</option>
                    <option value="Bugolobi">Bugolobi</option>
                    <option value="Namanve">Namanve</option>
                    <option value="Makindye">Makindye</option>
                    <option value="Kira">Kira</option>
                  </select>
                </div>
              </div>

              {form.role === "client" && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Assigned Plan Tier
                  </label>
                  <select
                    value={form.plan}
                    onChange={(e) => setForm({ ...form, plan: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#006F51]"
                  >
                    <option value="Residential Connect (120L)">Residential Connect (120L Wheelie Bin)</option>
                    <option value="Residential Connect (240L)">Residential Connect (240L Wheelie Bin)</option>
                    <option value="Commercial Business (660L Skip)">Commercial Business (660L Skip)</option>
                    <option value="Commercial Business (1100L Skip)">Commercial Business (1100L Skip)</option>
                    <option value="Municipal & Industrial Enterprise">Municipal &amp; Industrial Enterprise</option>
                  </select>
                </div>
              )}

              {/* Pin Live Gate / Premises Location */}
              <LiveLocationPicker
                label="Pin Premises Gate GPS Location (Optional)"
                onLocationChange={(loc) => {
                  setForm((prev) => ({
                    ...prev,
                    latitude: loc ? loc.latitude : undefined,
                    longitude: loc ? loc.longitude : undefined,
                    locationAddress: loc ? loc.address : undefined,
                  }));
                }}
              />

              <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-gray-600 font-bold uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#006F51] hover:bg-[#005a42] text-white px-5 py-2.5 rounded-lg font-bold uppercase text-xs tracking-wider transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
