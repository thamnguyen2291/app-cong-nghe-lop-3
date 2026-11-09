import { useState, useEffect } from "react";
import { AppStage, ProgramCard, ProgramCategory, SafetyAnswer, SafetyScenario } from "./types";
import { DEFAULT_STAGE1_CARDS, DEFAULT_STAGE2_SCENARIOS } from "./data/defaultCards";
import { soundManager } from "./utils/audio";
import { TopBar } from "./components/TopBar";
import { StartScreen } from "./components/StartScreen";
import { Stage1Screen } from "./components/Stage1Screen";
import { Stage2Screen } from "./components/Stage2Screen";
import { Stage3Screen } from "./components/Stage3Screen";
import { SummaryScreen } from "./components/SummaryScreen";
import { TeacherCornerModal } from "./components/TeacherCornerModal";

const LOCAL_STORAGE_KEY_CARDS = "mat_sang_chon_hay_cards_v1";

export default function App() {
  // Navigation & Game Stage
  const [currentStage, setCurrentStage] = useState<AppStage>("start");
  const [isTeacherCornerOpen, setIsTeacherCornerOpen] = useState<boolean>(false);

  // Group rotation settings
  const [groupCount, setGroupCount] = useState<number>(8);
  const [currentGroupTurn, setCurrentGroupTurn] = useState<number>(1);

  // Lesson Activity Timer (target 10:00)
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Stage 1: Program Cards (customizable in Teacher Corner)
  const [cards, setCards] = useState<ProgramCard[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CARDS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 3) {
          return parsed;
        }
      }
    } catch {}
    return DEFAULT_STAGE1_CARDS;
  });

  const [stage1Index, setStage1Index] = useState<number>(0);

  // Stage 2: Digital Safety Scenarios
  const scenarios = DEFAULT_STAGE2_SCENARIOS;
  const [stage2Index, setStage2Index] = useState<number>(0);

  // Stage 3 Pledge Result
  const [, setPledgeResult] = useState<{
    program: string;
    reason: string;
  } | null>(null);

  // Score & Evaluation tracking
  const [stars, setStars] = useState<number>(0);
  const [stage1Correct, setStage1Correct] = useState<number>(0);
  const [stage2Correct, setStage2Correct] = useState<number>(0);
  const [incorrectItems, setIncorrectItems] = useState<string[]>([]);

  // Save cards to localStorage whenever modified
  const handleSaveCards = (newCards: ProgramCard[]) => {
    setCards(newCards);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_CARDS, JSON.stringify(newCards));
    } catch {}
  };

  // Timer effect: runs during active stages (stage1, stage2, stage3)
  useEffect(() => {
    if (currentStage === "start" || isPaused) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentStage, isPaused]);

  // Audio mute sync
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.isMuted = nextMuted;
    if (!nextMuted) {
      soundManager.playClick();
    }
  };

  const handleTogglePause = () => {
    soundManager.playClick();
    setIsPaused((prev) => !prev);
  };

  // Start activity
  const handleStartGame = () => {
    setCurrentStage("stage1");
    setStage1Index(0);
    setStage2Index(0);
    setCurrentGroupTurn(1);
    setStars(0);
    setStage1Correct(0);
    setStage2Correct(0);
    setIncorrectItems([]);
    setPledgeResult(null);
    setElapsedSeconds(0);
    setIsPaused(false);
  };

  // Stage 1 Answer
  const handleStage1Answer = (isCorrect: boolean, _category: ProgramCategory, card: ProgramCard) => {
    if (isCorrect) {
      setStars((prev) => prev + 1);
      setStage1Correct((prev) => prev + 1);
    } else {
      setIncorrectItems((prev) =>
        prev.includes(card.ten) ? prev : [...prev, `Kênh "${card.ten}" (Đáp án đúng: ${card.nhom})`]
      );
    }
  };

  // Stage 1 Next Card
  const handleStage1Next = () => {
    const nextTurn = (currentGroupTurn % groupCount) + 1;
    setCurrentGroupTurn(nextTurn);

    if (stage1Index + 1 < cards.length) {
      setStage1Index((prev) => prev + 1);
    } else {
      // Transition to Stage 2
      soundManager.playFanfare();
      setCurrentStage("stage2");
      setStage2Index(0);
    }
  };

  // Stage 2 Answer
  const handleStage2Answer = (
    isCorrect: boolean,
    _answer: SafetyAnswer,
    scenario: SafetyScenario
  ) => {
    if (isCorrect) {
      setStars((prev) => prev + 1);
      setStage2Correct((prev) => prev + 1);
    } else {
      const correctLabel = scenario.dap_an === "Dừng" ? "Dừng lại, báo người lớn" : "Xem tiếp";
      setIncorrectItems((prev) =>
        prev.includes(scenario.ten)
          ? prev
          : [...prev, `Tình huống "${scenario.ten}" (Cách xử lý đúng: ${correctLabel})`]
      );
    }
  };

  // Stage 2 Next Scenario
  const handleStage2Next = () => {
    const nextTurn = (currentGroupTurn % groupCount) + 1;
    setCurrentGroupTurn(nextTurn);

    if (stage2Index + 1 < scenarios.length) {
      setStage2Index((prev) => prev + 1);
    } else {
      // Transition to Stage 3
      soundManager.playFanfare();
      setCurrentStage("stage3");
    }
  };

  // Stage 3 Pledge Completion
  const handleStage3Pledge = (selectedProgram: string, selectedReason: string) => {
    setPledgeResult({ program: selectedProgram, reason: selectedReason });
    setStars((prev) => prev + 1); // bonus star for complete pledge
  };

  const handleStage3GoToSummary = () => {
    setCurrentStage("summary");
  };

  // Reset & Play Again
  const handlePlayAgain = () => {
    handleStartGame();
  };

  return (
    <div className="min-h-screen bg-[#ecf8f4] flex flex-col text-[#0b2b24] select-none font-sans">
      {/* Top Bar (always present) */}
      <TopBar
        currentStage={currentStage}
        stars={stars}
        elapsedSeconds={elapsedSeconds}
        isPaused={isPaused}
        isMuted={isMuted}
        onTogglePause={handleTogglePause}
        onToggleMute={handleToggleMute}
        onGoToStage={(stage) => setCurrentStage(stage)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {currentStage === "start" && (
          <StartScreen
            groupCount={groupCount}
            onGroupCountChange={(count) => setGroupCount(count)}
            onStartGame={handleStartGame}
            onOpenTeacherCorner={() => setIsTeacherCornerOpen(true)}
          />
        )}

        {currentStage === "stage1" && (
          <Stage1Screen
            cards={cards}
            currentCardIndex={stage1Index}
            currentGroupNumber={currentGroupTurn}
            onAnswer={handleStage1Answer}
            onNextCard={handleStage1Next}
            isLastCard={stage1Index + 1 >= cards.length}
            isPaused={isPaused}
          />
        )}

        {currentStage === "stage2" && (
          <Stage2Screen
            scenarios={scenarios}
            currentScenarioIndex={stage2Index}
            currentGroupNumber={currentGroupTurn}
            onAnswer={handleStage2Answer}
            onNextScenario={handleStage2Next}
            isLastScenario={stage2Index + 1 >= scenarios.length}
            isPaused={isPaused}
          />
        )}

        {currentStage === "stage3" && (
          <Stage3Screen
            onCompletePledge={handleStage3Pledge}
            onGoToSummary={handleStage3GoToSummary}
          />
        )}

        {currentStage === "summary" && (
          <SummaryScreen
            totalStars={stars}
            stage1Correct={stage1Correct}
            stage1Total={cards.length}
            stage2Correct={stage2Correct}
            stage2Total={scenarios.length}
            incorrectCards={incorrectItems}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>

      {/* Teacher Corner Modal (only accessible from Start screen) */}
      {isTeacherCornerOpen && (
        <TeacherCornerModal
          cards={cards}
          onSaveCards={handleSaveCards}
          onClose={() => setIsTeacherCornerOpen(false)}
        />
      )}
    </div>
  );
}
