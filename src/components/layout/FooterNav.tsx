import React from "react";
import { SectionId } from "../../types/elearning";
import { ArrowLeft, ArrowRight, Menu, CheckCircle2 } from "lucide-react";
import { soundManager } from "../../utils/audio";

interface FooterNavProps {
  currentSection: SectionId;
  onGoBack: () => void;
  onGoNext: () => void;
  onOpenToc: () => void;
  nextDisabled?: boolean;
}

export const FooterNav: React.FC<FooterNavProps> = ({
  currentSection,
  onGoBack,
  onGoNext,
  onOpenToc,
  nextDisabled = false,
}) => {
  const isFirstSection = currentSection === 1;
  const isLastSection = currentSection === 7;

  return (
    <footer className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-[#bbf7d0] px-3 sm:px-6 py-2.5 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Back Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onGoBack();
          }}
          disabled={isFirstSection}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl min-h-[56px] font-black text-lg sm:text-xl transition-all active:scale-95 border-2 ${
            isFirstSection
              ? "opacity-35 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-200"
              : "bg-[#f0fdf4] hover:bg-[#dcfce7] text-[#166534] border-[#86efac] shadow-sm cursor-pointer"
          }`}
          aria-label="Quay lại phần trước"
        >
          <ArrowLeft className="w-6 h-6 shrink-0" />
          <span>Quay lại</span>
        </button>

        {/* Table of contents quick toggle */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenToc();
          }}
          className="hidden md:flex items-center justify-center gap-2 px-4 py-3 rounded-2xl min-h-[56px] font-bold text-base bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#334155] border-2 border-[#cbd5e1] active:scale-95 transition-all cursor-pointer shadow-sm"
          title="Xem danh sách 7 phần bài học"
        >
          <Menu className="w-5 h-5 text-[#0d9488]" />
          <span>Mục lục</span>
        </button>

        {/* Next Button */}
        {!isLastSection ? (
          <button
            onClick={() => {
              soundManager.playClick();
              onGoNext();
            }}
            disabled={nextDisabled}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl min-h-[56px] font-black text-lg sm:text-2xl transition-all active:scale-95 border-b-4 shadow-lg ${
              nextDisabled
                ? "opacity-50 cursor-not-allowed bg-gray-200 text-gray-500 border-gray-300"
                : "bg-gradient-to-r from-[#0d9488] to-[#059669] hover:from-[#0f766e] hover:to-[#047857] text-white border-[#064e3b] cursor-pointer"
            }`}
            aria-label="Chuyển sang phần tiếp theo"
          >
            <span>Tiếp theo</span>
            <ArrowRight className="w-6 h-6 shrink-0" />
          </button>
        ) : (
          <div className="flex items-center gap-2 text-[#059669] font-black text-base sm:text-lg bg-green-50 px-4 py-2 rounded-xl border border-green-200">
            <CheckCircle2 className="w-6 h-6 text-[#10b981]" />
            <span>Đã đến phần cuối</span>
          </div>
        )}
      </div>
    </footer>
  );
};
