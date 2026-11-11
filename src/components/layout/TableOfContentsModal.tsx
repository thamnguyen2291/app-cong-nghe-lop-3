import React from "react";
import { SectionId, SECTIONS } from "../../types/elearning";
import { X, CheckCircle, Lock, PlayCircle, BookOpen } from "lucide-react";
import { soundManager } from "../../utils/audio";

interface TableOfContentsModalProps {
  currentSection: SectionId;
  maxUnlockedSection: SectionId;
  onSelectSection: (id: SectionId) => void;
  onClose: () => void;
}

export const TableOfContentsModal: React.FC<TableOfContentsModalProps> = ({
  currentSection,
  maxUnlockedSection,
  onSelectSection,
  onClose,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="toc-modal-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
    >
      <div className="bg-[#f0fdfa] rounded-3xl border-4 border-[#0f766e] shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#0b2b24]">
        {/* Modal Header */}
        <div className="bg-[#0f766e] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 id="toc-modal-title" className="text-xl sm:text-2xl font-black">
                Mục Lục Bài Học
              </h2>
              <p className="text-xs text-[#99f6e4] font-medium">
                Chọn phần em muốn học hoặc xem lại
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95 cursor-pointer"
            aria-label="Đóng mục lục"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Modal List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {SECTIONS.map((sec) => {
            const isCurrent = sec.id === currentSection;
            const isUnlocked = sec.id <= maxUnlockedSection || sec.id <= currentSection;
            const isCompleted = sec.id < currentSection;

            return (
              <button
                key={sec.id}
                onClick={() => {
                  soundManager.playClick();
                  onSelectSection(sec.id);
                  onClose();
                }}
                className={`w-full p-4 rounded-2xl text-left font-bold transition-all flex items-center justify-between border-2 active:scale-98 cursor-pointer ${
                  isCurrent
                    ? "bg-[#ecfdf5] border-[#10b981] shadow-md ring-2 ring-[#34d399]"
                    : isCompleted
                    ? "bg-white border-[#a7f3d0] hover:bg-[#f0fdf4]"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${
                      isCurrent
                        ? "bg-[#10b981] text-white"
                        : isCompleted
                        ? "bg-[#dcfce7] text-[#15803d]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {sec.id}
                  </span>
                  <div className="truncate">
                    <span
                      className={`text-base sm:text-lg block truncate ${
                        isCurrent
                          ? "font-black text-[#064e3b]"
                          : isCompleted
                          ? "text-[#134e40]"
                          : "text-gray-700"
                      }`}
                    >
                      {sec.title}
                    </span>
                    {isCurrent && (
                      <span className="text-xs text-[#059669] font-extrabold uppercase tracking-wide">
                        ● Đang học tại đây
                      </span>
                    )}
                  </div>
                </div>

                <div className="shrink-0 ml-2">
                  {isCurrent ? (
                    <PlayCircle className="w-6 h-6 text-[#10b981]" />
                  ) : isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-[#059669]" />
                  ) : (
                    <span className="text-xs text-gray-400 font-medium">Bấm để học</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#e6f4f1] px-5 py-3 border-t border-[#b2dfdb] flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-black text-sm active:scale-95 transition-all cursor-pointer"
          >
            Đóng lại
          </button>
        </div>
      </div>
    </div>
  );
};
