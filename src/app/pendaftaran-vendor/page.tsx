"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Accordion from "../../components/Accordion";
import Dropdown from "../../components/Dropdown";
import { colors } from "../../design-system";

interface FormData {
  tipeVendor: string;
  emailVendor: string;
  namaVendor: string;
  noNpwpVendor: string;
  dokumenAdmin: File | null;
  dokumenLegal: File | null;
  dokumenTeknikal: File | null;
  dokumenFinansial: File | null;
}

export default function PendaftaranVendorPage() {
  const [formData, setFormData] = useState<FormData>({
    tipeVendor: "",
    emailVendor: "",
    namaVendor: "",
    noNpwpVendor: "",
    dokumenAdmin: null,
    dokumenLegal: null,
    dokumenTeknikal: null,
    dokumenFinansial: null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  // Vendor type options
  const vendorTypes = [
    "Penyedia Jasa Logistik",
    "Penyedia Barang",
    "Penyedia Jasa Konstruksi", 
    "Penyedia Jasa Konsultasi",
    "Penyedia Jasa Pemeliharaan",
    "Penyedia Jasa IT",
    "Penyedia Jasa Kebersihan",
    "Penyedia Jasa Keamanan",
    "Lainnya"
  ];

  const handleVendorTypeSelect = (option: string) => {
    handleInputChange('tipeVendor', option);
  };

  // Document section content for accordion
  const documentSections = [
    {
      id: "administrative",
      title: "Administrative Documents",
      content: (
        <ul className="space-y-2 text-sm">
          <li>• Application letter for selected business actors</li>
          <li>• Integrity pact</li>
          <li>• Statement Letter and Committee as Partners in the PT ILCS Area in order to create a Clean Port (Without fraud, Collusion, Corruption and Nepotism) and Negotation (Good Corporate Governance (GCG))</li>
        </ul>
      )
    },
    {
      id: "legality", 
      title: "Legality Documents",
      content: (
        <ul className="space-y-2 text-sm">
          <li>• Copy (photocopy) of the Deed of Establishment and its amendments (if any) and attached with ratification and/or approval from the Minister of Law and Human Rights</li>
          <li>• Copy (photocopy) of Company Domicile Certificate</li>
          <li>• Copy (photocopy) of Company Business License / NIB</li>
          <li>• Copy (photocopy) of Company Registration Certificate</li>
          <li>• Copy (photocopy) of Letter of Determination of Taxpayer Identification Number and Taxable Entrepreneur</li>
          <li>• Integrity pact</li>
        </ul>
      )
    },
    {
      id: "technical",
      title: "Technical document", 
      content: (
        <ul className="space-y-2 text-sm">
          <li>• Company Profile</li>
          <li>• Job Experience List</li>
          <li>• Certification (If any)</li>
        </ul>
      )
    },
    {
      id: "financial",
      title: "Financial Documents",
      content: (
        <ul className="space-y-2 text-sm">
          <li>• Last Year Financial Report</li>
          <li>• Copy (Photocopy) of the last Annual Tax Return</li>
        </ul>
      )
    },
    {
      id: "additional",
      title: "Additional Information",
      content: (
        <ul className="space-y-2 text-sm">
          <li>• All personal data information provided through this website is confidential and used for purposes that are not in contrary with the applicable laws and regulations and as a fulfillment of the requirements in PT Integrasi Logistik Cipta Solusi. All information collected is only used for the purposes specified on the website, and we will not disclose any personal information to third parties, except with the owner's permission or under special conditions in accordance with applicable laws and regulations</li>
          <li>• Relevant documents are attached as examples</li>
          <li>• Vendor registration form consists of vendor identity and upload required documents</li>
        </ul>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <Image 
          src="/hero-image.png" 
          alt="Pendaftaran Vendor Hero" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Pendaftaran Vendor
          </h1>
          <p className="text-xl text-white opacity-90">
            In order to improve the company's operational efficiency, PT Integration Logistic Cipta Solusi provides an opportunity for selected vendors to become Selected Business Actor within PT Integration Logistic Cipta Solusi. Providers of goods and services must meet the terms and conditions that apply within PT Integration Logistic Cipta Solusi to become selected business actors.
          </p>
          <p className="text-white mt-4">
            You can submit an application letter to become a Selected Business Actor by attaching the following files:
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Document Requirements Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <h2 
              className="text-2xl font-bold mr-4"
              style={{ color: colors.primary[300] }}
            >
              Apa yang Harus Disiapkan?
            </h2>
          </div>
          
          <Accordion items={documentSections} />
        </div>

        {/* Document Images Section */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: colors.base[700] }}>
            Unduh Dokumen Administrasi
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Application letter preview</span>
              </div>
              <h4 className="font-semibold mb-2">Application letter for selected business actors</h4>
              <p className="text-sm text-gray-600 mb-3">
                surat-permohonan-mitra-business-actors-terpilih-dari-bca.docx
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Integrity pact preview</span>
              </div>
              <h4 className="font-semibold mb-2">Integrity pact</h4>
              <p className="text-sm text-gray-600 mb-3">
                pakta-integritas-mitra-ILCS
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Statement letter preview</span>
              </div>
              <h4 className="font-semibold mb-2">Statement Letter and Committee as Partners in the PT ILCS Area</h4>
              <p className="text-sm text-gray-600 mb-3">
                surat-pernyataan-dan-komitmen-sebagai-mitra-di-wilayah-pt-ilcs-dalam-rangka-mewujudkan-clean-port-tanpa-kkn-dan-good-corporate-governance-gcg
              </p>
            </div>
          </div>
        </div>

        {/* Registration Form Section */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: colors.base[700] }}>
            Formulir Registrasi
          </h3>
          
          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Tipe Vendor Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.base[700] }}>
                  Tipe Vendor <span style={{ color: colors.error[400] }}>*</span>
                </label>
                <Dropdown
                  label="Pilih tipe vendor..."
                  options={vendorTypes}
                  onSelect={handleVendorTypeSelect}
                  className="w-full"
                />
              </div>
              
              <Input
                label="Email Vendor"
                type="email"
                placeholder="Masukkan email vendor..."
                value={formData.emailVendor}
                onChange={(e) => handleInputChange('emailVendor', e.target.value)}
                required
              />
              
              <Input
                label="Nama Vendor"
                placeholder="Masukkan nama vendor..."
                value={formData.namaVendor}
                onChange={(e) => handleInputChange('namaVendor', e.target.value)}
                required
              />
              
              <Input
                label="Nomor Telepon Vendor"
                placeholder="Masukkan nomor telepon vendor..."
                value={formData.noNpwpVendor}
                onChange={(e) => handleInputChange('noNpwpVendor', e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Document Upload Section */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: colors.base[700] }}>
            Masukkan Dokumen
          </h3>
          
          <div className="bg-white rounded-lg p-8 shadow-sm border">
            <div className="space-y-6">
              {/* Administrative Document */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.base[700] }}>
                  Dokumen Administrasi <span style={{ color: colors.error[400] }}>*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="No file chosen"
                    readOnly
                    value={formData.dokumenAdmin?.name || ""}
                    className="w-full h-14 px-5 pr-24 border rounded-xl bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-sm font-medium text-white rounded-lg border"
                    style={{
                      backgroundColor: colors.primary[300],
                      borderColor: colors.primary[300],
                    }}
                    onClick={() => document.getElementById('dokumen-admin')?.click()}
                  >
                    Browse
                  </button>
                  <input
                    id="dokumen-admin"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange('dokumenAdmin', e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              {/* Legal Document */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.base[700] }}>
                  Dokumen Legal <span style={{ color: colors.error[400] }}>*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="No file chosen"
                    readOnly
                    value={formData.dokumenLegal?.name || ""}
                    className="w-full h-14 px-5 pr-24 border rounded-xl bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-sm font-medium text-white rounded-lg border"
                    style={{
                      backgroundColor: colors.primary[300],
                      borderColor: colors.primary[300],
                    }}
                    onClick={() => document.getElementById('dokumen-legal')?.click()}
                  >
                    Browse
                  </button>
                  <input
                    id="dokumen-legal"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange('dokumenLegal', e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              {/* Technical Document */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.base[700] }}>
                  Dokumen Teknikal <span style={{ color: colors.error[400] }}>*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="No file chosen"
                    readOnly
                    value={formData.dokumenTeknikal?.name || ""}
                    className="w-full h-14 px-5 pr-24 border rounded-xl bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-sm font-medium text-white rounded-lg border"
                    style={{
                      backgroundColor: colors.primary[300],
                      borderColor: colors.primary[300],
                    }}
                    onClick={() => document.getElementById('dokumen-teknikal')?.click()}
                  >
                    Browse
                  </button>
                  <input
                    id="dokumen-teknikal"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange('dokumenTeknikal', e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              {/* Financial Document */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.base[700] }}>
                  Dokumen Finansial <span style={{ color: colors.error[400] }}>*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="No file chosen"
                    readOnly
                    value={formData.dokumenFinansial?.name || ""}
                    className="w-full h-14 px-5 pr-24 border rounded-xl bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-sm font-medium text-white rounded-lg border"
                    style={{
                      backgroundColor: colors.primary[300],
                      borderColor: colors.primary[300],
                    }}
                    onClick={() => document.getElementById('dokumen-finansial')?.click()}
                  >
                    Browse
                  </button>
                  <input
                    id="dokumen-finansial"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange('dokumenFinansial', e.target.files?.[0] || null)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSubmit}
            className="px-12"
          >
            Kirim Kontrak
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}