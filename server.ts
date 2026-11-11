import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

import { handleSuggestCard, handleTeacherComment } from "./api/_gemini.ts";

// Endpoint: AI gợi ý thẻ cho giáo viên
app.post("/api/gemini/suggest-card", async (req, res) => {
  const { programName } = req.body || {};
  const result = await handleSuggestCard(programName);
  res.status(result.status).json(result.data);
});

// Endpoint: AI gợi ý lời nhận xét ở màn Tổng kết
app.post("/api/gemini/teacher-comment", async (req, res) => {
  const result = await handleTeacherComment(req.body);
  res.status(result.status).json(result.data);
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
