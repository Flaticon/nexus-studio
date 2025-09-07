// apps/web/src/app/analytics/page.tsx
'use client';

import { useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Users,
  DollarSign,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Settings,
  ArrowUp,
  ArrowDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Brain,
  Search,
  BookOpen,
  LineChart
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart as RechartsBarChart,
  Bar,
  ComposedChart,
  Scatter,
  ScatterChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import Layout from '../../components/layout/Layout';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('3m');
  const [selectedMetrics, setSelectedMetrics] = useState(['revenue', 'users', 'growth']);
  const [viewMode, setViewMode] = useState('overview');
  const [showInsights, setShowInsights] = useState(true);

  // Advanced analytics data
  const analyticsData = {
    // Performance trends over time
    trends: [
      { month: 'Ene', revenue: 85000, users: 1200, retention: 78, nps: 42, burnRate: -45000 },
      { month: 'Feb', revenue: 92000, users: 1450, retention: 82, nps: 45, burnRate: -43000 },
      { month: 'Mar', revenue: 98000, users: 1680, retention: 85, nps: 48, burnRate: -41000 },
      { month: 'Abr', revenue: 105000, users: 1920, retention: 87, nps: 52, burnRate: -38000 },
      { month: 'May', revenue: 118000, users: 2150, retention: 89, nps: 55, burnRate: -35000 },
      { month: 'Jun', revenue: 142000, users: 2480, retention: 91, nps: 58, burnRate: -32000 }
    ],

    // Startup performance comparison
    startupMetrics: [
      {
        name: 'EcoTech Solutions',
        revenue: 45000,
        users: 850,
        growth: 23,
        retention: 87,
        ltv: 2400,
        cac: 320,
        stage: 'validation',
        color: '#10B981'
      },
      {
        name: 'FinanceAI',
        users: 1200,
        revenue: 85000,
        growth: 34,
        retention: 92,
        ltv: 4200,
        cac: 450,
        stage: 'pmf',
        color: '#3B82F6'
      },
      {
        name: 'HealthTracker',
        revenue: 12000,
        users: 430,
        growth: 18,
        retention: 76,
        ltv: 1800,
        cac: 280,
        stage: 'idea',
        color: '#8B5CF6'
      }
    ],

    // Cohort analysis
    cohortData: [
      { cohort: 'Ene 2024', month0: 100, month1: 85, month2: 72, month3: 65, month4: 58, month5: 52 },
      { cohort: 'Feb 2024', month0: 100, month1: 88, month2: 75, month3: 68, month4: 61, month5: null },
      { cohort: 'Mar 2024', month0: 100, month1: 90, month2: 78, month3: 71, month4: null, month5: null },
      { cohort: 'Abr 2024', month0: 100, month1: 92, month2: 81, month3: null, month4: null, month5: null },
      { cohort: 'May 2024', month0: 100, month1: 89, month2: null, month3: null, month4: null, month5: null },
      { cohort: 'Jun 2024', month0: 100, month1: null, month2: null, month3: null, month4: null, month5: null }
    ],

    // Market analysis
    marketData: {
      segments: [
        { name: 'B2B SaaS', value: 45, growth: 28, color: '#10B981' },
        { name: 'Fintech', value: 35, growth: 42, color: '#3B82F6' },
        { name: 'HealthTech', value: 20, growth: 15, color: '#8B5CF6' }
      ],
      competitive: [
        { competitor: 'Competitor A', marketShare: 32, revenue: 2400000 },
        { competitor: 'Competitor B', marketShare: 28, revenue: 2100000 },
        { competitor: 'Our Portfolio', marketShare: 8, revenue: 600000 },
        { competitor: 'Competitor C', marketShare: 22, revenue: 1650000 },
        { competitor: 'Others', marketShare: 10, revenue: 750000 }
      ]
    },

    // Predictive insights
    predictions: [
      {
        metric: 'Revenue Growth',
        current: 142000,
        predicted: 185000,
        confidence: 87,
        trend: 'up',
        insight: 'Strong Q3 performance expected based on current pipeline'
      },
      {
        metric: 'User Acquisition',
        current: 2480,
        predicted: 3200,
        confidence: 74,
        trend: 'up',
        insight: 'Marketing campaigns showing positive ROI trends'
      },
      {
        metric: 'Burn Rate',
        current: 32000,
        predicted: 28000,
        confidence: 82,
        trend: 'down',
        insight: 'Operational efficiency improvements taking effect'
      }
    ],

    // Key insights
    insights: [
      {
        id: 1,
        type: 'opportunity',
        title: 'Revenue Growth Acceleration',
        description: 'FinanceAI showing 34% MoM growth - consider increasing marketing spend',
        impact: 'High',
        confidence: 89,
        recommendations: [
          'Increase marketing budget by 40%',
          'Expand to 2 new market segments',
          'Launch referral program'
        ]
      },
      {
        id: 2,
        type: 'risk',
        title: 'User Retention Concern',
        description: 'HealthTracker retention dropped to 76% - investigate user journey',
        impact: 'Medium',
        confidence: 76,
        recommendations: [
          'Conduct user interviews',
          'Improve onboarding flow',
          'Add engagement features'
        ]
      },
      {
        id: 3,
        type: 'trend',
        title: 'Market Opportunity in B2B',
        description: 'B2B SaaS segment growing 28% - expand EcoTech presence',
        impact: 'High',
        confidence: 92,
        recommendations: [
          'Develop enterprise features',
          'Hire B2B sales team',
          'Partner with system integrators'
        ]
      }
    ]
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'risk': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'trend': return <Activity className="w-5 h-5 text-blue-600" />;
      default: return <Brain className="w-5 h-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'opportunity': return 'bg-green-50 border-green-200';
      case 'risk': return 'bg-red-50 border-red-200';
      case 'trend': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const MetricCard = ({ title, value, change, changeType, icon, subtitle }) => (
    <div className="p-6 rounded-lg hover:shadow-md transition-shadow" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{title}</p>
          <p className="text-2xl font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{value}</p>
          {subtitle && <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>{subtitle}</p>}
          {change !== undefined && (
            <div className={`text-sm mt-2 flex items-center gap-1 ${
              changeType === 'up' ? 'text-green-600' : 
              changeType === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {changeType === 'up' && <ArrowUp className="w-3 h-3" />}
              {changeType === 'down' && <ArrowDown className="w-3 h-3" />}
              {changeType === 'neutral' && <Minus className="w-3 h-3" />}
              <span>{Math.abs(change)}% vs período anterior</span>
            </div>
          )}
        </div>
        <div className="ml-4">{icon}</div>
      </div>
    </div>
  );

  return (
    <Layout title="📈 Data Analytics" subtitle="Análisis avanzado de datos e insights inteligentes">
    <div className="p-6 min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              📈 Data Analytics
            </h1>
            <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
              Insights inteligentes para la toma de decisiones estratégicas
            </p>
          </div>
          
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200" 
              style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)', color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.target.style.background = 'var(--surface-hover)'}
              onMouseLeave={(e) => e.target.style.background = 'var(--surface)'}>
              <RefreshCw className="w-4 h-4" />
              Actualizar
            </button>
            <button className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200" 
              style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)', color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.target.style.background = 'var(--surface-hover)'}
              onMouseLeave={(e) => e.target.style.background = 'var(--surface)'}>
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <button className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200" 
              style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)', color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.target.style.background = 'var(--surface-hover)'}
              onMouseLeave={(e) => e.target.style.background = 'var(--surface)'}>
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="mb-6 rounded-lg p-4" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="flex items-center gap-4">
          <div className="flex rounded-lg p-1" style={{ background: 'var(--surface-secondary)' }}>
            {[
              { id: 'overview', label: 'Vista General', icon: BarChart3 },
              { id: 'trends', label: 'Tendencias', icon: LineChart },
              { id: 'cohorts', label: 'Cohortes', icon: Users },
              { id: 'market', label: 'Mercado', icon: Target },
              { id: 'predictions', label: 'Predicciones', icon: Brain }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setViewMode(id)}
                className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
                style={{
                  background: viewMode === id ? 'var(--surface)' : 'transparent',
                  color: viewMode === id ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  boxShadow: viewMode === id ? 'var(--shadow-sm)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (viewMode !== id) {
                    e.target.style.background = 'var(--surface)';
                    e.target.style.boxShadow = 'var(--shadow-sm)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (viewMode !== id) {
                    e.target.style.background = 'transparent';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{label}</span>
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <label className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Periodo:</label>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ background: 'var(--surface)', color: 'var(--text-primary)', boxShadow: 'var(--shadow-sm)' }}
            >
              <option value="1m">1 mes</option>
              <option value="3m">3 meses</option>
              <option value="6m">6 meses</option>
              <option value="1y">1 año</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overview View */}
      {viewMode === 'overview' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <MetricCard
              title="Revenue Total"
              value="$142K"
              change={18}
              changeType="up"
              icon={<DollarSign className="h-8 w-8 text-green-600" />}
            />
            <MetricCard
              title="Usuarios Activos"
              value="2,480"
              change={24}
              changeType="up"
              icon={<Users className="h-8 w-8 text-blue-600" />}
            />
            <MetricCard
              title="Retención Promedio"
              value="89%"
              change={5}
              changeType="up"
              icon={<Activity className="h-8 w-8 text-purple-600" />}
            />
            <MetricCard
              title="NPS Score"
              value="58"
              change={12}
              changeType="up"
              icon={<Target className="h-8 w-8 text-orange-600" />}
            />
          </div>

          {/* Performance Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="lg:col-span-2 rounded-lg" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="p-4 sm:p-6" style={{ borderBottom: '1px solid var(--separator)' }}>
                <h3 className="text-base sm:text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Tendencias de Performance</h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="overflow-x-auto">
                <ResponsiveContainer width="100%" height={350} minWidth={300}>
                  <ComposedChart data={analyticsData.trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="revenue" fill="#10B981" name="Revenue" />
                    <Line yAxisId="right" type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} name="Usuarios" />
                    <Line yAxisId="right" type="monotone" dataKey="retention" stroke="#8B5CF6" strokeWidth={2} name="Retención %" />
                  </ComposedChart>
                </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="rounded-lg" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="p-4 sm:p-6" style={{ borderBottom: '1px solid var(--separator)' }}>
                <h3 className="text-base sm:text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Distribución por Startup</h3>
              </div>
              <div className="p-4 sm:p-6">
                <div className="overflow-x-auto">
                <ResponsiveContainer width="100%" height={350} minWidth={300}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="revenue"
                      data={analyticsData.startupMetrics}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                    >
                      {analyticsData.startupMetrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Cohort Analysis View */}
      {viewMode === 'cohorts' && (
        <div className="rounded-lg mb-8" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="p-6" style={{ borderBottom: '1px solid var(--separator)' }}>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Análisis de Cohortes - Retención de Usuarios</h3>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Retención por cohorte mensual (%)</p>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--separator)' }}>
                  <th className="text-left py-2 px-4 font-medium" style={{ color: 'var(--text-primary)' }}>Cohorte</th>
                  <th className="text-center py-2 px-4 font-medium" style={{ color: 'var(--text-primary)' }}>Mes 0</th>
                  <th className="text-center py-2 px-4 font-medium" style={{ color: 'var(--text-primary)' }}>Mes 1</th>
                  <th className="text-center py-2 px-4 font-medium" style={{ color: 'var(--text-primary)' }}>Mes 2</th>
                  <th className="text-center py-2 px-4 font-medium" style={{ color: 'var(--text-primary)' }}>Mes 3</th>
                  <th className="text-center py-2 px-4 font-medium" style={{ color: 'var(--text-primary)' }}>Mes 4</th>
                  <th className="text-center py-2 px-4 font-medium" style={{ color: 'var(--text-primary)' }}>Mes 5</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.cohortData.map((cohort, index) => (
                  <tr key={cohort.cohort} style={{ borderBottom: '1px solid var(--separator)' }}>
                    <td className="py-3 px-4 font-medium" style={{ color: 'var(--text-primary)' }}>{cohort.cohort}</td>
                    <td className="text-center py-3 px-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        100%
                      </span>
                    </td>
                    {[cohort.month1, cohort.month2, cohort.month3, cohort.month4, cohort.month5].map((value, idx) => (
                      <td key={idx} className="text-center py-3 px-4">
                        {value !== null ? (
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            value >= 80 ? 'bg-green-100 text-green-800' :
                            value >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {value}%
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Predictions View */}
      {viewMode === 'predictions' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <div className="rounded-lg" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="p-6" style={{ borderBottom: '1px solid var(--separator)' }}>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Predicciones Inteligentes</h3>
            </div>
            <div className="p-6 space-y-6">
              {analyticsData.predictions.map((pred, index) => (
                <div key={index} className="rounded-lg p-4" style={{ background: 'var(--surface-secondary)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>{pred.metric}</h4>
                    <div className={`flex items-center gap-1 ${
                      pred.trend === 'up' ? 'text-green-600' : 
                      pred.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {pred.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : 
                       pred.trend === 'down' ? <ArrowDown className="w-4 h-4" /> : 
                       <Minus className="w-4 h-4" />}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Actual: {pred.current.toLocaleString()}</span>
                    <span className="text-sm font-medium">Predicción: {pred.predicted.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Confianza: {pred.confidence}%</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${pred.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{pred.insight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="p-6" style={{ borderBottom: '1px solid var(--separator)' }}>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Análisis Competitivo</h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBarChart data={analyticsData.marketData.competitive}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="competitor" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Market Share']} />
                  <Bar dataKey="marketShare" fill="#3B82F6" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* AI Insights Section */}
      {showInsights && (
        <div className="rounded-lg" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="p-6" style={{ borderBottom: '1px solid var(--separator)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Insights Inteligentes</h3>
              </div>
              <button 
                onClick={() => setShowInsights(false)}
                className="transition-colors duration-200"
                style={{ color: 'var(--text-tertiary)' }}
                onMouseEnter={(e) => e.target.style.color = 'var(--text-secondary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-tertiary)'}
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {analyticsData.insights.map(insight => (
                <div key={insight.id} className="rounded-lg p-4" style={{ background: 'var(--surface-secondary)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>{insight.title}</h4>
                        <span className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded">
                          {insight.confidence}%
                        </span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{insight.description}</p>
                      <div className="space-y-1">
                        <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Recomendaciones:</p>
                        {insight.recommendations.map((rec, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </Layout>
  );
}