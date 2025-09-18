// apps/web/src/hooks/useAnalytics.ts
import { useState, useEffect } from 'react';
import {
  analyticsService,
  type AnalyticsData,
  type AnalyticsFilters,
  type Prediction,
  type Insight
} from '../services/analytics.service';

export const useAnalytics = (filters?: AnalyticsFilters) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await analyticsService.getAnalyticsData(filters);
      setAnalyticsData(data);
    } catch (err) {
      console.error('Error loading analytics data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [JSON.stringify(filters)]);

  const getPerformanceTrends = async (dateRange: string = '6m') => {
    try {
      return await analyticsService.getPerformanceTrends(dateRange);
    } catch (err) {
      console.error('Error getting performance trends:', err);
      throw err;
    }
  };

  const getStartupMetrics = async (startupIds?: string[]) => {
    try {
      return await analyticsService.getStartupMetrics(startupIds);
    } catch (err) {
      console.error('Error getting startup metrics:', err);
      throw err;
    }
  };

  const getCohortAnalysis = async (timeRange: string = '6m') => {
    try {
      return await analyticsService.getCohortAnalysis(timeRange);
    } catch (err) {
      console.error('Error getting cohort analysis:', err);
      throw err;
    }
  };

  const getMarketAnalysis = async () => {
    try {
      return await analyticsService.getMarketAnalysis();
    } catch (err) {
      console.error('Error getting market analysis:', err);
      throw err;
    }
  };

  const getPredictions = async (): Promise<Prediction[]> => {
    try {
      return await analyticsService.getPredictions();
    } catch (err) {
      console.error('Error getting predictions:', err);
      throw err;
    }
  };

  const getInsights = async (): Promise<Insight[]> => {
    try {
      return await analyticsService.getInsights();
    } catch (err) {
      console.error('Error getting insights:', err);
      throw err;
    }
  };

  const generateCustomReport = async (config: any) => {
    try {
      return await analyticsService.generateCustomReport(config);
    } catch (err) {
      console.error('Error generating custom report:', err);
      throw err;
    }
  };

  const exportAnalytics = async (format: 'csv' | 'xlsx' | 'pdf') => {
    try {
      const blob = await analyticsService.exportAnalytics(format, filters);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analytics-report.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting analytics:', err);
      throw err;
    }
  };

  const getRealTimeMetrics = async () => {
    try {
      return await analyticsService.getRealTimeMetrics();
    } catch (err) {
      console.error('Error getting real-time metrics:', err);
      throw err;
    }
  };

  const configureMetricAlert = async (config: {
    metric: string;
    threshold: number;
    operator: 'greater' | 'less' | 'equal';
    notification: string;
  }) => {
    try {
      return await analyticsService.configureMetricAlert(config);
    } catch (err) {
      console.error('Error configuring metric alert:', err);
      throw err;
    }
  };

  return {
    analyticsData,
    loading,
    error,
    getPerformanceTrends,
    getStartupMetrics,
    getCohortAnalysis,
    getMarketAnalysis,
    getPredictions,
    getInsights,
    generateCustomReport,
    exportAnalytics,
    getRealTimeMetrics,
    configureMetricAlert,
    reload: loadData
  };
};