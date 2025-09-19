'use client';

import React, { useState } from 'react';
import { 
  Target, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Filter,
  Download,
  Plus,
  Calendar,
  BarChart3,
  Award,
  Eye,
  User,
  UserPlus,
  MapPin,
  Mail,
  Settings
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CreateOKRModal from '../../components/forms/CreateOKRModal';
import Layout from '../../components/layout/Layout';
import { ModernMetricCard } from '../../components/ui/ModernMetricCard';

// OKRs (Objectives and Key Results) management page
export default function OKRsPage() {
  const [selectedQuarter, setSelectedQuarter] = useState('Q3-2025');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [viewMode, setViewMode] = useState('teams'); // 'teams', 'objectives', 'progress', 'collaborators'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedOKR, setSelectedOKR] = useState(null);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Mock OKRs data
  const [okrsData, setOkrsData] = useState([
    {
      id: '1',
      team: 'EcoTech Carbon Platform',
      objective: 'Acelerar adopción del producto en el mercado B2B',
      keyResults: [
        {
          id: '1.1',
          description: 'Conseguir 50 nuevos clientes empresariales',
          target: 50,
          current: 32,
          progress: 64,
          unit: 'clientes'
        },
        {
          id: '1.2', 
          description: 'Aumentar MRR a $15,000',
          target: 15000,
          current: 12500,
          progress: 83,
          unit: 'USD'
        },
        {
          id: '1.3',
          description: 'Lograr NPS de 70+',
          target: 70,
          current: 68,
          progress: 97,
          unit: 'puntos'
        }
      ],
      overallProgress: 81,
      status: 'on-track',
      owner: 'Ana García',
      quarter: 'Q3-2025'
    },
    {
      id: '2',
      team: 'FinanceAI Analytics',
      objective: 'Consolidar Product-Market Fit y expandir funcionalidades',
      keyResults: [
        {
          id: '2.1',
          description: 'Alcanzar ARR de $120,000',
          target: 120000,
          current: 85000,
          progress: 71,
          unit: 'USD'
        },
        {
          id: '2.2',
          description: 'Implementar 3 integraciones clave',
          target: 3,
          current: 2,
          progress: 67,
          unit: 'integraciones'
        },
        {
          id: '2.3',
          description: 'Reducir churn mensual a <5%',
          target: 5,
          current: 7,
          progress: 60,
          unit: '%'
        }
      ],
      overallProgress: 66,
      status: 'at-risk',
      owner: 'Roberto Silva',
      quarter: 'Q3-2025'
    },
    {
      id: '3',
      team: 'HealthTracker IoT',
      objective: 'Completar MVP y validar hipótesis iniciales',
      keyResults: [
        {
          id: '3.1',
          description: 'Completar prototipo funcional',
          target: 100,
          current: 75,
          progress: 75,
          unit: '%'
        },
        {
          id: '3.2',
          description: 'Conseguir 500 early adopters',
          target: 500,
          current: 180,
          progress: 36,
          unit: 'usuarios'
        },
        {
          id: '3.3',
          description: 'Validar 80% de hipótesis clave',
          target: 80,
          current: 45,
          progress: 56,
          unit: '%'
        }
      ],
      overallProgress: 56,
      status: 'behind',
      owner: 'Sofia Ramírez',
      quarter: 'Q3-2025'
    }
  ]);

  // Colaboradores disponibles para asignar a OKRs
  const [collaborators, setCollaborators] = useState([
    {
      id: '1',
      name: 'Ana García',
      role: 'Product Lead',
      email: 'ana@nexusstudio.com',
      location: 'Madrid, España',
      currentOKRs: ['1'],
      availability: 85,
      performance: 94,
      skills: ['Product Management', 'UX/UI Design', 'Agile/Scrum'],
      experience: 'Senior'
    },
    {
      id: '2',
      name: 'Carlos López',
      role: 'Full Stack Developer',
      email: 'carlos@nexusstudio.com',
      location: 'Barcelona, España',
      currentOKRs: ['1', '2'],
      availability: 65,
      performance: 91,
      skills: ['React/Next.js', 'Node.js', 'Python'],
      experience: 'Senior'
    },
    {
      id: '3',
      name: 'María Rodríguez',
      role: 'UX/UI Designer',
      email: 'maria@nexusstudio.com',
      location: 'Valencia, España',
      currentOKRs: ['1'],
      availability: 90,
      performance: 96,
      skills: ['UI Design', 'UX Research', 'Prototyping'],
      experience: 'Senior'
    },
    {
      id: '4',
      name: 'Roberto Silva',
      role: 'Tech Lead',
      email: 'roberto@nexusstudio.com',
      location: 'Lisboa, Portugal',
      currentOKRs: ['2'],
      availability: 75,
      performance: 98,
      skills: ['System Architecture', 'AI/ML', 'Team Leadership'],
      experience: 'Senior'
    },
    {
      id: '5',
      name: 'Sofia Ramírez',
      role: 'Product Manager',
      email: 'sofia@nexusstudio.com',
      location: 'México DF, México',
      currentOKRs: ['3'],
      availability: 95,
      performance: 87,
      skills: ['Product Strategy', 'Data Analysis', 'Growth Hacking'],
      experience: 'Mid'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return 'bg-green-50 text-green-600';
      case 'at-risk': return 'bg-yellow-50 text-yellow-600';
      case 'behind': return 'bg-red-50 text-red-600';
      case 'completed': return 'bg-blue-50 text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="w-4 h-4" />;
      case 'at-risk': return <AlertTriangle className="w-4 h-4" />;
      case 'behind': return <XCircle className="w-4 h-4" />;
      case 'completed': return <Award className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'on-track': return 'En progreso';
      case 'at-risk': return 'En riesgo';
      case 'behind': return 'Atrasado';
      case 'completed': return 'Completado';
      default: return 'Pendiente';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#10B981';
    if (progress >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const handleCreateOKR = (okrData) => {
    setOkrsData(prev => [...prev, okrData]);
    setIsCreateModalOpen(false);
  };

  const handleAssignCollaborator = (collaboratorId, okrId) => {
    setCollaborators(prev => prev.map(collab => 
      collab.id === collaboratorId
        ? { ...collab, currentOKRs: [...(collab.currentOKRs || []), okrId] }
        : collab
    ));
    
    setOkrsData(prev => prev.map(okr =>
      okr.id === okrId
        ? { ...okr, assignedCollaborators: [...(okr.assignedCollaborators || []), collaboratorId] }
        : okr
    ));
    
    setShowAssignModal(false);
    setSelectedOKR(null);
  };

  const getOKRTitle = (okrId) => {
    const okr = okrsData.find(o => o.id === okrId);
    return okr ? `${okr.team}: ${okr.objective.substring(0, 30)}...` : 'OKR no encontrado';
  };

  const filteredOKRs = selectedTeam === 'all' ? okrsData : okrsData.filter(okr => okr.team === selectedTeam);

  // Generate data for different views
  const getTeamsView = () => filteredOKRs;
  
  const getObjectivesView = () => {
    return filteredOKRs.map(okr => ({
      ...okr,
      id: okr.id + '_obj',
      displayTitle: okr.objective,
      type: 'objective'
    }));
  };

  const getProgressView = () => {
    return filteredOKRs
      .sort((a, b) => b.overallProgress - a.overallProgress)
      .map((okr, index) => ({
        ...okr,
        id: okr.id + '_prog',
        displayTitle: `${okr.team} - ${okr.overallProgress}%`,
        type: 'progress',
        rank: index + 1,
        progressCategory: okr.overallProgress >= 80 ? 'excellent' : 
                         okr.overallProgress >= 60 ? 'good' :
                         okr.overallProgress >= 40 ? 'fair' : 'needs-attention'
      }));
  };

  // Get current view data
  const getCurrentViewData = () => {
    switch (viewMode) {
      case 'teams': return getTeamsView();
      case 'objectives': return getObjectivesView();
      case 'progress': return getProgressView();
      case 'collaborators': return collaborators;
      default: return getTeamsView();
    }
  };

  const currentViewData = getCurrentViewData();

  const overallStats = {
    totalObjectives: okrsData.length,
    onTrack: okrsData.filter(okr => okr.status === 'on-track').length,
    atRisk: okrsData.filter(okr => okr.status === 'at-risk').length,
    behind: okrsData.filter(okr => okr.status === 'behind').length,
    avgProgress: Math.round(okrsData.reduce((sum, okr) => sum + okr.overallProgress, 0) / okrsData.length)
  };

  return (
    <Layout title="🎯 OKRs Operativos" subtitle="Objetivos y resultados clave por equipo">
      <div className="p-6 min-h-screen" style={{ background: 'var(--background)' }}>
        {/* Content */}
        <div className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <select
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg focus:outline-none transition-all duration-200"
                style={{
                  background: 'var(--surface-secondary)',
                  color: 'var(--text-primary)',
                  border: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'var(--surface)';
                  e.target.style.boxShadow = 'var(--shadow-sm)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'var(--surface-secondary)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="Q1-2025">Q1 2025</option>
                <option value="Q2-2025">Q2 2025</option>
                <option value="Q3-2025">Q3 2025</option>
                <option value="Q4-2025">Q4 2025</option>
              </select>

              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg focus:outline-none transition-all duration-200"
                style={{
                  background: 'var(--surface-secondary)',
                  color: 'var(--text-primary)',
                  border: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.background = 'var(--surface)';
                  e.target.style.boxShadow = 'var(--shadow-sm)';
                }}
                onBlur={(e) => {
                  e.target.style.background = 'var(--surface-secondary)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="all">Todos los proyectos</option>
                <option value="EcoTech Carbon Platform">EcoTech Carbon Platform</option>
                <option value="FinanceAI Analytics">FinanceAI Analytics</option>
                <option value="HealthTracker IoT">HealthTracker IoT</option>
              </select>
              
              <button 
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full flex items-center justify-center sm:justify-start gap-2 transition-all duration-200 font-medium bg-white shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200"
                onMouseEnter={(e) => e.target.style.background = '#f8fafc'}
                onMouseLeave={(e) => e.target.style.background = 'white'}
              >
                <Filter className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Filtros</span>
              </button>
              
              <button 
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full flex items-center justify-center sm:justify-start gap-2 text-white transition-all duration-200 font-medium bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                style={{ background: 'var(--module-okrs)' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                <Download className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Exportar</span>
              </button>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex flex-col sm:flex-row overflow-x-auto" style={{ borderBottom: '1px solid var(--separator)' }}>
            <button
              onClick={() => setViewMode('teams')}
              className="flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap"
              style={{
                borderBottom: viewMode === 'teams' ? '2px solid var(--module-okrs)' : '2px solid transparent',
                color: viewMode === 'teams' ? 'var(--module-okrs)' : 'var(--text-secondary)'
              }}
              onMouseEnter={(e) => {
                if (viewMode !== 'teams') {
                  e.target.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'teams') {
                  e.target.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <Users className="w-3 sm:w-4 h-3 sm:h-4 inline mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Por </span>Proyectos
            </button>
            <button
              onClick={() => setViewMode('objectives')}
              className="flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap"
              style={{
                borderBottom: viewMode === 'objectives' ? '2px solid var(--module-okrs)' : '2px solid transparent',
                color: viewMode === 'objectives' ? 'var(--module-okrs)' : 'var(--text-secondary)'
              }}
              onMouseEnter={(e) => {
                if (viewMode !== 'objectives') {
                  e.target.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'objectives') {
                  e.target.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <Target className="w-3 sm:w-4 h-3 sm:h-4 inline mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Por </span>Objetivos
            </button>
            <button
              onClick={() => setViewMode('progress')}
              className="flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap"
              style={{
                borderBottom: viewMode === 'progress' ? '2px solid var(--module-okrs)' : '2px solid transparent',
                color: viewMode === 'progress' ? 'var(--module-okrs)' : 'var(--text-secondary)'
              }}
              onMouseEnter={(e) => {
                if (viewMode !== 'progress') {
                  e.target.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'progress') {
                  e.target.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <BarChart3 className="w-3 sm:w-4 h-3 sm:h-4 inline mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Por </span>Progreso
            </button>
            <button
              onClick={() => setViewMode('collaborators')}
              className="flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap"
              style={{
                borderBottom: viewMode === 'collaborators' ? '2px solid var(--module-okrs)' : '2px solid transparent',
                color: viewMode === 'collaborators' ? 'var(--module-okrs)' : 'var(--text-secondary)'
              }}
              onMouseEnter={(e) => {
                if (viewMode !== 'collaborators') {
                  e.target.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'collaborators') {
                  e.target.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <UserPlus className="w-3 sm:w-4 h-3 sm:h-4 inline mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Directorio </span>Colaboradores
            </button>
          </div>
          
          {/* View Description */}
          <div className="mt-4 p-3 rounded-lg" style={{ background: 'var(--surface-secondary)' }}>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {viewMode === 'teams' && (
                <>
                  <span className="font-medium">Vista por Proyectos:</span> Organización por proyectos y equipos de trabajo
                </>
              )}
              {viewMode === 'objectives' && (
                <>
                  <span className="font-medium">Vista por Objetivos:</span> Enfoque en objetivos individuales y su progreso
                </>
              )}
              {viewMode === 'progress' && (
                <>
                  <span className="font-medium">Vista por Progreso:</span> Ranking de proyectos ordenado por porcentaje de progreso
                </>
              )}
              {viewMode === 'collaborators' && (
                <>
                  <span className="font-medium">Directorio de Colaboradores:</span> Gestión y asignación de colaboradores a OKRs
                </>
              )}
            </p>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
          <ModernMetricCard
            title="Total Objetivos"
            value={overallStats.totalObjectives}
            icon={<Target className="w-6 h-6" />}
            color="purple"
            subtitle="Activos este trimestre"
            trend="stable"
          />

          <ModernMetricCard
            title="En Progreso"
            value={overallStats.onTrack}
            icon={<CheckCircle className="w-6 h-6" />}
            color="green"
            trend="up"
            change={15.2}
            changeType="positive"
            subtitle="Cumpliendo objetivos"
          />

          <ModernMetricCard
            title="En Riesgo"
            value={overallStats.atRisk}
            icon={<AlertTriangle className="w-6 h-6" />}
            color="orange"
            trend="stable"
            subtitle="Requiere atención"
          />

          <ModernMetricCard
            title="Atrasados"
            value={overallStats.behind}
            icon={<XCircle className="w-6 h-6" />}
            color="pink"
            trend="down"
            change={-8.5}
            changeType="positive"
            subtitle="Necesita intervención"
          />

          <ModernMetricCard
            title="Progreso Promedio"
            value={`${overallStats.avgProgress}%`}
            icon={<BarChart3 className="w-6 h-6" />}
            color="blue"
            trend="up"
            change={7.3}
            changeType="positive"
            subtitle="Del trimestre actual"
          />
        </div>

        {/* Content Based on View Mode */}
        {viewMode === 'collaborators' ? (
          /* Collaborators Directory */
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
                  👥 Directorio de Colaboradores
                </h3>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collaborators.map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-300 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold tracking-tight text-gray-900">
                              {collaborator.name}
                            </h4>
                            <p className="text-sm font-medium text-gray-600">{collaborator.role}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-full">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{collaborator.email}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-full">
                          <MapPin className="w-4 h-4" />
                          <span>{collaborator.location}</span>
                        </div>
                        
                        <div>
                          <span className="text-sm font-bold text-gray-700">💡 Skills:</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {collaborator.skills.slice(0, 2).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-sm font-bold text-gray-700">🎯 OKRs Actuales:</span>
                          <div className="mt-2">
                            {collaborator.currentOKRs && collaborator.currentOKRs.length > 0 ? (
                              collaborator.currentOKRs.map((okrId, idx) => (
                                <div key={idx} className="text-xs font-medium text-gray-700 bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-2 rounded-full mb-2">
                                  {getOKRTitle(okrId)}
                                </div>
                              ))
                            ) : (
                              <span className="text-xs font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">Sin asignaciones</span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                          <div className="text-center bg-white p-3 rounded-xl">
                            <div className="text-lg font-bold text-gray-900">{collaborator.availability}%</div>
                            <div className="text-xs font-medium text-gray-600">🟢 Disponibilidad</div>
                          </div>
                          <div className="text-center bg-white p-3 rounded-xl">
                            <div className="text-lg font-bold text-gray-900">{collaborator.performance}%</div>
                            <div className="text-xs font-medium text-gray-600">⭐ Performance</div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCollaborator(collaborator.id);
                          setSelectedOKR(null);
                          setShowAssignModal(true);
                        }}
                        className="w-full px-4 py-3 text-sm font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        🎯 Asignar a OKR
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* OKRs List - Dynamic View */
          <div className="space-y-6">
            {currentViewData.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-lg font-medium">No hay OKRs para mostrar</p>
                  <p className="text-sm">Ajusta tus filtros o crea un nuevo OKR</p>
                </div>
              </div>
            ) : (
              currentViewData.map((okr) => (
            <div key={okr.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
              {/* OKR Header */}
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {viewMode === 'progress' && (
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                          okr.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                          okr.rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-500 text-white' :
                          okr.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white' :
                          'bg-gradient-to-br from-blue-400 to-indigo-500 text-white'
                        }`}>
                          {okr.rank}
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-bold tracking-tight text-gray-900 mb-1">
                          {viewMode === 'teams' && okr.team}
                          {viewMode === 'objectives' && okr.objective}
                          {viewMode === 'progress' && okr.team}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(okr.status).replace('bg-', 'bg-gradient-to-r from-').replace('text-', 'text-')}`}>
                            {getStatusIcon(okr.status)}
                            {getStatusLabel(okr.status)}
                          </span>
                          {viewMode === 'progress' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800">
                              📊 {okr.overallProgress}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium mb-3 text-sm sm:text-base">
                      {viewMode === 'teams' && okr.objective}
                      {viewMode === 'objectives' && `🏢 Equipo: ${okr.team}`}
                      {viewMode === 'progress' && okr.objective}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                        <Users className="w-4 h-4" />
                        {okr.owner}
                      </span>
                      <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                        <Calendar className="w-4 h-4" />
                        {okr.quarter}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20">
                        <CircularProgressbar 
                          value={okr.overallProgress} 
                          text={`${okr.overallProgress}%`}
                          styles={buildStyles({
                            textSize: '18px',
                            pathColor: getProgressColor(okr.overallProgress),
                            textColor: getProgressColor(okr.overallProgress),
                            trailColor: '#F3F4F6',
                            pathTransitionDuration: 0.5,
                          })}
                        />
                      </div>
                      <p className="text-xs font-medium text-gray-600 mt-2">📈 Progreso general</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Results */}
              <div className="p-4 sm:p-6">
                <h4 className="text-sm sm:text-base font-bold tracking-tight text-gray-900 mb-4 flex items-center gap-2">
                  🎯 Resultados Clave
                </h4>
                <div className="space-y-4">
                  {okr.keyResults.map((kr) => (
                    <div key={kr.id} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 border border-gray-200">
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 mb-2">{kr.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="bg-white px-2 py-1 rounded-full font-medium">
                            {kr.current.toLocaleString()} / {kr.target.toLocaleString()} {kr.unit}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className={`font-bold px-2 py-1 rounded-full ${
                            kr.progress >= 80 ? 'bg-green-100 text-green-700' : 
                            kr.progress >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {kr.progress}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-24">
                        <div className="w-full bg-gray-300 rounded-full h-3">
                          <div 
                            className="h-3 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${Math.min(kr.progress, 100)}%`,
                              background: `linear-gradient(to right, ${getProgressColor(kr.progress)}, ${getProgressColor(kr.progress)}99)`
                            }}
                          />
                        </div>
                      </div>

                      <div className="w-14 h-14">
                        <CircularProgressbar 
                          value={kr.progress} 
                          text={`${kr.progress}%`}
                          styles={buildStyles({
                            textSize: '14px',
                            pathColor: getProgressColor(kr.progress),
                            textColor: getProgressColor(kr.progress),
                            trailColor: '#F3F4F6',
                            pathTransitionDuration: 0.5,
                          })}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
              ))
            )}
          </div>
        )}

        {/* Add New OKR Button */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-5 sm:w-6 h-5 sm:h-6 shrink-0" />
            🚀 Crear Nuevo OKR
          </button>
        </div>

        {/* Create OKR Modal */}
        <CreateOKRModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateOKR}
        />

        {/* Assign to OKR Modal */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl border border-gray-200">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-6 flex items-center gap-2">
                🎯 Asignar Colaborador a OKR
              </h3>
              
              {selectedCollaborator && (
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">👤 Colaborador seleccionado:</h4>
                  <p className="text-sm font-medium text-gray-700">
                    {collaborators.find(c => c.id === selectedCollaborator)?.name} - 
                    {collaborators.find(c => c.id === selectedCollaborator)?.role}
                  </p>
                </div>
              )}
              
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  🎯 Seleccionar OKR:
                </label>
                <select
                  value={selectedOKR || ''}
                  onChange={(e) => setSelectedOKR(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium"
                >
                  <option value="">Seleccionar OKR</option>
                  {okrsData.map((okr) => (
                    <option key={okr.id} value={okr.id}>
                      {okr.team}: {okr.objective.substring(0, 40)}...
                    </option>
                  ))}
                </select>
              </div>

              {selectedOKR && (
                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <h4 className="font-bold text-gray-900 mb-2">✅ OKR seleccionado:</h4>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {okrsData.find(o => o.id === selectedOKR)?.objective}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                    <span className="bg-white px-2 py-1 rounded-full">
                      🏢 {okrsData.find(o => o.id === selectedOKR)?.team}
                    </span>
                    <span className="bg-white px-2 py-1 rounded-full">
                      📊 {okrsData.find(o => o.id === selectedOKR)?.overallProgress}%
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedOKR(null);
                    setSelectedCollaborator(null);
                  }}
                  className="px-6 py-3 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200"
                >
                  ❌ Cancelar
                </button>
                <button
                  onClick={() => {
                    if (selectedOKR && selectedCollaborator) {
                      handleAssignCollaborator(selectedCollaborator, selectedOKR);
                    }
                  }}
                  disabled={!selectedOKR || !selectedCollaborator}
                  className="px-6 py-3 text-sm font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  ✅ Confirmar Asignación
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}