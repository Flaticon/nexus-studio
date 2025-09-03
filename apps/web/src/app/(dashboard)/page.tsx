// apps/web/src/app/(dashboard)/page.tsx
'use client';

import { useEffect } from 'react';
import { 
  Briefcase, 
  DollarSign, 
  Users, 
  Target,
  TrendingUp,
  Activity
} from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { 
  useExecutiveSummary, 
  useMetrics, 
  useAlerts 
} from '@/lib/hooks/useDashboard';
import { useDashboardStore } from '@/lib/store/dashboard.store';

export default function DashboardPage() {
  const { 
    data: summary, 
    isLoading: summaryLoading 
  } = useExecutiveSummary();
  
  const { 
    data: metrics, 
    isLoading: metricsLoading 
  } = useMetrics();
  
  const { 
    data: alerts, 
    isLoading: alertsLoading 
  } = useAlerts();
  
  const { period, setPeriod } = useDashboardStore();

  // Auto-refresh effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Queries will auto-refetch based on their settings
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  if (summaryLoading || metricsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Executive Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Real-time overview of your startup studio performance
        </p>
      </div>

      {/* Period Selector */}
      <div className="mb-6 flex gap-2">
        {['day', 'week', 'month', 'quarter', 'year'].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p as any)}
            className={`px-4 py-2 rounded-lg ${
              period === p 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard
          title="Active Startups"
          value={summary?.metrics.startups.active || 0}
          change={summary?.metrics.startups.weeklyGrowth}
          changeType="positive"
          icon={<Briefcase className="h-6 w-6 text-blue-600" />}
          subtitle={`of ${summary?.metrics.startups.total || 0} total`}
        />
        
        <MetricCard
          title="Monthly Revenue"
          value={`$${(summary?.metrics.revenue.mrr || 0).toLocaleString()}`}
          change={summary?.metrics.revenue.growth}
          changeType={summary?.metrics.revenue.growth > 0 ? 'positive' : 'negative'}
          icon={<DollarSign className="h-6 w-6 text-green-600" />}
        />
        
        <MetricCard
          title="Burn Rate"
          value={`$${(summary?.metrics.burnRate.current || 0).toLocaleString()}`}
          subtitle={`${summary?.metrics.burnRate.runway || 0} months runway`}
          changeType={summary?.metrics.burnRate.trend === 'up' ? 'negative' : 'positive'}
          icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
        />
        
        <MetricCard
          title="Team Utilization"
          value={`${summary?.metrics.team.utilization || 0}%`}
          subtitle={`${summary?.metrics.team.total || 0} members`}
          changeType="neutral"
          icon={<Users className="h-6 w-6 text-purple-600" />}
        />
      </div>

      {/* Charts and Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RevenueChart data={metrics?.revenue || []} />
        </div>
        
        {/* Alerts Panel - Takes 1 column */}
        <div className="lg:col-span-1">
          <AlertsPanel alerts={alerts || []} />
        </div>
      </div>

      {/* Top Performers */}
      <div className="mt-6 bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Top Performing Startups
          </h3>
          
          <div className="space-y-3">
            {summary?.topPerformers?.map((performer) => (
              <div key={performer.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{performer.name}</p>
                  <p className="text-sm text-gray-500">{performer.metric}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${performer.value.toLocaleString()}
                  </p>
                  <p className={`text-sm ${
                    performer.change > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {performer.change > 0 ? '+' : ''}{performer.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}