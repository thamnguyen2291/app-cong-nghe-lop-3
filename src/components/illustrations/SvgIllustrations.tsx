import React from "react";

// Illustration: Bản tin thời sự (News Broadcast)
export const SvgNewsCard: React.FC<{ className?: string }> = ({ className = "w-full h-36" }) => (
  <svg viewBox="0 0 240 160" className={className} aria-label="Bản tin thời sự">
    <rect width="240" height="160" rx="16" fill="#eff6ff" />
    {/* Studio background screen */}
    <rect x="20" y="20" width="200" height="100" rx="10" fill="#1e40af" />
    <path d="M 30 70 Q 120 40 210 70" stroke="#60a5fa" strokeWidth="2" fill="none" opacity="0.6" />
    <circle cx="180" cy="45" r="15" fill="#3b82f6" opacity="0.4" />
    <text x="35" y="45" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
      THỜI SỰ 19:00
    </text>
    {/* News anchor person */}
    <ellipse cx="120" cy="72" rx="16" ry="16" fill="#fde047" />
    <circle cx="114" cy="70" r="2" fill="#1e293b" />
    <circle cx="126" cy="70" r="2" fill="#1e293b" />
    <path d="M 117 76 Q 120 80 123 76" stroke="#1e293b" strokeWidth="1.5" fill="none" />
    <path d="M 96 110 Q 120 88 144 110 Z" fill="#dc2626" />
    {/* News Desk */}
    <rect x="50" y="105" width="140" height="25" rx="5" fill="#0f172a" />
    {/* Microphone */}
    <ellipse cx="120" cy="104" rx="4" ry="6" fill="#94a3b8" />
    <rect x="119" y="108" width="2" height="6" fill="#64748b" />
    {/* Lower third banner */}
    <rect x="30" y="132" width="180" height="18" rx="4" fill="#2563eb" />
    <text x="40" y="145" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
      ● TIN MỚI TRONG NƯỚC VÀ THẾ GIỚI
    </text>
  </svg>
);

// Illustration: Phim hoạt hình (Cartoon Friends)
export const SvgCartoonCard: React.FC<{ className?: string }> = ({ className = "w-full h-36" }) => (
  <svg viewBox="0 0 240 160" className={className} aria-label="Phim hoạt hình">
    <rect width="240" height="160" rx="16" fill="#fff7ed" />
    {/* Sunny outdoor landscape */}
    <circle cx="200" cy="35" r="20" fill="#fde047" />
    <path d="M 0 160 L 0 120 Q 80 90 160 120 Q 200 135 240 115 L 240 160 Z" fill="#86efac" />
    {/* Cute cartoon bunny character */}
    <ellipse cx="80" cy="90" rx="18" ry="22" fill="#ffffff" stroke="#ea580c" strokeWidth="2" />
    {/* Bunny ears */}
    <ellipse cx="73" cy="58" rx="5" ry="16" fill="#ffffff" stroke="#ea580c" strokeWidth="2" />
    <ellipse cx="73" cy="58" rx="2.5" ry="11" fill="#fbcfe8" />
    <ellipse cx="87" cy="58" rx="5" ry="16" fill="#ffffff" stroke="#ea580c" strokeWidth="2" />
    <ellipse cx="87" cy="58" rx="2.5" ry="11" fill="#fbcfe8" />
    {/* Bunny eyes & face */}
    <circle cx="75" cy="85" r="2.5" fill="#0f172a" />
    <circle cx="85" cy="85" r="2.5" fill="#0f172a" />
    <ellipse cx="80" cy="91" rx="2" ry="1.5" fill="#f43f5e" />
    <path d="M 76 94 Q 80 98 84 94" stroke="#0f172a" strokeWidth="1.5" fill="none" />
    <circle cx="70" cy="90" r="3" fill="#fbcfe8" />
    <circle cx="90" cy="90" r="3" fill="#fbcfe8" />

    {/* Cute cartoon bear friend */}
    <ellipse cx="145" cy="96" rx="22" ry="24" fill="#d97706" />
    <circle cx="132" cy="74" r="7" fill="#b45309" />
    <circle cx="158" cy="74" r="7" fill="#b45309" />
    <circle cx="139" cy="92" r="2.5" fill="#0f172a" />
    <circle cx="151" cy="92" r="2.5" fill="#0f172a" />
    <ellipse cx="145" cy="99" rx="8" ry="6" fill="#fde68a" />
    <ellipse cx="145" cy="96" rx="2.5" ry="2" fill="#0f172a" />
    <path d="M 142 101 Q 145 104 148 101" stroke="#0f172a" strokeWidth="1.5" fill="none" />

    {/* Cheerful musical notes and stars */}
    <path d="M 185 60 L 195 55 L 195 70 M 185 60 L 185 75" stroke="#ea580c" strokeWidth="2" fill="none" />
    <circle cx="183" cy="75" r="3" fill="#ea580c" />
    <circle cx="193" cy="70" r="3" fill="#ea580c" />
    <text x="45" y="145" fill="#c2410c" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
      ★ Câu chuyện vui về tình bạn ★
    </text>
  </svg>
);

