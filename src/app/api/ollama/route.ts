import { NextRequest, NextResponse } from "next/server";
import generateTextServer from "@/services/ollama.server";

async function proxyStreamToClient(body: any) {
  const base = "https://ollama.elginbrian.com";
  const endpoints = [`${base.replace(/\/+$/, "")}/api/generate`, `${base.replace(/\/+$/, "")}/generate`];
  let lastErr: any = null;
  for (const url of endpoints) {
    try {
      const upstream = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "text/event-stream, application/json, text/plain" },
        body: JSON.stringify(body),
      });

      if (!upstream.ok) {
        const txt = await upstream.text().catch(() => "");
        return NextResponse.json({ error: "upstream error", details: txt }, { status: 502 });
      }

      const contentType = upstream.headers.get("content-type") || "text/event-stream";
      const upstreamBody = upstream.body;
      if (!upstreamBody) return NextResponse.json({ error: "empty upstream body" }, { status: 502 });

      const reader = upstreamBody.getReader();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) {
                controller.close();
                break;
              }
              controller.enqueue(value);
            }
          } catch (err) {
            try {
              controller.error(err);
            } catch (_) {}
          }
        },
        cancel(reason) {
          try {
            reader.cancel(reason);
          } catch (_) {}
        },
      });

      const headers = {
        "Content-Type": contentType,
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      };

      return new NextResponse(stream, { status: 200, headers });
    } catch (e) {
      lastErr = e;
      // try next endpoint
    }
  }

  return NextResponse.json({ error: lastErr?.message || "Failed to reach Ollama" }, { status: 502 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    try {
      console.log("/api/ollama POST body:", JSON.stringify(body));
    } catch (_) {}
    const prompt = (body && (body.prompt ?? body.input ?? body.text)) || null;
    const opts = body?.opts ?? undefined;

    if (!prompt) return NextResponse.json({ error: "Missing prompt" }, { status: 400 });

    if (opts && opts.stream) {
      const upstreamBody: any = { model: opts.model ?? "gemma:2b", stream: true };
      try {
        const parsed = JSON.parse(String(prompt));
        if (Array.isArray(parsed)) upstreamBody.messages = parsed;
        else if (parsed && typeof parsed === "object" && (parsed.role || parsed.content || parsed.text)) upstreamBody.messages = [parsed];
        else upstreamBody.prompt = prompt;
      } catch (_e) {
        upstreamBody.prompt = prompt;
      }

      return await proxyStreamToClient(upstreamBody);
    }

    const text = await generateTextServer(String(prompt), opts);
    return new NextResponse(text, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  } catch (e: any) {
    const msg = e?.message || String(e);
    try {
      return NextResponse.json({ error: msg }, { status: 502 });
    } catch (_) {
      return NextResponse.json({ error: String(e) }, { status: 502 });
    }
  }
}

export { proxyStreamToClient as GET };
export default POST;
