"use client";

import React, { useState } from "react";
import { colors } from "@/design-system";

const ProposalPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Chart data for Linimasa Kontrak
  const chartData = [
    { month: "Jan", aktif: 87, selesai: 65 },
    { month: "Feb", aktif: 96, selesai: 58 },
    { month: "Mar", aktif: 106, selesai: 45 },
    { month: "Apr", aktif: 112, selesai: 41 },
    { month: "Mei", aktif: 98, selesai: 44 },
    { month: "Jun", aktif: 88, selesai: 54 },
    { month: "Jul", aktif: 95, selesai: 56 },
    { month: "Agu", aktif: 108, selesai: 46 },
    { month: "Sep", aktif: 115, selesai: 40 },
    { month: "Okt", aktif: 114, selesai: 35 },
    { month: "Nov", aktif: 103, selesai: 45 },
    { month: "Des", aktif: 84, selesai: 32 },
  ];

  // Active contracts data
  const activeContracts = [
    {
      id: 1,
      title: "Kontrak Pemeliharaan",
      company: "PT Service Pro",
      value: "Rp 1.2M",
      daysLeft: 90,
    },
    {
      id: 2,
      title: "Kontrak Pemeliharaan",
      company: "PT Service Pro",
      value: "Rp 1.2M",
      daysLeft: 90,
    },
    {
      id: 3,
      title: "Kontrak Pemeliharaan",
      company: "PT Service Pro",
      value: "Rp 1.2M",
      daysLeft: 90,
    },
  ];

  // Contract table data
  const contractsData = [
    {
      id: "00001",
      name: "KONTRAK 1",
      amount: "Rp 8.7M",
      expiry: "14 Feb 2025",
      type: "Electric",
      status: "Draft" as const,
    },
    {
      id: "00002",
      name: "KONTRAK 2",
      amount: "Rp 8.7M",
      expiry: "14 Feb 2025",
      type: "Book",
      status: "Diproses" as const,
    },
    {
      id: "00003",
      name: "KONTRAK 3",
      amount: "Rp 8.7M",
      expiry: "14 Feb 2025",
      type: "Medicine",
      status: "Ditolak" as const,
    },
    {
      id: "00004",
      name: "KONTRAK 4",
      amount: "Rp 8.7M",
      expiry: "14 Feb 2025",
      type: "Mobile",
      status: "Selesai" as const,
    },
    {
      id: "00005",
      name: "KONTRAK 5",
      amount: "Rp 8.7M",
      expiry: "14 Feb 2025",
      type: "Watch",
      status: "Diproses" as const,
    },
    {
      id: "00006",
      name: "KONTRAK 6",
      amount: "Rp 8.7M",
      expiry: "14 Feb 2025",
      type: "Medicine",
      status: "Selesai" as const,
    },
  ];

  const getStatusBadge = (status: "Draft" | "Diproses" | "Ditolak" | "Selesai") => {
    const statusConfig = {
      Draft: { bg: colors.base[100], text: colors.base[700] },
      Diproses: { bg: colors.warning[100], text: colors.warning[700] },
      Ditolak: { bg: colors.error[100], text: colors.error[700] },
      Selesai: { bg: colors.success[100], text: colors.success[700] },
    };

    const config = statusConfig[status] || statusConfig["Draft"];

    return (
      <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: config.bg, color: config.text }}>
        {status}
      </span>
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.base[100] }}>
      <div className="p-6">
        {/* Linimasa Kontrak Chart */}
        <div className="rounded-lg shadow-sm mb-8 p-6" style={{ backgroundColor: "#ffffff" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold" style={{ color: colors.base[700] }}>
              Linimasa Kontrak
            </h2>
            <div className="text-sm" style={{ color: colors.base[600] }}>
              Tahun 2025
            </div>
          </div>

          <div className="flex items-center mb-4 space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5" style={{ backgroundColor: colors.primary[500] }}></div>
              <span className="text-sm" style={{ color: colors.base[600] }}>
                Kontrak Aktif
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5" style={{ backgroundColor: colors.base[700] }}></div>
              <span className="text-sm" style={{ color: colors.base[600] }}>
                Kontrak Selesai
              </span>
            </div>
          </div>

          {/* Simple Chart Placeholder */}
          <div className="h-80 flex items-end justify-between px-4" style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="flex flex-col items-center space-y-1">
                  <div
                    className="w-4 rounded-t"
                    style={{
                      height: `${(data.aktif / 120) * 200}px`,
                      backgroundColor: colors.primary[500],
                    }}
                  ></div>
                  <div
                    className="w-4 rounded-t"
                    style={{
                      height: `${(data.selesai / 120) * 200}px`,
                      backgroundColor: colors.base[700],
                    }}
                  ></div>
                </div>
                <span className="text-xs" style={{ color: colors.base[600] }}>
                  {data.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kontrak Aktif */}
          <div className="lg:col-span-2 rounded-lg shadow-sm" style={{ backgroundColor: "#ffffff" }}>
            <div className="p-6" style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold" style={{ color: colors.base[700] }}>
                  Kontrak Aktif
                </h2>
                <button className="text-sm font-medium hover:underline" style={{ color: colors.primary[600] }}>
                  Lihat Semua
                </button>
              </div>
            </div>

            <div>
              {activeContracts.map((contract, index) => (
                <div key={contract.id}>
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primary[100] }}>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={colors.primary[600]}>
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" />
                          <polyline points="14,2 14,8 20,8" strokeWidth="2" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium" style={{ color: colors.base[700] }}>
                          {contract.title}
                        </h3>
                        <p className="text-sm" style={{ color: colors.base[600] }}>
                          {contract.company} - {contract.value}
                        </p>
                      </div>
                    </div>
                    <span
                      className="px-3 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: colors.primary[100],
                        color: colors.primary[700],
                      }}
                    >
                      {contract.daysLeft} Hari
                    </span>
                  </div>
                  {index < activeContracts.length - 1 && <div style={{ borderTop: `1px solid ${colors.base[200]}` }}></div>}
                </div>
              ))}
            </div>

            {/* Table Section */}
            <div className="p-6" style={{ borderTop: `1px solid ${colors.base[200]}` }}>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Nama Kontrak
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Jumlah Biaya
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Tanggal Kadaluarsa
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Tipe
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contractsData.map((contract, index) => (
                      <tr
                        key={contract.id}
                        className="hover:bg-opacity-50"
                        style={{
                          borderBottom: index < contractsData.length - 1 ? `1px solid ${colors.base[200]}` : "none",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.base[100])}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <td className="py-4 px-4 text-sm" style={{ color: colors.base[700] }}>
                          {contract.id}
                        </td>
                        <td className="py-4 px-4 text-sm" style={{ color: colors.base[700] }}>
                          {contract.name}
                        </td>
                        <td className="py-4 px-4 text-sm" style={{ color: colors.base[700] }}>
                          {contract.amount}
                        </td>
                        <td className="py-4 px-4 text-sm" style={{ color: colors.base[700] }}>
                          {contract.expiry}
                        </td>
                        <td className="py-4 px-4 text-sm" style={{ color: colors.base[700] }}>
                          {contract.type}
                        </td>
                        <td className="py-4 px-4">{getStatusBadge(contract.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm" style={{ color: colors.base[600] }}>
                  Menampilkan 1-4 dari 24 kontrak
                </p>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 text-sm hover:underline" style={{ color: colors.base[600] }} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                    Previous
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className="w-8 h-8 text-sm rounded"
                      style={{
                        backgroundColor: currentPage === page ? colors.primary[600] : "transparent",
                        color: currentPage === page ? "#ffffff" : colors.base[600],
                      }}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-3 py-2 text-sm hover:underline" style={{ color: colors.base[600] }} onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Aksi Cepat */}
          <div className="rounded-lg shadow-sm" style={{ backgroundColor: "#ffffff" }}>
            <div className="p-6" style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
              <h2 className="text-lg font-semibold" style={{ color: colors.base[700] }}>
                Aksi Cepat
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <button className="w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors hover:opacity-90" style={{ backgroundColor: colors.primary[600], color: "#ffffff" }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" />
                  <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" />
                </svg>
                <span>Ajukan Proposal Baru</span>
              </button>

              <button
                className="w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors hover:opacity-90"
                style={{
                  backgroundColor: colors.base[100],
                  color: colors.base[700],
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" />
                  <polyline points="7,10 12,15 17,10" strokeWidth="2" />
                  <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2" />
                </svg>
                <span>Export Laporan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalPage;
