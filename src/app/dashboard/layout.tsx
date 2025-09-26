"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Navigation from "../../components/Navigation";
import Spinner from "../../components/Spinner";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { colors } from "../../design-system";
import DashboardHeader from "../../components/DashboardHeader";
import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-gray-600">Loading…</div>
      </div>
    );
  }

  if (!loading && !user)
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div>
          <Spinner size={48} />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <DashboardHeader onOpenMenu={() => setDrawerOpen(true)} />
      <main className="w-full px-6 py-8 flex-1 pt-20">
        <div className="relative flex w-full">
          {drawerOpen && <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setDrawerOpen(false)} aria-hidden />}

          <div className="hidden md:block" aria-hidden>
            <Sidebar />
          </div>

          {drawerOpen && (
            <div className="fixed z-50 left-0 top-0 bottom-0 w-64 md:hidden" style={{ overflow: "auto" }} role="dialog" aria-modal="true">
              <div ref={drawerRef} className="h-full transform transition-transform duration-300 ease-in-out" style={{ boxShadow: "0 6px 20px rgba(16,24,40,0.06)", background: "white", width: 260 }}>
                <Sidebar onClose={() => setDrawerOpen(false)} />
              </div>
            </div>
          )}

          <div className="flex-1 md:pl-[260px]">
            <div className="max-w-[1200px] mx-auto">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
