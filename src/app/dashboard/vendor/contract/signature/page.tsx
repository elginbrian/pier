"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { uploadVendorSignature } from "@/services/dashboard";

interface ContractSignatureProps {
  contractData?: {
    id?: string;
    title?: string;
    contractValue?: string;
    startDate?: string;
    endDate?: string;
    companyName?: string;
  };
}

// --- SVG Icon Components ---
// Self-contained icons for the new component.

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ZoomInIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const HistoryIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M1 4v6h6" />
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const PdfIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <path d="M9 14a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1z"></path>
    <path d="M15 13h-1v3a1 1 0 0 1-1 1h-1"></path>
    <path d="M18 17h-1a1 1 0 0 1-1-1v-3h2"></path>
  </svg>
);

const EditIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const SignatureIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10.5c0 .8-.7 1.5-1.5 1.5H13v1h5.5c.8 0 1.5.7 1.5 1.5v.5c0 .8-.7 1.5-1.5 1.5H13v1h5.5c.8 0 1.5.7 1.5 1.5v.5c0 .8-.7 1.5-1.5 1.5h-12c-.8 0-1.5-.7-1.5-1.5v-1c0-.8.7-1.5 1.5-1.5H8v-1H3.5c-.8 0-1.5-.7-1.5-1.5V13c0-.8.7-1.5 1.5-1.5H8v-1H3.5c-.8 0-1.5-.7-1.5-1.5V10c0-2.2 1.8-4 4-4h1c2.2 0 4 1.8 4 4" />
  </svg>
);

