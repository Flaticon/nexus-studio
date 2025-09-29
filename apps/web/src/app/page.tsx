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
      <nav className={`sticky top-0 z-50 transition-colors duration-300 ${darkMode ? 'bg-black/80 border-slate-800' : 'bg-white/80 border-slate-100'} backdrop-blur-xl border-b`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${darkMode ? 'bg-white' : 'bg-black'}`}>
                <Building2 className={`w-5 h-5 ${darkMode ? 'text-black' : 'text-white'}`} />
              </div>
              <span className={`text-xl font-semibold transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>Nexus Studio</span>
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
      <section className="pt-16 pb-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">

            {/* Hero Title - Apple style */}
            <div className={`inline-block px-6 py-2 rounded-full border mb-8 transition-colors ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
              <span className="text-sm font-medium">La única plataforma que necesitas para</span>
            </div>

            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-semibold mb-8 tracking-tight leading-none transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Gestionar tu empresa
              <br />
              <span className="text-blue-600">
                como nunca antes
              </span>
            </h1>

            <p className={`text-2xl max-w-4xl mx-auto mb-6 leading-relaxed font-normal transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              ¿Cansado de usar 20 herramientas diferentes? Nosotros también.
            </p>

            <p className={`text-2xl max-w-4xl mx-auto mb-8 leading-relaxed font-medium transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Por eso creamos la solución <span className="text-blue-500">todo-en-uno</span> que las empresas exitosas estaban esperando.
            </p>

            {/* Future tagline */}
            <div className="flex items-center justify-center gap-3 mb-12">
              <div className={`h-px flex-1 max-w-32 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
              <p className="text-lg font-semibold text-blue-600">
                🚀 El futuro de la gestión empresarial está aquí
              </p>
              <div className={`h-px flex-1 max-w-32 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
            </div>
            
            {/* CTA Buttons - Apple style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-10 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Probar gratis ahora
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className={`px-10 py-4 rounded-full font-semibold transition-all duration-200 text-lg border-2 ${darkMode ? 'text-white border-white hover:bg-white hover:text-black' : 'text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white'}`}
              >
                Ver demo en vivo
              </button>
            </div>

            {/* Trust indicators */}
            <div className={`flex flex-wrap justify-center items-center gap-6 text-sm mb-16 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span>
                <span>Gratis por 30 días</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span>
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✓</span>
                <span>Cancela cuando quieras</span>
              </div>
            </div>

            {/* Hero Dashboard Preview */}
            <div className="relative max-w-5xl mx-auto perspective-1000">
              <div className={`relative rounded-3xl p-2 shadow-2xl transform rotate-x-12 transition-all duration-500 hover:rotate-x-6 ${darkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-100 to-white'}`}>
                {/* Browser Chrome */}
                <div className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl border-b ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  </div>
                  <div className={`flex-1 max-w-md mx-4 px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                    nexusstudio.com/dashboard
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className={`p-6 rounded-b-2xl ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
                  {/* Top Stats */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
                      <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>$2.4M</div>
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Revenue</div>
                    </div>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-emerald-50 to-green-100'}`}>
                      <div className={`text-2xl font-bold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>94%</div>
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Satisfaction</div>
                    </div>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-purple-50 to-violet-100'}`}>
                      <div className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>12</div>
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Projects</div>
                    </div>
                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-rose-50 to-pink-100'}`}>
                      <div className={`text-2xl font-bold ${darkMode ? 'text-rose-400' : 'text-rose-600'}`}>85</div>
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Team</div>
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className={`rounded-xl p-4 mb-4 ${darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Maya AI Insights</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>Live</span>
                      </div>
                    </div>
                    {/* Simulated Chart */}
                    <div className="h-24 flex items-end gap-2">
                      {[40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 65, 80].map((height, i) => (
                        <div key={i} className={`flex-1 rounded-t transition-all duration-1000 delay-${i * 100} ${darkMode ? 'bg-gradient-to-t from-blue-600 to-purple-500' : 'bg-gradient-to-t from-blue-500 to-purple-600'}`} style={{height: `${height}%`}}></div>
                      ))}
                    </div>
                  </div>

                  {/* Maya AI Chat Preview */}
                  <div className={`rounded-xl p-4 ${darkMode ? 'bg-slate-800' : 'bg-gradient-to-br from-indigo-50 to-blue-100'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>Maya AI</div>
                        <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Tu asistente de People Analytics</div>
                      </div>
                    </div>
                    <div className={`text-sm p-3 rounded-lg ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-white text-slate-700'}`}>
                      "Detecté que el engagement del equipo de desarrollo subió 23% esta semana. ¿Quieres ver el análisis completo?"
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle Apple-style floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-600/10 rounded-full blur-lg"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-blue-600/5 rounded-full blur-xl"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Maya AI Featured Section */}
      <section id="maya" className={`py-20 transition-colors ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-semibold mb-6 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Conoce a Maya
            </h2>
            <p className={`text-xl max-w-3xl mx-auto transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              El agente de IA que revoluciona People Analytics
            </p>
          </div>

          {/* Maya Features - Apple card style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className={`p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h3 className={`font-semibold mb-3 text-lg transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>{feature.title}</h3>
                    <p className={`leading-relaxed transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{feature.description}</p>
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
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white rounded-2xl font-semibold hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
          <div className="text-center mb-20">
            <div className={`inline-block px-4 py-2 rounded-full border mb-6 transition-colors ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
              <span className="text-sm font-medium">✨ Módulos principales</span>
            </div>
            <h2 className={`text-5xl sm:text-6xl font-semibold mb-8 tracking-tight transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Todo lo que necesitas
              <br />
              <span className="text-blue-600">en una sola plataforma</span>
            </h2>
            <p className={`text-2xl max-w-4xl mx-auto font-normal leading-relaxed transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Olvídate de integrar 20 herramientas diferentes. Nexus Studio incluye todos los módulos esenciales para hacer crecer tu empresa.
            </p>
          </div>

          {/* Modules Grid - Apple style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/dashboard" className="group">
              <div className={`p-10 rounded-3xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${darkMode ? 'bg-slate-800 border-slate-700 hover:border-blue-500' : 'bg-white border-slate-200 hover:border-blue-300'}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 ${darkMode ? 'bg-slate-700 group-hover:bg-blue-600' : 'bg-slate-100 group-hover:bg-blue-600'}`}>
                  <Activity className={`w-8 h-8 transition-colors ${darkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-600 group-hover:text-white'}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>Dashboard Ejecutivo</h3>
                <p className={`text-lg leading-relaxed transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Centro de control con métricas clave y KPIs en tiempo real para tomar decisiones inteligentes</p>
                <div className="mt-6 flex items-center text-blue-600 font-medium">
                  <span>Explorar</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/portfolio" className="group">
              <div className={`p-10 rounded-3xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${darkMode ? 'bg-slate-800 border-slate-700 hover:border-emerald-500' : 'bg-white border-slate-200 hover:border-emerald-300'}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 ${darkMode ? 'bg-slate-700 group-hover:bg-emerald-600' : 'bg-slate-100 group-hover:bg-emerald-600'}`}>
                  <Briefcase className={`w-8 h-8 transition-colors ${darkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-600 group-hover:text-white'}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>Gestión de Proyectos</h3>
                <p className={`text-lg leading-relaxed transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Planificación, seguimiento y gestión de equipos con herramientas colaborativas avanzadas</p>
                <div className="mt-6 flex items-center text-emerald-600 font-medium">
                  <span>Explorar</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/maya-ai-people" className="group">
              <div className={`p-10 rounded-3xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ring-2 ring-purple-500/30 ${darkMode ? 'bg-slate-800 border-purple-600 hover:border-purple-400' : 'bg-white border-purple-300 hover:border-purple-500'}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>Maya AI People</h3>
                <p className={`text-lg leading-relaxed transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>IA conversacional para gestión de personas y analytics avanzados con predicciones inteligentes</p>
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 rounded-full">
                  <span className="text-purple-600 font-medium text-sm">✨ Powered by AI</span>
                </div>
                <div className="mt-6 flex items-center text-purple-600 font-medium">
                  <span>Explorar Maya</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/finance" className="group">
              <div className={`p-10 rounded-3xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${darkMode ? 'bg-slate-800 border-slate-700 hover:border-green-500' : 'bg-white border-slate-200 hover:border-green-300'}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 ${darkMode ? 'bg-slate-700 group-hover:bg-green-600' : 'bg-slate-100 group-hover:bg-green-600'}`}>
                  <DollarSign className={`w-8 h-8 transition-colors ${darkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-600 group-hover:text-white'}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>Gestión Financiera</h3>
                <p className={`text-lg leading-relaxed transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Presupuestos, flujos de caja y reportes financieros completos para maximizar rentabilidad</p>
                <div className="mt-6 flex items-center text-green-600 font-medium">
                  <span>Explorar</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/analytics" className="group">
              <div className={`p-10 rounded-3xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${darkMode ? 'bg-slate-800 border-slate-700 hover:border-indigo-500' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 ${darkMode ? 'bg-slate-700 group-hover:bg-indigo-600' : 'bg-slate-100 group-hover:bg-indigo-600'}`}>
                  <BarChart3 className={`w-8 h-8 transition-colors ${darkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-600 group-hover:text-white'}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>Analytics</h3>
                <p className={`text-lg leading-relaxed transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Business intelligence y análisis predictivo con dashboards interactivos y reportes automatizados</p>
                <div className="mt-6 flex items-center text-indigo-600 font-medium">
                  <span>Explorar</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </Link>

            <Link href="/integrations" className="group">
              <div className={`p-10 rounded-3xl border-2 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${darkMode ? 'bg-slate-800 border-slate-700 hover:border-orange-500' : 'bg-white border-slate-200 hover:border-orange-300'}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 ${darkMode ? 'bg-slate-700 group-hover:bg-orange-600' : 'bg-slate-100 group-hover:bg-orange-600'}`}>
                  <Plug className={`w-8 h-8 transition-colors ${darkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-600 group-hover:text-white'}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>Integraciones</h3>
                <p className={`text-lg leading-relaxed transition-colors ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Conectores con herramientas externas y APIs para sincronizar toda tu información empresarial</p>
                <div className="mt-6 flex items-center text-orange-600 font-medium">
                  <span>Explorar</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
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
      <footer className={`transition-colors ${darkMode ? 'bg-black border-t border-slate-800' : 'bg-slate-50 border-t border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${darkMode ? 'bg-white' : 'bg-black'}`}>
                  <Building2 className={`w-5 h-5 ${darkMode ? 'text-black' : 'text-white'}`} />
                </div>
                <span className={`text-xl font-semibold transition-colors ${darkMode ? 'text-white' : 'text-slate-900'}`}>Nexus Studio</span>
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
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
}