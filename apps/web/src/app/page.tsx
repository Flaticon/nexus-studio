'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  DollarSign, 
  Users, 
  Target,
  TrendingUp,
  Activity,
  ArrowRight,
  BarChart3,
  Plug
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Nexus Studio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plataforma integral de gestión para tu startup studio. 
            Administra portafolio, finanzas, OKRs y equipos desde un solo lugar.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-12">
          <Link href="/dashboard" className="group">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group-hover:scale-105 transition-transform">
              <Activity className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                📊 Dashboard Ejecutivo
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Vista general con métricas clave, alertas y KPIs
              </p>
              <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="/portfolio" className="group">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group-hover:scale-105 transition-transform">
              <Briefcase className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🟢 Portafolio de Startups
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Gestiona iniciativas, etapas, equipos y KPIs
              </p>
              <ArrowRight className="h-5 w-5 text-green-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="/finance" className="group">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group-hover:scale-105 transition-transform">
              <DollarSign className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🟠 Finanzas Consolidadas
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Ingresos, costos y burn rate por iniciativa
              </p>
              <ArrowRight className="h-5 w-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="/okrs" className="group">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group-hover:scale-105 transition-transform">
              <Users className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🟣 OKRs Operativos
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Objetivos y resultados clave por equipo
              </p>
              <ArrowRight className="h-5 w-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="/talent" className="group">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group-hover:scale-105 transition-transform">
              <Users className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🔥 Talent & Teams
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Gestión de talento y equipos del studio
              </p>
              <ArrowRight className="h-5 w-5 text-red-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="/analytics" className="group">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group-hover:scale-105 transition-transform">
              <BarChart3 className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                📈 Data Analytics
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Análisis avanzado de datos e insights inteligentes
              </p>
              <ArrowRight className="h-5 w-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link href="/integrations" className="group">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group-hover:scale-105 transition-transform">
              <Plug className="h-12 w-12 text-cyan-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                🔌 Integrations Hub
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Gestiona APIs, webhooks y automatizaciones
              </p>
              <ArrowRight className="h-5 w-5 text-cyan-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Quick Access */}
        <div className="text-center space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 max-w-7xl mx-auto">
            <Link href="/dashboard" className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium text-sm">
              <Activity className="h-4 w-4" />
              Módulo 1 - Dashboard
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link href="/portfolio" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
              <Briefcase className="h-4 w-4" />
              Módulo 2 - Portafolio
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link href="/finance" className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium text-sm">
              <DollarSign className="h-4 w-4" />
              Módulo 3 - Finanzas
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link href="/okrs" className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm">
              <Target className="h-4 w-4" />
              Módulo 4 - OKRs
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link href="/talent" className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm">
              <Users className="h-4 w-4" />
              Módulo 5 - Talent
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link href="/analytics" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm">
              <BarChart3 className="h-4 w-4" />
              Módulo 6 - Analytics
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link href="/integrations" className="inline-flex items-center gap-2 bg-cyan-600 text-white px-4 py-3 rounded-lg hover:bg-cyan-700 transition-colors font-medium text-sm">
              <Plug className="h-4 w-4" />
              Módulo 7 - Integrations
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <p className="mt-4 text-gray-600">
            ¡Todos los 7 Módulos están completamente implementados y listos para probar!
          </p>
        </div>
      </div>
    </div>
  );
}
