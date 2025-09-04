// apps/web/src/app/portfolio/page.tsx
'use client';

import React, { useState } from 'react';
import { 
  Grid3x3, 
  List, 
  Kanban, 
  Timeline,
  Plus,
  Filter,
  Download,
  BarChart3,
  Search
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export default function PortfolioPage() {
  const [viewMode, setViewMode] = useState('kanban');
  const [showFilters, setShowFilters] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedStartups, setSelectedStartups] = useState([]);

  // Mock data for demonstration
  const mockStartups = [
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

  const stats = {
    total: mockStartups.length,
    byStatus: {
      active: mockStartups.filter(s => s.status === 'active').length,
      paused: 0
    }
  };

  const getStartupsByStage = (stage) => {
    return mockStartups.filter(s => s.stage === stage);
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
    timeline: Timeline
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              🟢 Módulo 2 - Portafolio de Startups
            </h1>
            <p className="mt-2 text-gray-600">
              {stats.total} total startups • 
              {stats.byStatus.active} activas • 
              {stats.byStatus.paused} pausadas
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nueva Startup
            </button>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex items-center gap-4">
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
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar startups..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      {viewMode === 'kanban' && (
        <div className="flex gap-6 overflow-x-auto pb-4">
          {stages.map(stage => {
            const stageStartups = getStartupsByStage(stage);
            
            return (
              <div
                key={stage}
                className={`min-w-80 rounded-lg border-2 ${stageColors[stage]} p-4`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">
                    {stageLabels[stage]}
                  </h3>
                  <span className="bg-white px-2 py-1 rounded text-sm font-medium">
                    {stageStartups.length}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {stageStartups.map(startup => (
                    <div
                      key={startup._id}
                      className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <h4 className="font-medium text-gray-900 mb-2">
                        {startup.name}
                      </h4>
                      
                      <div className="mb-3">
                        <div className="text-sm text-gray-600 mb-1">
                          Lead: {startup.squad.lead.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Equipo: {startup.squad.members.length + 1} miembros
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mb-3">
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
                      
                      <div className="space-y-1">
                        {startup.kpis.slice(0, 2).map((kpi, idx) => (
                          <div key={idx} className="text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-600">{kpi.name}</span>
                              <span className="font-medium">
                                {kpi.current.toLocaleString()} / {kpi.target.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-blue-600 h-1 rounded-full" 
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

      {/* Other Views Placeholder */}
      {viewMode !== 'kanban' && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-gray-400 mb-4">
            {React.createElement(viewIcons[viewMode], { className: "h-16 w-16 mx-auto" })}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Vista {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
          </h3>
          <p className="text-gray-600">
            Esta vista está implementada en los componentes pero requiere datos del backend para mostrar contenido.
          </p>
        </div>
      )}
    </div>
  );
}