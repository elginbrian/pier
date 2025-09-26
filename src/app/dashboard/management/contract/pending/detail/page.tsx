"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const AiRiskIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 7h0A2.5 2.5 0 0 1 7 4.5v0A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14 10.5c0 .8-.7 1.5-1.5 1.5h-1A1.5 1.5 0 0 1 10 10.5v0c0-.8.7-1.5 1.5-1.5h1A1.5 1.5 0 0 1 14 10.5Z" />
    <path d="M3.5 12A2.5 2.5 0 0 1 6 14.5v0A2.5 2.5 0 0 1 3.5 17h0A2.5 2.5 0 0 1 1 14.5v0A2.5 2.5 0 0 1 3.5 12Z" />
    <path d="M18 16.5c0 .8-.7 1.5-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v0c0-.8.7-1.5 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5Z" />
    <path d="M13 22a2.5 2.5 0 0 1 2.5-2.5v0a2.5 2.5 0 0 1 2.5 2.5h0a2.5 2.5 0 0 1-2.5 2.5v0A2.5 2.5 0 0 1 13 22Z" />
    <path d="M6.5 10c0 .8-.7 1.5-1.5 1.5h-1A1.5 1.5 0 0 1 2.5 10v0c0-.8.7-1.5 1.5-1.5h1A1.5 1.5 0 0 1 6.5 10Z" />
  </svg>
);

const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const WarningIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CloseIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SaveIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const PdfIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const SignatureIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10.5c0 .8-.7 1.5-1.5 1.5H13v1h5.5c.8 0 1.5.7 1.5 1.5v.5c0 .8-.7 1.5-1.5 1.5H13v1h5.5c.8 0 1.5.7 1.5 1.5v.5c0 .8-.7 1.5-1.5 1.5h-12c-.8 0-1.5-.7-1.5-1.5v-1c0-.8.7-1.5 1.5-1.5H8v-1H3.5c-.8 0-1.5-.7-1.5-1.5V13c0-.8.7-1.5 1.5-1.5H8v-1H3.5c-.8 0-1.5-.7-1.5-1.5V10c0-2.2 1.8-4 4-4h1c2.2 0 4 1.8 4 4" />
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
const PendingContractDetailsPage: React.FC = () => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!contractData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold">Contract not found</p>
        </div>
      </div>
    );
  }

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
              <span className="text-sm font-semibold text-yellow-800 bg-yellow-100 px-4 py-1.5 rounded-full">Final Draft</span>
              <span className="text-sm font-semibold text-orange-800 bg-orange-100 px-4 py-1.5 rounded-full">Pending Approval</span>
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
            {/* AI Risk Analysis */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AiRiskIcon className="w-7 h-7 text-indigo-600" />
                <h2 className="text-xl font-bold">Analisis Risiko AI</h2>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-semibold text-green-600">Risiko Rendah</span>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <span className="font-semibold text-slate-500">Score: 8.5/10</span>
              </div>
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">Tidak ada risiko hukum signifikan. SLA sesuai standar ILCS. Penalti keterlambatan disarankan untuk dipertahankan.</p>
              </div>
            </div>

            {/* SLA & KPI Checklist */}
            <div>
              <h3 className="text-lg font-bold mb-4">Checklist SLA & KPI</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" /> Uptime 99.5% terjamin
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" /> Response time &lt; 4 jam
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" /> Penalti keterlambatan 0.1%/hari
                </li>
                <li className="flex items-center">
                  <WarningIcon className="w-5 h-5 text-yellow-500 mr-3" /> Force majeure clause perlu review
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Management Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold mb-4">Aksi Manajemen</h3>
              <div className="space-y-2">
                <button className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                  <CheckCircleIcon className="w-5 h-5 mr-2" /> Setujui Kontrak
                </button>
                <button className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                  <CloseIcon className="w-5 h-5 mr-2" /> Tolak / Minta Revisi
                </button>
                <button className="w-full bg-slate-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors">
                  <SaveIcon className="w-5 h-5 mr-2" /> Simpan untuk Ditinjau Nanti
                </button>
              </div>
            </div>

            {/* Digital Signature */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold mb-4">Tanda Tangan Digital</h3>
              <div className="bg-slate-50 border rounded-lg p-3 flex items-center gap-3 mb-4">
                <PdfIcon className="w-8 h-8 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Contract_TMB_2024.pdf</p>
                  <p className="text-xs text-slate-500">2.3 MB • 15 halaman</p>
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors">
                  <SignatureIcon className="w-5 h-5 mr-2" /> Tanda Tangani Digital
                </button>
                <button className="w-full bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors">
                  <DownloadIcon className="w-5 h-5 mr-2" /> Unduh untuk TT Fisik
                </button>
              </div>
            </div>

            {/* Progress Status */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold mb-4">Status Progress</h3>
              <div className="relative pl-4">
                {/* Vertical line */}
                <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-200"></div>

                <div className="relative mb-6">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white"></div>
                  <p className="font-semibold text-sm ml-6">Menunggu Persetujuan Manajemen</p>
                </div>
                <div className="relative mb-6">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-slate-300 rounded-full border-4 border-white"></div>
                  <p className="text-sm text-slate-500 ml-6">Menunggu Tanda Tangan Vendor</p>
                </div>
                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-slate-300 rounded-full border-4 border-white"></div>
                  <p className="text-sm text-slate-500 ml-6">Selesai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingContractDetailsPage;
