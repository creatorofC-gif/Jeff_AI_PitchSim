import { InvestorMessage, InvestorPersonality } from '../types/investor';
import { StartupContext } from '../types/startup';
import { PitchReport } from '../types/session';
import { defaultInvestorAgent, InvestorAgent } from './ai/investorAgent';

class InvestorService {
  private agent: InvestorAgent = defaultInvestorAgent;

  setAgent(agent: InvestorAgent) {
    this.agent = agent;
  }

  async startSession(
    startup: StartupContext,
    personality: InvestorPersonality
  ): Promise<InvestorMessage> {
    const welcomeText = await this.agent.initializeSession(startup, personality);
    return {
      id: `msg-inv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role: 'investor',
      text: welcomeText,
      timestamp: Date.now(),
      questionType: 'problem'
    };
  }

  async processUserResponse(
    userText: string,
    context: StartupContext,
    personality: InvestorPersonality
  ): Promise<InvestorMessage> {
    const questionText = await this.agent.processTranscript(userText, context, personality);
    return {
      id: `msg-inv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role: 'investor',
      text: questionText,
      timestamp: Date.now(),
      questionType: 'general'
    };
  }

  async generateNextQuestion(
    conversation: InvestorMessage[],
    context: StartupContext,
    personality: InvestorPersonality
  ): Promise<InvestorMessage> {
    const questionText = await this.agent.generateFollowUp(conversation, context, personality);
    return {
      id: `msg-inv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role: 'investor',
      text: questionText,
      timestamp: Date.now()
    };
  }

  async endSession(
    sessionId: string,
    startupContext: StartupContext,
    conversation: InvestorMessage[],
    durationSeconds: number
  ): Promise<PitchReport> {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const userExchanges = conversation.filter((m) => m.role === 'user');
    const investorQuestions = conversation.filter((m) => m.role === 'investor');

    // Calculate realistic dynamic scores based on interaction
    const answeredCount = userExchanges.length;
    const askedCount = investorQuestions.length;
    const baseScore = Math.min(94, Math.max(68, 75 + answeredCount * 3));

    const evaluatedExchanges = investorQuestions.slice(0, 4).map((q, idx) => {
      const correspondingAnswer = userExchanges[idx]?.text || "Answered with high level overview.";
      return {
        question: q.text,
        answer: correspondingAnswer,
        critique: idx === 0 
          ? "Solid framing of the user pain point, clear conviction." 
          : "Addressed the investor concern directly with operational details.",
        score: Math.min(96, Math.max(72, 80 + (idx % 3) * 6)),
        recommendedResponse: idx % 2 === 1 
          ? "Quantify the cohort retention and provide competitive moat examples." 
          : undefined
      };
    });

    const report: PitchReport = {
      sessionId,
      startupName: startupContext.name || 'Startup Pitch',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      durationSeconds,
      questionsAsked: Math.max(1, askedCount),
      questionsAnswered: answeredCount,
      overallScore: baseScore,
      delivery: {
        speakingRateWPM: Math.floor(130 + Math.random() * 25),
        pauseFrequency: 'Balanced (1.9s avg)',
        fillerWordsCount: Math.floor(4 + Math.random() * 6),
        fillerWordsList: [
          { word: 'um', count: 3 },
          { word: 'like', count: 2 },
          { word: 'basically', count: 1 }
        ],
        energyScore: Math.floor(82 + Math.random() * 12),
        clarityScore: Math.floor(84 + Math.random() * 10)
      },
      content: {
        problemClarity: Math.floor(85 + Math.random() * 10),
        solutionClarity: Math.floor(84 + Math.random() * 10),
        marketPotential: Math.floor(80 + Math.random() * 12),
        businessModelViability: Math.floor(82 + Math.random() * 10),
        tractionProof: Math.floor(78 + Math.random() * 14),
        financialDefensibility: Math.floor(76 + Math.random() * 14),
        problemFeedback: `Clearly resonated with the ${startupContext.targetCustomer || 'target market'} pain points.`,
        solutionFeedback: 'Effective articulation of the core value proposition and differentiation.',
        marketFeedback: `Good sizing around ${startupContext.marketSize || 'the addressable sector'}; reinforce bottom-up conversion funnel.`,
        financialFeedback: `Funding request of ${startupContext.fundingRequired || 'target capital'} needs clear milestone tie-ins.`
      },
      qa: {
        responseQuality: Math.floor(82 + Math.random() * 10),
        followUpHandling: Math.floor(80 + Math.random() * 12),
        confidenceScore: Math.floor(85 + Math.random() * 10),
        rebuttalStrength: Math.floor(81 + Math.random() * 11),
        evaluatedExchanges
      },
      strengths: [
        'Quick on your feet when addressing direct pushback on scalability',
        'Strong clarity on customer pain point and initial target demographic',
        'Poised vocal pace and authoritative demeanor during cross-examination'
      ],
      areasToImprove: [
        'Back up revenue projections with unit-level cohort retention numbers',
        'Elaborate more concretely on barriers to entry against well-funded incumbents'
      ],
      executiveSummary: `The pitch for ${startupContext.name} demonstrated notable founder conviction and strong articulation of the core problem. With improved defensibility metrics and tighter unit economics, this pitch is approaching institutional funding readiness.`
    };

    return report;
  }
}

export const investorService = new InvestorService();
