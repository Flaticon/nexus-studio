"use client";

import React, { useState } from "react";
import {
  X,
  Book,
  Search,
  ChevronRight,
  Home,
  Briefcase,
  DollarSign,
  Target,
  Users,
  BarChart3,
  Settings,
  PlayCircle,
  FileText,
  HelpCircle,
  Lightbulb,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentModule?: string;
}

interface ManualSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  content: ManualContent[];
}

interface ManualContent {
  id: string;
  title: string;
  type: "guide" | "reference" | "tutorial" | "faq";
  content: string;
  steps?: string[];
  tips?: string[];
  related?: string[];
}

export default function UserManualModal({
  isOpen,
  onClose,
  currentModule,
}: UserManualModalProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const manualSections: ManualSection[] = [
    {
      id: "getting-started",
      title: "Primeros Pasos",
      icon: <PlayCircle className="w-5 h-5" />,
      description: "Introducción y configuración inicial",
      content: [
        {
          id: "overview",
          title: "Visión General de la Plataforma",
          type: "guide",
          content: `Nexus Studio es una plataforma integral para la gestión de venture studios. Permite gestionar el portafolio de startups, equipos, finanzas, OKRs y obtener insights analíticos profundos.

La plataforma está diseñada para diferentes tipos de usuarios:
- **Ejecutivos C-Suite**: Dashboard estratégico y métricas de alto nivel
- **Operadores**: Gestión detallada de startups y equipos
- **Team Leads**: Seguimiento de proyectos específicos
- **Analistas**: Reportes avanzados y análisis de datos`,
          steps: [
            "Explora el dashboard principal para obtener una visión general",
            "Revisa el sidebar para navegar entre módulos",
            "Usa la barra de búsqueda para encontrar información rápidamente",
            "Configura las notificaciones según tus necesidades"
          ],
          tips: [
            "El dashboard se actualiza en tiempo real",
            "Puedes personalizar las vistas según tu rol",
            "Usa atajos de teclado para navegación rápida"
          ]
        },
        {
          id: "navigation",
          title: "Navegación y Interface",
          type: "guide",
          content: `La plataforma utiliza una interfaz intuitiva con navegación lateral y múltiples modos de vista para cada módulo.`,
          steps: [
            "Usa el sidebar izquierdo para navegar entre módulos",
            "Cambia entre vistas (grid, lista, Kanban) según tus preferencias",
            "Utiliza los filtros para encontrar información específica",
            "Configura alertas y notificaciones"
          ]
        }
      ]
    },
    {
      id: "dashboard",
      title: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      description: "Panel de control y métricas principales",
      content: [
        {
          id: "dashboard-overview",
          title: "Interpretación del Dashboard",
          type: "guide",
          content: `El dashboard proporciona una vista consolidada de todas las métricas clave del venture studio.`,
          steps: [
            "Revisa el resumen ejecutivo en la parte superior",
            "Analiza las métricas de portafolio en tiempo real",
            "Monitorea las alertas críticas",
            "Usa los gráficos interactivos para análisis profundo"
          ],
          tips: [
            "Las alertas rojas requieren atención inmediata",
            "Los gráficos son interactivos - haz clic para más detalles",
            "Puedes exportar reportes desde cualquier gráfico"
          ]
        },
        {
          id: "alerts-management",
          title: "Gestión de Alertas",
          type: "tutorial",
          content: `Sistema de alertas inteligente que notifica sobre eventos críticos en tu portafolio.`,
          steps: [
            "Revisa el panel de alertas en el dashboard",
            "Haz clic en alertas para ver detalles",
            "Configura umbrales personalizados",
            "Marca alertas como resueltas"
          ]
        }
      ]
    },
    {
      id: "portfolio",
      title: "Gestión de Portfolio",
      icon: <Briefcase className="w-5 h-5" />,
      description: "Administración de startups y pipeline",
      content: [
        {
          id: "portfolio-management",
          title: "Administración de Startups",
          type: "guide",
          content: `Sistema completo para gestionar el ciclo de vida de las startups desde idea hasta salida.`,
          steps: [
            "Agrega nuevas startups con el botón '+' ",
            "Usa la vista Kanban para gestionar etapas",
            "Actualiza el estado y métricas regularmente",
            "Documenta hitos y decisiones importantes"
          ],
          tips: [
            "Arrastra y suelta en Kanban para cambiar etapas",
            "Usa etiquetas para categorizar startups",
            "Programa revisiones periódicas"
          ]
        },
        {
          id: "pipeline-tracking",
          title: "Seguimiento del Pipeline",
          type: "tutorial",
          content: `Monitoreo avanzado del pipeline de innovación con análisis predictivo.`,
          steps: [
            "Configura criterios de avance entre etapas",
            "Define métricas clave para cada etapa",
            "Usa analytics para identificar cuellos de botella",
            "Genera reportes de pipeline regulares"
          ]
        }
      ]
    },
    {
      id: "finance",
      title: "Finanzas",
      icon: <DollarSign className="w-5 h-5" />,
      description: "Gestión financiera y análisis de runway",
      content: [
        {
          id: "financial-tracking",
          title: "Seguimiento Financiero",
          type: "guide",
          content: `Sistema completo de gestión financiera con análisis de burn rate y runway.`,
          steps: [
            "Registra ingresos y gastos por startup",
            "Monitorea el burn rate mensual",
            "Calcula runway automáticamente",
            "Configura alertas de cash flow"
          ],
          tips: [
            "Actualiza datos financieros semanalmente",
            "Usa categorías consistentes para gastos",
            "Programa revisiones financieras mensuales"
          ]
        },
        {
          id: "runway-analysis",
          title: "Análisis de Runway",
          type: "reference",
          content: `El runway indica cuánto tiempo puede operar una startup con el capital disponible.

**Fórmula**: Runway = Capital Disponible / Burn Rate Mensual

**Interpretación de Colores**:
- Verde (>12 meses): Situación saludable
- Amarillo (6-12 meses): Requiere atención
- Rojo (<6 meses): Crítico - buscar financiamiento`,
        }
      ]
    },
    {
      id: "okrs",
      title: "OKRs",
      icon: <Target className="w-5 h-5" />,
      description: "Objetivos y resultados clave",
      content: [
        {
          id: "okrs-setup",
          title: "Configuración de OKRs",
          type: "tutorial",
          content: `Sistema de OKRs (Objectives and Key Results) para alinear objetivos estratégicos.`,
          steps: [
            "Define objetivos claros y medibles",
            "Establece 3-5 Key Results por objetivo",
            "Asigna responsables y colaboradores",
            "Configura revisiones periódicas"
          ],
          tips: [
            "Los objetivos deben ser aspiracionales",
            "Los KRs deben ser específicos y medibles",
            "Revisa progreso semanalmente"
          ]
        },
        {
          id: "okrs-tracking",
          title: "Seguimiento de Progreso",
          type: "guide",
          content: `Monitoreo continuo del avance hacia los objetivos estratégicos.`,
          steps: [
            "Actualiza progreso de KRs regularmente",
            "Usa las vistas por equipos para coordinación",
            "Analiza tendencias en la vista de progreso",
            "Documenta blockers y dependencies"
          ]
        }
      ]
    },
    {
      id: "talent",
      title: "Gestión de Talento",
      icon: <Users className="w-5 h-5" />,
      description: "Administración de equipos y skill matching",
      content: [
        {
          id: "team-management",
          title: "Administración de Equipos",
          type: "guide",
          content: `Sistema completo para gestionar capital humano, incluyendo skill matching y asignaciones.`,
          steps: [
            "Registra perfiles completos de colaboradores",
            "Documenta skills y niveles de experiencia",
            "Usa skill matching para asignaciones óptimas",
            "Monitorea carga de trabajo y disponibilidad"
          ],
          tips: [
            "Actualiza skills regularmente",
            "Balancea cargas de trabajo",
            "Planifica rotaciones estratégicas"
          ]
        },
        {
          id: "skill-matching",
          title: "Skill Matching y Asignaciones",
          type: "tutorial",
          content: `Algoritmo inteligente para asignar el talento más adecuado a cada iniciativa.`,
          steps: [
            "Activa el modo Skill Matching",
            "Selecciona la iniciativa objetivo",
            "Revisa candidatos recomendados",
            "Usa el modal de asignación para confirmar"
          ],
          tips: [
            "Considera disponibilidad además de skills",
            "Evalúa el fit cultural del equipo",
            "Planifica desarrollo de skills faltantes"
          ]
        }
      ]
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      description: "Reportes avanzados y insights",
      content: [
        {
          id: "analytics-overview",
          title: "Panel de Analytics",
          type: "guide",
          content: `Sistema avanzado de analytics para obtener insights accionables del venture studio.`,
          steps: [
            "Explora métricas por dimensión temporal",
            "Usa filtros para segmentar análisis",
            "Genera reportes personalizados",
            "Exporta datos para análisis externos"
          ]
        }
      ]
    }
  ];

  const filteredSections = manualSections.filter(section =>
    searchQuery === "" ||
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.some(content =>
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const currentSection = selectedSection ? manualSections.find(s => s.id === selectedSection) : null;
  const currentContent = selectedContent && currentSection ? 
    currentSection.content.find(c => c.id === selectedContent) : null;

  const renderMainView = () => (
    <>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Book className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Manual de Usuario</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar en el manual..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSections.map((section) => (
            <div
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {section.title}
                    </h3>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {section.content.length} {section.content.length === 1 ? 'guía' : 'guías'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Help */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">¿Necesitas ayuda adicional?</h3>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            Si no encuentras lo que buscas, puedes contactar al equipo de soporte.
          </p>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
            Contactar Soporte
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </>
  );

  const renderSectionView = () => (
    <>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedSection(null);
                setSelectedContent(null);
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              {currentSection?.icon}
              <h2 className="text-xl font-bold text-gray-900">{currentSection?.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-600">{currentSection?.description}</p>
      </div>

      {/* Content List */}
      <div className="p-6">
        <div className="space-y-3">
          {currentSection?.content.map((content) => (
            <div
              key={content.id}
              onClick={() => setSelectedContent(content.id)}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-gray-100 rounded text-gray-600">
                    {content.type === 'guide' && <Book className="w-4 h-4" />}
                    {content.type === 'tutorial' && <PlayCircle className="w-4 h-4" />}
                    {content.type === 'reference' && <FileText className="w-4 h-4" />}
                    {content.type === 'faq' && <HelpCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                      {content.title}
                    </h3>
                    <span className="text-xs text-gray-500 capitalize">{content.type}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderContentView = () => (
    <>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedContent(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <span>{currentSection?.title}</span>
                <ChevronRight className="w-3 h-3" />
                <span className="capitalize">{currentContent?.type}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{currentContent?.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        <div className="prose max-w-none">
          <div className="whitespace-pre-line text-gray-700 mb-6">
            {currentContent?.content}
          </div>

          {/* Steps */}
          {currentContent?.steps && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Pasos a seguir:</h3>
              <ol className="space-y-2">
                {currentContent.steps.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Tips */}
          {currentContent?.tips && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold text-yellow-900">Consejos útiles:</h3>
              </div>
              <ul className="space-y-1">
                {currentContent.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-yellow-800 flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {selectedContent ? renderContentView() : 
         selectedSection ? renderSectionView() : 
         renderMainView()}
      </div>
    </div>
  );
}