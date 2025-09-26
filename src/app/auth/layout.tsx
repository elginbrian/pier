"use client";

import React from "react";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  React.useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-gray-600">Loading…</div>
      </div>
    );
  }

  if (user)
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div>
          <Spinner size={48} />
        </div>
      </div>
    );

  return <>{children}</>;
}
