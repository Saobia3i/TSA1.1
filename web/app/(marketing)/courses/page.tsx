'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getAllCourses } from '@/features/courses/data/courses';

const ITEMS_PER_PAGE = 6;

export default function CoursesPage() {
  const allCourses = getAllCourses();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCourses = allCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedCourses = filteredCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', paddingTop: '90px', overflowX: 'hidden' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 24px' }}>
        
        <Link href="/" style={{ textDecoration: 'none' }}>
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
            Back to Home
          </motion.button>
        </Link>

        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              background: 'linear-gradient(to right, #22d3ee, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
              fontFamily: 'var(--font-space-mono)',
            }}
          >
            Our Courses
          </h1>
          <p style={{ fontSize: '16px', color: '#9ca3af', maxWidth: '700px', margin: '0 auto' }}>
            Master cybersecurity with expert-led live training programs
          </p>
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto 50px' }}>
          <div
            style={{
              position: 'relative',
              backgroundColor: 'rgba(17, 24, 39, 0.7)',
              borderRadius: '12px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              overflow: 'hidden',
            }}
          >
            <Search
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '20px',
                height: '20px',
                color: '#22d3ee',
              }}
            />
            <input
              type="text"
              placeholder="Search courses by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '15px',
                outline: 'none',
                fontFamily: 'var(--font-space-mono)',
              }}
            />
          </div>
          {searchQuery && (
            <p style={{ marginTop: '12px', fontSize: '14px', color: '#9ca3af', textAlign: 'center' }}>
              Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {displayedCourses.length > 0 ? (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                marginBottom: '50px',
              }}
            >
              {displayedCourses.map((course, index) => {
                const Icon = course.icon;
                return (
                  <motion.div
                    key={course.slug}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, borderColor: 'rgba(34, 211, 238, 0.8)' }}
                    style={{
                      padding: '24px',
                      backgroundColor: 'rgba(17, 24, 39, 0.7)',
                      borderRadius: '16px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s',
                    }}
                  >
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                      }}
                    >
                      <Icon style={{ width: '28px', height: '28px', color: '#06b6d4' }} />
                    </div>

                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'white', marginBottom: '12px' }}>
                      {course.title}
                    </h3>

                    <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6, marginBottom: '16px', flexGrow: 1 }}>
                      {course.shortDescription}
                    </p>

                    <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: '#9ca3af', marginBottom: '16px' }}>
                      <span>⏱️ {course.duration}</span>
                      <span>📊 {course.level}</span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                      {course.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: '4px 12px',
                            background: 'rgba(6, 182, 212, 0.1)',
                            border: '1px solid rgba(6, 182, 212, 0.3)',
                            borderRadius: '6px',
                            fontSize: '11px',
                            color: '#22d3ee',
                            fontWeight: 600,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link href={`/courses/${course.slug}`} style={{ textDecoration: 'none', marginTop: 'auto' }}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          width: '100%',
                          padding: '12px',
                          fontSize: '14px',
                          fontWeight: 600,
                          borderRadius: '8px',
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(168, 85, 247, 0.2))',
                          color: 'white',
                          cursor: 'pointer',
                          fontFamily: 'var(--font-space-mono)',
                        }}
                      >
                        Learn More
                      </motion.button>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: currentPage === 1 ? 'rgba(17, 24, 39, 0.5)' : 'rgba(17, 24, 39, 0.7)',
                    color: currentPage === 1 ? '#6b7280' : 'white',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChevronLeft style={{ width: '20px', height: '20px' }} />
                </motion.button>

                <span style={{ fontSize: '14px', color: '#9ca3af', fontFamily: 'var(--font-space-mono)' }}>
                  Page {currentPage} of {totalPages}
                </span>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: currentPage === totalPages ? 'rgba(17, 24, 39, 0.5)' : 'rgba(17, 24, 39, 0.7)',
                    color: currentPage === totalPages ? '#6b7280' : 'white',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChevronRight style={{ width: '20px', height: '20px' }} />
                </motion.button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '18px', color: '#9ca3af' }}>No courses found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
