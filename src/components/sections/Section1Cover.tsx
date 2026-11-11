import React from "react";
import { BanTiVi } from "../character/BanTiVi";
import { soundManager } from "../../utils/audio";
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  Clock,
  School,
  PlayCircle,
  Tv,
} from "lucide-react";

interface Section1CoverProps {
  onStart: () => void;
}

export const Section1Cover: React.FC<Section1CoverProps> = ({ onStart }) => {
  const speechText =
    "Chào các em! Hôm nay chúng mình cùng tìm hiểu về chiếc ti vi nhé!";

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-4 sm:py-8 flex flex-col justify-between">
      {/* Top Tag & Hero Title */}
      <div className="text-center my-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/40 text-[#065f46] font-bold text-sm sm:text-base">
          <Sparkles className="w-4 h-4 text-[#059669]" />
          <span>Chương trình Giáo dục phổ thông 2018</span>
        </div>

        <div>
          <span className="text-sm sm:text-base uppercase tracking-widest font-black text-[#0f766e] block mb-1">
            Môn Công nghệ lớp 3 • Bộ sách Kết nối tri thức với cuộc sống
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#072d24] tracking-tight leading-tight">
            Bài 5: Sử dụng máy thu hình
          </h1>
          <p className="text-xl sm:text-2xl font-extrabold text-[#0d9488] mt-1">
            (Tiết 1)
          </p>
        </div>

        {/* Lesson Metadata Card */}
        <div className="bg-white/95 rounded-3xl p-5 sm:p-6 border-2 border-[#a7f3d0] shadow-md max-w-2xl mx-auto text-left space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base font-semibold text-[#134e40]">
            <div className="flex items-start gap-2.5">
              <BookOpen className="w-5 h-5 text-[#0f766e] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase text-gray-500 font-bold block">Chủ đề:</span>
                <span>Công nghệ và đời sống</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-5 h-5 text-[#0f766e] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase text-gray-500 font-bold block">Thời lượng:</span>
                <span>Khoảng 25 phút tự học</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <GraduationCap className="w-5 h-5 text-[#0f766e] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase text-gray-500 font-bold block">Giáo viên:</span>
                <span className="font-bold text-[#064e3b]">Nguyễn Thị Hồng Thắm</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <School className="w-5 h-5 text-[#0f766e] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs uppercase text-gray-500 font-bold block">Đơn vị:</span>
                <span>Trường Tiểu học Huỳnh Thúc Kháng, phường Bình Hưng Hòa</span>
              </div>
            </div>
          </div>
        </div>

        {/* Character Speech Bubble */}
        <div className="max-w-2xl mx-auto">
          <BanTiVi emotion="waving" speechText={speechText} />
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-4 flex justify-center">
        <button
          onClick={() => {
            soundManager.playFanfare();
            onStart();
          }}
          className="flex items-center justify-center gap-3 px-8 sm:px-12 py-4 rounded-3xl min-h-[56px] bg-gradient-to-r from-[#0d9488] to-[#059669] hover:from-[#0f766e] hover:to-[#047857] text-white font-black text-2xl sm:text-3xl shadow-xl hover:shadow-2xl active:scale-95 transition-all border-b-4 border-[#064e3b] cursor-pointer"
        >
          <Tv className="w-8 h-8" />
          <span>Bắt đầu học</span>
          <PlayCircle className="w-8 h-8 ml-1" />
        </button>
      </div>
    </div>
  );
};
