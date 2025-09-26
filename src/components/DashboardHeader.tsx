"use client";

import React from "react";
import { FiMenu, FiSearch } from "react-icons/fi";
import { colors } from "../design-system";

interface Props {
  onOpenMenu?: () => void;
}

export default function DashboardHeader({ onOpenMenu }: Props) {
  return (
    <header className="fixed top-0 z-30 bg-white border-b border-gray-200 shadow-sm w-full md:left-[260px] md:w-[calc(100%-260px)]">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <button aria-label="open menu" onClick={onOpenMenu} className="p-2 rounded-md border bg-white shadow-sm" style={{ borderColor: colors.base[300] }}>
              <FiMenu className="w-6 h-6" />
            </button>
          </div>

          <h1 className="hidden md:block text-2xl font-semibold text-gray-900">Dashboard</h1>
          <h1 className="md:hidden text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input placeholder="Cari kontrak..." className="pl-10 pr-4 py-2 rounded-lg border bg-white shadow-sm text-sm" style={{ borderColor: colors.base[200], minWidth: 220 }} />
          </div>

          <div className="w-8 h-8 rounded-full bg-white border flex items-center justify-center shadow-sm text-xs font-medium" style={{ borderColor: colors.base[200] }}>
            3
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <img src="/testimony.png" alt="avatar" className="w-8 h-8 rounded-full" />
            <div className="text-sm">
              <div className="font-medium text-gray-900">PT. Makan Gratis B</div>
              <div className="text-xs text-gray-500">Manager Procurement</div>
            </div>
          </div>

          <div className="sm:hidden">
            <img src="/testimony.png" alt="avatar" className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
}
