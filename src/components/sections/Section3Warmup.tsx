import React, { useState } from "react";
import { BanTiVi } from "../character/BanTiVi";
import {
  SvgNewsCard,
  SvgCartoonCard,
  SvgScienceCard,
} from "../illustrations/SvgIllustrations";
import { soundManager } from "../../utils/audio";
import { CheckCircle2, BookmarkCheck, Heart } from "lucide-react";

export const Section3Warmup: React.FC = () => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const choices = [
    {
      id: "news",
      title: "Bản tin thời sự",
      subtitle: "Xem tin tức trong nước và thế giới",
      response:
        "Ồ, xem bản tin giúp em biết thêm nhiều tin tức mới và sự kiện quan trọng trong ngày đấy!",
      illustration: <SvgNewsCard className="w-full h-32 sm:h-36" />,
      border: "border-blue-400 hover:border-blue-600 bg-blue-50/50",
    },
    {
      id: "cartoon",
      title: "Phim hoạt hình",
      subtitle: "Những nhân vật vui nhộn, đáng yêu",
      response:
        "Tuyệt quá! Phim hoạt hình mang lại những tiếng cười vui vẻ và bài học tình bạn đáng quý sau giờ học!",
      illustration: <SvgCartoonCard className="w-full h-32 sm:h-36" />,
      border: "border-orange-400 hover:border-orange-600 bg-orange-50/50",
    },
    {
      id: "science",
      title: "Khám phá khoa học",
      subtitle: "Tìm hiểu bí ẩn vũ trụ và loài vật",
      response:
        "Thật tuyệt vời! Khám phá khoa học giúp em hiểu biết thêm nhiều điều kì diệu của thế giới tự nhiên!",
      illustration: <SvgScienceCard className="w-full h-32 sm:h-36" />,
      border: "border-green-400 hover:border-green-600 bg-green-50/50",
    },
  ];

  const currentFeedback = selectedChoice
    ? choices.find((c) => c.id === selectedChoice)?.response ||
      "Ti vi có rất nhiều chương trình hấp dẫn và bổ ích cho em khám phá!"
    : "Em hãy bấm chọn một chương trình truyền hình mà mình yêu thích nhất nhé!";

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 flex flex-col justify-between">
      <div className="space-y-4 my-auto">
        {/* Title */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/15 text-[#065f46] font-bold text-sm sm:text-base mb-2">
            <span>Phần 3: Khởi động</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#072d24]">
            Em thích chương trình truyền hình nào?
          </h2>
          <p className="text-base sm:text-xl font-semibold text-[#164e43] mt-1">
            Bấm chọn 1 trong 3 bức tranh bên dưới:
          </p>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {choices.map((choice) => {
            const isSelected = selectedChoice === choice.id;
            return (
              <button
                key={choice.id}
                onClick={() => {
                  soundManager.playCorrect();
                  setSelectedChoice(choice.id);
                }}
                className={`p-3 sm:p-4 rounded-2xl border-3 text-left transition-all shadow-sm flex flex-col justify-between active:scale-95 cursor-pointer min-h-[56px] ${
                  choice.border
                } ${
                  isSelected
                    ? "ring-4 ring-[#10b981] bg-white scale-[1.03] shadow-md"
                    : "bg-white/80"
                }`}
              >
                <div>
                  <div className="rounded-xl overflow-hidden mb-2.5 shadow-inner">
                    {choice.illustration}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#0b2b24]">
                    {choice.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-0.5">
                    {choice.subtitle}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
                  <span className="text-xs font-black text-[#0f766e]">
                    {isSelected ? "Em đã chọn" : "Bấm để chọn"}
                  </span>
                  {isSelected ? (
                    <CheckCircle2 className="w-6 h-6 text-[#10b981]" />
                  ) : (
                    <Heart className="w-5 h-5 text-gray-300" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Character Feedback */}
        <div className="max-w-3xl mx-auto">
          <BanTiVi
            emotion={selectedChoice ? "excited" : "happy"}
            speechText={currentFeedback}
          />
        </div>

        {/* Golden Conclusion Box */}
        {selectedChoice && (
          <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#ecfdf5] border-3 border-[#10b981] shadow-sm animate-fade-in">
            <div className="flex items-start gap-3">
              <BookmarkCheck className="w-6 h-6 text-[#059669] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase font-black text-[#065f46] tracking-wider block mb-1">
                  Kết luận bài học:
                </span>
                <p className="text-lg sm:text-[22px] font-black text-[#064e3b] leading-relaxed">
                  "Ti vi được dùng rất phổ biến trong gia đình, có nhiều chương trình hấp dẫn và bổ ích."
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
