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
      href: '/insights',
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
      <div className={`fixed top-0 left-0 h-full bg-white shadow-xl border-r border-gray-200 z-50 transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">Nexus Studio</h1>
                <p className="text-xs text-gray-600">Venture Studio</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-1">
            {/* Collapse button (desktop) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className={`w-4 h-4 text-gray-600 transition-transform ${
                isCollapsed ? 'rotate-180' : ''
              }`} />
            </button>
            
            {/* Close button (mobile) */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigationItems.map((item) => {
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
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${
                  active
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`flex-shrink-0 ${active ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`}>
                  {isCollapsed ? (
                    <span className="text-lg">{item.emoji}</span>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium text-sm ${active ? 'text-blue-900' : ''}`}>
                      {item.name}
                    </div>
                    <div className={`text-xs mt-0.5 ${
                      active ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                )}
                
                {active && !isCollapsed && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          {!isCollapsed ? (
            <div className="space-y-1">
              <button className="flex items-center gap-3 w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                <Settings className="w-4 h-4" />
                Configuración
              </button>
              <button className="flex items-center gap-3 w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors text-sm">
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <button className="flex items-center justify-center w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
              </button>
              <button className="flex items-center justify-center w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
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