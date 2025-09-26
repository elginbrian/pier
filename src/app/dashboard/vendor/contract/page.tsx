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
    <main className="mx-auto p-6 min-h-screen">
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
      <ContractAlert isDeclined={isDeclined} />

      {/* Main Content */}
      {isDeclined ? (
        <DeclinedContractUI />
      ) : (
        <NormalContractForm 
          formData={formData}
          onInputChange={handleInputChange}
        />
      )}
    </main>
  );
}