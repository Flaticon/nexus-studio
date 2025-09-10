"use client";

import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Filter,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import Layout from "../../components/layout/Layout";

export default function FinancePage() {
  const [timeRange, setTimeRange] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    startups: [],
    stages: [],
    revenueRange: { min: 0, max: 100000 },
    runwayRange: { min: 0, max: 36 },
    showOnlyProfitable: false,
    sortBy: 'revenue',
    sortOrder: 'desc'
  });

  // Mock financial data
  const financialData = [
    {
      id: "1",
      startupName: "EcoTech Solutions",
      revenue: 45000,
      expenses: 32000,
      burnRate: -12000,
      runway: 18, // months
      stage: "validation",
      lastUpdate: "2025-08-01",
    },
    {
      id: "2",
      startupName: "FinanceAI",
      revenue: 85000,
      expenses: 55000,
      burnRate: -8000,
      runway: 24,
      stage: "pmf",
      lastUpdate: "2025-08-01",
    },
    {
      id: "3",
      startupName: "HealthTracker",
      revenue: 12000,
      expenses: 25000,
      burnRate: -15000,
      runway: 8,
      stage: "idea",
      lastUpdate: "2025-08-01",
    },
  ];

  const monthlyTrends = [
    { month: "Mar", revenue: 98000, expenses: 112000, netIncome: -14000 },
    { month: "Abr", revenue: 105000, expenses: 108000, netIncome: -3000 },
    { month: "May", revenue: 118000, expenses: 115000, netIncome: 3000 },
    { month: "Jun", revenue: 125000, expenses: 118000, netIncome: 7000 },
    { month: "Jul", revenue: 132000, expenses: 120000, netIncome: 12000 },
    { month: "Ago", revenue: 142000, expenses: 112000, netIncome: 30000 },
  ];

  const expensesByCategory = [
    { name: "Personal", value: 65000, color: "#8B5CF6", icon: "👥" },
    { name: "Marketing", value: 25000, color: "#10B981", icon: "📢" },
    { name: "Infraestructura", value: 35000, color: "#F59E0B", icon: "🏢" },
    { name: "Legal/Admin", value: 15000, color: "#EF4444", icon: "💼" },
    { name: "I+D", value: 45000, color: "#3B82F6", icon: "🔬" },
  ];

  const totalRevenue = financialData.reduce(
    (sum, startup) => sum + startup.revenue,
    0,
  );
  const totalExpenses = financialData.reduce(
    (sum, startup) => sum + startup.expenses,
    0,
  );
  const totalBurnRate = financialData.reduce(
    (sum, startup) => sum + startup.burnRate,
    0,
  );
  const avgRunway = Math.round(
    financialData.reduce((sum, startup) => sum + startup.runway, 0) /
      financialData.length,
  );

  const getRunwayColor = (runway) => {
    if (runway < 12) return "text-red-600 bg-red-50";
    if (runway < 18) return "text-yellow-600 bg-yellow-50";
    return "text-green-600 bg-green-50";
  };

  // Filter and sort data
  const filteredAndSortedData = financialData
    .filter(item => {
      // Filter by startup
      if (filters.startups.length > 0 && !filters.startups.includes(item.startupName)) {
        return false;
      }
      
      // Filter by stage
      if (filters.stages.length > 0 && !filters.stages.includes(item.stage)) {
        return false;
      }
      
      // Filter by revenue range
      if (item.revenue < filters.revenueRange.min || item.revenue > filters.revenueRange.max) {
        return false;
      }
      
      // Filter by runway range
      if (item.runway < filters.runwayRange.min || item.runway > filters.runwayRange.max) {
        return false;
      }
      
      // Filter only profitable
      if (filters.showOnlyProfitable && (item.revenue - item.expenses) <= 0) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (filters.sortBy) {
        case 'revenue':
          aValue = a.revenue;
          bValue = b.revenue;
          break;
        case 'expenses':
          aValue = a.expenses;
          bValue = b.expenses;
          break;
        case 'burnRate':
          aValue = a.burnRate;
          bValue = b.burnRate;
          break;
        case 'runway':
          aValue = a.runway;
          bValue = b.runway;
          break;
        case 'profit':
          aValue = a.revenue - a.expenses;
          bValue = b.revenue - b.expenses;
          break;
        default:
          aValue = a.startupName;
          bValue = b.startupName;
      }
      
      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Reset filters function
  const resetFilters = () => {
    setFilters({
      startups: [],
      stages: [],
      revenueRange: { min: 0, max: 100000 },
      runwayRange: { min: 0, max: 36 },
      showOnlyProfitable: false,
      sortBy: 'revenue',
      sortOrder: 'desc'
    });
  };

  // Available options for filters
  const availableStartups = [...new Set(financialData.map(item => item.startupName))];
  const availableStages = [...new Set(financialData.map(item => item.stage))];
  
  // Check if filters are active
  const hasActiveFilters = 
    filters.startups.length > 0 ||
    filters.stages.length > 0 ||
    filters.revenueRange.min > 0 ||
    filters.revenueRange.max < 100000 ||
    filters.runwayRange.min > 0 ||
    filters.runwayRange.max < 36 ||
    filters.showOnlyProfitable ||
    filters.sortBy !== 'revenue' ||
    filters.sortOrder !== 'desc';

  return (
    <Layout
      title="💰 Finanzas Consolidadas"
      subtitle="Ingresos, costos y burn rate por iniciativa"
    >
      <div className="p-6 min-h-screen" style={{ background: 'var(--background)' }}>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                💰 Finanzas Consolidadas
              </h1>
              <p className="mt-2 font-medium" style={{ color: 'var(--text-secondary)' }}>
                Control financiero integral del venture studio
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg focus:outline-none transition-all duration-200"
                style={{
                  background: 'var(--surface-secondary)',
                  color: 'var(--text-primary)',
                  border: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'var(--surface)';
                  e.target.style.boxShadow = 'var(--shadow-sm)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'var(--surface-secondary)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="3months">Últimos 3 meses</option>
                <option value="6months">Últimos 6 meses</option>
                <option value="12months">Últimos 12 meses</option>
              </select>

              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full flex items-center justify-center sm:justify-start gap-2 transition-all duration-200 font-medium ${
                  showFilters ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{
                  background: showFilters ? 'var(--info-bg)' : 'var(--surface)',
                  color: showFilters ? 'var(--info)' : 'var(--text-primary)',
                  boxShadow: showFilters ? 'none' : 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  if (!showFilters) e.target.style.background = 'var(--surface-hover)'
                }}
                onMouseLeave={(e) => {
                  if (!showFilters) e.target.style.background = 'var(--surface)'
                }}
              >
                <Filter className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Filtros</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full ml-1 animate-pulse"></span>
                )}
              </button>

              <button 
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full flex items-center justify-center sm:justify-start gap-2 text-white transition-all duration-200 font-medium bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                style={{ background: 'var(--module-finance)' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                <Download className="w-4 h-4 shrink-0" />
                Exportar
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
                🔍 Filtros Avanzados
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={resetFilters}
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-200"
                >
                  Limpiar Filtros
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-200 rounded-full hover:bg-gray-50 transition-all duration-200"
                >
                  Cerrar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Startup Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Startups</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {availableStartups.map(startup => (
                    <label key={startup} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.startups.includes(startup)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters(prev => ({
                              ...prev,
                              startups: [...prev.startups, startup]
                            }));
                          } else {
                            setFilters(prev => ({
                              ...prev,
                              startups: prev.startups.filter(s => s !== startup)
                            }));
                          }
                        }}
                        className="rounded border-gray-300 mr-2"
                      />
                      <span className="text-sm text-gray-700">{startup}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stage Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Etapas</label>
                <div className="space-y-2">
                  {availableStages.map(stage => (
                    <label key={stage} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.stages.includes(stage)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters(prev => ({
                              ...prev,
                              stages: [...prev.stages, stage]
                            }));
                          } else {
                            setFilters(prev => ({
                              ...prev,
                              stages: prev.stages.filter(s => s !== stage)
                            }));
                          }
                        }}
                        className="rounded border-gray-300 mr-2"
                      />
                      <span className="text-sm text-gray-700 capitalize">{stage}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Revenue Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rango de Ingresos (${filters.revenueRange.min.toLocaleString()} - ${filters.revenueRange.max.toLocaleString()})
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value={filters.revenueRange.min}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      revenueRange: { ...prev.revenueRange, min: parseInt(e.target.value) }
                    }))}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value={filters.revenueRange.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      revenueRange: { ...prev.revenueRange, max: parseInt(e.target.value) }
                    }))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Runway Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Runway ({filters.runwayRange.min} - {filters.runwayRange.max} meses)
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="36"
                    step="1"
                    value={filters.runwayRange.min}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      runwayRange: { ...prev.runwayRange, min: parseInt(e.target.value) }
                    }))}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="36"
                    step="1"
                    value={filters.runwayRange.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      runwayRange: { ...prev.runwayRange, max: parseInt(e.target.value) }
                    }))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Profitable Only */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showOnlyProfitable}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      showOnlyProfitable: e.target.checked
                    }))}
                    className="rounded border-gray-300 mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Solo Rentables</span>
                </label>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="revenue">Ingresos</option>
                  <option value="expenses">Gastos</option>
                  <option value="burnRate">Burn Rate</option>
                  <option value="runway">Runway</option>
                  <option value="profit">Ganancia</option>
                  <option value="startupName">Nombre</option>
                </select>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortOrder: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                >
                  <option value="desc">Mayor a menor</option>
                  <option value="asc">Menor a mayor</option>
                </select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                📊 Mostrando {filteredAndSortedData.length} de {financialData.length} startups
                {hasActiveFilters && (
                  <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-xs font-bold">
                    Filtros activos
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold tracking-tight text-gray-600">
                💰 Ingresos Totales
              </h3>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              ${totalRevenue.toLocaleString()}
            </p>
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                <ArrowUp className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-600">
                +12.5% vs mes anterior
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold tracking-tight text-gray-600">
                📊 Gastos Totales
              </h3>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <TrendingDown className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              ${totalExpenses.toLocaleString()}
            </p>
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-2">
                <ArrowDown className="w-3 h-3 text-red-600" />
              </div>
              <span className="text-sm font-medium text-red-600">
                -3.2% vs mes anterior
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold tracking-tight text-gray-600">
                🔥 Burn Rate Mensual
              </h3>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              ${Math.abs(totalBurnRate).toLocaleString()}
            </p>
            <div className="flex items-center">
              <div className="px-2 py-1 rounded-full bg-gradient-to-r from-orange-100 to-amber-100">
                <span className="text-sm font-medium text-orange-700">Mejorando tendencia</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold tracking-tight text-gray-600">
                📅 Runway Promedio
              </h3>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Calendar className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
              {avgRunway} meses
            </p>
            <div className="flex items-center">
              <div className="px-2 py-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100">
                <span className="text-sm font-medium text-blue-700">
                  Basado en burn rate actual
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="space-y-6 mb-8">
          {/* Net Income Trend Chart */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 mb-4 flex items-center gap-2">
              📊 Tendencia de Ingresos Netos
            </h3>
            <div className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={300} minWidth={400}>
                <AreaChart 
                  data={monthlyTrends} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="netIncomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="#F3F4F6" 
                    strokeOpacity={0.7}
                  />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
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
                    formatter={(value) => [`$${value.toLocaleString()}`, '💰 Ingreso Neto']}
                    labelFormatter={(label) => `📅 ${label} 2025`}
                  />
                  <Area
                    type="monotone"
                    dataKey="netIncome"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    fill="url(#netIncomeGradient)"
                    dot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#FFFFFF' }}
                    activeDot={{ r: 8, fill: '#3B82F6', strokeWidth: 3, stroke: '#FFFFFF' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Revenue Trends */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 mb-4 flex items-center gap-2">
              📈 Tendencia de Ingresos vs Gastos
            </h3>
            <div className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={350} minWidth={300}>
                <BarChart 
                  data={monthlyTrends} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  barCategoryGap={"20%"}
                >
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.7}/>
                    </linearGradient>
                    <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#DC2626" stopOpacity={0.7}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="#F3F4F6" 
                    strokeOpacity={0.7}
                  />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
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
                    formatter={(value, name) => [
                      `$${value.toLocaleString()}`, 
                      name === 'revenue' ? '💰 Ingresos' : '💸 Gastos'
                    ]}
                    labelFormatter={(label) => `📅 ${label} 2025`}
                    cursor={{ fill: 'rgba(59, 130, 246, 0.05)', radius: 8 }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="url(#revenueGradient)" 
                    name="revenue" 
                    radius={[4, 4, 0, 0]}
                    stroke="#10B981"
                    strokeWidth={1}
                  />
                  <Bar 
                    dataKey="expenses" 
                    fill="url(#expensesGradient)" 
                    name="expenses" 
                    radius={[4, 4, 0, 0]}
                    stroke="#EF4444"
                    strokeWidth={1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expenses by Category */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 mb-4 flex items-center gap-2">
              🥧 Distribución de Gastos
            </h3>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <ResponsiveContainer width="100%" height={280} minWidth={300}>
                  <RechartsPieChart>
                    <defs>
                      {expensesByCategory.map((entry, index) => (
                        <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor={entry.color} stopOpacity={0.9}/>
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.6}/>
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      dataKey="value"
                      data={expensesByCategory}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={40}
                      paddingAngle={3}
                      stroke="#ffffff"
                      strokeWidth={2}
                    >
                      {expensesByCategory.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#gradient-${index})`}
                        />
                      ))}
                    </Pie>
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
                      formatter={(value, name) => {
                        const entry = expensesByCategory.find(e => e.name === name);
                        return [`$${value.toLocaleString()}`, `${entry?.icon || ''} ${name}`];
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Enhanced Legend */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
                {expensesByCategory.map((entry, index) => {
                  const percentage = ((entry.value / expensesByCategory.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1);
                  return (
                    <div key={entry.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0" 
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-xs">{entry.icon}</span>
                          <span className="text-sm font-bold text-gray-900 truncate">{entry.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600">${(entry.value / 1000).toFixed(0)}K</span>
                          <span className="text-xs font-bold text-gray-800">{percentage}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Startups Financial Table */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
              🏢 Finanzas por Startup
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 font-bold tracking-tight text-gray-700">
                    Startup
                  </th>
                  <th className="text-left py-4 px-6 font-bold tracking-tight text-gray-700">
                    Etapa
                  </th>
                  <th className="text-right py-4 px-6 font-bold tracking-tight text-gray-700">
                    Ingresos
                  </th>
                  <th className="text-right py-4 px-6 font-bold tracking-tight text-gray-700">
                    Gastos
                  </th>
                  <th className="text-right py-4 px-6 font-bold tracking-tight text-gray-700">
                    Burn Rate
                  </th>
                  <th className="text-right py-4 px-6 font-bold tracking-tight text-gray-700">
                    Runway
                  </th>
                  <th className="text-left py-4 px-6 font-bold tracking-tight text-gray-700">
                    Última Act.
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((startup, index) => (
                  <tr
                    key={startup.id}
                    className={`hover:bg-gray-50 transition-colors duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-sm font-bold text-white">
                            {startup.startupName.charAt(0)}
                          </span>
                        </div>
                        <div className="font-bold tracking-tight text-gray-900">
                          {startup.startupName}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800">
                        {startup.stage === 'idea' ? '💡 Idea' : startup.stage === 'validation' ? '🧪 Validación' : '🎯 PMF'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        ${startup.revenue.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                        ${startup.expenses.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                        ${Math.abs(startup.burnRate).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getRunwayColor(startup.runway).replace('bg-', 'bg-gradient-to-r from-').replace('text-', 'text-')}`}
                      >
                        {startup.runway < 12 ? '⚠️' : startup.runway < 18 ? '🔶' : '✅'} {startup.runway} meses
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-500 text-sm font-medium bg-gray-100 px-2 py-1 rounded-full">
                        {startup.lastUpdate}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
