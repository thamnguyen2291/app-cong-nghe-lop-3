import { ProgramCard, SafetyScenario, ChoiceOption } from "../types";

export const DEFAULT_STAGE1_CARDS: ProgramCard[] = [
  {
    id: "s1-1",
    ten: "Bản tin thời sự buổi tối",
    mo_ta: "Cho biết những việc mới xảy ra trong nước và trên thế giới.",
    nhom: "Tin tức",
    giai_thich: "Bản tin cho em biết những việc mới xảy ra.",
  },
  {
    id: "s1-2",
    ten: "Phim hoạt hình về tình bạn",
    mo_ta: "Câu chuyện vui về những người bạn nhỏ biết giúp đỡ nhau.",
    nhom: "Giải trí",
    giai_thich: "Phim hoạt hình giúp em thư giãn, vui vẻ.",
  },
  {
    id: "s1-3",
    ten: "Em học tiếng Anh qua bài hát",
    mo_ta: "Mỗi bài hát dạy em một số từ tiếng Anh mới.",
    nhom: "Giáo dục",
    giai_thich: "Mục đích chính của chương trình là giúp em học.",
  },
  {
    id: "s1-4",
    ten: "Dự báo thời tiết",
    mo_ta: "Cho biết ngày mai trời nắng hay mưa, nóng hay lạnh.",
    nhom: "Tin tức",
    giai_thich: "Chương trình cung cấp thông tin mới về thời tiết.",
  },
  {
    id: "s1-5",
    ten: "Khám phá thế giới loài vật",
    mo_ta: "Giới thiệu nơi sống và thói quen của các con vật.",
    nhom: "Giáo dục",
    giai_thich: "Chương trình giúp em có thêm hiểu biết.",
  },
  {
    id: "s1-6",
    ten: "Ca nhạc thiếu nhi",
    mo_ta: "Các bạn nhỏ hát và múa những bài vui tươi.",
    nhom: "Giải trí",
    giai_thich: "Ca nhạc giúp em vui vẻ, thư giãn.",
  },
];

export const DEFAULT_STAGE2_SCENARIOS: SafetyScenario[] = [
  {
    id: "s2-1",
    ten: "Video tự chuyển cảnh",
    tinh_huong: "Em đang xem thì video tự chuyển sang cảnh đánh nhau làm em thấy sợ.",
    dap_an: "Dừng",
    giai_thich: "Nội dung này không phù hợp với em. Em dừng xem và kể với người lớn.",
  },
  {
    id: "s2-2",
    ten: "Danh sách của cô giáo",
    tinh_huong: "Cô giáo gửi danh sách video dạy gấp con hạc giấy trên YouTube Kids.",
    dap_an: "Xem tiếp",
    giai_thich: "Nguồn do cô giáo chọn, nội dung phù hợp và bổ ích.",
  },
  {
    id: "s2-3",
    ten: "Bảng nhận quà",
    tinh_huong: "Một bảng hiện ra: \"Bấm vào đây nhận quà, ghi tên và địa chỉ nhà em!\"",
    dap_an: "Dừng",
    giai_thich: "Em không bấm, không cho biết tên và địa chỉ. Em báo ngay cho người lớn.",
  },
  {
    id: "s2-4",
    ten: "Xem cùng mẹ",
    tinh_huong: "Mẹ cùng em xem chương trình khám phá khoa học dành cho thiếu nhi.",
    dap_an: "Xem tiếp",
    giai_thich: "Chương trình đúng lứa tuổi, bổ ích và có người lớn xem cùng.",
  },
];

export const STAGE3_CHOICES: ChoiceOption[] = [
  {
    id: "s3-1",
    ten: "Khám phá thế giới loài vật",
    hop_le: true,
  },
  {
    id: "s3-2",
    ten: "Ca nhạc thiếu nhi",
    hop_le: true,
  },
  {
    id: "s3-3",
    ten: "Phim ma đáng sợ chiếu khuya",
    hop_le: false,
    canh_bao: "Phim đáng sợ chiếu khuya không phù hợp với em và làm em ngủ muộn.",
  },
  {
    id: "s3-4",
    ten: "Em học tiếng Anh qua bài hát",
    hop_le: true,
  },
];

export const STAGE3_REASONS = [
  "giúp em học điều hay",
  "vui và lành mạnh",
  "đúng lứa tuổi của em",
];
