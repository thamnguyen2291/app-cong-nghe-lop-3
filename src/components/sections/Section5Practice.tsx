import React, { useState } from "react";
import { BanTiVi } from "../character/BanTiVi";
import {
  ProgramCard,
  ProgramCategory,
  SafetyScenario,
  SafetyAnswer,
} from "../../types/elearning";
import {
  DEFAULT_STAGE1_CARDS,
  DEFAULT_STAGE2_SCENARIOS,
  STAGE3_CHOICES,
  STAGE3_REASONS,
} from "../../data/defaultCards";
import { soundManager } from "../../utils/audio";
import {
  Newspaper,
  Smile,
  GraduationCap,
  ShieldCheck,
  ShieldAlert,
  Star,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  BookmarkCheck,
  RotateCcw,
  Heart,
  AlertTriangle,
} from "lucide-react";

interface Section5PracticeProps {
  practiceStars: number;
  stage1Completed: Record<string, { selected: ProgramCategory; isCorrect: boolean }>;
  stage2Completed: Record<string, { selected: SafetyAnswer; isCorrect: boolean }>;
  pledgeResult: { program: string; reason: string } | null;
  onUpdateStage1: (cardId: string, selected: ProgramCategory, isCorrect: boolean) => void;
  onUpdateStage2: (scenarioId: string, selected: SafetyAnswer, isCorrect: boolean) => void;
  onUpdatePledge: (program: string, reason: string) => void;
}

