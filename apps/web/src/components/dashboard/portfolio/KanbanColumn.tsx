// apps/web/src/components/portfolio/KanbanColumn.tsx
import { FC, ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { StartupStage } from '@/types/portfolio';

interface KanbanColumnProps {
  stage: StartupStage;
  count: number;
  children: ReactNode;
}

const stageColors: Record<StartupStage, string> = {
  [StartupStage.IDEA]: 'bg-gray-100 border-gray-300',
  [StartupStage.VALIDATION]: 'bg-blue-50 border-blue-300',
  [StartupStage.PMF]: 'bg-purple-50 border-purple-300',
  [StartupStage.GROWTH]: 'bg-green-50 border-green-300',
  [StartupStage.SCALE]: 'bg-yellow-50 border-yellow-300'
};

const stageLabels: Record<StartupStage, string> = {
  [StartupStage.IDEA]: 'Idea',
  [StartupStage.VALIDATION]: 'Validation',
  [StartupStage.PMF]: 'Product-Market Fit',
  [StartupStage.GROWTH]: 'Growth',
  [StartupStage.SCALE]: 'Scale'
};

export const KanbanColumn: FC<KanbanColumnProps> = ({ 
  stage, 
  count, 
  children 
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: stage
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        flex-shrink-0 w-80 rounded-lg border-2 
        ${stageColors[stage]}
        ${isOver ? 'border-solid' : 'border-dashed'}
        transition-all duration-200
      `}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">
            {stageLabels[stage]}
          </h3>
          <span className="px-2 py-1 text-xs font-medium bg-white rounded-full">
            {count}
          </span>
        </div>
        
        <div className="space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
};