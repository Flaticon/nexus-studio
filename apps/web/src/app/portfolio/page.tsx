// apps/web/src/app/portfolio/page.tsx
"use client";

import React, { useState } from "react";
import {
  Grid3x3,
  List,
  Kanban,
  Calendar,
  Plus,
  Filter,
  Download,
  BarChart3,
  Search,
  Edit,
  MoreVertical,
  Building2,
  Award,
  Activity,
  Clock,
  TrendingUp,
  Target,
  Users,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import CreateProjectModal from "../../components/forms/CreateProjectModal";
import EditProjectModal from "../../components/forms/EditProjectModal";
import Layout from "../../components/layout/Layout";
import { MetricsGrid, Metric } from '@/components/ui/MetricsGrid';

export default function PortfolioPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedProyectos, setSelectedProyectos] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    stage: '',
    status: '',
    search: ''
  });

  // Mock data for demonstration
  const initialProyectos = [
    {
      _id: "1",
      name: "EcoTech Solutions",
      stage: "validation",
      status: "active",
      squad: {
        lead: { name: "Ana García", role: "Product Lead" },
        members: [
          { name: "Carlos López", role: "Developer" },
          { name: "María Rodríguez", role: "Designer" },
        ],
      },
      resources: {
        deck: "#",
        demo: "#",
        repository: "#",
      },
      kpis: [
        { name: "MAU", current: 1200, target: 2000, unit: "users" },
        { name: "MRR", current: 5000, target: 10000, unit: "USD" },
      ],
    },
    {
      _id: "2",
      name: "FinanceAI",
      stage: "pmf",
      status: "active",
      squad: {
        lead: { name: "Roberto Silva", role: "Tech Lead" },
        members: [
          { name: "Laura Martín", role: "AI Engineer" },
          { name: "David Chen", role: "Backend Dev" },
        ],
      },
      resources: {
        deck: "#",
        demo: "#",
        repository: "#",
      },
      kpis: [
        { name: "ARR", current: 50000, target: 100000, unit: "USD" },
        { name: "Customers", current: 85, target: 200, unit: "count" },
      ],
    },
    {
      _id: "3",
      name: "HealthTracker",
      stage: "idea",
      status: "active",
      squad: {
        lead: { name: "Sofia Ramírez", role: "Product Manager" },
        members: [{ name: "Miguel Torres", role: "Mobile Dev" }],
      },
      resources: {
        deck: "#",
        demo: null,
        repository: "#",
      },
      kpis: [{ name: "Prototype", current: 60, target: 100, unit: "%" }],
    },
  ];

  const [proyectos, setProyectos] = useState(initialProyectos);
  
  // Filter function
  const filteredProyectos = proyectos.filter((proyecto) => {
    const matchesStage = !filters.stage || proyecto.stage === filters.stage;
    const matchesStatus = !filters.status || proyecto.status === filters.status;
    const matchesSearch = !filters.search || 
      proyecto.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      proyecto.squad.lead.name.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesStage && matchesStatus && matchesSearch;
  });
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const clearFilters = () => {
    setFilters({ stage: '', status: '', search: '' });
  };

  const handleCreateEmpresa = (projectData) => {
    const newEmpresa = {
      _id: projectData.id,
      name: projectData.name,
      stage: projectData.stage,
      status: projectData.status,
      industry: projectData.industry,
      description: projectData.description,
      initialBudget: projectData.initialBudget,
      timeline: projectData.timeline,
      priority: projectData.priority,
      tags: projectData.tags,
      createdAt: projectData.createdAt,
      squad: projectData.squad,
      resources: projectData.resources,
      kpis: projectData.kpis,
    };

    setProyectos((prev) => [...prev, newEmpresa]);
    setIsCreateModalOpen(false);
  };

  const handleEditEmpresa = (proyectoData) => {
    setProyectos((prev) =>
      prev.map((proyecto) =>
        proyecto._id === proyectoData._id ? proyectoData : proyecto,
      ),
    );
    setIsEditModalOpen(false);
    setEditingEmpresa(null);
  };

  const openEditModal = (proyecto) => {
    setEditingEmpresa(proyecto);
    setIsEditModalOpen(true);
  };

  const stats = {
    total: filteredProyectos.length,
    byStatus: {
      active: filteredProyectos.filter((s) => s.status === "active").length,
      paused: filteredProyectos.filter((s) => s.status === "paused").length,
    },
  };

  const getProyectosByStage = (stage) => {
    return filteredProyectos.filter((s) => s.stage === stage);
  };

  const stages = ["idea", "validation", "pmf", "growth", "scale"];
  const stageLabels = {
    idea: "Idea",
    validation: "Validation",
    pmf: "PMF",
    growth: "Growth",
    scale: "Scale",
  };

  const stageColors = {
    idea: "stage-idea border-2",
    validation: "stage-validation border-2", 
    pmf: "stage-pmf border-2",
    growth: "stage-growth border-2",
    scale: "stage-scale border-2",
  };

  const stageBadgeColors = {
    idea: "bg-indigo-50 text-indigo-700 border-indigo-200",
    validation: "bg-amber-50 text-amber-700 border-amber-200",
    pmf: "bg-emerald-50 text-emerald-700 border-emerald-200", 
    growth: "bg-blue-50 text-blue-700 border-blue-200",
    scale: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const viewIcons = {
    grid: Grid3x3,
    list: List,
    kanban: Kanban,
    timeline: Calendar,
  };

  // Portfolio overview metrics
  const portfolioMetrics: Metric[] = [
    {
      id: 'total-proyectos',
      title: 'Total Proyectos',
      value: stats.total,
      change: { value: 25, type: 'positive' },
      icon: Building2,
      description: 'En el portafolio',
      color: 'teal'
    },
    {
      id: 'active-proyectos',
      title: 'Proyectos Activas',
      value: stats.byStatus.active,
      change: { value: 15, type: 'positive' },
      icon: CheckCircle,
      description: 'En desarrollo activo',
      color: 'success'
    },
    {
      id: 'avg-progress',
      title: 'Progreso Promedio',
      value: '76%',
      change: { value: 8, type: 'positive' },
      icon: TrendingUp,
      description: 'KPIs vs objetivos',
      color: 'primary'
    },
    {
      id: 'team-members',
      title: 'Miembros Activos',
      value: filteredProyectos.reduce((sum, s) => sum + s.squad.members.length + 1, 0),
      change: { value: 12, type: 'positive' },
      icon: Users,
      description: 'En todos los equipos',
      color: 'purple'
    }
  ];

  // Individual proyecto metrics
  const proyectoMetrics: Metric[] = filteredProyectos.map((proyecto, index) => {
    const colors = ['teal', 'indigo', 'orange', 'success', 'warning', 'danger'] as const;
    const mainKpi = proyecto.kpis[0];
    const progress = mainKpi ? Math.round((mainKpi.current / mainKpi.target) * 100) : 0;

    return {
      id: `proyecto-${proyecto._id}`,
      title: proyecto.name,
      value: mainKpi ? `${mainKpi.current.toLocaleString()} ${mainKpi.unit}` : 'Sin KPIs',
      change: {
        value: progress > 75 ? 15 : progress > 50 ? 8 : -5,
        type: progress > 75 ? 'positive' : progress > 50 ? 'neutral' : 'negative'
      },
      icon: proyecto.stage === 'pmf' ? Award : proyecto.stage === 'validation' ? Activity : Clock,
      description: `${proyecto.stage.toUpperCase()} • ${proyecto.squad.members.length + 1} miembros • ${mainKpi?.name || 'KPI principal'}`,
      color: colors[index % colors.length]
    };
  });

  return (
    <Layout
      title="🚀 Gestión de Proyectos"
      subtitle="Gestión de iniciativas, etapas, equipos y KPIs"
    >
      <div className="p-3 sm:p-6 min-h-screen" style={{ background: 'var(--background)' }}>
        {/* Portfolio Overview Metrics */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
                Resumen del Portafolio
              </h2>
              <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                Métricas clave de todas las proyectos
              </p>
            </div>
          </div>

          <MetricsGrid
            metrics={portfolioMetrics}
            columns={4}
            gap={3}
          />
        </div>

        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col gap-4 mb-4">

            {/* Action Buttons - Mobile Optimized */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
              <button
                className="px-3 py-2 rounded-full flex items-center gap-2 text-sm transition-all duration-200 font-medium bg-white shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200"
                onClick={() => setShowFilters(!showFilters)}
                onMouseEnter={(e) => e.target.style.background = '#f8fafc'}
                onMouseLeave={(e) => e.target.style.background = 'white'}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtros</span>
              </button>

              <button className="px-3 py-2 rounded-full flex items-center gap-2 text-sm font-medium bg-white shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-200">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>

              <button
                className="px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 flex items-center gap-2 text-sm font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden xs:inline">Nueva</span>
                <span className="hidden sm:inline">Empresa</span>
              </button>
            </div>
          </div>

          {/* View Controls - Mobile Responsive */}
          <div className="flex flex-col gap-4">
            {/* View Mode Selector & Search Row */}
            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3">
              {/* View Mode Selector */}
              <div className="flex justify-center xs:justify-start">
                <div className="inline-flex bg-white rounded-full shadow-md border border-gray-200 p-1">
                  {Object.entries(viewIcons).map(([mode, Icon]) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`p-3 rounded-full transition-all duration-200 ${
                        viewMode === mode
                          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      title={mode.charAt(0).toUpperCase() + mode.slice(1)}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar proyectos y equipos..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 text-sm font-bold tracking-tight border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white shadow-md hover:shadow-lg transition-all duration-200"
                    style={{
                      fontFamily: 'inherit',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Filtros</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Limpiar filtros
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Stage Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Etapa
                </label>
                <select
                  value={filters.stage}
                  onChange={(e) => handleFilterChange('stage', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-bold tracking-tight"
                  style={{
                    fontFamily: 'inherit',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="">Todas las etapas</option>
                  <option value="idea">Idea</option>
                  <option value="validation">Validation</option>
                  <option value="pmf">PMF</option>
                  <option value="growth">Growth</option>
                  <option value="scale">Scale</option>
                </select>
              </div>
              
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-bold tracking-tight"
                  style={{
                    fontFamily: 'inherit',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="">Todos los estados</option>
                  <option value="active">Activa</option>
                  <option value="paused">Pausada</option>
                </select>
              </div>
              
              {/* Active Filters Indicator */}
              <div className="flex items-center gap-2">
                {(filters.stage || filters.status || filters.search) && (
                  <div className="flex flex-wrap gap-2">
                    {filters.stage && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        Etapa: {stageLabels[filters.stage]}
                        <button
                          onClick={() => handleFilterChange('stage', '')}
                          className="hover:bg-blue-200 rounded-full p-0.5"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {filters.status && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Estado: {filters.status === 'active' ? 'Activa' : 'Pausada'}
                        <button
                          onClick={() => handleFilterChange('status', '')}
                          className="hover:bg-green-200 rounded-full p-0.5"
                        >
                          ×
                        </button>
                      </span>
                    )}
                    {filters.search && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        Buscar: {filters.search}
                        <button
                          onClick={() => handleFilterChange('search', '')}
                          className="hover:bg-purple-200 rounded-full p-0.5"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Mostrando {filteredProyectos.length} de {proyectos.length} proyectos
              </p>
            </div>
          </div>
        )}

        {/* Kanban Board */}
        {viewMode === "kanban" && (
          <div className="w-full">
            {/* Mobile: Stack columns vertically, Desktop: Horizontal scroll */}
            <div className="hidden lg:block overflow-x-auto pb-4">
              <div className="flex gap-6" style={{ minWidth: '100%' }}>
                {stages.map((stage) => {
                  const stageProyectos = getProyectosByStage(stage);
                  return (
                    <div
                      key={stage}
                      className={`flex-shrink-0 w-80 rounded-2xl border-2 ${stageColors[stage as keyof typeof stageColors]} p-5 shadow-sm`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                          {stageLabels[stage as keyof typeof stageLabels]}
                        </h3>
                        <span className="bg-white px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">
                          {stageProyectos.length}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {stageProyectos.map((proyecto) => (
                          <div
                            key={proyecto._id}
                            className="bg-white p-5 rounded-2xl border border-gray-200/60 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 group backdrop-blur-sm"
                          >
                            {/* Header Section */}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3 flex-1">
                                <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                                  <span className="text-base font-bold text-white tracking-tight">
                                    {proyecto.name.charAt(0)}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-lg font-bold text-gray-900 tracking-tight leading-tight">
                                    {proyecto.name}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1 font-medium">
                                    {proyecto.squad.lead.name} • {proyecto.squad.members.length + 1} miembros
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => openEditModal(proyecto)}
                                className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:bg-blue-50 rounded-xl"
                                title="Editar proyecto"
                              >
                                <Edit className="w-4 h-4 text-blue-600" />
                              </button>
                            </div>
                            
                            {/* Stage Badge */}
                            <div className="mb-5">
                              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${
                                stageBadgeColors[proyecto.stage as keyof typeof stageBadgeColors]
                              }`}>
                                {stageLabels[proyecto.stage as keyof typeof stageLabels]}
                              </span>
                            </div>
                            
                            {/* Resources */}
                            <div className="flex flex-wrap gap-2 mb-5">
                              {proyecto.resources.deck && (
                                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 font-semibold">
                                  📋 Deck
                                </span>
                              )}
                              {proyecto.resources.demo && (
                                <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 font-semibold">
                                  🎯 Demo
                                </span>
                              )}
                              {proyecto.resources.repository && (
                                <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full border border-purple-200 font-semibold">
                                  💻 Repo
                                </span>
                              )}
                            </div>
                            {/* KPIs - Modern */}
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                              {proyecto.kpis.slice(0, 2).map((kpi, idx) => (
                                <div key={idx} className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-gray-700">
                                      {kpi.name}
                                    </span>
                                    <span className="text-sm font-bold text-gray-900">
                                      {kpi.current.toLocaleString()}
                                      <span className="text-xs text-gray-500 font-normal">
                                        /{kpi.target.toLocaleString()}
                                      </span>
                                    </span>
                                  </div>
                                  <div className="relative">
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                      <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                                        style={{
                                          width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%`,
                                        }}
                                      />
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 text-right font-medium">
                                      {Math.round((kpi.current / kpi.target) * 100)}% completo
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Mobile: Stacked columns */}
            <div className="lg:hidden space-y-6">
              {stages.map((stage) => {
                const stageProyectos = getProyectosByStage(stage);
                return (
                  <div
                    key={stage}
                    className={`rounded-2xl border-2 ${stageColors[stage as keyof typeof stageColors]} p-4 shadow-sm`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-gray-900 tracking-tight">
                        {stageLabels[stage as keyof typeof stageLabels]}
                      </h3>
                      <span className="bg-white px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">
                        {stageProyectos.length}
                      </span>
                    </div>

                    {/* Mobile Cards */}
                    <div className="space-y-3">
                      {stageProyectos.map((proyecto) => (
                        <div
                          key={proyecto._id}
                          className="bg-white p-4 rounded-2xl border border-gray-200/60 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300 group backdrop-blur-sm"
                        >
                          {/* Mobile Card Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2 flex-1">
                              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                                <span className="text-sm font-bold text-white tracking-tight">
                                  {proyecto.name.charAt(0)}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-base font-bold text-gray-900 truncate tracking-tight">
                                  {proyecto.name}
                                </h4>
                                <div className="text-sm text-gray-600 mt-0.5 font-medium">
                                  {proyecto.squad.lead.name} • {proyecto.squad.members.length + 1} miembros
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => openEditModal(proyecto)}
                              className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-blue-50 rounded-xl transition-all duration-200"
                              title="Editar proyecto"
                            >
                              <Edit className="w-4 h-4 text-blue-600" />
                            </button>
                          </div>

                          {/* Mobile Stage Badge */}
                          <div className="mb-4">
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold border ${
                              stageBadgeColors[proyecto.stage as keyof typeof stageBadgeColors]
                            }`}>
                              {stageLabels[proyecto.stage as keyof typeof stageLabels]}
                            </span>
                          </div>

                          {/* Mobile Resources */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {proyecto.resources.deck && (
                              <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1.5 rounded-full border border-blue-200 font-semibold">
                                📋 Deck
                              </span>
                            )}
                            {proyecto.resources.demo && (
                              <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1.5 rounded-full border border-emerald-200 font-semibold">
                                🎯 Demo
                              </span>
                            )}
                            {proyecto.resources.repository && (
                              <span className="text-xs bg-purple-50 text-purple-700 px-2.5 py-1.5 rounded-full border border-purple-200 font-semibold">
                                💻 Repo
                              </span>
                            )}
                          </div>

                          {/* Mobile KPIs - Modern */}
                          <div className="pt-3 border-t border-gray-100">
                            {proyecto.kpis.slice(0, 1).map((kpi, idx) => (
                              <div key={idx} className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-semibold text-gray-700">
                                    {kpi.name}
                                  </span>
                                  <span className="text-sm font-bold text-gray-900">
                                    {Math.round((kpi.current / kpi.target) * 100)}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                                    style={{
                                      width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-title" style={{ color: 'var(--text-primary)' }}>
                  Proyectos Individuales
                </h2>
                <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                  Performance y KPIs de cada proyecto
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">
                  {filteredProyectos.length} proyectos
                </span>
              </div>
            </div>

            <MetricsGrid
              metrics={proyectoMetrics}
              columns={3}
              gap={3}
            />

            {/* Additional Details Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProyectos.map((proyecto) => (
                <div
                  key={proyecto._id}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-900">{proyecto.name}</h4>
                    <button
                      onClick={() => openEditModal(proyecto)}
                      className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      stageBadgeColors[proyecto.stage as keyof typeof stageBadgeColors]
                    }`}>
                      {stageLabels[proyecto.stage as keyof typeof stageLabels]}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 mb-3">
                    <strong>{proyecto.squad.lead.name}</strong> • {proyecto.squad.members.length + 1} miembros
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {proyecto.resources.deck && (
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">
                        📋 Deck
                      </span>
                    )}
                    {proyecto.resources.demo && (
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-medium">
                        🎯 Demo
                      </span>
                    )}
                    {proyecto.resources.repository && (
                      <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded font-medium">
                        💻 Repo
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-gray-500">
                    {proyecto.kpis.length} KPIs configurados
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Empresa
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Etapa
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Team Lead
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      KPIs Principales
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Recursos
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredProyectos.map((proyecto) => (
                    <tr key={proyecto._id} className="hover:bg-blue-50/30 transition-colors duration-200">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-xs font-bold text-white tracking-tight">
                              {proyecto.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 tracking-tight">
                              {proyecto.name}
                            </div>
                            {proyecto.description && (
                              <div className="text-sm text-gray-600 max-w-xs truncate font-medium">
                                {proyecto.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full border ${
                            stageBadgeColors[proyecto.stage as keyof typeof stageBadgeColors]
                          }`}
                        >
                          {stageLabels[proyecto.stage as keyof typeof stageLabels]}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full border ${
                            proyecto.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        >
                          {proyecto.status === "active" ? "Activa" : "Pausada"}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          {proyecto.squad.lead.name}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {proyecto.squad.members.length + 1} miembros
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-2">
                          {proyecto.kpis.slice(0, 2).map((kpi, idx) => (
                            <div key={idx} className="text-sm">
                              <div className="font-semibold text-gray-700">
                                {kpi.name}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">
                                  {kpi.current.toLocaleString()}
                                </span>
                                <span className="text-gray-500 font-medium">
                                  / {kpi.target.toLocaleString()}
                                </span>
                                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-bold">
                                  {Math.round((kpi.current / kpi.target) * 100)}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-1.5">
                          {proyecto.resources.deck && (
                            <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1.5 rounded-full border border-blue-200 font-semibold">
                              📋 Deck
                            </span>
                          )}
                          {proyecto.resources.demo && (
                            <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1.5 rounded-full border border-emerald-200 font-semibold">
                              🎯 Demo
                            </span>
                          )}
                          {proyecto.resources.repository && (
                            <span className="text-xs bg-purple-50 text-purple-700 px-2.5 py-1.5 rounded-full border border-purple-200 font-semibold">
                              💻 Repo
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openEditModal(proyecto)}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-xl transition-all duration-200"
                          title="Editar proyecto"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Timeline View */}
        {viewMode === "timeline" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 backdrop-blur-sm p-8">
            <div className="space-y-8">
              {filteredProyectos.map((proyecto, index) => (
                <div key={proyecto._id} className="relative">
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-md">
                      <span className="text-base font-bold text-white tracking-tight">
                        {proyecto.name.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight leading-tight">
                            {proyecto.name}
                          </h3>

                          <div className="flex items-center gap-3 mb-4">
                            <span
                              className={`inline-flex px-3 py-1.5 text-xs font-bold rounded-full border ${
                                stageBadgeColors[proyecto.stage as keyof typeof stageBadgeColors]
                              }`}
                            >
                              {stageLabels[proyecto.stage as keyof typeof stageLabels]}
                            </span>
                            <span className="text-sm text-gray-600 font-medium">
                              Lead: {proyecto.squad.lead.name}
                            </span>
                            <span className="text-sm text-gray-600 font-medium">
                              {proyecto.squad.members.length + 1} miembros
                            </span>
                          </div>

                          {proyecto.description && (
                            <p className="text-sm text-gray-600 mb-5 leading-relaxed font-medium">
                              {proyecto.description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-2 mb-5">
                            {proyecto.resources.deck && (
                              <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 font-semibold">
                                📋 Deck
                              </span>
                            )}
                            {proyecto.resources.demo && (
                              <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 font-semibold">
                                🎯 Demo
                              </span>
                            )}
                            {proyecto.resources.repository && (
                              <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full border border-purple-200 font-semibold">
                                💻 Repo
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {proyecto.kpis.map((kpi, idx) => (
                              <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-200/60 shadow-sm">
                                <div className="flex justify-between items-center mb-3">
                                  <span className="text-sm font-semibold text-gray-700">
                                    {kpi.name}
                                  </span>
                                  <span className="text-sm font-bold text-gray-900">
                                    {kpi.current.toLocaleString()}
                                    <span className="text-xs text-gray-500 font-normal">
                                      / {kpi.target.toLocaleString()}
                                    </span>
                                  </span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                                    style={{
                                      width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%`,
                                    }}
                                  />
                                </div>
                                <div className="text-xs text-gray-500 mt-2 text-right font-medium">
                                  {Math.round((kpi.current / kpi.target) * 100)}% completo
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => openEditModal(proyecto)}
                          className="p-2 hover:bg-blue-50 rounded-2xl transition-all duration-200"
                          title="Editar proyecto"
                        >
                          <Edit className="w-5 h-5 text-blue-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Timeline line */}
                  {index !== filteredProyectos.length - 1 && (
                    <div className="absolute left-6 top-14 w-px h-8 bg-gradient-to-b from-blue-300 to-purple-300"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Project Modal */}
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateEmpresa}
        />

        {/* Edit Project Modal */}
        <EditProjectModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingEmpresa(null);
          }}
          onSubmit={handleEditEmpresa}
          proyecto={editingEmpresa}
        />
      </div>
    </Layout>
  );
}