// Illustration: Khoa học thiếu nhi (Kids Science Discovery)
export const SvgScienceCard: React.FC<{ className?: string }> = ({ className = "w-full h-36" }) => (
  <svg viewBox="0 0 240 160" className={className} aria-label="Khám phá khoa học">
    <rect width="240" height="160" rx="16" fill="#f0fdf4" />
    {/* Space and Nature elements */}
    <rect x="20" y="20" width="200" height="100" rx="10" fill="#064e3b" />
    {/* Stars & Planet */}
    <circle cx="50" cy="50" r="14" fill="#34d399" />
    <ellipse cx="50" cy="50" rx="22" ry="6" stroke="#a7f3d0" strokeWidth="2" fill="none" transform="rotate(-20 50 50)" />
    <circle cx="185" cy="40" r="2" fill="#ffffff" />
    <circle cx="160" cy="65" r="2.5" fill="#ffffff" />
    <circle cx="85" cy="35" r="1.5" fill="#ffffff" />
    {/* Cute rocket */}
    <path d="M 130 40 Q 150 42 155 60 L 135 70 Q 128 50 130 40 Z" fill="#f87171" />
    <circle cx="140" cy="52" r="3.5" fill="#ffffff" />
    <path d="M 135 70 L 128 80 L 134 76 Z" fill="#fbbf24" />
    {/* Magnifying glass observing a sprout */}
    <circle cx="170" cy="90" r="18" fill="#ffffff" stroke="#10b981" strokeWidth="3" opacity="0.9" />
    <line x1="183" y1="103" x2="198" y2="118" stroke="#047857" strokeWidth="5" strokeLinecap="round" />
    <path d="M 170 98 Q 170 85 165 82 Q 175 80 170 98 Z" fill="#22c55e" />
    <text x="35" y="145" fill="#047857" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
      🔬 Khám phá bí ẩn tự nhiên & khoa học
    </text>
  </svg>
);

// Tranh 1 Khám phá: Ông đang xem bản tin thời sự
export const SvgSceneGrandpaNews: React.FC<{ className?: string }> = ({ className = "w-full h-48" }) => (
  <svg viewBox="0 0 320 200" className={className} aria-label="Ông đang xem bản tin thời sự">
    <rect width="320" height="200" rx="16" fill="#f0f9ff" />
    {/* Wall & clock */}
    <circle cx="50" cy="40" r="16" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
    <line x1="50" y1="40" x2="50" y2="30" stroke="#0284c7" strokeWidth="2" />
    <line x1="50" y1="40" x2="58" y2="40" stroke="#0284c7" strokeWidth="2" />
    {/* Living room floor */}
    <rect y="150" width="320" height="50" fill="#e0f2fe" />
    {/* Television set showing News */}
    <rect x="180" y="45" width="115" height="85" rx="8" fill="#1e293b" />
    <rect x="186" y="51" width="103" height="73" rx="4" fill="#1d4ed8" />
    <rect x="190" y="55" width="95" height="16" fill="#1e3a8a" />
    <text x="194" y="67" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
      THỜI SỰ 19:00
    </text>
    {/* News reader on TV screen */}
    <circle cx="237" cy="88" r="11" fill="#fef08a" />
    <rect x="224" y="99" width="26" height="20" rx="3" fill="#dc2626" />
    {/* TV stand table */}
    <rect x="170" y="130" width="135" height="22" rx="4" fill="#94a3b8" />
    <line x1="185" y1="152" x2="185" y2="175" stroke="#64748b" strokeWidth="4" />
    <line x1="290" y1="152" x2="290" y2="175" stroke="#64748b" strokeWidth="4" />

    {/* Grandfather in cozy armchair */}
    {/* Armchair */}
    <rect x="40" y="105" width="75" height="60" rx="10" fill="#0284c7" />
    <rect x="30" y="125" width="18" height="40" rx="6" fill="#0369a1" />
    <rect x="107" y="125" width="18" height="40" rx="6" fill="#0369a1" />
    {/* Grandfather */}
    <ellipse cx="77" cy="92" rx="14" ry="16" fill="#fed7aa" />
    {/* White hair */}
    <path d="M 63 90 Q 77 68 91 90 Q 77 75 63 90 Z" fill="#e2e8f0" />
    {/* Glasses */}
    <circle cx="72" cy="90" r="4" stroke="#334155" strokeWidth="1.5" fill="none" />
    <circle cx="82" cy="90" r="4" stroke="#334155" strokeWidth="1.5" fill="none" />
    <line x1="76" y1="90" x2="78" y2="90" stroke="#334155" strokeWidth="1.5" />
    {/* Shirt */}
    <path d="M 60 110 Q 77 105 94 110 L 92 145 L 62 145 Z" fill="#f8fafc" />
    {/* Caption */}
    <rect x="15" y="172" width="290" height="22" rx="6" fill="#ffffff" stroke="#93c5fd" />
    <text x="25" y="187" fill="#0369a1" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
      Tranh 1: Ông đang chăm chú theo dõi tình hình thời sự
    </text>
  </svg>
);

