import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const TerminalMotionBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Top Precision Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal to-teal-active z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Subtle Awwwards Spotlight Following Cursor */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(15, 118, 110, 0.12), transparent 70%)`
        }}
      />

      {/* Background Micro Grid Layer */}
      <div className="fixed inset-0 terminal-grid pointer-events-none z-0 opacity-40" />
    </>
  );
};
