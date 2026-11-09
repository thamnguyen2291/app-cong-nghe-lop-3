import React from "react";
import { AppStage } from "../types";
import {
  Tv,
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface TopBarProps {
  currentStage: AppStage;
  stars: number;
  elapsedSeconds: number;
  isPaused: boolean;
  isMuted: boolean;
  onTogglePause: () => void;
  onToggleMute: () => void;
  onGoToStage: (stage: AppStage) => void;
}

const STAGES: { key: AppStage; label: string; stepNumber: number }[] = [
  { key: "stage1", label: "1. Xếp chương trình", stepNumber: 1 },
  { key: "stage2", label: "2. Xem hay dừng", stepNumber: 2 },
  { key: "stage3", label: "3. Tối nay em chọn", stepNumber: 3 },
  { key: "summary", label: "Tổng kết", stepNumber: 4 },
];

export const TopBar: React.FC<TopBarProps> = ({
  currentStage,
  stars,
  elapsedSeconds,
  isPaused,
  isMuted,
  onTogglePause,
  onToggleMute,
}) => {
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getStageIndex = (stage: AppStage) => {
    if (stage === "start") return -1;
    if (stage === "stage1") return 0;
    if (stage === "stage2") return 1;
    if (stage === "stage3") return 2;
    return 3;
  };

  const currentIdx = getStageIndex(currentStage);

  return (
    <header className="w-full bg-[#0a2822] text-white px-4 py-2.5 shadow-md border-b-2 border-[#164e43] shrink-0">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* App Title & Icon */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1fc794] text-[#0a2822] flex items-center justify-center font-black shadow-inner">
            <Tv className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#f0fdf4] leading-tight">
              Mắt Sáng Chọn Hay
            </h1>
            <p className="text-xs font-medium text-[#99f6e4] hidden md:block">
              Công nghệ lớp 3 • Sử dụng máy thu hình
            </p>
          </div>
        </div>

        {/* 4 Steps Indicator */}
        <nav aria-label="Các chặng hoạt động" className="hidden lg:flex items-center gap-1.5 xl:gap-2 bg-[#061d19] px-3 py-1.5 rounded-full border border-[#1a4a40]">
          {STAGES.map((s, idx) => {
            const isActive = currentStage === s.key;
            const isCompleted = currentIdx > idx;
            return (
              <div
                key={s.key}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold transition-all duration-150 ${
                  isActive
                    ? "bg-[#1fc794] text-[#052e24] shadow-sm scale-105"
                    : isCompleted
                    ? "text-[#a7f3d0] bg-[#0c352c]"
                    : "text-[#6ee7b7]/60"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-[#34d399]" />
                ) : (
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-black ${
                      isActive ? "bg-[#052e24] text-[#1fc794]" : "bg-[#164e43] text-[#99f6e4]"
                    }`}
                  >
                    {s.stepNumber}
                  </span>
                )}
                <span>{s.label}</span>
              </div>
            );
          })}
        </nav>

        {/* Status items & Teacher Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Class Stars */}
          <div className="flex items-center gap-1.5 bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#fef08a] px-3 py-1.5 rounded-xl font-black text-base sm:text-lg shadow-sm">
            <Star className="w-5 h-5 fill-[#facc15] text-[#facc15]" />
            <span>{stars}</span>
            <span className="text-xs font-semibold text-[#fde047] uppercase tracking-wide">
              Sao
            </span>
          </div>

          {/* Activity Timer vs 10:00 */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-sm sm:text-base font-bold border transition-colors ${
              elapsedSeconds > 600
                ? "bg-red-950/70 border-red-500/50 text-red-200"
                : "bg-[#0c352c] border-[#1a4a40] text-[#a7f3d0]"
            }`}
            title="Thời gian thực hiện hoạt động (chuẩn 10:00)"
          >
            <Clock className="w-4 h-4 text-[#2dd4bf]" />
            <span>{formatTime(elapsedSeconds)}</span>
            <span className="text-[#5eead4]/60 font-sans text-xs">/ 10:00</span>
          </div>

          {/* Pause / Resume Button */}
          <button
            onClick={onTogglePause}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold border transition-colors active:scale-95 ${
              isPaused
                ? "bg-amber-500 text-[#0a2822] border-amber-400 hover:bg-amber-400"
                : "bg-[#134237] text-[#99f6e4] border-[#226354] hover:bg-[#1a5547]"
            }`}
            aria-label={isPaused ? "Tiếp tục đồng hồ" : "Tạm dừng đồng hồ"}
          >
            {isPaused ? (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline">Tiếp tục</span>
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" />
                <span className="hidden sm:inline">Tạm dừng</span>
              </>
            )}
          </button>

          {/* Mute / Unmute Button */}
          <button
            onClick={onToggleMute}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold bg-[#134237] text-[#99f6e4] border border-[#226354] hover:bg-[#1a5547] active:scale-95 transition-colors"
            aria-label={isMuted ? "Bật tiếng" : "Tắt tiếng"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-red-400" />
                <span className="hidden sm:inline">Bật tiếng</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#34d399]" />
                <span className="hidden sm:inline">Tắt tiếng</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
