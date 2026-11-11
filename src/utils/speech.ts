class SpeechManager {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private viVoice: SpeechSynthesisVoice | null = null;
  public hasVoice: boolean = false;
  private listeners: Set<() => void> = new Set();
  public isSpeaking: boolean = false;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Search for Vietnamese voice
    const found = voices.find(
      (v) =>
        v.lang.toLowerCase() === "vi-vn" ||
        v.lang.toLowerCase().startsWith("vi") ||
        v.name.toLowerCase().includes("vietnam") ||
        v.name.toLowerCase().includes("tiếng việt")
    );
    if (found) {
      this.viVoice = found;
      this.hasVoice = true;
    } else {
      // Some browsers (like Chrome Android) have vi-VN support even if not explicitly named,
      // but if there are any voices, we test or check if vi language is supported
      const anyVi = voices.some((v) => v.lang.toLowerCase().includes("vi"));
      this.hasVoice = anyVi || voices.length > 0;
    }
    this.notify();
  }

  public subscribe(callback: () => void) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public speak(text: string, onDone?: () => void) {
    if (!this.synth) return;
    this.stop();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "vi-VN";
      if (this.viVoice) {
        utterance.voice = this.viVoice;
      }
      utterance.rate = 0.95; // Slightly slower, clear for Grade 3 kids
      utterance.pitch = 1.05; // Cheerful friendly pitch

      utterance.onstart = () => {
        this.isSpeaking = true;
        this.notify();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        this.notify();
        if (onDone) onDone();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        this.currentUtterance = null;
        this.notify();
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch {
      this.isSpeaking = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
      this.notify();
    }
  }
}

export const speechManager = new SpeechManager();
