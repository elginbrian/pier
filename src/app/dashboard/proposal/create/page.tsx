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

interface FileUploadProps {
  title: string;
  subtitle: string;
}

const CreateProposalPage: React.FC = () => {
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

  const serviceOptions = ["Technology Consultation", "Software Development", "Maintenance & Support", "System Integration", "Cloud Services"];

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleDropdownChange = (field: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  const handleSaveDraft = () => {
    console.log("Draft saved:", formData);
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
                  <Input type="text" value={formData.companyName} onChange={handleInputChange("companyName")} placeholder="PT Vendor Teknologi" />
                </FormField>

                <FormField label="Contact Person" required>
                  <Input type="text" value={formData.contactPerson} onChange={handleInputChange("contactPerson")} placeholder="Name of Person in Charge" />
                </FormField>

                <div className="md:col-span-2">
                  <FormField label="Proposal Title" required>
                    <SmartTextarea value={formData.proposalTitle} onChange={handleInputChange("proposalTitle")} placeholder="Enter a clear and descriptive proposal title" rows={3} />
                  </FormField>
                </div>

                <FormField label="Service Type" required>
                  <Dropdown options={serviceOptions} onSelect={(option) => handleDropdownChange("serviceType")(option)} label="Select service type" />
                </FormField>
              </div>
            </FormSection>
          </div>

          {/* Detail Layanan Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <FormSection stepNumber={2} title="Service Details" icon="/detail-service.svg">
              <div className="space-y-6">
                <FormField label="Technical Specification" required>
                  <SmartTextarea value={formData.technicalSpec} onChange={handleInputChange("technicalSpec")} placeholder="Describe the technical specifications of the service being offered..." rows={6} />
                </FormField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Start Date" required>
                    <input
                      type="date"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black ${formData.startDate ? "border-green-300" : "border-gray-300"}`}
                      value={formData.startDate}
                      onChange={handleInputChange("startDate")}
                      style={{ color: "#000000" }}
                    />
                  </FormField>

                  <FormField label="End Date" required>
                    <input
                      type="date"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black ${formData.endDate ? "border-green-300" : "border-gray-300"}`}
                      value={formData.endDate}
                      onChange={handleInputChange("endDate")}
                      style={{ color: "#000000" }}
                    />
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
                  <Input type="number" value={formData.contractValue} onChange={handleInputChange("contractValue")} placeholder="0" />
                </FormField>

                <FormField label="Payment Terms Details" required>
                  <SmartTextarea value={formData.paymentTerms} onChange={handleInputChange("paymentTerms")} placeholder="Describe the payment term breakdown..." rows={4} />
                </FormField>

                <LargeFileUpload label="Upload Proposal Harga" required onFileSelect={(file) => console.log("Price proposal:", file)} />
              </div>
            </FormSection>
          </div>

          {/* Dokumen Pendukung Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <FormSection stepNumber={4} title="Supporting Documents">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ProposalFileUpload label="Company Deed" onFileSelect={(file) => console.log("Company certificate:", file)} />

                <ProposalFileUpload label="Business License" onFileSelect={(file) => console.log("Business license:", file)} />

                <ProposalFileUpload label="Portfolio" onFileSelect={(file) => console.log("Portfolio:", file)} />
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
              <Button variant="secondary" size="md" onClick={handleSaveDraft}>
                Save Draft
              </Button>
              <Button variant="primary" size="md" onClick={handleSubmit}>
                Submit Proposal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProposalPage;
