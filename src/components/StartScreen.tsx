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
  ShieldAlert,
  Check,
  ArrowLeft,
  Info,
} from "lucide-react";
import { soundManager } from "../utils/audio";

interface StartScreenProps {
  groupCount: number;
  onGroupCountChange: (count: number) => void;
  onStartGame: () => void;
  onOpenTeacherCorner: () => void;
  onBackToModeSelect: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  groupCount,
  onGroupCountChange,
  onStartGame,
  onOpenTeacherCorner,
  onBackToModeSelect,
}) => {
  return (
    <main className="flex-1 w-full max-w-[1366px] mx-auto px-4 py-2 sm:py-4 flex flex-col justify-between">
      {/* Top back button to mode selection */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <button
          onClick={() => {
            soundManager.playClick();
            onBackToModeSelect();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#a7f3d0] text-[#065f46] hover:bg-[#dcfce7] font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-[#059669]" />
          <span>Về trang chọn chế độ</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/15 text-[#065f46] font-bold text-xs sm:text-sm">
          <Sparkles className="w-4 h-4 text-[#059669]" />
          <span>Chế độ học trên lớp • Máy chiếu</span>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <div className="text-center my-auto">
        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-[#072d24] tracking-tight mb-2">
          Hôm nay các em là <span className="text-[#0e7490] underline decoration-[#38bdf8] decoration-wavy">Đội Chọn Kênh</span>!
        </h1>

        <p className="text-base sm:text-xl text-[#164e43] font-bold max-w-4xl mx-auto mb-3 leading-snug">
          Mỗi nhóm thảo luận, giơ thẻ màu và cùng nhau làm chủ chiếc ti vi thông minh!
        </p>

        {/* Reminder: Each group numbers members 1 to 4 */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#fefce8] border-2 border-[#facc15] text-[#854d0e] font-black text-sm sm:text-base mb-4 shadow-sm">
          <Info className="w-5 h-5 text-[#ca8a04] shrink-0" />
          <span>Nhắc nhở: Mỗi nhóm đánh số các bạn từ 1 đến 4. Tất cả các nhóm cùng giơ thẻ, bạn được gọi sẽ lên bấm!</span>
        </div>

        {/* 4 Color Cards Visual Reminder for Class (Blue, Orange, Green, Red) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 max-w-4xl mx-auto mb-4 text-left">
          {/* Card 1: Blue - News */}
          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-[#2563eb] text-white shadow-sm border-2 border-[#1d4ed8]">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-extrabold tracking-wider text-blue-100 block">Thẻ xanh dương</span>
              <span className="text-lg sm:text-xl font-black leading-tight">Tin tức</span>
            </div>
          </div>

          {/* Card 2: Orange - Entertainment */}
          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-[#ea580c] text-white shadow-sm border-2 border-[#c2410c]">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-extrabold tracking-wider text-orange-100 block">Thẻ vàng cam</span>
              <span className="text-lg sm:text-xl font-black leading-tight">Giải trí</span>
            </div>
          </div>

          {/* Card 3: Green - Education / Xem tiếp */}
          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-[#16a34a] text-white shadow-sm border-2 border-[#15803d]">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-extrabold tracking-wider text-green-100 block">Thẻ xanh lá</span>
              <span className="text-lg sm:text-xl font-black leading-tight">Giáo dục (Xem tiếp)</span>
            </div>
          </div>

          {/* Card 4: Red - Stop & Report adult */}
          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-[#dc2626] text-white shadow-sm border-2 border-[#b91c1c]">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-extrabold tracking-wider text-red-100 block">Thẻ đỏ (Chặng 2)</span>
              <span className="text-base sm:text-lg font-black leading-tight">Dừng lại, báo người lớn</span>
            </div>
          </div>
        </div>

        {/* 3 Classroom Missions */}
        <div className="bg-white/95 rounded-3xl p-3.5 sm:p-4 border-2 border-[#a7f3d0] shadow-sm max-w-4xl mx-auto mb-4 text-left">
          <h2 className="text-base sm:text-lg font-black text-[#0f3d32] mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#10b981]" />
            <span>3 nhiệm vụ của Đội Chọn Kênh:</span>
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[#134e40] text-sm sm:text-base font-semibold">
            <li className="flex items-start gap-2 bg-[#f0fdf4] p-2.5 rounded-xl border border-[#bbf7d0]">
              <span className="w-5 h-5 rounded-full bg-[#10b981] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </span>
              <span><strong>1. Phân biệt:</strong> Kênh Tin tức, Giải trí và Giáo dục.</span>
            </li>
            <li className="flex items-start gap-2 bg-[#f0fdf4] p-2.5 rounded-xl border border-[#bbf7d0]">
              <span className="w-5 h-5 rounded-full bg-[#10b981] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </span>
              <span><strong>2. An toàn:</strong> Xem tiếp hay dừng lại báo người lớn.</span>
            </li>
            <li className="flex items-start gap-2 bg-[#f0fdf4] p-2.5 rounded-xl border border-[#bbf7d0]">
              <span className="w-5 h-5 rounded-full bg-[#10b981] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </span>
              <span><strong>3. Tự chủ:</strong> Chọn kênh tối nay bổ ích và cam kết.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Setup & Controls */}
      <div className="bg-white rounded-3xl p-3.5 sm:p-4 border-2 border-[#bbf7d0] shadow-lg max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Select number of groups */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#ccfbf1] text-[#0f766e] flex items-center justify-center font-bold shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <label htmlFor="group-select" className="block text-xs font-bold text-[#115e59]">
              Số nhóm trong lớp:
            </label>
            <div className="flex items-center gap-2 mt-0.5">
              <select
                id="group-select"
                value={groupCount}
                onChange={(e) => {
                  soundManager.playClick();
                  onGroupCountChange(Number(e.target.value));
                }}
                className="bg-[#f0fdfa] border-2 border-[#5eead4] text-[#0f766e] font-black text-lg px-3 py-1 rounded-xl cursor-pointer focus:outline-none"
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
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTeacherCorner();
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#f0fdf4] text-[#166534] border-2 border-[#86efac] hover:bg-[#dcfce7] font-bold text-base transition-colors active:scale-95 shadow-sm cursor-pointer"
          >
            <Settings className="w-5 h-5 text-[#15803d]" />
            <span>Góc cô giáo</span>
          </button>

          <button
            onClick={() => {
              soundManager.playFanfare();
              onStartGame();
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0d9488] to-[#059669] hover:from-[#0f766e] hover:to-[#047857] text-white font-black text-xl sm:text-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 border-b-4 border-[#064e3b] cursor-pointer"
          >
            <Tv className="w-6 h-6" />
            <span>Mở ti vi</span>
            <PlayCircle className="w-6 h-6 ml-1" />
          </button>
        </div>
      </div>
    </main>
  );
};
