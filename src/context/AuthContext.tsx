"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole } from "@/types/admin";
import { initialUsers } from "@/data/initialUsers";

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isStaff: boolean;
  users: UserProfile[];
  verifyCredentials: (
    identifier: string,
    password?: string
  ) => {
    success: boolean;
    user?: UserProfile;
    message?: string;
    requiresMfa?: boolean;
    mfaCode?: string;
  };
  completeMfaLogin: (user: UserProfile) => void;
  login: (
    identifier: string,
    password?: string
  ) => { success: boolean; message?: string; user?: UserProfile };
  registerClient: (data: {
    name: string;
    email: string;
    phone: string;
    organization?: string;
    suburb?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    locationAddress?: string;
    plan?: string;
    password?: string;
  }) => { success: boolean; user: UserProfile };
  logout: () => void;
  updateUserStatus: (
    userId: string,
    status: "active" | "pending" | "suspended" | "deactivated"
  ) => void;
  updateUserRole: (userId: string, role: UserRole) => void;
  updateUserPassword: (userId: string, newPass: string) => void;
  updateUserMfa: (userId: string, enabled: boolean) => void;
  toggleUserStatus: (userId: string) => void;
  deleteUser: (userId: string) => void;
  addUser: (user: UserProfile) => void;
}

const STORAGE_KEYS = {
  CURRENT_USER: "nw_auth_current_user_v1",
  USERS_DB: "nw_auth_users_database_v1",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<UserProfile[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Initialize from local storage and fetch live from Neon PostgreSQL
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS_DB);
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        }

        const storedCurrent = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        if (storedCurrent) {
          setCurrentUser(JSON.parse(storedCurrent));
        }
      }
    } catch (e) {
      console.error("Failed to load auth storage:", e);
    }

    // Fetch live users from Neon PostgreSQL
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.users) && data.users.length > 0) {
          setUsers(data.users);
          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(data.users));
          }
        }
      })
      .catch((err) => console.warn("Could not fetch users from Neon API:", err));
  }, []);

  const saveUsers = (updated: UserProfile[]) => {
    setUsers(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(updated));
    }
  };

  const saveCurrentUser = (user: UserProfile | null) => {
    setCurrentUser(user);
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
        if (user.role === "admin" || user.role === "dispatcher" || user.role === "compliance") {
          sessionStorage.setItem("nw_admin_auth", "true");
        }
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        sessionStorage.removeItem("nw_admin_auth");
      }
    }
  };

  // Step 1: Verify Credentials against Database (with Deactivated checks & MFA generation)
  const verifyCredentials = (
    identifier: string,
    password?: string
  ): {
    success: boolean;
    user?: UserProfile;
    message?: string;
    requiresMfa?: boolean;
    mfaCode?: string;
  } => {
    const cleanId = identifier.trim().toLowerCase();
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === cleanId ||
        u.phone.replace(/[^0-9]/g, "") === cleanId.replace(/[^0-9]/g, "") ||
        u.name.toLowerCase() === cleanId
    );

    if (!user) {
      return {
        success: false,
        message: "No account found matching this email, phone, or username. Please check your credentials or register.",
      };
    }

    // Check account status: if deactivated or suspended, reject immediately
    if (user.accountStatus === "deactivated" || user.accountStatus === "suspended") {
      return {
        success: false,
        message: "This account has been deactivated by the system administrator. Please contact Nature Waste operations.",
      };
    }

    // Validate password if provided
    if (password && password.trim()) {
      const validPass = user.passwordHash || user.password;
      const cleanPass = password.trim();
      if (validPass && cleanPass !== validPass) {
        return {
          success: false,
          message: "Incorrect password entered. Please check your password and try again.",
        };
      }
    }

    // Generate a secure 6-digit MFA code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    return {
      success: true,
      user,
      requiresMfa: user.role !== "client" && (user.mfaEnabled ?? false),
      mfaCode: generatedOtp,
    };
  };

  // Step 2: Complete MFA Login & Update Database
  const completeMfaLogin = (user: UserProfile) => {
    const updatedUser = { ...user, lastLogin: new Date().toISOString() };
    saveCurrentUser(updatedUser);

    // Sync last login to Neon
    fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, lastLogin: updatedUser.lastLogin }),
    }).catch((err) => console.error("Error updating last login in Neon:", err));
  };

  // Legacy direct login fallback
  const login = (
    identifier: string,
    password?: string
  ): { success: boolean; message?: string; user?: UserProfile } => {
    const res = verifyCredentials(identifier, password);
    if (!res.success || !res.user) {
      return { success: false, message: res.message };
    }
    completeMfaLogin(res.user);
    return { success: true, user: res.user };
  };

  // Register new client
  const registerClient = (data: {
    name: string;
    email: string;
    phone: string;
    organization?: string;
    suburb?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    locationAddress?: string;
    plan?: string;
    password?: string;
  }): { success: boolean; user: UserProfile } => {
    const newUser: UserProfile = {
      id: `USR-C-${Date.now().toString().slice(-4)}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: "client",
      organization: data.organization || "Private Household",
      suburb: data.suburb || "Kitende",
      address: data.address || "",
      latitude: data.latitude,
      longitude: data.longitude,
      locationAddress: data.locationAddress,
      plan: data.plan || "Residential Connect",
      accountStatus: "active",
      password: data.password || "",
      passwordHash: data.password || "",
      mfaEnabled: false,
      ecoPoints: 150, // Welcome signup bonus
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    const updatedList = [newUser, ...users];
    saveUsers(updatedList);
    saveCurrentUser(newUser);

    // Persist to Neon PostgreSQL
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    }).catch((err) => console.error("Error saving user to Neon:", err));

    return { success: true, user: newUser };
  };

  // Logout
  const logout = () => {
    saveCurrentUser(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("nw_admin_auth");
    }
  };

  // Admin Access Management Actions: Update Status (Active / Deactivated / Suspended)
  const updateUserStatus = (
    userId: string,
    status: "active" | "pending" | "suspended" | "deactivated"
  ) => {
    const updated = users.map((u) => (u.id === userId ? { ...u, accountStatus: status } : u));
    saveUsers(updated);
    if (currentUser?.id === userId) {
      saveCurrentUser({ ...currentUser, accountStatus: status });
    }

    // Persist to Neon PostgreSQL
    fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, accountStatus: status }),
    }).catch((err) => console.error("Error updating user status in Neon:", err));
  };

  // Quick Toggle between Active and Deactivated
  const toggleUserStatus = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    const newStatus = user.accountStatus === "active" ? "deactivated" : "active";
    updateUserStatus(userId, newStatus);
  };

  // Update User Role (Client / Admin / Dispatcher / Compliance)
  const updateUserRole = (userId: string, role: UserRole) => {
    const updated = users.map((u) => (u.id === userId ? { ...u, role } : u));
    saveUsers(updated);
    if (currentUser?.id === userId) {
      saveCurrentUser({ ...currentUser, role });
    }

    // Persist to Neon PostgreSQL
    fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, role }),
    }).catch((err) => console.error("Error updating user role in Neon:", err));
  };

  // Update User Password
  const updateUserPassword = (userId: string, newPass: string) => {
    const updated = users.map((u) =>
      u.id === userId ? { ...u, password: newPass, passwordHash: newPass } : u
    );
    saveUsers(updated);

    fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, password: newPass }),
    }).catch((err) => console.error("Error updating password in Neon:", err));
  };

  // Update User MFA / OTP requirement
  const updateUserMfa = (userId: string, enabled: boolean) => {
    const updated = users.map((u) => (u.id === userId ? { ...u, mfaEnabled: enabled } : u));
    saveUsers(updated);
    if (currentUser?.id === userId) {
      saveCurrentUser({ ...currentUser, mfaEnabled: enabled });
    }

    fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId, mfaEnabled: enabled }),
    }).catch((err) => console.error("Error updating MFA in Neon:", err));
  };

  // Delete User
  const deleteUser = (userId: string) => {
    const updated = users.filter((u) => u.id !== userId);
    saveUsers(updated);
    if (currentUser?.id === userId) {
      logout();
    }

    fetch(`/api/users?id=${userId}`, {
      method: "DELETE",
    }).catch((err) => console.error("Error deleting user in Neon:", err));
  };

  // Add User from Admin Portal
  const addUser = (user: UserProfile) => {
    const updated = [user, ...users];
    saveUsers(updated);

    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).catch((err) => console.error("Error adding user to Neon:", err));
  };

  const isAuthenticated = !!currentUser;
  const isStaff =
    currentUser?.role === "admin" ||
    currentUser?.role === "dispatcher" ||
    currentUser?.role === "compliance";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isStaff,
        users,
        verifyCredentials,
        completeMfaLogin,
        login,
        registerClient,
        logout,
        updateUserStatus,
        updateUserRole,
        updateUserPassword,
        updateUserMfa,
        toggleUserStatus,
        deleteUser,
        addUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
