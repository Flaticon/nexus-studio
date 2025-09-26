'use client';

import React, { useState, useMemo } from 'react';
import { ProjectCard, type Project } from '../projects/ProjectCard';
import { MetricsGrid } from '@/components/ui/MetricsGrid';
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Users,
  Filter,
  Search,
  Grid3x3,
  List,
  Plus,
  RefreshCw
} from 'lucide-react';

interface ProjectsOverviewProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
  onCreateProject?: () => void;
}

export const ProjectsOverview: React.FC<ProjectsOverviewProps> = ({
  projects,
  onProjectClick,
  onCreateProject
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalRevenue = projects.reduce((sum, p) => sum + p.revenue, 0);
    const totalExpenses = projects.reduce((sum, p) => sum + p.expenses, 0);
    const avgROI = projects.reduce((sum, p) => sum + p.roi, 0) / projects.length;
    const totalTeamSize = projects.reduce((sum, p) => sum + p.team.size, 0);

    return {
      totalProjects: projects.length,
      totalRevenue,
      totalExpenses,
      avgROI: isNaN(avgROI) ? 0 : avgROI,
      totalTeamSize,
      activeProjects: projects.filter(p => ['development', 'testing', 'deployment'].includes(p.status)).length
    };
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchTerm === '' ||
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, searchTerm, selectedCategory, selectedStatus]);

  // Get unique categories and statuses
  const categories = Array.from(new Set(projects.map(p => p.category)));
  const statuses = Array.from(new Set(projects.map(p => p.status)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Proyectos</h1>
          <p className="text-gray-600">Vista general de todos los proyectos activos</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid3x3 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
          >
            <Filter className="w-5 h-5" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <RefreshCw className="w-5 h-5" />
          </button>

          {onCreateProject && (
            <button
              onClick={onCreateProject}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Nuevo Proyecto
            </button>
          )}
        </div>
      </div>

      {/* Metrics */}
      <MetricsGrid
        metrics={[
          {
            id: 'total-projects',
            title: 'Total Proyectos',
            value: metrics.totalProjects.toString(),
            change: { value: 5, type: 'positive' },
            icon: Briefcase,
            description: 'Proyectos activos',
            color: 'primary'
          },
          {
            id: 'total-revenue',
            title: 'Revenue Total',
            value: `$${(metrics.totalRevenue / 1000).toFixed(0)}K`,
            change: { value: 12.5, type: 'positive' },
            icon: DollarSign,
            description: 'Revenue combinado',
            color: 'success'
          },
          {
            id: 'avg-roi',
            title: 'ROI Promedio',
            value: `${metrics.avgROI.toFixed(1)}%`,
            change: { value: metrics.avgROI, type: metrics.avgROI > 0 ? 'positive' : 'negative' },
            icon: TrendingUp,
            description: 'Retorno de inversión',
            color: 'teal'
          },
          {
            id: 'total-team',
            title: 'Equipo Total',
            value: metrics.totalTeamSize.toString(),
            change: { value: 3, type: 'positive' },
            icon: Users,
            description: 'Miembros del equipo',
            color: 'purple'
          }
        ]}
        columns={4}
        gap={4}
      />

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos los estados</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Projects Grid/List */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onProjectClick?.(project)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron proyectos</h3>
          <p className="text-gray-500 mb-6">Ajusta tus filtros o crea un nuevo proyecto</p>
          {onCreateProject && (
            <button
              onClick={onCreateProject}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Crear Primer Proyecto
            </button>
          )}
        </div>
      )}
    </div>
  );
};