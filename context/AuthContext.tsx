"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const STORAGE_KEY = "novaire_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setLoading(false);
  }, []);

  const persist = (u: AuthUser | null) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 1200));
    // Mock: derive name from email
    const name = email.split("@")[0].replace(/[._]/g, " ");
    const parts = name.split(" ");
    persist({
      id: `usr_${Date.now()}`,
      firstName: parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : "Guest",
      lastName: parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : "",
      email,
    });
  };

  const register = async (firstName: string, lastName: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 1400));
    persist({ id: `usr_${Date.now()}`, firstName, lastName, email });
  };

  const logout = () => persist(null);

  const updateProfile = (data: Partial<AuthUser>) => {
    if (!user) return;
    persist({ ...user, ...data });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
