import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

import geminiHandler from "./api/gemini.ts";

// Endpoint Gemini chung (dùng cho cả local dev và tương đương Vercel)
app.all("/api/gemini", async (req, res) => {
  await geminiHandler(req, res);
});

// Hỗ trợ đường dẫn cũ nếu có
app.post("/api/gemini/suggest-card", async (req, res) => {
  req.body = { ...req.body, action: "suggest-card" };
  await geminiHandler(req, res);
});
app.post("/api/gemini/teacher-comment", async (req, res) => {
  req.body = { ...req.body, action: "teacher-comment" };
  await geminiHandler(req, res);
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
