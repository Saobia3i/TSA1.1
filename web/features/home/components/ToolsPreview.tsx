'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {  Github } from 'lucide-react';
import {
  homePreviewButtonStyle,
  homePreviewCardButtonStyle,
  sectionSubtitleStyle,
  sectionTitleStyle,
} from '@/features/home/components/homeSectionStyles';

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
  const duplicatedItems = [...featuredTools, ...featuredTools];

  return (
    <motion.section
      style={{
        padding: 'clamp(40px, 6vw, 60px) clamp(16px, 4vw, 24px)',
        backgroundColor: 'rgba(17, 24, 39, 0.2)',
      }}
    >
      <motion.div
        initial={{ opacity: 1, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 60px)' }}
      >
        <h2
          style={sectionTitleStyle}
        >
          Our Security Tools
        </h2>
        <p style={sectionSubtitleStyle}>
          Open-source offensive security tools built by TSA
        </p>
      </motion.div>

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          overflow: 'hidden',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        <div
          className="tools-carousel-track"
          style={{
            display: 'flex',
            gap: 'clamp(12px, 2vw, 20px)',
            width: 'max-content',
          }}
        >
          {duplicatedItems.map((item, index) => {
            const card = (
              <div
                style={{
                  minWidth: 'clamp(220px, 22vw, 240px)',
                  maxWidth: '240px',
                  flex: '0 0 auto',
                  padding: 'clamp(16px, 3vw, 20px)',
                  background: 'rgba(17, 24, 39, 0.5)',
                  backdropFilter: 'blur(14px)',
                  borderRadius: '14px',
                  border: `2px solid ${item.color}40`,
                  boxShadow: `0 8px 20px ${item.color}18`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 'clamp(220px, 28vw, 240px)',
                }}
              >
                <>
                  <div>
                    <h3
                      style={{
                        fontSize: 'clamp(16px, 2.5vw, 18px)',
                        fontWeight: 700,
                        color: '#ffffff',
                        marginBottom: '8px',
                        fontFamily: 'var(--font-nunito)',
                        letterSpacing: '0.3px',
                        lineHeight: '1.3',
                      }}
                    >
                      {item.name}
                    </h3>

                    <p
                      style={{
                        fontSize: 'clamp(11px, 1.8vw, 13px)',
                        color: '#d1d5db',
                        lineHeight: 1.6,
                        marginBottom: '16px',
                        fontFamily: 'var(--font-nunito)',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    style={{
                      ...homePreviewCardButtonStyle,
                      border: `2px solid ${item.color}60`,
                      background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                      color: '#ffffff',
                      gap: '6px',
                      boxShadow: `0 0 12px ${item.color}24`,
                    }}
                  >
                    <Github style={{ width: '16px', height: '16px' }} />
                    GitHub
                  </div>
                </>
              </div>
            );

            return (
              <a
                key={`${item.name}-${index}`}
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', flex: '0 0 auto' }}
              >
                {card}
              </a>
            );
          })}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '28px',
        }}
      >
        <Link href="/tools" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(34, 211, 238, 0.6), 0 0 50px rgba(168, 85, 247, 0.4)' }}
            whileTap={{ scale: 0.96 }}
            style={homePreviewButtonStyle}
          >
            View More Tools
          </motion.button>
        </Link>
      </div>

      <style>{`
        .tools-carousel-track {
          animation: tools-preview-scroll 24s linear infinite;
        }

        @media (hover: hover) and (pointer: fine) {
          .tools-carousel-track:hover {
            animation-play-state: paused;
          }
        }

        @keyframes tools-preview-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(calc(-50% - clamp(6px, 1vw, 10px)), 0, 0);
          }
        }

        @media (max-width: 768px) {
          .tools-carousel-track {
            animation-duration: 18s;
          }
        }
      `}</style>
    </motion.section>
  );
}
