'use client';

import React from 'react';
import { colors } from '@/design-system';

interface DeclinedContractUIProps {
    // You can add props here if needed for data passing
}

export default function DeclinedContractUI({ }: DeclinedContractUIProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Contract Details */}
            <div className="lg:col-span-2 space-y-6">
                <div className="rounded-lg shadow-sm p-6" style={{ backgroundColor: '#ffffff' }}>
                    {/* Contract Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1
                                className="text-2xl font-bold mb-2"
                                style={{ color: colors.base[700] }}
                            >
                                Draft Kontrak Revisi - ILCS
                            </h1>
                        </div>
                        <button
                            className="p-2 rounded-lg flex items-center space-x-2"
                            style={{ backgroundColor: colors.base[100] }}
                        >
                            <img src="/download-draft.svg" alt="Required" className="inline w-4 h-4" />
                            <span>Unduh Draft</span>
                        </button>
                    </div>
                </div>

                <div className="rounded-lg shadow-sm p-6" style={{ backgroundColor: '#ffffff' }}>
                    {/* Contract Content Sections */}
                    <div
                        className="rounded-lg p-6 border"
                        style={{
                            backgroundColor: colors.primary[100],
                            borderColor: colors.primary[200]
                        }}
                    >
                        <h3
                            className="font-bold text-lg mb-4"
                            style={{ color: colors.primary[700] }}
                        >
                            KONTRAK PENGADAAN JASA LOGISTIK
                        </h3>
                        <p
                            className="text-sm mb-4"
                            style={{ color: colors.primary[600] }}
                        >
                            Nomor: ILCS/2024/LGG/001
                        </p>
                    </div>

                    {/* Contract Sections */}
                    <div className="space-y-4">
                        <div
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: '#ffffff', border: `1px solid ${colors.base[200]}` }}
                        >
                            <h4 className="font-semibold mb-2" style={{ color: colors.base[700] }}>
                                PASAL 1 - RUANG LINGKUP PEKERJAAN
                            </h4>
                            <p className="text-sm" style={{ color: colors.base[600] }}>
                                Vendor berkewajiban menyediakan layanan logistik terintegrasi meliputi penyimpanan, distribusi, dan manajemen inventori untuk PT ILCS.
                            </p>
                        </div>

                        <div
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: colors.warning[100], border: `1px solid ${colors.warning[300]}` }}
                        >
                            <h4 className="font-semibold mb-2" style={{ color: colors.warning[700] }}>
                                PASAL 2 - JANGKA WAKTU KONTRAK
                            </h4>
                            <p className="text-sm mb-2" style={{ color: colors.warning[600] }}>
                                Kontrak ini berlaku selama 24 (dua puluh empat) bulan terhitung sejak tanggal penandatanganan, dengan kemungkinan perpanjangan berdasarkan evaluasi kinerja.
                            </p>
                            <div className="flex items-center text-xs" style={{ color: colors.warning[600] }}>
                                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                    <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
                                </svg>
                                Revisi dari ILCS
                            </div>
                        </div>

                        <div
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: '#ffffff', border: `1px solid ${colors.base[200]}` }}
                        >
                            <h4 className="font-semibold mb-2" style={{ color: colors.base[700] }}>
                                PASAL 3 - NILAI KONTRAK
                            </h4>
                            <p className="text-sm" style={{ color: colors.base[600] }}>
                                Total nilai kontrak sebesar Rp 2.500.000.000 (dua miliar lima ratus juta rupiah) sudah termasuk PPN.
                            </p>
                        </div>

                        <div
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: colors.error[100], border: `1px solid ${colors.error[300]}` }}
                        >
                            <h4 className="font-semibold mb-2" style={{ color: colors.error[700] }}>
                                PASAL 4 - PENALTI KETERLAMBATAN
                            </h4>
                            <p className="text-sm mb-2" style={{ color: colors.error[600] }}>
                                Apabila Vendor terlambat dalam pelaksanaan pekerjaan, maka akan dikenakan denda sebesar 0,5% per hari dari total nilai kontrak dengan maksimal 10% dari total nilai kontrak.
                            </p>
                            <div className="flex items-center text-xs" style={{ color: colors.error[600] }}>
                                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeWidth="2" />
                                    <line x1="12" y1="9" x2="12" y2="13" strokeWidth="2" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2" />
                                </svg>
                                Perlu Tinjau - AI Detection
                            </div>
                        </div>

                        <div
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: colors.success[100], border: `1px solid ${colors.success[300]}` }}
                        >
                            <h4 className="font-semibold mb-2" style={{ color: colors.success[700] }}>
                                PASAL 5 - PEMBAYARAN
                            </h4>
                            <p className="text-sm mb-2" style={{ color: colors.success[600] }}>
                                Pembayaran dilakukan secara bertahap sesuai dengan milestone yang telah disepakati dengan termin 30 hari setelah invoice diterima.
                            </p>
                            <div className="flex items-center text-xs" style={{ color: colors.success[600] }}>
                                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <polyline points="20,6 9,17 4,12" strokeWidth="2" />
                                </svg>
                                Manual Review
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Actions */}
            <div className="space-y-6">
                {/* Aksi Vendor */}
                <div className="rounded-lg shadow-sm p-6" style={{ backgroundColor: '#ffffff' }}>
                    <h3 className="font-semibold mb-4" style={{ color: colors.base[700] }}>
                        Aksi Vendor
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center mb-3">
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke={colors.primary[500]}>
                                    <path d="M7 10l5 5 5-5" strokeWidth="2" />
                                </svg>
                                <span className="font-medium" style={{ color: colors.primary[500] }}>
                                    Komentar Vendor
                                </span>
                            </div>
                            <textarea
                                className="w-full px-3 py-2 rounded-lg text-sm"
                                style={{
                                    border: `1px solid ${colors.base[300]}`,
                                    backgroundColor: colors.base[100]
                                }}
                                placeholder="Tulis tanggapan Anda terhadap revisi ini"
                                rows={3}
                            />
                            <button
                                className="mt-3 px-4 py-2 rounded-lg font-medium text-white text-sm"
                                style={{ backgroundColor: colors.primary[500] }}
                            >
                                + Tambah Komentar
                            </button>
                        </div>
                    </div>

                    {/* Usulan Revisi Klausul */}
                    <div className="flex items-center mb-4">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke={colors.primary[500]}>
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeWidth="2" />
                        </svg>
                        <span className="font-medium" style={{ color: colors.primary[500] }}>
                            Usulan Revisi Klausul
                        </span>
                    </div>
                    <button
                        className="w-full px-4 py-2 rounded-lg font-medium text-sm border"
                        style={{
                            borderColor: colors.primary[300],
                            color: colors.primary[600],
                            backgroundColor: colors.primary[100]
                        }}
                    >
                        + Tambahkan Revisi Klausul
                    </button>

                    {/* Riwayat Versi Kontrak */}
                    <div className="flex items-center mb-4">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke={colors.base[500]}>
                            <circle cx="12" cy="12" r="3" strokeWidth="2" />
                            <path d="M12 1v6m0 6v6" strokeWidth="2" />
                        </svg>
                        <span className="font-medium" style={{ color: colors.base[700] }}>
                            Riwayat Versi Kontrak
                        </span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium text-sm" style={{ color: colors.base[700] }}>Versi 1</p>
                                <p className="text-xs" style={{ color: colors.base[500] }}>Proposal Awal</p>
                            </div>
                            <span className="text-xs px-2 py-1 rounded" style={{
                                backgroundColor: colors.base[100],
                                color: colors.base[600]
                            }}>
                                15 Jan 2024
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium text-sm" style={{ color: colors.base[700] }}>Versi 2</p>
                                <p className="text-xs" style={{ color: colors.base[500] }}>Revisi ILCS</p>
                            </div>
                            <span className="text-xs px-2 py-1 rounded" style={{
                                backgroundColor: colors.warning[100],
                                color: colors.warning[600]
                            }}>
                                Aktif
                            </span>
                        </div>

                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium text-sm" style={{ color: colors.base[700] }}>Versi 3</p>
                                <p className="text-xs" style={{ color: colors.base[500] }}>Revisi Vendor</p>
                            </div>
                            <span className="text-xs px-2 py-1 rounded" style={{
                                backgroundColor: colors.base[100],
                                color: colors.base[600]
                            }}>
                                Pending
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            className="w-full px-6 py-3 rounded-lg font-semibold text-white flex items-center justify-center"
                            style={{ backgroundColor: colors.primary[500] }}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" strokeWidth="2" />
                                <polyline points="17,21 17,13 7,13 7,21" strokeWidth="2" />
                                <polyline points="7,3 7,8 15,8" strokeWidth="2" />
                            </svg>
                            Submit Revisi Balik
                        </button>

                        <button
                            className="w-full px-6 py-3 rounded-lg font-semibold text-white flex items-center justify-center"
                            style={{ backgroundColor: colors.success[500] }}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <polyline points="20,6 9,17 4,12" strokeWidth="2" />
                            </svg>
                            Setujui Draft ILCS
                        </button>

                        <button
                            className="w-full px-6 py-3 rounded-lg font-semibold border flex items-center justify-center"
                            style={{
                                borderColor: colors.base[300],
                                backgroundColor: colors.base[100],
                                color: colors.base[600]
                            }}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" />
                                <polyline points="14,2 14,8 20,8" strokeWidth="2" />
                            </svg>
                            Simpan Draft Saya
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}