'use client';

import React from 'react';
import { colors } from '@/design-system';
import FormSection from '@/components/FormSection';
import FormField from '@/components/FormField';
import Input from '@/components/Input';
import DocumentUpload from '@/components/DocumentUpload';

interface ContractFormData {
  companyName: string;
  contactPerson: string;
  proposalTitle: string;
  serviceType: string;
  technicalSpec: string;
  startDate: string;
  endDate: string;
  contractValue: string;
  paymentTerms: string;
}

interface NormalContractFormProps {
  formData: ContractFormData;
  onInputChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function NormalContractForm({ formData, onInputChange }: NormalContractFormProps) {
  const supportingDocuments = [
    { label: "Akta Perusahaan", filename: "akta_perusahaan.pdf", size: "1.8 MB" },
    { label: "Izin Usaha", filename: "izin_usaha.pdf", size: "0.9 MB" },
    { label: "Portofolio", filename: "portfolio_perusahaan.pdf", size: "5.2 MB" }
  ];

  return (
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
                  onChange={onInputChange('companyName')}
                  disabled
                />
              </FormField>

              <FormField label="Kontak PIC" required>
                <Input
                  type="text"
                  value={formData.contactPerson}
                  onChange={onInputChange('contactPerson')}
                  disabled
                />
              </FormField>

              <FormField label="Judul Proposal" required>
                <Input
                  type="text"
                  value={formData.proposalTitle}
                  onChange={onInputChange('proposalTitle')}
                  disabled
                />
              </FormField>

              <FormField label="Jenis Layanan" required>
                <Input
                  type="text"
                  value={formData.serviceType}
                  onChange={onInputChange('serviceType')}
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
                <DocumentUpload
                  filename="proposal_harga_sistem_dcms.pdf"
                  size="2.3 MB"
                />
              </div>
            </div>
          </FormSection>
        </div>

        {/* Dokumen Pendukung Card */}
        <div className="rounded-lg shadow-sm p-6" style={{ backgroundColor: '#ffffff' }}>
          <FormSection title="Dokumen Pendukung">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportingDocuments.map((doc) => (
                <div key={doc.label}>
                  <label
                    className="block text-sm font-medium mb-3"
                    style={{ color: colors.base[700] }}
                  >
                    {doc.label}
                  </label>
                  <DocumentUpload
                    filename={doc.filename}
                    size={doc.size}
                  />
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
  );
}