export const Section5Practice: React.FC<Section5PracticeProps> = ({
  practiceStars,
  stage1Completed,
  stage2Completed,
  pledgeResult,
  onUpdateStage1,
  onUpdateStage2,
  onUpdatePledge,
}) => {
  // Practice stage: 1 | 2 | 3 | "done"
  const [subStage, setSubStage] = useState<1 | 2 | 3 | "done">(1);
  const [stage1Index, setStage1Index] = useState<number>(0);
  const [stage2Index, setStage2Index] = useState<number>(0);

  // Stage 3 local states
  const [stage3SelectedProgram, setStage3SelectedProgram] = useState<string | null>(
    pledgeResult?.program || null
  );
  const [stage3Warning, setStage3Warning] = useState<string | null>(null);
  const [stage3SelectedReason, setStage3SelectedReason] = useState<string | null>(
    pledgeResult?.reason || null
  );

  const stage1Cards = DEFAULT_STAGE1_CARDS;
  const stage2Scenarios = DEFAULT_STAGE2_SCENARIOS;

  // Current Card / Scenario
  const currentCard = stage1Cards[stage1Index];
  const currentScenario = stage2Scenarios[stage2Index];

  // Stage 1 handle select
  const currentCardAnswer = stage1Completed[currentCard?.id];
  const hasAnsweredCard = Boolean(currentCardAnswer);

  const handleStage1Select = (cat: ProgramCategory) => {
    if (hasAnsweredCard || !currentCard) return;
    const isCorrect = cat === currentCard.nhom;
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
    onUpdateStage1(currentCard.id, cat, isCorrect);
  };

  const handleStage1Next = () => {
    soundManager.playClick();
    if (stage1Index + 1 < stage1Cards.length) {
      setStage1Index((prev) => prev + 1);
    } else {
      soundManager.playFanfare();
      setSubStage(2);
    }
  };

  // Stage 2 handle select
  const currentScenarioAnswer = stage2Completed[currentScenario?.id];
  const hasAnsweredScenario = Boolean(currentScenarioAnswer);

  const handleStage2Select = (ans: SafetyAnswer) => {
    if (hasAnsweredScenario || !currentScenario) return;
    const isCorrect = ans === currentScenario.dap_an;
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
    onUpdateStage2(currentScenario.id, ans, isCorrect);
  };

  const handleStage2Next = () => {
    soundManager.playClick();
    if (stage2Index + 1 < stage2Scenarios.length) {
      setStage2Index((prev) => prev + 1);
    } else {
      soundManager.playFanfare();
      setSubStage(3);
    }
  };

  // Stage 3 handle select
  const handleStage3ChooseProgram = (
    programName: string,
    isValid: boolean,
    warning?: string
  ) => {
    if (!isValid) {
      soundManager.playIncorrect();
      setStage3Warning(
        warning || "Phim đáng sợ chiếu khuya không phù hợp với em và làm em ngủ muộn."
      );
      setStage3SelectedProgram(null);
      return;
    }
    soundManager.playClick();
    setStage3Warning(null);
    setStage3SelectedProgram(programName);
  };

  const handleStage3ChooseReason = (reason: string) => {
    if (!stage3SelectedProgram) return;
    soundManager.playFanfare();
    setStage3SelectedReason(reason);
    onUpdatePledge(stage3SelectedProgram, reason);
  };

  const getSpeechText = () => {
    if (subStage === 1) {
      if (!hasAnsweredCard) {
        return `Kênh "${currentCard.ten}" thuộc nhóm nào vậy em? Hãy bấm chọn nhé!`;
      }
      return currentCardAnswer.isCorrect
        ? `Đúng rồi! ${currentCard.giai_thich}`
        : `Chưa chính xác rồi. Đáp án đúng là nhóm ${currentCard.nhom}. ${currentCard.giai_thich}`;
    }
    if (subStage === 2) {
      if (!hasAnsweredScenario) {
        return `Ở tình huống "${currentScenario.ten}", em nên xem tiếp hay dừng lại báo người lớn?`;
      }
      return currentScenarioAnswer.isCorrect
        ? `Chính xác! ${currentScenario.giai_thich}`
        : `Em nhớ nhé: ${currentScenario.giai_thich}`;
    }
    if (subStage === 3) {
      if (!stage3SelectedProgram) {
        return "Tối nay em tự chọn xem chương trình nào phù hợp với lứa tuổi của mình?";
      }
      if (!stage3SelectedReason) {
        return `Vì sao em chọn "${stage3SelectedProgram}"? Hãy chọn 1 lí do nhé!`;
      }
      return "Tuyệt vời! Em đã hoàn thành lời cam kết xem ti vi an toàn và bổ ích!";
    }
    return "Em đã hoàn thành xuất sắc cả 3 chặng luyện tập rồi đấy!";
  };

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-3 sm:py-6 flex flex-col justify-between">
      <div className="space-y-4 my-auto">
        {/* Practice Header & Substage Tabs */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10b981]/15 text-[#065f46] font-bold text-sm sm:text-base mb-1">
            <span>Phần 5: Luyện tập</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-3xl mx-auto mt-1">
            <h2 className="text-2xl sm:text-3xl font-black text-[#072d24]">
              Luyện Tập 3 Chặng Tự Học
            </h2>

            {/* Stars counter badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#fef08a] border-2 border-[#eab308] text-[#854d0e] px-4 py-1.5 rounded-2xl font-black text-lg shadow-sm">
              <Star className="w-5 h-5 fill-[#eab308] text-[#ca8a04]" />
              <span>{practiceStars}/10</span>
              <span className="text-xs uppercase font-extrabold text-[#a16207]">
                Ngôi sao
              </span>
            </div>
          </div>
        </div>

        {/* 3 Substage Nav Tabs */}
        <div className="flex items-center justify-center gap-2 max-w-xl mx-auto">
          <button
            onClick={() => {
              soundManager.playClick();
              setSubStage(1);
            }}
            className={`flex-1 py-2 px-2.5 rounded-xl font-black text-xs sm:text-sm border-2 transition-all cursor-pointer ${
              subStage === 1
                ? "bg-[#0f766e] text-white border-[#0f766e] shadow-md"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            1. Xếp chương trình
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setSubStage(2);
            }}
            className={`flex-1 py-2 px-2.5 rounded-xl font-black text-xs sm:text-sm border-2 transition-all cursor-pointer ${
              subStage === 2
                ? "bg-[#0f766e] text-white border-[#0f766e] shadow-md"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            2. Xem hay dừng
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setSubStage(3);
            }}
            className={`flex-1 py-2 px-2.5 rounded-xl font-black text-xs sm:text-sm border-2 transition-all cursor-pointer ${
              subStage === 3
                ? "bg-[#0f766e] text-white border-[#0f766e] shadow-md"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            3. Tối nay em chọn
          </button>
        </div>

        {/* ================= CHẶNG 1 ================= */}
        {subStage === 1 && currentCard && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-[#a7f3d0] shadow-md max-w-3xl mx-auto space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs sm:text-sm uppercase font-black text-[#0f766e]">
                Chặng 1: Thẻ {stage1Index + 1}/{stage1Cards.length}
              </span>
              <span className="text-xs font-bold text-gray-500">
                Chỉ tính lần chọn đầu
              </span>
            </div>

            {/* Television Frame */}
            <div className="bg-[#0f2e26] rounded-2xl p-4 sm:p-6 text-white border-3 border-[#071f19] shadow-inner">
              <span className="text-xs uppercase font-extrabold text-[#5eead4] block mb-1">
                Tên chương trình truyền hình:
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#f0fdf4] mb-3 leading-snug">
                {currentCard.ten}
              </h3>
              <div className="bg-[#f0fdf4] text-[#0b2b24] p-3 sm:p-4 rounded-xl border-l-4 border-[#10b981]">
                <span className="text-xs uppercase font-extrabold text-[#059669] block mb-0.5">
                  Nội dung tóm tắt:
                </span>
                <p className="text-lg sm:text-[22px] font-semibold leading-relaxed">
                  {currentCard.mo_ta}
                </p>
              </div>
            </div>

            {/* 3 Large Answer Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["Tin tức", "Giải trí", "Giáo dục"] as ProgramCategory[]).map(
                (cat) => {
                  const isSelected = currentCardAnswer?.selected === cat;
                  const isTargetCorrect =
                    hasAnsweredCard && currentCard.nhom === cat;

                  const bg =
                    cat === "Tin tức"
                      ? "bg-[#2563eb] hover:bg-[#1d4ed8] border-[#1e40af]"
                      : cat === "Giải trí"
                      ? "bg-[#ea580c] hover:bg-[#c2410c] border-[#9a3412]"
                      : "bg-[#16a34a] hover:bg-[#15803d] border-[#166534]";

                  const icon =
                    cat === "Tin tức" ? (
                      <Newspaper className="w-6 h-6 stroke-[2.5]" />
                    ) : cat === "Giải trí" ? (
                      <Smile className="w-6 h-6 stroke-[2.5]" />
                    ) : (
                      <GraduationCap className="w-6 h-6 stroke-[2.5]" />
                    );

                  return (
                    <button
                      key={cat}
                      disabled={hasAnsweredCard}
                      onClick={() => handleStage1Select(cat)}
                      className={`py-3.5 px-4 rounded-2xl font-black text-xl sm:text-[22px] min-h-[56px] text-white shadow-sm flex items-center justify-between border-3 active:scale-95 transition-all cursor-pointer disabled:cursor-default ${bg} ${
                        isSelected ? "ring-4 ring-yellow-400 scale-[1.02]" : ""
                      } ${
                        hasAnsweredCard && !isSelected && !isTargetCorrect
                          ? "opacity-40"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {icon}
                        <span>{cat}</span>
                      </div>
                      {hasAnsweredCard && isTargetCorrect && (
                        <CheckCircle2 className="w-6 h-6 text-yellow-300 stroke-[3]" />
                      )}
                      {hasAnsweredCard && isSelected && !isTargetCorrect && (
                        <XCircle className="w-6 h-6 text-white stroke-[3]" />
                      )}
                    </button>
                  );
                }
              )}
            </div>

            {/* Feedback & Next Button */}
            {hasAnsweredCard && (
              <div
                className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-3 ${
                  currentCardAnswer.isCorrect
                    ? "bg-[#ecfdf5] border-[#34d399] text-[#065f46]"
                    : "bg-[#fff7ed] border-[#fb923c] text-[#9a3412]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 font-black text-lg">
                    {currentCardAnswer.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-[#059669]" />
                        <span>Chính xác! Được 1 sao ⭐</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6 text-[#ea580c]" />
                        <span>Đáp án đúng là: {currentCard.nhom}</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-semibold mt-1">
                    {currentCard.giai_thich}
                  </p>
                </div>

                <button
                  onClick={handleStage1Next}
                  className="px-5 py-3 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-black text-base flex items-center gap-2 active:scale-95 transition-all cursor-pointer shadow-md shrink-0"
                >
                  <span>
                    {stage1Index + 1 < stage1Cards.length
                      ? "Kênh tiếp theo"
                      : "Sang Chặng 2"}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= CHẶNG 2 ================= */}
        {subStage === 2 && currentScenario && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-[#a7f3d0] shadow-md max-w-3xl mx-auto space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs sm:text-sm uppercase font-black text-[#0f766e]">
                Chặng 2: Tình huống {stage2Index + 1}/{stage2Scenarios.length}
              </span>
              <span className="text-xs font-bold text-gray-500">
                Năng lực số 1.1.CB1a
              </span>
            </div>

            {/* Situation Card */}
            <div className="bg-[#fefce8] rounded-2xl p-4 sm:p-6 border-3 border-[#eab308] text-[#713f12]">
              <span className="text-xs uppercase font-extrabold text-[#a16207] block mb-1">
                Tình huống thực tế:
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#07241d] mb-2 leading-snug">
                {currentScenario.ten}
              </h3>
              <p className="text-lg sm:text-[22px] font-semibold leading-relaxed">
                "{currentScenario.tinh_huong}"
              </p>
            </div>

            {/* 2 Big Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Xem tiếp */}
              <button
                disabled={hasAnsweredScenario}
                onClick={() => handleStage2Select("Xem tiếp")}
                className={`py-4 px-5 rounded-2xl font-black text-xl sm:text-[24px] min-h-[56px] text-white shadow-sm flex items-center justify-between border-3 active:scale-95 transition-all cursor-pointer disabled:cursor-default bg-[#16a34a] hover:bg-[#15803d] border-[#166534] ${
                  currentScenarioAnswer?.selected === "Xem tiếp"
                    ? "ring-4 ring-yellow-400 scale-[1.02]"
                    : ""
                } ${
                  hasAnsweredScenario && currentScenario.dap_an === "Xem tiếp"
                    ? "ring-4 ring-green-300"
                    : ""
                } ${
                  hasAnsweredScenario &&
                  currentScenarioAnswer?.selected !== "Xem tiếp" &&
                  currentScenario.dap_an !== "Xem tiếp"
                    ? "opacity-40"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
                  <span>Xem tiếp</span>
                </div>
                {hasAnsweredScenario && currentScenario.dap_an === "Xem tiếp" && (
                  <CheckCircle2 className="w-7 h-7 text-yellow-300 stroke-[3]" />
                )}
              </button>

              {/* Dừng lại, báo người lớn */}
              <button
                disabled={hasAnsweredScenario}
                onClick={() => handleStage2Select("Dừng")}
                className={`py-4 px-5 rounded-2xl font-black text-xl sm:text-[22px] min-h-[56px] text-white shadow-sm flex items-center justify-between border-3 active:scale-95 transition-all cursor-pointer disabled:cursor-default bg-[#dc2626] hover:bg-[#b91c1c] border-[#991b1b] ${
                  currentScenarioAnswer?.selected === "Dừng"
                    ? "ring-4 ring-yellow-400 scale-[1.02]"
                    : ""
                } ${
                  hasAnsweredScenario && currentScenario.dap_an === "Dừng"
                    ? "ring-4 ring-green-300"
                    : ""
                } ${
                  hasAnsweredScenario &&
                  currentScenarioAnswer?.selected !== "Dừng" &&
                  currentScenario.dap_an !== "Dừng"
                    ? "opacity-40"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-8 h-8 stroke-[2.5]" />
                  <span className="text-left leading-tight">Dừng lại, báo người lớn</span>
                </div>
                {hasAnsweredScenario && currentScenario.dap_an === "Dừng" && (
                  <CheckCircle2 className="w-7 h-7 text-yellow-300 stroke-[3]" />
                )}
              </button>
            </div>

            {/* Feedback & Next */}
            {hasAnsweredScenario && (
              <div
                className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-3 ${
                  currentScenarioAnswer.isCorrect
                    ? "bg-[#ecfdf5] border-[#34d399] text-[#065f46]"
                    : "bg-[#fff7ed] border-[#fb923c] text-[#9a3412]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 font-black text-lg">
                    {currentScenarioAnswer.isCorrect ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-[#059669]" />
                        <span>Chính xác! Được 1 sao ⭐</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6 text-[#ea580c]" />
                        <span>
                          Cách xử lý đúng là:{" "}
                          {currentScenario.dap_an === "Dừng"
                            ? "Dừng lại, báo người lớn"
                            : "Xem tiếp"}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-semibold mt-1">
                    {currentScenario.giai_thich}
                  </p>
                </div>

                <button
                  onClick={handleStage2Next}
                  className="px-5 py-3 rounded-xl bg-[#0f766e] hover:bg-[#115e59] text-white font-black text-base flex items-center gap-2 active:scale-95 transition-all cursor-pointer shadow-md shrink-0"
                >
                  <span>
                    {stage2Index + 1 < stage2Scenarios.length
                      ? "Tình huống tiếp theo"
                      : "Sang Chặng 3"}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= CHẶNG 3 ================= */}
        {subStage === 3 && (
          <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-[#a7f3d0] shadow-md max-w-3xl mx-auto space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="text-xs sm:text-sm uppercase font-black text-[#0f766e]">
                Chặng 3: Tự chủ chọn kênh an toàn
              </span>
              {stage3SelectedProgram && !stage3SelectedReason && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setStage3SelectedProgram(null);
                    setStage3SelectedReason(null);
                  }}
                  className="text-xs font-bold text-gray-500 hover:text-gray-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Chọn lại</span>
                </button>
              )}
            </div>

            {/* Warning Message if scary movie chosen */}
            {stage3Warning && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-800 font-bold flex items-center gap-2.5 animate-bounce">
                <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
                <p className="text-sm sm:text-base">{stage3Warning}</p>
              </div>
            )}

            {/* Step 1: Pick Program */}
            {!stage3SelectedProgram && (
              <div className="space-y-3">
                <h3 className="text-xl sm:text-[24px] font-black text-[#07241d] text-center">
                  Tối nay em chọn xem gì?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STAGE3_CHOICES.map((choice) => (
                    <button
                      key={choice.id}
                      onClick={() =>
                        handleStage3ChooseProgram(
                          choice.ten,
                          choice.hop_le,
                          choice.canh_bao
                        )
                      }
                      className={`p-4 rounded-2xl font-black text-lg sm:text-[22px] min-h-[56px] text-left border-3 transition-all active:scale-95 cursor-pointer flex items-center justify-between shadow-sm ${
                        choice.hop_le
                          ? "bg-[#f0fdf4] text-[#065f46] border-[#86efac] hover:bg-[#dcfce7]"
                          : "bg-[#fff1f2] text-[#9f1239] border-[#fda4af] hover:bg-[#ffe4e6]"
                      }`}
                    >
                      <span>{choice.ten}</span>
                      <ArrowRight className="w-5 h-5 text-gray-400 shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Pick Reason */}
            {stage3SelectedProgram && !stage3SelectedReason && (
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-xs uppercase font-extrabold text-[#0f766e]">
                    Em đã chọn:
                  </span>
                  <h4 className="text-2xl font-black text-[#064e3b]">
                    "{stage3SelectedProgram}"
                  </h4>
                  <p className="text-lg sm:text-[22px] font-bold text-[#115e59] mt-2">
                    Vì sao em chọn chương trình này?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {STAGE3_REASONS.map((reason, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleStage3ChooseReason(reason)}
                      className="p-4 rounded-2xl bg-[#f0fdfa] text-[#115e59] border-3 border-[#5eead4] hover:bg-[#ccfbf1] font-black text-base sm:text-lg min-h-[56px] flex flex-col items-center justify-center text-center active:scale-95 transition-all cursor-pointer shadow-sm"
                    >
                      <Heart className="w-6 h-6 text-[#0d9488] mb-1.5 fill-[#99f6e4]" />
                      <span>Vì chương trình {reason}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Complete Pledge Display */}
            {stage3SelectedProgram && stage3SelectedReason && (
              <div className="space-y-4 py-2">
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/20 text-[#065f46] font-extrabold text-sm mb-2">
                    <BookmarkCheck className="w-4 h-4 text-[#059669]" />
                    <span>Lời cam kết thông minh của em tối nay:</span>
                  </span>

                  <div className="bg-[#ecfdf5] border-3 border-[#34d399] rounded-3xl p-5 sm:p-6 text-[#064e3b] shadow-md my-2">
                    <p className="text-xl sm:text-[24px] font-black leading-relaxed">
                      "Tối nay em chọn xem{" "}
                      <span className="text-[#0284c7] underline decoration-[#38bdf8]">
                        {stage3SelectedProgram}
                      </span>{" "}
                      vì chương trình{" "}
                      <span className="text-[#ea580c] underline decoration-[#fdba74]">
                        {stage3SelectedReason}
                      </span>
                      . Em xem cùng người lớn và tắt khi thấy nội dung lạ."
                    </p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setStage3SelectedProgram(null);
                      setStage3SelectedReason(null);
                    }}
                    className="text-sm font-bold text-[#0f766e] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Em muốn đổi lại lời hứa khác</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Character Guidance */}
        <div className="max-w-3xl mx-auto">
          <BanTiVi emotion="happy" speechText={getSpeechText()} />
        </div>
      </div>
    </div>
  );
};
