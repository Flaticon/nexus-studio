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
      team: 'EcoTech Solutions',
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
      team: 'FinanceAI',
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
      team: 'HealthTracker',
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
                <option value="all">Todos los equipos</option>
                <option value="EcoTech Solutions">EcoTech Solutions</option>
                <option value="FinanceAI">FinanceAI</option>
                <option value="HealthTracker">HealthTracker</option>
              </select>
              
              <button 
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg flex items-center justify-center sm:justify-start gap-2 transition-all duration-200"
                style={{
                  background: 'var(--surface)',
                  color: 'var(--text-primary)',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => e.target.style.background = 'var(--surface-hover)'}
                onMouseLeave={(e) => e.target.style.background = 'var(--surface)'}
              >
                <Filter className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Filtros</span>
              </button>
              
              <button 
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg flex items-center justify-center sm:justify-start gap-2 text-white transition-all duration-200"
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
              <span className="hidden xs:inline">Por </span>Equipos
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
                  <span className="font-medium">Vista por Equipos:</span> Organización tradicional por equipos de trabajo
                </>
              )}
              {viewMode === 'objectives' && (
                <>
                  <span className="font-medium">Vista por Objetivos:</span> Enfoque en objetivos individuales y su progreso
                </>
              )}
              {viewMode === 'progress' && (
                <>
                  <span className="font-medium">Vista por Progreso:</span> Ranking de equipos ordenado por porcentaje de progreso
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

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="p-6 rounded-lg" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Total Objetivos</h3>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{overallStats.totalObjectives}</p>
          </div>

          <div className="p-6 rounded-lg" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>En Progreso</h3>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{overallStats.onTrack}</p>
          </div>

          <div className="p-6 rounded-lg" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>En Riesgo</h3>
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">{overallStats.atRisk}</p>
          </div>

          <div className="p-6 rounded-lg" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Atrasados</h3>
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{overallStats.behind}</p>
          </div>

          <div className="p-6 rounded-lg" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Progreso Promedio</h3>
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{overallStats.avgProgress}%</p>
          </div>
        </div>

        {/* Content Based on View Mode */}
        {viewMode === 'collaborators' ? (
          /* Collaborators Directory */
          <div className="space-y-6">
            <div className="rounded-lg" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-md)' }}>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Directorio de Colaboradores
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collaborators.map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className="rounded-lg p-6 hover:shadow-md transition-shadow"
                      style={{ background: 'var(--surface-secondary)' }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {collaborator.name}
                            </h4>
                            <p className="text-sm text-gray-600">{collaborator.role}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          {collaborator.email}
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {collaborator.location}
                        </div>
                        
                        <div>
                          <span className="text-sm text-gray-600">Skills: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {collaborator.skills.slice(0, 2).map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-sm text-gray-600">OKRs Actuales: </span>
                          <div className="mt-1">
                            {collaborator.currentOKRs && collaborator.currentOKRs.length > 0 ? (
                              collaborator.currentOKRs.map((okrId, idx) => (
                                <div key={idx} className="text-xs text-gray-700 bg-green-50 px-2 py-1 rounded mb-1">
                                  {getOKRTitle(okrId)}
                                </div>
                              ))
                            ) : (
                              <span className="text-xs text-gray-500">Sin asignaciones</span>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <div>
                            <span className="text-gray-600">Disponibilidad:</span>
                            <span className="font-medium text-gray-900 ml-1">
                              {collaborator.availability}%
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Performance:</span>
                            <span className="font-medium text-gray-900 ml-1">
                              {collaborator.performance}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCollaborator(collaborator.id);
                          setSelectedOKR(null);
                          setShowAssignModal(true);
                        }}
                        className="w-full px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Asignar a OKR
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
            <div key={okr.id} className="rounded-lg" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-md)' }}>
              {/* OKR Header */}
              <div className="p-4 sm:p-6" style={{ borderBottom: '1px solid var(--separator)' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {viewMode === 'progress' && (
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                          okr.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                          okr.rank === 2 ? 'bg-gray-100 text-gray-800' :
                          okr.rank === 3 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {okr.rank}
                        </div>
                      )}
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        {viewMode === 'teams' && okr.team}
                        {viewMode === 'objectives' && okr.objective}
                        {viewMode === 'progress' && okr.team}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(okr.status)}`}>
                        {getStatusIcon(okr.status)}
                        {getStatusLabel(okr.status)}
                      </span>
                      {viewMode === 'progress' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Progreso: {okr.overallProgress}%
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 font-medium mb-2">
                      {viewMode === 'teams' && okr.objective}
                      {viewMode === 'objectives' && `Equipo: ${okr.team}`}
                      {viewMode === 'progress' && okr.objective}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {okr.owner}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {okr.quarter}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="w-16 h-16">
                        <CircularProgressbar 
                          value={okr.overallProgress} 
                          text={`${okr.overallProgress}%`}
                          styles={buildStyles({
                            textSize: '20px',
                            pathColor: getProgressColor(okr.overallProgress),
                            textColor: getProgressColor(okr.overallProgress),
                            trailColor: '#E5E7EB'
                          })}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Progreso general</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Results */}
              <div className="p-4 sm:p-6">
                <h4 className="text-xs sm:text-sm font-medium text-gray-600 mb-4">Resultados Clave</h4>
                <div className="space-y-4">
                  {okr.keyResults.map((kr) => (
                    <div key={kr.id} className="flex items-center gap-4 p-4 rounded-lg" style={{ background: 'var(--surface-secondary)' }}>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1">{kr.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>
                            {kr.current.toLocaleString()} / {kr.target.toLocaleString()} {kr.unit}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className={`font-medium ${
                            kr.progress >= 80 ? 'text-green-600' : 
                            kr.progress >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {kr.progress}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-24">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${Math.min(kr.progress, 100)}%`,
                              backgroundColor: getProgressColor(kr.progress)
                            }}
                          />
                        </div>
                      </div>

                      <div className="w-12 h-12">
                        <CircularProgressbar 
                          value={kr.progress} 
                          text={`${kr.progress}%`}
                          styles={buildStyles({
                            textSize: '16px',
                            pathColor: getProgressColor(kr.progress),
                            textColor: getProgressColor(kr.progress),
                            trailColor: '#E5E7EB'
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
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 sm:w-5 h-4 sm:h-5 shrink-0" />
            Crear Nuevo OKR
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Asignar Colaborador a OKR
              </h3>
              
              {selectedCollaborator && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">Colaborador seleccionado:</h4>
                  <p className="text-sm text-gray-600">
                    {collaborators.find(c => c.id === selectedCollaborator)?.name} - 
                    {collaborators.find(c => c.id === selectedCollaborator)?.role}
                  </p>
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seleccionar OKR:
                </label>
                <select
                  value={selectedOKR || ''}
                  onChange={(e) => setSelectedOKR(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">OKR seleccionado:</h4>
                  <p className="text-sm text-gray-600">
                    {okrsData.find(o => o.id === selectedOKR)?.objective}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Equipo: {okrsData.find(o => o.id === selectedOKR)?.team} | 
                    Progreso: {okrsData.find(o => o.id === selectedOKR)?.overallProgress}%
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedOKR(null);
                    setSelectedCollaborator(null);
                  }}
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    if (selectedOKR && selectedCollaborator) {
                      handleAssignCollaborator(selectedCollaborator, selectedOKR);
                    }
                  }}
                  disabled={!selectedOKR || !selectedCollaborator}
                  className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Confirmar Asignación
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}