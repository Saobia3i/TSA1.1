'use client';

import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { getFeaturedCourses, type Course } from '@/features/courses/data/courses';
import { GlowingCard } from '@/components/ui/animated-cards';
import CourseDetailsModal from '@/features/courses/components/CourseDetailsModal';
import { AnimatePresence } from 'framer-motion';

export default function CoursesPreview() {
  const featuredCourses = getFeaturedCourses();
  const courseSectionRef = useRef<HTMLElement>(null);
  const [courseIndex, setCourseIndex] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const { scrollYProgress: courseProgress } = useScroll({
    target: courseSectionRef,
    offset: ['start center', 'end center'],
  });

  const handleCourseNext = () => {
    setCourseIndex((prev) => (prev + 1) % featuredCourses.length);
  };

  const handleCoursePrev = () => {
    setCourseIndex((prev) => (prev - 1 + featuredCourses.length) % featuredCourses.length);
  };

  const getVisibleCourses = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const index = (courseIndex + i + featuredCourses.length) % featuredCourses.length;
      cards.push({ index, course: featuredCourses[index], offset: i });
    }
    return cards;
  };

  return (
    <>
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

        {/* 3D Card Carousel - FIX: removed overflow hidden, added padding */}
        <div style={{ 
          width: '100%',
          paddingBottom: '20px', 
          perspective: '1000px',
        }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 'clamp(16px, 5vw, 60px)',
            paddingRight: 'clamp(16px, 5vw, 60px)',
            paddingTop: '40px',
            paddingBottom: '40px',
            minHeight: 'clamp(420px, 70vh, 560px)',
          }}>
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
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: 'clamp(280px, 85vw, 380px)',
                      position: 'absolute',
                      transformStyle: 'preserve-3d',
                      filter: isCenter ? 'drop-shadow(0 40px 120px rgba(34, 211, 238, 0.3))' : 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.2))',
                    }}
                  >
                    <motion.div
                      style={{
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                      }}
                      onClick={() => isCenter && setSelectedCourse(course)}
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

                          <motion.button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setSelectedCourse(course);
                            }}
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
                              position: 'relative',
                              zIndex: 5,
                            }}
                          >
                            Learn More →
                          </motion.button>
                        </div>
                      </GlowingCard>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
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
          >
            →
          </motion.button>
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

      {/* Course Details Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <CourseDetailsModal 
            course={selectedCourse} 
            onClose={() => setSelectedCourse(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
