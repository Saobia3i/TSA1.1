'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// 🚀 Lazy load Feature component
const Feature = dynamic(() => import('@/features/home/components/Feature'), {
  ssr: false,
  loading: () => null,
});

const HERO_SLIDES = [
  'Forge your future in Cybersecurity, AI and Web3',
  'Become Indispensable in the Future of Tech',
  'Live Guidance from Industry Experts',
  'Your Path from Learning to Leading',
  'Join the Next Generation of Tech Leaders.',
  'Build More Than a Career',
];

const VIDEO_URL = 'https://ik.imagekit.io/ekb0d0it0/hero-background_kwhnz8.webm';
const SLIDE_INTERVAL = 4000;
const STAR_BURST_DURATION = 1200;
const STAR_COUNT = 12;
const SPARKLE_COUNT = 6;

const PARTICLE_CONFIG = {
  MAX_PARTICLES: 60,
  CREATION_RATE: 1,
  LIFETIME: 80,
  MIN_SIZE: 1.2,
  MAX_SIZE: 2.5,
  SPEED_MULTIPLIER: 1.2,
  GLOW_RADIUS: 100,
};

interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
}

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const lastMouseMoveRef = useRef<number>(0);

  // 🚀 Mount and start video immediately
  useEffect(() => {
    setMounted(true);

    // Start video load ASAP
    if (videoRef.current) {
      videoRef.current.load();
    }
    
    // Canvas init after tiny delay
    const canvasTimer = setTimeout(() => {
      setCanvasReady(true);
    }, 50);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL);

    return () => {
      clearTimeout(canvasTimer);
      clearInterval(interval);
    };
  }, []);

  // 🚀 Aggressive video autoplay
  useEffect(() => {
    if (!mounted || !videoRef.current) return;

    const video = videoRef.current;
    
    // Multiple event listeners for faster response
    const handleVideoReady = async () => {
      try {
        await video.play();
        setVideoLoaded(true);
      } catch (error) {
        // Silent fail, will play on interaction
        const playOnce = async () => {
          try {
            await video.play();
            setVideoLoaded(true);
          } catch (e) {
            // Ignore
          }
        };
        
        document.addEventListener('click', playOnce, { once: true, passive: true } as any);
        document.addEventListener('touchstart', playOnce, { once: true, passive: true } as any);
        document.addEventListener('scroll', playOnce, { once: true, passive: true } as any);
      }
    };

    // Listen to multiple events for fastest start
    video.addEventListener('loadeddata', handleVideoReady, { once: true });
    video.addEventListener('canplay', handleVideoReady, { once: true });

    return () => {
      video.removeEventListener('loadeddata', handleVideoReady);
      video.removeEventListener('canplay', handleVideoReady);
    };
  }, [mounted]);

  // 🚀 Canvas optimization
  useEffect(() => {
    if (!canvasReady || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { 
      alpha: true,
      desynchronized: true,
      willReadFrequently: false 
    });
    if (!ctx) return;

    let isVisible = true;
    let rafId: number | null = null;

    const resizeCanvas = () => {
      if (!containerRef.current) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = containerRef.current.offsetWidth;
      const height = containerRef.current.offsetHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    };
    
    window.addEventListener('resize', debouncedResize, { passive: true });

    const visibilityHandler = () => {
      isVisible = !document.hidden;
      if (isVisible && !rafId) {
        animate();
      }
    };
    document.addEventListener('visibilitychange', visibilityHandler);

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseMoveRef.current < 16) return;
      lastMouseMoveRef.current = now;

      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseXRef.current = e.clientX - rect.left;
      mouseYRef.current = e.clientY - rect.top;

      if (particlesRef.current.length < PARTICLE_CONFIG.MAX_PARTICLES) {
        particlesRef.current.push({
          x: mouseXRef.current,
          y: mouseYRef.current,
          size: Math.random() * (PARTICLE_CONFIG.MAX_SIZE - PARTICLE_CONFIG.MIN_SIZE) + PARTICLE_CONFIG.MIN_SIZE,
          speedX: (Math.random() - 0.5) * PARTICLE_CONFIG.SPEED_MULTIPLIER,
          speedY: (Math.random() - 0.5) * PARTICLE_CONFIG.SPEED_MULTIPLIER,
          life: PARTICLE_CONFIG.LIFETIME,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const now = performance.now();
      if (now - lastMouseMoveRef.current < 16) return;
      lastMouseMoveRef.current = now;

      if (!containerRef.current || !e.touches[0]) return;
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      mouseXRef.current = touch.clientX - rect.left;
      mouseYRef.current = touch.clientY - rect.top;

      if (particlesRef.current.length < PARTICLE_CONFIG.MAX_PARTICLES) {
        particlesRef.current.push({
          x: mouseXRef.current,
          y: mouseYRef.current,
          size: Math.random() * (PARTICLE_CONFIG.MAX_SIZE - PARTICLE_CONFIG.MIN_SIZE) + PARTICLE_CONFIG.MIN_SIZE,
          speedX: (Math.random() - 0.5) * PARTICLE_CONFIG.SPEED_MULTIPLIER,
          speedY: (Math.random() - 0.5) * PARTICLE_CONFIG.SPEED_MULTIPLIER,
          life: PARTICLE_CONFIG.LIFETIME,
        });
      }
    };

    const currentContainer = containerRef.current;
    currentContainer.addEventListener('mousemove', handleMouseMove, { passive: true });
    currentContainer.addEventListener('touchmove', handleTouchMove, { passive: true });

    const animate = () => {
      if (!ctx || !canvas.width || !canvas.height || !isVisible) {
        rafId = null;
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const gradient = ctx.createRadialGradient(
        mouseXRef.current,
        mouseYRef.current,
        0,
        mouseXRef.current,
        mouseYRef.current,
        PARTICLE_CONFIG.GLOW_RADIUS
      );
      gradient.addColorStop(0, 'rgba(34, 211, 238, 0.25)');
      gradient.addColorStop(0.5, 'rgba(34, 211, 238, 0.08)');
      gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const aliveParticles: Particle[] = [];
      
      ctx.beginPath();
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life -= 2.5;
        particle.size = Math.max(0.2, particle.size - 0.04);

        if (particle.life > 0) {
          aliveParticles.push(particle);
          ctx.fillStyle = `rgba(34, 211, 238, ${particle.life / 100})`;
          ctx.moveTo(particle.x + particle.size, particle.y);
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        }
      }
      ctx.fill();
      
      particlesRef.current = aliveParticles;

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', debouncedResize);
      document.removeEventListener('visibilitychange', visibilityHandler);
      clearTimeout(resizeTimeout);
      currentContainer.removeEventListener('mousemove', handleMouseMove);
      currentContainer.removeEventListener('touchmove', handleTouchMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [canvasReady]);

  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    const effect: ClickEffect = { 
      id: Date.now() + Math.random(), 
      x, 
      y 
    };

    setClickEffects(prev => [...prev.slice(-1), effect]);

    setTimeout(() => {
      setClickEffects(prev => prev.filter(ef => ef.id !== effect.id));
    }, STAR_BURST_DURATION);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'BUTTON' && target.tagName !== 'A' && !target.closest('button, a')) {
      handleInteraction(e.clientX, e.clientY);
    }
  }, [handleInteraction]);

  const handleTouch = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (e.touches[0] && target.tagName !== 'BUTTON' && target.tagName !== 'A' && !target.closest('button, a')) {
      handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handleInteraction]);

  // 🚀 SSR placeholder (no loading text)
  if (!mounted) {
    return (
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #001a33 50%, #000000 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Hidden video starts downloading during SSR phase */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 1, height: 1 }}
        >
          <source src={VIDEO_URL} type="video/webm" />
        </video>

        <div style={{
          width: '100%',
          maxWidth: '1100px',
          padding: '0 24px',
          textAlign: 'center',
        }}>
          <div style={{
            padding: '8px 24px',
            background: 'rgba(6, 182, 212, 0.2)',
            border: '2px solid rgba(234, 150, 8, 0.6)',
            borderRadius: '50px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#e5de00',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            display: 'inline-block',
            marginBottom: '32px',
          }}>
            A Globally Trusted Edtech
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 56px)',
            fontWeight: 500,
            color: '#ffffff',
            lineHeight: 1.3,
            letterSpacing: '8px',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            {HERO_SLIDES[0]}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onTouchStart={handleTouch}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Video Background - NO LOADING TEXT */}
      <VideoBackground 
        videoRef={videoRef}
        videoUrl={VIDEO_URL}
        videoLoaded={videoLoaded}
      />

      {/* Canvas */}
      {canvasReady && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      )}

      {/* Star Burst Click Effects */}
      <StarBurstEffects effects={clickEffects} />

      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '140px 24px 80px',
          display: 'flex',
          alignItems: 'center',
          minHeight: '100vh',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '32px',
            width: '100%',
          }}
        >
          <Badge />
          <HeadlineSlider currentSlide={currentSlide} slides={HERO_SLIDES} />
          <Subtitle />
          <CTAButton />

          <div style={{ pointerEvents: 'auto', marginTop: '40px', width: '100%' }}>
            <Feature />
          </div>

          <SlideIndicators 
            slides={HERO_SLIDES} 
            currentSlide={currentSlide} 
            onSlideChange={setCurrentSlide} 
          />
        </div>
      </div>
    </div>
  );
}

