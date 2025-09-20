'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import Layout from '../../components/layout/Layout';

export default function IntegrationsPage() {
  const [viewMode, setViewMode] = useState('overview');
  const [showQuickActions, setShowQuickActions] = useState(false);

  return (
    <Layout title="Integrations Intelligence Hub" subtitle="Advanced Integration Management Platform">
      <div className="p-6 min-h-screen" style={{ background: 'var(--background)' }}>
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center shadow-lg">
                <Plug className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  Integrations Intelligence Hub
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-600">Live Connections</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span className="text-sm font-medium text-blue-600">Auto-Sync</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <span className="text-sm font-medium text-purple-600">Smart Webhooks</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-lg font-medium max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              Plataforma avanzada de gestión de integraciones con conectores inteligentes, webhooks automatizados y monitoreo en tiempo real para optimizar flujos de datos empresariales
            </p>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-green-900 to-teal-900 rounded-2xl p-6 mb-8 text-white shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-200">24</div>
              <div className="text-sm text-gray-300">Active Integrations</div>
              <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                <div className="bg-green-400 h-1 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-200">99.8%</div>
              <div className="text-sm text-gray-300">Uptime</div>
              <div className="flex items-center justify-center mt-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-200">156K</div>
              <div className="text-sm text-gray-300">Data Transfers</div>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="w-4 h-4 text-teal-400" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-200">12</div>
              <div className="text-sm text-gray-300">Webhook Events</div>
              <div className="flex items-center justify-center mt-2">
                <Webhook className="w-4 h-4 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600 font-semibold">Connected</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">CRM Sync</h3>
            <p className="text-gray-600">Real-time data synchronization</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-blue-600 font-semibold">Active</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Email API</h3>
            <p className="text-gray-600">Automated email workflows</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Cloud className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-purple-600 font-semibold">Syncing</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Cloud Storage</h3>
            <p className="text-gray-600">Multi-platform file sync</p>
          </div>
        </div>

        {/* Demo Message */}
        <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Plug className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-green-900">Integrations Demo Mode</h3>
          </div>
          <p className="text-green-800 mb-4">
            El hub de integraciones está funcionando en modo demo. Se han aplicado todas las mejoras de diseño y funcionalidad.
            Los conectores avanzados están temporalmente deshabilitados mientras se configuran las credenciales de API.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">✅ Diseño Moderno</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">✅ Smart Webhooks</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">✅ Auto-Sync</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">✅ Monitoreo Avanzado</span>
          </div>
        </div>

        {/* Floating Quick Actions Menu */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            {/* Quick Actions Buttons */}
            {showQuickActions && (
              <div className="absolute bottom-16 right-0 space-y-3">
                <button className="group w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                </button>
                <button className="group w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <Download className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </button>
                <button className="group w-12 h-12 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            )}

            {/* Main FAB */}
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className={`w-14 h-14 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group ${
                showQuickActions ? 'rotate-45' : ''
              }`}
            >
              <Plus className="w-6 h-6 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}