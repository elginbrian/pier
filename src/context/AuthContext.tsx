"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/auth";
import { app } from "../firebase/init";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export type AppUser = authService.User & { role?: string | null };

type AuthContextValue = {
  user: AppUser | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<AppUser>;
  signIn: (email: string, password: string) => Promise<AppUser>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore(app);

    async function ensureUserDoc(u: authService.User) {
      try {
        const userRef = doc(db, "users", u.uid);
        const snap = await getDoc(userRef);
        if (!snap.exists()) {
          await setDoc(userRef, {
            uid: u.uid,
            email: u.email ?? null,
            displayName: u.displayName ?? null,
            role: "vendor",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          return { role: "vendor" };
        }
        return { role: snap.data()?.role ?? null };
      } catch (e) {
        console.error("Failed to ensure/load user doc in firestore", e);
        return { role: null };
      }
    }

    const unsubscribe = authService.onAuthStateChanged(async (u) => {
      setLoading(true);
      if (!u) {
        setUser(null);
        setLoading(false);
        return;
      }

      const { role } = await ensureUserDoc(u as authService.User);
      setUser({ ...(u as authService.User), role });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function loadRoleForUid(uid: string) {
    try {
      const db = getFirestore(app);
      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);
      return snap.exists() ? snap.data()?.role ?? null : null;
    } catch (e) {
      console.error("Failed to load user role", e);
      return null;
    }
  }

  const value: AuthContextValue = {
    user,
    loading,
    signUp: async (email: string, password: string) => {
      const u = await authService.signUpWithEmail(email, password);

      const role = await loadRoleForUid(u.uid);
      const appUser: AppUser = { ...u, role };
      setUser(appUser);
      return appUser;
    },
    signIn: async (email: string, password: string) => {
      const u = await authService.signInWithEmailLocal(email, password);
      const role = await loadRoleForUid(u.uid);
      const appUser: AppUser = { ...u, role };
      setUser(appUser);
      return appUser;
    },
    signOut: async () => {
      await authService.signOut();
      setUser(null);
    },
    requestPasswordReset: async (email: string) => await authService.requestPasswordReset(email),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
