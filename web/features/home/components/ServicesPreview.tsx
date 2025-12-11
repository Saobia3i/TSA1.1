'use client';

import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { getAllServices } from '@/features/services/data/services';
import { GlowingCard } from '@/components/ui/animated-cards';

export default function ServicesPreview() {
  const featuredServices = getAllServices().slice(0, 6);
  const serviceSectionRef = useRef<HTMLElement>(null);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [isServicePaused, setIsServicePaused] = useState(false);

  const { scrollYProgress: serviceProgress } = useScroll({
    target: serviceSectionRef,
    offset: ['start center', 'end center'],
  });

  useEffect(() => {
    if (isServicePaused) return;

    const interval = setInterval(() => {
      setServiceIndex((prev) => (prev + 1) % featuredServices.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isServicePaused, featuredServices.length]);

  const handleServiceClick = (index: number) => {
    setServiceIndex(index);
    setIsServicePaused(true);
  };

  const currentService = featuredServices[serviceIndex];
  const ServiceIcon = currentService.icon;

  return (
    <motion.section 
      ref={serviceSectionRef}
      style={{ 
        padding: 'clamp(40px, 6vw, 60px) 24px',
        backgroundColor: 'rgba(17, 24, 39, 0.3)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center' as const, marginBottom: '80px' }}
      >
        <h2
          style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '12px',
            fontFamily: 'var(--font-nunito)',
          }}
        >
          Our Services
        </h2>
        <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#9ca3af', fontFamily: 'var(--font-nunito)' }}>
          Professional cybersecurity and tech solutions
        </p>
      </motion.div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '80px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={serviceIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <GlowingCard glowColor="#22d3ee">
              <div style={{
                padding: 'clamp(40px, 6vw, 60px) clamp(30px, 5vw, 50px)',
                textAlign: 'center' as const,
                minHeight: '420px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <motion.div
                  animate={{ y: [0, -18, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    width: '110px',
                    height: '110px',
                    borderRadius: '22px',
                    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.3), rgba(168, 85, 247, 0.3))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '40px',
                    border: '2px solid rgba(34, 211, 238, 0.3)',
                  }}
                >
                  <ServiceIcon style={{ width: '56px', height: '56px', color: '#22d3ee' }} />
                </motion.div>

                <h3 style={{
                  fontSize: 'clamp(28px, 5vw, 36px)',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '24px',
                  fontFamily: 'var(--font-nunito)',
                }}>
                  {currentService.title}
                </h3>

                <p style={{
                  fontSize: 'clamp(14px, 2vw, 17px)',
                  color: '#d1d5db',
                  lineHeight: 1.8,
                  marginBottom: '32px',
                  fontFamily: 'var(--font-nunito)',
                  maxWidth: '700px',
                }}>
                  {currentService.description}
                </p>

                <Link href={`/services/${currentService.slug}`} style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '16px 36px',
                      fontSize: '15px',
                      fontWeight: 600,
                      borderRadius: '12px',
                      border: '2px solid rgba(34, 211, 238, 0.6)',
                      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15))',
                      color: '#22d3ee',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-nunito)',
                      boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </GlowingCard>
          </motion.div>
        </AnimatePresence>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(8px, 2vw, 14px)',
          marginTop: '50px',
          flexWrap: 'wrap',
        }}>
          {featuredServices.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => handleServiceClick(i)}
              style={{
                width: serviceIndex === i ? '36px' : 'clamp(12px, 2vw, 16px)',
                height: 'clamp(12px, 2vw, 16px)',
                borderRadius: '8px',
                border: 'none',
                background: serviceIndex === i 
                  ? 'linear-gradient(135deg, #22d3ee, #a855f7)'
                  : 'rgba(255, 255, 255, 0.25)',
                cursor: 'pointer',
                boxShadow: serviceIndex === i ? '0 0 25px rgba(34, 211, 238, 0.5)' : 'none',
                transition: 'all 0.3s',
              }}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>

        {isServicePaused && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: '13px',
              color: '#9ca3af',
              textAlign: 'center' as const,
              marginTop: '24px',
              fontFamily: 'var(--font-nunito)',
            }}
          >
            Click elsewhere to resume slideshow
          </motion.p>
        )}
      </div>
    </motion.section>
  );
}
