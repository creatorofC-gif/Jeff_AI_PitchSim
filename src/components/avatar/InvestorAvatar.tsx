import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AvatarState } from '../../types/avatar';
import { InvestorPersonality } from '../../types/investor';
import { InvestorModel } from './InvestorModel';
import { AvatarEnvironment } from './AvatarEnvironment';
import { Loader2, Volume2, Mic, Brain, Sparkles } from 'lucide-react';

interface InvestorAvatarProps {
  avatarState: AvatarState;
  personality: InvestorPersonality;
  investorName?: string;
  firmName?: string;
}

const AvatarLoadingFallback = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-canvas/90 z-10">
    <Loader2 className="w-8 h-8 text-teal-bright animate-spin mb-2.5" />
    <p className="text-xs font-mono text-ink-muted uppercase tracking-wider">
      Initializing 3D Boardroom Mesh...
    </p>
  </div>
);

export const InvestorAvatar: React.FC<InvestorAvatarProps> = ({
  avatarState,
  personality,
  investorName = 'Marcus Vance',
  firmName = 'Apex Horizon Ventures'
}) => {
  const isFemale = personality === 'angel_investor' || personality === 'corporate_investor';

  const getStateBadge = () => {
    switch (avatarState) {
      case 'listening':
        return {
          label: 'Active Vocal Monitoring',
          color: 'bg-teal-subtle text-teal-bright border-teal-border',
          dot: 'bg-teal-bright',
          icon: <Mic className="w-3 h-3 mr-1.5" />
        };
      case 'thinking':
        return {
          label: 'Analyzing Thesis & Economics...',
          color: 'bg-amber-subtle text-amber-bright border-amber-border',
          dot: 'bg-amber-bright',
          icon: <Brain className="w-3 h-3 mr-1.5" />
        };
      case 'speaking':
        return {
          label: 'Investor Inquiring',
          color: 'bg-teal-subtle text-teal-bright border-teal-border',
          dot: 'bg-teal-bright',
          icon: <Volume2 className="w-3 h-3 mr-1.5" />
        };
      case 'questioning':
        return {
          label: 'Probing Defensibility',
          color: 'bg-amber-subtle text-amber-bright border-amber-border',
          dot: 'bg-amber-bright',
          icon: <Sparkles className="w-3 h-3 mr-1.5" />
        };
      default:
        return {
          label: 'Terminal Active',
          color: 'bg-surface text-ink-secondary border-surface-border',
          dot: 'bg-ink-muted',
          icon: null
        };
    }
  };

  const badge = getStateBadge();

  return (
    <div className="relative w-full h-full min-h-[440px] lg:min-h-[580px] rounded-xl overflow-hidden bg-canvas-darkest border border-surface-borderHighlight shadow-terminal flex items-center justify-center">
      {/* 3D Canvas */}
      <Suspense fallback={<AvatarLoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0.4, 2.6], fov: 38 }}
          shadows
          className="w-full h-full cursor-grab active:cursor-grabbing"
          gl={{ antialias: true, alpha: true }}
        >
          <AvatarEnvironment personality={personality} />
          <InvestorModel
            avatarState={avatarState}
            personality={personality}
            isMale={!isFemale}
          />
        </Canvas>
      </Suspense>

      {/* Floating Header Card inside Avatar Viewport */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="terminal-panel px-3 py-2 rounded-lg border border-surface-borderHighlight flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-sm bg-teal-bright animate-pulse" />
          <div>
            <div className="text-xs font-semibold text-ink-primary font-display">{investorName}</div>
            <div className="text-[10px] text-ink-muted font-mono">{firmName}</div>
          </div>
        </div>
      </div>

      {/* Dynamic State Badge at Top-Right */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <div
          className={`flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all duration-200 ${badge.color}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${badge.dot}`} />
          {badge.icon}
          {badge.label}
        </div>
      </div>

      {/* Subtle Studio Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-black/20" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.85)]" />
    </div>
  );
};
