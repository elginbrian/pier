import React from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Dashboard - PIER",
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-extrabold">Dashboard</h1>
          <div className="text-sm text-gray-600">Selamat datang di PIER</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">Total Kontrak</div>
            <div className="text-2xl font-bold mt-2">1,254</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">Kontrak Aktif</div>
            <div className="text-2xl font-bold mt-2">842</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">Kontrak Baru (30d)</div>
            <div className="text-2xl font-bold mt-2">23</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Ringkasan Aktivitas</h2>
            <div className="h-64 bg-gray-50 rounded border border-dashed border-gray-200 flex items-center justify-center text-gray-400">Grafik placeholder</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Notifikasi</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>Belum ada notifikasi baru.</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
