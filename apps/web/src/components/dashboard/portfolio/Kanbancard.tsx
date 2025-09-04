// apps/web/src/components/portfolio/KanbanCard.tsx
import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Startup } from '@/types/portfolio';
import { DollarSign, Users, TrendingUp } from 'lucide-react';
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
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg shadow-sm border p-4 cursor-move hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {startup.logo ? (
            <img 
              src={startup.logo} 
              alt={startup.name}
              className="w-8 h-8 rounded"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                {startup.name.charAt(0)}
              </span>
            </div>
          )}
          <Link 
            href={`/portfolio/${startup._id}`}
            className="font-medium text-gray-900 hover:text-blue-600"
            onClick={(e) => e.stopPropagation()}
          >
            {startup.name}
          </Link>
        </div>
      </div>

      {startup.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {startup.description}
        </p>
      )}

      <div className="flex items-center gap-4 text-xs text-gray-500">
        {startup.metrics.find(m => m.name === 'Revenue') && (
          <div className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            <span>
              ${(startup.metrics.find(m => m.name === 'Revenue')?.value || 0).toLocaleString()}
            </span>
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>{startup.squad.members.length + 1}</span>
        </div>

        {startup.kpis[0] && (
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>
              {Math.round((startup.kpis[0].current / startup.kpis[0].target) * 100)}%
            </span>
          </div>
        )}
      </div>

      {startup.tags.length > 0 && (
        <div className="flex gap-1 mt-3">
          {startup.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};