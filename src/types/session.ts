import { StartupContext, StartupMaterial } from './startup';
import { InvestorPersonality, SessionDifficulty, InvestorMessage } from './investor';

export type SessionState =
  | 'preparing'
  | 'ready'
  | 'listening'
  | 'processing'
  | 'investor-speaking'
  | 'waiting-for-user'
  | 'paused'
  | 'completed';

export interface PitchDeliveryMetrics {
  speakingRateWPM: number;
  pauseFrequency: string; // e.g. "Optimal (2.1s avg)"
  fillerWordsCount: number;
  fillerWordsList: { word: string; count: number }[];
  energyScore: number; // 0 - 100
  clarityScore: number; // 0 - 100
}

export interface PitchContentEvaluation {
  problemClarity: number; // 0 - 100
  solutionClarity: number;
  marketPotential: number;
  businessModelViability: number;
  tractionProof: number;
  financialDefensibility: number;
  problemFeedback: string;
  solutionFeedback: string;
  marketFeedback: string;
  financialFeedback: string;
}

export interface InvestorQAAnalysis {
  responseQuality: number; // 0 - 100
  followUpHandling: number;
  confidenceScore: number;
  rebuttalStrength: number;
  evaluatedExchanges: {
    question: string;
    answer: string;
    critique: string;
    score: number;
    recommendedResponse?: string;
  }[];
}

export interface PitchReport {
  sessionId: string;
  startupName: string;
  date: string;
  durationSeconds: number;
  questionsAsked: number;
  questionsAnswered: number;
  overallScore: number; // 0 - 100
  delivery: PitchDeliveryMetrics;
  content: PitchContentEvaluation;
  qa: InvestorQAAnalysis;
  strengths: string[];
  areasToImprove: string[];
  executiveSummary: string;
}

export interface PitchSession {
  id: string;
  startupContext: StartupContext;
  materials: StartupMaterial[];
  investorMode: InvestorPersonality;
  difficulty: SessionDifficulty;
  conversation: InvestorMessage[];
  sessionState: SessionState;
  timerSeconds: number;
  createdAt: string;
  completedAt?: string;
  status: 'draft' | 'in_progress' | 'completed' | 'abandoned';
  report?: PitchReport;
}
