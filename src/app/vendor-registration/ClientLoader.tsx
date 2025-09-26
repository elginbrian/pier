"use client";

import React, { useState, useEffect } from "react";

export default function ClientLoader() {
  const [LoadedComp, setLoadedComp] = useState<React.ComponentType<any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import("./ClientPage");
        if (!mounted) return;
        setLoadedComp(() => mod.default);
      } catch (e: any) {
        console.error("Failed to load client form", e);
        if (mounted) setError("Failed to load form. Try again later.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (LoadedComp) {
    const C = LoadedComp;
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-auto">
        <C />
      </div>
    );
  }

  return null;
}
