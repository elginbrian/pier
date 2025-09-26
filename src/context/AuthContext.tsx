"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/auth";
import { app } from "../firebase/init";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

type AuthContextValue = {
  user: authService.User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<authService.User>;
  signIn: (email: string, password: string) => Promise<authService.User>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<authService.User | null>(null);
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
        }
      } catch (e) {
        console.error("Failed to ensure user doc in firestore", e);
      }
    }

    const unsubscribe = authService.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
      if (u) {
        ensureUserDoc(u as authService.User);
      }
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    signUp: async (email: string, password: string) => {
      const u = await authService.signUpWithEmail(email, password);
      setUser(u);
      return u;
    },
    signIn: async (email: string, password: string) => {
      const u = await authService.signInWithEmailLocal(email, password);
      setUser(u);
      return u;
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
