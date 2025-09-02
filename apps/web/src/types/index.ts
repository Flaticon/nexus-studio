// apps/web/src/types/index.ts
export interface Startup {
  _id: string;
  name: string;
  slug: string;
  stage: 'idea' | 'validation' | 'pmf' | 'growth' | 'scale';
  squad: {
    lead: string;
    members: string[];
  };
  resources: {
    deck?: string;
    demo?: string;
    repository?: string;
  };
  kpis: KPI[];
  status: 'active' | 'paused' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface KPI {
  name: string;
  current: number;
  target: number;
  unit: string;
  lastUpdated: Date;
}

export interface TeamMember {
  _id: string;
  email: string;
  profile: {
    name: string;
    avatar?: string;
    role: string;
    department: string;
  };
  skills: string[];
  availability: number;
  currentProjects: ProjectAllocation[];
  status: 'active' | 'inactive';
}

export interface ProjectAllocation {
  startupId: string;
  role: string;
  allocation: number;
}

export interface FinancialRecord {
  _id: string;
  startupId: string;
  month: Date;
  revenue: {
    total: number;
    breakdown: Array<{
      source: string;
      amount: number;
    }>;
  };
  costs: {
    total: number;
    breakdown: Array<{
      category: string;
      amount: number;
    }>;
  };
  burnRate: number;
  runway: number;
}