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

// Local imports
import { VENDOR_TYPES, DOCUMENT_SECTIONS, DOCUMENT_PREVIEWS, FormData, INITIAL_FORM_DATA } from './constants';
import DocumentList from '../../components/DocumentList';
import AdditionalInfo from '../../components/AdditionalInfo';
import DocumentPreviewCard from '../../components/DocumentPreviewCard';
import FileUploadField from '../../components/FileUploadField';

export default function PendaftaranVendorPage() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

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

  const handleVendorTypeSelect = (option: string) => {
    handleInputChange('tipeVendor', option);
  };

  // Document section content for accordion
  const documentSections = DOCUMENT_SECTIONS.map(section => ({
    id: section.id,
    title: section.title,
    content: section.items ? (
      <DocumentList items={section.items} />
    ) : section.description ? (
      <AdditionalInfo descriptions={section.description} />
    ) : null
  }));

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
            {DOCUMENT_PREVIEWS.map((doc, index) => (
              <DocumentPreviewCard
                key={index}
                title={doc.title}
                filename={doc.filename}
                preview={doc.preview}
              />
            ))}
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
                  options={VENDOR_TYPES}
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
              <FileUploadField
                label="Dokumen Administrasi"
                fieldName="dokumen-admin"
                file={formData.dokumenAdmin}
                onFileChange={handleFileChange}
              />

              {/* Legal Document */}
              <FileUploadField
                label="Dokumen Legal"
                fieldName="dokumen-legal"
                file={formData.dokumenLegal}
                onFileChange={handleFileChange}
              />

              {/* Technical Document */}
              <FileUploadField
                label="Dokumen Teknikal"
                fieldName="dokumen-teknikal"
                file={formData.dokumenTeknikal}
                onFileChange={handleFileChange}
              />

              {/* Financial Document */}
              <FileUploadField
                label="Dokumen Finansial"
                fieldName="dokumen-finansial"
                file={formData.dokumenFinansial}
                onFileChange={handleFileChange}
              />
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