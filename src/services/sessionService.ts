import { PitchSession, PitchReport } from '../types/session';
import { StartupContext, StartupMaterial } from '../types/startup';
import { InvestorPersonality, SessionDifficulty, InvestorMessage } from '../types/investor';
import { INITIAL_MOCK_SESSIONS } from '../data/mockSessions';
import { investorService } from './investorService';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

class SessionService {
  private sessions: Map<string, PitchSession> = new Map();

  constructor() {
    // Populate with initial demo sessions
    INITIAL_MOCK_SESSIONS.forEach((session) => {
      this.sessions.set(session.id, session);
    });
  }

  /**
   * POST /sessions
   * Creates a new draft pitch session
   */
  async createSession(payload: {
    startupContext: StartupContext;
    materials?: StartupMaterial[];
    investorMode: InvestorPersonality;
    difficulty: SessionDifficulty;
  }): Promise<PitchSession> {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const sessionId = `session-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 4)}`;
    const newSession: PitchSession = {
      id: sessionId,
      startupContext: payload.startupContext,
      materials: payload.materials || [],
      investorMode: payload.investorMode,
      difficulty: payload.difficulty,
      conversation: [],
      sessionState: 'ready',
      timerSeconds: 0,
      createdAt: new Date().toISOString(),
      status: 'draft'
    };

    this.sessions.set(sessionId, newSession);
    return newSession;
  }

  /**
   * GET /sessions/:id
   */
  async getSession(sessionId: string): Promise<PitchSession | null> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return this.sessions.get(sessionId) || null;
  }

  /**
   * POST /sessions/:id/start
   * Starts the investor meeting and retrieves opening question/welcome
   */
  async startSession(sessionId: string): Promise<{ session: PitchSession; welcomeMessage: InvestorMessage }> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    session.status = 'in_progress';
    session.sessionState = 'investor-speaking';

    const welcomeMessage = await investorService.startSession(
      session.startupContext,
      session.investorMode
    );

    session.conversation.push(welcomeMessage);
    this.sessions.set(sessionId, session);

    return { session, welcomeMessage };
  }

  /**
   * POST /sessions/:id/transcript
   * Records user speech and triggers investor response
   */
  async sendUserSpeech(sessionId: string, transcript: string): Promise<InvestorMessage> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    const userMessage: InvestorMessage = {
      id: `msg-usr-${Date.now()}`,
      role: 'user',
      text: transcript,
      timestamp: Date.now()
    };
    session.conversation.push(userMessage);

    // Call investor service for response
    const investorReply = await investorService.processUserResponse(
      transcript,
      session.startupContext,
      session.investorMode
    );

    session.conversation.push(investorReply);
    this.sessions.set(sessionId, session);

    return investorReply;
  }

  /**
   * POST /sessions/:id/end
   * Concludes pitch and generates evaluation report
   */
  async endSession(sessionId: string, durationSeconds: number): Promise<PitchReport> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    session.status = 'completed';
    session.sessionState = 'completed';
    session.completedAt = new Date().toISOString();
    session.timerSeconds = durationSeconds;

    const report = await investorService.endSession(
      sessionId,
      session.startupContext,
      session.conversation,
      durationSeconds
    );

    session.report = report;
    this.sessions.set(sessionId, session);
    return report;
  }

  /**
   * GET /sessions/:id/report
   */
  async getSessionReport(sessionId: string): Promise<PitchReport | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const session = this.sessions.get(sessionId);
    return session?.report || null;
  }

  /**
   * GET /sessions
   */
  async getAllSessions(): Promise<PitchSession[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return Array.from(this.sessions.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const sessionService = new SessionService();
