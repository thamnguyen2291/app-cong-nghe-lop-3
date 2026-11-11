import React, { useState, useEffect } from "react";
import { ProgramCard, ProgramCategory } from "../types";
import { soundManager } from "../utils/audio";
import {
  Newspaper,
  Smile,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Tv,
} from "lucide-react";

interface Stage1ScreenProps {
  cards: ProgramCard[];
  currentCardIndex: number;
  currentGroupNumber: number;
  currentMemberNumber: number;
  onAnswer: (isCorrect: boolean, selectedCategory: ProgramCategory, card: ProgramCard) => void;
  onNextCard: () => void;
  isLastCard: boolean;
  isPaused: boolean;
}

export const Stage1Screen: React.FC<Stage1ScreenProps> = ({
  cards,
  currentCardIndex,
  currentGroupNumber,
  currentMemberNumber,
  onAnswer,
  onNextCard,
  isLastCard,
  isPaused,
}) => {
  const currentCard = cards[currentCardIndex];
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory | null>(null);
  const [countdown, setCountdown] = useState<number>(20);

  // Reset state when currentCardIndex changes
  useEffect(() => {
    setHasAnswered(false);
    setSelectedCategory(null);
    setCountdown(20);
  }, [currentCardIndex]);

  // 20-second timer countdown
  useEffect(() => {
    if (hasAnswered || isPaused) return;
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [hasAnswered, isPaused, countdown]);

  if (!currentCard) {
    return null;
  }

  const isCorrect = selectedCategory === currentCard.nhom;

  const handleSelect = (category: ProgramCategory) => {
    if (hasAnswered) return;
    setSelectedCategory(category);
    setHasAnswered(true);

    const correct = category === currentCard.nhom;
    if (correct) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
    onAnswer(correct, category, currentCard);
  };

  const getCategoryTheme = (category: ProgramCategory) => {
    switch (category) {
      case "Tin tức":
        return {
          bg: "bg-[#2563eb] hover:bg-[#1d4ed8]",
          border: "border-[#1e40af]",
          icon: <Newspaper className="w-9 h-9 shrink-0 stroke-[2.5]" />,
          label: "Tin tức",
          tagBg: "bg-blue-100 text-blue-800 border-blue-300",
        };
      case "Giải trí":
        return {
          bg: "bg-[#ea580c] hover:bg-[#c2410c]",
          border: "border-[#9a3412]",
          icon: <Smile className="w-9 h-9 shrink-0 stroke-[2.5]" />,
          label: "Giải trí",
          tagBg: "bg-orange-100 text-orange-800 border-orange-300",
        };
      case "Giáo dục":
        return {
          bg: "bg-[#16a34a] hover:bg-[#15803d]",
          border: "border-[#166534]",
          icon: <GraduationCap className="w-9 h-9 shrink-0 stroke-[2.5]" />,
          label: "Giáo dục",
          tagBg: "bg-green-100 text-green-800 border-green-300",
        };
    }
  };

  return (
    <main className="flex-1 w-full max-w-[1366px] mx-auto px-4 py-2 sm:py-4 flex flex-col justify-between">
      {/* Turn indicator and 30s countdown bar */}
      <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
        {/* Turn Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border-2 border-[#10b981] shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-[#0f766e] text-white flex items-center justify-center font-black">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-[#064e3b]">
            Lượt: <span className="text-[#0284c7] underline">Nhóm {currentGroupNumber}, bạn số {currentMemberNumber}</span> lên bấm
          </span>
          <span className="text-sm font-bold text-[#047857] ml-2 hidden sm:inline">
            (Kênh {currentCardIndex + 1}/{cards.length})
          </span>
        </div>

        {/* 20-second Countdown: hidden after answering */}
        {!hasAnswered && (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border-2 font-mono font-bold text-lg sm:text-xl shadow-sm transition-colors ${
              countdown === 0
                ? "bg-amber-100 border-amber-400 text-amber-900"
                : countdown <= 7
                ? "bg-rose-100 border-rose-400 text-rose-800 animate-pulse"
                : "bg-white border-[#5eead4] text-[#0f766e]"
            }`}
            aria-label="Thời gian thảo luận nhóm"
          >
            <Clock className="w-5 h-5" />
            <span>{countdown > 0 ? `${countdown}s` : "Hết giờ giơ thẻ!"}</span>
            <span className="text-xs font-sans text-gray-500 hidden md:inline">
              {countdown > 0 ? "thảo luận" : "hãy bấm ngay"}
            </span>
          </div>
        )}
      </div>

      {/* Main Workspace: Left is TV Chassis, Right is 3 Large Answer Buttons */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-0">
        {/* Television Frame (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative flex-1 bg-[#0f2e26] rounded-3xl p-3 sm:p-5 border-4 border-[#071f19] shadow-2xl flex flex-col justify-between">
            {/* TV top antenna hint & brand */}
            <div className="flex items-center justify-between pb-2 px-2 text-[#5eead4]/70 border-b border-[#1b4d42]/60">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                <Tv className="w-4 h-4 text-[#2dd4bf]" />
                <span>Ti vi lớp 3 • Kênh số {currentCardIndex + 1}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block animate-ping" />
                <span className="text-xs font-bold text-red-400 uppercase">Đang phát</span>
              </div>
            </div>

            {/* Bright TV Screen Content */}
            <div className="my-auto bg-[#ffffff] rounded-2xl p-5 sm:p-7 border-2 border-[#164e43] shadow-inner text-[#092921] min-h-[260px] sm:min-h-[300px] flex flex-col justify-center">
              <span className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#0e7490] block mb-2">
                Tên chương trình truyền hình:
              </span>

              {/* Requirement: Title >= 40px, readable from back of class */}
              <h2
                className="text-3xl sm:text-4xl xl:text-[42px] font-black leading-tight text-[#07241d] tracking-tight mb-4"
                style={{ minHeight: "2.5em" }}
              >
                {currentCard.ten}
              </h2>

              <div className="bg-[#f0fdf4] border-l-4 border-[#10b981] p-3 sm:p-4 rounded-xl">
                <span className="text-xs font-extrabold uppercase text-[#047857] block mb-1">
                  Nội dung chương trình:
                </span>
                <p className="text-lg sm:text-2xl text-[#134e40] font-medium leading-relaxed">
                  {currentCard.mo_ta}
                </p>
              </div>
            </div>

            {/* TV bezel bottom bar: speaker grilles & status */}
            <div className="flex items-center justify-between pt-2 px-2 text-xs text-[#5eead4]/70">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#1b4d42]" />
                ))}
              </div>
              <span className="font-semibold">Màn hình độ nét cao dành cho máy chiếu</span>
            </div>
          </div>
        </div>

        {/* Right side: 3 Large Answer Buttons & Feedback (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3">
          {/* Answer Buttons (30px min text) */}
          <div className="space-y-3">
            {(["Tin tức", "Giải trí", "Giáo dục"] as ProgramCategory[]).map((cat) => {
              const theme = getCategoryTheme(cat);
              const isSelected = selectedCategory === cat;
              const isTargetCorrect = hasAnswered && currentCard.nhom === cat;

              return (
                <button
                  key={cat}
                  disabled={hasAnswered}
                  onClick={() => handleSelect(cat)}
                  style={{ fontSize: "30px" }}
                  className={`w-full py-4 px-5 rounded-2xl text-white font-black shadow-lg transition-all flex items-center justify-between border-4 active:scale-98 cursor-pointer disabled:cursor-not-allowed ${
                    theme.bg
                  } ${theme.border} ${
                    isSelected ? "ring-4 ring-yellow-400 scale-[1.02]" : ""
                  } ${hasAnswered && !isSelected && !isTargetCorrect ? "opacity-45" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    {theme.icon}
                    <span>{theme.label}</span>
                  </div>
                  {hasAnswered && isTargetCorrect && (
                    <CheckCircle2 className="w-8 h-8 text-yellow-300 stroke-[3]" />
                  )}
                  {hasAnswered && isSelected && !isTargetCorrect && (
                    <XCircle className="w-8 h-8 text-white stroke-[3]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Card after answering */}
          {hasAnswered && (
            <div
              className={`rounded-2xl p-4 border-2 shadow-md transition-all ${
                isCorrect
                  ? "bg-[#ecfdf5] border-[#34d399] text-[#065f46]"
                  : "bg-[#fff7ed] border-[#fb923c] text-[#9a3412]"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-[#059669]" />
                  ) : (
                    <XCircle className="w-6 h-6 text-[#ea580c]" />
                  )}
                  <h3 className="text-xl font-black">
                    {isCorrect ? "Chính xác! Cả lớp được 1 sao ⭐" : `Đáp án đúng là: ${currentCard.nhom}`}
                  </h3>
                </div>
              </div>

              <p className="text-base sm:text-lg font-semibold mb-3 leading-snug">
                {currentCard.giai_thich}
              </p>

              {/* Next Button */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  onNextCard();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-black text-xl sm:text-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>{isLastCard ? "Sang Chặng 2: Xem hay dừng" : "Kênh tiếp theo"}</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
