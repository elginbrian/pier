"use client";

import React from "react";
import { colors } from "@/design-system";

type Props = { proposal?: any };

export default function VendorInfoCard({ proposal }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-semibold mb-4" style={{ color: colors.base[700] }}>
        Informasi Vendor
      </h3>
      <div className="space-y-3 text-sm">
        <div>
          <span className="font-medium" style={{ color: colors.base[600] }}>
            Nama:
          </span>
          <p style={{ color: colors.base[700] }}>{proposal?.companyName || "-"}</p>
        </div>
        <div>
          <span className="font-medium" style={{ color: colors.base[600] }}>
            PIC:
          </span>
          <p style={{ color: colors.base[700] }}>{proposal?.contactPerson || "-"}</p>
        </div>
        <div>
          <span className="font-medium" style={{ color: colors.base[600] }}>
            Kontak:
          </span>
          <p style={{ color: colors.base[700] }}>{proposal?.contactPhone || "-"}</p>
        </div>
      </div>
    </div>
  );
}
