"use client";

import React from "react";

export default function Spinner({ size = 48 }: { size?: number }) {
  const border = Math.max(4, Math.round(size / 12));
  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderWidth: border,
  };

  return (
    <div role="status" aria-live="polite" className="flex items-center justify-center">
      <div className="rounded-full animate-spin" style={{ ...style, borderStyle: "solid", borderColor: "#e5e7eb", borderTopColor: "#0ea5e9" }} />
    </div>
  );
}
