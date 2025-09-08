'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const Layout = ({ children, title, subtitle }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={handleSidebarClose}
      />

      {/* Main content area */}
      <div className="lg:pl-[280px] transition-all duration-300 ease-out">
        {/* Header */}
        <Header 
          onMenuClick={handleMenuClick}
          title={title}
          subtitle={subtitle}
        />

        {/* Page content */}
        <main className="min-h-screen">
          <div className="relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}></div>
            
            {/* Content */}
            <div className="relative">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;