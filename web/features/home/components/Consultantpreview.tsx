'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Award, Globe, Shield, Target } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getFeaturedConsultants } from '@/features/consultant/Consultantdata';
import Image from 'next/image';
import { homePreviewCardButtonStyle, sectionSubtitleStyle, sectionTitleStyle } from '@/features/home/components/homeSectionStyles';

const VideoSection = ({ isMobile }: { isMobile: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3, delay: 0.1 }}
      whileHover={{ y: -10, scale: 1.03 }}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: isMobile ? '240px' : '230px',
        margin: '0 auto',
        zIndex: 10,
      }}
    >
      {/* Ultra Premium Glow */}
      <motion.div 
        animate={{ opacity: [0.6, 0.9, 0.6], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          inset: '-20px',
          background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.5) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 70%)',
          filter: 'blur(30px)',
          zIndex: 0,
        }} 
      />

      {/* Featured Tag (Golden Shimmer) */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          position: 'absolute',
          top: '-14px',
          left: '-16px',
          borderRadius: '12px',
          zIndex: 4,
          boxShadow: '0 6px 20px rgba(251, 191, 36, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 3, ease: "linear", repeat: Infinity }}
          style={{
            background: 'linear-gradient(270deg, #d97706, #fbbf24, #fef08a, #fbbf24, #d97706)',
            backgroundSize: '300% 300%',
            padding: '5px 16px',
            fontSize: '11px',
            fontWeight: 900,
            color: '#451a03',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          Exclusive
        </motion.div>
      </motion.div>

      {/* Video Container with animated cyan/purple gradient border */}
      <motion.div 
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          aspectRatio: '9/16',
          borderRadius: '24px',
          padding: '4px',
          background: 'linear-gradient(270deg, #22d3ee, #a855f7, #22d3ee)',
          backgroundSize: '200% 200%',
          boxShadow: '0 30px 60px -15px rgba(0,0,0,0.9), 0 0 40px rgba(168, 85, 247, 0.25)',
        }}
      >
        {/* Inner Screen */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '22px',
          overflow: 'hidden',
          background: '#040b16',
        }}>
          {!isPlaying && (
            <div 
              onClick={() => setIsPlaying(true)}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 10,
                cursor: 'pointer',
                backgroundImage: `url('https://img.youtube.com/vi/PVoFJsqNUpQ/hqdefault.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Dark overlay for better button visibility */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.3)',
              }} />
              
              {/* Custom Play Button */}
              <motion.div 
                whileHover={{ scale: 1.1 }}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.9), rgba(168, 85, 247, 0.9))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(34, 211, 238, 0.6)',
                  zIndex: 2,
                  border: '2px solid rgba(255, 255, 255, 0.8)',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" stroke="none" style={{ marginLeft: '4px' }}>
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </motion.div>
            </div>
          )}

          {isPlaying && (
            <iframe
              src="https://www.youtube.com/embed/PVoFJsqNUpQ?autoplay=1&controls=1&rel=0&modestbranding=1"
              title="Consultant Promotional Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          )}
        </div>
      </motion.div>

      {/* Floating Action Badge Bottom Right */}
      <motion.div 
        onClick={() => setIsPlaying(true)}
        whileHover={{ scale: 1.1 }}
        style={{
          position: 'absolute',
          bottom: '-12px',
          right: '-12px',
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(12px)',
          padding: '8px 16px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 3,
          boxShadow: '0 12px 30px rgba(0,0,0,0.6), 0 0 0 1px rgba(168, 85, 247, 0.4)',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #a855f7, #ec4899)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 12px rgba(168, 85, 247, 0.6)',
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff" stroke="none" style={{ marginLeft: '2px' }}>
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </div>
        <span style={{ 
          fontSize: '12px',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '0.5px',
          fontFamily: 'var(--font-nunito)',
        }}>
          {isPlaying ? 'Playing' : 'Play Short'}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default function ConsultantPreview() {
  const consultant = getFeaturedConsultants()[0];
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w <= 640);
      setIsTablet(w > 640 && w <= 1024);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!consultant) return null;

  return (
    <section
      style={{
        padding: isMobile ? '40px 0' : 'clamp(44px, 7vw, 100px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
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

      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={isMobile ? { duration: 0.3, ease: 'easeOut' } : { duration: 0.5, ease: 'easeOut' }}
          style={{
            textAlign: 'center',
            marginBottom: isMobile ? '28px' : 'clamp(40px, 6vw, 70px)',
            paddingLeft: 'clamp(14px, 4vw, 24px)',
            paddingRight: 'clamp(14px, 4vw, 24px)',
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
              padding: isMobile ? '8px 16px' : '12px 24px',
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(168, 85, 247, 0.1))',
              border: '2px solid rgba(34, 211, 238, 0.3)',
              borderRadius: '50px',
              marginBottom: '16px',
              fontFamily: 'var(--font-nunito)',
            }}
          >
            <Shield style={{ width: '18px', height: '18px', color: '#22d3ee' }} />
            <span style={{ fontSize: isMobile ? '12px' : '14px', fontWeight: 600, color: '#22d3ee' }}>
              World-Class Expertise
            </span>
          </motion.div>

          <h2 style={{ ...sectionTitleStyle, marginBottom: '12px' }}>
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
              maxWidth: '1300px',
              margin: '0 auto',
              paddingLeft: 'clamp(16px, 4vw, 48px)',
              paddingRight: 'clamp(16px, 4vw, 48px)',
            }}
          >
          <motion.div
            whileHover={isMobile ? {} : { y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.98), rgba(17, 24, 39, 0.95))',
              borderRadius: 'clamp(16px, 4vw, 30px)',
              border: '2px solid rgba(34, 211, 238, 0.2)',
              boxShadow: '0 18px 44px rgba(0, 0, 0, 0.34), 0 0 28px rgba(34, 211, 238, 0.08)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'radial-gradient(circle at 30% 20%, rgba(34, 211, 238, 0.12), transparent 60%)',
                pointerEvents: 'none',
                borderRadius: 'inherit',
              }}
            />

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? '280px 1fr 220px' : '320px 1fr 240px',
              gap: isMobile ? '16px' : isTablet ? '20px' : 'clamp(20px, 3vw, 40px)',
              padding: isMobile ? '20px 16px' : isTablet ? '24px' : 'clamp(16px, 4vw, 40px)',
              alignItems: 'start',
              position: 'relative',
              zIndex: 1,
            }}>
              {/* Left Side - Image and Quick Stats */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: isMobile ? '22px' : 'clamp(22px, 4vw, 36px)',
              }}>
                {/* Profile Image */}
                <motion.div
                  whileHover={isMobile ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{
                    position: 'relative',
                    width: isMobile ? '120px' : 'clamp(130px, 20vw, 190px)',
                    height: isMobile ? '120px' : 'clamp(130px, 20vw, 190px)',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: '-4px',
                    background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                    borderRadius: '20px',
                    opacity: 0.5,
                    filter: 'blur(12px)',
                  }} />
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '3px solid rgba(34, 211, 238, 0.3)',
                    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1), rgba(168, 85, 247, 0.1))',
                  }}>
                    {consultant.image ? (
                      <Image
                        src={consultant.image}
                        alt={consultant.name}
                        fill
                        sizes="(max-width: 768px) 120px, 210px"
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
                        fontSize: isMobile ? '48px' : 'clamp(60px, 12vw, 100px)',
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
                  gap: isMobile ? '8px' : 'clamp(8px, 2vw, 12px)',
                  width: '100%',
                  justifyItems: 'stretch',
                  maxWidth: isMobile ? '320px' : '370px',
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
                      whileHover={isMobile ? {} : { scale: 1.03 }}
                      style={{
                        padding: isMobile ? '10px 8px' : 'clamp(10px, 2.8vw, 16px)',
                        background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08), rgba(168, 85, 247, 0.08))',
                        border: '1px solid rgba(34, 211, 238, 0.2)',
                        borderRadius: '14px',
                        textAlign: 'center',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                      }}
                    >
                      <stat.icon style={{
                        width: '16px',
                        height: '16px',
                        color: '#22d3ee',
                        margin: '0 auto 4px',
                        display: 'block',
                      }} />
                      <div style={{
                        fontSize: isMobile ? '12px' : 'clamp(12px, 2.3vw, 14px)',
                        fontWeight: 700,
                        color: 'white',
                        fontFamily: 'var(--font-nunito)',
                      }}>
                        {stat.label}
                      </div>
                      <div style={{
                        fontSize: isMobile ? '10px' : 'clamp(9px, 1.8vw, 10px)',
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
                gap: isMobile ? '12px' : 'clamp(14px, 3.5vw, 24px)',
                minWidth: 0,
              }}>
                {/* Name and Title */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={isMobile ? { duration: 0.25 } : { delay: 0.3 }}
                    style={{
                      fontSize: isMobile ? '22px' : 'clamp(19px, 4.5vw, 30px)',
                      fontWeight: 800,
                      color: 'white',
                      marginBottom: '6px',
                      fontFamily: 'var(--font-nunito)',
                      lineHeight: 1.2,
                      overflowWrap: 'anywhere',
                      textAlign: 'left',
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
                      fontSize: isMobile ? '13px' : 'clamp(12px, 2vw, 14px)',
                      color: '#22d3ee',
                      fontWeight: 600,
                      marginBottom: '4px',
                      fontFamily: 'var(--font-nunito)',
                      textAlign: 'left',
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
                      fontSize: isMobile ? '12px' : 'clamp(12px, 1.7vw, 13px)',
                      color: '#9ca3af',
                      fontFamily: 'var(--font-nunito)',
                      overflowWrap: 'anywhere',
                      textAlign: 'left',
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
                    fontSize: isMobile ? '13px' : 'clamp(12px, 2vw, 14px)',
                    color: '#d1d5db',
                    lineHeight: 1.6,
                    fontFamily: 'var(--font-nunito)',
                    textAlign: 'left',
                  }}
                >
                  {consultant.shortDescription}
                </motion.p>

                {/* Video based on Mobile */}
                {isMobile && (
                  <div style={{ margin: '16px 0', display: 'flex', justifyContent: 'center' }}>
                    <VideoSection isMobile={isMobile} />
                  </div>
                )}

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

              {/* Far Right Side - Video for Desktop/Tablet */}
              {!isMobile && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}>
                  <VideoSection isMobile={isMobile} />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
