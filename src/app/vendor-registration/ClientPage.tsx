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
import Hero from "../../components/Hero";
import { VENDOR_TYPES, DOCUMENT_SECTIONS, DOCUMENT_PREVIEWS } from "./constants";
import { useVendorForm } from "./hooks";
import DocumentList from "../../components/DocumentList";
import AdditionalInfo from "../../components/AdditionalInfo";
import DocumentPreviewCard from "../../components/DocumentPreviewCard";
import FileUploadField from "../../components/FileUploadField";
import FormSendSuccessModal from "../../components/FormSendSuccessModal";
import FormSendErrorModal from "../../components/FormSendErrorModal";
import { useAuth } from "../../context/AuthContext";

export default function ClientVendorRegistrationPage() {
  const { formData, setField, setFile, validateAll, validateField, errors, markTouched, resetForm, submit, submitting } = useVendorForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { user } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setField(field as any, value);
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFile(field as any, file);
  };

  const handleSubmit = async () => {
    console.info("[vendor-registration] submit attempt", {
      timestamp: new Date().toISOString(),
      userId: user?.uid ?? null,
      email: formData.emailVendor,
    });
    const { valid, errors: validationErrors } = validateAll();
    if (!valid) {
      console.warn("[vendor-registration] validation failed", { validationErrors });
      setErrorMessage("Please fix the errors in the form.");
      setIsErrorModalOpen(true);
      return;
    }

    try {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        console.warn("[vendor-registration] offline at submit");
        setErrorMessage("No internet connection. Please check your network.");
        setIsErrorModalOpen(true);
        return;
      }

      const files: Record<string, File | null> = {
        dokumenAdmin: formData.dokumenAdmin,
        dokumenLegal: formData.dokumenLegal,
        dokumenTeknikal: formData.dokumenTeknikal,
        dokumenFinansial: formData.dokumenFinansial,
      };

      const fileSummary: Record<string, any> = {};
      Object.entries(files).forEach(([k, f]) => {
        if (f) fileSummary[k] = { name: f.name, size: f.size, type: f.type };
      });
      console.info("[vendor-registration] uploading files", { userId: user?.uid ?? null, files: fileSummary });

      const res = await submit({ userId: user?.uid ?? null });
      if (res.ok) {
        console.info("[vendor-registration] submission succeeded", { docId: res.result?.id ?? null });
        setIsModalOpen(true);
        resetForm();
      } else {
        console.error("[vendor-registration] submission failed", res.error);
        throw res.error ?? new Error("Submission failed");
      }
    } catch (error: any) {
      console.error("[vendor-registration] submission error", { error });
      if (error?.message && (error.message.includes("internet") || error.message.includes("network"))) {
        setErrorMessage("There was a network problem. Check your connection and try again.");
      } else if (error?.message && error.message.includes("server")) {
        setErrorMessage("The server is busy. Please try again later.");
      } else {
        setErrorMessage(error?.message || "An unknown error occurred.");
      }
      setIsErrorModalOpen(true);
    }
  };

  const handleVendorTypeSelect = (option: string) => {
    handleInputChange("tipeVendor", option);
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
    if (typeof window !== "undefined") window.location.href = "/auth/login";
  };

  const formRef = React.useRef<HTMLDivElement | null>(null);

  const handleHeroCTA = () => {
    if (formRef.current && typeof formRef.current.scrollIntoView === "function") {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const documentSections = DOCUMENT_SECTIONS.map((section) => ({
    id: section.id,
    title: section.title,
    content: section.items ? <DocumentList items={section.items} /> : section.description ? <AdditionalInfo descriptions={section.description} /> : null,
  }));

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      <Hero title={"Vendor Registration"} showButton={true} buttonText={"Fill the Form"} onButtonClick={handleHeroCTA} disableAnimation={true} />

      <div className="max-w-7xl mx-auto py-12 mb-4">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: colors.base[700] }}>
            Vendor Registration
          </h1>
          <div className="text-base text-gray-700">
            <p className="mb-4">
              In order to improve the company's operational efficiency, PT Integration Logistic Cipta Solusi provides an opportunity for selected vendors to become Selected Business Actor within PT Integration Logistic Cipta Solusi.
              Providers of goods and services must meet the terms and conditions that apply within PT Integration Logistic Cipta Solusi to become selected business actors.
            </p>
            <p>You can submit an application letter to become a Selected Business Actor by attaching the following files:</p>
          </div>
        </div>
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold mr-4" style={{ color: colors.base[100], backgroundColor: colors.primary[300] }}>
              What to prepare?
            </h2>
          </div>

          <Accordion items={documentSections} />
        </div>
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: colors.base[700] }}>
            Download Administrative Documents
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {DOCUMENT_PREVIEWS.map((doc, index) => (
              <DocumentPreviewCard 
                key={index} 
                title={doc.title} 
                filename={doc.filename} 
                preview={doc.preview}
                downloadUrl={doc.downloadUrl}
              />
            ))}
          </div>
        </div>

        <div className="mb-12" ref={formRef}>
          <h3 className="text-xl font-semibold mb-6" style={{ color: colors.base[700] }}>
            Registration Form
          </h3>

          <div className="grid md:grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: colors.base[700] }}>
                Vendor Type <span style={{ color: colors.error[400] }}>*</span>
              </label>
              <Dropdown
                label="Select vendor type..."
                options={VENDOR_TYPES}
                onSelect={(option) => {
                  handleVendorTypeSelect(option);
                  markTouched("tipeVendor" as any);
                }}
                className="w-full"
              />
            </div>

            <Input
              label={<span className="font-bold">Vendor Email</span>}
              type="email"
              placeholder="Enter vendor email..."
              value={formData.emailVendor}
              onChange={(e) => handleInputChange("emailVendor", e.target.value)}
              onBlur={() => markTouched("emailVendor" as any)}
              error={errors.emailVendor}
              required
            />

            <Input
              label={<span className="font-bold">Vendor Name</span>}
              placeholder="Enter vendor name..."
              value={formData.namaVendor}
              onChange={(e) => handleInputChange("namaVendor", e.target.value)}
              onBlur={() => markTouched("namaVendor" as any)}
              error={errors.namaVendor}
              required
            />

            <Input
              label={<span className="font-bold">Vendor Phone Number</span>}
              placeholder="Enter vendor phone number..."
              value={formData.noNpwpVendor}
              onChange={(e) => handleInputChange("noNpwpVendor", e.target.value)}
              onBlur={() => markTouched("noNpwpVendor" as any)}
              error={errors.noNpwpVendor}
              required
            />
          </div>
        </div>
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6" style={{ color: colors.base[700] }}>
            Upload Documents
          </h3>

          <div className="">
            <FileUploadField
              label={<span className="font-bold">Administrative Document</span>}
              fieldName="dokumen-admin"
              fieldKey="dokumenAdmin"
              file={formData.dokumenAdmin}
              onFileChange={(k, f) => {
                handleFileChange(k, f);
                markTouched("dokumenAdmin" as any);
              }}
              error={errors.dokumenAdmin}
            />

            <FileUploadField
              label={<span className="font-bold">Legal Document</span>}
              fieldName="dokumen-legal"
              fieldKey="dokumenLegal"
              file={formData.dokumenLegal}
              onFileChange={(k, f) => {
                handleFileChange(k, f);
                markTouched("dokumenLegal" as any);
              }}
              error={errors.dokumenLegal}
            />

            <FileUploadField
              label={<span className="font-bold">Technical Document</span>}
              fieldName="dokumen-teknikal"
              fieldKey="dokumenTeknikal"
              file={formData.dokumenTeknikal}
              onFileChange={(k, f) => {
                handleFileChange(k, f);
                markTouched("dokumenTeknikal" as any);
              }}
              error={errors.dokumenTeknikal}
            />

            <FileUploadField
              label={<span className="font-bold">Financial Document</span>}
              fieldName="dokumen-finansial"
              fieldKey="dokumenFinansial"
              file={formData.dokumenFinansial}
              onFileChange={(k, f) => {
                handleFileChange(k, f);
                markTouched("dokumenFinansial" as any);
              }}
              error={errors.dokumenFinansial}
            />
          </div>
        </div>

        <div className="text-center">
          <Button variant="primary" size="lg" onClick={handleSubmit} className="px-12" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </div>

      <Footer />

      <FormSendSuccessModal isOpen={isModalOpen} onClose={handleCloseModal} onLogin={handleLoginRedirect} />

      <FormSendErrorModal isOpen={isErrorModalOpen} onClose={handleCloseErrorModal} onRetry={handleRetrySubmit} message={errorMessage} />
    </div>
  );
}
