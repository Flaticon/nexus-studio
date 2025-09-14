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
      emoji: '🏠',
      description: 'Vista general y métricas principales',
      color: 'var(--module-dashboard)'
    },
    {
      name: 'Portfolio',
      href: '/portfolio',
      icon: Building2,
      emoji: '🚀',
      description: 'Gestión de startups y proyectos',
      color: 'var(--module-portfolio)'
    },
    {
      name: 'Finanzas',
      href: '/finance',
      icon: TrendingUp,
      emoji: '💰',
      description: 'Control financiero y presupuestos',
      color: 'var(--module-finance)'
    },
    {
      name: 'OKRs',
      href: '/okrs',
      icon: Target,
      emoji: '🎯',
      description: 'Objetivos y resultados clave',
      color: 'var(--module-okrs)'
    },
    {
      name: 'Talento',
      href: '/talent',
      icon: Users,
      emoji: '👥',
      description: 'Gestión de talento y equipos',
      color: 'var(--module-talent)'
    },
    {
      name: 'Aprendizajes',
      href: '/learnings',
      icon: BookOpen,
      emoji: '📚',
      description: 'Conocimiento y retrospectivas',
      color: 'var(--brand-secondary)'
    },
    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
      emoji: '📊',
      description: 'Análisis y reportes avanzados',
      color: 'var(--module-analytics)'
    },
    {
      name: 'Integrations Hub',
      href: '/integrations',
      icon: Zap,
      emoji: '⚡',
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
          isCollapsed ? 'w-16' : 'w-64'
        }`}
        style={{ 
          background: 'var(--surface)',
          boxShadow: 'var(--shadow-lg)',
          borderColor: 'var(--border)'
        }}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-primary-dark))',
                opacity: 1,
                visibility: 'visible'
              }}
              title={isCollapsed ? "Nexus Studio" : ""}
            >
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)'
                }}
              />
              <Building2 className="w-6 h-6 text-white relative z-10" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-xl tracking-tight" style={{ color: 'var(--text-primary)' }}>Nexus Studio</h1>
                <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--text-secondary)', opacity: 0.8 }}>Venture Studio</p>
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
        <nav className="flex-1 p-5 space-y-2 overflow-y-auto">
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
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative ${
                  active 
                    ? 'nav-item-active' 
                    : 'nav-item-inactive hover:bg-opacity-50'
                }`}
                style={{
                  background: active 
                    ? `${item.color}20` 
                    : 'transparent',
                  color: active ? item.color : 'var(--text-secondary)',
                  boxShadow: active ? `0 4px 12px ${item.color}30` : 'none',
                  border: active ? `1px solid ${item.color}40` : '1px solid transparent'
                }}
              >
                {/* Active indicator */}
                {active && (
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                    style={{ 
                      background: `linear-gradient(to bottom, ${item.color}, ${item.color}CC)`
                    }}
                  ></div>
                )}
                
                <div 
                  className="flex-shrink-0 relative"
                  style={{
                    color: active ? item.color : 'inherit'
                  }}
                >
                  {active && !isCollapsed && (
                    <div 
                      className="absolute -inset-1 rounded-lg opacity-20"
                      style={{ background: item.color }}
                    />
                  )}
                  {isCollapsed ? (
                    <span className="text-lg relative z-10">{item.emoji}</span>
                  ) : (
                    <Icon className="w-5 h-5 relative z-10" />
                  )}
                </div>
                
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div 
                      className="font-semibold text-sm tracking-tight"
                      style={{ color: active ? item.color : 'inherit' }}
                    >
                      {item.name}
                    </div>
                    {!active && (
                      <div 
                        className="text-xs mt-0.5 opacity-70"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {item.description}
                      </div>
                    )}
                  </div>
                )}
                
                {active && !isCollapsed && (
                  <div 
                    className="w-2 h-2 rounded-full flex-shrink-0" 
                    style={{ 
                      background: item.color,
                      boxShadow: `0 0 6px ${item.color}60`
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-5 border-t" style={{ borderColor: 'var(--border)' }}>
          {!isCollapsed ? (
            <div className="space-y-3">
              <Link
                href="/settings"
                className="flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium group transition-all duration-200"
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
                <div className="w-5 h-5 flex items-center justify-center">
                  <Settings className="w-4 h-4" />
                </div>
                Configuración
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-3 rounded-xl text-sm font-medium group transition-all duration-200"
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
                <div className="w-5 h-5 flex items-center justify-center">
                  <LogOut className="w-4 h-4" />
                </div>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                href="/settings"
                className="flex items-center justify-center w-full p-3 rounded-xl transition-all duration-200"
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
                <Settings className="w-5 h-5" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full p-3 rounded-xl transition-all duration-200"
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
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;