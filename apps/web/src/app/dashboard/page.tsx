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
  Layout,
  Maximize2,
  Minimize2
} from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

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

  const MetricCard = ({ title, value, change, changeType, icon, subtitle, href }) => {
    const Card = (
      <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
            {change !== undefined && (
              <div className={`text-sm mt-2 flex items-center gap-1 ${
                changeType === 'positive' ? 'text-green-600' : 
                changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {changeType === 'positive' && <TrendingUp className="w-3 h-3" />}
                {changeType === 'negative' && <TrendingUp className="w-3 h-3 rotate-180" />}
                <span>{change > 0 ? '+' : ''}{change}% vs mes anterior</span>
              </div>
            )}
          </div>
          <div className="ml-4">
            {icon}
          </div>
        </div>
        {href && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center text-sm text-blue-600 hover:text-blue-800">
              <span>Ver detalles</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        )}
      </div>
    );

    return href ? <Link href={href}>{Card}</Link> : Card;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              📊 Módulo 1 - Dashboard Ejecutivo
            </h1>
            <p className="mt-2 text-gray-600">
              Vista general consolidada con métricas clave de todos los módulos
            </p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Actualizando...' : 'Actualizar'}
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </button>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 border rounded-lg flex items-center gap-2 transition-colors ${
                showFilters 
                  ? 'border-blue-300 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            <button 
              onClick={() => setShowCustomView(!showCustomView)}
              className={`px-4 py-2 border rounded-lg flex items-center gap-2 transition-colors ${
                showCustomView 
                  ? 'border-purple-300 bg-purple-50 text-purple-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Eye className="w-4 h-4" />
              Vista Personalizada
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mb-6 bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
            <button 
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-gray-600"
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
        <div className="mb-6 bg-white rounded-lg shadow-sm border p-6">
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
              <div key={widget} className="border rounded-lg p-4">
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

      {/* Key Metrics Grid */}
      {widgetLayout.metrics.visible && (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ${
          widgetLayout.metrics.size === 'small' ? 'scale-90' : 
          widgetLayout.metrics.size === 'large' ? 'scale-110' : ''
        }`}>
        <MetricCard
          title="Startups Activas"
          value={executiveData.portfolio.activeStartups}
          subtitle={`de ${executiveData.portfolio.totalStartups} totales`}
          change={15}
          changeType="positive"
          icon={<Briefcase className="h-8 w-8 text-green-600" />}
          href="/portfolio"
        />
        
        <MetricCard
          title="Revenue Mensual"
          value={`$${(executiveData.financials.totalRevenue).toLocaleString()}`}
          change={12}
          changeType="positive"
          icon={<DollarSign className="h-8 w-8 text-blue-600" />}
          href="/finance"
        />
        
        <MetricCard
          title="Progreso OKRs"
          value={`${executiveData.okrs.avgProgress}%`}
          subtitle={`${executiveData.okrs.onTrack}/${executiveData.okrs.totalObjectives} en track`}
          change={8}
          changeType="positive"
          icon={<Target className="h-8 w-8 text-purple-600" />}
          href="/okrs"
        />
        
        <MetricCard
          title="Team Performance"
          value={`${executiveData.talent.avgPerformance}%`}
          subtitle={`${executiveData.talent.totalMembers} miembros activos`}
          change={3}
          changeType="positive"
          icon={<Users className="h-8 w-8 text-orange-600" />}
          href="/talent"
        />
        </div>
      )}

      {/* Charts Section */}
      {widgetLayout.charts.visible && (
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 ${
          widgetLayout.charts.size === 'small' ? 'scale-90' : 
          widgetLayout.charts.size === 'large' ? 'scale-110' : ''
        }`}>
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Tendencia Financiera y OKRs</h3>
          </div>
          <div className="p-6">
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
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Revenue por Startup</h3>
          </div>
          <div className="p-6">
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
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 ${
          widgetLayout.status.size === 'small' ? 'scale-90' : 
          widgetLayout.status.size === 'large' ? 'scale-110' : ''
        }`}>
        {/* Portfolio Status */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
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
            <div className="mt-4 pt-4 border-t">
              <Link href="/portfolio" className="flex items-center justify-between text-blue-600 hover:text-blue-800">
                <span className="text-sm font-medium">Ver portafolio completo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Team Overview */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
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
            <div className="mt-4 pt-4 border-t">
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
        <div className={`bg-white rounded-lg shadow-sm border ${
          widgetLayout.alerts.size === 'small' ? 'scale-90' : 
          widgetLayout.alerts.size === 'large' ? 'scale-110' : ''
        }`}>
        <div className="p-6 border-b">
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

      {/* Quick Actions */}
      <div className="mt-8 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
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
  );
}