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
import FormSendSuccessModal from '../../components/FormSendSuccessModal';
import FormSendErrorModal from '../../components/FormSendErrorModal';

export default function PendaftaranVendorPage() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const handleSubmit = async () => {
    console.log("Form submitted:", formData);
    
    // Form validation
    if (!formData.tipeVendor || !formData.emailVendor || !formData.namaVendor || !formData.noNpwpVendor) {
      setErrorMessage("Mohon lengkapi semua field yang wajib diisi.");
      setIsErrorModalOpen(true);
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailVendor)) {
      setErrorMessage("Format email tidak valid.");
      setIsErrorModalOpen(true);
      return;
    }
    
    // Document validation
    if (!formData.dokumenAdmin || !formData.dokumenLegal || !formData.dokumenTeknikal || !formData.dokumenFinansial) {
      setErrorMessage("Mohon upload semua dokumen yang diperlukan.");
      setIsErrorModalOpen(true);
      return;
    }
    
    // File type validation (example for PDF only)
    const allowedTypes = ['application/pdf'];
    const documents = [
      { file: formData.dokumenAdmin, name: 'Dokumen Administrasi' },
      { file: formData.dokumenLegal, name: 'Dokumen Legal' },
      { file: formData.dokumenTeknikal, name: 'Dokumen Teknikal' },
      { file: formData.dokumenFinansial, name: 'Dokumen Finansial' }
    ];
    
    for (const doc of documents) {
      if (doc.file && !allowedTypes.includes(doc.file.type)) {
        setErrorMessage(`${doc.name} harus berupa file PDF.`);
        setIsErrorModalOpen(true);
        return;
      }
      
      // File size validation (5MB limit)
      if (doc.file && doc.file.size > 5 * 1024 * 1024) {
        setErrorMessage(`${doc.name} tidak boleh lebih dari 5MB.`);
        setIsErrorModalOpen(true);
        return;
      }
    }

    try {
      // Check internet connection first
      if (!navigator.onLine) {
        setErrorMessage("Tidak ada koneksi internet. Mohon periksa koneksi Anda.");
        setIsErrorModalOpen(true);
        return;
      }
      
      // Simulate Firebase submission
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate different error scenarios
          const random = Math.random();
          if (random < 0.7) {
            resolve('success');
          } else if (random < 0.85) {
            reject(new Error('Koneksi internet tidak stabil. Silakan coba lagi.'));
          } else {
            reject(new Error('Server sedang mengalami gangguan. Silakan coba beberapa saat lagi.'));
          }
        }, 1500);
      });
      
      // If successful, show success notification
      setIsModalOpen(true);
      
    } catch (error: any) {
      // Handle different types of errors
      if (error.message.includes('internet') || error.message.includes('network')) {
        setErrorMessage("Koneksi internet bermasalah. Periksa koneksi Anda dan coba lagi.");
      } else if (error.message.includes('server')) {
        setErrorMessage("Server sedang sibuk. Mohon coba beberapa saat lagi.");
      } else {
        setErrorMessage(error.message || "Terjadi kesalahan yang tidak diketahui.");
      }
      setIsErrorModalOpen(true);
    }
  };

  const handleVendorTypeSelect = (option: string) => {
    handleInputChange('tipeVendor', option);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const handleRetrySubmit = () => {
    setIsErrorModalOpen(false);
    handleSubmit();
  };

  const handleLoginRedirect = () => {
    // Redirect to login page
    window.location.href = '/auth/login';
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
      
      {/* Success Modal */}
      <FormSendSuccessModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLogin={handleLoginRedirect}
      />
      
      {/* Error Modal */}
      <FormSendErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        onRetry={handleRetrySubmit}
        message={errorMessage}
      />
    </div>
  );
}