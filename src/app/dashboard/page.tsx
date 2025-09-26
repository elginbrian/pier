"use client";

import React from "react";
import Button from "../../components/Button";
import { colors } from "../../design-system";

export default function DashboardPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div>
        <div className="w-full mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <input placeholder="Cari kontrak..." className="px-4 py-2 rounded-full border bg-white shadow" style={{ borderColor: colors.base[200], minWidth: 360 }} />
              <div className="w-10 h-10 rounded-full bg-white border flex items-center justify-center" style={{ borderColor: colors.base[200] }}>
                3
              </div>
              <div className="flex items-center gap-3">
                <img src="/testimony.png" alt="avatar" className="w-9 h-9 rounded-full" />
                <div className="text-sm text-gray-600">
                  PT. Makan Gratis B
                  <br />
                  <span className="text-xs text-gray-400">Manager Procurement</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow border border-gray-100">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-lg flex-shrink-0" style={{ background: colors.primary[300] }} />
                <div className="flex-1">
                  <div className="text-sm font-semibold">PT Vendor Teknologi</div>
                  <div className="text-xs text-gray-500">Vendor ID: VND-2024-001</div>
                  <div className="mt-3 inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full" style={{ background: colors.primary[300], color: "#fff" }}>
                    Terverifikasi
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500">Kontrak Aktif</div>
                  <div className="text-3xl font-bold">247</div>
                  <div className="text-xs text-green-500">+12%</div>
                </div>
                <div className="text-right w-40">
                  <div className="text-sm text-gray-500">Mendekati Expired</div>
                  <div className="text-3xl font-bold text-orange-500">18</div>
                  <div className="text-xs text-gray-400">30 hari</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="text-sm text-gray-500">Aksi Cepat</div>
                <div className="mt-4 space-y-3">
                  <Button variant="primary" size="sm" className="w-full">
                    + Ajukan Proposal Baru
                  </Button>
                  <button className="w-full text-left px-4 py-3 rounded-lg border" style={{ borderColor: colors.base[300] }}>
                    Export Laporan
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl shadow border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Kontrak Aktif</h2>
                {/* I added href="#" to make this a valid anchor tag */}
                <a href="#" className="text-sm text-blue-600">
                  Lihat Semua
                </a>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Kontrak Pemeliharaan", sub: "PT Service Pro - Rp 1.2M", badge: "90 Hari", color: "bg-blue-50 text-blue-600" },
                  { title: "Kontrak Pemeliharaan", sub: "PT Service Pro - Rp 1.2M", badge: "90 Hari", color: "bg-blue-50 text-blue-600" },
                  { title: "Kontrak Pemeliharaan", sub: "PT Service Pro - Rp 1.2M", badge: "90 Hari", color: "bg-blue-50 text-blue-600" },
                ].map((c, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow border border-gray-50 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-md ${c.color} flex items-center justify-center mr-4`}>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M3 7h18M3 12h18M3 17h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">{c.title}</div>
                        <div className="text-sm text-gray-500">{c.sub}</div>
                      </div>
                    </div>
                    <div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{c.badge}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-3">Notifikasi & Pengingat</h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg" style={{ background: "#fff5f5", border: `1px solid ${colors.error[100]}` }}>
                    <div className="font-medium text-sm">Kontrak akan berakhir dalam 15 hari</div>
                    <div className="text-sm text-gray-500">Kontrak Layanan Kebersihan dengan PT Clean Service</div>
                  </div>

                  <div className="p-4 rounded-lg" style={{ background: "#fff7ed", border: `1px solid ${colors.warning[100]}` }}>
                    <div className="font-medium text-sm">Review hukum menunggu persetujuan</div>
                    <div className="text-sm text-gray-500">3 dokumen kontrak menunggu review dari tim hukum</div>
                  </div>

                  <div className="p-4 rounded-lg" style={{ background: "#fff7ed", border: `1px solid ${colors.warning[100]}` }}>
                    <div className="font-medium text-sm">Review hukum menunggu persetujuan</div>
                    <div className="text-sm text-gray-500">3 dokumen kontrak menunggu review dari tim hukum</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Aksi Cepat</h3>
              <div className="space-y-3">
                <Button variant="primary">+ Ajukan Proposal Baru</Button>
                <button className="w-full text-left px-4 py-3 rounded-lg border" style={{ borderColor: colors.base[300] }}>
                  Riwayat Proposal
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg border" style={{ borderColor: colors.base[300] }}>
                  Cari Kontrak
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg border" style={{ borderColor: colors.base[300] }}>
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
