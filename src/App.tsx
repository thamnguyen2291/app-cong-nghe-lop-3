import { useState, useEffect } from "react";
import {
  SectionId,
  ElearningProgress,
  ProgramCategory,
  SafetyAnswer,
} from "./types/elearning";
import { soundManager } from "./utils/audio";
import { speechManager } from "./utils/speech";
import { HeaderNav } from "./components/layout/HeaderNav";
import { FooterNav } from "./components/layout/FooterNav";
import { TableOfContentsModal } from "./components/layout/TableOfContentsModal";
import { Section1Cover } from "./components/sections/Section1Cover";
import { Section2Objectives } from "./components/sections/Section2Objectives";
import { Section3Warmup } from "./components/sections/Section3Warmup";
import { Section4Explore } from "./components/sections/Section4Explore";
import { Section5Practice } from "./components/sections/Section5Practice";
import { Section6Apply } from "./components/sections/Section6Apply";
import { Section7QuizSummary } from "./components/sections/Section7QuizSummary";

const STORAGE_KEY = "elearning_mat_sang_progress_v1";

const DEFAULT_PROGRESS: ElearningProgress = {
  currentSection: 1,
  maxUnlockedSection: 1,
  practiceStars: 0,
  stage1Completed: {},
  stage2Completed: {},
  pledgeResult: null,
  applyAnswers: {
    familyUses: [],
    chosenHealthyProgram: "",
  },
  quizAnswers: {},
  quizSubmitted: false,
};

