// apps/web/src/components/portfolio/KanbanCard.tsx
'use client';

import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Startup } from '@/types/portfolio';
import { DollarSign, Users, TrendingUp, ExternalLink } from 'lucide-react';
import Link from 'next/link';

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

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        background: 'var(--surface)',
        borderColor: 'var(--border)'
      }}
      {...attributes}
      {...listeners}
      className="rounded-xl cursor-move border hover:shadow-lg hover:-translate-y-1 group transition-all duration-200 relative"
    >
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            {startup.logo ? (
              <img 
                src={startup.logo} 
                alt={startup.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {startup.name.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <Link 
                href={`/portfolio/${startup._id}`}
                className="group/link flex items-center gap-1 font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-150"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="truncate text-base leading-tight">{startup.name}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-150" />
              </Link>
              <p className="text-sm text-gray-500 mt-0.5">
                {startup.squad.lead.name} • {startup.squad.members.length + 1} miembros
              </p>
            </div>
          </div>
        </div>

        {startup.description && (
          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
            {startup.description}
          </p>
        )}

        {/* Metrics Section */}
        <div className="border-t border-gray-100 pt-3 space-y-3">
          {startup.metrics.find(m => m.name === 'Revenue') && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Revenue</span>
              </div>
              <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                ${(startup.metrics.find(m => m.name === 'Revenue')?.value || 0).toLocaleString()}
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Team</span>
            </div>
            <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              {startup.squad.members.length + 1}
            </span>
          </div>

          {startup.kpis[0] && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{startup.kpis[0].name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 rounded-full h-1.5" style={{ backgroundColor: 'var(--border-light)' }}>
                  <div
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((startup.kpis[0].current / startup.kpis[0].target) * 100, 100)}%`,
                      backgroundColor: 'var(--color-primary)'
                    }}
                  />
                </div>
                <span
                  className="text-sm font-bold px-2 py-1 rounded-full text-white min-w-[3rem] text-center"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  {Math.round((startup.kpis[0].current / startup.kpis[0].target) * 100)}%
                </span>
              </div>
            </div>
          )}

          {/* Tags */}
          {startup.tags.length > 0 && (
            <div className="pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-1.5">
                {startup.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {startup.tags.length > 3 && (
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded">
                    +{startup.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};