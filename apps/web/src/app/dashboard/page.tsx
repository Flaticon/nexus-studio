// apps/web/src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { dashboardService, type ExecutiveSummary } from '../../services/dashboard.service';
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
import { ProyectoStage, ProyectoStatus } from '@/types/portfolio';
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

  // API data state
  const [executiveSummary, setExecutiveSummary] = useState<ExecutiveSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const filters = {
          timeRange: dateRange,
          modules: selectedModules
        };

        const summary = await dashboardService.getExecutiveSummary(filters);
        setExecutiveSummary(summary);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [dateRange, selectedModules]);

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await dashboardService.calculateMetrics();
      // Reload data after calculation
      const summary = await dashboardService.getExecutiveSummary({
        timeRange: dateRange,
        modules: selectedModules
      });
      setExecutiveSummary(summary);
    } catch (err) {
      console.error('Error refreshing data:', err);
    } finally {
      setRefreshing(false);
    }
  };

  // Handle alert dismissal
  const handleDismissAlert = async (alertId: string) => {
    try {
      await dashboardService.dismissAlert(alertId);
      // Reload data to update alerts
      const summary = await dashboardService.getExecutiveSummary({
        timeRange: dateRange,
        modules: selectedModules
      });
      setExecutiveSummary(summary);
    } catch (err) {
      console.error('Error dismissing alert:', err);
    }
  };

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
    // Company Overview (Module 2 data)
    company: {
      totalEmployees: 47,
      activeEmployees: 45,
      onboardingEmployees: 3,
      departments: {
        engineering: 15,
        sales: 8,
        marketing: 6,
        operations: 12,
        hr: 6
      }
    },
    
    // Financial Overview (Module 3 data)
    financials: {
      monthlyBudget: Math.round(285000 * dateMultiplier),
      actualSpending: Math.round(265000 * dateMultiplier),
      savings: Math.round(20000 * dateMultiplier),
      payrollCosts: Math.round(180000 * dateMultiplier),
      operationalCosts: Math.round(85000 * dateMultiplier)
    },
    
    // Company Objectives (Strategic Goals)
    objectives: {
      totalObjectives: 5,
      onTrack: Math.max(0, Math.round(3 * dateMultiplier)),
      atRisk: Math.max(0, Math.round(1 * dateMultiplier)),
      completed: Math.max(0, Math.round(1 * dateMultiplier)),
      avgProgress: Math.min(100, Math.round(78 * (dateMultiplier > 1 ? 1.1 : dateMultiplier + 0.2)))
    },
    
    // HR & People Management
    hr: {
      totalEmployees: Math.round(47 * (dateMultiplier > 1 ? 1.05 : 1)),
      activeEmployees: Math.round(45 * (dateMultiplier > 1 ? 1.05 : 1)),
      newHires: Math.max(0, Math.round(3 * dateMultiplier)),
      avgPerformance: Math.min(100, Math.round(89 * (dateMultiplier > 1 ? 1.02 : dateMultiplier + 0.1))),
      avgSatisfaction: Math.min(100, Math.round(85 * (dateMultiplier > 1 ? 1.03 : dateMultiplier + 0.1))),
      pendingOnboarding: Math.max(0, Math.round(2 * dateMultiplier))
    },
    
    // Company Performance Trends
    monthlyTrends: [
      { month: 'Mar', budget: Math.round(285000 * dateMultiplier), spending: Math.round(298000 * dateMultiplier), savings: Math.round(-13000 * dateMultiplier), objectiveProgress: Math.min(100, Math.round(65 * (dateMultiplier + 0.2))) },
      { month: 'Abr', budget: Math.round(285000 * dateMultiplier), spending: Math.round(275000 * dateMultiplier), savings: Math.round(10000 * dateMultiplier), objectiveProgress: Math.min(100, Math.round(68 * (dateMultiplier + 0.2))) },
      { month: 'May', budget: Math.round(285000 * dateMultiplier), spending: Math.round(265000 * dateMultiplier), savings: Math.round(20000 * dateMultiplier), objectiveProgress: Math.min(100, Math.round(72 * (dateMultiplier + 0.2))) },
      { month: 'Jun', budget: Math.round(285000 * dateMultiplier), spending: Math.round(270000 * dateMultiplier), savings: Math.round(15000 * dateMultiplier), objectiveProgress: Math.min(100, Math.round(75 * (dateMultiplier + 0.2))) },
      { month: 'Jul', budget: Math.round(285000 * dateMultiplier), spending: Math.round(268000 * dateMultiplier), savings: Math.round(17000 * dateMultiplier), objectiveProgress: Math.min(100, Math.round(77 * (dateMultiplier + 0.2))) },
      { month: 'Ago', budget: Math.round(285000 * dateMultiplier), spending: Math.round(265000 * dateMultiplier), savings: Math.round(20000 * dateMultiplier), objectiveProgress: Math.min(100, Math.round(78 * (dateMultiplier + 0.2))) }
    ].slice(-getMonthsToShow(dateRange)),
    
    departmentBreakdown: [
      { name: 'Engineering', value: Math.round(15 * dateMultiplier), color: '#10B981', budget: 95000 },
      { name: 'Sales & Marketing', value: Math.round(14 * dateMultiplier), color: '#3B82F6', budget: 75000 },
      { name: 'Operations', value: Math.round(12 * dateMultiplier), color: '#8B5CF6', budget: 60000 },
      { name: 'HR & Admin', value: Math.round(6 * dateMultiplier), color: '#F59E0B', budget: 55000 }
    ],
    
    alerts: [
      {
        id: 1,
        type: 'critical',
        title: 'Presupuesto Excedido',
        message: 'Departamento de Engineering superó el presupuesto mensual en 12%',
        module: 'finance',
        timestamp: '2 hrs ago'
      },
      {
        id: 2,
        type: 'warning',
        title: 'Objetivo En Riesgo',
        message: 'Objetivo de satisfacción empleados por debajo del 85%',
        module: 'objectives',
        timestamp: '4 hrs ago'
      },
      {
        id: 3,
        type: 'success',
        title: 'Onboarding Completado',
        message: 'Ana García completó el proceso de onboarding',
        module: 'hr',
        timestamp: '1 day ago'
      },
      {
        id: 4,
        type: 'info',
        title: 'Nuevo Empleado',
        message: 'Carlos Mendoza se incorpora al equipo de Operations',
        module: 'hr',
        timestamp: '2 days ago'
      }
    ],
    
    // Mock proyectos data for KanbanBoard
    proyectos: [
      {
        _id: '1',
        name: 'EcoTech Solutions',
        slug: 'ecotech-solutions',
        description: 'Plataforma de gestión ambiental para empresas',
        stage: ProyectoStage.VALIDATION,
        status: ProyectoStatus.ACTIVE,
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
        stage: ProyectoStage.PMF,
        status: ProyectoStatus.ACTIVE,
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
        stage: ProyectoStage.IDEA,
        status: ProyectoStatus.ACTIVE,
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
      id: 'total-employees',
      title: 'Empleados Totales',
      value: executiveData.company.totalEmployees,
      change: { value: 8, type: 'positive' },
      icon: Users,
      description: `${executiveData.company.activeEmployees} activos`,
      color: 'primary'
    },
    {
      id: 'monthly-budget',
      title: 'Presupuesto Mensual',
      value: `$${executiveData.financials.monthlyBudget.toLocaleString()}`,
      change: { value: 5, type: 'positive' },
      icon: DollarSign,
      description: 'Budget allocation total',
      color: 'success'
    },
    {
      id: 'monthly-savings',
      title: 'Ahorros Mensuales',
      value: `$${executiveData.financials.savings.toLocaleString()}`,
      change: { value: 12, type: 'positive' },
      icon: TrendingUp,
      description: 'Budget vs Actual spending',
      color: 'teal'
    },
    {
      id: 'hr-performance',
      title: 'Performance Promedio',
      value: `${executiveData.hr.avgPerformance}%`,
      change: { value: 3, type: 'positive' },
      icon: Award,
      description: `${executiveData.hr.totalEmployees} empleados evaluados`,
      color: 'indigo'
    }
  ];

  // Secondary metrics data
  const secondaryMetrics: Metric[] = [
    {
      id: 'satisfaction',
      title: 'Satisfacción Empleados',
      value: `${executiveData.hr.avgSatisfaction}%`,
      change: { value: 7, type: 'positive' },
      icon: CheckCircle,
      description: 'Encuesta mensual promedio',
      color: 'purple'
    },
    {
      id: 'new-hires',
      title: 'Nuevas Contrataciones',
      value: executiveData.hr.newHires,
      change: { value: 25, type: 'positive' },
      icon: Users,
      description: 'Incorporaciones este mes',
      color: 'orange'
    },
    {
      id: 'objectives-progress',
      title: 'Progreso Objetivos',
      value: `${executiveData.objectives.avgProgress}%`,
      change: { value: 8, type: 'positive' },
      icon: Target,
      description: 'Objetivos estratégicos Q3',
      color: 'warning'
    }
  ];

  // Check if filters are active
  const hasActiveFilters = 
    dateRange !== '6m' ||
    selectedModules.length !== 5 ||
    viewMode !== 'standard';

  // Filter and view functions

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


  const handleStageChange = (proyectoId: string, newStage: ProyectoStage) => {
    // This would typically update the backend
    console.log(`Moving project ${proyectoId} to ${newStage}`);
  };

  // Filter alerts by selected modules
  const filteredAlerts = executiveData.alerts.filter(alert => {
    const moduleMapping = {
      'finance': 'finance',
      'objectives': 'okrs',
      'hr': 'talent',
      'operations': 'portfolio'
    };
    return selectedModules.includes(moduleMapping[alert.module] || alert.module);
  });

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
    <Layout title="Control Center Empresarial" subtitle="Vista general de todas las operaciones de la empresa">
      <style jsx>{`
        @keyframes slideIn0 {
          from { width: 0%; }
          to { width: ${((executiveData.departmentBreakdown[0]?.budget || 0) / executiveData.departmentBreakdown.reduce((sum, item) => sum + item.budget, 0) * 100).toFixed(1)}%; }
        }
        @keyframes slideIn1 {
          from { width: 0%; }
          to { width: ${((executiveData.departmentBreakdown[1]?.budget || 0) / executiveData.departmentBreakdown.reduce((sum, item) => sum + item.budget, 0) * 100).toFixed(1)}%; }
        }
        @keyframes slideIn2 {
          from { width: 0%; }
          to { width: ${((executiveData.departmentBreakdown[2]?.budget || 0) / executiveData.departmentBreakdown.reduce((sum, item) => sum + item.budget, 0) * 100).toFixed(1)}%; }
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
            {/* Financial Metrics Grid */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
                    Análisis Presupuestario Avanzado
                  </h2>
                  <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                    Tendencias de presupuesto, gastos y progreso de objetivos
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-600 font-medium">Actualizado hace 5min</span>
                </div>
              </div>

              <MetricsGrid
                metrics={[
                  {
                    id: 'budget-actual',
                    title: 'Presupuesto Actual',
                    value: `$${executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.budget.toLocaleString()}`,
                    change: { value: 5, type: 'positive' },
                    icon: TrendingUp,
                    description: 'vs mes anterior',
                    color: 'success'
                  },
                  {
                    id: 'monthly-savings',
                    title: 'Ahorros Mensuales',
                    value: `$${executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.savings.toLocaleString()}`,
                    change: { value: Math.round((executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.savings / executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.budget) * 100), type: 'positive' },
                    icon: DollarSign,
                    description: `Eficiencia: ${Math.round((executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.savings / executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.budget) * 100)}%`,
                    color: 'teal'
                  },
                  {
                    id: 'objective-progress',
                    title: 'Progreso Objetivos',
                    value: `${executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.objectiveProgress}%`,
                    change: { value: 5, type: 'positive' },
                    icon: Target,
                    description: 'Objetivos Estratégicos Q3',
                    color: 'indigo'
                  }
                ]}
                columns={3}
                gap={3}
              />
            </div>

            {/* Advanced Financial Trend Analysis */}
            <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-150">

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
                    name === 'savings' || name === 'budget' || name === 'spending'
                      ? `$${value.toLocaleString()}`
                      : `${value}%`,
                    name === 'savings' ? 'Ahorros' :
                    name === 'budget' ? 'Presupuesto' :
                    name === 'spending' ? 'Gastos' : 'Progreso Objetivos'
                  ]}
                  labelStyle={{ color: '#1E293B', fontWeight: 700, marginBottom: '8px' }}
                  cursor={{ stroke: 'rgba(59, 130, 246, 0.15)', strokeWidth: 40, fill: 'rgba(59, 130, 246, 0.05)' }}
                />
                
                {/* Enhanced Line charts with better visual impact */}
                <Line
                  type="monotone"
                  dataKey="budget"
                  stroke="#10B981"
                  strokeWidth={4}
                  name="budget"
                  dot={{ fill: '#10B981', r: 5, strokeWidth: 3, stroke: '#FFFFFF' }}
                  activeDot={{ r: 8, strokeWidth: 4, stroke: '#FFFFFF', fill: '#10B981', dropShadow: '0 4px 8px rgba(16, 185, 129, 0.3)' }}
                />

                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  name="savings"
                  strokeDasharray="5 5"
                  dot={{ fill: '#3B82F6', r: 4, strokeWidth: 2, stroke: '#FFFFFF' }}
                  activeDot={{ r: 6, strokeWidth: 3, stroke: '#FFFFFF', fill: '#3B82F6' }}
                />

                <Line
                  type="monotone"
                  dataKey="objectiveProgress"
                  stroke="#8B5CF6"
                  strokeWidth={2.5}
                  name="objectiveProgress"
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
                    <span className="text-xs font-medium text-slate-700">Presupuesto Total</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-0.5 bg-blue-500 rounded-full" style={{borderStyle: 'dashed', borderWidth: '1px'}}></div>
                    <span className="text-xs font-medium text-slate-700">Ahorros Mensuales</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-0.5 bg-purple-500 rounded-full"></div>
                    <span className="text-xs font-medium text-slate-700">Progreso Objetivos</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3">Insights Clave</h4>
                <div className="space-y-1">
                  <div className="text-xs text-slate-600">• Presupuesto optimizado 5% mensual promedio</div>
                  <div className="text-xs text-slate-600">• Eficiencia mejorada a {Math.round((executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.savings / executiveData.monthlyTrends[executiveData.monthlyTrends.length - 1]?.budget) * 100)}%</div>
                  <div className="text-xs text-slate-600">• Objetivos estratégicos en track para Q3</div>
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
            {/* Portfolio Performance Grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
                    Performance Departamental
                  </h2>
                  <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                    Métricas clave de rendimiento por departamento
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-600 font-medium">En vivo</span>
                </div>
              </div>

              {/* Total Company Budget Metric */}
              <div className="mb-6">
                <MetricsGrid
                  metrics={[{
                    id: 'total-company-budget',
                    title: 'Presupuesto Total Empresa',
                    value: `$${executiveData.departmentBreakdown.reduce((sum, item) => sum + item.budget, 0).toLocaleString()}`,
                    change: { value: 8, type: 'positive' },
                    icon: Briefcase,
                    description: 'Budget allocation por departamentos',
                    color: 'primary'
                  }]}
                  columns={1}
                  gap={3}
                />
              </div>

              {/* Individual Department Metrics */}
              <MetricsGrid
                metrics={executiveData.departmentBreakdown.map((department, index) => {
                  const totalBudget = executiveData.departmentBreakdown.reduce((sum, item) => sum + item.budget, 0);
                  const percentage = ((department.budget / totalBudget) * 100).toFixed(1);
                  const colors = ['success', 'teal', 'orange', 'warning'] as const;

                  return {
                    id: `department-${department.name.toLowerCase().replace(/\s+/g, '-')}`,
                    title: department.name,
                    value: `$${department.budget.toLocaleString()}`,
                    change: {
                      value: index === 0 ? 15 : index === 1 ? 12 : index === 2 ? 8 : 5,
                      type: 'positive' as const
                    },
                    icon: department.name === 'Engineering' ? Activity : department.name.includes('Sales') ? Target : department.name === 'Operations' ? Settings : Users,
                    description: `${percentage}% del presupuesto • ${department.value} empleados`,
                    color: colors[index] || 'primary'
                  };
                })}
                columns={2}
                gap={3}
              />

              {/* Company Insights */}
              <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  Insights de la Empresa
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <Award className="w-4 h-4" />
                    <span>Engineering representa 33% del presupuesto total</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <TrendingUp className="w-4 h-4" />
                    <span>Departamentos optimizando gastos (+8% eficiencia)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <Target className="w-4 h-4" />
                    <span>HR & Admin con mejor relación costo-beneficio</span>
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
        {/* Distribución de Empleados */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
                Distribución de Empleados
              </h2>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Organización por departamentos
              </p>
            </div>
            <div className="bg-white/80 px-3 py-1.5 rounded-full">
              <span className="text-xs font-bold text-slate-700">{executiveData.company.totalEmployees} Total</span>
            </div>
          </div>

          <MetricsGrid
            metrics={Object.entries(executiveData.company.departments).map(([dept, count]) => {
              const deptConfig: { [key: string]: { label: string; icon: any; color: 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'teal' | 'indigo' | 'orange' } } = {
                engineering: { label: 'Engineering', icon: Activity, color: 'primary' },
                sales: { label: 'Sales & Marketing', icon: Target, color: 'success' },
                marketing: { label: 'Marketing', icon: TrendingUp, color: 'teal' },
                operations: { label: 'Operations', icon: Settings, color: 'indigo' },
                hr: { label: 'HR & Admin', icon: Users, color: 'warning' }
              };
              const config = deptConfig[dept] || deptConfig.engineering;
              const percentage = executiveData.company.totalEmployees > 0 ? ((count / executiveData.company.totalEmployees) * 100).toFixed(0) : 0;

              return {
                id: `dept-${dept}`,
                title: config.label,
                value: count,
                change: { value: parseInt(percentage), type: 'neutral' as const },
                icon: config.icon,
                description: `${percentage}% del equipo total`,
                color: config.color
              };
            })}
            columns={2}
            gap={3}
          />

          <div className="mt-6 pt-4 border-t border-indigo-200/50">
            <Link href="/hr" className="group flex items-center justify-between p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-200 hover:scale-105">
              <span className="text-sm font-bold">Gestionar RRHH</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Performance de RRHH */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
                Performance de RRHH
              </h2>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Métricas clave de gestión de personas
              </p>
            </div>
            <div className="bg-white/80 px-3 py-1.5 rounded-full">
              <span className="text-xs font-bold text-slate-700">{executiveData.hr.totalEmployees} Empleados</span>
            </div>
          </div>

          <MetricsGrid
            metrics={[
              {
                id: 'employee-satisfaction',
                title: 'Satisfacción',
                value: `${executiveData.hr.avgSatisfaction}%`,
                change: { value: 7, type: 'positive' },
                icon: CheckCircle,
                description: 'Encuesta mensual promedio',
                color: 'success'
              },
              {
                id: 'employee-performance',
                title: 'Performance',
                value: `${executiveData.hr.avgPerformance}%`,
                change: { value: 3, type: 'positive' },
                icon: Award,
                description: 'Evaluación trimestral promedio',
                color: 'indigo'
              },
              {
                id: 'pending-onboarding',
                title: 'Onboarding Pendiente',
                value: executiveData.hr.pendingOnboarding,
                change: { value: -15, type: 'negative' },
                icon: AlertTriangle,
                description: 'Nuevos empleados en proceso',
                color: 'warning'
              }
            ]}
            columns={3}
            gap={3}
          />

          <div className="mt-6 pt-4 border-t border-emerald-200/50">
            <Link href="/hr" className="group flex items-center justify-between p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all duration-200 hover:scale-105">
              <span className="text-sm font-bold">Gestionar RRHH</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        </div>
      )}

      {/* Alerts and Activities */}
      {widgetLayout.alerts.visible && (
        <div className={`mb-8 ${
          widgetLayout.alerts.size === 'small' ? 'scale-90' :
          widgetLayout.alerts.size === 'large' ? 'scale-110' : ''
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
                Alertas y Actividad Reciente
              </h2>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Notificaciones importantes del venture studio
              </p>
            </div>
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
              {filteredAlerts.length} alertas activas
            </span>
          </div>

          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay alertas para los módulos seleccionados</p>
              <p className="text-sm text-gray-400 mt-2">
                Ajusta los filtros para ver más alertas
              </p>
            </div>
          ) : (
            <MetricsGrid
              metrics={filteredAlerts.map((alert) => ({
                id: `alert-${alert.id}`,
                title: alert.title,
                value: alert.module === 'finance' ? 'Finanzas' : alert.module === 'objectives' ? 'Objetivos' : alert.module === 'hr' ? 'RRHH' : alert.module === 'operations' ? 'Operaciones' : alert.module,
                icon: alert.type === 'critical' ? XCircle : alert.type === 'warning' ? AlertTriangle : alert.type === 'success' ? CheckCircle : Bell,
                description: `${alert.message} • ${alert.timestamp}`,
                color: alert.type === 'critical' ? 'danger' : alert.type === 'warning' ? 'warning' : alert.type === 'success' ? 'success' : 'primary'
              }))}
              columns={2}
              gap={3}
            />
          )}
        </div>
      )}

      {/* Vista Rápida de Proyectos */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
              Vista Rápida de Proyectos
            </h2>
            <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
              Resumen ejecutivo de proyectos empresariales activos
            </p>
          </div>
          <Link href="/projects" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium">
            <span>Ver proyectos completos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Projects Summary Metrics */}
        <MetricsGrid
          metrics={[
            {
              id: 'project-digital-transformation',
              title: 'Transformación Digital',
              value: '$125,000',
              change: { value: 15, type: 'positive' },
              icon: Activity,
              description: 'EN PROGRESO • 8 miembros',
              color: 'success'
            },
            {
              id: 'project-crm-implementation',
              title: 'Implementación CRM',
              value: '$85,000',
              change: { value: 22, type: 'positive' },
              icon: Target,
              description: 'PLANIFICACIÓN • 5 miembros',
              color: 'primary'
            },
            {
              id: 'project-automation',
              title: 'Automatización de Procesos',
              value: '$65,000',
              change: { value: 8, type: 'positive' },
              icon: Settings,
              description: 'INICIANDO • 4 miembros',
              color: 'teal'
            }
          ]}
          columns={3}
          gap={3}
        />

        {/* Project Status Distribution Mini Cards */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-green-100 text-green-800 rounded-lg p-3 text-center">
            <div className="text-lg mb-1">✅</div>
            <div className="text-lg font-bold">2</div>
            <div className="text-xs font-medium">Completados</div>
          </div>
          <div className="bg-blue-100 text-blue-800 rounded-lg p-3 text-center">
            <div className="text-lg mb-1">🚧</div>
            <div className="text-lg font-bold">3</div>
            <div className="text-xs font-medium">En Progreso</div>
          </div>
          <div className="bg-yellow-100 text-yellow-800 rounded-lg p-3 text-center">
            <div className="text-lg mb-1">📅</div>
            <div className="text-lg font-bold">2</div>
            <div className="text-xs font-medium">Planificados</div>
          </div>
          <div className="bg-purple-100 text-purple-800 rounded-lg p-3 text-center">
            <div className="text-lg mb-1">💡</div>
            <div className="text-lg font-bold">4</div>
            <div className="text-xs font-medium">Ideas</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 text-center">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <Link href="/projects" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-all duration-150 font-medium text-sm">
            <Briefcase className="h-4 w-4" />
            Gestionar Proyectos
          </Link>
          <Link href="/finance" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-150 font-medium text-sm">
            <DollarSign className="h-4 w-4" />
            Ver Finanzas
          </Link>
          <Link href="/objectives" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-all duration-150 font-medium text-sm">
            <Target className="h-4 w-4" />
            Revisar Objetivos
          </Link>
          <Link href="/hr" className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg transition-all duration-150 font-medium text-sm">
            <Users className="h-4 w-4" />
            Gestionar RRHH
          </Link>
        </div>
      </div>
      </div>
    </Layout>
  );
}