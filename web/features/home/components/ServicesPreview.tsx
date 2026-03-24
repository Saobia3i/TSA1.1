'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { getAllServices } from '@/features/services/data/services';
import { GlowingCard } from '@/components/ui/animated-cards';
import { useTheme } from "@/lib/ThemeContext";

export default function ServicesPreview() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const featuredServices = getAllServices().slice(0, 6);
  const serviceSectionRef = useRef<HTMLElement>(null);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [isServicePaused, setIsServicePaused] = useState(false);

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
        padding: 'clamp(36px, 6vw, 60px) clamp(14px, 4vw, 24px)',
        backgroundColor: isLight ? 'rgba(235,236,237,0.4)' : 'rgba(17, 24, 39, 0.3)',
        position: 'relative',
      }}
    >
      <style>{`
        .service-card-shell {
          height: clamp(440px, 67vh, 580px);
        }

        .service-card-title {
          height: clamp(64px, 11vh, 100px);
          -webkit-line-clamp: 3;
        }

        .service-card-desc-wrap {
          height: clamp(92px, 14vh, 130px);
        }

        .service-card-desc {
          -webkit-line-clamp: 4;
        }

        @media (max-width: 640px) {
          .service-card-shell {
            height: 390px;
          }

          .service-card-title {
            height: 64px;
            -webkit-line-clamp: 2;
          }

          .service-card-desc-wrap {
            height: 82px;
          }

          .service-card-desc {
            -webkit-line-clamp: 3;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center' as const, marginBottom: '60px' }}
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
        <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: isLight ? 'rgba(98,108,113,0.9)' : '#9ca3af', fontFamily: 'var(--font-nunito)' }}>
          Professional cybersecurity and tech solutions
        </p>
      </motion.div>

      <div style={{ maxWidth: '720px', margin: '0 auto', paddingBottom: '52px' }}>
        {/* Fixed height wrapper - fully responsive */}
        <div style={{ 
          position: 'relative', 
          width: '100%', 
        }} className="service-card-shell">
          <GlowingCard
            glowColor="#22d3ee"
            style={{
              height: '100%',
              boxSizing: 'border-box',
              border: '1px solid rgba(34, 211, 238, 0.22)',
              background: isLight
                ? 'radial-gradient(circle at 10% 0%, rgba(34, 211, 238, 0.12), transparent 45%), radial-gradient(circle at 90% 100%, rgba(168, 85, 247, 0.12), transparent 40%), rgba(235,236,237,0.9)'
                : 'radial-gradient(circle at 10% 0%, rgba(34, 211, 238, 0.12), transparent 45%), radial-gradient(circle at 90% 100%, rgba(168, 85, 247, 0.12), transparent 40%), rgba(2, 6, 23, 0.82)',
              boxShadow:
                '0 16px 48px rgba(2, 6, 23, 0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
              overflow: 'hidden',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={serviceIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ width: '100%', height: '100%' }}
              >
                <div style={{
                  padding: 'clamp(14px, 3.5vw, 30px) clamp(12px, 3vw, 24px)',
                  paddingBottom: 'clamp(16px, 3.8vw, 40px)',
                  textAlign: 'center' as const,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                  gap: 'clamp(12px, 2.5vw, 20px)',
                  overflow: 'hidden',
                }}>
                  <div
                    style={{
                      width: '100%',
                      height: '2px',
                      borderRadius: '999px',
                      background: 'linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.8), rgba(168, 85, 247, 0.8), transparent)',
                      boxShadow: '0 0 18px rgba(34, 211, 238, 0.35)',
                      flexShrink: 0,
                    }}
                  />

                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      width: 'clamp(60px, 10vw, 78px)',
                      height: 'clamp(60px, 10vw, 78px)',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.25), rgba(168, 85, 247, 0.25))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid rgba(34, 211, 238, 0.4)',
                      flexShrink: 0,
                      boxShadow: '0 10px 28px rgba(34, 211, 238, 0.22)',
                    }}
                  >
                    <ServiceIcon style={{ 
                      width: 'clamp(30px, 5vw, 40px)', 
                      height: 'clamp(30px, 5vw, 40px)', 
                      color: '#22d3ee' 
                    }} />
                  </motion.div>

                  <h3 className="service-card-title" style={{
                    fontSize: 'clamp(17px, 3.2vw, 24px)',
                    fontWeight: 700,
                    color: isLight ? '#13343b' : 'white',
                    fontFamily: 'var(--font-nunito)',
                    lineHeight: 1.25,
                    flexShrink: 0,
                    textAlign: 'center' as const,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {currentService.title}
                  </h3>

                  <div className="service-card-desc-wrap" style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    width: '100%',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}>
                    <p className="service-card-desc" style={{
                      fontSize: 'clamp(12px, 1.55vw, 15px)',
                      color: isLight ? '#4a5568' : '#d1d5db',
                      lineHeight: 1.6,
                      fontFamily: 'var(--font-nunito)',
                      maxWidth: '520px',
                      textAlign: 'center' as const,
                      margin: 0,
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {currentService.shortDescription}
                    </p>
                  </div>

                  <Link
                    href={`/services/${currentService.slug}`}
                    style={{ textDecoration: 'none', flexShrink: 0 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(34, 211, 238, 0.6), 0 0 50px rgba(168, 85, 247, 0.4)' }}
                      whileTap={{ scale: 0.96 }}
                      style={{
                        padding: 'clamp(10px, 1.8vw, 12px) clamp(20px, 3.5vw, 26px)',
                        fontSize: 'clamp(12px, 1.6vw, 13px)',
                        fontWeight: 600,
                        borderRadius: '10px',
                        border: '2px solid rgba(34, 211, 238, 0.6)',
                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15))',
                        color: '#22d3ee',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-nunito)',
                        boxShadow: '0 0 18px rgba(34, 211, 238, 0.4)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Learn More
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </GlowingCard>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(8px, 2vw, 12px)',
          marginTop: '40px',
          flexWrap: 'wrap',
        }}>
          {featuredServices.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => handleServiceClick(i)}
              style={{
                width: serviceIndex === i ? '32px' : 'clamp(12px, 2vw, 14px)',
                height: 'clamp(12px, 2vw, 14px)',
                borderRadius: '7px',
                border: 'none',
                background: serviceIndex === i 
                  ? 'linear-gradient(135deg, #22d3ee, #a855f7)'
                  : isLight ? 'rgba(33,128,141,0.25)' : 'rgba(255, 255, 255, 0.25)',
                cursor: 'pointer',
                boxShadow: serviceIndex === i ? '0 0 20px rgba(34, 211, 238, 0.5)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              whileHover={{ scale: 1.25 }}
              aria-label={`Show service ${i + 1}`}
            />
          ))}
        </div>

        {isServicePaused && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: '12px',
              color: isLight ? 'rgba(98,108,113,0.9)' : '#9ca3af',
              textAlign: 'center' as const,
              marginTop: '20px',
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
