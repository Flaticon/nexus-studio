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
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map(stage => {
          const stageStartups = getStartupsByStage(stage);
          
          return (
            <KanbanColumn
              key={stage}
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
          );
        })}
      </div>
    </DndContext>
  );
};