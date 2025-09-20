'use client';

import { useState, useEffect } from 'react';
import {
  Activity,
  Users,
  TrendingUp,
  DollarSign,
  Eye,
  AlertTriangle,
  Clock,
  Zap,
  Server,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface RealTimeMetric {
  name: string;
  value: number;
  change: number;
  changePercentage: number;
  lastUpdated: Date;
  trend: 'up' | 'down' | 'stable';
}

interface RealTimeData {
  activeUsers: RealTimeMetric;
  revenue: RealTimeMetric;
  conversions: RealTimeMetric;
  pageViews: RealTimeMetric;
  avgSessionDuration: RealTimeMetric;
  errorRate: RealTimeMetric;
  summary: {
    totalActiveUsers: number;
    topPage: string;
    conversionRate: number;
    avgResponseTime: number;
    systemHealth: 'excellent' | 'good' | 'fair' | 'poor';
    lastUpdated: Date;
  };
}

const getMockData = (): RealTimeData => ({
  activeUsers: {
    name: 'Active Users',
    value: 156,
    change: 12,
    changePercentage: 7.8,
    lastUpdated: new Date(),
    trend: 'up'
  },
  revenue: {
    name: 'Revenue',
    value: 89250,
    change: 5420,
    changePercentage: 6.4,
    lastUpdated: new Date(),
    trend: 'up'
  },
  conversions: {
    name: 'Conversions',
    value: 342,
    change: 28,
    changePercentage: 8.9,
    lastUpdated: new Date(),
    trend: 'up'
  },
  pageViews: {
    name: 'Page Views',
    value: 12450,
    change: 890,
    changePercentage: 7.7,
    lastUpdated: new Date(),
    trend: 'up'
  },
  avgSessionDuration: {
    name: 'Avg Session Duration',
    value: 245,
    change: 15,
    changePercentage: 6.5,
    lastUpdated: new Date(),
    trend: 'up'
  },
  errorRate: {
    name: 'Error Rate',
    value: 0.8,
    change: -0.2,
    changePercentage: -20.0,
    lastUpdated: new Date(),
    trend: 'down'
  },
  summary: {
    totalActiveUsers: 156,
    topPage: '/dashboard',
    conversionRate: 3.2,
    avgResponseTime: 185,
    systemHealth: 'excellent',
    lastUpdated: new Date()
  }
});

export default function RealTimeMetrics() {
  const [realTimeData, setRealTimeData] = useState<RealTimeData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchRealTimeData = async () => {
      try {
        const response = await fetch('/api/analytics/real-time');
        if (response.ok) {
          const data = await response.json();
          setRealTimeData(data);
          setIsConnected(true);
          setLastUpdate(new Date());
        } else {
          // Fallback to mock data if API is not available
          setRealTimeData(getMockData());
          setIsConnected(false);
          setLastUpdate(new Date());
        }
      } catch (error) {
        console.error('Failed to fetch real-time data:', error);
        // Use mock data when API is unavailable
        setRealTimeData(getMockData());
        setIsConnected(false);
        setLastUpdate(new Date());
      }
    };

    // Initial fetch
    fetchRealTimeData();

    // Set up polling every 10 seconds
    interval = setInterval(fetchRealTimeData, 10000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const getMetricIcon = (metricName: string) => {
    switch (metricName) {
      case 'Active Users': return <Users className="w-5 h-5" />;
      case 'Revenue': return <DollarSign className="w-5 h-5" />;
      case 'Conversions': return <TrendingUp className="w-5 h-5" />;
      case 'Page Views': return <Eye className="w-5 h-5" />;
      case 'Avg Session Duration': return <Clock className="w-5 h-5" />;
      case 'Error Rate': return <AlertTriangle className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-3 h-3 text-green-600" />;
      case 'down': return <ArrowDown className="w-3 h-3 text-red-600" />;
      case 'stable': return <Minus className="w-3 h-3 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable', metricName: string) => {
    // For error rate, up is bad and down is good
    if (metricName === 'Error Rate') {
      switch (trend) {
        case 'up': return 'text-red-600 bg-red-50 border-red-200';
        case 'down': return 'text-green-600 bg-green-50 border-green-200';
        case 'stable': return 'text-gray-600 bg-gray-50 border-gray-200';
      }
    }

    // For other metrics, up is good and down is potentially bad
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50 border-green-200';
      case 'down': return 'text-red-600 bg-red-50 border-red-200';
      case 'stable': return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatValue = (value: number, metricName: string): string => {
    switch (metricName) {
      case 'Revenue':
        return `$${value.toLocaleString()}`;
      case 'Error Rate':
        return `${value}%`;
      case 'Avg Session Duration':
        return `${Math.floor(value / 60)}m ${value % 60}s`;
      default:
        return value.toLocaleString();
    }
  };

  if (!realTimeData) {
    return (
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Real-Time Analytics</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const metrics = [
    realTimeData.activeUsers,
    realTimeData.revenue,
    realTimeData.conversions,
    realTimeData.pageViews,
    realTimeData.avgSessionDuration,
    realTimeData.errorRate
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Real-Time Analytics</h3>
            <p className="text-sm text-gray-500 mt-1">Live data updates every 10 seconds</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-orange-500'}`}></div>
              <span className="text-sm text-gray-600">
                {isConnected ? 'Live Data' : 'Demo Mode'}
              </span>
            </div>
            {lastUpdate && (
              <span className="text-xs text-gray-500">
                Updated {lastUpdate.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                    {getMetricIcon(metric.name)}
                  </div>
                  <span className="text-sm font-medium text-gray-600">{metric.name}</span>
                </div>
                {getTrendIcon(metric.trend)}
              </div>

              <div className="mb-2">
                <span className="text-2xl font-bold text-gray-900">
                  {formatValue(metric.value, metric.name)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getTrendColor(metric.trend, metric.name)}`}>
                  {getTrendIcon(metric.trend)}
                  <span>{Math.abs(metric.changePercentage).toFixed(1)}%</span>
                </div>
                <span className="text-xs text-gray-500">vs last hour</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600 mb-1">Active Users</div>
            <div className="text-2xl font-bold text-indigo-600">
              {realTimeData.summary.totalActiveUsers}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm font-medium text-gray-600 mb-1">Top Page</div>
            <div className="text-sm font-semibold text-gray-900 truncate">
              {realTimeData.summary.topPage}
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm font-medium text-gray-600 mb-1">Conversion Rate</div>
            <div className="text-xl font-bold text-green-600">
              {realTimeData.summary.conversionRate.toFixed(1)}%
            </div>
          </div>

          <div className="text-center">
            <div className="text-sm font-medium text-gray-600 mb-1">System Health</div>
            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getHealthColor(realTimeData.summary.systemHealth)}`}>
              <Server className="w-3 h-3" />
              <span className="capitalize">{realTimeData.summary.systemHealth}</span>
            </div>
          </div>
        </div>

        {/* Performance Indicator */}
        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Zap className="w-3 h-3" />
            <span>Avg Response Time: {realTimeData.summary.avgResponseTime.toFixed(0)}ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}