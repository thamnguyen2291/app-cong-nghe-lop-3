import React from "react";
import { BanTiVi } from "./character/BanTiVi";
import { soundManager } from "../utils/audio";
import {
  Presentation,
  Home,
  Sparkles,
  ArrowRight,
  School,
  Tv,
} from "lucide-react";

interface ModeSelectScreenProps {
  onSelectClassroom: () => void;
  onSelectHome: () => void;
}

export const ModeSelectScreen: React.FC<ModeSelectScreenProps> = ({
  onSelectClassroom,
  onSelectHome,
}) => {
  const speechText =
    "Chào thầy cô, phụ huynh và các em! Hãy chọn chế độ học tập phù hợp nhé!";

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-4 sm:py-8 flex flex-col justify-between">
      {/* Top Tag & Title */}
      <div className="text-center my-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/40 text-[#065f46] font-bold text-sm sm:text-base">
          <Sparkles className="w-4 h-4 text-[#059669]" />
          <span>Học liệu số Công nghệ 3 • GDPT 2018</span>
        </div>

        <div>
          <h1 className="text-4xl sm:text-6xl font-black text-[#072d24] tracking-tight leading-tight">
            Mắt Sáng Chọn Hay
          </h1>
          <p className="text-xl sm:text-2xl font-extrabold text-[#0d9488] mt-1.5">
            Công nghệ 3 • Bài 5: Sử dụng máy thu hình
          </p>
        </div>

        {/* Character Greeting */}
        <div className="max-w-2xl mx-auto pt-2">
          <BanTiVi emotion="waving" speechText={speechText} />
        </div>

        {/* Two Large Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto pt-2">
          {/* Card 1: Học trên lớp */}
          <button
            onClick={() => {
              soundManager.playFanfare();
              onSelectClassroom();
            }}
            className="group p-6 sm:p-8 rounded-3xl bg-white border-4 border-[#0d9488] hover:border-[#0f766e] shadow-lg hover:shadow-2xl transition-all duration-200 active:scale-98 cursor-pointer flex flex-col justify-between text-left"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-[#ccfbf1] text-[#0f766e] flex items-center justify-center font-black mb-4 group-hover:scale-110 transition-transform shadow-inner">
                <Presentation className="w-9 h-9" />
              </div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#0d9488] block mb-1">
                Dành cho giáo viên & học sinh
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#07241d] leading-snug group-hover:text-[#0f766e] transition-colors">
                Học trên lớp
              </h2>
              <p className="text-base sm:text-lg font-bold text-[#134e40] mt-2 leading-relaxed">
                Cô giáo trình chiếu, cả lớp chơi theo nhóm
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[#0f766e] font-black text-lg">
              <span>Vào lớp học</span>
              <div className="w-10 h-10 rounded-full bg-[#f0fdf4] flex items-center justify-center group-hover:translate-x-1.5 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </button>

          {/* Card 2: Học ở nhà */}
          <button
            onClick={() => {
              soundManager.playFanfare();
              onSelectHome();
            }}
            className="group p-6 sm:p-8 rounded-3xl bg-white border-4 border-[#f97316] hover:border-[#ea580c] shadow-lg hover:shadow-2xl transition-all duration-200 active:scale-98 cursor-pointer flex flex-col justify-between text-left"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-[#ffedd5] text-[#ea580c] flex items-center justify-center font-black mb-4 group-hover:scale-110 transition-transform shadow-inner">
                <Home className="w-9 h-9" />
              </div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#ea580c] block mb-1">
                Dành cho học sinh & phụ huynh
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#07241d] leading-snug group-hover:text-[#ea580c] transition-colors">
                Học ở nhà
              </h2>
              <p className="text-base sm:text-lg font-bold text-[#134e40] mt-2 leading-relaxed">
                Em tự học cùng Bạn Ti Vi (Bài giảng E-learning)
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[#ea580c] font-black text-lg">
              <span>Bắt đầu tự học</span>
              <div className="w-10 h-10 rounded-full bg-[#fff7ed] flex items-center justify-center group-hover:translate-x-1.5 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Footer credits as required */}
      <footer className="pt-6 text-center text-xs sm:text-sm font-bold text-[#134e40]/80">
        <p>
          Giáo viên: Nguyễn Thị Hồng Thắm - Trường Tiểu học Huỳnh Thúc Kháng
        </p>
      </footer>
    </main>
  );
};