// Tranh 2 Khám phá: Gia đình đang xem phim ca nhạc giải trí
export const SvgSceneFamilyEntertainment: React.FC<{ className?: string }> = ({
  className = "w-full h-48",
}) => (
  <svg viewBox="0 0 320 200" className={className} aria-label="Gia đình đang xem giải trí">
    <rect width="320" height="200" rx="16" fill="#fffbeb" />
    {/* Living room floor */}
    <rect y="150" width="320" height="50" fill="#fef3c7" />

    {/* Television showing colorful music show */}
    <rect x="190" y="45" width="115" height="85" rx="8" fill="#1e293b" />
    <rect x="196" y="51" width="103" height="73" rx="4" fill="#fb923c" />
    <circle cx="247" cy="80" r="18" fill="#fde047" />
    {/* Smiling cartoon singer on screen */}
    <circle cx="242" cy="77" r="2" fill="#0f172a" />
    <circle cx="252" cy="77" r="2" fill="#0f172a" />
    <path d="M 244 83 Q 247 88 250 83" stroke="#0f172a" strokeWidth="1.5" fill="none" />
    {/* Musical notes on screen */}
    <text x="205" y="70" fill="#ffffff" fontSize="14" fontWeight="bold">
      ♪
    </text>
    <text x="280" y="80" fill="#ffffff" fontSize="16" fontWeight="bold">
      ♫
    </text>
    <rect x="180" y="130" width="135" height="22" rx="4" fill="#d97706" />

    {/* Sofa with parents and child */}
    <rect x="25" y="110" width="135" height="55" rx="10" fill="#ea580c" />
    <rect x="15" y="125" width="18" height="40" rx="6" fill="#c2410c" />
    <rect x="150" y="125" width="18" height="40" rx="6" fill="#c2410c" />

    {/* Dad */}
    <circle cx="50" cy="95" r="12" fill="#fed7aa" />
    <path d="M 38 90 Q 50 80 62 90 Z" fill="#334155" />
    <rect x="38" y="108" width="24" height="35" rx="4" fill="#3b82f6" />

    {/* Child in the middle laughing */}
    <circle cx="90" cy="102" r="10" fill="#fed7aa" />
    <path d="M 80 100 Q 90 90 100 100 Z" fill="#78350f" />
    <path d="M 87 106 Q 90 110 93 106" stroke="#0f172a" strokeWidth="1.5" fill="none" />
    <rect x="80" y="113" width="20" height="30" rx="4" fill="#facc15" />

    {/* Mom */}
    <circle cx="130" cy="95" r="12" fill="#fed7aa" />
    <path d="M 118 95 Q 130 80 142 95 Q 140 115 120 115 Z" fill="#7c2d12" />
    <rect x="120" y="108" width="20" height="35" rx="4" fill="#ec4899" />

    {/* Caption */}
    <rect x="15" y="172" width="290" height="22" rx="6" fill="#ffffff" stroke="#fdba74" />
    <text x="25" y="187" fill="#c2410c" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
      Tranh 2: Cả nhà cùng cười vui khi xem ca nhạc, phim hài
    </text>
  </svg>
);

