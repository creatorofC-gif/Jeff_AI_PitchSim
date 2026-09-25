import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Layers,
  Shield,
  Clock,
  Brain
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleStartPitch = () => {
    navigate('/session/new');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-8 space-y-12">
      {/* Editorial Stage Anchor with Awwwards Smooth Entrance */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="pt-2 md:pt-4 flex flex-col items-start max-w-3xl"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(68,226,205,0.6)]" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-outline">
            E-CELL INCUBATOR • EXECUTIVE RUNTIME
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] text-primary tracking-tight font-normal leading-[1.1] mb-4">
          Master your pitch before meeting real investors.
        </h1>

        <p className="text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed mb-6 font-normal">
          Simulate confidential partner meetings. Test your unit economics, defensibility, and founder conviction under simulated venture pressure.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={handleStartPitch}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-on-primary font-medium text-xs sm:text-sm hover:bg-primary-fixed transition-all hover:scale-[1.01] active:scale-[0.98] shadow-sm"
          >
            Start Pitch Session
          </button>
          <Link
            to="/session/session-healt-891/report"
            className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary font-medium text-xs sm:text-sm transition-colors group"
          >
            <span>Review latest report</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </motion.section>

      {/* Visual Anchor / Active Session Telemetry Preview (Centerpiece) */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div className="relative w-full rounded-xl overflow-hidden bg-surface-container-lowest border border-surface-container-high/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Synthetic Partner Viewport */}
            <div className="lg:col-span-8 relative min-h-[360px] md:min-h-[420px] flex flex-col justify-between p-6 bg-surface-container-low">
              <img
                alt="Monochromatic cinema still portrait of an analytical venture capital partner sitting in a dim acoustic studio room with architectural minimal paneling"
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiN8YrqINfBgVO3m0m3MFJacoHTGufOwip0ljLwXnyADVAqWVCNeDsJgTZ8CiHhQVPKL_76pPZPZVOv_Mqh7Gn5BIWt3W1Kn4eBz8hed46bC6AxLuUEIt1oqyWFru7kzerWFtPkYDSrctpTeQfLAfIEBHIUZOLxAStE2270ISgexfD5Vdrr1HfUqBJJ30FrjuZrnPWYyOU5p2OEWRFnjM02vcNyoKPN4gj6VVQ0fdM9q9L-iTIyXvK4A"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-surface-container-lowest/60 pointer-events-none" />

              {/* Acoustic HUD Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md border border-surface-container-high/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  <span className="font-mono text-[10px] uppercase text-primary tracking-wider">
                    Simulated Room • Benchmark Alpha
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase text-outline tracking-wider">
                  AUDIO SAMPLING 48kHz
                </span>
              </div>

              {/* Real-time Voice Cadence Vector */}
              <div className="relative z-10 mt-auto pt-10">
                <div className="flex items-end justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase text-outline">
                      Active Cadence Stress:
                    </span>
                    <span className="font-mono text-[10px] text-secondary uppercase font-medium">
                      Controlled
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-on-surface-variant">
                    138 WPM • Pitch Stability 94%
                  </span>
                </div>
                <div className="w-full h-12 bg-surface-container-lowest/70 rounded-lg p-2 flex items-center backdrop-blur-sm border border-surface-container-high/30">
                  <svg className="w-full h-full text-secondary" fill="none" preserveAspectRatio="none" viewBox="0 0 400 32">
                    <path
                      d="M0,16 Q10,14 20,16 T40,16 T60,8 T80,24 T100,12 T120,20 T140,16 T160,5 T180,27 T200,16 T220,14 T240,18 T260,7 T280,25 T300,16 T320,13 T340,19 T360,10 T380,22 L400,16"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Synthetic Prompt & Partner Interruption Rail */}
            <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-surface-container border-l border-surface-container-high/40">
              <div className="space-y-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-outline block">
                  Simulated Interruption Engine
                </span>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-medium text-primary leading-snug">
                    "What is your defensible retention after Month 6?"
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Evaluates your ability to decouple CAC inflation from cohort renewal strength.
                  </p>
                </div>
              </div>

              <div className="pt-6 space-y-2 border-t border-surface-container-high/30">
                <div className="flex items-center justify-between text-outline font-mono text-[10px]">
                  <span>SUGGESTED RESPONSE FRAMING</span>
                  <span>03:45 MAX</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-container-high text-on-surface text-xs leading-relaxed border border-surface-container-highest/40">
                  State net revenue retention first. Then break out expansion ARR via usage-based tier shifts.
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Two Key Signals (Readiness Score & Calibrated Opponent) */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Metric 1: Readiness Score */}
        <div className="p-7 rounded-xl bg-surface-container-low border border-surface-container-high/40 shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-outline">
              Readiness Score
            </span>
            <div className="flex items-baseline gap-2 mt-2 mb-3">
              <span className="font-display text-5xl font-light text-primary tracking-tighter">84</span>
              <span className="font-display text-xl text-outline font-light">/100</span>
            </div>
            <h2 className="font-display text-base font-medium text-primary mb-1.5">
              Overall Investor Readiness
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-md">
              Strong narrative cohesion and defensibility moat; unit economics require tighter framing around non-organic payback periods.
            </p>
          </div>
          <div className="pt-4 mt-6 flex items-center justify-between font-mono text-[10px] text-outline border-t border-surface-container-high/30">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span>TOP 5% OF SEED FOUNDERS</span>
            </div>
            <span className="text-primary font-medium">+6 PTS VS LAST ATTEMPT</span>
          </div>
        </div>

        {/* Metric 2: Partner Archetype */}
        <div className="p-7 rounded-xl bg-surface-container-low border border-surface-container-high/40 shadow-sm flex flex-col justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-outline">
              Calibrated Opponent
            </span>
            <div className="flex items-center gap-2.5 mt-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-surface-container-high flex items-center justify-center text-secondary border border-surface-container-highest">
                <Brain className="w-4 h-4" />
              </div>
              <span className="font-display text-lg font-medium text-primary tracking-tight">
                Tier-1 Venture Partner
              </span>
            </div>
            <h2 className="font-display text-base font-medium text-primary mb-1.5">
              Analytical & Skeptical
            </h2>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-md">
              Interrogates go-to-market mechanics, gross margin compression, and customer concentration before examining product mockups.
            </p>
          </div>
          <div className="pt-4 mt-6 flex items-center justify-between font-mono text-[10px] text-outline border-t border-surface-container-high/30">
            <span>TOLERANCE THRESHOLD: ZERO FLUFF</span>
            <span className="text-secondary font-medium tracking-wide">SESSION READY</span>
          </div>
        </div>
      </motion.section>

      {/* Quick Practice Modes */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between pb-1 border-b border-surface-container-high/30">
          <div>
            <span className="font-mono text-[10px] uppercase text-outline tracking-wider block">
              Rehearsal Configurations
            </span>
            <h2 className="font-display text-lg text-primary font-medium tracking-tight">
              Quick Practice Modes
            </h2>
          </div>
          <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
            3 Protocols Configured
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mode 1 */}
          <div
            onClick={handleStartPitch}
            className="p-5 rounded-xl bg-surface-container-low border border-surface-container-high/40 hover:border-surface-container-highest transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-outline mb-3 font-mono text-[10px]">
                <span>10 MIN</span>
                <Zap className="w-3.5 h-3.5 text-secondary" />
              </div>
              <h3 className="font-display text-sm font-medium text-primary mb-1 group-hover:text-secondary transition-colors">
                Quick Defense
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                Rapid pressure-test on your core thesis, burn rate runout, and immediate competitive vulnerabilities.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-surface-container-high/30 text-[11px] font-mono text-outline group-hover:text-primary transition-colors">
              <span>START RAPID SPRINT</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Mode 2 */}
          <div
            onClick={handleStartPitch}
            className="p-5 rounded-xl bg-surface-container-low border border-surface-container-high/40 hover:border-surface-container-highest transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-outline mb-3 font-mono text-[10px]">
                <span>15 MIN</span>
                <Layers className="w-3.5 h-3.5 text-secondary" />
              </div>
              <h3 className="font-display text-sm font-medium text-primary mb-1 group-hover:text-secondary transition-colors">
                Standard Seed Round
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                Full investor deck walk-through with unscripted follow-up interruptions at critical pitch junctions.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-surface-container-high/30 text-[11px] font-mono text-outline group-hover:text-primary transition-colors">
              <span>START DECK RUN</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Mode 3 */}
          <div
            onClick={handleStartPitch}
            className="p-5 rounded-xl bg-surface-container-low border border-surface-container-high/40 hover:border-surface-container-highest transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-outline mb-3 font-mono text-[10px]">
                <span>25 MIN</span>
                <Shield className="w-3.5 h-3.5 text-secondary" />
              </div>
              <h3 className="font-display text-sm font-medium text-primary mb-1 group-hover:text-secondary transition-colors">
                Partner Meeting
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                Deep-dive technical defensibility, enterprise sales cycle friction, moat architecture, and terminal risks.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-surface-container-high/30 text-[11px] font-mono text-outline group-hover:text-primary transition-colors">
              <span>START PARTNER RUN</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Telemetry Log / Recent Sessions */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between pb-1 border-b border-surface-container-high/30">
          <div>
            <span className="font-mono text-[10px] uppercase text-outline tracking-wider block">
              Telemetry Log
            </span>
            <h2 className="font-display text-lg text-primary font-medium tracking-tight">
              Recent Sessions
            </h2>
          </div>
          <Link
            to="/history"
            className="font-mono text-[10px] uppercase text-outline hover:text-primary transition-colors flex items-center gap-1"
          >
            <span>VIEW FULL ARCHIVE</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-2">
          {/* Row 1 */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/30 hover:border-surface-container-highest transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-medium text-primary">HealAtHome</span>
                <span className="text-outline text-xs">—</span>
                <span className="text-xs text-on-surface-variant">HealthTech Seed Round</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] text-outline mt-1 uppercase">
                <span>YESTERDAY</span>
                <span>•</span>
                <span>18 MIN RECORDING</span>
                <span>•</span>
                <span>AUDIO ACCURACY 98%</span>
              </div>
            </div>
            <div className="flex items-center gap-4 self-end sm:self-center">
              <div className="font-mono text-sm font-medium text-primary">
                84 <span className="text-[10px] text-outline uppercase font-normal">/100 READINESS</span>
              </div>
              <Link
                to="/session/session-healt-891/report"
                className="inline-flex items-center gap-1 text-xs text-outline hover:text-primary transition-colors font-medium font-mono"
              >
                <span>View Report</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Row 2 */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/30 hover:border-surface-container-highest transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-medium text-primary">OmniFlow</span>
                <span className="text-outline text-xs">—</span>
                <span className="text-xs text-on-surface-variant">Supply Chain API</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] text-outline mt-1 uppercase">
                <span>22 SEP</span>
                <span>•</span>
                <span>22 MIN RECORDING</span>
                <span>•</span>
                <span className="text-amber">MARGIN DEFENSE GAP</span>
              </div>
            </div>
            <div className="flex items-center gap-4 self-end sm:self-center">
              <div className="font-mono text-sm font-medium text-primary">
                76 <span className="text-[10px] text-outline uppercase font-normal">/100 READINESS</span>
              </div>
              <Link
                to="/session/session-finedge-412/report"
                className="inline-flex items-center gap-1 text-xs text-outline hover:text-primary transition-colors font-medium font-mono"
              >
                <span>View Report</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Row 3 */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container-high/30 hover:border-surface-container-highest transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-medium text-primary">Veritas</span>
                <span className="text-outline text-xs">—</span>
                <span className="text-xs text-on-surface-variant">Privacy-Preserving Auth</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] text-outline mt-1 uppercase">
                <span>18 SEP</span>
                <span>•</span>
                <span>15 MIN RECORDING</span>
                <span>•</span>
                <span className="text-secondary">HIGH CONVICTION</span>
              </div>
            </div>
            <div className="flex items-center gap-4 self-end sm:self-center">
              <div className="font-mono text-sm font-medium text-primary">
                89 <span className="text-[10px] text-outline uppercase font-normal">/100 READINESS</span>
              </div>
              <Link
                to="/session/session-healt-891/report"
                className="inline-flex items-center gap-1 text-xs text-outline hover:text-primary transition-colors font-medium font-mono"
              >
                <span>View Report</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
