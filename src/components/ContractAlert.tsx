'use client';

import React from 'react';
import { colors } from '@/design-system';

interface ContractAlertProps {
  isDeclined: boolean;
  title?: string;
  description?: string;
  feedbackNotes?: string[];
}

export default function ContractAlert({ 
  isDeclined, 
  title = "Kontrak anda perlu revisi",
  description = "Revisi kontrak anda sesuai arahan dari Unit Pengadaan untuk melanjutkan kembali",
  feedbackNotes = [
    "Naik karena tingkat bunga tabungan stabil di 6% per tahun. Jadi uangmu terus bertambah sedikit demi sedikit.",
    "Naik karena tingkat bunga tabungan stabil di 6% per tahun. Jadi uangmu terus bertambah sedikit demi sedikit.",
    "Naik karena tingkat bunga tabungan stabil di 6% per tahun. Jadi uangmu terus bertambah sedikit demi sedikit."
  ]
}: ContractAlertProps) {
  if (!isDeclined) {
    return null;
  }

  return (
    <div
      className="rounded-lg p-6 mb-8 border"
      style={{
        backgroundColor: colors.error[100],
        borderColor: colors.error[300]
      }}
    >
      <div className="flex items-start">
        <div
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: colors.error[400] }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#ffffff">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <line x1="15" y1="9" x2="9" y2="15" strokeWidth="2" />
            <line x1="9" y1="9" x2="15" y2="15" strokeWidth="2" />
          </svg>
        </div>
        <div className="flex-1">
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: colors.error[700] }}
          >
            {title}
          </h3>
          <p
            className="text-sm mb-4"
            style={{ color: colors.error[600] }}
          >
            {description}
          </p>

          <div>
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: colors.error[700] }}
            >
              Catatan dari Pengadaan
            </h4>
            <div className="space-y-2">
              {feedbackNotes.map((note, index) => (
                <div key={index} className="flex items-start">
                  <div
                    className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                    style={{ backgroundColor: colors.error[400] }}
                  ></div>
                  <p
                    className="text-sm"
                    style={{ color: colors.error[600] }}
                  >
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}