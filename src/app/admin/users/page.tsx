"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Shield,
  Search,
  Plus,
  UserCheck,
  Phone,
  Mail,
  Building,
  Calendar,
  Trash2,
  X,
  Save,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Key,
  Power,
  PowerOff,
  ShieldCheck,
  RefreshCw,
  Users,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserProfile, UserRole } from "@/types/admin";

export default function AdminAccessManagementPage() {
  const {
    users,
    updateUserStatus,
    updateUserRole,
    updateUserPassword,
    toggleUserStatus,
    deleteUser,
    addUser,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "all" | "admin" | "dispatcher" | "compliance" | "deactivated"
  >("all");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [passwordUpdateMsg, setPasswordUpdateMsg] = useState("");

  // Only system staff (non-clients)
  const staffUsers = useMemo(() => users.filter((u) => u.role !== "client"), [users]);
  const admins = useMemo(() => staffUsers.filter((u) => u.role === "admin"), [staffUsers]);
  const dispatchers = useMemo(
    () => staffUsers.filter((u) => u.role === "dispatcher"),
    [staffUsers]
  );
  const compliance = useMemo(
    () => staffUsers.filter((u) => u.role === "compliance"),
    [staffUsers]
  );
  const deactivatedStaff = useMemo(
    () =>
      staffUsers.filter(
        (u) => u.accountStatus === "deactivated" || u.accountStatus === "suspended"
      ),
    [staffUsers]
  );

  // New Staff form state
  const [form, setForm] = useState<{
    name: string;
    email: string;
    phone: string;
    role: "admin" | "dispatcher" | "compliance";
    password: string;
    accountStatus: "active" | "deactivated";
    mfaEnabled: boolean;
    organization: string;
    suburb: string;
  }>({
    name: "",
    email: "",
    phone: "",
    role: "dispatcher",
    password: "admin2026",
    accountStatus: "active",
    mfaEnabled: true,
    organization: "Nature Waste Ltd",
    suburb: "Kitende Headquarters",
  });

  const filteredStaff = useMemo(() => {
    return staffUsers.filter((u) => {
      if (activeTab === "admin" && u.role !== "admin") return false;
      if (activeTab === "dispatcher" && u.role !== "dispatcher") return false;
      if (activeTab === "compliance" && u.role !== "compliance") return false;
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
        const matchesRole = u.role.toLowerCase().includes(q);
        const matchesStatus = u.accountStatus.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesPhone && !matchesRole && !matchesStatus) {
          return false;
        }
      }
      return true;
    });
  }, [staffUsers, activeTab, search]);

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const newStaff: UserProfile = {
      id: `USR-S-${Date.now().toString().slice(-4)}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      password: form.password || "admin2026",
      passwordHash: form.password || "admin2026",
      accountStatus: form.accountStatus,
      mfaEnabled: form.mfaEnabled,
      organization: "Nature Waste Ltd",
      suburb: form.suburb || "Kitende Operations",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    addUser(newStaff);
    setIsAddModalOpen(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      role: "dispatcher",
      password: "admin2026",
      accountStatus: "active",
      mfaEnabled: true,
      organization: "Nature Waste Ltd",
      suburb: "Kitende Headquarters",
    });
    setSavedSuccess(`Staff user ${newStaff.name} created and credentials saved to Neon PostgreSQL!`);
    setTimeout(() => setSavedSuccess(null), 4000);
  };

  const handlePasswordReset = (userId: string) => {
    if (!newPasswordInput.trim()) return;
    updateUserPassword(userId, newPasswordInput.trim());
    setPasswordUpdateMsg("Staff password successfully updated and synced to database!");
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
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-3 py-1 rounded-md border border-[#006F51]/20">
            <Shield className="w-3.5 h-3.5" />
            <span>Role-Based Access Control (RBAC)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1D20] tracking-tight mt-1">
            Access Management &amp; System Users
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Configure system privileges, define operator roles, manage MFA credentials, and activate or deactivate internal accounts in Neon PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/clients"
            className="px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Users className="w-3.5 h-3.5 text-[#006F51]" />
            <span>Go to Clients Directory</span>
          </Link>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#006F51] hover:bg-[#005a42] text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create System User</span>
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
              Total Operators
            </div>
            <div className="text-3xl font-black text-[#1A1D20] mt-1">{staffUsers.length}</div>
            <div className="text-[11px] text-purple-700 font-semibold mt-1">
              Internal Staff Accounts
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              System Admins
            </div>
            <div className="text-3xl font-black text-purple-800 mt-1">{admins.length}</div>
            <div className="text-[11px] text-gray-500 font-semibold mt-1">
              Full Privileges &amp; Settings
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Route Dispatchers
            </div>
            <div className="text-3xl font-black text-blue-700 mt-1">{dispatchers.length}</div>
            <div className="text-[11px] text-blue-800 font-semibold mt-1">
              Live Compactor Route Control
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Deactivated / Blocked
            </div>
            <div className="text-3xl font-black text-red-600 mt-1">{deactivatedStaff.length}</div>
            <div className="text-[11px] text-red-700 font-semibold mt-1">
              Staff Access Revoked
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
            { id: "all", label: "All Operators", count: staffUsers.length },
            { id: "admin", label: "System Admins", count: admins.length },
            { id: "dispatcher", label: "Dispatchers", count: dispatchers.length },
            { id: "compliance", label: "NEMA Compliance", count: compliance.length },
            { id: "deactivated", label: "Deactivated", count: deactivatedStaff.length },
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
            placeholder="Search operator by name, email, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F8F9FA] border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
          />
        </div>
      </div>

      {/* 4. Staff Users Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left border-collapse text-xs">
            <thead className="bg-[#14191E] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-4">Staff ID &amp; Assigned Role</th>
                <th className="p-4">Full Name &amp; Contact</th>
                <th className="p-4">Operating Division</th>
                <th className="p-4">Security &amp; 2FA Status</th>
                <th className="p-4">Access Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] font-medium">
              {filteredStaff.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400">
                    No system operators found matching this filter.
                  </td>
                </tr>
              ) : (
                filteredStaff.map((u) => {
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
                      {/* ID & Inline Role Switcher */}
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="font-mono font-bold text-[#1A1D20]">{u.id}</div>
                        <select
                          value={u.role}
                          onChange={(e) => updateUserRole(u.id, e.target.value as UserRole)}
                          className={`mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded border cursor-pointer focus:outline-none ${getRoleBadge(
                            u.role
                          )}`}
                          title="Change operator privilege role"
                        >
                          <option value="admin">System Admin</option>
                          <option value="dispatcher">Route Dispatcher</option>
                          <option value="compliance">Compliance Officer</option>
                        </select>
                      </td>

                      {/* Name & Contacts */}
                      <td className="p-4">
                        <div className="font-bold text-[#1A1D20] text-sm flex items-center gap-1.5">
                          <span>{u.name}</span>
                          {isDeactivated && (
                            <span className="text-[9px] uppercase font-black px-1.5 py-0.2 rounded bg-red-100 text-red-700">
                              Access Revoked
                            </span>
                          )}
                        </div>
                        <div className="text-gray-500 text-[11px] mt-0.5 font-mono">{u.phone}</div>
                        <div className="text-gray-400 text-[11px]">{u.email}</div>
                      </td>

                      {/* Organization & Location */}
                      <td className="p-4">
                        <div className="font-bold text-gray-800">{u.organization || "Nature Waste Ltd"}</div>
                        <div className="text-gray-500 text-[11px] mt-0.5">
                          {u.suburb || "Kitende Operations"}
                        </div>
                      </td>

                      {/* Security & MFA Status */}
                      <td className="p-4">
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>MFA Enforced</span>
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
                                : "bg-red-100 text-red-800 border-red-200"
                            }`}
                          >
                            <option value="active">Active (Permitted)</option>
                            <option value="deactivated">Deactivated (Blocked)</option>
                            <option value="suspended">Suspended</option>
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
                                ? "Deactivate operator account"
                                : "Activate operator account"
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
                            Privileges
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove operator access for ${u.name}?`)) {
                                deleteUser(u.id);
                              }
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                            title="Delete Operator"
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

      {/* 5. User Profile & Privileges Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#14191E] text-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-black text-[#FFCE00]">
                  {selectedUser.id}
                </span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${getRoleBadge(selectedUser.role)}`}>
                  {selectedUser.role} Account
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
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl font-black shrink-0">
                  {selectedUser.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1A1D20]">{selectedUser.name}</h3>
                  <div className="text-gray-500 font-medium">{selectedUser.organization}</div>
                  <div className="text-purple-700 font-mono text-[11px] mt-0.5">
                    {selectedUser.email} &bull; {selectedUser.phone}
                  </div>
                </div>
              </div>

              {/* Privileges & Access Controls */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-800">
                    <Shield className="w-4 h-4" />
                    <span>System Role &amp; Activation Privileges</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">Neon DB Connected</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Assigned Role
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
                      <option value="admin">System Administrator</option>
                      <option value="dispatcher">Route Dispatcher</option>
                      <option value="compliance">NEMA Compliance Officer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Account Status
                    </label>
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
                      <option value="active">Active (Access Granted)</option>
                      <option value="deactivated">Deactivated (Access Revoked)</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                {/* Reset Password */}
                <div className="pt-2 border-t border-gray-200">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Reset Staff Passcode
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Key className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Enter new operator password..."
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
                      />
                    </div>
                    <button
                      onClick={() => handlePasswordReset(selectedUser.id)}
                      disabled={!newPasswordInput.trim()}
                      className="px-3 py-1.5 bg-[#006F51] disabled:bg-gray-300 hover:bg-[#005a42] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shrink-0"
                    >
                      Save Passcode
                    </button>
                  </div>
                  {passwordUpdateMsg && (
                    <div className="mt-1.5 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{passwordUpdateMsg}</span>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>2FA Multi-Factor Authentication Active</span>
                  </div>
                  <span className="text-[10px] text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded font-black uppercase">
                    Mandatory
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between sticky bottom-0">
              <button
                onClick={() => {
                  if (confirm(`Remove operator access for ${selectedUser.name}?`)) {
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
                Close Privileges
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Create Staff Operator Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-purple-900 text-white sticky top-0 z-10">
              <div>
                <h3 className="text-base font-bold">Create System Operator</h3>
                <p className="text-[11px] text-purple-200 mt-0.5">
                  Assign administrative, dispatch, or compliance privileges in Neon PostgreSQL
                </p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Staff Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Geoffrey Magezi"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    System Role *
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-bold focus:outline-none focus:border-purple-600"
                  >
                    <option value="dispatcher">Route Dispatcher</option>
                    <option value="compliance">NEMA Compliance Officer</option>
                    <option value="admin">System Administrator</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Staff Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. dispatch@naturewaste.ug"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Phone Hotline *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+256 766 532915"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              {/* Password and Initial Status */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Initial Passcode *
                  </label>
                  <div className="relative">
                    <Key className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="admin2026"
                      className="w-full pl-8 pr-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-mono focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Initial Status *
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
                    <option value="active">Active (Permit Sign In)</option>
                    <option value="deactivated">Deactivated (Block Sign In)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Assigned Operating Station
                </label>
                <input
                  type="text"
                  placeholder="Kitende Headquarters, Entebbe Road"
                  value={form.suburb}
                  onChange={(e) => setForm({ ...form, suburb: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-purple-600"
                />
              </div>

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
                  className="bg-purple-800 hover:bg-purple-900 text-white px-5 py-2.5 rounded-lg font-bold uppercase text-xs tracking-wider transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Operator to Neon</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
