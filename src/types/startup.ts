export interface StartupContext {
  id?: string;
  name: string;
  oneLinePitch: string;
  problem: string;
  solution: string;
  targetCustomer: string;
  marketSize: string;
  businessModel: string;
  competitors: string;
  traction: string;
  revenue: string;
  fundingRequired: string;
  useOfFunds: string;
}

export type MaterialCategory = 'pitch_deck' | 'business_plan' | 'financials' | 'additional';

export interface StartupMaterial {
  id: string;
  name: string;
  size: number;
  type: string;
  category: MaterialCategory;
  uploadDate: string;
  status: 'uploading' | 'ready' | 'error';
  url?: string;
}
