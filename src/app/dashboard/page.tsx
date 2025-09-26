"use client";

import React from "react";
import { MagnifyingGlassIcon, DocumentTextIcon, DocumentChartBarIcon, ArrowDownTrayIcon, ExclamationTriangleIcon, ClockIcon, PlusIcon } from "@heroicons/react/24/outline";
import { colors } from "../../design-system";

export default function DashboardPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div>
        <div className="mx-auto">
          <header className="fixed top-0 z-30 bg-white border-b border-gray-200 shadow-sm w-full md:left-[260px] md:w-[calc(100%-260px)]">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="md:hidden">
                <button aria-label="open menu" onClick={() => {}} className="p-2 rounded-md border bg-white shadow-sm" style={{ borderColor: colors.base[300] }}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <h1 className="hidden md:block text-2xl font-semibold text-gray-900 md:ml-[220px]">Dashboard</h1>

              <h1 className="md:hidden text-xl font-semibold text-gray-900">Dashboard</h1>

              <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input placeholder="Cari kontrak..." className="pl-10 pr-4 py-2 rounded-lg border bg-white shadow-sm text-sm" style={{ borderColor: colors.base[200], minWidth: 250 }} />
                </div>
                <div className="w-8 h-8 rounded-full bg-white border flex items-center justify-center shadow-sm text-xs font-medium" style={{ borderColor: colors.base[200] }}>
                  3
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <img src="/testimony.png" alt="avatar" className="w-8 h-8 rounded-full" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">PT. Makan Gratis B</div>
                    <div className="text-xs text-gray-500">Manager Procurement</div>
                  </div>
                </div>

                <div className="sm:hidden">
                  <img src="/testimony.png" alt="avatar" className="w-8 h-8 rounded-full" />
                </div>
              </div>
            </div>
          </header>

          <div className="h-16 md:h-16" aria-hidden />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="rounded-xl p-6 shadow-sm border border-gray-100" style={{ backgroundColor: colors.primary[300] }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: colors.primary[300] }}>
                  <DocumentTextIcon className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">PT Vendor Teknologi</div>
                  <div className="mt-1 text-xs text-white">Vendor ID: VND-2024-001</div>
                  <div className="mt-3 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-green-600 text-white">✓ Terverifikasi</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <DocumentChartBarIcon className="w-12 h-12" style={{ color: colors.primary[300] }} />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">Kontrak Aktif</div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">247</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <span>↗</span> +12%
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Mendekati Expired</div>
                <div className="text-3xl font-bold text-orange-500 mb-1">18</div>
                <div className="text-xs text-orange-500 flex items-center justify-center gap-1">
                  <ExclamationTriangleIcon className="w-3 h-3" />
                  30 hari
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Kontrak Aktif */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Kontrak Aktif</h2>
                  <button className="text-sm font-medium" style={{ color: colors.primary[300] }}>
                    Lihat Semua
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
                          <div className="font-medium text-gray-900">Kontrak Pemeliharaan</div>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifikasi & Pengingat</h3>
                <div className="space-y-4">
                  {/* Expired Warning */}
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                    <div className="flex items-start gap-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-red-900 text-sm">Kontrak akan berakhir dalam 15 hari</div>
                        <div className="text-sm text-red-700 mt-1">Kontrak Layanan Kebersihan dengan PT Clean Service</div>
                      </div>
                    </div>
                  </div>

                  {/* Review Pending */}
                  <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex items-start gap-3">
                      <ClockIcon className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-orange-900 text-sm">Review hukum menunggu persetujuan</div>
                        <div className="text-sm text-orange-700 mt-1">3 dokumen kontrak menunggu review dari tim hukum</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <div className="flex items-start gap-3">
                      <ClockIcon className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-orange-900 text-sm">Review hukum menunggu persetujuan</div>
                        <div className="text-sm text-orange-700 mt-1">3 dokumen kontrak menunggu review dari tim hukum</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-white transition-colors" style={{ backgroundColor: colors.primary[300] }}>
                  <PlusIcon className="w-4 h-4" />
                  Ajukan Proposal Baru
                </button>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-gray-700 hover:bg-gray-50 transition-colors" style={{ borderColor: colors.base[300] }}>
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Export Laporan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
