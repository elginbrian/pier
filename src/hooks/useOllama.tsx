"use client";

import { useCallback, useState } from "react";
import { generateText, OllamaGenerateOptions } from "../services/ollama";

export function useOllama() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);

  const run = useCallback(async (prompt: string, opts?: OllamaGenerateOptions) => {
    setLoading(true);
    setError(null);
    setOutput(null);
    try {
      const text = await generateText(prompt, opts);
      setOutput(text);
      return text;
    } catch (e: any) {
      setError(e?.message ?? String(e));
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, output, run } as const;
}
