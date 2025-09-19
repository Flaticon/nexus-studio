'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Briefcase,
  DollarSign,
  Users,
  Target,
  Activity,
  ArrowRight,
  BarChart3,
  Plug,
  Building2,
  Sparkles,
  LogIn,
  UserPlus,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const modules = [
    {
      href: '/dashboard',
      icon: Activity,
      title: 'Dashboard Ejecutivo',
      description: 'Centro de control con métricas clave, KPIs y resúmenes ejecutivos en tiempo real',
      color: 'from-slate-500 to-slate-700',
      bgColor: 'bg-slate-50',
      textColor: 'text-slate-700',
      delay: '0.1s'
    },
    {
      href: '/portfolio',
      icon: Briefcase,
      title: 'Gestión de Proyectos',
      description: 'Gestión completa de proyectos: planificación, seguimiento, equipos y objetivos',
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      delay: '0.2s'
    },
    {
      href: '/finance',
      icon: DollarSign,
      title: 'Gestión Financiera',
      description: 'Control integral: presupuestos, flujos de caja, valuaciones y reportes financieros',
      color: 'from-emerald-500 to-emerald-700',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      delay: '0.3s'
    },
    {
      href: '/okrs',
      icon: Target,
      title: 'OKRs & Objetivos',
      description: 'Definición y seguimiento de objetivos y resultados clave para todo el ecosistema',
      color: 'from-purple-500 to-purple-700',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      delay: '0.4s'
    },
    {
      href: '/talent',
      icon: Users,
      title: 'Gestión de Talento',
      description: 'Recursos humanos avanzados: onboarding, evaluaciones, desarrollo y retención',
      color: 'from-rose-500 to-rose-700',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
      delay: '0.5s'
    },
    {
      href: '/analytics',
      icon: BarChart3,
      title: 'Analytics Avanzado',
      description: 'Business intelligence, análisis predictivo y insights estratégicos profundos',
      color: 'from-indigo-500 to-indigo-700',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      delay: '0.6s'
    },
    {
      href: '/integrations',
      icon: Plug,
      title: 'Integraciones',
      description: 'Conectores con herramientas externas, APIs y automatización de workflows',
      color: 'from-cyan-500 to-cyan-700',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
      delay: '0.7s'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation Header */}
      <nav className="relative bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Nexus Studio</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Características
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Acerca de
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Contacto
              </Link>
              <div className="flex items-center space-x-4 ml-8">
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Iniciar Sesión</span>
                </button>
                <button 
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Registrarse</span>
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
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-25"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-12">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl flex items-center justify-center shadow-xl">
                <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            
            {/* Startup Pitch Style */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-semibold mb-6 animate-pulse">
              🚀 El futuro de la gestión empresarial está aquí
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Nexus Studio
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-700 mb-4 max-w-4xl mx-auto">
              La única plataforma que necesitas para
            </p>
            
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 max-w-4xl mx-auto">
              <span className="text-blue-600">Gestionar</span> tu empresa como nunca antes
            </p>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12 px-4">
              ¿Cansado de usar 20 herramientas diferentes? Nosotros también. Por eso creamos la solución 
              <span className="font-semibold text-gray-800"> todo-en-uno</span> que las empresas exitosas estaban esperando.
            </p>
            
            {/* Social Proof */}
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Proyectos</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-gray-600">Empresas</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">$2B+</div>
                <div className="text-sm text-gray-600">Gestionados</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button 
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105"
              >
                🚀 Gestiona tu Empresa
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-10 py-5 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold text-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105"
              >
                🎬 Ver Demo en Vivo
              </button>
            </div>
            
            <p className="text-sm text-gray-500">
              ✨ Prueba gratuita de 14 días • Sin tarjeta de crédito • Configuración en 5 min
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {modules.map((module, index) => {
              const IconComponent = module.icon;
              
              return (
                <Link 
                  key={module.href}
                  href={module.href} 
                  className="group block"
                  style={{ animationDelay: module.delay }}
                >
                  <div className="startup-card relative overflow-hidden bg-white rounded-3xl shadow-lg border border-gray-200 p-8 h-full group">
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative">
                      {/* Icon */}
                      <div className="mb-8">
                        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-125 transition-all duration-500 bg-gradient-to-r ${module.color} group-hover:rotate-12`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      {/* Text */}
                      <h3 className="text-2xl font-black mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {module.title}
                      </h3>
                      <p className="text-base leading-relaxed text-gray-600 mb-8">
                        {module.description}
                      </p>
                      
                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <div className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${module.color} text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300`}>
                          Iniciar
                        </div>
                        <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">7+</div>
              <div className="text-sm font-medium text-gray-600">Módulos Integrados</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">500+</div>
              <div className="text-sm font-medium text-gray-600">Startups Gestionadas</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-rose-600 bg-clip-text text-transparent">99.9%</div>
              <div className="text-sm font-medium text-gray-600">Uptime</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
              <div className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">24/7</div>
              <div className="text-sm font-medium text-gray-600">Soporte</div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              El problema que todos conocemos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los venture studios exitosos están perdiendo tiempo y dinero usando herramientas fragmentadas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Problem */}
            <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
              <div className="text-red-600 text-6xl mb-6">😤</div>
              <h3 className="text-2xl font-bold text-red-900 mb-6">Antes: El Caos Total</h3>
              <ul className="space-y-4 text-red-800">
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">×</span>
                  <span>20+ herramientas desconectadas</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">×</span>
                  <span>Datos esparcidos en silos</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">×</span>
                  <span>Reportes manuales que toman días</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">×</span>
                  <span>Oportunidades perdidas por falta de visibilidad</span>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
              <div className="text-green-600 text-6xl mb-6">🚀</div>
              <h3 className="text-2xl font-bold text-green-900 mb-6">Ahora: Una Sola Plataforma</h3>
              <ul className="space-y-4 text-green-800">
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Todo integrado en un solo dashboard</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Datos unificados en tiempo real</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Reportes automáticos en segundos</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Insights predictivos que impulsan el crecimiento</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <p className="text-white font-bold text-lg">
                💡 Resultado: 70% menos tiempo en tareas operativas, 3x más oportunidades identificadas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Nexus Studio</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Plataforma integral para gestionar tu venture studio con herramientas profesionales 
                para portafolio, finanzas, OKRs y equipos.
              </p>
              <div className="text-sm text-gray-500">
                © 2024 Nexus Studio. Todos los derechos reservados.
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Características</Link></li>
                <li><Link href="#about" className="text-gray-400 hover:text-white transition-colors">Acerca de</Link></li>
                <li><Link href="#contact" className="text-gray-400 hover:text-white transition-colors">Contacto</Link></li>
                <li><Link href="#support" className="text-gray-400 hover:text-white transition-colors">Soporte</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>info@nexusstudio.com</li>
                <li>+1 (555) 123-4567</li>
                <li>San Francisco, CA</li>
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