'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Shield, 
  Lock, 
  Eye, 
  Fingerprint, 
  CheckCircle, 
  Star, 
  Users, 
  Award,
  TrendingUp,
  Zap,
  Database,
  Server,
  Code
} from 'lucide-react';
import Link from 'next/link';
import Feature from '@/features/home/components/Feature';

const HERO_SLIDES = [
  'Defend Against Tomorrow\'s Threats Today',
  'Elite Cybersecurity Training',
  'From Beginner to Security Expert',
  'Master AI-Powered Security',
  'Join the Cyber Defense Elite',
];

const SLIDE_INTERVAL = 4000;
const PARTICLE_COUNT = 80;
const MATRIX_COLUMNS = 40;

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface MatrixColumn {
  x: number;
  y: number;
  speed: number;
  characters: string[];
}

export default function CyberSecurityHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scanlinePosition, setScanlinePosition] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const matrixColumnsRef = useRef<MatrixColumn[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const matrixAnimationRef = useRef<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX = useTransform(mouseX, [-500, 500], [-20, 20]);
  const parallaxY = useTransform(mouseY, [-500, 500], [-20, 20]);

  // Scanline animation
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setScanlinePosition((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, [mounted]);

  // Auto-slide
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking with parallax
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted, mouseX, mouseY]);

  // Matrix Rain Effect
  useEffect(() => {
    if (!mounted || !matrixCanvasRef.current || !containerRef.current) return;

    const canvas = matrixCanvasRef.current;
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

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize matrix columns
    for (let i = 0; i < columns; i++) {
      matrixColumnsRef.current.push({
        x: i * fontSize,
        y: Math.random() * -canvas.height,
        speed: Math.random() * 3 + 2,
        characters: Array(Math.floor(canvas.height / fontSize))
          .fill(0)
          .map(() => chars[Math.floor(Math.random() * chars.length)]),
      });
    }

    const animateMatrix = () => {
      if (!ctx || !canvas.width || !canvas.height) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      
      matrixColumnsRef.current.forEach((column, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Cyan color for matrix effect
        ctx.fillStyle = `rgba(0, 255, 255, ${Math.random() * 0.5 + 0.3})`;
        ctx.fillText(char, column.x, column.y);

        // Trail effect
        for (let j = 1; j < 10; j++) {
          const opacity = (10 - j) / 20;
          ctx.fillStyle = `rgba(0, 255, 255, ${opacity})`;
          ctx.fillText(
            column.characters[j] || char,
            column.x,
            column.y - j * fontSize
          );
        }

        column.y += column.speed;

        if (column.y > canvas.height + Math.random() * 500) {
          column.y = Math.random() * -500;
        }
      });

      matrixAnimationRef.current = requestAnimationFrame(animateMatrix);
    };

    animateMatrix();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (matrixAnimationRef.current) {
        cancelAnimationFrame(matrixAnimationRef.current);
      }
    };
  }, [mounted]);

  // Particle network animation
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

    // Initialize particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    const animate = () => {
      if (!ctx || !canvas.width || !canvas.height) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with cyan glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `rgba(0, 255, 255, ${particle.opacity})`);
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted]);

  if (!mounted) {
    return <div style={{ minHeight: '100vh', background: '#000' }} />;
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#000000',
      }}
    >
      {/* Matrix Rain Background */}
      <canvas
        ref={matrixCanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      {/* Dark Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 30% 20%, rgba(0, 255, 255, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 70% 80%, rgba(0, 150, 255, 0.06) 0%, transparent 40%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.9) 100%)
          `,
          zIndex: 1,
        }}
      />

      {/* Cyber Grid */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.3,
          zIndex: 1,
        }}
      />

      {/* Scanline Effect */}
      <motion.div
        animate={{ top: `${scanlinePosition}%` }}
        transition={{ duration: 0.05, ease: 'linear' }}
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '2px',
          background: 'linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.3), transparent)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Particle Network Canvas */}
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

      {/* Mouse Spotlight */}
      <motion.div
        style={{
          position: 'absolute',
          left: mousePosition.x - 400,
          top: mousePosition.y - 400,
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 2,
          filter: 'blur(50px)',
        }}
      />

      {/* Floating Security Icons */}
      <FloatingSecurityIcons />

      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1300px',
          margin: '0 auto',
          padding: '140px 24px 80px',
          display: 'flex',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '36px',
            width: '100%',
          }}
        >
          {/* Premium Badge */}
          <CyberBadge />

          {/* Headline with Glitch Effect */}
          <HeadlineSlider currentSlide={currentSlide} slides={HERO_SLIDES} parallaxX={parallaxX} />

          {/* Subheadline */}
          <CyberSubheadline parallaxY={parallaxY} />

          {/* Trust Indicators */}
          <SecurityStats />

          {/* Dual CTA Buttons */}
          <CTASection />

          {/* Security Certifications */}
          <SecurityCertifications />

          {/* Urgency Banner */}
          <UrgencyBanner />

          {/* Feature Grid */}
          <div style={{ marginTop: '60px', width: '100%' }}>
            <Feature />
          </div>

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

