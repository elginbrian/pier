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

  let navItems: { href: string; label: string; icon: React.ReactNode }[] = [];

  if (!user) {
    navItems = [
      { href: "/auth/login", label: "Dashboard", icon: <FiBarChart2 size={18} /> },
      { href: "/auth/login", label: "Proposal", icon: <FiFileText size={18} /> },
    ];
  } else if (user.role === "hukum") {
    navItems = [
      { href: "/dashboard/hukum", label: "Dashboard", icon: <FiBarChart2 size={18} /> },
      { href: "/dashboard/hukum/detail-pengajuan", label: "Detail Pengajuan", icon: <FiFileText size={18} /> },
    ];
  } else if (user.role === "manajemen" || user.role === "management") {
    navItems = [
      { href: "/dashboard/management", label: "Dashboard", icon: <FiBarChart2 size={18} /> },
      { href: "/dashboard/management/contract", label: "Daftar Kontrak", icon: <FiList size={18} /> },
      { href: "/dashboard/management/contract/monitoring", label: "Monitoring Kontrak", icon: <FiFileText size={18} /> },
      { href: "/dashboard/management/contract/pending", label: "Kontrak Pending", icon: <FiFileText size={18} /> },
      { href: "/dashboard/management/contract/active", label: "Kontrak Aktif", icon: <FiFileText size={18} /> },
    ];
  } else {
    navItems = [
      { href: "/dashboard/vendor", label: "Dashboard", icon: <FiBarChart2 size={18} /> },
      { href: "/dashboard/vendor/proposal", label: "Proposal", icon: <FiFileText size={18} /> },
    ];
  }

  const rootClass = onClose ? `block md:hidden ${className}` : `hidden md:block fixed left-0 top-0 bottom-0 z-40 ${className}`;

  return (
    <aside className={rootClass} style={{ width: 260 }}>
      <div className="flex flex-col h-full overflow-y-auto bg-white border-r border-gray-100" style={{ boxShadow: "0 6px 20px rgba(16,24,40,0.06)" }}>
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
