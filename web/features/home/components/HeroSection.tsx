'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Zap, CheckCircle, Shield } from 'lucide-react';
import Link from 'next/link';

const HERO_SLIDES = [
  'FORGE YOUR FUTURE IN TECH SECURITY',
  'MASTER CYBERSECURITY WITH LIVE TRAINING',
  'TRANSFORM YOUR CAREER IN 90 DAYS',
  'JOIN THE NEXT GENERATION OF HACKERS',
];

const FEATURES = [
  { icon: Users, text: '1-on-1 Mentorship', color: '#22d3ee' },
  { icon: Zap, text: 'Live Training', color: '#a855f7' },
  { icon: CheckCircle, text: 'Career Guidance', color: '#ec4899' },
  { icon: Shield, text: 'Certification Support', color: '#06b6d4' },
];

const VIDEO_URL = 'https://res.cloudinary.com/dojh4b9sb/video/upload/v1765449734/hero-background_kwhnz8.mp4';
const SLIDE_INTERVAL = 4000;
const STAR_BURST_DURATION = 1500;
const STAR_COUNT = 16;
const SPARKLE_COUNT = 8;

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
  
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  // Auto-slide effect
  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Video autoplay handler
  useEffect(() => {
    if (!videoRef.current || !mounted) return;

    const playVideo = async () => {
      try {
        await videoRef.current?.play();
      } catch (error) {
        console.log('Video autoplay blocked, waiting for user interaction');
        
        const playOnInteraction = () => {
          videoRef.current?.play();
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        };
        
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
      }
    };

    playVideo();
  }, [mounted]);

  // Canvas mouse trail effect
  useEffect(() => {
    if (!mounted || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseXRef.current = e.clientX - rect.left;
      mouseYRef.current = e.clientY - rect.top;

      // Create trail particles
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: mouseXRef.current,
          y: mouseYRef.current,
          size: Math.random() * 3 + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          life: 100,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !e.touches[0]) return;
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      mouseXRef.current = touch.clientX - rect.left;
      mouseYRef.current = touch.clientY - rect.top;

      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: mouseXRef.current,
          y: mouseYRef.current,
          size: Math.random() * 3 + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          life: 100,
        });
      }
    };

    const currentContainer = containerRef.current;
    currentContainer.addEventListener('mousemove', handleMouseMove);
    currentContainer.addEventListener('touchmove', handleTouchMove);

    const animate = () => {
      if (!ctx || !canvas.width || !canvas.height) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mouse glow effect - CYAN
      const gradient = ctx.createRadialGradient(
        mouseXRef.current,
        mouseYRef.current,
        0,
        mouseXRef.current,
        mouseYRef.current,
        150
      );
      gradient.addColorStop(0, 'rgba(34, 211, 238, 0.4)');
      gradient.addColorStop(0.5, 'rgba(34, 211, 238, 0.15)');
      gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles - CYAN
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life -= 2;
        if (particle.size > 0.2) particle.size -= 0.05;

        ctx.fillStyle = `rgba(34, 211, 238, ${particle.life / 100})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      currentContainer.removeEventListener('mousemove', handleMouseMove);
      currentContainer.removeEventListener('touchmove', handleTouchMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted]);

  // Click/Touch star burst effect handler
  const handleInteraction = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    const effect: ClickEffect = { 
      id: Date.now() + Math.random(), 
      x, 
      y 
    };

    setClickEffects(prev => [...prev, effect]);

    setTimeout(() => {
      setClickEffects(prev => prev.filter(ef => ef.id !== effect.id));
    }, STAR_BURST_DURATION);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'BUTTON' && target.tagName !== 'A') {
      handleInteraction(e.clientX, e.clientY);
    }
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (e.touches[0] && target.tagName !== 'BUTTON' && target.tagName !== 'A') {
      handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  if (!mounted) {
    return <div style={{ minHeight: '100vh', background: '#000' }} />;
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
      {/* Video Background */}
      <VideoBackground 
        videoRef={videoRef}
        videoUrl={VIDEO_URL}
        videoLoaded={videoLoaded}
        onLoadedData={() => setVideoLoaded(true)}
      />

      {/* Canvas for mouse trail */}
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
          {/* Badge */}
          <Badge />

          {/* Animated Headline */}
          <HeadlineSlider currentSlide={currentSlide} slides={HERO_SLIDES} />

          {/* Subtitle */}
          <Subtitle />

          {/* CTA Button */}
          <CTAButton />

          {/* Feature Grid */}
          <FeatureGrid features={FEATURES} />

          {/* Slide Indicators */}
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

function VideoBackground({ 
  videoRef, 
  videoUrl, 
  videoLoaded, 
  onLoadedData 
}: { 
  videoRef: React.RefObject<HTMLVideoElement>;
  videoUrl: string;
  videoLoaded: boolean;
  onLoadedData: () => void;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        backgroundColor: '#000',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={onLoadedData}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: videoLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Loading State */}
      {!videoLoaded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #000000 0%, #001a33 50%, #000000 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ 
              color: '#22d3ee', 
              fontSize: '18px', 
              fontWeight: 600,
              fontFamily: 'var(--font-nunito)',
            }}
          >
            Loading...
          </motion.div>
        </div>
      )}
    </div>
  );
}

function StarBurstEffects({ effects }: { effects: ClickEffect[] }) {
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
          }}
        >
          {/* Central Glow */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.8), transparent)',
              boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Stars */}
          {Array.from({ length: STAR_COUNT }).map((_, i) => {
            const angle = (i * 360) / STAR_COUNT;
            const distance = 70;
            const size = Math.random() * 4 + 3;
            
            return (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0, rotate: 0 }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * distance,
                  y: Math.sin((angle * Math.PI) / 180) * distance,
                  opacity: 0,
                  scale: [0, 1.5, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.9))',
                  }}
                >
                  <path
                    d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
                    fill="url(#cyan-gradient)"
                    stroke="rgba(34, 211, 238, 0.9)"
                    strokeWidth="0.5"
                  />
                  <defs>
                    <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            );
          })}

          {/* Sparkles */}
          {Array.from({ length: SPARKLE_COUNT }).map((_, i) => {
            const angle = (i * 360) / SPARKLE_COUNT + 22.5;
            const distance = 45;
            
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
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                style={{
                  position: 'absolute',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #22d3ee, #06b6d4)',
                  boxShadow: '0 0 6px rgba(34, 211, 238, 0.9)',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

function Badge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
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
}

function HeadlineSlider({ currentSlide, slides }: { currentSlide: number; slides: string[] }) {
  return (
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
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(28px, 6vw, 56px)',
            fontWeight: 500,
            color: '#ffffff',
            lineHeight: 1.3,
            textShadow: '0 0 50px rgba(255, 255, 255, 0.4), 0 4px 30px rgba(0, 0, 0, 0.8)',
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
}

function Subtitle() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      style={{
        fontSize: 'clamp(15px, 2.5vw, 18px)',
        color: '#ffffff',
        maxWidth: '750px',
        lineHeight: 1.8,
        fontWeight: 500,
        textShadow: '0 2px 15px rgba(0, 0, 0, 0.9)',
        fontFamily: 'var(--font-nunito)',
      }}
    >
      Go from curious to career-ready with{' '}
      <span style={{ color: '#22d3ee', fontWeight: 700 }}>elite mentorship</span>, 
      hands-on training, and real-world projects.
    </motion.p>
  );
}

function CTAButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      style={{ 
        marginTop: '12px', 
        pointerEvents: 'auto' 
      }}
    >
      <Link href="/courses" style={{ textDecoration: 'none' }}>
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(168, 85, 247, 0.6), 0 0 40px rgba(236, 72, 153, 0.4)',
              '0 0 40px rgba(168, 85, 247, 0.9), 0 0 80px rgba(236, 72, 153, 0.7)',
              '0 0 20px rgba(168, 85, 247, 0.6), 0 0 40px rgba(236, 72, 153, 0.4)',
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
}

function FeatureGrid({ features }: { features: typeof FEATURES }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '900px',
        marginTop: '40px',
        pointerEvents: 'auto',
      }}
    >
      {features.map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: i * 0.15 }}
          whileHover={{
            scale: 1.05,
            y: -8,
            borderColor: feature.color,
            boxShadow: `0 10px 40px ${feature.color}60`,
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            padding: '24px 18px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '16px',
            border: `2px solid ${feature.color}40`,
            transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${feature.color}40, transparent)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <feature.icon style={{ width: '28px', height: '28px', color: feature.color }} />
          </div>
          <p
            style={{
              fontSize: '14px',
              color: '#ffffff',
              fontWeight: 600,
              textAlign: 'center',
              fontFamily: 'var(--font-nunito)',
              letterSpacing: '0.8px',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            }}
          >
            {feature.text}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function SlideIndicators({ 
  slides, 
  currentSlide, 
  onSlideChange 
}: { 
  slides: string[]; 
  currentSlide: number; 
  onSlideChange: (index: number) => void;
}) {
  return (
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
            boxShadow: index === currentSlide ? '0 0 10px #22d3ee' : 'none',
          }}
          onClick={() => onSlideChange(index)}
        />
      ))}
    </div>
  );
}
