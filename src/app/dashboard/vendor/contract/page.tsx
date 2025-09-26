"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { colors } from "@/design-system";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import ContractStepper from "@/components/ContractStepper";
import ContractAlert from "@/components/ContractAlert";
import DeclinedContractUI from "@/components/DeclinedContractUI";
import NormalContractForm from "@/components/NormalContractForm";
import ContractStartedUI from "@/components/ContractStartedUI";
import ContractSignatureUI from "@/components/ContractSignatureUI";
import ContractCompletedUI from "@/components/ContractCompletedUI";
import { getContractById, Contract, getVendorContracts } from "@/services/dashboard";
import { getProposalById } from "@/services/proposals";

export default function ContractReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  const contractId = searchParams.get('id');
  
  // Firebase states
  const [contract, setContract] = useState<Contract | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form data state
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

  // Status states
  const [isDeclined, setIsDeclined] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [declinedStep, setDeclinedStep] = useState(1);

  useEffect(() => {
    const fetchContract = async () => {
      // If no contract ID provided, show a list of all contracts
      if (!contractId) {
        if (!user?.uid) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        try {
          setLoading(true);
          console.log("[contract] Fetching all contracts for user:", user.uid);
          
          const contractsList = await getVendorContracts(user.uid);
          setContracts(contractsList);
          setLoading(false);
          setError(null);
        } catch (err: any) {
          console.error("[contract] Error fetching contracts list:", err);
          setError(err?.message || "Failed to load contracts list");
          setLoading(false);
        }
        return;
      }

      if (!user?.uid) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("[contract] Fetching contract:", contractId);
        
        // First try to get as contract
        let contractData = await getContractById(contractId);
        
        // If not found as contract, try to get as proposal
        if (!contractData) {
          console.log("[contract] Contract not found, trying as proposal:", contractId);
          const proposalData = await getProposalById(contractId);
          
          if (proposalData) {
            // Convert proposal to contract-like object with all fields preserved
            contractData = {
              id: proposalData.id,
              title: proposalData.proposalTitle || 'Untitled Proposal',
              vendorName: proposalData.companyName || 'Unknown Vendor',
              contractValue: proposalData.contractValue || 'Rp 0',
              startDate: proposalData.startDate || '',
              endDate: proposalData.endDate || '',
              status: proposalData.status === 'pending' ? 'pending' as const :          // Draft -> Verifikasi
                      proposalData.status === 'under_review' ? 'under_review' as const : // Under review -> Revisi
                      proposalData.status === 'approved' ? 'approved' as const :        // Approved -> Tanda Tangan
                      proposalData.status === 'rejected' ? 'rejected' as const :        // Rejected -> Declined
                      'pending' as const,
              createdAt: proposalData.createdAt,
              // Preserve original proposal fields
              ...proposalData
            };
          }
        }
        
        if (!contractData) {
          setError("Contract or proposal not found");
          setLoading(false);
          return;
        }

        setContract(contractData);
        
        // Map contract data to form data with proper fallbacks
        const data = contractData as any; // Type assertion to access all fields
        setFormData({
          companyName: data.vendorName || data.companyName || "",
          contactPerson: data.contactPerson || "Contact Person",
          proposalTitle: data.title || data.proposalTitle || "",
          serviceType: data.serviceType || "Service Type",
          technicalSpec: data.technicalSpec || "Technical specifications for this contract...",
          startDate: data.startDate || "",
          endDate: data.endDate || "",
          contractValue: data.contractValue || "",
          paymentTerms: data.paymentTerms || "Payment terms for this contract...",
        });

        // Determine contract status and steps based on the new workflow
        const statusMapping = {
          'pending': { step: 0, declined: false },      // Draft -> No steps completed yet
          'under_review': { step: 2, declined: false }, // Under review -> Revisi
          'approved': { step: 3, declined: false },     // Approved -> Tanda Tangan
          'active': { step: 4, declined: false },       // Active -> Kontrak Mulai
          'expired': { step: 5, declined: false },      // Expired -> Selesai (completed)
          'terminated': { step: 2, declined: true },    // Rejected -> Declined at Revisi
          'rejected': { step: 2, declined: true },      // Rejected -> Declined at Revisi
        };

        const statusInfo = statusMapping[contractData.status] || { step: 0, declined: false };
        setCurrentStep(statusInfo.step);
        setIsDeclined(statusInfo.declined);
        
        if (statusInfo.declined) {
          setDeclinedStep(1);
        }

        setLoading(false);
        setError(null);

      } catch (err: any) {
        console.error("[contract] Error fetching contract:", err);
        setError(err?.message || "Failed to load contract data");
        setLoading(false);
      }
    };

    fetchContract();
  }, [contractId, user]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <main className="mx-auto p-6 min-h-screen">
      {/* Loading State */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Error loading contract: {error}
          <button 
            onClick={() => router.back()}
            className="ml-4 underline hover:no-underline"
          >
            Go Back
          </button>
        </div>
      )}

      {/* Contract Not Found */}
      {!loading && !error && !contract && contractId && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
          Contract not found.
          <button 
            onClick={() => router.back()}
            className="ml-4 underline hover:no-underline"
          >
            Go Back
          </button>
        </div>
      )}

      {/* Contracts List View */}
      {!loading && !error && !contractId && (
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.base[700] }}>
            All Contracts
          </h2>
          
          <div className="bg-white rounded-lg shadow-sm">
            {contracts.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600">No contracts found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Contract Title
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Vendor
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Value
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((contractItem, index) => (
                      <tr
                        key={contractItem.id}
                        className="hover:bg-opacity-50 cursor-pointer"
                        style={{
                          borderBottom: index < contracts.length - 1 ? `1px solid ${colors.base[200]}` : "none",
                        }}
                        onClick={() => router.push(`/dashboard/vendor/contract?id=${contractItem.id}`)}
                      >
                        <td className="py-4 px-4 text-sm" style={{ color: colors.base[700] }}>
                          {contractItem.title}
                        </td>
                        <td className="py-4 px-4 text-sm" style={{ color: colors.base[700] }}>
                          {contractItem.vendorName}
                        </td>
                        <td className="py-4 px-4 text-sm" style={{ color: colors.base[700] }}>
                          {contractItem.contractValue}
                        </td>
                        <td className="py-4 px-4">
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: contractItem.status === 'active' ? colors.success[100] :
                                             contractItem.status === 'pending' ? colors.base[100] :
                                             contractItem.status === 'under_review' ? colors.warning[100] :
                                             contractItem.status === 'approved' ? colors.primary[100] :
                                             contractItem.status === 'expired' ? colors.base[100] :
                                             colors.error[100],
                              color: contractItem.status === 'active' ? colors.success[700] :
                                    contractItem.status === 'pending' ? colors.base[700] :
                                    contractItem.status === 'under_review' ? colors.warning[700] :
                                    contractItem.status === 'approved' ? colors.primary[700] :
                                    contractItem.status === 'expired' ? colors.base[700] :
                                    colors.error[700]
                            }}
                          >
                            {contractItem.status === 'active' ? 'Kontrak Mulai' :
                             contractItem.status === 'pending' ? 'Verifikasi' :
                             contractItem.status === 'under_review' ? 'Revisi' :
                             contractItem.status === 'approved' ? 'Tanda Tangan' :
                             contractItem.status === 'expired' ? 'Selesai' : 
                             contractItem.status === 'terminated' ? 'Ditolak' :
                             contractItem.status === 'rejected' ? 'Ditolak' : 'Unknown'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/dashboard/vendor/contract?id=${contractItem.id}`);
                            }}
                            className="text-sm hover:underline"
                            style={{ color: colors.primary[600] }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contract Content */}
      {!loading && !error && contract && (
        <>
          {/* Stepper Section */}
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.base[700] }}>
            {contract.status === 'pending' ? 'Status Proposal' : 'Status Kontrak'} - {contract.title}
          </h2>
          
          {/* Only show stepper if not expired */}
          {contract.status !== 'expired' && (
            <div className="my-6">
              <ContractStepper currentStep={currentStep} isDeclined={isDeclined} declinedStep={declinedStep} />
            </div>
          )}

          {/* Alert Section for Declined Contract */}
          {contract.status !== 'expired' && <ContractAlert isDeclined={isDeclined} />}

          {/* Main Content */}
          {contract.status === 'expired' ? (
            <ContractCompletedUI />
          ) : isDeclined ? (
            <DeclinedContractUI />
          ) : contract.status === 'active' ? (
            <ContractStartedUI contractId={contract.id} />
            ) : contract.status === 'approved' ? (
            <ContractSignatureUI contractData={{
              id: contract.id,
              title: contract.title,
              contractValue: contract.contractValue,
              startDate: contract.startDate,
              endDate: contract.endDate,
              companyName: contract.vendorName || formData.companyName
            }} />
          ) : (
            <NormalContractForm 
              formData={formData} 
              onInputChange={handleInputChange} 
              documentUrls={{
                proposalHargaUrl: (contract as any).proposalHargaUrl,
                companyDeedUrl: (contract as any).companyDeedUrl,
                businessLicenseUrl: (contract as any).businessLicenseUrl,
                portfolioUrl: (contract as any).portfolioUrl
              }} 
            />
          )}
        </>
      )}
    </main>
  );
}
