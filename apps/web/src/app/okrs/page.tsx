'use client';

import React, { useState, useMemo } from 'react';
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
  Search,
  Brain,
  Lightbulb,
  Zap,
  ChevronDown,
  ChevronUp,
  Activity,
  Star,
  ArrowUp,
  ArrowDown,
  Settings,
  RefreshCw,
  X
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CreateOKRModal from '../../components/forms/CreateOKRModal';
import Layout from '../../components/layout/Layout';
import { ModernMetricCard } from '../../components/ui/ModernMetricCard';
import { MetricsGrid, Metric } from '@/components/ui/MetricsGrid';

// Enhanced OKRs management page with modern design and advanced functionality
export default function OKRsPage() {
  const [selectedQuarter, setSelectedQuarter] = useState('Q3-2025');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [viewMode, setViewMode] = useState('dashboard'); // 'dashboard', 'teams', 'objectives', 'progress', 'collaborators', 'analytics'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedOKR, setSelectedOKR] = useState(null);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('progress');
  const [sortOrder, setSortOrder] = useState('desc');
  const [expandedOKR, setExpandedOKR] = useState(null);

  // Enhanced OKRs data with timeline and AI insights
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
          unit: 'clientes',
          trend: 'up',
          changeWeek: 5,
          risk: 'low'
        },
        {
          id: '1.2',
          description: 'Aumentar MRR a $15,000',
          target: 15000,
          current: 12500,
          progress: 83,
          unit: 'USD',
          trend: 'up',
          changeWeek: 8.5,
          risk: 'low'
        },
        {
          id: '1.3',
          description: 'Lograr NPS de 70+',
          target: 70,
          current: 68,
          progress: 97,
          unit: 'puntos',
          trend: 'stable',
          changeWeek: 0.5,
          risk: 'medium'
        }
      ],
      overallProgress: 81,
      status: 'on-track',
      owner: 'Ana García',
      quarter: 'Q3-2025',
      priority: 'high',
      tags: ['B2B', 'Growth', 'Revenue'],
      timeline: [
        { week: 'Sem 1', progress: 45 },
        { week: 'Sem 2', progress: 52 },
        { week: 'Sem 3', progress: 67 },
        { week: 'Sem 4', progress: 75 },
        { week: 'Sem 5', progress: 81 }
      ],
      aiInsights: [
        'Rendimiento superior al promedio del sector',
        'NPS cerca del objetivo - considerar mejoras en UX',
        'Crecimiento MRR sostenible y predecible'
      ]
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
          unit: 'USD',
          trend: 'up',
          changeWeek: 6.2,
          risk: 'medium'
        },
        {
          id: '2.2',
          description: 'Implementar 3 integraciones clave',
          target: 3,
          current: 2,
          progress: 67,
          unit: 'integraciones',
          trend: 'stable',
          changeWeek: 0,
          risk: 'high'
        },
        {
          id: '2.3',
          description: 'Reducir churn mensual a <5%',
          target: 5,
          current: 7,
          progress: 60,
          unit: '%',
          trend: 'down',
          changeWeek: -2.1,
          risk: 'high'
        }
      ],
      overallProgress: 66,
      status: 'at-risk',
      owner: 'Roberto Silva',
      quarter: 'Q3-2025',
      priority: 'high',
      tags: ['AI', 'Analytics', 'PMF'],
      timeline: [
        { week: 'Sem 1', progress: 35 },
        { week: 'Sem 2', progress: 48 },
        { week: 'Sem 3', progress: 56 },
        { week: 'Sem 4', progress: 62 },
        { week: 'Sem 5', progress: 66 }
      ],
      aiInsights: [
        'Necesita atención en retención de clientes',
        'Priorizar desarrollo de integraciones',
        'ARR en buen camino pero requiere acelerar churn'
      ]
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
          unit: '%',
          trend: 'up',
          changeWeek: 12,
          risk: 'low'
        },
        {
          id: '3.2',
          description: 'Conseguir 500 early adopters',
          target: 500,
          current: 180,
          progress: 36,
          unit: 'usuarios',
          trend: 'up',
          changeWeek: 15,
          risk: 'high'
        },
        {
          id: '3.3',
          description: 'Validar 80% de hipótesis clave',
          target: 80,
          current: 45,
          progress: 56,
          unit: '%',
          trend: 'stable',
          changeWeek: 3,
          risk: 'medium'
        }
      ],
      overallProgress: 56,
      status: 'behind',
      owner: 'Sofia Ramírez',
      quarter: 'Q3-2025',
      priority: 'medium',
      tags: ['IoT', 'Health', 'MVP'],
      timeline: [
        { week: 'Sem 1', progress: 25 },
        { week: 'Sem 2', progress: 32 },
        { week: 'Sem 3', progress: 41 },
        { week: 'Sem 4', progress: 49 },
        { week: 'Sem 5', progress: 56 }
      ],
      aiInsights: [
        'Necesita acelerar captación de early adopters',
        'Prototipo avanzando bien',
        'Considerar pivotear algunas hipótesis'
      ]
    }
  ]);

  // Enhanced collaborators data
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
      experience: 'Senior',
      productivity: 96,
      satisfaction: 8.5,
      avatar: 'AG'
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
      experience: 'Senior',
      productivity: 88,
      satisfaction: 7.8,
      avatar: 'CL'
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
      experience: 'Senior',
      productivity: 93,
      satisfaction: 9.1,
      avatar: 'MR'
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
      experience: 'Senior',
      productivity: 95,
      satisfaction: 8.9,
      avatar: 'RS'
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
      experience: 'Mid',
      productivity: 84,
      satisfaction: 8.2,
      avatar: 'SR'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return 'from-green-400 to-emerald-500';
      case 'at-risk': return 'from-yellow-400 to-orange-500';
      case 'behind': return 'from-red-400 to-pink-500';
      case 'completed': return 'from-blue-400 to-indigo-500';
      default: return 'from-gray-400 to-gray-500';
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

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-3 h-3 text-green-500" />;
      case 'down': return <ArrowDown className="w-3 h-3 text-red-500" />;
      default: return <Activity className="w-3 h-3 text-gray-500" />;
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Enhanced filtering and sorting
  const filteredAndSortedOKRs = useMemo(() => {
    let filtered = okrsData.filter(okr => {
      const matchesTeam = selectedTeam === 'all' || okr.team === selectedTeam;
      const matchesSearch = searchTerm === '' ||
        okr.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        okr.objective.toLowerCase().includes(searchTerm.toLowerCase()) ||
        okr.owner.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTeam && matchesSearch;
    });

    return filtered.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'progress':
          aVal = a.overallProgress;
          bVal = b.overallProgress;
          break;
        case 'status':
          const statusOrder = { 'behind': 0, 'at-risk': 1, 'on-track': 2, 'completed': 3 };
          aVal = statusOrder[a.status];
          bVal = statusOrder[b.status];
          break;
        case 'team':
          aVal = a.team;
          bVal = b.team;
          break;
        case 'priority':
          const priorityOrder = { 'low': 0, 'medium': 1, 'high': 2 };
          aVal = priorityOrder[a.priority];
          bVal = priorityOrder[b.priority];
          break;
        default:
          aVal = a.overallProgress;
          bVal = b.overallProgress;
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [okrsData, selectedTeam, searchTerm, sortBy, sortOrder]);

  const overallStats = useMemo(() => ({
    totalObjectives: okrsData.length,
    onTrack: okrsData.filter(okr => okr.status === 'on-track').length,
    atRisk: okrsData.filter(okr => okr.status === 'at-risk').length,
    behind: okrsData.filter(okr => okr.status === 'behind').length,
    avgProgress: Math.round(okrsData.reduce((sum, okr) => sum + okr.overallProgress, 0) / okrsData.length),
    highPriority: okrsData.filter(okr => okr.priority === 'high').length,
    totalKeyResults: okrsData.reduce((sum, okr) => sum + okr.keyResults.length, 0),
    avgTeamSatisfaction: Math.round(collaborators.reduce((sum, collab) => sum + collab.satisfaction, 0) / collaborators.length * 10) / 10
  }), [okrsData, collaborators]);

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

  const renderDashboardView = () => (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-1 shadow-2xl">
        <div className="bg-white rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Brain className="w-8 h-8 text-purple-600" />
              Insights Inteligentes
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
              <RefreshCw className="w-4 h-4" />
              Actualizar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-green-600" />
                <h4 className="font-bold text-green-800">Recomendación</h4>
              </div>
              <p className="text-green-700 text-sm mb-3">
                EcoTech Carbon Platform está superando expectativas. Considerar acelerar roadmap de producto.
              </p>
              <button className="text-green-600 font-medium text-xs hover:text-green-800">Ver detalles →</button>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <h4 className="font-bold text-yellow-800">Alerta</h4>
              </div>
              <p className="text-yellow-700 text-sm mb-3">
                FinanceAI Analytics necesita atención en retención. Churn rate por encima del objetivo.
              </p>
              <button className="text-yellow-600 font-medium text-xs hover:text-yellow-800">Ver plan de acción →</button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
                <h4 className="font-bold text-blue-800">Oportunidad</h4>
              </div>
              <p className="text-blue-700 text-sm mb-3">
                El equipo de desarrollo tiene 20% más capacidad. Momento ideal para acelerar roadmap.
              </p>
              <button className="text-blue-600 font-medium text-xs hover:text-blue-800">Explorar opciones →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Metrics Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Métricas Principales</h2>
            <p className="text-sm text-gray-600">Resumen ejecutivo de OKRs del trimestre</p>
          </div>
        </div>

        <MetricsGrid
          metrics={[
            {
              id: 'total-objectives',
              title: 'Objetivos Totales',
              value: overallStats.totalObjectives,
              change: { value: 12, type: 'positive' },
              icon: Target,
              description: 'Este trimestre',
              color: 'primary'
            },
            {
              id: 'on-track',
              title: 'En Progreso',
              value: overallStats.onTrack,
              change: { value: 8, type: 'positive' },
              icon: CheckCircle,
              description: 'Cumpliendo objetivos',
              color: 'success'
            },
            {
              id: 'at-risk',
              title: 'En Riesgo',
              value: overallStats.atRisk,
              change: { value: 2, type: 'positive' },
              icon: AlertTriangle,
              description: 'Requieren atención',
              color: 'warning'
            },
            {
              id: 'average-progress',
              title: 'Progreso Promedio',
              value: `${overallStats.avgProgress}%`,
              change: { value: 5, type: 'positive' },
              icon: BarChart3,
              description: 'Del trimestre',
              color: 'teal'
            }
          ]}
          columns={4}
          gap={3}
        />
      </div>

      {/* Team Performance Heatmap */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <Activity className="w-6 h-6 text-indigo-600" />
              Performance por Equipo
            </h3>
            <p className="text-sm text-gray-600 mt-1">Progreso general de cada equipo en sus OKRs</p>
          </div>
        </div>
        <div className="p-6">
          <MetricsGrid
            metrics={okrsData.map((okr) => ({
              id: `okr-${okr.id}`,
              title: okr.team,
              value: `${okr.overallProgress}%`,
              change: {
                value: Math.floor(Math.random() * 20) + 5,
                type: okr.status === 'on-track' ? 'positive' : okr.status === 'at-risk' ? 'neutral' : 'negative'
              },
              icon: okr.status === 'on-track' ? CheckCircle : okr.status === 'at-risk' ? AlertTriangle : XCircle,
              description: okr.objective.substring(0, 40) + '...',
              color: okr.status === 'on-track' ? 'success' : okr.status === 'at-risk' ? 'warning' : 'danger'
            }))}
            columns={1}
            gap={3}
          />
        </div>
      </div>
    </div>
  );

  const renderOKRsList = () => (
    <div className="space-y-6">
      {filteredAndSortedOKRs.length === 0 ? (
        <div className="text-center py-16">
          <Target className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl font-medium text-gray-600 mb-2">No hay OKRs para mostrar</p>
          <p className="text-gray-500">Ajusta tus filtros o crea un nuevo OKR</p>
        </div>
      ) : (
        filteredAndSortedOKRs.map((okr) => (
          <div key={okr.id} className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
            {/* Enhanced OKR Header */}
            <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold bg-gradient-to-r ${getStatusColor(okr.status)} shadow-lg`}>
                      {getStatusIcon(okr.status)}
                      {getStatusLabel(okr.status)}
                    </div>
                    <div className="flex gap-2">
                      {okr.tags?.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{okr.team}</h3>
                  <p className="text-lg text-gray-700 mb-4 leading-relaxed">{okr.objective}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm">
                      <User className="w-4 h-4" />
                      {okr.owner}
                    </span>
                    <span className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm">
                      <Calendar className="w-4 h-4" />
                      {okr.quarter}
                    </span>
                    <span className={`flex items-center gap-2 px-3 py-2 rounded-xl shadow-sm ${okr.priority === 'high' ? 'bg-red-50 text-red-700' : okr.priority === 'medium' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'}`}>
                      <Star className="w-4 h-4" />
                      Prioridad {okr.priority}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="w-24 h-24 mb-4">
                      <CircularProgressbar
                        value={okr.overallProgress}
                        text={`${okr.overallProgress}%`}
                        styles={buildStyles({
                          textSize: '16px',
                          pathColor: getProgressColor(okr.overallProgress),
                          textColor: getProgressColor(okr.overallProgress),
                          trailColor: '#F3F4F6',
                          pathTransitionDuration: 0.5,
                        })}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-600">Progreso General</p>
                  </div>

                  <button
                    onClick={() => setExpandedOKR(expandedOKR === okr.id ? null : okr.id)}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {expandedOKR === okr.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* AI Insights for this OKR */}
              {okr.aiInsights && (
                <div className="mt-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Insights IA
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {okr.aiInsights.map((insight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <Lightbulb className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <span className="text-indigo-800">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Key Results */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <Target className="w-6 h-6 text-indigo-600" />
                  Resultados Clave
                </h4>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {okr.keyResults.length} KRs
                </span>
              </div>

              <div className="space-y-6">
                {okr.keyResults.map((kr) => (
                  <div key={kr.id} className="p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 mb-3 text-lg">{kr.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="bg-white px-3 py-2 rounded-xl shadow-sm font-medium border border-gray-200">
                            📊 {kr.current.toLocaleString()} / {kr.target.toLocaleString()} {kr.unit}
                          </span>
                          <span className={`px-3 py-2 rounded-xl font-bold ${kr.progress >= 80 ? 'bg-green-100 text-green-700 border border-green-200' : kr.progress >= 60 ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                            {kr.progress}% completado
                          </span>
                          <span className={`px-3 py-2 rounded-xl font-medium ${getRiskColor(kr.risk)}`}>
                            🎯 Riesgo {kr.risk}
                          </span>
                          <span className="flex items-center gap-1 px-3 py-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                            {getTrendIcon(kr.trend)}
                            {kr.changeWeek > 0 ? '+' : ''}{kr.changeWeek}% sem.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-20 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all duration-700 rounded-full"
                            style={{
                              width: `${Math.min(kr.progress, 100)}%`,
                              background: `linear-gradient(to right, ${getProgressColor(kr.progress)}, ${getProgressColor(kr.progress)}dd)`
                            }}
                          />
                        </div>
                        <div className="w-16 h-16">
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
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expanded Details */}
            {expandedOKR === okr.id && (
              <div className="p-8 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Timeline */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      📈 Timeline de Progreso
                    </h4>
                    <div className="space-y-3">
                      {okr.timeline?.map((point, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <span className="w-16 text-sm font-medium text-gray-600">{point.week}</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all duration-500"
                              style={{
                                width: `${point.progress}%`,
                                background: `linear-gradient(to right, ${getProgressColor(point.progress)}, ${getProgressColor(point.progress)}99)`
                              }}
                            />
                          </div>
                          <span className="w-12 text-sm font-bold text-gray-700">{point.progress}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Items */}
                  <div>
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      ⚡ Próximas Acciones
                    </h4>
                    <div className="space-y-3">
                      <div className="p-4 bg-white rounded-xl border border-gray-200">
                        <p className="text-sm font-medium text-gray-900">Revisar métricas de retención</p>
                        <p className="text-xs text-gray-600 mt-1">Fecha límite: Esta semana</p>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-gray-200">
                        <p className="text-sm font-medium text-gray-900">Implementar nueva funcionalidad</p>
                        <p className="text-xs text-gray-600 mt-1">Fecha límite: Próxima semana</p>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-gray-200">
                        <p className="text-sm font-medium text-gray-900">Optimizar flujo de onboarding</p>
                        <p className="text-xs text-gray-600 mt-1">Fecha límite: En 2 semanas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );

  return (
    <Layout title="🎯 OKRs Operativos" subtitle="Objetivos y resultados clave por equipo - Dashboard empresarial avanzado">
      <div className="p-6 min-h-screen bg-neutral-50">

        {/* Enhanced Header Controls */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-end">
              {/* Primary actions group */}
              <div className="flex gap-2 sm:gap-3">
                <select
                  value={selectedQuarter}
                  onChange={(e) => setSelectedQuarter(e.target.value)}
                  className="px-3 sm:px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm min-w-[120px]"
                  style={{
                    background: 'var(--surface)',
                    color: 'var(--text-primary)',
                    boxShadow: 'var(--shadow-sm)'
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
                  className="px-3 sm:px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm min-w-[160px]"
                  style={{
                    background: 'var(--surface)',
                    color: 'var(--text-primary)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <option value="all">Todos los equipos</option>
                  <option value="EcoTech Carbon Platform">EcoTech Carbon Platform</option>
                  <option value="FinanceAI Analytics">FinanceAI Analytics</option>
                  <option value="HealthTracker IoT">HealthTracker IoT</option>
                </select>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar OKRs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-3 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm min-w-[160px]"
                    style={{
                      background: 'var(--surface)',
                      color: 'var(--text-primary)',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  />
                </div>
              </div>

              {/* Secondary actions group */}
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200 text-sm font-medium ${
                    showFilters ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{
                    background: showFilters ? 'var(--brand-primary-light)' : 'var(--surface)',
                    color: showFilters ? 'var(--brand-primary)' : 'var(--text-primary)',
                    boxShadow: showFilters ? 'none' : 'var(--shadow-sm)'
                  }}
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filtros</span>
                </button>

                <button className="px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-150 text-sm font-medium bg-green-600 hover:bg-green-700 text-white">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Exportar</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 rounded-2xl p-6 bg-white shadow-md border border-gray-100 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
                Filtros
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="transition-colors duration-200 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="progress">Progreso</option>
                  <option value="status">Estado</option>
                  <option value="team">Equipo</option>
                  <option value="priority">Prioridad</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Orden</label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="desc">Descendente</option>
                  <option value="asc">Ascendente</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced View Mode Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-md p-2 border border-gray-100">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'teams', label: 'Por Equipos', icon: Users },
                { id: 'objectives', label: 'Objetivos', icon: Target },
                { id: 'progress', label: 'Progreso', icon: TrendingUp },
                { id: 'collaborators', label: 'Colaboradores', icon: UserPlus },
                { id: 'analytics', label: 'Analytics', icon: Activity }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setViewMode(id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all ${
                    viewMode === id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Based on View Mode */}
        {viewMode === 'dashboard' ? renderDashboardView() : renderOKRsList()}

        {/* Floating Create Button */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 z-40"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Create OKR Modal */}
        <CreateOKRModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateOKR}
        />

        {/* Assign to OKR Modal */}
        {showAssignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="w-8 h-8 text-indigo-600" />
                Asignar Colaborador
              </h3>

              {selectedCollaborator && (
                <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2">👤 Colaborador seleccionado:</h4>
                  <p className="text-gray-700 font-medium">
                    {collaborators.find(c => c.id === selectedCollaborator)?.name} -
                    {collaborators.find(c => c.id === selectedCollaborator)?.role}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Seleccionar OKR:
                </label>
                <select
                  value={selectedOKR || ''}
                  onChange={(e) => setSelectedOKR(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium"
                >
                  <option value="">Seleccionar OKR</option>
                  {okrsData.map((okr) => (
                    <option key={okr.id} value={okr.id}>
                      {okr.team}: {okr.objective.substring(0, 40)}...
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedOKR(null);
                    setSelectedCollaborator(null);
                  }}
                  className="px-6 py-3 text-gray-600 bg-gray-100 rounded-2xl font-medium hover:bg-gray-200 transition-all"
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
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}