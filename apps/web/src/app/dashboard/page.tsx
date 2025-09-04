// apps/web/src/app/dashboard/page.tsx
'use client';

import { 
  Briefcase, 
  DollarSign, 
  Users, 
  Target,
  TrendingUp,
  Activity
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // Mock data
  const mockSummary = {
    metrics: {
      startups: {
        active: 8,
        total: 12,
        weeklyGrowth: 5
      },
      revenue: {
        mrr: 45000,
        growth: 12
      },
      burnRate: {
        current: 35000,
        runway: 18,
        trend: 'stable'
      },
      team: {
        utilization: 85,
        total: 24
      }
    },
    topPerformers: [
      { id: '1', name: 'FinanceAI', metric: 'MRR', value: 15000, change: 25 },
      { id: '2', name: 'EcoTech Solutions', metric: 'Users', value: 2500, change: 15 },
      { id: '3', name: 'HealthTracker', metric: 'Growth', value: 180, change: -5 }
    ]
  };

  const MetricCard = ({ title, value, change, changeType, icon, subtitle }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {change && (
            <p className={`text-sm mt-1 ${
              changeType === 'positive' ? 'text-green-600' : 
              changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {change > 0 ? '+' : ''}{change}% vs last period
            </p>
          )}
        </div>
        <div className="ml-4">
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          ⚪ Dashboard C-Level (Vista General Ejecutiva)
        </h1>
        <p className="mt-2 text-gray-600">
          Overview del estudio con métricas clave y alertas importantes
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="mb-6 flex gap-4">
        <Link 
          href="/portfolio"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Briefcase className="h-4 w-4" />
          Ver Portafolio (Módulo 2)
        </Link>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg opacity-50 cursor-not-allowed">
          Finanzas (Próximamente)
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg opacity-50 cursor-not-allowed">
          OKRs (Próximamente)
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard
          title="Startups Activas"
          value={mockSummary.metrics.startups.active}
          change={mockSummary.metrics.startups.weeklyGrowth}
          changeType="positive"
          icon={<Briefcase className="h-6 w-6 text-blue-600" />}
          subtitle={`de ${mockSummary.metrics.startups.total} totales`}
        />
        
        <MetricCard
          title="Revenue Mensual"
          value={`$${mockSummary.metrics.revenue.mrr.toLocaleString()}`}
          change={mockSummary.metrics.revenue.growth}
          changeType="positive"
          icon={<DollarSign className="h-6 w-6 text-green-600" />}
        />
        
        <MetricCard
          title="Burn Rate"
          value={`$${mockSummary.metrics.burnRate.current.toLocaleString()}`}
          subtitle={`${mockSummary.metrics.burnRate.runway} meses runway`}
          changeType="neutral"
          icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
        />
        
        <MetricCard
          title="Utilización Equipo"
          value={`${mockSummary.metrics.team.utilization}%`}
          subtitle={`${mockSummary.metrics.team.total} miembros`}
          changeType="neutral"
          icon={<Users className="h-6 w-6 text-purple-600" />}
        />
      </div>

      {/* Alerts Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            📊 Métricas en Tiempo Real
          </h3>
          <div className="space-y-4">
            <div className="h-32 bg-gray-100 rounded flex items-center justify-center text-gray-500">
              Gráfico de Revenue (Requiere datos del backend)
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            🚨 Alertas del Sistema
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">
                ⚠️ Burn Rate Alto
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                3 startups exceden el burn rate objetivo
              </p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800">
                ✅ OKRs en Track
              </p>
              <p className="text-xs text-green-600 mt-1">
                85% de objetivos trimestrales cumplidos
              </p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">
                📈 Nueva Milestone
              </p>
              <p className="text-xs text-blue-600 mt-1">
                FinanceAI alcanzó Product-Market Fit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          🏆 Startups con Mejor Performance
        </h3>
        
        <div className="space-y-3">
          {mockSummary.topPerformers.map((performer) => (
            <div key={performer.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{performer.name}</p>
                <p className="text-sm text-gray-500">Métrica: {performer.metric}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${performer.value.toLocaleString()}
                </p>
                <p className={`text-sm ${
                  performer.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {performer.change > 0 ? '+' : ''}{performer.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}