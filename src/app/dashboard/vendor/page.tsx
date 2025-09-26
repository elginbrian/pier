"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon, DocumentTextIcon, DocumentChartBarIcon, ArrowDownTrayIcon, ExclamationTriangleIcon, ClockIcon, PlusIcon } from "@heroicons/react/24/outline";
import { colors } from "@/design-system";

export default function DashboardPage() {
  const router = useRouter();
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
                  <div className="text-sm font-semibold text-white">PT Vendor Teknologi</div>
                  <div className="mt-1 text-xs text-white">Vendor ID: VND-2024-001</div>
                  <div className="mt-3 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-green-600 text-white">✓ Verified</div>
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
                  <div className="text-3xl font-bold text-gray-900 mb-1">247</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <span>↗</span> +12%
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
                  <div className="text-3xl font-bold text-orange-500 mb-1">18</div>
                  <div className="text-xs text-orange-500 flex items-center gap-1">
                    <span className="text-xs">30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Kontrak Aktif */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Active Contracts</h2>
                  <button className="text-sm font-medium" style={{ color: colors.primary[300] }}>
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <DocumentTextIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Maintenance Contract</div>
                          <div className="text-sm text-gray-500">PT Service Pro - Rp 1.2M</div>
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">90 Hari</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifikasi & Pengingat */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications & Reminders</h3>
                <div className="space-y-4">
                  {/* Expired Warning */}
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <div className="flex items-start gap-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-red-900 text-sm">Contract will expire in 15 days</div>
                        <div className="text-sm text-red-700 mt-1">Cleaning Service Contract with PT Clean Service</div>
                      </div>
                    </div>
                  </div>

                  {/* Review Pending */}
                  <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex items-start gap-3">
                      <ClockIcon className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-orange-900 text-sm">Legal review pending approval</div>
                        <div className="text-sm text-orange-700 mt-1">3 contract documents are awaiting legal team review</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex items-start gap-3">
                      <ClockIcon className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-orange-900 text-sm">Legal review pending approval</div>
                        <div className="text-sm text-orange-700 mt-1">3 contract documents are awaiting legal team review</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/dashboard/vendor/proposal/create")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-white transition-colors"
                  style={{ backgroundColor: colors.primary[300] }}
                >
                  <PlusIcon className="w-4 h-4" />
                  Submit New Proposal
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
