// apps/web/src/components/portfolio/KanbanColumn.tsx
import { FC, ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { StartupStage } from '@/types/portfolio';

interface KanbanColumnProps {
  stage: StartupStage;
  count: number;
  children: ReactNode;
}

const stageConfig: Record<StartupStage, { 
  bg: string; 
  border: string; 
  text: string; 
  label: string; 
  emoji: string;
  accent: string;
}> = {
  [StartupStage.IDEA]: { 
    bg: 'bg-gradient-to-br from-indigo-50 to-purple-50', 
    border: 'border-indigo-200', 
    text: 'text-indigo-900',
    label: 'Idea',
    emoji: '💡',
    accent: 'bg-indigo-100 text-indigo-700'
  },
  [StartupStage.VALIDATION]: { 
    bg: 'bg-gradient-to-br from-amber-50 to-orange-50', 
    border: 'border-amber-200', 
    text: 'text-amber-900',
    label: 'Validation',
    emoji: '🔬',
    accent: 'bg-amber-100 text-amber-700'
  },
  [StartupStage.PMF]: { 
    bg: 'bg-gradient-to-br from-emerald-50 to-green-50', 
    border: 'border-emerald-200', 
    text: 'text-emerald-900',
    label: 'Product-Market Fit',
    emoji: '🎯',
    accent: 'bg-emerald-100 text-emerald-700'
  },
  [StartupStage.GROWTH]: { 
    bg: 'bg-gradient-to-br from-blue-50 to-cyan-50', 
    border: 'border-blue-200', 
    text: 'text-blue-900',
    label: 'Growth',
    emoji: '📈',
    accent: 'bg-blue-100 text-blue-700'
  },
  [StartupStage.SCALE]: { 
    bg: 'bg-gradient-to-br from-purple-50 to-pink-50', 
    border: 'border-purple-200', 
    text: 'text-purple-900',
    label: 'Scale',
    emoji: '🚀',
    accent: 'bg-purple-100 text-purple-700'
  }
};

export const KanbanColumn: FC<KanbanColumnProps> = ({ 
  stage, 
  count, 
  children 
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: stage
  });

  const config = stageConfig[stage];

  return (
    <div
      ref={setNodeRef}
      className={`
        flex-shrink-0 w-80 min-h-screen rounded-2xl border-2 transition-all duration-300
        ${config.bg}
        ${config.border}
        ${isOver ? 'border-solid shadow-lg scale-102' : 'border-dashed opacity-90 hover:opacity-100'}
      `}
    >
      <div className="p-5">
        {/* Column Header */}
        <div className="flex items-center justify-between mb-6 sticky top-5 z-10">
          <div className="flex items-center gap-3">
            <span className="text-2xl" role="img" aria-label={config.label}>
              {config.emoji}
            </span>
            <div>
              <h3 className={`font-bold text-lg ${config.text}`}>
                {config.label}
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                {count} {count === 1 ? 'startup' : 'startups'}
              </p>
            </div>
          </div>
          
          <div className={`px-3 py-1.5 text-sm font-bold rounded-full ${config.accent} shadow-sm`}>
            {count}
          </div>
        </div>
        
        {/* Column Content */}
        <div className="space-y-4">
          {children}
          
          {/* Drop zone indicator when dragging */}
          {isOver && (
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 flex items-center justify-center bg-white/50">
              <p className="text-gray-500 font-medium">
                Suelta aquí para mover a {config.label}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};