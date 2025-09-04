// apps/web/src/app/(dashboard)/portfolio/page.tsx
'use client';

import { useState } from 'react';
import { 
  Grid3x3, 
  List, 
  Kanban, 
  Timeline,
  Plus,
  Filter,
  Download,
  BarChart3,
  Search
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { portfolioService } from '@/services/portfolio.service';
import { usePortfolioStore } from '@/lib/store/portfolio.store';
import { KanbanBoard } from '@/components/portfolio/KanbanBoard';
import { StartupGrid } from '@/components/portfolio/StartupGrid';
import { StartupList } from '@/components/portfolio/StartupList';
import { TimelineView } from '@/components/portfolio/TimelineView';
import { ComparisonView } from '@/components/portfolio/ComparisonView';
import { FilterPanel } from '@/components/portfolio/FilterPanel';
import { Button } from '@/components/ui/Button';

export default function PortfolioPage() {
  const { 
    viewMode, 
    setViewMode, 
    filters, 
    selectedStartups,
    compareMode,
    setCompareMode,
    sortBy,
    sortOrder
  } = usePortfolioStore();

  const [showFilters, setShowFilters] = useState(false);
  const [showNewStartupModal, setShowNewStartupModal] = useState(false);

  // Fetch startups
  const { data: portfolioData, isLoading } = useQuery({
    queryKey: ['portfolio', filters, sortBy, sortOrder],
    queryFn: () => portfolioService.getStartups({
      ...filters,
      sortBy,
      sortOrder
    })
  });

  // Fetch statistics
  const { data: stats } = useQuery({
    queryKey: ['portfolio-stats'],
    queryFn: portfolioService.getStatistics
  });

  const handleStageChange = async (startupId: string, newStage: any) => {
    await portfolioService.moveToNextStage(startupId);
    // Refetch data
  };

  const viewIcons = {
    grid: Grid3x3,
    list: List,
    kanban: Kanban,
    timeline: Timeline
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  const startups = portfolioData?.data || [];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Portfolio Management
            </h1>
            <p className="mt-2 text-gray-600">
              {stats?.total || 0} total startups • 
              {stats?.byStatus.active || 0} active • 
              {stats?.byStatus.paused || 0} paused
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            {selectedStartups.length > 1 && (
              <Button
                variant="outline"
                onClick={() => setCompareMode(!compareMode)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Compare ({selectedStartups.length})
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={() => {/* Export logic */}}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <Button
              onClick={() => setShowNewStartupModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Startup
            </Button>
          </div>
        </div>

        {/* View Mode Selector */}
        {!compareMode && (
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-lg shadow-sm border p-1">
              {Object.entries(viewIcons).map(([mode, Icon]) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`
                    p-2 rounded transition-colors
                    ${viewMode === mode 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                  title={mode.charAt(0).toUpperCase() + mode.slice(1)}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search startups..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {/* Search logic */}}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <FilterPanel onClose={() => setShowFilters(false)} />
      )}

      {/* Main Content */}
      {compareMode ? (
        <ComparisonView 
          startups={startups.filter(s => selectedStartups.includes(s._id))}
          metrics={['Revenue', 'Users', 'Growth Rate', 'Burn Rate']}
        />
      ) : (
        <div>
          {viewMode === 'grid' && <StartupGrid startups={startups} />}
          {viewMode === 'list' && <StartupList startups={startups} />}
          {viewMode === 'kanban' && (
            <KanbanBoard 
              startups={startups} 
              onStageChange={handleStageChange}
            />
          )}
          {viewMode === 'timeline' && <TimelineView startups={startups} />}
        </div>
      )}
    </div>
  );
}