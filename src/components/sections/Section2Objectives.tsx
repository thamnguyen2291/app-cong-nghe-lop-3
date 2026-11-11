import React from "react";
import { BanTiVi } from "../character/BanTiVi";
import { Tv, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

export const Section2Objectives: React.FC = () => {
  const speechText =
    "Sau bài học này, các em sẽ đạt được 3 mục tiêu rất quan trọng này nhé!";

  const objectives = [
    {
      num: 1,
      title: "Tác dụng của ti vi",
      content: "Em biết ti vi dùng để làm gì trong gia đình.",
      icon: <Tv className="w-8 h-8 text-[#0284c7]" />,
      bg: "bg-[#f0f9ff] border-[#bae6fd]",
      numBg: "bg-[#0284c7]",
    },
    {
      num: 2,
      title: "Phân biệt thể loại kênh",
      content: "Em phân biệt được chương trình tin tức, giải trí, giáo dục.",
      icon: <Sparkles className="w-8 h-8 text-[#ea580c]" />,
      bg: "bg-[#fff7ed] border-[#fed7aa]",
      numBg: "bg-[#ea580c]",
    },
    {
      num: 3,
      title: "Chọn an toàn & Bảo vệ bản thân",
      content: "Em biết chọn chương trình phù hợp và giữ an toàn khi xem (năng lực số).",
      icon: <ShieldCheck className="w-8 h-8 text-[#16a34a]" />,
      bg: "bg-[#f0fdf4] border-[#bbf7d0]",
      numBg: "bg-[#16a34a]",
    },
  ];

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-4 sm:py-6 flex flex-col justify-between">
      <div className="space-y-4 my-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/15 text-[#065f46] font-bold text-sm sm:text-base mb-2">
            <span>Phần 2: Yêu cầu cần đạt</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#072d24]">
            Mục Tiêu Bài Học Của Em
          </h2>
          <p className="text-base sm:text-xl font-semibold text-[#164e43] mt-1">
            Cùng xem hôm nay chúng mình sẽ khám phá những điều thú vị nào nhé!
          </p>
        </div>

        {/* 3 Objectives Cards */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {objectives.map((obj) => (
            <div
              key={obj.num}
              className={`p-4 sm:p-5 rounded-2xl border-3 shadow-sm flex items-start gap-4 transition-all ${obj.bg}`}
            >
              <div
                className={`w-12 h-12 rounded-2xl text-white flex items-center justify-center font-black text-xl shrink-0 shadow-sm ${obj.numBg}`}
              >
                {obj.num}
              </div>

              <div className="flex-1">
                <span className="text-xs uppercase font-extrabold tracking-wider text-gray-500 block mb-0.5">
                  Mục tiêu {obj.num}: {obj.title}
                </span>
                <p className="text-xl sm:text-[22px] font-black text-[#0b2b24] leading-snug">
                  {obj.content}
                </p>
              </div>

              <div className="shrink-0 hidden sm:block">{obj.icon}</div>
            </div>
          ))}
        </div>

        {/* Character speech */}
        <div className="max-w-3xl mx-auto pt-2">
          <BanTiVi emotion="happy" speechText={speechText} />
        </div>
      </div>
    </div>
  );
};
