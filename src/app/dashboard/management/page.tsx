"use client";

import React, { useEffect, useState } from "react";
import { colors } from "@/design-system";
import LineChart from "@/components/LineChart";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardCard from "@/components/DashboardCard";
import dashboardService, { calculateDashboardStats, Contract } from "@/services/dashboard";

export default function ManagementDashboardPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [stats, setStats] = useState(() => ({ activeContracts: 0, pendingProposals: 0, expiringContracts: 0, totalValue: 0 }));

  useEffect(() => {
    const unsub = dashboardService.subscribeToAllData(({ contracts: c, stats: s }) => {
      setContracts(c || []);
      setStats(s || { activeContracts: 0, pendingProposals: 0, expiringContracts: 0, totalValue: 0 });
    });

    return () => unsub && unsub();
  }, []);

  // Build simple chart data (months placeholder) from contracts createdAt
  const chartData = React.useMemo(() => {
    // Group contracts by month (last 12 months)
    const months: Record<string, { month: string; aktif: number; selesai: number }> = {};
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      const label = d.toLocaleString(undefined, { month: "short" });
      months[key] = { month: label, aktif: 0, selesai: 0 };
    }

    (contracts || []).forEach((c) => {
      try {
        const created = c.createdAt?.toDate ? c.createdAt.toDate() : new Date(c.createdAt || Date.now());
        const key = `${created.getFullYear()}-${created.getMonth() + 1}`;
        if (!months[key]) return;
        if (c.status === "active") months[key].aktif += 1;
        if (c.status === "expired" || c.status === "terminated") months[key].selesai += 1;
      } catch (e) {
        // ignore
      }
    });

    return Object.values(months);
  }, [contracts]);

  const timelineContracts = React.useMemo(() => {
    // take up to 4 soonest expiring active contracts
    const activeWithEnd = (contracts || [])
      .filter((c) => c.status === "active" && c.endDate)
      .map((c) => ({
        ...c,
        endDateObj: new Date(c.endDate),
      }));
    activeWithEnd.sort((a, b) => (a.endDateObj as any).getTime() - (b.endDateObj as any).getTime());
    return activeWithEnd.slice(0, 4).map((c, idx) => ({
      id: c.id,
      company: c.vendorName,
      expiry: `Berakhir: ${c.endDate}`,
      daysLeft: (() => {
        try {
          const diff = Math.ceil((new Date(c.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          return `${diff} hari`;
        } catch (e) {
          return "-";
        }
      })(),
      status: c.daysRemaining && c.daysRemaining <= 5 ? "urgent" : c.daysRemaining && c.daysRemaining <= 15 ? "warning" : "normal",
      borderColor: c.daysRemaining && c.daysRemaining <= 5 ? colors.error[500] : c.daysRemaining && c.daysRemaining <= 15 ? colors.warning[500] : colors.primary[500],
    }));
  }, [contracts]);

  const statusData = React.useMemo(() => {
    const total = contracts.length;
    const aktif = contracts.filter((c) => c.status === "active").length;
    const pending = contracts.filter((c) => c.status === "pending").length;
    const expired = contracts.filter((c) => c.status === "expired").length;
    return [
      { label: "Aktif", count: aktif, color: colors.success[300], textColor: colors.success[500] },
      { label: "Pending Review", count: pending, color: colors.secondary ? colors.secondary[200] : colors.base[200], textColor: colors.secondary ? colors.secondary[400] : colors.base[600] },
      { label: "Expired", count: expired, color: colors.error[300], textColor: colors.error[500] },
      { label: "Total", count: total, color: colors.base[400], textColor: colors.base[600] },
    ];
  }, [contracts]);

  const getDaysColor = (daysLeft: string) => {
    const days = parseInt(daysLeft);
    if (isNaN(days)) return colors.primary[500];
    if (days <= 5) return colors.error[500];
    if (days <= 15) return colors.warning[500];
    if (days <= 30) return colors.warning[400];
    return colors.primary[500];
  };

  return (
    <DashboardContainer>
      <div className="pt-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statusData.map((card, idx) => (
            <DashboardCard key={idx}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm mb-1" style={{ color: colors.base[500] }}>
                    {card.label}
                  </p>
                  <p className="text-3xl font-bold" style={{ color: colors.base[700] }}>
                    {card.count}
                  </p>
                </div>
                <img src={idx === 0 ? "/tick-fill.svg" : idx === 1 ? "/pending-fill.svg" : idx === 2 ? "/warning-fill.svg" : "/management-file.svg"} alt={card.label} className="w-8 h-8 rounded-lg object-contain" />
              </div>
            </DashboardCard>
          ))}
        </div>

        {/* Linimasa Kontrak Chart */}
        <h2 className="text-lg font-semibold mb-3" style={{ color: colors.base[700] }}>
          Linimasa Kontrak
        </h2>
        <DashboardCard className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm font-medium" style={{ color: colors.base[700] }}>
              Tahun 2025
            </div>
          </div>

          <div className="rounded-lg p-4" style={{ height: "320px", backgroundColor: colors.base[100] }}>
            <LineChart data={chartData} height={280} />
          </div>
        </DashboardCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timeline Tenggat Waktu */}
          <DashboardCard>
            <h2 className="text-lg font-semibold pb-2" style={{ color: colors.base[700] }}>
              Timeline Tenggat Waktu
            </h2>
            <div className="space-y-4 mt-4">
              {timelineContracts.length === 0 && <p className="text-sm text-slate-500">Tidak ada kontrak aktif dengan tanggal akhir.</p>}
              {timelineContracts.map((contract, index) => (
                <div
                  className={`flex items-start gap-4 p-2 rounded-lg border-l-4`}
                  style={{
                    borderColor: contract.borderColor,
                    backgroundColor: `${contract.borderColor}1a`,
                  }}
                  key={index}
                >
                  <div className="flex items-center w-full space-x-4">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: contract.borderColor, minWidth: "1rem", minHeight: "1rem" }}></div>
                    <div>
                      <h3 className="text-sm font-semibold mb-1" style={{ color: colors.base[700] }}>
                        {contract.company}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: colors.base[500] }}>
                        {contract.expiry}
                      </p>
                    </div>
                    <span className="text-sm font-semibold ml-auto" style={{ color: getDaysColor(contract.daysLeft) }}>
                      {contract.daysLeft}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          {/* Status Kontrak */}
          <DashboardCard>
            <h2 className="text-lg font-semibold pb-2" style={{ color: colors.base[700] }}>
              Status Kontrak
            </h2>
            <div className="space-y-4 mt-4">
              {statusData.map((status, index) => (
                <div key={index} className="flex items-center py-3 rounded-lg" style={{ backgroundColor: `${status.color}33` }}>
                  <div className="flex items-center w-full space-x-2 px-4">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: status.color, minWidth: "1rem", minHeight: "1rem" }}></div>
                    <span className="text-sm font-bold w-full" style={{ color: colors.base[700] }}>
                      {status.label}
                    </span>
                    <span className="text-lg font-bold pr-4 text-end" style={{ color: status.textColor }}>
                      {status.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardContainer>
  );
}
