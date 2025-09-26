"use client";

import React from "react";
import Spinner from "../../components/Spinner";

export default function DashboardLoading() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner size={48} />
        <span className="text-sm text-gray-600">Memuat...</span>
      </div>
    </div>
  );
}
