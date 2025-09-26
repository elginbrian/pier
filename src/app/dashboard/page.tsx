"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    const dest = user.role === "hukum" ? "/dashboard/hukum" : "/dashboard/vendor";
    router.replace(dest);
  }, [user, loading, router]);

  return <div />;
}
