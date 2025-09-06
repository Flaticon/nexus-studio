// apps/web/src/components/portfolio/KanbanBoard.tsx
'use client';

import { FC, useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { 
  SortableContext, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { StartupStage, Startup } from '@/types/portfolio';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';

interface KanbanBoardProps {
  startups: Startup[];
  onStageChange: (startupId: string, newStage: StartupStage) => void;
}

export const KanbanBoard: FC<KanbanBoardProps> = ({ 
  startups, 
  onStageChange 
}) => {
  const stages = Object.values(StartupStage);
  const [draggedStartup, setDraggedStartup] = useState<string | null>(null);

  const getStartupsByStage = (stage: StartupStage) => {
    return startups.filter(s => s.stage === stage);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const startupId = active.id as string;
      const newStage = over.id as StartupStage;
      onStageChange(startupId, newStage);
    }
    
    setDraggedStartup(null);
  };

  return (
    <DndContext 
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={(event) => setDraggedStartup(event.active.id as string)}
    >
      {/* Mobile-first responsive design */}
      <div className="block sm:hidden">
        {/* Mobile: Stack layout */}
        <div className="space-y-6">
          {stages.map(stage => {
            const stageStartups = getStartupsByStage(stage);
            
            return (
              <div key={stage} className="space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <span className="text-xl">
                    {stage === StartupStage.IDEA && '💡'}
                    {stage === StartupStage.VALIDATION && '🔬'}
                    {stage === StartupStage.PMF && '🎯'}
                    {stage === StartupStage.GROWTH && '📈'}
                    {stage === StartupStage.SCALE && '🚀'}
                  </span>
                  <h3 className="font-bold text-lg text-gray-900">
                    {stage === StartupStage.IDEA && 'Idea'}
                    {stage === StartupStage.VALIDATION && 'Validation'}
                    {stage === StartupStage.PMF && 'Product-Market Fit'}
                    {stage === StartupStage.GROWTH && 'Growth'}
                    {stage === StartupStage.SCALE && 'Scale'}
                  </h3>
                  <div className="px-2.5 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
                    {stageStartups.length}
                  </div>
                </div>
                
                <SortableContext
                  items={stageStartups.map(s => s._id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {stageStartups.map(startup => (
                      <KanbanCard
                        key={startup._id}
                        startup={startup}
                        isDragging={draggedStartup === startup._id}
                      />
                    ))}
                  </div>
                </SortableContext>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop: Kanban layout */}
      <div className="hidden sm:block">
        <div className="flex gap-6 overflow-x-auto pb-6" style={{ scrollSnapType: 'x mandatory' }}>
          {stages.map(stage => {
            const stageStartups = getStartupsByStage(stage);
            
            return (
              <div 
                key={stage} 
                className="flex-shrink-0" 
                style={{ scrollSnapAlign: 'start' }}
              >
                <KanbanColumn
                  stage={stage}
                  count={stageStartups.length}
                >
                  <SortableContext
                    items={stageStartups.map(s => s._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {stageStartups.map(startup => (
                      <KanbanCard
                        key={startup._id}
                        startup={startup}
                        isDragging={draggedStartup === startup._id}
                      />
                    ))}
                  </SortableContext>
                </KanbanColumn>
              </div>
            );
          })}
        </div>
      </div>
    </DndContext>
  );
};