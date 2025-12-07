'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import Linkedin from '@mui/icons-material/LinkedIn';
import Footer from '@/features/layout/components/Footer';

const teamMembers = [
  {
    name: 'Abrar Jahin',
    role: 'Founder and CEO, Security Researcher',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    linkedin: 'https://linkedin.com/in/abrar-jahin',
    isFounder: true,
  },
  {
    name: 'Nuren Tasnim',
    role: 'Director of Business Development',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    mail: 'nurain@gmail.com',
    isFounder: false,
  },
  {
    name: 'Abid Hossain Ove',
    role: 'Managing Director (Academics)',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    mail: 'abid@gmail.com',
    isFounder: false,
  },
  {
    name: 'Saobia Tinni',
    role: 'Principal Web Engineer',
    image: 'https://ik.imagekit.io/ekb0d0it0/Saobia%20Islam.png?updatedAt=1764317906408',
    mail: 'islamsaobia@gmail.com',
    isFounder: false,
  },
  {
    name: 'Iftekhar Salehin',
    role: 'Managing Director (Operations)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    mail: 'iftekhar@gmail.com',
    isFounder: false,
  },
  {
    name: 'Mubtasim Fuad',
    role: 'Director of TSA Labs, Red Team Analyst',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    mail: 'mubtasim@gmail.com',
    isFounder: false,
  },
  {
    name: 'Prottoy Rudro',
    role: 'Faculty Member, Cyber Security Expert',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    mail: 'prottoy@gmail.com',
    isFounder: false,
  },
];


const problems = [
  {
    title: 'Guidance Gap',
    description: 'Endless YouTube tutorials and generic blog posts created noise, not clarity. Aspiring professionals were drowning in surface-level content with no roadmap, no structure, and no one to turn to when they hit a wall.',
  },
  {
    title: 'AI Disruption',
    description: 'The cybersecurity landscape was evolving at breakneck speed. Skills that landed jobs last year were becoming obsolete. Traditional education couldn\'t keep pace, leaving students trained for yesterday\'s threats while tomorrow\'s challenges loomed.',
  },
  {
    title: 'Access Barrier',
    description: 'Elite training programs in the US, UK, and developed nations carried price tags that locked out talented individuals worldwide. Geographic location and financial circumstances were determining who could access world-class education, not potential or drive.',
  },
];

const differences = [
  {
    title: 'A Mentor-Led Journey',
    description: 'Forget the isolation of solo learning. Imagine having seasoned cybersecurity professionals in your corner. Experts who\'ve walked the path you\'re on, who answer your questions in real-time, and who guide you past the pitfalls that derail most beginners.',
    icon: '🎯',
  },
  {
    title: 'Live, Interactive Training',
    description: 'Here\'s what most courses won\'t tell you: watching videos doesn\'t make you job ready. Employers need people who can perform under pressure. That\'s why every session is live and interactive. You\'ll engage with real tools, tackle real challenges, and build muscle memory that sticks.',
    icon: '⚡',
  },
  {
    title: 'Real-World Projects & Industry Insight',
    description: 'Anyone can teach theory. We teach you to think like a cybersecurity professional. You\'ll work on actual industry scenarios, understand the "why" behind every technique, and develop the practical judgment that separates those with certificates from those with careers. When you finish, you won\'t just know cybersecurity. You\'ll BE a cybersecurity professional.',
    icon: '🚀',
  },
  {
    title: 'Radical Affordability',
    description: 'On-demand education in the latest technologies shouldn\'t come with a crippling price tag. We\'ve shattered that barrier. You\'ll get the same world-class instruction, mentorship, and career transformation at a fraction of traditional costs accessible to international students everywhere. Because your ambition shouldn\'t be limited by your budget.',
    icon: '💎',
  },
];

