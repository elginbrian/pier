import { NextResponse } from "next/server";
import { generateTextServer } from "../../../services/ollama.server";

export async function POST(req: Request) {
  try {
    const contentType = (req.headers.get("content-type") || "").toLowerCase();

    let fileBuffer: ArrayBuffer | null = null;

    if (contentType.includes("multipart/form-data")) {
      // Handle file upload
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) return NextResponse.json({ error: "file field is required" }, { status: 400 });
      fileBuffer = await file.arrayBuffer();
    } else {
      // Expect JSON with fileUrl
      const body = await req.json().catch(() => null);
      const fileUrl = body?.fileUrl as string | undefined;
      if (!fileUrl) return NextResponse.json({ error: "fileUrl required in JSON body" }, { status: 400 });

      const fileRes = await fetch(fileUrl);
      if (!fileRes.ok) return NextResponse.json({ error: "failed to download file from fileUrl" }, { status: 502 });
      fileBuffer = await fileRes.arrayBuffer();
    }

    if (!fileBuffer) return NextResponse.json({ error: "no file content available" }, { status: 400 });

    const analyzeUrl = "http://165.232.172.69:8000";
    const form = new FormData();
    const blob = new Blob([fileBuffer]);
    form.append("file", blob, "proposal.pdf");

    const analyzeRes = await fetch(`${analyzeUrl.replace(/\/+$/, "")}/analyze`, {
      method: "POST",
      body: form,
    });

    if (!analyzeRes.ok) {
      const txt = await analyzeRes.text();
      return NextResponse.json({ error: "analyze failed", details: txt }, { status: 502 });
    }

    const analyzeJson = await analyzeRes.json();

    try {
      const body = await req.json().catch(() => null);
      if (body && body.justAnalyze) {
        return NextResponse.json(analyzeJson, { status: 200 });
      }
    } catch (_) {}

    const prompt = typeof analyzeJson === "string" ? analyzeJson : JSON.stringify(analyzeJson);
    const generated = await generateTextServer(prompt, { model: "gemma:2b" });

    return NextResponse.json({ result: generated, raw: analyzeJson });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 });
  }
}
