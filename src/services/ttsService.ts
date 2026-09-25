export interface TTSService {
  speak(
    text: string,
    options?: {
      gender?: 'male' | 'female';
      onStart?: () => void;
      onEnd?: () => void;
      onBoundary?: (charIndex: number) => void;
    }
  ): Promise<void>;
  stop(): void;
  pause(): void;
  resume(): void;
  isSpeaking(): boolean;
}

class BrowserAndSimulatedTTS implements TTSService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private simulationTimer: any = null;
  private speakingActive = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  isSpeaking(): boolean {
    return this.speakingActive;
  }

  async speak(
    text: string,
    options?: {
      gender?: 'male' | 'female';
      onStart?: () => void;
      onEnd?: () => void;
      onBoundary?: (charIndex: number) => void;
    }
  ): Promise<void> {
    this.stop();
    this.speakingActive = true;

    if (this.synth) {
      try {
        this.synth.cancel(); // Clear any pending speech
        const utterance = new SpeechSynthesisUtterance(text);
        this.currentUtterance = utterance;

        // Pick suitable voice if available
        const voices = this.synth.getVoices();
        const preferredVoice = voices.find((v) => {
          if (options?.gender === 'female') {
            return (
              v.name.includes('Female') ||
              v.name.includes('Samantha') ||
              v.name.includes('Victoria') ||
              v.name.includes('Zira')
            );
          }
          return (
            v.name.includes('Male') ||
            v.name.includes('David') ||
            v.name.includes('George') ||
            v.name.includes('Daniel')
          );
        });

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.rate = 1.0;
        utterance.pitch = options?.gender === 'female' ? 1.05 : 0.95;

        utterance.onstart = () => {
          options?.onStart?.();
        };

        utterance.onend = () => {
          this.speakingActive = false;
          options?.onEnd?.();
        };

        utterance.onerror = () => {
          this.speakingActive = false;
          options?.onEnd?.();
        };

        utterance.onboundary = (e) => {
          options?.onBoundary?.(e.charIndex);
        };

        this.synth.speak(utterance);
        return;
      } catch {
        // Fallback to simulated timing
      }
    }

    // Fallback simulation based on word count (~150 words per minute -> 400ms per word)
    const wordCount = text.split(/\s+/).length;
    const durationMs = Math.max(2500, Math.min(12000, wordCount * 360));

    options?.onStart?.();

    return new Promise((resolve) => {
      this.simulationTimer = setTimeout(() => {
        this.speakingActive = false;
        options?.onEnd?.();
        resolve();
      }, durationMs);
    });
  }

  stop(): void {
    this.speakingActive = false;
    if (this.simulationTimer) {
      clearTimeout(this.simulationTimer);
      this.simulationTimer = null;
    }
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // Ignore
      }
    }
    this.currentUtterance = null;
  }

  pause(): void {
    if (this.synth && this.speakingActive) {
      this.synth.pause();
    }
  }

  resume(): void {
    if (this.synth && this.speakingActive) {
      this.synth.resume();
    }
  }
}

export const ttsService = new BrowserAndSimulatedTTS();
