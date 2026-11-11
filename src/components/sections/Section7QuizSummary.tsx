import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { BanTiVi } from "../character/BanTiVi";
import { QuizQuestion } from "../../types/elearning";
import { SvgBadgeMatSang } from "../illustrations/SvgIllustrations";
import { soundManager } from "../../utils/audio";
import {
  BookOpen,
  CheckCircle2,
  XCircle,
  Trophy,
  Star,
  Award,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookmarkCheck,
} from "lucide-react";

interface Section7QuizSummaryProps {
  practiceStars: number;
  quizAnswers: Record<number, number>;
  quizSubmitted: boolean;
  onAnswerQuestion: (questionId: number, optionIdx: number) => void;
  onSubmitQuiz: () => void;
  onGoToExplore: () => void;
  onRestartAll: () => void;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    cau_hoi: "Máy thu hình còn được gọi là gì?",
    lua_chon: ["Ti vi", "Máy tính", "Điện thoại"],
    dap_an_dung: 0,
    giai_thich: "Chính xác! Máy thu hình là tên gọi khoa học của chiếc ti vi quen thuộc.",
  },
  {
    id: 2,
    cau_hoi: "\"Dự báo thời tiết\" thuộc nhóm chương trình nào?",
    lua_chon: ["Tin tức", "Giải trí", "Giáo dục"],
    dap_an_dung: 0,
    giai_thich: "Đúng rồi! Bản tin dự báo thời tiết cung cấp thông tin mới nhất về nắng mưa.",
  },
  {
    id: 3,
    cau_hoi: "\"Phim hoạt hình\" thuộc nhóm chương trình nào?",
    lua_chon: ["Tin tức", "Giải trí", "Giáo dục"],
    dap_an_dung: 1,
    giai_thich: "Chính xác! Phim hoạt hình giúp các em vui vẻ, thư giãn sau giờ học.",
  },
  {
    id: 4,
    cau_hoi: "Đang xem video, em thấy cảnh đánh nhau đáng sợ. Em làm gì?",
    lua_chon: [
      "Dừng lại, báo người lớn",
      "Xem tiếp cho hết",
      "Tự tìm video giống vậy",
    ],
    dap_an_dung: 0,
    giai_thich: "Rất giỏi! Khi gặp nội dung đáng sợ, em dừng xem ngay và báo người lớn để được bảo vệ.",
  },
  {
    id: 5,
    cau_hoi: "Một bảng hiện ra xin tên và địa chỉ nhà em để nhận quà. Em làm gì?",
    lua_chon: [
      "Không bấm, báo người lớn",
      "Ghi tên và địa chỉ",
      "Bấm thử xem sao",
    ],
    dap_an_dung: 0,
    giai_thich: "Chính xác! Tuyệt đối không cung cấp thông tin cá nhân trên mạng mà phải báo ngay cho bố mẹ.",
  },
];

