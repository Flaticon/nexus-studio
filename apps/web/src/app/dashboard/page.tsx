// apps/web/src/app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { 
  Briefcase, 
  DollarSign, 
  Users, 
  Target,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Award,
  Calendar,
  BarChart3,
  Eye,
  Filter,
  Bell,
  X,
  Settings,
  Download,
  RefreshCw,
  ChevronDown,
  Plus,
  Minus,
  Maximize2,
  Minimize2
} from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import Layout from '../../components/layout/Layout';
import { KanbanBoard } from '../../components/dashboard/portfolio/KanbanBoard';
import { StartupStage, StartupStatus } from '@/types/portfolio';
import { MetricsGrid, Metric } from '@/components/ui/MetricsGrid';

export default function DashboardPage() {
  // State management for filters and views
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState('6m');
  const [selectedModules, setSelectedModules] = useState(['portfolio', 'finance', 'okrs', 'talent', 'learnings']);
  const [viewMode, setViewMode] = useState('standard');
  const [refreshing, setRefreshing] = useState(false);
  const [widgetLayout, setWidgetLayout] = useState({
    metrics: { visible: true, size: 'normal' },
    charts: { visible: true, size: 'normal' },
    status: { visible: true, size: 'normal' },
    alerts: { visible: true, size: 'normal' }
  });

  // Filter data based on dateRange
  const getFilteredData = (data, range) => {
    const now = new Date();
    let startDate = new Date();
    
    switch (range) {
      case '1m':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3m':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6m':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      case 'all':
      default:
        return data;
    }
    
    return data;
  };

  // Apply date range multiplier for historical simulation
  const getDateMultiplier = (range) => {
    switch (range) {
      case '1m': return 0.3;
      case '3m': return 0.7;
      case '6m': return 1.0;
      case '1y': return 1.2;
      case 'all': return 1.5;
      default: return 1.0;
    }
  };

  const dateMultiplier = getDateMultiplier(dateRange);

  // Get number of months to show based on date range
  const getMonthsToShow = (range) => {
    switch (range) {
      case '1m': return 1;
      case '3m': return 3;
      case '6m': return 6;
      case '1y': return 12;
      case 'all': return 6;
      default: return 6;
    }
  };

  // Consolidated data from all modules
  const executiveData = {
    // Portfolio Overview (Module 2 data)
    portfolio: {
      totalStartups: 3,
      activeStartups: 3,
      byStage: {
        idea: 1,
        validation: 1,
        pmf: 1,
        growth: 0,
        scale: 0
      }
    },
    
    // Financial Overview (Module 3 data)
    financials: {
      totalRevenue: Math.round(142000 * dateMultiplier),
      totalExpenses: Math.round(112000 * dateMultiplier),
      netIncome: Math.round(30000 * dateMultiplier),
      burnRate: Math.round(-35000 * dateMultiplier),
      runway: Math.round(18 * (dateMultiplier > 1 ? 1.2 : dateMultiplier))
    },
    
    // OKRs Overview (Module 4 data)  
    okrs: {
      totalObjectives: 3,
      onTrack: Math.max(0, Math.round(1 * dateMultiplier)),
      atRisk: Math.max(0, Math.round(1 * dateMultiplier)),
      behind: Math.max(0, Math.round(1 * dateMultiplier)),
      avgProgress: Math.min(100, Math.round(67 * (dateMultiplier > 1 ? 1.1 : dateMultiplier + 0.2)))
    },
    
    // Talent Overview (Module 5 data)
    talent: {
      totalMembers: Math.round(8 * (dateMultiplier > 1 ? 1.1 : 1)),
      avgPerformance: Math.min(100, Math.round(89 * (dateMultiplier > 1 ? 1.02 : dateMultiplier + 0.1))),
      avgAvailability: Math.min(100, Math.round(80 * (dateMultiplier > 1 ? 1.05 : dateMultiplier + 0.15))),
      highWorkload: Math.max(0, Math.round(2 * dateMultiplier))
    },
    
    // Trends data
    monthlyTrends: [
      { month: 'Mar', revenue: Math.round(98000 * dateMultiplier), expenses: Math.round(112000 * dateMultiplier), netIncome: Math.round(-14000 * dateMultiplier), okrProgress: Math.min(100, Math.round(45 * (dateMultiplier + 0.2))) },
      { month: 'Abr', revenue: Math.round(105000 * dateMultiplier), expenses: Math.round(108000 * dateMultiplier), netIncome: Math.round(-3000 * dateMultiplier), okrProgress: Math.min(100, Math.round(52 * (dateMultiplier + 0.2))) },
      { month: 'May', revenue: Math.round(118000 * dateMultiplier), expenses: Math.round(115000 * dateMultiplier), netIncome: Math.round(3000 * dateMultiplier), okrProgress: Math.min(100, Math.round(58 * (dateMultiplier + 0.2))) },
      { month: 'Jun', revenue: Math.round(125000 * dateMultiplier), expenses: Math.round(118000 * dateMultiplier), netIncome: Math.round(7000 * dateMultiplier), okrProgress: Math.min(100, Math.round(61 * (dateMultiplier + 0.2))) },
      { month: 'Jul', revenue: Math.round(132000 * dateMultiplier), expenses: Math.round(120000 * dateMultiplier), netIncome: Math.round(12000 * dateMultiplier), okrProgress: Math.min(100, Math.round(65 * (dateMultiplier + 0.2))) },
      { month: 'Ago', revenue: Math.round(142000 * dateMultiplier), expenses: Math.round(112000 * dateMultiplier), netIncome: Math.round(30000 * dateMultiplier), okrProgress: Math.min(100, Math.round(67 * (dateMultiplier + 0.2))) }
    ].slice(-getMonthsToShow(dateRange)),
    
    startupBreakdown: [
      { name: 'EcoTech Solutions', value: Math.round(45000 * dateMultiplier), color: '#10B981', stage: 'validation' },
      { name: 'FinanceAI', value: Math.round(85000 * dateMultiplier), color: '#3B82F6', stage: 'pmf' },
      { name: 'HealthTracker', value: Math.round(12000 * dateMultiplier), color: '#8B5CF6', stage: 'idea' }
    ],
    
    alerts: [
      {
        id: 1,
        type: 'critical',
        title: 'Runway Crítico',
        message: 'HealthTracker tiene solo 8 meses de runway restante',
        module: 'finance',
        timestamp: '2 hrs ago'
      },
      {
        id: 2,
        type: 'warning', 
        title: 'OKR En Riesgo',
        message: 'FinanceAI tiene objetivos trimestrales en riesgo',
        module: 'okrs',
        timestamp: '4 hrs ago'
      },
      {
        id: 3,
        type: 'success',
        title: 'Nueva Contratación',
        message: 'Miguel Torres se unió al equipo de HealthTracker',
        module: 'talent',
        timestamp: '1 day ago'
      },
      {
        id: 4,
        type: 'info',
        title: 'Milestone Alcanzado',
        message: 'EcoTech Solutions alcanzó 32 clientes empresariales',
        module: 'portfolio',
        timestamp: '2 days ago'
      }
    ],
    
    // Mock startups data for KanbanBoard
    startups: [
      {
        _id: '1',
        name: 'EcoTech Solutions',
        slug: 'ecotech-solutions',
        description: 'Plataforma de gestión ambiental para empresas',
        stage: StartupStage.VALIDATION,
        status: StartupStatus.ACTIVE,
        squad: {
          lead: { name: 'Ana García', role: 'Product Lead' },
          members: [
            { name: 'Carlos López', role: 'Developer' },
            { name: 'María Rodríguez', role: 'Designer' }
          ]
        },
        resources: {
          deck: '#',
          demo: '#',
          repository: '#'
        },
        documents: [],
        metrics: [
          { name: 'Revenue', value: 45000, unit: 'USD', recordedAt: new Date() }
        ],
        kpis: [
          { name: 'MAU', current: 1200, target: 2000, unit: 'users', lastUpdated: new Date() },
          { name: 'MRR', current: 5000, target: 10000, unit: 'USD', lastUpdated: new Date() }
        ],
        timeline: [],
        activityLog: [],
        milestones: [],
        tags: ['SaaS', 'Environment'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '2',
        name: 'FinanceAI',
        slug: 'finance-ai',
        description: 'Inteligencia artificial para gestión financiera',
        stage: StartupStage.PMF,
        status: StartupStatus.ACTIVE,
        squad: {
          lead: { name: 'Roberto Silva', role: 'Tech Lead' },
          members: [
            { name: 'Laura Martín', role: 'AI Engineer' },
            { name: 'David Chen', role: 'Backend Dev' }
          ]
        },
        resources: {
          deck: '#',
          demo: '#',
          repository: '#'
        },
        documents: [],
        metrics: [
          { name: 'Revenue', value: 85000, unit: 'USD', recordedAt: new Date() }
        ],
        kpis: [
          { name: 'ARR', current: 50000, target: 100000, unit: 'USD', lastUpdated: new Date() },
          { name: 'Customers', current: 85, target: 200, unit: 'count', lastUpdated: new Date() }
        ],
        timeline: [],
        activityLog: [],
        milestones: [],
        tags: ['AI', 'Finance'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: '3',
        name: 'HealthTracker',
        slug: 'health-tracker',
        description: 'App móvil para seguimiento de salud personal',
        stage: StartupStage.IDEA,
        status: StartupStatus.ACTIVE,
        squad: {
          lead: { name: 'Sofia Ramírez', role: 'Product Manager' },
          members: [
            { name: 'Miguel Torres', role: 'Mobile Dev' }
          ]
        },
        resources: {
          deck: '#',
          repository: '#'
        },
        documents: [],
        metrics: [
          { name: 'Revenue', value: 12000, unit: 'USD', recordedAt: new Date() }
        ],
        kpis: [
          { name: 'Prototype', current: 60, target: 100, unit: '%', lastUpdated: new Date() }
        ],
        timeline: [],
        activityLog: [],
        milestones: [],
        tags: ['Mobile', 'Health'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  };

  // Primary metrics data for new design system
  const dashboardMetrics: Metric[] = [
    {
      id: 'active-startups',
      title: 'Startups Activas',
      value: executiveData.portfolio.activeStartups,
      change: { value: 15, type: 'positive' },
      icon: Briefcase,
      description: `de ${executiveData.portfolio.totalStartups} totales`,
      color: 'primary'
    },
    {
      id: 'arr',
      title: 'ARR',
      value: `$${(executiveData.financials.totalRevenue * 12).toLocaleString()}`,
      change: { value: 12, type: 'positive' },
      icon: TrendingUp,
      description: 'Annual Recurring Revenue',
      color: 'success'
    },
    {
      id: 'mrr',
      title: 'MRR',
      value: `$${executiveData.financials.totalRevenue.toLocaleString()}`,
      change: { value: 8, type: 'positive' },
      icon: DollarSign,
      description: 'Monthly Recurring Revenue',
      color: 'warning'
    },
    {
      id: 'team-performance',
      title: 'Team Performance',
      value: `${executiveData.talent.avgPerformance}%`,
      change: { value: 3, type: 'positive' },
      icon: Users,
      description: `${executiveData.talent.totalMembers} miembros activos`,
      color: 'danger'
    }
  ];

  // Secondary metrics data
  const secondaryMetrics: Metric[] = [
    {
      id: 'mau',
      title: 'MAU (Monthly Active Users)',
      value: '2,847',
      change: { value: 22, type: 'positive' },
      icon: Activity,
      description: 'Usuarios activos totales',
      color: 'primary'
    },
    {
      id: 'customer-count',
      title: 'Customer Count',
      value: '127',
      change: { value: 18, type: 'positive' },
      icon: Users,
      description: 'Clientes pagando activamente',
      color: 'success'
    },
    {
      id: 'runway',
      title: 'Runway Promedio',
      value: '18',
      change: { value: -5, type: 'negative' },
      icon: Calendar,
      description: 'Meses de runway restante',
      color: 'warning'
    }
  ];

  // Check if filters are active
  const hasActiveFilters = 
    dateRange !== '6m' ||
    selectedModules.length !== 5 ||
    viewMode !== 'standard';

  // Filter and view functions
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 2000);
  };

  const toggleModule = (module) => {
    setSelectedModules(prev => 
      prev.includes(module) 
        ? prev.filter(m => m !== module)
        : [...prev, module]
    );
  };

  const toggleWidgetVisibility = (widget) => {
    setWidgetLayout(prev => ({
      ...prev,
      [widget]: { ...prev[widget], visible: !prev[widget].visible }
    }));
  };

  const changeWidgetSize = (widget, size) => {
    setWidgetLayout(prev => ({
      ...prev,
      [widget]: { ...prev[widget], size }
    }));
  };


  const handleStageChange = (startupId: string, newStage: StartupStage) => {
    // This would typically update the backend
    console.log(`Moving startup ${startupId} to ${newStage}`);
  };

  // Filter alerts by selected modules
  const filteredAlerts = executiveData.alerts.filter(alert => 
    selectedModules.includes(alert.module)
  );

  // Filter data based on view mode
  const getViewModeClass = () => {
    switch (viewMode) {
      case 'compact': return 'text-sm';
      case 'detailed': return 'text-lg';
      case 'minimal': return 'text-xs';
      default: return '';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'info': return <Bell className="w-4 h-4 text-blue-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  const CustomMetricCard = ({ title, value, change, changeType, icon, subtitle, href, format = 'number', trend = 'stable' }) => {
    const Card = (
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200 group hover:scale-105">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold tracking-tight text-gray-600 text-balance">{title}</h3>
              {trend !== 'stable' && (
                <div className="text-gray-400">
                  <TrendingUp className={`h-3 w-3 ${trend === 'down' ? 'rotate-180' : ''}`} />
                </div>
              )}
            </div>
            
            <div className="mb-3">
              <p className="text-3xl font-bold text-gray-900 tracking-tight">
                {format === 'currency' && typeof value === 'number' 
                  ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value)
                  : format === 'percentage' && typeof value === 'number'
                  ? `${value}%`
                  : value
                }
              </p>
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1 font-medium">{subtitle}</p>
              )}
            </div>
            
            {change !== undefined && (
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                changeType === 'positive' ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : 
                changeType === 'negative' ? 'text-red-600 bg-red-50 border-red-200' : 
                'text-gray-600 bg-gray-50 border-gray-200'
              }`}>
                {changeType === 'positive' && <ArrowUp className="h-3 w-3" />}
                {changeType === 'negative' && <ArrowDown className="h-3 w-3" />}
                <span>
                  {change > 0 ? '+' : ''}{Math.abs(change)}%
                </span>
                <span className="text-xs opacity-75">vs anterior</span>
              </div>
            )}
          </div>
          
          {icon && (
            <div className="ml-4 p-3 bg-blue-600 rounded-lg">
              <div className="text-white">
                {icon}
              </div>
            </div>
          )}
        </div>
        
        {href && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium group-hover:gap-2 transition-all">
              <span>Ver detalles</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        )}
      </div>
    );

    return href ? <Link href={href}>{Card}</Link> : Card;
  };

  return (
    <Layout title="Nexus Studio Dashboard" subtitle="Vista general de todas las operaciones del venture studio">
      <style jsx>{`
        @keyframes slideIn0 {
          from { width: 0%; }
          to { width: ${((executiveData.startupBreakdown[0]?.value || 0) / executiveData.startupBreakdown.reduce((sum, item) => sum + item.value, 0) * 100).toFixed(1)}%; }
        }
        @keyframes slideIn1 {
          from { width: 0%; }
          to { width: ${((executiveData.startupBreakdown[1]?.value || 0) / executiveData.startupBreakdown.reduce((sum, item) => sum + item.value, 0) * 100).toFixed(1)}%; }
        }
        @keyframes slideIn2 {
          from { width: 0%; }
          to { width: ${((executiveData.startupBreakdown[2]?.value || 0) / executiveData.startupBreakdown.reduce((sum, item) => sum + item.value, 0) * 100).toFixed(1)}%; }
        }
        .bounce-in {
          animation: bounceIn 0.8s ease-out;
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 0.8; }
          70% { transform: scale(0.9); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
        .slide-up {
          animation: slideUp 0.6s ease-out;
        }
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
      <div className="p-6 min-h-screen bg-neutral-50">
      {/* Dashboard Content */}
      <div className="mb-6">
        {/* Header Actions - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
          {/* Mobile: Stack buttons in rows */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-end">
            {/* Primary actions group */}
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className="px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 disabled:opacity-50 transition-all duration-200 text-sm font-medium"
                style={{
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  if (!refreshing) {
                    e.target.style.background = 'var(--surface-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!refreshing) {
                    e.target.style.background = 'var(--surface)';
                  }
                }}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{refreshing ? 'Actualizando...' : 'Actualizar'}</span>
                <span className="sm:hidden">↻</span>
              </button>
              
              <button
                className="px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-150 text-sm font-medium bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exportar</span>
              </button>
            </div>
            
            {/* Secondary actions group */}
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 text-sm font-medium ${
                  showFilters ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{
                  background: showFilters ? 'var(--brand-primary-light)' : 'var(--surface)',
                  color: showFilters ? 'var(--brand-primary)' : 'var(--text-primary)',
                  boxShadow: showFilters ? 'none' : 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  if (!showFilters) {
                    e.target.style.background = 'var(--surface-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showFilters) {
                    e.target.style.background = 'var(--surface)';
                  }
                }}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtros</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full ml-1 animate-pulse"></span>
                )}
              </button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 rounded-2xl p-6 bg-white shadow-md border border-gray-100 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
              Filtros
            </h3>
            <button 
              onClick={() => setShowFilters(false)}
              className="transition-colors duration-200"
              style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-secondary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-tertiary)'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Periodo de Tiempo
              </label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1m">Último mes</option>
                <option value="3m">Últimos 3 meses</option>
                <option value="6m">Últimos 6 meses</option>
                <option value="1y">Último año</option>
                <option value="all">Todo el tiempo</option>
              </select>
            </div>

            {/* Module Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Módulos
              </label>
              <div className="space-y-2">
                {[
                  { id: 'portfolio', name: 'Portafolio', color: 'green' },
                  { id: 'finance', name: 'Finanzas', color: 'blue' },
                  { id: 'okrs', name: 'OKRs', color: 'purple' },
                  { id: 'talent', name: 'Talento', color: 'orange' },
                  { id: 'learnings', name: 'Aprendizajes', color: 'brown' }
                ].map(module => (
                  <label key={module.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedModules.includes(module.id)}
                      onChange={() => toggleModule(module.id)}
                      className="mr-2 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{module.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modo de Vista
              </label>
              <select 
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="standard">Vista Estándar</option>
                <option value="compact">Vista Compacta</option>
                <option value="detailed">Vista Detallada</option>
                <option value="minimal">Vista Mínima</option>
              </select>
            </div>
          </div>
          
          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Filtros activos: 
                  {dateRange !== '6m' && (
                    <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {dateRange === '1m' ? '1 mes' : 
                       dateRange === '3m' ? '3 meses' : 
                       dateRange === '1y' ? '1 año' : 
                       dateRange === 'all' ? 'Todo' : dateRange}
                    </span>
                  )}
                  {selectedModules.length !== 4 && (
                    <span className="ml-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {selectedModules.length} módulos
                    </span>
                  )}
                  {viewMode !== 'standard' && (
                    <span className="ml-1 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {viewMode === 'compact' ? 'Compacta' :
                       viewMode === 'detailed' ? 'Detallada' :
                       viewMode === 'minimal' ? 'Mínima' : viewMode}
                    </span>
                  )}
                </p>
                <button
                  onClick={() => {
                    setDateRange('6m');
                    setSelectedModules(['portfolio', 'finance', 'okrs', 'talent', 'learnings']);
                    setViewMode('standard');
                  }}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          )}
        </div>
      )}


      {/* Modern Key Metrics Grid */}
      {widgetLayout.metrics.visible && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
                Métricas Principales
              </h2>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Vista general de KPIs críticos del venture studio
              </p>
            </div>
          </div>

          <div className={`${
            widgetLayout.metrics.size === 'small' ? 'scale-90' :
            widgetLayout.metrics.size === 'large' ? 'scale-110' : ''
          }`}>
            <MetricsGrid
              metrics={dashboardMetrics}
              columns={4}
              gap={3}
            />
          </div>

          {/* Secondary Metrics Row */}
          <div className="mt-6">
            <MetricsGrid
              metrics={secondaryMetrics}
              columns={3}
              gap={3}
            />
          </div>
        </div>
      )}

      {/* Charts Section - Reorganized Layout */}
      {widgetLayout.charts.visible && (
        <div className="mb-8">
          {/* Top Row: Financial Analysis */}
          <div className={`mb-6 ${
            widgetLayout.charts.size === 'small' ? 'scale-90' : 
            widgetLayout.charts.size === 'large' ? 'scale-110' : ''
          }`}>
            {/* Advanced Financial Trend Analysis */}
            <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-150">
          <div className="p-6 pb-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  Análisis Financiero Avanzado
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">Tendencias de revenue, gastos y progreso de objetivos</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-600 font-medium">Actualizado hace 5min</span>
              </div>
            </div>
          </div>

          {/* Financial Summary Cards */}
          <div className="p-4 bg-white/50">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200/50">
                <div className="text-xs font-medium text-emerald-700 mb-1">Revenue Actual</div>
                <div className="text-lg font-bold text-emerald-900">
                  ${executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.revenue.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>vs mes anterior</span>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-200/50">
                <div className="text-xs font-medium text-blue-700 mb-1">Net Income</div>
                <div className="text-lg font-bold text-blue-900">
                  ${executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.netIncome.toLocaleString()}
                </div>
                <div className="text-xs text-blue-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Margen: {Math.round((executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.netIncome / executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.revenue) * 100)}%</span>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-3 border border-purple-200/50">
                <div className="text-xs font-medium text-purple-700 mb-1">OKR Progress</div>
                <div className="text-lg font-bold text-purple-900">
                  {executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.okrProgress}%
                </div>
                <div className="text-xs text-purple-600 flex items-center gap-1">
                  <Target className="w-3 h-3" />
                  <span>Objetivos Q3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Chart */}
          <div className="p-6 pt-2">
            <ResponsiveContainer width="100%" height={340}>
              <LineChart 
                data={executiveData.monthlyTrends}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.6}/>
                    <stop offset="50%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="netIncomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.6}/>
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="okrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.6}/>
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.05}/>
                  </linearGradient>
                  
                  {/* Glow effects */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="2 4" 
                  stroke="#E2E8F0" 
                  strokeOpacity={0.6}
                  horizontal={true}
                  vertical={false}
                />
                
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                  tickMargin={10}
                />
                
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }}
                  tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                  width={60}
                />
                
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    border: 'none',
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                    padding: '16px 20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    backdropFilter: 'blur(8px)'
                  }}
                  formatter={(value, name) => [
                    name === 'netIncome' || name === 'revenue' || name === 'expenses' 
                      ? `$${value.toLocaleString()}` 
                      : `${value}%`,
                    name === 'netIncome' ? 'Ingreso Neto' :
                    name === 'revenue' ? 'Ingresos' :
                    name === 'expenses' ? 'Gastos' : 'Progreso OKRs'
                  ]}
                  labelStyle={{ color: '#1E293B', fontWeight: 700, marginBottom: '8px' }}
                  cursor={{ stroke: 'rgba(59, 130, 246, 0.15)', strokeWidth: 40, fill: 'rgba(59, 130, 246, 0.05)' }}
                />
                
                {/* Enhanced Line charts with better visual impact */}
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10B981" 
                  strokeWidth={4}
                  name="revenue"
                  dot={{ fill: '#10B981', r: 5, strokeWidth: 3, stroke: '#FFFFFF' }}
                  activeDot={{ r: 8, strokeWidth: 4, stroke: '#FFFFFF', fill: '#10B981', dropShadow: '0 4px 8px rgba(16, 185, 129, 0.3)' }}
                />
                
                <Line 
                  type="monotone" 
                  dataKey="netIncome" 
                  stroke="#3B82F6" 
                  strokeWidth={3} 
                  name="netIncome"
                  strokeDasharray="5 5"
                  dot={{ fill: '#3B82F6', r: 4, strokeWidth: 2, stroke: '#FFFFFF' }}
                  activeDot={{ r: 6, strokeWidth: 3, stroke: '#FFFFFF', fill: '#3B82F6' }}
                />
                
                <Line 
                  type="monotone" 
                  dataKey="okrProgress" 
                  stroke="#8B5CF6" 
                  strokeWidth={2.5} 
                  name="okrProgress"
                  dot={{ fill: '#8B5CF6', r: 3.5, strokeWidth: 2, stroke: '#FFFFFF' }}
                  activeDot={{ r: 5, strokeWidth: 2, stroke: '#FFFFFF', fill: '#8B5CF6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend and Insights */}
          <div className="p-6 pt-0 bg-gray-50 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3">Leyenda</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-xs font-medium text-slate-700">Revenue Total</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-0.5 bg-blue-500 rounded-full" style={{borderStyle: 'dashed', borderWidth: '1px'}}></div>
                    <span className="text-xs font-medium text-slate-700">Ingreso Neto</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-0.5 bg-purple-500 rounded-full"></div>
                    <span className="text-xs font-medium text-slate-700">Progreso OKRs</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3">Insights Clave</h4>
                <div className="space-y-1">
                  <div className="text-xs text-slate-600">• Revenue creciendo 18% mensual promedio</div>
                  <div className="text-xs text-slate-600">• Margen neto mejorado a {Math.round((executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.netIncome / executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.revenue) * 100)}%</div>
                  <div className="text-xs text-slate-600">• OKRs en track para Q3</div>
                </div>
              </div>
            </div>
          </div>
          </div>
          
          {/* Bottom Row: Portfolio Performance */}
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 ${
            widgetLayout.charts.size === 'small' ? 'scale-90' : 
            widgetLayout.charts.size === 'large' ? 'scale-110' : ''
          }`}>
            {/* Modern Portfolio Performance Panel */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-150">
          <div className="p-6 pb-4 border-b border-slate-200/60">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
                Performance del Portafolio
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-600 font-medium">En vivo</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {/* Total Portfolio Value */}
              <div className="text-center pb-4 border-b border-slate-200/50">
                <div className="text-3xl font-bold text-slate-900 mb-1">
                  ${executiveData.startupBreakdown.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                </div>
                <div className="text-sm text-slate-600 font-medium">Revenue Total del Portafolio</div>
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold mt-2">
                  <TrendingUp className="w-3 h-3" />
                  +24% vs trimestre anterior
                </div>
              </div>

              {/* Modern Startup Cards */}
              <div className="space-y-3">
                {executiveData.startupBreakdown.map((startup, index) => {
                  const totalRevenue = executiveData.startupBreakdown.reduce((sum, item) => sum + item.value, 0);
                  const percentage = ((startup.value / totalRevenue) * 100).toFixed(1);
                  const colorClasses = [
                    'bg-teal-500',
                    'bg-blue-500',
                    'bg-indigo-500'
                  ];
                  
                  return (
                    <div 
                      key={startup.name} 
                      className="group relative overflow-hidden rounded-xl bg-white border border-slate-200/60 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Background overlay */}
                      <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 ${colorClasses[index]} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                              <span className="text-white font-bold text-lg">
                                {startup.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 group-hover:text-slate-700 transition-colors">{startup.name}</h4>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                                  startup.stage === 'pmf' ? 'bg-teal-100 text-teal-700' :
                                  startup.stage === 'validation' ? 'bg-blue-100 text-blue-700' :
                                  'bg-indigo-100 text-indigo-700'
                                }`}>
                                  {startup.stage.toUpperCase()}
                                </span>
                                <span className="text-xs text-slate-500 font-medium">Etapa</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-xl font-bold text-slate-900">${startup.value.toLocaleString()}</div>
                            <div className="text-xs text-slate-600 font-medium">{percentage}% del total</div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-slate-600">Contribución al portafolio</span>
                            <span className="text-xs font-bold text-slate-800">{percentage}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full ${colorClasses[index]} transition-all duration-700 ease-out`}
                              style={{ 
                                width: `${percentage}%`,
                                animation: `slideIn${index} 1s ease-out ${index * 0.2}s both`
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Performance Indicators */}
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200/50">
                          <div className="flex items-center gap-2">
                            {startup.stage === 'pmf' && (
                              <div className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-teal-600" />
                                <span className="text-xs text-teal-700 font-semibold">Product-Market Fit</span>
                              </div>
                            )}
                            {startup.stage === 'validation' && (
                              <div className="flex items-center gap-1">
                                <Activity className="w-3 h-3 text-blue-600" />
                                <span className="text-xs text-blue-700 font-semibold">Validando Mercado</span>
                              </div>
                            )}
                            {startup.stage === 'idea' && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-indigo-600" />
                                <span className="text-xs text-indigo-700 font-semibold">En Desarrollo</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-xs text-slate-500 font-medium">
                            Última actualización: hace 2h
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Portfolio Insights */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  Insights del Portafolio
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <Award className="w-4 h-4" />
                    <span>FinanceAI lidera con 60% del revenue total</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <TrendingUp className="w-4 h-4" />
                    <span>EcoTech muestra crecimiento acelerado (+45% MoM)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <Target className="w-4 h-4" />
                    <span>HealthTracker en fase crítica de desarrollo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance Insights Sidebar */}
        <div className="space-y-4">
              {/* Key Performance Indicators */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  KPIs Clave
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 font-medium">CAC Promedio</span>
                    <span className="text-sm font-bold text-slate-900">$247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 font-medium">LTV/CAC Ratio</span>
                    <span className="text-sm font-bold text-emerald-700">3.2x</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 font-medium">Churn Rate</span>
                    <span className="text-sm font-bold text-red-600">4.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 font-medium">NPS Score</span>
                    <span className="text-sm font-bold text-blue-700">67</span>
                  </div>
                </div>
              </div>
              
              {/* Market Insights */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  Market Insights
                </h4>
                <div className="space-y-3">
                  <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200/50">
                    <div className="text-xs font-semibold text-emerald-800 mb-1">Oportunidad</div>
                    <div className="text-xs text-emerald-700">FinanceAI puede expandir a SMB market</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3 border border-amber-200/50">
                    <div className="text-xs font-semibold text-amber-800 mb-1">Atención</div>
                    <div className="text-xs text-amber-700">Competencia aumentando en HealthTech</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200/50">
                    <div className="text-xs font-semibold text-blue-800 mb-1">Tendencia</div>
                    <div className="text-xs text-blue-700">Demanda AI+Sustainability ↗️</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* Status Overview */}
      {widgetLayout.status.visible && (
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 ${
          widgetLayout.status.size === 'small' ? 'scale-90' : 
          widgetLayout.status.size === 'large' ? 'scale-110' : ''
        }`}>
        {/* Enhanced Portfolio Status */}
        <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-150">
          <div className="p-6 pb-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  Pipeline de Startups
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">Distribución por etapa de desarrollo</p>
              </div>
              <div className="bg-white/80 px-3 py-1.5 rounded-full">
                <span className="text-xs font-bold text-slate-700">{executiveData.portfolio.totalStartups} Total</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(executiveData.portfolio.byStage).map(([stage, count]) => {
                const stageConfig = {
                  idea: { label: 'Idea', color: 'bg-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
                  validation: { label: 'Validation', color: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
                  pmf: { label: 'PMF', color: 'bg-teal-500', bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
                  growth: { label: 'Growth', color: 'bg-slate-500', bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' },
                  scale: { label: 'Scale', color: 'bg-gray-500', bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' }
                };
                const config = stageConfig[stage] || stageConfig.idea;
                const percentage = executiveData.portfolio.totalStartups > 0 ? ((count / executiveData.portfolio.totalStartups) * 100).toFixed(0) : 0;
                
                return (
                  <div key={stage} className={`${config.bg} rounded-xl p-4 border ${config.border} hover:shadow-md transition-all duration-300 group`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                          <span className="text-white text-sm font-bold">{config.label.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{config.label}</div>
                          <div className="text-xs text-slate-600 font-medium">Etapa {stage}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900">{count}</div>
                        <div className="text-xs text-slate-600">{percentage}% del total</div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-3 pt-3 border-t border-white/50">
                      <div className="w-full bg-white/70 rounded-full h-2">
                        <div
                          className={`h-full ${config.color} rounded-full transition-all duration-700 ease-out`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-indigo-200/50">
              <Link href="/portfolio" className="group flex items-center justify-between p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-200 hover:scale-105">
                <span className="text-sm font-bold">Ver Dashboard Completo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Team Overview */}
        <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-150">
          <div className="p-6 pb-4 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  Performance del Equipo
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">Métricas clave de productividad</p>
              </div>
              <div className="bg-white/80 px-3 py-1.5 rounded-full">
                <span className="text-xs font-bold text-slate-700">{executiveData.talent.totalMembers} Miembros</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {/* Availability */}
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-emerald-900">Disponibilidad</span>
                  </div>
                  <span className="text-2xl font-bold text-emerald-900">{executiveData.talent.avgAvailability}%</span>
                </div>
                <div className="w-full bg-white/70 rounded-full h-2">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${executiveData.talent.avgAvailability}%` }}
                  ></div>
                </div>
                <div className="text-xs text-emerald-700 mt-2">Promedio semanal del equipo</div>
              </div>

              {/* Performance */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Performance</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-900">{executiveData.talent.avgPerformance}%</span>
                </div>
                <div className="w-full bg-white/70 rounded-full h-2">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${executiveData.talent.avgPerformance}%` }}
                  ></div>
                </div>
                <div className="text-xs text-blue-700 mt-2">Evaluación mensual promedio</div>
              </div>

              {/* High Workload Alert */}
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold text-amber-900">Carga Alta</span>
                  </div>
                  <span className="text-2xl font-bold text-amber-900">{executiveData.talent.highWorkload}</span>
                </div>
                <div className="text-xs text-amber-700">Miembros con sobrecarga de trabajo</div>
                <div className="mt-2">
                  <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full font-semibold">Atención requerida</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-emerald-200/50">
              <Link href="/talent" className="group flex items-center justify-between p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all duration-200 hover:scale-105">
                <span className="text-sm font-bold">Gestionar Equipo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Alerts and Activities */}
      {widgetLayout.alerts.visible && (
        <div className={`bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 ${
          widgetLayout.alerts.size === 'small' ? 'scale-90' : 
          widgetLayout.alerts.size === 'large' ? 'scale-110' : ''
        }`}>
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
              🔔 Alertas y Actividad Reciente
            </h3>
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
              {filteredAlerts.length} alertas activas
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {filteredAlerts.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No hay alertas para los módulos seleccionados</p>
                <p className="text-sm text-gray-400 mt-2">
                  Ajusta los filtros para ver más alertas
                </p>
              </div>
            ) : (
              filteredAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-2xl border ${getAlertColor(alert.type)} hover:shadow-md transition-all duration-200`}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white bg-opacity-50 flex items-center justify-center">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold tracking-tight">{alert.title}</h4>
                      <span className="text-xs opacity-75 font-medium bg-white bg-opacity-30 px-2 py-1 rounded-full">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm mt-1 opacity-90 font-medium">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-white bg-opacity-70 px-3 py-1 rounded-full font-bold capitalize border border-white border-opacity-30">
                        {alert.module === 'finance' ? 'Finanzas' : alert.module === 'okrs' ? 'OKRs' : alert.module === 'talent' ? 'Talento' : alert.module === 'portfolio' ? 'Portafolio' : alert.module}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              ))
            )}
          </div>
        </div>
        </div>
      )}

      {/* Portfolio Kanban Board */}
      <div className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 mb-8">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
              📊 Vista Rápida del Portafolio
            </h3>
            <Link href="/portfolio" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
              <span>Ver portafolio completo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="p-6">
          <KanbanBoard 
            startups={executiveData.startups}
            onStageChange={handleStageChange}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 text-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <Link href="/portfolio" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-all duration-150 font-medium text-sm">
            <Briefcase className="h-4 w-4" />
            Gestionar Portafolio
          </Link>
          <Link href="/finance" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-150 font-medium text-sm">
            <DollarSign className="h-4 w-4" />
            Ver Finanzas
          </Link>
          <Link href="/okrs" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-all duration-150 font-medium text-sm">
            <Target className="h-4 w-4" />
            Revisar OKRs
          </Link>
          <Link href="/talent" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg transition-all duration-150 font-medium text-sm">
            <Users className="h-4 w-4" />
            Gestionar Equipo
          </Link>
        </div>
      </div>
      </div>
    </Layout>
  );
}