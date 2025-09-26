'use client';

import React from 'react';
import Input from '../../../../components/Input';
import FormSection from '../../../../components/FormSection';
import FormField from '../../../../components/FormField';
import { colors } from '../../../../design-system';
import ContractStepper from '../../../../components/ContractStepper';

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
        <ContractStepper />
      </div>

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
    </main>
  );
}