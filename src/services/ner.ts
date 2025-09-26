"use client";

import axios from "axios";

export type NerResult = any;

function getNerBaseUrl(): string {
  if (typeof window !== "undefined") {
    return (process.env.NEXT_PUBLIC_NER_BASE_URL as string) || "https://ner.elginbrian.com";
  }
  return (process.env.NER_BASE_URL as string) || "https://ner.elginbrian.com";
}

export async function analyzeFile(file: File | Blob, filename?: string): Promise<NerResult> {
  const base = getNerBaseUrl().replace(/\/+$/, "");

  const form = new FormData();
  const name = filename || (file instanceof File ? file.name : "upload.bin");
  form.append("file", file, name);

  try {
    // In browser, let axios/browser set the Content-Type (including boundary)
    const res = await axios.post(`${base}/analyze`, form, {
      headers: { Accept: "application/json" },
      responseType: "json",
    });

    return res.data;
  } catch (e: any) {
    if (e?.response) {
      throw new Error(e.response.data || e.response.statusText || `HTTP ${e.response.status}`);
    }
    throw e;
  }
}
