'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Award, Globe, Shield, Briefcase, Target } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { getFeaturedConsultants } from '@/features/consultant/Consultantdata';
import Image from 'next/image';
import { homePreviewCardButtonStyle, sectionSubtitleStyle, sectionTitleStyle } from '@/features/home/components/homeSectionStyles';

export default function ConsultantPreview() {
  const consultant = getFeaturedConsultants()[0]; // Get the featured consultant
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!consultant) return null;

  return (
    <section
      style={{ 
        padding: 'clamp(44px, 7vw, 100px) 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 70% 30%, rgba(34, 211, 238, 0.08), transparent 60%)',
        pointerEvents: 'none',
      }} />
      
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      <div
        className="container"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={isMobile ? { duration: 0.3, ease: 'easeOut' } : { duration: 0.5, ease: 'easeOut' }}
          style={{ 
            textAlign: 'center',
            marginBottom: 'clamp(40px, 6vw, 70px)',
            paddingLeft: 'clamp(14px, 4vw, 24px)',
            paddingRight: 'clamp(14px, 4vw, 24px)'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={isMobile ? { duration: 0.25 } : { duration: 0.4, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(168, 85, 247, 0.1))',
              border: '2px solid rgba(34, 211, 238, 0.3)',
              borderRadius: '50px',
              marginBottom: '24px',
              fontFamily: 'var(--font-nunito)',
            }}
          >
            <Shield style={{ width: '20px', height: '20px', color: '#22d3ee' }} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#22d3ee' }}>
              World-Class Expertise
            </span>
          </motion.div>

          <h2 style={{ ...sectionTitleStyle, marginBottom: '16px' }}>
            Meet Our Senior Consultant
          </h2>
          <p style={sectionSubtitleStyle}>
            Learn from legendary cybersecurity experts who have defended nations and secured critical infrastructure
          </p>
        </motion.div>

        {/* Consultant Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={isMobile ? { duration: 0.35 } : { duration: 0.5, delay: 0.2 }}
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            paddingLeft: 'clamp(12px, 4vw, 24px)',
            paddingRight: 'clamp(12px, 4vw, 24px)',
          }}
        >
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.98), rgba(17, 24, 39, 0.95))',
              borderRadius: 'clamp(18px, 4vw, 30px)',
              overflow: 'hidden',
              border: '2px solid rgba(34, 211, 238, 0.2)',
              boxShadow: '0 18px 44px rgba(0, 0, 0, 0.34), 0 0 28px rgba(34, 211, 238, 0.08)',
              position: 'relative',
            }}
          >
            {/* Glow Effect - Removed for performance */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 30% 20%, rgba(34, 211, 238, 0.12), transparent 60%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: 'clamp(18px, 4vw, 42px)',
              padding: 'clamp(16px, 4vw, 40px)',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
            }}>
              {/* Left Side - Image and Quick Stats */}
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'clamp(14px, 3vw, 24px)'
              }}>
                {/* Profile Image */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{
                    position: 'relative',
                    width: 'clamp(150px, 58vw, 260px)',
                    height: 'clamp(150px, 58vw, 260px)',
                  }}
                >
                  <div
                    style={{
                    position: 'absolute',
                    inset: '-4px',
                    background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                    borderRadius: '24px',
                    opacity: 0.5,
                    filter: 'blur(12px)',
                  }} />
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: '4px solid rgba(34, 211, 238, 0.3)',
                    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(168, 85, 247, 0.1))',
                  }}>
                    {consultant.image ? (
                      <Image
                        src={consultant.image}
                        alt={consultant.name}
                        fill
                        sizes="(max-width: 768px) 70vw, 280px"
                        style={{ objectFit: 'cover' }}
                        priority
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'clamp(60px, 12vw, 100px)',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}>
                        {consultant.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Quick Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 'clamp(8px, 2vw, 12px)',
                  width: '100%',
                }}>
                  {[
                    { icon: Award, label: '25+ Years', sublabel: 'Experience' },
                    { icon: Globe, label: 'Brazil', sublabel: 'Country Director' },
                    { icon: Shield, label: 'Military', sublabel: 'Veteran' },
                    { icon: Target, label: 'National', sublabel: 'Defense' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={isMobile ? { duration: 0.2, delay: index * 0.03 } : { delay: 0.3 + index * 0.05 }}
                      whileHover={{ scale: 1.03 }}
                      style={{
                        padding: 'clamp(10px, 2.8vw, 16px)',
                          background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08), rgba(168, 85, 247, 0.08))',
                          border: '1px solid rgba(34, 211, 238, 0.2)',
                          borderRadius: '16px',
                          textAlign: 'center',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                        }}
                      >
                      <stat.icon style={{ 
                        width: '24px', 
                        height: '24px', 
                        color: '#22d3ee',
                        margin: '0 auto 8px'
                      }} />
                      <div style={{
                        fontSize: 'clamp(13px, 3vw, 16px)',
                        fontWeight: 700,
                        color: 'white',
                        fontFamily: 'var(--font-nunito)',
                      }}>
                        {stat.label}
                      </div>
                      <div style={{
                        fontSize: 'clamp(10px, 2.2vw, 11px)',
                        color: '#9ca3af',
                        fontFamily: 'var(--font-nunito)',
                      }}>
                        {stat.sublabel}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Side - Details */}
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(14px, 3.5vw, 24px)',
                minWidth: 0
              }}>
                {/* Name and Title */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={isMobile ? { duration: 0.25 } : { delay: 0.3 }}
                    style={{
                      fontSize: 'clamp(22px, 6vw, 36px)',
                      fontWeight: 800,
                      color: 'white',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-nunito)',
                      lineHeight: 1.2,
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {consultant.name}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={isMobile ? { duration: 0.25, delay: 0.05 } : { delay: 0.35 }}
                    style={{
                      fontSize: 'clamp(14px, 2.5vw, 16px)',
                      color: '#22d3ee',
                      fontWeight: 600,
                      marginBottom: '6px',
                      fontFamily: 'var(--font-nunito)',
                    }}
                  >
                    {consultant.title}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={isMobile ? { duration: 0.25, delay: 0.1 } : { delay: 0.4 }}
                    style={{
                      fontSize: 'clamp(13px, 2vw, 14px)',
                      color: '#9ca3af',
                      fontFamily: 'var(--font-nunito)',
                      overflowWrap: 'anywhere',
                    }}
                  >
                    {consultant.role}
                  </motion.p>
                </div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={isMobile ? { duration: 0.25, delay: 0.15 } : { delay: 0.45 }}
                  style={{
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    color: '#d1d5db',
                    lineHeight: 1.7,
                    fontFamily: 'var(--font-nunito)',
                  }}
                >
                  {consultant.shortDescription}
                </motion.p>

                {/* Top Qualifications */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={isMobile ? { duration: 0.25, delay: 0.2 } : { delay: 0.5 }}
                >
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#22d3ee',
                    marginBottom: '12px',
                    fontFamily: 'var(--font-nunito)',
                  }}>
                    Key Highlights:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {consultant.highlights.slice(0, 3).map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={isMobile ? { duration: 0.2, delay: 0.05 * index } : { delay: 0.55 + index * 0.05 }}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                        }}
                      >
                        <div style={{
                          minWidth: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                          marginTop: '8px',
                          boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
                        }} />
                        <span style={{
                          fontSize: 'clamp(13px, 2vw, 14px)',
                          color: '#e5e7eb',
                          lineHeight: 1.6,
                          fontFamily: 'var(--font-nunito)',
                          overflowWrap: 'anywhere',
                        }}>
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={isMobile ? { duration: 0.25, delay: 0.25 } : { delay: 0.7 }}
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Link href="/Consultant" style={{ textDecoration: 'none', display: 'inline-flex', justifyContent: 'center' }}>
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                        boxShadow: '0 0 30px rgba(34, 211, 238, 0.5), 0 0 60px rgba(168, 85, 247, 0.3)',
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      style={homePreviewCardButtonStyle}
                    >
                      See Details
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
