"use client";

import React, { useState } from "react";
import { colors } from "@/design-system";

const DetailPengajuanPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJenis, setSelectedJenis] = useState("Semua Jenis");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [selectedRisiko, setSelectedRisiko] = useState("Level Risiko");
  const [currentPage, setCurrentPage] = useState(1);

  const contractsData = [
    {
      id: "SC001",
      judul: "Kontrak Pengadaan Properti",
      pihak: "PT. Maju Bersama",
      tanggalBuat: "15 Jan 2024",
      tanggalBerakhir: "15 Jan 2025",
      status: "Aktif",
      tag: "Properti",
      level: "Risiko Rendah",
    },
    {
      id: "SC001",
      judul: "Kontrak Pengadaan Properti",
      pihak: "PT. Maju Bersama",
      tanggalBuat: "15 Jan 2024",
      tanggalBerakhir: "15 Jan 2025",
      status: "Pending",
      tag: "Sewa",
      level: "Risiko Sedang",
    },
    {
      id: "SC001",
      judul: "Kontrak Pengadaan Properti",
      pihak: "PT. Maju Bersama",
      tanggalBuat: "15 Jan 2024",
      tanggalBerakhir: "15 Jan 2025",
      status: "Pending",
      tag: "Sewa",
      level: "Risiko Sedang",
    },
    {
      id: "SC001",
      judul: "Kontrak Pengadaan Properti",
      pihak: "PT. Maju Bersama",
      tanggalBuat: "15 Jan 2024",
      tanggalBerakhir: "15 Jan 2025",
      status: "Pending",
      tag: "Sewa",
      level: "Risiko Sedang",
    },
    {
      id: "SC001",
      judul: "Kontrak Pengadaan Properti",
      pihak: "PT. Maju Bersama",
      tanggalBuat: "15 Jan 2024",
      tanggalBerakhir: "15 Jan 2025",
      status: "Pending",
      tag: "Sewa",
      level: "Risiko Sedang",
    },
    {
      id: "SC001",
      judul: "Kontrak Pengadaan Properti",
      pihak: "PT. Maju Bersama",
      tanggalBuat: "15 Jan 2024",
      tanggalBerakhir: "15 Jan 2025",
      status: "Pending",
      tag: "Sewa",
      level: "Risiko Sedang",
    },
    {
      id: "SC001",
      judul: "Kontrak Pengadaan Properti",
      pihak: "PT. Maju Bersama",
      tanggalBuat: "15 Jan 2024",
      tanggalBerakhir: "15 Jan 2025",
      status: "Pending",
      tag: "Sewa",
      level: "Risiko Sedang",
    },
    {
      id: "SC001",
      judul: "Kontrak Pengadaan Properti",
      pihak: "PT. Maju Bersama",
      tanggalBuat: "15 Jan 2024",
      tanggalBerakhir: "15 Jan 2025",
      status: "Berakhir",
      tag: "Sewa",
      level: "Risiko Tinggi",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Aktif: { bg: colors.success[100], text: colors.success[700] },
      Pending: { bg: colors.warning[100], text: colors.warning[700] },
      Berakhir: { bg: colors.error[100], text: colors.error[700] },
      Draft: { bg: colors.base[100], text: colors.base[700] },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig["Draft"];

    return (
      <span
        className="px-2 py-1 rounded-full text-xs font-medium"
        style={{
          backgroundColor: config.bg,
          color: config.text,
        }}
      >
        {status}
      </span>
    );
  };

  const getTagBadge = (tag: string) => {
    const tagConfig = {
      Properti: { bg: colors.primary[100], text: colors.primary[700] },
      Sewa: { bg: colors.info[100], text: colors.info[700] },
    };

    const config = tagConfig[tag as keyof typeof tagConfig] || { bg: colors.base[100], text: colors.base[700] };

    return (
      <span
        className="px-2 py-1 rounded text-xs font-medium"
        style={{
          backgroundColor: config.bg,
          color: config.text,
        }}
      >
        {tag}
      </span>
    );
  };

  const getRisikoBadge = (level: string) => {
    const risikoConfig = {
      "Risiko Rendah": { bg: colors.success[100], text: colors.success[700] },
      "Risiko Sedang": { bg: colors.warning[100], text: colors.warning[700] },
      "Risiko Tinggi": { bg: colors.error[100], text: colors.error[700] },
    };

    const config = risikoConfig[level as keyof typeof risikoConfig] || risikoConfig["Risiko Rendah"];

    return (
      <span
        className="px-2 py-1 rounded text-xs font-medium"
        style={{
          backgroundColor: config.bg,
          color: config.text,
        }}
      >
        {level}
      </span>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2" style={{ color: colors.base[700] }}>
            Penyimpanan Kontrak Pintar
          </h1>
          <p className="text-sm" style={{ color: colors.base[600] }}>
            Kelola dan pantau semua kontrak pintar Anda dalam satu tempat
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: colors.base[400] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari kontrak berdasarkan ID, judul, atau pihak..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-sm"
                  style={{
                    border: `1px solid ${colors.base[300]}`,
                    backgroundColor: "#ffffff",
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-3">
              <select
                className="px-4 py-2 rounded-lg text-sm"
                style={{
                  border: `1px solid ${colors.base[300]}`,
                  backgroundColor: "#ffffff",
                  color: colors.base[700],
                }}
                value={selectedJenis}
                onChange={(e) => setSelectedJenis(e.target.value)}
              >
                <option>Semua Jenis</option>
                <option>Properti</option>
                <option>Sewa</option>
              </select>

              <select
                className="px-4 py-2 rounded-lg text-sm"
                style={{
                  border: `1px solid ${colors.base[300]}`,
                  backgroundColor: "#ffffff",
                  color: colors.base[700],
                }}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option>Semua Status</option>
                <option>Aktif</option>
                <option>Pending</option>
                <option>Berakhir</option>
              </select>

              <select
                className="px-4 py-2 rounded-lg text-sm"
                style={{
                  border: `1px solid ${colors.base[300]}`,
                  backgroundColor: "#ffffff",
                  color: colors.base[700],
                }}
                value={selectedRisiko}
                onChange={(e) => setSelectedRisiko(e.target.value)}
              >
                <option>Level Risiko</option>
                <option>Risiko Rendah</option>
                <option>Risiko Sedang</option>
                <option>Risiko Tinggi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    ID Kontrak
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    Judul
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    Pihak
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    Tanggal Dibuat
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    Tanggal Berakhir
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    Tag
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {contractsData.map((contract, index) => (
                  <tr
                    key={index}
                    className="hover:bg-opacity-50 transition-colors"
                    style={{
                      borderBottom: index < contractsData.length - 1 ? `1px solid ${colors.base[200]}` : "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.base[100])}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td className="py-4 px-6 text-sm font-medium" style={{ color: colors.base[700] }}>
                      {contract.id}
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm font-medium" style={{ color: colors.base[700] }}>
                          {contract.judul}
                        </div>
                        <div className="text-xs mt-1">{getRisikoBadge(contract.level)}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm" style={{ color: colors.base[700] }}>
                      {contract.pihak}
                    </td>
                    <td className="py-4 px-6 text-sm" style={{ color: colors.base[700] }}>
                      {contract.tanggalBuat}
                    </td>
                    <td className="py-4 px-6 text-sm" style={{ color: colors.base[700] }}>
                      {contract.tanggalBerakhir}
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(contract.status)}</td>
                    <td className="py-4 px-6">{getTagBadge(contract.tag)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 rounded hover:bg-gray-100 transition-colors" title="Lihat Detail">
                          <svg className="w-4 h-4" style={{ color: colors.base[500] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100 transition-colors" title="Download">
                          <svg className="w-4 h-4" style={{ color: colors.base[500] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                        <button className="p-1 rounded hover:bg-gray-100 transition-colors" title="Edit">
                          <svg className="w-4 h-4" style={{ color: colors.base[500] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4" style={{ borderTop: `1px solid ${colors.base[200]}` }}>
            <p className="text-sm" style={{ color: colors.base[600] }}>
              Menampilkan 1-4 dari 24 kontrak
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm hover:underline disabled:opacity-50" style={{ color: colors.base[600] }} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                Previous
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className="w-8 h-8 text-sm rounded transition-colors"
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
    </div>
  );
};

export default DetailPengajuanPage;
