// apps/web/src/types/portfolio.ts
export interface Startup {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  industry?: string;
  stage: StartupStage;
  status: StartupStatus;
  squad: {
    lead: TeamMember;
    members: TeamMember[];
  };
  resources: {
    deck?: string;
    demo?: string;
    repository?: string;
    documentation?: string;
  };
  documents: Document[];
  metrics: Metric[];
  kpis: KPI[];
  timeline: TimelineEvent[];
  activityLog: ActivityLog[];
  milestones: Milestone[];
  keyDates?: {
    foundedDate?: Date;
    incorporationDate?: Date;
    firstRevenue?: Date;
    breakEven?: Date;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum StartupStage {
  IDEA = 'idea',
  VALIDATION = 'validation',
  PMF = 'pmf',
  GROWTH = 'growth',
  SCALE = 'scale'
}

export enum StartupStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  ARCHIVED = 'archived'
}

export interface Document {
  name: string;
  url: string;
  type: DocumentType;
  description?: string;
  uploadedAt: Date;
  uploadedBy: string;
  size?: number;
  mimeType?: string;
}

export enum DocumentType {
  PITCH_DECK = 'pitch_deck',
  BUSINESS_PLAN = 'business_plan',
  FINANCIAL_MODEL = 'financial_model',
  LEGAL = 'legal',
  TECHNICAL = 'technical',
  OTHER = 'other'
}

export interface Metric {
  name: string;
  value: number;
  unit: string;
  target?: number;
  previousValue?: number;
  recordedAt: Date;
  category?: string;
}

export interface TimelineEvent {
  stage: string;
  date: Date;
  description?: string;
  milestone?: string;
}

export interface ActivityLog {
  action: string;
  description: string;
  userName: string;
  changes?: Record<string, any>;
  timestamp: Date;
}

export interface Milestone {
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  completedAt?: Date;
  category?: string;
}

export interface PipelineStage {
  stage: StartupStage;
  count: number;
  startups: Array<{
    id: string;
    name: string;
    slug: string;
    logo?: string;
    mainKpi: KPI | null;
    revenue: number;
  }>;
}