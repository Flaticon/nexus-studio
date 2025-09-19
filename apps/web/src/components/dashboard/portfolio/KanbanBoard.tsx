// apps/web/src/components/portfolio/KanbanBoard.tsx
'use client';

import { FC, useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { 
  SortableContext, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { ProyectoStage, Proyecto } from '@/types/portfolio';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';

interface KanbanBoardProps {
  proyectos: Proyecto[];
  onStageChange: (proyectoId: string, newStage: ProyectoStage) => void;
}

export const KanbanBoard: FC<KanbanBoardProps> = ({
  proyectos, 
  onStageChange 
}) => {
  const stages = Object.values(ProyectoStage);
  const [draggedProyecto, setDraggedProyecto] = useState<string | null>(null);

  const getProyectosByStage = (stage: ProyectoStage) => {
    return proyectos.filter(p => p.stage === stage);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const proyectoId = active.id as string;
      const newStage = over.id as ProyectoStage;
      onStageChange(proyectoId, newStage);
    }
    
    setDraggedProyecto(null);
  };

  return (
    <DndContext 
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={(event) => setDraggedProyecto(event.active.id as string)}
    >
      {/* Mobile-first responsive design */}
      <div className="block sm:hidden">
        {/* Mobile: Stack layout */}
        <div className="space-y-6">
          {stages.map(stage => {
            const stageProyectos = getProyectosByStage(stage);
            
            return (
              <div key={stage} className="space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <span className="text-xl">
                    {stage === ProyectoStage.IDEA && '💡'}
                    {stage === ProyectoStage.VALIDATION && '🔬'}
                    {stage === ProyectoStage.PMF && '🎯'}
                    {stage === ProyectoStage.GROWTH && '📈'}
                    {stage === ProyectoStage.SCALE && '🚀'}
                  </span>
                  <h3 className="font-bold text-lg text-gray-900">
                    {stage === ProyectoStage.IDEA && 'Idea'}
                    {stage === ProyectoStage.VALIDATION && 'Validation'}
                    {stage === ProyectoStage.PMF && 'Product-Market Fit'}
                    {stage === ProyectoStage.GROWTH && 'Growth'}
                    {stage === ProyectoStage.SCALE && 'Scale'}
                  </h3>
                  <div className="px-2.5 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
                    {stageProyectos.length}
                  </div>
                </div>
                
                <SortableContext
                  items={stageProyectos.map(p => p._id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {stageProyectos.map(proyecto => (
                      <KanbanCard
                        key={proyecto._id}
                        proyecto={proyecto}
                        isDragging={draggedProyecto === proyecto._id}
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
            const stageProyectos = getProyectosByStage(stage);
            
            return (
              <div 
                key={stage} 
                className="flex-shrink-0" 
                style={{ scrollSnapAlign: 'start' }}
              >
                <KanbanColumn
                  stage={stage}
                  count={stageProyectos.length}
                >
                  <SortableContext
                    items={stageProyectos.map(p => p._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {stageProyectos.map(proyecto => (
                      <KanbanCard
                        key={proyecto._id}
                        proyecto={proyecto}
                        isDragging={draggedProyecto === proyecto._id}
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