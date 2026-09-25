import { create } from 'zustand';
import { PitchSession, SessionState, PitchReport } from '../types/session';
import { StartupContext, StartupMaterial } from '../types/startup';
import { InvestorPersonality, SessionDifficulty, InvestorMessage } from '../types/investor';
import { AvatarState } from '../types/avatar';
import { sessionService } from '../services/sessionService';

const DEFAULT_STARTUP: StartupContext = {
  name: 'HealAtHome',
  oneLinePitch: 'Affordable, AI-triaged on-demand healthcare diagnostics delivered right to your doorstep within 45 minutes.',
  problem: 'Emergency rooms and outpatient clinics have 3+ hour wait times, leading to delayed diagnoses and high out-of-pocket costs for minor acute ailments.',
  solution: 'A mobile diagnostics fleet dispatched via an intelligent triage algorithm that collects vitals and performs point-of-care rapid testing.',
  targetCustomer: 'Urban families, elderly patients with mobility challenges, and busy working professionals.',
  marketSize: '$48B home healthcare market growing at 14.2% CAGR.',
  businessModel: 'Subscription tier for families ($29/mo) + per-visit fee ($49-$89) covered partially by partner health insurances.',
  competitors: 'Traditional urgent care clinics, telemedicine phone apps with no physical diagnostic capability.',
  traction: '5,200 completed visits across 2 test cities, 4.9/5 patient satisfaction score, $42,000 MRR.',
  revenue: '$42,000 MRR, growing 22% MoM.',
  fundingRequired: '$750,000 Seed round',
  useOfFunds: '50% fleet expansion & mobile diagnostic kits, 30% engineering and AI triage optimization, 20% regulatory & marketing.'
};

interface SessionStoreState {
  sessionId: string | null;
  startupContext: StartupContext;
  materials: StartupMaterial[];
  investorMode: InvestorPersonality;
  difficulty: SessionDifficulty;
  conversation: InvestorMessage[];
  sessionState: SessionState;
  avatarState: AvatarState;
  timerSeconds: number;
  isTimerRunning: boolean;
  currentTranscript: string;
  isMicActive: boolean;
  isProcessing: boolean;
  currentReport: PitchReport | null;

  // Actions
  setStartupContext: (context: Partial<StartupContext>) => void;
  setMaterials: (materials: StartupMaterial[]) => void;
  addMaterial: (material: StartupMaterial) => void;
  removeMaterial: (materialId: string) => void;
  setInvestorMode: (mode: InvestorPersonality) => void;
  setDifficulty: (difficulty: SessionDifficulty) => void;
  setSessionState: (state: SessionState) => void;
  setAvatarState: (state: AvatarState) => void;
  addMessage: (msg: InvestorMessage) => void;
  setCurrentTranscript: (text: string) => void;
  setMicActive: (active: boolean) => void;
  setIsProcessing: (processing: boolean) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tickTimer: () => void;
  setReport: (report: PitchReport | null) => void;
  initNewSession: (initialContext?: Partial<StartupContext>) => Promise<string>;
  loadSession: (sessionId: string) => Promise<boolean>;
  resetCurrentSession: () => void;
}

export const useSessionStore = create<SessionStoreState>((set, get) => ({
  sessionId: null,
  startupContext: DEFAULT_STARTUP,
  materials: [],
  investorMode: 'analytical_vc',
  difficulty: 'intermediate',
  conversation: [],
  sessionState: 'ready',
  avatarState: 'idle',
  timerSeconds: 0,
  isTimerRunning: false,
  currentTranscript: '',
  isMicActive: false,
  isProcessing: false,
  currentReport: null,

  setStartupContext: (updates) => {
    set((state) => ({
      startupContext: { ...state.startupContext, ...updates }
    }));
  },

  setMaterials: (materials) => set({ materials }),

  addMaterial: (material) => {
    set((state) => ({
      materials: [...state.materials, material]
    }));
  },

  removeMaterial: (materialId) => {
    set((state) => ({
      materials: state.materials.filter((m) => m.id !== materialId)
    }));
  },

  setInvestorMode: (investorMode) => set({ investorMode }),

  setDifficulty: (difficulty) => set({ difficulty }),

  setSessionState: (sessionState) => set({ sessionState }),

  setAvatarState: (avatarState) => set({ avatarState }),

  addMessage: (msg) => {
    set((state) => ({
      conversation: [...state.conversation, msg]
    }));
  },

  setCurrentTranscript: (currentTranscript) => set({ currentTranscript }),

  setMicActive: (isMicActive) => set({ isMicActive }),

  setIsProcessing: (isProcessing) => set({ isProcessing }),

  startTimer: () => set({ isTimerRunning: true }),

  pauseTimer: () => set({ isTimerRunning: false }),

  resetTimer: () => set({ timerSeconds: 0, isTimerRunning: false }),

  tickTimer: () => {
    const { isTimerRunning, timerSeconds } = get();
    if (isTimerRunning) {
      set({ timerSeconds: timerSeconds + 1 });
    }
  },

  setReport: (currentReport) => set({ currentReport }),

  initNewSession: async (initialContext) => {
    const startup = { ...get().startupContext, ...(initialContext || {}) };
    const session = await sessionService.createSession({
      startupContext: startup,
      materials: get().materials,
      investorMode: get().investorMode,
      difficulty: get().difficulty
    });

    set({
      sessionId: session.id,
      startupContext: startup,
      materials: session.materials,
      conversation: [],
      sessionState: 'ready',
      avatarState: 'idle',
      timerSeconds: 0,
      isTimerRunning: false,
      currentTranscript: '',
      isMicActive: false,
      currentReport: null
    });

    return session.id;
  },

  loadSession: async (sessionId: string) => {
    const session = await sessionService.getSession(sessionId);
    if (!session) return false;

    set({
      sessionId: session.id,
      startupContext: session.startupContext,
      materials: session.materials,
      investorMode: session.investorMode,
      difficulty: session.difficulty,
      conversation: session.conversation,
      sessionState: session.sessionState,
      timerSeconds: session.timerSeconds,
      currentReport: session.report || null
    });

    return true;
  },

  resetCurrentSession: () => {
    set({
      sessionId: null,
      conversation: [],
      sessionState: 'ready',
      avatarState: 'idle',
      timerSeconds: 0,
      isTimerRunning: false,
      currentTranscript: '',
      isMicActive: false,
      currentReport: null
    });
  }
}));
