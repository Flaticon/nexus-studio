// apps/web/src/app/analytics/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
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
import { ModernMetricCard } from '../../components/ui/ModernMetricCard';
// import RealTimeMetrics from '../../components/analytics/RealTimeMetrics';
// import AdvancedCharts from '../../components/analytics/AdvancedCharts';
// import MLPredictions from '../../components/analytics/MLPredictions';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('3m');
  const [selectedMetrics, setSelectedMetrics] = useState(['revenue', 'users', 'growth']);
  const [viewMode, setViewMode] = useState('overview');
  const [showInsights, setShowInsights] = useState(true);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const exportMenuRef = useRef(null);

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setShowExportMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Export functionality
  const exportToCSV = (data, filename) => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + Object.keys(data[0]).join(",") + "\n"
      + data.map(row => Object.values(row).join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = async () => {
    // Simple PDF generation using browser's print functionality
    const printContent = document.createElement('div');
    printContent.innerHTML = `
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .metric { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; }
        .chart-placeholder { background: #f5f5f5; padding: 20px; text-align: center; margin: 10px 0; }
      </style>
      <h1>Analytics Report - ${new Date().toLocaleDateString()}</h1>
      <div class="metric">
        <h3>Revenue Total: $142K</h3>
        <p>Crecimiento: +18% vs mes anterior</p>
      </div>
      <div class="metric">
        <h3>Usuarios Activos: 2,480</h3>
        <p>+480 nuevos usuarios</p>
      </div>
      <div class="metric">
        <h3>Tasa de Retención: 89%</h3>
        <p>Meta: 90% (casi alcanzada)</p>
      </div>
      <div class="metric">
        <h3>NPS Score: 58</h3>
        <p>Excellent (50+ es excelente)</p>
      </div>
    `;

    const newWindow = window.open('', '_blank');
    newWindow.document.write(printContent.innerHTML);
    newWindow.document.close();
    newWindow.print();
  };

  const handleExport = (format) => {
    switch(format) {
      case 'csv-trends':
        exportToCSV(analyticsData.trends, 'analytics-trends');
        break;
      case 'csv-startups':
        exportToCSV(analyticsData.startupMetrics, 'startup-metrics');
        break;
      case 'csv-cohorts':
        exportToCSV(analyticsData.cohortData, 'cohort-analysis');
        break;
      case 'pdf':
        exportToPDF();
        break;
      case 'json':
        const dataStr = JSON.stringify(analyticsData, null, 2);
        const dataBlob = new Blob([dataStr], {type:"application/json"});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'analytics-data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        break;
    }
    setShowExportMenu(false);
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
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold tracking-tight text-gray-600">
          {title}
        </h3>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900 tracking-tight mb-2">{value}</p>
      {subtitle && <p className="text-sm font-medium text-gray-600 mb-2">{subtitle}</p>}
      {change !== undefined && (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
          changeType === 'up' ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 
          changeType === 'down' ? 'text-red-600 bg-red-50 border-red-200' : 
          'text-gray-600 bg-gray-50 border-gray-200'
        }`}>
          {changeType === 'up' && <ArrowUp className="w-3 h-3" />}
          {changeType === 'down' && <ArrowDown className="w-3 h-3" />}
          {changeType === 'neutral' && <Minus className="w-3 h-3" />}
          <span>{Math.abs(change)}% vs período anterior</span>
        </div>
      )}
    </div>
  );

  return (
    <Layout title="Analytics Intelligence Hub" subtitle="Advanced Business Intelligence & Predictive Analytics Platform">
    <div className="p-6 min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Analytics Intelligence Hub
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-600">Live Data</span>
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
            <p className="mt-3 text-lg font-medium max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              Plataforma avanzada de inteligencia empresarial con análisis predictivo, machine learning y insights en tiempo real para optimizar decisiones estratégicas
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="group relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                <span>Actualizar Datos</span>
              </div>
            </button>

            <div className="relative" ref={exportMenuRef}>
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="group px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold shadow-md hover:shadow-lg hover:border-purple-300 hover:text-purple-700 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 group-hover:text-purple-600" />
                  <span>Exportar Reporte</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${showExportMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {showExportMenu && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                  <div className="p-3 border-b border-gray-100">
                    <h4 className="font-semibold text-gray-900 text-sm">Formatos de Exportación</h4>
                    <p className="text-xs text-gray-500 mt-1">Selecciona el formato deseado</p>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={() => handleExport('pdf')}
                      className="w-full px-4 py-3 text-left hover:bg-red-50 transition-colors duration-200 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-red-600 font-bold text-xs">PDF</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">Reporte PDF</div>
                        <div className="text-xs text-gray-500">Resumen ejecutivo completo</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleExport('csv-trends')}
                      className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors duration-200 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 font-bold text-xs">CSV</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">Tendencias CSV</div>
                        <div className="text-xs text-gray-500">Datos de performance temporal</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleExport('csv-startups')}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-200 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xs">CSV</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">Métricas Startups CSV</div>
                        <div className="text-xs text-gray-500">Performance por startup</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleExport('csv-cohorts')}
                      className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors duration-200 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-xs">CSV</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">Análisis Cohortes CSV</div>
                        <div className="text-xs text-gray-500">Datos de retención</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleExport('json')}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600 font-bold text-xs">JSON</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">Datos Completos JSON</div>
                        <div className="text-xs text-gray-500">Dataset completo estructurado</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="group px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>Filtros Avanzados</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Analytics Navigation */}
      <div className="mb-8 bg-gradient-to-r from-white via-blue-50/30 to-purple-50/30 rounded-2xl shadow-lg border border-gray-100 p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Navigation Pills */}
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              Módulos de Análisis Inteligente
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { id: 'overview', label: 'Dashboard General', icon: BarChart3, desc: 'Métricas clave y resumen ejecutivo' },
                { id: 'trends', label: 'Análisis de Tendencias', icon: LineChart, desc: 'Evolución temporal de KPIs' },
                { id: 'cohorts', label: 'Análisis de Cohortes', icon: Users, desc: 'Retención y comportamiento de usuarios' },
                { id: 'market', label: 'Inteligencia de Mercado', icon: Target, desc: 'Análisis competitivo y oportunidades' },
                { id: 'predictions', label: 'IA Predictiva', icon: Brain, desc: 'Machine learning y forecasting' }
              ].map(({ id, label, icon: Icon, desc }) => (
                <button
                  key={id}
                  onClick={() => setViewMode(id)}
                  className={`group relative px-5 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 font-semibold ${
                    viewMode === id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl scale-105 ring-2 ring-blue-200'
                      : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 shadow-md hover:shadow-xl border border-gray-200 hover:border-blue-300'
                  }`}
                  title={desc}
                >
                  <Icon className={`w-5 h-5 transition-colors ${viewMode === id ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}`} />
                  <div className="text-left">
                    <div className="text-sm font-semibold">{label}</div>
                    {viewMode === id && (
                      <div className="text-xs opacity-90 hidden lg:block">{desc}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="lg:ml-auto">
            <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              Período de Análisis
            </h4>
            <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-md border border-gray-100">
              <Clock className="w-5 h-5 text-blue-500" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 font-semibold text-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <option value="1m">Último mes</option>
                <option value="3m">Últimos 3 meses</option>
                <option value="6m">Últimos 6 meses</option>
                <option value="1y">Último año</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Metrics */}
      {/* <RealTimeMetrics /> */}

      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-6 mb-8 text-white shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-200">98.5%</div>
            <div className="text-sm text-gray-300">System Uptime</div>
            <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
              <div className="bg-green-400 h-1 rounded-full" style={{ width: '98.5%' }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-200">+42%</div>
            <div className="text-sm text-gray-300">Growth Rate</div>
            <div className="flex items-center justify-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-200">156</div>
            <div className="text-sm text-gray-300">Active Sessions</div>
            <div className="flex items-center justify-center mt-2">
              <Users className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-200">2.1s</div>
            <div className="text-sm text-gray-300">Avg Response</div>
            <div className="flex items-center justify-center mt-2">
              <Zap className="w-4 h-4 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Overview View */}
      {viewMode === 'overview' && (
        <>
          {/* Key Metrics */}
          {/* Enhanced KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="group relative overflow-hidden bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    <ArrowUp className="w-3 h-3" />
                    +18%
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium opacity-90">Revenue Total</h3>
                  <p className="text-3xl font-bold">$142K</p>
                  <p className="text-xs opacity-75">+$21K vs mes anterior</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    <ArrowUp className="w-3 h-3" />
                    +24%
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium opacity-90">Usuarios Activos</h3>
                  <p className="text-3xl font-bold">2,480</p>
                  <p className="text-xs opacity-75">+480 nuevos usuarios</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    <ArrowUp className="w-3 h-3" />
                    +5%
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium opacity-90">Tasa de Retención</h3>
                  <p className="text-3xl font-bold">89%</p>
                  <p className="text-xs opacity-75">Meta: 90% (casi alcanzada)</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    <ArrowUp className="w-3 h-3" />
                    +12%
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium opacity-90">NPS Score</h3>
                  <p className="text-3xl font-bold">58</p>
                  <p className="text-xs opacity-75">Excellent (50+ es excelente)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">Tendencias de Performance Avanzadas</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl p-4">
                <ResponsiveContainer width="100%" height={380} minWidth={300}>
                  <ComposedChart data={analyticsData.trends} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="100%" stopColor="#10B981" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" strokeOpacity={0.5} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis
                      yAxisId="left"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        padding: '12px 16px',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    />
                    <Bar yAxisId="left" dataKey="revenue" fill="url(#revenueGradient)" name="Revenue" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={3} name="Usuarios" dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }} />
                    <Line yAxisId="right" type="monotone" dataKey="retention" stroke="#8B5CF6" strokeWidth={2} name="Retención %" dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">Distribución Inteligente</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-xl p-4">
                <ResponsiveContainer width="100%" height={380} minWidth={300}>
                  <RechartsPieChart>
                    <Pie
                      dataKey="revenue"
                      data={analyticsData.startupMetrics}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={40}
                      paddingAngle={5}
                      label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {analyticsData.startupMetrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        padding: '12px 16px',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Charts */}
          {/* <AdvancedCharts
            data={analyticsData}
            selectedMetrics={selectedMetrics}
            timeRange={dateRange}
            onMetricChange={setSelectedMetrics}
            onTimeRangeChange={setDateRange}
          /> */}
        </>
      )}

      {/* ML Predictions View */}
      {viewMode === 'predictions' && (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold mb-4">ML Predictions (Demo)</h3>
          <p className="text-gray-600">Machine Learning predictions component temporarily disabled.</p>
        </div>
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

      {/* Floating Quick Actions Menu */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Quick Actions Buttons */}
          {showQuickActions && (
            <div className="absolute bottom-16 right-0 space-y-3 animate-in slide-in-from-bottom-2">
              <button className="group w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              </button>
              <button className="group w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              </button>
              <button className="group w-12 h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          )}

          {/* Main FAB */}
          <button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className={`w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group ${
              showQuickActions ? 'rotate-45' : ''
            }`}
          >
            <Plus className="w-6 h-6 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
    </Layout>
  );
}