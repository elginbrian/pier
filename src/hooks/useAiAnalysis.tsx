"use client";

import { useEffect, useRef, useState } from "react";
import { generateText, streamGenerateText } from "@/services/ollama";

export type UseAiAnalysisResult = {
  analyzing: boolean;
  analysisResult: string | null;
  analysisError: string | null;
  run: () => Promise<void>;
  cancel: () => void;
};

function buildPrompt(proposal: any) {
  const title = proposal?.proposalTitle || "Proposal";
  const company = proposal?.companyName || "Vendor";
  const spec = proposal?.technicalSpec || "Tidak ada spesifikasi teknis";
  const value = proposal?.contractValue || "-";
  const start = proposal?.startDate || "TBD";
  const end = proposal?.endDate || "TBD";

  return `Buatkan draft kontrak pengadaan jasa berdasarkan informasi berikut:\n\nJudul: ${title}\nPenyedia: ${company}\nRuang Lingkup: ${spec}\nNilai Kontrak: ${value}\nJangka Waktu: ${start} - ${end}\n\nBuat ringkasan pasal-pasal penting dan rekomendasi klausul yang perlu diperjelas (penalti, keamanan data, SLA, dsb).`;
}

function extractTextFromAnalyzeResult(obj: any): string {
  if (obj === null || obj === undefined) return "";
  if (typeof obj === "string") return obj;
  if (Array.isArray(obj)) return obj.map(extractTextFromAnalyzeResult).filter(Boolean).join("\n\n");

  if (typeof obj === "object") {
    if (typeof obj.text === "string" && obj.text.trim()) return obj.text;
    if (typeof obj.content === "string" && obj.content.trim()) return obj.content;

    const parts: string[] = [];

    if (Array.isArray(obj.pages)) {
      for (const p of obj.pages) {
        const t = extractTextFromAnalyzeResult(p);
        if (t) parts.push(t);
      }
    }

    if (Array.isArray(obj.blocks)) {
      for (const b of obj.blocks) {
        const t = extractTextFromAnalyzeResult(b);
        if (t) parts.push(t);
      }
    }

    if (Array.isArray(obj.results)) {
      for (const r of obj.results) {
        const t = extractTextFromAnalyzeResult(r);
        if (t) parts.push(t);
      }
    }

    for (const k of Object.keys(obj)) {
      const v = obj[k];
      if (typeof v === "string" && /text|content|ocr|body/i.test(k) && v.trim()) {
        parts.push(v);
      } else if (typeof v === "object" && v != null) {
        const t = extractTextFromAnalyzeResult(v);
        if (t) parts.push(t);
      }
    }

    return parts.filter(Boolean).join("\n\n");
  }

  return "";
}

export function useAiAnalysis(id?: string | null, proposal?: any, autoStart = true): UseAiAnalysisResult {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const abortedRef = useRef(false);
  const runningRef = useRef<Promise<void> | null>(null);

  const cacheKey = id ? `ai_analysis_${id}` : null;

  const run = async () => {
    if (!id || !proposal) return;
    if (analyzing) return;

    // check cache
    try {
      const cached = cacheKey ? sessionStorage.getItem(cacheKey) : null;
      if (cached) {
        setAnalysisResult(cached);
        setAnalysisError(null);
        return;
      }
    } catch (_) {}

    setAnalyzing(true);
    setAnalysisError(null);
    abortedRef.current = false;

    let prompt: string | null = null;
    const possibleFile = proposal?.proposalHargaUrl || proposal?.portfolioUrl || proposal?.proposalHarga || null;
    if (possibleFile) {
      const analyzeBase = "http://165.232.172.69:8000";
      try {
        const fileRes = await fetch(possibleFile);
        console.debug("useAiAnalysis: download file", possibleFile, { status: fileRes.status, contentType: fileRes.headers.get("content-type") });
        if (fileRes.ok) {
          const blob = await fileRes.blob();
          const form = new FormData();
          form.append("file", blob, "proposal.pdf");

          const analyzeRes = await fetch(`${analyzeBase.replace(/\/+$/, "")}/analyze`, {
            method: "POST",
            body: form,
          });

          console.debug("useAiAnalysis: analyze response", { status: analyzeRes.status, contentType: analyzeRes.headers.get("content-type") });
          if (analyzeRes.ok) {
            let analyzeJson: any = null;
            const ct = (analyzeRes.headers.get("content-type") || "").toLowerCase();
            if (ct.includes("application/json") || ct.includes("text/json")) {
              analyzeJson = await analyzeRes.json();
            } else {
              // try to parse text anyway
              const txt = await analyzeRes.text().catch(() => "");
              try {
                analyzeJson = JSON.parse(txt);
              } catch (_e) {
                // not JSON, use raw text
                analyzeJson = txt;
              }
            }

            console.debug("useAiAnalysis: analyzeJson (raw)", analyzeJson);

            const extracted = extractTextFromAnalyzeResult(analyzeJson) || (typeof analyzeJson === "string" ? analyzeJson : JSON.stringify(analyzeJson));
            console.debug("useAiAnalysis: extracted text (first 500 chars)", extracted?.slice?.(0, 500));

            // Heuristic: if analyzeJson looks like an echoed request body (contains model/prompt keys), warn
            if (analyzeJson && typeof analyzeJson === "object" && (analyzeJson.model || analyzeJson.prompt || analyzeJson.messages)) {
              console.warn("useAiAnalysis: analyze endpoint returned an object that looks like a request payload rather than OCR JSON.", Object.keys(analyzeJson));
            }

            if (!extracted || String(extracted).trim().length === 0) {
              console.warn("useAiAnalysis: extracted text is empty; falling back to metadata prompt");
            }

            prompt = `Berikut adalah teks hasil ekstraksi dari dokumen kontrak (OCR). Buatkan ringkasan pasal-pasal penting dan draft klausul yang direkomendasikan (penalti, keamanan data, SLA, dsb) berdasarkan teks berikut:\n\n${extracted}`;
          } else {
            const txt = await analyzeRes.text().catch(() => "");
            console.warn("Direct analyze failed:", analyzeRes.status, txt);
          }
        } else {
          console.warn("Failed to download file for direct analyze:", fileRes.status);
        }
      } catch (e) {
        console.warn("Direct analyze error:", e);
      }
    }

    if (!prompt) prompt = buildPrompt(proposal);

    const controller = new AbortController();
    const p = (async () => {
      try {
        let partial = "";

        const final = await streamGenerateText(
          prompt,
          { model: "gemma:2b", stream: true },
          (chunk) => {
            if (abortedRef.current) return;
            partial += chunk;
            setAnalysisResult(partial);
          },
          controller.signal
        );

        if (abortedRef.current) return;
        setAnalysisResult(final || partial);
        try {
          if (cacheKey) sessionStorage.setItem(cacheKey, final || partial);
        } catch (_) {}
      } catch (e: any) {
        if (!abortedRef.current) setAnalysisError(e?.message || "Gagal melakukan analisis AI");
      } finally {
        if (!abortedRef.current) setAnalyzing(false);
      }
    })();

    runningRef.current = p;
    await p;
    runningRef.current = null;
  };

  const cancel = () => {
    abortedRef.current = true;
    setAnalyzing(false);
  };

  useEffect(() => {
    if (!id || !proposal) return;
    if (analysisResult) return;
    if (autoStart) {
      run();
    }
  }, [id, proposal]);

  return { analyzing, analysisResult, analysisError, run, cancel };
}

export default useAiAnalysis;
