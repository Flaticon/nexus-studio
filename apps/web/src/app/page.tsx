'use client';

import Link from 'next/link';
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
  Sparkles
} from 'lucide-react';

export default function Home() {
  const modules = [
    {
      href: '/dashboard',
      icon: Activity,
      emoji: '🏠',
      title: 'Dashboard',
      description: 'Vista ejecutiva con métricas clave',
      gradient: 'from-slate-600 to-slate-800',
      delay: '0.1s'
    },
    {
      href: '/portfolio',
      icon: Briefcase,
      emoji: '🚀',
      title: 'Portafolio',
      description: 'Gestión de startups y proyectos',
      gradient: 'from-blue-600 to-blue-800',
      delay: '0.2s'
    },
    {
      href: '/finance',
      icon: DollarSign,
      emoji: '💰',
      title: 'Finanzas',
      description: 'Control financiero integral',
      gradient: 'from-emerald-600 to-emerald-800',
      delay: '0.3s'
    },
    {
      href: '/okrs',
      icon: Target,
      emoji: '🎯',
      title: 'OKRs',
      description: 'Objetivos y resultados clave',
      gradient: 'from-purple-600 to-purple-800',
      delay: '0.4s'
    },
    {
      href: '/talent',
      icon: Users,
      emoji: '👥',
      title: 'Talento',
      description: 'Gestión de equipos y personas',
      gradient: 'from-rose-600 to-rose-800',
      delay: '0.5s'
    },
    {
      href: '/analytics',
      icon: BarChart3,
      emoji: '📈',
      title: 'Analytics',
      description: 'Insights y análisis avanzado',
      gradient: 'from-indigo-600 to-indigo-800',
      delay: '0.6s'
    },
    {
      href: '/integrations',
      icon: Plug,
      emoji: '🔌',
      title: 'Integrations',
      description: 'Conectores y automatización',
      gradient: 'from-cyan-600 to-cyan-800',
      delay: '0.7s'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
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
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-4 tracking-tight">
              Nexus Studio
            </h1>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <p className="text-lg sm:text-xl text-gray-600 font-medium">
                Venture Studio Management Platform
              </p>
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed px-4">
              Plataforma integral para gestionar tu venture studio con herramientas profesionales 
              para portafolio, finanzas, OKRs y equipos.
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
                  <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 p-6 h-full">
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`}></div>
                    
                    {/* Content */}
                    <div className="relative">
                      {/* Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200"
                          style={{ 
                            background: 'var(--surface-secondary)',
                            color: 'var(--text-primary)'
                          }}
                        >
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                          {module.emoji}
                        </span>
                      </div>
                      
                      {/* Text */}
                      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        {module.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                        {module.description}
                      </p>
                      
                      {/* Arrow */}
                      <div className="flex items-center justify-end">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all duration-200" style={{ color: 'var(--text-tertiary)' }} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
            <div className="text-center p-4 rounded-xl" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>7</div>
              <div className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Módulos</div>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>100%</div>
              <div className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Funcional</div>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>✓</div>
              <div className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Mobile Ready</div>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ background: 'var(--surface)', boxShadow: 'var(--shadow-sm)' }}>
              <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>⚡</div>
              <div className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Fast & Modern</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
