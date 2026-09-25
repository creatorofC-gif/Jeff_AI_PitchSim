import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSessionStore } from '../stores/sessionStore';
import { InvestorAvatar } from '../components/avatar/InvestorAvatar';
import { sessionService } from '../services/sessionService';
import { speechService } from '../services/speechService';
import { ttsService } from '../services/ttsService';
import { INVESTOR_PROFILES } from '../data/mockInvestorResponses';
import {
  Mic,
  Square,
  Play,
  Pause,
  MessageSquare,
  Volume2,
  X,
  Brain,
  Loader2,
  Send,
  Video,
  VideoOff,
  Activity,
  Gauge
} from 'lucide-react';

export const PitchRoom: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const {
    startupContext,
    investorMode,
    difficulty,
    conversation,
    sessionState,
    avatarState,
    timerSeconds,
    isTimerRunning,
    currentTranscript,
    isMicActive,
    isProcessing,
    setSessionState,
    setAvatarState,
    startTimer,
    pauseTimer,
    tickTimer,
    addMessage,
    setCurrentTranscript,
    setMicActive,
    setIsProcessing,
    loadSession,
    setReport
  } = useSessionStore();

  const [audioLevel, setAudioLevel] = useState(0.2);
  const [showTranscriptDrawer, setShowTranscriptDrawer] = useState(false);
  const [showEndConfirmModal, setShowEndConfirmModal] = useState(false);
  const [isAnalyzingPitch, setIsAnalyzingPitch] = useState(false);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerIntervalRef = useRef<any>(null);

  const profile = INVESTOR_PROFILES[investorMode] || INVESTOR_PROFILES.analytical_vc;

  // Real-time sentiment level (1-5) derived from conversation progression
  const userRepliesCount = conversation.filter((m) => m.role === 'user').length;
  const sentimentLevel = Math.min(5, Math.max(2, 2 + Math.floor(userRepliesCount * 0.75)));

  // Initialize and start pitch session
  useEffect(() => {
    let isMounted = true;

    const setupRoom = async () => {
      if (sessionId) {
        await loadSession(sessionId);
      }

      setSessionState('preparing');
      setAvatarState('idle');

      // Start initial meeting greeting
      try {
        const { welcomeMessage } = await sessionService.startSession(sessionId || 'current');
        if (!isMounted) return;

        addMessage(welcomeMessage);
        setSessionState('investor-speaking');
        setAvatarState('speaking');
        startTimer();

        // Speak welcome message
        ttsService.speak(welcomeMessage.text, {
          gender: profile.avatarGender,
          onStart: () => {
            if (isMounted) setAvatarState('speaking');
          },
          onEnd: () => {
            if (isMounted) {
              setSessionState('waiting-for-user');
              setAvatarState('listening');
            }
          }
        });
      } catch (e) {
        console.error('Room setup error:', e);
      }
    };

    setupRoom();

    return () => {
      isMounted = false;
      ttsService.stop();
      speechService.stopListening();
    };
  }, [sessionId]);

  // Session timer ticker
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        tickTimer();
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning]);

  // Handle webcam video toggle
  useEffect(() => {
    if (cameraActive) {
      navigator.mediaDevices
        ?.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(() => setCameraActive(false));
    } else {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    }
  }, [cameraActive]);

  // Format timer MM:SS
  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle Microphone recording
  const handleToggleMic = async () => {
    if (isMicActive) {
      setMicActive(false);
      const finalTranscript = await speechService.stopListening();
      if (finalTranscript || currentTranscript) {
        handleSendResponse(finalTranscript || currentTranscript);
      } else {
        setSessionState('waiting-for-user');
        setAvatarState('listening');
      }
    } else {
      ttsService.stop();
      setCurrentTranscript('');
      setMicActive(true);
      setSessionState('listening');
      setAvatarState('listening');

      await speechService.startListening(
        (text) => {
          setCurrentTranscript(text);
        },
        (level) => {
          setAudioLevel(level);
        }
      );
    }
  };

  // Process user speech and trigger AI investor response
  const handleSendResponse = async (text: string) => {
    if (!text.trim()) return;

    ttsService.stop();
    setMicActive(false);
    setIsProcessing(true);
    setSessionState('processing');
    setAvatarState('thinking');
    setCurrentTranscript('');
    setTypedAnswer('');

    try {
      const investorReply = await sessionService.sendUserSpeech(sessionId || 'current', text);
      setIsProcessing(false);
      setSessionState('investor-speaking');
      setAvatarState('speaking');

      // Speak question
      await ttsService.speak(investorReply.text, {
        gender: profile.avatarGender,
        onStart: () => setAvatarState('speaking'),
        onEnd: () => {
          setSessionState('waiting-for-user');
          setAvatarState('listening');
        }
      });
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      setSessionState('waiting-for-user');
      setAvatarState('listening');
    }
  };

  // Trigger ending session and transition to report
  const handleConfirmEndSession = async () => {
    setShowEndConfirmModal(false);
    setIsAnalyzingPitch(true);
    pauseTimer();
    ttsService.stop();
    await speechService.stopListening();

    try {
      const generatedReport = await sessionService.endSession(
        sessionId || 'current',
        timerSeconds
      );
      setReport(generatedReport);

      setTimeout(() => {
        navigate(`/session/${sessionId}/report`);
      }, 1600);
    } catch (err) {
      console.error(err);
      navigate('/dashboard');
    }
  };

  const latestInvestorMessage = [...conversation].reverse().find((m) => m.role === 'investor');

  // Quick simulated answers
  const demoPrompts = [
    `We have ${startupContext.traction || '5,200 active customers with strong cohort retention'}.`,
    `Our current revenue is ${startupContext.revenue || '$42k MRR at 48% gross margin'}.`,
    `Our primary moat is ${startupContext.solution.slice(0, 50)}...`,
    `We are raising ${startupContext.fundingRequired || '$750k'} to fund ${startupContext.useOfFunds?.slice(0, 35) || 'scaling'}.`
  ];

  return (
    <div className="relative w-screen h-screen bg-canvas text-ink-primary overflow-hidden flex flex-col select-none">
      {/* End Session Confirmation Modal */}
      <AnimatePresence>
        {showEndConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="terminal-elevated rounded-xl p-6 sm:p-8 max-w-md w-full border border-surface-borderHighlight text-center"
            >
              <h3 className="text-xl font-semibold font-display text-ink-primary mb-2">
                Conclude Pitch Simulation?
              </h3>
              <p className="text-xs text-ink-secondary mb-6 leading-relaxed">
                The partner will close cross-examination and generate your comprehensive institutional dossier, including delivery metrics and rebuttal analysis.
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowEndConfirmModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-surface-border hover:bg-surface-secondary text-ink-secondary text-xs font-medium transition-colors"
                >
                  Continue Pitch
                </button>
                <button
                  type="button"
                  onClick={handleConfirmEndSession}
                  className="flex-1 py-2.5 rounded-lg bg-status-error text-ink-primary text-xs font-medium hover:bg-status-error/90 transition-all"
                >
                  Conclude & Generate Dossier
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pitch Analysis Loading Screen */}
      <AnimatePresence>
        {isAnalyzingPitch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-canvas flex flex-col items-center justify-center p-6"
          >
            <div className="text-center max-w-sm">
              <div className="w-12 h-12 rounded-lg bg-surface-secondary border border-surface-borderHighlight text-teal-bright mx-auto flex items-center justify-center mb-5">
                <Brain className="w-6 h-6 animate-pulse" />
              </div>
              <h2 className="text-xl font-semibold font-display text-ink-primary mb-2">
                Synthesizing Pitch Telemetry...
              </h2>
              <p className="text-xs text-ink-muted mb-6 font-mono">
                Compiling speaking cadence, filler pauses, and objection rebuttals...
              </p>
              <div className="w-48 h-[2px] bg-surface-borderHighlight rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-teal-bright animate-pulse w-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP BAR: Room Header */}
      <div className="h-14 px-4 sm:px-6 border-b border-surface-border flex items-center justify-between z-20 bg-canvas/90 backdrop-blur-md">
        {/* Left: Meeting details */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-bright animate-pulse" />
            <span className="text-xs font-semibold text-ink-primary tracking-tight font-display">
              {startupContext.name}
            </span>
          </div>
          <span className="text-surface-borderHighlight">•</span>
          <span className="text-[10px] font-mono text-ink-muted hidden sm:inline uppercase">
            VENTURE TERMINAL
          </span>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-sm bg-surface-secondary text-ink-secondary border border-surface-border">
            {difficulty}
          </span>
        </div>

        {/* Center: VC Sentiment Gauge from Stitch Venture Terminal */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-md bg-surface-secondary border border-surface-border text-xs font-mono">
          <Gauge className="w-3.5 h-3.5 text-teal-bright" />
          <span className="text-[10px] uppercase text-ink-muted">VC Conviction:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((step) => (
              <span
                key={step}
                className={`w-3.5 h-1.5 rounded-sm transition-colors duration-300 ${
                  step <= sentimentLevel
                    ? sentimentLevel >= 4
                      ? 'bg-teal-bright'
                      : 'bg-amber-bright'
                    : 'bg-surface-borderHighlight'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Session Timer & End Session */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-secondary border border-surface-border text-xs font-mono">
            <button
              onClick={() => (isTimerRunning ? pauseTimer() : startTimer())}
              className="text-ink-muted hover:text-ink-primary transition-colors"
              title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
            >
              {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-teal-bright" />}
            </button>
            <span className="font-semibold text-ink-primary tracking-wider mono-numbers">
              {formatTimer(timerSeconds)}
            </span>
          </div>

          <button
            onClick={() => setCameraActive(!cameraActive)}
            className={`p-1.5 rounded-md border text-xs transition-colors hidden sm:flex items-center gap-1.5 ${
              cameraActive
                ? 'bg-teal-subtle text-teal-bright border-teal-border'
                : 'border-surface-border text-ink-muted hover:text-ink-primary hover:bg-surface-secondary'
            }`}
            title="Toggle Founder Camera"
          >
            {cameraActive ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setShowTranscriptDrawer(!showTranscriptDrawer)}
            className={`px-2.5 py-1 rounded-md border text-xs font-medium font-mono transition-colors flex items-center gap-1.5 ${
              showTranscriptDrawer
                ? 'bg-teal-subtle text-teal-bright border-teal-border'
                : 'border-surface-border text-ink-muted hover:text-ink-primary hover:bg-surface-secondary'
            }`}
          >
            <MessageSquare className="w-3 h-3" />
            <span className="hidden sm:inline">Diligence Log</span>
            <span className="text-[10px] opacity-70 mono-numbers">({conversation.length})</span>
          </button>

          <button
            onClick={() => setShowEndConfirmModal(true)}
            className="px-3 py-1 rounded-md bg-status-error/15 hover:bg-status-error/25 text-status-error border border-status-error/30 text-xs font-semibold font-mono transition-all flex items-center gap-1.5"
          >
            <Square className="w-2.5 h-2.5 fill-current" />
            <span>Conclude</span>
          </button>
        </div>
      </div>

      {/* CENTER: 3D AI INVESTOR AVATAR VIEWPORT */}
      <div className="flex-1 relative w-full h-full flex items-center justify-center p-2 sm:p-4">
        <div className="w-full h-full max-w-6xl max-h-[80vh] relative">
          <InvestorAvatar
            avatarState={avatarState}
            personality={investorMode}
            investorName={profile.name}
            firmName={profile.firm}
          />

          {/* Subtitle / Investor Question Card */}
          <div className="absolute bottom-3 left-4 right-4 sm:left-12 sm:right-12 z-20 pointer-events-none flex justify-center">
            <AnimatePresence mode="wait">
              {latestInvestorMessage && (
                <motion.div
                  key={latestInvestorMessage.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="terminal-panel px-5 py-3.5 rounded-lg border border-surface-borderHighlight max-w-2xl text-center shadow-terminal pointer-events-auto"
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Volume2 className="w-3 h-3 text-teal-bright animate-pulse" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-teal-bright">
                      {profile.name} • {investorMode.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-ink-primary leading-snug">
                    "{latestInvestorMessage.text}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Picture-in-picture founder video */}
          {cameraActive && (
            <div className="absolute top-4 right-4 z-20 w-36 h-28 sm:w-44 sm:h-32 rounded-lg overflow-hidden border border-surface-borderHighlight shadow-terminal bg-canvas">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
              <div className="absolute bottom-1 left-2 text-[9px] font-mono text-ink-muted bg-canvas/80 px-1 rounded-sm">
                FOUNDER VIDEO FEED
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM CONTROLS & TELEMETRY STRIP */}
      <div className="h-32 sm:h-36 border-t border-surface-border bg-canvas/95 z-20 px-4 flex flex-col justify-center">
        {/* Telemetry info row */}
        <div className="max-w-3xl mx-auto w-full mb-2 flex items-center justify-between gap-3 text-xs">
          {/* Live speech feedback */}
          <div className="flex-1 truncate">
            {isMicActive ? (
              <div className="flex items-center gap-2 text-teal-bright font-mono animate-pulse text-[11px]">
                <span className="w-2 h-2 rounded-full bg-teal-bright" />
                <span className="truncate">
                  {currentTranscript ? `"${currentTranscript}"` : 'Listening to speech telemetry...'}
                </span>
              </div>
            ) : isProcessing ? (
              <div className="flex items-center gap-2 text-amber-bright font-mono text-[11px]">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Partner analyzing unit economics response...</span>
              </div>
            ) : (
              <div className="text-[11px] text-ink-muted font-mono truncate">
                Click microphone or tap a preset response below to speak
              </div>
            )}
          </div>

          {/* Quick Demo Response Presets */}
          <div className="hidden md:flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-ink-muted font-mono">Presets:</span>
            {demoPrompts.slice(0, 2).map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendResponse(prompt)}
                className="px-2 py-0.5 rounded-md bg-surface-secondary hover:bg-surface-elevated text-[11px] font-mono text-teal-bright border border-surface-borderHighlight transition-colors truncate max-w-[160px]"
                title={prompt}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Microphone action row */}
        <div className="flex items-center justify-center gap-4">
          {/* Main interactive microphone button */}
          <div className="relative flex items-center justify-center">
            {isMicActive && (
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.6, 0.2, 0.6]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 -m-2 rounded-full bg-teal-subtle blur-md pointer-events-none"
              />
            )}

            <button
              type="button"
              onClick={handleToggleMic}
              disabled={isProcessing}
              aria-label={isMicActive ? 'Stop speaking' : 'Start speaking'}
              className={`relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-200 shadow-terminal ${
                isMicActive
                  ? 'bg-status-error text-ink-primary scale-105'
                  : isProcessing
                  ? 'bg-amber-subtle text-amber-bright border border-amber-border'
                  : 'bg-teal hover:bg-teal-active text-ink-primary hover:scale-105'
              }`}
            >
              {isMicActive ? (
                <Square className="w-4 h-4 fill-current" />
              ) : isProcessing ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Quick text input for silent environments */}
          <div className="hidden sm:flex items-center gap-2 max-w-sm w-full">
            <input
              type="text"
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && typedAnswer.trim()) {
                  handleSendResponse(typedAnswer);
                }
              }}
              placeholder="Or type founder rebuttal..."
              className="flex-1 px-3 py-2 rounded-lg terminal-input text-xs placeholder:text-ink-muted"
            />
            {typedAnswer.trim() && (
              <button
                type="button"
                onClick={() => handleSendResponse(typedAnswer)}
                className="p-2 rounded-lg bg-teal text-ink-primary hover:bg-teal-active transition-colors"
                title="Send answer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SLIDE-OUT TRANSCRIPT DRAWER */}
      <AnimatePresence>
        {showTranscriptDrawer && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-96 terminal-elevated border-l border-surface-borderHighlight shadow-modal flex flex-col bg-surface"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-surface-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-teal-bright" />
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-primary">
                  Meeting Diligence Stream
                </h3>
              </div>
              <button
                onClick={() => setShowTranscriptDrawer(false)}
                className="p-1 rounded-md text-ink-muted hover:text-ink-primary hover:bg-surface-secondary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {conversation.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-lg text-xs ${
                    msg.role === 'investor'
                      ? 'bg-canvas border border-teal-border text-ink-primary'
                      : 'bg-surface-secondary border border-surface-border text-ink-secondary ml-3'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[10px] font-mono">
                    <span
                      className={`font-semibold uppercase ${
                        msg.role === 'investor' ? 'text-teal-bright' : 'text-ink-muted'
                      }`}
                    >
                      {msg.role === 'investor' ? profile.name : 'YOU (FOUNDER)'}
                    </span>
                    <span className="text-ink-muted">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
