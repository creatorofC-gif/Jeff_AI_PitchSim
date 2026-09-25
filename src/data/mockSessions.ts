import { PitchSession } from '../types/session';

export const INITIAL_MOCK_SESSIONS: PitchSession[] = [
  {
    id: 'session-healt-891',
    startupContext: {
      id: 'startup-1',
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
    },
    materials: [
      {
        id: 'mat-1',
        name: 'HealAtHome_PitchDeck_v3.pdf',
        size: 3420000,
        type: 'application/pdf',
        category: 'pitch_deck',
        uploadDate: '2026-09-24',
        status: 'ready'
      },
      {
        id: 'mat-2',
        name: 'HealAtHome_UnitEconomics.xlsx',
        size: 1120000,
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        category: 'financials',
        uploadDate: '2026-09-24',
        status: 'ready'
      }
    ],
    investorMode: 'analytical_vc',
    difficulty: 'intermediate',
    sessionState: 'completed',
    timerSeconds: 432,
    createdAt: '2026-09-24T14:30:00.000Z',
    completedAt: '2026-09-24T14:37:12.000Z',
    status: 'completed',
    conversation: [
      {
        id: 'msg-1',
        role: 'investor',
        text: "Good morning. I've reviewed your preliminary deck for HealAtHome. Let's get straight into it. Start by pitching me the core problem you solve and why existing alternatives are failing.",
        timestamp: Date.now() - 3600000 * 24,
        questionType: 'problem'
      },
      {
        id: 'msg-2',
        role: 'user',
        text: "We are tackling emergency room congestion. Right now, families wait over 3 hours just to get basic diagnostic tests for fevers, strep, or respiratory issues. Telehealth only offers video calls without physical samples, and clinics are overcrowded.",
        timestamp: Date.now() - 3600000 * 24 + 45000
      },
      {
        id: 'msg-3',
        role: 'investor',
        text: "You mentioned 5,200 completed visits. What is your gross margin per visit once you account for fuel, certified technicians, and diagnostic kit consumables?",
        timestamp: Date.now() - 3600000 * 24 + 90000,
        questionType: 'financials'
      },
      {
        id: 'msg-4',
        role: 'user',
        text: "Our current gross margin is 48%. As we cluster route dispatch in dense zip codes, our technician travel time drops by 35%, which expands gross margins to 61% at scale.",
        timestamp: Date.now() - 3600000 * 24 + 140000
      },
      {
        id: 'msg-5',
        role: 'investor',
        text: "What prevents hospital networks or established ambulance chains from offering this exact doorstep triage service with their existing staff?",
        timestamp: Date.now() - 3600000 * 24 + 195000,
        questionType: 'competitors'
      },
      {
        id: 'msg-6',
        role: 'user',
        text: "Hospitals operate on high facility fee overhead and bed occupancy incentives. Their cost structure makes dispatch unprofitable for them. We also have proprietary routing software and pre-negotiated direct insurance codes.",
        timestamp: Date.now() - 3600000 * 24 + 250000
      }
    ],
    report: {
      sessionId: 'session-healt-891',
      startupName: 'HealAtHome',
      date: '24 Sep 2026',
      durationSeconds: 432,
      questionsAsked: 6,
      questionsAnswered: 6,
      overallScore: 86,
      delivery: {
        speakingRateWPM: 138,
        pauseFrequency: 'Balanced (1.8s avg)',
        fillerWordsCount: 7,
        fillerWordsList: [
          { word: 'like', count: 3 },
          { word: 'you know', count: 2 },
          { word: 'um', count: 2 }
        ],
        energyScore: 84,
        clarityScore: 88
      },
      content: {
        problemClarity: 92,
        solutionClarity: 90,
        marketPotential: 85,
        businessModelViability: 82,
        tractionProof: 88,
        financialDefensibility: 79,
        problemFeedback: 'Crisp articulation of clinic bottleneck and quantified patient wait times.',
        solutionFeedback: 'Clear distinction from pure telehealth by emphasizing physical point-of-care diagnostics.',
        marketFeedback: 'Good TAM definition, but bottom-up calculation per zip-code density needs more color.',
        financialFeedback: 'Strong awareness of gross margin progression; be prepared for harsher questions on technician churn.'
      },
      qa: {
        responseQuality: 87,
        followUpHandling: 85,
        confidenceScore: 88,
        rebuttalStrength: 84,
        evaluatedExchanges: [
          {
            question: "You mentioned 5,200 completed visits. What is your gross margin per visit once you account for fuel, certified technicians, and diagnostic kit consumables?",
            answer: "Our current gross margin is 48%. As we cluster route dispatch in dense zip codes, our technician travel time drops by 35%, which expands gross margins to 61% at scale.",
            critique: "Excellent quantitative reply with realistic margins and route density mechanics.",
            score: 91
          },
          {
            question: "What prevents hospital networks or established ambulance chains from offering this exact doorstep triage service with their existing staff?",
            answer: "Hospitals operate on high facility fee overhead and bed occupancy incentives. Their cost structure makes dispatch unprofitable for them. We also have proprietary routing software and pre-negotiated direct insurance codes.",
            critique: "Good structural economic argument regarding incumbent innovator's dilemma.",
            score: 84,
            recommendedResponse: "Also highlight any exclusive geographic partnerships or regulatory certifications that take competitors months to acquire."
          }
        ]
      },
      strengths: [
        'Confident articulation of unit economics and route-density economics',
        'Strong framing of why hospital incumbents are disincentivized from copying the model',
        'Paced, clear vocal delivery with minimal filler hesitation'
      ],
      areasToImprove: [
        'Clarify medical liability insurance costs and licensed nurse retention metrics',
        'Provide deeper detail on customer acquisition cost per channel (B2C vs. employer benefit partnerships)'
      ],
      executiveSummary: 'HealAtHome demonstrated strong founder-market fit and solid grasp of operational mechanics under analytical VC scrutiny. Pitch readiness is High with minor polish required on regulatory scaling.'
    }
  },
  {
    id: 'session-finedge-412',
    startupContext: {
      name: 'FinEdge Intelligence',
      oneLinePitch: 'Automated AI forensic accounting and fraud detection for high-growth fintechs.',
      problem: 'Fintech compliance teams spend 40+ hours per week manually triaging false positives in transactional fraud alerts.',
      solution: 'Sub-millisecond graph neural network engine that detects synchronized cross-border laundering patterns.',
      targetCustomer: 'Neobanks, payment processors, and crypto on-ramps.',
      marketSize: '$21B AML compliance sector.',
      businessModel: 'API volume pricing based on transaction screening tiers.',
      competitors: 'Legacy rule-based engines, manual audit teams.',
      traction: '3 pilot enterprise clients, $18,000 MRR, 1.2M transactions screened.',
      revenue: '$18,000 MRR',
      fundingRequired: '$1,200,000 Seed',
      useOfFunds: 'Model fine-tuning, security audits, SOC2 Type II certification.'
    },
    materials: [
      {
        id: 'mat-fe-1',
        name: 'FinEdge_Deck_Sept.pdf',
        size: 4200000,
        type: 'application/pdf',
        category: 'pitch_deck',
        uploadDate: '2026-09-18',
        status: 'ready'
      }
    ],
    investorMode: 'aggressive_investor',
    difficulty: 'advanced',
    sessionState: 'completed',
    timerSeconds: 520,
    createdAt: '2026-09-18T10:15:00.000Z',
    completedAt: '2026-09-18T10:23:40.000Z',
    status: 'completed',
    conversation: [],
    report: {
      sessionId: 'session-finedge-412',
      startupName: 'FinEdge Intelligence',
      date: '18 Sep 2026',
      durationSeconds: 520,
      questionsAsked: 8,
      questionsAnswered: 7,
      overallScore: 78,
      delivery: {
        speakingRateWPM: 154,
        pauseFrequency: 'Fast (1.1s avg)',
        fillerWordsCount: 14,
        fillerWordsList: [
          { word: 'basically', count: 6 },
          { word: 'um', count: 5 },
          { word: 'so', count: 3 }
        ],
        energyScore: 89,
        clarityScore: 74
      },
      content: {
        problemClarity: 85,
        solutionClarity: 80,
        marketPotential: 82,
        businessModelViability: 76,
        tractionProof: 72,
        financialDefensibility: 75,
        problemFeedback: 'Sharp description of compliance burden, but lost some clarity in deep neural net jargon.',
        solutionFeedback: 'Good technical credibility.',
        marketFeedback: 'Solid estimation of enterprise budget pockets.',
        financialFeedback: 'Needed crisper answers on sales cycle length for tier-1 banks.'
      },
      qa: {
        responseQuality: 76,
        followUpHandling: 74,
        confidenceScore: 79,
        rebuttalStrength: 75,
        evaluatedExchanges: [
          {
            question: "Why wouldn't Stripe or Adyen build this in-house in one sprint?",
            answer: "Their core focus is acquiring merchant volume, not building specialized graph ML models for cross-entity fraud rings.",
            critique: "Reasonable, but could cite specialized regulatory liabilities that make outsourcing preferred.",
            score: 77
          }
        ]
      },
      strengths: [
        'Deep domain expertise and high enthusiasm',
        'Compelling graph neural network technological differentiation'
      ],
      areasToImprove: [
        'Slow down cadence when handling hostile cross-examination',
        'Reduce technical jargon when explaining the customer ROI'
      ],
      executiveSummary: 'Strong technical founder profile with high upside. Needs more composed delivery when challenged aggressively by partners.'
    }
  }
];