export default function App() {
  const [progress, setProgress] = useState<ElearningProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.currentSection === "number") {
          return parsed;
        }
      }
    } catch {}
    return DEFAULT_PROGRESS;
  });

  const [isTocOpen, setIsTocOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {}
  }, [progress]);

  // Stop speech when switching sections
  useEffect(() => {
    speechManager.stop();
  }, [progress.currentSection]);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.isMuted = nextMuted;
    if (!nextMuted) {
      soundManager.playClick();
    }
  };

  const handleSelectSection = (id: SectionId) => {
    setProgress((prev) => ({
      ...prev,
      currentSection: id,
      maxUnlockedSection: Math.max(prev.maxUnlockedSection, id) as SectionId,
    }));
  };

  const handleGoNext = () => {
    if (progress.currentSection < 7) {
      const nextId = (progress.currentSection + 1) as SectionId;
      handleSelectSection(nextId);
    }
  };

  const handleGoBack = () => {
    if (progress.currentSection > 1) {
      const prevId = (progress.currentSection - 1) as SectionId;
      handleSelectSection(prevId);
    }
  };

  // Section 5 practice stage 1 update
  const handleUpdateStage1 = (
    cardId: string,
    selected: ProgramCategory,
    isCorrect: boolean
  ) => {
    setProgress((prev) => {
      if (prev.stage1Completed[cardId]) return prev;
      const newStage1 = {
        ...prev.stage1Completed,
        [cardId]: { selected, isCorrect },
      };
      const newStars = prev.practiceStars + (isCorrect ? 1 : 0);
      return {
        ...prev,
        stage1Completed: newStage1,
        practiceStars: newStars,
      };
    });
  };

  // Section 5 practice stage 2 update
  const handleUpdateStage2 = (
    scenarioId: string,
    selected: SafetyAnswer,
    isCorrect: boolean
  ) => {
    setProgress((prev) => {
      if (prev.stage2Completed[scenarioId]) return prev;
      const newStage2 = {
        ...prev.stage2Completed,
        [scenarioId]: { selected, isCorrect },
      };
      const newStars = prev.practiceStars + (isCorrect ? 1 : 0);
      return {
        ...prev,
        stage2Completed: newStage2,
        practiceStars: newStars,
      };
    });
  };

  // Section 5 practice stage 3 pledge update
  const handleUpdatePledge = (program: string, reason: string) => {
    setProgress((prev) => ({
      ...prev,
      pledgeResult: { program, reason },
    }));
  };

  // Section 6 apply updates
  const handleToggleFamilyUse = (item: string) => {
    setProgress((prev) => {
      const exists = prev.applyAnswers.familyUses.includes(item);
      const updated = exists
        ? prev.applyAnswers.familyUses.filter((x) => x !== item)
        : [...prev.applyAnswers.familyUses, item];
      return {
        ...prev,
        applyAnswers: {
          ...prev.applyAnswers,
          familyUses: updated,
        },
      };
    });
  };

  const handleSelectHealthyProgram = (item: string) => {
    setProgress((prev) => ({
      ...prev,
      applyAnswers: {
        ...prev.applyAnswers,
        chosenHealthyProgram: item,
      },
    }));
  };

  // Section 7 quiz updates
  const handleAnswerQuizQuestion = (questionId: number, optionIdx: number) => {
    setProgress((prev) => ({
      ...prev,
      quizAnswers: {
        ...prev.quizAnswers,
        [questionId]: optionIdx,
      },
    }));
  };

  const handleSubmitQuiz = () => {
    setProgress((prev) => ({
      ...prev,
      quizSubmitted: true,
    }));
  };

  // Restart all progress
  const handleRestartAll = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setProgress(DEFAULT_PROGRESS);
  };

  // Get current section speech narration text for Header "Nghe lại"
  const getCurrentSpeechText = () => {
    switch (progress.currentSection) {
      case 1:
        return "Chào các em! Hôm nay chúng mình cùng tìm hiểu về chiếc ti vi nhé!";
      case 2:
        return "Sau bài học này, các em sẽ đạt được 3 mục tiêu rất quan trọng này nhé!";
      case 3:
        return "Em thích chương trình truyền hình nào? Hãy bấm chọn một bức tranh nhé!";
      case 4:
        return "Máy thu hình, còn gọi là ti vi, dùng để xem các chương trình truyền hình. Nội dung thường là tin tức, giải trí và giáo dục.";
      case 5:
        return "Chúng mình cùng luyện tập 3 chặng để nhận thật nhiều ngôi sao nhé!";
      case 6:
        return "Ở nhà em và bố mẹ cùng xem ti vi như thế nào? Hãy cùng trao đổi và chia sẻ nhé!";
      case 7:
        return "Ti vi giúp em xem tin tức, giải trí và học tập. Em chọn nội dung đúng lứa tuổi, xem cùng người lớn. Gặp nội dung lạ, em dừng lại và báo người lớn.";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-[#ecf8f4] flex flex-col text-[#0b2b24] font-sans">
      {/* Top Header Navigation */}
      <HeaderNav
        currentSection={progress.currentSection}
        maxUnlockedSection={progress.maxUnlockedSection}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenToc={() => setIsTocOpen(true)}
        currentSpeechText={getCurrentSpeechText()}
      />

      {/* Main Content Sections (1 to 7) */}
      <main className="flex-1 flex flex-col">
        {progress.currentSection === 1 && (
          <Section1Cover onStart={handleGoNext} />
        )}

        {progress.currentSection === 2 && <Section2Objectives />}

        {progress.currentSection === 3 && <Section3Warmup />}

        {progress.currentSection === 4 && <Section4Explore />}

        {progress.currentSection === 5 && (
          <Section5Practice
            practiceStars={progress.practiceStars}
            stage1Completed={progress.stage1Completed}
            stage2Completed={progress.stage2Completed}
            pledgeResult={progress.pledgeResult}
            onUpdateStage1={handleUpdateStage1}
            onUpdateStage2={handleUpdateStage2}
            onUpdatePledge={handleUpdatePledge}
          />
        )}

        {progress.currentSection === 6 && (
          <Section6Apply
            familyUses={progress.applyAnswers.familyUses}
            chosenHealthyProgram={progress.applyAnswers.chosenHealthyProgram}
            onToggleFamilyUse={handleToggleFamilyUse}
            onSelectHealthyProgram={handleSelectHealthyProgram}
          />
        )}

        {progress.currentSection === 7 && (
          <Section7QuizSummary
            practiceStars={progress.practiceStars}
            quizAnswers={progress.quizAnswers}
            quizSubmitted={progress.quizSubmitted}
            onAnswerQuestion={handleAnswerQuizQuestion}
            onSubmitQuiz={handleSubmitQuiz}
            onGoToExplore={() => handleSelectSection(4)}
            onRestartAll={handleRestartAll}
          />
        )}
      </main>

      {/* Bottom Footer Navigation */}
      <FooterNav
        currentSection={progress.currentSection}
        onGoBack={handleGoBack}
        onGoNext={handleGoNext}
        onOpenToc={() => setIsTocOpen(true)}
      />

      {/* Table of Contents Modal */}
      {isTocOpen && (
        <TableOfContentsModal
          currentSection={progress.currentSection}
          maxUnlockedSection={progress.maxUnlockedSection}
          onSelectSection={handleSelectSection}
          onClose={() => setIsTocOpen(false)}
        />
      )}
    </div>
  );
}
