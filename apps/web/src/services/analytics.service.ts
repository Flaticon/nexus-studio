// apps/web/src/services/analytics.service.ts
import { apiService } from './api';

export interface AnalyticsTrend {
  month: string;
  revenue: number;
  users: number;
  retention: number;
  nps: number;
  burnRate: number;
}

export interface StartupMetric {
  name: string;
  revenue: number;
  users: number;
  growth: number;
  retention: number;
  ltv: number;
  cac: number;
  stage: string;
  color: string;
}

export interface CohortData {
  cohort: string;
  month0: number;
  month1: number;
  month2: number;
  month3: number;
  month4: number;
  month5: number;
}

export interface MarketSegment {
  name: string;
  value: number;
  growth: number;
  color: string;
}

export interface CompetitorData {
  competitor: string;
  marketShare: number;
  revenue: number;
}

export interface Prediction {
  metric: string;
  current: number;
  predicted: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  insight: string;
}

export interface Insight {
  id: number;
  type: 'opportunity' | 'risk' | 'trend';
  title: string;
  description: string;
  impact: 'Low' | 'Medium' | 'High';
  confidence: number;
  recommendations: string[];
}

export interface AnalyticsData {
  trends: AnalyticsTrend[];
  startupMetrics: StartupMetric[];
  cohortData: CohortData[];
  marketData: {
    segments: MarketSegment[];
    competitive: CompetitorData[];
  };
  predictions: Prediction[];
  insights: Insight[];
}

export interface AnalyticsFilters {
  dateRange?: string;
  startups?: string[];
  metrics?: string[];
  viewMode?: string;
}

class AnalyticsService {
  // Obtener todos los datos de analytics
  async getAnalyticsData(filters?: AnalyticsFilters): Promise<AnalyticsData> {
    try {
      return await apiService.get<AnalyticsData>('/api/analytics', filters);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
      return this.getMockAnalyticsData();
    }
  }

  // Obtener tendencias de performance
  async getPerformanceTrends(dateRange: string = '6m'): Promise<AnalyticsTrend[]> {
    try {
      return await apiService.get<AnalyticsTrend[]>('/api/analytics/trends', { dateRange });
    } catch (error) {
      console.error('Failed to fetch performance trends:', error);
      return this.getMockAnalyticsData().trends;
    }
  }

  // Obtener métricas por startup
  async getStartupMetrics(startupIds?: string[]): Promise<StartupMetric[]> {
    try {
      return await apiService.get<StartupMetric[]>('/api/analytics/startups', { startupIds });
    } catch (error) {
      console.error('Failed to fetch startup metrics:', error);
      return this.getMockAnalyticsData().startupMetrics;
    }
  }

  // Obtener análisis de cohortes
  async getCohortAnalysis(timeRange: string = '6m'): Promise<CohortData[]> {
    try {
      return await apiService.get<CohortData[]>('/api/analytics/cohorts', { timeRange });
    } catch (error) {
      console.error('Failed to fetch cohort analysis:', error);
      return this.getMockAnalyticsData().cohortData;
    }
  }

  // Obtener análisis de mercado
  async getMarketAnalysis(): Promise<{ segments: MarketSegment[]; competitive: CompetitorData[] }> {
    try {
      return await apiService.get('/api/analytics/market');
    } catch (error) {
      console.error('Failed to fetch market analysis:', error);
      return this.getMockAnalyticsData().marketData;
    }
  }

  // Obtener predicciones
  async getPredictions(): Promise<Prediction[]> {
    try {
      return await apiService.get<Prediction[]>('/api/analytics/predictions');
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
      return this.getMockAnalyticsData().predictions;
    }
  }

  // Obtener insights inteligentes
  async getInsights(): Promise<Insight[]> {
    try {
      return await apiService.get<Insight[]>('/api/analytics/insights');
    } catch (error) {
      console.error('Failed to fetch insights:', error);
      return this.getMockAnalyticsData().insights;
    }
  }

  // Generar reporte personalizado
  async generateCustomReport(config: any): Promise<any> {
    try {
      return await apiService.post('/api/analytics/custom-report', config);
    } catch (error) {
      console.error('Failed to generate custom report:', error);
      throw error;
    }
  }

