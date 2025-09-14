'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, Bell, Search, User, HelpCircle, LogOut, X, CheckCircle } from 'lucide-react';
import UserManualModal from '../help/UserManualModal';

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
  subtitle?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

const Header = ({ onMenuClick, title, subtitle }: HeaderProps) => {
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

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

  // Initialize notifications with mock data
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Nueva startup aprobada',
        message: 'TechFlow ha sido aprobada para el programa de aceleración',
        type: 'success',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: false
      },
      {
        id: '2',
        title: 'Reunión programada',
        message: 'Reunión de seguimiento con InnovateLab mañana a las 10:00',
        type: 'info',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        read: false
      },
      {
        id: '3',
        title: 'Meta de financiamiento alcanzada',
        message: 'StartupX ha alcanzado el 80% de su meta de financiamiento',
        type: 'warning',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: true
      }
    ];
    setNotifications(mockNotifications);
  }, []);

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
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showUserMenu || showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu, showNotifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <Bell className="w-4 h-4 text-yellow-500" />;
      case 'error': return <X className="w-4 h-4 text-red-500" />;
      default: return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <UserManualModal 
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
      />
    
      <header 
        className="px-4 sm:px-6 py-3 flex items-center justify-between backdrop-blur-lg border-b transition-all duration-300"
        style={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          borderColor: 'var(--border)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)'
        }}
      >
      {/* Left side - Menu button and title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 rounded-xl transition-all duration-200 hover:scale-105"
          style={{ 
            color: 'var(--text-secondary)',
            background: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--surface-hover)';
            e.target.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'var(--text-secondary)';
          }}
        >
          <Menu className="w-5 h-5 drop-shadow-sm" />
        </button>
        
        {title && (
          <div className="ml-2 lg:ml-0">
            <h1 
              className="text-lg sm:text-xl font-bold tracking-tight transition-colors duration-200"
              style={{ color: 'var(--text-primary)' }}
            >
              {title.replace(/[🏠💰📊🎯👥📚🚀]/g, '').trim()}
            </h1>
            {subtitle && (
              <p 
                className="text-sm font-medium mt-0.5 transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
              >
                {subtitle.replace(/[🏠💰📊🎯👥📚🚀]/g, '').trim()}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right side - Search and user actions */}
      <div className="flex items-center gap-2">
        {/* Search button (mobile) */}
        <button 
          className="p-2.5 rounded-xl transition-all duration-200 hover:scale-105 sm:hidden"
          style={{ 
            color: 'var(--text-secondary)',
            background: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--surface-hover)';
            e.target.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'var(--text-secondary)';
          }}
        >
          <Search className="w-5 h-5 drop-shadow-sm" />
        </button>

        {/* Search bar (desktop) */}
        <div className="hidden md:flex items-center">
          <div className="relative group">
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 group-focus-within:scale-110 drop-shadow-sm" 
              style={{ color: 'var(--text-secondary)' }}
            />
            <input
              type="text"
              placeholder="Buscar en Nexus Studio..."
              className="pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-200 w-64 lg:w-80 font-medium text-sm shadow-sm hover:shadow-md focus:shadow-lg backdrop-blur-sm"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
                '::placeholder': { color: 'var(--text-secondary)' }
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--brand-primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                e.target.style.background = 'var(--surface)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                e.target.style.background = 'var(--surface)';
              }}
            />
          </div>
        </div>

        {/* Help button */}
        <button 
          onClick={() => setIsManualOpen(true)}
          className="p-2.5 rounded-xl"
          title="Manual de Usuario"
          style={{ 
            color: 'var(--text-secondary)',
            background: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--surface-hover)';
            e.target.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = 'var(--text-secondary)';
          }}
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 rounded-xl relative"
            style={{ 
              color: 'var(--text-secondary)',
              background: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--surface-hover)';
              e.target.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'var(--text-secondary)';
            }}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <div 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
              >
                <span className="text-xs text-white font-bold">{unreadCount}</span>
              </div>
            )}
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div 
              className="absolute right-0 mt-3 w-80 rounded-2xl shadow-xl border z-20 backdrop-blur-lg max-h-96 overflow-hidden"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
            >
              {/* Header */}
              <div 
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{ borderColor: 'var(--border)' }}
              >
                <h3 
                  className="font-semibold text-sm"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Notificaciones
                </h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs px-2 py-1 rounded-lg"
                    style={{ 
                      color: 'var(--brand-primary)',
                      background: 'var(--brand-primary-light)'
                    }}
                  >
                    Marcar todo como leído
                  </button>
                )}
              </div>

              {/* Notifications list */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center">
                    <Bell 
                      className="w-8 h-8 mx-auto mb-2"
                      style={{ color: 'var(--text-tertiary)' }}
                    />
                    <p 
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      No hay notificaciones
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 border-b last:border-b-0 hover:bg-opacity-50"
                      style={{ 
                        borderColor: 'var(--border)',
                        background: notification.read ? 'transparent' : 'var(--brand-primary-light)'
                      }}
                      onMouseEnter={(e) => {
                        if (notification.read) {
                          e.target.style.background = 'var(--surface-hover)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (notification.read) {
                          e.target.style.background = 'transparent';
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div 
                          className="flex-1 min-w-0 cursor-pointer"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <p 
                            className="text-sm font-medium"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {notification.title}
                          </p>
                          <p 
                            className="text-xs mt-1"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {notification.message}
                          </p>
                          <p 
                            className="text-xs mt-1"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="flex-shrink-0 p-1 rounded-lg hover:bg-red-100"
                          style={{ color: 'var(--text-tertiary)' }}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative" ref={userMenuRef}>
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-2 rounded-xl"
            style={{ 
              background: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--surface-hover)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-primary-dark))',
                opacity: 1,
                visibility: 'visible'
              }}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.querySelector('.fallback-avatar').style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className="fallback-avatar w-full h-full flex items-center justify-center text-white font-bold text-sm"
                style={{
                  display: user?.avatar ? 'none' : 'flex',
                  background: 'inherit'
                }}
              >
                {user?.name
                  ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
                  : user?.email
                    ? user.email.substring(0, 2).toUpperCase()
                    : 'US'
                }
              </div>
            </div>
            <span 
              className="hidden sm:block text-sm font-bold"
              style={{ 
                color: 'var(--text-primary)',
                opacity: 1,
                visibility: 'visible'
              }}
            >
              {user?.name || user?.email || 'Usuario'}
            </span>
          </button>

          {/* User dropdown menu */}
          {showUserMenu && (
            <div 
              className="absolute right-0 mt-3 w-56 rounded-2xl shadow-xl border z-20 py-2 backdrop-blur-lg"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
            >
                <div 
                  className="px-4 py-3 border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <p 
                    className="text-sm font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {user?.name || user?.email || 'Usuario'}
                  </p>
                  <p 
                    className="text-xs font-medium mt-0.5"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {user?.email || 'usuario@email.com'}
                  </p>
                </div>
                
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2.5 text-sm flex items-center gap-3 transition-all duration-200 rounded-xl font-medium hover:scale-[1.02]"
                    style={{ color: 'var(--text-primary)' }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--error-bg)';
                      e.target.style.color = 'var(--error)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = 'var(--text-primary)';
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                      style={{ background: 'var(--error-bg)' }}
                    >
                      <LogOut 
                        className="w-4 h-4 drop-shadow-sm" 
                        style={{ color: 'var(--error)' }}
                      />
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