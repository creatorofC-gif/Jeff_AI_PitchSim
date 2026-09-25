import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { TerminalMotionBackground } from '../ui/TerminalMotionBackground';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface antialiased relative">
      <TerminalMotionBackground />
      <Navbar />
      <main className="flex-1 flex flex-col pt-16 relative z-10">
        <Outlet />
      </main>
      <footer className="w-full border-t border-surface-container-high/40 py-6 text-[11px] font-mono text-outline relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>E-CELL PITCH SIMULATOR • INSTITUTIONAL GRADE RUNTIME</span>
          <span>AUDIO TELEMETRY ACTIVE • © 2025 ALL RIGHTS RESERVED</span>
        </div>
      </footer>
    </div>
  );
};
