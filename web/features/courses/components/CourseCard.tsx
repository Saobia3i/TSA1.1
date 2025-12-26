'use client';

import { motion } from 'framer-motion';
import type { Course } from '../data/courses';
import { BarChart, Clock } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  index: number;
  onClick: () => void;
}

export default function CourseCard({ course, index, onClick }: CourseCardProps) {
  const Icon = course.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, borderColor: `${course.color}80` }}
      onClick={onClick}
      style={{
        padding: '24px',
        backgroundColor: 'rgba(17, 24, 39, 0.7)',
        borderRadius: '16px',
        border: '2px solid rgba(255, 255, 255, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s',
        cursor: 'pointer',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: `linear-gradient(to bottom right, ${course.color}40, ${course.color}20)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <Icon style={{ width: '28px', height: '28px', color: course.color }} />
      </div>

      {/* Badge */}
      {course.badge && (
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            background: `${course.color}30`,
            border: `1px solid ${course.color}60`,
            borderRadius: '20px',
            fontSize: '11px',
            color: course.color,
            fontWeight: 700,
            marginBottom: '12px',
            width: 'fit-content',
            fontFamily: 'var(--font-nunito)',
          }}
        >
          {course.badge}
        </span>
      )}

      {/* Title */}
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 600,
          color: 'white',
          marginBottom: '12px',
          fontFamily: 'var(--font-nunito)',
        }}
      >
        {course.title}
      </h3>

      {/* Short Description */}
      <p
        style={{
          fontSize: '14px',
          color: '#9ca3af',
          lineHeight: 1.6,
          marginBottom: '16px',
          flexGrow: 1,
          fontFamily: 'var(--font-nunito)',
        }}
      >
        {course.shortDescription}
      </p>

      {/* Meta Info */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          fontSize: '13px',
          color: '#ffff',
          marginBottom: '16px',
          fontFamily: 'var(--font-nunito)',
        }}
      >
        <span><Clock style={{ color: course.color,width: '14px', height: '14px', marginRight: '4px' }} /> {course.duration}</span>
        <span><BarChart style={{ color: course.color,width: '14px', height: '14px', marginRight: '4px' }} /> {course.level}</span>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        {course.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            style={{
              padding: '4px 12px',
              background: `${course.color}20`,
              border: `1px solid ${course.color}40`,
              borderRadius: '6px',
              fontSize: '11px',
              color: course.color,
              fontWeight: 600,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Learn More Button */}
      <motion.button
        whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${course.color}60` }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '14px',
          fontWeight: 600,
          borderRadius: '8px',
          border: `2px solid ${course.color}60`,
          background: `linear-gradient(to right, ${course.color}30, ${course.color}20)`,
          color: 'white',
          cursor: 'pointer',
          fontFamily: 'var(--font-nunito)',
        }}
      >
        Learn More
      </motion.button>
    </motion.div>
  );
}
