// apps/web/src/services/dashboard.service.ts
import { apiClient } from '@/lib/api/client';

export interface DashboardFilters {
  startDate?: string;
  endDate?: string;
  startupIds?: string[];
  period?: string;
}

export const dashboardService = {
  // Get executive summary
  async getExecutiveSummary(filters?: DashboardFilters) {
    const params = new URLSearchParams();
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.startupIds?.length) {
      params.append('startupIds', filters.startupIds.join(','));
    }
    if (filters?.period) params.append('period', filters.period);
    
    return apiClient.get(`/api/dashboard/executive-summary?${params}`);
  },

  // Get metrics
  async getMetrics(filters: DashboardFilters) {
    const params = new URLSearchParams();
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.period) params.append('period', filters.period);
    
    return apiClient.get(`/api/dashboard/metrics?${params}`);
  },

  // Get alerts
  async getAlerts() {
    return apiClient.get('/api/dashboard/alerts');
  },

  // Dismiss alert
  async dismissAlert(alertId: string) {
    return apiClient.patch(`/api/dashboard/alerts/${alertId}/dismiss`);
  },

  // Force metrics calculation
  async calculateMetrics() {
    return apiClient.post('/api/dashboard/metrics/calculate');
  }
};