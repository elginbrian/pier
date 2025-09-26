"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { colors } from "@/design-system";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import { ExclamationTriangleIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import {
  subscribeToVendorData,
  Contract,
  Proposal,
  DashboardStats,
  Notification
} from "@/services/dashboard";

const ProposalPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Firebase data states
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    activeContracts: 0,
    pendingProposals: 0,
    expiringContracts: 0,
    totalValue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter proposals based on search term
  const filteredProposals = proposals.filter(proposal =>
    proposal.proposalTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposal.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proposal.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProposals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProposals = filteredProposals.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    console.log("[proposals] Setting up real-time data subscription for user:", user.uid);

    try {
      // Set up real-time data subscription
      const unsubscribe = subscribeToVendorData(user.uid, (data) => {
        console.log("[proposals] Real-time data update:", {
          contracts: data.contracts.length,
          proposals: data.proposals.length,
          stats: data.stats
        });

        setContracts(data.contracts);
        setProposals(data.proposals);
        setStats(data.stats);
        setLoading(false);
        setError(null);
      });

      return () => {
        unsubscribe();
      };
    } catch (err: any) {
      console.error("[proposals] Error setting up data subscription:", err);
      setError(err?.message || "Failed to load proposal data");
      setLoading(false);
    }
  }, [user]);

  // Generate chart data from real contract data
  const generateChartData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const currentYear = new Date().getFullYear();
    
    return months.map(month => {
      // For demo purposes, we'll use some calculated data based on real stats
      // In a real app, you'd track historical data
      const activeCount = Math.floor(Math.random() * 50) + stats.activeContracts;
      const completedCount = Math.floor(Math.random() * 30) + 20;
      
      return {
        month,
        aktif: activeCount,
        selesai: completedCount
      };
    });
  };

  const chartData = generateChartData();

  // Filter active contracts from the contracts data
  const activeContracts = contracts.filter(contract => 
    contract.status === 'active' || contract.status === 'pending'
  );

  // Use real active contracts data
  const activeContractsData = activeContracts.slice(0, 3).map((contract: Contract) => ({
    id: contract.id,
    title: contract.title,
    company: contract.vendorName,
    value: contract.contractValue,
    daysLeft: contract.daysRemaining || 0,
  }));

  // Contract table data - use real proposals data
  const contractsData = paginatedProposals.map(proposal => ({
    id: proposal.id.substring(0, 6),
    name: proposal.proposalTitle,
    amount: proposal.contractValue || "Rp 0",
    expiry: new Date(proposal.createdAt?.toDate?.() || proposal.createdAt).toLocaleDateString('id-ID'),
    type: proposal.serviceType,
    status: proposal.status === 'pending' ? 'Draft' as const :
           proposal.status === 'under_review' ? 'Diproses' as const :
           proposal.status === 'approved' ? 'Selesai' as const :
           proposal.status === 'rejected' ? 'Ditolak' as const : 'Draft' as const,
  }));

  const getStatusBadge = (status: "Draft" | "Diproses" | "Ditolak" | "Selesai") => {
    const statusConfig = {
      Draft: { bg: colors.base[100], text: colors.base[700] },
      Diproses: { bg: colors.warning[100], text: colors.warning[700] },
      Ditolak: { bg: colors.error[100], text: colors.error[700] },
      Selesai: { bg: colors.success[100], text: colors.success[700] },
    };

    const config = statusConfig[status] || statusConfig["Draft"];

    return (
      <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: config.bg, color: config.text }}>
        {status}
      </span>
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateProposal = () => {
    router.push('/dashboard/vendor/proposal/create');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.base[100] }}>
        <Spinner />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen p-6" style={{ backgroundColor: colors.base[100] }}>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading proposal data: {error}
        </div>
      </div>
    );
  }

  // Show empty state if no user
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.base[100] }}>
        <div className="text-center">
          <p className="text-gray-600">Please log in to view proposals</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.base[100] }}>
      <div className="p-6">
        {/* Linimasa Kontrak Chart */}
        <div className="rounded-lg shadow-sm mb-8 p-6" style={{ backgroundColor: "#ffffff" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold" style={{ color: colors.base[700] }}>
              Linimasa Kontrak
            </h2>
            <div className="text-sm" style={{ color: colors.base[600] }}>
              Tahun 2025
            </div>
          </div>

          <div className="flex items-center mb-4 space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5" style={{ backgroundColor: colors.primary[500] }}></div>
              <span className="text-sm" style={{ color: colors.base[600] }}>
                Kontrak Aktif
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5" style={{ backgroundColor: colors.base[700] }}></div>
              <span className="text-sm" style={{ color: colors.base[600] }}>
                Kontrak Selesai
              </span>
            </div>
          </div>

          {/* Simple Chart Placeholder */}
          <div className="h-80 flex items-end justify-between px-4" style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="flex flex-col items-center space-y-1">
                  <div
                    className="w-4 rounded-t"
                    style={{
                      height: `${(data.aktif / 120) * 200}px`,
                      backgroundColor: colors.primary[500],
                    }}
                  ></div>
                  <div
                    className="w-4 rounded-t"
                    style={{
                      height: `${(data.selesai / 120) * 200}px`,
                      backgroundColor: colors.base[700],
                    }}
                  ></div>
                </div>
                <span className="text-xs" style={{ color: colors.base[600] }}>
                  {data.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kontrak Aktif */}
          <div className="lg:col-span-2 rounded-lg shadow-sm" style={{ backgroundColor: "#ffffff" }}>
            <div className="p-6" style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold" style={{ color: colors.base[700] }}>
                  Kontrak Aktif
                </h2>
                <button className="text-sm font-medium hover:underline" style={{ color: colors.primary[600] }}>
                  Lihat Semua
                </button>
              </div>
            </div>

            <div>
              {activeContractsData.map((contract, index) => (
                <div key={contract.id}>
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.primary[100] }}>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={colors.primary[600]}>
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" />
                          <polyline points="14,2 14,8 20,8" strokeWidth="2" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium" style={{ color: colors.base[700] }}>
                          {contract.title}
                        </h3>
                        <p className="text-sm" style={{ color: colors.base[600] }}>
                          {contract.company} - {contract.value}
                        </p>
                      </div>
                    </div>
                    <span
                      className="px-3 py-1 text-xs font-medium rounded-full"
                      style={{
                        backgroundColor: colors.primary[100],
                        color: colors.primary[700],
                      }}
                    >
                      {contract.daysLeft} Hari
                    </span>
                  </div>
                  {index < activeContractsData.length - 1 && <div style={{ borderTop: `1px solid ${colors.base[200]}` }}></div>}
                </div>
              ))}
            </div>

            {/* Table Section */}
            <div className="p-6" style={{ borderTop: `1px solid ${colors.base[200]}` }}>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Nama Kontrak
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Jumlah Biaya
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Tanggal Kadaluarsa
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Tipe
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium" style={{ color: colors.base[600] }}>
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contractsData.map((contract, index) => (
                      <tr
                        key={contract.id}
                        className="hover:bg-opacity-50"
                        style={{
                          borderBottom: index < contractsData.length - 1 ? `1px solid ${colors.base[200]}` : "none",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.base[100])}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <td className="py-4 px-4 text-sm" style={{ color: colors.base[700] }}>
                          {contract.id}
                        </td>
                        <td className="py-4 px-4 text-sm" style={{ color: colors.base[700] }}>
                          {contract.name}
                        </td>
                        <td className="py-4 px-4 text-sm" style={{ color: colors.base[700] }}>
                          {contract.amount}
                        </td>
                        <td className="py-4 px-4 text-sm" style={{ color: colors.base[700] }}>
                          {contract.expiry}
                        </td>
                        <td className="py-4 px-4 text-sm" style={{ color: colors.base[700] }}>
                          {contract.type}
                        </td>
                        <td className="py-4 px-4">{getStatusBadge(contract.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm" style={{ color: colors.base[600] }}>
                  Menampilkan 1-4 dari 24 kontrak
                </p>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 text-sm hover:underline" style={{ color: colors.base[600] }} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                    Previous
                  </button>
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      className="w-8 h-8 text-sm rounded"
                      style={{
                        backgroundColor: currentPage === page ? colors.primary[600] : "transparent",
                        color: currentPage === page ? "#ffffff" : colors.base[600],
                      }}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-3 py-2 text-sm hover:underline" style={{ color: colors.base[600] }} onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Aksi Cepat */}
          <div className="rounded-lg shadow-sm" style={{ backgroundColor: "#ffffff" }}>
            <div className="p-6" style={{ borderBottom: `1px solid ${colors.base[200]}` }}>
              <h2 className="text-lg font-semibold" style={{ color: colors.base[700] }}>
                Aksi Cepat
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <button className="w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors hover:opacity-90" style={{ backgroundColor: colors.primary[600], color: "#ffffff" }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" />
                  <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" />
                </svg>
                <span>Ajukan Proposal Baru</span>
              </button>

              <button
                className="w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors hover:opacity-90"
                style={{
                  backgroundColor: colors.base[100],
                  color: colors.base[700],
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" />
                  <polyline points="7,10 12,15 17,10" strokeWidth="2" />
                  <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2" />
                </svg>
                <span>Export Laporan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalPage;
