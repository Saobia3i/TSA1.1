// components/backgrounds/CSSAuroraBackground.tsx
import { ReactNode } from 'react';
import { memo } from 'react';

interface CSSAuroraProps {
  children: ReactNode;
  intensity?: 'low' | 'medium' | 'high';
}

export default function CSSAuroraBackground({ 
  children, 
  intensity = 'medium' 
}: CSSAuroraProps) {
  return (
    <div className={`css-aurora-wrapper intensity-${intensity}`}>
      <div className="aurora-gradient aurora-1" />
      <div className="aurora-gradient aurora-2" />
      <div className="aurora-gradient aurora-3" />
      
      <div className="content-wrapper">{children}</div>

      <style jsx>{`
        .css-aurora-wrapper {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(to bottom, #000 0%, #001a33 50%, #000 100%);
          overflow: hidden;
        }

        .aurora-gradient {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .aurora-1 {
          top: -10%;
          left: -10%;
          width: 60%;
          height: 60%;
          background: radial-gradient(
            circle,
            rgba(0, 212, 255, 0.3) 0%,
            transparent 70%
          );
          filter: blur(80px);
          animation: aurora-float-1 25s infinite;
        }

        .aurora-2 {
          top: 20%;
          right: -10%;
          width: 50%;
          height: 50%;
          background: radial-gradient(
            circle,
            rgba(124, 58, 237, 0.25) 0%,
            transparent 70%
          );
          filter: blur(80px);
          animation: aurora-float-2 30s infinite;
          animation-delay: 5s;
        }

        .aurora-3 {
          bottom: -5%;
          left: 25%;
          width: 50%;
          height: 50%;
          background: radial-gradient(
            circle,
            rgba(6, 182, 212, 0.2) 0%,
            transparent 70%
          );
          filter: blur(90px);
          animation: aurora-float-3 35s infinite;
          animation-delay: 10s;
        }

        @keyframes aurora-float-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          33% {
            transform: translate(50px, 30px) scale(1.1);
            opacity: 0.5;
          }
          66% {
            transform: translate(-30px, 50px) scale(0.95);
            opacity: 0.4;
          }
        }

        @keyframes aurora-float-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.25;
          }
          50% {
            transform: translate(-40px, -40px) scale(1.15);
            opacity: 0.45;
          }
        }

        @keyframes aurora-float-3 {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translateY(30px) scale(1.1);
            opacity: 0.4;
          }
        }

        .content-wrapper {
          position: relative;
          z-index: 1;
        }

        /* Intensity variations */
        .intensity-low .aurora-gradient {
          opacity: 0.5;
          filter: blur(60px);
        }

        .intensity-high .aurora-gradient {
          opacity: 1;
          filter: blur(100px);
        }

        /* Mobile optimization */
        @media (max-width: 768px) {
          .aurora-gradient {
            filter: blur(50px) !important;
            opacity: 0.4 !important;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .aurora-gradient {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
