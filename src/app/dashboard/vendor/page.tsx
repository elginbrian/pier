"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon, DocumentTextIcon, DocumentChartBarIcon, ArrowDownTrayIcon, ExclamationTriangleIcon, ClockIcon, PlusIcon } from "@heroicons/react/24/outline";
import { colors } from "@/design-system";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import {
  subscribeToVendorData,
  Contract,
  Proposal,
  DashboardStats,
  Notification
} from "@/services/dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    activeContracts: 0,
    pendingProposals: 0,
    expiringContracts: 0,
    totalValue: 0
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    console.log("[dashboard] Setting up real-time data subscription for user:", user.uid);

    try {
      // Set up real-time data subscription
      const unsubscribe = subscribeToVendorData(user.uid, (data) => {
        console.log("[dashboard] Real-time data update:", {
          contracts: data.contracts.length,
          proposals: data.proposals.length,
          activeContracts: data.stats.activeContracts,
          notifications: data.notifications.length
        });

        setContracts(data.contracts);
        setProposals(data.proposals);
        setStats(data.stats);
        setNotifications(data.notifications);
        setLoading(false);
        setError(null); // Clear any previous errors
      });

      return () => {
        unsubscribe();
      };
    } catch (err: any) {
      console.error("[dashboard] Error setting up data subscription:", err);
      setError(err?.message || "Failed to load dashboard data");
      setLoading(false);
    }
  }, [user]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatContractValue = (value: string) => {
    const numValue = parseFloat(value.replace(/[^\d]/g, '')) || 0;
    if (numValue >= 1000000000) {
      return `Rp ${(numValue / 1000000000).toFixed(1)}B`;
    } else if (numValue >= 1000000) {
      return `Rp ${(numValue / 1000000).toFixed(1)}M`;
    } else if (numValue >= 1000) {
      return `Rp ${(numValue / 1000).toFixed(1)}K`;
    }
    return `Rp ${numValue.toLocaleString('id-ID')}`;
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'error':
        return { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-500', title: 'text-red-900', message: 'text-red-700' };
      case 'warning':
        return { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-500', title: 'text-orange-900', message: 'text-orange-700' };
      case 'info':
        return { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-500', title: 'text-blue-900', message: 'text-blue-700' };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-200', icon: 'text-gray-500', title: 'text-gray-900', message: 'text-gray-700' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  return (
    <div style={{ minHeight: "100vh" }}>
      <div>
        <div className="mx-auto">
          <div className="h-4 md:h-4" aria-hidden />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="rounded-xl p-6 shadow-sm border border-gray-100" style={{ backgroundColor: colors.primary[300] }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center bg-white/10">
                  <DocumentTextIcon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{user?.email?.split('@')[0] || 'Vendor'}</div>
                  <div className="mt-1 text-xs text-white">User ID: {user?.uid?.slice(-8).toUpperCase()}</div>
                  <div className="mt-3 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-green-600 text-white">
                    ✓ Active
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center bg-blue-50">
                  <DocumentChartBarIcon className="w-8 h-8" style={{ color: colors.primary[300] }} />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">Active Contracts</div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stats.activeContracts}</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <span>{formatCurrency(stats.totalValue)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center bg-orange-100">
                  <ExclamationTriangleIcon className="w-8 h-8 text-orange-500" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">Expiring Soon</div>
                  <div className="text-3xl font-bold text-orange-500 mb-1">{stats.expiringContracts}</div>
                  <div className="text-xs text-orange-500 flex items-center gap-1">
                    <span className="text-xs">30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Active Contracts</h2>
                  <button 
                    className="text-sm font-medium" 
                    style={{ color: colors.primary[300] }}
                    onClick={() => router.push("/dashboard/vendor/contract")}
                  >
                    View All
                  </button>
                </div>

                {contracts.length === 0 ? (
                  <div className="text-center py-8">
                    <DocumentTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No active contracts yet</p>
                    <p className="text-gray-400 text-xs mt-1">Submit a proposal to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contracts.slice(0, 3).map((contract) => (
                      <div key={contract.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{contract.title}</div>
                            <div className="text-sm text-gray-500">{contract.vendorName} - {formatContractValue(contract.contractValue)}</div>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          contract.daysRemaining !== undefined && contract.daysRemaining <= 30
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {contract.daysRemaining !== undefined 
                            ? `${contract.daysRemaining} Hari` 
                            : contract.status.charAt(0).toUpperCase() + contract.status.slice(1)
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Notifikasi & Pengingat */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications & Reminders</h3>
                
                {notifications.length === 0 ? (
                  <div className="text-center py-8">
                    <ClockIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">No notifications</p>
                    <p className="text-gray-400 text-xs mt-1">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notifications.slice(0, 3).map((notification) => {
                      const colors = getNotificationColor(notification.type);
                      const IconComponent = notification.type === 'warning' || notification.type === 'error' 
                        ? ExclamationTriangleIcon 
                        : ClockIcon;
                      
                      return (
                        <div key={notification.id} className={`p-4 rounded-lg border ${colors.bg} ${colors.border}`}>
                          <div className="flex items-start gap-3">
                            <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.icon}`} />
                            <div className="flex-1">
                              <div className={`font-medium text-sm ${colors.title}`}>{notification.title}</div>
                              <div className={`text-sm mt-1 ${colors.message}`}>{notification.message}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {notifications.length > 3 && (
                      <div className="text-center pt-2">
                        <button 
                          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                          onClick={() => {/* TODO: Show all notifications */}}
                        >
                          View {notifications.length - 3} more notifications
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              {/* Proposal Stats */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Proposals</span>
                  <span className="font-semibold text-gray-900">{proposals.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending Review</span>
                  <span className="font-semibold text-orange-600">{stats.pendingProposals}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => router.push("/dashboard/vendor/proposal/create")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-white transition-colors"
                  style={{ backgroundColor: colors.primary[300] }}
                >
                  <PlusIcon className="w-4 h-4" />
                  Submit New Proposal
                </button>

                <button 
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-gray-700 hover:bg-gray-50 transition-colors" 
                  style={{ borderColor: colors.base[300] }}
                  onClick={() => router.push("/dashboard/vendor/proposal")}
                >
                  <DocumentTextIcon className="w-4 h-4" />
                  View Proposals
                </button>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-gray-700 hover:bg-gray-50 transition-colors" style={{ borderColor: colors.base[300] }}>
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
