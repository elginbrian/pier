"use client";
import React from "react";

export default function Toast({ type = "info", message }: { type?: "success" | "error" | "info"; message: string }) {
  const bg = type === "success" ? "bg-green-50 border-green-200 text-green-800" : type === "error" ? "bg-red-50 border-red-200 text-red-800" : "bg-white border-gray-200 text-gray-800";

  return (
    <div className={`max-w-md w-full p-3 rounded-lg border shadow-sm ${bg}`}>
      <div className="text-sm">{message}</div>
    </div>
  );
}
