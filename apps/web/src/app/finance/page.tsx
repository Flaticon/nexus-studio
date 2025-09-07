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

            <div className="flex gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 rounded-lg focus:outline-none transition-all duration-200"
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
                className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200"
                style={{
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => e.target.style.background = 'var(--surface-hover)'}
                onMouseLeave={(e) => e.target.style.background = 'var(--surface)'}
              >
                <Filter className="w-4 h-4" />
                Filtros
              </button>

              <button 
                className="px-4 py-2 rounded-lg flex items-center gap-2 text-white transition-all duration-200"
                style={{ background: 'var(--module-finance)' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>
          </div>
        </div>

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
                {financialData.map((startup, index) => (
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
