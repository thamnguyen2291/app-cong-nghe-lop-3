import React from "react";
import { BanTiVi } from "../character/BanTiVi";
import { soundManager } from "../../utils/audio";
import {
  Users,
  Heart,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Tv,
} from "lucide-react";

interface Section6ApplyProps {
  familyUses: string[];
  chosenHealthyProgram: string;
  onToggleFamilyUse: (item: string) => void;
  onSelectHealthyProgram: (item: string) => void;
}

export const Section6Apply: React.FC<Section6ApplyProps> = ({
  familyUses,
  chosenHealthyProgram,
  onToggleFamilyUse,
  onSelectHealthyProgram,
}) => {
  const speechText =
    "Ở nhà em và bố mẹ cùng xem ti vi như thế nào? Hãy bấm chọn hoặc kể cho người lớn cùng nghe nhé!";

  const familyOptions = [
    { id: "news", label: "Bản tin thời sự, tin tức" },
    { id: "entertainment", label: "Phim hoạt hình, ca nhạc" },
    { id: "learning", label: "Chương trình học tập, khoa học" },
    { id: "sports", label: "Các trận đấu thể thao" },
  ];

  const healthyOptions = [
    "Khám phá thế giới động vật",
    "Em học tiếng Anh qua bài hát",
    "Gấp giấy Origami và khéo tay",
    "Em hỏi bố mẹ và cùng chọn",
  ];

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-3 sm:py-6 flex flex-col justify-between">
      <div className="space-y-4 my-auto">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/15 text-[#065f46] font-bold text-sm sm:text-base mb-1">
            <span>Phần 6: Vận dụng thực tế</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#072d24]">
            Ti Vi Trong Gia Đình Em
          </h2>
          <p className="text-base sm:text-xl font-semibold text-[#164e43] mt-1">
            Bấm chọn câu trả lời hoặc trao đổi cùng người lớn (không cần gõ chữ)
          </p>
        </div>

        {/* Question 1: Gia đình em thường dùng ti vi để xem những gì? (Chọn nhiều) */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-[#a7f3d0] shadow-sm max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#0f766e] text-white flex items-center justify-center font-black shrink-0">
              1
            </span>
            <div>
              <h3 className="text-lg sm:text-[22px] font-black text-[#07241d] leading-snug">
                Gia đình em thường dùng ti vi để xem những gì?
              </h3>
              <span className="text-xs text-gray-500 font-semibold">
                (Em có thể bấm chọn nhiều đáp án)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {familyOptions.map((opt) => {
              const isSelected = familyUses.includes(opt.label);
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    soundManager.playClick();
                    onToggleFamilyUse(opt.label);
                  }}
                  className={`p-3.5 rounded-2xl border-2 font-bold text-base sm:text-lg min-h-[56px] text-left transition-all active:scale-95 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#ecfdf5] border-[#10b981] text-[#065f46] shadow-sm ring-2 ring-[#34d399]"
                      : "bg-[#f8fafc] border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected ? (
                    <CheckCircle2 className="w-6 h-6 text-[#10b981] shrink-0 ml-2" />
                  ) : (
                    <div className="w-6 h-6 rounded-lg border-2 border-gray-300 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 2: Em sẽ chọn chương trình nào để vừa học vừa giải trí lành mạnh? */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-[#a7f3d0] shadow-sm max-w-3xl mx-auto space-y-3">
          <div className="flex items-start gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#0f766e] text-white flex items-center justify-center font-black shrink-0">
              2
            </span>
            <div>
              <h3 className="text-lg sm:text-[22px] font-black text-[#07241d] leading-snug">
                Em sẽ chọn chương trình nào để vừa học vừa giải trí lành mạnh?
              </h3>
              <span className="text-xs text-[#0f766e] font-semibold">
                Gợi ý: "Em hỏi bố mẹ và cùng chọn nhé!"
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {healthyOptions.map((item, idx) => {
              const isSelected = chosenHealthyProgram === item;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    soundManager.playCorrect();
                    onSelectHealthyProgram(item);
                  }}
                  className={`p-3.5 rounded-2xl border-2 font-bold text-base sm:text-lg min-h-[56px] text-left transition-all active:scale-95 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#fefce8] border-[#eab308] text-[#854d0e] shadow-sm ring-2 ring-[#fde047]"
                      : "bg-[#f8fafc] border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{item}</span>
                  {isSelected ? (
                    <CheckCircle2 className="w-6 h-6 text-[#ca8a04] shrink-0 ml-2" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Character Guidance */}
        <div className="max-w-3xl mx-auto">
          <BanTiVi emotion="happy" speechText={speechText} />
        </div>

        {/* Góc phụ huynh (Parental Guidance Box) */}
        <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-3xl bg-[#ecfdf5] border-3 border-[#10b981] shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#10b981] text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-black text-[#065f46] flex items-center gap-2 mb-1">
                <span>Góc Phụ Huynh Cùng Học Với Con</span>
              </h4>
              <p className="text-base sm:text-[19px] font-semibold text-[#134e40] leading-relaxed">
                Kính nhờ phụ huynh cùng con chọn chương trình phù hợp lứa tuổi, xem cùng con và nhắc con nghỉ ngơi sau 30-45 phút. Khuyến khích sử dụng ứng dụng chuyên biệt cho thiếu nhi (như YouTube Kids) và có cài đặt chế độ kiểm soát nội dung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
