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
  ArrowRight
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/dashboard" className="group">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow group-hover:scale-105 transition-transform">
              <Activity className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Dashboard Ejecutivo
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

          <div className="bg-gray-50 p-6 rounded-lg shadow-lg opacity-75">
            <DollarSign className="h-12 w-12 text-orange-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              🟠 Finanzas Consolidadas
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Ingresos, costos y burn rate por iniciativa
            </p>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
              Próximamente
            </span>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-lg opacity-75">
            <Users className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              🟣 OKRs Operativos
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Objetivos y resultados clave por equipo
            </p>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
              Próximamente
            </span>
          </div>
        </div>

        {/* Quick Access */}
        <div className="text-center">
          <Link href="/portfolio" className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium">
            <Briefcase className="h-6 w-6" />
            Probar Módulo 2 - Portafolio
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-4 text-gray-600">
            ¡El Módulo 2 está completamente implementado y listo para probar!
          </p>
        </div>
      </div>
    </div>
  );
}
