// apps/web/src/hooks/useFinance.ts
import { useState, useEffect } from 'react';
import {
  financeService,
  type FinancialData,
  type MonthlyTrend,
  type FinancialMetrics,
  type FinancialFilters
} from '../services/finance.service';

export const useFinance = (filters?: FinancialFilters) => {
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [monthlyTrends, setMonthlyTrends] = useState<MonthlyTrend[]>([]);
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [data, trends, consolidatedMetrics] = await Promise.all([
        financeService.getFinancialData(filters),
        financeService.getMonthlyTrends(),
        financeService.getConsolidatedMetrics()
      ]);

      setFinancialData(data);
      setMonthlyTrends(trends);
      setMetrics(consolidatedMetrics);
    } catch (err) {
      console.error('Error loading financial data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load financial data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [JSON.stringify(filters)]);

  const updateStartupFinancials = async (startupId: string, data: Partial<FinancialData>) => {
    try {
      await financeService.updateStartupFinancials(startupId, data);
      await loadData(); // Refresh data
    } catch (err) {
      console.error('Error updating startup financials:', err);
      throw err;
    }
  };

  const exportReport = async (format: 'csv' | 'xlsx' | 'pdf') => {
    try {
      const blob = await financeService.exportFinancialReport(format, filters);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `financial-report.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting report:', err);
      throw err;
    }
  };

  return {
    financialData,
    monthlyTrends,
    metrics,
    loading,
    error,
    updateStartupFinancials,
    exportReport,
    reload: loadData
  };
};