function FloatingSecurityIcons() {
  const icons = [
    { Icon: Shield, x: 8, y: 15, delay: 0, color: '#00ffff' },
    { Icon: Lock, x: 88, y: 25, delay: 0.5, color: '#0096ff' },
    { Icon: Eye, x: 12, y: 65, delay: 1, color: '#00ccff' },
    { Icon: Fingerprint, x: 90, y: 70, delay: 1.5, color: '#00ffcc' },
    { Icon: Database, x: 15, y: 40, delay: 0.3, color: '#00d4ff' },
    { Icon: Server, x: 85, y: 50, delay: 0.8, color: '#00e5ff' },
  ];

  return (
    <>
      {icons.map((item, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${item.x}%`,
            top: `${item.y}%`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${item.color}15, transparent)`,
              border: `1px solid ${item.color}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}
          >
            <item.Icon style={{ width: '32px', height: '32px', color: item.color, opacity: 0.6 }} />
          </div>
        </motion.div>
      ))}
    </>
  );
}

function CyberBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        animate={{
          boxShadow: [
            '0 0 30px rgba(0, 255, 255, 0.4)',
            '0 0 50px rgba(0, 255, 255, 0.6)',
            '0 0 30px rgba(0, 255, 255, 0.4)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 32px',
          background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(0, 150, 255, 0.1))',
          border: '2px solid rgba(0, 255, 255, 0.4)',
          borderRadius: '50px',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated border glow */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: -2,
            background: 'conic-gradient(from 0deg, transparent, rgba(0, 255, 255, 0.5), transparent)',
            borderRadius: '50px',
            zIndex: -1,
          }}
        />
        
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Shield style={{ width: '22px', height: '22px', color: '#00ffff' }} />
        </motion.div>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 800,
            color: '#00ffff',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontFamily: 'var(--font-nunito)',
            textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
          }}
        >
          Industry-Leading Security Training
        </span>
      </motion.div>
    </motion.div>
  );
}

function HeadlineSlider({ 
  currentSlide, 
  slides, 
  parallaxX 
}: { 
  currentSlide: number; 
  slides: string[];
  parallaxX: any;
}) {
  return (
    <motion.div 
      style={{ 
        x: parallaxX,
        width: '100%', 
        minHeight: '220px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentSlide}
          initial={{ opacity: 0, y: 60, scale: 0.85, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -60, scale: 0.85, filter: 'blur(20px)' }}
          transition={{ 
            duration: 1, 
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            fontSize: 'clamp(38px, 8vw, 80px)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #00ffff 0%, #ffffff 40%, #00ffff 80%, #0096ff 100%)',
            backgroundSize: '200% 200%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1,
            letterSpacing: '-3px',
            fontFamily: 'var(--font-nunito)',
            position: 'relative',
            textShadow: '0 0 80px rgba(0, 255, 255, 0.3)',
          }}
        >
          {slides[currentSlide]}
          
          {/* Glitch effect overlay */}
          <motion.span
            animate={{
              opacity: [0, 0.3, 0],
              x: [-2, 2, -2],
            }}
            transition={{
              duration: 0.1,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              color: '#00ffff',
              mixBlendMode: 'screen',
              pointerEvents: 'none',
            }}
          >
            {slides[currentSlide]}
          </motion.span>
        </motion.h1>
      </AnimatePresence>

      {/* Animated underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          width: '100%',
          maxWidth: '600px',
          height: '3px',
          background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
          borderRadius: '2px',
          transformOrigin: 'center',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
        }}
      />
    </motion.div>
  );
}

function CyberSubheadline({ parallaxY }: { parallaxY: any }) {
  return (
    <motion.div
      style={{ y: parallaxY }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 1 }}
    >
      <div
        style={{
          fontSize: 'clamp(19px, 3.5vw, 26px)',
          color: '#e5e7eb',
          maxWidth: '900px',
          lineHeight: 1.7,
          fontWeight: 600,
          fontFamily: 'var(--font-nunito)',
        }}
      >
        <span style={{ color: '#00ffff', fontWeight: 800 }}>Stop being vulnerable.</span> Master
        <span style={{ color: '#00ffff', fontWeight: 800 }}> AI-powered cybersecurity</span>, ethical hacking, and 
        <span style={{ color: '#00ffff', fontWeight: 800 }}> Web3 security</span> from industry experts.
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          fontSize: '17px',
          color: '#9ca3af',
          marginTop: '20px',
          fontFamily: 'var(--font-nunito)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle style={{ width: '18px', height: '18px', color: '#00ffff' }} />
          <span>Live Training</span>
        </div>
        <span style={{ color: '#374151' }}>•</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle style={{ width: '18px', height: '18px', color: '#00ffff' }} />
          <span>Hands-On Projects</span>
        </div>
        <span style={{ color: '#374151' }}>•</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle style={{ width: '18px', height: '18px', color: '#00ffff' }} />
          <span>Industry Certifications</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SecurityStats() {
  const stats = [
    { icon: Users, value: '15,000+', label: 'Security Professionals', color: '#00ffff' },
    { icon: Award, value: '98%', label: 'Job Placement', color: '#00d4ff' },
    { icon: Star, value: '4.9/5', label: 'Expert Rating', color: '#00e5ff' },
    { icon: TrendingUp, value: '$120K+', label: 'Avg. Starting Salary', color: '#00ccff' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 1 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '1000px',
        marginTop: '20px',
      }}
    >
      {stats.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
          whileHover={{ scale: 1.08, y: -8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            padding: '28px 24px',
            background: 'rgba(0, 0, 0, 0.6)',
            border: `1px solid ${item.color}30`,
            borderRadius: '20px',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          {/* Glow effect on hover */}
          <motion.div
            whileHover={{ opacity: 0.3 }}
            initial={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at center, ${item.color}40, transparent)`,
              pointerEvents: 'none',
            }}
          />
          
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
              border: `2px solid ${item.color}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <item.icon style={{ width: '28px', height: '28px', color: item.color }} />
          </div>
          
          <span style={{ 
            fontSize: '32px', 
            fontWeight: 900, 
            color: '#ffffff',
            fontFamily: 'var(--font-nunito)',
            textShadow: `0 0 20px ${item.color}60`,
          }}>
            {item.value}
          </span>
          
          <span style={{ 
            fontSize: '13px', 
            color: '#9ca3af',
            fontFamily: 'var(--font-nunito)',
            textAlign: 'center',
            lineHeight: 1.4,
          }}>
            {item.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function CTASection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1 }}
      style={{ 
        marginTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Primary CTA */}
        <Link href="/courses" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 40px rgba(0, 255, 255, 0.4)',
                  '0 0 70px rgba(0, 255, 255, 0.7)',
                  '0 0 40px rgba(0, 255, 255, 0.4)',
                ],
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity },
              }}
              style={{
                padding: '22px 52px',
                fontSize: '19px',
                fontWeight: 900,
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #00ffff 0%, #0096ff 100%)',
                color: '#000000',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                fontFamily: 'var(--font-nunito)',
                letterSpacing: '0.5px',
                border: 'none',
                textTransform: 'uppercase',
                position: 'relative',
              }}
            >
              <Lock style={{ width: '22px', height: '22px' }} />
              <span>Start Your Journey</span>
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight style={{ width: '24px', height: '24px' }} />
              </motion.div>

              {/* Shine effect */}
              <motion.div
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '50%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                  transform: 'skewX(-20deg)',
                }}
              />
            </motion.div>
          </motion.div>
        </Link>

        {/* Secondary CTA */}
        <motion.button
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: '22px 52px',
            fontSize: '19px',
            fontWeight: 800,
            borderRadius: '50px',
            background: 'rgba(0, 0, 0, 0.6)',
            border: '2px solid rgba(0, 255, 255, 0.4)',
            color: '#00ffff',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            fontFamily: 'var(--font-nunito)',
            backdropFilter: 'blur(20px)',
            textTransform: 'uppercase',
          }}
        >
          <Code style={{ width: '22px', height: '22px' }} />
          <span>View Curriculum</span>
        </motion.button>
      </div>

      {/* Trust badges under CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          fontSize: '14px',
          color: '#9ca3af',
          fontFamily: 'var(--font-nunito)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle style={{ width: '18px', height: '18px', color: '#10b981' }} />
          <span>No credit card required</span>
        </div>
        <span style={{ color: '#374151' }}>•</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle style={{ width: '18px', height: '18px', color: '#10b981' }} />
          <span>14-day money-back guarantee</span>
        </div>
        <span style={{ color: '#374151' }}>•</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle style={{ width: '18px', height: '18px', color: '#10b981' }} />
          <span>Lifetime access</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SecurityCertifications() {
  const certs = ['CEH', 'CISSP', 'OSCP', 'Security+', 'CISM'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3, duration: 1 }}
      style={{
        marginTop: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <div
        style={{
          fontSize: '14px',
          color: '#9ca3af',
          fontFamily: 'var(--font-nunito)',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontWeight: 600,
        }}
      >
        Prepare for Industry Certifications
      </div>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {certs.map((cert, index) => (
          <motion.div
            key={cert}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 + index * 0.1 }}
            whileHover={{ scale: 1.1, y: -3 }}
            style={{
              padding: '12px 24px',
              background: 'rgba(0, 255, 255, 0.05)',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#00ffff',
              fontFamily: 'var(--font-nunito)',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
            }}
          >
            {cert}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function UrgencyBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      style={{
        marginTop: '40px',
        padding: '20px 32px',
        background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.1), rgba(255, 140, 0, 0.1))',
        border: '2px solid rgba(255, 140, 0, 0.4)',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        backdropFilter: 'blur(20px)',
        maxWidth: '700px',
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Zap style={{ width: '28px', height: '28px', color: '#ff8c00' }} />
      </motion.div>
      <div style={{ textAlign: 'left', flex: 1 }}>
        <div style={{ 
          fontSize: '16px', 
          fontWeight: 800, 
          color: '#ff8c00',
          fontFamily: 'var(--font-nunito)',
          marginBottom: '4px',
        }}>
          🔥 Limited Time Offer
        </div>
        <div style={{ 
          fontSize: '14px', 
          color: '#d1d5db',
          fontFamily: 'var(--font-nunito)',
        }}>
          Join this week and get <span style={{ color: '#ff8c00', fontWeight: 700 }}>3 bonus projects</span> + lifetime community access
        </div>
      </div>
    </motion.div>
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
      gap: '12px', 
      marginTop: '50px',
    }}>
      {slides.map((_, index) => (
        <motion.div
          key={index}
          animate={{
            width: index === currentSlide ? '48px' : '12px',
            backgroundColor: index === currentSlide ? '#00ffff' : '#374151',
          }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.3 }}
          style={{
            height: '4px',
            borderRadius: '2px',
            cursor: 'pointer',
            boxShadow: index === currentSlide ? '0 0 15px rgba(0, 255, 255, 0.6)' : 'none',
          }}
          onClick={() => onSlideChange(index)}
        />
      ))}
    </div>
  );
}