"use client";

import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { colors } from "../../design-system";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <main className="w-full px-6 py-8 flex-1">
        <div className="relative flex w-full">
          {drawerOpen && <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setDrawerOpen(false)} />}

          <div className="hidden md:block">
            <Sidebar />
          </div>

          <div className="md:hidden absolute left-4 top-4 z-50">
            <button aria-label="open menu" onClick={() => setDrawerOpen(true)} className="p-2 rounded-md border bg-white shadow-sm" style={{ borderColor: colors.base[300] }}>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {drawerOpen && (
            <div className="fixed z-50 left-0 top-0 bottom-0 w-64 bg-white shadow-lg md:hidden" style={{ overflow: "auto" }}>
              <Sidebar onClose={() => setDrawerOpen(false)} />
            </div>
          )}

          <div className="flex-1 md:pl-[220px]">
            <div className="max-w-[1200px] mx-auto">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
