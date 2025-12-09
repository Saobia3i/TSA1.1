// components/backgrounds/AuroraBackground.tsx
'use client';

import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AuroraBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'minimal' | 'vibrant';
}

const AuroraBackground = memo(({ children, variant = 'default' }: AuroraBackgroundProps) => {
  const prefersReducedMotion = useReducedMotion();

  // Variant-based configs
  const configs = {
    default: {
      blur: 80,
      opacity: [0.3, 0.6, 0.3],
      duration: 20,
    },
    minimal: {
      blur: 60,
      opacity: [0.2, 0.4, 0.2],
      duration: 30,
    },
    vibrant: {
      blur: 100,
      opacity: [0.4, 0.8, 0.4],
      duration: 15,
    },
  };

  const config = configs[variant];

  return (
    <div className="aurora-wrapper">
      {/* Static gradient base - no animation */}
      <div className="aurora-base" />

      {/* Animated layers - only 2-3 max */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="aurora-layer aurora-layer-1"
            animate={{
              opacity: config.opacity,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: config.duration,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          />
          
          <motion.div
            className="aurora-layer aurora-layer-2"
            animate={{
              opacity: config.opacity,
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: config.duration + 5,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
              delay: config.duration / 4,
            }}
          />
        </>
      )}

      {/* Content */}
      <div className="aurora-content">{children}</div>

      <style jsx>{`
        .aurora-wrapper {
          position: relative;
          min-height: 100vh;
          isolation: isolate; /* Creates stacking context */
        }

        .aurora-base {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: linear-gradient(to bottom, #000 0%, #001a33 50%, #000 100%);
          pointer-events: none;
        }

        .aurora-layer {
          position: fixed;
          z-index: 0;
          pointer-events: none;
          will-change: transform, opacity;
          transform: translateZ(0); /* GPU acceleration */
          backface-visibility: hidden;
        }

        .aurora-layer-1 {
          top: -10%;
          left: -10%;
          width: 60%;
          height: 60%;
          background: radial-gradient(
            ellipse at center,
            rgba(0, 212, 255, 0.3),
            transparent 70%
          );
          filter: blur(${config.blur}px);
        }

        .aurora-layer-2 {
          top: 20%;
          right: -10%;
          width: 50%;
          height: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(124, 58, 237, 0.25),
            transparent 70%
          );
          filter: blur(${config.blur}px);
        }

        .aurora-content {
          position: relative;
          z-index: 1;
        }

        /* Performance optimization */
        @media (prefers-reduced-motion: reduce) {
          .aurora-layer {
            animation: none !important;
          }
        }

        /* Mobile optimization */
        @media (max-width: 768px) {
          .aurora-layer {
            filter: blur(60px); /* Less blur on mobile */
            opacity: 0.5; /* Reduced opacity */
          }
        }
      `}</style>
    </div>
  );
});

AuroraBackground.displayName = 'AuroraBackground';

export default AuroraBackground;
