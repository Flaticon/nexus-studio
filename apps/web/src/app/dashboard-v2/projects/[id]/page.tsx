'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '../../../../components/layout/Layout';
import { MetricsGrid } from '../../../../components/ui/MetricsGrid';
import { getProjectById } from '../../../../data/mockProjects';
import {
  ArrowLeft,
  Briefcase,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Target,
  Activity,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  LineChart,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const project = useMemo(() => {
    if (typeof params.id === 'string') {
      return getProjectById(params.id);
    }
    return null;
  }, [params.id]);

  if (!project) {
    return (
      <Layout title="Proyecto no encontrado" subtitle="El proyecto solicitado no existe">
        <div className="p-6 min-h-screen bg-neutral-50">
          <div className="max-w-md mx-auto mt-20 text-center">
            <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Proyecto no encontrado</h2>
            <p className="text-gray-600 mb-6">El proyecto que buscas no existe o ha sido eliminado.</p>
            <Link
              href="/dashboard-v2"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Dashboard
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning': return <Calendar className="w-5 h-5" />;
      case 'development': return <Activity className="w-5 h-5" />;
      case 'testing': return <AlertTriangle className="w-5 h-5" />;
      case 'deployment': return <CheckCircle className="w-5 h-5" />;
      case 'maintenance': return <XCircle className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-gray-100 text-gray-700';
      case 'development': return 'bg-blue-100 text-blue-700';
      case 'testing': return 'bg-yellow-100 text-yellow-700';
      case 'deployment': return 'bg-green-100 text-green-700';
      case 'maintenance': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },
    { id: 'finance', label: 'Finanzas', icon: DollarSign },
    { id: 'team', label: 'Equipo', icon: Users },
    { id: 'okrs', label: 'OKRs', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Project Metrics */}
            <MetricsGrid
              metrics={[
                {
                  id: 'revenue',
                  title: 'Revenue Actual',
                  value: `$${(project.revenue / 1000).toFixed(0)}K`,
                  change: { value: 12.5, type: 'positive' },
                  icon: DollarSign,
                  description: 'Revenue del proyecto',
                  color: 'success'
                },
                {
                  id: 'expenses',
                  title: 'Gastos Totales',
                  value: `$${(project.expenses / 1000).toFixed(0)}K`,
                  change: { value: -3.2, type: 'positive' },
                  icon: TrendingUp,
                  description: 'Gastos operativos',
                  color: 'warning'
                },
                {
                  id: 'roi',
                  title: 'ROI del Proyecto',
                  value: `${project.roi > 0 ? '+' : ''}${project.roi.toFixed(1)}%`,
                  change: { value: project.roi, type: project.roi > 0 ? 'positive' : 'negative' },
                  icon: Activity,
                  description: 'Retorno de inversión',
                  color: project.roi > 0 ? 'success' : 'danger'
                },
                {
                  id: 'team-size',
                  title: 'Tamaño del Equipo',
                  value: project.team.size.toString(),
                  change: { value: 2, type: 'positive' },
                  icon: Users,
                  description: 'Miembros activos',
                  color: 'purple'
                }
              ]}
              columns={4}
              gap={4}
            />

            {/* Project Details */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Detalles del Proyecto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Información General</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Categoría:</span>
                      <span className="font-medium">{project.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prioridad:</span>
                      <span className={`font-medium ${
                        project.priority === 'high' ? 'text-red-600' :
                        project.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Progreso:</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Última actualización:</span>
                      <span className="font-medium">{new Date(project.lastUpdate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Equipo</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Team Lead:</span>
                      <span className="font-medium">{project.team.lead}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tamaño del equipo:</span>
                      <span className="font-medium">{project.team.size} miembros</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Progreso del Proyecto</h3>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progreso general</span>
                  <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'finance':
        return (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Finanzas del Proyecto</h3>
            <p className="text-gray-600">Funcionalidad en desarrollo. Se integrará con el módulo de finanzas existente.</p>
          </div>
        );
      case 'team':
        return (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Gestión de Equipo</h3>
            <p className="text-gray-600">Funcionalidad en desarrollo. Se integrará con el módulo de talento existente.</p>
          </div>
        );
      case 'okrs':
        return (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">OKRs del Proyecto</h3>
            <p className="text-gray-600">Funcionalidad en desarrollo. Se integrará con el módulo de OKRs existente.</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Analytics del Proyecto</h3>
            <p className="text-gray-600">Funcionalidad en desarrollo. Métricas avanzadas y reportes personalizados.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Configuración del Proyecto</h3>
            <p className="text-gray-600">Funcionalidad en desarrollo. Configuraciones y preferencias del proyecto.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout
      title={`📊 ${project.name}`}
      subtitle={`${project.category} - Dashboard del proyecto`}
    >
      <div className="p-6 min-h-screen bg-neutral-50">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard-v2"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Dashboard
          </Link>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h1>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                  {getStatusIcon(project.status)}
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </div>
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl shadow-md p-2 border border-gray-100">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </Layout>
  );
}