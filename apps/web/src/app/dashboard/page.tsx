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
import { ModernMetricCard } from '@/components/ui/ModernMetricCard';

export default function DashboardPage() {
  // State management for filters and views
  const [showFilters, setShowFilters] = useState(false);
  const [showCustomView, setShowCustomView] = useState(false);
  const [dateRange, setDateRange] = useState('6m');
  const [selectedModules, setSelectedModules] = useState(['portfolio', 'finance', 'okrs', 'talent']);
  const [viewMode, setViewMode] = useState('standard');
  const [refreshing, setRefreshing] = useState(false);
  const [widgetLayout, setWidgetLayout] = useState({
    metrics: { visible: true, size: 'normal' },
    charts: { visible: true, size: 'normal' },
    status: { visible: true, size: 'normal' },
    alerts: { visible: true, size: 'normal' }
  });

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
      totalRevenue: 142000,
      totalExpenses: 112000,
      netIncome: 30000,
      burnRate: -35000,
      runway: 18
    },
    
    // OKRs Overview (Module 4 data)  
    okrs: {
      totalObjectives: 3,
      onTrack: 1,
      atRisk: 1,
      behind: 1,
      avgProgress: 67
    },
    
    // Talent Overview (Module 5 data)
    talent: {
      totalMembers: 8,
      avgPerformance: 89,
      avgAvailability: 80,
      highWorkload: 2
    },
    
    // Trends data
    monthlyTrends: [
      { month: 'Mar', revenue: 98000, expenses: 112000, netIncome: -14000, okrProgress: 45 },
      { month: 'Abr', revenue: 105000, expenses: 108000, netIncome: -3000, okrProgress: 52 },
      { month: 'May', revenue: 118000, expenses: 115000, netIncome: 3000, okrProgress: 58 },
      { month: 'Jun', revenue: 125000, expenses: 118000, netIncome: 7000, okrProgress: 61 },
      { month: 'Jul', revenue: 132000, expenses: 120000, netIncome: 12000, okrProgress: 65 },
      { month: 'Ago', revenue: 142000, expenses: 112000, netIncome: 30000, okrProgress: 67 }
    ],
    
    startupBreakdown: [
      { name: 'EcoTech Solutions', value: 45000, color: '#10B981', stage: 'validation' },
      { name: 'FinanceAI', value: 85000, color: '#3B82F6', stage: 'pmf' },
      { name: 'HealthTracker', value: 12000, color: '#8B5CF6', stage: 'idea' }
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

  const resetLayout = () => {
    setWidgetLayout({
      metrics: { visible: true, size: 'normal' },
      charts: { visible: true, size: 'normal' },
      status: { visible: true, size: 'normal' },
      alerts: { visible: true, size: 'normal' }
    });
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
      <div className="bg-white rounded-xl card-shadow hover:card-shadow-hover transition-all duration-200 p-6 border border-gray-100 hover:border-gray-200 group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-medium text-gray-600 text-balance">{title}</h3>
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
                {changeType === 'positive' && <ArrowUpIcon className="h-3 w-3" />}
                {changeType === 'negative' && <ArrowDownIcon className="h-3 w-3" />}
                <span>
                  {change > 0 ? '+' : ''}{Math.abs(change)}%
                </span>
                <span className="text-xs opacity-75">vs anterior</span>
              </div>
            )}
          </div>
          
          {icon && (
            <div className="ml-4 p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-100">
              <div className="text-blue-600">
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
    <Layout title="🏠 Nexus Studio Dashboard" subtitle="Vista general de todas las operaciones del venture studio">
      <div className="p-6 min-h-screen" style={{ background: 'var(--background)' }}>
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
                className="px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 transition-all duration-200 text-sm"
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
                className="px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 text-sm"
                style={{
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--surface-hover)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'var(--surface)';
                }}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Exportar</span>
              </button>
            </div>
            
            {/* Secondary actions group */}
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 text-sm"
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
              </button>
              
              <button 
                onClick={() => setShowCustomView(!showCustomView)}
                className="px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 text-sm"
                style={{
                  background: showCustomView ? 'rgba(88, 86, 214, 0.1)' : 'var(--surface)',
                  color: showCustomView ? '#5856d6' : 'var(--text-primary)',
                  boxShadow: showCustomView ? 'none' : 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  if (!showCustomView) {
                    e.target.style.background = 'var(--surface-hover)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showCustomView) {
                    e.target.style.background = 'var(--surface)';
                  }
                }}
              >
                <Eye className="w-4 h-4" />
                <span className="hidden lg:inline">Vista Personalizada</span>
                <span className="hidden sm:inline lg:hidden">Vista</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 rounded-lg p-6" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-md)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Filtros</h3>
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
                  { id: 'talent', name: 'Talento', color: 'orange' }
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
        </div>
      )}

      {/* Custom View Panel */}
      {showCustomView && (
        <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Vista Personalizada</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={resetLayout}
                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
              >
                Resetear
              </button>
              <button 
                onClick={() => setShowCustomView(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(widgetLayout).map(([widget, config]) => (
              <div key={widget} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 capitalize">{widget}</h4>
                  <button
                    onClick={() => toggleWidgetVisibility(widget)}
                    className={`p-1 rounded ${config.visible ? 'text-green-600' : 'text-gray-400'}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex gap-1">
                  {['small', 'normal', 'large'].map(size => (
                    <button
                      key={size}
                      onClick={() => changeWidgetSize(widget, size)}
                      className={`px-2 py-1 text-xs border rounded ${
                        config.size === size 
                          ? 'bg-blue-50 border-blue-300 text-blue-700'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {size === 'small' ? 'S' : size === 'normal' ? 'M' : 'L'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modern Key Metrics Grid */}
      {widgetLayout.metrics.visible && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Métricas Principales</h2>
              <p className="text-gray-600 text-sm mt-1">Vista general de KPIs críticos del venture studio</p>
            </div>
          </div>
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 ${
            widgetLayout.metrics.size === 'small' ? 'scale-90' : 
            widgetLayout.metrics.size === 'large' ? 'scale-110' : ''
          }`}>
            <ModernMetricCard
              title="Startups Activas"
              value={executiveData.portfolio.activeStartups}
              subtitle={`de ${executiveData.portfolio.totalStartups} totales`}
              change={15}
              changeType="positive"
              trend="up"
              color="blue"
              icon={<Briefcase className="h-6 w-6" />}
              size="md"
              className="bounce-in"
            />
            
            <ModernMetricCard
              title="ARR (Annual Recurring Revenue)"
              value={executiveData.financials.totalRevenue * 12}
              format="currency"
              change={12}
              changeType="positive"
              trend="up"
              color="green"
              icon={<TrendingUp className="h-6 w-6" />}
              size="md"
              className="bounce-in"
            />
            
            <ModernMetricCard
              title="MRR (Monthly Recurring Revenue)"
              value={executiveData.financials.totalRevenue}
              format="currency"
              change={8}
              changeType="positive"
              trend="up"
              color="purple"
              icon={<DollarSign className="h-6 w-6" />}
              size="md"
              className="bounce-in"
            />
            
            <ModernMetricCard
              title="Team Performance"
              value={executiveData.talent.avgPerformance}
              format="percentage"
              target={100}
              showProgress={true}
              subtitle={`${executiveData.talent.totalMembers} miembros activos`}
              change={3}
              changeType="positive"
              trend="stable"
              color="orange"
              icon={<Users className="h-6 w-6" />}
              size="md"
              className="bounce-in"
            />
          </div>

          {/* Secondary Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
            <ModernMetricCard
              title="MAU (Monthly Active Users)"
              value="2,847"
              subtitle="Usuarios activos totales"
              change={22}
              changeType="positive"
              trend="up"
              color="blue"
              icon={<Activity className="h-5 w-5" />}
              size="sm"
              className="slide-up"
            />
            
            <ModernMetricCard
              title="Customer Count"
              value="127"
              subtitle="Clientes pagando activamente"
              change={18}
              changeType="positive"
              trend="up"
              color="green"
              icon={<Users className="h-5 w-5" />}
              size="sm"
              className="slide-up"
            />
            
            <ModernMetricCard
              title="Runway Promedio"
              value="18"
              subtitle="Meses de runway restante"
              change={-5}
              changeType="negative"
              trend="down"
              color="orange"
              icon={<Calendar className="h-5 w-5" />}
              size="sm"
              className="slide-up"
            />
          </div>
        </div>
      )}

      {/* Charts Section */}
      {widgetLayout.charts.visible && (
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 ${
          widgetLayout.charts.size === 'small' ? 'scale-90' : 
          widgetLayout.charts.size === 'large' ? 'scale-110' : ''
        }`}>
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-4 sm:p-6 pb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Tendencia Financiera y OKRs</h3>
          </div>
          <div className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={executiveData.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'netIncome' || name === 'revenue' || name === 'expenses' 
                      ? `$${value.toLocaleString()}` 
                      : `${value}%`,
                    name === 'netIncome' ? 'Net Income' : 
                    name === 'revenue' ? 'Revenue' :
                    name === 'expenses' ? 'Expenses' : 'OKR Progress'
                  ]}
                />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} name="revenue" />
                <Line type="monotone" dataKey="netIncome" stroke="#3B82F6" strokeWidth={2} name="netIncome" />
                <Line type="monotone" dataKey="okrProgress" stroke="#8B5CF6" strokeWidth={2} name="okrProgress" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Startup Revenue Distribution */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 sm:p-6 pb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Revenue por Startup</h3>
          </div>
          <div className="p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={executiveData.startupBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {executiveData.startupBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              </PieChart>
            </ResponsiveContainer>
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
        {/* Portfolio Status */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 pb-4">
            <h3 className="text-lg font-semibold text-gray-900">Estado del Portafolio</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(executiveData.portfolio.byStage).map(([stage, count]) => (
                <div key={stage} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-600 capitalize">{stage}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4">
              <Link href="/portfolio" className="flex items-center justify-between text-blue-600 hover:text-blue-800">
                <span className="text-sm font-medium">Ver portafolio completo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Team Overview */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 pb-4">
            <h3 className="text-lg font-semibold text-gray-900">Resumen del Equipo</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Disponibilidad Promedio</span>
                <span className="font-semibold text-gray-900">{executiveData.talent.avgAvailability}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Performance Promedio</span>
                <span className="font-semibold text-gray-900">{executiveData.talent.avgPerformance}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Alta Carga</span>
                <span className="font-semibold text-red-600">{executiveData.talent.highWorkload} miembros</span>
              </div>
            </div>
            <div className="mt-4 pt-4">
              <Link href="/talent" className="flex items-center justify-between text-blue-600 hover:text-blue-800">
                <span className="text-sm font-medium">Gestionar equipo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Alerts and Activities */}
      {widgetLayout.alerts.visible && (
        <div className={`bg-white rounded-lg shadow-sm ${
          widgetLayout.alerts.size === 'small' ? 'scale-90' : 
          widgetLayout.alerts.size === 'large' ? 'scale-110' : ''
        }`}>
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Alertas y Actividad Reciente</h3>
            <span className="text-sm text-gray-500">{filteredAlerts.length} alertas activas</span>
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
              <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{alert.title}</h4>
                      <span className="text-xs opacity-75">{alert.timestamp}</span>
                    </div>
                    <p className="text-sm mt-1 opacity-90">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded capitalize">
                        {alert.module}
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
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Vista Rápida del Portafolio</h3>
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
          <Link href="/portfolio" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
            <Briefcase className="h-4 w-4" />
            Gestionar Portafolio
          </Link>
          <Link href="/finance" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            <DollarSign className="h-4 w-4" />
            Ver Finanzas
          </Link>
          <Link href="/okrs" className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm">
            <Target className="h-4 w-4" />
            Revisar OKRs
          </Link>
          <Link href="/talent" className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm">
            <Users className="h-4 w-4" />
            Gestionar Equipo
          </Link>
        </div>
      </div>
      </div>
    </Layout>
  );
}