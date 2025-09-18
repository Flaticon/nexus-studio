// apps/web/src/services/finance.service.ts
import { apiService } from './api';

export interface FinancialData {
  id: string;
  startupName: string;
  revenue: number;
  expenses: number;
  burnRate: number;
  runway: number;
  stage: string;
  lastUpdate: string;
}

export interface MonthlyTrend {
  month: string;
  revenue: number;
  expenses: number;
  netIncome: number;
  burnRate?: number;
  runway?: number;
}

export interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
  icon: string;
}

export interface FinancialFilters {
  startups?: string[];
  stages?: string[];
  revenueRange?: { min: number; max: number };
  runwayRange?: { min: number; max: number };
  showOnlyProfitable?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  timeRange?: string;
}

export interface FinancialMetrics {
  totalRevenue: number;
  totalExpenses: number;
  totalBurnRate: number;
  avgRunway: number;
  profitableStartups: number;
  growthRate: number;
}

class FinanceService {
  // Obtener datos financieros de todas las startups
  async getFinancialData(filters?: FinancialFilters): Promise<FinancialData[]> {
    try {
      return await apiService.get<FinancialData[]>('/api/finance', filters);
    } catch (error) {
      console.error('Failed to fetch financial data:', error);
      return this.getMockFinancialData();
    }
  }

  // Obtener tendencias mensuales
  async getMonthlyTrends(timeRange: string = '6m'): Promise<MonthlyTrend[]> {
    try {
      return await apiService.get<MonthlyTrend[]>('/api/finance/trends', { timeRange });
    } catch (error) {
      console.error('Failed to fetch monthly trends:', error);
      return this.getMockMonthlyTrends();
    }
  }

  // Obtener distribución de gastos
  async getExpenseDistribution(): Promise<ExpenseCategory[]> {
    try {
      return await apiService.get<ExpenseCategory[]>('/api/finance/expenses/distribution');
    } catch (error) {
      console.error('Failed to fetch expense distribution:', error);
      return this.getMockExpenseDistribution();
    }
  }

  // Obtener métricas financieras consolidadas
  async getConsolidatedMetrics(): Promise<FinancialMetrics> {
    try {
      return await apiService.get<FinancialMetrics>('/api/finance/metrics');
    } catch (error) {
      console.error('Failed to fetch consolidated metrics:', error);
      return this.getMockConsolidatedMetrics();
    }
  }

  // Obtener datos financieros de una startup específica
  async getStartupFinancials(startupId: string): Promise<FinancialData> {
    try {
      return await apiService.get<FinancialData>(`/api/finance/startup/${startupId}`);
    } catch (error) {
      console.error('Failed to fetch startup financials:', error);
      throw error;
    }
  }

  // Actualizar datos financieros de una startup
  async updateStartupFinancials(startupId: string, data: Partial<FinancialData>): Promise<FinancialData> {
    try {
      return await apiService.put<FinancialData>(`/api/finance/startup/${startupId}`, data);
    } catch (error) {
      console.error('Failed to update startup financials:', error);
      throw error;
    }
  }

  // Exportar reporte financiero
  async exportFinancialReport(format: 'csv' | 'xlsx' | 'pdf', filters?: FinancialFilters): Promise<Blob> {
    try {
      const response = await fetch(`${apiService['baseURL']}/api/finance/export?format=${format}`, {
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
      console.error('Failed to export financial report:', error);
      throw error;
    }
  }

  // Obtener proyecciones financieras
  async getFinancialProjections(startupId?: string): Promise<any> {
    try {
      const endpoint = startupId
        ? `/api/finance/projections/${startupId}`
        : '/api/finance/projections';
      return await apiService.get(endpoint);
    } catch (error) {
      console.error('Failed to fetch financial projections:', error);
      return this.getMockProjections();
    }
  }

  // Mock data para desarrollo
  private getMockFinancialData(): FinancialData[] {
    return [
      {
        id: "1",
        startupName: "EcoTech Solutions",
        revenue: 45000,
        expenses: 32000,
        burnRate: -12000,
        runway: 18,
        stage: "validation",
        lastUpdate: "2025-08-01",
      },
      {
        id: "2",
        startupName: "FinanceAI",
        revenue: 85000,
        expenses: 55000,
        burnRate: -8000,
        runway: 24,
        stage: "pmf",
        lastUpdate: "2025-08-01",
      },
      {
        id: "3",
        startupName: "HealthTracker",
        revenue: 12000,
        expenses: 25000,
        burnRate: -15000,
        runway: 8,
        stage: "idea",
        lastUpdate: "2025-08-01",
      },
    ];
  }

  private getMockMonthlyTrends(): MonthlyTrend[] {
    return [
      { month: "Mar", revenue: 98000, expenses: 112000, netIncome: -14000, burnRate: -35000, runway: 16 },
      { month: "Abr", revenue: 105000, expenses: 108000, netIncome: -3000, burnRate: -32000, runway: 17 },
      { month: "May", revenue: 118000, expenses: 115000, netIncome: 3000, burnRate: -30000, runway: 18 },
      { month: "Jun", revenue: 125000, expenses: 118000, netIncome: 7000, burnRate: -28000, runway: 19 },
      { month: "Jul", revenue: 132000, expenses: 120000, netIncome: 12000, burnRate: -26000, runway: 20 },
      { month: "Ago", revenue: 142000, expenses: 112000, netIncome: 30000, burnRate: -24000, runway: 21 },
    ];
  }

  private getMockExpenseDistribution(): ExpenseCategory[] {
    return [
      { name: "Personal", value: 65000, color: "#8B5CF6", icon: "👥" },
      { name: "Marketing", value: 25000, color: "#10B981", icon: "📢" },
      { name: "Infraestructura", value: 35000, color: "#F59E0B", icon: "🏢" },
      { name: "Legal/Admin", value: 15000, color: "#EF4444", icon: "💼" },
      { name: "I+D", value: 45000, color: "#3B82F6", icon: "🔬" },
    ];
  }

  private getMockConsolidatedMetrics(): FinancialMetrics {
    return {
      totalRevenue: 142000,
      totalExpenses: 112000,
      totalBurnRate: -35000,
      avgRunway: 17,
      profitableStartups: 2,
      growthRate: 18.5
    };
  }

  private getMockProjections(): any {
    return {
      months: ['Sep', 'Oct', 'Nov', 'Dec', 'Ene', 'Feb'],
      scenarios: {
        conservative: {
          revenue: [145000, 150000, 155000, 160000, 165000, 170000],
          expenses: [115000, 118000, 120000, 122000, 125000, 128000]
        },
        optimistic: {
          revenue: [155000, 165000, 175000, 185000, 195000, 205000],
          expenses: [112000, 115000, 118000, 120000, 123000, 125000]
        },
        pessimistic: {
          revenue: [135000, 138000, 140000, 142000, 145000, 148000],
          expenses: [118000, 122000, 125000, 128000, 130000, 132000]
        }
      }
    };
  }
}

export const financeService = new FinanceService();
export default financeService;