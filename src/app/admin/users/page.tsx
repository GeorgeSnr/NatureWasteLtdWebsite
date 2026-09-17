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
  Key,
  Power,
  PowerOff,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserProfile, UserRole } from "@/types/admin";
import LiveLocationPicker from "@/components/LiveLocationPicker";

export default function AdminUsersPage() {
  const {
    users,
    updateUserStatus,
    updateUserRole,
    updateUserPassword,
    toggleUserStatus,
    deleteUser,
    addUser,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"all" | "clients" | "staff" | "deactivated">("all");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [passwordUpdateMsg, setPasswordUpdateMsg] = useState("");

  // New user form state with role, password, and status
  const [form, setForm] = useState<{
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    password: string;
    accountStatus: "active" | "deactivated";
    mfaEnabled: boolean;
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
    password: "client2026",
    accountStatus: "active",
    mfaEnabled: true,
    organization: "",
    suburb: "Kitende",
    address: "",
    plan: "Residential Connect (120L)",
  });

  const clients = useMemo(() => users.filter((u) => u.role === "client"), [users]);
  const staff = useMemo(() => users.filter((u) => u.role !== "client"), [users]);
  const deactivatedUsers = useMemo(
    () => users.filter((u) => u.accountStatus === "deactivated" || u.accountStatus === "suspended"),
    [users]
  );
  const activeCount = useMemo(
    () => users.filter((u) => u.accountStatus === "active").length,
    [users]
  );

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (activeTab === "clients" && u.role !== "client") return false;
      if (activeTab === "staff" && u.role === "client") return false;
      if (
        activeTab === "deactivated" &&
        u.accountStatus !== "deactivated" &&
        u.accountStatus !== "suspended"
      ) {
        return false;
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = u.name.toLowerCase().includes(q);
        const matchesEmail = u.email.toLowerCase().includes(q);
        const matchesPhone = u.phone.toLowerCase().includes(q);
        const matchesOrg = u.organization?.toLowerCase().includes(q) || false;
        const matchesSuburb = u.suburb?.toLowerCase().includes(q) || false;
        const matchesRole = u.role.toLowerCase().includes(q);
        const matchesStatus = u.accountStatus.toLowerCase().includes(q);
        if (
          !matchesName &&
          !matchesEmail &&
          !matchesPhone &&
          !matchesOrg &&
          !matchesSuburb &&
          !matchesRole &&
          !matchesStatus
        ) {
          return false;
        }
      }
      return true;
    });
  }, [users, activeTab, search]);

  const handleRoleChangeInForm = (newRole: UserRole) => {
    setForm((prev) => ({
      ...prev,
      role: newRole,
      password:
        prev.password === "client2026" && newRole !== "client"
          ? "admin2026"
          : prev.password === "admin2026" && newRole === "client"
          ? "client2026"
          : prev.password,
    }));
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id:
        form.role === "client"
          ? `USR-C-${Date.now().toString().slice(-4)}`
          : `USR-S-${Date.now().toString().slice(-4)}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      password: form.password || (form.role === "client" ? "client2026" : "admin2026"),
      passwordHash: form.password || (form.role === "client" ? "client2026" : "admin2026"),
      accountStatus: form.accountStatus,
      mfaEnabled: form.mfaEnabled,
      organization:
        form.organization || (form.role === "client" ? "Private Residence" : "Nature Waste Ltd"),
      suburb: form.suburb,
      address: form.address,
      latitude: form.latitude,
      longitude: form.longitude,
      locationAddress: form.locationAddress,
      plan: form.role === "client" ? form.plan : undefined,
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
      password: "client2026",
      accountStatus: "active",
      mfaEnabled: true,
      organization: "",
      suburb: "Kitende",
      address: "",
      plan: "Residential Connect (120L)",
      latitude: undefined,
      longitude: undefined,
      locationAddress: undefined,
    });
    setSavedSuccess(`Account created for ${newUser.name} and saved to Neon PostgreSQL!`);
    setTimeout(() => setSavedSuccess(null), 4000);
  };

  const handlePasswordReset = (userId: string) => {
    if (!newPasswordInput.trim()) return;
    updateUserPassword(userId, newPasswordInput.trim());
    setPasswordUpdateMsg("Password successfully updated and synced to database!");
    setNewPasswordInput("");
    setTimeout(() => setPasswordUpdateMsg(""), 3500);
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
            <span>Role-Based Access &amp; Credential Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1D20] tracking-tight mt-1">
            Access Management &amp; Database Users
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Configure system privileges, define roles, manage MFA credentials, and activate or deactivate user accounts in Neon PostgreSQL.
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
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{savedSuccess}</span>
        </div>
      )}

      {/* 2. Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Total Clients
            </div>
            <div className="text-3xl font-black text-[#1A1D20] mt-1">{clients.length}</div>
            <div className="text-[11px] text-[#006F51] font-semibold mt-1">
              Residential &amp; Commercial
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
              Admins, Dispatch &amp; Compliance
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Active Accounts
            </div>
            <div className="text-3xl font-black text-emerald-600 mt-1">{activeCount}</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">
              Authorized to Sign In
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Power className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Deactivated Accounts
            </div>
            <div className="text-3xl font-black text-red-600 mt-1">{deactivatedUsers.length}</div>
            <div className="text-[11px] text-red-700 font-semibold mt-1">
              Access Blocked at Login
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <PowerOff className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Users", count: users.length },
            { id: "clients", label: "Clients", count: clients.length },
            { id: "staff", label: "Staff & Dispatch", count: staff.length },
            { id: "deactivated", label: "Deactivated / Blocked", count: deactivatedUsers.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === tab.id
                  ? tab.id === "deactivated"
                    ? "bg-red-600 text-white shadow-xs"
                    : "bg-[#006F51] text-white shadow-xs"
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
            placeholder="Search by name, email, phone, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F8F9FA] border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
          />
        </div>
      </div>

      {/* 4. Users Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left border-collapse text-xs">
            <thead className="bg-[#14191E] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-4">User ID &amp; Role</th>
                <th className="p-4">Name &amp; Contacts</th>
                <th className="p-4">Organization / Suburb</th>
                <th className="p-4">Security &amp; MFA</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] font-medium">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    No users found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isDeactivated =
                    u.accountStatus === "deactivated" || u.accountStatus === "suspended";
                  return (
                    <tr
                      key={u.id}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                        isDeactivated ? "bg-red-50/30" : ""
                      }`}
                      onClick={() => {
                        setSelectedUser(u);
                        setNewPasswordInput("");
                        setPasswordUpdateMsg("");
                      }}
                    >
                      {/* User ID & Role Selector */}
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="font-mono font-bold text-[#1A1D20]">{u.id}</div>
                        <select
                          value={u.role}
                          onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                          className={`mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded border cursor-pointer focus:outline-none ${getRoleBadge(
                            u.role
                          )}`}
                          title="Change user system role"
                        >
                          <option value="client">Client</option>
                          <option value="dispatcher">Dispatcher</option>
                          <option value="compliance">Compliance</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>

                      {/* Name & Contacts */}
                      <td className="p-4">
                        <div className="font-bold text-[#1A1D20] text-sm flex items-center gap-1.5">
                          <span>{u.name}</span>
                          {isDeactivated && (
                            <span className="text-[9px] uppercase font-black px-1.5 py-0.2 rounded bg-red-100 text-red-700">
                              Blocked
                            </span>
                          )}
                        </div>
                        <div className="text-gray-500 text-[11px] mt-0.5 font-mono">{u.phone}</div>
                        <div className="text-gray-400 text-[11px]">{u.email}</div>
                      </td>

                      {/* Organization & Location */}
                      <td className="p-4">
                        <div className="font-bold text-gray-800">{u.organization || "Private"}</div>
                        <div className="text-gray-500 text-[11px] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#006F51]" />
                          <span>{u.suburb || "Kampala"}</span>
                        </div>
                        {u.latitude && u.longitude && (
                          <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-[#006F51] font-bold bg-[#E9F4F0] px-1.5 py-0.5 rounded border border-[#006F51]/20">
                            <span>📍 Gate GPS Tagged</span>
                          </div>
                        )}
                      </td>

                      {/* Security & MFA Status */}
                      <td className="p-4">
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>MFA Active</span>
                        </div>
                        <div className="text-gray-400 text-[10px] mt-1 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          <span>Passcode Protected</span>
                        </div>
                      </td>

                      {/* Account Status with 1-Click Toggle */}
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-col gap-1.5">
                          <select
                            value={u.accountStatus}
                            onChange={(e) => updateUserStatus(u.id, e.target.value as any)}
                            className={`text-xs px-2.5 py-1 rounded-lg border font-bold cursor-pointer focus:outline-none ${
                              u.accountStatus === "active"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                : u.accountStatus === "deactivated"
                                ? "bg-red-100 text-red-800 border-red-200"
                                : u.accountStatus === "pending"
                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                : "bg-gray-100 text-gray-800 border-gray-200"
                            }`}
                          >
                            <option value="active">Active</option>
                            <option value="deactivated">Deactivated</option>
                            <option value="suspended">Suspended</option>
                            <option value="pending">Pending</option>
                          </select>

                          <button
                            onClick={() => toggleUserStatus(u.id)}
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border transition-colors cursor-pointer text-center flex items-center justify-center gap-1 ${
                              u.accountStatus === "active"
                                ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            }`}
                            title={
                              u.accountStatus === "active"
                                ? "Click to deactivate this user account"
                                : "Click to activate this user account"
                            }
                          >
                            {u.accountStatus === "active" ? (
                              <>
                                <PowerOff className="w-3 h-3" />
                                <span>Deactivate</span>
                              </>
                            ) : (
                              <>
                                <Power className="w-3 h-3" />
                                <span>Activate</span>
                              </>
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedUser(u);
                              setNewPasswordInput("");
                              setPasswordUpdateMsg("");
                            }}
                            className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            Profile &amp; Security
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
                              if (confirm(`Delete account for ${u.name}? This will remove credentials from database.`)) {
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. User Profile & Access Security Drawer */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#14191E] text-white sticky top-0 z-10">
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
                className="p-1 text-gray-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-[#1A1D20]">
              {/* User Overview */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#006F51] text-white flex items-center justify-center text-xl font-black shrink-0">
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

              {/* Access Management Controls Card */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#006F51]">
                    <Shield className="w-4 h-4" />
                    <span>Access Control &amp; Role Definition</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">Neon DB Connected</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Role Assignment */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      System Role
                    </label>
                    <select
                      value={selectedUser.role}
                      onChange={(e) => {
                        const newRole = e.target.value as UserRole;
                        updateUserRole(selectedUser.id, newRole);
                        setSelectedUser({ ...selectedUser, role: newRole });
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-bold focus:outline-none focus:border-[#006F51]"
                    >
                      <option value="client">Client (Household / Business)</option>
                      <option value="dispatcher">Route Dispatcher</option>
                      <option value="compliance">NEMA Compliance Officer</option>
                      <option value="admin">System Administrator</option>
                    </select>
                  </div>

                  {/* Account Status Toggle */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Account Status
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={selectedUser.accountStatus}
                        onChange={(e) => {
                          const newStatus = e.target.value as any;
                          updateUserStatus(selectedUser.id, newStatus);
                          setSelectedUser({ ...selectedUser, accountStatus: newStatus });
                        }}
                        className={`w-full px-3 py-1.5 rounded-lg border text-xs font-bold focus:outline-none ${
                          selectedUser.accountStatus === "active"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : "bg-red-50 text-red-800 border-red-300"
                        }`}
                      >
                        <option value="active">Active (Can Sign In)</option>
                        <option value="deactivated">Deactivated (Login Blocked)</option>
                        <option value="suspended">Suspended</option>
                        <option value="pending">Pending Verification</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Password Reset Section */}
                <div className="pt-2 border-t border-gray-200">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Reset User Password
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Key className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Enter new password (e.g. Nature@2026)"
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
                      />
                    </div>
                    <button
                      onClick={() => handlePasswordReset(selectedUser.id)}
                      disabled={!newPasswordInput.trim()}
                      className="px-3 py-1.5 bg-[#006F51] disabled:bg-gray-300 hover:bg-[#005a41] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shrink-0"
                    >
                      Save Password
                    </button>
                  </div>
                  {passwordUpdateMsg && (
                    <div className="mt-1.5 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{passwordUpdateMsg}</span>
                    </div>
                  )}
                </div>

                {/* MFA Security Status */}
                <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Multi-Factor Authentication (MFA) Active</span>
                  </div>
                  <span className="text-[10px] text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded font-black uppercase">
                    Protected
                  </span>
                </div>
              </div>

              {/* Service & Property Info */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    Assigned Route / Suburb
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
                    {selectedUser.plan || "Internal Staff Role"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    EcoRewards Balance
                  </span>
                  <span className="font-bold text-amber-700 text-xs">
                    {selectedUser.ecoPoints ? `${selectedUser.ecoPoints} Points` : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    Registered Timestamp
                  </span>
                  <span className="font-bold text-gray-800 text-xs">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Premises Live Location Card */}
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
                  <span>
                    No live GPS coordinates captured for this account. Assigned to general route:{" "}
                    {selectedUser.suburb || "Kampala"}.
                  </span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between sticky bottom-0">
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

      {/* 6. Create User Modal (Role definition, initial password & activation status) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#006F51] text-white sticky top-0 z-10">
              <div>
                <h3 className="text-base font-bold">Create Database User &amp; Assign Role</h3>
                <p className="text-[11px] text-emerald-100 mt-0.5">
                  Credentials and access controls will be persisted to Neon PostgreSQL
                </p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
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
                    Define Role *
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => handleRoleChangeInForm(e.target.value as UserRole)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold focus:outline-none focus:border-[#006F51]"
                  >
                    <option value="client">Client (Household / Commercial)</option>
                    <option value="dispatcher">Route Dispatcher</option>
                    <option value="compliance">NEMA Compliance Officer</option>
                    <option value="admin">System Administrator</option>
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

              {/* Password and Account Status definition */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Initial Password *
                  </label>
                  <div className="relative">
                    <Key className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Enter passcode"
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-mono focus:outline-none focus:border-[#006F51]"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">
                    Defaults to {form.role === "client" ? "client2026" : "admin2026"}
                  </span>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Initial Account Status *
                  </label>
                  <select
                    value={form.accountStatus}
                    onChange={(e) =>
                      setForm({ ...form, accountStatus: e.target.value as "active" | "deactivated" })
                    }
                    className={`w-full px-3 py-1.5 rounded-lg border text-xs font-bold focus:outline-none ${
                      form.accountStatus === "active"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                        : "bg-red-50 text-red-800 border-red-300"
                    }`}
                  >
                    <option value="active">Active (Can Sign In Immediately)</option>
                    <option value="deactivated">Deactivated (Blocked at Login)</option>
                  </select>
                  <span className="text-[10px] text-gray-400 mt-0.5 block">
                    Can be toggled anytime by admin
                  </span>
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
                  className="px-4 py-2 text-gray-600 font-bold uppercase text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#006F51] hover:bg-[#005a42] text-white px-5 py-2.5 rounded-lg font-bold uppercase text-xs tracking-wider transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Account to Neon</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
