'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AIAssistantPanel from '../ai/AIAssistantPanel';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const Layout = ({ children, title, subtitle }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

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

  const handleAIAssistantToggle = () => {
    setAiAssistantOpen(!aiAssistantOpen);
  };

  const handleAIAssistantClose = () => {
    setAiAssistantOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
        onAIAssistantToggle={handleAIAssistantToggle}
      />

      {/* Main content area */}
      <div className="lg:pl-[288px] transition-all duration-300 ease-out">
        {/* Header */}
        <Header 
          onMenuClick={handleMenuClick}
          title={title}
          subtitle={subtitle}
        />

        {/* Page content */}
        <main className="min-h-screen">
          {children}
        </main>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel
        isOpen={aiAssistantOpen}
        onClose={handleAIAssistantClose}
      />
    </div>
  );
};

export default Layout;