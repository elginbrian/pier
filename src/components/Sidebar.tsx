"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { colors } from "../design-system";
import { FiBarChart2, FiFileText, FiList, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "", onClose }) => {
  const pathname = usePathname() || "/";

  const { user } = useAuth();

  const dashboardHref = user ? (user.role === "hukum" ? "/dashboard/hukum" : "/dashboard/vendor") : "/auth/login";
  const secondHref = user ? (user.role === "hukum" ? "/dashboard/hukum/detail-pengajuan" : "/dashboard/vendor/proposal") : "/auth/login";

  const navItems: { href: string; label: string; icon: React.ReactNode }[] = [
    { href: dashboardHref, label: "Dashboard", icon: <FiBarChart2 size={18} /> },
    { href: secondHref, label: user?.role === "hukum" ? "Detail Pengajuan" : "Proposal", icon: <FiFileText size={18} /> },
  ];

  const rootClass = onClose ? `block md:hidden ${className}` : `hidden md:block fixed left-0 top-0 bottom-0 z-40 ${className}`;

  return (
    <aside className={rootClass} style={{ width: 260 }}>
      <div className="flex flex-col h-full overflow-y-auto bg-white border-r border-gray-100" style={{ boxShadow: "0 6px 20px rgba(16,24,40,0.06)" }}>
        {/* Mobile close button - visible when sidebar is used as a drawer (onClose provided) */}
        {onClose && (
          <div className="md:hidden flex items-center justify-end px-4 pt-4">
            <button aria-label="close menu" onClick={onClose} className="p-2 rounded-md border bg-white shadow-sm" style={{ borderColor: colors.base[300] }}>
              <FiX className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="px-8 pt-4 pb-2 md:pt-8">
          <div className="flex items-center justify-center">
            <img src="/logo-pelindo.png" alt="Pelindo" className="w-32" />
          </div>

          <div className="mt-4 border-t border-gray-200" />
        </div>

        <nav className="px-6 mt-4">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-4 px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ${active ? "text-white" : "text-gray-700 hover:text-gray-900"}`}
                    style={active ? { background: colors.primary[300], boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.04)" } : undefined}
                  >
                    <span className={`flex items-center justify-center w-9 h-9 rounded-md transition-colors duration-150 ${active ? "bg-white/10 text-white" : "text-gray-600 hover:bg-gray-100"}`} style={{ fontSize: 18 }}>
                      {item.icon}
                    </span>
                    <span className="leading-5">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto px-6 py-6"></div>
      </div>
    </aside>
  );
};

export default Sidebar;
