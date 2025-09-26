"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Spinner from "../../../components/Spinner";

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (user.role !== "vendor") {
      const dest = user.role === "hukum" ? "/dashboard/hukum" : "/";
      router.replace(dest);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size={48} />
      </div>
    );
  }

  if (!user || user.role !== "vendor") return null;

  return <>{children}</>;
}
