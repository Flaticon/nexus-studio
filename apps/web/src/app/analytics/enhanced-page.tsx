'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  BarChart3,
  Activity,
  Users,
  DollarSign,
  Plus,
  Download,
  Filter,
  Settings,
  RefreshCw,
  Eye,
  Target,
  Zap,
  ArrowUp,
  ArrowDown,
  Clock,
  Server,
  Brain,
  AlertTriangle,
  CheckCircle,
  Calendar,
  PieChart as PieChartIcon,
  Map,
  Layers,
  Maximize2,
  Bell
} from 'lucide-react';
import Layout from '../../components/layout/Layout';
import RealTimeMetrics from '../../components/analytics/RealTimeMetrics';
import AdvancedCharts from '../../components/analytics/AdvancedCharts';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function EnhancedAnalyticsPage() {
  const [selectedMetrics, setSelectedMetrics] = useState(['revenue', 'users', 'retention']);
  const [timeRange, setTimeRange] = useState('30d');
  const [viewMode, setViewMode] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [showInsights, setShowInsights] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setData(getMockAnalyticsData());
      setIsLoading(false);
    }, 1500);
  }, [timeRange]);

  const getMockAnalyticsData = () => ({
    trends: [
      { month: 'Jan', revenue: 145000, users: 2400, retention: 85, growth: 12 },
      { month: 'Feb', revenue: 158000, users: 2650, retention: 87, growth: 15 },
      { month: 'Mar', revenue: 172000, users: 2890, retention: 89, growth: 18 },
      { month: 'Apr', revenue: 165000, users: 2780, retention: 86, growth: 14 },
      { month: 'May', revenue: 185000, users: 3100, retention: 91, growth: 22 },
      { month: 'Jun', revenue: 195000, users: 3250, retention: 93, growth: 25 }
    ],
    startupMetrics: [
      { name: 'EcoTech', revenue: 85000, users: 1200, growth: 22, retention: 89, cac: 250, ltv: 1800, stage: 'pmf' },
      { name: 'FinanceAI', revenue: 120000, users: 850, growth: 35, retention: 94, cac: 320, ltv: 2400, stage: 'pmf' },
      { name: 'HealthTracker', revenue: 45000, users: 650, growth: 18, retention: 82, cac: 180, ltv: 1200, stage: 'validation' },
      { name: 'EduPlatform', revenue: 65000, users: 980, growth: 28, retention: 87, cac: 200, ltv: 1600, stage: 'validation' },
      { name: 'GreenEnergy', revenue: 25000, users: 420, growth: 12, retention: 78, cac: 150, ltv: 900, stage: 'idea' }
    ],
    cohortData: [
      { cohort: 'Jan 2024', month1: 85, month2: 72, month3: 65, month5: 58 },
      { cohort: 'Feb 2024', month1: 87, month2: 75, month3: 68, month5: null },
      { cohort: 'Mar 2024', month1: 89, month2: 78, month3: null, month5: null },
      { cohort: 'Apr 2024', month1: 86, month2: null, month3: null, month5: null }
    ],
    kpis: {
      totalRevenue: 652000,
      totalUsers: 8100,
      avgRetention: 89,
      avgGrowth: 21,
      conversionRate: 3.8,
      churnRate: 11,
      customerSatisfaction: 4.6,
      systemUptime: 99.8
    },
    insights: [
      {
        id: 1,
        type: 'opportunity',
        title: 'Revenue Growth Opportunity',
        description: 'FinanceAI shows 35% growth potential with optimized pricing strategy',
        impact: 'high',
        confidence: 92,
        timestamp: new Date()
      },
      {
        id: 2,
        type: 'warning',
        title: 'Retention Dip Alert',
        description: 'GreenEnergy retention dropped to 78%, requires immediate attention',
        impact: 'medium',
        confidence: 87,
        timestamp: new Date()
      },
      {
        id: 3,
        type: 'success',
        title: 'Conversion Rate Improvement',
        description: 'Overall conversion rate increased by 0.5% this month',
        impact: 'medium',
        confidence: 95,
        timestamp: new Date()
      }
    ]
  });

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'success': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <Layout title="Advanced Analytics" subtitle="Loading intelligent insights...">
        <div className="p-6 min-h-screen" style={{ background: 'var(--background)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Advanced Analytics Intelligence" subtitle="AI-Powered Business Intelligence Platform">
      <div className="p-6 min-h-screen" style={{ background: 'var(--background)' }}>

        {/* Enhanced Header with AI Insights */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Analytics Intelligence Hub
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-emerald-600">Real-time Data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span className="text-sm font-medium text-blue-600">AI Insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <span className="text-sm font-medium text-purple-600">Predictive Analytics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                onClick={() => setShowInsights(!showInsights)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  showInsights
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                <Brain className="w-4 h-4 inline-block mr-2" />
                AI Insights
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
                <Download className="w-4 h-4 inline-block mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 opacity-80" />
              <div className="flex items-center gap-1 bg-white bg-opacity-20 px-2 py-1 rounded-full">
                <ArrowUp className="w-3 h-3" />
                <span className="text-xs font-medium">+15.2%</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">${data.kpis.totalRevenue.toLocaleString()}</div>
            <div className="text-green-100 text-sm font-medium">Total Revenue</div>
            <div className="mt-3 h-1 bg-white bg-opacity-20 rounded-full overflow-hidden">
              <div className="h-full bg-white bg-opacity-60 rounded-full w-3/4"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-indigo-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 opacity-80" />
              <div className="flex items-center gap-1 bg-white bg-opacity-20 px-2 py-1 rounded-full">
                <ArrowUp className="w-3 h-3" />
                <span className="text-xs font-medium">+8.7%</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{data.kpis.totalUsers.toLocaleString()}</div>
            <div className="text-blue-100 text-sm font-medium">Active Users</div>
            <div className="mt-3 h-1 bg-white bg-opacity-20 rounded-full overflow-hidden">
              <div className="h-full bg-white bg-opacity-60 rounded-full w-4/5"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-violet-600 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-8 h-8 opacity-80" />
              <div className="flex items-center gap-1 bg-white bg-opacity-20 px-2 py-1 rounded-full">
                <ArrowUp className="w-3 h-3" />
                <span className="text-xs font-medium">+0.5%</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{data.kpis.conversionRate}%</div>
            <div className="text-purple-100 text-sm font-medium">Conversion Rate</div>
            <div className="mt-3 h-1 bg-white bg-opacity-20 rounded-full overflow-hidden">
              <div className="h-full bg-white bg-opacity-60 rounded-full w-2/3"></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-400 to-red-500 p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 opacity-80" />
              <div className="flex items-center gap-1 bg-white bg-opacity-20 px-2 py-1 rounded-full">
                <ArrowUp className="w-3 h-3" />
                <span className="text-xs font-medium">+3.1%</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{data.kpis.avgRetention}%</div>
            <div className="text-orange-100 text-sm font-medium">Avg Retention</div>
            <div className="mt-3 h-1 bg-white bg-opacity-20 rounded-full overflow-hidden">
              <div className="h-full bg-white bg-opacity-60 rounded-full w-5/6"></div>
            </div>
          </div>
        </div>

        {/* AI Insights Panel */}
        {showInsights && (
          <div className="mb-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h3>
                <p className="text-sm text-gray-600">Real-time intelligence and recommendations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {data.insights.map((insight) => (
                <div key={insight.id} className={`p-4 rounded-xl border ${getInsightColor(insight.type)}`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">{insight.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          insight.impact === 'high' ? 'bg-red-100 text-red-700' :
                          insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {insight.impact} impact
                        </span>
                        <span className="text-xs text-gray-500">{insight.confidence}% confident</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2">
            <AdvancedCharts
              data={data}
              selectedMetrics={selectedMetrics}
              timeRange={timeRange}
              onMetricChange={setSelectedMetrics}
              onTimeRangeChange={setTimeRange}
            />
          </div>

          {/* Side Panel with Performance Metrics */}
          <div className="space-y-6">
            {/* Performance Scorecard */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Scorecard</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Health</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${data.kpis.systemUptime}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold text-green-600">{data.kpis.systemUptime}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Customer Satisfaction</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(data.kpis.customerSatisfaction / 5) * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold text-blue-600">{data.kpis.customerSatisfaction}/5</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Churn Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: `${data.kpis.churnRate}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold text-orange-600">{data.kpis.churnRate}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
              <div className="space-y-3">
                {data.startupMetrics.slice(0, 3).map((startup, index) => (
                  <div key={startup.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{startup.name}</div>
                        <div className="text-xs text-gray-500">{startup.growth}% growth</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">${startup.revenue.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{startup.users} users</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-gray-900 to-indigo-900 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="w-4 h-4 opacity-70" />
                    <span className="text-sm">Avg Response Time</span>
                  </div>
                  <span className="font-semibold">1.2s</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 opacity-70" />
                    <span className="text-sm">Page Views</span>
                  </div>
                  <span className="font-semibold">45.2K</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 opacity-70" />
                    <span className="text-sm">Avg Session</span>
                  </div>
                  <span className="font-semibold">4m 32s</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Analytics */}
        <div className="mb-8">
          <RealTimeMetrics />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-100">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4" />
              Configure
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Calendar className="w-4 h-4" />
              Schedule Report
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}