"use client";

import React from "react";
import { colors } from "@/design-system";

const HukumDashboard = () => {
  const stats = [
    {
      title: "Total Penggajian",
      value: "247",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={colors.primary[600]}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" />
          <polyline points="14,2 14,8 20,8" strokeWidth="2" />
          <line x1="16" y1="13" x2="8" y2="13" strokeWidth="2" />
          <line x1="16" y1="17" x2="8" y2="17" strokeWidth="2" />
        </svg>
      ),
      bgColor: colors.primary[100],
      textColor: colors.primary[600],
    },
    {
      title: "Draft",
      value: "18",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={colors.base[600]}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" />
          <polyline points="14,2 14,8 20,8" strokeWidth="2" />
        </svg>
      ),
      bgColor: colors.base[100],
      textColor: colors.base[600],
    },
    {
      title: "Review",
      value: "10",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={colors.warning[600]}>
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <polyline points="12,6 12,12 16,14" strokeWidth="2" />
        </svg>
      ),
      bgColor: colors.warning[100],
      textColor: colors.warning[600],
    },
    {
      title: "Aktif",
      value: "152",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={colors.success[600]}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeWidth="2" />
          <polyline points="22,4 12,14.01 9,11.01" strokeWidth="2" />
        </svg>
      ),
      bgColor: colors.success[100],
      textColor: colors.success[600],
    },
  ];

  const contracts = [
    {
      title: "Kontrak Layanan IT",
      company: "PT Teknologi Maju",
      date: "21.00 25 September 2025",
      status: "Aktif",
      statusColor: colors.success[100],
      statusTextColor: colors.success[700],
      iconBg: colors.primary[100],
      iconColor: colors.primary[600],
    },
    {
      title: "Kontrak Konstruksi Gudang",
      company: "PT Bangun Jaya",
      date: "16.00 25 September 2005",
      status: "Review",
      statusColor: colors.warning[100],
      statusTextColor: colors.warning[700],
      iconBg: colors.warning[100],
      iconColor: colors.warning[600],
    },
    {
      title: "Kontrak Pemeliharaan",
      company: "PT Service Pro",
      date: "13.00 25 September 2025",
      status: "Draft",
      statusColor: colors.base[100],
      statusTextColor: colors.base[700],
      iconBg: colors.base[100],
      iconColor: colors.base[600],
    },
  ];

  const notifications = [
    {
      title: "Perlu revisi pada beberapa bagian klausul",
      description: "Kontrak Layanan Kebersihan dengan PT Clean Service",
      dotColor: colors.error[500],
    },
    {
      title: "Review hukum menunggu persetujuan",
      description: "3 dokumen kontrak menunggu review dari tim hukum",
      dotColor: colors.warning[500],
    },
    {
      title: "Revisi telah disetujui",
      description: "Perubahan yang diminta telah disetujui oleh PT Merdeka Jaya",
      dotColor: colors.success[500],
    },
    {
      title: "Review hukum menunggu persetujuan",
      description: "3 dokumen kontrak menunggu review dari tim hukum",
      dotColor: colors.warning[500],
    },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-lg p-6 shadow-sm" style={{ backgroundColor: "#ffffff" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm mb-1" style={{ color: colors.base[600] }}>
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold" style={{ color: colors.base[700] }}>
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.bgColor }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status Penggajian Terbaru */}
        <div className="rounded-lg shadow-sm mb-8" style={{ backgroundColor: "#ffffff" }}>
          <div className="p-6" style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold" style={{ color: colors.base[700] }}>
                Status Penggajian Terbaru
              </h2>
              <button className="text-sm font-medium hover:underline" style={{ color: colors.primary[600] }}>
                Lihat Semua
              </button>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${colors.base[200]}` }}>
            {contracts.map((contract, index) => (
              <div key={index}>
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: contract.iconBg }}>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={contract.iconColor}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" />
                        <polyline points="14,2 14,8 20,8" strokeWidth="2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: colors.base[700] }}>
                        {contract.title}
                      </h3>
                      <p className="text-sm" style={{ color: colors.base[600] }}>
                        {contract.company} - {contract.date}
                      </p>
                    </div>
                  </div>
                  <span
                    className="px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: contract.statusColor,
                      color: contract.statusTextColor,
                    }}
                  >
                    {contract.status}
                  </span>
                </div>
                {index < contracts.length - 1 && <div style={{ borderTop: `1px solid ${colors.base[200]}` }}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Notifikasi & Pengingat */}
        <div className="rounded-lg shadow-sm" style={{ backgroundColor: "#ffffff" }}>
          <div className="p-6" style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
            <h2 className="text-lg font-semibold" style={{ color: colors.base[700] }}>
              Notifikasi & Pengingat
            </h2>
          </div>

          <div>
            {notifications.map((notification, index) => (
              <div key={index}>
                <div className="p-6 flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full mt-3" style={{ backgroundColor: notification.dotColor }}></div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1" style={{ color: colors.base[700] }}>
                      {notification.title}
                    </h3>
                    <p className="text-sm" style={{ color: colors.base[600] }}>
                      {notification.description}
                    </p>
                  </div>
                </div>
                {index < notifications.length - 1 && <div style={{ borderTop: `1px solid ${colors.base[200]}` }}></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HukumDashboard;