// ============= SUB-COMPONENTS =============

const VideoBackground = ({ 
  videoRef, 
  videoUrl, 
  videoLoaded, 
}: { 
  videoRef: React.RefObject<HTMLVideoElement>;
  videoUrl: string;
  videoLoaded: boolean;
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      {/* Gradient Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #000000 0%, #001a33 50%, #000000 100%)',
          opacity: videoLoaded ? 0 : 1,
          transition: 'opacity 0.4s ease-out',
        }}
      />

      {/* Video - starts loading immediately, no loading text */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 0.4s ease-in-out',
        }}
      >
        <source src={videoUrl} type="video/webm" />
      </video>

      {/* Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
        }}
      />
    </div>
  );
};

const StarBurstEffects = ({ effects }: { effects: ClickEffect[] }) => {
  return (
    <>
      {effects.map(effect => (
        <div 
          key={effect.id} 
          style={{ 
            position: 'absolute', 
            left: `${effect.x}%`, 
            top: `${effect.y}%`, 
            pointerEvents: 'none', 
            zIndex: 20,
            willChange: 'transform',
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.6), transparent)',
              boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {Array.from({ length: STAR_COUNT }).map((_, i) => {
            const angle = (i * 360) / STAR_COUNT;
            const distance = 50;
            const size = Math.random() * 3 + 2;
            
            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * distance,
                  y: Math.sin((angle * Math.PI) / 180) * distance,
                  opacity: 0,
                  scale: [0, 1.2, 0],
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: 'translate(-50%, -50%)',
                  willChange: 'transform',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    filter: 'drop-shadow(0 0 2px rgba(34, 211, 238, 0.8))',
                  }}
                >
                  <path
                    d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
                    fill="#22d3ee"
                    stroke="rgba(34, 211, 238, 0.8)"
                    strokeWidth="0.5"
                  />
                </svg>
              </motion.div>
            );
          })}

          {Array.from({ length: SPARKLE_COUNT }).map((_, i) => {
            const angle = (i * 360) / SPARKLE_COUNT + 30;
            const distance = 35;
            
            return (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * distance,
                  y: Math.sin((angle * Math.PI) / 180) * distance,
                  opacity: 0,
                  scale: [0, 1, 0],
                }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
                style={{
                  position: 'absolute',
                  width: '2px',
                  height: '2px',
                  borderRadius: '50%',
                  background: '#22d3ee',
                  boxShadow: '0 0 4px rgba(34, 211, 238, 0.8)',
                  transform: 'translate(-50%, -50%)',
                  willChange: 'transform',
                }}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

const Badge = () => (
  <motion.div
    initial={{ opacity: 0, y: -15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    style={{
      padding: '8px 24px',
      background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))',
      border: '2px solid rgba(234, 150, 8, 0.6)',
      borderRadius: '50px',
      fontSize: '13px',
      fontWeight: 700,
      color: '#e5de00',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      fontFamily: 'var(--font-nunito)',
      boxShadow: '0 0 30px rgba(234, 150, 108, 0.4)',
      pointerEvents: 'auto',
      backdropFilter: 'blur(10px)',
    }}
  >
    A Globally Trusted Edtech
  </motion.div>
);

const HeadlineSlider = ({ currentSlide, slides }: { currentSlide: number; slides: string[] }) => (
  <div style={{ 
    width: '100%', 
    minHeight: '160px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  }}>
    <AnimatePresence mode="wait">
      <motion.h1
        key={currentSlide}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 'clamp(28px, 6vw, 56px)',
          fontWeight: 500,
          color: '#ffffff',
          lineHeight: 1.3,
          textShadow: '0 0 35px rgba(255, 255, 255, 0.3), 0 4px 20px rgba(0, 0, 0, 0.7)',
          letterSpacing: '8px',
          fontFamily: 'var(--font-nunito)',
          textTransform: 'uppercase',
        }}
      >
        {slides[currentSlide]}
      </motion.h1>
    </AnimatePresence>
  </div>
);

const Subtitle = () => (
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.6 }}
    style={{
      fontSize: 'clamp(15px, 2.5vw, 18px)',
      color: '#ffffff',
      maxWidth: '750px',
      lineHeight: 1.8,
      fontWeight: 500,
      textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)',
      fontFamily: 'var(--font-nunito)',
    }}
  >
    Master in demand technologies through applied learning.{' '}
    <span style={{ color: '#22d3ee', fontWeight: 700 }}>Build, deploy, and secure real systems</span>, 
    with expert mentorship at every step.
  </motion.p>
);

const CTAButton = () => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.6 }}
    style={{ 
      marginTop: '12px', 
      pointerEvents: 'auto' 
    }}
  >
    <Link href="/courses" style={{ textDecoration: 'none' }}>
      <motion.div
        animate={{
          boxShadow: [
            '0 0 20px rgba(168, 85, 247, 0.5), 0 0 35px rgba(236, 72, 153, 0.3)',
            '0 0 35px rgba(168, 85, 247, 0.8), 0 0 70px rgba(236, 72, 153, 0.6)',
            '0 0 20px rgba(168, 85, 247, 0.5), 0 0 35px rgba(236, 72, 153, 0.3)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          borderRadius: '50px',
          padding: '3px',
          background: 'linear-gradient(135deg, #a855f7, #ec4899)',
          display: 'inline-block',
        }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: 800,
            borderRadius: '50px',
            border: 'none',
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-nunito)',
            letterSpacing: '1px',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
          }}
        >
          Explore Courses
          <ArrowRight style={{ width: '20px', height: '20px' }} />
        </motion.button>
      </motion.div>
    </Link>
  </motion.div>
);

const SlideIndicators = ({ 
  slides, 
  currentSlide, 
  onSlideChange 
}: { 
  slides: string[]; 
  currentSlide: number; 
  onSlideChange: (index: number) => void;
}) => (
  <div style={{ 
    display: 'flex', 
    gap: '10px', 
    marginTop: '20px', 
    pointerEvents: 'auto' 
  }}>
    {slides.map((_, index) => (
      <motion.div
        key={index}
        animate={{
          width: index === currentSlide ? '40px' : '10px',
          backgroundColor: index === currentSlide ? '#22d3ee' : '#6b7280',
        }}
        transition={{ duration: 0.3 }}
        style={{
          height: '4px',
          borderRadius: '2px',
          cursor: 'pointer',
          boxShadow: index === currentSlide ? '0 0 8px #22d3ee' : 'none',
        }}
        onClick={() => onSlideChange(index)}
      />
    ))}
  </div>
);