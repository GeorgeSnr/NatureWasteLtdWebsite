"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole } from "@/types/admin";
import { initialUsers } from "@/data/initialUsers";

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isStaff: boolean;
  users: UserProfile[];
  login: (identifier: string, password?: string) => { success: boolean; message?: string };
  registerClient: (data: {
    name: string;
    email: string;
    phone: string;
    organization?: string;
    suburb?: string;
    address?: string;
    plan?: string;
    password?: string;
  }) => { success: boolean; user: UserProfile };
  logout: () => void;
  updateUserStatus: (userId: string, status: "active" | "pending" | "suspended") => void;
  deleteUser: (userId: string) => void;
  addUser: (user: UserProfile) => void;
  loginAsDemoClient: (clientIndex?: number) => void;
  loginAsDemoStaff: () => void;
}

const STORAGE_KEYS = {
  CURRENT_USER: "nw_auth_current_user_v1",
  USERS_DB: "nw_auth_users_database_v1",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<UserProfile[]>(initialUsers);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Initialize from storage
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
        if (user.role === "admin" || user.role === "dispatcher") {
          sessionStorage.setItem("nw_admin_auth", "true");
        }
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    }
  };

  // Login method (email, phone, or username)
  const login = (identifier: string, password?: string): { success: boolean; message?: string } => {
    const cleanId = identifier.trim().toLowerCase();
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === cleanId ||
        u.phone.replace(/[^0-9]/g, "") === cleanId.replace(/[^0-9]/g, "") ||
        u.name.toLowerCase() === cleanId
    );

    if (!user) {
      // If user doesn't exist, create an auto-registered resident client for convenience
      if (cleanId.includes("@") || cleanId.length >= 7) {
        const newUser: UserProfile = {
          id: `USR-C-${Date.now().toString().slice(-4)}`,
          name: cleanId.includes("@") ? cleanId.split("@")[0] : "New Client",
          email: cleanId.includes("@") ? cleanId : `${cleanId.replace(/[^0-9]/g, "")}@naturewaste.ug`,
          phone: cleanId.includes("@") ? "+256 700 000 000" : identifier,
          role: "client",
          organization: "Private Household",
          suburb: "Kitende",
          plan: "Residential Connect",
          accountStatus: "active",
          ecoPoints: 100,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        const updatedList = [newUser, ...users];
        saveUsers(updatedList);
        saveCurrentUser(newUser);
        return { success: true };
      }
      return { success: false, message: "User not found. Please register a free account." };
    }

    if (user.accountStatus === "suspended") {
      return { success: false, message: "This account has been suspended. Please contact dispatch." };
    }

    const updatedUser = { ...user, lastLogin: new Date().toISOString() };
    saveCurrentUser(updatedUser);
    return { success: true };
  };

  // Register new client
  const registerClient = (data: {
    name: string;
    email: string;
    phone: string;
    organization?: string;
    suburb?: string;
    address?: string;
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
      plan: data.plan || "Residential Connect",
      accountStatus: "active",
      ecoPoints: 150, // Welcome signup bonus
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    const updatedList = [newUser, ...users];
    saveUsers(updatedList);
    saveCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  // Logout
  const logout = () => {
    saveCurrentUser(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("nw_admin_auth");
    }
  };

  // Admin user management actions
  const updateUserStatus = (userId: string, status: "active" | "pending" | "suspended") => {
    const updated = users.map((u) => (u.id === userId ? { ...u, accountStatus: status } : u));
    saveUsers(updated);
    if (currentUser?.id === userId) {
      saveCurrentUser({ ...currentUser, accountStatus: status });
    }
  };

  const deleteUser = (userId: string) => {
    const updated = users.filter((u) => u.id !== userId);
    saveUsers(updated);
    if (currentUser?.id === userId) {
      logout();
    }
  };

  const addUser = (user: UserProfile) => {
    const updated = [user, ...users];
    saveUsers(updated);
  };

  // Quick Demo Logins
  const loginAsDemoClient = (clientIndex: number = 0) => {
    const clients = users.filter((u) => u.role === "client");
    const client = clients[clientIndex % clients.length] || clients[0] || initialUsers[0];
    saveCurrentUser(client);
  };

  const loginAsDemoStaff = () => {
    const staff = users.find((u) => u.role === "admin" || u.role === "dispatcher") || initialUsers[5];
    saveCurrentUser(staff);
  };

  const isAuthenticated = !!currentUser;
  const isStaff = currentUser?.role === "admin" || currentUser?.role === "dispatcher" || currentUser?.role === "compliance";

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isStaff,
        users,
        login,
        registerClient,
        logout,
        updateUserStatus,
        deleteUser,
        addUser,
        loginAsDemoClient,
        loginAsDemoStaff,
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
