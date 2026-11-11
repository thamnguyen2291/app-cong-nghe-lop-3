export type SectionId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface SectionMeta {
  id: SectionId;
  title: string;
  shortTitle: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: 1, title: "Phần 1: Trang bìa bài giảng", shortTitle: "Trang bìa" },
  { id: 2, title: "Phần 2: Mục tiêu bài học", shortTitle: "Mục tiêu" },
  { id: 3, title: "Phần 3: Khởi động", shortTitle: "Khởi động" },
  { id: 4, title: "Phần 4: Khám phá - Tác dụng của ti vi", shortTitle: "Khám phá" },
  { id: 5, title: "Phần 5: Luyện tập 3 chặng", shortTitle: "Luyện tập" },
  { id: 6, title: "Phần 6: Vận dụng & Góc phụ huynh", shortTitle: "Vận dụng" },
  { id: 7, title: "Phần 7: Tổng kết & Kiểm tra", shortTitle: "Tổng kết" },
];

export type BanTiViEmotion = "happy" | "encouraging" | "thinking" | "excited" | "waving";

export type ProgramCategory = "Tin tức" | "Giải trí" | "Giáo dục";

export interface ProgramCard {
  id: string;
  ten: string;
  mo_ta: string;
  nhom: ProgramCategory;
  giai_thich: string;
}

export type SafetyAnswer = "Xem tiếp" | "Dừng";

export interface SafetyScenario {
  id: string;
  ten: string;
  tinh_huong: string;
  dap_an: SafetyAnswer;
  giai_thich: string;
}

export interface QuizQuestion {
  id: number;
  cau_hoi: string;
  lua_chon: string[];
  dap_an_dung: number; // 0-indexed
  giai_thich: string;
}

export interface ElearningProgress {
  currentSection: SectionId;
  maxUnlockedSection: SectionId;
  practiceStars: number;
  stage1Completed: Record<string, { selected: ProgramCategory; isCorrect: boolean }>;
  stage2Completed: Record<string, { selected: SafetyAnswer; isCorrect: boolean }>;
  pledgeResult: { program: string; reason: string } | null;
  applyAnswers: {
    familyUses: string[];
    chosenHealthyProgram: string;
  };
  quizAnswers: Record<number, number>;
  quizSubmitted: boolean;
}