  // Exportar datos de analytics
  async exportAnalytics(format: 'csv' | 'xlsx' | 'pdf', filters?: AnalyticsFilters): Promise<Blob> {
    try {
      const response = await fetch(`${apiService['baseURL']}/api/analytics/export?format=${format}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters || {})
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      return await response.blob();
    } catch (error) {
      console.error('Failed to export analytics:', error);
      throw error;
    }
  }

  // Obtener métricas en tiempo real
  async getRealTimeMetrics(): Promise<any> {
    try {
      return await apiService.get('/api/analytics/real-time');
    } catch (error) {
      console.error('Failed to fetch real-time metrics:', error);
      return {
        activeUsers: 1247,
        revenue: 3420,
        conversions: 23,
        lastUpdated: new Date().toISOString()
      };
    }
  }

  // Configurar alertas de métricas
  async configureMetricAlert(config: {
    metric: string;
    threshold: number;
    operator: 'greater' | 'less' | 'equal';
    notification: string;
  }): Promise<any> {
    try {
      return await apiService.post('/api/analytics/alerts', config);
    } catch (error) {
      console.error('Failed to configure metric alert:', error);
      throw error;
    }
  }

  // Mock data para desarrollo
  private getMockAnalyticsData(): AnalyticsData {
    return {
      trends: [
        { month: 'Ene', revenue: 85000, users: 1200, retention: 78, nps: 42, burnRate: -45000 },
        { month: 'Feb', revenue: 92000, users: 1450, retention: 82, nps: 45, burnRate: -43000 },
        { month: 'Mar', revenue: 98000, users: 1680, retention: 85, nps: 48, burnRate: -41000 },
        { month: 'Abr', revenue: 105000, users: 1920, retention: 87, nps: 52, burnRate: -38000 },
        { month: 'May', revenue: 118000, users: 2150, retention: 89, nps: 55, burnRate: -35000 },
        { month: 'Jun', revenue: 142000, users: 2480, retention: 91, nps: 58, burnRate: -32000 }
      ],

      startupMetrics: [
        {
          name: 'EcoTech Solutions',
          revenue: 45000,
          users: 850,
          growth: 23,
          retention: 87,
          ltv: 2400,
          cac: 320,
          stage: 'validation',
          color: '#10B981'
        },
        {
          name: 'FinanceAI',
          users: 1200,
          revenue: 85000,
          growth: 34,
          retention: 92,
          ltv: 4200,
          cac: 450,
          stage: 'pmf',
          color: '#3B82F6'
        },
        {
          name: 'HealthTracker',
          revenue: 12000,
          users: 430,
          growth: 18,
          retention: 76,
          ltv: 1800,
          cac: 280,
          stage: 'idea',
          color: '#8B5CF6'
        }
      ],

      cohortData: [
        { cohort: 'Ene 2024', month0: 100, month1: 85, month2: 72, month3: 65, month4: 58, month5: 52 },
        { cohort: 'Feb 2024', month0: 100, month1: 88, month2: 75, month3: 68, month4: 61, month5: 0 },
        { cohort: 'Mar 2024', month0: 100, month1: 90, month2: 78, month3: 71, month4: 0, month5: 0 },
        { cohort: 'Abr 2024', month0: 100, month1: 92, month2: 81, month3: 0, month4: 0, month5: 0 },
        { cohort: 'May 2024', month0: 100, month1: 89, month2: 0, month3: 0, month4: 0, month5: 0 },
        { cohort: 'Jun 2024', month0: 100, month1: 0, month2: 0, month3: 0, month4: 0, month5: 0 }
      ],

      marketData: {
        segments: [
          { name: 'B2B SaaS', value: 45, growth: 28, color: '#10B981' },
          { name: 'Fintech', value: 35, growth: 42, color: '#3B82F6' },
          { name: 'HealthTech', value: 20, growth: 15, color: '#8B5CF6' }
        ],
        competitive: [
          { competitor: 'Competitor A', marketShare: 32, revenue: 2400000 },
          { competitor: 'Competitor B', marketShare: 28, revenue: 2100000 },
          { competitor: 'Our Portfolio', marketShare: 8, revenue: 600000 },
          { competitor: 'Competitor C', marketShare: 22, revenue: 1650000 },
          { competitor: 'Others', marketShare: 10, revenue: 750000 }
        ]
      },

      predictions: [
        {
          metric: 'Revenue Growth',
          current: 142000,
          predicted: 185000,
          confidence: 87,
          trend: 'up',
          insight: 'Strong Q3 performance expected based on current pipeline'
        },
        {
          metric: 'User Acquisition',
          current: 2480,
          predicted: 3200,
          confidence: 74,
          trend: 'up',
          insight: 'Marketing campaigns showing positive ROI trends'
        },
        {
          metric: 'Burn Rate',
          current: 32000,
          predicted: 28000,
          confidence: 82,
          trend: 'down',
          insight: 'Operational efficiency improvements taking effect'
        }
      ],

      insights: [
        {
          id: 1,
          type: 'opportunity',
          title: 'Revenue Growth Acceleration',
          description: 'FinanceAI showing 34% MoM growth - consider increasing marketing spend',
          impact: 'High',
          confidence: 89,
          recommendations: [
            'Increase marketing budget by 40%',
            'Expand to 2 new market segments',
            'Launch referral program'
          ]
        },
        {
          id: 2,
          type: 'risk',
          title: 'User Retention Concern',
          description: 'HealthTracker retention dropped to 76% - investigate user journey',
          impact: 'Medium',
          confidence: 76,
          recommendations: [
            'Conduct user interviews',
            'Improve onboarding flow',
            'Add engagement features'
          ]
        },
        {
          id: 3,
          type: 'trend',
          title: 'Market Opportunity in B2B',
          description: 'B2B SaaS segment growing 28% - expand EcoTech presence',
          impact: 'High',
          confidence: 92,
          recommendations: [
            'Develop enterprise features',
            'Hire B2B sales team',
            'Partner with system integrators'
          ]
        }
      ]
    };
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;