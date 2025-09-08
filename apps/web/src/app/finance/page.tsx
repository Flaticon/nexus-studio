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
    { name: "Personal", value: 65000, color: "#8B5CF6" },
    { name: "Marketing", value: 25000, color: "#10B981" },
    { name: "Infraestructura", value: 35000, color: "#F59E0B" },
    { name: "Legal/Admin", value: 15000, color: "#EF4444" },
    { name: "I+D", value: 45000, color: "#3B82F6" },
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
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                💰 Finanzas Consolidadas
              </h1>
              <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
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
                className={`w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg flex items-center justify-center sm:justify-start gap-2 transition-all duration-200 ${
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
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg flex items-center justify-center sm:justify-start gap-2 text-white transition-all duration-200"
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
          <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filtros Avanzados</h3>
              <div className="flex gap-2">
                <button
                  onClick={resetFilters}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Limpiar Filtros
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
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
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Mostrando {filteredAndSortedData.length} de {financialData.length} startups
                {hasActiveFilters && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Filtros activos
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Ingresos Totales
              </h3>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              ${totalRevenue.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <ArrowUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 ml-1">
                +12.5% vs mes anterior
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Gastos Totales
              </h3>
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              ${totalExpenses.toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <ArrowDown className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-600 ml-1">
                -3.2% vs mes anterior
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Burn Rate Mensual
              </h3>
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              ${Math.abs(totalBurnRate).toLocaleString()}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-600">Mejorando tendencia</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Runway Promedio
              </h3>
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {avgRunway} meses
            </p>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-600">
                Basado en burn rate actual
              </span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {/* Revenue Trends */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Tendencia de Ingresos vs Gastos
            </h3>
            <div className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={300} minWidth={300}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                  labelFormatter={(label) => `Mes: ${label}`}
                />
                <Bar dataKey="revenue" fill="#10B981" name="Ingresos" />
                <Bar dataKey="expenses" fill="#EF4444" name="Gastos" />
              </BarChart>
            </ResponsiveContainer>
            </div>
          </div>

          {/* Expenses by Category */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
              Distribución de Gastos
            </h3>
            <div className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={300} minWidth={300}>
              <RechartsPieChart>
                <Pie
                  dataKey="value"
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Startups Financial Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Finanzas por Startup
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-600">
                    Startup
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600">
                    Etapa
                  </th>
                  <th className="text-right py-3 px-6 font-medium text-gray-600">
                    Ingresos
                  </th>
                  <th className="text-right py-3 px-6 font-medium text-gray-600">
                    Gastos
                  </th>
                  <th className="text-right py-3 px-6 font-medium text-gray-600">
                    Burn Rate
                  </th>
                  <th className="text-right py-3 px-6 font-medium text-gray-600">
                    Runway
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600">
                    Última Act.
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedData.map((startup, index) => (
                  <tr
                    key={startup.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        {startup.startupName}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {startup.stage}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-green-600 font-medium">
                        ${startup.revenue.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-red-600 font-medium">
                        ${startup.expenses.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-orange-600 font-medium">
                        ${Math.abs(startup.burnRate).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRunwayColor(startup.runway)}`}
                      >
                        {startup.runway} meses
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600 text-sm">
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