// Aurora Background Component
const AuroraBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Aurora Effect */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
          background: 'linear-gradient(to bottom, #000 0%, #001a33 50%, #000 100%)',
        }}
      >
        {/* Animated aurora layers */}
        <motion.div
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.4), transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        
        <motion.div
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{
            position: 'absolute',
            top: '20%',
            right: '-10%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.35), transparent 70%)',
            filter: 'blur(100px)',
          }}
        />

        <motion.div
          animate={{
            opacity: [0.35, 0.75, 0.35],
            scale: [1, 1.15, 1],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{
            position: 'absolute',
            bottom: '-5%',
            left: '25%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.3), transparent 70%)',
            filter: 'blur(120px)',
          }}
        />

        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.25, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '70%',
            background: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.25), transparent 70%)',
            filter: 'blur(150px)',
          }}
        />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default function AboutPage() {
  const founder = teamMembers[0];
  const secondRowMembers = teamMembers.slice(1, 4);
  const thirdRowMembers = teamMembers.slice(4, 7);

  return (
    <AuroraBackground>
      <div
        style={{
          backgroundColor: 'transparent',
          minHeight: '100vh',
          paddingTop: '90px',
          overflowX: 'hidden',
          fontFamily: '"Nunito Sans", -apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >
        {/* BACK BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #ffffff',
                borderRadius: '12px',
                padding: '10px 20px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '40px',
                marginTop: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <ArrowLeft style={{ width: '18px', height: '18px' }} />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>

        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 16px 60px',
            textAlign: 'center',
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: 'clamp(28px, 6vw, 54px)',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            About Tensor Security Academy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              fontSize: 'clamp(14px, 3vw, 18px)',
              color: '#ffffff',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6',
              padding: '0 16px',
            }}
          >
            Democratizing cybersecurity education globally. Bridging exceptional talent with world-class training.
          </motion.p>
        </motion.div>

        {/* THE PROBLEM WE EXIST TO SOLVE - ONE-SIDED VERTICAL ROADMAP */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '60px 16px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2
              style={{
                fontSize: 'clamp(24px, 4vw, 42px)',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '20px',
                letterSpacing: '-0.02em',
              }}
            >
              The Problem We Exist to Solve
            </h2>
            <p
              style={{
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                color: '#ffffff',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.7',
                fontWeight: 500,
                padding: '0 16px',
              }}
            >
              Tensor Security Academy wasn't built to chase Edtech market trends, it was born from lived experience. Founder Abrar Jahin launched TSA during his university days, driven by a clear vision: to solve three critical problems he had personally encountered in his early career.
            </p>
          </motion.div>

          {/* ONE-SIDED VERTICAL ROADMAP */}
          <div
            style={{
              position: 'relative',
              maxWidth: '800px',
              margin: '0 auto',
              paddingLeft: 'clamp(20px, 5vw, 60px)',
            }}
          >
            {/* Vertical Line */}
            <div
              style={{
                position: 'absolute',
                left: 'clamp(10px, 2.5vw, 30px)',
                top: 0,
                bottom: 0,
                width: '2px',
                background: 'linear-gradient(to bottom, rgba(0, 212, 255, 0.6), rgba(124, 58, 237, 0.6))',
              }}
            />

            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                style={{
                  marginBottom: index !== problems.length - 1 ? 'clamp(40px, 8vw, 60px)' : 0,
                  position: 'relative',
                  paddingLeft: 'clamp(20px, 4vw, 40px)',
                }}
              >
                {/* Dot on timeline */}
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(0, 212, 255, 0.4)',
                      '0 0 30px rgba(124, 58, 237, 0.6)',
                      '0 0 10px rgba(0, 212, 255, 0.4)',
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    left: 'clamp(2px, 1.5vw, 22px)',
                    top: '20px',
                    transform: 'translateX(-50%)',
                    width: 'clamp(14px, 3vw, 20px)',
                    height: 'clamp(14px, 3vw, 20px)',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                    border: '3px solid rgba(0, 0, 0, 0.8)',
                    zIndex: 10,
                  }}
                />

                {/* Card */}
                <motion.div
                  whileHover={{
                    y: -8,
                    boxShadow: '0 25px 50px rgba(0, 212, 255, 0.2), inset 0 0 20px rgba(0, 212, 255, 0.1)',
                  }}
                  style={{
                    padding: 'clamp(20px, 4vw, 32px)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid #ffffff',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(124, 58, 237, 0.05))',
                      pointerEvents: 'none',
                    }}
                  />

                  <h3
                    style={{
                      fontSize: 'clamp(16px, 3vw, 20px)',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '12px',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    "{problem.title}"
                  </h3>

                  <p
                    style={{
                      fontSize: 'clamp(13px, 2.5vw, 15px)',
                      color: '#ffffff',
                      lineHeight: '1.7',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {problem.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CONCLUSION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{
              marginTop: 'clamp(60px, 10vw, 100px)',
              padding: 'clamp(24px, 5vw, 40px)',
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid #ffffff',
              borderRadius: '16px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              maxWidth: '800px',
              margin: 'clamp(60px, 10vw, 100px) auto 0',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1), transparent)',
                borderRadius: '50%',
              }}
            />

            <p
              style={{
                fontSize: 'clamp(13px, 2.5vw, 16px)',
                color: '#ffffff',
                fontWeight: 600,
                lineHeight: '1.8',
                position: 'relative',
                zIndex: 1,
              }}
            >
              The conclusion was inescapable: <span style={{ color: '#00d4ff', fontWeight: 800 }}>passive learning doesn't build cybersecurity careers</span>. Certificates without capability won't get you hired. And going it alone? That's the slowest, most frustrating path possible—one that causes most aspiring professionals to give up before they ever break through.
            </p>
          </motion.div>
        </motion.section>

        {/* WHAT MAKES US DIFFERENT - PREMIUM ZIGZAG DIAMOND ROADMAP */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '80px 16px',
            position: 'relative',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <h2
                style={{
                  fontSize: 'clamp(26px, 5vw, 48px)',
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '20px',
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                }}
              >
                What Makes Us Different
              </h2>
            </motion.div>
            <p
              style={{
                fontSize: 'clamp(15px, 3vw, 19px)',
                color: '#ffffff',
                maxWidth: '700px',
                margin: '0 auto',
                fontWeight: 700,
                letterSpacing: '0.5px',
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(124, 58, 237, 0.1))',
                padding: '12px 24px',
                borderRadius: '50px',
                border: '1px solid #ffffff',
              }}
            >
              And Why It Matters to Your Career
            </p>
          </motion.div>

          {/* PREMIUM DIAMOND/ZIGZAG ROADMAP */}
          <div
            style={{
              position: 'relative',
              maxWidth: '1100px',
              margin: '0 auto',
            }}
          >
            {/* Central glowing vertical line */}
            <motion.div
              animate={{
                opacity: [0.4, 0.8, 0.4],
                boxShadow: [
                  '0 0 20px rgba(0, 212, 255, 0.4)',
                  '0 0 50px rgba(124, 58, 237, 0.6)',
                  '0 0 20px rgba(0, 212, 255, 0.4)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '3px',
                background: 'linear-gradient(to bottom, rgba(0, 212, 255, 0.8), rgba(124, 58, 237, 0.8), rgba(6, 182, 212, 0.8))',
                transform: 'translateX(-50%)',
                zIndex: 1,
              }}
              className="desktop-only-line"
            />

            {differences.map((diff, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  style={{
                    marginBottom: index !== differences.length - 1 ? 'clamp(60px, 10vw, 100px)' : 0,
                    position: 'relative',
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    alignItems: 'center',
                  }}
                  className={isLeft ? 'roadmap-item-left' : 'roadmap-item-right'}
                >
                  {/* Glowing connecting line from center to card */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      width: 'clamp(40px, 8vw, 80px)',
                      height: '2px',
                      transformOrigin: isLeft ? 'right' : 'left',
                      zIndex: 0,
                    }}
                    className={isLeft ? 'connecting-line-left' : 'connecting-line-right'}
                  />

                  {/* Central glowing dot */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(0, 212, 255, 0.6), 0 0 40px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(124, 58, 237, 0.4)',
                        '0 0 40px rgba(124, 58, 237, 0.8), 0 0 80px rgba(124, 58, 237, 0.4), inset 0 0 40px rgba(0, 212, 255, 0.6)',
                        '0 0 20px rgba(0, 212, 255, 0.6), 0 0 40px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(124, 58, 237, 0.4)',
                      ],
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 'clamp(20px, 4vw, 30px)',
                      height: 'clamp(20px, 4vw, 30px)',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00d4ff, #7c3aed, #06b6d4)',
                      border: '3px solid rgba(0, 0, 0, 0.9)',
                      zIndex: 15,
                    }}
                    className="desktop-only-dot"
                  />

                  {/* Premium Card with Spotlight Effect */}
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      y: -15,
                    }}
                    style={{
                      width: '100%',
                      maxWidth: 'clamp(280px, 42vw, 480px)',
                      padding: 'clamp(28px, 5vw, 42px)',
                      background: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(30px)',
                      border: '2px solid #ffffff',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(0, 212, 255, 0.05)',
                      zIndex: 10,
                    }}
                  >
                    {/* Animated spotlight background */}
                    <motion.div
                      animate={{
                        opacity: [0.4, 0.7, 0.4],
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute',
                        top: '-50%',
                        width: '250px',
                        height: '250px',
                        background: isLeft
                          ? 'radial-gradient(circle, rgba(0, 212, 255, 0.4), transparent)'
                          : 'radial-gradient(circle, rgba(124, 58, 237, 0.4), transparent)',
                        borderRadius: '50%',
                        filter: 'blur(60px)',
                      }}
                      className={isLeft ? 'spotlight-left' : 'spotlight-right'}
                    />

                    {/* Premium light rays */}
                    <motion.div
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: isLeft
                          ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), transparent 60%)'
                          : 'linear-gradient(-135deg, rgba(124, 58, 237, 0.15), transparent 60%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Number badge */}
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        top: 'clamp(16px, 3vw, 24px)',
                        width: 'clamp(40px, 7vw, 60px)',
                        height: 'clamp(40px, 7vw, 60px)',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${
                          isLeft ? 'rgba(0, 212, 255, 0.2)' : 'rgba(124, 58, 237, 0.2)'
                        }, transparent)`,
                        border: `2px solid ${isLeft ? 'rgba(0, 212, 255, 0.5)' : 'rgba(124, 58, 237, 0.5)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'clamp(20px, 4vw, 32px)',
                        zIndex: 2,
                      }}
                      className={isLeft ? 'badge-left' : 'badge-right'}
                    >
                      {diff.icon}
                    </motion.div>

                    <h3
                      style={{
                        fontSize: 'clamp(20px, 4vw, 26px)',
                        fontWeight: 800,
                        color: '#ffffff',
                        marginBottom: 'clamp(14px, 3vw, 18px)',
                        marginTop: 'clamp(20px, 4vw, 30px)',
                        position: 'relative',
                        zIndex: 2,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {diff.title}
                    </h3>

                    <p
                      style={{
                        fontSize: 'clamp(13px, 2.5vw, 15px)',
                        color: '#ffffff',
                        lineHeight: '1.8',
                        position: 'relative',
                        zIndex: 2,
                        fontWeight: 500,
                      }}
                    >
                      {diff.description}
                    </p>

                    {/* Corner accent */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '80px',
                        height: '80px',
                        background: `linear-gradient(to ${isLeft ? 'top left' : 'top right'}, ${
                          isLeft ? 'rgba(0, 212, 255, 0.1)' : 'rgba(124, 58, 237, 0.1)'
                        }, transparent)`,
                      }}
                      className={isLeft ? 'corner-left' : 'corner-right'}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Closing Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.8 }}
            style={{
              marginTop: 'clamp(80px, 12vw, 120px)',
              padding: 'clamp(32px, 6vw, 50px)',
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(30px)',
              border: '2px solid #ffffff',
              borderRadius: '20px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0, 212, 255, 0.2), inset 0 0 60px rgba(0, 212, 255, 0.05)',
            }}
          >
            <motion.div
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(124, 58, 237, 0.3), transparent)',
                borderRadius: '50%',
                filter: 'blur(100px)',
              }}
            />

            <p
              style={{
                fontSize: 'clamp(15px, 3vw, 18px)',
                color: '#ffffff',
                fontWeight: 700,
                lineHeight: '1.9',
                position: 'relative',
                zIndex: 1,
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              This approach works. The model was validated. The impact was undeniable. What began as Abrar's vision in Bangladesh has now expanded to{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 900,
                }}
              >
                United States of America
              </span>
              , where TSA is actively training students and career shifters across America, equipping them with the hands-on skills and mentorship needed to launch successful cybersecurity careers.
            </p>
          </motion.div>
        </motion.section>

        {/* MEET THE FOUNDING TEAM - 1 FOUNDER + 3 + 3 GRID */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '60px 16px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2
              style={{
                fontSize: 'clamp(24px, 4vw, 42px)',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}
            >
              Meet the Founding Team
            </h2>
            <p
              style={{
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                color: '#ffffff',
                maxWidth: '700px',
                margin: '0 auto 16px',
                fontWeight: 500,
                lineHeight: '1.6',
              }}
            >
              The Backbone of Innovation
            </p>
            <p
              style={{
                fontSize: 'clamp(12px, 2.2vw, 15px)',
                color: '#ffffff',
                maxWidth: '750px',
                margin: '0 auto',
                fontWeight: 400,
                lineHeight: '1.7',
              }}
            >
              Today, Tensor Security Academy (TSA) commands access to an extensive talent pool and professional networks across Bangladesh, with a robust global presence in the fields of Cybersecurity, Artificial Intelligence, and Blockchain/Web3. But none of this might exist without the founding team. The architects who transformed vision into reality.
            </p>
          </motion.div>

          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
           {/* FOUNDER - First Row (Single Card) */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  style={{
    maxWidth: '400px',
    margin: '0 auto clamp(40px, 6vw, 60px)',
  }}
>
  <motion.div
    whileHover={{
      scale: 1.05,
      y: -12,
      boxShadow: '0 30px 70px rgba(255, 215, 0, 0.4), 0 0 60px rgba(255, 215, 0, 0.3)',
    }}
    style={{
      padding: 'clamp(32px, 5vw, 48px)',
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px)',
      border: '3px solid #FFD700',
      borderRadius: '24px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(255, 215, 0, 0.2), inset 0 0 40px rgba(255, 215, 0, 0.05)',
    }}
  >
    {/* Premium gold glow effect */}
    <motion.div
      animate={{
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.3, 1],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent 50%)',
        pointerEvents: 'none',
      }}
    />

    {/* Founder Badge */}
    <div
      style={{
        position: 'absolute',
        top: 'clamp(12px, 2vw, 20px)',
        right: 'clamp(12px, 2vw, 20px)',
        padding: 'clamp(6px, 1.5vw, 10px) clamp(12px, 2.5vw, 18px)',
        background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 165, 0, 0.2))',
        border: '2px solid #FFD700',
        borderRadius: '20px',
        fontSize: 'clamp(10px, 1.8vw, 12px)',
        fontWeight: 800,
        color: '#FFD700',
        letterSpacing: '0.5px',
        zIndex: 2,
      }}
    >
      ⭐ FOUNDER
    </div>

    <motion.div
      animate={{
        boxShadow: [
          '0 0 30px rgba(255, 215, 0, 0.4)',
          '0 0 60px rgba(255, 165, 0, 0.6)',
          '0 0 30px rgba(255, 215, 0, 0.4)',
        ],
      }}
      transition={{ duration: 3, repeat: Infinity }}
      style={{
        width: 'clamp(120px, 20vw, 160px)',
        height: 'clamp(120px, 20vw, 160px)',
        margin: '0 auto 24px',
        borderRadius: '50%',
        border: '4px solid #FFD700',
        backgroundImage: `url('${founder.image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    />

    <h3
      style={{
        fontSize: 'clamp(18px, 3.2vw, 24px)',
        fontWeight: 900,
        color: '#ffffff',
        marginBottom: '12px',
        letterSpacing: '-0.01em',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {founder.name}
    </h3>

    <p
      style={{
        fontSize: 'clamp(13px, 2.4vw, 16px)',
        background: 'linear-gradient(135deg, #FFD700, #FFA500)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 700,
        marginBottom: '20px',
        lineHeight: '1.5',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {founder.role}
    </p>

    <a
      href={founder.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          padding: 'clamp(12px, 2.2vw, 16px) clamp(24px, 4vw, 32px)',
          fontSize: 'clamp(13px, 2.3vw, 15px)',
          fontWeight: 800,
          borderRadius: '12px',
          border: '2px solid #FFD700',
          background: 'rgba(255, 215, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          color: '#ffffff',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Linkedin style={{ width: '18px', height: '18px', color: '#FFD700' }} />
        Connect
      </motion.button>
    </a>
  </motion.div>
</motion.div>

{/* Second Row - 3 Cards */}
<div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'clamp(20px, 3vw, 32px)',
    marginBottom: 'clamp(20px, 3vw, 32px)',
  }}
>
  {secondRowMembers.map((member, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
      whileHover={{
        scale: 1.05,
        y: -10,
        boxShadow: '0 25px 50px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.2)',
      }}
      style={{
        padding: 'clamp(24px, 4vw, 36px)',
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        border: '2px solid #ffffff',
        borderRadius: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow effect background */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2), transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        animate={{
          boxShadow: [
            '0 0 20px rgba(0, 212, 255, 0.3)',
            '0 0 40px rgba(124, 58, 237, 0.4)',
            '0 0 20px rgba(0, 212, 255, 0.3)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          width: 'clamp(100px, 18vw, 140px)',
          height: 'clamp(100px, 18vw, 140px)',
          margin: '0 auto 20px',
          borderRadius: '50%',
          border: '3px solid #ffffff',
          backgroundImage: `url('${member.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      />

      <h3
        style={{
          fontSize: 'clamp(16px, 2.8vw, 20px)',
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: '10px',
          letterSpacing: '-0.01em',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {member.name}
      </h3>

      <p
        style={{
          fontSize: 'clamp(18px, 2.2vw, 15px)',
          color: '#00d4ff',
          fontWeight: 600,
          marginBottom: '16px',
          lineHeight: '1.5',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {member.role}
      </p>

      <a
        href={`mailto:${member.mail}`}
        style={{ textDecoration: 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: 'clamp(10px, 2vw, 14px) clamp(20px, 3.5vw, 28px)',
            fontSize: 'clamp(12px, 2.2vw, 14px)',
            fontWeight: 700,
            borderRadius: '10px',
            border: '1.5px solid #ffffff',
            background: 'rgba(0, 212, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Mail style={{ width: '16px', height: '16px' }} />
          Contact
        </motion.button>
      </a>
    </motion.div>
  ))}
</div>

{/* Third Row - 3 Cards */}
<div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'clamp(20px, 3vw, 32px)',
  }}
>
  {thirdRowMembers.map((member, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
      whileHover={{
        scale: 1.05,
        y: -10,
        boxShadow: '0 25px 50px rgba(124, 58, 237, 0.3), 0 0 40px rgba(124, 58, 237, 0.2)',
      }}
      style={{
        padding: 'clamp(24px, 4vw, 36px)',
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
        border: '2px solid #ffffff',
        borderRadius: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow effect background */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2), transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        animate={{
          boxShadow: [
            '0 0 20px rgba(124, 58, 237, 0.3)',
            '0 0 40px rgba(0, 212, 255, 0.4)',
            '0 0 20px rgba(124, 58, 237, 0.3)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          width: 'clamp(100px, 18vw, 140px)',
          height: 'clamp(100px, 18vw, 140px)',
          margin: '0 auto 20px',
          borderRadius: '50%',
          border: '3px solid #ffffff',
          backgroundImage: `url('${member.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      />

      <h3
        style={{
          fontSize: 'clamp(16px, 2.8vw, 20px)',
          fontWeight: 800,
          color: '#ffffff',
          marginBottom: '10px',
          letterSpacing: '-0.01em',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {member.name}
      </h3>

      <p
        style={{
          fontSize: 'clamp(18px, 2.2vw, 15px)',
          color: '#00d4ff',
          fontWeight: 600,
          marginBottom: '16px',
          lineHeight: '1.5',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {member.role}
      </p>

      <a
        href={`mailto:${member.mail}`}
        style={{ textDecoration: 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: 'clamp(10px, 2vw, 14px) clamp(20px, 3.5vw, 28px)',
            fontSize: 'clamp(12px, 2.2vw, 14px)',
            fontWeight: 700,
            borderRadius: '10px',
            border: '1.5px solid #ffffff',
            background: 'rgba(124, 58, 237, 0.15)',
            backdropFilter: 'blur(10px)',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Mail style={{ width: '16px', height: '16px' }} />
          Contact
        </motion.button>
      </a>
    </motion.div>
  ))}
</div>
</div>
        </motion.section>

        {/* WHY TSA IS MORE THAN AN ACADEMY */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '60px 16px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              padding: 'clamp(32px, 6vw, 60px) clamp(24px, 5vw, 48px)',
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid #ffffff',
              borderRadius: '20px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{
                opacity: [0.15, 0.35, 0.15],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: '-30%',
                left: '-30%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3), transparent)',
                borderRadius: '50%',
                filter: 'blur(80px)',
              }}
            />

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontSize: 'clamp(22px, 4vw, 40px)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 'clamp(20px, 4vw, 28px)',
                position: 'relative',
                zIndex: 1,
                lineHeight: '1.3',
                letterSpacing: '-0.01em',
              }}
            >
              Why TSA Is More Than an Academy
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                fontSize: 'clamp(13px, 2.5vw, 16px)',
                color: '#ffffff',
                maxWidth: '750px',
                margin: '0 auto 20px',
                lineHeight: '1.8',
                position: 'relative',
                zIndex: 1,
                fontWeight: 500,
              }}
            >
              TSA decentralizes knowledge. We're the bridge that elevates Bangladesh and South Asia's extraordinary, untapped tech talent onto the international stage at scale with the Western world's need for affordable, expert-led training. For too long, world-class cybersecurity and tech knowledge has been locked behind six-figure tuitions and geographic barriers. <span style={{ color: '#00d4ff', fontWeight: 700 }}>We're shattering those walls.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{
                fontSize: 'clamp(13px, 2.5vw, 16px)',
                color: '#ffffff',
                maxWidth: '750px',
                margin: '0 auto',
                lineHeight: '1.8',
                position: 'relative',
                zIndex: 1,
                fontWeight: 500,
              }}
            >
              TSA is a revolutionary platform where brilliance meets opportunity, regardless of borders. Western students get expert training without crushing debt. Our professionals get global recognition without artificial barriers. Everyone wins when knowledge flows freely.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{
                fontSize: 'clamp(14px, 2.8vw, 17px)',
                color: '#9fda62',
                maxWidth: '750px',
                margin: 'clamp(20px, 4vw, 28px) auto 0',
                lineHeight: '1.8',
                position: 'relative',
                zIndex: 1,
                fontWeight: 700,
                letterSpacing: '0.3px',
              }}
            >
              This is more than a platform. This is how we prove that genius knows no geography. Your breakthrough becomes our shared legacy. Your excellence becomes our collective proof to the world where Bangladesh's tech excellence becomes impossible to ignore.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* JOIN THE MOVEMENT SECTION - NEW DESIGN */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: 'clamp(60px, 10vw, 100px) 16px clamp(40px, 6vw, 60px)',
          }}
        >
          {/* MAIN HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(30px, 5vw, 50px)' }}
          >
            <h2
              style={{
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 'clamp(16px, 3vw, 24px)',
                letterSpacing: '-0.02em',
              }}
            >
              Join the Movement
            </h2>
            <p
              style={{
                fontSize: 'clamp(14px, 2.6vw, 17px)',
                color: '#ffffff',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.8',
                fontWeight: 500,
              }}
            >
              Be more than a participant. Become a catalyst for change. Help us bridge Bangladesh's exceptional tech talent to the global stage while building your own success.
            </p>
          </motion.div>

          {/* TWO BLURRED CONTAINERS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(28px, 5vw, 48px)',
            }}
          >
            {/* CAMPUS AMBASSADOR CONTAINER */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                padding: 'clamp(36px, 6vw, 56px)',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(30px)',
                border: '2px solid #ffffff',
                borderRadius: '28px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Animated background glow */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(0, 212, 255, 0.25), transparent 60%)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    width: 'clamp(70px, 12vw, 90px)',
                    height: 'clamp(70px, 12vw, 90px)',
                    margin: '0 auto clamp(24px, 4vw, 32px)',
                    background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.25), rgba(0, 212, 255, 0.08))',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(32px, 6vw, 44px)',
                    border: '3px solid #ffffff',
                  }}
                >
                  🎓
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(22px, 4vw, 30px)',
                    fontWeight: 900,
                    color: '#ffffff',
                    marginBottom: 'clamp(10px, 2vw, 14px)',
                    textAlign: 'center',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Campus Ambassador
                </h3>

                <p
                  style={{
                    fontSize: 'clamp(14px, 2.5vw, 17px)',
                    color: '#00d4ff',
                    fontWeight: 700,
                    marginBottom: 'clamp(20px, 3vw, 28px)',
                    textAlign: 'center',
                  }}
                >
                  Lead the Revolution on Your Campus
                </p>

                <p
                  style={{
                    fontSize: 'clamp(13px, 2.3vw, 15px)',
                    color: '#ffffff',
                    lineHeight: '1.8',
                    marginBottom: 'clamp(24px, 4vw, 32px)',
                    textAlign: 'center',
                    fontWeight: 500,
                  }}
                >
                  Transform your campus into a launchpad for global tech careers. As a TSA Campus Ambassador, you're not just promoting a program, you're opening doors that will change lives.
                </p>

                <h4
                  style={{
                    fontSize: 'clamp(15px, 2.8vw, 18px)',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: 'clamp(16px, 2.5vw, 20px)',
                    textAlign: 'left',
                  }}
                >
                  What You Gain:
                </h4>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 clamp(28px, 5vw, 40px) 0',
                    fontSize: 'clamp(12px, 2.2vw, 14px)',
                    color: '#ffffff',
                    lineHeight: '2',
                    fontWeight: 500,
                  }}
                >
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#00d4ff' }}>•</span>
                    Earn competitive commissions for every enrollment
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#00d4ff' }}>•</span>
                    Free access to premium TSA courses and resources
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#00d4ff' }}>•</span>
                    Build leadership and marketing skills that set you apart
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#00d4ff' }}>•</span>
                    Direct mentorship from TSA leadership
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#00d4ff' }}>•</span>
                    Recognition, bonuses, and career opportunities
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#00d4ff' }}>•</span>
                    Be the voice that inspires real transformation
                  </li>
                </ul>

                <Link href="#" style={{ textDecoration: 'none', display: 'block' }}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(0, 212, 255, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: '100%',
                      padding: 'clamp(16px, 3vw, 20px)',
                      fontSize: 'clamp(15px, 2.7vw, 17px)',
                      fontWeight: 900,
                      borderRadius: '14px',
                      border: '2px solid #ffffff',
                      background: 'rgba(0, 212, 255, 0.25)',
                      backdropFilter: 'blur(10px)',
                      color: '#ffffff',
                      cursor: 'pointer',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Apply Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* AFFILIATE PARTNER CONTAINER */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                padding: 'clamp(36px, 6vw, 56px)',
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(30px)',
                border: '2px solid #ffffff',
                borderRadius: '28px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Animated background glow */}
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25), transparent 60%)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    width: 'clamp(70px, 12vw, 90px)',
                    height: 'clamp(70px, 12vw, 90px)',
                    margin: '0 auto clamp(24px, 4vw, 32px)',
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.25), rgba(124, 58, 237, 0.08))',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(32px, 6vw, 44px)',
                    border: '3px solid #ffffff',
                  }}
                >
                  🤝
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(22px, 4vw, 30px)',
                    fontWeight: 900,
                    color: '#ffffff',
                    marginBottom: 'clamp(10px, 2vw, 14px)',
                    textAlign: 'center',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Affiliate Partner
                </h3>

                <p
                  style={{
                    fontSize: 'clamp(14px, 2.5vw, 17px)',
                    color: '#7c3aed',
                    fontWeight: 700,
                    marginBottom: 'clamp(20px, 3vw, 28px)',
                    textAlign: 'center',
                  }}
                >
                  Turn Your Influence Into Impact
                </p>

                <p
                  style={{
                    fontSize: 'clamp(13px, 2.3vw, 15px)',
                    color: '#ffffff',
                    lineHeight: '1.8',
                    marginBottom: 'clamp(24px, 4vw, 32px)',
                    textAlign: 'center',
                    fontWeight: 500,
                  }}
                >
                  Have an audience? A platform? A community that values growth? Partner with TSA and earn while empowering others to break barriers and reach their potential.
                </p>

                <h4
                  style={{
                    fontSize: 'clamp(15px, 2.8vw, 18px)',
                    fontWeight: 800,
                    color: '#ffffff',
                    marginBottom: 'clamp(16px, 2.5vw, 20px)',
                    textAlign: 'left',
                  }}
                >
                  What You Gain:
                </h4>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 clamp(28px, 5vw, 40px) 0',
                    fontSize: 'clamp(12px, 2.2vw, 14px)',
                    color: '#ffffff',
                    lineHeight: '2',
                    fontWeight: 500,
                  }}
                >
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#7c3aed' }}>•</span>
                    Lucrative commissions with recurring revenue potential
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#7c3aed' }}>•</span>
                    Professional marketing materials ready to use
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#7c3aed' }}>•</span>
                    Real-time dashboard to track your success
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#7c3aed' }}>•</span>
                    Dedicated support team invested in your growth
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#7c3aed' }}>•</span>
                    Promote education that genuinely transforms lives
                  </li>
                  <li style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#7c3aed' }}>•</span>
                    Be part of democratizing elite tech education
                  </li>
                </ul>

                <Link href="#" style={{ textDecoration: 'none', display: 'block' }}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(124, 58, 237, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: '100%',
                      padding: 'clamp(16px, 3vw, 20px)',
                      fontSize: 'clamp(15px, 2.7vw, 17px)',
                      fontWeight: 900,
                      borderRadius: '14px',
                      border: '2px solid #ffffff',
                      background: 'rgba(124, 58, 237, 0.25)',
                      backdropFilter: 'blur(10px)',
                      color: '#ffffff',
                      cursor: 'pointer',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Join as Affiliate
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&display=swap');

          html {
            scroll-behavior: smooth;
          }

          body {
            background: #000;
            color: white;
            font-family: 'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          }

          * {
            box-sizing: border-box;
          }

          /* Desktop-only elements for roadmap - prevents hydration errors */
          @media (max-width: 767px) {
            .desktop-only-line {
              display: none !important;
            }
            .desktop-only-dot {
              display: none !important;
            }
            .connecting-line-left,
            .connecting-line-right {
              display: none !important;
            }
            .roadmap-item-left,
            .roadmap-item-right {
              justify-content: center !important;
            }
            .spotlight-left {
              left: -30% !important;
            }
            .spotlight-right {
              right: -30% !important;
            }
            .badge-left,
            .badge-right {
              left: clamp(16px, 3vw, 24px) !important;
              right: auto !important;
            }
            .corner-left {
              right: 0 !important;
              left: auto !important;
              border-radius: 0 100px 0 0 !important;
            }
            .corner-right {
              left: 0 !important;
              right: auto !important;
              border-radius: 100px 0 0 0 !important;
            }
          }

          @media (min-width: 768px) {
            .roadmap-item-left {
              justify-content: flex-start !important;
            }
            .roadmap-item-right {
              justify-content: flex-end !important;
            }
            .connecting-line-left {
              left: 50%;
              background: linear-gradient(to left, rgba(0, 212, 255, 0.8), transparent);
            }
            .connecting-line-right {
              right: 50%;
              background: linear-gradient(to right, rgba(0, 212, 255, 0.8), transparent);
            }
            .spotlight-left {
              left: -30%;
            }
            .spotlight-right {
              right: -30%;
            }
            .badge-left {
              left: clamp(16px, 3vw, 24px);
            }
            .badge-right {
              right: clamp(16px, 3vw, 24px);
            }
            .corner-left {
              right: 0;
              border-radius: 100px 0 0 0;
            }
            .corner-right {
              left: 0;
              border-radius: 0 100px 0 0;
            }
          }
        `}</style>
      </div>

      {/* FOOTER */}
      <Footer />
    </AuroraBackground>
  );
}
