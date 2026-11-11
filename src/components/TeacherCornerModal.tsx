import React, { useState } from "react";
import { ProgramCard, ProgramCategory, GeminiCardSuggestion } from "../types";
import { DEFAULT_STAGE1_CARDS } from "../data/defaultCards";
import { soundManager } from "../utils/audio";
import {
  X,
  Plus,
  Trash2,
  Sparkles,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Brain,
  Loader2,
  Info,
} from "lucide-react";

interface TeacherCornerModalProps {
  cards: ProgramCard[];
  onSaveCards: (cards: ProgramCard[]) => void;
  onClose: () => void;
}

export const TeacherCornerModal: React.FC<TeacherCornerModalProps> = ({
  cards,
  onSaveCards,
  onClose,
}) => {
  // AI query state
  const [aiProgramQuery, setAiProgramQuery] = useState<string>("");
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<GeminiCardSuggestion | null>(null);

  // Form input fields for teacher review / manual entry
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputCategory, setInputCategory] = useState<ProgramCategory>("Giáo dục");
  const [inputDescription, setInputDescription] = useState<string>("");
  const [inputExplanation, setInputExplanation] = useState<string>("");
  const [formFeedback, setFormFeedback] = useState<string | null>(null);

  const handleRestoreDefaults = () => {
    soundManager.playClick();
    if (window.confirm("Cô có chắc muốn khôi phục lại 6 thẻ mẫu ban đầu không?")) {
      onSaveCards(DEFAULT_STAGE1_CARDS);
      setFormFeedback("Đã khôi phục 6 thẻ mẫu chuẩn.");
    }
  };

  const handleDeleteCard = (cardId: string) => {
    soundManager.playClick();
    if (cards.length <= 3) {
      alert("Cần giữ tối thiểu 3 thẻ để đảm bảo trò chơi hoạt động.");
      return;
    }
    const updated = cards.filter((c) => c.id !== cardId);
    onSaveCards(updated);
  };

  const handleAskGemini = async () => {
    if (!aiProgramQuery.trim()) {
      setAiError("Cô vui lòng nhập tên chương trình trước.");
      return;
    }

    soundManager.playClick();
    setIsLoadingAi(true);
    setAiError(null);
    setFormFeedback(null);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "suggest-card",
          programName: aiProgramQuery.trim(),
        }),
      });

      if (!response.ok) {
        let errorDetail = `Mã phản hồi HTTP ${response.status}`;
        try {
          const errData = await response.json();
          if (errData?.error) errorDetail = errData.error;
        } catch {
          // Phản hồi không phải json (ví dụ lỗi mạng hoặc 500 html)
        }
        throw new Error(errorDetail);
      }

      const data: GeminiCardSuggestion = await response.json();
      setAiSuggestion(data);

      // Điền sẵn vào form để giáo viên duyệt và chỉnh sửa nếu cần
      setInputTitle(aiProgramQuery.trim());
      if (data.nhom === "Tin tức" || data.nhom === "Giải trí" || data.nhom === "Giáo dục") {
        setInputCategory(data.nhom);
      }
      setInputDescription(data.mo_ta || "");
      setInputExplanation(data.giai_thich || "");
    } catch (err: any) {
      console.error("[Góc cô giáo] Chi tiết lỗi khi nhờ Gemini gợi ý thẻ:", err);
      setAiError("Chưa nhờ được Gemini. Cô có thể tự nhập thẻ.");
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleApproveAndAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) {
      alert("Vui lòng nhập tên chương trình.");
      return;
    }
    if (!inputDescription.trim()) {
      alert("Vui lòng nhập mô tả chương trình.");
      return;
    }
    if (!inputExplanation.trim()) {
      alert("Vui lòng nhập lời giải thích.");
      return;
    }

    soundManager.playCorrect();

    const newCard: ProgramCard = {
      id: `s1-custom-${Date.now()}`,
      ten: inputTitle.trim(),
      nhom: inputCategory,
      mo_ta: inputDescription.trim(),
      giai_thich: inputExplanation.trim(),
    };

    onSaveCards([...cards, newCard]);

    // Reset form
    setInputTitle("");
    setInputDescription("");
    setInputExplanation("");
    setAiProgramQuery("");
    setAiSuggestion(null);
    setFormFeedback("Đã duyệt và thêm thẻ mới vào trò chơi thành công!");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-modal-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
    >
      <div className="bg-[#f0fdfa] rounded-3xl border-4 border-[#0f766e] shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden text-[#0b2b24]">
        {/* Modal Header */}
        <div className="bg-[#0f766e] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-bold">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h2 id="teacher-modal-title" className="text-xl sm:text-2xl font-black">
                Góc Cô Giáo: Quản lý học liệu & Trợ lý gợi ý
              </h2>
              <p className="text-xs text-[#99f6e4] font-medium">
                Chuẩn bị thẻ chặng 1 cho học sinh lớp 3 • Lưu trữ trên máy tính này
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95"
            aria-label="Đóng bảng quản lý"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Section: Gemini Assistant */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#5eead4] shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-[#0f766e]">
              <Sparkles className="w-5 h-5 text-[#0d9488]" />
              <h3 className="text-lg font-black">Nhờ Gemini gợi ý thẻ chương trình</h3>
            </div>

            <p className="text-sm text-gray-600 mb-3">
              Cô chỉ cần nhập tên một chương trình truyền hình quen thuộc (ví dụ:{" "}
              <span className="font-semibold text-[#0f766e]">Đường lên đỉnh Olympia</span>,{" "}
              <span className="font-semibold text-[#0f766e]">Chúc bé ngủ ngon</span>,{" "}
              <span className="font-semibold text-[#0f766e]">Thế giới động vật</span>). AI sẽ phân tích thể loại và gợi ý lời giải thích vừa sức học sinh lớp 3.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 mb-3">
              <input
                type="text"
                value={aiProgramQuery}
                onChange={(e) => setAiProgramQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAskGemini()}
                placeholder="Nhập tên chương trình truyền hình..."
                className="flex-1 bg-[#f8fafc] border-2 border-gray-300 focus:border-[#0f766e] rounded-xl px-4 py-2.5 text-base font-semibold outline-none"
              />
              <button
                type="button"
                onClick={handleAskGemini}
                disabled={isLoadingAi}
                className="px-5 py-2.5 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-black text-base flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isLoadingAi ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Đang hỏi AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Nhờ Gemini gợi ý</span>
                  </>
                )}
              </button>
            </div>

            {/* Error notice if Gemini fails */}
            {aiError && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-sm font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>{aiError}</span>
              </div>
            )}

            {/* AI Review Banner: Always present as required */}
            <div className="p-3 rounded-xl bg-[#f0fdf4] border border-[#86efac] text-[#166534] text-xs sm:text-sm font-bold flex items-center gap-2">
              <Info className="w-5 h-5 text-[#15803d] shrink-0" />
              <span>Gợi ý của AI có thể sai. Cô xem trước chương trình rồi mới dùng.</span>
            </div>

            {/* AI result preview tags */}
            {aiSuggestion && (
              <div className="mt-3 p-3.5 rounded-xl bg-[#f8fafc] border-2 border-[#94a3b8] space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 uppercase">Đánh giá lứa tuổi:</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                      aiSuggestion.phu_hop_lop_3 === "Phù hợp"
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : aiSuggestion.phu_hop_lop_3 === "Không phù hợp"
                        ? "bg-red-100 text-red-800 border border-red-300"
                        : "bg-yellow-100 text-yellow-800 border border-yellow-300"
                    }`}
                  >
                    {aiSuggestion.phu_hop_lop_3}
                  </span>
                </div>
                {aiSuggestion.luu_y && (
                  <p className="text-xs text-gray-700 font-semibold">
                    <span className="font-bold">Lưu ý cho cô:</span> {aiSuggestion.luu_y}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Form: Teacher Review and Edit (Data is added ONLY when teacher clicks "Duyệt và thêm") */}
          <form
            onSubmit={handleApproveAndAdd}
            className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-[#a7f3d0] shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-lg font-black text-[#0f3d32] flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#10b981]" />
                <span>Biểu mẫu xem xét và thêm thẻ mới</span>
              </h3>
              <span className="text-xs font-semibold text-gray-500">
                (Cô có thể chỉnh sửa trước khi bấm Duyệt)
              </span>
            </div>

            {formFeedback && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-300 text-green-800 text-sm font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>{formFeedback}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-extrabold uppercase text-[#115e59] mb-1">
                  Tên chương trình truyền hình *
                </label>
                <input
                  type="text"
                  required
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                  placeholder="Ví dụ: Đường lên đỉnh Olympia"
                  className="w-full bg-[#f8fafc] border border-gray-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-sm font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-[#115e59] mb-1">
                  Thể loại kênh *
                </label>
                <select
                  value={inputCategory}
                  onChange={(e) => setInputCategory(e.target.value as ProgramCategory)}
                  className="w-full bg-[#f8fafc] border border-gray-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-sm font-bold outline-none cursor-pointer"
                >
                  <option value="Tin tức">Tin tức (Xanh dương)</option>
                  <option value="Giải trí">Giải trí (Vàng cam)</option>
                  <option value="Giáo dục">Giáo dục (Xanh lá)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-[#115e59] mb-1">
                  Mô tả nội dung (tối đa 20 từ) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={inputDescription}
                  onChange={(e) => setInputDescription(e.target.value)}
                  placeholder="Ví dụ: Cuộc thi kiến thức giữa các bạn học sinh..."
                  className="w-full bg-[#f8fafc] border border-gray-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-sm font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-[#115e59] mb-1">
                  Lời giải thích khi học sinh chọn đúng (tối đa 20 từ) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={inputExplanation}
                  onChange={(e) => setInputExplanation(e.target.value)}
                  placeholder="Ví dụ: Chương trình giúp các em mở rộng hiểu biết..."
                  className="w-full bg-[#f8fafc] border border-gray-300 focus:border-[#0f766e] rounded-xl px-3 py-2 text-sm font-medium outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0d9488] to-[#059669] hover:from-[#0f766e] hover:to-[#047857] text-white font-black text-base shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Duyệt và thêm</span>
              </button>
            </div>
          </form>

          {/* Section: Current Cards List */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3 border-b pb-2">
              <div>
                <h3 className="text-lg font-black text-[#0f3d32]">
                  Danh sách thẻ đang có ({cards.length} thẻ)
                </h3>
                <span className="text-xs text-gray-500 font-medium">
                  Cần giữ tối thiểu 3 thẻ để học sinh luân phiên
                </span>
              </div>

              <button
                onClick={handleRestoreDefaults}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Khôi phục 6 thẻ mẫu</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cards.map((c, idx) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-xl bg-[#f8fafc] border border-gray-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-extrabold text-[#07241d] text-base">
                        {idx + 1}. {c.ten}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-xs font-black shrink-0 ${
                          c.nhom === "Tin tức"
                            ? "bg-blue-100 text-blue-800"
                            : c.nhom === "Giải trí"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {c.nhom}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium mb-1 line-clamp-2">
                      <span className="font-bold text-gray-700">Mô tả:</span> {c.mo_ta}
                    </p>
                    <p className="text-xs text-emerald-800 font-medium line-clamp-2">
                      <span className="font-bold">Giải thích:</span> {c.giai_thich}
                    </p>
                  </div>

                  <div className="flex justify-end mt-2 pt-1 border-t border-gray-200">
                    <button
                      type="button"
                      disabled={cards.length <= 3}
                      onClick={() => handleDeleteCard(c.id)}
                      className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
                      title={cards.length <= 3 ? "Cần giữ tối thiểu 3 thẻ" : "Xóa thẻ này"}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#e6f4f1] px-5 py-3 border-t border-[#b2dfdb] flex items-center justify-between">
          <span className="text-xs text-[#00695c] font-semibold">
            Dữ liệu được lưu trữ tự động trên trình duyệt của máy tính cô giáo.
          </span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-6 py-2 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-black text-sm transition-colors active:scale-95"
          >
            Đóng và quay lại
          </button>
        </div>
      </div>
    </div>
  );
};
