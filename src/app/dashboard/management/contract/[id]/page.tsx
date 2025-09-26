"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { colors } from "@/design-system";
import Spinner from "@/components/Spinner";
import dashboardService, { ContractDetails } from "@/services/dashboard";

const ManagementContractDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = (params as any)?.id as string | undefined;

  const [contract, setContract] = useState<ContractDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const details = await dashboardService.getContractDetails(id);
        if (!mounted) return;
        setContract(details);
      } catch (e) {
        console.error("Failed to load management contract details", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (!contract) return <div className="min-h-screen flex items-center justify-center">Contract not found</div>;

  const displayCompany = contract.vendorName || contract.title || "-";
  const displayType = contract.technicalSpec || "-";
  const displayValue = contract.contractValue || "-";
  const displayPeriod = contract.startDate && contract.endDate ? `${contract.startDate} - ${contract.endDate}` : contract.startDate || contract.endDate || "-";

  return (
    <div className="font-sans p-4 sm:p-6 lg:p-8 min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: colors.base[700] }}>
              {displayCompany}
            </h1>
            <p className="text-sm" style={{ color: colors.base[600] }}>
              {displayType}
            </p>
          </div>
          <div>
            <button onClick={() => router.back()} className="px-4 py-2 rounded" style={{ border: `1px solid ${colors.base[300]}` }}>
              Kembali
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold mb-4">Ringkasan Kontrak</h2>
            <div className="mb-6">
              <p className="text-lg font-semibold">{contract.title}</p>
              <div className="flex flex-wrap justify-between text-sm text-slate-500 mt-2">
                <span>
                  Nomor Kontrak: <span className="font-semibold">{contract.id}</span>
                </span>
                <span>
                  Nilai Kontrak: <span className="font-semibold text-slate-700">{displayValue}</span>
                </span>
                <span>
                  SLA Utama: <span className="font-semibold text-slate-700">{contract.slaRequirements?.join?.(", ") ?? "-"}</span>
                </span>
              </div>
            </div>

            <div className="mb-8">
              <p className="font-semibold text-sm mb-2 text-slate-600">Periode Kontrak</p>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${contract.progress || 0}%` }}></div>
              </div>
              <div className="flex justify-between text-sm text-slate-500 mt-2">
                <span>
                  Mulai: <span className="font-bold text-slate-700">{contract.startDate || "-"}</span>
                </span>
                <span>
                  Berakhir: <span className="font-bold text-slate-700">{contract.endDate || "-"}</span>
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">Key Deliverables</h3>
              <ul className="space-y-2">
                {(contract.deliverables || []).map((d, i) => (
                  <li key={i} className="text-sm">
                    • {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold mb-3">Timeline</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tanggal Dibuat:</span>
                  <span className="font-semibold">{contract.createdAt?.toDate ? contract.createdAt.toDate().toLocaleString() : contract.createdAt ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tanggal Mulai:</span>
                  <span className="font-semibold">{contract.startDate || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tanggal Berakhir:</span>
                  <span className="font-semibold">{contract.endDate || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Durasi:</span>
                  <span className="font-semibold">{contract.daysRemaining ?? "-"} hari</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold mb-3">Nilai & Risiko</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nilai Kontrak:</span>
                  <span className="font-semibold">{displayValue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Level Risiko:</span>
                  <span className="text-sm font-semibold text-orange-800 bg-orange-100 px-3 py-1 rounded-full">{(contract as any)?.level ?? "Rendah"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Skor Risiko:</span>
                  <span className="font-semibold">{Math.round(((contract.progress ?? 0) / 10) * 10) / 10}/10</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">Unduh Kontrak</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementContractDetailPage;
