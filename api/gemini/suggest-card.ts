import { handleSuggestCard } from "../_gemini.ts";

export default async function handler(req: any, res: any) {
  // CORS / Preflight support
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Chỉ hỗ trợ phương thức POST" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const programName = body?.programName;
  const result = await handleSuggestCard(programName);
  res.status(result.status).json(result.data);
}
