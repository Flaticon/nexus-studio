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
  Minimize2,
  Building2,
  Moon,
  Sun
} from 'lucide-react';
import Link from 'next/link';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import Layout from '../../components/layout/Layout';
import { KanbanBoard } from '../../components/dashboard/portfolio/KanbanBoard';
import { ProyectoStage, ProyectoStatus } from '@/types/portfolio';
import { MetricsGrid, Metric } from '@/components/ui/MetricsGrid';

export default function DashboardPage() {
  // Simplified state management
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState('6m');
  const [viewMode, setViewMode] = useState('standard');
  const [refreshing, setRefreshing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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
          modules: ['portfolio', 'finance', 'okrs', 'talent', 'learnings']
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
  }, [dateRange]);

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await dashboardService.calculateMetrics();
      // Reload data after calculation
      const summary = await dashboardService.getExecutiveSummary({
        timeRange: dateRange,
        modules: ['portfolio', 'finance', 'okrs', 'talent', 'learnings']
      });
      setExecutiveSummary(summary);
    } catch (err) {
      console.error('Error refreshing data:', err);
    } finally {
      setRefreshing(false);
    }
  };

  const executiveData = {
    company: {
      totalEmployees: 47,
      activeEmployees: 45
    },
    financials: {
      monthlyBudget: 285000,
      savings: 20000
    },
    hr: {
      avgPerformance: 89,
      avgSatisfaction: 85
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-black' : 'bg-gray-50'}`}>
      {/* Apple-style Navigation Header */}
      <nav className={`sticky top-0 z-50 transition-colors duration-300 ${darkMode ? 'bg-black/80 border-slate-800' : 'bg-white/80 border-slate-100'} backdrop-blur-xl border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${darkMode ? 'bg-white' : 'bg-black'}`}>
                <Building2 className={`w-5 h-5 ${darkMode ? 'text-black' : 'text-white'}`} />
              </div>
              <span className={`text-xl font-semibold transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>Dashboard</span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className={`px-4 py-2 rounded-full flex items-center gap-2 disabled:opacity-50 transition-all duration-200 text-sm font-medium ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Actualizando...' : 'Actualizar'}
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 border-2 ${darkMode ? 'text-white border-white hover:bg-white hover:text-black' : 'text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white'}`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Layout title="Control Center Empresarial" subtitle="Vista general de todas las operaciones de la empresa">
        <div className={`p-6 min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
          {/* Hero Section */}
          <section className="pt-8 pb-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto mb-12">
                <div className={`inline-block px-6 py-2 rounded-full border mb-6 transition-colors ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                  <span className="text-sm font-medium">Control Center Empresarial</span>
                </div>
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight leading-none transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Tu empresa
                  <br />
                  <span className="text-blue-600">
                    en tiempo real
                  </span>
                </h1>
                <p className={`text-xl max-w-3xl mx-auto mb-8 leading-relaxed font-normal transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Vista completa de métricas, finanzas y objetivos estratégicos
                </p>
              </div>
            </div>
          </section>

          {/* Simplified Key Metrics */}
          <section className={`py-12 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className={`text-3xl sm:text-4xl font-semibold mb-4 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Métricas Principales
                </h2>
                <p className={`text-lg max-w-2xl mx-auto transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Vista general de KPIs críticos del venture studio
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`p-8 rounded-3xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <Users className={`w-8 h-8 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Empleados Totales</h3>
                  <div className={`text-3xl font-bold mb-2 tracking-tight transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>{executiveData.company.totalEmployees}</div>
                  <p className={`text-sm leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{executiveData.company.activeEmployees} activos</p>
                </div>

                <div className={`p-8 rounded-3xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <DollarSign className={`w-8 h-8 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Presupuesto Mensual</h3>
                  <div className={`text-3xl font-bold mb-2 tracking-tight transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>${executiveData.financials.monthlyBudget.toLocaleString()}</div>
                  <p className={`text-sm leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Budget allocation total</p>
                </div>

                <div className={`p-8 rounded-3xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <TrendingUp className={`w-8 h-8 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Ahorros Mensuales</h3>
                  <div className={`text-3xl font-bold mb-2 tracking-tight transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>${executiveData.financials.savings.toLocaleString()}</div>
                  <p className={`text-sm leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Budget vs Actual spending</p>
                </div>

                <div className={`p-8 rounded-3xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <Award className={`w-8 h-8 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Performance Promedio</h3>
                  <div className={`text-3xl font-bold mb-2 tracking-tight transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>{executiveData.hr.avgPerformance}%</div>
                  <p className={`text-sm leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{executiveData.company.totalEmployees} empleados evaluados</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions - Apple style */}
          <section className={`py-20 transition-colors ${darkMode ? 'bg-blue-600' : 'bg-blue-600'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-6">
                  ¿Listo para gestionar tu empresa?
                </h2>
                <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
                  Accede rápidamente a los módulos principales de tu plataforma
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center">
                  <Link
                    href="/projects"
                    className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Briefcase className="w-5 h-5" />
                    <span>Gestionar Proyectos</span>
                  </Link>
                  <Link
                    href="/finance"
                    className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <DollarSign className="w-5 h-5" />
                    <span>Ver Finanzas</span>
                  </Link>
                  <Link
                    href="/objectives"
                    className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Target className="w-5 h-5" />
                    <span>Revisar Objetivos</span>
                  </Link>
                  <Link
                    href="/hr"
                    className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Users className="w-5 h-5" />
                    <span>Gestionar RRHH</span>
                  </Link>
                </div>

                <p className="text-blue-200 text-sm mt-8">
                  ✨ Datos en tiempo real • 🔒 Información segura • 🎨 Diseño moderno • 📞 Soporte 24/7
                </p>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </div>
  );
}