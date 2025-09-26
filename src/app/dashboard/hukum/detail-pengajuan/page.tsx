"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { colors } from "@/design-system";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import { subscribeToProposals, updateProposalStatus } from "@/services/proposals";

const DetailPengajuanPage = () => {
  const { user, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [proposals, setProposals] = useState<any[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    if (user.role !== "hukum") return;

    const unsubscribe = subscribeToProposals((items) => {
      setProposals(items);
    });

    return () => unsubscribe();
  }, [user, loading]);

  const handleSetStatus = async (id: string, status: string) => {
    if (!user) return;
    try {
      setBusyId(id);
      await updateProposalStatus(id, status, user.uid, status === "rejected" ? "Ditolak oleh tim hukum" : null);
    } catch (e) {
      console.error("Failed to set status", e);
    } finally {
      setBusyId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const map: any = {
      pending: { bg: colors.warning[100], text: colors.warning[700], label: "Pending" },
      under_review: { bg: colors.info[100], text: colors.info[700], label: "Under Review" },
      approved: { bg: colors.success[100], text: colors.success[700], label: "Approved" },
      rejected: { bg: colors.error[100], text: colors.error[700], label: "Rejected" },
    };
    const cfg = map[status] || { bg: colors.base[100], text: colors.base[700], label: status };
    return (
      <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: cfg.bg, color: cfg.text }}>
        {cfg.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user || user.role !== "hukum") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Anda tidak memiliki akses ke halaman ini.</p>
      </div>
    );
  }

  // Filter proposals by search
  const filtered = proposals.filter((p) => {
    if (!searchTerm) return true;
    const t = searchTerm.toLowerCase();
    return (p.proposalTitle || "").toLowerCase().includes(t) || (p.companyName || "").toLowerCase().includes(t) || (p.serviceType || "").toLowerCase().includes(t);
  });

  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(start, start + itemsPerPage);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2" style={{ color: colors.base[700] }}>
            Daftar Pengajuan Proposal
          </h1>
          <p className="text-sm" style={{ color: colors.base[600] }}>
            Kelola pengajuan dari vendor — review dan ubah status proposal di sini.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: colors.base[400] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari proposal..."
              className="w-full pl-10 pr-4 py-2 rounded-lg text-sm"
              style={{ border: `1px solid ${colors.base[300]}`, backgroundColor: "#ffffff" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    ID
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    Judul
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    Perusahaan
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    Tipe
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    Dibuat
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium" style={{ color: colors.base[600] }}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((p, idx) => (
                  <tr
                    key={p.id}
                    className="hover:bg-opacity-50 transition-colors"
                    style={{ borderBottom: idx < pageItems.length - 1 ? `1px solid ${colors.base[200]}` : "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.base[100])}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <td className="py-4 px-6 text-sm font-medium" style={{ color: colors.base[700] }}>
                      {p.id}
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <Link href={`/dashboard/hukum/detail-pengajuan/${p.id}`} className="text-sm font-medium hover:underline" style={{ color: colors.base[700] }}>
                          {p.proposalTitle}
                        </Link>
                        <div className="text-xs mt-1 text-gray-500">{p.technicalSpec?.slice?.(0, 120) ?? "-"}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm" style={{ color: colors.base[700] }}>
                      {p.companyName}
                    </td>
                    <td className="py-4 px-6 text-sm" style={{ color: colors.base[700] }}>
                      {p.serviceType}
                    </td>
                    <td className="py-4 px-6 text-sm" style={{ color: colors.base[700] }}>
                      {p.createdAt?.toDate ? p.createdAt.toDate().toLocaleString() : p.createdAt ?? "-"}
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(p.status)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button disabled={busyId === p.id} onClick={() => handleSetStatus(p.id, "under_review")} className="px-3 py-1 rounded text-sm" style={{ backgroundColor: colors.info[100], color: colors.info[700] }}>
                          {busyId === p.id && p.status === "under_review" ? "..." : "Mark Review"}
                        </button>
                        <button disabled={busyId === p.id} onClick={() => handleSetStatus(p.id, "approved")} className="px-3 py-1 rounded text-sm" style={{ backgroundColor: colors.success[100], color: colors.success[700] }}>
                          {busyId === p.id && p.status === "approved" ? "..." : "Approve"}
                        </button>
                        <button disabled={busyId === p.id} onClick={() => handleSetStatus(p.id, "rejected")} className="px-3 py-1 rounded text-sm" style={{ backgroundColor: colors.error[100], color: colors.error[700] }}>
                          {busyId === p.id && p.status === "rejected" ? "..." : "Reject"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pageItems.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-sm text-gray-500">
                      No proposals found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-4" style={{ borderTop: `1px solid ${colors.base[200]}` }}>
            <p className="text-sm" style={{ color: colors.base[600] }}>
              Menampilkan {Math.min(filtered.length, start + 1)} - {Math.min(filtered.length, start + itemsPerPage)} dari {filtered.length} proposal
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm hover:underline disabled:opacity-50" style={{ color: colors.base[600] }} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
                Previous
              </button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className="w-8 h-8 text-sm rounded"
                  style={{ backgroundColor: currentPage === i + 1 ? colors.primary[600] : "transparent", color: currentPage === i + 1 ? "#ffffff" : colors.base[600] }}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button className="px-3 py-2 text-sm hover:underline" style={{ color: colors.base[600] }} onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>
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
