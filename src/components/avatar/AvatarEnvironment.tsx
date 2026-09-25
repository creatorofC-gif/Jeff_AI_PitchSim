import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { InvestorPersonality } from '../../types/investor';

interface AvatarEnvironmentProps {
  personality: InvestorPersonality;
}

export const AvatarEnvironment: React.FC<AvatarEnvironmentProps> = ({ personality }) => {
  const particlesRef = useRef<THREE.Points>(null);

  // Subtle ambient dust particles
  const particleCount = 40;
  const particlePositions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 6;
      pos[i + 1] = (Math.random() - 0.2) * 4;
      pos[i + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02;
    }
  });

  const ambientAccent =
    personality === 'aggressive_investor'
      ? '#C58A32' // Muted amber partner skepticism
      : '#0F766E'; // Venture teal conviction

  return (
    <>
      {/* Studio Key Light */}
      <directionalLight
        position={[2.5, 3.5, 3]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        color="#F4F5F7"
      />

      {/* Subtle Rim Light to outline the avatar */}
      <directionalLight
        position={[-3, 2.5, -2]}
        intensity={2.0}
        color={ambientAccent}
      />

      {/* Soft Fill Light from below/front */}
      <directionalLight
        position={[0, -1, 2]}
        intensity={0.4}
        color="#6F7B89"
      />

      {/* Ambient Room Light */}
      <ambientLight intensity={0.6} color="#111821" />

      {/* Conference Room Ground / Boardroom table reflection */}
      <mesh position={[0, -1.9, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 16]} />
        <meshStandardMaterial
          color="#080F17"
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>

      {/* Background Architectural Wall panel */}
      <mesh position={[0, 0.5, -3.2]}>
        <planeGeometry args={[14, 8]} />
        <meshStandardMaterial
          color="#0B0F14"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Subtle Wall Accent Linear Divider */}
      <mesh position={[0, -0.6, -3.15]}>
        <boxGeometry args={[7, 0.02, 0.01]} />
        <meshBasicMaterial color="#1E293B" />
      </mesh>

      {/* Subtle Floating Dust motes */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#80D5CB"
          transparent
          opacity={0.25}
          sizeAttenuation
        />
      </points>
    </>
  );
};
