'use client';

import React from 'react';
import Layout from '../../components/layout/Layout';
import { ProjectsOverview } from '../../components/dashboard-v2/overview/ProjectsOverview';
import { mockProjects } from '../../data/mockProjects';
import { type Project } from '../../components/dashboard-v2/projects/ProjectCard';
import { useRouter } from 'next/navigation';

export default function DashboardV2Page() {
  const router = useRouter();

  const handleProjectClick = (project: Project) => {
    router.push(`/dashboard-v2/projects/${project.id}`);
  };

  const handleCreateProject = () => {
    console.log('Creating new project...');
    // TODO: Implement project creation modal
  };

  return (
    <Layout
      title="🚀 Dashboard V2 - Proyectos"
      subtitle="Nueva gestión modular por proyectos - En desarrollo"
    >
      <div className="p-6 min-h-screen bg-neutral-50">
        {/* Development Banner */}
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              🚧
            </div>
            <div>
              <h3 className="font-bold text-blue-900">Dashboard en Desarrollo</h3>
              <p className="text-sm text-blue-700">
                Esta es la nueva versión modular del dashboard. Funcionalidad en progreso.
              </p>
            </div>
          </div>
        </div>

        {/* Projects Overview */}
        <ProjectsOverview
          projects={mockProjects}
          onProjectClick={handleProjectClick}
          onCreateProject={handleCreateProject}
        />
      </div>
    </Layout>
  );
}