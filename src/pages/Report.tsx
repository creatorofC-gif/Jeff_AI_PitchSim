import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSessionStore } from '../stores/sessionStore';
import {
  Download,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Edit3,
  Zap,
  Mic,
  ArrowRight,
  PlayCircle,
  Copy,
  Check
} from 'lucide-react';

export const Report: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { currentReport, startupContext } = useSessionStore();
  const [copiedLink, setCopiedLink] = useState(false);

  const startupTitle = startupContext?.name || currentReport?.startupName || 'HealAtHome';
  const overallScore = currentReport?.overallScore || 84;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="w-full min-h-screen bg-surface font-sans text-on-surface pb-24">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14 flex flex-col gap-10">
        {/* Top Meta Strip & Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-mono text-xs text-outline tracking-wider uppercase">
              <span>Sessions</span>
              <span className="text-surface-variant">•</span>
              <span>{sessionId ? `PS-${sessionId.slice(-4).toUpperCase()}` : 'PS-8841'}</span>
              <span className="text-surface-variant">•</span>
              <span className="text-secondary font-medium">Diligence Assessment</span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-primary tracking-tight font-normal">
              {startupTitle} — Seed Round Simulation
            </h1>

            <div className="flex flex-wrap items-center gap-x-2 text-on-surface-variant text-xs md:text-sm pt-0.5">
              <span>
                Evaluated by <strong className="text-on-surface font-medium">David Sterling</strong> (Analytical Lead Partner)
              </span>
              <span className="text-surface-variant">•</span>
              <span>18 min duration</span>
              <span className="text-surface-variant">•</span>
              <span className="font-mono text-xs text-outline">24 Sep 2026</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-on-primary text-xs md:text-sm font-medium hover:bg-white transition-all active:scale-[0.99] shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-on-primary" />
              <span>Download Executive Summary (PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/session/new')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high text-on-surface text-xs md:text-sm font-medium hover:bg-surface-bright transition-colors active:scale-[0.99] border border-surface-container-highest/50 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-on-surface-variant" />
              <span>Practice Again</span>
            </button>
          </div>
        </div>

        {/* Primary Verdict Block */}
        <section className="bg-surface-container-low/70 backdrop-blur-md rounded-xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 lg:items-stretch border border-surface-container-high/40 shadow-sm">
          {/* Left Column: The Score */}
          <div className="lg:w-5/12 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs uppercase text-outline tracking-wider">
                Composite Readiness Score
              </span>
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-6xl text-primary tracking-tighter font-light leading-none">
                  {overallScore}
                </span>
                <span className="font-display text-2xl text-outline font-light">/ 100</span>
                <div className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest border border-secondary/30 text-secondary font-mono text-xs uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Tier 1 Qualified
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-mono text-xs text-on-surface uppercase tracking-wider">
                Executive Synthesis
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed font-light">
                <strong className="text-primary font-medium">Investment Readiness:</strong> Strong
                candidate for institutional seed. Founder communicates market urgency with
                exceptional narrative poise. Primary diligence hesitation revolves around
                structural moat defensibility against incumbent remote health networks.
              </p>
            </div>

            {/* Telemetry micro-strip */}
            <div className="pt-3 flex items-center justify-between text-outline font-mono text-xs border-t border-surface-container-highest/30">
              <span>CONFIDENTIAL ASSESSMENT</span>
              <span className="text-secondary tracking-normal">STABILITY INDEX: HIGH</span>
            </div>
          </div>

          {/* Center Divider (Desktop) */}
          <div className="hidden lg:block w-px bg-surface-container-highest/40 my-1" />

          {/* Right Column: 4 Key Pillars */}
          <div className="lg:w-7/12 flex flex-col justify-center gap-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase text-outline tracking-wider">
                Institutional Rubric Evaluation
              </span>
              <span className="font-mono text-xs text-outline">Target Benchmark: ≥ 75%</span>
            </div>

            <div className="flex flex-col gap-4">
              {/* Pillar 1 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface">Vision & Market Need</span>
                  <span className="font-mono text-primary">88%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '88%' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
                <span className="text-[12px] text-outline font-light">
                  Crisp TAM decomposition; immediate regulatory catalysts validated.
                </span>
              </div>

              {/* Pillar 2 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface">Delivery & Composure</span>
                  <span className="font-mono text-primary">87%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '87%' }}
                    transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
                <span className="text-[12px] text-outline font-light">
                  Pacing anchored at 135 WPM. Zero conversational escalation under pressure.
                </span>
              </div>

              {/* Pillar 3 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface">Unit Economics & Scalability</span>
                  <span className="font-mono text-primary">79%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '79%' }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
                <span className="text-[12px] text-outline font-light">
                  Contribution margin assumptions plausible, though regional logistics scaling is untested.
                </span>
              </div>

              {/* Pillar 4 */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface">Defensibility & Moat</span>
                  <span className="font-mono text-secondary">74%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container-lowest rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '74%' }}
                    transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    className="h-full bg-secondary rounded-full"
                  />
                </div>
                <span className="text-[12px] text-outline font-light">
                  Requires concrete enterprise exclusivity barrier before incumbent market push.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Key Investor Pushbacks & Founder Response */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="font-display text-xl text-primary tracking-tight font-normal">
              Key Diligence Pushbacks & Founder Defense
            </h2>
            <span className="font-mono text-xs text-outline uppercase tracking-wider">
              Recorded Transcriptions • Audio Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pushback Card 01 */}
            <div className="bg-surface-container-low/60 rounded-xl p-6 flex flex-col justify-between gap-4 border border-surface-container-high/40">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-outline uppercase tracking-widest">
                    Inquiry 01
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-mono text-[10px] uppercase">
                    Margin Vulnerability
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="text-base text-primary font-medium">
                    Customer Acquisition Cost vs. LTV
                  </div>
                  <p className="text-xs text-on-surface-variant italic leading-relaxed">
                    “How do you plan to reduce customer acquisition cost once direct clinic referral
                    saturation occurs across primary metropolitan hubs?”
                  </p>
                </div>

                <div className="bg-surface-container-lowest/80 rounded-lg p-3.5 flex flex-col gap-1 border border-surface-container-high/20">
                  <div className="font-mono text-[11px] text-outline uppercase tracking-wider">
                    Founder Defense (Recorded)
                  </div>
                  <p className="text-xs text-on-surface leading-relaxed">
                    Outlined an enterprise B2B employer wellness pipeline that shifts unit
                    acquisition from decentralized local clinics to centralized corporate benefits
                    platforms, cutting channel friction.
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-high/40 rounded-lg p-3.5 flex items-start gap-3 border border-surface-container-highest/20">
                <ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-xs text-secondary uppercase tracking-wider">
                    Partner Assessment
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Valid strategic pivot. Immediate tactical milestone: secure 2–3 Letters of
                    Intent (LOIs) from self-insured mid-market employers prior to syndicated partner
                    meetings.
                  </p>
                </div>
              </div>
            </div>

            {/* Pushback Card 02 */}
            <div className="bg-surface-container-low/60 rounded-xl p-6 flex flex-col justify-between gap-4 border border-surface-container-high/40">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-outline uppercase tracking-widest">
                    Inquiry 02
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-mono text-[10px] uppercase">
                    Incumbent Threat
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="text-base text-primary font-medium">
                    Incumbent Healthcare Defensibility
                  </div>
                  <p className="text-xs text-on-surface-variant italic leading-relaxed">
                    “If Teladoc or Ro activates physical home-dispatch nurses using their existing
                    balance sheets, what prevents you from being priced out instantly?”
                  </p>
                </div>

                <div className="bg-surface-container-lowest/80 rounded-lg p-3.5 flex flex-col gap-1 border border-surface-container-high/20">
                  <div className="font-mono text-[11px] text-outline uppercase tracking-wider">
                    Founder Defense (Recorded)
                  </div>
                  <p className="text-xs text-on-surface leading-relaxed">
                    Argued proprietary dispatch telemetry and lower localized nurse overhead give
                    higher service velocity, enabling sub-45 minute dispatch guarantees.
                  </p>
                </div>
              </div>

              <div className="bg-surface-container-high/40 rounded-lg p-3.5 flex items-start gap-3 border border-surface-container-highest/20">
                <ShieldAlert className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-xs text-secondary uppercase tracking-wider">
                    Partner Assessment
                  </span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Insufficient standalone defense. Must highlight proprietary diagnostic hardware
                    patents and exclusive hospital system data routing that incumbents cannot
                    legally mirror.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contextual Vocal & Delivery Telemetry Widget */}
        <section className="bg-surface-container-lowest/90 rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-surface-container-high/40 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-secondary border border-surface-container-highest/40">
              <Activity className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-primary font-medium">
                Acoustic Cadence & Rhetorical Control
              </span>
              <span className="font-mono text-xs text-outline">
                Analyzed via 48kHz Pitch Simulator Telemetry
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8 md:gap-12">
            <div className="flex flex-col text-right">
              <span className="font-mono text-xs text-outline uppercase">Pacing Baseline</span>
              <span className="font-display text-xl text-primary font-light">
                135 <span className="font-mono text-xs text-outline">WPM</span>
              </span>
            </div>

            <div className="flex flex-col text-right">
              <span className="font-mono text-xs text-outline uppercase">Filler Rate</span>
              <span className="font-display text-xl text-secondary font-light">1.2%</span>
            </div>

            <div className="flex flex-col text-right">
              <span className="font-mono text-xs text-outline uppercase">Auditory Confidence</span>
              <span className="font-display text-xl text-primary font-light">94/100</span>
            </div>
          </div>
        </section>

        {/* Actionable Next Steps (3 clear bullet cards) */}
        <section className="flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-xl text-primary tracking-tight font-normal">
              Required Pre-Seed Iterations
            </h2>
            <span className="font-mono text-xs text-outline uppercase tracking-wider">
              3 Directives
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="bg-surface-container-low/70 rounded-xl p-5 flex flex-col justify-between gap-5 hover:bg-surface-container-low transition-colors border border-surface-container-high/30">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-outline">01 / DECK REVISION</span>
                  <Edit3 className="w-4 h-4 text-outline" />
                </div>
                <div className="text-base text-primary font-medium">Slide 6 Pipeline Expansion</div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Refactor the Traction slide to explicitly showcase the active enterprise pipeline
                  with formal Letters of Intent (LOIs) from self-insured employers.
                </p>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs text-secondary hover:text-secondary-fixed cursor-pointer transition-colors">
                <span>High Diligence Priority</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-low/70 rounded-xl p-5 flex flex-col justify-between gap-5 hover:bg-surface-container-low transition-colors border border-surface-container-high/30">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-outline">02 / SIMULATOR DRILL</span>
                  <Zap className="w-4 h-4 text-outline" />
                </div>
                <div className="text-base text-primary font-medium">Gross Margin Stress Drill</div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Run an isolated 5-minute adversarial Q&A drill specifically addressing geographic
                  nurse saturation and contracted diagnostic margins.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate('/session/new')}
                className="w-fit flex items-center gap-1.5 font-mono text-xs text-on-surface hover:text-primary transition-colors cursor-pointer"
              >
                <span>Queue Simulation</span>
                <PlayCircle className="w-3.5 h-3.5 text-secondary" />
              </button>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-container-low/70 rounded-xl p-5 flex flex-col justify-between gap-5 hover:bg-surface-container-low transition-colors border border-surface-container-high/30">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-outline">03 / VERBAL PROTOCOL</span>
                  <Mic className="w-4 h-4 text-outline" />
                </div>
                <div className="text-base text-primary font-medium">Lock Rhythm & Cadence</div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Lock in your current 135 WPM conversational tempo. Retain the low 1.2% filler
                  word frequency, especially during aggressive competitive inquiries.
                </p>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs text-outline">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Target Sustained • Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* Signoff Stamp */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 text-outline font-mono text-xs gap-3 border-t border-surface-container-highest/30">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span>PARTNER CERTIFIED ARCHIVE • E-CELL PROTOCOL VERIFIED</span>
          </div>

          <div className="flex items-center gap-4">
            <span>SESSION HASH: 9fa08e82d1c4</span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="hover:text-primary transition-colors text-on-surface-variant flex items-center gap-1 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3 h-3 text-secondary" /> : <Copy className="w-3 h-3" />}
              <span>{copiedLink ? 'Copied' : 'Copy Report Link'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
