'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const featuredTools = [
  {
    name: 'AI PENTEST Toolkit',
    description: 'AI powered offensive security framework that automates penetration testing.',
    github: 'https://github.com/tools-tensorsecurityacademy/AI-Pentest-Toolkit',
    color: '#ec4899',
  },
  {
    name: 'DirRumble',
    description: 'Lightning-fast HTTP directory fuzzing tool for WAF bypass testing.',
    github: 'https://github.com/tools-tensorsecurityacademy/dirrumble',
    color: '#a855f7',
  },
  {
    name: 'NexusTrace',
    description: 'High-speed DNS resolving and subdomain enumeration tool.',
    github: 'https://github.com/tools-tensorsecurityacademy/NexusTrace',
    color: '#22d3ee',
  },
  {
    name: 'XSS-Cobra',
    description: 'Ultra fast XSS scanner with intelligent mutation engine.',
    github: 'https://github.com/tools-tensorsecurityacademy/XSS-Cobra',
    color: '#ef4444',
  },
];

export default function ToolsPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredViewMore, setHoveredViewMore] = useState(false);

  return (
    <motion.section
      style={{
        padding: 'clamp(40px, 6vw, 60px) clamp(16px, 4vw, 24px)',
        backgroundColor: 'rgba(17, 24, 39, 0.2)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 60px)' }}
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
            letterSpacing: '-0.5px',
          }}
        >
          Our Security Tools
        </h2>
        <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#9ca3af', fontFamily: 'var(--font-nunito)' }}>
          Open-source offensive security tools built by TSA
        </p>
      </motion.div>

      {/* Single Row Container */}
      <div
        style={{
          display: 'flex',
          gap: 'clamp(12px, 2vw, 20px)',
          maxWidth: '1400px',
          margin: '0 auto',
          overflowX: 'auto',
          paddingBottom: '10px',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(34, 211, 238, 0.3) rgba(17, 24, 39, 0.2)',
        }}
      >
        {/* Tool Cards - SMALLER WIDTH */}
        {featuredTools.map((tool, index) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6, type: 'spring' }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            style={{
              minWidth: 'clamp(220px, 22vw, 240px)', // ✅ SMALLER WIDTH
              maxWidth: '240px', // ✅ MAX WIDTH
              flex: '0 0 auto',
              padding: 'clamp(16px, 3vw, 20px)', // ✅ SMALLER PADDING
              background: 'rgba(17, 24, 39, 0.5)',
              backdropFilter: 'blur(30px)',
              borderRadius: '14px', // ✅ SMALLER RADIUS
              border: `2px solid ${hoveredIndex === index ? tool.color : `${tool.color}40`}`,
              boxShadow: hoveredIndex === index 
                ? `0 0 40px ${tool.color}60` 
                : `0 8px 25px ${tool.color}20`,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 'clamp(220px, 28vw, 240px)', // ✅ SMALLER HEIGHT
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: 'clamp(16px, 2.5vw, 18px)', // ✅ SMALLER TITLE
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-nunito)',
                  letterSpacing: '0.3px',
                  lineHeight: '1.3',
                }}
              >
                {tool.name}
              </h3>

              <p
                style={{
                  fontSize: 'clamp(11px, 1.8vw, 13px)', // ✅ SMALLER TEXT
                  color: '#d1d5db',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                  fontFamily: 'var(--font-nunito)',
                }}
              >
                {tool.description}
              </p>
            </div>

            <a
              href={tool.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '100%',
                  padding: 'clamp(8px, 1.5vw, 10px) clamp(12px, 2vw, 16px)', // ✅ SMALLER BUTTON
                  fontSize: 'clamp(11px, 1.8vw, 13px)',
                  fontWeight: 600,
                  borderRadius: '8px',
                  border: `2px solid ${tool.color}60`,
                  background: `linear-gradient(135deg, ${tool.color}20, ${tool.color}10)`,
                  backdropFilter: 'blur(10px)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-nunito)',
                  boxShadow: `0 0 15px ${tool.color}30`,
                  transition: 'all 0.3s ease',
                }}
              >
                <Github style={{ width: '16px', height: '16px' }} />
                GitHub
              </motion.button>
            </a>
          </motion.div>
        ))}

        {/* View More Tools Card - SMALLER */}
        <Link href="/tools" style={{ textDecoration: 'none', flex: '0 0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6, type: 'spring' }}
            onHoverStart={() => setHoveredViewMore(true)}
            onHoverEnd={() => setHoveredViewMore(false)}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            style={{
              minWidth: 'clamp(220px, 22vw, 240px)', // ✅ SAME AS CARDS
              maxWidth: '240px',
              padding: 'clamp(16px, 3vw, 20px)',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(168, 85, 247, 0.15))',
              backdropFilter: 'blur(30px)',
              borderRadius: '14px',
              border: `2px solid ${hoveredViewMore ? 'rgba(34, 211, 238, 0.8)' : 'rgba(34, 211, 238, 0.4)'}`,
              boxShadow: hoveredViewMore 
                ? '0 0 40px rgba(34, 211, 238, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)' 
                : '0 8px 25px rgba(34, 211, 238, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 'clamp(220px, 28vw, 240px)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Animated Background Gradient */}
            <motion.div
              animate={{
                background: hoveredViewMore 
                  ? [
                      'radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.3), transparent)',
                      'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.3), transparent)',
                      'radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.3), transparent)',
                    ]
                  : 'radial-gradient(circle at 50% 50%, transparent, transparent)',
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
              }}
            />

            <motion.div
              animate={{
                scale: hoveredViewMore ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.6, repeat: hoveredViewMore ? Infinity : 0 }}
              style={{
                width: 'clamp(60px, 10vw, 70px)', // ✅ SMALLER CIRCLE
                height: 'clamp(60px, 10vw, 70px)',
                borderRadius: '50%',
                border: '3px solid rgba(34, 211, 238, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                background: 'rgba(17, 24, 39, 0.6)',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <motion.div
                animate={{
                  x: hoveredViewMore ? [0, 5, 0] : 0,
                }}
                transition={{ duration: 0.6, repeat: hoveredViewMore ? Infinity : 0 }}
              >
                <ArrowRight 
                  style={{ 
                    width: 'clamp(24px, 5vw, 28px)', // ✅ SMALLER ARROW
                    height: 'clamp(24px, 5vw, 28px)', 
                    color: '#22d3ee',
                    filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.8))',
                  }} 
                />
              </motion.div>
            </motion.div>

            <h3
              style={{
                fontSize: 'clamp(16px, 2.8vw, 18px)', // ✅ SMALLER TITLE
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '6px',
                fontFamily: 'var(--font-nunito)',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
                lineHeight: '1.3',
              }}
            >
              View More
            </h3>

            <p
              style={{
                fontSize: 'clamp(11px, 1.8vw, 13px)', // ✅ SMALLER SUBTITLE
                color: '#9ca3af',
                fontFamily: 'var(--font-nunito)',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              Explore toolkit
            </p>

            {/* Animated Border Pulse */}
            <motion.div
              animate={{
                opacity: hoveredViewMore ? [0.3, 0.6, 0.3] : 0,
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                borderRadius: '14px',
                border: '2px solid #22d3ee',
                pointerEvents: 'none',
                filter: 'blur(8px)',
              }}
            />
          </motion.div>
        </Link>
      </div>

      <style>{`
        /* Custom Scrollbar for horizontal scroll */
        div::-webkit-scrollbar {
          height: 8px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.2);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
      `}</style>
    </motion.section>
  );
}
