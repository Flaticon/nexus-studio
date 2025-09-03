// apps/web/src/lib/hooks/useDashboard.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard.service';
import { useDashboardStore } from '@/lib/store/dashboard.store';

export function useExecutiveSummary() {
  const { dateRange, selectedStartups, period } = useDashboardStore();
  
  return useQuery({
    queryKey: ['dashboard', 'executive-summary', dateRange, selectedStartups, period],
    queryFn: () => dashboardService.getExecutiveSummary({
      startDate: dateRange.start?.toISOString(),
      endDate: dateRange.end?.toISOString(),
      startupIds: selectedStartups,
      period
    }),
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000 // Consider data stale after 30 seconds
  });
}

export function useMetrics() {
  const { dateRange, period } = useDashboardStore();
  
  return useQuery({
    queryKey: ['dashboard', 'metrics', dateRange, period],
    queryFn: () => dashboardService.getMetrics({
      startDate: dateRange.start?.toISOString(),
      endDate: dateRange.end?.toISOString(),
      period
    }),
    staleTime: 60000
  });
}

export function useAlerts() {
  return useQuery({
    queryKey: ['dashboard', 'alerts'],
    queryFn: dashboardService.getAlerts,
    refetchInterval: 30000 // Check for new alerts every 30 seconds
  });
}

export function useDismissAlert() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: dashboardService.dismissAlert,
    onSuccess: () => {
      // Invalidate alerts query to refetch
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'alerts'] });
    }
  });
}