import { useState, useEffect } from "react";
import { ModeSelectScreen } from "./components/ModeSelectScreen";
import { ClassroomApp } from "./components/ClassroomApp";
import { ElearningApp } from "./components/ElearningApp";

export type AppMode = "select" | "classroom" | "home";

export default function App() {
  const getModeFromHash = (): AppMode => {
    const hash = window.location.hash.toLowerCase();
    if (hash === "#tren-lop") return "classroom";
    if (hash === "#o-nha") return "home";
    return "select";
  };

  const [mode, setMode] = useState<AppMode>(getModeFromHash);

  // Sync with window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      setMode(getModeFromHash());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSelectClassroom = () => {
    window.location.hash = "#tren-lop";
    setMode("classroom");
  };

  const handleSelectHome = () => {
    window.location.hash = "#o-nha";
    setMode("home");
  };

  const handleBackToModeSelect = () => {
    window.location.hash = "";
    setMode("select");
  };

  return (
    <div className="min-h-screen bg-[#ecf8f4] text-[#0b2b24] font-sans flex flex-col">
      {mode === "select" && (
        <ModeSelectScreen
          onSelectClassroom={handleSelectClassroom}
          onSelectHome={handleSelectHome}
        />
      )}

      {mode === "classroom" && (
        <ClassroomApp onBackToModeSelect={handleBackToModeSelect} />
      )}

      {mode === "home" && (
        <ElearningApp onBackToModeSelect={handleBackToModeSelect} />
      )}
    </div>
  );
}
