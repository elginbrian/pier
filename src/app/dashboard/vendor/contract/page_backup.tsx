'use client';

import React from 'react';
import { colors } from '../../../../design-system';
import ContractStepper from '../../../../components/ContractStepper';
import ContractAlert from '../../../../components/ContractAlert';
import DeclinedContractUI from '../../../../components/DeclinedContractUI';
import NormalContractForm from '../../../../components/NormalContractForm';

export default function ContractReviewPage() {
  const [formData, setFormData] = React.useState({
    companyName: 'PT Vendor Teknologi',
    contactPerson: 'Audit',
    proposalTitle: 'KONTRAK 1',
    serviceType: 'LAYANAN',
    technicalSpec: 'Implementasi Sistem Manajemen Kontrak Digital Terintegrasi (DCMS) berbasis AI untuk otomatisasi drafting, review, dan pelacakan perjanjian-pengiriman (shipping agreements) dan kontrak vendor. Layanan mencakup kustomisasi alur kerja persetujuan, integrasi API dengan sistem ERP klien, serta pelatihan pengguna (hingga 75 user). Kapasitas penyimpanan cloud 1 TB.',
    startDate: '2025-11-01',
    endDate: '2026-05-01',
    contractValue: '950000000',
    paymentTerms: 'Pembayaran dibagi menjadi 3 termin (3-). Termin 1(20%): Pembayaran di muka setelah penandatanganan kontrak. Termin 2(50%): Setelah deployment sistem dan UAT (User Acceptance Test) modul utama selesai. Termin 3(30%): 30 hari setelah serah terima proyek dan realisasi pelatihan (training).'
  });

  // Contract status - change this to simulate different states
  const isDeclined = true; // Set to true to show declined state
  const currentStep = 2;
  const declinedStep = 1;

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <main
      className="mx-auto p-6 min-h-screen"
    >
      {/* Stepper Section */}
      <h2
        className="text-2xl font-bold mb-2"
        style={{ color: colors.base[700] }}
      >
        Status Kontrak
      </h2>
      <div className="my-6">
        <ContractStepper
          currentStep={currentStep}
          isDeclined={isDeclined}
          declinedStep={declinedStep}
        />
      </div>

      {/* Alert Section for Declined Contract */}
      {isDeclined && (
        <div
          className="rounded-lg p-6 mb-8 border"
          style={{
            backgroundColor: colors.error[100],
            borderColor: colors.error[300]
          }}
        >
          <div className="flex items-start">
            <div
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: colors.error[400] }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#ffffff">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <line x1="15" y1="9" x2="9" y2="15" strokeWidth="2" />
                <line x1="9" y1="9" x2="15" y2="15" strokeWidth="2" />
              </svg>
            </div>
            <div className="flex-1">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: colors.error[700] }}
              >
                Kontrak anda perlu revisi
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: colors.error[600] }}
              >
                Revisi kontrak anda sesuai arahan dari Unit Pengadaan untuk melanjutkan kembali
              </p>

              <div>
                <h4
                  className="text-sm font-semibold mb-3"
                  style={{ color: colors.error[700] }}
                >
                  Catatan dari Pengadaan
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: colors.error[400] }}
                    ></div>
                    <p
                      className="text-sm"
                      style={{ color: colors.error[600] }}
                    >
                      Naik karena tingkat bunga tabungan stabil di 6% per tahun. Jadi uangmu terus bertambah sedikit demi sedikit.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: colors.error[400] }}
                    ></div>
                    <p
                      className="text-sm"
                      style={{ color: colors.error[600] }}
                    >
                      Naik karena tingkat bunga tabungan stabil di 6% per tahun. Jadi uangmu terus bertambah sedikit demi sedikit.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div
                      className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                      style={{ backgroundColor: colors.error[400] }}
                    ></div>
                    <p
                      className="text-sm"
                      style={{ color: colors.error[600] }}
                    >
                      Naik karena tingkat bunga tabungan stabil di 6% per tahun. Jadi uangmu terus bertambah sedikit demi sedikit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeclined ? (
        // the new ui is here
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
            </div>

            {/* Usulan Revisi Klausul */}
            <div className="rounded-lg shadow-sm p-6" style={{ backgroundColor: '#ffffff' }}>
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
            </div>

            {/* Riwayat Versi Kontrak */}
            <div className="rounded-lg shadow-sm p-6" style={{ backgroundColor: '#ffffff' }}>
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
      ) : (
        <>
          {/* Page Header */}
          <div className="mb-8">
            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: colors.base[700] }}
            >
              Review Kontrak
            </h1>
          </div>

          {/* Form Sections - Each in its own card */}
          <div className="space-y-6">
            {/* Informasi Umum Card */}
            <div className="rounded-lg shadow-sm p-6" style={{ backgroundColor: '#ffffff' }}>
              <FormSection title="Informasi Umum" icon="/info.svg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Nama Perusahaan" required>
                    <Input
                      type="text"
                      value={formData.companyName}
                      onChange={handleInputChange('companyName')}
                      disabled
                    />
                  </FormField>

                  <FormField label="Kontak PIC" required>
                    <Input
                      type="text"
                      value={formData.contactPerson}
                      onChange={handleInputChange('contactPerson')}
                      disabled
                    />
                  </FormField>

                  <FormField label="Judul Proposal" required>
                    <Input
                      type="text"
                      value={formData.proposalTitle}
                      onChange={handleInputChange('proposalTitle')}
                      disabled
                    />
                  </FormField>

                  <FormField label="Jenis Layanan" required>
                    <Input
                      type="text"
                      value={formData.serviceType}
                      onChange={handleInputChange('serviceType')}
                      disabled
                    />
                  </FormField>
                </div>
              </FormSection>
            </div>

            {/* Detail Layanan Card */}
            <div className="rounded-lg shadow-sm p-6" style={{ backgroundColor: '#ffffff' }}>
              <FormSection title="Detail Layanan" icon="/detail-service.svg">
                <div className="space-y-6">
                  <FormField label="Spesifikasi Teknis" required>
                    <textarea
                      className="w-full px-3 py-2 rounded-md"
                      style={{
                        border: `1px solid ${colors.base[300]}`,
                        backgroundColor: colors.base[100],
                        color: colors.base[700]
                      }}
                      value={formData.technicalSpec}
                      rows={6}
                      readOnly
                      disabled
                    />
                  </FormField>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Tanggal Mulai" required>
                      <input
                        type="date"
                        className="w-full px-3 py-2 rounded-md"
                        style={{
                          border: `1px solid ${colors.base[300]}`,
                          backgroundColor: colors.base[100],
                          color: colors.base[700]
                        }}
                        value={formData.startDate}
                        readOnly
                        disabled
                      />
                    </FormField>

                    <FormField label="Tanggal Selesai" required>
                      <input
                        type="date"
                        className="w-full px-3 py-2 rounded-md"
                        style={{
                          border: `1px solid ${colors.base[300]}`,
                          backgroundColor: colors.base[100],
                          color: colors.base[700]
                        }}
                        value={formData.endDate}
                        readOnly
                        disabled
                      />
                    </FormField>
                  </div>
                </div>
              </FormSection>
            </div>

            {/* Anggaran & Biaya Card */}
            <div className="rounded-lg shadow-sm p-6" style={{ backgroundColor: '#ffffff' }}>
              <FormSection title="Anggaran & Biaya" icon="/dollar.svg">
                <div className="space-y-6">
                  <FormField label="Nilai Kontrak (Rp)" required>
                    <Input
                      type="number"
                      value={formData.contractValue}
                      disabled
                    />
                  </FormField>

                  <FormField label="Rincian Termin Pembayaran" required>
                    <textarea
                      className="w-full px-3 py-2 rounded-md"
                      style={{
                        border: `1px solid ${colors.base[300]}`,
                        backgroundColor: colors.base[100],
                        color: colors.base[700]
                      }}
                      value={formData.paymentTerms}
                      rows={4}
                      readOnly
                      disabled
                    />
                  </FormField>

                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.base[700] }}
                    >
                      File Proposal Harga
                      <span style={{ color: colors.primary[500] }} className="ml-1">
                        <img src="/helper.svg" alt="Required" className="inline w-4 h-4" />
                      </span>
                    </label>
                    <div
                      className="rounded-lg p-6 text-center"
                      style={{
                        border: `1px solid ${colors.base[200]}`,
                        backgroundColor: colors.base[100]
                      }}
                    >
                      <div className="mb-4">
                        <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={colors.base[500]}
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="14,2 14,8 20,8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                      <p
                        className="text-sm mb-2"
                        style={{ color: colors.base[600] }}
                      >
                        proposal_harga_sistem_dcms.pdf
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: colors.base[500] }}
                      >
                        2.3 MB - Uploaded
                      </p>
                    </div>
                  </div>
                </div>
              </FormSection>
            </div>

            {/* Dokumen Pendukung Card */}
            <div className="rounded-lg shadow-sm p-6" style={{ backgroundColor: '#ffffff' }}>
              <FormSection title="Dokumen Pendukung">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Akta Perusahaan", filename: "akta_perusahaan.pdf", size: "1.8 MB" },
                    { label: "Izin Usaha", filename: "izin_usaha.pdf", size: "0.9 MB" },
                    { label: "Portofolio", filename: "portfolio_perusahaan.pdf", size: "5.2 MB" }
                  ].map((doc) => (
                    <div key={doc.label}>
                      <label
                        className="block text-sm font-medium mb-3"
                        style={{ color: colors.base[700] }}
                      >
                        {doc.label}
                      </label>
                      <div
                        className="rounded-lg p-6 text-center"
                        style={{
                          border: `1px solid ${colors.base[200]}`,
                          backgroundColor: colors.base[100]
                        }}
                      >
                        <div className="mb-4">
                          <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                            <svg
                              className="w-6 h-6"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke={colors.base[500]}
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <polyline points="14,2 14,8 20,8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <p
                          className="text-sm mb-2"
                          style={{ color: colors.base[600] }}
                        >
                          {doc.filename}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: colors.base[500] }}
                        >
                          {doc.size} - Uploaded
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </FormSection>
            </div>

            {/* Action Buttons Card */}
            <div className="flex flex-col items-center justify-center text-center">
              <p
                className="text-sm"
                style={{ color: colors.base[600] }}
              >
                Butuh bantuan?
                <a
                  href="#"
                  className="hover:underline ml-1"
                  style={{ color: colors.primary[600] }}
                >
                  Lihat FAQ
                </a>
                atau
                <a
                  href="#"
                  className="hover:underline ml-1"
                  style={{ color: colors.primary[600] }}
                >
                  Hubungi Support
                </a>
              </p>
            </div>
          </div>
        </>
      )
      }
    </main >
  );
}