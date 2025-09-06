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
      name: 'Insights y Analytics',
      href: '/analytics',
      icon: BarChart3,
      emoji: '📊',
      description: 'Análisis y reportes avanzados'
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
      <div className={`fixed top-0 left-0 h-full bg-white shadow-xl border-r border-gray-100 z-50 transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900 text-lg">Nexus Studio</h1>
                <p className="text-xs text-gray-500 font-medium">Venture Studio</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            {/* Collapse button (desktop) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 icon-hover"
            >
              <ChevronLeft className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                isCollapsed ? 'rotate-180' : ''
              }`} />
            </button>
            
            {/* Close button (mobile) */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 icon-hover"
            >
              <X className="w-4 h-4 text-gray-600" />
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
                className={`stagger-item flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative ${
                  active
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Active indicator */}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full"></div>
                )}
                
                <div className={`flex-shrink-0 transition-all duration-200 ${
                  active ? 'text-blue-600 scale-110' : 'text-gray-500 group-hover:text-gray-700 group-hover:scale-105'
                }`}>
                  {isCollapsed ? (
                    <span className="text-xl">{item.emoji}</span>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold text-sm ${active ? 'text-blue-900' : 'group-hover:text-gray-900'}`}>
                      {item.name}
                    </div>
                    <div className={`text-xs mt-0.5 font-medium ${
                      active ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-600'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                )}
                
                {active && !isCollapsed && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100">
          {!isCollapsed ? (
            <div className="space-y-2">
              <button className="flex items-center gap-3 w-full p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 text-sm font-medium group">
                <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-200" />
                Configuración
              </button>
              <button className="flex items-center gap-3 w-full p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium group">
                <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button 
                className="flex items-center justify-center w-full p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 icon-hover"
                title="Configuración"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button 
                className="flex items-center justify-center w-full p-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 icon-hover"
                title="Cerrar Sesión"
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