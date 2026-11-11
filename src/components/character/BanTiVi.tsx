import React, { useEffect, useState } from "react";
import { BanTiViEmotion } from "../../types/elearning";
import { speechManager } from "../../utils/speech";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

interface BanTiViProps {
  emotion?: BanTiViEmotion;
  speechText: string;
  className?: string;
  compact?: boolean;
}

export const BanTiVi: React.FC<BanTiViProps> = ({
  emotion = "happy",
  speechText,
  className = "",
  compact = false,
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(speechManager.isSpeaking);
  const [hasVoice, setHasVoice] = useState<boolean>(speechManager.hasVoice);

  useEffect(() => {
    const unsubscribe = speechManager.subscribe(() => {
      setIsSpeaking(speechManager.isSpeaking);
      setHasVoice(speechManager.hasVoice);
    });
    return () => unsubscribe();
  }, []);

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      speechManager.stop();
    } else {
      speechManager.speak(speechText);
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 ${className}`}
      role="region"
      aria-label="Bạn Ti Vi dẫn dắt bài học"
    >
      {/* SVG Cartoon Character "Bạn Ti Vi" */}
      <div className="relative shrink-0 flex flex-col items-center">
        <svg
          viewBox="0 0 160 170"
          className={compact ? "w-20 h-22 sm:w-24 sm:h-26" : "w-24 h-26 sm:w-32 sm:h-34"}
          aria-hidden="true"
        >
          {/* Dual Antennas */}
          {/* Left antenna with red tip */}
          <line
            x1="70"
            y1="40"
            x2="45"
            y2="15"
            stroke="#475569"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="45" cy="15" r="7" fill="#ef4444" />
          <circle cx="43" cy="13" r="2.5" fill="#fca5a5" />

          {/* Right antenna with blue tip */}
          <line
            x1="90"
            y1="40"
            x2="115"
            y2="15"
            stroke="#475569"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="115" cy="15" r="7" fill="#3b82f6" />
          <circle cx="113" cy="13" r="2.5" fill="#93c5fd" />

          {/* Antenna mount */}
          <ellipse cx="80" cy="40" rx="14" ry="4" fill="#d97706" />

          {/* Feet */}
          <line x1="60" y1="135" x2="52" y2="158" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="50" cy="160" rx="9" ry="5" fill="#b45309" />

          <line x1="100" y1="135" x2="108" y2="158" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="110" cy="160" rx="9" ry="5" fill="#b45309" />

          {/* Hands */}
          {emotion === "waving" || emotion === "excited" ? (
            <>
              {/* Waving left hand */}
              <path
                d="M 32 85 Q 15 65 18 50"
                stroke="#78350f"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="18" cy="50" r="5" fill="#f59e0b" />
              {/* Right hand */}
              <path
                d="M 128 85 Q 145 90 148 105"
                stroke="#78350f"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="148" cy="105" r="5" fill="#f59e0b" />
            </>
          ) : emotion === "thinking" ? (
            <>
              {/* Thinking hand to chin */}
              <path
                d="M 32 85 Q 18 95 24 110"
                stroke="#78350f"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="24" cy="110" r="5" fill="#f59e0b" />
              <path
                d="M 128 85 Q 120 115 95 118"
                stroke="#78350f"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="95" cy="118" r="5" fill="#f59e0b" />
            </>
          ) : (
            <>
              {/* Relaxed cheerful hands */}
              <path
                d="M 32 85 Q 15 95 18 108"
                stroke="#78350f"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="18" cy="108" r="5" fill="#f59e0b" />
              <path
                d="M 128 85 Q 145 95 142 108"
                stroke="#78350f"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="142" cy="108" r="5" fill="#f59e0b" />
            </>
          )}

          {/* TV Outer Body (Warm Orange) */}
          <rect
            x="30"
            y="38"
            width="100"
            height="98"
            rx="20"
            fill="#f97316"
            stroke="#c2410c"
            strokeWidth="4"
          />

          {/* Inner TV Screen (Cream/Warm Light) */}
          <rect
            x="40"
            y="48"
            width="80"
            height="76"
            rx="14"
            fill="#fefce8"
            stroke="#fdba74"
            strokeWidth="3"
          />

          {/* Screen Light Reflection */}
          <path
            d="M 45 54 L 62 54 L 52 82 L 45 82 Z"
            fill="#ffffff"
            opacity="0.55"
          />

          {/* Cheerful Round Eyes */}
          {emotion === "excited" ? (
            <>
              {/* Crescent cheerful curved eyes */}
              <path
                d="M 56 74 Q 63 64 70 74"
                stroke="#1e293b"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 90 74 Q 97 64 104 74"
                stroke="#1e293b"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              {/* Big round cartoon eyes */}
              <circle cx="63" cy="74" r="8" fill="#1e293b" />
              <circle cx="61" cy="71" r="3" fill="#ffffff" />
              <circle cx="65" cy="75" r="1.5" fill="#ffffff" />

              <circle cx="97" cy="74" r="8" fill="#1e293b" />
              <circle cx="95" cy="71" r="3" fill="#ffffff" />
              <circle cx="99" cy="75" r="1.5" fill="#ffffff" />
            </>
          )}

          {/* Rosy Cheeks */}
          <ellipse cx="53" cy="84" rx="6" ry="3.5" fill="#fb7185" opacity="0.8" />
          <ellipse cx="107" cy="84" rx="6" ry="3.5" fill="#fb7185" opacity="0.8" />

          {/* Mouth depending on emotion */}
          {emotion === "encouraging" ? (
            // Gentle caring smile
            <path
              d="M 72 87 Q 80 97 88 87"
              stroke="#0f172a"
              strokeWidth="3"
              strokeLinecap="round"
              fill="#f43f5e"
            />
          ) : emotion === "thinking" ? (
            // Small thoughtful mouth
            <circle cx="80" cy="89" r="4" fill="#0f172a" />
          ) : (
            // Big open happy smile
            <path
              d="M 68 85 Q 80 102 92 85 Z"
              fill="#e11d48"
              stroke="#0f172a"
              strokeWidth="2.5"
            />
          )}

          {/* Tiny cute speaker dots on side */}
          <circle cx="118" cy="115" r="1.5" fill="#ea580c" />
          <circle cx="122" cy="115" r="1.5" fill="#ea580c" />
        </svg>

        <span className="text-xs font-black text-[#c2410c] uppercase tracking-wider mt-0.5">
          Bạn Ti Vi
        </span>
      </div>

      {/* Speech Bubble */}
      <div className="relative flex-1 bg-white border-3 border-[#fdba74] shadow-md rounded-2xl p-4 sm:p-5 text-[#0b2b24]">
        {/* Triangle pointer for bubble */}
        <div className="hidden sm:block absolute top-6 -left-3.5 w-0 h-0 border-y-8 border-y-transparent border-r-[14px] border-r-[#fdba74]" />
        <div className="hidden sm:block absolute top-6 -left-2.5 w-0 h-0 border-y-8 border-y-transparent border-r-[14px] border-r-white" />

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex items-start gap-2">
            <Sparkles className="w-5 h-5 text-[#f59e0b] shrink-0 mt-1" />
            <p className="text-lg sm:text-[22px] font-bold leading-relaxed text-[#092b22]">
              {speechText}
            </p>
          </div>

          {/* Listen Button (Web Speech API) */}
          {hasVoice && (
            <button
              onClick={handleToggleSpeak}
              className={`shrink-0 self-end sm:self-start flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-sm sm:text-base border-2 transition-all active:scale-95 cursor-pointer shadow-sm ${
                isSpeaking
                  ? "bg-rose-50 border-rose-300 text-rose-700 animate-pulse"
                  : "bg-[#fefce8] border-[#fde047] text-[#854d0e] hover:bg-[#fef08a]"
              }`}
              title={isSpeaking ? "Dừng giọng đọc" : "Nghe giọng đọc của Bạn Ti Vi"}
              aria-label={isSpeaking ? "Dừng đọc" : "Nghe lời giảng"}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-5 h-5 text-rose-600" />
                  <span>Dừng nghe</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5 text-[#ca8a04]" />
                  <span>Nghe lời giảng</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