// Tranh 3 Khám phá: Bạn nhỏ học tiếng Anh qua bài hát trên ti vi
export const SvgSceneChildLearning: React.FC<{ className?: string }> = ({ className = "w-full h-48" }) => (
  <svg viewBox="0 0 320 200" className={className} aria-label="Bạn nhỏ học tiếng Anh">
    <rect width="320" height="200" rx="16" fill="#f0fdf4" />
    {/* Room floor */}
    <rect y="150" width="320" height="50" fill="#dcfce7" />

    {/* Television showing English ABC educational lesson */}
    <rect x="190" y="45" width="115" height="85" rx="8" fill="#1e293b" />
    <rect x="196" y="51" width="103" height="73" rx="4" fill="#16a34a" />
    <text x="210" y="80" fill="#ffffff" fontSize="22" fontWeight="black" fontFamily="sans-serif">
      A B C
    </text>
    <text x="215" y="105" fill="#fef08a" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
      APPLE 🍎
    </text>
    <rect x="180" y="130" width="135" height="22" rx="4" fill="#15803d" />

    {/* Small Study desk and student */}
    <rect x="60" y="130" width="90" height="25" rx="4" fill="#a16207" />
    <line x1="70" y1="155" x2="70" y2="185" stroke="#713f12" strokeWidth="4" />
    <line x1="140" y1="155" x2="140" y2="185" stroke="#713f12" strokeWidth="4" />

    {/* Notebook on desk */}
    <rect x="75" y="125" width="22" height="12" rx="2" fill="#ffffff" stroke="#94a3b8" />
    <line x1="102" y1="125" x2="108" y2="135" stroke="#ef4444" strokeWidth="2" />

    {/* Student sitting on chair */}
    <rect x="35" y="135" width="25" height="40" rx="4" fill="#0284c7" />
    <circle cx="48" cy="105" r="13" fill="#fed7aa" />
    {/* Short hair */}
    <path d="M 35 102 Q 48 90 61 102 Z" fill="#1e293b" />
    {/* Cheerful eyes and smile */}
    <circle cx="45" cy="104" r="1.5" fill="#0f172a" />
    <circle cx="52" cy="104" r="1.5" fill="#0f172a" />
    <path d="M 46 110 Q 48 113 51 110" stroke="#0f172a" strokeWidth="1.5" fill="none" />
    <rect x="38" y="118" width="20" height="32" rx="4" fill="#10b981" />
    {/* Arm pointing forward */}
    <path d="M 55 125 L 75 125" stroke="#10b981" strokeWidth="5" strokeLinecap="round" />

    {/* Caption */}
    <rect x="15" y="172" width="290" height="22" rx="6" fill="#ffffff" stroke="#86efac" />
    <text x="25" y="187" fill="#15803d" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
      Tranh 3: Bạn nhỏ hào hứng học từ mới tiếng Anh cùng ti vi
    </text>
  </svg>
);

// Huy hiệu Mắt Sáng (Golden Badge of Honor)
export const SvgBadgeMatSang: React.FC<{ className?: string }> = ({ className = "w-40 h-40" }) => (
  <svg viewBox="0 0 200 200" className={className} aria-label="Huy hiệu Mắt Sáng">
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
      <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#dc2626" />
        <stop offset="50%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#b91c1c" />
      </linearGradient>
    </defs>

    {/* Red hanging ribbon tails */}
    <path d="M 80 140 L 60 195 L 85 180 L 100 195 L 95 140 Z" fill="url(#ribbonGrad)" />
    <path d="M 120 140 L 140 195 L 115 180 L 100 195 L 105 140 Z" fill="url(#ribbonGrad)" />

    {/* Golden outer sunburst rays */}
    <circle cx="100" cy="95" r="75" fill="#fef9c3" stroke="#facc15" strokeWidth="3" strokeDasharray="6 3" />

    {/* Main golden medallion */}
    <circle cx="100" cy="95" r="66" fill="url(#goldGrad)" stroke="#a16207" strokeWidth="4" />
    <circle cx="100" cy="95" r="56" fill="#0f766e" stroke="#fef08a" strokeWidth="2.5" />

    {/* Cute glowing TV with shining eyes */}
    <rect x="74" y="68" width="52" height="44" rx="8" fill="#f97316" stroke="#fdba74" strokeWidth="2" />
    <rect x="80" y="74" width="40" height="32" rx="5" fill="#ffffff" />
    {/* Sparkling eyes */}
    <circle cx="92" cy="87" r="4" fill="#0f172a" />
    <circle cx="91" cy="85" r="1.5" fill="#ffffff" />
    <circle cx="108" cy="87" r="4" fill="#0f172a" />
    <circle cx="107" cy="85" r="1.5" fill="#ffffff" />
    <path d="M 96 95 Q 100 99 104 95" stroke="#ea580c" strokeWidth="2" fill="none" />

    {/* TV antenna with stars */}
    <line x1="93" y1="68" x2="85" y2="57" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <line x1="107" y1="68" x2="115" y2="57" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="85" cy="57" r="3" fill="#ef4444" />
    <circle cx="115" cy="57" r="3" fill="#3b82f6" />

    {/* 3 stars on bottom curve */}
    <text x="100" y="130" textAnchor="middle" fill="#fde047" fontSize="14" fontWeight="bold">
      ★★★
    </text>

    {/* Badge text banner */}
    <rect x="35" y="136" width="130" height="28" rx="14" fill="#047857" stroke="#34d399" strokeWidth="2" />
    <text x="100" y="155" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="900" fontFamily="sans-serif">
      MẮT SÁNG CHỌN HAY
    </text>
  </svg>
);
