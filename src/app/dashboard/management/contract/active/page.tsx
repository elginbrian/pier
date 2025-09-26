"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { colors } from "@/design-system";
import dashboardService from "@/services/dashboard";

const ManagementContractActivePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterWaktu, setFilterWaktu] = useState("Waktu");
  const [filterStatus, setFilterStatus] = useState("Semua Status");

  const handleContractClick = (contractId: string) => {
    router.push(`/dashboard/management/contract/${contractId}`);
  };

  const [contractsData, setContractsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    dashboardService
      .getAllContracts()
      .then((list: any[]) => {
        if (!mounted) return;
        const active = list
          .filter((c) => c.status === "active")
          .map((c) => ({
            id: c.id,
            judul: c.title,
            pihak: c.vendorName,
            waktu: c.endDate || c.startDate || "-",
            warna: colors.primary[600],
          }));
        setContractsData(active);
      })
      .catch((e: any) => console.error("Failed to load active contracts", e))
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = contractsData.filter((c) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return c.judul.toLowerCase().includes(q) || c.pihak.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold" style={{ color: colors.base[700] }}>
              Kontrak Aktif Saat Ini
            </h2>
            <p className="text-sm" style={{ color: colors.base[600] }}>
              Lihat semua kontrak yang sedang berjalan aktif
            </p>
          </div>
          <div>
            <a className="text-sm font-medium" style={{ color: colors.primary[600] }} href="#">
              Lihat Semua
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
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

            <div className="flex items-center gap-3">
              <select value={filterWaktu} onChange={(e) => setFilterWaktu(e.target.value)} className="px-4 py-2 rounded-lg text-sm" style={{ border: `1px solid ${colors.base[300]}`, backgroundColor: "#ffffff", color: colors.base[700] }}>
                <option>Waktu</option>
                <option>Hari Ini</option>
                <option>Minggu Ini</option>
                <option>Bulan Ini</option>
              </select>

              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 rounded-lg text-sm" style={{ border: `1px solid ${colors.base[300]}`, backgroundColor: "#ffffff", color: colors.base[700] }}>
                <option>Semua Status</option>
                <option>Pending</option>
                <option>Aktif</option>
                <option>Berakhir</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="space-y-3">
            {loading ? (
              <div className="p-6 text-center text-slate-500">Loading contracts...</div>
            ) : (
              filtered.map((c, idx) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between bg-transparent p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  style={{ borderBottom: idx < filtered.length - 1 ? `1px solid ${colors.base[100]}` : "none" }}
                  onClick={() => handleContractClick(c.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ backgroundColor: c.warna }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8v10H8z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 7v10" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: colors.base[700] }}>
                        {c.judul}
                      </div>
                      <div className="text-xs mt-1" style={{ color: colors.base[600] }}>
                        {c.pihak} - {c.waktu}
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      className="px-4 py-2 rounded-full text-sm font-medium hover:opacity-95 transition-opacity"
                      style={{ backgroundColor: colors.primary[700], color: "#ffffff" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContractClick(c.id);
                      }}
                    >
                      Lihat Kontrak Aktif
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementContractActivePage;
