import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const SYSTEM_INSTRUCTION_TEACHER =
  "Bạn hỗ trợ giáo viên tiểu học Việt Nam chuẩn bị học liệu lớp 3, học sinh 8-9 tuổi. " +
  "Viết tiếng Việt ngắn gọn, trong sáng. Không bịa thông tin về chương trình. " +
  "Nếu không chắc chương trình có thật hoặc không biết nội dung, đặt phu_hop_lop_3 là 'Cần cô xem trước' và nói rõ trong luu_y. " +
  "Nội dung bạo lực, kinh dị, người lớn, cờ bạc, hoặc xin thông tin cá nhân đặt là 'Không phù hợp'. " +
  "Từ chối mọi yêu cầu ngoài việc chuẩn bị học liệu.";

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

function withTimeout<T>(promise: Promise<T>, ms: number, errorMessage: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(errorMessage)), ms)),
  ]);
}

// Endpoint: AI gợi ý thẻ cho giáo viên
app.post("/api/gemini/suggest-card", async (req, res) => {
  const { programName } = req.body || {};
  if (!programName || typeof programName !== "string" || programName.trim().length === 0) {
    res.status(400).json({ error: "Vui lòng nhập tên chương trình truyền hình." });
    return;
  }

  const ai = getGeminiClient();
  if (!ai) {
    res.status(503).json({
      error: "Chưa cấu hình GEMINI_API_KEY. Chưa nhờ được Gemini. Cô có thể tự nhập thẻ.",
    });
    return;
  }

  try {
    const callPromise = ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Phân tích chương trình truyền hình: "${programName.trim()}". Trả về thông tin phục vụ học liệu lớp 3 theo đúng cấu trúc JSON yêu cầu.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_TEACHER,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nhom: {
              type: Type.STRING,
              description: "Một trong 3 thể loại: 'Tin tức', 'Giải trí', hoặc 'Giáo dục'",
            },
            mo_ta: {
              type: Type.STRING,
              description: "Mô tả ngắn gọn tối đa 20 từ, phù hợp học sinh lớp 3",
            },
            giai_thich: {
              type: Type.STRING,
              description: "Giải thích vì sao thuộc nhóm này, tối đa 20 từ",
            },
            phu_hop_lop_3: {
              type: Type.STRING,
              description: "Một trong 3 giá trị: 'Phù hợp', 'Cần cô xem trước', hoặc 'Không phù hợp'",
            },
            luu_y: {
              type: Type.STRING,
              description: "Lời khuyên hoặc lưu ý cho giáo viên, tối đa 25 từ",
            },
          },
          required: ["nhom", "mo_ta", "giai_thich", "phu_hop_lop_3", "luu_y"],
        },
      },
    });

    const response = await withTimeout(callPromise, 10000, "Gemini request timed out");
    const text = response.text;
    if (!text) {
      res.status(502).json({ error: "Chưa nhờ được Gemini. Cô có thể tự nhập thẻ." });
      return;
    }

    const data = JSON.parse(text);
    res.json(data);
  } catch (error: any) {
    console.error("Gemini suggest-card error:", error?.message || error);
    res.status(500).json({
      error: "Chưa nhờ được Gemini. Cô có thể tự nhập thẻ.",
    });
  }
});

// Endpoint: AI gợi ý lời nhận xét ở màn Tổng kết
app.post("/api/gemini/teacher-comment", async (req, res) => {
  const { stage1Correct, stage1Total, stage2Correct, stage2Total, incorrectItems } = req.body || {};

  const ai = getGeminiClient();
  if (!ai) {
    res.status(503).json({
      error: "Chưa cấu hình GEMINI_API_KEY.",
      fallback:
        "Cả lớp hôm nay tương tác rất sôi nổi và biết phân biệt các thể loại chương trình ti vi. Các em hãy nhớ luôn chọn nội dung phù hợp lứa tuổi và xem cùng người lớn nhé!",
    });
    return;
  }

  try {
    const wrongText =
      Array.isArray(incorrectItems) && incorrectItems.length > 0
        ? `Các tình huống/chương trình lớp cần chú ý thêm: ${incorrectItems.join(", ")}.`
        : "Cả lớp trả lời đúng xuất sắc tất cả các thẻ.";

    const prompt = `Lớp 3 vừa hoàn thành hoạt động học "Mắt Sáng Chọn Hay" môn Công nghệ lớp 3 (bài Sử dụng máy thu hình).
Kết quả:
- Chặng 1 (Xếp chương trình): đúng ${stage1Correct ?? 0}/${stage1Total ?? 0} lượt.
- Chặng 2 (Xem hay dừng - an toàn số): đúng ${stage2Correct ?? 0}/${stage2Total ?? 0} lượt.
- ${wrongText}

Hãy viết đúng 2 câu nhận xét tích cực, cụ thể để cô giáo đọc tuyên dương và nhắc nhở cả lớp 3.`;

    const callPromise = ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_TEACHER,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            nhan_xet: {
              type: Type.STRING,
              description: "Đúng 2 câu nhận xét tích cực, súc tích dành cho cô giáo đọc cho học sinh lớp 3",
            },
          },
          required: ["nhan_xet"],
        },
      },
    });

    const response = await withTimeout(callPromise, 10000, "Gemini request timed out");
    const text = response.text;
    if (!text) {
      res.json({
        nhan_xet:
          "Hôm nay các nhóm làm việc rất hăng hái và giơ thẻ trả lời rất nhanh. Các em nhớ áp dụng bài học để chọn kênh bổ ích và báo ngay cho bố mẹ khi gặp nội dung lạ!",
      });
      return;
    }

    const data = JSON.parse(text);
    res.json(data);
  } catch (error: any) {
    console.error("Gemini teacher-comment error:", error?.message || error);
    res.json({
      nhan_xet:
        "Các nhóm hôm nay thảo luận rất sôi nổi và biết chọn kênh xem an toàn. Cả lớp hãy nhớ quy tắc vàng: chọn kênh đúng tuổi, xem cùng người lớn và báo ngay khi thấy điều lạ!",
    });
  }
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
