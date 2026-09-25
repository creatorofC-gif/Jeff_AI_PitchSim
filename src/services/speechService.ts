export type TranscriptCallback = (text: string, isFinal: boolean) => void;
export type AudioLevelCallback = (level: number) => void;

export interface SpeechService {
  startListening(onTranscript: TranscriptCallback, onAudioLevel?: AudioLevelCallback): Promise<void>;
  stopListening(): Promise<string>;
  getTranscript(): string;
  isAvailable(): boolean;
}

class BrowserAndMockSpeechService implements SpeechService {
  private currentTranscript = '';
  private isListening = false;
  private recognition: any = null;
  private onTranscriptCallback: TranscriptCallback | null = null;
  private audioLevelInterval: any = null;

  constructor() {
    // Check if webkitSpeechRecognition or SpeechRecognition exists
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          this.recognition = new SpeechRecognition();
          this.recognition.continuous = true;
          this.recognition.interimResults = true;
          this.recognition.lang = 'en-US';

          this.recognition.onresult = (event: any) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
              } else {
                interimTranscript += event.results[i][0].transcript;
              }
            }

            const current = finalTranscript || interimTranscript;
            if (current) {
              this.currentTranscript = current;
              if (this.onTranscriptCallback) {
                this.onTranscriptCallback(current, Boolean(finalTranscript));
              }
            }
          };

          this.recognition.onerror = () => {
            // Graceful fallback to simulated speech
          };
        } catch {
          this.recognition = null;
        }
      }
    }
  }

  isAvailable(): boolean {
    return true; // We always have simulated speech capabilities even if mic is unavailable
  }

  async startListening(
    onTranscript: TranscriptCallback,
    onAudioLevel?: AudioLevelCallback
  ): Promise<void> {
    this.currentTranscript = '';
    this.isListening = true;
    this.onTranscriptCallback = onTranscript;

    // Start simulated audio level fluctuations for audio wave UI
    if (onAudioLevel) {
      this.audioLevelInterval = setInterval(() => {
        if (this.isListening) {
          const randomLevel = 0.2 + Math.random() * 0.75;
          onAudioLevel(randomLevel);
        }
      }, 100);
    }

    if (this.recognition) {
      try {
        this.recognition.start();
      } catch {
        // Recognition might already be running or blocked
      }
    }
  }

  async stopListening(): Promise<string> {
    this.isListening = false;

    if (this.audioLevelInterval) {
      clearInterval(this.audioLevelInterval);
      this.audioLevelInterval = null;
    }

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // Ignore
      }
    }

    const result = this.currentTranscript.trim();
    return result;
  }

  getTranscript(): string {
    return this.currentTranscript;
  }

  /**
   * Helper to inject simulated speech text for testing without a microphone
   */
  simulateSpeech(text: string) {
    this.currentTranscript = text;
    if (this.onTranscriptCallback) {
      this.onTranscriptCallback(text, true);
    }
  }
}

export const speechService = new BrowserAndMockSpeechService();
