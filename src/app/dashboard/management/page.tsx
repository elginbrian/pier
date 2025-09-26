"use client";

import React from "react";
import { colors } from '@/design-system';
import LineChart from '@/components/LineChart';

export default function ManagementDashboardPage() {
  // Chart data for Linimasa Kontrak
  const chartData = [
    { month: 'Jan', aktif: 89, selesai: 65 },
    { month: 'Feb', aktif: 96, selesai: 60 },
    { month: 'Mar', aktif: 106, selesai: 45 },
    { month: 'Apr', aktif: 110, selesai: 41 },
    { month: 'Mei', aktif: 97, selesai: 44 },
    { month: 'Jun', aktif: 88, selesai: 55 },
    { month: 'Jul', aktif: 94, selesai: 56 },
    { month: 'Agu', aktif: 108, selesai: 46 },
    { month: 'Sep', aktif: 116, selesai: 39 },
    { month: 'Okt', aktif: 113, selesai: 35 },
    { month: 'Nov', aktif: 102, selesai: 45 },
    { month: 'Des', aktif: 84, selesai: 32 }
  ];

  // Timeline contracts data
  const timelineContracts = [
    {
      id: 1,
      company: 'Kontrak PT. ABC Industries',
      expiry: 'Berakhir: 15 Januari 2025',
      daysLeft: '2 hari',
      status: 'urgent',
      borderColor: colors.error[500]
    },
    {
      id: 2,
      company: 'Kontrak CV. XYZ Solutions',
      expiry: 'Berakhir: 28 Januari 2025',
      daysLeft: '15 hari',
      status: 'warning',
      borderColor: colors.warning[500]
    },
    {
      id: 3,
      company: 'Kontrak PT. DEF Corp',
      expiry: 'Berakhir: 10 Februari 2025',
      daysLeft: '28 hari',
      status: 'caution',
      borderColor: colors.warning[400]
    },
    {
      id: 4,
      company: 'Kontrak PT. GHI Tech',
      expiry: 'Berakhir: 25 Februari 2025',
      daysLeft: '43 hari',
      status: 'normal',
      borderColor: colors.primary[500]
    }
  ];

  // Status data
  const statusData = [
    {
      label: 'Aktif',
      count: 247,
      color: colors.success[300],
      textColor: colors.success[500]
    },
    {
      label: 'Pending Renewal',
      count: 18,
      color: colors.secondary[200],
      textColor: colors.secondary[400]
    },
    {
      label: 'Expired',
      count: 12,
      color: colors.error[300],
      textColor: colors.error[500]
    },
    {
      label: 'Draft',
      count: 8,
      color: colors.base[400],
      textColor: colors.base[600]
    }
  ];

  const getDaysColor = (daysLeft: string) => {
    const days = parseInt(daysLeft);
    if (days <= 5) return colors.error[500];
    if (days <= 15) return colors.warning[500];
    if (days <= 30) return colors.warning[400];
    return colors.primary[500];
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Total Kontrak */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: colors.base[500] }}>Total Kontrak</p>
                <p className="text-3xl font-bold" style={{ color: colors.base[700] }}>24</p>
              </div>
              <img
                src="/management-file.svg"
                alt="Management File"
                className="w-8 h-8 rounded-lg object-contain"
              />
            </div>
          </div>

          {/* Kontrak Aktif */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: colors.base[500] }}>Kontrak Aktif</p>
                <p className="text-3xl font-bold" style={{ color: colors.base[700] }}>8</p>
              </div>
              <img
                src="/tick-fill.svg"
                alt="Tick"
                className="w-8 h-8 rounded-lg object-contain"
              />
            </div>
          </div>

          {/* Pending Review */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: colors.base[500] }}>Pending Review</p>
                <p className="text-3xl font-bold" style={{ color: colors.base[700] }}>5</p>
              </div>
              <img
                src="/pending-fill.svg"
                alt="Pending Fill"
                className="w-8 h-8 rounded-lg object-contain"
              />
            </div>
          </div>

          {/* Akan Berakhir */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: colors.base[500] }}>Akan Berakhir</p>
                <p className="text-3xl font-bold" style={{ color: colors.base[700] }}>3</p>
              </div>
              <img
                src="/warning-fill.svg"
                alt="Warning Fill"
                className="w-8 h-8 rounded-lg object-contain"
              />
            </div>
          </div>
        </div>

        {/* Linimasa Kontrak Chart */}
        <h2 className="text-lg font-semibold" style={{ color: colors.base[700] }}>Linimasa Kontrak</h2>
        <div className="bg-white rounded-lg shadow-sm mb-8 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm font-medium" style={{ color: colors.base[700] }}>Tahun 2025</div>
          </div>

          <div className="rounded-lg p-4" style={{ height: '320px', backgroundColor: colors.base[100] }}>
            <LineChart data={chartData} height={280} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Timeline Tenggat Waktu */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold pb-2" style={{ color: colors.base[700] }}>Timeline Tenggat Waktu</h2>
              <div className="space-y-4">
                {timelineContracts.map((contract, index) => (
                  <div
                    className={`flex items-start gap-4 p-2 rounded-lg border-l-4`}
                    style={{
                      borderColor: contract.borderColor,
                      backgroundColor: `${contract.borderColor}1a`
                    }}
                    key={index}
                  >
                    <div className="flex items-center w-full space-x-4">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: contract.borderColor, minWidth: '1rem', minHeight: '1rem' }}
                      ></div>
                      <div>
                        <h3 className="text-sm font-semibold mb-1" style={{ color: colors.base[700] }}>
                          {contract.company}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: colors.base[500] }}>
                          {contract.expiry}
                        </p>
                      </div>
                      <span className="text-sm font-semibold ml-auto" style={{ color: getDaysColor(contract.daysLeft) }}>
                        {contract.daysLeft}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status Kontrak */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold pb-2" style={{ color: colors.base[700] }}>Status Kontrak</h2>
            <div className="space-y-4">
              {statusData.map((status, index) => (
                <div key={index} className="flex items-center py-3 rounded-lg" style={{ backgroundColor: `${status.color}33` }}>
                  <div className="flex items-center w-full space-x-2 px-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: status.color, minWidth: '1rem', minHeight: '1rem' }}
                    ></div>
                    <span className="text-sm font-bold w-full" style={{ color: colors.base[700] }}>
                      {status.label}
                    </span>
                    <span className="text-lg font-bold pr-4 text-end" style={{ color: status.textColor }}>
                      {status.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};