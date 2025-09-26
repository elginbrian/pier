"use client";

import React from "react";
import { colors } from "@/design-system";
import Spinner from "@/components/Spinner";
import useAiAnalysis from "@/hooks/useAiAnalysis";

type Props = {
  id?: string | null;
  proposal?: any;
  autoStart?: boolean;
  showHeader?: boolean;
};

export default function AiAnalysisPanel({ id, proposal, autoStart = true, showHeader = true }: Props) {
  const { analyzing, analysisResult, analysisError, run, cancel } = useAiAnalysis(id, proposal, autoStart);

  return (
    <div className="space-y-6">
      <div className="text-sm space-y-4" style={{ color: colors.base[700] }}>
        {analyzing && !analysisResult ? (
          <div className="p-4 bg-gray-50 rounded">
            <div className="flex items-center space-x-2">
              <Spinner size={20} />
              <p className="text-sm text-gray-600">AI sedang menganalisis proposal...</p>
            </div>
          </div>
        ) : analysisError && !analysisResult ? (
          <div className="p-4 bg-red-50 rounded">
            <p className="text-sm text-red-600">Error: {analysisError}</p>
          </div>
        ) : analysisResult ? (
          <div className="p-4 bg-gray-50 rounded">
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm font-medium">AI Generated Draft / Summary</div>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 text-sm rounded border"
                  onClick={() => {
                    try {
                      navigator.clipboard.writeText(analysisResult || "");
                    } catch (_) {}
                  }}
                >
                  Copy
                </button>
                <button
                  className="px-2 py-1 text-sm rounded bg-white border"
                  onClick={() => {
                    try {
                      if (id) sessionStorage.removeItem(`ai_analysis_${id}`);
                    } catch (_) {}
                    // rerun
                    run();
                  }}
                >
                  Re-run
                </button>
              </div>
            </div>
            <pre className="text-sm whitespace-pre-wrap" style={{ color: colors.base[700] }}>
              {analysisResult}
            </pre>
          </div>
        ) : (
          <>
            <p>{proposal?.technicalSpec || "-"}</p>

            <div className="space-y-2">
              <p className="font-semibold">PASAL - RINGKASAN</p>
              <p>Jenis Layanan: {proposal?.serviceType || "-"}</p>
              <p>
                Timeline: {proposal?.startDate || "-"} – {proposal?.endDate || "-"}
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold">Nilai Kontrak</p>
              <p className="font-bold" style={{ color: colors.success[600] }}>
                {proposal?.contractValue || "-"}
              </p>
            </div>

            {proposal?.portfolioUrl && (
              <div>
                <a href={proposal.portfolioUrl} target="_blank" rel="noreferrer" className="text-sm underline" style={{ color: colors.primary[300] }}>
                  Lihat Portfolio
                </a>
              </div>
            )}

            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <button className="px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: colors.primary[300], color: "#fff" }} onClick={run} disabled={analyzing}>
                  {analyzing ? "Analyzing..." : "Analyze with AI"}
                </button>

                {analyzing && (
                  <button
                    className="px-3 py-2 rounded border"
                    onClick={() => {
                      cancel();
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
              {analysisError && (
                <div className="mt-3 text-sm text-red-600">
                  Error: {analysisError}.{" "}
                  <button className="underline" onClick={run}>
                    Retry
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
