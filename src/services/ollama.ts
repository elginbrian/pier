"use client";

import axios from "axios";

export type OllamaGenerateOptions = {
  model?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
};

function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return (process.env.NEXT_PUBLIC_OLLAMA_BASE_URL as string) || "https://ollama.elginbrian.com";
  }
  return (process.env.OLLAMA_BASE_URL as string) || "https://ollama.elginbrian.com";
}

export async function generateText(prompt: string, opts?: OllamaGenerateOptions): Promise<string> {
  const base = getBaseUrl().replace(/\/+$/, "");
  const model = opts?.model ?? "google/gemma-2b";

  const body: Record<string, any> = {
    model,
    prompt,
  };
  if (opts?.max_tokens != null) body.max_tokens = opts.max_tokens;
  if (opts?.temperature != null) body.temperature = opts.temperature;
  if (opts?.top_p != null) body.top_p = opts.top_p;

  try {
    const res = await axios.post(`${base}/api/generate`, body, {
      headers: { "Content-Type": "application/json" },
      responseType: "text",
    });

    const raw = res.data as string;
    try {
      const json = JSON.parse(raw);
      if (typeof json === "string") return json;
      if (Array.isArray(json)) {
        return json
          .map((item: any) => item.text ?? item.content ?? item.output ?? "")
          .filter(Boolean)
          .join("\n");
      }
      if (typeof json === "object") {
        return (json.text as string) || (json.content as string) || (json.output as string) || JSON.stringify(json);
      }
    } catch (e) {}

    return raw;
  } catch (e: any) {
    if (e?.response) {
      throw new Error(e.response.data || e.response.statusText || `HTTP ${e.response.status}`);
    }
    throw e;
  }
}
