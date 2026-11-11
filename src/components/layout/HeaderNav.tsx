import React from "react";
import { SectionId, SECTIONS } from "../../types/elearning";
import { speechManager } from "../../utils/speech";
import { Volume2, VolumeX, CheckCircle, RotateCcw, Menu, Tv } from "lucide-react";

interface HeaderNavProps {
  currentSection: SectionId;
  maxUnlockedSection: SectionId;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenToc: () => void;
  currentSpeechText: string;
  onBackToModeSelect: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentSection,
  maxUnlockedSection,
  isMuted,
  onToggleMute,
  onOpenToc,
  currentSpeechText,
  onBackToModeSelect,
}) => {
  const [hasVoice, setHasVoice] = React.useState<boolean>(speechManager.hasVoice);
  const [isSpeaking, setIsSpeaking] = React.useState<boolean>(speechManager.isSpeaking);

  React.useEffect(() => {
    const unsub = speechManager.subscribe(() => {
      setHasVoice(speechManager.hasVoice);
      setIsSpeaking(speechManager.isSpeaking);
    });
    return () => unsub();
  }, []);

  const handleReplaySpeech = () => {
    if (isSpeaking) {
      speechManager.stop();
    } else {
      speechManager.speak(currentSpeechText);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0a2822] text-white border-b-2 border-[#164e43] shadow-md px-3 sm:px-6 py-2.5">
      <div className="max-w-6xl mx-auto flex flex-col gap-2">
        {/* Top line: App & lesson info + Global controls */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo & Lesson Name */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#f97316] text-white flex items-center justify-center shrink-0 shadow-inner">
              <Tv className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-extrabold text-[#f0fdf4] truncate leading-tight">
                Mắt Sáng Chọn Hay • Bài giảng E-learning
              </h1>
              <p className="text-xs sm:text-sm text-[#99f6e4] font-medium truncate">
                Bài 5: Sử dụng máy thu hình (Tiết 1) • Công nghệ 3
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Table of contents button */}
            <button
              onClick={onOpenToc}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#134237] hover:bg-[#1a5547] text-[#99f6e4] border border-[#226354] text-xs sm:text-sm font-bold active:scale-95 transition-all cursor-pointer"
              title="Mở mục lục bài giảng"
              aria-label="Mục lục 7 phần"
            >
              <Menu className="w-4 h-4 text-[#34d399]" />
              <span className="hidden sm:inline">Mục lục</span>
            </button>

            {/* Read aloud button */}
            {hasVoice && (
              <button
                onClick={handleReplaySpeech}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all active:scale-95 cursor-pointer ${
                  isSpeaking
                    ? "bg-rose-900/60 border-rose-400 text-rose-200 animate-pulse"
                    : "bg-[#134237] hover:bg-[#1a5547] text-[#fef08a] border-[#226354]"
                }`}
                title={isSpeaking ? "Dừng giọng đọc" : "Nghe lại lời giảng của Bạn Ti Vi"}
                aria-label="Nghe lại lời giảng"
              >
                <RotateCcw className="w-4 h-4 text-[#facc15]" />
                <span className="hidden sm:inline">{isSpeaking ? "Dừng" : "Nghe lại"}</span>
              </button>
            )}

            {/* Sound effect mute toggle */}
            <button
              onClick={onToggleMute}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#134237] hover:bg-[#1a5547] text-[#99f6e4] border border-[#226354] text-xs sm:text-sm font-bold active:scale-95 transition-all cursor-pointer"
              title={isMuted ? "Bật âm thanh hiệu ứng" : "Tắt âm thanh hiệu ứng"}
              aria-label={isMuted ? "Bật tiếng" : "Tắt tiếng"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-400" />
                  <span className="hidden md:inline">Bật tiếng</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#34d399]" />
                  <span className="hidden md:inline">Tắt tiếng</span>
                </>
              )}
            </button>

            {/* Back to mode selection button */}
            <button
              onClick={onBackToModeSelect}
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#134237] hover:bg-[#1a5547] text-[#5eead4] border border-[#226354] active:scale-95 transition-all cursor-pointer"
              title="Quay lại trang chọn chế độ"
            >
              <span>Đổi chế độ</span>
            </button>
          </div>
        </div>

        {/* 7-part Progress Indicator */}
        <nav aria-label="Tiến độ bài học" className="w-full">
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {SECTIONS.map((sec) => {
              const isActive = sec.id === currentSection;
              const isDone = sec.id < currentSection || sec.id <= maxUnlockedSection;
              return (
                <div
                  key={sec.id}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-[#f59e0b] shadow-sm scale-y-125"
                      : isDone
                      ? "bg-[#10b981]"
                      : "bg-[#164e43]"
                  }`}
                  title={`${sec.title} ${isDone ? "(Đã học)" : ""}`}
                />
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[11px] sm:text-xs font-bold text-[#6ee7b7]/80 mt-1 px-0.5">
            <span>{SECTIONS[currentSection - 1].title}</span>
            <span className="font-mono text-[#a7f3d0]">
              Phần {currentSection}/7 ({Math.round((currentSection / 7) * 100)}%)
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
};
