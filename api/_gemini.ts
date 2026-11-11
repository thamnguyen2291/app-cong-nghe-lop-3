import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

export const SYSTEM_INSTRUCTION_TEACHER =
  "Bạn hỗ trợ giáo viên tiểu học Việt Nam chuẩn bị học liệu lớp 3, học sinh 8-9 tuổi. " +
  "Viết tiếng Việt ngắn gọn, trong sáng. Không bịa thông tin về chương trình. " +
  "Nếu không chắc chương trình có thật hoặc không biết nội dung, đặt phu_hop_lop_3 là 'Cần cô xem trước' và nói rõ trong luu_y. " +
  "Nội dung bạo lực, kinh dị, người lớn, cờ bạc, hoặc xin thông tin cá nhân đặt là 'Không phù hợp'. " +
  "Từ chối mọi yêu cầu ngoài việc chuẩn bị học liệu.";

export function getGeminiClient(): GoogleGenAI | null {
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

export function withTimeout<T>(promise: Promise<T>, ms: number, errorMessage: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(errorMessage)), ms)),
  ]);
}

export async function handleSuggestCard(programName: string) {
  if (!programName || typeof programName !== "string" || programName.trim().length === 0) {
    return {
      status: 400,
      data: { error: "Vui lòng nhập tên chương trình truyền hình." },
    };
  }

  const ai = getGeminiClient();
  if (!ai) {
    return {
      status: 503,
      data: {
        error: "Chưa cấu hình biến môi trường GEMINI_API_KEY trên máy chủ. Cô có thể tự nhập thẻ.",
      },
    };
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
      return {
        status: 502,
        data: { error: "Chưa nhờ được Gemini. Cô có thể tự nhập thẻ." },
      };
    }

    const parsed = JSON.parse(text);
    return {
      status: 200,
      data: parsed,
    };
  } catch (error: any) {
    console.error("Gemini suggest-card error:", error?.message || error);
    return {
      status: 500,
      data: { error: "Chưa nhờ được Gemini. Cô có thể tự nhập thẻ." },
    };
  }
}

export async function handleTeacherComment(params: {
  stage1Correct?: number;
  stage1Total?: number;
  stage2Correct?: number;
  stage2Total?: number;
  incorrectItems?: string[];
}) {
  const { stage1Correct = 0, stage1Total = 0, stage2Correct = 0, stage2Total = 0, incorrectItems = [] } =
    params || {};

  const ai = getGeminiClient();
  if (!ai) {
    return {
      status: 200,
      data: {
        nhan_xet:
          "Cả lớp hôm nay tương tác rất sôi nổi và biết phân biệt các thể loại chương trình ti vi. Các em hãy nhớ luôn chọn nội dung phù hợp lứa tuổi và xem cùng người lớn nhé!",
      },
    };
  }

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
      return {
        status: 200,
        data: {
          nhan_xet:
            "Hôm nay các nhóm làm việc rất hăng hái và giơ thẻ trả lời rất nhanh. Các em nhớ áp dụng bài học để chọn kênh bổ ích và báo ngay cho bố mẹ khi gặp nội dung lạ!",
        },
      };
    }

    const parsed = JSON.parse(text);
    return {
      status: 200,
      data: parsed,
    };
  } catch (error: any) {
    console.error("Gemini teacher-comment error:", error?.message || error);
    return {
      status: 200,
      data: {
        nhan_xet:
          "Các nhóm hôm nay thảo luận rất sôi nổi và biết chọn kênh xem an toàn. Cả lớp hãy nhớ quy tắc vàng: chọn kênh đúng tuổi, xem cùng người lớn và báo ngay khi thấy điều lạ!",
      },
    };
  }
}
