// apps/web/src/lib/store/dashboard.store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DashboardState {
  // Filters
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  selectedStartups: string[];
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  
  // UI State
  isLoading: boolean;
  refreshInterval: number;
  
  // Actions
  setDateRange: (start: Date | null, end: Date | null) => void;
  setSelectedStartups: (startups: string[]) => void;
  setPeriod: (period: 'day' | 'week' | 'month' | 'quarter' | 'year') => void;
  setLoading: (isLoading: boolean) => void;
  setRefreshInterval: (interval: number) => void;
  resetFilters: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    (set) => ({
      // Initial state
      dateRange: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        end: new Date()
      },
      selectedStartups: [],
      period: 'week',
      isLoading: false,
      refreshInterval: 60000, // 1 minute
      
      // Actions
      setDateRange: (start, end) => set({ 
        dateRange: { start, end } 
      }),
      setSelectedStartups: (startups) => set({ 
        selectedStartups: startups 
      }),
      setPeriod: (period) => set({ period }),
      setLoading: (isLoading) => set({ isLoading }),
      setRefreshInterval: (interval) => set({ 
        refreshInterval: interval 
      }),
      resetFilters: () => set({
        dateRange: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          end: new Date()
        },
        selectedStartups: [],
        period: 'week'
      })
    }),
    { name: 'dashboard-store' }
  )
);