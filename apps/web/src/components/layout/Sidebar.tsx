'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Building2,
  Briefcase,
  Target,
  Users,
  TrendingUp,
  BarChart3,
  BookOpen,
  Menu,
  X,
  ChevronLeft,
  Settings,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      emoji: '🏠',
      description: 'Vista general y métricas principales'
    },
    {
      name: 'Portfolio de Startups',
      href: '/portfolio',
      icon: Building2,
      emoji: '🚀',
      description: 'Gestión de iniciativas y proyectos'
    },
    {
      name: 'Finanzas',
      href: '/finance',
      icon: TrendingUp,
      emoji: '💰',
      description: 'Control financiero y presupuestos'
    },
    {
      name: 'OKRs Operativos',
      href: '/okrs',
      icon: Target,
      emoji: '🟣',
      description: 'Objetivos y resultados clave'
    },
    {
      name: 'Talento y Equipos',
      href: '/talent',
      icon: Users,
      emoji: '🧩',
      description: 'Gestión de talento y colaboradores'
    },
    {
      name: 'Aprendizajes y Retros',
      href: '/learnings',
      icon: BookOpen,
      emoji: '🟤',
      description: 'Documentación de conocimiento y retrospectivas'
    },
    {
      name: 'Insights y Analytics',
      href: '/analytics',
      icon: BarChart3,
      emoji: '📊',
      description: 'Análisis y reportes avanzados'
    },
    {
      name: 'Configuración',
      href: '/settings',
      icon: Settings,
      emoji: '⚙️',
      description: 'Configuración del sistema y cuenta'
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
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
        style={{ 
          background: 'var(--surface)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: 'var(--brand-primary)' }}
              >
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Nexus Studio</h1>
                <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Venture Studio</p>
              </div>
            </div>
          )}
          
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
        <nav className="flex-1 p-3 space-y-2">
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
                className="stagger-item flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative"
                style={{
                  background: active ? 'var(--brand-primary-light)' : 'transparent',
                  color: active ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  boxShadow: active ? 'none' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.target.style.background = 'var(--surface-hover)';
                    e.target.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--text-secondary)';
                  }
                }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Active indicator */}
                {active && (
                  <div 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                    style={{ background: 'var(--brand-primary)' }}
                  ></div>
                )}
                
                <div 
                  className="flex-shrink-0 transition-all duration-200"
                  style={{
                    color: active ? 'var(--brand-primary)' : 'inherit',
                    transform: active ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  {isCollapsed ? (
                    <span className="text-xl">{item.emoji}</span>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div 
                      className="font-semibold text-sm"
                      style={{ color: active ? 'var(--brand-primary)' : 'inherit' }}
                    >
                      {item.name}
                    </div>
                  </div>
                )}
                
                {active && !isCollapsed && (
                  <div 
                    className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" 
                    style={{ background: 'var(--brand-primary)' }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3">
          {!isCollapsed ? (
            <div className="space-y-2">
              <Link
                href="/settings"
                className="flex items-center gap-3 w-full p-2.5 rounded-lg transition-all duration-200 text-sm font-medium group"
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
                <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-200" />
                Configuración
              </Link>
              <button 
                className="flex items-center gap-3 w-full p-2.5 rounded-lg transition-all duration-200 text-sm font-medium group"
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
                <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/settings"
                className="flex items-center justify-center w-full p-2.5 rounded-lg transition-all duration-200 icon-hover"
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
                <Settings className="w-4 h-4" />
              </Link>
              <button 
                className="flex items-center justify-center w-full p-2.5 rounded-lg transition-all duration-200 icon-hover"
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
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;