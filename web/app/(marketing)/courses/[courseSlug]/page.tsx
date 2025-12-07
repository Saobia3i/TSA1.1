'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BarChart, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { getCourseBySlug } from '@/features/courses/data/courses';
import { notFound } from 'next/navigation';

export default function CourseDetailsPage({ params }: { params: { courseSlug: string } }) {
  const course = getCourseBySlug(params.courseSlug);

  if (!course) {
    notFound();
  }

  const Icon = course.icon;

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', paddingTop: '90px', overflowX: 'hidden' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '60px 24px' }}>
        
        <Link href="/courses" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(17, 24, 39, 0.7)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '10px',
              padding: '10px 20px',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '40px',
              fontFamily: 'var(--font-space-mono)',
            }}
          >
            <ArrowLeft style={{ width: '18px', height: '18px' }} />
            Back to Courses
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '40px',
            backgroundColor: 'rgba(17, 24, 39, 0.7)',
            borderRadius: '20px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '16px',
              background: 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
            }}
          >
            <Icon style={{ width: '36px', height: '36px', color: '#06b6d4' }} />
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: 'white',
              marginBottom: '16px',
              fontFamily: 'var(--font-space-mono)',
            }}
          >
            {course.title}
          </h1>

          <p style={{ fontSize: '18px', color: '#d1d5db', lineHeight: 1.7, marginBottom: '24px' }}>
            {course.description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock style={{ width: '20px', height: '20px', color: '#22d3ee' }} />
              <span style={{ fontSize: '15px', color: '#9ca3af' }}>{course.duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart style={{ width: '20px', height: '20px', color: '#22d3ee' }} />
              <span style={{ fontSize: '15px', color: '#9ca3af' }}>{course.level}</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {course.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '6px 16px',
                  background: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: '#22d3ee',
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {course.topics && course.topics.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '20px',
                  fontFamily: 'var(--font-space-mono)',
                }}
              >
                What You'll Learn
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {course.topics.map((topic, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    style={{
                      fontSize: '15px',
                      color: '#d1d5db',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <CheckCircle style={{ width: '20px', height: '20px', color: '#22d3ee', flexShrink: 0 }} />
                    {topic}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '16px 40px',
              fontSize: '16px',
              fontWeight: 600,
              borderRadius: '10px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              background: 'linear-gradient(to right, rgba(6, 182, 212, 0.3), rgba(168, 85, 247, 0.3))',
              color: 'white',
              cursor: 'pointer',
              fontFamily: 'var(--font-space-mono)',
            }}
          >
            Enroll Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
