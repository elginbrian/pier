"use client";

import { useCallback, useState } from "react";
import { analyzeFile, NerResult } from "../services/ner";

export function useNer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<NerResult | null>(null);

  const submitFile = useCallback(async (file: File | Blob, filename?: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const r = await analyzeFile(file, filename);
      setResult(r);
      return r;
    } catch (e: any) {
      setError(e?.message ?? String(e));
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, result, submitFile } as const;
}
