import { StartupContext } from '../../types/startup';
import { InvestorPersonality, InvestorMessage } from '../../types/investor';
import {
  INVESTOR_PROFILES,
  CONTEXTUAL_INVESTOR_REACTIONS,
  FALLBACK_QUESTION_QUEUE
} from '../../data/mockInvestorResponses';

export interface InvestorAgent {
  initializeSession(context: StartupContext, personality: InvestorPersonality): Promise<string>;
  processTranscript(
    transcript: string,
    context: StartupContext,
    personality: InvestorPersonality
  ): Promise<string>;
  generateFollowUp(
    conversation: InvestorMessage[],
    context: StartupContext,
    personality: InvestorPersonality
  ): Promise<string>;
}

export class MockInvestorAgent implements InvestorAgent {
  private fallbackCounter = 0;

  async initializeSession(
    context: StartupContext,
    personality: InvestorPersonality
  ): Promise<string> {
    // Simulated thinking latency
    await new Promise((resolve) => setTimeout(resolve, 600));
    const profile = INVESTOR_PROFILES[personality] || INVESTOR_PROFILES.analytical_vc;
    return profile.welcomeTemplate(context.name || 'your startup');
  }

  async processTranscript(
    transcript: string,
    context: StartupContext,
    personality: InvestorPersonality
  ): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const lowerTranscript = transcript.toLowerCase();

    // Check for specific startup context triggers (e.g. users, revenue, competitors, funding)
    for (const reaction of CONTEXTUAL_INVESTOR_REACTIONS) {
      if (reaction.keywords.some((kw) => lowerTranscript.includes(kw))) {
        return reaction.investorReplies[personality] || reaction.investorReplies.analytical_vc;
      }
    }

    // Check if the user mentioned their problem or solution
    if (context.problem && lowerTranscript.includes('problem')) {
      return `You defined the problem around ${context.problem.slice(0, 40)}... How urgent of a hair-on-fire need is this for your target buyer today?`;
    }

    if (context.fundingRequired && (lowerTranscript.includes('raise') || lowerTranscript.includes('seed'))) {
      return `Regarding your target round of ${context.fundingRequired}, what are your assumptions on burn rate and months of runway?`;
    }

    // Fallback rotation
    const question = FALLBACK_QUESTION_QUEUE[this.fallbackCounter % FALLBACK_QUESTION_QUEUE.length];
    this.fallbackCounter++;
    return question;
  }

  async generateFollowUp(
    conversation: InvestorMessage[],
    context: StartupContext,
    personality: InvestorPersonality
  ): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    const lastUserMessage = [...conversation].reverse().find((m) => m.role === 'user');
    if (lastUserMessage) {
      return this.processTranscript(lastUserMessage.text, context, personality);
    }
    return `That sounds interesting. But how does this scale without linear headcount growth?`;
  }
}

/**
 * Architecture Placeholder:
 * When connecting real LLM (Gemini 1.5 Pro / Flash, OpenAI, Claude, or custom LLM gateway),
 * create LLMInvestorAgent implementing InvestorAgent and swap the export here or configure via environment.
 */
export class LLMInvestorAgent implements InvestorAgent {
  public apiBaseUrl: string;

  constructor(apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL || '/api') {
    this.apiBaseUrl = apiBaseUrl;
  }

  async initializeSession(context: StartupContext, personality: InvestorPersonality): Promise<string> {
    // In production: fetch(`${this.apiBaseUrl}/ai/initialize`, { method: 'POST', body: JSON.stringify({ context, personality }) })
    throw new Error('LLM backend endpoint not connected yet. Use MockInvestorAgent for frontend simulation.');
  }

  async processTranscript(transcript: string, context: StartupContext, personality: InvestorPersonality): Promise<string> {
    throw new Error('LLM backend endpoint not connected yet. Use MockInvestorAgent for frontend simulation.');
  }

  async generateFollowUp(conversation: InvestorMessage[], context: StartupContext, personality: InvestorPersonality): Promise<string> {
    throw new Error('LLM backend endpoint not connected yet. Use MockInvestorAgent for frontend simulation.');
  }
}

export const defaultInvestorAgent: InvestorAgent = new MockInvestorAgent();
