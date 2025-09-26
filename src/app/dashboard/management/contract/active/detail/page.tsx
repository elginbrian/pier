"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dashboardService, { ContractDetails } from "@/services/dashboard";

// --- TypeScript Interfaces ---
interface IconProps {
  className?: string;
}

// --- SVG Icon Components ---
const BuildingIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);

const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const InfoIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const DownloadIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ArrowLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 12H6" />
    <path d="l-6-6 6 6-6 6" />
  </svg>
);

// --- Main Component ---
const ManagementContractActiveDetailsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const contractId = searchParams.get("id") || "KTR-001";
  const [contractData, setContractData] = useState<ContractDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const details = await dashboardService.getContractDetails(contractId);
        if (!mounted) return;
        setContractData(details);
      } catch (e) {
        console.error("Failed to load contract details", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [contractId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!contractData) return <div className="min-h-screen flex items-center justify-center">Contract not found</div>;

  const displayCompany = contractData.vendorName || contractData.title || "-";
  const displayType = contractData.technicalSpec || "-";
  const displayValue = contractData.contractValue || "-";
  const displayPeriod = contractData.startDate && contractData.endDate ? `${contractData.startDate} - ${contractData.endDate}` : contractData.startDate || contractData.endDate || "-";

  return (
    <div className="font-sans p-4 sm:p-6 lg:p-8 min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <BuildingIcon className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{displayCompany}</h1>
                <p className="text-slate-500">{displayType}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-green-800 bg-green-100 px-4 py-1.5 rounded-full">Kontrak Aktif</span>
              <span className="text-sm font-semibold text-blue-800 bg-blue-100 px-4 py-1.5 rounded-full">Berjalan Normal</span>
            </div>
          </div>
          <hr className="my-6 border-slate-200" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <p className="text-sm text-slate-500 mb-1">Nilai Kontrak</p>
              <p className="text-2xl font-bold">{displayValue}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Periode Kontrak</p>
              <p className="text-lg font-semibold">{displayPeriod}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Jenis Kontrak</p>
              <p className="text-lg font-semibold">{displayType}</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Ringkasan Kontrak</h2>
              <span className="flex items-center gap-2 text-sm font-semibold text-green-800 bg-green-100 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Kontrak Aktif
              </span>
            </div>

            {/* Company Details */}
            <div className="mb-6">
              <p className="text-lg font-semibold">PT. Digital Solutions Indonesia</p>
              <div className="flex flex-wrap justify-between text-sm text-slate-500 mt-2">
                <span>
                  Nomor Kontrak: <span className="font-semibold text-slate-700">CTR-2024-001</span>
                </span>
                <span>
                  Nilai Kontrak:{" "}
                  <a href="#" className="font-semibold text-blue-600">
                    Rp 2.5 Miliar
                  </a>
                </span>
                <span>
                  SLA Utama: <span className="font-semibold text-slate-700">99.5% Uptime</span>
                </span>
              </div>
            </div>

            {/* Contract Period */}
            <div className="mb-8">
              <p className="font-semibold text-sm mb-2 text-slate-600">
                <span role="img" aria-label="calendar">
                  🗓️
                </span>{" "}
                Periode Kontrak
              </p>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "80%" }}></div>
              </div>
              <div className="flex justify-between text-sm text-slate-500 mt-2">
                <span>
                  Mulai: <span className="font-bold text-slate-700">01 Jan 2024</span>
                </span>
                <span>
                  Berakhir: <span className="font-bold text-slate-700">31 Des 2024</span>
                </span>
              </div>
            </div>

            {/* Key Deliverables */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-3">Key Deliverables</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" /> Sistem Implementasi
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" /> Training & Support
                </li>
                <li className="flex items-center">
                  <InfoIcon className="w-5 h-5 text-slate-400 mr-3" /> Maintenance 1 Tahun
                </li>
              </ul>
            </div>

            {/* General Information */}
            <div>
              <h3 className="text-lg font-bold mb-4">Informasi Umum</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div>
                  <span className="text-slate-500">ID Kontrak:</span> <span className="font-semibold ml-2">SC001</span>
                </div>
                <div>
                  <span className="text-slate-500">Pihak Pertama:</span> <span className="font-semibold ml-2">PT. Maju Bersama</span>
                </div>
                <div>
                  <span className="text-slate-500">Pihak Kedua:</span> <span className="font-semibold ml-2">CV. Berkah Jaya</span>
                </div>
                <div>
                  <span className="text-slate-500">Judul:</span> <span className="font-semibold ml-2">Kontrak Penjualan Properti</span>
                </div>
                <div>
                  <span className="text-slate-500">Email:</span>{" "}
                  <a href="mailto:maju@email.com" className="font-semibold ml-2 text-blue-600">
                    maju@email.com
                  </a>
                </div>
                <div>
                  <span className="text-slate-500">Email:</span>{" "}
                  <a href="mailto:berkah@email.com" className="font-semibold ml-2 text-blue-600">
                    berkah@email.com
                  </a>
                </div>
                <div>
                  <span className="text-slate-500">Jenis:</span> <span className="font-semibold ml-2">Penjualan</span>
                </div>
                <div>
                  <span className="text-slate-500">Status:</span>
                  <span className="font-semibold ml-2 text-green-800 bg-green-100 px-2 py-0.5 rounded-md">Aktif</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold mb-3">Timeline</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tanggal Dibuat:</span>
                  <span className="font-semibold">10 Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tanggal Mulai:</span>
                  <span className="font-semibold">15 Jan 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tanggal Berakhir:</span>
                  <span className="font-semibold">15 Jan 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Durasi:</span>
                  <span className="font-semibold">365 hari</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold mb-3">Nilai & Risiko</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nilai Kontrak:</span>
                  <span className="font-semibold">Rp 2.500.000.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Level Risiko:</span>
                  <span className="text-sm font-semibold text-orange-800 bg-orange-100 px-3 py-1 rounded-full">Rendah</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Skor Risiko:</span>
                  <span className="font-semibold">2.5/10</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
              <DownloadIcon className="w-5 h-5 mr-2" />
              Unduh Kontrak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementContractActiveDetailsPage;
