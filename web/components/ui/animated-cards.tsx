'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface InfiniteScrollCard {
  id: string;
  content: React.ReactNode;
}

interface InfiniteScrollCardsProps {
  cards: InfiniteScrollCard[];
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
}

export const InfiniteScrollCards: React.FC<InfiniteScrollCardsProps> = ({
  cards,
  speed = 'normal',
  direction = 'left',
  pauseOnHover = true,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const speedMap = {
    slow: 50,
    normal: 30,
    fast: 15,
  };

  const duration = speedMap[speed];

  useEffect(() => {
    if (scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });
    }
  }, []);

  return (
    <div
      style={{
        width: '100%',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
      }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        ref={scrollerRef}
        style={{
          display: 'flex',
          gap: '20px',
          width: 'max-content',
        }}
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
          ...(isPaused && { duration: 0 }),
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              minWidth: '350px',
              flexShrink: 0,
            }}
          >
            {card.content}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

interface GlowingCardProps {
  children: React.ReactNode;
  glowColor?: string;
  className?: string;
}

export const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  glowColor = '#22d3ee',
  className = '',
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'relative',
        padding: '28px',
        backgroundColor: 'rgba(17, 24, 39, 0.6)',
        borderRadius: '20px',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      className={className}
    >
      {/* Glowing effect on hover */}
      {isHovering && (
        <motion.div
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)`,
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
            pointerEvents: 'none',
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Border glow effect */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          padding: '2px',
          background: `linear-gradient(135deg, ${glowColor}40, transparent)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  );
};

interface AnimatedBorderCardProps {
  children: React.ReactNode;
  borderColor?: string;
  className?: string;
}

export const AnimatedBorderCard: React.FC<AnimatedBorderCardProps> = ({
  children,
  borderColor = '#22d3ee',
  className = '',
}) => {
  return (
    <motion.div
      style={{
        position: 'relative',
        padding: '28px',
        backgroundColor: 'rgba(17, 24, 39, 0.6)',
        borderRadius: '20px',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {/* Animated border */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '20px',
          background: `conic-gradient(from 0deg, ${borderColor}, #a855f7, ${borderColor})`,
          zIndex: 0,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Inner background to create border effect */}
      <div
        style={{
          position: 'absolute',
          inset: '2px',
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          borderRadius: '18px',
          zIndex: 1,
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </motion.div>
  );
};
