export type InvestorPersonality =
  | 'analytical_vc'
  | 'angel_investor'
  | 'aggressive_investor'
  | 'corporate_investor';

export type SessionDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface InvestorProfile {
  id: InvestorPersonality;
  name: string;
  title: string;
  firm: string;
  avatarConfigId: string;
  description: string;
  focusAreas: string[];
  toneDescription: string;
  avatarGender: 'male' | 'female';
}

export interface InvestorMessage {
  id: string;
  role: 'investor' | 'user';
  text: string;
  timestamp: number;
  questionType?: 'problem' | 'market' | 'metrics' | 'competitors' | 'financials' | 'team' | 'general';
  confidenceScore?: number;
}
