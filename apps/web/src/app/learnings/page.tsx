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
  RefreshCw,
  X,
  ChevronDown,
  ChevronUp,
  MapPin,
  Trash2,
  Building
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import Layout from '../../components/layout/Layout';
import { ModernMetricCard } from '../../components/ui/ModernMetricCard';

export default function LearningsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [dateRange, setDateRange] = useState('3m');
  const [viewMode, setViewMode] = useState('timeline');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [editingLearning, setEditingLearning] = useState(null);
  const [editingInTimeline, setEditingInTimeline] = useState(null);
  const [inlineFormData, setInlineFormData] = useState({});
  
  // Form states
  const [formData, setFormData] = useState({
    title: '',
    type: 'producto',
    startup: '',
    date: new Date().toISOString().split('T')[0],
    author: '',
    participants: [],
    tags: [],
    status: 'completed',
    category: 'retrospectiva',
    priority: 'medium',
    keyLearnings: [],
    decisions: [],
    description: '',
    context: '',
    outcomes: ''
  });

  // Learning and retrospectives data
  const learningsData = [
    {
      id: 1,
      title: 'Q3 2024 Product Retrospective - EcoTech Carbon Platform',
      type: 'producto',
      startup: 'EcoTech Carbon Platform',
      date: '2024-09-15',
      author: 'Ana García',
      participants: ['Ana García', 'Carlos López', 'María Rodríguez'],
      tags: ['product-market-fit', 'user-feedback', 'iteration', 'pricing'],
      status: 'completed',
      category: 'retrospectiva',
      priority: 'high',
      keyLearnings: [
        {
          category: 'producto',
          insight: 'Los usuarios valoran más la simplicidad que las funciones avanzadas',
          impact: 'high',
          actionTaken: 'Simplificamos el onboarding y removimos funciones poco usadas',
          evidence: 'Incremento del 35% en conversión post-simplificación'
        },
        {
          category: 'negocio',
          insight: 'El modelo de pricing por usuario no escala bien para empresas',
          impact: 'medium',
          actionTaken: 'Desarrollamos un modelo enterprise con pricing fijo',
          evidence: '3 nuevos clientes enterprise en 2 meses'
        }
      ],
      decisions: [
        {
          id: 'd1',
          decision: 'Priorizar simplicidad sobre funcionalidad avanzada',
          rationale: 'Datos de usuario y feedback consistente mostraron preferencia por simplicidad',
          outcome: 'Incremento del 35% en conversión',
          date: '2024-09-20',
          owner: 'Ana García',
          status: 'implemented'
        },
        {
          id: 'd2',
          decision: 'Implementar modelo de pricing enterprise',
          rationale: 'Modelo por usuario no escalaba para clientes grandes',
          outcome: 'En progreso - 3 clientes enterprise cerrados',
          date: '2024-09-25',
          owner: 'Carlos López',
          status: 'in-progress'
        }
      ],
      metrics: {
        satisfaction: 4.2,
        actionItems: 8,
        implemented: 6,
        impact: 85
      },
      attachments: [
        { name: 'User_Research_Summary.pdf', size: '2.3 MB', type: 'pdf' },
        { name: 'Conversion_Data.xlsx', size: '1.1 MB', type: 'excel' }
      ]
    },
    {
      id: 2,
      title: 'Team Dynamics & Remote Work Learnings - FinanceAI Analytics',
      type: 'equipo',
      startup: 'FinanceAI Analytics',
      date: '2024-09-01',
      author: 'Roberto Silva',
      participants: ['Roberto Silva', 'David Chen', 'Laura Martín', 'Sofia Ramírez'],
      tags: ['team-collaboration', 'remote-work', 'productivity', 'communication'],
      status: 'completed',
      category: 'learning-session',
      priority: 'medium',
      keyLearnings: [
        {
          category: 'equipo',
          insight: 'La comunicación asíncrona reduce la productividad en tareas complejas',
          impact: 'high',
          actionTaken: 'Implementamos daily sync meetings para decisiones técnicas',
          evidence: 'Reducción de 40% en tiempo de resolución de issues complejos'
        },
        {
          category: 'proceso',
          insight: 'El code review está tomando demasiado tiempo',
          impact: 'medium',
          actionTaken: 'Establecimos SLA de 24hrs para reviews',
          evidence: 'Tiempo promedio de review bajó de 3 días a 18 horas'
        },
        {
          category: 'cultura',
          insight: 'Los miembros junior necesitan más mentoring estructurado',
          impact: 'medium',
          actionTaken: 'Creamos programa de mentoring 1:1 semanal',
          evidence: 'Satisfacción del equipo junior subió de 3.2 a 4.1'
        }
      ],
      decisions: [
        {
          id: 'd3',
          decision: 'Adoptar pair programming para features críticos',
          rationale: 'Mejora calidad de código y reduce tiempo de review',
          outcome: 'Reducción del 40% en bugs de producción',
          date: '2024-09-05',
          owner: 'Roberto Silva',
          status: 'implemented'
        }
      ],
      metrics: {
        satisfaction: 4.5,
        actionItems: 5,
        implemented: 5,
        impact: 92
      },
      attachments: [
        { name: 'Team_Survey_Results.pdf', size: '1.8 MB', type: 'pdf' }
      ]
    },
    {
      id: 3,
      title: 'Go-to-Market Strategy Pivot - HealthTracker IoT',
      type: 'negocio',
      startup: 'HealthTracker IoT',
      date: '2024-08-20',
      author: 'Sofia Ramírez',
      participants: ['Sofia Ramírez', 'Miguel Torres', 'Ana García'],
      tags: ['go-to-market', 'customer-acquisition', 'market-research', 'pivot'],
      status: 'completed',
      category: 'strategic-review',
      priority: 'high',
      keyLearnings: [
        {
          category: 'negocio',
          insight: 'El mercado B2C requiere más inversión en marketing que el presupuesto actual',
          impact: 'high',
          actionTaken: 'Pivotamos hacia B2B healthcare providers',
          evidence: 'CAC bajó de $150 a $45 en segmento B2B'
        },
        {
          category: 'producto',
          insight: 'Las funciones de compliance son más importantes que las de UX para B2B',
          impact: 'medium',
          actionTaken: 'Repriorizamos roadmap enfocándose en HIPAA compliance',
          evidence: '5 leads cualificados en pipeline B2B'
        },
        {
          category: 'mercado',
          insight: 'Los decision makers en healthcare son diferentes de los usuarios finales',
          impact: 'high',
          actionTaken: 'Creamos estrategia dual: IT managers y médicos',
          evidence: 'Mejora del 60% en tasa de conversión de demos'
        }
      ],
      decisions: [
        {
          id: 'd4',
          decision: 'Pivot completo hacia mercado B2B healthcare',
          rationale: 'Mayor disposición a pagar y ciclo de ventas más predecible',
          outcome: 'En progreso - prometedor según early indicators',
          date: '2024-08-25',
          owner: 'Sofia Ramírez',
          status: 'in-progress'
        }
      ],
      metrics: {
        satisfaction: 3.8,
        actionItems: 12,
        implemented: 8,
        impact: 78
      },
      attachments: [
        { name: 'Market_Research_B2B.pdf', size: '3.2 MB', type: 'pdf' },
        { name: 'Competitor_Analysis.pptx', size: '5.1 MB', type: 'ppt' }
      ]
    },
    {
      id: 4,
      title: 'Cross-Startup Knowledge Sharing Session',
      type: 'general',
      startup: null,
      date: '2024-08-15',
      author: 'Ana García',
      participants: ['Ana García', 'Roberto Silva', 'Sofia Ramírez', 'Carlos López', 'David Chen'],
      tags: ['knowledge-sharing', 'best-practices', 'cross-pollination', 'innovation'],
      status: 'completed',
      category: 'knowledge-sharing',
      priority: 'medium',
      keyLearnings: [
        {
          category: 'proceso',
          insight: 'Cada startup está resolviendo problemas similares de manera independiente',
          impact: 'high',
          actionTaken: 'Creamos biblioteca compartida de componentes y herramientas',
          evidence: '30% reducción en tiempo de desarrollo de nuevas features'
        },
        {
          category: 'equipo',
          insight: 'El intercambio de miembros entre proyectos mejora la innovación',
          impact: 'medium',
          actionTaken: 'Implementamos programa de rotación trimestral',
          evidence: '4 nuevas ideas implementadas por intercambio de conocimiento'
        }
      ],
      decisions: [
        {
          id: 'd5',
          decision: 'Establecer reuniones mensuales de cross-sharing',
          rationale: 'Evitar duplicación de esfuerzos y acelerar aprendizaje',
          outcome: 'Aumento del 25% en velocidad de desarrollo',
          date: '2024-08-20',
          owner: 'Ana García',
          status: 'implemented'
        }
      ],
      metrics: {
        satisfaction: 4.6,
        actionItems: 3,
        implemented: 3,
        impact: 88
      },
      attachments: []
    }
  ];

  // Analytics data
  const analyticsData = {
    totalLearnings: learningsData.length,
    byType: {
      producto: learningsData.filter(l => l.type === 'producto').length,
      equipo: learningsData.filter(l => l.type === 'equipo').length,
      negocio: learningsData.filter(l => l.type === 'negocio').length,
      general: learningsData.filter(l => l.type === 'general').length
    },
    avgSatisfaction: (learningsData.reduce((sum, l) => sum + l.metrics.satisfaction, 0) / learningsData.length).toFixed(1),
    implementationRate: Math.round((learningsData.reduce((sum, l) => sum + l.metrics.implemented, 0) / learningsData.reduce((sum, l) => sum + l.metrics.actionItems, 0)) * 100),
    impactScore: Math.round(learningsData.reduce((sum, l) => sum + l.metrics.impact, 0) / learningsData.length)
  };

  const monthlyTrends = [
    { month: 'Jun', learnings: 2, decisions: 3, impact: 75 },
    { month: 'Jul', learnings: 1, decisions: 2, impact: 82 },
    { month: 'Ago', learnings: 3, decisions: 5, impact: 85 },
    { month: 'Sep', learnings: 4, decisions: 6, impact: 88 }
  ];

  // Filter functions
  const getFilteredLearnings = () => {
    return learningsData.filter(learning => {
      if (selectedFilter !== 'all' && learning.startup !== selectedFilter) return false;
      if (selectedType !== 'all' && learning.type !== selectedType) return false;
      if (searchTerm && !learning.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !learning.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
      if (selectedTags.length > 0 && !selectedTags.every(tag => learning.tags.includes(tag))) return false;
      return true;
    });
  };

  const filteredLearnings = getFilteredLearnings();

  // Available options
  const availableStartups = [...new Set(learningsData.filter(l => l.startup).map(l => l.startup))];
  const availableTags = [...new Set(learningsData.flatMap(l => l.tags))];

  // Helper functions
  const getTypeColor = (type) => {
    switch (type) {
      case 'producto': return 'bg-blue-100 text-blue-800';
      case 'equipo': return 'bg-green-100 text-green-800';
      case 'negocio': return 'bg-purple-100 text-purple-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact) => {
    if (impact === 'high') return 'text-red-600 bg-red-50';
    if (impact === 'medium') return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const exportData = () => {
    const exportData = {
      summary: analyticsData,
      learnings: filteredLearnings,
      exported_at: new Date().toISOString(),
      filters_applied: {
        startup: selectedFilter,
        type: selectedType,
        search: searchTerm,
        tags: selectedTags
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learnings-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'producto',
      startup: '',
      date: new Date().toISOString().split('T')[0],
      author: '',
      participants: [],
      tags: [],
      status: 'completed',
      category: 'retrospectiva',
      priority: 'medium',
      keyLearnings: [],
      decisions: [],
      description: '',
      context: '',
      outcomes: ''
    });
  };

  const handleCreateNew = () => {
    resetForm();
    setEditingLearning(null);
    setShowCreateModal(true);
  };

  const handleViewDetails = (learningId) => {
    const learning = learningsData.find(l => l.id === learningId);
    if (learning) {
      console.log('Viewing details for learning:', learning);
      // Navigate to dashboard
      window.location.href = '/dashboard';
    }
  };

  const handleEditLearning = (learningId) => {
    const learning = learningsData.find(l => l.id === learningId);
    if (learning) {
      setEditingLearning(learning);
      setFormData({
        title: learning.title || '',
        type: learning.type || 'producto',
        startup: learning.startup || '',
        date: learning.date || new Date().toISOString().split('T')[0],
        author: learning.author || '',
        participants: learning.participants || [],
        tags: learning.tags || [],
        status: learning.status || 'completed',
        category: learning.category || 'retrospectiva',
        priority: learning.priority || 'medium',
        keyLearnings: learning.keyLearnings || [],
        decisions: learning.decisions || [],
        description: learning.description || '',
        context: learning.context || '',
        outcomes: learning.outcomes || ''
      });
      setShowEditModal(true);
    }
  };

  const handleInlineEdit = (learningId) => {
    const learning = learningsData.find(l => l.id === learningId);
    if (learning) {
      setEditingInTimeline(learningId);
      setInlineFormData({
        title: learning.title,
        author: learning.author,
        priority: learning.priority,
        tags: learning.tags.join(', ')
      });
    }
  };

  const handleInlineCancel = () => {
    setEditingInTimeline(null);
    setInlineFormData({});
  };

  const handleInlineSave = (learningId) => {
    console.log('Saving inline changes for learning:', learningId, inlineFormData);
    // Future: Save to backend and update state
    setEditingInTimeline(null);
    setInlineFormData({});
  };

  const handleInlineFormChange = (field, value) => {
    setInlineFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeleteLearning = (learningId) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta retrospectiva?')) {
      console.log('Deleting learning:', learningId);
      // Future: Delete from backend and update state
    }
  };

  const handleSaveLearning = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Por favor ingresa un título');
      return;
    }

    const learningData = {
      id: editingLearning?.id || Date.now(),
      ...formData,
      participants: typeof formData.participants === 'string' 
        ? formData.participants.split(',').map(p => p.trim()) 
        : formData.participants,
      tags: typeof formData.tags === 'string' 
        ? formData.tags.split(',').map(t => t.trim()) 
        : formData.tags,
      metrics: {
        implemented: 0,
        actionItems: formData.keyLearnings.length,
        impact: 85
      }
    };

    console.log(editingLearning ? 'Updating learning:' : 'Creating new learning:', learningData);
    
    // Future: Save to backend
    setShowCreateModal(false);
    setShowEditModal(false);
    resetForm();
    setEditingLearning(null);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addKeyLearning = () => {
    setFormData(prev => ({
      ...prev,
      keyLearnings: [...prev.keyLearnings, {
        category: 'producto',
        insight: '',
        impact: 'medium',
        actionTaken: '',
        evidence: ''
      }]
    }));
  };

  const removeKeyLearning = (index) => {
    setFormData(prev => ({
      ...prev,
      keyLearnings: prev.keyLearnings.filter((_, i) => i !== index)
    }));
  };

  const updateKeyLearning = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      keyLearnings: prev.keyLearnings.map((learning, i) => 
        i === index ? { ...learning, [field]: value } : learning
      )
    }));
  };

  return (
    <Layout
      title="📚 Aprendizajes y Retrospectivas"
      subtitle="Documentación de conocimiento y decisiones clave"
    >
      <div className="p-6 min-h-screen" style={{ background: 'var(--background)' }}>
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                🧠 Aprendizajes y Retrospectivas
              </h1>
              <p className="mt-2 text-gray-600 font-medium">
                Knowledge management inteligente y retrospectivas estratégicas del venture studio
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full flex items-center justify-center sm:justify-start gap-2 transition-all duration-200 font-medium ${
                  showFilters ? 'ring-2 ring-purple-500' : ''
                }`}
                style={{
                  background: showFilters ? 'var(--info-bg)' : 'white',
                  color: showFilters ? 'var(--info)' : 'var(--text-primary)',
                  boxShadow: showFilters ? 'none' : 'var(--shadow-sm)',
                  border: '1px solid var(--separator)'
                }}
                onMouseEnter={(e) => {
                  if (!showFilters) e.target.style.background = '#f8fafc'
                }}
                onMouseLeave={(e) => {
                  if (!showFilters) e.target.style.background = 'white'
                }}
              >
                <Filter className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">🔍 Filtros</span>
                {(selectedType !== 'all' || selectedFilter !== 'all' || selectedTags.length > 0 || searchTerm) && (
                  <span className="w-2 h-2 bg-purple-500 rounded-full ml-1 animate-pulse"></span>
                )}
              </button>
              
              <button 
                onClick={exportData}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-white text-gray-700 rounded-full hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 flex items-center justify-center sm:justify-start gap-2 transition-all duration-200 font-medium"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">📊 Exportar</span>
              </button>
              
              <button 
                onClick={handleCreateNew}
                className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full hover:from-purple-600 hover:to-indigo-700 flex items-center justify-center sm:justify-start gap-2 font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-4 h-4 shrink-0" />
                <span className="hidden xs:inline">🚀 Nueva </span>Retrospectiva
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-gray-200 transition-colors duration-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filtros Avanzados</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedFilter('all');
                    setSelectedType('all');
                    setSearchTerm('');
                    setSelectedTags([]);
                  }}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 bg-white border border-gray-200 hover:border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Limpiar Filtros
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 bg-white border border-gray-200 hover:border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Cerrar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Búsqueda</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar en títulos y tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Startup Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Startup</label>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                >
                  <option value="all">Todas las startups</option>
                  {availableStartups.map(startup => (
                    <option key={startup} value={startup}>{startup}</option>
                  ))}
                  <option value={null}>General (Cross-startup)</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Aprendizaje</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                >
                  <option value="all">Todos los tipos</option>
                  <option value="producto">🔵 Producto</option>
                  <option value="equipo">🟢 Equipo</option>
                  <option value="negocio">🟣 Negocio</option>
                  <option value="general">⚪ General</option>
                </select>
              </div>

              {/* Tags Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="max-h-32 overflow-y-auto">
                  <div className="space-y-1">
                    {availableTags.slice(0, 8).map(tag => (
                      <label key={tag} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => toggleTag(tag)}
                          className="rounded border border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-blue-500/20 mr-2 transition-all duration-200"
                        />
                        <span className="text-sm text-gray-700 truncate">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filters Summary */}
            {(selectedType !== 'all' || selectedFilter !== 'all' || selectedTags.length > 0 || searchTerm) && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Mostrando {filteredLearnings.length} de {learningsData.length} aprendizajes
                  {selectedTags.length > 0 && (
                    <span className="ml-2">
                      {selectedTags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mr-1">
                          {tag}
                          <button onClick={() => toggleTag(tag)} className="ml-1">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-6 mb-8">
          <ModernMetricCard
            title="Total Aprendizajes"
            value={analyticsData.totalLearnings}
            icon={<BookOpen className="w-6 h-6" />}
            color="blue"
            trend="up"
            change={25.0}
            changeType="positive"
            subtitle="Últimos 3 meses"
          />

          <ModernMetricCard
            title="Tasa Implementación"
            value={`${analyticsData.implementationRate}%`}
            icon={<CheckCircle className="w-6 h-6" />}
            color="green"
            trend="up"
            change={12.5}
            changeType="positive"
            subtitle="Acciones completadas"
          />

          <ModernMetricCard
            title="Satisfacción Promedio"
            value={`${analyticsData.avgSatisfaction}/5.0`}
            icon={<Star className="w-6 h-6" />}
            color="purple"
            trend="up"
            change={8.3}
            changeType="positive"
            subtitle="Rating de sesiones"
          />

          <ModernMetricCard
            title="Score de Impacto"
            value={`${analyticsData.impactScore}/100`}
            icon={<Zap className="w-6 h-6" />}
            color="orange"
            trend="up"
            change={15.7}
            changeType="positive"
            subtitle="Impacto medido"
          />

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold tracking-tight text-gray-600">
                📊 Por Tipo
              </h3>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-slate-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg">
                <span className="text-sm font-bold text-blue-700">💻 Producto:</span>
                <span className="text-sm font-bold text-blue-900">{analyticsData.byType.producto}</span>
              </div>
              <div className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg">
                <span className="text-sm font-bold text-green-700">👥 Equipo:</span>
                <span className="text-sm font-bold text-green-900">{analyticsData.byType.equipo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trends Chart */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 mb-8">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
              📈 Tendencias de Aprendizaje
            </h3>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart 
                data={monthlyTrends}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="learningsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="decisionsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#F3F4F6" 
                  strokeOpacity={0.7}
                />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}
                  formatter={(value, name) => [
                    value, 
                    name === 'learnings' ? '🧠 Aprendizajes' : '📝 Decisiones'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="learnings" 
                  stackId="1" 
                  stroke="#3B82F6" 
                  fill="url(#learningsGradient)"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="decisions" 
                  stackId="1" 
                  stroke="#10B981" 
                  fill="url(#decisionsGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex border-b border-gray-100 mb-6">
          {[
            { id: 'timeline', label: 'Timeline', icon: Clock },
            { id: 'grid', label: 'Grid', icon: Layers },
            { id: 'decisions', label: 'Decisiones', icon: GitBranch }
          ].map(mode => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                viewMode === mode.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <mode.icon className="w-4 h-4" />
              {mode.label}
            </button>
          ))}
        </div>

        {/* Content based on view mode */}
        {viewMode === 'timeline' && (
          <div className="space-y-4 sm:space-y-6">
            {filteredLearnings.map((learning, index) => (
              <div key={learning.id} className="relative">
                {/* Mobile-first responsive layout */}
                <div className="sm:flex sm:items-start sm:gap-6">
                  {/* Timeline elements - hidden on mobile, visible on sm+ */}
                  <div className="hidden sm:block relative">
                    {/* Timeline line */}
                    {index < filteredLearnings.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200 z-0" />
                    )}

                    {/* Timeline dot */}
                    <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(learning.type)}`}>
                      {learning.type === 'producto' && <Target className="w-5 h-5" />}
                      {learning.type === 'equipo' && <Users className="w-5 h-5" />}
                      {learning.type === 'negocio' && <TrendingUp className="w-5 h-5" />}
                      {learning.type === 'general' && <Lightbulb className="w-5 h-5" />}
                    </div>
                  </div>

                  {/* Content - full width on mobile, flex-1 on sm+ */}
                  <div className="w-full sm:flex-1 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-colors duration-200 p-4 sm:p-6">
                    {/* Mobile timeline indicator */}
                    <div className="flex items-center gap-3 mb-3 sm:hidden">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(learning.type)}`}>
                        {learning.type === 'producto' && <Target className="w-4 h-4" />}
                        {learning.type === 'equipo' && <Users className="w-4 h-4" />}
                        {learning.type === 'negocio' && <TrendingUp className="w-4 h-4" />}
                        {learning.type === 'general' && <Lightbulb className="w-4 h-4" />}
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getTypeColor(learning.type)}`}>
                        {learning.type}
                      </span>
                    </div>

                    {/* Header - responsive layout */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 mb-4">
                      <div className="flex-1 min-w-0">
                        {editingInTimeline === learning.id ? (
                          <div className="space-y-3">
                            {/* Title input - full width on mobile */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                              <input
                                type="text"
                                value={inlineFormData.title}
                                onChange={(e) => handleInlineFormChange('title', e.target.value)}
                                className="w-full text-base sm:text-lg font-semibold bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                                placeholder="Título"
                              />
                              <span className={`hidden sm:inline-block px-2 py-1 text-xs rounded-full border ${getTypeColor(learning.type)}`}>
                                {learning.type}
                              </span>
                            </div>

                            {/* Author and meta info - stacked on mobile */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                <input
                                  type="text"
                                  value={inlineFormData.author}
                                  onChange={(e) => handleInlineFormChange('author', e.target.value)}
                                  className="flex-1 sm:flex-none bg-white border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400"
                                  placeholder="Autor"
                                />
                              </div>
                              <span className="flex items-center gap-1 text-gray-600">
                                <Calendar className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{new Date(learning.date).toLocaleDateString()}</span>
                              </span>
                              {learning.startup && (
                                <span className="flex items-center gap-1 text-gray-600">
                                  <Building className="w-4 h-4 flex-shrink-0" />
                                  <span className="truncate">{learning.startup}</span>
                                </span>
                              )}
                            </div>

                            {/* Tags input */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <label className="text-sm text-gray-600 flex-shrink-0">Tags:</label>
                              <input
                                type="text"
                                value={inlineFormData.tags}
                                onChange={(e) => handleInlineFormChange('tags', e.target.value)}
                                className="flex-1 bg-white border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-400"
                                placeholder="Separar con comas"
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            {/* Title and type - responsive layout */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">{learning.title}</h3>
                              <span className={`hidden sm:inline-block px-2 py-1 text-xs rounded-full border ${getTypeColor(learning.type)}`}>
                                {learning.type}
                              </span>
                            </div>

                            {/* Meta information - responsive layout */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{learning.author}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{new Date(learning.date).toLocaleDateString()}</span>
                              </span>
                              {learning.startup && (
                                <span className="flex items-center gap-1">
                                  <Building className="w-4 h-4 flex-shrink-0" />
                                  <span className="truncate">{learning.startup}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action buttons - responsive layout */}
                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        {editingInTimeline === learning.id ? (
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <select
                              value={inlineFormData.priority}
                              onChange={(e) => handleInlineFormChange('priority', e.target.value)}
                              className="px-2 py-1 text-xs bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400"
                            >
                              <option value="high">Alta</option>
                              <option value="medium">Media</option>
                              <option value="low">Baja</option>
                            </select>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleInlineSave(learning.id)}
                                className="flex-1 sm:flex-none px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 flex items-center justify-center gap-1 transition-all duration-200"
                              >
                                <CheckCircle className="w-3 h-3" />
                                <span className="sm:inline">Guardar</span>
                              </button>
                              <button
                                onClick={handleInlineCancel}
                                className="flex-1 sm:flex-none px-3 py-1 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 flex items-center justify-center gap-1 transition-all duration-200"
                              >
                                <X className="w-3 h-3" />
                                <span className="sm:inline">Cancelar</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(learning.priority)}`}>
                              {learning.priority}
                            </span>
                            {/* Action buttons - condensed on mobile */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleViewDetails(learning.id)}
                                className="p-1.5 sm:p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                                title="Ver memo en vivo"
                              >
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                              <button
                                onClick={() => handleInlineEdit(learning.id)}
                                className="p-1.5 sm:p-2 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-all duration-200"
                                title="Edición rápida"
                              >
                                <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                              <button
                                onClick={() => handleEditLearning(learning.id)}
                                className="p-1.5 sm:p-2 hover:bg-green-50 hover:text-green-600 rounded-lg transition-all duration-200"
                                title="Editar completo"
                              >
                                <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteLearning(learning.id)}
                                className="p-1.5 sm:p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
                                title="Eliminar"
                              >
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Tags - responsive layout */}
                    {editingInTimeline !== learning.id && (
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                        {learning.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Key Learnings - responsive layout */}
                    {editingInTimeline !== learning.id && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Key Learnings:</h4>
                        <div className="space-y-3">
                          {learning.keyLearnings.map((kl, idx) => (
                            <div key={idx} className="flex items-start gap-2 sm:gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getImpactColor(kl.impact).replace('text-', 'bg-')}`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                                  <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(kl.category)}`}>
                                    {kl.category}
                                  </span>
                                  <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(kl.impact)}`}>
                                    {kl.impact} impact
                                  </span>
                                </div>
                                <p className="text-sm text-gray-900 font-medium mb-1 break-words">{kl.insight}</p>
                                <p className="text-sm text-gray-600 mb-1 break-words"><strong>Acción:</strong> {kl.actionTaken}</p>
                                {kl.evidence && (
                                  <p className="text-sm text-green-600 break-words"><strong>Evidencia:</strong> {kl.evidence}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Inline editing mode summary */}
                    {editingInTimeline === learning.id && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Edit className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-yellow-800">Modo de edición rápida activo</span>
                        </div>
                        <p className="text-xs text-yellow-700">
                          Estás editando los campos básicos. Para editar key learnings y más detalles, usa "Editar completo".
                        </p>
                      </div>
                    )}

                    {/* Metrics - responsive layout */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mt-4 pt-4 border-t">
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                          <span className="text-sm font-medium">{learning.metrics.satisfaction}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{learning.metrics.implemented}/{learning.metrics.actionItems} completadas</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleViewDetails(learning.id)}
                        className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg flex items-center justify-center sm:justify-start gap-1 transition-all duration-200 self-start sm:self-auto"
                      >
                        <ArrowRight className="w-4 h-4 flex-shrink-0" />
                        <span>Ver memo en vivo</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'decisions' && (
          <div className="space-y-6">
            {filteredLearnings.flatMap(learning => 
              learning.decisions.map(decision => (
                <div key={decision.id} className="flex items-start gap-4 p-4 border border-gray-100 hover:border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200">
                  <GitBranch className="w-5 h-5 text-purple-500 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{decision.decision}</h4>
                        <p className="text-sm text-gray-600 mt-1">{decision.rationale}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(decision.status)}`}>
                          {decision.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(decision.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-100 rounded p-3 mb-3">
                      <p className="text-sm text-green-800"><strong>Resultado:</strong> {decision.outcome}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Owner:</span>
                      <button className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-all duration-200">
                        {decision.owner}
                      </button>
                      
                      <span className="text-sm text-gray-600 ml-4">De:</span>
                      <button className="text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 px-2 py-1 rounded transition-all duration-200">
                        {learning.title}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Create/Edit Modal */}
        {(showCreateModal || showEditModal) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleSaveLearning}>
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-lg">
                  <h3 className="text-xl font-semibold">
                    {editingLearning ? 'Editar Retrospectiva' : 'Nueva Retrospectiva'}
                  </h3>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setShowEditModal(false);
                      resetForm();
                      setEditingLearning(null);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleFormChange('title', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        placeholder="Ej: Q3 2024 Product Retrospective - EcoTech Solutions"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Startup
                      </label>
                      <select
                        value={formData.startup}
                        onChange={(e) => handleFormChange('startup', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      >
                        <option value="">Seleccionar startup</option>
                        {availableStartups.map(startup => (
                          <option key={startup} value={startup}>{startup}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => handleFormChange('type', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      >
                        <option value="producto">Producto</option>
                        <option value="equipo">Equipo</option>
                        <option value="negocio">Negocio</option>
                        <option value="general">General</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleFormChange('date', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Autor
                      </label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => handleFormChange('author', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        placeholder="Nombre del autor"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prioridad
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) => handleFormChange('priority', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      >
                        <option value="high">Alta</option>
                        <option value="medium">Media</option>
                        <option value="low">Baja</option>
                      </select>
                    </div>
                  </div>

                  {/* Participants */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Participantes
                    </label>
                    <input
                      type="text"
                      value={Array.isArray(formData.participants) ? formData.participants.join(', ') : formData.participants}
                      onChange={(e) => handleFormChange('participants', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Separar nombres con comas: Ana García, Carlos López"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags/Etiquetas
                    </label>
                    <input
                      type="text"
                      value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags}
                      onChange={(e) => handleFormChange('tags', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Separar tags con comas: product-market-fit, user-feedback"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción/Contexto
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                      placeholder="Describe el contexto de la retrospectiva..."
                    />
                  </div>

                  {/* Key Learnings */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Aprendizajes Clave
                      </label>
                      <button
                        type="button"
                        onClick={addKeyLearning}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar Aprendizaje
                      </button>
                    </div>

                    <div className="space-y-4">
                      {formData.keyLearnings.map((learning, index) => (
                        <div key={index} className="border border-gray-100 rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-700">Aprendizaje {index + 1}</h4>
                            <button
                              type="button"
                              onClick={() => removeKeyLearning(index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Categoría
                              </label>
                              <select
                                value={learning.category}
                                onChange={(e) => updateKeyLearning(index, 'category', e.target.value)}
                                className="w-full px-2 py-1.5 text-sm bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400"
                              >
                                <option value="producto">Producto</option>
                                <option value="equipo">Equipo</option>
                                <option value="negocio">Negocio</option>
                                <option value="general">General</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-600 mb-1">
                                Impacto
                              </label>
                              <select
                                value={learning.impact}
                                onChange={(e) => updateKeyLearning(index, 'impact', e.target.value)}
                                className="w-full px-2 py-1.5 text-sm bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400"
                              >
                                <option value="high">Alto</option>
                                <option value="medium">Medio</option>
                                <option value="low">Bajo</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Insight/Aprendizaje
                            </label>
                            <textarea
                              value={learning.insight}
                              onChange={(e) => updateKeyLearning(index, 'insight', e.target.value)}
                              rows={2}
                              className="w-full px-2 py-1.5 text-sm bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400"
                              placeholder="¿Qué aprendimos?"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Acción Tomada
                            </label>
                            <textarea
                              value={learning.actionTaken}
                              onChange={(e) => updateKeyLearning(index, 'actionTaken', e.target.value)}
                              rows={2}
                              className="w-full px-2 py-1.5 text-sm bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400"
                              placeholder="¿Qué hicimos al respecto?"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Evidencia/Resultado
                            </label>
                            <input
                              type="text"
                              value={learning.evidence}
                              onChange={(e) => updateKeyLearning(index, 'evidence', e.target.value)}
                              className="w-full px-2 py-1.5 text-sm bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-400"
                              placeholder="¿Cuál fue el resultado?"
                            />
                          </div>
                        </div>
                      ))}

                      {formData.keyLearnings.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p>No hay aprendizajes agregados. Haz clic en "Agregar Aprendizaje" para comenzar.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-lg">
                  <button 
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setShowEditModal(false);
                      resetForm();
                      setEditingLearning(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg border border-gray-200 transition-all duration-200"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-all duration-200 flex items-center gap-2"
                  >
                    {editingLearning ? (
                      <>
                        <Edit className="w-4 h-4" />
                        Actualizar
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Crear
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}