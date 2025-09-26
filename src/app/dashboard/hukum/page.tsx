"use client";

import React, { useEffect, useMemo, useState } from "react";
import { colors } from "@/design-system";
import Spinner from "../../../components/Spinner";
import { useAuth } from "../../../context/AuthContext";
import { subscribeToProposals } from "@/services/proposals";
import Link from "next/link";

const HukumDashboard = () => {
  const { user, loading } = useAuth();
  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "hukum") return;

    const unsubscribe = subscribeToProposals((items) => {
      setProposals(items as any[]);
    });

    return () => unsubscribe && unsubscribe();
  }, [user, loading]);

  const stats = useMemo(() => {
    const total = proposals.length;
    const draft = proposals.filter((p) => p.status === "draft" || p.status === "pending").length;
    const review = proposals.filter((p) => p.status === "under_review").length;
    const active = proposals.filter((p) => p.status === "approved" || p.status === "active").length;

    return [
      { title: "Total Pengajuan", value: String(total), bgColor: colors.primary[100], iconColor: colors.primary[600] },
      { title: "Draft/Pending", value: String(draft), bgColor: colors.base[100], iconColor: colors.base[600] },
      { title: "In Review", value: String(review), bgColor: colors.warning[100], iconColor: colors.warning[600] },
      { title: "Disetujui/Aktif", value: String(active), bgColor: colors.success[100], iconColor: colors.success[600] },
    ];
  }, [proposals]);

  const latest = proposals.slice(0, 6);

  const notifications = useMemo(() => {
    // Create simple notifications based on statuses
    const notes: any[] = [];
    const waiting = proposals.filter((p) => p.status === "pending" || p.status === "under_review");
    if (waiting.length > 0) {
      notes.push({ title: `${waiting.length} pengajuan menunggu tindakan`, description: "Periksa pengajuan terbaru dan lakukan review.", dotColor: colors.warning[500] });
    }

    const rejected = proposals.filter((p) => p.status === "rejected");
    if (rejected.length > 0) {
      notes.push({ title: `${rejected.length} pengajuan ditolak`, description: "Beberapa pengajuan ditolak. Lihat detail untuk komentar.", dotColor: colors.error[500] });
    }

    const approved = proposals.filter((p) => p.status === "approved" || p.status === "active");
    if (approved.length > 0) {
      notes.push({ title: `${approved.length} pengajuan disetujui`, description: "Pengajuan yang disetujui telah diproses.", dotColor: colors.success[500] });
    }

    return notes;
  }, [proposals]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size={48} />
      </div>
    );
  }

  if (!user || user.role !== "hukum") {
    return null;
  }

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
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={stat.iconColor}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" />
                    <polyline points="14,2 14,8 20,8" strokeWidth="2" />
                    <line x1="16" y1="13" x2="8" y2="13" strokeWidth="2" />
                    <line x1="16" y1="17" x2="8" y2="17" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Proposals */}
        <div className="rounded-lg shadow-sm mb-8" style={{ backgroundColor: "#ffffff" }}>
          <div className="p-6" style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold" style={{ color: colors.base[700] }}>
                Pengajuan Terbaru
              </h2>
              <Link href="/dashboard/hukum/detail-pengajuan" className="text-sm font-medium hover:underline" style={{ color: colors.primary[600] }}>
                Lihat Semua
              </Link>
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${colors.base[200]}` }}>
            {latest.length === 0 && (
              <div className="p-6 text-sm" style={{ color: colors.base[600] }}>
                Belum ada pengajuan.
              </div>
            )}

            {latest.map((p, index) => (
              <div key={p.id || index}>
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
                        <Link href={`/dashboard/hukum/detail-pengajuan/${p.id}`} className="hover:underline">
                          {p.proposalTitle || p.proposal_title || "-"}
                        </Link>
                      </h3>
                      <p className="text-sm" style={{ color: colors.base[600] }}>
                        {p.companyName || p.company_name || "-"} - {p.createdAt ? new Date(p.createdAt.seconds * 1000).toLocaleString() : "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className="px-3 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: p.status === "approved" || p.status === "active" ? colors.success[100] : p.status === "rejected" ? colors.error[100] : colors.warning[100],
                        color: p.status === "approved" || p.status === "active" ? colors.success[700] : p.status === "rejected" ? colors.error[700] : colors.warning[700],
                      }}
                    >
                      {p.status}
                    </span>

                    <Link href={`/dashboard/hukum/detail-pengajuan/${p.id}`} className="text-sm font-medium hover:underline" style={{ color: colors.primary[600] }}>
                      Detail
                    </Link>
                  </div>
                </div>
                {index < latest.length - 1 && <div style={{ borderTop: `1px solid ${colors.base[200]}` }}></div>}
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
            {notifications.length === 0 && (
              <div className="p-6 text-sm" style={{ color: colors.base[600] }}>
                Tidak ada notifikasi.
              </div>
            )}

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
