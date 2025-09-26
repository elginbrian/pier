import React from 'react';

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
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const ZoomInIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
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
    const contractNumber = contractData?.id?.substring(0, 8) || '#2025-04';
    const projectName = contractData?.title || 'Sistem Logistik Terintegrasi';
    const contractValue = contractData?.contractValue || 'Rp 2.5 Miliar';
    const contractPeriod = calculatePeriod(contractData?.startDate, contractData?.endDate);
    const companyName = contractData?.companyName || 'PT. Vendor';
    
    function calculatePeriod(startDate?: string, endDate?: string): string {
        if (!startDate || !endDate) return '12 Bulan';
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        const monthsDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        
        return `${monthsDiff} Bulan`;
    }

    return (
        <div className="bg-slate-100 font-sans p-4 sm:p-6 lg:p-8 min-h-screen text-slate-800">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold">Tanda Tangan Kontrak</h1>
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-full">
                        Pending Signature Vendor
                    </span>
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
                                <a href="#" className="flex items-center hover:text-indigo-600"><DownloadIcon className="w-4 h-4 mr-1" /> Download PDF</a>
                                <a href="#" className="flex items-center hover:text-indigo-600"><ZoomInIcon className="w-4 h-4 mr-1" /> Zoom</a>
                                <a href="#" className="flex items-center hover:text-indigo-600"><HistoryIcon className="w-4 h-4 mr-1" /> Versi Sebelumnya</a>
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded-lg flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
                            <PdfIcon className="w-16 h-16 text-red-500 mb-4" />
                            <p className="font-semibold text-lg">Dokumen Kontrak PDF</p>
                            <p className="text-sm text-slate-500 mb-6">Kontrak_{companyName}_{contractNumber?.replace('#', '')}_Final.pdf</p>
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

                        <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm text-center mb-4">
                            Silakan tanda tangani kontrak ini untuk mengaktifkannya.
                        </div>
                        
                        <button className="w-full bg-white border-2 border-indigo-600 text-indigo-600 font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-indigo-50 transition-colors mb-4">
                            <SignatureIcon className="w-5 h-5 mr-2" />
                            Tanda Tangani Secara Digital
                        </button>
                        
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center text-slate-500 text-sm mb-4">
                            <EditIcon className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                            Area Tanda Tangan Digital
                            <p className="text-xs">Gambar atau upload file tanda tangan</p>
                        </div>
                        
                        <button className="w-full bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors mb-6">
                           <DownloadIcon className="w-5 h-5 mr-2" />
                           Unduh untuk TTD Fisik
                        </button>
                        
                        <div className="space-y-2">
                           <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                                Konfirmasi & Selesaikan Tanda Tangan
                            </button>
                           <button className="w-full bg-transparent text-slate-600 font-bold py-3 px-4 rounded-lg hover:bg-slate-100 transition-colors">
                                Batalkan / Tinjau Ulang Kontrak
                           </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
