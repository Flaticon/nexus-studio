'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Building2,
  LogIn,
  UserPlus,
  Menu,
  X,
  Brain,
  Star,
  Shield,
  Zap,
  Globe,
  Rocket,
  Activity,
  Briefcase,
  DollarSign,
  BarChart3,
  Plug,
  Moon,
  Sun
} from 'lucide-react';
import { useState } from 'react';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const features = [
    {
      icon: '🖤',
      title: 'Medición de la experiencia del colaborador',
      description: 'Métricas del engagement y la experiencia en tiempo real'
    },
    {
      icon: '🔔',
      title: 'Soporte y preguntas frecuentes al colaborador',
      description: 'Respuestas automáticas y soporte inteligente 24/7'
    },
    {
      icon: '🎺',
      title: 'Comunicaciones personalizadas y segmentadas',
      description: 'Mensajes adaptativos basados en el perfil del colaborador'
    },
    {
      icon: '✓',
      title: 'Onboarding al colaborador automatizado',
      description: 'Proceso de integración guiado y automatizado'
    }
  ];

  const integrations = ['Microsoft Office Teams', 'WhatsApp', 'Slack', 'Google Chat'];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-black' : 'bg-white'}`}>
      {/* Clean background - Apple style */}

      {/* Navigation Header */}
      <nav className={`sticky top-0 z-50 transition-colors duration-300 ${darkMode ? 'bg-black/80 border-gray-800' : 'bg-white/80 border-gray-100'} backdrop-blur-xl border-b`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${darkMode ? 'bg-white' : 'bg-black'}`}>
                <Building2 className={`w-5 h-5 ${darkMode ? 'text-black' : 'text-white'}`} />
              </div>
              <span className={`text-xl font-semibold transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nexus Studio</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#plataforma" className={`font-normal text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                Plataforma
              </Link>
              <Link href="#maya" className={`font-normal text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                Maya AI
              </Link>
              <Link href="#casos-exito" className={`font-normal text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                Casos de éxito
              </Link>
              <Link href="#contact" className={`font-normal text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                Contacto
              </Link>
              <div className="flex items-center space-x-3 ml-8">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-full transition-colors ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className={`font-normal text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Iniciar sesión
                </button>
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  Probar Maya
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link href="#features" className="text-gray-600 hover:text-gray-900 font-medium">
                  Características
                </Link>
                <Link href="#about" className="text-gray-600 hover:text-gray-900 font-medium">
                  Acerca de
                </Link>
                <Link href="#contact" className="text-gray-600 hover:text-gray-900 font-medium">
                  Contacto
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium justify-center"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Iniciar Sesión</span>
                  </button>
                  <button 
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium justify-center"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Registrarse</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">

            {/* Hero Title - Apple style */}
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-semibold mb-8 tracking-tight leading-none transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              La plataforma empresarial completa
            </h1>

            <h2 className={`text-3xl sm:text-4xl font-semibold mb-12 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Ahora con <span className="text-blue-500">Maya AI</span> para People Analytics
            </h2>

            <p className={`text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-normal transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Gestiona tu startup o venture studio con herramientas profesionales.
              Maya, nuestro agente de IA, revoluciona cómo entiendes y mejoras la experiencia de tu equipo.
            </p>
            
            {/* CTA Buttons - Apple style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-200 text-base"
              >
                Probar Maya gratis
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 text-base ${darkMode ? 'text-blue-400 hover:bg-gray-800' : 'text-blue-600 hover:bg-blue-50'}`}
              >
                Ver toda la plataforma
              </button>
            </div>
            
          </div>
        </div>
      </section>

      {/* Maya AI Featured Section */}
      <section id="maya" className={`py-20 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-semibold mb-6 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Conoce a Maya
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              El agente de IA que revoluciona People Analytics
            </p>
          </div>

          {/* Maya Features - Apple card style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className={`p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200'}`}>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h3 className={`font-semibold mb-3 text-lg transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                    <p className={`leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Demo Preview - Apple style */}
          <div className={`rounded-3xl p-8 border transition-colors ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Chat Preview */}
              <div>
                <div className="bg-gray-900 rounded-2xl p-6 text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-bl-none max-w-xs">
                      👋 ¡Hola! Soy Maya, tu asistente de People Analytics
                    </div>
                    <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-bl-none max-w-xs">
                      📊 ¿Cómo te sientes en tu trabajo esta semana?
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Benefits */}
              <div className="space-y-6">
                <h3 className={`text-2xl font-semibold transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Maya transforma tu gestión de personas
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span className={`transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Conversaciones automatizadas con cada colaborador</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span className={`transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Analytics en tiempo real del engagement</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span className={`transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Predicción y reducción de rotación</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="text-center mt-16">
            <p className={`mb-6 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Se integra con tus herramientas favoritas</p>
            <div className="flex flex-wrap justify-center gap-6">
              {integrations.map((integration, index) => (
                <div key={index} className={`px-4 py-2 rounded-full border font-medium transition-colors ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-600'}`}>
                  {integration}
                </div>
              ))}
            </div>
          </div>

          {/* Maya AI People CTA */}
          <div className="text-center mt-16">
            <Link
              href="/maya-ai-people"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-2xl font-semibold hover:from-purple-700 hover:via-pink-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Brain className="w-6 h-6" />
              <span>Explorar Maya AI People Analytics</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Complete Platform Section */}
      <section id="plataforma" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-semibold mb-6 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              La plataforma completa
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Todos los módulos que necesitas para gestionar tu startup o venture studio
            </p>
          </div>

          {/* Modules Grid - Apple style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/dashboard" className="group">
              <div className={`p-8 rounded-3xl border hover:shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${darkMode ? 'bg-gray-700 group-hover:bg-blue-900' : 'bg-gray-100 group-hover:bg-blue-50'}`}>
                  <Activity className={`w-6 h-6 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'}`} />
                </div>
                <h3 className={`text-xl font-semibold mb-3 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dashboard Ejecutivo</h3>
                <p className={`leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Centro de control con métricas clave y KPIs en tiempo real</p>
              </div>
            </Link>

            <Link href="/portfolio" className="group">
              <div className={`p-8 rounded-3xl border hover:shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${darkMode ? 'bg-gray-700 group-hover:bg-blue-900' : 'bg-gray-100 group-hover:bg-blue-50'}`}>
                  <Briefcase className={`w-6 h-6 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'}`} />
                </div>
                <h3 className={`text-xl font-semibold mb-3 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Gestión de Proyectos</h3>
                <p className={`leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Planificación, seguimiento y gestión de equipos</p>
              </div>
            </Link>

            <Link href="/maya-ai-people" className="group">
              <div className={`p-8 rounded-3xl border hover:shadow-lg transition-all duration-300 ring-2 ring-purple-500 ring-opacity-20 ${darkMode ? 'bg-gray-800 border-purple-800' : 'bg-white border-gray-200'}`}>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Maya AI People</h3>
                <p className={`leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>IA conversacional para gestión de personas y analytics</p>
                <div className="mt-4 text-purple-500 text-sm font-medium">✨ Con IA</div>
              </div>
            </Link>

            <Link href="/finance" className="group">
              <div className={`p-8 rounded-3xl border hover:shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${darkMode ? 'bg-gray-700 group-hover:bg-blue-900' : 'bg-gray-100 group-hover:bg-blue-50'}`}>
                  <DollarSign className={`w-6 h-6 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'}`} />
                </div>
                <h3 className={`text-xl font-semibold mb-3 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Gestión Financiera</h3>
                <p className={`leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Presupuestos, flujos de caja y reportes financieros</p>
              </div>
            </Link>

            <Link href="/analytics" className="group">
              <div className={`p-8 rounded-3xl border hover:shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${darkMode ? 'bg-gray-700 group-hover:bg-blue-900' : 'bg-gray-100 group-hover:bg-blue-50'}`}>
                  <BarChart3 className={`w-6 h-6 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'}`} />
                </div>
                <h3 className={`text-xl font-semibold mb-3 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Analytics</h3>
                <p className={`leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Business intelligence y análisis predictivo</p>
              </div>
            </Link>

            <Link href="/integrations" className="group">
              <div className={`p-8 rounded-3xl border hover:shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${darkMode ? 'bg-gray-700 group-hover:bg-blue-900' : 'bg-gray-100 group-hover:bg-blue-50'}`}>
                  <Plug className={`w-6 h-6 transition-colors ${darkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-600 group-hover:text-blue-600'}`} />
                </div>
                <h3 className={`text-xl font-semibold mb-3 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Integraciones</h3>
                <p className={`leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Conectores con herramientas externas y APIs</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Nexus Section */}
      <section className={`py-20 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-semibold mb-6 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ¿Por qué Nexus Studio?
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              La evolución natural de cómo deberían gestionarse las empresas modernas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className={`p-8 rounded-3xl border transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${darkMode ? 'bg-blue-900' : 'bg-blue-50'}`}>
                <Brain className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h3 className={`text-2xl font-semibold mb-4 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Inteligencia Artificial</h3>
              <p className={`leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                IA que analiza patrones, predice resultados y sugiere acciones inteligentes para tu negocio.
              </p>
            </div>

            <div className={`p-8 rounded-3xl border transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${darkMode ? 'bg-green-900' : 'bg-green-50'}`}>
                <Shield className={`w-8 h-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <h3 className={`text-2xl font-semibold mb-4 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Seguridad Enterprise</h3>
              <p className={`leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Encriptación end-to-end y cumplimiento GDPR para proteger tus datos más críticos.
              </p>
            </div>

            <div className={`p-8 rounded-3xl border transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${darkMode ? 'bg-purple-900' : 'bg-purple-50'}`}>
                <Zap className={`w-8 h-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <h3 className={`text-2xl font-semibold mb-4 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Automatización Total</h3>
              <p className={`leading-relaxed transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Workflows inteligentes que eliminan tareas repetitivas y optimizan tu productividad.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Final CTA Section */}
      <section className={`py-20 transition-colors ${darkMode ? 'bg-blue-600' : 'bg-blue-600'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-6">
              ¿Listo para transformar tu empresa?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Únete a las empresas que ya están usando Nexus Studio y Maya AI
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2"
              >
                <Rocket className="w-5 h-5" />
                <span>Probar Maya gratis</span>
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center space-x-2"
              >
                <Globe className="w-5 h-5" />
                <span>Explorar plataforma</span>
              </button>
            </div>

            <p className="text-blue-200 text-sm">
              ✨ Prueba gratuita • 🔒 Datos seguros • 🤖 IA incluida • 📞 Soporte 24/7
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`transition-colors ${darkMode ? 'bg-black border-t border-gray-800' : 'bg-gray-50 border-t border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${darkMode ? 'bg-white' : 'bg-black'}`}>
                  <Building2 className={`w-5 h-5 ${darkMode ? 'text-black' : 'text-white'}`} />
                </div>
                <span className={`text-xl font-semibold transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Nexus Studio</span>
              </div>
              <p className={`mb-4 max-w-md transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Plataforma empresarial completa con Maya AI para People Analytics
              </p>
              <div className={`text-sm transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                © 2024 Nexus Studio. Todos los derechos reservados.
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Enlaces</h3>
              <ul className="space-y-2">
                <li><Link href="#plataforma" className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Plataforma</Link></li>
                <li><Link href="#maya" className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Maya AI</Link></li>
                <li><Link href="#casos-exito" className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Casos de éxito</Link></li>
                <li><Link href="#contact" className={`transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Contacto</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contacto</h3>
              <ul className={`space-y-2 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>hello@nexusstudio.com</li>
                <li>Síguenos en redes</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
      
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  );
}