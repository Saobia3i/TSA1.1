'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Quote } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

import HeroSection from '@/features/home/components/HeroSection';
import { getFeaturedCourses } from '@/features/courses/data/courses';
import { getAllServices } from '@/features/services/data/services';
import { GlowingCard } from '@/components/ui/animated-cards';

export default function HomePage() {
  const featuredCourses = getFeaturedCourses();
  const featuredServices = getAllServices().slice(0, 6);
  const founderRef = useRef<HTMLElement>(null);
  const courseSectionRef = useRef<HTMLElement>(null);
  const serviceSectionRef = useRef<HTMLElement>(null);
  
  const [isClient, setIsClient] = useState(false);
  const [courseIndex, setCourseIndex] = useState(0);
  const [serviceIndex, setServiceIndex] = useState(0);
  const [isServicePaused, setIsServicePaused] = useState(false);

  const { scrollYProgress: founderProgress } = useScroll({
    target: founderRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: courseProgress } = useScroll({
    target: courseSectionRef,
    offset: ['start center', 'end center'],
  });

  const { scrollYProgress: serviceProgress } = useScroll({
    target: serviceSectionRef,
    offset: ['start center', 'end center'],
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isServicePaused) return;

    const interval = setInterval(() => {
      setServiceIndex((prev) => (prev + 1) % featuredServices.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isServicePaused, featuredServices.length]);

  const handleCourseNext = () => {
    setCourseIndex((prev) => (prev + 1) % featuredCourses.length);
  };

  const handleCoursePrev = () => {
    setCourseIndex((prev) => (prev - 1 + featuredCourses.length) % featuredCourses.length);
  };

  const handleServiceClick = (index: number) => {
    setServiceIndex(index);
    setIsServicePaused(true);
  };

  const getVisibleCourses = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const index = (courseIndex + i + featuredCourses.length) % featuredCourses.length;
      cards.push({ index, course: featuredCourses[index], offset: i });
    }
    return cards;
  };

  const currentService = featuredServices[serviceIndex];
  const ServiceIcon = currentService.icon;

  return (
    <div style={{ backgroundColor: '#000', overflowX: 'hidden' }}>
      <HeroSection />

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/8801234567890"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.15, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 50,
          width: '60px',
          height: '60px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(37, 211, 102, 0.4)',
          cursor: 'pointer',
        }}
      >
        <MessageCircle style={{ width: '28px', height: '28px', color: 'white' }} />
      </motion.a>

      {/* Founder Message Section */}
      <motion.section 
        ref={founderRef}
        style={{ 
          padding: 'clamp(40px, 6vw, 60px) 24px', 
          maxWidth: '1100px', 
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center' as const, marginBottom: '50px' }}
        >
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'var(--font-nunito)',
              marginBottom: '12px',
            }}
          >
            Message from the Founder
          </h2>
          <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#9ca3af', fontFamily: 'var(--font-nunito)' }}>
            Our commitment to your success
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            padding: 'clamp(24px, 5vw, 40px)',
            backgroundColor: 'rgba(17, 24, 39, 0.6)',
            borderRadius: '24px',
            border: '2px solid rgba(34, 211, 238, 0.2)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
            style={{
              position: 'absolute',
              top: '20px',
              left: '30px',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(168, 85, 247, 0.2))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Quote style={{ width: '24px', height: '24px', color: '#22d3ee' }} />
          </motion.div>

          <div style={{ 
            display: 'flex', 
            gap: '32px', 
            alignItems: 'center', 
            flexDirection: 'row' as const,
            flexWrap: 'wrap' as const,
            justifyContent: 'center',
            marginTop: '20px',
          }}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3, type: 'spring' }}
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #06b6d4, #a855f7)',
                padding: '4px',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '18px',
                  backgroundColor: '#111827',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'var(--font-nunito)',
                }}>
                  AJ
                </div>
              </div>
            </motion.div>

            <div style={{ flex: 1, minWidth: '300px', maxWidth: '700px' }}>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.6 }}
                style={{ 
                  fontSize: 'clamp(14px, 2vw, 16px)', 
                  color: '#e5e7eb', 
                  lineHeight: 1.8, 
                  marginBottom: '16px',
                  fontFamily: 'var(--font-nunito)',
                  fontStyle: 'italic' as const,
                }}
              >
                At Tensor Security Academy, we believe in direct, personalized guidance. Every program is built around{' '}
                <span style={{ color: '#22d3ee', fontWeight: 600 }}>one-on-one live training with expert mentors</span>.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.6 }}
                style={{ 
                  fontSize: 'clamp(14px, 2vw, 16px)', 
                  color: '#e5e7eb', 
                  lineHeight: 1.8,
                  marginBottom: '20px',
                  fontFamily: 'var(--font-nunito)',
                  fontStyle: 'italic' as const,
                }}
              >
                Our mentors provide real-time feedback and career advice. Your success is our mission.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.6 }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(34, 211, 238, 0.2)',
                }}
              >
                <div style={{
                  width: '4px',
                  height: '40px',
                  background: 'linear-gradient(to bottom, #22d3ee, #a855f7)',
                  borderRadius: '2px',
                }} />
                <div>
                  <p style={{ 
                    fontSize: '18px', 
                    fontWeight: 700, 
                    color: '#22d3ee',
                    fontFamily: 'var(--font-nunito)',
                    marginBottom: '2px',
                  }}>
                    Abrar Jahin Sachcha
                  </p>
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#9ca3af',
                    fontFamily: 'var(--font-nunito)',
                  }}>
                    Founder & Lead Mentor
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* 3D Card Carousel Section - Courses */}
      <motion.section 
        ref={courseSectionRef}
        style={{ padding: 'clamp(40px, 6vw, 60px) 0' }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center' as const, marginBottom: 'clamp(30px, 4vw, 50px)', paddingLeft: '24px', paddingRight: '24px' }}
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
            Featured Courses
          </h2>
          <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#9ca3af', fontFamily: 'var(--font-nunito)' }}>
            Start your cybersecurity journey with expert-led training
          </p>
        </motion.div>

        {/* 3D Card Carousel - Full Width Container */}
        <div style={{ 
          width: '100vw', 
          marginLeft: 'calc(-50vw + 50%)',
          paddingBottom: '80px', 
          perspective: '1000px',
          overflow: 'hidden',
        }}>
          {/* Carousel Content Wrapper */}
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 'clamp(16px, 5vw, 60px)',
            paddingRight: 'clamp(16px, 5vw, 60px)',
            minHeight: 'clamp(420px, 70vh, 560px)',
          }}>
            {/* Cards Container */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '1400px',
              height: 'clamp(380px, 60vh, 480px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {getVisibleCourses().map(({ course, offset }) => {
                const Icon = course.icon;
                const badgeText = course.badge || '';
                const isCenter = offset === 0;

                return (
                  <motion.div
                    key={course.slug}
                    initial={{ opacity: 0, scale: 0.5, rotateY: offset * 60 }}
                    animate={{
                      opacity: isCenter ? 1 : 0.28,
                      scale: isCenter ? 1 : 0.55,
                      rotateY: offset * 60,
                      x: offset * 280,
                      z: isCenter ? 250 : -200,
                    }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: 'clamp(280px, 85vw, 380px)',
                      position: 'absolute',
                      transformStyle: 'preserve-3d',
                      filter: isCenter ? 'drop-shadow(0 40px 120px rgba(34, 211, 238, 0.3))' : 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.2))',
                    }}
                  >
                    <GlowingCard glowColor="#22d3ee">
                      <div style={{
                        padding: 'clamp(20px, 4vw, 28px)',
                        backgroundColor: 'rgba(17, 24, 39, 0.95)',
                        borderRadius: '20px',
                        minHeight: 'clamp(350px, 55vh, 400px)',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '2px solid rgba(34, 211, 238, 0.1)',
                      }}>
                        {/* Background Glow */}
                        <motion.div
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'radial-gradient(circle at 30% 20%, rgba(34, 211, 238, 0.15), transparent 50%)',
                            pointerEvents: 'none',
                          }}
                        />

                        {/* Badge */}
                        {badgeText && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            style={{
                              position: 'absolute',
                              top: '20px',
                              right: '20px',
                              padding: '8px 16px',
                              background: badgeText === 'Trending' 
                                ? 'linear-gradient(135deg, #ec4899, #f97316)' 
                                : badgeText === 'Coming Soon'
                                ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                                : 'linear-gradient(135deg, #06b6d4, #a855f7)',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: 700,
                              color: 'white',
                              textTransform: 'uppercase' as const,
                              fontFamily: 'var(--font-nunito)',
                              letterSpacing: '0.5px',
                              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                              zIndex: 10,
                            }}
                          >
                            {badgeText === 'Trending' && '🔥 '}{badgeText}
                          </motion.div>
                        )}

                        {/* Icon */}
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          style={{
                            width: '68px',
                            height: '68px',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(168, 85, 247, 0.3))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '18px',
                            border: '2px solid rgba(34, 211, 238, 0.3)',
                            position: 'relative',
                            zIndex: 5,
                          }}
                        >
                          <Icon style={{ width: '36px', height: '36px', color: '#22d3ee' }} />
                        </motion.div>

                        {/* Content */}
                        <h3 style={{ 
                          fontSize: 'clamp(20px, 4vw, 24px)', 
                          fontWeight: 700, 
                          color: 'white', 
                          marginBottom: '10px', 
                          fontFamily: 'var(--font-nunito)',
                          lineHeight: 1.25,
                          position: 'relative',
                          zIndex: 5,
                        }}>
                          {course.title}
                        </h3>

                        <p style={{ 
                          fontSize: 'clamp(12px, 2vw, 13px)', 
                          color: '#d1d5db', 
                          lineHeight: 1.5, 
                          marginBottom: '16px', 
                          fontFamily: 'var(--font-nunito)', 
                          flex: 1,
                          position: 'relative',
                          zIndex: 5,
                        }}>
                          {course.shortDescription}
                        </p>

                        {/* Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px', position: 'relative', zIndex: 5 }}>
                          {course.tags.slice(0, 2).map((tag) => (
                            <motion.span
                              key={tag}
                              whileHover={{ scale: 1.1 }}
                              style={{
                                padding: '4px 10px',
                                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(34, 211, 238, 0.1))',
                                border: '1px solid rgba(34, 211, 238, 0.4)',
                                borderRadius: '6px',
                                fontSize: '10px',
                                color: '#22d3ee',
                                fontWeight: 600,
                                fontFamily: 'var(--font-nunito)',
                                backdropFilter: 'blur(10px)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>

                        {/* Button */}
                        <Link href={`/courses/${course.slug}`} style={{ textDecoration: 'none', position: 'relative', zIndex: 5 }}>
                          <motion.button
                            whileHover={{ 
                              scale: 1.05,
                              boxShadow: '0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)',
                            }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                              width: '100%',
                              padding: '12px',
                              fontSize: 'clamp(12px, 2vw, 13px)',
                              fontWeight: 600,
                              borderRadius: '10px',
                              border: '2px solid rgba(34, 211, 238, 0.6)',
                              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15))',
                              color: '#22d3ee',
                              cursor: 'pointer',
                              fontFamily: 'var(--font-nunito)',
                              transition: 'all 0.3s ease',
                              boxShadow: '0 0 15px rgba(34, 211, 238, 0.3)',
                            }}
                          >
                            Learn More →
                          </motion.button>
                        </Link>
                      </div>
                    </GlowingCard>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(12px, 3vw, 30px)',
            marginTop: 'clamp(12px, 2vw, 24px)',
            paddingLeft: '24px',
            paddingRight: '24px',
            flexWrap: 'wrap',
          }}>
            <motion.button
              whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)' }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCoursePrev}
              style={{
                width: 'clamp(52px, 10vw, 64px)',
                height: 'clamp(52px, 10vw, 64px)',
                borderRadius: '50%',
                border: '2px solid rgba(34, 211, 238, 0.6)',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15))',
                color: '#22d3ee',
                cursor: 'pointer',
                fontSize: 'clamp(20px, 4vw, 28px)',
                fontWeight: 'bold',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(34, 211, 238, 0.7), 0 0 60px rgba(168, 85, 247, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(34, 211, 238, 0.4)';
              }}
            >
              ←
            </motion.button>

            <div style={{
              display: 'flex',
              gap: 'clamp(8px, 2vw, 14px)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              {featuredCourses.map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    width: courseIndex === i ? '32px' : 'clamp(10px, 2vw, 14px)',
                    height: 'clamp(10px, 2vw, 14px)',
                    borderRadius: '7px',
                    background: courseIndex === i 
                      ? 'linear-gradient(135deg, #22d3ee, #a855f7)'
                      : 'rgba(255, 255, 255, 0.25)',
                    cursor: 'pointer',
                    boxShadow: courseIndex === i ? '0 0 25px rgba(34, 211, 238, 0.5)' : 'none',
                  }}
                  onClick={() => setCourseIndex(i)}
                  whileHover={{ scale: 1.3 }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)' }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCourseNext}
              style={{
                width: 'clamp(52px, 10vw, 64px)',
                height: 'clamp(52px, 10vw, 64px)',
                borderRadius: '50%',
                border: '2px solid rgba(34, 211, 238, 0.6)',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15))',
                color: '#22d3ee',
                cursor: 'pointer',
                fontSize: 'clamp(20px, 4vw, 28px)',
                fontWeight: 'bold',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(34, 211, 238, 0.7), 0 0 60px rgba(168, 85, 247, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(34, 211, 238, 0.4)';
              }}
            >
              →
            </motion.button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' as const, marginTop: 'clamp(8px, 1.5vw, 16px)', paddingLeft: '24px', paddingRight: '24px' }}
        >
          <Link href="/courses" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '16px 40px',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: '12px',
                border: '2px solid rgba(34, 211, 238, 0.6)',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15))',
                color: '#22d3ee',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-nunito)',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
              }}
            >
              View All Courses
              <ArrowRight style={{ width: '18px', height: '18px' }} />
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Services Section */}
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
    </div>
  );
}
