import React from 'react';

// --- SVG Icon Components ---
// Using inline SVG for icons to keep everything in one file.

const CheckCircleIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LockClosedIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const ChartBarIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const DocumentTextIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

const ChartSquareBarIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V5.75A2.25 2.25 0 0018 3.5H6A2.25 2.25 0 003.75 5.75v12.5A2.25 2.25 0 006 20.25z" />
    </svg>
);

const SignatureIcon = ({ className = "w-6 h-6" }) => (
     <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

const DownloadIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const EyeIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const ArrowLeftIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);


// --- Reusable Components ---

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
    {children}
  </div>
);

interface ProgressBarProps {
  label: string;
  value: number;
}

const ProgressBar = ({ label, value }: ProgressBarProps) => (
  <div>
    <div className="flex justify-between items-center mb-1 text-sm text-gray-600">
      <span>{label}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${value}%` }}></div>
    </div>
  </div>
);


// --- Main Component ---

export default function ContractCompletedUI() {
  const score = 8.5;
  const circumference = 2 * Math.PI * 52; // Assuming radius of 52
  const strokeDashoffset = circumference - (score / 10) * circumference;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Contract Status Card */}
          <Card>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Status Kontrak</h1>
              <span className="flex items-center gap-2 bg-teal-100 text-teal-700 font-semibold px-4 py-1.5 rounded-full text-sm mt-2 sm:mt-0">
                <CheckCircleIcon className="w-5 h-5" />
                Contract Completed
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-600">Completed</span>
              <span>•</span>
              <span>Kontrak ID: CS-2024-001</span>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md flex items-start gap-4">
              <LockClosedIcon className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-800">Kontrak Telah Ditutup</h3>
                <p className="text-sm text-blue-700">
                  Kontrak ini telah ditutup dan diarsipkan di repository. Tidak dapat diubah.
                </p>
              </div>
            </div>
          </Card>

          {/* Vendor Performance Evaluation Card */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <ChartBarIcon className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-800">Evaluasi Kinerja Vendor</h2>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Score Circle */}
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 120 120">
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="52"
                      cx="60"
                      cy="60"
                    />
                    <circle
                      className="text-teal-500"
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="52"
                      cx="60"
                      cy="60"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-800">{score}</span>
                    <span className="text-sm text-gray-500">/10</span>
                  </div>
                </div>
                <div className="text-center mt-3">
                    <p className="font-semibold text-gray-700">Skor Rata-rata</p>
                    <p className="text-sm text-gray-500">Berdasarkan KPI/SLA</p>
                </div>
              </div>
              {/* Progress Bars */}
              <div className="w-full flex-1 flex flex-col gap-5">
                <ProgressBar label="Kualitas Deliverable" value={90} />
                <ProgressBar label="Ketepatan Waktu" value={80} />
                <ProgressBar label="Komunikasi" value={85} />
              </div>
            </div>
          </Card>
          
          {/* Contract Archive Card */}
          <Card>
            <div className="flex items-center gap-3 mb-5">
              <DocumentTextIcon className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-800">Arsip Kontrak</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <DocumentTextIcon className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Dokumen Final</p>
                    <p className="text-sm text-gray-500">Kontrak_Final.pdf</p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <ChartSquareBarIcon className="w-8 h-8 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Laporan Evaluasi</p>
                    <p className="text-sm text-gray-500">Evaluation_Report.pdf</p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <SignatureIcon className="w-8 h-8 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Bukti Tanda Tangan</p>
                    <p className="text-sm text-gray-500">Signature_Proof.pdf</p>
                  </div>
                </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* Quick Actions Card */}
          <Card>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Aksi Cepat</h2>
            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                <DownloadIcon className="w-5 h-5"/>
                Unduh Arsip Kontrak
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-teal-600 transition-colors">
                <EyeIcon className="w-5 h-5"/>
                Lihat Evaluasi
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300">
                <ArrowLeftIcon className="w-5 h-5"/>
                Kembali ke Daftar
              </button>
            </div>
          </Card>

          {/* Contract Summary Card */}
          <Card>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Kontrak</h2>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Vendor:</span>
                    <span className="font-semibold text-gray-800 text-right">PT. Tech Solutions</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Nilai:</span>
                    <span className="font-semibold text-gray-800">Rp 500.000.000</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Durasi:</span>
                    <span className="font-semibold text-gray-800">12 Bulan</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Tanggal Selesai:</span>
                    <span className="font-semibold text-gray-800">15 Jan 2024</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-semibold text-green-600">Completed</span>
                </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}