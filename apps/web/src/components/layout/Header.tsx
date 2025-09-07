'use client';

import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
  subtitle?: string;
}

const Header = ({ onMenuClick, title, subtitle }: HeaderProps) => {
  return (
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
        <button 
          className="flex items-center gap-2 p-2 rounded-lg transition-colors"
          onMouseEnter={(e) => e.target.style.background = 'var(--surface-hover)'}
          onMouseLeave={(e) => e.target.style.background = 'transparent'}
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
            Admin
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;