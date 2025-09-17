'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Building2,
  Briefcase,
  Target,
  Users,
  TrendingUp,
  BarChart3,
  Menu,
  X,
  ChevronLeft,
  Settings,
  LogOut,
  BookOpen,
  Zap
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      // Clear stored tokens and session data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      sessionStorage.clear();

      // Call logout API if you have one
      // await fetch('/api/auth/logout', { method: 'POST' });

      // Redirect to home page or login
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Still redirect even if logout API fails
      router.push('/');
    }
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      description: 'Vista general y métricas principales',
      color: 'var(--module-dashboard)'
    },
    {
      name: 'Portfolio',
      href: '/portfolio',
      icon: Building2,
      description: 'Gestión de startups y proyectos',
      color: 'var(--module-portfolio)'
    },
    {
      name: 'Finanzas',
      href: '/finance',
      icon: TrendingUp,
      description: 'Control financiero y presupuestos',
      color: 'var(--module-finance)'
    },
    {
      name: 'OKRs',
      href: '/okrs',
      icon: Target,
      description: 'Objetivos y resultados clave',
      color: 'var(--module-okrs)'
    },
    {
      name: 'Talento',
      href: '/talent',
      icon: Users,
      description: 'Gestión de talento y equipos',
      color: 'var(--module-talent)'
    },
    {
      name: 'Aprendizajes',
      href: '/learnings',
      icon: BookOpen,
      description: 'Conocimiento y retrospectivas',
      color: 'var(--brand-secondary)'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      description: 'Análisis y reportes avanzados',
      color: 'var(--module-analytics)'
    },
    {
      name: 'Integrations Hub',
      href: '/integrations',
      icon: Zap,
      description: 'Conexiones y automatizaciones',
      color: 'var(--module-integrations)'
    }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 border-r ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          isCollapsed ? 'w-18' : 'w-72'
        }`}
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
        }}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: 'var(--color-primary)'
              }}
              title={isCollapsed ? "Nexus Studio" : ""}
            >
              <Building2 className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-title" style={{ color: 'var(--text-primary)' }}>Nexus Studio</h1>
                <p className="text-caption" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-family)' }}>Venture Studio</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {/* Collapse button (desktop) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 rounded-lg transition-all duration-200 icon-hover"
              style={{ 
                color: 'var(--text-secondary)',
                ':hover': { background: 'var(--surface-hover)' }
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--surface-hover)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`} />
            </button>
            
            {/* Close button (mobile) */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg transition-all duration-200 icon-hover"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.target.style.background = 'var(--surface-hover)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  // Close mobile menu when clicking a link
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-150 group relative ${
                  active
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {/* Active indicator */}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-black rounded-r-lg shadow-sm"></div>
                )}
                
                <div className="flex-shrink-0">
                  <Icon className={isCollapsed ? "w-6 h-6" : "w-6 h-6"} />
                </div>
                
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="text-body font-medium">
                      {item.name}
                    </div>
                  </div>
                )}
                
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t" style={{ borderColor: 'var(--border)' }}>
          {!isCollapsed ? (
            <div className="space-y-3">
              <Link
                href="/settings"
                className="flex items-center gap-3 w-full p-4 rounded-xl text-base font-normal group transition-all duration-150"
                style={{ fontFamily: 'var(--font-family)' }}
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--text-primary)';
                  e.target.style.background = 'var(--surface-hover)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--text-secondary)';
                  e.target.style.background = 'transparent';
                }}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <Settings className="w-5 h-5" />
                </div>
                Configuración
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-4 rounded-xl text-base font-normal group transition-all duration-150"
                style={{ fontFamily: 'var(--font-family)' }}
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--error)';
                  e.target.style.background = 'var(--error-bg)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--text-secondary)';
                  e.target.style.background = 'transparent';
                }}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <LogOut className="w-5 h-5" />
                </div>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                href="/settings"
                className="flex items-center justify-center w-full p-4 rounded-xl transition-all duration-150"
                title="Configuración"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--text-primary)';
                  e.target.style.background = 'var(--surface-hover)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--text-secondary)';
                  e.target.style.background = 'transparent';
                }}
              >
                <Settings className="w-6 h-6" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full p-4 rounded-xl transition-all duration-150"
                title="Cerrar Sesión"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--error)';
                  e.target.style.background = 'var(--error-bg)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'var(--text-secondary)';
                  e.target.style.background = 'transparent';
                }}
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;