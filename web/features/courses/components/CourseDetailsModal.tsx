'use client';

import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Clock,
  BarChart,
  CheckCircle,
  Circle,
  Star,
  Users,
  BookOpen,
} from 'lucide-react';
import type { Course } from '../data/courses';

interface CourseDetailsModalProps {
  course: Course;
  onClose: () => void;
}

export default memo(function CourseDetailsModal({
  course,
  onClose,
}: CourseDetailsModalProps) {
  const Icon = course.icon;
  const [showCurriculum, setShowCurriculum] = useState(false);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 900,
          width: '100%',
          maxHeight: '90vh',
          backgroundColor: 'rgba(17,24,39,0.95)',
          color: 'white',
          borderRadius: 24,
          border: `2px solid ${course.color}60`,
          boxShadow: `0 0 80px ${course.color}60`,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Close */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: `${course.color}30`,
            border: `2px solid ${course.color}60`,
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: course.color,
          }}
        >
          <X />
        </motion.button>

        {/* Scrollable Content - FIXED SCROLLBAR */}
        <div
            className="scrollContainer"
  style={{
    padding: 40,
    overflowY: 'auto',
    paddingBottom: 140,
    scrollbarWidth: 'thin', // Firefox
    scrollbarColor: 'rgba(34, 197, 94, 0.5) transparent', // Firefox
    msOverflowStyle: 'none', // IE/Edge
  }}
>
          <AnimatePresence mode="wait">
            {!showCurriculum ? (
              <motion.div
                key="details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 16,
                    background: `linear-gradient(${course.color}40, ${course.color}20)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                  }}
                >
                  <Icon size={36} color={course.color} />
                </div>

                {/* Badge */}
                {course.badge && (
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '6px 16px',
                      background: `${course.color}30`,
                      border: `1px solid ${course.color}60`,
                      borderRadius: 20,
                      fontSize: 12,
                      color: course.color,
                      fontWeight: 700,
                      marginBottom: 16,
                      fontFamily: 'var(--font-nunito)',
                    }}
                  >
                    {course.badge}
                  </span>
                )}

                {/* Title */}
                <h2
                  id="course-title"
                  style={{
                    fontSize: 'clamp(24px, 4vw, 36px)',
                    fontWeight: 800,
                    color: 'white',
                    marginBottom: 16,
                    fontFamily: 'var(--font-nunito)',
                  }}
                >
                  {course.title}
                </h2>

                {/* Stats */}
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 20 }}>
                  {course.rating && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Star size={18} color="#fbbf24" fill="#fbbf24" />
                      <span style={{ color: '#d1d5db' }}>{course.rating} Rating</span>
                    </div>
                  )}
                  {course.students && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Users size={18} color={course.color} />
                      <span style={{ color: '#d1d5db' }}>
                        {course.students.toLocaleString()} Students
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p style={{ color: '#d1d5db', lineHeight: 1.8, marginBottom: 24 }}>
                  {course.description}
                </p>

                {/* Meta */}
                <div style={{ display: 'flex', gap: 20, marginBottom: 32 }}>
                  <Clock size={20} color={course.color} />
                  <span>{course.duration}</span>
                  <BarChart size={20} color={course.color} />
                  <span>{course.level}</span>
                </div>

                {/* Topics */}
                <h3 style={{ color: 'white', marginBottom: 20 }}>What You'll Learn</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {course.topics.map((topic, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                      <CheckCircle size={20} color={course.color} />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.div
                key="curriculum"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h3 style={{ fontSize: 24, marginBottom: 24, color: 'white' }}>
                  Full Curriculum
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {course.curriculum.map((item, i) => (  // ✅ FIXED: course.curriculum
                    <li key={i} style={{  paddingLeft: 28, marginBottom: 14 }}>
                      {/* <CheckCircle size={18} color={course.color} /> */}
                      <span style={{ color: '#d1d5db' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fixed Bottom Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px 40px',
            display: 'flex',
            gap: 16,
            background:
              'linear-gradient(to top, rgba(17,24,39,0.98), transparent)',
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowCurriculum((v) => !v)}
            style={{
              flex: 1,
              padding: 16,
              borderRadius: 12,
              border: `2px solid ${course.color}90`,
              background: `linear-gradient(${course.color}60, ${course.color}30)`,
              color: 'white',
              fontWeight: 700,
              fontFamily: 'var(--font-nunito)',
            }}
          >
            <BookOpen size={18} /> {showCurriculum ? 'What You\'ll Learn' : 'View Curriculum'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{
              flex: 1,
              padding: 16,
              borderRadius: 12,
              border: `2px solid ${course.color}80`,
              background: `linear-gradient(${course.color}, ${course.color}50)`,
              color: 'white',
              fontWeight: 700,
              fontFamily: 'var(--font-nunito)',
            }}
          >
            Enroll Now {course.price && `• ${course.price}`}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
});
