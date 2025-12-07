'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, Zap, CheckCircle, Shield } from 'lucide-react';
import Link from 'next/link';
import * as THREE from 'three';

const heroSlides = [
  'FORGE YOUR FUTURE IN TECH SECURITY',
  'MASTER CYBERSECURITY WITH LIVE TRAINING',
  'TRANSFORM YOUR CAREER IN 90 DAYS',
  'JOIN THE NEXT GENERATION OF HACKERS',
];

export default function ThreeJSHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.offsetWidth / containerRef.current.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create galaxy particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 8000;

    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const galaxyColors = [
      new THREE.Color(0x9333ea), // Purple
      new THREE.Color(0xa855f7), // Light purple
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0x60a5fa), // Light blue
      new THREE.Color(0xec4899), // Pink
      new THREE.Color(0xffffff), // White
    ];

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;

      // Spiral galaxy distribution
      const radius = Math.random() * 50;
      const spinAngle = radius * 0.5;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 3;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 3;

      // Colors
      const randomColor = galaxyColors[Math.floor(Math.random() * galaxyColors.length)];
      colors[i3] = randomColor.r;
      colors[i3 + 1] = randomColor.g;
      colors[i3 + 2] = randomColor.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate galaxy
      particles.rotation.y += 0.001;
      particles.rotation.x = mouseY * 0.3;
      particles.rotation.z = mouseX * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;

      camera.aspect = containerRef.current.offsetWidth / containerRef.current.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#000' }} />
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at center, #1a0b2e 0%, #0a0118 50%, #000000 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Three.js Canvas */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      />

      {/* Content */}
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              padding: '8px 24px',
              background: 'linear-gradient(to right, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15))',
              border: '2px solid rgba(34, 211, 238, 0.5)',
              borderRadius: '50px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#22d3ee',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontFamily: 'var(--font-space)',
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
            }}
          >
            🔥 Elite Cybersecurity Training
          </motion.div>

          {/* Animated Headline */}
          <div style={{ width: '100%', minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentSlide}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="hero-slide-text"
                style={{
                  fontSize: 'clamp(28px, 6vw, 56px)',
                  fontWeight: 400,
                  background: 'linear-gradient(135deg, #00F0FF 0%, #a855f7 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2,
                  filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.5))',
                  transform: 'skewY(-2deg)',
                }}
              >
                {heroSlides[currentSlide]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontSize: 'clamp(15px, 2.5vw, 18px)',
              color: '#e5e7eb',
              maxWidth: '750px',
              lineHeight: 1.8,
              fontFamily: 'var(--font-inter)',
            }}
          >
            Go from curious to career-ready with <span style={{ color: '#22d3ee', fontWeight: 600 }}>elite mentorship</span>, hands-on training, and real-world projects.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '12px' }}
          >
            <Link href="/courses" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34, 211, 238, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '16px 36px',
                  fontSize: '16px',
                  fontWeight: 700,
                  borderRadius: '12px',
                  border: '2px solid rgba(34, 211, 238, 0.6)',
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(168, 85, 247, 0.3))',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: 'var(--font-space)',
                  letterSpacing: '0.5px',
                  boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
                }}
              >
                Explore Courses
                <ArrowRight style={{ width: '20px', height: '20px' }} />
              </motion.button>
            </Link>

            <Link href="/about" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.8)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '16px 36px',
                  fontSize: '16px',
                  fontWeight: 700,
                  borderRadius: '12px',
                  border: '2px solid rgba(168, 85, 247, 0.5)',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: 'white',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-space)',
                  letterSpacing: '0.5px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                Meet Our Team
              </motion.button>
            </Link>
          </motion.div>

          {/* Feature Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '20px',
              width: '100%',
              maxWidth: '900px',
              marginTop: '40px',
            }}
          >
            {[
              { icon: Users, text: '1-on-1 Mentorship', color: '#22d3ee' },
              { icon: Zap, text: 'Live Training', color: '#a855f7' },
              { icon: CheckCircle, text: 'Career Guidance', color: '#ec4899' },
              { icon: Shield, text: 'Certification Support', color: '#06b6d4' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
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
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
                    color: '#e5e7eb',
                    fontWeight: 600,
                    textAlign: 'center',
                    fontFamily: 'var(--font-space)',
                    letterSpacing: '0.5px',
                  }}
                >
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {heroSlides.map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  width: index === currentSlide ? '40px' : '10px',
                  backgroundColor: index === currentSlide ? '#22d3ee' : '#4b5563',
                }}
                transition={{ duration: 0.3 }}
                style={{
                  height: '4px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  boxShadow: index === currentSlide ? '0 0 10px #22d3ee' : 'none',
                }}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
