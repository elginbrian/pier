export type OllamaGenerateOptions = {
  model?: string;
  stream?: boolean;
};

export async function generateText(prompt: string, opts?: OllamaGenerateOptions): Promise<string> {
  const base = (process.env.NEXT_PUBLIC_OLLAMA_BASE_URL as string) || "https://ollama.elginbrian.com";
  const root = base.replace(/\/+$/, "");
  const endpoints = [`${root}/api/generate`, `${root}/generate`];

  const body: any = { model: opts?.model ?? "gemma:2b" };
  try {
    const parsed = JSON.parse(String(prompt));
    if (Array.isArray(parsed)) body.messages = parsed;
    else if (parsed && typeof parsed === "object" && (parsed.role || parsed.content || parsed.text)) body.messages = [parsed];
    else body.prompt = prompt;
  } catch (_e) {
    body.prompt = prompt;
  }

  let lastErr: any = null;
  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json, text/plain" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        lastErr = new Error(`Upstream returned ${res.status}: ${txt}`);
        continue;
      }

      const text = await res.text();
      return text;
    } catch (e: any) {
      lastErr = e;
    }
  }

  throw lastErr || new Error("Failed to reach Ollama host");
}

export default { generateText };

// Streamed generation: call onChunk for each received piece (token or partial).
export async function streamGenerateText(prompt: string, opts: OllamaGenerateOptions | undefined, onChunk: (chunk: string) => void, signal?: AbortSignal): Promise<string> {
  const base = (process.env.NEXT_PUBLIC_OLLAMA_BASE_URL as string) || "https://ollama.elginbrian.com";
  const root = base.replace(/\/+$/, "");
  const endpoints = [`${root}/api/generate`, `${root}/generate`];

  const body: any = { model: opts?.model ?? "gemma:2b", stream: true };
  try {
    const parsed = JSON.parse(String(prompt));
    if (Array.isArray(parsed)) body.messages = parsed;
    else if (parsed && typeof parsed === "object" && (parsed.role || parsed.content || parsed.text)) body.messages = [parsed];
    else body.prompt = prompt;
  } catch (_e) {
    body.prompt = prompt;
  }

  let lastErr: any = null;
  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "text/event-stream, application/json, text/plain" },
        body: JSON.stringify(body),
        signal,
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        lastErr = new Error(`Upstream returned ${res.status}: ${txt}`);
        continue;
      }

      const reader = res.body?.getReader();
      if (!reader) return "";
      const decoder = new TextDecoder();
      let done = false;
      let buffer = "";
      let accumulated = "";

      while (!done) {
        const { value, done: rdone } = await reader.read();
        if (rdone) {
          done = true;
          break;
        }
        if (signal?.aborted) {
          try {
            reader.cancel();
          } catch (_) {}
          break;
        }
        const chunkStr = decoder.decode(value, { stream: true });
        buffer += chunkStr;

        // split lines (NDJSON or newline-delimited chunks)
        const lines = buffer.split(/\r?\n/);
        // keep last partial line in buffer
        buffer = lines.pop() || "";

        for (const line of lines) {
          const l = line.trim();
          if (!l) continue;
          let out = l;
          try {
            const obj = JSON.parse(l);
            out = (obj.response ?? obj.text ?? obj.content ?? obj.output) || "";
          } catch (_e) {
            // not JSON, use raw
            out = l;
          }
          if (out) {
            onChunk(out);
            accumulated += out;
          }
        }
      }

      // flush remaining buffer
      if (buffer) {
        const l = buffer.trim();
        if (l) {
          try {
            const obj = JSON.parse(l);
            const out = (obj.response ?? obj.text ?? obj.content ?? obj.output) || "";
            if (out) {
              onChunk(out);
              accumulated += out;
            }
          } catch (_e) {
            onChunk(l);
            accumulated += l;
          }
        }
      }

      return accumulated;
    } catch (e: any) {
      lastErr = e;
      if (e?.name === "AbortError") throw e;
    }
  }

  throw lastErr || new Error("Failed to reach Ollama host");
}
