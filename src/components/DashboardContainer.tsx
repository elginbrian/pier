import React from "react";

export default function DashboardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-0">{children}</div>
    </div>
  );
}
