'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Award, Globe, Shield, Briefcase, Target } from 'lucide-react';
import { useRef } from 'react';
import { getFeaturedConsultants } from '@/features/consultant/Consultantdata';
import Image from 'next/image';

export default function ConsultantPreview() {
  const consultant = getFeaturedConsultants()[0]; // Get the featured consultant
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  if (!consultant) return null;

  return (
    <motion.section
      ref={sectionRef}
      style={{ 
        padding: 'clamp(60px, 8vw, 100px) 0',
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

      <motion.div
        style={{ opacity, scale }}
        className="container"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            textAlign: 'center',
            marginBottom: 'clamp(40px, 6vw, 70px)',
            paddingLeft: '24px',
            paddingRight: '24px'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
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

          <h2
            style={{
              fontSize: 'clamp(36px, 6vw, 56px)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
              fontFamily: 'var(--font-nunito)',
              lineHeight: 1.2,
            }}
          >
            Meet Our Senior Consultant
          </h2>
          <p style={{ 
            fontSize: 'clamp(16px, 2.5vw, 18px)', 
            color: '#9ca3af',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6,
            fontFamily: 'var(--font-nunito)'
          }}>
            Learn from legendary cybersecurity experts who have defended nations and secured critical infrastructure
          </p>
        </motion.div>

        {/* Consultant Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            paddingLeft: '24px',
            paddingRight: '24px',
          }}
        >
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4 }}
            style={{
              background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.98), rgba(17, 24, 39, 0.95))',
              borderRadius: '30px',
              overflow: 'hidden',
              border: '2px solid rgba(34, 211, 238, 0.2)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4), 0 0 60px rgba(34, 211, 238, 0.1)',
              position: 'relative',
            }}
          >
            {/* Glow Effect */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 30% 20%, rgba(34, 211, 238, 0.15), transparent 60%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(30px, 5vw, 50px)',
              padding: 'clamp(30px, 5vw, 50px)',
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
            }}>
              {/* Left Side - Image and Quick Stats */}
              <div style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px'
              }}>
                {/* Profile Image */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{
                    position: 'relative',
                    width: 'clamp(200px, 35vw, 280px)',
                    height: 'clamp(200px, 35vw, 280px)',
                  }}
                >
                  <motion.div
                    whileHover={{ opacity: 0.85, filter: 'blur(28px)' }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    style={{
                    position: 'absolute',
                    inset: '-4px',
                    background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                    borderRadius: '24px',
                    opacity: 0.6,
                    filter: 'blur(20px)',
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
                  gap: '12px',
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
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        padding: '16px',
                        background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08), rgba(168, 85, 247, 0.08))',
                        border: '1px solid rgba(34, 211, 238, 0.2)',
                        borderRadius: '16px',
                        textAlign: 'center',
                      }}
                    >
                      <stat.icon style={{ 
                        width: '24px', 
                        height: '24px', 
                        color: '#22d3ee',
                        margin: '0 auto 8px'
                      }} />
                      <div style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: 'white',
                        fontFamily: 'var(--font-nunito)',
                      }}>
                        {stat.label}
                      </div>
                      <div style={{
                        fontSize: '11px',
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
                gap: '24px'
              }}>
                {/* Name and Title */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    style={{
                      fontSize: 'clamp(28px, 5vw, 36px)',
                      fontWeight: 800,
                      color: 'white',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-nunito)',
                      lineHeight: 1.2,
                    }}
                  >
                    {consultant.name}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
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
                    transition={{ delay: 0.7 }}
                    style={{
                      fontSize: 'clamp(13px, 2vw, 14px)',
                      color: '#9ca3af',
                      fontFamily: 'var(--font-nunito)',
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
                  transition={{ delay: 0.8 }}
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
                  transition={{ delay: 0.9 }}
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
                        transition={{ delay: 1 + index * 0.1 }}
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
                  transition={{ delay: 1.3 }}
                >
                  <Link href="/Consultant" style={{ textDecoration: 'none' }}>
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: '0 0 40px rgba(34, 211, 238, 0.6), 0 0 80px rgba(168, 85, 247, 0.4)',
                      }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        width: '100%',
                        padding: '16px 32px',
                        fontSize: 'clamp(14px, 2.5vw, 16px)',
                        fontWeight: 700,
                        borderRadius: '14px',
                        border: '2px solid rgba(34, 211, 238, 0.6)',
                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))',
                        color: '#22d3ee',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        fontFamily: 'var(--font-nunito)',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)',
                      }}
                    >
                      View Full Profile & Expertise
                      <ArrowRight style={{ width: '20px', height: '20px' }} />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
