import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { ECellLogo } from '../components/ui/ECellLogo';
import { ArrowRight, Lock, Mail, ShieldCheck, Check, Terminal } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('aarav.m@ecell.iitb.ac.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleGoogleMock = async () => {
    setIsLoading(true);
    await login('founder.google@ecell.ac.in');
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex bg-canvas relative overflow-hidden select-none">
      {/* Background terminal grid */}
      <div className="absolute inset-0 terminal-grid opacity-30 pointer-events-none" />

      {/* Subtle Awwwards Ambient Radial Illumination */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-subtle rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-amber-subtle rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full flex flex-col lg:flex-row max-w-7xl mx-auto px-6 py-12 relative z-10 my-auto items-center">
        {/* Left Side: E-Cell branding and statements with Awwwards-style staggered reveal */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-1/2 flex flex-col justify-center pr-0 lg:pr-14 mb-12 lg:mb-0"
        >
          <div className="mb-8">
            <ECellLogo size="lg" />
          </div>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface-secondary border border-surface-borderHighlight text-teal-bright text-[11px] font-mono mb-6 w-fit">
            <Terminal className="w-3.5 h-3.5" />
            <span>VENTURE TERMINAL • INSTITUTIONAL PROTOCOL v2.4</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold font-display text-ink-primary tracking-tight leading-[1.08] mb-6">
            Practice before the{' '}
            <span className="text-teal-bright">real pitch.</span>
          </h1>

          <p className="text-ink-secondary text-base sm:text-lg leading-relaxed max-w-xl mb-8 font-normal">
            An AI-powered investor simulator designed to help you become pitch ready.
            Defend your unit economics, answer probing cross-examination from calibrated VC partners, and refine your pitch delivery in a high-stakes 3D virtual boardroom.
          </p>

          <div className="space-y-3 border-t border-surface-border pt-6">
            <div className="flex items-center gap-3 text-ink-secondary text-sm">
              <div className="w-4 h-4 rounded-sm bg-teal-subtle text-teal-bright flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>Real-time 3D investor avatar responsive to voice telemetry</span>
            </div>
            <div className="flex items-center gap-3 text-ink-secondary text-sm">
              <div className="w-4 h-4 rounded-sm bg-teal-subtle text-teal-bright flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>Calibrated investor models: Analytical VC, Angel, Shark, and Corporate</span>
            </div>
            <div className="flex items-center gap-3 text-ink-secondary text-sm">
              <div className="w-4 h-4 rounded-sm bg-teal-subtle text-teal-bright flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span>Objective post-pitch debrief across delivery, thesis, and objection handling</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Login Card with subtle hover depth */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-1/2 flex items-center justify-center w-full"
        >
          <div className="w-full max-w-md terminal-card rounded-xl p-8 sm:p-10 shadow-terminal relative">
            <div className="mb-6">
              <div className="text-[11px] font-mono uppercase tracking-widest text-teal-bright mb-1">
                Security Gateway
              </div>
              <h2 className="text-2xl font-semibold font-display text-ink-primary tracking-tight">
                Founder Portal Access
              </h2>
              <p className="text-xs text-ink-muted mt-1">
                Enter with your college incubator or partner credentials
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1.5 font-mono">
                  College / Institutional Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="founder@ecell.college.edu"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg terminal-input text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-ink-secondary font-mono">
                    Password
                  </label>
                  <span className="text-[10px] text-teal-bright/80 font-mono">
                    Mock mode enabled
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg terminal-input text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg bg-teal hover:bg-teal-active text-ink-primary font-medium text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60 shadow-sm mt-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-ink-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter Pitch Room</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-surface-border" />
              </div>
              <span className="relative px-3 bg-surface-secondary text-[10px] uppercase tracking-wider text-ink-muted font-mono">
                or sign in with
              </span>
            </div>

            <button
              onClick={handleGoogleMock}
              type="button"
              className="w-full py-2.5 px-4 rounded-lg border border-surface-borderHighlight bg-canvas hover:bg-surface text-ink-secondary hover:text-ink-primary text-xs font-medium transition-all flex items-center justify-center gap-2.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.7 0 3 .7 3.7 1.3l2.8-2.8C16.8 2 14.6 1.2 12 1.2 7.7 1.2 4.1 3.7 2.4 7.2l3.4 2.6C6.6 7.3 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.6 2.8c2.1-2 3.8-5 3.8-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.8 14.8c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3L2.4 7.6C1.5 9.3 1 11.1 1 13.1s.5 3.8 1.4 5.5l3.4-2.8z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.6-2.8c-1.1.7-2.5 1.2-4.4 1.2-3 0-5.4-2.3-6.2-5.3L2.4 15.9C4.1 19.4 7.7 23 12 23z"
                />
              </svg>
              Continue with Institutional Workspace
            </button>

            <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-center gap-2 text-[10px] text-ink-muted font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-bright" />
              <span>TLS 1.3 Encrypted Diligence Pipeline</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
