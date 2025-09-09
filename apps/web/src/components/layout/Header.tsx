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
      className="px-3 sm:px-4 py-3 flex items-center justify-between"
      style={{ 
        background: 'var(--surface)',
        borderBottom: '1px solid var(--separator)'
      }}
    >
      {/* Left side - Menu button and title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => e.target.style.background = 'var(--surface-hover)'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {title && (
          <div>
            <h1 className="text-base sm:text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h1>
            {subtitle && (
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
            )}
          </div>
        )}
      </div>

      {/* Right side - Search and user actions */}
      <div className="flex items-center gap-3">
        {/* Search button (mobile) */}
        <button 
          className="p-2 rounded-lg transition-colors sm:hidden"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => e.target.style.background = 'var(--surface-hover)'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}
        >
          <Search className="w-5 h-5" />
        </button>

        {/* Search bar (desktop) */}
        <div className="hidden md:flex items-center">
          <div className="relative">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" 
              style={{ color: 'var(--text-tertiary)' }}
            />
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-2 rounded-lg focus:outline-none w-48 lg:w-64 transition-all duration-200"
              style={{ 
                background: 'var(--surface-secondary)',
                border: 'none',
                color: 'var(--text-primary)',
                '::placeholder': { color: 'var(--text-tertiary)' }
              }}
              onFocus={(e) => {
                e.target.style.background = 'var(--surface)';
                e.target.style.boxShadow = 'var(--shadow-sm)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'var(--surface-secondary)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Help button */}
        <button 
          onClick={() => setIsManualOpen(true)}
          className="p-2 rounded-lg transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => e.target.style.background = 'var(--surface-hover)'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}
          title="Manual de Usuario"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button 
          className="p-2 rounded-lg transition-colors relative"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => e.target.style.background = 'var(--surface-hover)'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}
        >
          <Bell className="w-5 h-5" />
          <div 
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center"
            style={{ background: 'var(--error)' }}
          >
            <span className="text-xs text-white font-medium">3</span>
          </div>
        </button>

        {/* User menu */}
        <div className="relative" ref={userMenuRef}>
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 rounded-lg transition-colors"
            onMouseEnter={(e) => (e.target as HTMLElement).style.background = 'var(--surface-hover)'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.background = 'transparent'}
          >
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ 
                background: 'var(--brand-primary-light)',
                color: 'var(--brand-primary)'
              }}
            >
              <User className="w-4 h-4" />
            </div>
            <span 
              className="hidden sm:block text-sm font-medium" 
              style={{ color: 'var(--text-secondary)' }}
            >
              {user?.name || user?.email || 'Usuario'}
            </span>
          </button>

          {/* User dropdown menu */}
          {showUserMenu && (
            <div 
                className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-20 py-1"
                style={{ 
                  background: 'var(--surface)',
                  border: '1px solid var(--separator)'
                }}
              >
                <div className="px-4 py-2 border-b" style={{ borderColor: 'var(--separator)' }}>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {user?.name || user?.email || 'Usuario'}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {user?.email || 'usuario@email.com'}
                  </p>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.background = 'var(--surface-hover)';
                    (e.target as HTMLElement).style.color = 'var(--error)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.background = 'transparent';
                    (e.target as HTMLElement).style.color = 'var(--text-secondary)';
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </div>
          )}
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;