// apps/web/src/hooks/useDashboard.ts
import { useState, useEffect } from 'react';
import { dashboardService, type ExecutiveSummary, type DashboardFilters } from '../services/dashboard.service';

export const useDashboard = (filters?: DashboardFilters) => {
  const [data, setData] = useState<ExecutiveSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const summary = await dashboardService.getExecutiveSummary(filters);
      setData(summary);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters?.timeRange, JSON.stringify(filters?.modules)]);

  const refresh = async () => {
    await dashboardService.calculateMetrics();
    await loadData();
  };

  const dismissAlert = async (alertId: string) => {
    try {
      await dashboardService.dismissAlert(alertId);
      await loadData(); // Refresh data
    } catch (err) {
      console.error('Error dismissing alert:', err);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refresh,
    dismissAlert,
    reload: loadData
  };
};