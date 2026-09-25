import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import {
  User,
  School,
  Award,
  CheckCircle,
  Save,
  Terminal,
  ShieldCheck
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const [name, setName] = useState(user.name);
  const [college, setCollege] = useState(user.college);
  const [cohort, setCohort] = useState(user.cohort);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, college, cohort });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-secondary border border-surface-borderHighlight text-teal-bright text-[11px] font-mono mb-2">
          <Terminal className="w-3.5 h-3.5" />
          <span>FOUNDER DOSSIER • INCUBATOR REGISTRY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold font-display text-ink-primary tracking-tight">
          Founder Profile
        </h1>
        <p className="text-ink-secondary text-xs sm:text-sm mt-1">
          Manage your incubator affiliation, cohort standing, and verified diligence badges.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Col: Avatar & Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="terminal-card rounded-xl p-5 border border-surface-borderHighlight text-center space-y-4"
        >
          <div className="relative w-24 h-24 mx-auto">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1WTh_RpVRvuoar4nTknqFCvugGVfgoZA14bxlwNZYhKyE48wEE0GAyEIEgFJcpGhcd-QaxcX4JZhccLtdUSaiSo9SXF6krr-CymIZ89Jr2DsuT5W0NqohkWXO9sIzuXOu_hTAfUuUTkzdcjfXtSioVyvOdExSwtkHmaHQ4XhgtpTNKGsAxQ-1TSoCOKEz15cUEq-_1udo4VQjkZbnsKUHY5Dxylai9_7dycuCLu-RV9Nee8AISJl_gKdS6H"
              alt={user.name}
              className="w-full h-full rounded-xl object-cover border border-teal-border shadow-terminal"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-status-success border-2 border-canvas flex items-center justify-center text-canvas">
              <CheckCircle className="w-3 h-3 stroke-[3]" />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-ink-primary font-display">{user.name}</h2>
            <p className="text-[11px] text-ink-muted font-mono mt-0.5">{user.email}</p>
          </div>

          <div className="p-3 rounded-lg bg-surface border border-surface-border text-left space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-ink-muted font-mono">Total Pitches:</span>
              <span className="text-ink-primary font-mono font-semibold">{user.totalPitches}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-ink-muted font-mono">Avg. Readiness:</span>
              <span className="text-teal-bright font-mono font-semibold">{user.averageScore}%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-ink-muted font-mono">Cohort Status:</span>
              <span className="text-status-success font-mono font-semibold">Active Fellow</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-[10px] font-mono text-ink-muted uppercase tracking-wider mb-2">
              Verified Badges
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-teal-subtle text-teal-bright border border-teal-border">
                Unit Economics Master
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-surface-elevated text-ink-secondary border border-surface-border">
                Paced Orator
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-amber-subtle text-amber-bright border border-amber-border">
                Shark Rebuttal Verified
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right 2 Cols: Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2 terminal-card rounded-xl p-6 border border-surface-borderHighlight"
        >
          <h3 className="text-xs font-mono uppercase tracking-wider text-ink-primary font-semibold mb-5 pb-3 border-b border-surface-border">
            Incubator Credentials
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-ink-secondary mb-1">
                Founder Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-muted">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg terminal-input text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-ink-secondary mb-1">
                College / Entrepreneurship Cell
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-muted">
                  <School className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg terminal-input text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-ink-secondary mb-1">
                Incubation Cohort / Fellowship Track
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink-muted">
                  <Award className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={cohort}
                  onChange={(e) => setCohort(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg terminal-input text-xs"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-surface-border">
              <span className="text-[10px] text-ink-muted font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-bright" />
                E-Cell Registry Synchronization Active
              </span>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-teal hover:bg-teal-active text-ink-primary font-medium text-xs shadow-sm transition-all flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                {saved ? 'Changes Saved!' : 'Save Profile'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
