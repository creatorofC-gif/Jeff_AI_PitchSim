import { InvestorPersonality, SessionDifficulty, InvestorMessage } from '../types/investor';
import { StartupContext } from '../types/startup';

export const INVESTOR_PROFILES: Record<InvestorPersonality, {
  name: string;
  title: string;
  firm: string;
  description: string;
  toneDescription: string;
  avatarGender: 'male' | 'female';
  welcomeTemplate: (startupName: string) => string;
}> = {
  analytical_vc: {
    name: 'Marcus Vance',
    title: 'Managing General Partner',
    firm: 'Apex Horizon Ventures',
    description: 'Relentlessly data-driven. Focuses on unit economics, CAC/LTV, cohort retention, and moat defensibility.',
    toneDescription: 'Direct, analytical, precise, and numbers-oriented.',
    avatarGender: 'male',
    welcomeTemplate: (name) =>
      `Good morning. I've reviewed your preliminary deck for ${name}. Let's get straight into it. Start by pitching me the core problem you solve and why existing alternatives are failing.`
  },
  angel_investor: {
    name: 'Elena Rostova',
    title: 'Founding Angel & Former Unicorn COO',
    firm: 'Syndicate Angel Network',
    description: 'Passionate about founder tenacity, customer obsession, product intuition, and early market resonance.',
    toneDescription: 'Encouraging yet sharp, curious about vision and founder-market fit.',
    avatarGender: 'female',
    welcomeTemplate: (name) =>
      `Hi there! Delighted to connect with the team behind ${name}. I love early-stage boldness. Tell me the origin story—what personal insight made you start this venture?`
  },
  aggressive_investor: {
    name: 'Vikram Singhania',
    title: 'Senior Partner',
    firm: 'Redline Growth Capital',
    description: 'High pressure, rapid-fire cross-examination. Tests founder conviction, valuation sanity, and execution grit.',
    toneDescription: 'Challenging, impatient, probing every weakness and competitive blind spot.',
    avatarGender: 'male',
    welcomeTemplate: (name) =>
      `Alright, I have exactly 10 minutes. Pitch me ${name}. Don't give me buzzwords—tell me why this isn't just a weekend project that Google or an incumbent will crush tomorrow.`
  },
  corporate_investor: {
    name: 'Dr. Sophia Chen',
    title: 'Director of Strategic Innovation',
    firm: 'Global Enterprise Ventures',
    description: 'Evaluates enterprise integration, regulatory landscape, distribution partnerships, and proprietary IP.',
    toneDescription: 'Strategic, methodical, focused on enterprise scale and structural defensibility.',
    avatarGender: 'female',
    welcomeTemplate: (name) =>
      `Welcome. At Enterprise Ventures, we look for solutions that can integrate into large-scale ecosystems. How does ${name} build lasting technological barriers to entry?`
  }
};

export interface ContextualReply {
  keywords: string[];
  investorReplies: Record<InvestorPersonality, string>;
  questionType: InvestorMessage['questionType'];
}

export const CONTEXTUAL_INVESTOR_REACTIONS: ContextualReply[] = [
  {
    keywords: ['user', 'users', 'download', 'downloads', 'signup', 'signups'],
    questionType: 'metrics',
    investorReplies: {
      analytical_vc: "You cited user numbers, but what does the cohort retention curve look like at Month 3? How many are monthly active versus dormant signups?",
      angel_investor: "That is encouraging user interest! How did your first 100 users discover you? Was it purely organic word-of-mouth?",
      aggressive_investor: "Raw user signups mean nothing in today's market. How many are actually paying, and what is your customer acquisition cost?",
      corporate_investor: "Regarding those user touchpoints, what is the data privacy footprint and how do you ensure security at that scale?"
    }
  },
  {
    keywords: ['revenue', 'mrr', 'arr', 'pricing', 'dollar', 'dollars', 'rupee', 'rupees', 'paying', 'monetiz'],
    questionType: 'financials',
    investorReplies: {
      analytical_vc: "Walk me through your unit economics. What is your Gross Margin, and what is your current CAC payback period in months?",
      angel_investor: "It's great to see early monetization signals. What was the customer reaction when you first asked them to pull out their credit card?",
      aggressive_investor: "Your margins look thin for a venture-backed tech model. Why should I believe this scales profitably rather than burning cash forever?",
      corporate_investor: "How scalable is your enterprise contract value, and what is the typical sales cycle length for these paying accounts?"
    }
  },
  {
    keywords: ['competitor', 'competitors', 'competition', 'alternative', 'incumbent', 'market leader'],
    questionType: 'competitors',
    investorReplies: {
      analytical_vc: "Your competitors have ten times your engineering budget. What is your proprietary defensibility or unique data network effect that protects you?",
      angel_investor: "Competitors validate the market opportunity! But what makes your users fall in love with your solution specifically over them?",
      aggressive_investor: "If the category leader adds this as a free feature next Tuesday, how does your company survive?",
      corporate_investor: "Are there patent filings or proprietary algorithms that prevent standard reverse-engineering by incumbents?"
    }
  },
  {
    keywords: ['market', 'tam', 'billion', 'million', 'industry', 'expand', 'growth'],
    questionType: 'market',
    investorReplies: {
      analytical_vc: "Top-down TAM estimates can be deceptively optimistic. What is your bottom-up addressable market calculation based on target price times target buyers?",
      angel_investor: "That is an ambitious market horizon. What is your immediate beachhead niche before expanding to the broader ocean?",
      aggressive_investor: "Every pitch deck shows a multi-billion dollar market. Why hasn't someone already dominated this sector if it's so lucrative?",
      corporate_investor: "What regulatory hurdles or compliance standards dictate how fast this market can realistically adopt your tech?"
    }
  },
  {
    keywords: ['fund', 'funding', 'raise', 'raising', 'capital', 'seed', 'pre-seed', 'investment', 'runway', 'burn'],
    questionType: 'financials',
    investorReplies: {
      analytical_vc: "If we give you this round, what specific milestone or de-risking metric does this purchase that guarantees an up-round in 18 months?",
      angel_investor: "How long of a runway does this give you, and what are the key team hires you need to make first?",
      aggressive_investor: "Are you raising too much or too little? What happens if market conditions tighten and you don't hit the next round?",
      corporate_investor: "How will this capital be allocated between core R&D versus customer acquisition and channel partner enablement?"
    }
  },
  {
    keywords: ['ai', 'model', 'llm', 'machine learning', 'algorithm', 'tech', 'software'],
    questionType: 'problem',
    investorReplies: {
      analytical_vc: "Are you training proprietary foundation models, or are you essentially a wrapper around commercial APIs with a pretty interface?",
      angel_investor: "AI moves blisteringly fast. How are you designing the user workflow so the AI feels magical and seamless rather than gimmicky?",
      aggressive_investor: "API wrappers get commoditized in months. Where is your real technological IP and proprietary training data?",
      corporate_investor: "How do you manage latency, token costs at enterprise scale, and hallucination liabilities with corporate clients?"
    }
  }
];

export const FALLBACK_QUESTION_QUEUE: string[] = [
  "Can you quantify the exact return on investment or time-savings your customer experiences?",
  "What is the single biggest bottleneck preventing your business from 10x-ing over the next year?",
  "Tell me about the core team. Why are you and your co-founders uniquely qualified to win this specific space?",
  "If your primary acquisition channel gets shut down tomorrow, what is your secondary distribution hedge?",
  "What feedback from churned or hesitant customers surprised you the most, and how did you adjust the product roadmap?"
];
