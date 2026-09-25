import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionStore } from '../stores/sessionStore';
import { InvestorPersonality } from '../types/investor';
import {
  FileText,
  Check,
  X,
  TrendingUp,
  Shield,
  Brain,
  Mic,
  ArrowRight,
  UploadCloud,
  Sparkles
} from 'lucide-react';

export const NewSession: React.FC = () => {
  const navigate = useNavigate();
  const { initNewSession, setInvestorMode } = useSessionStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states matching Screenshot 2
  const [companyName, setCompanyName] = useState('HealAtHome Health');
  const [selectedRound, setSelectedRound] = useState<'pre-seed' | 'seed' | 'series-a'>('seed');
  const [oneSentenceHook, setOneSentenceHook] = useState(
    'Autonomous at-home diagnostic triage and clinician routing for Medicare Advantage post-acute recovery.'
  );

  // Material state
  const [fileName, setFileName] = useState('HealAtHome_Seed_Deck_v4.pdf');
  const [fileSize, setFileSize] = useState('4.2 MB');
  const [slideCount, setSlideCount] = useState(14);
  const [hasFile, setHasFile] = useState(true);

  // Archetype state
  const [selectedPersona, setSelectedPersona] = useState<InvestorPersonality>('analytical_vc');

  // Interruption adaptive toggle
  const [isAdaptive, setIsAdaptive] = useState(true);

  // Launch transition state
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchStep, setLaunchStep] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      setSlideCount(Math.floor(Math.random() * 8) + 10);
      setHasFile(true);
    }
  };

  const handleLaunch = () => {
    setInvestorMode(selectedPersona);

    const sessionId = initNewSession({
      name: companyName,
      oneLinePitch: oneSentenceHook,
      problem: 'Post-acute care delays and hospital readmission penalties.',
      solution: 'Autonomous diagnostic dispatch and clinical triage directly in patient homes.',
      targetCustomer: 'Medicare Advantage health plans and hospital risk-bearing entities.',
      marketSize: '$38B US post-acute care and clinical monitoring market.',
      businessModel: 'Value-based per-member-per-month shared savings + clinical encounter fees.',
      competitors: 'Traditional home health agencies and legacy telehealth triage lines.',
      traction: '$1.4M ARR pipeline, 3 hospital pilot commitments, 42-minute average response SLA.',
      revenue: '$120,000 monthly run-rate across 2 target states.',
      fundingRequired: selectedRound === 'seed' ? '$2,000,000' : selectedRound === 'pre-seed' ? '$750,000' : '$6,000,000',
      useOfFunds: 'Mobile clinician routing dispatch tech, regulatory clearance, EHR interoperability integrations.'
    });

    setIsLaunching(true);
    setLaunchStep(1);

    setTimeout(() => {
      setLaunchStep(2);
    }, 1000);

    setTimeout(() => {
      setLaunchStep(3);
    }, 2000);

    setTimeout(() => {
      navigate(`/session/${sessionId}/room`);
    }, 2800);
  };

  return (
    <div className="w-full min-h-screen bg-[#121315] font-sans text-[#e3e2e3] pb-24">
      {/* Hidden file input for Replace/Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.ppt,.pptx"
        className="hidden"
        onChange={handleFileUpload}
      />

      <div className="max-w-2xl mx-auto w-full px-5 md:px-0 py-10 md:py-14">
        {/* Header Block */}
        <header className="mb-10 text-left">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#44e2cd] shadow-[0_0_8px_rgba(68,226,205,0.6)]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#8f9194]">
              New Session • Stage Calibration
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-white font-normal tracking-tight">
            Prepare your investor simulation.
          </h1>
          <p className="text-[#c5c7c9] text-sm md:text-base mt-2.5 leading-relaxed font-normal">
            Provide your company context and collateral. The AI investor will calibrate its questions,
            vocal cadence, and thesis pressure to your specific round.
          </p>
        </header>

        {/* Main Formulation Workflow */}
        <div className="flex flex-col gap-9">
          {/* STEP 1: Startup Basics */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1">
              <span className="font-mono text-xs uppercase text-[#8f9194] tracking-wider">
                01 • Core Thesis & Stage
              </span>
              <span className="font-mono text-xs text-[#44e2cd] tracking-wide">
                Verified Context
              </span>
            </div>

            <div className="flex flex-col gap-5 bg-[#1b1c1d]/90 backdrop-blur-xl p-6 rounded-xl border border-[#292a2b] shadow-sm">
              {/* Company Name */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs uppercase text-[#c5c7c9] tracking-wider">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. HealAtHome Health"
                  className="w-full bg-[#0d0e0f] text-white placeholder:text-[#8f9194] text-sm px-4 py-3 rounded-lg outline-none transition-all duration-150 focus:bg-[#1f2021] border border-[#292a2b] focus:border-[#44e2cd]/60"
                />
              </div>

              {/* Target Capital Round (Segmented Control) */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs uppercase text-[#c5c7c9] tracking-wider">
                  Financing Milestone
                </label>
                <div className="grid grid-cols-3 gap-2 p-1 bg-[#0d0e0f] rounded-lg border border-[#292a2b]">
                  <button
                    type="button"
                    onClick={() => setSelectedRound('pre-seed')}
                    className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-md transition-all duration-200 cursor-pointer ${
                      selectedRound === 'pre-seed'
                        ? 'bg-[#38393a] text-white shadow-sm'
                        : 'text-[#8f9194] hover:text-white hover:bg-[#1f2021]'
                    }`}
                  >
                    <span className="text-[13px] font-medium tracking-tight">Pre-Seed</span>
                    <span className="font-mono text-[11px] opacity-75">$500k – $1M</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRound('seed')}
                    className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-md transition-all duration-200 cursor-pointer ${
                      selectedRound === 'seed'
                        ? 'bg-[#38393a] text-white shadow-sm'
                        : 'text-[#8f9194] hover:text-white hover:bg-[#1f2021]'
                    }`}
                  >
                    <span className="text-[13px] font-medium tracking-tight">Seed</span>
                    <span className="font-mono text-[11px] opacity-90">$1M – $3M</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRound('series-a')}
                    className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-md transition-all duration-200 cursor-pointer ${
                      selectedRound === 'series-a'
                        ? 'bg-[#38393a] text-white shadow-sm'
                        : 'text-[#8f9194] hover:text-white hover:bg-[#1f2021]'
                    }`}
                  >
                    <span className="text-[13px] font-medium tracking-tight">Series A</span>
                    <span className="font-mono text-[11px] opacity-75">$4M – $10M</span>
                  </button>
                </div>
              </div>

              {/* One-Sentence Hook */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-xs uppercase text-[#c5c7c9] tracking-wider">
                    One-Sentence Hook
                  </label>
                  <span className="font-mono text-xs text-[#8f9194]">
                    {oneSentenceHook.length}/120
                  </span>
                </div>
                <textarea
                  rows={2}
                  maxLength={140}
                  value={oneSentenceHook}
                  onChange={(e) => setOneSentenceHook(e.target.value)}
                  placeholder="e.g. Autonomous at-home diagnostic triage and clinician routing for Medicare Advantage post-acute recovery."
                  className="w-full bg-[#0d0e0f] text-white placeholder:text-[#8f9194] text-sm px-4 py-3 rounded-lg outline-none transition-all duration-150 resize-none focus:bg-[#1f2021] border border-[#292a2b] focus:border-[#44e2cd]/60 leading-relaxed font-sans"
                />
              </div>
            </div>
          </section>

          {/* STEP 2: Pitch Deck & Collateral */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1">
              <span className="font-mono text-xs uppercase text-[#8f9194] tracking-wider">
                02 • Presentation Material
              </span>
              <span className="font-mono text-xs text-[#c5c7c9]">
                OCR Parsing Complete
              </span>
            </div>

            {/* Attached File Presentation Artifact */}
            <div className="bg-[#1b1c1d]/90 backdrop-blur-xl p-5 rounded-xl border border-[#292a2b] transition-all duration-150 hover:bg-[#1b1c1d] shadow-sm">
              {hasFile ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-[#292a2b] flex items-center justify-center shrink-0 border border-[#343536]">
                        <FileText className="w-5 h-5 text-[#44e2cd]" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white truncate max-w-[220px] sm:max-w-[320px]">
                            {fileName}
                          </span>
                          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#44e2cd]/15 text-[#44e2cd]">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 font-mono text-xs text-[#8f9194]">
                          <span>{fileSize}</span>
                          <span>•</span>
                          <span>{slideCount} slides synthesized</span>
                          <span>•</span>
                          <span className="text-[#44e2cd]">Unit economics parsed</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-[#292a2b] text-[#c5c7c9] font-mono text-xs hover:text-white hover:bg-[#38393a] transition-colors border border-[#343536] cursor-pointer"
                      >
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasFile(false)}
                        title="Delete attachment"
                        className="p-1.5 rounded-lg text-[#8f9194] hover:text-[#ffb4ab] hover:bg-[#93000a]/20 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Slide Extraction Micro Sparkline */}
                  <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#292a2b]">
                    <div className="flex items-center gap-2 w-full">
                      <div className="h-1.5 flex-1 bg-[#292a2b] rounded-full overflow-hidden flex">
                        <div className="h-full bg-[#44e2cd] rounded-full" style={{ width: '100%' }} />
                      </div>
                      <span className="font-mono text-[10px] text-[#8f9194] tracking-tight shrink-0 pl-2">
                        TAM, LTV/CAC, Regulatory Moat Detected
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="py-8 flex flex-col items-center justify-center cursor-pointer border border-dashed border-[#44474a] rounded-lg hover:border-[#44e2cd]/60 transition-colors bg-[#0d0e0f]/50"
                >
                  <UploadCloud className="w-8 h-8 text-[#44e2cd] mb-2" />
                  <span className="text-sm font-medium text-white">Upload Pitch Deck (PDF)</span>
                  <span className="font-mono text-xs text-[#8f9194] mt-1">
                    Click to browse or drag and drop presentation material
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* STEP 3: Investor Persona Calibration */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-1">
              <span className="font-mono text-xs uppercase text-[#8f9194] tracking-wider">
                03 • Lead Counterparty Archetype
              </span>
              <span className="font-mono text-xs text-[#8f9194]">Select One</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Persona 1: Analytical Partner */}
              <div
                onClick={() => setSelectedPersona('analytical_vc')}
                className={`group relative flex flex-col justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                  selectedPersona === 'analytical_vc'
                    ? 'bg-[#38393a]/90 border-[#44e2cd]/60 shadow-[0_0_15px_rgba(68,226,205,0.1)]'
                    : 'bg-[#1b1c1d]/70 border-[#292a2b] hover:bg-[#1b1c1d] hover:border-[#38393a]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <TrendingUp
                    className={`w-5 h-5 ${
                      selectedPersona === 'analytical_vc' ? 'text-white' : 'text-[#8f9194] group-hover:text-white'
                    }`}
                  />
                  {selectedPersona === 'analytical_vc' ? (
                    <span className="w-2 h-2 rounded-full bg-[#44e2cd] shadow-[0_0_8px_rgba(68,226,205,0.8)]" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-transparent" />
                  )}
                </div>
                <div className="mt-6 flex flex-col gap-1.5">
                  <h3
                    className={`text-sm font-medium ${
                      selectedPersona === 'analytical_vc' ? 'text-white' : 'text-[#c5c7c9] group-hover:text-white'
                    }`}
                  >
                    Analytical Partner
                  </h3>
                  <p
                    className={`text-xs leading-relaxed ${
                      selectedPersona === 'analytical_vc' ? 'text-[#c5c7c9]' : 'text-[#8f9194]'
                    }`}
                  >
                    Hyper-focused on gross margin durability, LTV/CAC payback under 12 months, and defensible cohort retention.
                  </p>
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#292a2b]">
                  <span className="font-mono text-[10px] uppercase text-[#8f9194] tracking-widest">
                    Pressure: High
                  </span>
                  <span className="font-mono text-[10px] text-[#c5c7c9]">
                    Metrics Driven
                  </span>
                </div>
              </div>

              {/* Persona 2: Skeptical Lead */}
              <div
                onClick={() => setSelectedPersona('aggressive_investor')}
                className={`group relative flex flex-col justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                  selectedPersona === 'aggressive_investor'
                    ? 'bg-[#38393a]/90 border-[#44e2cd]/60 shadow-[0_0_15px_rgba(68,226,205,0.1)]'
                    : 'bg-[#1b1c1d]/70 border-[#292a2b] hover:bg-[#1b1c1d] hover:border-[#38393a]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <Shield
                    className={`w-5 h-5 ${
                      selectedPersona === 'aggressive_investor' ? 'text-white' : 'text-[#8f9194] group-hover:text-white'
                    }`}
                  />
                  {selectedPersona === 'aggressive_investor' ? (
                    <span className="w-2 h-2 rounded-full bg-[#44e2cd] shadow-[0_0_8px_rgba(68,226,205,0.8)]" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-transparent" />
                  )}
                </div>
                <div className="mt-6 flex flex-col gap-1.5">
                  <h3
                    className={`text-sm font-medium ${
                      selectedPersona === 'aggressive_investor' ? 'text-white' : 'text-[#c5c7c9] group-hover:text-white'
                    }`}
                  >
                    Skeptical Lead
                  </h3>
                  <p
                    className={`text-xs leading-relaxed ${
                      selectedPersona === 'aggressive_investor' ? 'text-[#c5c7c9]' : 'text-[#8f9194]'
                    }`}
                  >
                    Relentless scrutiny on enterprise switching costs, legacy hospital EHR moats, and vendor consolidation risk.
                  </p>
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#292a2b]">
                  <span className="font-mono text-[10px] uppercase text-[#8f9194] tracking-widest">
                    Pressure: Severe
                  </span>
                  <span className="font-mono text-[10px] text-[#8f9194]">
                    Moat & Incumbency
                  </span>
                </div>
              </div>

              {/* Persona 3: Early-Stage Angel */}
              <div
                onClick={() => setSelectedPersona('angel_investor')}
                className={`group relative flex flex-col justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                  selectedPersona === 'angel_investor'
                    ? 'bg-[#38393a]/90 border-[#44e2cd]/60 shadow-[0_0_15px_rgba(68,226,205,0.1)]'
                    : 'bg-[#1b1c1d]/70 border-[#292a2b] hover:bg-[#1b1c1d] hover:border-[#38393a]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <Brain
                    className={`w-5 h-5 ${
                      selectedPersona === 'angel_investor' ? 'text-white' : 'text-[#8f9194] group-hover:text-white'
                    }`}
                  />
                  {selectedPersona === 'angel_investor' ? (
                    <span className="w-2 h-2 rounded-full bg-[#44e2cd] shadow-[0_0_8px_rgba(68,226,205,0.8)]" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-transparent" />
                  )}
                </div>
                <div className="mt-6 flex flex-col gap-1.5">
                  <h3
                    className={`text-sm font-medium ${
                      selectedPersona === 'angel_investor' ? 'text-white' : 'text-[#c5c7c9] group-hover:text-white'
                    }`}
                  >
                    Early-Stage Angel
                  </h3>
                  <p
                    className={`text-xs leading-relaxed ${
                      selectedPersona === 'angel_investor' ? 'text-[#c5c7c9]' : 'text-[#8f9194]'
                    }`}
                  >
                    Evaluates founder conviction, velocity of weekly shipping, raw storytelling clarity, and pilot customer obsessiveness.
                  </p>
                </div>
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#292a2b]">
                  <span className="font-mono text-[10px] uppercase text-[#8f9194] tracking-widest">
                    Pressure: Balanced
                  </span>
                  <span className="font-mono text-[10px] text-[#8f9194]">
                    Founder Alpha
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Simulation Parameter Drawer Bar */}
          <section className="bg-[#0d0e0f]/90 p-4 rounded-xl border border-[#292a2b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#1b1c1d] flex items-center justify-center shrink-0 border border-[#292a2b]">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  Interruption Frequency & Cadence
                </span>
                <span className="text-xs text-[#8f9194]">
                  Investor will simulate realistic partner interruptions during key valuation moments.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
              <span className="font-mono text-[11px] text-[#c5c7c9] uppercase tracking-wider">
                Adaptive
              </span>
              <button
                type="button"
                onClick={() => setIsAdaptive(!isAdaptive)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center cursor-pointer ${
                  isAdaptive ? 'bg-[#44e2cd]' : 'bg-[#343536]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-[#121315] transition-transform shadow-sm ${
                    isAdaptive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Launch Actions */}
          <div className="flex flex-col items-center gap-3 pt-4 pb-12">
            <button
              type="button"
              onClick={handleLaunch}
              disabled={isLaunching}
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-[#121315] font-medium text-sm tracking-tight transition-all duration-200 hover:bg-neutral-100 hover:scale-[1.015] active:scale-[0.99] shadow-lg shadow-black/50 cursor-pointer"
            >
              <span>{isLaunching ? 'Calibrating Simulator...' : 'Enter Pitch Room'}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="text-xs text-[#8f9194] hover:text-[#c5c7c9] transition-colors py-1 font-sans cursor-pointer"
            >
              Discard session setup
            </button>
          </div>
        </div>
      </div>

      {/* Cinematic Transition Modal */}
      <AnimatePresence>
        {isLaunching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#121315]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center max-w-md w-full"
            >
              <div className="w-14 h-14 rounded-full bg-[#1b1c1d] border border-[#292a2b] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-[#44e2cd] animate-pulse" />
              </div>

              <span className="font-mono text-xs uppercase tracking-widest text-[#44e2cd] mb-2">
                Executive Runtime Initializing
              </span>

              <h2 className="text-2xl font-light text-white tracking-tight mb-4">
                {launchStep === 1 && 'Calibrating counterparty psychology...'}
                {launchStep === 2 && 'Synthesizing deck financial metrics...'}
                {launchStep === 3 && 'Investor counterparty connected.'}
              </h2>

              <div className="w-48 h-1.5 bg-[#0d0e0f] rounded-full overflow-hidden mt-2 border border-[#292a2b]">
                <motion.div
                  className="h-full bg-[#44e2cd]"
                  initial={{ width: '0%' }}
                  animate={{ width: launchStep === 1 ? '35%' : launchStep === 2 ? '75%' : '100%' }}
                  transition={{ duration: 0.8 }}
                />
              </div>

              <div className="mt-6 flex items-center gap-2 font-mono text-xs text-[#8f9194]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#44e2cd] animate-ping" />
                <span>48kHz telemetry channel locked</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
