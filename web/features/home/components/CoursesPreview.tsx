'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getAllCourses, getFeaturedCourses, type Course } from '@/features/courses/data/courses';
import { GlowingCard } from '@/components/ui/animated-cards';
import CourseDetailsModal from '@/features/courses/components/CourseDetailsModal';
import {
  homePreviewButtonStyle,
  homePreviewCardButtonStyle,
  sectionSubtitleStyle,
  sectionTitleStyle,
} from '@/features/home/components/homeSectionStyles';

export default function CoursesPreview() {
  const featuredCourses = getFeaturedCourses();
  const allCourses = getAllCourses();
  const courseSectionRef = useRef<HTMLElement>(null);
  const [courseIndex, setCourseIndex] = useState(0);
  const [manualSelectedCourse, setManualSelectedCourse] = useState<Course | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const openCourseSlug = searchParams.get('openCourse');
  const shouldOpenEnrollment = searchParams.get('openEnrollment') === '1';

  const selectedCourse = useMemo(
    () =>
      manualSelectedCourse ||
      allCourses.find((course) => course.slug === openCourseSlug) ||
      null,
    [allCourses, manualSelectedCourse, openCourseSlug]
  );

  useEffect(() => {
    if (featuredCourses.length <= 1 || manualSelectedCourse) return;

    const interval = setInterval(() => {
      setCourseIndex((prev) => (prev + 1) % featuredCourses.length);
    }, 3600);

    return () => clearInterval(interval);
  }, [featuredCourses.length, manualSelectedCourse]);

  const visibleCourses = useMemo(() => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const index = (courseIndex + i + featuredCourses.length) % featuredCourses.length;
      cards.push({ index, course: featuredCourses[index], offset: i });
    }
    return cards;
  }, [courseIndex, featuredCourses]);

  const handleCloseModal = () => {
    setManualSelectedCourse(null);
    if (!openCourseSlug && !shouldOpenEnrollment) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete('openCourse');
    params.delete('openEnrollment');
    const nextQuery = params.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
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
          style={{
            textAlign: 'center' as const,
            marginBottom: 'clamp(30px, 4vw, 50px)',
            paddingLeft: '24px',
            paddingRight: '24px',
          }}
        >
          <h2
            style={sectionTitleStyle}
          >
            Featured Courses
          </h2>
          <p style={sectionSubtitleStyle}>
            Start your cybersecurity journey with expert-led training
          </p>
        </motion.div>

        <div
          style={{
            width: '100%',
            paddingBottom: '20px',
            perspective: '1000px',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 'clamp(16px, 5vw, 60px)',
              paddingRight: 'clamp(16px, 5vw, 60px)',
              paddingTop: '40px',
              paddingBottom: '40px',
              minHeight: 'clamp(420px, 70vh, 560px)',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1400px',
                height: 'clamp(380px, 60vh, 480px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {visibleCourses.map(({ course, offset }) => {
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
                      rotateY: offset * 46,
                      x: offset * 256,
                      z: isCenter ? 190 : -135,
                    }}
                    transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: 'clamp(280px, 85vw, 380px)',
                      position: 'absolute',
                      transformStyle: 'preserve-3d',
                      filter: isCenter
                        ? 'drop-shadow(0 28px 84px rgba(34, 211, 238, 0.24))'
                        : 'drop-shadow(0 8px 18px rgba(0, 0, 0, 0.18))',
                      willChange: 'transform, opacity',
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <motion.div
                      style={{
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer',
                      }}
                      onClick={() => isCenter && setManualSelectedCourse(course)}
                    >
                      <GlowingCard glowColor="#22d3ee">
                        <div
                          style={{
                            padding: 'clamp(20px, 4vw, 28px)',
                            backgroundColor: 'rgba(17, 24, 39, 0.95)',
                            borderRadius: '20px',
                            minHeight: 'clamp(350px, 55vh, 400px)',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '2px solid rgba(34, 211, 238, 0.1)',
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: 'radial-gradient(circle at 30% 20%, rgba(34, 211, 238, 0.12), transparent 50%)',
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
                                background:
                                  badgeText === 'Trending'
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
                              {badgeText === 'Trending' && '🔥 '}
                              {badgeText}
                            </motion.div>
                          )}

                          <div
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
                          </div>

                          <h3
                            style={{
                              fontSize: 'clamp(20px, 4vw, 24px)',
                              fontWeight: 700,
                              color: 'white',
                              marginBottom: '10px',
                              fontFamily: 'var(--font-nunito)',
                              lineHeight: 1.25,
                              position: 'relative',
                              zIndex: 5,
                            }}
                          >
                            {course.title}
                          </h3>

                          <p
                            style={{
                              fontSize: 'clamp(12px, 2vw, 13px)',
                              color: '#d1d5db',
                              lineHeight: 1.5,
                              marginBottom: '16px',
                              fontFamily: 'var(--font-nunito)',
                              flex: 1,
                              position: 'relative',
                              zIndex: 5,
                            }}
                          >
                            {course.shortDescription}
                          </p>

                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px', position: 'relative', zIndex: 5 }}>
                            {course.tags.slice(0, 2).map((tag) => (
                              <motion.span
                                key={tag}
                                whileHover={{ scale: 1.08 }}
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
                              setManualSelectedCourse(course);
                            }}
                            whileHover={{
                              scale: 1.05,
                              boxShadow: '0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)',
                            }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                              ...homePreviewCardButtonStyle,
                              boxShadow: '0 0 15px rgba(34, 211, 238, 0.3)',
                              position: 'relative',
                              zIndex: 5,
                            }}
                          >
                            Learn More
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

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(8px, 2vw, 14px)',
            marginTop: 'clamp(12px, 2vw, 24px)',
            paddingLeft: '24px',
            paddingRight: '24px',
            flexWrap: 'wrap',
          }}
        >
          {featuredCourses.map((_, i) => (
            <motion.button
              key={i}
              type="button"
              aria-label={`Show course ${i + 1}`}
              style={{
                width: courseIndex === i ? '32px' : 'clamp(10px, 2vw, 14px)',
                height: 'clamp(10px, 2vw, 14px)',
                borderRadius: '7px',
                border: 'none',
                background:
                  courseIndex === i
                    ? 'linear-gradient(135deg, #22d3ee, #a855f7)'
                    : 'rgba(255, 255, 255, 0.25)',
                cursor: 'pointer',
                boxShadow: courseIndex === i ? '0 0 18px rgba(34, 211, 238, 0.4)' : 'none',
              }}
              onClick={() => setCourseIndex(i)}
              whileHover={{ scale: 1.18 }}
            />
          ))}
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
              style={homePreviewButtonStyle}
            >
              View All Courses
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      <AnimatePresence>
        {selectedCourse && (
          <CourseDetailsModal
            course={selectedCourse}
            initialShowEnrollment={shouldOpenEnrollment}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}
