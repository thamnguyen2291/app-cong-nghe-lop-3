import React, { useState, useEffect } from "react";
import { SafetyScenario, SafetyAnswer } from "../types";
import { soundManager } from "../utils/audio";
import {
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Tv,
  AlertTriangle,
} from "lucide-react";

interface Stage2ScreenProps {
  scenarios: SafetyScenario[];
  currentScenarioIndex: number;
  currentGroupNumber: number;
  onAnswer: (isCorrect: boolean, selectedAnswer: SafetyAnswer, scenario: SafetyScenario) => void;
  onNextScenario: () => void;
  isLastScenario: boolean;
  isPaused: boolean;
}

export const Stage2Screen: React.FC<Stage2ScreenProps> = ({
  scenarios,
  currentScenarioIndex,
  currentGroupNumber,
  onAnswer,
  onNextScenario,
  isLastScenario,
  isPaused,
}) => {
  const currentScenario = scenarios[currentScenarioIndex];
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<SafetyAnswer | null>(null);
  const [countdown, setCountdown] = useState<number>(20);

  useEffect(() => {
    setHasAnswered(false);
    setSelectedAnswer(null);
    setCountdown(20);
  }, [currentScenarioIndex]);

  useEffect(() => {
    if (hasAnswered || isPaused) return;
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [hasAnswered, isPaused, countdown]);

  if (!currentScenario) return null;

  const isCorrect = selectedAnswer === currentScenario.dap_an;

  const handleSelect = (answer: SafetyAnswer) => {
    if (hasAnswered) return;
    setSelectedAnswer(answer);
    setHasAnswered(true);

    const correct = answer === currentScenario.dap_an;
    if (correct) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
    onAnswer(correct, answer, currentScenario);
  };

  return (
    <main className="flex-1 w-full max-w-[1366px] mx-auto px-4 py-2 sm:py-4 flex flex-col justify-between">
      {/* Turn indicator and 30s countdown */}
      <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
        {/* Turn Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border-2 border-[#10b981] shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-[#0f766e] text-white flex items-center justify-center font-black">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-[#064e3b]">
            Lượt: <span className="text-[#0284c7] underline">Nhóm {currentGroupNumber}</span> lên bấm
          </span>
          <span className="text-sm font-bold text-[#047857] ml-2 hidden sm:inline">
            (Tình huống {currentScenarioIndex + 1}/{scenarios.length})
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

      {/* Main Workspace: Left is TV Chassis with Situation, Right is 2 Big Decision Buttons */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-0">
        {/* TV Chassis */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative flex-1 bg-[#0f2e26] rounded-3xl p-3 sm:p-5 border-4 border-[#071f19] shadow-2xl flex flex-col justify-between">
            {/* TV top status */}
            <div className="flex items-center justify-between pb-2 px-2 text-[#5eead4]/70 border-b border-[#1b4d42]/60">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest">
                <Tv className="w-4 h-4 text-[#2dd4bf]" />
                <span>An toàn số • Tình huống số {currentScenarioIndex + 1}</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs uppercase">
                <AlertTriangle className="w-4 h-4" />
                <span>Em xử lý thế nào?</span>
              </div>
            </div>

            {/* Bright TV Screen */}
            <div className="my-auto bg-[#ffffff] rounded-2xl p-5 sm:p-7 border-2 border-[#164e43] shadow-inner text-[#092921] min-h-[260px] sm:min-h-[300px] flex flex-col justify-center">
              <span className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#0e7490] block mb-2">
                Tình huống thực tế:
              </span>

              {/* Requirement: Title >= 40px */}
              <h2
                className="text-3xl sm:text-4xl xl:text-[42px] font-black leading-tight text-[#07241d] tracking-tight mb-4"
                style={{ minHeight: "2.2em" }}
              >
                {currentScenario.ten}
              </h2>

              <div className="bg-[#fefce8] border-l-4 border-[#eab308] p-3 sm:p-5 rounded-xl">
                <p className="text-xl sm:text-2xl text-[#713f12] font-semibold leading-relaxed">
                  "{currentScenario.tinh_huong}"
                </p>
              </div>
            </div>

            {/* TV bezel bottom bar */}
            <div className="flex items-center justify-between pt-2 px-2 text-xs text-[#5eead4]/70">
              <span className="font-semibold">Năng lực số 1.1.CB1a: Bảo vệ bản thân trên môi trường số</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#1b4d42]" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side: 2 Large Decision Buttons (Xem tiếp vs Dừng lại báo người lớn) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3">
          <div className="space-y-4">
            {/* Button 1: Xem tiếp (Green) */}
            <button
              disabled={hasAnswered}
              onClick={() => handleSelect("Xem tiếp")}
              style={{ fontSize: "30px" }}
              className={`w-full py-5 px-5 rounded-2xl text-white font-black shadow-lg transition-all flex items-center justify-between border-4 active:scale-98 cursor-pointer disabled:cursor-not-allowed bg-[#16a34a] hover:bg-[#15803d] border-[#166534] ${
                selectedAnswer === "Xem tiếp" ? "ring-4 ring-yellow-400 scale-[1.02]" : ""
              } ${hasAnswered && currentScenario.dap_an === "Xem tiếp" ? "ring-4 ring-green-300" : ""} ${
                hasAnswered && selectedAnswer !== "Xem tiếp" && currentScenario.dap_an !== "Xem tiếp"
                  ? "opacity-40"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-10 h-10 shrink-0 stroke-[2.5]" />
                <span>Xem tiếp</span>
              </div>
              {hasAnswered && currentScenario.dap_an === "Xem tiếp" && (
                <CheckCircle2 className="w-8 h-8 text-yellow-300 stroke-[3]" />
              )}
              {hasAnswered && selectedAnswer === "Xem tiếp" && !isCorrect && (
                <XCircle className="w-8 h-8 text-white stroke-[3]" />
              )}
            </button>

            {/* Button 2: Dừng lại, báo người lớn (Red) */}
            <button
              disabled={hasAnswered}
              onClick={() => handleSelect("Dừng")}
              style={{ fontSize: "30px" }}
              className={`w-full py-5 px-5 rounded-2xl text-white font-black shadow-lg transition-all flex items-center justify-between border-4 active:scale-98 cursor-pointer disabled:cursor-not-allowed bg-[#dc2626] hover:bg-[#b91c1c] border-[#991b1b] ${
                selectedAnswer === "Dừng" ? "ring-4 ring-yellow-400 scale-[1.02]" : ""
              } ${hasAnswered && currentScenario.dap_an === "Dừng" ? "ring-4 ring-green-300" : ""} ${
                hasAnswered && selectedAnswer !== "Dừng" && currentScenario.dap_an !== "Dừng"
                  ? "opacity-40"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-10 h-10 shrink-0 stroke-[2.5]" />
                <span className="leading-tight text-left">Dừng lại, báo người lớn</span>
              </div>
              {hasAnswered && currentScenario.dap_an === "Dừng" && (
                <CheckCircle2 className="w-8 h-8 text-yellow-300 stroke-[3]" />
              )}
              {hasAnswered && selectedAnswer === "Dừng" && !isCorrect && (
                <XCircle className="w-8 h-8 text-white stroke-[3]" />
              )}
            </button>
          </div>

          {/* Feedback & Explanation Card */}
          {hasAnswered && (
            <div
              className={`rounded-2xl p-4 border-2 shadow-md transition-all ${
                isCorrect
                  ? "bg-[#ecfdf5] border-[#34d399] text-[#065f46]"
                  : "bg-[#fff7ed] border-[#fb923c] text-[#9a3412]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-[#059669]" />
                ) : (
                  <XCircle className="w-6 h-6 text-[#ea580c]" />
                )}
                <h3 className="text-xl font-black">
                  {isCorrect
                    ? "Chính xác! Cả lớp được 1 sao ⭐"
                    : `Cách xử lý đúng: ${currentScenario.dap_an === "Dừng" ? "Dừng lại, báo người lớn" : "Xem tiếp"}`}
                </h3>
              </div>

              <p className="text-base sm:text-lg font-semibold mb-3 leading-snug">
                {currentScenario.giai_thich}
              </p>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onNextScenario();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-black text-xl sm:text-2xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>{isLastScenario ? "Sang Chặng 3: Tối nay em chọn" : "Tình huống tiếp theo"}</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
