import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

export const SYSTEM_INSTRUCTION_TEACHER =
  "Bạn hỗ trợ giáo viên tiểu học Việt Nam chuẩn bị học liệu lớp 3, học sinh 8-9 tuổi. " +
  "Viết tiếng Việt ngắn gọn, trong sáng. Không bịa thông tin về chương trình. " +
  "Nếu không chắc chương trình có thật hoặc không biết nội dung, đặt phu_hop_lop_3 là 'Cần cô xem trước' và nói rõ trong luu_y. " +
  "Nội dung bạo lực, kinh dị, người lớn, cờ bạc, hoặc xin thông tin cá nhân đặt là 'Không phù hợp'. " +
  "Từ chối mọi yêu cầu ngoài việc chuẩn bị học liệu.";

function withTimeout<T>(promise: Promise<T>, ms: number, errorMessage: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(errorMessage)), ms)),
  ]);
}

async function callGeminiWithFallback(ai: GoogleGenAI, options: any) {
  try {
    return await ai.models.generateContent({
      ...options,
      model: "gemini-3.8-flash",
    });
  } catch (err: any) {
    console.warn(
      "[Vercel /api/gemini] Model gemini-3.8-flash gặp lỗi, tự động chuyển sang gemini-2.5-flash:",
      err?.message || err
    );
    return await ai.models.generateContent({
      ...options,
      model: "gemini-2.5-flash",
    });
  }
}

export default async function handler(req: any, res: any) {
  // Đặt CORS headers để hỗ trợ gọi từ mọi nguồn hợp lệ
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({
      error: "Chỉ hỗ trợ phương thức POST.",
    });
    return;
  }

  // Parse body an toàn
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (parseErr) {
      console.error("[Vercel /api/gemini] Không thể parse JSON trong req.body:", parseErr);
      body = {};
    }
  }
  if (!body) body = {};

  const action =
    body.action ||
    req.query?.action ||
    (body.programName !== undefined ? "suggest-card" : "teacher-comment");

  // Kiểm tra khóa API từ biến môi trường máy chủ
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error(
      "[Vercel /api/gemini] LỖI: Biến môi trường GEMINI_API_KEY chưa được thiết lập ở phía máy chủ Vercel!\n" +
        "Hướng dẫn: Vào Vercel Dashboard -> Project Settings -> Environment Variables -> thêm GEMINI_API_KEY."
    );
    if (action === "suggest-card") {
      res.status(503).json({
        error: "Chưa nhờ được Gemini. Cô có thể tự nhập thẻ.",
      });
    } else {
      res.status(200).json({
        nhan_xet:
          "Cả lớp hôm nay tương tác rất sôi nổi và biết phân biệt các thể loại chương trình ti vi. Các em hãy nhớ luôn chọn nội dung phù hợp lứa tuổi và xem cùng người lớn nhé!",
      });
    }
    return;
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // 1. Chức năng gợi ý thẻ chương trình cho giáo viên
  if (action === "suggest-card") {
    const programName = body.programName;
    if (!programName || typeof programName !== "string" || programName.trim().length === 0) {
      res.status(400).json({
        error: "Vui lòng nhập tên chương trình truyền hình.",
      });
      return;
    }

    try {
      const callPromise = callGeminiWithFallback(ai, {
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

      const response = await withTimeout(callPromise, 12000, "Gemini request timed out");
      const text = response.text;
      if (!text) {
        throw new Error("Phản hồi từ Gemini không có nội dung văn bản");
      }

      const parsed = JSON.parse(text);
      res.status(200).json(parsed);
    } catch (err: any) {
      console.error("[Vercel /api/gemini suggest-card] Chi tiết lỗi:", {
        message: err?.message,
        status: err?.status,
        stack: err?.stack,
        raw: err,
      });
      res.status(500).json({
        error: "Chưa nhờ được Gemini. Cô có thể tự nhập thẻ.",
      });
    }
    return;
  }

  // 2. Chức năng gợi ý lời nhận xét ở màn Tổng kết
  if (action === "teacher-comment") {
    const {
      stage1Correct = 0,
      stage1Total = 0,
      stage2Correct = 0,
      stage2Total = 0,
      incorrectItems = [],
    } = body;

    try {
      const wrongText =
        Array.isArray(incorrectItems) && incorrectItems.length > 0
          ? `Các tình huống/chương trình lớp cần chú ý thêm: ${incorrectItems.join(", ")}.`
          : "Cả lớp trả lời đúng xuất sắc tất cả các thẻ.";

      const prompt = `Lớp 3 vừa hoàn thành hoạt động học "Mắt Sáng Chọn Hay" môn Công nghệ lớp 3 (bài Sử dụng máy thu hình).
Kết quả:
- Chặng 1 (Xếp chương trình): đúng ${stage1Correct}/${stage1Total} lượt.
- Chặng 2 (Xem hay dừng - an toàn số): đúng ${stage2Correct}/${stage2Total} lượt.
- ${wrongText}

Hãy viết đúng 2 câu nhận xét tích cực, cụ thể để cô giáo đọc tuyên dương và nhắc nhở cả lớp 3.`;

      const callPromise = callGeminiWithFallback(ai, {
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

      const response = await withTimeout(callPromise, 12000, "Gemini request timed out");
      const text = response.text;
      if (!text) {
        throw new Error("Phản hồi từ Gemini không có nội dung văn bản");
      }

      const parsed = JSON.parse(text);
      res.status(200).json(parsed);
    } catch (err: any) {
      console.error("[Vercel /api/gemini teacher-comment] Chi tiết lỗi:", {
        message: err?.message,
        status: err?.status,
        stack: err?.stack,
        raw: err,
      });
      // Trả về nhận xét dự phòng sư phạm để cô giáo vẫn có nội dung tuyên dương
      res.status(200).json({
        nhan_xet:
          "Các nhóm hôm nay thảo luận rất sôi nổi và biết chọn kênh xem an toàn. Cả lớp hãy nhớ quy tắc vàng: chọn kênh đúng tuổi, xem cùng người lớn và báo ngay khi thấy điều lạ!",
      });
    }
    return;
  }

  res.status(400).json({
    error: `Hành động không hợp lệ: ${action}`,
  });
}
