"use client";

import React, { useState } from "react";
import { FiMenu, FiSearch, FiLogOut } from "react-icons/fi";
import Spinner from "../components/Spinner";
import { colors } from "../design-system";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

interface Props {
  onOpenMenu?: () => void;
}

export default function DashboardHeader({ onOpenMenu }: Props) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  return (
    <>
      {isLoggingOut && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <Spinner size={64} />
        </div>
      )}
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
              <input placeholder="Search contracts..." className="pl-10 pr-4 py-2 rounded-lg border bg-white shadow-sm text-sm" style={{ borderColor: colors.base[200], minWidth: 220 }} />
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 border flex items-center justify-center text-xs font-medium text-gray-800" style={{ borderColor: colors.base[200] }}>
                {(() => {
                  const name = user?.displayName ?? user?.email ?? "";
                  if (!name) return "U";
                  const parts = name.trim().split(/\s+/);
                  if (parts.length === 1) {
                    const local = parts[0].split("@")[0];
                    return (local[0] ?? "U").toUpperCase();
                  }
                  const first = parts[0][0] ?? "";
                  const last = parts[parts.length - 1][0] ?? "";
                  return (first + last).toUpperCase();
                })()}
              </div>
              <div className="text-sm">
                <div className="font-medium text-gray-900">{user?.displayName ?? user?.email ?? "User"}</div>
                <div className="text-xs text-gray-500">{user?.email ? user.email : "-"}</div>
              </div>
              <button
                aria-label="Logout"
                className="ml-4 p-2 rounded hover:bg-gray-100 text-gray-600"
                onClick={async () => {
                  try {
                    setIsLoggingOut(true);
                    await signOut();
                    router.replace("/");
                  } catch (e) {
                    console.error("Logout failed", e);
                    setIsLoggingOut(false);
                  }
                }}
              >
                <FiLogOut className="w-4 h-4" />
              </button>
            </div>

            <div className="sm:hidden">
              <div className="w-8 h-8 rounded-full bg-gray-100 border flex items-center justify-center text-xs font-medium text-gray-800" style={{ borderColor: colors.base[200] }}>
                {(() => {
                  const name = user?.displayName ?? user?.email ?? "";
                  if (!name) return "U";
                  const parts = name.trim().split(/\s+/);
                  if (parts.length === 1) {
                    const local = parts[0].split("@")[0];
                    return (local[0] ?? "U").toUpperCase();
                  }
                  const first = parts[0][0] ?? "";
                  const last = parts[parts.length - 1][0] ?? "";
                  return (first + last).toUpperCase();
                })()}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
