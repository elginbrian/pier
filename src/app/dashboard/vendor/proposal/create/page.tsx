"use client";

import React, { useState } from "react";
import Image from "next/image";
import FormSection from "@/components/FormSection";
import FormField from "@/components/FormField";
import SmartTextarea from "@/components/SmartTextarea";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import AlertBanner from "@/components/AlertBanner";
import LargeFileUpload from "@/components/LargeFileUpload";
import ProposalFileUpload from "@/components/ProposalFileUpload";
import Button from "@/components/Button";
import FormSendSuccessModal from "@/components/FormSendSuccessModal";
import FormSendErrorModal from "@/components/FormSendErrorModal";
import { submitProposal } from "@/services/proposals";
import { useAuth } from "@/context/AuthContext";

interface FileUploadProps {
  title: string;
  subtitle: string;
}

const CreateProposalPage: React.FC = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    proposalTitle: "",
    serviceType: "",
    technicalSpec: "",
    startDate: "",
    endDate: "",
    contractValue: "",
    paymentTerms: "",
  });

  const [files, setFiles] = useState({
    proposalHarga: null as File | null,
    companyDeed: null as File | null,
    businessLicense: null as File | null,
    portfolio: null as File | null,
  });

  const [errors, setErrors] = useState({
    companyName: "",
    contactPerson: "",
    proposalTitle: "",
    serviceType: "",
    technicalSpec: "",
    startDate: "",
    endDate: "",
    contractValue: "",
    paymentTerms: "",
    proposalHarga: "",
  });

  const serviceOptions = ["Port Operating Solution", "Enterprise Digital Solution", "Maritime Logistics Platform", "Maritime Service Solution"];

  const validateForm = () => {
    const newErrors = { ...errors };
    let isValid = true;

    // Required field validation
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
      isValid = false;
    } else {
      newErrors.companyName = "";
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "Contact person is required";
      isValid = false;
    } else {
      newErrors.contactPerson = "";
    }

    if (!formData.proposalTitle.trim()) {
      newErrors.proposalTitle = "Proposal title is required";
      isValid = false;
    } else {
      newErrors.proposalTitle = "";
    }

    if (!formData.serviceType) {
      newErrors.serviceType = "Service type is required";
      isValid = false;
    } else {
      newErrors.serviceType = "";
    }

    if (!formData.technicalSpec.trim()) {
      newErrors.technicalSpec = "Technical specification is required";
      isValid = false;
    } else {
      newErrors.technicalSpec = "";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
      isValid = false;
    } else {
      newErrors.startDate = "";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
      isValid = false;
    } else {
      newErrors.endDate = "";
    }

    if (!formData.contractValue.trim()) {
      newErrors.contractValue = "Contract value is required";
      isValid = false;
    } else {
      newErrors.contractValue = "";
    }

    if (!formData.paymentTerms.trim()) {
      newErrors.paymentTerms = "Payment terms are required";
      isValid = false;
    } else {
      newErrors.paymentTerms = "";
    }

    if (!files.proposalHarga) {
      newErrors.proposalHarga = "Proposal price document is required";
      isValid = false;
    } else {
      newErrors.proposalHarga = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleDropdownChange = (field: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user selects a value
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleFileChange = (fileType: string) => (file: File | null) => {
    setFiles((prev) => ({
      ...prev,
      [fileType]: file,
    }));
    
    // Clear error when user selects a file
    if (errors[fileType as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [fileType]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    console.info("[proposal-creation] submit attempt", {
      timestamp: new Date().toISOString(),
      userId: user?.uid ?? null,
      proposalTitle: formData.proposalTitle,
    });

    if (!validateForm()) {
      console.warn("[proposal-creation] validation failed");
      setErrorMessage("Please fix the errors in the form.");
      setIsErrorModalOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      if (!navigator.onLine) {
        console.warn("[proposal-creation] offline at submit");
        setErrorMessage("No internet connection. Please check your network.");
        setIsErrorModalOpen(true);
        setIsSubmitting(false);
        return;
      }

      const fileSummary: Record<string, any> = {};
      Object.entries(files).forEach(([k, f]) => {
        if (f) fileSummary[k] = { name: f.name, size: f.size, type: f.type };
      });
      console.info("[proposal-creation] uploading files", { userId: user?.uid ?? null, files: fileSummary });

      const result = await submitProposal({
        ...formData,
        userId: user?.uid ?? null,
      }, files);

      console.info("[proposal-creation] submission succeeded", { docId: result?.id ?? null });
      setIsSuccessModalOpen(true);
      
      // Reset form
      setFormData({
        companyName: "",
        contactPerson: "",
        proposalTitle: "",
        serviceType: "",
        technicalSpec: "",
        startDate: "",
        endDate: "",
        contractValue: "",
        paymentTerms: "",
      });
      setFiles({
        proposalHarga: null,
        companyDeed: null,
        businessLicense: null,
        portfolio: null,
      });
      setErrors({
        companyName: "",
        contactPerson: "",
        proposalTitle: "",
        serviceType: "",
        technicalSpec: "",
        startDate: "",
        endDate: "",
        contractValue: "",
        paymentTerms: "",
        proposalHarga: "",
      });

    } catch (error: any) {
      console.error("[proposal-creation] submission error", { error });
      if (error?.message && (error.message.includes("internet") || error.message.includes("network"))) {
        setErrorMessage("There was a network problem. Check your connection and try again.");
      } else if (error?.message && error.message.includes("server")) {
        setErrorMessage("The server is busy. Please try again later.");
      } else {
        setErrorMessage(error?.message || "An unknown error occurred.");
      }
      setIsErrorModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    console.log("Draft saved:", formData);
    // For now, just log the draft. In the future, you might want to save to localStorage or backend
    localStorage.setItem('proposalDraft', JSON.stringify({ formData, files: Object.fromEntries(Object.entries(files).map(([k, v]) => [k, v?.name || null])) }));
    alert("Draft saved to local storage!");
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const handleRetrySubmit = () => {
    setIsErrorModalOpen(false);
    handleSubmit();
  };

  const handleDashboardRedirect = () => {
    window.location.href = "/dashboard/vendor";
  };

  return (
    <div className="min-h-screen 0 py-8">
      <div className="w-full mx-auto">
        {/* Header Alert */}
        <AlertBanner type="info" message="Please ensure all fields are complete before submitting the proposal" className="mb-6" />

        {/* Page Header - Outside Cards */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Proposal</h1>
          <p className="text-gray-600">Fill out the form below to submit your proposal</p>
        </div>

        {/* Form Sections - Each in its own card */}
        <div className="space-y-6">
          {/* Informasi Umum Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <FormSection stepNumber={1} title="General Information" icon="/info.svg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="Company Name" required>
                  <Input 
                    type="text" 
                    value={formData.companyName} 
                    onChange={handleInputChange("companyName")} 
                    placeholder="PT Vendor Teknologi"
                    error={errors.companyName}
                  />
                </FormField>

                <FormField label="Contact Person" required>
                  <Input 
                    type="text" 
                    value={formData.contactPerson} 
                    onChange={handleInputChange("contactPerson")} 
                    placeholder="Name of Person in Charge"
                    error={errors.contactPerson}
                  />
                </FormField>

                <div className="md:col-span-2">
                  <FormField label="Proposal Title" required>
                    <SmartTextarea 
                      value={formData.proposalTitle} 
                      onChange={handleInputChange("proposalTitle")} 
                      placeholder="Enter a clear and descriptive proposal title" 
                      rows={3}
                      error={errors.proposalTitle}
                    />
                  </FormField>
                </div>

                <FormField label="Service Type" required>
                  <Dropdown 
                    options={serviceOptions} 
                    onSelect={(option) => handleDropdownChange("serviceType")(option)} 
                    label="Select service type"
                    error={errors.serviceType}
                  />
                </FormField>
              </div>
            </FormSection>
          </div>

          {/* Detail Layanan Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <FormSection stepNumber={2} title="Service Details" icon="/detail-service.svg">
              <div className="space-y-6">
                <FormField label="Technical Specification" required>
                  <SmartTextarea 
                    value={formData.technicalSpec} 
                    onChange={handleInputChange("technicalSpec")} 
                    placeholder="Describe the technical specifications of the service being offered..." 
                    rows={6}
                    error={errors.technicalSpec}
                  />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Start Date" required>
                    <input
                      type="date"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black ${
                        errors.startDate 
                          ? 'border-red-300' 
                          : formData.startDate 
                          ? 'border-green-300' 
                          : 'border-gray-300'
                      }`}
                      value={formData.startDate}
                      onChange={handleInputChange("startDate")}
                      style={{ color: "#000000" }}
                    />
                    {errors.startDate && (
                      <p className="text-sm text-red-600 mt-1">{errors.startDate}</p>
                    )}
                  </FormField>

                  <FormField label="End Date" required>
                    <input
                      type="date"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black ${
                        errors.endDate 
                          ? 'border-red-300' 
                          : formData.endDate 
                          ? 'border-green-300' 
                          : 'border-gray-300'
                      }`}
                      value={formData.endDate}
                      onChange={handleInputChange("endDate")}
                      style={{ color: "#000000" }}
                    />
                    {errors.endDate && (
                      <p className="text-sm text-red-600 mt-1">{errors.endDate}</p>
                    )}
                  </FormField>
                </div>
              </div>
            </FormSection>
          </div>

          {/* Anggaran & Biaya Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <FormSection stepNumber={3} title="Budget & Costs" icon="/dollar.svg">
              <div className="space-y-6">
                <FormField label="Contract Value (Rp)" required>
                  <Input 
                    type="number" 
                    value={formData.contractValue} 
                    onChange={handleInputChange("contractValue")} 
                    placeholder="0"
                    error={errors.contractValue}
                  />
                </FormField>

                <FormField label="Payment Terms Details" required>
                  <SmartTextarea 
                    value={formData.paymentTerms} 
                    onChange={handleInputChange("paymentTerms")} 
                    placeholder="Describe the payment term breakdown..." 
                    rows={4}
                    error={errors.paymentTerms}
                  />
                </FormField>

                <LargeFileUpload 
                  label="Upload Proposal Harga" 
                  required 
                  onFileSelect={handleFileChange("proposalHarga")}
                  file={files.proposalHarga}
                  error={errors.proposalHarga}
                />
              </div>
            </FormSection>
          </div>

          {/* Dokumen Pendukung Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <FormSection stepNumber={4} title="Supporting Documents">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProposalFileUpload 
                  label="Company Deed" 
                  onFileSelect={handleFileChange("companyDeed")}
                  file={files.companyDeed}
                />

                <ProposalFileUpload 
                  label="Business License" 
                  onFileSelect={handleFileChange("businessLicense")}
                  file={files.businessLicense}
                />

                <ProposalFileUpload 
                  label="Portfolio" 
                  onFileSelect={handleFileChange("portfolio")}
                  file={files.portfolio}
                />
              </div>
            </FormSection>
          </div>

          {/* Action Buttons Card */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <Image src="/helper.svg" alt="Help" width={16} height={16} className="mr-2" />
              <p className="text-sm text-gray-600">
                Need help?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  View FAQ
                </a>{" "}
                or{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Contact Support
                </a>
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                size="md" 
                onClick={handleSaveDraft}
                disabled={isSubmitting}
              >
                Save Draft
              </Button>
              <Button 
                variant="primary" 
                size="md" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Proposal"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Modal */}
      <FormSendSuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={handleCloseSuccessModal} 
        onLogin={handleDashboardRedirect}
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
};

export default CreateProposalPage;