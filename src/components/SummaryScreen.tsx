import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { soundManager } from "../utils/audio";
import {
  Trophy,
  Star,
  Sparkles,
  RotateCcw,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Brain,
  Loader2,
  Flame,
} from "lucide-react";

interface SummaryScreenProps {
  totalStars: number;
  stage1Correct: number;
  stage1Total: number;
  stage2Correct: number;
  stage2Total: number;
  incorrectCards: string[];
  onPlayAgain: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  totalStars,
  stage1Correct,
  stage1Total,
  stage2Correct,
  stage2Total,
  incorrectCards,
  onPlayAgain,
}) => {
  const [aiComment, setAiComment] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const totalQuestions = stage1Total + stage2Total;
  const totalCorrect = stage1Correct + stage2Correct;
  const accuracyPercent =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 100;

  let evaluationLevel = "Hoàn thành tốt";
  let evaluationColor = "bg-[#dcfce7] border-[#22c55e] text-[#15803d]";
  if (accuracyPercent < 50) {
    evaluationLevel = "Cần nhắc lại";
    evaluationColor = "bg-[#fee2e2] border-[#ef4444] text-[#b91c1c]";
  } else if (accuracyPercent < 80) {
    evaluationLevel = "Hoàn thành";
    evaluationColor = "bg-[#fef9c3] border-[#eab308] text-[#854d0e]";
  }

  useEffect(() => {
    soundManager.playFanfare();
    if (accuracyPercent >= 80) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  }, [accuracyPercent]);

  const handleRequestAiComment = async () => {
    soundManager.playClick();
    setIsLoadingAi(true);
    setAiError(null);

    try {
      const response = await fetch("/api/gemini/teacher-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stage1Correct,
          stage1Total,
          stage2Correct,
          stage2Total,
          incorrectItems: incorrectCards,
        }),
      });

      if (!response.ok) {
        throw new Error("Lỗi kết nối");
      }

      const data = await response.json();
      if (data.nhan_xet) {
        setAiComment(data.nhan_xet);
      } else {
        setAiComment(
          "Cả lớp hôm nay tương tác rất sôi nổi và phân biệt chính xác các thể loại chương trình ti vi. Các em hãy nhớ luôn chọn nội dung phù hợp lứa tuổi và xem cùng người lớn nhé!"
        );
      }
    } catch {
      setAiError("Chưa nhờ được Gemini. Cô có thể tự nhận xét cho lớp.");
      setAiComment(
        "Cả lớp hôm nay rất tích cực thảo luận và giơ thẻ trả lời chính xác. Các em hãy nhớ quy tắc vàng: chọn kênh đúng tuổi, xem cùng người lớn và báo ngay khi thấy điều lạ!"
      );
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <main className="flex-1 w-full max-w-[1366px] mx-auto px-4 py-2 sm:py-4 flex flex-col justify-between">
      {/* Top Banner */}
      <div className="text-center mb-2 sm:mb-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/20 text-[#065f46] font-bold text-sm sm:text-base mb-1">
          <Trophy className="w-5 h-5 text-[#059669]" />
          <span>Tổng kết hoạt động: Mắt Sáng Chọn Hay</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#072d24]">
          Chúc mừng cả lớp đã hoàn thành xuất sắc!
        </h1>
      </div>

      {/* Grid: 3 main summary blocks */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 my-auto">
        {/* Block 1: Stars and Evaluation (4 cols) */}
        <div className="md:col-span-4 bg-white rounded-3xl p-4 sm:p-5 border-2 border-[#a7f3d0] shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#0e7490] block mb-1">
              Thành tích chung của lớp
            </span>
            <div className="flex items-center gap-3 my-2">
              <div className="w-16 h-16 rounded-2xl bg-[#fef08a] border-2 border-[#eab308] flex items-center justify-center shadow-inner">
                <Star className="w-10 h-10 fill-[#eab308] text-[#ca8a04]" />
              </div>
              <div>
                <span className="text-4xl sm:text-5xl font-black text-[#0f3d32]">{totalStars}</span>
                <span className="text-xl font-bold text-[#0d9472] ml-1.5">Ngôi sao</span>
              </div>
            </div>

            <div className="space-y-1.5 text-sm sm:text-base text-[#134e40] font-semibold mt-3">
              <p className="flex justify-between border-b pb-1">
                <span>Chặng 1 (Xếp chương trình):</span>
                <span className="font-bold text-[#0f766e]">
                  {stage1Correct}/{stage1Total}
                </span>
              </p>
              <p className="flex justify-between border-b pb-1">
                <span>Chặng 2 (Xem hay dừng):</span>
                <span className="font-bold text-[#0f766e]">
                  {stage2Correct}/{stage2Total}
                </span>
              </p>
              <p className="flex justify-between">
                <span>Chặng 3 (Lời cam kết tối nay):</span>
                <span className="font-bold text-[#059669]">Hoàn thành</span>
              </p>
            </div>
          </div>

          {/* Evaluation Level */}
          <div className={`mt-3 p-3 rounded-2xl border-2 text-center ${evaluationColor}`}>
            <span className="text-xs uppercase font-extrabold tracking-wider block">Mức đánh giá cả lớp</span>
            <span className="text-2xl font-black flex items-center justify-center gap-1.5 mt-0.5">
              <Flame className="w-6 h-6 fill-current" />
              <span>{evaluationLevel}</span>
            </span>
            <span className="text-xs font-bold block mt-0.5">
              Tỷ lệ chính xác: {accuracyPercent}%
            </span>
          </div>
        </div>

        {/* Block 2: Golden Memory Box & Incorrect list (5 cols) */}
        <div className="md:col-span-5 bg-white rounded-3xl p-4 sm:p-5 border-2 border-[#a7f3d0] shadow-sm flex flex-col justify-between">
          {/* Golden Memory Box (Phần ghi nhớ) */}
          <div className="bg-[#ecfdf5] border-3 border-[#10b981] rounded-2xl p-4 shadow-sm mb-3">
            <h2 className="text-base sm:text-lg font-black text-[#065f46] flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-[#059669]" />
              <span>Ghi nhớ vàng (Cả lớp cùng đọc to):</span>
            </h2>
            <p className="text-lg sm:text-xl font-black text-[#064e3b] leading-snug">
              "Chọn nội dung đúng lứa tuổi. Xem cùng người lớn. Gặp nội dung lạ thì dừng lại và báo người lớn."
            </p>
          </div>

          {/* Cards to review */}
          <div className="flex-1 bg-[#f8fafc] border border-gray-200 rounded-2xl p-3">
            <h2 className="text-sm font-bold text-gray-700 flex items-center gap-1.5 mb-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Các nội dung cô trò cần lưu ý ôn lại:</span>
            </h2>
            {incorrectCards.length === 0 ? (
              <div className="flex items-center gap-2 text-[#059669] text-base font-bold py-1">
                <CheckCircle2 className="w-5 h-5" />
                <span>Tuyệt vời! Cả lớp không làm sai thẻ nào!</span>
              </div>
            ) : (
              <ul className="space-y-1 text-sm text-gray-700 font-semibold max-h-24 overflow-y-auto">
                {incorrectCards.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Block 3: AI Teacher Comment Suggestion (3 cols) */}
        <div className="md:col-span-3 bg-[#f0fdfa] rounded-3xl p-4 border-2 border-[#5eead4] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#0f766e] mb-2">
              <Brain className="w-5 h-5 text-[#0d9488]" />
              <h2 className="text-base font-black">Góc cô giáo nhận xét</h2>
            </div>

            {aiComment ? (
              <div className="bg-white border-2 border-[#99f6e4] rounded-2xl p-3 shadow-inner">
                <span className="text-xs uppercase font-bold text-[#0d9488] block mb-1">
                  Gợi ý 2 câu nhận xét cụ thể:
                </span>
                <p className="text-sm sm:text-base font-medium text-[#134e40] leading-snug">
                  "{aiComment}"
                </p>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-[#115e59] leading-relaxed">
                Bấm nút bên dưới để nhận gợi ý 2 câu nhận xét tích cực cho tiết dạy từ kết quả thực tế của lớp.
              </p>
            )}

            {aiError && (
              <p className="text-xs text-rose-600 font-medium mt-1.5">{aiError}</p>
            )}
          </div>

          <button
            onClick={handleRequestAiComment}
            disabled={isLoadingAi}
            className="mt-3 w-full py-2.5 px-3 rounded-xl bg-white border-2 border-[#14b8a6] hover:bg-[#ccfbf1] text-[#0f766e] font-extrabold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-sm disabled:opacity-50"
          >
            {isLoadingAi ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#0d9488]" />
                <span>Đang tạo gợi ý...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#0d9488]" />
                <span>{aiComment ? "Tạo gợi ý khác" : "Gợi ý lời nhận xét"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Button: Play Again */}
      <div className="flex justify-center mt-3">
        <button
          onClick={() => {
            soundManager.playClick();
            onPlayAgain();
          }}
          className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-[#0d9488] to-[#059669] hover:from-[#0f766e] hover:to-[#047857] text-white font-black text-2xl shadow-xl flex items-center gap-3 active:scale-95 transition-all cursor-pointer"
        >
          <RotateCcw className="w-7 h-7" />
          <span>Chơi lại</span>
        </button>
      </div>
    </main>
  );
};
