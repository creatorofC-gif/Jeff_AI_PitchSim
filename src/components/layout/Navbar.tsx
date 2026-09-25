import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isPitchRoom = location.pathname.includes('/room');
  if (isPitchRoom) return null;

  return (
    <header className="fixed top-0 w-full z-50 bg-[#121315]/85 backdrop-blur-xl border-b border-[#292a2b]/50">
      <div className="h-16 max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(68,226,205,0.6)]" />
            <span className="font-display text-sm tracking-tight text-primary font-medium group-hover:text-secondary transition-colors">
              E-Cell Pitch Simulator
            </span>
          </Link>

          {/* Centered Pill Nav */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-surface-container-lowest/80 rounded-full border border-surface-container-high/40 text-xs">
            <Link
              to="/dashboard"
              className={`px-3.5 py-1.5 rounded-full transition-colors ${
                location.pathname === '/dashboard'
                  ? 'bg-surface-container-high text-primary font-medium'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/session/new"
              className={`px-3.5 py-1.5 rounded-full transition-colors ${
                location.pathname.startsWith('/session') && !location.pathname.includes('/report')
                  ? 'bg-surface-container-high text-primary font-medium'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50'
              }`}
            >
              Pitch Room
            </Link>
            <Link
              to="/history"
              className={`px-3.5 py-1.5 rounded-full transition-colors ${
                location.pathname === '/history'
                  ? 'bg-surface-container-high text-primary font-medium'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50'
              }`}
            >
              Session History
            </Link>
            <Link
              to="/session/session-healt-891/report"
              className={`px-3.5 py-1.5 rounded-full transition-colors ${
                location.pathname.includes('/report')
                  ? 'bg-surface-container-high text-primary font-medium'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50'
              }`}
            >
              Reports
            </Link>
          </nav>
        </div>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 border border-surface-container-high/30">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="font-mono text-[10px] uppercase text-on-surface-variant tracking-wider">
              Ready
            </span>
          </div>

          <button
            onClick={() => navigate('/session/new')}
            type="button"
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-primary text-on-primary text-xs font-medium hover:bg-primary-fixed transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Pitch</span>
          </button>

          <Link to="/profile" className="flex items-center">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-surface-container-high hover:border-secondary transition-colors"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WTh_RpVRvuoar4nTknqFCvugGVfgoZA14bxlwNZYhKyE48wEE0GAyEIEgFJcpGhcd-QaxcX4JZhccLtdUSaiSo9SXF6krr-CymIZ89Jr2DsuT5W0NqohkWXO9sIzuXOu_hTAfUuUTkzdcjfXtSioVyvOdExSwtkHmaHQ4XhgtpTNKGsAxQ-1TSoCOKEz15cUEq-_1udo4VQjkZbnsKUHY5Dxylai9_7dycuCLu-RV9Nee8AISJl_gKdS6H"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};
