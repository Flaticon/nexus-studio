// apps/web/src/types/dashboard.ts
export interface DashboardMetrics {
  startups: {
    total: number;
    active: number;
    weeklyGrowth: number;
  };
  revenue: {
    current: number;
    mrr: number;
    growth: number;
  };
  burnRate: {
    current: number;
    runway: number;
    trend: 'up' | 'down' | 'stable';
  };
  team: {
    total: number;
    utilization: number;
  };
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  isRead?: boolean;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
  user: string;
}

export interface ChartData {
  date: string;
  value: number;
}

export interface TopPerformer {
  id: string;
  name: string;
  metric: string;
  value: number;
  change: number;
}