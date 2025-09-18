// apps/web/src/services/dashboard.service.ts
import { apiService } from './api';

export interface DashboardMetrics {
  date: string;
  startups: {
    total: number;
    active: number;
    paused: number;
    archived: number;
    byStage: {
      idea: number;
      validation: number;
      pmf: number;
      growth: number;
      scale: number;
    };
  };
  financials: {
    totalRevenue: number;
    totalCosts: number;
    netIncome: number;
    burnRate: number;
    runway: number;
    mrr: number;
    arr: number;
  };
  team: {
    totalMembers: number;
    activeMembers: number;
    utilizationRate: number;
    availableCapacity: number;
  };
  users: {
    totalUsers: number;
    activeUsers: number;
    averageNPS: number;
    churnRate: number;
  };
  okrs: {
    totalObjectives: number;
    completedObjectives: number;
    averageProgress: number;
    onTrack: number;
    atRisk: number;
    behind: number;
  };
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'critical' | 'success';
  title: string;
  message: string;
  timestamp: string;
  category: string;
}

export interface ExecutiveSummary {
  metrics: {
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
  };
  alerts: Alert[];
  recentActivity: any[];
  topPerformers: any[];
}

export interface DashboardFilters {
  startDate?: string;
  endDate?: string;
  modules?: string[];
  timeRange?: string;
}

class DashboardService {
  // Obtener resumen ejecutivo
  async getExecutiveSummary(filters?: DashboardFilters): Promise<ExecutiveSummary> {
    try {
      return await apiService.get<ExecutiveSummary>('/api/dashboard/executive-summary', filters);
    } catch (error) {
      console.error('Failed to fetch executive summary:', error);
      // Return mock data as fallback
      return this.getMockExecutiveSummary();
    }
  }

  // Obtener métricas del dashboard
  async getMetrics(filters?: DashboardFilters): Promise<DashboardMetrics> {
    try {
      return await apiService.get<DashboardMetrics>('/api/dashboard/metrics', filters);
    } catch (error) {
      console.error('Failed to fetch dashboard metrics:', error);
      // Return mock data as fallback
      return this.getMockMetrics();
    }
  }

  // Obtener alertas activas
  async getAlerts(): Promise<Alert[]> {
    try {
      return await apiService.get<Alert[]>('/api/dashboard/alerts');
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
      // Return mock data as fallback
      return this.getMockAlerts();
    }
  }

  // Crear nueva alerta
  async createAlert(alertData: Partial<Alert>): Promise<Alert> {
    try {
      return await apiService.post<Alert>('/api/dashboard/alerts', alertData);
    } catch (error) {
      console.error('Failed to create alert:', error);
      throw error;
    }
  }

  // Descartar alerta
  async dismissAlert(alertId: string): Promise<Alert> {
    try {
      return await apiService.patch<Alert>(`/api/dashboard/alerts/${alertId}/dismiss`);
    } catch (error) {
      console.error('Failed to dismiss alert:', error);
      throw error;
    }
  }

  // Calcular métricas manualmente
  async calculateMetrics(): Promise<{ message: string }> {
    try {
      return await apiService.post<{ message: string }>('/api/dashboard/metrics/calculate');
    } catch (error) {
      console.error('Failed to calculate metrics:', error);
      throw error;
    }
  }

  // Mock data methods (fallback when API is not available)
  private getMockExecutiveSummary(): ExecutiveSummary {
    return {
      metrics: {
        startups: {
          total: 25,
          active: 20,
          weeklyGrowth: 8.5
        },
        revenue: {
          current: 450000,
          mrr: 37500,
          growth: 15.2
        },
        burnRate: {
          current: 25000,
          runway: 18,
          trend: 'down'
        },
        team: {
          total: 85,
          utilization: 75
        }
      },
      alerts: this.getMockAlerts(),
      recentActivity: [
        {
          id: '1',
          type: 'startup_created',
          title: 'Nueva Startup Creada',
          description: 'EcoTech Solutions fue agregada al portafolio',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          category: 'portfolio'
        },
        {
          id: '2',
          type: 'metric_improvement',
          title: 'Mejora en Retención',
          description: 'FinanceAI aumentó su retención al 92%',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          category: 'metrics'
        }
      ],
      topPerformers: [
        {
          id: '1',
          name: 'FinanceAI',
          metric: 'Revenue',
          value: 125000,
          change: 15.2
        },
        {
          id: '2',
          name: 'EcoTech Solutions',
          metric: 'Users',
          value: 8500,
          change: 22.1
        }
      ]
    };
  }

  private getMockMetrics(): DashboardMetrics {
    return {
      date: new Date().toISOString(),
      startups: {
        total: 25,
        active: 20,
        paused: 3,
        archived: 2,
        byStage: {
          idea: 5,
          validation: 8,
          pmf: 4,
          growth: 6,
          scale: 2
        }
      },
      financials: {
        totalRevenue: 450000,
        totalCosts: 320000,
        netIncome: 130000,
        burnRate: 25000,
        runway: 18,
        mrr: 37500,
        arr: 450000
      },
      team: {
        totalMembers: 85,
        activeMembers: 78,
        utilizationRate: 75,
        availableCapacity: 25
      },
      users: {
        totalUsers: 12500,
        activeUsers: 8900,
        averageNPS: 8.2,
        churnRate: 5.2
      },
      okrs: {
        totalObjectives: 24,
        completedObjectives: 18,
        averageProgress: 78,
        onTrack: 15,
        atRisk: 6,
        behind: 3
      }
    };
  }

  private getMockAlerts(): Alert[] {
    return [
      {
        id: '1',
        type: 'critical',
        title: 'Presupuesto Excedido',
        message: 'Departamento de Engineering superó el presupuesto mensual en 12%',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        category: 'financial'
      },
      {
        id: '2',
        type: 'warning',
        title: 'Objetivo En Riesgo',
        message: 'Objetivo de satisfacción empleados por debajo del 85%',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        category: 'objectives'
      },
      {
        id: '3',
        type: 'success',
        title: 'Onboarding Completado',
        message: 'Ana García completó el proceso de onboarding',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        category: 'hr'
      }
    ];
  }
}

export const dashboardService = new DashboardService();
export default dashboardService;