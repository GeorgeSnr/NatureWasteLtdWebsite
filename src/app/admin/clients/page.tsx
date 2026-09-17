"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Plus,
  UserCheck,
  Phone,
  Mail,
  Building,
  MapPin,
  Calendar,
  Trash2,
  X,
  Save,
  CheckCircle2,
  Award,
  MessageSquare,
  Truck,
  Trash,
  Home,
  Briefcase,
  Layers,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { UserProfile } from "@/types/admin";
import LiveLocationPicker from "@/components/LiveLocationPicker";

export default function AdminClientsPage() {
  const { users, updateUserStatus, deleteUser, addUser } = useAuth();

  const [activeFilter, setActiveFilter] = useState<
    "all" | "residential" | "commercial" | "gps"
  >("all");
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState<UserProfile | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  // Form for onboarding new client
  const [form, setForm] = useState<{
    name: string;
    email: string;
    phone: string;
    organization: string;
    suburb: string;
    address: string;
    plan: string;
    password: string;
    latitude?: number;
    longitude?: number;
    locationAddress?: string;
  }>({
    name: "",
    email: "",
    phone: "",
    organization: "",
    suburb: "Kitende",
    address: "",
    plan: "Residential Connect (120L Wheelie Bin)",
    password: "client2026",
  });

  // Strictly filter client accounts
  const allClients = useMemo(() => users.filter((u) => u.role === "client"), [users]);

  const residentialClients = useMemo(
    () =>
      allClients.filter(
        (c) =>
          !c.organization ||
          c.organization.toLowerCase().includes("residence") ||
          c.organization.toLowerCase().includes("private") ||
          c.plan?.toLowerCase().includes("residential")
      ),
    [allClients]
  );

  const commercialClients = useMemo(
    () =>
      allClients.filter(
        (c) =>
          c.organization &&
          !c.organization.toLowerCase().includes("residence") &&
          !c.organization.toLowerCase().includes("private")
      ),
    [allClients]
  );

  const gpsTaggedClients = useMemo(
    () => allClients.filter((c) => c.latitude && c.longitude),
    [allClients]
  );

  const filteredClients = useMemo(() => {
    return allClients.filter((c) => {
      if (activeFilter === "residential" && !residentialClients.includes(c)) return false;
      if (activeFilter === "commercial" && !commercialClients.includes(c)) return false;
      if (activeFilter === "gps" && (!c.latitude || !c.longitude)) return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesEmail = c.email.toLowerCase().includes(q);
        const matchesPhone = c.phone.toLowerCase().includes(q);
        const matchesOrg = c.organization?.toLowerCase().includes(q) || false;
        const matchesSuburb = c.suburb?.toLowerCase().includes(q) || false;
        const matchesPlan = c.plan?.toLowerCase().includes(q) || false;
        if (
          !matchesName &&
          !matchesEmail &&
          !matchesPhone &&
          !matchesOrg &&
          !matchesSuburb &&
          !matchesPlan
        ) {
          return false;
        }
      }
      return true;
    });
  }, [allClients, activeFilter, search, residentialClients, commercialClients]);

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: UserProfile = {
      id: `USR-C-${Date.now().toString().slice(-4)}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: "client",
      password: form.password || "client2026",
      passwordHash: form.password || "client2026",
      organization: form.organization || "Private Residence",
      suburb: form.suburb,
      address: form.address,
      latitude: form.latitude,
      longitude: form.longitude,
      locationAddress: form.locationAddress,
      plan: form.plan,
      accountStatus: "active",
      ecoPoints: 150,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    addUser(newClient);
    setIsAddModalOpen(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      organization: "",
      suburb: "Kitende",
      address: "",
      plan: "Residential Connect (120L Wheelie Bin)",
      password: "client2026",
      latitude: undefined,
      longitude: undefined,
      locationAddress: undefined,
    });
    setSavedSuccess(`Client ${newClient.name} registered and saved to Neon PostgreSQL!`);
    setTimeout(() => setSavedSuccess(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-3 py-1 rounded-md border border-[#006F51]/20">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Customer Roster &amp; Service Locations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A1D20] tracking-tight mt-1">
            Registered Clients Directory
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage residential households, commercial properties, container tiers, and collection route GPS coordinates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#006F51] hover:bg-[#005a42] text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Register New Client</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-2 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{savedSuccess}</span>
        </div>
      )}

      {/* 2. Client Metrics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Total Clients
            </div>
            <div className="text-3xl font-black text-[#1A1D20] mt-1">{allClients.length}</div>
            <div className="text-[11px] text-[#006F51] font-semibold mt-1">
              Active Customer Accounts
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#E9F4F0] text-[#006F51] flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Residential Homes
            </div>
            <div className="text-3xl font-black text-[#1A1D20] mt-1">
              {residentialClients.length}
            </div>
            <div className="text-[11px] text-blue-700 font-semibold mt-1">
              Wheelie Bin Curbside Pickup
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Home className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Commercial Clients
            </div>
            <div className="text-3xl font-black text-[#1A1D20] mt-1">
              {commercialClients.length}
            </div>
            <div className="text-[11px] text-purple-700 font-semibold mt-1">
              Hotels, Offices &amp; Factories
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              GPS Gate Pinned
            </div>
            <div className="text-3xl font-black text-amber-600 mt-1">
              {gpsTaggedClients.length}
            </div>
            <div className="text-[11px] text-amber-700 font-semibold mt-1">
              Compactor Route Nav Ready
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All Clients", count: allClients.length },
            { id: "residential", label: "Residential", count: residentialClients.length },
            { id: "commercial", label: "Commercial", count: commercialClients.length },
            { id: "gps", label: "GPS Pinned Gates", count: gpsTaggedClients.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
                activeFilter === tab.id
                  ? "bg-[#006F51] text-white shadow-xs"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                  activeFilter === tab.id ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
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
            placeholder="Search clients by name, phone, estate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F8F9FA] border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
          />
        </div>
      </div>

      {/* 4. Clients Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left border-collapse text-xs">
            <thead className="bg-[#14191E] text-white text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-4">Client ID</th>
                <th className="p-4">Customer Name &amp; Contacts</th>
                <th className="p-4">Property / Estate &amp; Suburb</th>
                <th className="p-4">Assigned Service Plan</th>
                <th className="p-4">EcoRewards</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] font-medium">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    No clients found matching the search criteria.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedClient(client)}
                  >
                    <td className="p-4 font-mono font-bold text-gray-900">
                      {client.id}
                      <div className="text-[10px] text-gray-400 font-sans font-normal mt-0.5">
                        Joined {new Date(client.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-[#1A1D20] text-sm">{client.name}</div>
                      <div className="text-gray-500 text-[11px] mt-0.5 font-mono">
                        {client.phone}
                      </div>
                      <div className="text-gray-400 text-[11px]">{client.email}</div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-gray-800">
                        {client.organization || "Private Residence"}
                      </div>
                      <div className="text-gray-500 text-[11px] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#006F51]" />
                        <span>{client.suburb || "Kampala Corridor"}</span>
                      </div>
                      {client.latitude && client.longitude ? (
                        <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-[#006F51] font-bold bg-[#E9F4F0] px-1.5 py-0.5 rounded border border-[#006F51]/20">
                          <span>📍 Gate GPS Pinned</span>
                        </div>
                      ) : (
                        <div className="mt-1 text-[10px] text-gray-400 italic">No GPS coordinates</div>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="font-semibold text-[#006F51]">
                        {client.plan || "Residential Connect (120L)"}
                      </div>
                      <div className="text-gray-400 text-[10px] mt-0.5">
                        Standard Waste &amp; Recycling
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-amber-700 text-xs">
                        {client.ecoPoints ? `${client.ecoPoints} Pts` : "0 Pts"}
                      </div>
                      <span className="text-[10px] text-gray-400">Available Credit</span>
                    </td>

                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                          client.accountStatus === "active"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            client.accountStatus === "active" ? "bg-emerald-600" : "bg-red-600"
                          }`}
                        />
                        <span>{client.accountStatus}</span>
                      </span>
                    </td>

                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedClient(client)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                        <a
                          href={`https://wa.me/${client.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded transition-colors"
                          title="WhatsApp Client"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`tel:${client.phone.replace(/\s+/g, "")}`}
                          className="p-1.5 bg-[#006F51] hover:bg-[#004D38] text-white rounded transition-colors"
                          title="Call Client"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => {
                            if (confirm(`Remove client record for ${client.name}?`)) {
                              deleteUser(client.id);
                            }
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                          title="Delete Client"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Client Profile Drawer / Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#14191E] text-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-black text-[#FFCE00]">
                  {selectedClient.id}
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-600 text-white">
                  Client Account
                </span>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-1 text-gray-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs text-[#1A1D20]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#006F51] text-white flex items-center justify-center text-xl font-black shrink-0">
                  {selectedClient.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1A1D20]">{selectedClient.name}</h3>
                  <div className="text-gray-500 font-medium">{selectedClient.organization}</div>
                  <div className="text-[#006F51] font-mono text-[11px] mt-0.5">
                    {selectedClient.email} &bull; {selectedClient.phone}
                  </div>
                </div>
              </div>

              {/* Service & Route Details */}
              <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    Subscribed Plan
                  </span>
                  <span className="font-bold text-[#006F51] text-xs">
                    {selectedClient.plan || "Residential Connect (120L)"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    Pickup Route / Suburb
                  </span>
                  <span className="font-bold text-gray-800 text-xs">
                    {selectedClient.suburb || "Kitende Corridor"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    EcoRewards Balance
                  </span>
                  <span className="font-bold text-amber-700 text-xs">
                    {selectedClient.ecoPoints ? `${selectedClient.ecoPoints} Points` : "0 Points"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                    Registered On
                  </span>
                  <span className="font-bold text-gray-800 text-xs">
                    {new Date(selectedClient.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Premises Gate Live GPS Location */}
              {selectedClient.latitude && selectedClient.longitude ? (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#006F51]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Premises Gate GPS Pin</span>
                    </div>
                    <a
                      href={`https://www.google.com/maps?q=${selectedClient.latitude},${selectedClient.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-[#006F51] hover:underline flex items-center gap-1"
                    >
                      <span>Open in Maps &rarr;</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-gray-800">
                      {selectedClient.latitude.toFixed(6)}, {selectedClient.longitude.toFixed(6)}
                    </span>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${selectedClient.latitude},${selectedClient.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100"
                    >
                      Route Compactor
                    </a>
                  </div>
                  {selectedClient.locationAddress && (
                    <div className="text-[11px] text-gray-600">
                      Corridor: {selectedClient.locationAddress}
                    </div>
                  )}
                  <div className="rounded overflow-hidden border border-gray-300 h-40 mt-2 bg-gray-100">
                    <iframe
                      width="100%"
                      height="100%"
                      loading="lazy"
                      title="User Gate GPS Location"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedClient.longitude - 0.008}%2C${selectedClient.latitude - 0.008}%2C${selectedClient.longitude + 0.008}%2C${selectedClient.latitude + 0.008}&layer=mapnik&marker=${selectedClient.latitude}%2C${selectedClient.longitude}`}
                      className="border-0 w-full h-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-500 text-[11px] flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>
                    No live GPS coordinates captured for this client. Assigned to general route:{" "}
                    {selectedClient.suburb || "Kampala"}.
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between sticky bottom-0">
              <button
                onClick={() => {
                  if (confirm(`Delete account for ${selectedClient.name}?`)) {
                    deleteUser(selectedClient.id);
                    setSelectedClient(null);
                  }
                }}
                className="text-red-600 hover:text-red-800 text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Delete Client
              </button>
              <button
                onClick={() => setSelectedClient(null)}
                className="bg-[#1A1D20] text-white px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Onboard New Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs">
          <div
            className="bg-white rounded-xl border border-[#E5E7EB] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-[#006F51] text-white sticky top-0 z-10">
              <div>
                <h3 className="text-base font-bold">Register Client Account</h3>
                <p className="text-[11px] text-emerald-100 mt-0.5">
                  Saved directly to Neon PostgreSQL Customer Directory
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Client Full Name *
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
                    Property / Compound Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pearl Court / Private Compound"
                    value={form.organization}
                    onChange={(e) => setForm({ ...form, organization: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-[#006F51]"
                  />
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
                    Assigned Suburb / Route
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

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Service Plan &amp; Container
                  </label>
                  <select
                    value={form.plan}
                    onChange={(e) => setForm({ ...form, plan: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#006F51]"
                  >
                    <option value="Residential Connect (120L Wheelie Bin)">
                      Residential Connect (120L Wheelie Bin)
                    </option>
                    <option value="Residential Connect (240L Wheelie Bin)">
                      Residential Connect (240L Wheelie Bin)
                    </option>
                    <option value="Commercial Business (660L Skip)">
                      Commercial Business (660L Skip)
                    </option>
                    <option value="Commercial Business (1100L Skip)">
                      Commercial Business (1100L Skip)
                    </option>
                    <option value="Industrial Roll-Off Skips (7m³ - 20m³)">
                      Industrial Roll-Off Skips (7m³ - 20m³)
                    </option>
                  </select>
                </div>
              </div>

              {/* Pin Live Gate / Premises Location */}
              <LiveLocationPicker
                label="Pin Client Compound / Gate GPS (Optional)"
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
                  <span>Register Client to Neon</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
