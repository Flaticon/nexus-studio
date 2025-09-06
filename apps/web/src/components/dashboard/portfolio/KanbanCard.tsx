// apps/web/src/components/portfolio/KanbanCard.tsx
'use client';

import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Startup } from '@/types/portfolio';
import { DollarSign, Users, TrendingUp, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { CircularProgress } from '../../ui/CircularProgress';

interface KanbanCardProps {
  startup: Startup;
  isDragging: boolean;
}

export const KanbanCard: FC<KanbanCardProps> = ({ startup, isDragging }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: startup._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const revenue = startup.metrics.find(m => m.name === 'Revenue')?.value || 0;
  const primaryKPI = startup.kpis[0];
  const progressPercentage = primaryKPI ? (primaryKPI.current / primaryKPI.target) * 100 : 0;

  const getKPIColor = (percentage: number) => {
    if (percentage >= 80) return 'green';
    if (percentage >= 60) return 'blue';
    if (percentage >= 40) return 'orange';
    return 'red';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-2xl card-shadow hover:card-shadow-hover cursor-move transition-all duration-300 border border-gray-100 hover:border-gray-200 group"
    >
      {/* Card Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            {startup.logo ? (
              <img 
                src={startup.logo} 
                alt={startup.name}
                className="w-10 h-10 rounded-xl object-cover shadow-sm"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-sm font-bold text-white">
                  {startup.name.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <Link 
                href={`/portfolio/${startup._id}`}
                className="group/link flex items-center gap-1.5 font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="truncate text-lg leading-tight">{startup.name}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
              </Link>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {startup.squad.lead.name} • {startup.squad.members.length + 1} miembros
              </p>
            </div>
          </div>
        </div>

        {startup.description && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4 text-balance">
            {startup.description.slice(0, 80)}
            {startup.description.length > 80 && '...'}
          </p>
        )}
      </div>

      {/* Metrics Section */}
      <div className="px-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          {/* Revenue */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-gray-500 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs font-medium">Revenue</span>
            </div>
            <span className="text-lg font-bold text-gray-900">
              ${revenue.toLocaleString()}
            </span>
          </div>

          {/* Primary KPI Progress */}
          {primaryKPI && (
            <CircularProgress
              value={primaryKPI.current}
              max={primaryKPI.target}
              size="md"
              color={getKPIColor(progressPercentage)}
              label={primaryKPI.name}
            />
          )}
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-medium text-gray-600">Team</span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {startup.squad.members.length + 1}
            </span>
          </div>

          {startup.kpis[1] && (
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs font-medium text-gray-600">
                  {startup.kpis[1].name}
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900">
                {startup.kpis[1].current.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        {startup.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {startup.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100"
              >
                {tag}
              </span>
            ))}
            {startup.tags.length > 3 && (
              <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                +{startup.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};