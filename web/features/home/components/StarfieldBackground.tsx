'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  twinkleSpeed: number;
  cluster?: boolean;
}

export default function StarfieldBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [clickEffects, setClickEffects] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [mounted, setMounted] = useState(false);

  // Galaxy color palette
  const galaxyColors = [
    'rgba(147, 51, 234, 1)',
    'rgba(168, 85, 247, 1)',
    'rgba(59, 130, 246, 1)',
    'rgba(96, 165, 250, 1)',
    'rgba(236, 72, 153, 1)',
    'rgba(251, 207, 232, 1)',
    'rgba(255, 255, 255, 1)',
    'rgba(203, 213, 225, 1)',
  ];

  useEffect(() => {
    setMounted(true);

    const createGalaxyStars = () => {
      const newStars: Star[] = [];
      const starCount = 400;

      // Galaxy clusters
      const clusters = [
        { x: 30, y: 20, density: 60 },
        { x: 60, y: 40, density: 80 },
        { x: 45, y: 60, density: 50 },
      ];

      // Clustered stars
      clusters.forEach((cluster) => {
        for (let i = 0; i < cluster.density; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 25;
          newStars.push({
            id: newStars.length,
            x: cluster.x + Math.cos(angle) * distance,
            y: cluster.y + Math.sin(angle) * distance,
            size: Math.random() * 2.5 + 0.5,
            speed: Math.random() * 0.3 + 0.1,
            opacity: Math.random() * 0.7 + 0.3,
            color: galaxyColors[Math.floor(Math.random() * galaxyColors.length)],
            twinkleSpeed: Math.random() * 4 + 2,
            cluster: true,
          });
        }
      });

      // Scattered stars
      for (let i = 0; i < starCount - newStars.length; i++) {
        newStars.push({
          id: newStars.length,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.3,
          speed: Math.random() * 0.4 + 0.15,
          opacity: Math.random() * 0.6 + 0.2,
          color: galaxyColors[Math.floor(Math.random() * galaxyColors.length)],
          twinkleSpeed: Math.random() * 3 + 2,
          cluster: false,
        });
      }

      setStars(newStars);
    };

    createGalaxyStars();
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const clickEffect = {
          id: Date.now(),
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        };
        
        setClickEffects((prev) => [...prev, clickEffect]);
        
        setTimeout(() => {
          setClickEffects((prev) => prev.filter((effect) => effect.id !== clickEffect.id));
        }, 2000);
      }
    };

    const handleTouch = (e: TouchEvent) => {
      if (containerRef.current && e.touches[0]) {
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const clickEffect = {
          id: Date.now(),
          x: ((touch.clientX - rect.left) / rect.width) * 100,
          y: ((touch.clientY - rect.top) / rect.height) * 100,
        };
        
        setClickEffects((prev) => [...prev, clickEffect]);
        
        setTimeout(() => {
          setClickEffects((prev) => prev.filter((effect) => effect.id !== clickEffect.id));
        }, 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouch);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #0a0118 0%, #1a0b2e 40%, #16213e 100%)',
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #0a0118 0%, #1a0b2e 40%, #16213e 100%)',
      }}
    >
      {/* Animated Galaxy Nebula Clouds */}
      <motion.div
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.15, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.2) 40%, transparent 70%)',
          filter: 'blur(90px)',
          borderRadius: '50%',
        }}
      />

      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '35%',
          right: '15%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.35) 0%, rgba(59, 130, 246, 0.15) 40%, transparent 70%)',
          filter: 'blur(100px)',
          borderRadius: '50%',
        }}
      />

      <motion.div
        animate={{
          opacity: [0.35, 0.65, 0.35],
          scale: [1, 1.25, 1],
          rotate: [0, 6, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '35%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0.15) 40%, transparent 70%)',
          filter: 'blur(95px)',
          borderRadius: '50%',
        }}
      />

      {/* Milky Way dust lane */}
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scaleX: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '0%',
          width: '100%',
          height: '200px',
          background: 'linear-gradient(to right, transparent, rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.15), transparent)',
          filter: 'blur(60px)',
          transform: 'rotate(-15deg)',
        }}
      />

      {/* Stars */}
      {stars.map((star) => {
        const distanceFromMouse = Math.sqrt(
          Math.pow(star.x - mousePos.x, 2) + Math.pow(star.y - mousePos.y, 2)
        );
        const isNearMouse = distanceFromMouse < 12;

        return (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.4],
              scale: isNearMouse ? [1, 2.5, 1] : star.cluster ? [1, 1.3, 1] : [1, 1.15, 1],
              y: ['0%', `-${star.speed * 80}%`],
            }}
            transition={{
              opacity: {
                duration: star.twinkleSpeed,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              scale: {
                duration: isNearMouse ? 0.4 : star.twinkleSpeed,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              y: {
                duration: 25 / star.speed,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              borderRadius: '50%',
              background: star.color,
              boxShadow: isNearMouse 
                ? `0 0 ${star.size * 8}px ${star.color}, 0 0 ${star.size * 16}px ${star.color}`
                : `0 0 ${star.size * 4}px ${star.color}, 0 0 ${star.size * 8}px ${star.color}`,
              filter: isNearMouse ? 'brightness(2.5)' : 'brightness(1)',
              transition: 'filter 0.3s, box-shadow 0.3s',
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* Click Effects */}
      {clickEffects.map((effect) => (
        <motion.div
          key={effect.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: `${effect.x}%`,
            top: `${effect.y}%`,
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            border: '3px solid rgba(34, 211, 238, 0.8)',
            boxShadow: '0 0 40px rgba(34, 211, 238, 0.6), inset 0 0 30px rgba(34, 211, 238, 0.3)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Glitter Particles */}
      {clickEffects.map((effect) =>
        Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          const distance = 70;
          return (
            <motion.div
              key={`${effect.id}-particle-${i}`}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos((angle * Math.PI) / 180) * distance,
                y: Math.sin((angle * Math.PI) / 180) * distance,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: `${effect.x}%`,
                top: `${effect.y}%`,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #22d3ee, #a855f7, #ec4899)',
                boxShadow: '0 0 15px rgba(34, 211, 238, 0.8)',
                pointerEvents: 'none',
              }}
            />
          );
        })
      )}

      {/* Shooting Stars - Fixed positions to avoid hydration mismatch */}
      {[
        { delay: 0, startY: 15 },
        { delay: 6, startY: 35 },
        { delay: 12, startY: 55 },
        { delay: 18, startY: 25 },
      ].map((shooting, i) => (
        <motion.div
          key={`shooting-${i}`}
          initial={{ x: '-150px', y: `${shooting.startY}%`, opacity: 0 }}
          animate={{
            x: '120vw',
            y: `${shooting.startY + 10}%`,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: shooting.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            width: '120px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), rgba(147, 51, 234, 0.6), transparent)',
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.6)',
            transform: 'rotate(-25deg)',
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  );
}
