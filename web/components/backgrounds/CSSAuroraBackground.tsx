'use client';

interface CSSAuroraBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
  children: React.ReactNode;
}

export default function CSSAuroraBackground({
  intensity = 'low',
  children,
}: CSSAuroraBackgroundProps) {
  // Map intensity to opacity
  const opacity = intensity === 'low' ? 0.15 : intensity === 'medium' ? 0.25 : 0.35;

  // Detect low-end devices to skip heavy animations
  const isLowEnd =
    typeof window !== 'undefined' &&
    (window.innerWidth < 768 || navigator.hardwareConcurrency < 4);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#111827]">
      {/* Aurora Background */}
      {!isLowEnd && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 aurora-layer"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 80%, rgba(120,119,198,${opacity}) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255,119,198,${opacity}) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(34,211,238,${opacity}) 0%, transparent 50%)
              `,
              filter: 'blur(60px)',
              backgroundSize: '400% 400%',
              animation: 'auroraShift 25s linear infinite, auroraPulse 18s ease-in-out infinite',
              willChange: 'background-position, opacity, transform',
            }}
          />
        </div>
      )}

      {/* Page Content */}
      <div className="relative z-10">{children}</div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes auroraShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes auroraPulse {
          0%, 100% { opacity: 0.6; transform: translate(0,0); }
          50% { opacity: 1; transform: translate(10px, -10px); }
        }

        /* Optional: reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .aurora-layer {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
