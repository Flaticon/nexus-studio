'use client';

import { useState, useEffect } from 'react';
import {
  Heart,
  TrendingUp,
  Activity,
  BarChart3,
  Star,
  AlertTriangle,
  CheckCircle,
  Brain,
  Award,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  Download,
  Coffee,
  UserCheck,
  Send,
  Bot,
  User
} from 'lucide-react';
import Layout from '../../components/layout/Layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface InsightType {
  id: number;
  type: 'success' | 'warning' | 'opportunity';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  recommendation: string;
}

interface TopPerformer {
  name: string;
  department: string;
  score: number;
  growth: string;
  role: string;
}

interface Department {
  name: string;
  employees: number;
  engagement: number;
  satisfaction: number;
  avgTenure: number;
  turnover: number;
}

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'maya';
  timestamp: Date;
}

export default function MayaAIPeoplePage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState<any>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: 1,
      text: '¡Hola! Soy Maya, tu asistente de People Analytics. ¿En qué puedo ayudarte hoy?',
      sender: 'maya',
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    setTimeout(() => {
      setData(getMockPeopleData());
      setIsLoading(false);
    }, 1500);
  }, [timeRange, selectedDepartment]);

  const getMockPeopleData = () => ({
    engagement: [
      { month: 'Ene', engagement: 78, satisfaction: 82, retention: 94, wellness: 76 },
      { month: 'Feb', engagement: 82, satisfaction: 85, retention: 96, wellness: 78 },
      { month: 'Mar', engagement: 86, satisfaction: 88, retention: 95, wellness: 82 },
      { month: 'Abr', engagement: 83, satisfaction: 86, retention: 93, wellness: 79 },
      { month: 'May', engagement: 89, satisfaction: 91, retention: 97, wellness: 85 },
      { month: 'Jun', engagement: 92, satisfaction: 94, retention: 98, wellness: 88 }
    ],
    departments: [
      { name: 'Tecnología', employees: 45, engagement: 92, satisfaction: 89, avgTenure: 2.3, turnover: 5 },
      { name: 'Producto', employees: 28, engagement: 88, satisfaction: 91, avgTenure: 1.8, turnover: 8 },
      { name: 'Marketing', employees: 22, engagement: 85, satisfaction: 87, avgTenure: 1.5, turnover: 12 },
      { name: 'Ventas', employees: 35, engagement: 79, satisfaction: 82, avgTenure: 2.1, turnover: 15 },
      { name: 'RRHH', employees: 15, engagement: 94, satisfaction: 96, avgTenure: 3.2, turnover: 3 }
    ],
    insights: [
      {
        id: 1,
        type: 'success',
        title: 'Engagement en Alza',
        description: 'El engagement del equipo de Tecnología aumentó 15% este mes',
        impact: 'high',
        confidence: 94,
        recommendation: 'Aplicar las mejores prácticas de Tech a otros departamentos'
      },
      {
        id: 2,
        type: 'warning',
        title: 'Riesgo de Rotación',
        description: '3 empleados de Marketing muestran señales de descontento',
        impact: 'medium',
        confidence: 87,
        recommendation: 'Programar reuniones individuales inmediatamente'
      },
      {
        id: 3,
        type: 'opportunity',
        title: 'Oportunidad de Crecimiento',
        description: '12 empleados están listos para promoción según su rendimiento',
        impact: 'high',
        confidence: 91,
        recommendation: 'Iniciar proceso de evaluación para promociones'
      }
    ],
    wellnessMetrics: {
      stressLevel: 32,
      workLifeBalance: 78,
      burnoutRisk: 15,
      happinessIndex: 8.4,
      teamCollaboration: 89,
      learningGrowth: 85
    },
    topPerformers: [
      { name: 'Ana García', department: 'Tecnología', score: 96, growth: '+12%', role: 'Senior Developer' },
      { name: 'Carlos López', department: 'Producto', score: 94, growth: '+8%', role: 'Product Manager' },
      { name: 'María Torres', department: 'Marketing', score: 91, growth: '+15%', role: 'Growth Marketing' },
      { name: 'David Chen', department: 'Tecnología', score: 89, growth: '+10%', role: 'Tech Lead' },
      { name: 'Sofia Ruiz', department: 'RRHH', score: 88, growth: '+7%', role: 'HR Business Partner' }
    ]
  });

  const sendMessage = () => {
    if (!chatMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: chatHistory.length + 1,
      text: chatMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setChatHistory([...chatHistory, userMessage]);
    setChatMessage('');

    // Simulate Maya AI response
    setTimeout(() => {
      const mayaResponse = generateMayaResponse(chatMessage);
      const mayaMessage: ChatMessage = {
        id: chatHistory.length + 2,
        text: mayaResponse,
        sender: 'maya',
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, mayaMessage]);
    }, 1000);
  };

  const generateMayaResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('engagement') || lowerInput.includes('compromiso')) {
      return '📊 El engagement actual está en 87%. He notado que el equipo de Tecnología muestra el mejor desempeño con 92%. ¿Te gustaría que analice qué factores están impulsando este resultado?';
    } else if (lowerInput.includes('estrés') || lowerInput.includes('stress')) {
      return '😌 El nivel de estrés promedio es del 23%, lo cual está dentro del rango saludable. Sin embargo, he identificado 3 empleados en Marketing que muestran signos de burnout. ¿Quieres que te prepare un plan de acción?';
    } else if (lowerInput.includes('retención') || lowerInput.includes('retention')) {
      return '✨ ¡Excelente noticia! La retención está en 96%. Los factores clave son: flexibilidad laboral (89%), crecimiento profesional (85%) y cultura empresarial (91%). ¿Necesitas estrategias para mantener estos niveles?';
    } else if (lowerInput.includes('top') || lowerInput.includes('mejor')) {
      return '🌟 Los top performers actuales son Ana García (96%) y Carlos López (94%). Ambos han mostrado crecimiento constante. ¿Te interesa conocer sus patrones de trabajo para replicarlos?';
    } else {
      return '🤖 Entiendo tu consulta sobre people analytics. Puedo ayudarte con métricas de engagement, análisis de estrés, retención, identificación de top performers, y recomendaciones personalizadas. ¿Sobre qué tema específico te gustaría profundizar?';
    }
  };

  const getInsightIcon = (type: 'success' | 'warning' | 'opportunity') => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default: return <Brain className="w-5 h-5 text-gray-600" />;
    }
  };

  const getInsightColor = (type: 'success' | 'warning' | 'opportunity') => {
    switch (type) {
      case 'opportunity': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'success': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Vista General', icon: BarChart3 },
    { id: 'engagement', label: 'Engagement', icon: Heart },
    { id: 'wellness', label: 'Bienestar', icon: Coffee },
    { id: 'performance', label: 'Rendimiento', icon: Award }
  ];

  if (isLoading) {
    return (
      <Layout title="Maya AI People Analytics" subtitle="Cargando inteligencia de personas...">
        <div className="p-6 min-h-screen bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Maya AI People Analytics" subtitle="Inteligencia Artificial para People Analytics">
      <div className="p-6 min-h-screen" style={{ background: 'var(--background)' }}>

        {/* Header with Maya AI Branding */}
        <div className="mb-8">
          <div className="flex flex-col gap-6 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors" style={{ background: 'var(--text-primary)' }}>
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-semibold tracking-tight mb-3 transition-colors" style={{ color: 'var(--text-primary)' }}>
                  Maya AI People Analytics
                </h1>
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-600">Análisis en Tiempo Real</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span className="text-sm font-medium text-purple-600">IA Predictiva</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <span className="text-sm font-medium text-pink-600">Recomendaciones Inteligentes</span>
                  </div>
                </div>
                <p className="text-lg transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  Plataforma de inteligencia artificial para optimizar la experiencia y rendimiento de tu equipo
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
                <option value="1y">Último año</option>
              </select>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="all">Todos los departamentos</option>
                <option value="tech">Tecnología</option>
                <option value="product">Producto</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Ventas</option>
                <option value="hr">RRHH</option>
              </select>
              <button className="px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                style={{
                  background: 'var(--text-primary)',
                  color: 'var(--surface)'
                }}
              >
                <Download className="w-4 h-4 inline-block mr-2" />
                Exportar Reporte
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-6 rounded-3xl border transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <Heart className="w-8 h-8 text-pink-500" />
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  <ArrowUp className="w-3 h-3" />
                  <span className="text-xs font-medium">+5.2%</span>
                </div>
              </div>
              <div className="text-3xl font-bold mb-1 transition-colors" style={{ color: 'var(--text-primary)' }}>87%</div>
              <div className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>Engagement Promedio</div>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>

            <div className="p-6 rounded-3xl border transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <Star className="w-8 h-8 text-yellow-500" />
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  <ArrowUp className="w-3 h-3" />
                  <span className="text-xs font-medium">+3.1%</span>
                </div>
              </div>
              <div className="text-3xl font-bold mb-1 transition-colors" style={{ color: 'var(--text-primary)' }}>8.7</div>
              <div className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>Índice de Satisfacción</div>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>

            <div className="p-6 rounded-3xl border transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <UserCheck className="w-8 h-8 text-blue-500" />
                <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  <ArrowUp className="w-3 h-3" />
                  <span className="text-xs font-medium">+2.3%</span>
                </div>
              </div>
              <div className="text-3xl font-bold mb-1 transition-colors" style={{ color: 'var(--text-primary)' }}>96%</div>
              <div className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>Tasa de Retención</div>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>

            <div className="p-6 rounded-3xl border transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <Coffee className="w-8 h-8 text-green-500" />
                <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full">
                  <ArrowDown className="w-3 h-3" />
                  <span className="text-xs font-medium">-8.5%</span>
                </div>
              </div>
              <div className="text-3xl font-bold mb-1 transition-colors" style={{ color: 'var(--text-primary)' }}>23%</div>
              <div className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>Nivel de Estrés</div>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full" style={{ width: '23%' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* AI Insights Panel */}
        {data && (
          <div className="mb-8 rounded-3xl p-6 border transition-all duration-300"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center transition-colors"
                style={{ background: 'var(--text-primary)' }}
              >
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold transition-colors" style={{ color: 'var(--text-primary)' }}>Insights Inteligentes de Maya</h3>
                <p className="text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}>Análisis predictivo y recomendaciones personalizadas</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.insights.map((insight: InsightType) => (
                <div key={insight.id} className={`p-4 rounded-2xl border ${getInsightColor(insight.type)} hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">{insight.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{insight.description}</p>
                      <div className="bg-white bg-opacity-50 p-2 rounded-lg mb-2">
                        <p className="text-xs text-gray-700 font-medium">💡 Recomendación:</p>
                        <p className="text-xs text-gray-600">{insight.recommendation}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          insight.impact === 'high' ? 'bg-red-100 text-red-700' :
                          insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {insight.impact} impacto
                        </span>
                        <span className="text-xs text-gray-500">{insight.confidence}% confianza</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 rounded-3xl p-2 border overflow-x-auto transition-all duration-300"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 whitespace-nowrap transform hover:-translate-y-0.5 ${
                    activeTab === tab.id
                      ? 'text-white shadow-lg'
                      : 'hover:shadow-md'
                  }`}
                  style={activeTab === tab.id
                    ? { background: 'var(--text-primary)', color: 'var(--surface)' }
                    : { color: 'var(--text-secondary)' }
                  }
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'overview' && data && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Chart */}
              <div className="lg:col-span-2 rounded-3xl border p-6 transition-all duration-300"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <h3 className="text-lg font-semibold mb-4 transition-colors" style={{ color: 'var(--text-primary)' }}>Tendencias de Engagement y Satisfacción</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.engagement}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#666" fontSize={12} />
                    <YAxis stroke="#666" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Line type="monotone" dataKey="engagement" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }} />
                    <Line type="monotone" dataKey="satisfaction" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', strokeWidth: 2, r: 4 }} />
                    <Line type="monotone" dataKey="retention" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Side Panel */}
              <div className="space-y-6">
                {/* Top Performers */}
                <div className="rounded-3xl border p-6 transition-all duration-300"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4 transition-colors" style={{ color: 'var(--text-primary)' }}>Top Performers</h3>
                  <div className="space-y-3">
                    {data.topPerformers.slice(0, 5).map((performer: TopPerformer, index: number) => (
                      <div key={performer.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{performer.name}</div>
                          <div className="text-xs text-gray-500">{performer.role} • {performer.department}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">{performer.score}%</div>
                          <div className="text-xs text-green-600">{performer.growth}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Department Overview */}
                <div className="rounded-3xl border p-6 transition-all duration-300"
                  style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4 transition-colors" style={{ color: 'var(--text-primary)' }}>Vista por Departamentos</h3>
                  <div className="space-y-3">
                    {data.departments.map((dept: Department) => (
                      <div key={dept.name} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{dept.name}</span>
                          <span className="text-sm text-gray-500">{dept.employees} empleados</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Eng: {dept.engagement}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                            <span>Sat: {dept.satisfaction}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>Rotación: {dept.turnover}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wellness' && data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-3xl border p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Coffee className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-semibold transition-colors" style={{ color: 'var(--text-primary)' }}>Balance Vida-Trabajo</h3>
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">{data.wellnessMetrics.workLifeBalance}%</div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${data.wellnessMetrics.workLifeBalance}%` }}></div>
                </div>
              </div>

              <div className="rounded-3xl border p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-6 h-6 text-red-500" />
                  <h3 className="text-lg font-semibold transition-colors" style={{ color: 'var(--text-primary)' }}>Nivel de Estrés</h3>
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">{data.wellnessMetrics.stressLevel}%</div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${data.wellnessMetrics.stressLevel}%` }}></div>
                </div>
              </div>

              <div className="rounded-3xl border p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-pink-500" />
                  <h3 className="text-lg font-semibold transition-colors" style={{ color: 'var(--text-primary)' }}>Índice de Felicidad</h3>
                </div>
                <div className="text-3xl font-bold text-pink-600 mb-2">{data.wellnessMetrics.happinessIndex}/10</div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: `${data.wellnessMetrics.happinessIndex * 10}%` }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Maya AI Chatbot */}
        <div className="fixed bottom-6 right-6 z-50">
          {chatOpen && (
            <div className="mb-4 w-96 h-96 rounded-3xl shadow-2xl border flex flex-col transition-all duration-300"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b rounded-t-3xl transition-all duration-300"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--text-primary)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Maya AI</h3>
                    <p className="text-xs text-white opacity-70">People Analytics Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setChatOpen(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-all duration-200"
                >
                  ×
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {chatHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-start gap-2 max-w-[80%]">
                      {message.sender === 'maya' && (
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-2xl text-sm ${
                          message.sender === 'user'
                            ? 'bg-purple-600 text-white rounded-br-none'
                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        {message.text}
                      </div>
                      {message.sender === 'user' && (
                        <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Pregúntale a Maya sobre tu equipo..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!chatMessage.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Chat Toggle Button */}
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="w-14 h-14 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center transform hover:-translate-y-1"
            style={{ background: 'var(--text-primary)' }}
          >
            {chatOpen ? (
              <MessageSquare className="w-6 h-6" />
            ) : (
              <Brain className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
}