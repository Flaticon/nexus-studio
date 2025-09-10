'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, Bell, Search, User, HelpCircle, LogOut } from 'lucide-react';
import UserManualModal from '../help/UserManualModal';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
  subtitle?: string;
}

const Header = ({ onMenuClick, title, subtitle }: HeaderProps) => {
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState<any>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      // Clear local storage/session storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Call logout endpoint if available
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
      // Still redirect even if API call fails
      window.location.href = '/login';
    }
  };

  // Simple user state management
  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <>
      <UserManualModal 
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
      />
    
      <header 
      className="px-4 sm:px-6 py-4 flex items-center justify-between bg-white shadow-sm border-b border-gray-100 backdrop-blur-md bg-white/95"
    >
      {/* Left side - Menu button and title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl transition-all duration-200 hover:bg-gray-100 hover:scale-105 text-gray-600 hover:text-gray-800"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {title && (
          <div className="ml-2 lg:ml-0">
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900">
              {title.replace(/[🏠💰📊🎯👥📚]/g, '').trim()}
            </h1>
            {subtitle && (
              <p className="text-sm font-medium text-gray-600 mt-0.5">
                {subtitle.replace(/[🏠💰📊🎯👥📚]/g, '').trim()}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right side - Search and user actions */}
      <div className="flex items-center gap-3">
        {/* Search button (mobile) */}
        <button 
          className="p-2 rounded-xl transition-all duration-200 hover:bg-gray-100 hover:scale-105 text-gray-600 hover:text-gray-800 sm:hidden"
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Search bar (desktop) */}
        <div className="hidden md:flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en Nexus Studio..."
              className="pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white w-64 lg:w-80 transition-all duration-200 text-gray-900 placeholder-gray-500 font-medium"
            />
          </div>
        </div>

        {/* Help button */}
        <button 
          onClick={() => setIsManualOpen(true)}
          className="p-2 rounded-xl transition-all duration-200 hover:bg-gray-100 hover:scale-105 text-gray-600 hover:text-gray-800"
          title="Manual de Usuario"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button 
          className="p-2 rounded-xl transition-all duration-200 hover:bg-gray-100 hover:scale-105 text-gray-600 hover:text-gray-800 relative"
        >
          <Bell className="w-5 h-5" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-xs text-white font-bold">3</span>
          </div>
        </button>

        {/* User menu */}
        <div className="relative" ref={userMenuRef}>
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-2 rounded-xl transition-all duration-200 hover:bg-gray-100 hover:scale-105"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:block text-sm font-bold text-gray-700">
              {user?.name || user?.email || 'Usuario'}
            </span>
          </button>

          {/* User dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 py-2 backdrop-blur-lg">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-900">
                    {user?.name || user?.email || 'Usuario'}
                  </p>
                  <p className="text-xs font-medium text-gray-600 mt-0.5">
                    {user?.email || 'usuario@email.com'}
                  </p>
                </div>
                
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2.5 text-sm flex items-center gap-3 transition-all duration-200 rounded-xl hover:bg-red-50 hover:text-red-600 text-gray-700 font-medium"
                  >
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <LogOut className="w-4 h-4 text-red-600" />
                    </div>
                    Cerrar sesión
                  </button>
                </div>
              </div>
          )}
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;