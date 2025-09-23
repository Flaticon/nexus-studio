export interface AIProvider {
  name: string;
  generateText(prompt: string, context?: any): Promise<string>;
  generateInsights(data: any): Promise<BaseAIInsight[]>;
  analyzeStartup(startupData: any): Promise<StartupAnalysis>;
}

export interface BaseAIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'trend' | 'prediction';
  title: string;
  description: string;
  confidence: number; // 0-1
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionable: boolean;
  recommendations: string[];
  data?: any;
  createdAt: Date;
}

export interface AIInsight extends BaseAIInsight {
  userId?: string;
  startupId?: string;
  source: string; // 'openai', 'anthropic', 'internal'
  isRead: boolean;
  isArchived: boolean;
  tags: string[];
}

export interface StartupAnalysis {
  overallScore: number; // 0-100
  successProbability: number; // 0-1
  riskFactors: RiskFactor[];
  opportunities: Opportunity[];
  marketTrends: MarketTrend[];
  recommendations: Recommendation[];
  nextSteps: string[];
}

export interface RiskFactor {
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact: number; // 0-1
  likelihood: number; // 0-1
  mitigation: string[];
}

export interface Opportunity {
  type: string;
  description: string;
  potential: number; // 0-1
  timeframe: 'short' | 'medium' | 'long';
  requirements: string[];
}

export interface MarketTrend {
  category: string;
  trend: string;
  direction: 'up' | 'down' | 'stable';
  impact: number; // 0-1
  timeframe: string;
}

export interface Recommendation {
  category: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  effort: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  timeline: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: any;
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  messages: ChatMessage[];
  context: any;
  createdAt: Date;
  updatedAt: Date;
}