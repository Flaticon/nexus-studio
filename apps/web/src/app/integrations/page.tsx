// apps/web/src/app/integrations/page.tsx
"use client";

import { useState } from "react";
import {
  Plug,
  Zap,
  Shield,
  Globe,
  Database,
  Cloud,
  Webhook,
  Key,
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  ExternalLink,
  Code,
  Activity,
  BarChart3,
  Users,
  DollarSign,
  Mail,
  MessageSquare,
  Calendar,
  FileText,
  CreditCard,
  Smartphone,
  Monitor,
  Target,
  TrendingUp,
  Eye,
  EyeOff,
  Copy,
  Edit,
  Trash2,
  PlayCircle,
  StopCircle,
  RotateCcw,
} from "lucide-react";
import Layout from "../../components/layout/Layout";

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  // Integration categories and available integrations
  const integrationData = {
    categories: [
      { id: "all", name: "Todas", count: 28 },
      { id: "analytics", name: "Analytics", count: 6 },
      { id: "payment", name: "Pagos", count: 5 },
      { id: "communication", name: "Comunicación", count: 7 },
      { id: "productivity", name: "Productividad", count: 4 },
      { id: "marketing", name: "Marketing", count: 6 },
    ],

    // Active integrations
    active: [
      {
        id: 1,
        name: "Google Analytics",
        category: "analytics",
        description: "Análisis web y seguimiento de conversiones",
        status: "connected",
        lastSync: "2 min ago",
        icon: "📊",
        color: "bg-green-50 border-green-200",
        usage: {
          requests: 1247,
          limit: 10000,
          period: "monthly",
        },
        config: {
          trackingId: "GA-XXXX-XXXX",
          events: 15,
          goals: 3,
        },
      },
      {
        id: 2,
        name: "Stripe",
        category: "payment",
        description: "Procesamiento de pagos y suscripciones",
        status: "connected",
        lastSync: "5 min ago",
        icon: "💳",
        color: "bg-blue-50 border-blue-200",
        usage: {
          requests: 456,
          limit: 5000,
          period: "monthly",
        },
        config: {
          webhooks: 4,
          products: 8,
          customers: 127,
        },
      },
      {
        id: 3,
        name: "Slack",
        category: "communication",
        description: "Notificaciones y colaboración en equipo",
        status: "connected",
        lastSync: "1 min ago",
        icon: "💬",
        color: "bg-purple-50 border-purple-200",
        usage: {
          requests: 892,
          limit: 3000,
          period: "monthly",
        },
        config: {
          channels: 3,
          webhooks: 2,
          bots: 1,
        },
      },
      {
        id: 4,
        name: "Mailchimp",
        category: "marketing",
        description: "Email marketing y automatización",
        status: "error",
        lastSync: "2 hrs ago",
        icon: "📧",
        color: "bg-red-50 border-red-200",
        usage: {
          requests: 234,
          limit: 2000,
          period: "monthly",
        },
        config: {
          lists: 2,
          campaigns: 5,
          subscribers: 1847,
        },
      },
      {
        id: 5,
        name: "HubSpot CRM",
        category: "productivity",
        description: "Gestión de clientes y pipeline de ventas",
        status: "syncing",
        lastSync: "10 min ago",
        icon: "🏢",
        color: "bg-orange-50 border-orange-200",
        usage: {
          requests: 678,
          limit: 4000,
          period: "monthly",
        },
        config: {
          contacts: 342,
          deals: 28,
          companies: 56,
        },
      },
      {
        id: 6,
        name: "GitHub",
        category: "productivity",
        description: "Repositorios y gestión de código",
        status: "connected",
        lastSync: "30 sec ago",
        icon: "🐙",
        color: "bg-gray-50 border-gray-200",
        usage: {
          requests: 1521,
          limit: 5000,
          period: "hourly",
        },
        config: {
          repositories: 12,
          commits: 847,
          issues: 23,
        },
      },
    ],

    // Available integrations to connect
    available: [
      {
        id: "salesforce",
        name: "Salesforce",
        category: "productivity",
        description: "CRM y automatización de ventas empresarial",
        icon: "☁️",
        popularity: 95,
        pricing: "Freemium",
      },
      {
        id: "zapier",
        name: "Zapier",
        category: "productivity",
        description: "Automatización y conexión entre apps",
        icon: "⚡",
        popularity: 88,
        pricing: "Paid",
      },
      {
        id: "mixpanel",
        name: "Mixpanel",
        category: "analytics",
        description: "Analytics de producto y comportamiento de usuarios",
        icon: "📈",
        popularity: 82,
        pricing: "Freemium",
      },
      {
        id: "twilio",
        name: "Twilio",
        category: "communication",
        description: "SMS, llamadas y comunicaciones programáticas",
        icon: "📱",
        popularity: 79,
        pricing: "Pay-per-use",
      },
      {
        id: "intercom",
        name: "Intercom",
        category: "communication",
        description: "Chat en vivo y soporte al cliente",
        icon: "💬",
        popularity: 85,
        pricing: "Paid",
      },
      {
        id: "shopify",
        name: "Shopify",
        category: "payment",
        description: "E-commerce y gestión de tienda online",
        icon: "🛒",
        popularity: 91,
        pricing: "Subscription",
      },
    ],

    // API usage statistics
    apiStats: {
      totalRequests: 4728,
      successRate: 97.8,
      avgResponseTime: 245,
      errorRate: 2.2,
      dailyTrends: [
        { day: "Lun", requests: 612, errors: 12 },
        { day: "Mar", requests: 789, errors: 18 },
        { day: "Mie", requests: 456, errors: 8 },
        { day: "Jue", requests: 923, errors: 21 },
        { day: "Vie", requests: 1034, errors: 15 },
        { day: "Sab", requests: 567, errors: 9 },
        { day: "Dom", requests: 347, errors: 6 },
      ],
    },

    // Webhooks and automations
    webhooks: [
      {
        id: 1,
        name: "New Payment Received",
        source: "Stripe",
        endpoint: "/api/webhooks/payment",
        status: "active",
        lastTriggered: "3 min ago",
        triggers: 247,
      },
      {
        id: 2,
        name: "User Signup Alert",
        source: "Custom",
        endpoint: "/api/webhooks/signup",
        status: "active",
        lastTriggered: "15 min ago",
        triggers: 89,
      },
      {
        id: 3,
        name: "Critical Error Alert",
        source: "Monitoring",
        endpoint: "/api/webhooks/error",
        status: "paused",
        lastTriggered: "2 hrs ago",
        triggers: 12,
      },
    ],
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "syncing":
        return <RefreshCw className="w-5 h-5 text-orange-600 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "connected":
        return "text-green-600 bg-green-50";
      case "error":
        return "text-red-600 bg-red-50";
      case "syncing":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const filteredIntegrations = integrationData.active.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout
      title="🔌 Integrations Hub"
      subtitle="Gestiona APIs, webhooks y automatizaciones"
    >
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🔌 Integrations Hub
              </h1>
              <p className="mt-2 text-gray-600">
                Conecta herramientas y automatiza procesos del venture studio
              </p>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar Logs
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nueva Integración
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Integraciones Activas
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {integrationData.active.length}
                </p>
              </div>
              <Plug className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  API Requests
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {integrationData.apiStats.totalRequests.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  +12% vs mes anterior
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Success Rate
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {integrationData.apiStats.successRate}%
                </p>
                <p className="text-sm text-green-600 mt-1">
                  +0.3% vs mes anterior
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Response
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {integrationData.apiStats.avgResponseTime}ms
                </p>
                <p className="text-sm text-red-600 mt-1">
                  +15ms vs mes anterior
                </p>
              </div>
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar integraciones..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none transition-all duration-200"
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
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {integrationData.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200"
                  style={{
                    background: selectedCategory === category.id ? 'var(--module-integrations)' : 'var(--surface-secondary)',
                    color: selectedCategory === category.id ? 'white' : 'var(--text-secondary)'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category.id) {
                      e.target.style.background = 'var(--surface-tertiary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category.id) {
                      e.target.style.background = 'var(--surface-secondary)';
                    }
                  }}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex rounded-lg p-1" style={{ background: 'var(--surface-secondary)' }}>
              <button
                onClick={() => setViewMode("grid")}
                className="p-2 rounded transition-all duration-200"
                style={{
                  background: viewMode === 'grid' ? 'var(--surface)' : 'transparent',
                  boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "list" ? "bg-white shadow-sm" : ""
                }`}
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Integrations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Integraciones Activas
          </h2>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredIntegrations.map((integration) => (
                <div
                  key={integration.id}
                  className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow ${integration.color}`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{integration.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {integration.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                      {getStatusIcon(integration.status)}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          Última sincronización:
                        </span>
                        <span className="font-medium">
                          {integration.lastSync}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Uso mensual:</span>
                        <span className="font-medium">
                          {integration.usage.requests.toLocaleString()} /{" "}
                          {integration.usage.limit.toLocaleString()}
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            integration.usage.requests /
                              integration.usage.limit >
                            0.8
                              ? "bg-red-500"
                              : integration.usage.requests /
                                    integration.usage.limit >
                                  0.6
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                          style={{
                            width: `${(integration.usage.requests / integration.usage.limit) * 100}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                          <Settings className="w-4 h-4" />
                          Configurar
                        </button>
                        <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                          <Activity className="w-4 h-4" />
                          Ver Logs
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Integración
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Estado
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Uso
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Última Sync
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIntegrations.map((integration) => (
                      <tr key={integration.id} className="border-t">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{integration.icon}</span>
                            <div>
                              <div className="font-medium text-gray-900">
                                {integration.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {integration.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}
                          >
                            {integration.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm">
                            {integration.usage.requests.toLocaleString()} /{" "}
                            {integration.usage.limit.toLocaleString()}
                            <div className="w-20 bg-gray-200 rounded-full h-1 mt-1">
                              <div
                                className="bg-blue-500 h-1 rounded-full"
                                style={{
                                  width: `${(integration.usage.requests / integration.usage.limit) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {integration.lastSync}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2">
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Settings className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Activity className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Available Integrations */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
            Integraciones Disponibles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {integrationData.available.map((integration) => (
              <div
                key={integration.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{integration.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {integration.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Popularidad:</span>
                      <span className="font-medium">
                        {integration.popularity}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${integration.popularity}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pricing:</span>
                      <span className="font-medium">{integration.pricing}</span>
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Conectar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Webhooks Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Webhooks y Automatizaciones
              </h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Nuevo Webhook
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {integrationData.webhooks.map((webhook) => (
                <div
                  key={webhook.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Webhook className="w-5 h-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {webhook.name}
                          </h4>
                          <div className="text-sm text-gray-600">
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                              {webhook.endpoint}
                            </code>
                            {" • "}
                            <span>Fuente: {webhook.source}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span>
                          Estado:
                          <span
                            className={`ml-1 px-2 py-1 rounded-full text-xs ${
                              webhook.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {webhook.status}
                          </span>
                        </span>
                        <span>Última activación: {webhook.lastTriggered}</span>
                        <span>Triggers: {webhook.triggers}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded">
                        {webhook.status === "active" ? (
                          <StopCircle className="w-4 h-4 text-red-600" />
                        ) : (
                          <PlayCircle className="w-4 h-4 text-green-600" />
                        )}
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
