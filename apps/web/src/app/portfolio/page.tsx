// apps/web/src/app/portfolio/page.tsx
'use client';

import React, { useState } from 'react';
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
  Building2
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import CreateProjectModal from '../../components/forms/CreateProjectModal';
import EditProjectModal from '../../components/forms/EditProjectModal';
import Layout from '../../components/layout/Layout';

export default function PortfolioPage() {
  const [viewMode, setViewMode] = useState('kanban');
  const [showFilters, setShowFilters] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedStartups, setSelectedStartups] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStartup, setEditingStartup] = useState(null);

  // Mock data for demonstration
  const initialStartups = [
    {
      _id: '1',
      name: 'EcoTech Solutions',
      stage: 'validation',
      status: 'active',
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
      kpis: [
        { name: 'MAU', current: 1200, target: 2000, unit: 'users' },
        { name: 'MRR', current: 5000, target: 10000, unit: 'USD' }
      ]
    },
    {
      _id: '2',
      name: 'FinanceAI',
      stage: 'pmf',
      status: 'active',
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
      kpis: [
        { name: 'ARR', current: 50000, target: 100000, unit: 'USD' },
        { name: 'Customers', current: 85, target: 200, unit: 'count' }
      ]
    },
    {
      _id: '3',
      name: 'HealthTracker',
      stage: 'idea',
      status: 'active',
      squad: {
        lead: { name: 'Sofia Ramírez', role: 'Product Manager' },
        members: [
          { name: 'Miguel Torres', role: 'Mobile Dev' }
        ]
      },
      resources: {
        deck: '#',
        demo: null,
        repository: '#'
      },
      kpis: [
        { name: 'Prototype', current: 60, target: 100, unit: '%' }
      ]
    }
  ];

  const [startups, setStartups] = useState(initialStartups);

  const handleCreateStartup = (projectData) => {
    const newStartup = {
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
      kpis: projectData.kpis
    };

    setStartups(prev => [...prev, newStartup]);
    setIsCreateModalOpen(false);
  };

  const handleEditStartup = (startupData) => {
    setStartups(prev => prev.map(startup => 
      startup._id === startupData._id ? startupData : startup
    ));
    setIsEditModalOpen(false);
    setEditingStartup(null);
  };

  const openEditModal = (startup) => {
    setEditingStartup(startup);
    setIsEditModalOpen(true);
  };

  const stats = {
    total: startups.length,
    byStatus: {
      active: startups.filter(s => s.status === 'active').length,
      paused: startups.filter(s => s.status === 'paused').length
    }
  };

  const getStartupsByStage = (stage) => {
    return startups.filter(s => s.stage === stage);
  };

  const stages = ['idea', 'validation', 'pmf', 'growth', 'scale'];
  const stageLabels = {
    idea: 'Idea',
    validation: 'Validation',
    pmf: 'PMF',
    growth: 'Growth', 
    scale: 'Scale'
  };

  const stageColors = {
    idea: 'bg-gray-100 border-gray-300',
    validation: 'bg-yellow-50 border-yellow-300',
    pmf: 'bg-blue-50 border-blue-300',
    growth: 'bg-green-50 border-green-300',
    scale: 'bg-purple-50 border-purple-300'
  };

  const viewIcons = {
    grid: Grid3x3,
    list: List,
    kanban: Kanban,
    timeline: Calendar
  };

  return (
    <div className="p-3 sm:p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">
              🟢 Módulo 2 - Portafolio de Startups
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              {stats.total} total startups • 
              {stats.byStatus.active} activas • 
              {stats.byStatus.paused} pausadas
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm sm:text-base"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filtros</span>
            </button>
            
            <button className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 text-sm sm:text-base">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            
            <button 
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm sm:text-base"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Nueva Startup</span>
              <span className="sm:hidden">Nueva</span>
            </button>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex bg-white rounded-lg shadow-sm border p-1">
            {Object.entries(viewIcons).map(([mode, Icon]) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`
                  p-2 rounded transition-colors
                  ${viewMode === mode 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
                title={mode.charAt(0).toUpperCase() + mode.slice(1)}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="w-full sm:flex-1 sm:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Buscar startups..."
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-6 lg:overflow-x-auto lg:flex lg:pb-4">
          {stages.map(stage => {
            const stageStartups = getStartupsByStage(stage);
            
            return (
              <div
                key={stage}
                className={`w-full lg:min-w-80 rounded-lg border-2 ${stageColors[stage as keyof typeof stageColors]} p-3 lg:p-4`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900">
                    {stageLabels[stage as keyof typeof stageLabels]}
                  </h3>
                  <span className="bg-white px-2 py-1 rounded text-xs sm:text-sm font-medium">
                    {stageStartups.length}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {stageStartups.map(startup => (
                    <div
                      key={startup._id}
                      className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow group relative"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm sm:text-base font-medium text-gray-900 break-words flex-1 mr-2">
                          {startup.name}
                        </h4>
                        <button
                          onClick={() => openEditModal(startup)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded-full"
                          title="Editar startup"
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                        </button>
                      </div>
                      
                      <div className="mb-3">
                        <div className="text-xs sm:text-sm text-gray-600 mb-1 break-words">
                          Lead: {startup.squad.lead.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Equipo: {startup.squad.members.length + 1} miembros
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                        {startup.resources.deck && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                            Deck
                          </span>
                        )}
                        {startup.resources.demo && (
                          <span className="text-xs bg-green-100 text-green-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                            Demo
                          </span>
                        )}
                        {startup.resources.repository && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                            Repo
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        {startup.kpis.slice(0, 2).map((kpi, idx) => (
                          <div key={idx} className="text-xs">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-600 font-medium">{kpi.name}</span>
                              <span className="text-xs font-medium text-right">
                                {kpi.current.toLocaleString()} / {kpi.target.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                                style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                              ></div>
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
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {startups.map(startup => (
            <div
              key={startup._id}
              className="bg-white p-4 lg:p-5 rounded-lg shadow-sm border hover:shadow-md transition-shadow group relative"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-sm lg:text-base font-semibold text-gray-900 mb-1 break-words">
                    {startup.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      stageColors[startup.stage as keyof typeof stageColors]
                    }`}>
                      {stageLabels[startup.stage as keyof typeof stageLabels]}
                    </span>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      startup.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {startup.status}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => openEditModal(startup)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded-full"
                  title="Editar startup"
                >
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              {startup.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {startup.description}
                </p>
              )}
              
              <div className="mb-3">
                <div className="text-xs text-gray-600 mb-1">
                  Lead: {startup.squad.lead.name}
                </div>
                <div className="text-xs text-gray-500">
                  Equipo: {startup.squad.members.length + 1} miembros
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {startup.resources.deck && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Deck
                  </span>
                )}
                {startup.resources.demo && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    Demo
                  </span>
                )}
                {startup.resources.repository && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    Repo
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                {startup.kpis.slice(0, 2).map((kpi, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 font-medium">{kpi.name}</span>
                      <span className="text-xs font-medium">
                        {kpi.current.toLocaleString()} / {kpi.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Startup
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Etapa
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team Lead
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    KPIs Principales
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recursos
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {startups.map(startup => (
                  <tr key={startup._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {startup.name}
                        </div>
                        {startup.description && (
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {startup.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        stageColors[startup.stage as keyof typeof stageColors]
                      }`}>
                        {stageLabels[startup.stage as keyof typeof stageLabels]}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        startup.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {startup.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{startup.squad.lead.name}</div>
                      <div className="text-sm text-gray-500">
                        {startup.squad.members.length + 1} miembros
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        {startup.kpis.slice(0, 2).map((kpi, idx) => (
                          <div key={idx} className="text-xs">
                            <span className="font-medium text-gray-600">{kpi.name}: </span>
                            <span className="text-gray-900">
                              {kpi.current.toLocaleString()} / {kpi.target.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {startup.resources.deck && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            Deck
                          </span>
                        )}
                        {startup.resources.demo && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Demo
                          </span>
                        )}
                        {startup.resources.repository && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            Repo
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(startup)}
                        className="text-blue-600 hover:text-blue-900 p-1 hover:bg-gray-100 rounded"
                        title="Editar startup"
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
      {viewMode === 'timeline' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            {startups.map(startup => (
              <div key={startup._id} className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {startup.name}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            stageColors[startup.stage as keyof typeof stageColors]
                          }`}>
                            {stageLabels[startup.stage as keyof typeof stageLabels]}
                          </span>
                          <span className="text-sm text-gray-500">
                            Lead: {startup.squad.lead.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {startup.squad.members.length + 1} miembros
                          </span>
                        </div>
                        
                        {startup.description && (
                          <p className="text-sm text-gray-600 mb-3">
                            {startup.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {startup.resources.deck && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              Deck
                            </span>
                          )}
                          {startup.resources.demo && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                              Demo
                            </span>
                          )}
                          {startup.resources.repository && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              Repo
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {startup.kpis.map((kpi, idx) => (
                            <div key={idx} className="text-sm">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-600 font-medium">{kpi.name}</span>
                                <span className="font-medium">
                                  {kpi.current.toLocaleString()} / {kpi.target.toLocaleString()}
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                  style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => openEditModal(startup)}
                        className="p-2 hover:bg-gray-100 rounded-full"
                        title="Editar startup"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Timeline line */}
                {startup !== startups[startups.length - 1] && (
                  <div className="absolute left-5 top-10 w-px h-6 bg-gray-300"></div>
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
        onSubmit={handleCreateStartup}
      />

      {/* Edit Project Modal */}
      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingStartup(null);
        }}
        onSubmit={handleEditStartup}
        startup={editingStartup}
      />
    </div>
  );
}