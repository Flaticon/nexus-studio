// apps/web/src/lib/store/portfolio.store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { StartupStage, StartupStatus } from '@/types/portfolio';

interface PortfolioState {
  // View mode
  viewMode: 'grid' | 'list' | 'kanban' | 'timeline';
  
  // Filters
  filters: {
    stage?: StartupStage;
    status?: StartupStatus;
    tags: string[];
    industry?: string;
    search?: string;
  };
  
  // Selected items
  selectedStartups: string[];
  compareMode: boolean;
  
  // Sorting
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  
  // Actions
  setViewMode: (mode: 'grid' | 'list' | 'kanban' | 'timeline') => void;
  setFilters: (filters: any) => void;
  toggleStartupSelection: (id: string) => void;
  clearSelection: () => void;
  setCompareMode: (enabled: boolean) => void;
  setSorting: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  devtools(
    (set, get) => ({
      // Initial state
      viewMode: 'grid',
      filters: {
        status: StartupStatus.ACTIVE,
        tags: []
      },
      selectedStartups: [],
      compareMode: false,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      
      // Actions
      setViewMode: (mode) => set({ viewMode: mode }),
      
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),
      
      toggleStartupSelection: (id) => set((state) => ({
        selectedStartups: state.selectedStartups.includes(id)
          ? state.selectedStartups.filter(s => s !== id)
          : [...state.selectedStartups, id]
      })),
      
      clearSelection: () => set({ selectedStartups: [] }),
      
      setCompareMode: (enabled) => set({ 
        compareMode: enabled,
        selectedStartups: enabled ? [] : get().selectedStartups
      }),
      
      setSorting: (sortBy, sortOrder) => set({ sortBy, sortOrder })
    }),
    { name: 'portfolio-store' }
  )
);