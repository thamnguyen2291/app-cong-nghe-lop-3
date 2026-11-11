import React, { useState } from "react";
import { BanTiVi } from "../character/BanTiVi";
import { ProgramCategory } from "../../types/elearning";
import {
  SvgSceneGrandpaNews,
  SvgSceneFamilyEntertainment,
  SvgSceneChildLearning,
} from "../illustrations/SvgIllustrations";
import { soundManager } from "../../utils/audio";
import {
  Newspaper,
  Smile,
  GraduationCap,
  CheckCircle2,
  XCircle,
  BookmarkCheck,
  ArrowRight,
} from "lucide-react";

export const Section4Explore: React.FC = () => {
  const [currentPictureIndex, setCurrentPictureIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, ProgramCategory | null>>({
    0: null,
    1: null,
    2: null,
  });

  const pictures = [
    {
      id: 0,
      title: "Tranh 1: Ông xem ti vi",
      question: "Ông đang xem chương trình thuộc nhóm nào?",
      correctCategory: "Tin tức" as ProgramCategory,
      explanation:
        "Chính xác! Bản tin thời sự giúp ông nắm bắt các tin tức mới nhất xảy ra trong nước và trên thế giới.",
      illustration: <SvgSceneGrandpaNews className="w-full h-44 sm:h-52" />,
    },
    {
      id: 1,
      title: "Tranh 2: Cả nhà cùng xem ti vi",
      question: "Gia đình đang xem chương trình thuộc nhóm nào?",
      correctCategory: "Giải trí" as ProgramCategory,
      explanation:
        "Đúng rồi! Các bộ phim vui nhộn và bài hát rộn ràng giúp cả gia đình thư giãn, mang lại tiếng cười sảng khoái.",
      illustration: <SvgSceneFamilyEntertainment className="w-full h-44 sm:h-52" />,
    },
    {
      id: 2,
      title: "Tranh 3: Bạn nhỏ trước ti vi",
      question: "Bạn nhỏ đang xem chương trình thuộc nhóm nào?",
      correctCategory: "Giáo dục" as ProgramCategory,
      explanation:
        "Rất giỏi! Chương trình học tiếng Anh trên ti vi có mục đích chính là giúp các em học tập và mở rộng kiến thức.",
      illustration: <SvgSceneChildLearning className="w-full h-44 sm:h-52" />,
    },
  ];

  const currentPic = pictures[currentPictureIndex];
  const selectedAnswer = answers[currentPictureIndex];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === currentPic.correctCategory;

  const handleSelectCategory = (category: ProgramCategory) => {
    if (isAnswered) return;
    setAnswers((prev) => ({ ...prev, [currentPictureIndex]: category }));

    if (category === currentPic.correctCategory) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
  };

  const allCompleted = Object.values(answers).every((ans) => ans !== null);

  const getSpeechText = () => {
    if (!isAnswered) {
      return `Em hãy quan sát ${currentPic.title} và bấm chọn thể loại phù hợp nhé!`;
    }
    if (isCorrect) {
      return currentPic.explanation;
    }
    return `Chưa đúng rồi! Đây là chương trình ${currentPic.correctCategory}. ${currentPic.explanation}`;
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-3 sm:py-6 flex flex-col justify-between">
      <div className="space-y-4 my-auto">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/15 text-[#065f46] font-bold text-sm sm:text-base mb-1">
            <span>Phần 4: Khám phá kiến thức mới</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#072d24]">
            Tác Dụng Của Máy Thu Hình (Ti Vi)
          </h2>
        </div>

        {/* Picture Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
          {pictures.map((pic, idx) => {
            const hasAns = answers[idx] !== null;
            const isTabActive = currentPictureIndex === idx;
            return (
              <button
                key={pic.id}
                onClick={() => {
                  soundManager.playClick();
                  setCurrentPictureIndex(idx);
                }}
                className={`flex-1 py-2 px-3 rounded-xl font-black text-sm sm:text-base transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 border-2 ${
                  isTabActive
                    ? "bg-[#0f766e] text-white border-[#0f766e] shadow-md scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span>Tranh {idx + 1}</span>
                {hasAns && <CheckCircle2 className="w-4 h-4 text-[#34d399]" />}
              </button>
            );
          })}
        </div>

        {/* Main Observation Card */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border-3 border-[#a7f3d0] shadow-sm max-w-3xl mx-auto space-y-4">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
            {currentPic.illustration}
          </div>

          <div className="text-center">
            <h3 className="text-xl sm:text-[24px] font-black text-[#064e3b]">
              {currentPic.question}
            </h3>
          </div>

          {/* 3 Answer Buttons (min-h-[56px], >=22px text) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Button 1: Tin tức */}
            <button
              disabled={isAnswered}
              onClick={() => handleSelectCategory("Tin tức")}
              className={`py-3.5 px-4 rounded-2xl font-black text-xl sm:text-[22px] min-h-[56px] shadow-sm flex items-center justify-center gap-2 border-3 transition-all active:scale-95 cursor-pointer disabled:cursor-default ${
                selectedAnswer === "Tin tức"
                  ? "ring-4 ring-yellow-400 scale-[1.02]"
                  : ""
              } ${
                isAnswered && currentPic.correctCategory === "Tin tức"
                  ? "bg-[#2563eb] text-white border-[#1e40af]"
                  : isAnswered && selectedAnswer === "Tin tức"
                  ? "bg-rose-100 text-rose-800 border-rose-400"
                  : "bg-[#2563eb] hover:bg-[#1d4ed8] text-white border-[#1e40af]"
              } ${isAnswered && selectedAnswer !== "Tin tức" && currentPic.correctCategory !== "Tin tức" ? "opacity-40" : ""}`}
            >
              <Newspaper className="w-6 h-6 stroke-[2.5]" />
              <span>Tin tức</span>
            </button>

            {/* Button 2: Giải trí */}
            <button
              disabled={isAnswered}
              onClick={() => handleSelectCategory("Giải trí")}
              className={`py-3.5 px-4 rounded-2xl font-black text-xl sm:text-[22px] min-h-[56px] shadow-sm flex items-center justify-center gap-2 border-3 transition-all active:scale-95 cursor-pointer disabled:cursor-default ${
                selectedAnswer === "Giải trí"
                  ? "ring-4 ring-yellow-400 scale-[1.02]"
                  : ""
              } ${
                isAnswered && currentPic.correctCategory === "Giải trí"
                  ? "bg-[#ea580c] text-white border-[#c2410c]"
                  : isAnswered && selectedAnswer === "Giải trí"
                  ? "bg-rose-100 text-rose-800 border-rose-400"
                  : "bg-[#ea580c] hover:bg-[#c2410c] text-white border-[#c2410c]"
              } ${isAnswered && selectedAnswer !== "Giải trí" && currentPic.correctCategory !== "Giải trí" ? "opacity-40" : ""}`}
            >
              <Smile className="w-6 h-6 stroke-[2.5]" />
              <span>Giải trí</span>
            </button>

            {/* Button 3: Giáo dục */}
            <button
              disabled={isAnswered}
              onClick={() => handleSelectCategory("Giáo dục")}
              className={`py-3.5 px-4 rounded-2xl font-black text-xl sm:text-[22px] min-h-[56px] shadow-sm flex items-center justify-center gap-2 border-3 transition-all active:scale-95 cursor-pointer disabled:cursor-default ${
                selectedAnswer === "Giáo dục"
                  ? "ring-4 ring-yellow-400 scale-[1.02]"
                  : ""
              } ${
                isAnswered && currentPic.correctCategory === "Giáo dục"
                  ? "bg-[#16a34a] text-white border-[#15803d]"
                  : isAnswered && selectedAnswer === "Giáo dục"
                  ? "bg-rose-100 text-rose-800 border-rose-400"
                  : "bg-[#16a34a] hover:bg-[#15803d] text-white border-[#15803d]"
              } ${isAnswered && selectedAnswer !== "Giáo dục" && currentPic.correctCategory !== "Giáo dục" ? "opacity-40" : ""}`}
            >
              <GraduationCap className="w-6 h-6 stroke-[2.5]" />
              <span>Giáo dục</span>
            </button>
          </div>

          {/* Feedback & Next Picture Button */}
          {isAnswered && (
            <div
              className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-3 ${
                isCorrect
                  ? "bg-[#ecfdf5] border-[#34d399] text-[#065f46]"
                  : "bg-[#fff7ed] border-[#fb923c] text-[#9a3412]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isCorrect ? (
                  <CheckCircle2 className="w-7 h-7 text-[#059669] shrink-0" />
                ) : (
                  <XCircle className="w-7 h-7 text-[#ea580c] shrink-0" />
                )}
                <span className="text-base sm:text-lg font-bold">
                  {isCorrect
                    ? "Chính xác! Em giỏi lắm!"
                    : `Đáp án đúng là: ${currentPic.correctCategory}`}
                </span>
              </div>

              {currentPictureIndex < 2 && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setCurrentPictureIndex((prev) => prev + 1);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-black text-sm sm:text-base flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-sm shrink-0"
                >
                  <span>Xem Tranh {currentPictureIndex + 2}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Character Guidance */}
        <div className="max-w-3xl mx-auto">
          <BanTiVi
            emotion={isAnswered ? (isCorrect ? "excited" : "encouraging") : "thinking"}
            speechText={getSpeechText()}
          />
        </div>

        {/* Golden Memory Box at the end of section 4 */}
        {allCompleted && (
          <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-3xl bg-[#fefce8] border-3 border-[#eab308] shadow-md animate-fade-in">
            <div className="flex items-start gap-3">
              <BookmarkCheck className="w-8 h-8 text-[#ca8a04] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase font-black text-[#854d0e] tracking-wider block mb-1">
                  Thẻ ghi nhớ trọng tâm:
                </span>
                <p className="text-lg sm:text-[22px] font-black text-[#713f12] leading-relaxed">
                  "Máy thu hình, còn gọi là ti vi, dùng để xem các chương trình truyền hình. Nội dung thường là tin tức, giải trí và giáo dục."
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
