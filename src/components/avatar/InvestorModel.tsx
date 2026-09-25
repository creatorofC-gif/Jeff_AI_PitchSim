import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AvatarState } from '../../types/avatar';
import { InvestorPersonality } from '../../types/investor';

interface InvestorModelProps {
  avatarState: AvatarState;
  personality: InvestorPersonality;
  isMale?: boolean;
}

export const InvestorModel: React.FC<InvestorModelProps> = ({
  avatarState,
  personality,
  isMale = true
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const neckRef = useRef<THREE.Group>(null);
  const jawRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const torsoRef = useRef<THREE.Group>(null);

  // Personality aesthetic accents
  const suitColor = personality === 'aggressive_investor'
    ? '#0c0f17' // Jet black suit
    : personality === 'analytical_vc'
    ? '#111827' // Charcoal navy
    : personality === 'corporate_investor'
    ? '#1a202c' // Deep slate
    : '#1e293b'; // Modern angel casual blazer

  const shirtColor = personality === 'angel_investor' ? '#0f172a' : '#f8fafc';
  const tieOrAccentColor = personality === 'aggressive_investor'
    ? '#881337' // Crimson accent
    : personality === 'analytical_vc'
    ? '#0284c7' // Tech cyan accent
    : '#475569';

  // Smooth state transition targets
  const targetRotation = useRef({ x: 0, y: 0, z: 0 });
  const targetHeadPos = useRef({ x: 0, y: 0.85, z: 0 });

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Determine target kinematics per state
    switch (avatarState) {
      case 'idle':
        targetRotation.current = {
          x: Math.sin(t * 1.2) * 0.02,
          y: Math.sin(t * 0.8) * 0.04,
          z: Math.cos(t * 0.6) * 0.015
        };
        targetHeadPos.current = {
          x: 0,
          y: 0.85 + Math.sin(t * 1.5) * 0.01,
          z: 0
        };
        break;

      case 'listening':
        // Attentive lean forward, direct eye contact
        targetRotation.current = {
          x: 0.08 + Math.sin(t * 2) * 0.01,
          y: Math.sin(t * 0.5) * 0.02,
          z: 0
        };
        targetHeadPos.current = {
          x: 0,
          y: 0.83,
          z: 0.08
        };
        break;

      case 'thinking':
        // Inquisitive head tilt, looking up & slightly aside
        targetRotation.current = {
          x: -0.06,
          y: 0.12,
          z: 0.08 + Math.sin(t * 1.2) * 0.01
        };
        targetHeadPos.current = {
          x: 0.02,
          y: 0.86,
          z: -0.02
        };
        break;

      case 'speaking':
        // Natural speech nods and animated jaw
        targetRotation.current = {
          x: Math.sin(t * 4.5) * 0.04 + 0.03,
          y: Math.sin(t * 2.5) * 0.03,
          z: Math.sin(t * 1.8) * 0.015
        };
        targetHeadPos.current = {
          x: 0,
          y: 0.85 + Math.sin(t * 4.5) * 0.015,
          z: 0.04
        };
        break;

      case 'questioning':
        // Slight inquisitive tilt, intense eye focus
        targetRotation.current = {
          x: 0.1,
          y: -0.05,
          z: -0.04
        };
        targetHeadPos.current = {
          x: -0.01,
          y: 0.84,
          z: 0.06
        };
        break;
    }

    // Dampen and interpolate head movement
    if (headRef.current) {
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotation.current.x, delta * 4);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotation.current.y, delta * 4);
      headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, targetRotation.current.z, delta * 4);

      headRef.current.position.y = THREE.MathUtils.lerp(headRef.current.position.y, targetHeadPos.current.y, delta * 4);
      headRef.current.position.z = THREE.MathUtils.lerp(headRef.current.position.z, targetHeadPos.current.z, delta * 4);
    }

    // Dynamic jaw movement when speaking
    if (jawRef.current) {
      if (avatarState === 'speaking') {
        const speechMouthOscillation = (Math.sin(t * 14) + Math.cos(t * 9) * 0.5 + 1.2) * 0.06;
        jawRef.current.position.y = -0.18 - speechMouthOscillation;
        jawRef.current.rotation.x = speechMouthOscillation * 0.8;
      } else {
        jawRef.current.position.y = THREE.MathUtils.lerp(jawRef.current.position.y, -0.18, delta * 8);
        jawRef.current.rotation.x = THREE.MathUtils.lerp(jawRef.current.rotation.x, 0, delta * 8);
      }
    }

    // Natural eye blink every ~4 seconds
    const blinkCycle = t % 4.2;
    const isBlinking = blinkCycle > 4.05 && blinkCycle < 4.18;
    const eyeScaleY = isBlinking ? 0.08 : 1.0;

    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = eyeScaleY;
      rightEyeRef.current.scale.y = eyeScaleY;
    }

    // Subtle breathing expansion on torso
    if (torsoRef.current) {
      const breath = 1.0 + Math.sin(t * 1.5) * 0.008;
      torsoRef.current.scale.set(breath, breath, breath);
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.85, 0]} scale={1.25}>
      {/* Torso & Shoulders with tailored suit */}
      <group ref={torsoRef} position={[0, 0, 0]}>
        {/* Main Chest / Suit Jacket */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.55, 0.45, 0.85, 32]} />
          <meshStandardMaterial
            color={suitColor}
            roughness={0.7}
            metalness={0.15}
          />
        </mesh>

        {/* Suit Shoulders */}
        <mesh position={[-0.45, 0.35, 0]} rotation={[0, 0, -0.15]} castShadow>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color={suitColor} roughness={0.7} />
        </mesh>
        <mesh position={[0.45, 0.35, 0]} rotation={[0, 0, 0.15]} castShadow>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color={suitColor} roughness={0.7} />
        </mesh>

        {/* Arms / Sleeves */}
        <mesh position={[-0.56, 0.02, 0.02]} rotation={[0.08, 0, 0.12]}>
          <cylinderGeometry args={[0.16, 0.14, 0.7, 24]} />
          <meshStandardMaterial color={suitColor} roughness={0.7} />
        </mesh>
        <mesh position={[0.56, 0.02, 0.02]} rotation={[0.08, 0, -0.12]}>
          <cylinderGeometry args={[0.16, 0.14, 0.7, 24]} />
          <meshStandardMaterial color={suitColor} roughness={0.7} />
        </mesh>

        {/* Dress Shirt Collar V-neck */}
        <mesh position={[0, 0.32, 0.18]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.24, 0.28, 0.08]} />
          <meshStandardMaterial color={shirtColor} roughness={0.5} />
        </mesh>

        {/* Lapel details */}
        <mesh position={[-0.14, 0.25, 0.2]} rotation={[0, 0.2, -0.3]}>
          <boxGeometry args={[0.1, 0.45, 0.05]} />
          <meshStandardMaterial color={suitColor} roughness={0.65} />
        </mesh>
        <mesh position={[0.14, 0.25, 0.2]} rotation={[0, -0.2, 0.3]}>
          <boxGeometry args={[0.1, 0.45, 0.05]} />
          <meshStandardMaterial color={suitColor} roughness={0.65} />
        </mesh>

        {/* Tie or Pocket Square */}
        {isMale && (
          <mesh position={[0, 0.16, 0.22]} rotation={[-0.05, 0, 0]}>
            <boxGeometry args={[0.08, 0.38, 0.03]} />
            <meshStandardMaterial color={tieOrAccentColor} roughness={0.4} metalness={0.2} />
          </mesh>
        )}
      </group>

      {/* Neck */}
      <group ref={neckRef} position={[0, 0.58, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.14, 0.16, 0.22, 24]} />
          <meshStandardMaterial color="#cfa68b" roughness={0.55} />
        </mesh>
      </group>

      {/* Head and Face Features */}
      <group ref={headRef} position={[0, 0.85, 0]}>
        {/* Head Cranium */}
        <mesh castShadow>
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshStandardMaterial color="#d4ac92" roughness={0.5} />
        </mesh>

        {/* Jaw & Chin */}
        <mesh ref={jawRef} position={[0, -0.18, 0.06]} castShadow>
          <boxGeometry args={[0.2, 0.12, 0.22]} />
          <meshStandardMaterial color="#c99f84" roughness={0.5} />
        </mesh>

        {/* Sleek Hair Style */}
        <mesh position={[0, 0.12, -0.04]} castShadow>
          <sphereGeometry args={[0.27, 24, 24]} />
          <meshStandardMaterial
            color={isMale ? '#18181b' : '#312e81'}
            roughness={0.8}
          />
        </mesh>
        {/* Hair Front Styling */}
        <mesh position={[0, 0.25, 0.1]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.28, 0.1, 0.18]} />
          <meshStandardMaterial color={isMale ? '#18181b' : '#312e81'} roughness={0.8} />
        </mesh>

        {/* Left Eye */}
        <group position={[-0.09, 0.03, 0.22]}>
          <mesh ref={leftEyeRef}>
            <sphereGeometry args={[0.034, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          {/* Pupil */}
          <mesh position={[0, 0, 0.026]}>
            <sphereGeometry args={[0.016, 12, 12]} />
            <meshStandardMaterial color="#1e3a5f" roughness={0.1} />
          </mesh>
          {/* Eyebrow */}
          <mesh position={[0, 0.045, 0.01]} rotation={[0, 0, avatarState === 'questioning' ? 0.2 : 0]}>
            <boxGeometry args={[0.08, 0.016, 0.02]} />
            <meshStandardMaterial color="#27272a" roughness={0.8} />
          </mesh>
        </group>

        {/* Right Eye */}
        <group position={[0.09, 0.03, 0.22]}>
          <mesh ref={rightEyeRef}>
            <sphereGeometry args={[0.034, 16, 16]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          {/* Pupil */}
          <mesh position={[0, 0, 0.026]}>
            <sphereGeometry args={[0.016, 12, 12]} />
            <meshStandardMaterial color="#1e3a5f" roughness={0.1} />
          </mesh>
          {/* Eyebrow */}
          <mesh position={[0, 0.045, 0.01]} rotation={[0, 0, avatarState === 'questioning' ? -0.1 : 0]}>
            <boxGeometry args={[0.08, 0.016, 0.02]} />
            <meshStandardMaterial color="#27272a" roughness={0.8} />
          </mesh>
        </group>

        {/* Nose bridge & tip */}
        <mesh position={[0, -0.02, 0.26]} rotation={[0.1, 0, 0]}>
          <coneGeometry args={[0.03, 0.08, 16]} />
          <meshStandardMaterial color="#cb9e82" roughness={0.5} />
        </mesh>

        {/* Minimalist Tech Glasses for Analytical / Corporate Investor */}
        {(personality === 'analytical_vc' || personality === 'corporate_investor') && (
          <group position={[0, 0.03, 0.25]}>
            {/* Left rim */}
            <mesh position={[-0.09, 0, 0]}>
              <ringGeometry args={[0.038, 0.045, 24]} />
              <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Right rim */}
            <mesh position={[0.09, 0, 0]}>
              <ringGeometry args={[0.038, 0.045, 24]} />
              <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Bridge */}
            <mesh position={[0, 0.02, 0]}>
              <boxGeometry args={[0.06, 0.008, 0.01]} />
              <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        )}

        {/* Lips / Mouth cavity */}
        <mesh position={[0, -0.12, 0.22]}>
          <boxGeometry args={[0.08, 0.02, 0.02]} />
          <meshStandardMaterial
            color={avatarState === 'speaking' ? '#450a0a' : '#991b1b'}
            roughness={0.6}
          />
        </mesh>
      </group>
    </group>
  );
};
