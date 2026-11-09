import React, { useState } from "react";
import { STAGE3_CHOICES, STAGE3_REASONS } from "../data/defaultCards";
import { soundManager } from "../utils/audio";
import {
  Sparkles,
  Heart,
  AlertTriangle,
  ArrowRight,
  Tv,
  CheckCircle2,
  BookmarkCheck,
  RotateCcw,
} from "lucide-react";

interface Stage3ScreenProps {
  onCompletePledge: (selectedProgram: string, selectedReason: string) => void;
  onGoToSummary: () => void;
}

export const Stage3Screen: React.FC<Stage3ScreenProps> = ({
  onCompletePledge,
  onGoToSummary,
}) => {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isFinishedPledge, setIsFinishedPledge] = useState<boolean>(false);

  const handleSelectProgram = (programName: string, isValid: boolean, warning?: string) => {
    if (!isValid) {
      soundManager.playIncorrect();
      setWarningMessage(warning || "Chương trình này không phù hợp với lứa tuổi của em.");
      setSelectedProgram(null);
      return;
    }

    soundManager.playClick();
    setWarningMessage(null);
    setSelectedProgram(programName);
  };

  const handleSelectReason = (reason: string) => {
    if (!selectedProgram) return;
    soundManager.playFanfare();
    setSelectedReason(reason);
    setIsFinishedPledge(true);
    onCompletePledge(selectedProgram, reason);
  };

  const handleResetChoice = () => {
    soundManager.playClick();
    setSelectedProgram(null);
    setSelectedReason(null);
    setWarningMessage(null);
    setIsFinishedPledge(false);
  };

  return (
    <main className="flex-1 w-full max-w-[1366px] mx-auto px-4 py-2 sm:py-4 flex flex-col justify-between">
      {/* Header bar for Stage 3 */}
      <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border-2 border-[#10b981] shadow-sm">
          <Sparkles className="w-6 h-6 text-[#10b981]" />
          <span className="text-xl sm:text-2xl font-black text-[#064e3b]">
            Chặng 3: Em tự chọn chương trình xem tối nay
          </span>
        </div>

        {selectedProgram && !isFinishedPledge && (
          <button
            onClick={handleResetChoice}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#a7f3d0] text-[#0f766e] text-sm font-bold hover:bg-[#f0fdf4]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chọn lại</span>
          </button>
        )}
      </div>

      {/* Main TV Frame */}
      <div className="flex-1 bg-[#0f2e26] rounded-3xl p-4 sm:p-6 border-4 border-[#071f19] shadow-2xl flex flex-col justify-between">
        {/* TV Top bar */}
        <div className="flex items-center justify-between pb-2 text-[#5eead4]/70 border-b border-[#1b4d42]/60">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <Tv className="w-4 h-4 text-[#2dd4bf]" />
            <span>Kênh truyền hình của riêng em</span>
          </div>
          <span className="text-xs text-[#99f6e4] font-semibold">Tự chủ & Bảo vệ bản thân</span>
        </div>

        {/* TV Screen Container */}
        <div className="my-auto bg-[#ffffff] rounded-2xl p-5 sm:p-7 border-2 border-[#164e43] shadow-inner text-[#092921] min-h-[340px] flex flex-col justify-center">
          {/* STEP 1: Select program */}
          {!selectedProgram && (
            <div>
              <h2 className="text-3xl sm:text-4xl xl:text-[42px] font-black text-[#07241d] tracking-tight text-center mb-6">
                Tối nay em chọn xem gì?
              </h2>

              {/* Warning prompt when selecting inappropriate movie */}
              {warningMessage && (
                <div
                  role="alert"
                  className="mb-5 p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-800 flex items-center gap-3 animate-bounce"
                >
                  <AlertTriangle className="w-7 h-7 text-rose-600 shrink-0" />
                  <p className="text-lg sm:text-xl font-bold">{warningMessage}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {STAGE3_CHOICES.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectProgram(choice.ten, choice.hop_le, choice.canh_bao)}
                    style={{ fontSize: "28px" }}
                    className={`p-4 sm:p-5 rounded-2xl text-left font-black transition-all shadow-md border-3 flex items-center justify-between active:scale-98 cursor-pointer ${
                      choice.hop_le
                        ? "bg-[#f0fdf4] text-[#065f46] border-[#86efac] hover:bg-[#dcfce7] hover:border-[#4ade80]"
                        : "bg-[#fff1f2] text-[#9f1239] border-[#fda4af] hover:bg-[#ffe4e6]"
                    }`}
                  >
                    <span className="leading-snug">{choice.ten}</span>
                    <ArrowRight className="w-7 h-7 shrink-0 text-[#10b981] ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Reason */}
          {selectedProgram && !isFinishedPledge && (
            <div>
              <div className="text-center mb-5">
                <span className="text-sm font-bold uppercase tracking-wider text-[#0e7490] block mb-1">
                  Em đã chọn chương trình:
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#07241d]">
                  "{selectedProgram}"
                </h2>
                <p className="text-xl sm:text-2xl font-bold text-[#0f766e] mt-2">
                  Vì sao em chọn chương trình này?
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {STAGE3_REASONS.map((reason, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectReason(reason)}
                    style={{ fontSize: "26px" }}
                    className="p-5 rounded-2xl bg-[#f0fdfa] text-[#115e59] border-3 border-[#5eead4] hover:bg-[#ccfbf1] hover:border-[#2dd4bf] font-black transition-all shadow-md flex flex-col items-center justify-center text-center active:scale-95 cursor-pointer leading-snug"
                  >
                    <Heart className="w-8 h-8 text-[#0d9488] mb-2 fill-[#99f6e4]" />
                    <span>Vì chương trình {reason}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Complete Final Pledge on TV */}
          {isFinishedPledge && (
            <div className="text-center py-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/20 text-[#065f46] font-bold text-lg mb-3">
                <BookmarkCheck className="w-6 h-6 text-[#059669]" />
                <span>Lời cam kết thông minh của em tối nay:</span>
              </div>

              {/* Requirement: Sentence display */}
              <div className="bg-[#ecfdf5] border-4 border-[#34d399] rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-lg mb-6">
                <p
                  className="text-2xl sm:text-3xl xl:text-4xl font-black text-[#064e3b] leading-relaxed"
                  style={{ wordBreak: "break-word" }}
                >
                  "Tối nay em chọn xem{" "}
                  <span className="text-[#0284c7] underline decoration-[#38bdf8]">
                    {selectedProgram}
                  </span>{" "}
                  vì chương trình{" "}
                  <span className="text-[#ea580c] underline decoration-[#fdba74]">
                    {selectedReason}
                  </span>
                  . Em xem cùng người lớn và tắt khi thấy nội dung lạ."
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onGoToSummary();
                  }}
                  className="py-4 px-8 rounded-2xl bg-gradient-to-r from-[#0d9488] to-[#059669] hover:from-[#0f766e] hover:to-[#047857] text-white font-black text-2xl sm:text-3xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
                >
                  <CheckCircle2 className="w-8 h-8" />
                  <span>Xem tổng kết hoạt động</span>
                  <ArrowRight className="w-7 h-7" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* TV Bezel bottom */}
        <div className="flex items-center justify-between pt-2 text-xs text-[#5eead4]/70">
          <span>Kỹ năng số: Tự chủ và có trách nhiệm khi sử dụng thiết bị thu hình</span>
          <span>Đạt chuẩn GDPT 2018</span>
        </div>
      </div>
    </main>
  );
};
