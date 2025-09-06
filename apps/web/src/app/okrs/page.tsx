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
  Eye
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CreateOKRModal from '../../components/forms/CreateOKRModal';
import Layout from '../../components/layout/Layout';

// OKRs (Objectives and Key Results) management page
export default function OKRsPage() {
  const [selectedQuarter, setSelectedQuarter] = useState('Q3-2025');
  const [selectedTeam, setSelectedTeam] = useState('all');
  const [viewMode, setViewMode] = useState('teams'); // 'teams', 'objectives'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-50 border-green-200';
      case 'at-risk': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'behind': return 'text-red-600 bg-red-50 border-red-200';
      case 'completed': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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

  const filteredOKRs = selectedTeam === 'all' ? okrsData : okrsData.filter(okr => okr.team === selectedTeam);

  const overallStats = {
    totalObjectives: okrsData.length,
    onTrack: okrsData.filter(okr => okr.status === 'on-track').length,
    atRisk: okrsData.filter(okr => okr.status === 'at-risk').length,
    behind: okrsData.filter(okr => okr.status === 'behind').length,
    avgProgress: Math.round(okrsData.reduce((sum, okr) => sum + okr.overallProgress, 0) / okrsData.length)
  };

  return (
    <Layout title="🟣 Módulo 4 - OKRs Operativos" subtitle="Objetivos y resultados clave por equipo">
      <div className="p-6 min-h-screen bg-gray-50">
        {/* Content */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-3">
              <select
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Q1-2025">Q1 2025</option>
                <option value="Q2-2025">Q2 2025</option>
                <option value="Q3-2025">Q3 2025</option>
                <option value="Q4-2025">Q4 2025</option>
              </select>

              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">Todos los equipos</option>
                <option value="EcoTech Solutions">EcoTech Solutions</option>
                <option value="FinanceAI">FinanceAI</option>
                <option value="HealthTracker">HealthTracker</option>
              </select>
              
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtros
              </button>
              
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>
          </div>

          {/* View Mode Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setViewMode('teams')}
              className={`px-6 py-3 font-medium ${
                viewMode === 'teams'
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Por Equipos
            </button>
            <button
              onClick={() => setViewMode('objectives')}
              className={`px-6 py-3 font-medium ${
                viewMode === 'objectives'
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Target className="w-4 h-4 inline mr-2" />
              Por Objetivos
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Objetivos</h3>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{overallStats.totalObjectives}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">En Progreso</h3>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">{overallStats.onTrack}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">En Riesgo</h3>
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">{overallStats.atRisk}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Atrasados</h3>
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-600">{overallStats.behind}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Progreso Promedio</h3>
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{overallStats.avgProgress}%</p>
          </div>
        </div>

        {/* OKRs List */}
        <div className="space-y-6">
          {filteredOKRs.map((okr) => (
            <div key={okr.id} className="bg-white rounded-lg shadow-sm border">
              {/* OKR Header */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {okr.team}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(okr.status)}`}>
                        {getStatusIcon(okr.status)}
                        {getStatusLabel(okr.status)}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium mb-2">{okr.objective}</p>
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
              <div className="p-6">
                <h4 className="text-sm font-medium text-gray-600 mb-4">Resultados Clave</h4>
                <div className="space-y-4">
                  {okr.keyResults.map((kr) => (
                    <div key={kr.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
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
          ))}
        </div>

        {/* Add New OKR Button */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Crear Nuevo OKR
          </button>
        </div>

        {/* Create OKR Modal */}
        <CreateOKRModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateOKR}
        />
      </div>
    </Layout>
  );
}