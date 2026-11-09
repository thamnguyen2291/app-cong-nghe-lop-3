import React from "react";
import {
  Tv,
  Users,
  Settings,
  Sparkles,
  Newspaper,
  Smile,
  GraduationCap,
  PlayCircle,
  ShieldCheck,
  Check,
} from "lucide-react";
import { soundManager } from "../utils/audio";

interface StartScreenProps {
  groupCount: number;
  onGroupCountChange: (count: number) => void;
  onStartGame: () => void;
  onOpenTeacherCorner: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  groupCount,
  onGroupCountChange,
  onStartGame,
  onOpenTeacherCorner,
}) => {
  return (
    <main className="flex-1 w-full max-w-[1366px] mx-auto px-4 py-3 sm:py-6 flex flex-col justify-between">
      {/* Hero Welcome Banner */}
      <div className="text-center my-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1fc794]/20 border border-[#1fc794]/40 text-[#094738] font-bold text-base sm:text-lg mb-2">
          <Sparkles className="w-5 h-5 text-[#0d9472]" />
          <span>Bài học: Sử dụng máy thu hình (Công nghệ 3)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#072d24] tracking-tight mb-3">
          Hôm nay các em là <span className="text-[#0e7490] underline decoration-[#38bdf8] decoration-wavy">Đội Chọn Kênh</span>!
        </h1>

        <p className="text-lg sm:text-2xl text-[#164e43] font-semibold max-w-4xl mx-auto mb-5 leading-snug">
          Mỗi nhóm thảo luận, giơ thẻ màu và cùng nhau làm chủ chiếc ti vi thông minh!
        </p>

        {/* 3 Color Cards Visual Reminder for Class */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto mb-6">
          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-[#2563eb] text-white shadow-md border-2 border-[#1d4ed8]">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Newspaper className="w-7 h-7" />
            </div>
            <div className="text-left">
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-100 block">Thẻ xanh dương</span>
              <span className="text-xl sm:text-2xl font-black leading-tight">Tin tức</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-[#ea580c] text-white shadow-md border-2 border-[#c2410c]">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Smile className="w-7 h-7" />
            </div>
            <div className="text-left">
              <span className="text-xs uppercase font-extrabold tracking-wider text-orange-100 block">Thẻ vàng cam</span>
              <span className="text-xl sm:text-2xl font-black leading-tight">Giải trí</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-[#16a34a] text-white shadow-md border-2 border-[#15803d]">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div className="text-left">
              <span className="text-xs uppercase font-extrabold tracking-wider text-green-100 block">Thẻ xanh lá</span>
              <span className="text-xl sm:text-2xl font-black leading-tight">Giáo dục</span>
            </div>
          </div>
        </div>

        {/* 3 Classroom Missions */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 sm:p-5 border-2 border-[#a7f3d0] shadow-sm max-w-3xl mx-auto mb-6 text-left">
          <h2 className="text-lg sm:text-xl font-black text-[#0f3d32] mb-3 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#10b981]" />
            <span>3 nhiệm vụ của Đội Chọn Kênh:</span>
          </h2>
          <ul className="space-y-2 text-[#134e40] text-base sm:text-lg font-medium">
            <li className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#10b981] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </span>
              <span><strong>Nhiệm vụ 1:</strong> Phân biệt chính xác kênh Tin tức, Giải trí và Giáo dục.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#10b981] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </span>
              <span><strong>Nhiệm vụ 2:</strong> Xử lý nhanh tình huống: khi nào xem tiếp, khi nào dừng lại báo người lớn.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#10b981] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                <Check className="w-4 h-4" />
              </span>
              <span><strong>Nhiệm vụ 3:</strong> Chọn chương trình tối nay bổ ích và cam kết xem an toàn.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Setup & Controls */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-[#bbf7d0] shadow-lg max-w-3xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Select number of groups */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#ccfbf1] text-[#0f766e] flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <label htmlFor="group-select" className="block text-sm font-bold text-[#115e59]">
              Số nhóm trong lớp:
            </label>
            <div className="flex items-center gap-2 mt-1">
              <select
                id="group-select"
                value={groupCount}
                onChange={(e) => {
                  soundManager.playClick();
                  onGroupCountChange(Number(e.target.value));
                }}
                className="bg-[#f0fdfa] border-2 border-[#5eead4] text-[#0f766e] font-black text-xl px-3 py-1 rounded-xl cursor-pointer focus:outline-none"
              >
                {[4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} nhóm
                  </option>
                ))}
              </select>
              <span className="text-xs text-[#0f766e] font-semibold">(Mặc định 8 nhóm)</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTeacherCorner();
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#f0fdf4] text-[#166534] border-2 border-[#86efac] hover:bg-[#dcfce7] font-bold text-base transition-colors active:scale-95 shadow-sm"
          >
            <Settings className="w-5 h-5 text-[#15803d]" />
            <span>Góc cô giáo</span>
          </button>

          <button
            onClick={() => {
              soundManager.playFanfare();
              onStartGame();
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#0d9488] to-[#059669] hover:from-[#0f766e] hover:to-[#047857] text-white font-black text-xl sm:text-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 border-b-4 border-[#064e3b]"
          >
            <Tv className="w-7 h-7" />
            <span>Mở ti vi</span>
            <PlayCircle className="w-6 h-6 ml-1" />
          </button>
        </div>
      </div>
    </main>
  );
};