export const Section7QuizSummary: React.FC<Section7QuizSummaryProps> = ({
  practiceStars,
  quizAnswers,
  quizSubmitted,
  onAnswerQuestion,
  onSubmitQuiz,
  onGoToExplore,
  onRestartAll,
}) => {
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);

  const currentQ = QUIZ_QUESTIONS[currentQuizIdx];
  const selectedOption = quizAnswers[currentQ.id];
  const isAnswered = selectedOption !== undefined;
  const isCorrect = isAnswered && selectedOption === currentQ.dap_an_dung;

  // Calculate score
  const totalQuestions = QUIZ_QUESTIONS.length;
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach((q) => {
    if (quizAnswers[q.id] === q.dap_an_dung) {
      correctCount += 1;
    }
  });

  const allAnswered = QUIZ_QUESTIONS.every(
    (q) => quizAnswers[q.id] !== undefined
  );

  // Trigger celebration confetti when quiz submitted with high score
  useEffect(() => {
    if (quizSubmitted && correctCount >= 4) {
      soundManager.playFanfare();
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  }, [quizSubmitted, correctCount]);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    onAnswerQuestion(currentQ.id, idx);
    if (idx === currentQ.dap_an_dung) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
  };

  const getEvaluation = () => {
    if (correctCount >= 4) {
      return {
        text: "Em đã hoàn thành tốt bài học!",
        color: "bg-[#ecfdf5] border-[#10b981] text-[#065f46]",
        badge: true,
      };
    }
    if (correctCount >= 2) {
      return {
        text: "Em đã hoàn thành bài học!",
        color: "bg-[#fefce8] border-[#eab308] text-[#854d0e]",
        badge: true,
      };
    }
    return {
      text: "Em cùng ôn lại nhé!",
      color: "bg-[#fff1f2] border-[#f43f5e] text-[#9f1239]",
      badge: false,
    };
  };

  const evalResult = getEvaluation();

  const getSpeechText = () => {
    if (!quizSubmitted) {
      return "Chúng mình cùng làm 5 câu trắc nghiệm để kiểm tra lại những kiến thức vừa học nhé!";
    }
    return `${evalResult.text} Em đã trả lời đúng ${correctCount}/5 câu hỏi kiểm tra!`;
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-3 sm:py-6 flex flex-col justify-between">
      <div className="space-y-4 my-auto">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/15 text-[#065f46] font-bold text-sm sm:text-base mb-1">
            <span>Phần 7: Tổng kết và kiểm tra</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#072d24]">
            Kiểm Tra & Đánh Giá Bài Học
          </h2>
        </div>

        {/* 1. Phần Ghi nhớ vàng */}
        <div className="bg-[#ecfdf5] border-3 border-[#10b981] rounded-3xl p-5 sm:p-6 shadow-sm max-w-3xl mx-auto">
          <div className="flex items-start gap-3">
            <BookOpen className="w-8 h-8 text-[#059669] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs uppercase font-black text-[#047857] tracking-wider block mb-1">
                Ghi nhớ vàng (Cùng đọc to):
              </span>
              <p className="text-lg sm:text-[22px] font-black text-[#064e3b] leading-relaxed">
                "Ti vi giúp em xem tin tức, giải trí và học tập. Em chọn nội dung đúng lứa tuổi, xem cùng người lớn. Gặp nội dung lạ, em dừng lại và báo người lớn."
              </p>
            </div>
          </div>
        </div>

        {/* 2. Bài kiểm tra 5 câu trắc nghiệm */}
        {!quizSubmitted ? (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-[#a7f3d0] shadow-md max-w-3xl mx-auto space-y-4">
            {/* Quiz Progress & Question Switcher */}
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs sm:text-sm font-black text-[#0f766e] uppercase">
                Câu hỏi {currentQuizIdx + 1} / {totalQuestions}
              </span>
              <div className="flex gap-1.5">
                {QUIZ_QUESTIONS.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentQuizIdx(idx);
                    }}
                    className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center transition-all cursor-pointer ${
                      currentQuizIdx === idx
                        ? "bg-[#0f766e] text-white ring-2 ring-[#5eead4]"
                        : quizAnswers[q.id] !== undefined
                        ? "bg-[#dcfce7] text-[#15803d]"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Question */}
            <div>
              <h3 className="text-xl sm:text-[24px] font-black text-[#07241d] leading-snug">
                {currentQ.cau_hoi}
              </h3>
            </div>

            {/* 3 Options */}
            <div className="space-y-2.5">
              {currentQ.lua_chon.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isOptionCorrect = isAnswered && idx === currentQ.dap_an_dung;

                let optStyle = "bg-[#f8fafc] border-gray-200 text-gray-800 hover:bg-gray-50";
                if (isAnswered) {
                  if (isOptionCorrect) {
                    optStyle = "bg-[#ecfdf5] border-[#10b981] text-[#065f46] ring-2 ring-[#34d399]";
                  } else if (isSelected) {
                    optStyle = "bg-rose-50 border-rose-300 text-rose-800";
                  } else {
                    optStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border-2 font-bold text-lg sm:text-[20px] min-h-[56px] text-left transition-all active:scale-98 cursor-pointer flex items-center justify-between shadow-sm ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-white border border-gray-300 flex items-center justify-center text-sm font-black text-gray-700 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isAnswered && isOptionCorrect && (
                      <CheckCircle2 className="w-7 h-7 text-[#10b981] stroke-[2.5] shrink-0" />
                    )}
                    {isAnswered && isSelected && !isOptionCorrect && (
                      <XCircle className="w-7 h-7 text-rose-500 stroke-[2.5] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation after selecting */}
            {isAnswered && (
              <div
                className={`p-3.5 rounded-2xl border text-sm sm:text-base font-semibold ${
                  isCorrect
                    ? "bg-[#ecfdf5] border-[#a7f3d0] text-[#065f46]"
                    : "bg-[#fff7ed] border-[#fed7aa] text-[#9a3412]"
                }`}
              >
                {currentQ.giai_thich}
              </div>
            )}

            {/* Question Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentQuizIdx === 0}
                onClick={() => {
                  soundManager.playClick();
                  setCurrentQuizIdx((prev) => Math.max(0, prev - 1));
                }}
                className="px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                ← Câu trước
              </button>

              {currentQuizIdx < totalQuestions - 1 ? (
                <button
                  disabled={!isAnswered}
                  onClick={() => {
                    soundManager.playClick();
                    setCurrentQuizIdx((prev) => prev + 1);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-bold text-sm sm:text-base flex items-center gap-1.5 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
                >
                  <span>Câu tiếp theo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  disabled={!allAnswered}
                  onClick={() => {
                    soundManager.playFanfare();
                    onSubmitQuiz();
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0d9488] to-[#059669] hover:from-[#0f766e] hover:to-[#047857] text-white font-black text-base sm:text-lg flex items-center gap-2 active:scale-95 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Trophy className="w-5 h-5" />
                  <span>Xem kết quả bài học</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* 3. Báo cáo Kết quả bài học & Huy hiệu */
          <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-[#a7f3d0] shadow-md max-w-3xl mx-auto space-y-5 animate-fade-in text-center">
            <h3 className="text-2xl sm:text-3xl font-black text-[#072d24]">
              Kết Quả Hoàn Thành Bài Học
            </h3>

            {/* Score Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
              <div className="p-4 rounded-2xl bg-[#fefce8] border-2 border-[#eab308]">
                <span className="text-xs font-black uppercase text-[#854d0e] block">
                  Sao Luyện Tập
                </span>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <Star className="w-8 h-8 fill-[#eab308] text-[#ca8a04]" />
                  <span className="text-3xl sm:text-4xl font-black text-[#713f12]">
                    {practiceStars}/10
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#ecfdf5] border-2 border-[#10b981]">
                <span className="text-xs font-black uppercase text-[#065f46] block">
                  Điểm Kiểm Tra
                </span>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <Trophy className="w-8 h-8 text-[#059669]" />
                  <span className="text-3xl sm:text-4xl font-black text-[#064e3b]">
                    {correctCount}/5
                  </span>
                </div>
              </div>
            </div>

            {/* Evaluation Alert */}
            <div className={`p-4 rounded-2xl border-2 font-black text-xl sm:text-2xl ${evalResult.color}`}>
              {evalResult.text}
            </div>

            {/* Huy hiệu Mắt Sáng SVG award */}
            {evalResult.badge ? (
              <div className="flex flex-col items-center justify-center py-2">
                <SvgBadgeMatSang className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-lg animate-bounce" />
                <span className="text-base sm:text-lg font-black text-[#065f46] mt-2">
                  🎉 Chúc mừng em đã nhận Huy Hiệu Mắt Sáng!
                </span>
              </div>
            ) : (
              <div className="py-2">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onGoToExplore();
                  }}
                  className="px-6 py-3 rounded-2xl bg-[#0f766e] hover:bg-[#115e59] text-white font-black text-base shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  Quay lại phần Khám phá để ôn bài
                </button>
              </div>
            )}

            {/* Dặn dò của giáo viên */}
            <div className="p-4 rounded-2xl bg-[#f0fdfa] border-2 border-[#5eead4] text-left">
              <span className="text-xs uppercase font-extrabold text-[#0f766e] block mb-1">
                Dặn dò của cô giáo:
              </span>
              <p className="text-base sm:text-lg font-semibold text-[#134e40] leading-relaxed">
                "Em quan sát cách gia đình xem ti vi và chuẩn bị tìm hiểu mối quan hệ giữa đài truyền hình và máy thu hình ở Tiết 2 nhé!"
              </p>
            </div>

            {/* Nút Học lại từ đầu */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => {
                  soundManager.playClick();
                  if (window.confirm("Em có muốn xóa kết quả và học lại từ đầu không?")) {
                    onRestartAll();
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-black text-base transition-all active:scale-95 cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-5 h-5 text-gray-600" />
                <span>Học lại từ đầu</span>
              </button>
            </div>
          </div>
        )}

        {/* Character Feedback */}
        <div className="max-w-3xl mx-auto">
          <BanTiVi
            emotion={quizSubmitted ? (evalResult.badge ? "excited" : "encouraging") : "happy"}
            speechText={getSpeechText()}
          />
        </div>
      </div>
    </div>
  );
};
