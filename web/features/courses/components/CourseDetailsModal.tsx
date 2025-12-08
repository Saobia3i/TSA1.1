'use client';

import { motion } from 'framer-motion';
import { X, Clock, BarChart, CheckCircle, Star, Users } from 'lucide-react';
import type { Course } from '../data/courses';

interface CourseDetailsModalProps {
  course: Course;
  onClose: () => void;
}

export default function CourseDetailsModal({ course, onClose }: CourseDetailsModalProps) {
  const Icon = course.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        className="modal-scroll-container"
        style={{
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(30px)',
          borderRadius: '24px',
          border: `2px solid ${course.color}60`,
          boxShadow: `0 0 80px ${course.color}60`,
          padding: '40px',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: `${course.color}30`,
            border: `2px solid ${course.color}60`,
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: course.color,
          }}
        >
          <X style={{ width: '24px', height: '24px' }} />
        </motion.button>

        {/* Icon */}
        <div
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '16px',
            background: `linear-gradient(to bottom right, ${course.color}40, ${course.color}20)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <Icon style={{ width: '36px', height: '36px', color: course.color }} />
        </div>

        {/* Badge */}
        {course.badge && (
          <span
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: `${course.color}30`,
              border: `1px solid ${course.color}60`,
              borderRadius: '20px',
              fontSize: '12px',
              color: course.color,
              fontWeight: 700,
              marginBottom: '16px',
              fontFamily: 'var(--font-nunito)',
            }}
          >
            {course.badge}
          </span>
        )}

        {/* Title */}
        <h2
          style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 800,
            color: 'white',
            marginBottom: '16px',
            fontFamily: 'var(--font-nunito)',
          }}
        >
          {course.title}
        </h2>

        {/* Stats Row */}
        {(course.rating || course.students || course.instructor) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
            {course.rating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Star style={{ width: '18px', height: '18px', color: '#fbbf24', fill: '#fbbf24' }} />
                <span style={{ fontSize: '14px', color: '#d1d5db', fontWeight: 600, fontFamily: 'var(--font-nunito)' }}>
                  {course.rating} Rating
                </span>
              </div>
            )}
            {course.students && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users style={{ width: '18px', height: '18px', color: course.color }} />
                <span style={{ fontSize: '14px', color: '#d1d5db', fontFamily: 'var(--font-nunito)' }}>
                  {course.students.toLocaleString()} Students
                </span>
              </div>
            )}
            {course.instructor && (
              <span style={{ fontSize: '14px', color: '#9ca3af', fontFamily: 'var(--font-nunito)' }}>
                👨‍🏫 {course.instructor}
              </span>
            )}
          </div>
        )}

        {/* Description */}
        <p
          style={{
            fontSize: '17px',
            color: '#d1d5db',
            lineHeight: 1.8,
            marginBottom: '24px',
            fontFamily: 'var(--font-nunito)',
          }}
        >
          {course.description}
        </p>

        {/* Meta Info */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock style={{ width: '20px', height: '20px', color: course.color }} />
            <span style={{ fontSize: '15px', color: '#9ca3af', fontFamily: 'var(--font-nunito)' }}>
              {course.duration}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart style={{ width: '20px', height: '20px', color: course.color }} />
            <span style={{ fontSize: '15px', color: '#9ca3af', fontFamily: 'var(--font-nunito)' }}>
              {course.level}
            </span>
          </div>
          {course.price && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: course.color, fontFamily: 'var(--font-nunito)' }}>
                {course.price}
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
          {course.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '6px 16px',
                background: `${course.color}20`,
                border: `1px solid ${course.color}60`,
                borderRadius: '8px',
                fontSize: '13px',
                color: course.color,
                fontWeight: 600,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Topics */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'white',
              marginBottom: '20px',
              fontFamily: 'var(--font-nunito)',
            }}
          >
            What You&apos;ll Learn
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {course.topics.map((topic, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                style={{
                  fontSize: '15px',
                  color: '#d1d5db',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontFamily: 'var(--font-nunito)',
                }}
              >
                <CheckCircle style={{ width: '20px', height: '20px', color: course.color, flexShrink: 0 }} />
                {topic}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Enroll Button */}
        <motion.button
          whileHover={{ scale: 1.03, boxShadow: `0 0 50px ${course.color}80` }}
          whileTap={{ scale: 0.97 }}
          style={{
            width: '100%',
            padding: '18px 40px',
            fontSize: '16px',
            fontWeight: 700,
            borderRadius: '12px',
            border: `2px solid ${course.color}80`,
            background: `linear-gradient(to right, ${course.color}50, ${course.color}30)`,
            color: 'white',
            cursor: 'pointer',
            fontFamily: 'var(--font-nunito)',
          }}
        >
          Enroll Now {course.price && `• ${course.price}`}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
