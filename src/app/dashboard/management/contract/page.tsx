"use client";

import React, { useState } from "react";
import { colors } from "@/design-system";

const ManagementContractPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJenis, setSelectedJenis] = useState("Semua Jenis");
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [selectedRisiko, setSelectedRisiko] = useState("Level Risiko");
  const [currentPage, setCurrentPage] = useState(1);

  const contractsData = new Array(9).fill(null).map((_, i) => ({
    id: `SC00${i + 1}`,
    judul: `Kontrak Penjualan Properti`,
    pihak: `PT. Maju Bersama`,
    tanggalBuat: `15 Jan 2024`,
    tanggalBerakhir: `15 Jan 2025`,
    status: i === 0 ? "Aktif" : i === 8 ? "Berakhir" : "Pending",
    tag: i % 2 === 0 ? "Properti" : "Sewa",
    level: i === 8 ? "Risiko Tinggi" : i % 3 === 0 ? "Risiko Rendah" : "Risiko Sedang",
  }));

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string }> = {
      Aktif: { bg: `${colors.success[200]}99`, text: colors.success[700] }, // 99 = 60% opacity in hex
      Pending: { bg: colors.warning[200], text: colors.warning[700] },
      Berakhir: { bg: `${colors.error[200]}99`, text: colors.error[700] },
      Draft: { bg: `${colors.base[400]}99`, text: colors.base[700] },
    };

    const config = statusConfig[status] || statusConfig["Draft"];
    return (
      <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: config.bg, color: config.text }}>
        {status}
      </span>
    );
  };

  const getTagBadge = (tag: string) => {
    const tags = typeof tag === "string" ? tag.split(",").map((t) => t.trim()) : [];

    const tagConfig: Record<string, { bg: string; text: string }> = {
      Properti: { bg: `${colors.primary[200]}60`, text: colors.primary[700] },
      Sewa: { bg: `${colors.primary[200]}60`, text: colors.primary[700] },
    };

    return (
      <div className="flex items-center space-x-2">
        {tags.map((t) => {
          const config = tagConfig[t] || { bg: colors.base[100], text: colors.base[700] };
          return (
            <span key={t} className="px-3 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: config.bg, color: config.text }}>
              {t}
            </span>
          );
        })}
      </div>
    );
  };

  const getRisikoBadge = (level: string) => {
    const risikoConfig: Record<string, { bg: string; text: string }> = {
      "Risiko Rendah": { bg: colors.warning[200], text: colors.success[700] },
      "Risiko Sedang": { bg: colors.warning[300], text: colors.warning[700] },
      "Risiko Tinggi": { bg: `${colors.error[400]}60`, text: colors.error[700] },
    };
    const config = risikoConfig[level] || risikoConfig["Risiko Rendah"];
    return (
      <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: config.bg, color: config.text }}>
        {level}
      </span>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold mb-2" style={{ color: colors.base[700] }}>
            Daftar Kontrak
          </h1>
          <p className="text-sm" style={{ color: colors.base[600] }}>
            Kelola dan pantau semua kontrak pintar Anda dalam satu tempat
          </p>
        </div>

        <div
          className="bg-white shadow-sm p-4 mb-6"
          style={{
            border: `1px solid ${colors.base[200]}`,
            borderRadius: "0.8rem",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-4" >
            <div className="flex-1" >
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: colors.base[400] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Cari kontrak berdasarkan ID, judul, atau pihak..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-sm"
                  style={{ border: `1px solid ${colors.base[300]}`, backgroundColor: "#ffffff" }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <select
                className="px-4 py-2 rounded-lg text-sm"
                style={{ border: `1px solid ${colors.base[300]}`, backgroundColor: "#ffffff", color: colors.base[700] }}
                value={selectedJenis}
                onChange={(e) => setSelectedJenis(e.target.value)}
              >
                <option>Semua Jenis</option>
                <option>Properti</option>
                <option>Sewa</option>
              </select>

              <select
                className="px-4 py-2 rounded-lg text-sm"
                style={{ border: `1px solid ${colors.base[300]}`, backgroundColor: "#ffffff", color: colors.base[700] }}
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
                style={{ border: `1px solid ${colors.base[300]}`, backgroundColor: "#ffffff", color: colors.base[700] }}
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

        <div className="bg-white">
          <div className="overflow-x-auto"
            style={{
              border: `1px solid ${colors.base[200]}`,
              borderRadius: "0.8rem",
            }}>
            <table className="min-w-full">
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.base[200]}`, backgroundColor: colors.base[100] }}>
                  <th className="text-left py-4 px-6 text-sm font-bold" style={{ color: colors.base[600] }}>
                    ID Kontrak
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold" style={{ color: colors.base[600] }}>
                    Judul
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold" style={{ color: colors.base[600] }}>
                    Pihak
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold" style={{ color: colors.base[600] }}>
                    Tanggal Mulai
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold" style={{ color: colors.base[600] }}>
                    Tanggal Berakhir
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold" style={{ color: colors.base[600] }}>
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold" style={{ color: colors.base[600] }}>
                    Tag
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-bold" style={{ color: colors.base[600] }}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {contractsData.map((contract, index) => (
                  <tr
                    key={index}
                    className="hover:bg-opacity-50 transition-colors"
                    style={{ borderBottom: index < contractsData.length - 1 ? `1px solid ${colors.base[200]}` : "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.base[100])}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td className="py-4 px-6 text-sm font-medium" style={{ color: colors.base[700] }}>
                      {contract.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-bold" style={{ color: colors.base[700] }}>
                        {contract.judul}
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
                    <td className="py-4 px-6">
                      <div className="py-4 px-6">{getTagBadge(contract.tag)}</div>
                      <div className="text-xs mt-1">{getRisikoBadge(contract.level)}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 rounded transition-colors" title="See details">
                          <img
                            src="/eye-open.svg"
                            alt="See details"
                            className="w-8 h-8 rounded-lg object-contain"
                          />
                        </button>
                        <button className="p-1 rounded transition-colors" title="Download">
                          <img
                            src="/download-draft.svg"
                            alt="Download"
                            className="w-8 h-8 rounded-lg object-contain"
                            style={{ filter: `invert(30%) sepia(100%) saturate(0%) hue-rotate(170deg) brightness(90%) contrast(85%)` }}
                          />
                        </button>
                        <button className="p-1 rounded transition-colors" title="Edit">
                          <img
                            src="/pencil.svg"
                            alt="Edit"
                            className="w-8 h-8 rounded-lg object-contain"
                            style={{ filter: `invert(90%) sepia(0%) saturate(0%) hue-rotate(0deg)` }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-4">
            <p className="text-sm" style={{ color: colors.base[600] }}>
              Menampilkan 1-8 dari 24 kontrak
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm hover:underline disabled:opacity-50" style={{ color: colors.base[600] }} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                Previous
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className="w-8 h-8 text-sm rounded transition-colors"
                  style={{ backgroundColor: currentPage === page ? colors.primary[600] : "transparent", color: currentPage === page ? "#ffffff" : colors.base[600] }}
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

export default ManagementContractPage;
