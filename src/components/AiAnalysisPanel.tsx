"use client";

import React from "react";
import { colors } from "@/design-system";
import Spinner from "@/components/Spinner";
import useAiAnalysis from "@/hooks/useAiAnalysis";

function renderMarkdown(md: string | null | undefined) {
  if (!md) return null;
  const lines = md.split(/\r?\n/);
  const nodes: React.ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      nodes.push(<div key={i} style={{ height: 8 }} />);
      i++;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        const item = lines[i].trim().replace(/^\d+\.\s+/, "");
        items.push(<li key={i}>{renderInlineMarkdown(item)}</li>);
        i++;
      }
      nodes.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside">
          {items}
        </ol>
      );
      continue;
    }

    if (/^[\-*]\s+/.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^[\-*]\s+/.test(lines[i].trim())) {
        const item = lines[i].trim().replace(/^[\-*]\s+/, "");
        items.push(<li key={i}>{renderInlineMarkdown(item)}</li>);
        i++;
      }
      nodes.push(
        <ul key={`ul-${i}`} className="list-disc list-inside">
          {items}
        </ul>
      );
      continue;
    }

    if (/^#{1,6}\s+/.test(line)) {
      const m = line.match(/^(#{1,6})\s+(.*)$/);
      if (m) {
        const level = m[1].length;
        const content = renderInlineMarkdown(m[2]);
        const tagName = `h${Math.min(6, level)}`;
        nodes.push(React.createElement(tagName, { key: i, className: `font-semibold ${level <= 2 ? "text-lg" : "text-base"}` }, content));
        i++;
        continue;
      }
    }

    nodes.push(
      <p key={i} className="mb-2">
        {renderInlineMarkdown(line)}
      </p>
    );
    i++;
  }

  return <div>{nodes}</div>;
}

function renderInlineMarkdown(text: string) {
  const parts: React.ReactNode[] = [];
  let chunkIndex = 0;
  const boldSplit = text.split(/(\*\*[^*]+\*\*)/g);
  boldSplit.forEach((part, idx) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      const inner = part.replace(/^\*\*(.*)\*\*$/, "$1");
      parts.push(<strong key={`b-${chunkIndex++}`}>{inner}</strong>);
    } else {
      const italicSplit = part.split(/(\*[^*]+\*)/g);
      italicSplit.forEach((p) => {
        if (/^\*[^*]+\*$/.test(p)) {
          parts.push(<em key={`i-${chunkIndex++}`}>{p.replace(/^\*(.*)\*$/, "$1")}</em>);
        } else {
          parts.push(<span key={`t-${chunkIndex++}`}>{p}</span>);
        }
      });
    }
  });
  return <>{parts}</>;
}

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
            <div className="text-sm" style={{ color: colors.base[700] }}>
              {renderMarkdown(analysisResult)}
            </div>
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
