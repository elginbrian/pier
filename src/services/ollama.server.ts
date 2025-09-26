import axios from "axios";

export type OllamaGenerateOptions = {
  model?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  stream?: boolean;
};

function getBaseUrl(): string {
  return (process.env.OLLAMA_BASE_URL as string) || "https://ollama.elginbrian.com";
}

export async function generateTextServer(prompt: string, opts?: OllamaGenerateOptions): Promise<string> {
  const base = getBaseUrl().replace(/\/+$/, "");
  const model = opts?.model ?? "gemma:2b";

  const body: Record<string, any> = { model, stream: false };

  try {
    const parsed = JSON.parse(prompt);
    if (Array.isArray(parsed)) {
      body.messages = parsed;
    } else if (parsed && typeof parsed === "object" && (parsed.role || parsed.content || parsed.text)) {
      body.messages = [parsed];
    } else {
      body.prompt = prompt;
    }
  } catch (_e) {
    body.prompt = prompt;
  }

  // Only include model and prompt/messages (and stream). Do not forward max_tokens/temperature/top_p.

  try {
    const endpoints = [`${base}/api/generate`, `${base}/generate`];
    let lastErr: any = null;
    let res: any = null;

    for (const url of endpoints) {
      try {
        res = await axios.post(url, body, {
          headers: { "Content-Type": "application/json", Accept: "application/json, text/plain" },
          responseType: "json",
          timeout: 60_000,
        });
        break;
      } catch (e: any) {
        lastErr = e;
        if (e?.response?.status === 404) continue;
        if (e?.message && e.message.includes("JSON")) {
          try {
            res = await axios.post(url, body, {
              headers: { "Content-Type": "application/json", Accept: "text/plain" },
              responseType: "text",
              timeout: 60_000,
            });
            break;
          } catch (_e2) {
            // fallthrough to throw original
          }
        }
        throw e;
      }
    }

    if (!res) {
      if (lastErr?.response) {
        throw new Error(lastErr.response.data || lastErr.response.statusText || `HTTP ${lastErr.response.status}`);
      }
      throw lastErr || new Error("Failed to reach Ollama server");
    }

    const data = res.data;

    if (typeof data === "string") {
      const raw = data;
      if (raw.includes("\n")) {
        const lines = raw
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean);
        const parts: string[] = [];
        let anyParsed = false;
        for (const line of lines) {
          try {
            const obj = JSON.parse(line);
            anyParsed = true;
            const candidate = obj.response ?? obj.text ?? obj.content ?? obj.output ?? null;
            if (candidate) parts.push(String(candidate));
          } catch (_e) {
            parts.push(line);
          }
        }
        if (anyParsed && parts.length) return parts.join("");
      }

      try {
        const json = JSON.parse(raw);
        if (typeof json === "string") return json;
        if (Array.isArray(json))
          return json
            .map((it: any) => it.text ?? it.content ?? it.output ?? "")
            .filter(Boolean)
            .join("\n");
        if (typeof json === "object") return json.text || json.content || json.output || JSON.stringify(json);
      } catch (_e) {}

      return raw;
    }

    if (typeof data === "object" && data != null) {
      if (Array.isArray(data)) {
        return data
          .map((item: any) => item.text ?? item.content ?? item.output ?? "")
          .filter(Boolean)
          .join("\n");
      }

      if (data.choices && Array.isArray(data.choices)) {
        return data.choices
          .map((c: any) => c.text ?? c.content ?? c.output ?? "")
          .filter(Boolean)
          .join("\n");
      }

      return data.text ?? data.output ?? data.result ?? JSON.stringify(data);
    }

    return String(data);
  } catch (e: any) {
    if (e?.response) {
      throw new Error(`Upstream error: ${e.response.status} - ${JSON.stringify(e.response.data)}`);
    }
    throw e;
  }
}

export default generateTextServer;