// --- Main Component ---
export default function ContractSignature({ contractData }: ContractSignatureProps) {
  // Extract contract details with fallbacks
  const contractNumber = contractData?.id?.substring(0, 8) || "#2025-04";
  const projectName = contractData?.title || "Sistem Logistik Terintegrasi";
  const contractValue = contractData?.contractValue || "Rp 2.5 Miliar";
  const contractPeriod = calculatePeriod(contractData?.startDate, contractData?.endDate);
  const companyName = contractData?.companyName || "PT. Vendor";

  function calculatePeriod(startDate?: string, endDate?: string): string {
    if (!startDate || !endDate) return "12 Bulan";

    const start = new Date(startDate);
    const end = new Date(endDate);
    const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    return `${monthsDiff} Bulan`;
  }

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#111827";
  }, []);

  const handleFileButton = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(String(reader.result));
    };
    reader.readAsDataURL(f);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    drawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    canvas.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    drawing.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.closePath();
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch (err) {
      // ignore
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setFilePreview(null);
  };

  const handleConfirm = async () => {
    setError(null);
    setSuccess(false);
    if (!contractData?.id) {
      setError("Contract ID not available");
      return;
    }

    let dataUrl: string | null = null;

    // Prefer uploaded file preview if available
    if (filePreview) {
      dataUrl = filePreview;
    } else if (canvasRef.current) {
      dataUrl = canvasRef.current.toDataURL("image/png");
    }

    if (!dataUrl) {
      setError("No signature provided. Please draw or upload a signature.");
      return;
    }

    try {
      setLoading(true);
      const url = await uploadVendorSignature(contractData.id, dataUrl);
      if (!url) throw new Error("Upload failed");
      setUploadedUrl(url);
      setSuccess(true);
      // Refresh the parent route to fetch updated contract status
      try {
        router.refresh();
      } catch (e) {
        /* ignore */
      }
    } catch (e: any) {
      console.error("Signature upload failed", e);
      setError(e?.message || "Failed to upload signature");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 font-sans p-4 sm:p-6 lg:p-8 min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">Tanda Tangan Kontrak</h1>
          <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full">Pending Signature Vendor</span>
        </div>

        {/* Contract Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <p className="text-sm text-slate-500">Nomor Kontrak</p>
            <p className="font-bold text-lg">{contractNumber}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Nama Proyek</p>
            <p className="font-bold text-lg">{projectName}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Nilai Kontrak</p>
            <p className="font-bold text-lg">{contractValue}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Periode</p>
            <p className="font-bold text-lg">{contractPeriod}</p>
          </div>
        </div>

        {/* Status Alert */}
        <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-r-lg mb-8 flex items-center">
          <CheckCircleIcon className="w-6 h-6 mr-3 text-green-600" />
          <p>Kontrak telah disetujui oleh Manajemen ILCS. Mohon segera lakukan tanda tangan.</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Preview */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6">
            <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-xl font-semibold">Preview Kontrak Final</h2>
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <a href="#" className="flex items-center hover:text-indigo-600">
                  <DownloadIcon className="w-4 h-4 mr-1" /> Download PDF
                </a>
                <a href="#" className="flex items-center hover:text-indigo-600">
                  <ZoomInIcon className="w-4 h-4 mr-1" /> Zoom
                </a>
                <a href="#" className="flex items-center hover:text-indigo-600">
                  <HistoryIcon className="w-4 h-4 mr-1" /> Versi Sebelumnya
                </a>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
              <PdfIcon className="w-16 h-16 text-red-500 mb-4" />
              <p className="font-semibold text-lg">Dokumen Kontrak PDF</p>
              <p className="text-sm text-slate-500 mb-6">
                Kontrak_{companyName}_{contractNumber?.replace("#", "")}_Final.pdf
              </p>
              <div className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full flex items-center">
                <CheckCircleIcon className="w-4 h-4 mr-2" />
                Sudah ditandatangani ILCS
              </div>
            </div>
          </div>

          {/* Right: Signature Module */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Modul Tanda Tangan Vendor</h2>
            <div className="mb-4">
              <p className="font-semibold mb-2">Status Tanda Tangan</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-green-600">
                  <CheckCircleIcon className="w-5 h-5 mr-2" />
                  <span>ILCS - Sudah TTD</span>
                </div>
                <div className="flex items-center text-yellow-600">
                  <div className="w-5 h-5 mr-2 flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  </div>
                  <span>Vendor - Menunggu TTD</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm text-center mb-4">Silakan tanda tangani kontrak ini untuk mengaktifkannya.</div>

            {/* Upload / Draw Signature Area */}
            <div className="mb-4">
              <div className="flex gap-2">
                <button onClick={handleFileButton} className="flex-1 bg-white border border-slate-300 text-slate-700 py-2 px-3 rounded-lg hover:bg-slate-50">
                  Upload TTD
                </button>
                <button
                  onClick={() => {
                    clearCanvas();
                    setFilePreview(null);
                    setSuccess(false);
                    setError(null);
                  }}
                  className="flex-1 bg-white border border-slate-300 text-slate-700 py-2 px-3 rounded-lg hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
              <input ref={fileInputRef} onChange={handleFileChange} type="file" accept="image/*" className="hidden" />
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center text-slate-500 text-sm mb-4">
              <canvas
                ref={canvasRef}
                width={600}
                height={200}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="w-full h-40 touch-none bg-white rounded"
                style={{ display: filePreview ? "none" : "block" }}
              />

              {filePreview && (
                <div className="w-full">
                  <img src={filePreview} alt="preview" className="mx-auto max-h-40" />
                </div>
              )}

              <p className="text-xs mt-2">Gambar atau upload file tanda tangan</p>
            </div>

            <div className="mb-4">
              <button onClick={handleConfirm} className={`w-full ${loading ? "opacity-60 pointer-events-none" : ""} bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors`}>
                {loading ? "Mengunggah..." : "Konfirmasi & Selesaikan Tanda Tangan"}
              </button>
            </div>

            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            {success && uploadedUrl && (
              <div className="text-green-700 text-sm mb-2">
                Tanda tangan berhasil diunggah.{" "}
                <a href={uploadedUrl} target="_blank" rel="noreferrer" className="underline">
                  Lihat file
                </a>
              </div>
            )}

            <div className="space-y-2">
              <button onClick={() => router.back()} className="w-full bg-transparent text-slate-600 font-bold py-3 px-4 rounded-lg hover:bg-slate-100 transition-colors">
                Batalkan / Tinjau Ulang Kontrak
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
