// apps/web/src/app/learning/page.tsx
'use client';

import { useState } from 'react';
import {
  BookOpen,
  Brain,
  Lightbulb,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  Tag,
  Filter,
  Download,
  Plus,
  Search,
  Eye,
  Edit,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Info,
  Target,
  BarChart3,
  FileText,
  MessageSquare,
  Star,
  ThumbsUp,
  ThumbsDown,
  GitBranch,
  Activity,
  Zap,
  Award,
  Layers,
  Settings,
  ExternalLink,
  Share,
  Bookmark,
  RefreshCw
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

export default function LearningPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [dateRange, setDateRange] = useState('3m');
  const [viewMode, setViewMode] = useState('timeline');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Learning and retrospectives data
  const learningData = {
    retrospectives: [
      {
        id: 1,
        title: 'Q2 2024 Product Retrospective - EcoTech Solutions',
        type: 'producto',
        startup: 'EcoTech Solutions',
        date: '2024-06-15',
        author: 'Ana García',
        participants: ['Ana García', 'Carlos López', 'María Rodríguez'],
        tags: ['product-market-fit', 'user-feedback', 'iteration'],
        status: 'completed',
        keyLearnings: [
          {
            category: 'producto',
            insight: 'Los usuarios valoran más la simplicidad que las funciones avanzadas',
            impact: 'high',
            actionTaken: 'Simplificamos el onboarding y removimos funciones poco usadas'
          },
          {
            category: 'negocio',
            insight: 'El modelo de pricing por usuario no escala bien para empresas',
            impact: 'medium',
            actionTaken: 'Desarrollamos un modelo enterprise con pricing fijo'
          }
        ],
        decisions: [
          {
            decision: 'Priorizar simplicidad sobre funcionalidad',
            rationale: 'Datos de usuario y feedback consistente',
            outcome: 'Incremento del 35% en conversión',
            date: '2024-06-20'
          }
        ],
        metrics: {
          satisfaction: 4.2,
          actionItems: 8,
          implemented: 6
        }
      },
      {
        id: 2,
        title: 'Team Dynamics Retrospective - FinanceAI',
        type: 'equipo',
        startup: 'FinanceAI',
        date: '2024-06-01',
        author: 'Roberto Silva',
        participants: ['Roberto Silva', 'David Chen', 'Laura Martín'],
        tags: ['team-collaboration', 'communication', 'remote-work'],
        status: 'completed',
        keyLearnings: [
          {
            category: 'equipo',
            insight: 'La comunicación asíncrona reduce la productividad en tareas complejas',
            impact: 'high',
            actionTaken: 'Implementamos daily sync meetings para decisiones técnicas'
          },
          {
            category: 'proceso',
            insight: 'El code review está tomando demasiado tiempo',
            impact: 'medium',
            actionTaken: 'Establecimos SLA de 24hrs para reviews'
          }
        ],
        decisions: [
          {
            decision: 'Adoptar pair programming para features críticos',
            rationale: 'Mejora calidad de código y reduce tiempo de review',
            outcome: 'Reducción del 40% en bugs de producción',
            date: '2024-06-05'
          }
        ],
        metrics: {
          satisfaction: 4.5,
          actionItems: 5,
          implemented: 5
        }
      },
      {
        id: 3,
        title: 'Go-to-Market Strategy Review - HealthTracker',
        type: 'negocio',
        startup: 'HealthTracker',
        date: '2024-05-20',
        author: 'Sofia Ramírez',
        participants: ['Sofia Ramírez', 'Miguel Torres'],
        tags: ['go-to-market', 'customer-acquisition', 'market-research'],
        status: 'completed',
        keyLearnings: [
          {
            category: 'negocio',
            insight: 'El mercado B2C requiere más inversión en marketing que el presupuesto actual',
            impact: 'high',
            actionTaken: 'Pivotamos hacia B2B healthcare providers'
          },
          {
            category: 'producto',
            insight: 'Las funciones de compliance son más importantes que las de UX',
            impact: 'medium',
            actionTaken: 'Repriorizamos roadmap enfocándose en HIPAA compliance'
          }
        ],
        decisions: [
          {
            decision: 'Pivot hacia B2B healthcare market',
            rationale: 'Mayor disposición a pagar y ciclo de ventas más predecible',
            outcome: 'En progreso - prometedor según early indicators',
            date: '2024-05-25'
          }
        ],
        metrics: {
          satisfaction: 3.8,
          actionItems: 12,
          implemented: 8
        }
      },
      {
        id: 4,
        title: 'Cross-Startup Knowledge Sharing Session',
        type: 'general',
        startup: null,
        date: '2024-05-15',
        author: 'Ana García',
        participants: ['Ana García', 'Roberto Silva', 'Sofia Ramírez', 'Carlos López'],
        tags: ['knowledge-sharing', 'best-practices', 'cross-pollination'],
        status: 'completed',
        keyLearnings: [
          {
            category: 'proceso',
            insight: 'Cada startup está resolviendo problemas similares de manera independiente',
            impact: 'high',
            actionTaken: 'Creamos biblioteca compartida de componentes y herramientas'
          },
          {
            category: 'equipo',
            insight: 'El intercambio de miembros entre proyectos mejora la innovación',
            impact: 'medium',
            actionTaken: 'Implementamos programa de rotación trimestral'
          }
        ],
        decisions: [
          {
            decision: 'Establecer reuniones mensuales de cross-sharing',
            rationale: 'Evitar duplicación de esfuerzos y acelerar aprendizaje',
            outcome: 'Aumento del 25% en velocidad de desarrollo',
            date: '2024-05-20'
          }
        ],
        metrics: {
          satisfaction: 4.7,
          actionItems: 6,
          implemented: 4
        }
      },
      {
        id: 5,
        title: 'Technical Architecture Review - All Startups',
        type: 'general',
        startup: null,
        date: '2024-04-30',
        author: 'Roberto Silva',
        participants: ['Roberto Silva', 'Carlos López', 'David Chen', 'Laura Martín'],
        tags: ['architecture', 'scalability', 'technical-debt'],
        status: 'completed',
        keyLearnings: [
          {
            category: 'técnico',
            insight: 'Microservices están añadiendo complejidad innecesaria en etapas tempranas',
            impact: 'high',
            actionTaken: 'Adoptamos arquitectura monolítica modular para nuevos proyectos'
          },
          {
            category: 'proceso',
            insight: 'La falta de documentación técnica está ralentizando el onboarding',
            impact: 'medium',
            actionTaken: 'Implementamos documentation-driven development'
          }
        ],
        decisions: [
          {
            decision: 'Estandarizar stack tecnológico across startups',
            rationale: 'Facilita la rotación de desarrolladores y el soporte cruzado',
            outcome: 'Reducción del 30% en tiempo de setup de nuevos proyectos',
            date: '2024-05-05'
          }
        ],
        metrics: {
          satisfaction: 4.3,
          actionItems: 10,
          implemented: 7
        }
      }
    ],

    // Learning categories and their distribution
    categories: [
      { name: 'Producto', count: 15, color: '#10B981', growth: '+12%' },
      { name: 'Equipo', count: 12, color: '#3B82F6', growth: '+8%' },
      { name: 'Negocio', count: 18, color: '#F59E0B', growth: '+15%' },
      { name: 'Técnico', count: 9, color: '#8B5CF6', growth: '+5%' },
      { name: 'Proceso', count: 11, color: '#EF4444', growth: '+20%' },
      { name: 'General', count: 7, color: '#6B7280', growth: '+10%' }
    ],

    // Learning trends over time
    trends: [
      { month: 'Ene', total: 8, implemented: 6, producto: 3, equipo: 2, negocio: 2, tecnico: 1 },
      { month: 'Feb', total: 12, implemented: 9, producto: 4, equipo: 3, negocio: 3, tecnico: 2 },
      { month: 'Mar', total: 15, implemented: 12, producto: 5, equipo: 4, negocio: 4, tecnico: 2 },
      { month: 'Abr', total: 18, implemented: 14, producto: 6, equipo: 4, negocio: 5, tecnico: 3 },
      { month: 'May', total: 22, implemented: 18, producto: 7, equipo: 5, negocio: 6, tecnico: 4 },
      { month: 'Jun', total: 25, implemented: 20, producto: 8, equipo: 6, negocio: 7, tecnico: 4 }
    ],

    // Impact metrics
    impact: {
      totalLearnings: 72,
      implementationRate: 78,
      averageImpact: 4.1,
      crossPollination: 65,
      knowledgeRetention: 89
    },

    // Decision timeline
    keyDecisions: [
      {
        id: 1,
        title: 'Adopción de Next.js como framework estándar',
        date: '2024-06-01',
        impact: 'high',
        startups: ['EcoTech Solutions', 'FinanceAI'],
        outcome: 'Reducción 40% tiempo desarrollo',
        status: 'implemented'
      },
      {
        id: 2,
        title: 'Implementación programa rotación de talento',
        date: '2024-05-15',
        impact: 'medium',
        startups: ['All'],
        outcome: 'Aumento 25% satisfacción equipo',
        status: 'implemented'
      },
      {
        id: 3,
        title: 'Pivot HealthTracker hacia B2B',
        date: '2024-05-25',
        impact: 'high',
        startups: ['HealthTracker'],
        outcome: 'En evaluación - indicadores positivos',
        status: 'in-progress'
      },
      {
        id: 4,
        title: 'Centralización de herramientas DevOps',
        date: '2024-04-20',
        impact: 'medium',
        startups: ['All'],
        outcome: 'Reducción 30% costos infraestructura',
        status: 'implemented'
      }
    ]
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'producto': return 'bg-green-50 text-green-700 border-green-200';
      case 'equipo': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'negocio': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'técnico': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'proceso': return 'bg-red-50 text-red-700 border-red-200';
      case 'general': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'implemented': return 'bg-green-50 text-green-700';
      case 'in-progress': return 'bg-blue-50 text-blue-700';
      case 'planned': return 'bg-yellow-50 text-yellow-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const filteredRetrospectives = learningData.retrospectives.filter(retro => {
    const typeMatch = selectedType === 'all' || retro.type === selectedType;
    const startupMatch = selectedFilter === 'all' || retro.startup === selectedFilter || (!retro.startup && selectedFilter === 'general');
    return typeMatch && startupMatch;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              🟤 Módulo de Aprendizajes y Retros
            </h1>
            <p className="mt-2 text-gray-600">
              Documentación de retrospectivas, decisiones clave y línea de tiempo de aprendizajes
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center sm:justify-start gap-2">
              <Download className="w-4 h-4 shrink-0" />
              Exportar
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center sm:justify-start gap-2"
            >
              <Plus className="w-4 h-4 shrink-0" />
              Nueva Retrospectiva
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Aprendizajes</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{learningData.impact.totalLearnings}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tasa Implementación</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{learningData.impact.implementationRate}%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Impacto Promedio</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{learningData.impact.averageImpact}/5</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cross-Pollination</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{learningData.impact.crossPollination}%</p>
            </div>
            <GitBranch className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Retención Conocimiento</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{learningData.impact.knowledgeRetention}%</p>
            </div>
            <Brain className="h-8 w-8 text-cyan-600" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Learning Trends */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Tendencias de Aprendizaje</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={learningData.trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="total" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Total" />
                <Area type="monotone" dataKey="implemented" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Implementados" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Distribution */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Distribución por Categoría</h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="count"
                  data={learningData.categories}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, count }) => `${name}: ${count}`}
                >
                  {learningData.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filters and View Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Filters */}
          <div className="flex gap-4 flex-1">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Startup</label>
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas</option>
                <option value="EcoTech Solutions">EcoTech Solutions</option>
                <option value="FinanceAI">FinanceAI</option>
                <option value="HealthTracker">HealthTracker</option>
                <option value="general">General (Cross-startup)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos</option>
                <option value="producto">Producto</option>
                <option value="equipo">Equipo</option>
                <option value="negocio">Negocio</option>
                <option value="técnico">Técnico</option>
                <option value="proceso">Proceso</option>
                <option value="general">General</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Periodo</label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1m">Último mes</option>
                <option value="3m">Últimos 3 meses</option>
                <option value="6m">Últimos 6 meses</option>
                <option value="1y">Último año</option>
              </select>
            </div>
          </div>

          {/* View Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vista</label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-2 rounded transition-colors ${
                  viewMode === 'timeline' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <Calendar className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-2 rounded transition-colors ${
                  viewMode === 'cards' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('decisions')}
                className={`px-3 py-2 rounded transition-colors ${
                  viewMode === 'decisions' ? 'bg-white shadow-sm' : ''
                }`}
              >
                <Target className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'timeline' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Línea de Tiempo de Retrospectivas</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {filteredRetrospectives.map((retro, index) => (
                <div key={retro.id} className="relative flex items-start gap-6">
                  {/* Timeline dot */}
                  <div className="relative z-10 w-12 h-12 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{retro.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full border ${getTypeColor(retro.type)}`}>
                            {retro.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(retro.date).toLocaleDateString('es-ES')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {retro.participants.length} participantes
                          </span>
                          {retro.startup && (
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {retro.startup}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          Por {retro.author}
                        </span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {retro.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Key Learnings Preview */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Aprendizajes Clave:</h4>
                      {retro.keyLearnings.slice(0, 2).map((learning, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(learning.category)}`}>
                                {learning.category}
                              </span>
                              <span className={`text-sm font-medium ${getImpactColor(learning.impact)}`}>
                                {learning.impact} impact
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{learning.insight}</p>
                            <p className="text-xs text-gray-600">
                              <strong>Acción:</strong> {learning.actionTaken}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="flex items-center gap-6 mt-4 pt-4 border-t">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">{retro.metrics.satisfaction}</span>
                        <span className="text-xs text-gray-500">satisfacción</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">{retro.metrics.implemented}/{retro.metrics.actionItems}</span>
                        <span className="text-xs text-gray-500">implementados</span>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        Ver detalles
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'decisions' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Línea de Tiempo de Decisiones Clave</h2>
          
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="space-y-6">
                {learningData.keyDecisions.map((decision, index) => (
                  <div key={decision.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{decision.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(decision.status)}`}>
                          {decision.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {new Date(decision.date).toLocaleDateString('es-ES')}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className={`font-medium ${getImpactColor(decision.impact)}`}>
                              {decision.impact.toUpperCase()} IMPACT
                            </span>
                            {' • '}
                            <span>{Array.isArray(decision.startups) ? decision.startups.join(', ') : decision.startups}</span>
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 mb-1">Resultado:</div>
                          <div className="text-gray-700">{decision.outcome}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          Ver contexto completo
                        </button>
                        <span className="text-gray-300">•</span>
                        <button className="text-sm text-gray-600 hover:text-gray-800">
                          Exportar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'cards' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Vista de Tarjetas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRetrospectives.map((retro) => (
              <div key={retro.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{retro.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full border ${getTypeColor(retro.type)}`}>
                          {retro.type}
                        </span>
                        {retro.startup && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                            {retro.startup}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="text-sm text-gray-600">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {new Date(retro.date).toLocaleDateString('es-ES')}
                    </div>
                    
                    <div className="text-sm">
                      <div className="font-medium text-gray-700 mb-1">Aprendizajes principales:</div>
                      {retro.keyLearnings.slice(0, 1).map((learning, idx) => (
                        <div key={idx} className="text-gray-600 text-xs line-clamp-2">
                          {learning.insight}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {retro.metrics.satisfaction}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {retro.metrics.implemented}/{retro.metrics.actionItems}
                      </span>
                    </div>
                    
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Share className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Bookmark className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}