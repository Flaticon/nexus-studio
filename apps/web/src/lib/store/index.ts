// apps/web/src/lib/store/index.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StudioStore {
  // User state
  user: any | null;
  setUser: (user: any) => void;
  
  // Selected startup
  selectedStartup: string | null;
  setSelectedStartup: (id: string | null) => void;
  
  // UI state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  
  // Filters
  filters: {
    stage: string[];
    status: string[];
  };
  setFilters: (filters: any) => void;
}

export const useStudioStore = create<StudioStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        
        selectedStartup: null,
        setSelectedStartup: (id) => set({ selectedStartup: id }),
        
        sidebarOpen: true,
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        
        filters: {
          stage: [],
          status: ['active']
        },
        setFilters: (filters) => set({ filters })
      }),
      {
        name: 'studio-storage'
      }
    )
  )
);