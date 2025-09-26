'use client';

import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  ArrowRight,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'planning' | 'development' | 'testing' | 'deployment' | 'maintenance';
  progress: number;
  revenue: number;
  expenses: number;
  roi: number;
  team: {
    size: number;
    lead: string;
  };
  lastUpdate: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'planning': return <Calendar className="w-4 h-4" />;
      case 'development': return <Activity className="w-4 h-4" />;
      case 'testing': return <AlertTriangle className="w-4 h-4" />;
      case 'deployment': return <CheckCircle className="w-4 h-4" />;
      case 'maintenance': return <XCircle className="w-4 h-4" />;
      default: return <Briefcase className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning': return 'bg-gray-100 text-gray-700';
      case 'development': return 'bg-blue-100 text-blue-700';
      case 'testing': return 'bg-yellow-100 text-yellow-700';
      case 'deployment': return 'bg-green-100 text-green-700';
      case 'maintenance': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 p-6 cursor-pointer border-l-4 ${getPriorityColor(project.priority)}`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-600">{project.category}</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-3">{project.description}</p>
        </div>

        <Link href={`/dashboard/projects/${project.id}`} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowRight className="w-4 h-4 text-gray-500" />
        </Link>
      </div>

      {/* Status and Progress */}
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {getStatusIcon(project.status)}
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">{project.progress}%</div>
          <div className="w-20 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <DollarSign className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-sm font-bold text-gray-900">${(project.revenue / 1000).toFixed(0)}K</div>
          <div className="text-xs text-gray-600">Revenue</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-sm font-bold text-gray-900">{project.roi > 0 ? '+' : ''}{project.roi.toFixed(1)}%</div>
          <div className="text-xs text-gray-600">ROI</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-sm font-bold text-gray-900">{project.team.size}</div>
          <div className="text-xs text-gray-600">Team</div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
        <span>Lead: {project.team.lead}</span>
        <span>Updated: {new Date(project.lastUpdate).toLocaleDateString()}</span>
      </div>
    </div>
  );
};