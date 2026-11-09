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

export interface ChoiceOption {
  id: string;
  ten: string;
  hop_le: boolean;
  canh_bao?: string;
}

export interface GeminiCardSuggestion {
  nhom: ProgramCategory;
  mo_ta: string;
  giai_thich: string;
  phu_hop_lop_3: "Phù hợp" | "Cần cô xem trước" | "Không phù hợp";
  luu_y: string;
}

export type AppStage = "start" | "stage1" | "stage2" | "stage3" | "summary";
