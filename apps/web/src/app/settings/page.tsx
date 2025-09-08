'use client';

import { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Zap,
  Globe,
  Mail,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Info,
  Moon,
  Sun,
  Monitor,
  Languages,
  Clock,
  MapPin,
  Building,
  Users,
  CreditCard,
  Key,
  FileText,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Toggle,
  Sliders,
  Volume2,
  VolumeX
} from 'lucide-react';
import Layout from '../../components/layout/Layout';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    desktop: true
  });
  const [theme, setTheme] = useState('system');
  const [language, setLanguage] = useState('es');
  const [timezone, setTimezone] = useState('America/Mexico_City');
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    activityTracking: false,
    dataAnalytics: true,
    thirdPartySharing: false
  });
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginNotifications: true,
    deviceManagement: true
  });

  const settingsTabs = [
    {
      id: 'profile',
      label: 'Perfil',
      icon: User,
      description: 'Información personal y preferencias básicas'
    },
    {
      id: 'notifications',
      label: 'Notificaciones',
      icon: Bell,
      description: 'Configurar alertas y comunicaciones'
    },
    {
      id: 'appearance',
      label: 'Apariencia',
      icon: Palette,
      description: 'Tema, idioma y personalización visual'
    },
    {
      id: 'security',
      label: 'Seguridad',
      icon: Shield,
      description: 'Contraseña, 2FA y configuraciones de seguridad'
    },
    {
      id: 'privacy',
      label: 'Privacidad',
      icon: Eye,
      description: 'Control de datos y visibilidad'
    },
    {
      id: 'integrations',
      label: 'Integraciones',
      icon: Zap,
      description: 'APIs, webhooks y conexiones externas'
    },
    {
      id: 'data',
      label: 'Datos',
      icon: Database,
      description: 'Importar, exportar y gestión de datos'
    },
    {
      id: 'billing',
      label: 'Facturación',
      icon: CreditCard,
      description: 'Suscripciones y métodos de pago'
    }
  ];

  const handleSave = (section) => {
    console.log(`Saving ${section} settings`);
    // Future: Send to backend API
  };

  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handlePrivacyToggle = (setting) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSecurityToggle = (setting) => {
    setSecurity(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const exportData = () => {
    console.log('Exporting user data...');
    // Future: Generate and download data export
  };

  const deleteAccount = () => {
    if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      console.log('Deleting account...');
      // Future: Delete account process
    }
  };

  return (
    <Layout
      title="⚙️ Configuración"
      subtitle="Personaliza tu experiencia en Nexus Studio"
    >
      <div className="p-6 min-h-screen" style={{ background: 'var(--background)' }}>
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                ⚙️ Configuración
              </h1>
              <p className="mt-2 text-gray-600">
                Personaliza tu experiencia y gestiona tu cuenta
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {settingsTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 p-4 text-left transition-all duration-200 border-b border-gray-50 last:border-b-0 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-r-blue-600'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="flex-1">
                      <div className="font-medium">{tab.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{tab.description}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${
                      activeTab === tab.id ? 'rotate-90' : ''
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-6 h-6 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Información de Perfil</h2>
                      <p className="text-sm text-gray-600">Actualiza tu información personal y preferencias</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Profile Photo */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        JD
                      </div>
                      <div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                          Cambiar Foto
                        </button>
                        <p className="text-xs text-gray-500 mt-1">JPG, GIF o PNG. Máximo 1MB.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          defaultValue="John Doe"
                          className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="john.doe@nexusstudio.com"
                          className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rol
                        </label>
                        <select className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                          <option>Venture Partner</option>
                          <option>Investment Analyst</option>
                          <option>Portfolio Manager</option>
                          <option>Operations Lead</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ubicación
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            defaultValue="Ciudad de México, México"
                            className="w-full pl-10 pr-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="Venture Partner con 10+ años de experiencia en startups de tecnología y fintech en Latinoamérica."
                        className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        placeholder="Cuéntanos sobre ti..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleSave('profile')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all duration-200"
                      >
                        <Save className="w-4 h-4" />
                        Guardar Cambios
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Bell className="w-6 h-6 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Notificaciones</h2>
                      <p className="text-sm text-gray-600">Configura cómo y cuándo recibir alertas</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Canales de Notificación</h3>
                      
                      <div className="space-y-4">
                        {[
                          { key: 'email', icon: Mail, label: 'Email', description: 'Recibe notificaciones por correo electrónico' },
                          { key: 'push', icon: Bell, label: 'Push Notifications', description: 'Notificaciones push del navegador' },
                          { key: 'sms', icon: Smartphone, label: 'SMS', description: 'Mensajes de texto para alertas importantes' },
                          { key: 'desktop', icon: Monitor, label: 'Desktop', description: 'Notificaciones del sistema operativo' }
                        ].map((channel) => {
                          const Icon = channel.icon;
                          return (
                            <div key={channel.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-gray-600" />
                                <div>
                                  <div className="font-medium text-gray-900">{channel.label}</div>
                                  <div className="text-sm text-gray-600">{channel.description}</div>
                                </div>
                              </div>
                              <button
                                onClick={() => handleNotificationToggle(channel.key)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                                  notifications[channel.key] ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                              >
                                <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                                  notifications[channel.key] ? 'translate-x-5' : 'translate-x-0'
                                }`} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900">Tipos de Notificación</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          'Nuevos comentarios en portafolio',
                          'Actualizaciones de OKRs',
                          'Recordatorios de reuniones',
                          'Cambios en startups',
                          'Alertas de métricas',
                          'Reportes semanales',
                          'Actividad del equipo',
                          'Notificaciones de sistema'
                        ].map((type, index) => (
                          <label key={index} className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              defaultChecked={index < 4}
                              className="rounded border border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-blue-500/20 text-blue-600 transition-all duration-200"
                            />
                            <span className="text-sm text-gray-700">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleSave('notifications')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all duration-200"
                      >
                        <Save className="w-4 h-4" />
                        Guardar Configuración
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Palette className="w-6 h-6 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Apariencia</h2>
                      <p className="text-sm text-gray-600">Personaliza el tema, idioma y configuración visual</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* Theme Selection */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Tema</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { id: 'light', label: 'Claro', icon: Sun, preview: 'bg-white border-gray-200' },
                          { id: 'dark', label: 'Oscuro', icon: Moon, preview: 'bg-gray-900 border-gray-700' },
                          { id: 'system', label: 'Sistema', icon: Monitor, preview: 'bg-gradient-to-r from-white to-gray-900' }
                        ].map((themeOption) => {
                          const Icon = themeOption.icon;
                          return (
                            <button
                              key={themeOption.id}
                              onClick={() => setTheme(themeOption.id)}
                              className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                                theme === themeOption.id
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className={`w-full h-16 rounded-md mb-3 ${themeOption.preview}`}></div>
                              <div className="flex items-center justify-center gap-2">
                                <Icon className="w-4 h-4" />
                                <span className="font-medium">{themeOption.label}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Language & Region */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Languages className="w-4 h-4 inline mr-2" />
                          Idioma
                        </label>
                        <select 
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        >
                          <option value="es">Español</option>
                          <option value="en">English</option>
                          <option value="pt">Português</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Zona Horaria
                        </label>
                        <select 
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                        >
                          <option value="America/Mexico_City">México (GMT-6)</option>
                          <option value="America/New_York">New York (GMT-5)</option>
                          <option value="America/Los_Angeles">Los Angeles (GMT-8)</option>
                          <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleSave('appearance')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all duration-200"
                      >
                        <Save className="w-4 h-4" />
                        Aplicar Cambios
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Seguridad</h2>
                      <p className="text-sm text-gray-600">Protege tu cuenta y datos personales</p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {/* Password Change */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Cambiar Contraseña</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña Actual
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              className="w-full px-3 py-2 pr-10 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nueva Contraseña
                          </label>
                          <input
                            type="password"
                            className="w-full px-3 py-2 bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          />
                        </div>
                      </div>
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        Actualizar Contraseña
                      </button>
                    </div>

                    {/* Security Options */}
                    <div className="space-y-4">
                      {[
                        { key: 'twoFactorAuth', label: 'Autenticación de Dos Factores', description: 'Agrega una capa extra de seguridad a tu cuenta', icon: Lock },
                        { key: 'loginNotifications', label: 'Notificaciones de Inicio de Sesión', description: 'Recibe alertas cuando alguien acceda a tu cuenta', icon: Bell },
                        { key: 'deviceManagement', label: 'Gestión de Dispositivos', description: 'Controla qué dispositivos tienen acceso a tu cuenta', icon: Smartphone }
                      ].map((option) => {
                        const Icon = option.icon;
                        return (
                          <div key={option.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5 text-gray-600" />
                              <div>
                                <div className="font-medium text-gray-900">{option.label}</div>
                                <div className="text-sm text-gray-600">{option.description}</div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleSecurityToggle(option.key)}
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                                security[option.key] ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                            >
                              <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                                security[option.key] ? 'translate-x-5' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleSave('security')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all duration-200"
                      >
                        <Save className="w-4 h-4" />
                        Guardar Configuración
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Eye className="w-6 h-6 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Privacidad</h2>
                      <p className="text-sm text-gray-600">Controla la visibilidad y el uso de tus datos</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      { key: 'profileVisible', label: 'Perfil Público', description: 'Otros usuarios pueden ver tu perfil y actividad', icon: Users },
                      { key: 'activityTracking', label: 'Seguimiento de Actividad', description: 'Permitir análisis de uso para mejorar la experiencia', icon: Activity },
                      { key: 'dataAnalytics', label: 'Analytics de Datos', description: 'Usar tus datos para generar insights y reportes', icon: BarChart3 },
                      { key: 'thirdPartySharing', label: 'Compartir con Terceros', description: 'Permitir integración con servicios externos', icon: ExternalLink }
                    ].map((option) => {
                      const Icon = option.icon;
                      return (
                        <div key={option.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-gray-600" />
                            <div>
                              <div className="font-medium text-gray-900">{option.label}</div>
                              <div className="text-sm text-gray-600">{option.description}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => handlePrivacyToggle(option.key)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
                              privacy[option.key] ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                              privacy[option.key] ? 'translate-x-5' : 'translate-x-0'
                            }`} />
                          </button>
                        </div>
                      );
                    })}

                    <div className="flex justify-end">
                      <button 
                        onClick={() => handleSave('privacy')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-all duration-200"
                      >
                        <Save className="w-4 h-4" />
                        Guardar Configuración
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Integrations Settings */}
              {activeTab === 'integrations' && (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="w-6 h-6 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Integraciones</h2>
                      <p className="text-sm text-gray-600">Conecta con herramientas externas y APIs</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Available Integrations */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Integraciones Disponibles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: 'Slack', description: 'Notificaciones y actualizaciones', status: 'connected', logo: '💬' },
                          { name: 'Google Analytics', description: 'Métricas de rendimiento', status: 'available', logo: '📊' },
                          { name: 'GitHub', description: 'Seguimiento de desarrollo', status: 'connected', logo: '🐙' },
                          { name: 'Zoom', description: 'Integración de videollamadas', status: 'available', logo: '📹' },
                          { name: 'Notion', description: 'Sincronización de documentos', status: 'available', logo: '📝' },
                          { name: 'Stripe', description: 'Gestión de pagos', status: 'connected', logo: '💳' }
                        ].map((integration) => (
                          <div key={integration.name} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{integration.logo}</span>
                                <div>
                                  <div className="font-medium text-gray-900">{integration.name}</div>
                                  <div className="text-sm text-gray-600">{integration.description}</div>
                                </div>
                              </div>
                              <button
                                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all duration-200 ${
                                  integration.status === 'connected'
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                              >
                                {integration.status === 'connected' ? 'Conectado' : 'Conectar'}
                              </button>
                            </div>
                            {integration.status === 'connected' && (
                              <div className="flex items-center gap-2 text-xs text-green-600">
                                <CheckCircle className="w-3 h-3" />
                                Configurado correctamente
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* API Keys */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Claves API</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">API Key Principal</div>
                            <div className="text-sm text-gray-600">Para integracione externas</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <code className="px-2 py-1 bg-gray-200 rounded text-xs">nxs_1234...89ab</code>
                            <button className="p-1 hover:bg-gray-200 rounded">
                              <RefreshCw className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Data Management */}
              {activeTab === 'data' && (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Database className="w-6 h-6 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Gestión de Datos</h2>
                      <p className="text-sm text-gray-600">Importar, exportar y gestionar tus datos</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Data Export */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Exportar Datos</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Descarga una copia de todos tus datos en formato JSON
                      </p>
                      <button 
                        onClick={exportData}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Exportar Datos
                      </button>
                    </div>

                    {/* Data Import */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Importar Datos</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Sube archivos CSV o JSON para importar datos al sistema
                      </p>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Arrastra archivos aquí o haz clic para seleccionar</p>
                        <input type="file" className="hidden" accept=".csv,.json" />
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="border border-red-200 bg-red-50 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <h3 className="text-lg font-medium text-red-900">Zona de Peligro</h3>
                      </div>
                      <p className="text-sm text-red-700 mb-4">
                        Estas acciones son permanentes y no se pueden deshacer
                      </p>
                      <button 
                        onClick={deleteAccount}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar Cuenta
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Settings */}
              {activeTab === 'billing' && (
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Facturación</h2>
                      <p className="text-sm text-gray-600">Gestiona tu suscripción y métodos de pago</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Current Plan */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Plan Actual</h3>
                          <p className="text-sm text-gray-600">Nexus Studio Pro</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">$299</div>
                          <div className="text-sm text-gray-600">por mes</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
                        <CheckCircle className="w-4 h-4" />
                        Activo hasta el 15 de octubre, 2024
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        Cambiar Plan
                      </button>
                    </div>

                    {/* Payment Method */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Método de Pago</h3>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">•••• •••• •••• 4242</div>
                          <div className="text-sm text-gray-600">Expira 12/25</div>
                        </div>
                        <button className="ml-auto px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                          Actualizar
                        </button>
                      </div>
                    </div>

                    {/* Billing History */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Historial de Facturación</h3>
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                          <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                            <span>Fecha</span>
                            <span>Descripción</span>
                            <span>Monto</span>
                            <span>Estado</span>
                          </div>
                        </div>
                        <div className="divide-y divide-gray-200">
                          {[
                            { date: '15 Sep 2024', description: 'Nexus Studio Pro', amount: '$299.00', status: 'Pagado' },
                            { date: '15 Ago 2024', description: 'Nexus Studio Pro', amount: '$299.00', status: 'Pagado' },
                            { date: '15 Jul 2024', description: 'Nexus Studio Pro', amount: '$299.00', status: 'Pagado' }
                          ].map((invoice, index) => (
                            <div key={index} className="px-6 py-3 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-900">{invoice.date}</span>
                                <span className="text-gray-700">{invoice.description}</span>
                                <span className="font-medium text-gray-900">{invoice.amount}</span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                  {invoice.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}